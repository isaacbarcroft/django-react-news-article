import { useState } from 'react'
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import ReadMoreReact from 'read-more-react';
import SideMenu from '../SideMenu/SideMenu';


function Home(props){
    const [state, setState] = useState({
        title: '',
        body: '',
        image: null,
    })
    const [selection, setSelection] = useState();
    const [preview, setPreview] = useState('');
   
    const readMore = <div className="readMore">Read More</div>
    const articleHTML = props.articles?.map(article => <div><h3>{article.title}</h3><p>{article.body}</p><span>{article.categories}</span><img className="article-image" src={article.image}></img></div>)
    console.log(props)
    const categories = [...new Set(props.articles?.map(article => article.categories))];
    const categoriesHTML = categories.map(categories => <button className="homeButton nav-btn btn btn-dark mx-2 justify-content-center" style={{fontFamily: 'Oswald'}} key={categories} onClick={() => setSelection(categories)}>{categories}</button>); 
    const filteredArticles = props.articles?.filter(article => selection ? article.categories === selection : article);
    const filteredArticlesHTML = filteredArticles?.map(article => <div className="mt-3 shadow p-3 mb-5 bg-body rounded"><img className="article-image rounded mx-auto d-block" src={article.image}></img><h3 className="articleTitle" style={{fontFamily: 'Oswald'}}>{article.title}</h3><ReadMoreReact text={article.body}
            min={80}
            ideal={100}
            max={1000}
            readMoreText={readMore}/></div>)
    console.log({categories})
    console.log({filteredArticles})
    console.log({filteredArticlesHTML})

    // if(!props.isAuth){
    //     return <Redirect to="/login" />
    //     }

    return (
        <> 
        <div className='container-md' >
         <h2 className="headers shadow p-3 mb-5 bg-body rounded mt-2" >{selection ? selection.toUpperCase() : 'All'}</h2>
         <div className="navButtons" >
        <SideMenu />
         <div class="container">
            <div class="row">
                <div class="col text-center">
                    <button className="homeButton nav-btn btn btn-dark mx-2 justify-content-center" style={{fontFamily: 'Oswald'}} onClick={() => setSelection(null)}>All</button>
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