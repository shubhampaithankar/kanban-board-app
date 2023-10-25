import axios, { AxiosResponse } from 'axios'

const API_URL = `http://localhost:3001/api/`

export const apiInstance = axios.create({
    headers: {
        common: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        }
    }
})

apiInstance.interceptors.response.use((res: AxiosResponse) => {
    // console.log(res.status)
    return res
})

export const loginUser = async (data: any) => (await apiInstance.post(API_URL + 'auth/login', data))
export const registerUser = async (data: any) => (await apiInstance.post(API_URL + 'auth/register', data))

export const getUserDetails = async () => (await apiInstance.get(API_URL + 'user/get-user'))

export const getUserProjects = async () => (await apiInstance.get(API_URL + 'projects/get'))
export const createProject = async (data: any) => (await apiInstance.post(API_URL + 'projects/create', data))
export const updateProject = async (data: any) => (await apiInstance.post(API_URL + 'projects/update', data))
export const deleteProject = async (data: any) => (await apiInstance.post(API_URL + 'projects/delete', data))

export const getTasks = async () => (await apiInstance.get(API_URL + 'tasks/get'))
export const createTask = async (data: any) => (await apiInstance.post(API_URL + 'tasks/create', data))
export const updateTask = async (data: any) => (await apiInstance.post(API_URL + 'tasks/update', data))
export const deleteTask = async (data: any) => (await apiInstance.post(API_URL + 'tasks/delete', data))