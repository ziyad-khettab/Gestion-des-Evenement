import "./ProfileUser.css";
import { useState,useEffect,useRef } from "react";
import {connect} from 'react-redux'
import axios from "axios";
import imageToBase64 from "../../utils/imageToBase64";
import {useAlert} from 'react-alert'
import {updateUser} from '../../Redux/actions/auth'

const ProfilUser = ({user , updateUser}) => {
    let alert = useAlert()
  const [CountClub,setCountClub]=useState(0);
  const [countEvent,setCountEvent ]=useState(0);

//----------------------------------------------------------------
const ele= useRef();
//------------------------------------------------------------------
  const [formData,setFormData] = useState({
        username:user.data.username,
        telephone:user.data.telephone,
        profilepic:user.data.profilepic,
        email:user.data.email,
        motdepasse:'',
        cin:user.data.cin,
        prenom:user.data.prenom,
        nom:user.data.nom
  })

  useEffect(()=>{
      axios.get(`/api/v1/membredevenements/all/getEvents`).then(res=>{
          setCountEvent(res.data.data.length)
      })
      axios.get(`/api/v1/roles/club/all/userClubs`).then(res=>{
          setCountClub(res.data.data.length)
      })
  },[user])
  const {username,telephone,profilepic,email,motdepasse,cin,prenom,nom} = formData
  const handleChange = e => {
      setFormData({
          ...formData,
          [e.target.name]:e.target.value
      })
  }
  const handleProfilePicture = e => {
    imageToBase64(e.target.files[0],formData,setFormData,'profilepic')
  }
  const handleSubmit = async e => {
      e.preventDefault()
      if ( username.length === 0 || telephone.length === 0 || email.length === 0 ||
          motdepasse.length === 0|| cin.length === 0 || prenom.length===0 || nom.length ===0 )
        {
            if(motdepasse.length<8 || motdepasse.length>25){
                alert.error('Mot de passe doit étre entre 8 et 25 caractére')
            }
            if(username.length>20)
                alert.error('Username too long')
            else
                alert.error('Fields cannot be empty')
        }
        else
        {
            updateUser(user.data.id_user,formData)
            console.log("test")
        }
        
  }
  return (
    <div className="ProfilUser">
      <div className="container">
        <div className="First">
          <div className="count" >
            <div className="ele">
             <span className="Nombre one">{countEvent}</span><span className="titre">Events</span>
            </div>
            <div className="ele">
            <span className="Nombre two">{CountClub}</span><span className="titre">Clubs</span>
            </div>
          </div>

          <div className="imagesUser" style={{"backgroundImage":"url("+user.data.profilepic+")"}} ></div>
          <div className="connect">
            <button  onClick={
              e=>{
                if(e.target.innerText==="Hide Update"){
                  e.target.innerText="Show Update";
                  ele.current.classList.remove("show");
                }else{
                  e.target.innerText="Hide Update";
                  ele.current.classList.add("show");
                }

              
              } }
             style={{"backgroundColor": "rgb(32, 181, 207)"}}>Show Update</button>
          </div>
        </div>

        <div className="Update" ref={ele}>
           <form onSubmit={e=>handleSubmit(e)}>
              <div className="Input">
               <label>Username</label>
               <input 
                    type="text"
                    name="username"
                    onChange={e=>handleChange(e)}
                    value={formData.username}
                />
              </div>
              <div className="Input">
               <label>Telephone</label>
               <input 
                    type="text"
                    name="telephone"
                    onChange={e=>handleChange(e)}
                    value={formData.telephone}
                />
              </div>
              <div className="Input mail">
               <label>Email</label>
               <input 
                    type="email" 
                    name="email"
                    onChange={e=>handleChange(e)}
                    value={formData.email}
               />
              </div>
              <div className="Input password">
               <label>Password</label>
               <input 
                    type="password"
                    name="motdepasse"
                    onChange={e=>handleChange(e)}
                    value={formData.motdepasse}
                />
              </div>
              <div className="Input">
              <label>Profile Image</label>
              <input className="ima"
                    type="file" 
                    name="profilepic"
                    onChange={e=>handleProfilePicture(e)}
                />
             </div>
              <input className ="submit" type="submit" value ="Mettre à jour"/>
           </form>

        </div>

        <div className="main">
          <h4 className="FullName">{user.data.prenom+" "+user.data.nom}</h4>
          <p className="UserName"><span>Username : </span> {user.data.username}</p>
          <p className="Email"><span>Email : </span>{user.data.email}</p>
          <p className="Phone"><span>Téléphone : </span>{user.data.telephone}</p>
          <p className="Ecole">Ecole National de science Appliquée de Tanger </p>
        </div>
        <div className="foot">
          <p className="description">  
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps,{updateUser})(ProfilUser);