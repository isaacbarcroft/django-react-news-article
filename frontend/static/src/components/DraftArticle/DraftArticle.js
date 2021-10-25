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
          method: 'POST',
          headers: {
            'X-CSRFToken': Cookies.get('csrftoken'),
          },
          body: formData,
        }
        fetch('/api_v1/articles/', options);
        // setState({
        //     title: '',
        //     body: '',
        //     options: '',
        //     image: null,
        //     categories: '',
        // })
      }

    return (
        <div>

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
                    value={article.title}
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
        
            <div className="form-group text-left mb-3">
                {/* <label htmlFor='options'>Draft/Submitted</label> */}
                <button type="button"
                    className="form-control"
                    id='articleOptions'
                    onClick={handleSubmit}
                    required
                    name='DFT'
                    value="DRAFT"
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
                    value='SUBMITTED'
                    >Submit</button>
            </div>
            
         
        </form>
                    </div>
                )
            }

export default DraftArticle