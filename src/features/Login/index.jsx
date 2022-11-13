import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components/Button";
import { login as serviceLogin } from "../../services/AuthenticationService";
import { setRefreshToken, setToken, setRole } from "../../slicers/authSlice";

const Login = () => {
    const [username, setUsername] = useState('alfian@smkn1kandeman.sch.id')
    const [password, setPassword] = useState('1234')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const goToDashboard = () => {
        navigate('/')
    }

    const actionLogin = async () => {
        const authData = await serviceLogin('https://localhost:7153/api/Auth', username)
        dispatch(setToken(authData.token))
        dispatch(setRefreshToken(authData.refreshToken))
        dispatch(setRole(authData.role))

        setTimeout(() => {
            goToDashboard()
        },100)
    }

    return (
        <div className="w-[400px] border-2 rounded-md mx-auto mt-16 px-10 py-14">
            <h1 className="text-center text-lg mb-4">Sign In</h1>

            <Input
                label="Username"
                type="text"
                name="username"
                placeholder="username"
                value={username}
                onChangeValue={setUsername}
            />
            
            <PrimaryButton isBlock={true} size="" onClick={() => actionLogin()}>Submit</PrimaryButton>
        </div>
    )
}

const Input = ({label, name, type, placeholder ="", value, onChangeValue}) => {
    const change = (e) => {
        onChangeValue(e.target.value)
    }
    return (
        <div className="flex flex-col mb-4">
            <label className="text-sm">{label}</label>
            <input className="py-2 px-3 border rounded mt-2" 
                    type={type} 
                    name={name} 
                    placeholder={placeholder}
                    value={value}
                    onChange={e => onChangeValue(e.target.value)} />
        </div>
    )
}

export default Login