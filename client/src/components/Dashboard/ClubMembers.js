import CrudTable from './Crud/CrudTable';
import './dashboard.css';


const ClubMembers = () =>{
    
    // this was copy pasted and still nothing done here.

    const cols = ['id','Username','Nom','Prenom']
    const data = [['1','U1','N1','P1 smt'],['2','U1','N1','P1 smt']]
    const title = "Presidents de L'ENSAT"
    const description = "Description ..."

    return (

        <div className = "body-main-section">
            <div className = "main-table">
                <div className = "main-table-card">
                <h2>{title}</h2>
                <p>{description}</p>
                </div>
                <CrudTable columns = {cols} tabledata = {data} model="membres"  />
            </div>
        </div>
    )
}

export default ClubMembers;