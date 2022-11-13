import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PrimaryButton } from "../../components/Button";
import { Input, TextArea } from "../../components/FormInput";
import { usePageTitle } from "../../hooks/usePageTitle";

const CreateCalon = () => {
    usePageTitle('Tambah Calon')
    const apiUrl = useSelector(state => state.layout.apiUrl)
    const navigate = useNavigate()
    const {periodeId} = useParams()
    const [periode, setPeriode] = useState(null)    

    const [name, setName] = useState('')
    const [deskripsi, setDeskripsi] = useState('')
    const [noUrut, setNoUrut] = useState('')
    const [photo, setPhoto] = useState('')
    const [visiMisiUrl, setVisiMisiUrl] = useState('')

    useEffect(() => {
        (async () => {
            const result = await axios.get(`${apiUrl}/periode/${periodeId}`)
                .then(res => res.data)
                .catch(err => {
                    console.log(err)
                    return null
                })
            setPeriode(result)
        })()
    }, [])

    const submit = async () => {
        if (name =="" || deskripsi == "" || noUrut == "" || photo == "" || visiMisiUrl == "") {
            alert("Masukkan data dengan lengkap")
            return
        }
        const result = await axios.post(`${apiUrl}/calon`, {
                    name, description:deskripsi, noUrut, photo, periodeId: periode.id
                }).then(res => res.data)
                .catch(err => {
                    console.log(err)
                    return null
                })
        if (result == null) {
            alert("Gagal menambahkan calon")
        } else {
            navigate('/calons?periodeId='+periode.id)
        }
    }

    if (periode == null) return <h1>Loading...</h1>
    return (
        <div className="card w-full lg:w-1/2">
            <div className="card-header">
                <h3 className="card-title">Tambah Calon Pemilihan "<i>{periode.name}</i>"</h3>
            </div>
            <div className="card-body">
                <Input
                    label={'Nama Calon / Pasangan Calon'}
                    value={name}
                    onChangeValue={setName}
                    />
                <TextArea
                    label={'Deskripsi'}
                    value={deskripsi}
                    onChangeValue={setDeskripsi}
                    />
                <Input
                    label={'Nomor Urut'}
                    type='number'
                    value={noUrut}
                    onChangeValue={setNoUrut}
                    />
                <Input
                    label={'Url Photo'}
                    value={photo}
                    onChangeValue={setPhoto}
                    />
                <Input
                    label={'Url Visi & Misi'}
                    value={visiMisiUrl}
                    onChangeValue={setVisiMisiUrl}
                    />
                <PrimaryButton onClick={submit}>Simpan</PrimaryButton>
            </div>
        </div>
    )
}

export default CreateCalon