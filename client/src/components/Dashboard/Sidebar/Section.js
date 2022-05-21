import Button from './Button';
import {Link} from 'react-router-dom'
import './sidebar.css';

const Section = ({title, props}) =>{     

    return (
        <div>
            <h3 className = "section-title" > {title} </h3>
            { props.map(prop => {
                return ( <Link style={{textDecoration:'none'}} to={prop[3]}><Button text={prop[0]} icon={ prop[1]} style ={ prop[2] }  key={prop[4]}/></Link> )
              })
            }
        </div>
    )
}

export default Section;