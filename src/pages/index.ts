import { lazy } from "react";

export const Home = lazy(() => import('./Home'))
export const Auth = lazy(() => import('./Auth'))
export const Projects = lazy(() => import('./Projects'))
export const Board = lazy(() => import('./Board'))
export const Profile = lazy(() => import('./Profile'))