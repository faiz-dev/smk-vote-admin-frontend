import axios from "axios"

export const login = async (url, username) => {
    const cred = await axios.post(`${url}?email=${username}`).then(res => {
            return res.data
        }).catch(err => {
            console.warn("Failed to login", err)
            throw Error("Failed to login")
        })
    return cred
}