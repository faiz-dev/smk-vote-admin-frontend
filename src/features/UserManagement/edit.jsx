import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PrimaryButton } from "../../components/Button";
import { Input, Select } from "../../components/FormInput";

const EditUser = () => {
    const apiUrl = useSelector(state => state.layout.apiUrl)
    const {id} = useParams()
    const [user, setUser] = useState(null)
    const roles = [
        'USER', 'ADMIN', 'GURU', 'SISWA'
    ]
    const [groups, setGroups] = useState([])
    const navigate = useNavigate()
    const [selectedGroup, setSelectedGroup] = useState("")

    useEffect(() => {
        (async () => {
            const result = await axios.get(`${apiUrl}/user/${id}`)
                    .then(res => res.data)
                    .catch(err => {
                        console.log(err)
                    })
            setUser(result)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const groups = await axios.get(`${apiUrl}/group`)
                .then(res => res.data)
            setGroups(groups)
        })()
    }, [])

    // if (user == null ) return (
    //     navigate('/notfound')
    // )

    const handlingOnSubmit = async () => {
        const result = await axios.put(`${apiUrl}/user/${id}`, {
            email: user.email,
            name: user.name,
            role: user.role,
            groupId: user.group
        })
                        .then(res => res.data)
        setUser(result)
    }

    if (user == null) return (<div>Loading...</div>)
    
    return(
        <div className="card w-1/2">
            <div className="card-header">
                <h3 className="card-title">Edit Data User {id}</h3>
            </div>
            <div className="card-body">
                <Input
                    label={'Email'}
                    value={user.email}
                    onChangeValue={(val) => setUser({...user, email:val})}
                    type="email"
                    vertical={true} />
                
                <Input
                    label={'Name'}
                    value={user.name}
                    onChangeValue={(val) => setUser({...user, name:val})}
                    type="text"
                    vertical={true} />
                
                <Select
                    label={'Role'}
                    onChangeValue={(val) => setUser({...user, role: parseInt(val)})}
                    value={user.role}
                    options={roles.map((r,i) => ({text: r, value: parseInt(i)}))} 
                />
                <Select 
                    label={'Pilih Grup'}
                    onChangeValue={val => setUser({...user, group: parseInt(val)})}
                    value={user.group == null ? "": user.group.id}
                    vertical={true}
                    options={groups ? groups.map(g => ({value: g.id, text: g.name})) : []}
                    />

                    <PrimaryButton onClick={handlingOnSubmit}>Simpan</PrimaryButton>
            </div>
        </div>
    )
}

export default EditUser