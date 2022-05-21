import axios from 'axios';
import './dashboard.css';
import { useEffect,useState } from 'react';
import CrudTable from './Crud/CrudTable';

const Clubs = ({loading,user}) =>{

    // inputs type and name depending on column
    //['file','Logo']
    const cols = [['text','id'],['text','Nom'],['text','Description'],['text','Abbreviation'],['file','Logo']];
    const [data,setData] = useState([])
    const [president,setPresident] = useState([])

    //x-auth-token inserted here cause of some weird expiration error with redux locally on my side
    useEffect(async () =>{
        if(!loading){
            console.log("currentusser",user)
            setPresident(user)
            if ( user !== null){
            try{
                const res = await axios.get('/api/v1/clubs')
                var data=[]
                res.data.data.forEach((row)=>{
                    row = Object.values(row)
                    row.pop()
                    row.pop()
                    data = [...data,row]
                })
                setData(data)
            }catch (err){
                if(err.response.data.msg)
                    alert.error(err.response.data.msg)
                else
                    alert.error("Problem encountered while connecting to the server")
            }
        }
    }
    },[loading,president])
    
    const title = "Clubs de L'ENSAT"
    const description = "Liste des clubs de l'école"

    return (

        <div className = "body-main-section">
            {   
                !loading && user !== null &&
                <>
                <div className = "main-table">
                    <div className = "main-table-card">
                    <h2>{title}</h2>
                    <p>{description}</p>
                    </div>
                    <CrudTable columns = {cols} data = {data} setData= {setData} model="clubs" />
                </div>
                </>
            }
        </div>
    )
}

const mapStatetoProps = (state) => ({
    loading:state.auth.loading,
    user:state.auth.user
})

export default Clubs