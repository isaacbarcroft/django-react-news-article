import { useState } from 'react'
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';


function Home(props){
    const [state, setState] = useState({
        title: '',
        body: '',
        image: null,
    })
    const [selection, setSelection] = useState();
    const [preview, setPreview] = useState('');
   const articleHTML = props.articles?.map(article => <div><h3>{article.title}</h3><p>{article.body}</p><span>{article.categories}</span><img className="article-image" src={article.image}></img></div>)
   console.log(props)
   const categories = [...new Set(props.articles?.map(article => article.categories))];
   const categoriesHTML = categories.map(categories => <button className="nav-btn btn btn-dark mx-2 justify-content-center" key={categories} onClick={() => setSelection(categories)}>{categories}</button>); 
   const filteredArticles = props.articles?.filter(article => selection ? article.categories === selection : article);
   const filteredArticlesHTML = filteredArticles?.map(article => <div className="mt-3"><img className="article-image rounded mx-auto d-block" src={article.image}></img><h3 className="articleTitle">{article.title}</h3><p className="text-truncate articleBody">{article.body}</p></div>)
    console.log({categories})
    console.log({filteredArticles})
    console.log({filteredArticlesHTML})
//    function handleChange(event){r
//     const {name, value} = event.target;
//     setState({...state, [name]: value})
//    }

//    const handleImage = (event) => {
//     const file = event.target.files[0];
//     setState({
//       ...state, 
//       image: file,
//     });
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//     }
//     reader.readAsDataURL(file);
//     console.log(reader);
//   }

//    async function handleSubmit(event){
//     event.preventDefault();
//          const options = {
//              method: 'POST',
//              headers: {
//                  'Content-Type': 'application/json',
//                  'X-CSRFToken': Cookies.get('csrftoken'),
//              },
//              body: JSON.stringify(state),
//          };
//          const response = await fetch('/api_v1/articles/', options);
//          if(!response){
//              console.log(response);
//          }else{
//              const data = await response.json();
//              Cookies.set('Authorization', `Token ${data.key}`);
//          }
//     }
   
    return (
        <> 
        <div className='container-md' >
         <h2 className="headers shadow p-3 mb-5 bg-body rounded" >{selection ? selection.toUpperCase() : 'All'}</h2>
         <div className="navButtons" >
         <div class="container">
            <div class="row">
                <div class="col text-center">
                    <button className="nav-btn btn btn-dark mx-2 justify-content-center" onClick={() => setSelection(null)}>All</button>
                    {categoriesHTML}    
                </div>
            </div>
        </div>
        </div>

        {filteredArticlesHTML}
        
        </div>
        </>
    )
}

export default Home;