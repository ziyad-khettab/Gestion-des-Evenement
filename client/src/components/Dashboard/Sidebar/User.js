import Avatar from '@mui/material/Avatar';
import './sidebar.css';

const User = ({ user }) =>{
    return (
        <div className = "side-bar-user-wrapper">
            <div className="side-bar-user-icon">
            {/*<Avatar sx={{ width: 30, height: 30, bgcolor: 'white' }} ></Avatar>*/}
            <img src={user.data.profilepic} alt="User's Profile Pic"/>
            </div>
            <div className = "side-bar-user-name">
                <b>{`${user.data.nom} ${user.data.prenom}`}</b>
                <span>&nbsp;{user.data.isAdmin?'Admin':(user.data.isPresident && 'President')} </span>
            </div>
        </div>    
    )
}

export default User;