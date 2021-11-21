import { useCallback, useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

import ExceptionDialog from '../ExceptionDialog/ExceptionDialog';
import LoadingDialog from '../LoadingDialog/LoadingDialog';

interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess: (json: any) => void;
}

const CsvUploadDialog = (props: Props) => {
    const { open, onClose, onSuccess } = props;

    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [exception, setException] = useState<any>(null);

    useEffect(() => {
        if (open) {
            setIsLoading(false);
            setFile(null);
            setException(null);
        }
    }, [open]);

    const onFileChange = useCallback((e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile ?? null);
        e.target.value = '';
    }, []);

    const uploadFile = useCallback(() => {
        const formData = new FormData();
        formData.append('file', file as File);

        setIsLoading(true);

        fetch('https://core.cryptax.xyz/?action=upload', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }).then(res => res.json()).then(json => {
            if (json.exception) {
                try {
                    // @ts-ignore
                    ga('send', 'event', {
                        'eventCategory': 'report',
                        'eventAction': 'upload_file_fail'
                    });
                } finally {
                    setException(json);
                }
            } else if (json.report_id) {
                try {
                    // @ts-ignore
                    ga('send', 'event', {
                        'eventCategory': 'report',
                        'eventAction': 'upload_file'
                    });
                } finally {
                    onSuccess(json);
                }
            } else {
                try {
                    // @ts-ignore
                    ga('send', 'event', {
                        'eventCategory': 'report',
                        'eventAction': 'upload_file_network_fail'
                    });
                } finally {
                    setException({exception: 'generic_error'});
                    setFile(null);
                }
            }
        }).catch(() => {
            setException({exception: 'network_error'});
            setFile(null);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [file, onSuccess]);

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth='md'>
                <DialogTitle>
                    Importa file CSV
                </DialogTitle>
                <DialogContent>
                    <Typography style={{marginBottom: '12px'}}>
                        Per elaborare il tuo report fiscale, carica un file CSV formattato con le seguenti colonne:
                        <ol>
                            <li>data della transazione, nel formato dd/mm/YYYY;</li>
                            <li>tipo della transazione: <i>acquisto</i>, <i>vendita</i> o <i>spesa</i>;</li>
                            <li>valore in Euro: costo di acquisto o di vendita;</li>
                            <li>importo criptovaluta acquistata, venduta o spesa;</li>
                            <li>ticker criptovaluta (es. BTC, ETH, ecc...);</li>
                            <li>nome dell'exchange/servizio utilizzato;</li>
                            <li>
                            categoria entrata: lasciare il campo vuoto per le normali transazioni di acquisto/vendita, oppure una delle seguenti:
                                <ul>
                                    <li>airdrop</li>
                                    <li>interessi</li>
                                    <li>cashback</li>
                                </ul>
                            </li>
                        </ol>
                        I campi devono essere separati dal carattere punto e virgola (;).
                    </Typography>

                    <input id='file-input' type='file' accept='.csv' onChange={onFileChange} style={{display: 'none'}} />

                    <label htmlFor='file-input'>
                        <Button color='primary' variant='outlined' component='span' >
                            Seleziona file
                        </Button>
                        <FileName>
                            {file?.name}
                        </FileName>
                    </label>

                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} color='secondary'>
                        Chiudi
                    </Button>
                    <Button onClick={uploadFile} disabled={isLoading || !file} color='primary'>
                        Prosegui
                    </Button>
                </DialogActions>
            </Dialog>

            <LoadingDialog open={isLoading && open} />
            <ExceptionDialog data={open ? exception : null} onClose={() => setException(null)}/>
        </>
    );
};

export const FileName = styled.span`
    margin-left: 8px;
`;

export default CsvUploadDialog;
