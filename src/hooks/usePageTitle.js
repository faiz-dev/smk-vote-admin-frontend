import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setPageTitle } from "../features/layouterSlice"

export const usePageTitle = (pageTitle) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle(pageTitle))
    }, [])
}