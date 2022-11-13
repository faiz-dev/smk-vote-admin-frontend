import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PrimaryButton } from "../../components/Button";
import { Select } from "../../components/FormInput";
import { usePageTitle } from "../../hooks/usePageTitle";

const Calons = () => {
    usePageTitle('Calons')
    const apiUrl = useSelector(state => state.layout.apiUrl)
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const [periodes, setPeriode] = useState([])
    const [calons, setCalons] = useState([])
    const [selectedPeriode, setSelectedPeriode] = useState(searchParams.get('periodeId'))
    const [selectedPeriodeName, setSelectedPeriodeName] = useState('')

    useEffect(()=>{
        (async () => {
            const result = await axios.get(`${apiUrl}/periode`)
                .then(res => res.data)
            setPeriode(result)
        })()
    }, [])

    useEffect(() => {
        if(selectedPeriode != "") {
            (async () => {
                const periodeData = periodes.find(p => p.id == selectedPeriode)
                if (periodeData) setSelectedPeriodeName(periodeData.name)
                const result = await axios.get(`${apiUrl}/calon/periode/${selectedPeriode}`)
                    .then(res => res.data)
                    .catch(err => {
                        console.log(err)
                        return []
                    })
                setCalons(result)
            })()
        }
    }, [selectedPeriode])

    const openEdit = (id) => {
        navigate(id+'/edit')
    }

    const deleteCalon = async (id) => {
        const dataCalon = calons.find(c => c.id == id)
        let cfm = confirm('Anda yakin akan menghapus calon '+dataCalon.name+'?')
        if (cfm) {
            const result = await axios.delete(`${apiUrl}/calon/${id}`)
                .then(res => res.data)
                .catch(err => {
                    console.log(err)
                    return null
                })
            if (result != null) {
                setCalons(calons.filter(c => c.id != id))
            }
        }
    }

    return (
        <div>
            <div className="border border-dashed border-gray-500 p-4 rounded mb-5">
                Pilih Periode untuk melihat calon
                <Select
                    label={'Periode'}
                    value={selectedPeriode}
                    showlabel={false}
                    onChangeValue={val => setSelectedPeriode(val)}
                    options={
                        periodes.map(p => ({value:p.id, text:p.name}))
                    } />
            </div>

            {!selectedPeriode ? '': (
                <div className="border border-dashed border-gray-500 p-4 rounded">
                    <div className="flex justify-between mb-3">
                        <h3 className="card-title">Daftar Calon pada periode "<i><b>{selectedPeriodeName}</b></i>"</h3>
                        <div className="card-toolbar">
                            <PrimaryButton className="py-1 px-2" onClick={() => navigate(`create/${selectedPeriode}`)}>Tambah</PrimaryButton>
                        </div>
                    </div>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>[ID] Nama Pasangan</th>
                                <th>Nomor Urut</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {calons.map((c, i) => (
                                <tr key={i}>
                                    <td className="w-[40px]">{i+1}</td>
                                    <td>[{c.id}] {c.name}</td>
                                    <td className="w-[100px]">{c.noUrut}</td>
                                    <td className="w-[100px]">
                                        <div className="flex gap-2">
                                            <button
                                                className="rounded border border-dashed  border-slate-500 p-2"
                                                onClick={() => openEdit(c.id)}>
                                                <BsPencilSquare />
                                            </button>
                                            <button
                                                className="rounded border border-dashed  border-slate-500 p-2"
                                                onClick={() => deleteCalon(c.id)}>
                                                <BsTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default Calons