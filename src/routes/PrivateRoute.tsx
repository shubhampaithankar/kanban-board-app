import useAuth from "../hooks/useAuth"
import { Navigate } from "react-router-dom"

export default function PrivateRoute ({ component }: any) {
    const { isAuthenticated } = useAuth()
    return component
    // return !isAuthenticated ? <Navigate to='/auth' /> : <>{ component }</>
};