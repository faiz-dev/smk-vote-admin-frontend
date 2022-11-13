import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BsPencil, BsPencilSquare, BsTrash } from "react-icons/bs";
import { useSelector } from "react-redux";
import { PrimaryButton } from "../../components/Button";
import { Input, Select } from "../../components/FormInput";
import { usePageTitle } from "../../hooks/usePageTitle";

const Periodes = () => {
    const [periodes, setPeriodes] = useState([])
    const apiUrl = useSelector((state) => state.layout.apiUrl)
    const [editPeriode, setEditPeriode] = useState(null)
    usePageTitle('Periodes')

    useEffect(() => {
        (async () => {
            const result = await axios.get(`${apiUrl}/periode`)
                .then(res => res.data)
                .catch(err => {
                    console.log(err)
                })
            setPeriodes(result)
        })()
    }, [])

    const handleOnCreated = (newPeriode) => {
        console.log(newPeriode)
        setPeriodes([...periodes, {...newPeriode}])
    }

    const openEdit = (id) => {
        const per = periodes.find(p => p.id == id)
        setEditPeriode(per)
    }

    const handleOnUpdated = (result) => {
        console.log(result)
        setPeriodes(periodes.map(p => {
            if (p.id != result.id) return p
            return {
                ...result
            }
        }))
    }

    const deletePeriode = async (id) => {
        const periode = periodes.find(p => p.id == id)
        const ask = confirm("Anda yakin akan menghapus Periode "+periode.name+"?")
        if (ask) {
            await axios.delete(`${apiUrl}/periode/${id}`)
                .then(_ => {
                    setPeriodes(periodes.filter(p => p.id != id))
                })
                .catch(err => {
                    console.log(err)
                    alert("Hapus Periode Gagal")
                })
        }
    }
    return (
        <div className="flex gap-4">
            <div className="w-2/5">
                {editPeriode ? 
                    <EditPeriode periode={editPeriode} className="mt-4" onUpdated={handleOnUpdated} onCancel={() =>setEditPeriode(null)}/> 
                    : <CreatePeriode onCreated={handleOnCreated} />}
            </div>
            <div className="w-full">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Daftar Periode</h3>
                    </div>
                    <div className="card-body">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Judul</th>
                                    <th>Aktif</th>
                                    <th>Groups</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {periodes.map((p, i) => (
                                    <tr key={p.id}>
                                        <td>{i + 1}</td>
                                        <td>{p.name}</td>
                                        <td>{p.isActive?"True":"False"}</td>
                                        <td>{p.groups}</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button
                                                    className="rounded border border-dashed  border-slate-500 p-2"
                                                    onClick={() => openEdit(p.id)}>
                                                    <BsPencilSquare />
                                                </button>
                                                <button
                                                    className="rounded border border-dashed  border-slate-500 p-2"
                                                    onClick={() => deletePeriode(p.id)}>
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

const CreatePeriode = ({onCreated}) => {
    const apiUrl = useSelector(state => state.layout.apiUrl)
    const [name, setName] = useState('')
    const [isActive, setIsActive] = useState(true)
    const [groups, setGroups] = useState('')

    const send = async () => {
        const result = await axios.post(`${apiUrl}/periode`, {
                    name, isActive, groups
                })
                .then(res => res.data)
                .catch(err => {
                    console.log(err)
                    return null
                })
        if (result != null) {
            onCreated(result)
        }
    }

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Tambah Periode</h3>
            </div>
            <div className="card-body">
                <Input label={'Nama Periode'} value={name} onChangeValue={setName} />
                <Select 
                    label={'Aktif?'} 
                    value={isActive} 
                    options={[{value:true, text: "Aktif"}, {value:false, text: "Tidak Aktif"}]}
                    onChangeValue={(val) => {setIsActive(val == "true" ? true : false)}}
                    />
                <Input label={'ID Groups'} value={groups} onChangeValue={setGroups} />
                <PrimaryButton onClick={send}>Simpan</PrimaryButton>
            </div>
        </div>
    )
}

const EditPeriode = ({periode, className, onUpdated, onCancel}) => {
    const apiUrl = useSelector(state => state.layout.apiUrl)
    const [name, setName] = useState('')
    const [isActive, setIsActive] = useState('')
    const [groups, setGroups] = useState('')

    useEffect(() => {
        (async () => {
            const result = await axios.get(`${apiUrl}/periode/${periode.id}`)
                .then(res => res.data)
            setName(result.name)
            setIsActive(result.isActive)
            setGroups(result.groups)
        })()
    }, [periode])

    const update = async () => {
        const result = await axios.put(`${apiUrl}/periode/${periode.id}`, {name, isActive, groupIds:groups})
            .then(res => res.data)
        console.log('d',result)
        onUpdated({...result,id: periode.id})
        onCancel()
    }

    return (
        <div className={`card ${className}`}>
            <div className="card-header">
                <h3 className="card-title">Edit Periode <i>"{periode.name}"</i></h3>
            </div>
            <div className="card-body">
                <Input label={'Nama Periode'} value={name} onChangeValue={setName} />
                <Select 
                    label={'Aktif?'} 
                    value={isActive} 
                    options={[{value:true, text: "Aktif"}, {value:false, text: "Tidak Aktif"}]}
                    onChangeValue={(val) => {setIsActive(val == "true" ? true : false)}}
                    />
                <Input label={'ID Groups'} value={groups} onChangeValue={setGroups} />
                <div className="flex gap-3">
                    <PrimaryButton onClick={update}>Simpan</PrimaryButton>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Periodes