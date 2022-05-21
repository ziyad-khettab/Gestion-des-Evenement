import './sidebar.css';

const Button = ({text,icon,style,link}) =>{
    return (
        <button className="side-bar-button" style={{style}} >
            <div className="side-bar-button-icon">
            {icon}
            </div>
            <a href = {link} >{text}</a>
        </button>
    )
}

export default Button;