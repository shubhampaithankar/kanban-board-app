import { Navigate } from "react-router-dom";
import { Auth, Home, Projects } from "../pages";
import PrivateRoute from "./PrivateRoute";

export const AppRoutes = [
    {
        path: '',
        children: [
            {
                path: '',
                element: <Navigate to='home' />
            },
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'auth',
                element: <Auth />
            },
            {
                path: 'projects',
                element: <PrivateRoute component={<Projects />} />
            },
        ]
    }
]