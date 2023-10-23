import { Navigate } from "react-router-dom"
export default function PrivateRoute ({ component }: any) {
    const isAuthenticated = false
    return isAuthenticated ? <Navigate to='/' /> : <>{component}</>
};