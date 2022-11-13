import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPageTitle } from "../features/layouterSlice"

export const useIsAuthentiated = () => {
    const token = useSelector(state => state.auth.token)

    if (token == '') {
        return 
    }
}