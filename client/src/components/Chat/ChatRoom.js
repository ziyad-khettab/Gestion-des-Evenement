import axios from 'axios'
import SocketClient from "../../utils/SocketClient";
import {useEffect, useState,useRef} from "react";
import './Style/ChatRoom.css'

const ChatRoom = ({user,event})=>{
    const socket = SocketClient.getSocket()
    const [sentOrReceived,setSentOrReceived] = useState('sent')
    const [messages,setMessages] = useState([])
    const [textInput, setTextInput] = useState("")
    const bottomOfChat = useRef(null)
    const [mssg,setMssg] = useState({})
    const [test,setTest] = useState(true)

    useEffect(()=>{
        socket.on('sendMessage',data=>{
            setSentOrReceived('received')
            setMssg(data)
        })
    },[])

    useEffect(()=>{
        if(sentOrReceived === 'received'){
            setMessages([...messages,mssg])
        }
    },[mssg])

    const onSubmit = e=>{
        e.preventDefault()
        setSentOrReceived('sent')
        setTextInput('')
        if(user){
            socket.emit('sendMessage',{
                id_user:user.id_user,
                id_evenement:event.id,
                contenue:textInput
            })
        }
        setMessages([
            ...messages,
            {
                user,
                id_evenement:event.id,
                contenue:textInput
            }
        ])
    }

    useEffect(()=>{
        setTest(!test)
    },[messages])

    useEffect(()=>{
        if(bottomOfChat.current)
            bottomOfChat.current.scrollIntoView({ behavior: "smooth" })
    },[test])

    useEffect(()=>{
        if(event){
            axios.get(`/api/v1/clubs/${event.id_club}/evenements/${event.id}/message`).then(res=>{
                setMessages(res.data.data)
            })
            socket.emit('join',{id_evenement:event.id})
        }
    },[user,event])

    return (
        <div className="chatRoom">
            {
                event && user &&
                <div className="container">
                    <div className="ChatMessage">
                        <div className="title">
                            <h3>Chat de l'évenement: {event.nom}</h3>
                            <span></span>
                        </div>
                        <div className="message">
                            {
                                messages.map(e => (
                                    <div key={e.id}
                                        className={`msg ${parseInt(user.id_user) === parseInt(e.user.id_user) ? 'you' : 'me'}`}>
                                        <div className="title-msg">
                                            <img
                                                src={e.user.profilepic}
                                                alt="profile picture"
                                            />
                                            <strong>{e.user.username}</strong>
                                        </div>
                                        <div className='paragraph'>
                                            <p>{e.contenue}</p>
                                        </div>
                                    </div>
                                ))
                            }
                            <span ref={bottomOfChat}/>
                        </div>
                    </div>
                    <form className="inputMessage" onSubmit={e=>onSubmit(e)}>
                        <input value={textInput} placeholder="Write Message" onChange={e=>setTextInput(e.target.value)}/>
                        <button type={'submit'}>Send</button>
                    </form>
                </div>
            }
        </div>
    );
};

export default ChatRoom;