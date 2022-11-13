import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PrimaryButton } from "../../components/Button";
import { Input } from "../../components/FormInput";

const EditGroup = ({group, onUpdated, onCancel, className}) => {
    const apiUrl = useSelector(state => state.layout.apiUrl)
    const [name, setName] = useState(group.name)

    const onHandleSubmit = async () => {
        const result = await axios.put(`${apiUrl}/group/${group.id}?name=${name}`)
            .then(res => res.data)
            onUpdated(result)
    }

    return (
        <div className={`card ${className}`}>
            <div className="card-header">
                <h3 className="card-title">Edit Group "<i>{group.name}</i>"</h3>
            </div>
            <div className="card-body">
                <Input
                    label={'Group Name'} 
                    vertical={true}
                    value={name}
                    onChangeValue={setName} />
                <div className="flex gap-4">
                    <PrimaryButton onClick={onHandleSubmit}>Simpan</PrimaryButton>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default EditGroup