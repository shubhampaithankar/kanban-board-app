import { useState } from "react";

export default function useModal() {
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