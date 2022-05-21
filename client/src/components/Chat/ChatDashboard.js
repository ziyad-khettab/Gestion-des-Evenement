import {Link, useParams} from 'react-router-dom'
import "./Style/ChatDashboard.css";

const ChatDashboard = ({user,events}) => {
    return (
        <div className="chatDashboard">
            <div className="container">
                <div className="Profil">
                    <div className="images">
                        <img src={user.profilepic} alt="No images"></img>
                    </div>
                    <h3>{`${user.username}`}</h3>
                </div>
                <div className="events">
                    <h4>Events Rooms</h4>
                    {
                        events.map(e=>(
                            <Link key={e.id} style={{textDecoration:'none',color:'white'}} to={`/evenement/${e.id}/chat`}>
                                <div className="event_ele active">
                                    <img src={e.logo} alt="no images"/>
                                    <div className="Pbox">
                                        <p>{e.nom}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ChatDashboard;