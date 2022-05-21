import axios from 'axios'
import './modal.css'

const DeletePopUp = ({ handleClose, selectedRow, show, data,model, setData,president}) =>{
    const showHideClassName = show ? "modalr display-block" : "modalr display-none";

    const deleteClubs = async () => {
        const reqlink = '/api/v1/clubs/'+selectedRow[0];
        var newdata = data.filter(function(item) {
            console.log(item[0])
            console.log(selectedRow)
            return item[0] !== selectedRow[0]
        })
        console.log(newdata,'new data')
        
        await axios.delete(reqlink)
        setData(newdata)
    }

    const deletePresident = async () => {
        const reqlink = '/api/v1/roles/club/'+selectedRow[2]+'/deletePresident/'+selectedRow[0];
        try{
            const res = await axios.delete(reqlink)
            console.log(res)
            const restwo = await axios.get('/api/v1/admin/allpresidents',{headers : {"Content-Type":"application/json"}})
            var data=[]
                restwo.data.data.forEach((row)=>{
                    let user = Object.values(row.user)
                    let userclub = Object.values(row.club)
                    let newdata = [user[0],user[1],userclub[0],userclub[1]]
                    data = [...data,newdata]
                })
            setData(data)
        }catch(err){
            if(err.response.data.msg)
            alert.error(err.response.data.msg)
            else
            alert.error("Problem encountered while connecting to the server")
        }
    }

    const deleteEvenement = async (president) => {
        const club = president.data.club.id
        const reqlink = '/api/v1/clubs/'+club+'/evenements/'+selectedRow[0];
        try{
            const res = await axios.delete(reqlink)
            console.log(res)
            const restwo = await axios.get('/api/v1/clubs/'+club+'/evenements/all')
            var data=[]
            restwo.data.data.forEach((row)=>{
                let newdata = Object.values(row)
                newdata = [newdata[0],newdata[2],newdata[3],newdata[4]]
                data = [...data,newdata]
            })
            setData(data)
        }catch(err){
            if(err.response.data.msg)
            alert.error(err.response.data.msg)
            else
            alert.error("Problem encountered while connecting to the server")
        }
    }

    const deleteMembre = async (president) => {
        const club = president.data.club.id
        const reqlink = '/api/v1/membredevenements/'+club+'/'+selectedRow[0];
        try{
            const res = await axios.delete(reqlink)
            console.log(res)
            var newdata = data.filter(function(item) {
                console.log(item[0])
                console.log(selectedRow)
                return item[0] !== selectedRow[0]
            })
            console.log(newdata,'new data')
            setData(newdata)
        }catch(err){
            if(err.response.data.msg)
            alert.error(err.response.data.msg)
            else
            alert.error("Problem encountered while connecting to the server")
        }
    }


    const handleConfirm = async (e) =>{

        try{
            if ( model === "clubs" ){
                deleteClubs()
            }else if  ( model === "presidents" ){
                deletePresident()
            }else if ( model === "evenements"){
                deleteEvenement(president)
            }else if ( model === "membres"){
                deleteMembre(president)
            }

        }catch(err){
            if(err.response.data.msg)
                alert.error(err.response.data.msg)
            else
                alert.error("Problem encountered while connecting to the server")
        }
          
        handleClose()
    }
    return (
        <div className={showHideClassName}>
            <section className="modalr-main">
            <div className="modalr-wrapper">
                <span className="modalr-title">Est-ce que vous êtes sûr de supprimer cet enregistrement? </span>
                </div>
                <div className = 'modalr-buttons'>
                <button className = "modalr-button" type="button" onClick={handleClose}>Cancel</button>
                <button className = "modalr-button" type="button" onClick={() => { handleConfirm() }}>Delete</button>
                </div>
            </section>
        </div>
    )
}

export default DeletePopUp;