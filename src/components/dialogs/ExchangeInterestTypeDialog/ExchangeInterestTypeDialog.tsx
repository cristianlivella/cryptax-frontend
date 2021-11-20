import { useCallback, useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

interface Props {
    open: boolean;
    onClose: (types: string[]) => void;
    exchanges: string[];
}

const ExchangeInterestTypeDialog = (props: Props) => {
    const { open, onClose, exchanges } = props;

    const [exchangeTypes, setExchangeTypes] = useState<string[]>([]);

    useEffect(() => {
        setExchangeTypes(new Array(exchanges?.length).fill('RL'));
    }, [exchanges]);

    const handleChange = useCallback((index, e) => {
        const tmp = [...exchangeTypes];
        tmp[index] = e.target.value;
        setExchangeTypes(tmp);
    }, [exchangeTypes, setExchangeTypes]);

    return (
        <>
            <Dialog open={open}>
                <DialogTitle>
                    Scelta quadri per dichiarazione interessi
                </DialogTitle>
                <DialogContent>
                    <p style={{marginTop: '0px'}}>
                        Per ogni exchange o servizio, scegli in quale quadro vuoi dichiarare gli interessi ricevuti.
                    </p>

                    {exchanges?.map((exchange, index) => {
                        return (
                            <FlexContainer key={index}>
                                <TextField
                                    value={exchange}
                                    inputProps={{readOnly: true}}
                                    label=' '
                                    style={{flex: '1'}}
                                />
                                <TextField
                                    value={exchangeTypes[index]}
                                    style={{flex: '1'}}
                                    label=' '
                                    onChange={(e) => handleChange(index, e)}
                                    select >
                                    <MenuItem key='RL' value='RL'>
                                        quadro RL
                                    </MenuItem>
                                    <MenuItem key='RM' value='RM'>
                                        quadro RM
                                    </MenuItem>
                                </TextField>
                            </FlexContainer>
                        );
                    })}
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => onClose(exchangeTypes)} color='primary'>
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

export default ExchangeInterestTypeDialog;
