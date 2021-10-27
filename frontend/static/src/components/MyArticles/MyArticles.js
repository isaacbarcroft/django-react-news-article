import { useState, useEffect } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import DraftArticle from '../DraftArticle/DraftArticle';
import ReadMoreReact from 'read-more-react';
import styled from 'styled-components';

function MyArticles(props){
    const [state, setState] = useState({
        title: '',
        body: '',
        options: '',
        image: null,
        categories: '',
    })
    const HoverText = styled.p`
	color: #000;
	:hover {
		cursor: pointer;
	}
`

    const [myArticles, setMyArticles] = useState([]);
    const [selection, setSelection] = useState();
    const handleChange = (event) => {
        const {name, value} = event.target;
        setState({...state, [name]: value});
      } 

    const handleImage = (event) => {
        const file = event.target.files[0];
        setState({
          ...state, 
          image: file,
        });
    }
        useEffect(() => {
        
        async function getMyArticles(){
          const response = await fetch(`/api_v1/articles/?options=ALL`);
          if(!response.ok) {
            console.log(response);
          } else {
            const data = await response.json();
            setMyArticles(data);
            console.log({data})
            console.log({myArticles})
          }
        }
        getMyArticles();
      },[,props.isAuth])
      
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(); 
        formData.append('title', state.title);
        formData.append('body', state.body);
        formData.append('options', event.target.value);
        formData.append('image', state.image);
        formData.append('categories', state.categories);
  
        const options = {
          method: 'POST',
          headers: {
            'X-CSRFToken': Cookies.get('csrftoken'),
          },
          body: formData,
        }
        fetch('/api_v1/articles/', options);
        setState({
            title: '',
            body: '',
            options: '',
            image: null,
            categories: '',
        })
      }
      const readMore = <div className="readMore">Read More</div>
      const options = [...new Set(myArticles?.map(article => article.options))];
      console.log(options)
      const categoriesHTML = options.map(option => <button className="myArticleButton nav-btn btn btn-dark mx-2 justify-content-center btn-lg" key={option} style={{fontFamily: 'Oswald'}} onClick={() => setSelection(option)}>{option}</button>); 
      const myFilteredArticles = myArticles?.filter(article => selection ? article.options === selection : article);
      const myFilteredDrafts = myArticles?.filter(article => selection === "DRAFT" ? article.options === "DRAFT" : article);
      const myFilteredDraftsHTML = myFilteredDrafts?.map(article => <DraftArticle article={article}/>)
      
      console.log({myFilteredDrafts})


      const myFilteredArticlesHTML = myFilteredArticles?.map(article => <div   style={{background: 'antiquewhite'}} className="backgroundDiv mt-3 shadow p-3 mb-5 bg-body rounded mt-2"><img className="article-image rounded mx-auto d-block" src={article.image}></img><p className="ds-flex justify-content-center text-align-center" style={{fontStyle: 'italic'}}> by {article.author_name.charAt(0).toUpperCase() + article.author_name.slice(1)}</p><span><p className="font-italic" style={{fontFamily: 'Oswald', fontStyle: 'iitalic'}}>{article.options}</p></span><h3 className="articleTitle" style={{fontFamily: 'Oswald'}}>{article.title}</h3><HoverText><ReadMoreReact text={article.body}
      min={100}
      ideal={200}
      max={1000000}
      style={{cursor: 'pointer'}}
      readMoreText={readMore}/></HoverText></div>)
      console.log(myFilteredArticlesHTML)

    if(!props.isAuth){
        return <Redirect to="/" />
        }
    
    return(
        <>
        <div className=" container-md  mb-3">
        <h2 className="d-flex justify-content-center mt-2 headers shadow p-3 mb-5 bg-body rounded">My Articles</h2>
        <div class="container">
            <div class="row">
                <div class="col text-center">
                    {categoriesHTML}
                    <a className="homeButton nav-btn btn btn-dark mx-2 justify-content-center sticky-top btn-lg" href="#form" style={{fontFamily: 'Oswald'}} >Draft New</a>
                </div>
            </div>
        </div>
        {selection === "DRAFT" ? myFilteredDraftsHTML : myFilteredArticlesHTML }

        <div className="border" ></div>
        
        <div className="container  mb-3">
        <div className="ds-flex justify-content-center mt-3  mb-5">
        <h2 className="newArticleForm text-center mt-3">Submit new article</h2>
        <form id="form"className="mt-3 ds-flex justify-content-center mt-3">
            <a name="form" ></a>
            <div className="form-group text-left mb-3">
                <label htmlFor='title'>Title</label>
                <input type="text"
                    className="form-control"
                    id='articleTitle'
                    placeholder="Article Title"
                    onChange={handleChange}
                    required
                    name='title'
                    value={state.title}
                />
            </div>
            <div className="form-group text-left mb-3">
                <label htmlFor='body'>Article Body</label>
                <textarea type="text"
                    className="form-control"
                    id='articleText'
                    placeholder="Article body"
                    onChange={handleChange}
                    required
                    name='body'
                    value={state.body}
                />
            </div>
            <label htmlFor='body'>Category</label>
            <input  className="form-control"
                    onChange={handleChange} 
                    name="categories" 
                    value={state.categories}
                    placeholder="Category"
                     />
            <div className="form-group text-left mb-3">
                <input type="file" name="image" onChange={handleImage} />
            </div>
        
            <div className="form-group text-left mb-3 ">
                {/* <label htmlFor='options'>Draft/Submitted</label> */}
                <button type="button"
                    className="homeButton form-control btn btn-dark"
                    id='articleOptions'
                    onClick={handleSubmit}
                    required
                    name='DFT'
                    value="DRAFT"we
                >Save as  Draft</button>
            </div>
            <div className="form-group text-left mb-3">
                {/* <label htmlFor='options'>Draft/Submitted</label> */}
                <button type="button"
                    className=" homeButton form-control  btn btn-dark"
                    id='articleOptions'
                    onClick={handleSubmit}
                    required
                    name='DFT'
                    value='SUBMIT'
                >Submit</button>
            </div>
            
         
        </form>
        </div>
        </div>
        </div>
        </>
    )
}

export default MyArticles;