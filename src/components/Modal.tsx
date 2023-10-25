import useModal from "../hooks/useModal";
import { Grid, Modal as BaseModal, Typography } from '@mui/material';

export default function Modal() {
    const { isOpen, modalData, onClose } = useModal()
    return (
        <>
            <BaseModal onClose={onClose} open={isOpen}>
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
            </BaseModal>
        </>
    )
}