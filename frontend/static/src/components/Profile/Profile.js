import { useState } from 'react'
import { Route, Redirect } from 'react-router-dom';

function Profile(props){
    const [preview, setPreview] = useState('');

    const handleChange = (event) => {
        const {name, value} = event.target;
        props.setProfile({...props.profile, [name]: value});
      }
  
      const handleImage = (event) => {
        const file = event.target.files[0];
        props.setProfile({
          ...props.profile, 
          image: file,
        });
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        }
        reader.readAsDataURL(file);
        console.log(reader);
      }
      if(props.isAuth){
        return 
        }
    
      
    
    return(
        <>
        <h3>Profile</h3>
            <form action="" onSubmit={props.handleSubmit}>    
                <input type="text" name="alias" value={props.profile?.alias} onChange={handleChange}/>
                <input type="file" name="avatar" onChange={handleImage} />
                
                {props.profile?.image && <img src={preview} alt="" />}
          <button type="submit">Save Profile</button>
      </form>
        </>

    )
}

export default Profile;