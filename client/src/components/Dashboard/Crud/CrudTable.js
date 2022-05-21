import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import React, {useEffect, useState} from 'react';
import DeletePopUp from './DeletePopUp';
import UpdatePopUp from './UpdatePopUp';
import AddPopUp from './AddPopUp';
import { Fragment } from 'react';

import './table.css';

const CrudTable = ({columns,model,data,setData,president,loading}) => {


    const [showUpdate,setShowUpdate] = useState(false);
    const [showDelete,setShowDelete] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [cols,setCols] = useState(columns)

    // testing shit
    var [selectedRow,setSelectedRow] = useState([]);

    const handleClose = () =>{
        setShowUpdate(false);
        setShowDelete(false);
        setShowAdd(false);
    }

    const handleEdit = (e) =>{
        selectedRow = data.filter((element) => element[0]==e.currentTarget.id)
        setSelectedRow(selectedRow[0])
        setShowUpdate(true);
    }

    const handleDelete = (e) =>{
        selectedRow = data.filter((element) => element[0]==e.currentTarget.id)
        setSelectedRow(selectedRow[0])
        setShowDelete(true);
    }

    const handleAdd = () =>{
        setShowAdd(true);
    }
    

    return(
        <div>
            
            <div>
                {
                    model !== 'membres' && model !=='presidents' ?
                    <Fragment>
                    <UpdatePopUp president = {president} show={showUpdate} cols = {cols} selectedRow={selectedRow} setData = {setData} data= {data}  handleClose={handleClose} model={model}/>
                    </Fragment>
                    :
                    <Fragment></Fragment>
                }
                <DeletePopUp president = {president} data= {data} setData = {setData}  model = {model} show={showDelete} selectedRow={selectedRow} handleClose={handleClose} />
                <AddPopUp president = {president} data= {data} setData = {setData} show = {showAdd} cols = {cols} handleClose ={handleClose} model = { model }/>
            </div>  

            <table className="styled-table" id="crudtable">
                <thead>
                <tr id = "crud-table-title" key={model} >
                    { cols.map(prop => {
                        return ( <th key={prop[1]} > {prop[1]} </th> )
                    })}
                    <th key={`${Math.floor((Math.random() * 1000))}-min`} >Action</th>
                </tr>
                </thead>

                <tbody>
                    {   
                        data.map(prop => {
                            return ( 
                                <tr key={prop[0]} className="active-row" >
                                    {prop.map( (prop,index) => {
                                        if(index === 4){
                                        return (<td key={`${Math.floor((Math.random() * 1000))}-min`}><img className ="crud-logo" src = {prop} alt ="logo"/></td>)
                                        }else{
                                        return (<td key={`${Math.floor((Math.random() * 1000))}-min`}>{prop}</td>)
                                        }
                                        }) 
                                    }
                                <td key={prop[0]} > 
                                {
                                    model !== 'membres' && model !=='presidents' ?
                                    <Fragment>
                                    <button id ={prop[0]} className = "crud-button" onClick={(e) => {handleEdit(e)}} ><EditIcon sx={{ color : 'yellow'}} /></button>
                                    </Fragment>
                                    :
                                    <Fragment>
                                    </Fragment>
                                }
                                <button id ={prop[0]} className="crud-button" onClick={(e) => {handleDelete(e)}}><DeleteIcon  sx = {{ color : 'red'}}/></button>
                                </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            
            <button className="crud-add-button" onClick={(e) => {handleAdd()}}>ADD &nbsp;<AddBoxIcon sx={{  width:'30px', height:'30px'}} /> </button>
                
        </div>
    )
}

export default CrudTable;