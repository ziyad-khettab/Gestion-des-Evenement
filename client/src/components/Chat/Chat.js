import ChatRoom from './ChatRoom'
import ChatDashboard from './ChatDashboard'
import Spinner from '../layouts/Spinner/Spinner'
import {connect} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import './Style/Chat.css';
import {useEffect, useState} from "react";
import axios from "axios";

function Chat({auth:{user,isAuthenticated,loading}}){
    const {id} = useParams()
    const navigate  = useNavigate()
    const [events,setEvents] = useState([])

    useEffect(()=>{
        if((!loading && !isAuthenticated) || (parseInt(id)!==0 &&events.length && !events.find(e=>parseInt(e.id)===parseInt(id)))){
            navigate('/')
        }
    },[events])

    useEffect(()=>{
        axios.get(`/api/v1/membredevenements/all/getEvents`).then(res=>{
            setEvents(res.data.data)
        })
        if((!loading && !isAuthenticated) || (parseInt(id)!==0 && events.length && !events.find(e=>parseInt(e.id)===parseInt(id)))){
            navigate('/')
        }
    },[id,user])
    return(
        <div className="chatBox">
            {
                loading?<Spinner/>: isAuthenticated && user.data &&
                <>
                    <ChatDashboard user={user.data} events={events}/>
                    <ChatRoom user={user.data} event={events.find(e=>parseInt(e.id)===parseInt(id))}/>
                </>
            }
        </div>

    );
}

const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps)(Chat);