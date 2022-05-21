import React, {useState} from 'react'
import {useEffect} from "react"
import axios from 'axios'
import Spinner from "../layouts/Spinner/Spinner";
import {useAlert} from "react-alert";
import EvenementCard from "./EvenementCard"
import AcceuilHeader from "./AcceuilHeader";
import {Link} from "react-router-dom";
import Footer from "../layouts/Footer/Footer"


const Acceuil = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const alert = useAlert()

    useEffect(async ()=>{
        try{
            const res = await axios.get('/api/v1/clubs/all/evenements')
            setEvents(res.data.data)
            setLoading(false)
        }catch (err){
            if(err.response.data.msg)
                alert.error(err.response.data.msg)
            else
                alert.error("Problem encountered while connecting to the server")
        }

    },[])

    return (
        <div style={{width:"100%",height:"100%", background:"#eaeaea"}} >
            <AcceuilHeader/>
            {
                loading?<Spinner/>:
                <ul id="events" className={"cards"}>
                { events.length === 0 ? <h2 style={{'textAlign':'center'}}>pas d'événements pour l'instant</h2> :
                    events.map(event => (
                        <li key={event.id}>
                            <Link to={`/evenement/${event.id}`}><EvenementCard event={event}/></Link>
                        </li>
                    ))
                }
                </ul>
            }
        </div>
    );
};

export default Acceuil;