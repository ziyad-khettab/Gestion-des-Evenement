import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import {useAlert} from "react-alert";
import imageToBase64 from '../../../utils/imageToBase64';

import './modal.css'

const AddPopUp = ({ handleClose, cols, show, model,data, setData, president}) =>{

    const showHideClassName = show ? "modalr display-block" : "modalr display-none";
    const [values,setValues] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [users,setUsers] = useState([]);
    const [evenements,setEvenements] = useState([]);
    const alert = useAlert()


    useEffect(async () => { 
        var inputs = [];
        for(let i = 0 ; i < cols.length ;i++){
            inputs[i]={
                column:cols[i],
                data:""
            }
        } 

        
        if ( model === 'membres'){
            inputs =[];
                if (model == 'membres'){
                inputs[0]={
                    column:['text','id_user'],
                    data:""
                }
                inputs[1]={
                    column:['text','id_evenement'],
                    data:""
                }
            }
        }

        setValues(inputs)
        console.log('set values : ', values)


        //if i want to assign a president to a specific club im gonna list the clubs
        if( model == 'presidents'){
            try{
                const res = await axios.get('/api/v1/clubs')
                setClubs(res.data.data)
                const restwo = await axios.get('/api/v1/users/all')
                setUsers(restwo.data.data)
            }catch (err){
                if(err.response.data.msg)
                    alert.error(err.response.data.msg)
                else
                    alert.error("Problem encountered while connecting to the server")
            }
        }

        if (model == 'membres'){
            try{
                const res = await axios.get('/api/v1/clubs/'+president.data.club.id+'/evenements/all')
                setEvenements(res.data.data)
                const restwo = await axios.get('/api/v1/users/all')
                setUsers(restwo.data.data)
            }catch(err){
                if(err.response.data.msg)
                    alert.error(err.response.data.msg)
                else
                    alert.error("Problem encountered while connecting to the server")
            }
        }
        
    }, [show])


    const addClubs = async (body) => {
        const reqlink = '/api/v1/clubs/'
        try{
            const res = await axios.post(reqlink,body
                ,{ headers : { "Content-Type":"application/json"}})
            var newclub = Object.values(res.data.data)
            newclub.pop() // removing that createdat
            newclub.pop() //removing that updatedat
            data = [...data,newclub]
            setData(data)
        }catch (err){
            if(err.response.data.msg)
                alert.error(err.response.data.msg)
            else
                alert.error("Problem encountered while connecting to the server")
        }
    }

    const addPresident = async (body) => {
        const reqlink = '/api/v1/roles/club/'+body['id']+'/addPresident'
        const user = { 'id_user':body['id_user'] }
        try{
            const res = await axios.put(reqlink,user, { headers : { "Content-Type":"application/json" }})        
            const restwo = await axios.get('/api/v1/admin/allpresidents',{headers : {"Content-Type":"application/json"}})
            let data=[]
            restwo.data.data.forEach((row)=>{
                let user = Object.values(row.user)
                let userclub = Object.values(row.club)
                let newdata = [user[0],user[1],userclub[0],userclub[1]]
                data = [...data,newdata]
            })
            setData(data)
        }catch (err){
            if(err.response.data.msg)
                alert.error(err.response.data.msg)
            else
                alert.error("Problem encountered while connecting to the server")
        }
    }

    const addEvenement = async (body,president) => {
        const club = president.data.club.id
        const reqlink = '/api/v1/clubs/'+club+'/evenements'
        try{
            const res = await axios.post(reqlink ,body , { headers : { "Content-Type":"application/json"}})
            var newEvenement = Object.values(res.data.data)
            newEvenement.pop()
            newEvenement.pop()
            newEvenement.pop()
            data = [...data,newEvenement]
            setData(data)
        }catch (err){
            if(err.response.data.msg)
                alert.error(err.response.data.msg)
            else
                alert.error("Problem encountered while connecting to the server")
        }
    }

    const addMembre = async (body,president) => {
        const club = president.data.club.id
        const user = body['id_user'] 
        const evenement = body['id_evenement']
        console.log('body',body)
        const reqlink = '/api/v1/membredevenements/'+club+'/'+user+'/evenements/'+evenement+'';
        try{
            await axios.post(reqlink, { headers : { "Content-Type":"application/json"}})
            const res = await axios.get('/api/v1/membredevenements/'+president.data.club.id+'')
            var data=[]
                    res.data.data.forEach((row)=>{
                        row = Object.values(row[0])
                        console.log("row here",row)
                        data = [...data,row]
                        console.log(data)
                    })
            setData(data)
        }catch (err){
            if(err.response.data.msg)
                alert.error(err.response.data.msg)
            else
                alert.error("Problem encountered while connecting to the server")
        }
    }
        
    if (show){
        const handleConfirm = async (e) => {
            
            var body = {}
            console.log("values to be set in body",values)
            for(let i = 1 ; i < values.length ; i++){
                body[cols[i][1].toLowerCase()] = values[i].data
            }
            
            if( model === "presidents"){
                body[cols[0][1].toLowerCase()] = values[0].data
            }
            
            if ( model === "membres"){
                body = [];
                body['id_user'] = values[0].data
                body['id_evenement'] = values[1].data
            }


            console.log("reqest body", body)

            try{
                if ( model === "clubs" ){
                    addClubs(body)
                }else if  ( model === "presidents" ){
                    addPresident(body)
                }else if ( model === "evenements"){
                    addEvenement(body,president)
                }else if ( model === "membres"){
                    addMembre(body,president)
                }
            }catch(err){
                if(err.response.data.msg)
                    alert.error(err.response.data.msg)
                else
                    alert.error("Problem encountered while connecting to the server")
            }
            handleClose()
        }

        const onTodoChange = (target) => {
            var name = target.name
            var input = target.value
            var tmp = values.map( (value) =>{
                if (value.column[1] === name)
                    value.data = input
                return value
            })
            setValues(tmp)
            console.log('set values : ', values)
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
                    <span className="modalr-title" >Ajout d'un {model.slice(0,-1)}</span>
                    <div>
                    {
                        values.map((i)=>{
                            if ( i['column'][1] != 'id' && model !='presidents' && model !='membres' && model !='evenements')

                            return(
                            <div className="modalr-wrapper">
                                <label className="modalr-label" htmlFor={i.column[1]}>{i.column[1]}</label>
                                { i.column[0] != 'file' ?
                                    <input key={values[cols[0]]} onChange={e => onTodoChange(e.currentTarget)} className="modalr-input" type={i.column[0]} name={i.column[1]} required/>
                                    :
                                    <input key={values[cols[0]]} onChange={e => handlePhotos(e.target)} className="modalr-input" accept="image/png, image/jpeg" type={i.column[0]} name={i.column[1]} required/>
                                }
                            </div>)
                        })
                    }
                    { model === 'evenements'?
                        <Fragment>
                            <div className="modalr-wrapper">
                            <label className="modalr-label" htmlFor={cols[1][1]}>{cols[1][1]}</label>
                            <input key={values[cols[1]]} onChange={e => onTodoChange(e.currentTarget)} className="modalr-input" type={values[1]['column'][0]} name={values[1]['column'][1]} required/>
                            </div>
                            <div className="modalr-wrapper">
                            <label className="modalr-label" htmlFor={cols[2][1]}>{cols[2][1]}</label>
                            <input key={values[cols[2]]} onChange={e => onTodoChange(e.currentTarget)} className="modalr-input" type={values[2]['column'][0]} name={values[2]['column'][1]} required/>
                            </div>
                            <div className="modalr-wrapper">
                            <label className="modalr-label" htmlFor={cols[3][1]}>{cols[3][1]}</label>
                            <input key={values[cols[3]]} onChange={e => onTodoChange(e.currentTarget)} className="modalr-input" type={values[3]['column'][0]} name={values[3]['column'][1]} required/>
                            </div>
                            <div className="modalr-wrapper">
                            <label className="modalr-label" htmlFor={cols[4][1]}>{cols[4][1]}</label>
                            <input key={values[cols[4]]} onChange={e => handlePhotos(e.target)} className="modalr-input" accept="image/png, image/jpeg" type="file" name={values[4]['column'][1]} required/>
                            </div>
                        </Fragment>
                        :
                        <Fragment></Fragment>
                    }
                    { model === 'presidents' ?
                            <Fragment>
                                <div className="modalr-wrapper">
                                    <label className="modalr-label" htmlFor="user">Utilisateurs</label>
                                    <select onChange={e => onTodoChange(e.currentTarget)} name="id_user" id="clubs">
                                                     <option value=""></option>
                                        {users.map((user)=>{
                                            return ( <option value={user['id_user']}>{user['username']}</option>)
                                        })}
                                    </select>
                                </div>
                                <div className="modalr-wrapper">
                                        <label className="modalr-label" htmlFor="club">Club</label>
                                        <select onChange={e => onTodoChange(e.currentTarget)} name="id" id="clubs">
                                                        <option value=""></option>
                                            {clubs.map((club)=>{
                                                return ( <option value={club['id']}>{club['abbreviation']}</option>)
                                            })}
                                        </select>
                                </div>
                            </Fragment>
                        :
                            <Fragment></Fragment>
                    }
                    {
                        model === 'membres' ?
                        <Fragment>
                            <div className="modalr-wrapper">
                                <label className="modalr-label" htmlFor="user">Utilisateurs</label>
                                <select onChange={e => onTodoChange(e.currentTarget)} name="id_user" id="clubs">
                                                 <option value=""></option>
                                    {users.map((user)=>{
                                        return ( <option value={user['id_user']}>{user['username']}</option>)
                                    })}
                                </select>
                            </div>
                            <div className="modalr-wrapper">
                                    <label className="modalr-label" htmlFor="club">Evenements</label>
                                    <select onChange={e => onTodoChange(e.currentTarget)} name="id_evenement" id="clubs">
                                                     <option value=""></option>           
                                        {evenements.map((evenement)=>{
                                            return ( <option value={evenement['id']}>{evenement['nom']}</option>)
                                        })}
                                    </select>
                            </div>
                        </Fragment>
                    :
                        <Fragment></Fragment>
                    }
                    </div>
                    <div className = 'modalr-buttons'>
                    <button className="modalr-button" type="button" onClick={() => {handleClose()} }>Cancel</button>
                    <button className="modalr-button" type="button" onClick={(e) => {handleConfirm(e)} }>Confirm</button>
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

export default AddPopUp;