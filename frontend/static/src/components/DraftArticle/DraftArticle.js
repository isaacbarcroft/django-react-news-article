import { useState, useEffect } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';

const DraftArticle = (draftArticle) => {
    console.log({draftArticle})
    
    const [article, setArticle] = useState({

        title: draftArticle.article.title,
        body: draftArticle.article.body,
        options: draftArticle.article.options,
        image: null,
        categories: draftArticle.article.categories,
    })
    const [preview, setPreview] = useState('');
    console.log("before",draftArticle)
    const handleChange = (event) => {
        const {name, value} = event.target;
        setArticle({...article, [name]: value});
      }

      const handleImage = (event) => {
        const file = event.target.files[0];
        setArticle({
          ...article, 
          image: file,
        });
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        }
        reader.readAsDataURL(file);
    }
    
        async function getMyArticles(){
          const response = await fetch(`/api_v1/articles/?options=ALL/`);
          if(!response.ok) {
            console.log(response);
          } else {
            const data = await response.json();
            // setMyArticles(data);
            console.log({data})
            // console.log({myArticles})
          }
        }
       
      const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(); /// contructing key - value pairs
        formData.append('title', article.title);
        formData.append('body', article.body);
        formData.append('options', event.target.value);
        formData.append('image', article.image);
        formData.append('categories', article.categories);
  
        const options = {
          method: 'PUT',
          headers: {
            'X-CSRFToken': Cookies.get('csrftoken'),
          },
          body: formData,
        }
        fetch(`/api_v1/articles/${draftArticle.article.id}/`, options);
       getMyArticles();
       console.log('drID',draftArticle.article.id)
       
      }

    return (
        <div className="shadow p-3 mb-5 bg-body rounded mt-2">
    <h2 style={{fontFamily: 'Oswald'}} className="mt-2 text-center">{article.title}</h2>
<form className="mt-5 col-8 draftFormn ds-flex justify-content-center ">
            <div className="form-group text-left mb-3">
                <label htmlFor='title'>Title</label>
                <input type="text"
                    className="form-control"
                    id='articleTitle'
                    placeholder="Article Title"
                    onChange={handleChange}
                    required
                    name='title'
                    value={article.title}
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
                    value={article.body}
                    />
            </div>
            <label htmlFor='body'>Category</label>
            <input  className="form-control"
                    onChange={handleChange} 
                    name="categories" 
                    value={article.categories}
                    placeholder="Category"
                    />
            <div className="form-group text-left mb-3">
                <input type="file" name="image" onChange={handleImage} />
            </div>
            { <img src={article.image} alt="" />}
           
            <div className="form-group text-left mb-3">
                {/* <label htmlFor='options'>Draft/Submitted</label> */}
                <button type="button"
                    className="homeButton form-control  btn btn-dark"
                    id='articleOptions'
                    onClick={handleSubmit}
                    required
                    name='DFT'
                    value='SUBMITTED'
                    >Submit</button>
            </div>
            
         
        </form>
                    </div>
                )
            }

export default DraftArticle