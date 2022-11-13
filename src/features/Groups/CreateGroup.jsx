import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PrimaryButton } from "../../components/Button";
import { Input } from "../../components/FormInput";

const CreateGroup = ({onCreated}) => {
    const apiUrl = useSelector(state => state.layout.apiUrl)
    const [name, setName] = useState('')

    const onHandleSubmit = async () => {
        const result = await axios.post(`${apiUrl}/group?name=${name}`)
            .then(res => res.data)
        onCreated(result)
    }

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Tambah Group</h3>
            </div>
            <div className="card-body">
                <Input
                    label={'Group Name'} 
                    vertical={true}
                    value={name}
                    onChangeValue={setName} />
                <PrimaryButton onClick={onHandleSubmit}>Simpan</PrimaryButton>
            </div>
        </div>
    )
}

export default CreateGroup