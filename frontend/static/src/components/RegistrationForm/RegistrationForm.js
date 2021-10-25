import { useState } from 'react';
import Cookies from 'js-cookie';
import { Route, Redirect, withRouter } from 'react-router-dom';

function RegistrationForm(props){

    const [user, setUser] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
    })

    const [error, setError] = useState(null);

   const handleChange = (e) => {
    const {name, value} = e.target;  // == name = e.target.value & value = e.target.value
    setUser(prevState => ({
        ...prevState,
        [name]: value,
    }));
   }
   function handleError(err){
    console.warn(err);
}
   async function handleSubmit(event){
    event.preventDefault();
    if(user.password1 !== user.password2){
     setError('Passwords do not match');
    }else {
         const options = {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'X-CSRFToken': Cookies.get('csrftoken'),
             },
             body: JSON.stringify(user),
         };
         const response = await fetch('/rest-auth/registration/', options).catch(handleError);
         if(!response){
             console.log(response);
         }else{
             const data = await response.json();
             Cookies.set('Authorization', `Token ${data.key}`);
             props.setIsAuth(true);
         }
    }
}
if(props.isAuth){
    return <Redirect to="/" />
    }

    return(
        <>
            <h2 className='Registration-title mt-3 d-flex justify-content-center mt-3'>Register</h2>
            <form className="form registrationForm d-flex justify-content-center mt-3" onSubmit={handleSubmit} >
            {/* <div className=" text-left mb-3"> */}
                {/* <div className="row"> */}
                    <div className="form-group form-control col-lg-1">
                        <input type='text'
                        className="form-user form-control  mt-3" 
                        id="username" 
                        placeholder="enter username" 
                        required 
                        name="username" 
                        onChange={handleChange}
                        value={user.username}
                        />
                    {/* </div> */}
                 {/* </div> */}
                 {/* <div className="row">
                    <div className="form-group col-xs-3 col-lg-1"> */}
                        <input type='text'
                        className="form-control col-xs-4 mt-3"
                            id='email'
                            placeholder="enter email"
                            required
                            name="email"
                            onChange={handleChange}
                            value={user.email}
                            />
                    {/* </div>
                </div> */}
                {/* <div className="row">
                    <div className="form-group col-xs-5 col-lg-1"> */}
                        <input type='password'
                        className="form-control col-xs-4 mt-3"
                        id='password1'
                        placeholder="enter password"
                        required
                        name="password1"
                        onChange={handleChange}
                        value={user.password1}
                        />
                    {/* </div>
                </div> */}
                {/* <div className="row">
                    <div className="form-group col-xs-3 col-lg-1"> */}
                            <input type='password'
                        className="form-control col-xs-4 mt-3"
                        id='password2'
                        placeholder="confirm password"
                        required
                        name="password2"
                        onChange={handleChange}
                        value={user.password2}
                        />
                    {/* </div>
                </div> */}
                 <button type="submit" className="registration-btn btn btn-dark d-flex justify-content-center mt-3"style={{fontFamily: 'Oswald'}}>Register</button>
                 </div>
            </form>
        </>
    )
}

export default withRouter(RegistrationForm);