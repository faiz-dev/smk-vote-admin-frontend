import React, { useEffect, useState } from "react";
import { usePageTitle } from "../../hooks/usePageTitle";
import {Input} from '../../components/FormInput'
import {PrimaryButton} from '../../components/Button'
import { useSelector } from "react-redux";
import CreateGroup from "./CreateGroup";
import axios from "axios";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import EditGroup from "./EditGroup";

const Groups = () => {    
    usePageTitle('Groups')
    const apiUrl = useSelector(state => state.layout.apiUrl)
    const token = useSelector(state => state.auth.token)
    const [name, setName] = useState('')
    const [groups, setGroups] = useState([])
    const [reloadGroup, setReloadGroup] = useState(true)
    const [edit, setEdit] = useState(null)

    useEffect(() => {
        (async () => {
            const groups = await axios.get(`${apiUrl}/group`)
                .then(res => res.data)
            setGroups(groups)
        })()
    }, [reloadGroup])

    const handleOnCreated = (result) => {
        setGroups([...groups, result])
    }

    const handleOnUpdated = (result) => {
        setEdit(null)
        const groupIdx = groups.findIndex(g => g.id == result.id)
        groups[groupIdx].name = result.name
    }

    const openEdit = (id) => {
        const groupdata = groups.find(g => g.id == id)
        setEdit(groupdata)
    }

    const deleteGroup = async (id) => {
        const groupdata = groups.find(g => g.id == id)
        const result = confirm(`Anda yakin akan menghapus grup "${groupdata.name}"?`)
        if (result) {
            await axios.delete(`${apiUrl}/group/${id}`,{
                headers: {
                    "authorization": 'bearer '+token
                }
            })
                .then(res => res.data)
            setGroups(groups.filter(g => g.id != id))
        }
    }

    return (
        <div className="flex gap-4">
            <div className="w-1/3">
                <CreateGroup onCreated={handleOnCreated} />
                {edit ? (
                    <EditGroup 
                        group={edit}
                        onCancel={() => setEdit(null)} 
                        onUpdated={(result) => handleOnUpdated(result)}
                        className="mt-4"/>
                ) : ''}
            </div>
            <div className="w-full">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Daftar Group</h3>
                    </div>
                    <div className="card-body">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>ID</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groups.map((g, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{g.name}</td>
                                        <td>{g.id}</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button 
                                                    className="rounded border border-dashed  border-slate-500 p-2"
                                                    onClick={() => openEdit(g.id)}>
                                                    <BsPencilSquare />
                                                </button>
                                                <button 
                                                    className="rounded border border-dashed  border-slate-500 p-2"
                                                    onClick={() => deleteGroup(g.id)}>
                                                    <BsTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Groups