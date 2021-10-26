import Profile from './../Profile/Profile';
import { useState, useEffect } from 'react';
import './App.css';
import { Route, Switch, Redirect, withRouter, useHistory, useLocation  } from 'react-router-dom';
import Cookies from 'js-cookie';
import RegistrationForm from './../RegistrationForm/RegistrationForm';
import LoginPage from '../LoginForm/LoginForm';
import MainArticle from '../MainArticle/MainArticle';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './../Header/Header';
import Home from './../Home/Home';
import Categories from './../Categories/Categories';
import MyArticles from './../MyArticles/MyArticles';
import Footer from '../Footer/Footer';
import ScrollTop from 'react-scrolltop-button';

function App() {
  const [profile, setProfile] = useState({
    alias: '',
    image: null,
  });
  const [users, setUsers] = useState({
    username: '',
    password: '',
});
const location = useLocation();
  const [articles, setArticles] = useState([]);
 const [author, setAuthor] = useState();
  const [isAuth, setIsAuth] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const checkAuth = async () => {
    const response = await fetch('/rest-auth/user/', {signal: signal});
    if(!response.ok) {
      console.log('not ok')
      setIsAuth(false);
    } else {
      console.log({response})
      setIsAuth(true);
    }
    return function cleanup(){
      abortController.abort();
    }
   }
   checkAuth()
  }, [history])

  useEffect(() => {
  async function getArticles(){
    const response = await fetch(`/api_v1/articles/`);
    if(!response.ok) {
      console.log(response);
    } else {
      const data = await response.json();
      setArticles(data);
      console.log({data})
    }
    }
    getArticles();
  },[,isAuth])
 

    async function handleLogoutSubmit(event){
        // event.preventDefault();
         const options = {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'X-CSRFToken': Cookies.get('csrftoken'),
             },
             body: JSON.stringify(users),
         };
         const response = await fetch('/rest-auth/logout/', options)
         if(!response){
             console.log(response);
         } else {
             console.log(response)
             const data = await response.json();
             Cookies.remove('Authorization');
            setIsAuth(false)
            history.push("/login")
            
         }
         <Redirect path="/login" />
        }
        

 
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(); /// contructing key - value pairs
    formData.append('alias', profile.alias);
    formData.append('avatar', profile.image);
    const options = {
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: formData,
    }
    fetch('api_v1/accounts/', options);
  }
  

  return (
    
      <>
      <Header handleLogoutSubmit={handleLogoutSubmit} isAuth={isAuth}/>
      <Switch>
        
        <Route path="/login">
          <LoginPage isAuth={isAuth} setIsAuth={setIsAuth} users={users} setUsers={setUsers}/>
        </Route>
        <Route path="/register">
          <RegistrationForm isAuth={isAuth} setIsAuth={setIsAuth} />
        </Route>
        <Route path="/profile" isAuth={isAuth}>
          <Profile profile={profile} setProfile={setProfile} handleSubmit={handleSubmit}/>
        </Route>
        <Route path="/main">
          <MainArticle articles={articles} />
        </Route>
        <Route path='/myarticles' >
          <MyArticles articles={articles} isAuth={isAuth}/>
        </Route>
        <Route path='/' >
          <Home articles={articles} />
        </Route>
      </Switch>
      <ScrollTop
      
        text="^"
        distance={50}
        breakpoint={908}
        style={{ backgroundColor: "#191C1F", color: "white" }}
        className="scroll-your-role"
        speed={50}
        target={0}
        icon={<i class="bi bi-caret-up-square"></i>}
      />
      <Footer />
      </>
   
  );
}

export default withRouter(App);
