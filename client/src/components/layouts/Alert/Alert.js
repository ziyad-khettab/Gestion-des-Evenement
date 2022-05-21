import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {useAlert} from "react-alert";
import {useEffect,useState} from "react";

const Alert = ({ alerts }) =>{
    const alert = useAlert()
    const [passedAlerts,setPassedAlerts] = useState([])
    useEffect(()=>{
        alerts.forEach(al=>{
            if(!(passedAlerts.find(e=>e.id===al.id))){
                if(al.alertType==='success')
                    alert.success(al.msg)
                else if(al.alertType==='danger')
                    alert.error(al.msg)
                setPassedAlerts([...passedAlerts,al])
            }
        })

    },[alerts])
    return  <></>;
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);