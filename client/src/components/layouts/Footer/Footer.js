import './Footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';


const Footer = () =>{
return (
  <div className="footer">
      <div className ="footer-links">
        <span>
            Ecole Nationale des Sciences Appliquées de Tanger
            © All Right Reserved by Ensat Clubs &nbsp; &nbsp; &nbsp; &nbsp;
        </span>
        <a><InstagramIcon sx = {{ color: 'rgb(131, 58, 180)'}}/> </a>
        <a>&nbsp;<FacebookIcon sx = {{ color : '#4267B2'}}/> </a>
      </div>
  </div>

);
}

export default Footer;