import { useState, useEffect } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import DraftArticle from '../DraftArticle/DraftArticle';
import ReadMoreReact from 'read-more-react';
import styled from 'styled-components';

function AdminArticles(props){
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

    const [allArticles, setallArticles] = useState([]);
    const [selection, setSelection] = useState();
    const handleChange = (event) => {
        const {name, value} = event.target;
        setState({...state, [name]: value});
      } 

    // const handleImage = (event) => {
    //     const file = event.target.files[0];
    //     setState({
    //       ...state, 
    //       image: file,
    //     });
    // }
        useEffect(() => {
        
        async function getAllArticles(){
          const response = await fetch(`/api_v1/articles/?options=ALL`);
          if(!response.ok) {
            console.log(response);
          } else {
            const data = await response.json();
            setallArticles(data);
            console.log({data})
            console.log({allArticles})
          }
        }
        getAllArticles();
      },[,props.isAuth])
      
    const handleSubmit = async (event, body) => {
        event.preventDefault();
       
        const formData = new FormData(); 
        formData.append('options', event.target.dataset.options);
        formData.append('body', body);

        
  
        const options = {
          method: 'PUT',
          headers: {
            'X-CSRFToken': Cookies.get('csrftoken'),
          },
          body: formData,
        }
        
        const response = await fetch(`/api_v1/articles/${event.target.value}/`, options);
        // const data = await response.json();
        if(!response.ok) {
            console.log(response);
        } else {
            const updatedAllArticles = allArticles.filter(article => article.id != event.target.value);
            setallArticles(updatedAllArticles);
        }
       
      }
      const readMore = <div className="readMore">Read More</div>
      const options = [...new Set(allArticles?.map(article => article.options))];
      console.log(options)
      const categoriesHTML = options.map(option => <button className="myArticleButton nav-btn btn btn-dark mx-2 justify-content-center btn-lg" key={option} style={{fontFamily: 'Oswald'}} onClick={() => setSelection(option)}>{option}</button>); 
      const myFilteredArticles = allArticles?.filter(article => selection ? article.options === selection : article);
      const myFilteredDrafts = allArticles?.filter(article => selection === "DRAFT" ? article.options === "DRAFT" : article);
      const myFilteredDraftsHTML = myFilteredDrafts?.map(article => <DraftArticle article={article}/>)
      
      console.log({myFilteredDrafts})


      const myFilteredArticlesHTML = myFilteredArticles?.map(article => <div   style={{background: 'antiquewhite'}} className="backgroundDiv mt-3 shadow p-3 mb-5 bg-body rounded mt-2"><img className="article-image rounded mx-auto d-block" src={article.image}></img><p className="ds-flex justify-content-center text-align-center" style={{fontStyle: 'italic'}}> by {article.author_name.charAt(0).toUpperCase() + article.author_name.slice(1)}</p><span><p className="font-italic" style={{fontFamily: 'Oswald', fontStyle: 'iitalic'}}>{article.options}</p></span><h3 className="articleTitle" style={{fontFamily: 'Oswald'}}>{article.title}</h3><HoverText><ReadMoreReact text={article.body}
      min={100}
      ideal={200}
      max={1000000}
      style={{cursor: 'pointer'}}
      readMoreText={readMore}/></HoverText>{selection === 'SUBMITTED' ? <div><button data-options="REJECTED" value={article.id} onClick={(e) => handleSubmit(e, article.body)} className="myArticleButton nav-btn btn btn-dark mx-2 justify-content-center">REJECT</button><button data-options="PUBLISHED" value={article.id} onClick={(e) => handleSubmit(e, article.body)} className="myArticleButton nav-btn btn btn-dark mx-2 justify-content-center">PUBLISH</button></div> : <p></p> }</div>)
      console.log(myFilteredArticlesHTML)

    if(!props.isAuth){
        return <Redirect to="/" />
        }
    
    return(
        <>
        <div className=" container-md  mb-3">
        <h2 className="d-flex justify-content-center mt-2 headers shadow p-3 mb-5 bg-body rounded">Admin</h2>
        <div class="container">
            <div class="row">
                <div class="col text-center">
                    {categoriesHTML}
                    {/* <a className="homeButton nav-btn btn btn-dark mx-2 justify-content-center sticky-top btn-lg" href="#form" style={{fontFamily: 'Oswald'}} >Draft New</a> */}
                </div>
            </div>
        </div>
        {selection === "DRAFT" ? myFilteredDraftsHTML : myFilteredArticlesHTML }

        <div className="border" ></div>
        
        <div className="container  mb-3">
        <div className="ds-flex justify-content-center mt-3  mb-5">
        {/* <h2 className="newArticleForm text-center mt-3">Submit new article</h2>
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
                {/* <button type="button"
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
                {/* <button type="button"
                    className=" homeButton form-control  btn btn-dark"
                    id='articleOptions'
                    onClick={handleSubmit}
                    required
                    name='DFT'
                    value='SUBMIT'
                >Submit</button>
            </div> */}
            
         
        {/* </form>  */}
        </div>
        </div>
        </div>
        </>
    )
}

export default AdminArticles;