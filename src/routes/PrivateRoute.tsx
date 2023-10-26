import useAuth from "../hooks/useAuth"

export default function PrivateRoute ({ component }: any) {
    const { isAuthenticated } = useAuth()
    return component
    // return !isAuthenticated ? <Navigate to='/auth' /> : <>{ component }</>
};