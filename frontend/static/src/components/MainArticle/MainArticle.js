import { useState } from 'react'
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';


function MainArticle(props){
    const [state, setState] = useState({
        title: '',
        body: '',
        image: null,

    })
    const [preview, setPreview] = useState('');
   const articleHTML = props.articles?.map(article => <div><h3>{article.title}</h3><p>{article.body}</p><span>{article.created_at}</span><img className="article-image" src={article.image}></img></div>)
   console.log(props)

   function handleChange(event){
    const {name, value} = event.target;
    setState({...state, [name]: value})
   }

   const handleImage = (event) => {
    const file = event.target.files[0];
    setState({
      ...state, 
      image: file,
    });
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    }
    reader.readAsDataURL(file);
    console.log(reader);
  }

   async function handleSubmit(event){
    event.preventDefault();
         const options = {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'X-CSRFToken': Cookies.get('csrftoken'),
             },
             body: JSON.stringify(state),
         };
         const response = await fetch('/api_v1/articles/', options);
         if(!response){
             console.log(response);
         }else{
             const data = await response.json();
             Cookies.set('Authorization', `Token ${data.key}`);
         }
    }
   

    return(
        <>
        <h3>Articles</h3>
        {articleHTML}
        <form onSubmit={handleSubmit}>
            <input type='text'
                 className="form-user" 
                 id="articleTitle" 
                 placeholder="Title" 
                 required 
                 name="title" 
                 onChange={handleChange}
                 value={state.title}
                />
            <input type='text'
                 className="form-user" 
                 id="articleBody" 
                 placeholder="Text" 
                 required 
                 name="body" 
                 onChange={handleChange}
                 value={state.body}
                />
            <input type='file'
                 className="form-user" 
                 id="articleFile" 
                 placeholder="select file" 
                 required 
                 name="image" 
                 onChange={handleImage}
                />
            {state.image && <img src={preview} alt="" />}
            <button type="submit">Submit</button>
        </form>
        </>
    )
}

export default MainArticle;