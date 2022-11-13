import { useSelector } from "react-redux"
import axios from "./AxiosHelper"

export const getProfile = async () => {
    const apiUrl = useSelector(s => s.layout.apiUrl)
    const profile = await axios.get(`${apiUrl}/profile`).then(res => {
            return res.data
        }).catch(err => {
            console.warn("Failed to login", err)
            throw Error("Failed to login")
        })
    return profile
}