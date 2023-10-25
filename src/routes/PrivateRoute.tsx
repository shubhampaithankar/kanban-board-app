// import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useEffect } from "react"

export default function PrivateRoute ({ component }: any) {
    const { isAuthenticated } = useAuth()
    useEffect(() => {
        console.log(isAuthenticated)
    }, [isAuthenticated])
    // return false ? <Navigate to='/' /> : <>{ component }</>
    return component
};