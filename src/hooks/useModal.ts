import { useState, createContext, useContext } from "react";
import { ModalType } from "../utils/types";

export const useModalProvider = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [modalData, setModalData] = useState<any>({
        title: '',
        body: ''
    });

    const onOpen = (data: any) => {
        setIsOpen(true)
        setModalData({...data})
    }
    
    const onClose = () => {
        setIsOpen(false)
        setModalData({
            title: '',
            body: ''
        })
    }
    
    return {
        isOpen, modalData, onOpen, onClose
    }
}

export const ModalContext = createContext<ModalType | null>(null)
export default function useModal() {
    return useContext(ModalContext)
}
