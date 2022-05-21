import {useState} from 'react'
import {useEffect} from "react"
import axios from 'axios'
import {useAlert} from "react-alert";
import Spinner from "../layouts/Spinner/Spinner";
import Moment from 'react-moment';
import {Link, useParams} from 'react-router-dom';
import EvenementCard from '../Acceuil/EvenementCard';
import './Evenement.css';
import '../Acceuil/styleSheets/EvenementCard.css';

const Evenement = () => {
    const [evenement, setEvenement] = useState({
        nom:"",
        description:"",
        date:null
    })
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true)
    const alert = useAlert()
    const {id} = useParams()

    useEffect(()=>{
        const callAPI = async ()=>{
            try{
                const res = await axios.get(`/api/v1/clubs/all/evenements/${id}`)
                const resAll = await axios.get('/api/v1/clubs/all/evenements');
                setEvenement(res.data.data);
                setEvents(resAll.data.data.slice(0,3));
                setLoading(false)
            }catch (err){
                if(err.response.data.msg)
                    alert.error(err.response.data.msg)
                else
                    alert.error("Problem encountered while connecting to the server")
            }
    
        }
        callAPI()
    },[id])
    return (
        <div className='main-container'>

            {
                loading?<Spinner/>:
                    <div className = "EvenementDetail">
                        <div className = "evenementHeader">
                            <h1>{evenement.nom}</h1>
                            <h3><Moment format='DD/MM/yyyy'>{evenement.date}</Moment></h3>
                            <h2>Organisé par Computer science club</h2>
                            {/* HARDCODED SHIT NEEDS TO BE FIXED */}
                            <div className = "countdown">

                            </div>
                        </div>
                        <div className = "evenementDescription" id ="about-container">
                            <div >
                                <h2>About The Event</h2>
                                <p>{evenement.description}</p>
                            </div>
                            <div className ="evenement-image">
                                <img className="img" src={evenement.logo} alt="evenement logo" />
                            </div>
                        </div>
                        <ul id={"events"} className={"cards"}>
                            {
                                events.map(event => {
                                    if (id !== event.id)
                                    return(
                                    <li key={event.id}>
                                        <Link to={`/evenement/${event.id}`}><EvenementCard event={event}/></Link>
                                    </li>)
                                })
                            }
                        </ul>
                    </div>

            }
        </div>
    );
}
export default Evenement;