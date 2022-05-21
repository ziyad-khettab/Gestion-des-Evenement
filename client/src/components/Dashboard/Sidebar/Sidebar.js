import Section from './Section';
import User from './User';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import FaceIcon from '@mui/icons-material/Face';
import LogoutIcon from '@mui/icons-material/Logout';
import { connect } from 'react-redux';
import './sidebar.css';
import { useState, useEffect } from 'react';
import Logo from '../images/genie.png'
import {useNavigate} from 'react-router-dom'

const Sidebar = ({user,loading,isAuthenticated}) =>{
    const navigate = useNavigate()
    if (!loading && !isAuthenticated)
    {
        navigate('/login')
    }
    const [loggeduser,setLoggeduser] = useState();

    //this is purely for some css problem i fixed (forgot lol)
    var AppStyle = {
        divStyle : {
          'justify-content' : 'flex-start'
        }
    }



    //Buttons props of the general section that will vary depending on wether its an admin or a president
    var generalStyle = [
        ['Dashboard',<DashboardIcon sx={{ color: "green[500]" }} />,'','/dashboard',1],
        ['Clubs',<GroupsIcon sx={{ color: 'green[500]' }} />,AppStyle.divStyle,'/clubs',2],
        ['Présidents',<PersonIcon sx={{ color: 'green[500]' }} />,'','/presidents',3]
    ]

    var presidentStyle = [
        ['Evenements',<DashboardIcon sx={{ color: "green[500]" }} />,'','/evenements',1],
        ['Membres',<GroupsIcon sx={{ color: 'green[500]' }} />,AppStyle.divStyle,'/membres',2]
    ]

    useEffect(async ()=>{
        if(!loading){
            setLoggeduser(user)
        }
    },[loading])



    //Buttons props of the user section in sidebar
    const userStyle = [
        ['User',<FaceIcon sx={{ color: "green[500]" }} />,'','/profile',1],
        ['Logout',<LogoutIcon sx={{ color: "green[500]" }} />,'/logout',2]
    ]


    //static info to be passed to the user card "User" in the side bar
    const userinfo = ['name','something something']


    return (
        <div className = "side-bar">
            {
                !loading && isAuthenticated && user.data &&
                <>
                    <img className="side-bar-logo" src={Logo} alt="logo"></img>
                    <User user={user}/>
                    {user.data.isAdmin && <Section title="General" props={generalStyle}/>}
                    {user.data.isPresident && <Section title="President" props={presidentStyle}/>}
                    {/*<Section title="User" props={userStyle}/>*/}
                </>
            }
        </div>
    )
}


const mapStatetoProps = (state) => ({
    user:state.auth.user,
    loading:state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStatetoProps)(Sidebar);
