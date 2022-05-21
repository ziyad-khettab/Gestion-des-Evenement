import CrudTable from './Crud/CrudTable';
import { useEffect,useState } from 'react';
import './dashboard.css';
import axios from 'axios';
import { connect } from 'react-redux'



const Presidents = ({user,loading}) =>{
    
    // inputs type and name depending on column
    const cols = [['text','id_user'],['test','Username'],['text','id'],['text','Club']];
    const [data,setData] = useState([])

    useEffect(async () =>{
        try{

            const res = await axios.get('/api/v1/admin/allpresidents',{headers : {"Content-Type":"application/json"}})
            var data=[]
            res.data.data.forEach((row)=>{
                let user = Object.values(row.user)
                let userclub = Object.values(row.club)
                let newdata = [user[0],user[6],userclub[0],userclub[1]]
                data = [...data,newdata]
            })

            setData(data)
        }catch (err){
            if(err.response.data.msg)
                alert.error(err.response.data.msg)
            else
                alert.error("Problem encountered while connecting to the server")
        }
    },[loading])

    const title = "Presidents de L'ENSAT"
    const description = "Liste des présidents de chaque club dans l'école avec le club qui lui a été désigné"

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
                <CrudTable columns = {cols} data = {data} setData= {setData}  model="presidents" loading={loading} />
                </div>
                </>
            }
        </div>
    )
}

const mapStatetoProps = (state) => ({
    user:state.auth.user,
    loading:state.auth.loading
})

export default connect(mapStatetoProps)(Presidents);