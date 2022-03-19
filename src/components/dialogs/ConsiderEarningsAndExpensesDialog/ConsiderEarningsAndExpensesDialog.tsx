import { useCallback, useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import RadioGroup from '@material-ui/core/RadioGroup';

import RadioItem from '../../common/RadioItem/RadioItem';

interface Props {
    open: boolean;
    onClose: (flag: boolean) => void;
}

const ConsiderEarningsAndExpensesDialog = (props: Props) => {
    const { open, onClose } = props;

    const [flag, setFlag] = useState<'0' | '1'>('1');

    const handleChange = useCallback((event, selectedFlag) => {
        setFlag(selectedFlag);
    }, []);

    return (
        <>
            <Dialog open={open}>
                <DialogTitle>
                    Impostazioni guadagni e spese
                </DialogTitle>
                <DialogContent>
                    <p style={{marginTop: '0px'}}>
                        Vuoi considerare eventuali guadagni e spese come investimenti e disinvestimenti dell'anno fiscale?
                    </p>

                    <RadioGroup value={flag} onChange={handleChange}>
                        <RadioItem
                            value='1'
                            primaryText={'Sì'}
                            recommended
                        />

                        <RadioItem
                            value='0'
                            primaryText='No'
                        />
                    </RadioGroup>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => onClose(flag === '1')} color='primary'>
                        Continua
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ConsiderEarningsAndExpensesDialog;
