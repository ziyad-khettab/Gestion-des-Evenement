import { useEffect,useState } from 'react';
import CrudTable from './Crud/CrudTable';
import { connect } from 'react-redux';
import axios from 'axios';
import './dashboard.css';

const Evenements = ({user,loading}) =>{
    
    // this was copy pasted and still nothing done here.
    const [president,setPresident] = useState()
    const cols = [['text','id'],['text','Nom'],['text','Description'],['date','Date'],['file','Logo']]
    const [data,setData] = useState([]);
    const title = "Evenements de votre club"
    const description = "Ici la liste des évènements de votre club"

    useEffect(async ()=>{
        if(!loading){
            console.log("currentusser",user)
            setPresident(user)
            if ( user !== null){
                const res = await axios.get('/api/v1/clubs/'+president.data.club.id+'/evenements/all')
                console.log("req result" ,res)
                var data=[]
                res.data.data.forEach((row)=>{
                    let newdata = Object.values(row)
                    newdata = [newdata[0],newdata[2],newdata[3],newdata[4],newdata[5]]
                    data = [...data,newdata]
                })
                console.log(data)
                setData(data);
            }
        }
    },[loading,president])

    return (

        <div className = "body-main-section">
            {
                !loading && user  && data !== null?
            <div className = "main-table">
                <div className = "main-table-card">
                <h2>{title}</h2>
                <p>{description}</p>
                </div>
                <CrudTable president = {president} columns = {cols} setData ={setData} data = {data} model="evenements" />
            </div>
            : <></>
            }
        </div>
    )
}

const mapStatetoProps = (state) => ({
    user:state.auth.user,
    loading:state.auth.loading
})

export default connect(mapStatetoProps)(Evenements);