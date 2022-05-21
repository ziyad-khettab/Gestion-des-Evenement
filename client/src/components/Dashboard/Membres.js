import CrudTable from './Crud/CrudTable';
import { useEffect,useState } from 'react';
import './dashboard.css';
import axios from 'axios';
import { connect } from 'react-redux'


const Membres = ({user,loading}) =>{
    
    // inputs type and name depending on column
    const cols = [['text','id'],['test','Username'],['text','Evenement']];
    const [data,setData] = useState([])
    const [president,setPresident] = useState()

    useEffect(async () =>{
        try{

            if(!loading){
                console.log("currentusser",user)
                setPresident(user)
                if ( user !== null){
                    const res = await axios.get('/api/v1/membredevenements/'+president.data.club.id+'')
                    var data=[]
                    res.data.data.forEach((row)=>{
                        row = Object.values(row[0])
                        console.log("row here",row)
                        data = [...data,row]
                        console.log(data)
                    })
                    setData(data)
                }
            }
        }catch (err){
            console.log(err)
            // if(err.response.data.msg)
            //     alert.error(err.response.data.msg)
            // else
            //     alert.error("Problem encountered while connecting to the server")
        }
    },[loading,president])

    const title = "Membres des évènements de votre club"
    const description = "Liste des membres qui font partie d'un évènement"

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
                <CrudTable president = {president} columns = {cols} data = {data} setData= {setData}  model="membres" loading={loading} />
                </div>
                </>
            }
        </div>
    );
}

const mapStatetoProps = (state) => ({
    user:state.auth.user,
    loading:state.auth.loading
})

export default connect(mapStatetoProps)(Membres);