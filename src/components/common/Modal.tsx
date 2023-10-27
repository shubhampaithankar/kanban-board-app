import { Grid, Typography, Modal as ReactModal, Paper } from '@mui/material';
import useModal from "../../hooks/useModal";

export default function Modal() {
    const modal = useModal()

    return (
        <>
            <ReactModal open={!!modal?.isOpen} onClose={modal?.onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100%' }}>
                    <Grid container direction='column' justifyContent="center" alignItems="center">
                        <Paper sx={{ padding: '1rem' }}>
                            <Grid item xs={4} sx={{ minWidth: '100%' }}>
                                <Typography variant="h4" textAlign={'center'}>
                                    { modal?.modalData.title }
                                </Typography>
                            </Grid>
                            <Grid item xs={8} sx={{ minWidth: '100%' }}>
                                { modal?.modalData.body }
                            </Grid>
                        </Paper>
                    </Grid>
            </ReactModal>
        </>
    )
}