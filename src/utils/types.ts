import { ReactNode } from "react"

export type User = {
    username: string
    email: string
    dob: Date | string
    region: string
    projects: string[]
}

export type Project = {
    name: string
    description: string
    tasks: Task[]
    owner: string[]
}

export type Task = {
    title: string
    description: string
    status: string
    labels: string[]
    priority: string
    project: string
    dueDate: Date
}

export type AuthType = {
    user: User | null,
    isAuthenticated: Boolean
    setToken: React.Dispatch<any>
    getToken: () => void
    getUser: () => void
    logoutUser: () => void
}

export type ModalDataType = {
    title: string
    body: ReactNode
}

export type ModalType = {
    isOpen: Boolean, 
    modalData: {
        title: string,
        body: ReactNode
    }, 
    onOpen: (data: any) => void, 
    onClose: () => void,
}