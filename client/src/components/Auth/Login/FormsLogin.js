import {Button,Form,FormGroup,Label,Input} from 'reactstrap';
import { connect } from 'react-redux'
import {login} from '../../../Redux/actions/auth'
import {useEffect, useState} from "react";
import logo from './Logo2.png'
import {useNavigate} from "react-router-dom";

function FormsLogin({login,isAuthenticated}){
    let navigate = useNavigate()
    const [formData,setFormData] = useState({
        email:'',
        password:''
    })

    const {email, password} = formData

    const handleChange = e => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit = e =>{
        e.preventDefault()
        console.log(email,password)
        login(email,password)
    }
    useEffect(()=>{
        if ( isAuthenticated )
        {
            navigate('/')
        }
    },[isAuthenticated])

    return(
        <Form
            onSubmit={e=>handleSubmit(e)}
            className="login-form"
        >
            <img
                className="Logo"
                src={logo}
            />
            <FormGroup>
                <Label for={"email"}>Email</Label>
                <Input
                    onChange={e=>handleChange(e)}
                    type="email"
                    name="email"
                    value={formData.email}
                />
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input
                    onChange={e=>handleChange(e)}
                    type="password"
                    name="password"
                    value={formData.password}
                />
            </FormGroup>
            <Button
                className="botton"
                type={"submit"}
            >Log in</Button>
        </Form>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{login})(FormsLogin);