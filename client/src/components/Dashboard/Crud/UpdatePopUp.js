import axios from 'axios';
import { useState, useEffect ,Fragment } from 'react';
import './modal.css'

const UpdatePopUp = ({ handleClose, cols, selectedRow, show, model,data, setData, president,loading}) =>{
    const showHideClassName = show ? "modalr display-block" : "modalr display-none";

    const [clubs, setClubs] = useState([]);
    const [values,setValues] = useState([]);
    useEffect(()=>{console.log("in update use effect président => " , president)},[loading]);
    
    useEffect( async () => { 
        var inputs = [];
        for(let i = 0 ; i < cols.length ;i++){
            inputs[i]={
                column:cols[i],
                data:selectedRow[i]
            }
        } 
        setValues(inputs)

        //if i want to assign a president to a specific club im gonna list the clubs
        if( model == 'presidents'){
            const res = await axios.get('/api/v1/clubs')
            setClubs(res.data.data)
        }

    }, [show])
        

    const updateClubs = async (body,newdata) => {
        const reqlink = '/api/v1/clubs/'+selectedRow[0]
        try{
            const res = await axios.put(reqlink,body,{ headers : { "Content-Type":"application/json"} })
            setData(newdata)
        }catch (err){
            if(err.response.data.msg)
                alert.error(err.response.data.msg)
            else
                alert.error("Problem encountered while connecting to the server")
        }
    }

    const updatePresident = async (body,newdata) => {
        const reqlink = '/api/v1/roles/'+body["id_user"]+'/updatePresident'
        try{
            const res = await axios.put(reqlink,body, { headers : { "Content-Type":"application/json" }})
            console.log(res)
            setData(newdata)
        }catch (err){
            if(err.response.data.msg)
                alert.error(err.response.data.msg)
            else
                alert.error("Problem encountered while connecting to the server")
        }
    }

    const updateEvenement = async (body,president,newdata) => {
            const club = president.data.club.id
            const reqlink = '/api/v1/clubs/'+club+'/evenements/'+selectedRow[0]
        try{
            const res = await axios.put(reqlink ,body , { headers : { "Content-Type":"application/json"}})
            setData(newdata)
        }catch (err){
            if(err.response.data.msg)
                alert.error(err.response.data.msg)
            else
                alert.error("Problem encountered while connecting to the server")
        }
    }

    //je ne vois pas l'interêt 
    // const updateMembre = async (body,president,newdata) => {
    //     const club = president.club.id
    //     const reqlink = '/api/v1/roles/club/'+club
    //     try{
    //         const res = await axios.post(reqlink ,body , { headers : { "Content-Type":"application/json"}})
    //         setData(newdata)
    //     }catch (err){
    //         if(err.response.data.msg)
    //             alert.error(err.response.data.msg)
    //         else
    //             alert.error("Problem encountered while connecting to the server")
    //     }
    // }


    if (show){
        const handleConfirm = async (e) => {
            var body = {} 
            for(let i = 0 ; i < values.length ; i++){
                console.log("value "+ i + " is : " + values[i].data)
                body[cols[i][1].toLowerCase()] = values[i].data
            }

            const newdata = data.map( (row)=>{
                if(row[0]===body[cols[0][1]])
                    row = Object.values(body)
                return row
            })

            console.log("new data",newdata)
            console.log("body of the request",body)

            try{

                if ( model === "clubs" ){
                    updateClubs(body,newdata)
                }else if  ( model === "presidents" ){
                    updatePresident(body,newdata)
                }else if ( model === "evenements"){
                    updateEvenement(body,president,newdata)
                }

            }catch(err){
                if(err.response.data.msg)
                    alert.error(err.response.data.msg)
                else
                    alert.error("Problem encountered while connecting to the server")
            }

            setValues([])
            handleClose()
        }


        const onTodoChange = (target) => {
            var name = target.name
            var input = target.value
            console.log(input," hhh ",name)
            console.log(target," target is ")
            var tmp = values.map( (value) =>{
                if (value.column[1] === name)
                    value.data = input
                return value
            })
            setValues(tmp)
        }
    
        const handlePhotos = (e) => {
            const image = e.files[0]
            console.log(e.files[0])
            let base64String = ""
            var reader = new FileReader()
            reader.readAsDataURL(image);
            reader.onload = function () {
                console.log(reader.result);
                base64String = reader.result;
                let obj = {
                    column : ['file','logo'],
                    data : base64String
                }
                const nopvalues = values.map( (val)=>{
                    if( val['column'][1] == 'Logo')
                        val = obj
                    return val
                })
                console.log(nopvalues)
                setValues(nopvalues);

            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }

        return (
            <div className={showHideClassName}>
                <section className="modalr-main">
                    <span className="modalr-title" >Mise à jour du {model.slice(0,-1)}</span>
                    <div>
                    {
                        values.map((i)=>{
                            if ( i.column[1] != 'id' && i.column[1] != 'id_user' )
                                if (i.column[1] == 'Club' && model === 'presidents'){
                                    return(
                                            <div className="modalr-wrapper">
                                                    <label className="modalr-label" htmlFor="club">Club</label>
                                                    <select onChange={e => onTodoChange(e.currentTarget)} name="id" id="clubs">
                                                        {clubs.map((club)=>{
                                                            return ( <option value={club['id']}>{club['abbreviation']}</option>)
                                                        })}
                                                    </select>
                                            </div>
                                        )
                                }else if ( i.column[1]=='Logo') {
                                    return(
                                        <div className="modalr-wrapper">
                                        <label className="modalr-label" htmlFor={cols[4][1]}>{cols[4][1]}</label>
                                        <input key={values[cols[4]]} onChange={e => handlePhotos(e.target)} className="modalr-input" accept="image/png, image/jpeg" type="file" name={values[4]['column'][1]} required/>
                                        </div>
                                        )
                                }else{
                                    return(
                                    <div className="modalr-wrapper">
                                        <label className="modalr-label" htmlFor={i.column[1]}>{i.column[1]}</label>
                                        <input key={values[cols[0]]} onChange={e => onTodoChange(e.currentTarget)} className="modalr-input" type={i.column[0]} name={i.column[1]} defaultValue={i.data}/>
                                    </div>)
                                }
                        })
                    }
                    </div>
                    <div className = 'modalr-buttons'>
                    <button className="modalr-button" type="button" onClick={() => {handleClose()} }>Cancel</button>
                    <button className="modalr-button" type="button" onClick={() => {handleConfirm()} }>Confirm</button>
                    </div>
                </section>
            </div>
        )

    }else{
        return (
            <div></div>
        )
    }

}

export default UpdatePopUp;