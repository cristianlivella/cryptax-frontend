import { useMemo } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
    open: boolean;
    onClose: (compensate: boolean) => void;
    years: number[];
    save: number;
}

const CapitalLossesDialog = (props: Props) => {
    const { open, onClose, years, save } = props;

    const yearsFormatted = useMemo(() => {
        if (years.length === 1) {
            return years[0];
        } else {
            return years.slice(0, -1).join(', ') + ' e ' + years.slice(-1);
        }
    }, [years]);

    return (
        <>
            <Dialog open={open}>
                <DialogTitle>
                    Compensazione minusvalenze
                </DialogTitle>
                <DialogContent>
                    <p style={{marginTop: '0px'}}>
                        {years.length === 1 ? 'Nell\'anno' : 'Negli anni'} <b>{yearsFormatted}</b> sono state realizzate delle minusvalenze.
                    </p>
                    <p>
                        Vuoi utilizzare queste minusvalenze per compensare eventuali plusvalenze realizzate negli anni successivi?
                    </p>
                    <p>
                        Proseguendo, risparmierai <b>€{save ? (save*0.26).toFixed(0) : 0}</b> di imposta sostitutiva.
                    </p>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => onClose(false)} color='secondary'>
                        No
                    </Button>
                    <Button onClick={() => onClose(true)} color='primary'>
                        Sì
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CapitalLossesDialog;
