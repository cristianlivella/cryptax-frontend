import { useCallback, useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';

import RadioItem from './RadioItem/RadioItem';

interface Props {
    open: boolean;
    onClose: (method: string) => void;
}

const RwFinalValueDialog = (props: Props) => {
    const { open, onClose } = props;

    const [method, setMethod] = useState<'average_value' | 'real_value' | 'real_value_more_incomes'>('average_value');

    const handleChange = useCallback((event, selectedMethod) => {
        setMethod(selectedMethod);
    }, []);

    return (
        <>
            <Dialog open={open}>
                <DialogTitle>
                    Impostazioni quadro RW
                </DialogTitle>
                <DialogContent>
                    <p style={{marginTop: '0px'}}>
                        Scegli quale metodo vuoi utilizzare per il calcolo del valore finale del quadro RW (colonna 8).
                    </p>

                    <RadioGroup aria-label='gender' name='gender1' value={method} onChange={handleChange}>
                        <RadioItem
                            value='real_value_more_incomes'
                            primaryText={'Controvalore al 31/12 + vendite eseguite durante l\'anno'}
                            secondaryText={
                                <>
                                    Come da istruzioni riportate nell'interpello{' '}
                                    <a href='https://www.agenziaentrate.gov.it/portale/documents/20143/3930262/Risposta+788+del+2021.pdf/01995188-b1a7-bdcb-6116-760577456538' target='_blank' rel='noreferrer'>788/2021</a>.
                                </>
                            }
                            recommended
                        />

                        <RadioItem
                            value='average_value'
                            primaryText='Giacenza media'
                            secondaryText={
                                <>
                                    Come da{' '}
                                    <a href='https://info730.agenziaentrate.it/portale/istruzioni-per-la-compilazione-del-quadro-rw#:~:text=nella%20colonna%208%2C%20il%20valore%20al%20termine%20del%20periodo%20di%20imposta%20ovvero%20al%20termine%20del%20periodo%20di%20detenzione%20dell%27attivit%C3%A0.%20Per%20i%20conti%20correnti%20e%20libretti%20di%20risparmio%20va%20indicato%20il%20valore%20medio%20di%20giacenza%20(vedi%20istruzioni%20di%20colonna%2011)%3B' target='_blank' rel='noreferrer'>istruzioni generali</a>{' '}
                                    per la dichiarazione di conti correnti e libretti di risparmio.
                                </>
                            }
                        />

                        <RadioItem
                            value='real_value'
                            primaryText='Controvalore al 31/12'
                        />
                    </RadioGroup>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => onClose(method)} color='primary'>
                        Continua
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export const FlexContainer = styled.div`
    display: flex;
`;

export default RwFinalValueDialog;
