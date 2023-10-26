import { Grid, Typography, Modal as ReactModal, Paper } from '@mui/material';
import useModal from "../../hooks/useModal";

export default function Modal() {
    const modal = useModal()

    return (
        <>
            <ReactModal open={!!modal?.isOpen} onClose={modal?.onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100%' }}>
                    <Grid container direction='column' justifyContent="center" alignItems="center">
                        <Paper sx={{ padding: '1rem' }}>
                            <Grid item xs={4}>
                                <Typography variant="h5">
                                    { modal?.modalData.title }
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                { modal?.modalData.body }
                            </Grid>
                        </Paper>
                    </Grid>
            </ReactModal>
        </>
    )
}