import { useMemo } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
    data: any;
    onClose: () => void;
}

const ExceptionDialog = (props: Props) => {
    const { data, onClose } = props;

    const exceptionBody = useMemo(() => {
        if (!data) return null;

        const { exception } = data;

        if (exception === 'ActionInvalidException') {
            return <>L'azione effettuata non è valida.</>;
        } else if (exception === 'CannotFindPurchasesException') {
            return (
                <>
                    Non è stato possibile trovare tutte le transazioni d'acquisto per la transazione numero {data.transaction_id}. <br />
                    Importo trovato: {data.found_amount.toFixed(8)} <br />
                    Importo totale richiesto: {data.total_amount.toFixed(8)}
                </>
            );
        } else if (exception === 'FileTooBigException') {
            return (
                <>Il file caricato è troppo grande</>
            );
        } else if (exception === 'InvalidFileException') {
            return (
                <>Il file caricato non è valido.</>
            );
        } else if (exception === 'InvalidTransactionException') {
            return (
                <>
                    La transazione numero {data.transaction_id} non è valida. <br/>
                    "{data.value}" non è un valore valido per il campo "{data.field}".
                </>
            );
        } else if (exception === 'InvalidYearException') {
            return (
                <>
                    L'anno {data.year} non è valido.
                </>
            );
        } else if (exception === 'NegativeBalanceException') {
            return (
                <>
                    Il saldo di una criptovaluta non può essere negativo! <br />
                    Saldo negativo ottenuto il giorno {data.date} per la criptovaluta {data.ticker}.
                </>
            );
        } else if (exception === 'NotFoundException') {
            return (
                <>
                    Impossibile trovare l'entità richiesta ({data.entity}).
                </>
            );
        } else if (exception === 'TooFewTransactionFields') {
            return (
                <>Il file caricato non contiene un numero valido di colonne.</>
            );
        }

        return <>Si è verificato un errore sconosciuto. Riprova tra qualche istante.</>;
    }, [data]);

    return (
        <>
            <Dialog open={data !== null} onClose={onClose} maxWidth='md'>
                <DialogTitle>
                    Attenzione
                </DialogTitle>
                <DialogContent>
                    {exceptionBody}
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} color='primary'>
                        Chiudi
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ExceptionDialog;
