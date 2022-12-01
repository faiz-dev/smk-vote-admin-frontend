import axios from "axios";
import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../../components/Button";
import { Select } from "../../components/FormInput";
import { useSelector } from "react-redux";

const CsvUploader = ({apiUrl}) => {
    const [file, setFile] = useState()
    const [tempUsers, setTempUsers] = useState([])
    const [importResult, setImportResult] = useState()
    const [groups, setGroups] = useState([])
    const [selectedGroup, setSelectedGroup] = useState("")
    const fileReader = new FileReader()
    const [uploadMsg, setUploadMsg] = useState("")
    const [uploadStatus, setUplaodStatus] = useState("")
    const token = useSelector(state => state.auth.token)

    const handleOnChange = (e) => {
        setFile(e.target.files[0])
    }
    const handleOnSubmit = (e) => {
        if (file) {
            fileReader.onload = function (event) {
                const csvOutput = event.target.result
                const data = csvToArray(csvOutput)
                setTempUsers(data)
            }
            fileReader.readAsText(file)
        }
    }

    useEffect(() => {
        (async () => {
            const groups = await axios.get(`${apiUrl}/group`)
                .then(res => res.data)
            setGroups(groups)
        })()
    }, [])

    useEffect(() => {
        if(tempUsers.length > 0) {
            (async () => {
                const result = await axios.post(`${apiUrl}/User/bulk?groupId=${selectedGroup}`, 
                tempUsers,{
                    headers: {
                        "authorization": 'bearer '+token
                        }
                })
                    .then(res => {
                        setUplaodStatus('SUCCESS')
                        setUploadMsg(res.data)
                        setImportResult(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                        setUploadMsg(err.response.data)
                        setUplaodStatus(err.code)
                    })
            })()
            setTempUsers([])
        }
    }, [tempUsers])

    const csvToArray = (data) => {
        let datarows = data.slice(data.indexOf("\n")+1).replace('\r', '').split("\n")
        datarows = datarows.map(r => r.split(',')) 
        return datarows.map(r => ({
            email: r[0],
            name: r[1],
            role: r[2] ? parseInt(r[2]) : 0,
            groupId: r[3] ? parseInt(r[2]) : null,
        }))
    }

    return (
        <div>
            <h3 className="font-bold">Import User</h3>
            <p>{uploadStatus ? uploadStatus+':': ''} {uploadMsg}</p>
            <input type="file" accept=".csv" onChange={handleOnChange} className="border border-dashed border-gray-400 w-full p-3 rounded mt-3" />
            <p className="mt-4">Pilih Grup jika import user group:</p>
            <Select 
                label={'Pilih Grup (Opsional)'}
                showlabel={false}
                className="w-full"
                onChangeValue={setSelectedGroup}
                value={selectedGroup}
                options={groups ? groups.map(g => ({value: g.id, text: g.name})) : []}
                />
            <PrimaryButton onClick={handleOnSubmit}>Import!</PrimaryButton>
        </div>
    )
}

export default CsvUploader