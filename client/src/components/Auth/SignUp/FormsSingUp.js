import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { MdAccountBox,MdPerson,MdEmail,MdAccountBalance } from  "react-icons/md";
import {RiLockPasswordFill } from "react-icons/ri"
import {BsTelephoneFill,BsFillPersonLinesFill} from "react-icons/bs"
import logo from './Logo2.png'
import {connect} from 'react-redux'
import {signup} from '../../../Redux/actions/auth'
import {useEffect, useState} from "react";
import {useAlert} from 'react-alert'
import {useNavigate} from "react-router-dom";

function FormsSingUp ({signup, isAuthenticated}){
    let navigate = useNavigate()
    const alert = useAlert()
    const [formData , setFormData ] = useState({
        nom:'',
        prenom:'',
        username:'',
        telephone:'',
        cin:'',
        email:'',
        motdepasse:''
    })

    const {nom,prenom,username,telephone,cin,email,motdepasse} = formData

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault()
        if (nom.length === 0 || prenom.length === 0 ||username.length === 0 ||
            telephone.length === 0 ||cin.length === 0 ||email.length === 0 ||
            motdepasse.length===0)
        {
            if(motdepasse.length<8 || motdepasse.length>25){
                alert.error('Mot de passe doit étre entre 8 et 25 caractére')
            }
            if(username.length>20)
                alert.error('Username too long')
            else
                alert.error('Fields cannot be empty')
        }
        else
        {
            signup(formData)
            navigate('/')
        }
    }
    useEffect(()=>{
        if(isAuthenticated){
            navigate('/')
        }
    },[isAuthenticated])
    return (
        <Form className="login-form"
            onSubmit={e=>handleSubmit(e)}
        >

            <div className="title">
                <h4 >Sign up</h4>
                <img className="Logo" src={logo} />
            </div>

            <div className="block">
                <FormGroup>
                    <Label>Nom</Label>
                    <Input
                        type="text"
                        name="nom"
                        onChange={e=>handleChange(e)}
                        value={formData.nom}
                        required={true}
                    />
                </FormGroup>
                <MdAccountBox className="person1" size="1.4em"/>

                <FormGroup>
                    <Label>Prenom</Label>
                    <Input
                        type="text"
                        name="prenom"
                        onChange={e=>handleChange(e)}
                        value={formData.prenom}
                        required={true}
                    />
                </FormGroup>
                <BsFillPersonLinesFill className="person2" size="1.4em" />
            </div>

            <div className="block">
                <FormGroup>
                    <Label>Username</Label>
                    <Input
                        type="text"
                        name="username"
                        onChange={e=>handleChange(e)}
                        value={formData.username}
                        required={true}
                    />
                </FormGroup>
                <MdPerson className="user" size="1.4em"/>

                <FormGroup>
                    <Label>Telephone</Label>
                    <Input
                        type="text"
                        name="telephone"
                        onChange={e=>handleChange(e)}
                        value={formData.telephone}
                        required={true}
                    />
                </FormGroup>
                <BsTelephoneFill className="tele" size="1em"/>
            </div>

            <FormGroup>
                <Label>CIN</Label>
                <Input
                    type="text"
                    name="cin"
                    onChange={e=>handleChange(e)}
                    value={formData.cin}
                    required={true}
                />
            </FormGroup>
            <MdAccountBalance className="cin" size="1em"/>

            <FormGroup>
                <Label>Email</Label>
                <Input
                    type="email"
                    name="email"
                    onChange={e=>handleChange(e)}
                    value={formData.email}
                    required={true}
                />
            </FormGroup>
            <MdEmail className="email" size="1em"/>

            <FormGroup>
                <Label>Password</Label>
                <Input
                    type="password"
                    name="motdepasse"
                    onChange={e=>handleChange(e)}
                    value={formData.motdepasse}
                    required={true}
                />
            </FormGroup>
            <RiLockPasswordFill className="pswd" size="1em"/>

            <Button
                className="btn-lg btn-dark btn-block botton"
                type={"submit"}
            >Sign Up</Button>
        </Form>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{signup})(FormsSingUp);