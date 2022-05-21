import { useEffect } from 'react';
import './NavBar.css'
import {Link, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from '../../../Redux/actions/auth'

function NavBar({isAuthenticated,loading,user,logout}){
    return(
        <nav >
            {!loading &&
                <ul>
                    <li className="logo">ENSAT CLUB</li>
                    <li className="items">
                        <Link to="/">Home</Link>
                    </li>
                    { isAuthenticated && user && (user.data.isAdmin || user.data.isPresident) &&
                        <li className="items">
                            <Link to={user.data.isAdmin?'/dashboard':(user.data.isPresident && '/evenements')}>Dashboard</Link>
                        </li>
                    }
                    {
                        isAuthenticated && user &&
                        <li className="items">
                            <Link to={'/evenement/0/chat'}>Chat</Link>
                        </li>
                    }
                    {!isAuthenticated ?
                        <li className="items">
                            <Link to="/login">Login</Link>
                        </li>
                        :
                        <li className="items">
                            <Link to="/profile">{!loading && user && user.data.username}</Link>
                        </li>
                    }
                    {!isAuthenticated ?
                        <li className="items">
                            <Link to="/register">sign up</Link>
                        </li>
                        :
                        <li className="items" onClick={()=>logout()}>
                            <Link to="/">log out</Link>
                        </li>
                    }
                    <div className="btn">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </ul>
            }
        </nav>
    );
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    user: state.auth.user
})

export default connect(mapStateToProps,{logout})(NavBar);