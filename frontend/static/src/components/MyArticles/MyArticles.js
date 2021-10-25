import { useState, useEffect } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import DraftArticle from '../DraftArticle/DraftArticle';


function MyArticles(props){
    const [state, setState] = useState({
        title: '',
        body: '',
        options: '',
        image: null,
        categories: '',
    })


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
        
        async function getMyArticles(event){
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
      },[props.isAuth])
      
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(); /// contructing key - value pairs
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
      
      const options = [...new Set(myArticles?.map(article => article.options))];
      console.log(options)
      const categoriesHTML = options.map(option => <button className="nav-btn btn btn-dark mx-2" key={option} onClick={() => setSelection(option)}>{option}</button>); 
      const myFilteredArticles = myArticles?.filter(article => selection ? article.options === selection : article);
      const myFilteredDrafts = myArticles?.filter(article => selection === "DRAFT" ? article.options === "DRAFT" : article);
      const myFilteredDraftsHTML = myFilteredDrafts?.map(article => <DraftArticle article={article} />)
      
      console.log({myFilteredDrafts})


      const myFilteredArticlesHTML = myFilteredArticles?.map(article => <div className="mt-3"><img className="article-image rounded mx-auto d-block" src={article.image}></img><h3 className="articleTitle">{article.title}</h3><p className="text-truncate articleBody">{article.body}</p></div>)
      console.log(myFilteredArticlesHTML)

    if(!props.isAuth){
        return <Redirect to="/" />
        }
    
    return(
        <>
        <div className=" container ds-flex justify-content-center">
        <h2>My Articles</h2>
        {categoriesHTML}
        {selection === "DRAFT" ? myFilteredDraftsHTML : myFilteredArticlesHTML }
        

        <form className="mt-3 col-6">
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
                <input type="text"
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
        
            <div className="form-group text-left mb-3">
                {/* <label htmlFor='options'>Draft/Submitted</label> */}
                <button type="button"
                    className="form-control"
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
                    className="form-control"
                    id='articleOptions'
                    onClick={handleSubmit}
                    required
                    name='DFT'
                    value='SUBMIT'
                >Submit</button>
            </div>
            
         
        </form>
        </div>
        </>
    )
}

export default MyArticles;