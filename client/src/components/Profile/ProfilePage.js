import "./ProfilePage.css"
import ProfileUser from "./ProfileUser";
import {connect} from 'react-redux'
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";

const PorfilePage=({isAuthenticated,user,loading})=>{
    let navigate = useNavigate()
    if (!loading && !isAuthenticated)
    {
        navigate('/login')
    }
    return(
        <div className="ProfilAll">
            { !loading && isAuthenticated && user &&
                <ProfileUser user={user}/>
            }
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    loading: state.auth.loading
})

export default connect(mapStateToProps)(PorfilePage);