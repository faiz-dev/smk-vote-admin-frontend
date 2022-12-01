import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { PrimaryButton } from "../../components/Button";
import { Input, Select } from "../../components/FormInput";
import { usePageTitle } from "../../hooks/usePageTitle";
import { BsPencil, BsTrash } from 'react-icons/bs';
import { useGetGroup } from "../../hooks/useGetGroup";
import CsvUploader from "./CsvUploader";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
    const apiUrl = useSelector((state) => state.layout.apiUrl)
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState('')
    const [userSearch, setUserSearch] = useState(null)
    const [groups, setGroups] = useState([]) 
    const [selectedGroup, setSelectedGroup] = useState("")
    const [usersGroup, setUsersGroup] = useState([])
    const roles = ['USER', 'ADMIN', 'GURU', 'SISWA']
    const token = useSelector(state => state.auth.token)

    useEffect(() => {
        (async () => {
            const groups = await axios.get(`${apiUrl}/group`)
                .then(res => res.data)
            setGroups(groups)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            if(selectedGroup != ""){
                const users = await axios.get(`${apiUrl}/User/group/${selectedGroup}`)
                    .then(res => res.data)
                setUsersGroup(users)
            }
        })()
    }, [selectedGroup])

    usePageTitle('User Management')

    const goToEdit = (id) => {
        navigate(`${id}`)
    }

    const deleteGroup = async (id) => {
        const groupUser = usersGroup.find(u => u.id == id)
        const confir = confirm(`Anda yakin akan menghapus "${groupUser.name}"?`)
        if (confir) {
            await axios.delete(`${apiUrl}/User/${id}`,{
                headers: {
                    "authorization": 'bearer '+token
                }
            })
                .then(res => res.data)
                setUsersGroup(usersGroup.filter(u => u.id != id))
        }
    }

    return (
        <div className="flex gap-5">
            <div className="w-1/2 mb-5 border border-gray-400 rounded border-dashed p-4">
                <h3>Tampilkan User Berdasarkan Grup</h3>
                <Select 
                    label={'Pilih Grup'}
                    showlabel={false}
                    className="w-1/2"
                    onChangeValue={setSelectedGroup}
                    value={selectedGroup}
                    options={groups ? groups.map(g => ({value: g.id, text: g.name})) : []}
                />
                {usersGroup.length == 0 && selectedGroup != '' ? (
                    <div className="py-4 border border-dashed border-gray-400 rounded-lg px-4">
                        Tidak ada user dalam grup terpilih
                    </div>
                ) : ''}
                {usersGroup.length == 0 ? '' : (
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Daftar user pada grup terpilih</h3>
                        </div>
                        <div className="card-body">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th className="w-[20px]">No</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Group</th>
                                        <th className="w-[70px]">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersGroup.map((u, i) => (
                                        <tr key={i}>
                                            <td>{i+1}</td>
                                            <td>{u.name}</td>
                                            <td>{roles[u.role]}</td>
                                            <td>{u.group.name}</td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <button className="border rounded border-dashed border-gray-400 p-1 text-gray-600"
                                                        onClick={() => goToEdit(u.id)}>
                                                        <BsPencil />
                                                    </button>
                                                    <button className="border rounded border-dashed border-gray-400 p-1 text-gray-600"
                                                        onClick={() => deleteGroup(u.id)}>
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
                )}
            </div>

            <div className="w-1/2">

                <div className="mb-5 border border-gray-400 rounded border-dashed p-4">
                    <CsvUploader apiUrl={apiUrl} />
                </div>

                <div className="mb-5 border border-gray-400 rounded border-dashed p-4">
                    <h3 className="mb-5">Cari User dengan Email</h3>
                    <SearchBox 
                        keyword={keyword} 
                        setKeyword={setKeyword}
                        width="2/3" />

                    {!userSearch && keyword == "" ? (
                        <p className="mt-5">Tulis email untuk mencari user</p>
                    ) : ''}

                    {!userSearch && keyword != "" ? (
                        <p className="mt-5">User tidak ditemukan untuk keyword "<i>{keyword}</i>"</p>
                    ) : ''}

                    {!userSearch ? '' : (
                        <div className="card mt-4">
                            <div className="card-header">
                                <h3 className="card-title">Hasil Pencarian <i>"{keyword}"</i></h3>
                            </div>
                            <div className="card-body">

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        
    )
}

const SearchBox = ({setKeyword, width="350px"}) => {
    const [tempKeyword, setTempKeyword] = useState('')

    return (
        <div className={`w-${width} flex items-center gap-3`}>
            <Input
                type="text" 
                placeholder="Cari User" 
                vertical={false} 
                value={tempKeyword}
                onChangeValue={setTempKeyword}
                className="mt-0 mb-0 grow" />
            <PrimaryButton onClick={() => setKeyword(tempKeyword)}>Cari</PrimaryButton>
        </div>
    )
}



export default UserManagement