import { Navigate } from "react-router-dom";
import { Auth, Home, Projects, Board, Profile } from "../pages";
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
                path: 'profile',
                element: <PrivateRoute component={<Profile />} />
            },
            {
                path: 'projects',
                element: <PrivateRoute component={<Projects />} />
            },
            {
                path: 'projects/:id',
                element: <PrivateRoute component={<Board />} />
            },
            {
                path: '*',
                element: <>404 Not Found</>
            }
        ]
    }
]