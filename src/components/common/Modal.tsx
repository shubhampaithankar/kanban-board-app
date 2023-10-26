import { Grid, Typography, Modal as ReactModal } from '@mui/material';
import useModal from "../../hooks/useModal";
import { useEffect } from 'react';

export default function Modal() {
    const { isOpen, modalData, onClose } = useModal()

    useEffect(() => {
        console.log(isOpen)
    }, [isOpen])

    return (
        <>
            <ReactModal open={isOpen} onClose={onClose}>
                <Grid container direction='column' justifyContent="center" alignItems="center">
                    <Grid item xs={4}>
                        <Typography variant="h1">
                            { modalData.title }
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        { modalData.body }
                    </Grid>
                </Grid>
            </ReactModal>
        </>
    )
}