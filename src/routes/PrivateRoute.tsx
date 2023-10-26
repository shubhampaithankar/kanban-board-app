import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export default function PrivateRoute ({ component }: any) {
    const auth = useAuth()
    return !auth?.isAuthenticated ? <Navigate to='/auth' /> : <>{ component }</>
};