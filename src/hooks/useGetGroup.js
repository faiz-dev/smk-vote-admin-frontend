import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export const useGetGroup = () => {
    const apiUrl = useSelector(state => state.layout.apiUrl)
    const [groups , setGroups] = useState([])

    useEffect(() => {
        (async () => {
            const groups = await axios.get(`${apiUrl}/group`)
                .then(res => res.data)
            setGroups(groups)
        })()
    }, [])

    return groups
}