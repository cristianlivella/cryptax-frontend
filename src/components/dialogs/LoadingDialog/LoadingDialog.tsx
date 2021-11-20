import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

interface Props {
    open: boolean;
}

const LoadingDialog = (props: Props) => {
    const { open } = props;

    return (
        <Dialog open={open}>
            <DialogTitle>
                Elaborazione in corso
            </DialogTitle>
            <DialogContent>
                <Typography>
                    Attendi, l'operazione potrebbe richiedere alcuni secondi...
                </Typography>

                <div style={{margin: '14px auto 0px', width: 'fit-content'}} >
                    <CircularProgress />
                </div>
            </DialogContent>
            <DialogActions />
        </Dialog>
    );
};

export default LoadingDialog;
