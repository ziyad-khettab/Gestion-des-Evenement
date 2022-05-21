import FormsLogin from './FormsLogin';
import ImageLogin from './ImageLogin';
import './Login.css'

function Login(){
    return(
        <div className='All'>
            <div className="Container">
                <ImageLogin/>
                <div className="Forms">
                    <FormsLogin />
                </div>
            </div>
        </div>
    )
}

export default Login;