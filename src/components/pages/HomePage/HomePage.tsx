import { useCallback, useEffect, useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import CapitalLossesDialog from '../../dialogs/CapitalLossesDialog/CapitalLossesDialog';
import ConsiderEarningsAndExpensesDialog from '../../dialogs/ConsiderEarningsAndExpensesDialog/ConsiderEarningsAndExpensesDialog';
import CsvUploadDialog from '../../dialogs/CsvUploadDialog/CsvUploadDialog';
import ExchangeInterestTypeDialog from '../../dialogs/ExchangeInterestTypeDialog/ExchangeInterestTypeDialog';
import RwFinalValueDialog from '../../dialogs/RwFinalValueDialog/RwFinalValueDialog';
import ImportMethodCards from './components/ImportMethodCards/ImportMethodCards';
import ViewReportSection from './components/ViewReportSection/ViewReportSection';
import { Content, StyledTypography } from './styled';

const HomePage = () => {
    const [isCsvDialogOpen, setIsCsvDialogOpen] = useState(false);
    const [isCapitalLossesDialogOpen, setIsCapitalLossesDialogOpen] = useState(false);
    const [isExchangeInterestTypeDialogOpen, setIsExchangeInterestTypeDialogOpen] = useState(false);
    const [isRwFinalValueDialogOpen, setIsRwFinalValueDialogOpen] = useState(false);
    const [isConsiderEarnsAndExpensesDialogOpen, setIsConsiderEarnsAndExpensesDialogOpen] = useState(false);

    const [viewReport, setViewReport] = useState(false);

    const [capitalLossesYears, setCapitalLossesYears] = useState([]);

    const [reportId, setReportId] = useState('');
    const [reportData, setReportData] = useState<any>();

    const updateReportData = useCallback(() => {
        fetch('https://core.cryptax.xyz/?action=get_info&id=' + reportId, {
            credentials: 'include'
        }).then(res => res.json()).then(json => {
            setReportData(json);
        });
    }, [reportId]);

    useEffect(() => {
        if (viewReport) {
            updateReportData();
        }
    }, [updateReportData, viewReport]);

    const afterCsvUpload = useCallback((data) => {
        setReportId(data.report_id);
        setReportData(data);
        setIsCsvDialogOpen(false);

        const computedCapitalLossesYears = data.years_list.filter((year: number) => {
            return data.years[year].capital_gains_and_airdrop < 0;
        });

        if (computedCapitalLossesYears.length > 0) {
            setCapitalLossesYears(computedCapitalLossesYears);
            setIsCapitalLossesDialogOpen(true);
        } else if (data.interest_exchanges.length > 0) {
            setIsExchangeInterestTypeDialogOpen(true);
        } else {
            setIsRwFinalValueDialogOpen(true);
        }
    }, []);

    const setCapitalLossesCompensation = useCallback((compensate: boolean) => {
        try {
            // @ts-ignore
            gtag('event', 'set_capital_losses_compensation', {
                'event_category': 'report',
                'event_label': 'set_capital_losses_compensation',
                'event_value': compensate ? 'true' : 'false'
            });
            // tslint:disable-next-line
        } finally {}
        setIsCapitalLossesDialogOpen(false);
        fetch('https://core.cryptax.xyz', {
            method: 'POST',
            body: JSON.stringify({
                id: reportId,
                action: 'set_settings',
                compensate_losses: compensate ? 1 : 0
            }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(() => {
            if (reportData.interest_exchanges.length > 0) {
                setIsExchangeInterestTypeDialogOpen(true);
            } else {
                setIsRwFinalValueDialogOpen(true);
            }
        });
    }, [reportData, reportId]);

    const setExchangeTypes = useCallback((types: string[]) => {
        try {
            // @ts-ignore
            gtag('event', 'set_exchange_types', {
                'event_category': 'report',
                'event_label': 'set_exchange_types'
            });
            // tslint:disable-next-line
        } finally {}
        const typesObject = {};
        reportData.interest_exchanges.forEach((exchange: string, index: number) => {
            // @ts-ignore
            typesObject[exchange] = types[index];
        });

        setIsExchangeInterestTypeDialogOpen(false);
        fetch('https://core.cryptax.xyz', {
            method: 'POST',
            body: JSON.stringify({
                id: reportId,
                action: 'set_settings',
                exchanges: JSON.stringify(typesObject)
            }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(() => {
            setIsRwFinalValueDialogOpen(true);
        });
    }, [reportData, reportId]);

    const setRwFinalValueMethod = (method: string) => {
        try {
            // @ts-ignore
            gtag('event', 'set_rw_final_value_method', {
                'event_category': 'report',
                'event_label': 'set_rw_final_value_method',
                'event_value': method
            });
            // tslint:disable-next-line
        } finally {}

        setIsRwFinalValueDialogOpen(false);
        fetch('https://core.cryptax.xyz', {
            method: 'POST',
            body: JSON.stringify({
                id: reportId,
                action: 'set_settings',
                rw_final_value_method: method
            }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(() => {
            if (reportData.has_earnings_or_expenses) {
                setIsConsiderEarnsAndExpensesDialogOpen(true);
            } else {
                setViewReport(true);
            }
        });
    };

    const setConsiderEarnsAndExpensesFlag = (flag: boolean) => {
        try {
            // @ts-ignore
            gtag('event', 'set_consider_earns_and_expenses_flag', {
                'event_category': 'report',
                'event_label': 'set_consider_earns_and_expenses_flag',
                'event_value': flag ? 'true' : 'false'
            });
            // tslint:disable-next-line
        } finally {}

        setIsConsiderEarnsAndExpensesDialogOpen(false);
        fetch('https://core.cryptax.xyz', {
            method: 'POST',
            body: JSON.stringify({
                id: reportId,
                action: 'set_settings',
                consider_earnings_and_expenses_as_investment: flag
            }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(() => {
            setViewReport(true);
        });
    };

    return (
        <>
            <AppBar>
                <Toolbar>
                    <StyledTypography variant='h6' noWrap>
                        CrypTax
                    </StyledTypography>
                </Toolbar>
            </AppBar>

            <Content>
                {viewReport ? (
                    <ViewReportSection data={reportData} clearReportData={() => {
                        setViewReport(false);
                        setReportData(null);
                        setReportId('');
                    }} />
                ) : (
                    <>
                        <Typography variant='h5' style={{marginBottom: '8px'}}>
                            Software per calcolo plusvalenze e dichiarazione dei redditi per possessori di criptovalute.
                        </Typography>
                        <Typography variant='body2' style={{margin: '8px'}}>
                            I dati raccolti verranno utilizzati soltanto per le finalità previste dal servizio. I file caricati verranno crittografati e verranno eliminati dal server dopo 12 ore. Nessun dato personale verrà mai venduto o ceduto a terzi.
                        </Typography>

                        <ImportMethodCards openCsvDialog={() => setIsCsvDialogOpen(true)} />
                    </>
                )}


                <div style={{maxWidth: '1400px', margin: '12px auto'}}>
                    <Link href='https://docs.google.com/forms/d/e/1FAIpQLSf9eFENhb6YZRFmezCd9niTXcUTja44Q9wuzZp2Q9y9cvXFQA/viewform' target='_blank'>
                        Iscriviti alla newsletter
                    </Link>
                    {' '}-{' '}
                    <Link href='https://t.me/joinchat/nH8J2bHLNT03YmQ0' target='_blank'>
                        Unisciti al gruppo telegram
                    </Link>
                    <Typography variant='body2' style={{fontSize: '0.8em', margin: '16px', color: '#111'}}>
                        ATTENZIONE: CrypTax e Cristian Livella non si assumono nessuna responsabilità riguardo la correttezza e la completezza dei report elaborati. Il software offre un aiuto nel calcolo delle plusvalenze e nella compilazione dei modelli, ma è responsabilità del contribuente di verificarne la correttezza e la compatibilità con la propria situazione finanziaria complessiva.
                    </Typography>
                </div>
            </Content>

            <CsvUploadDialog open={isCsvDialogOpen} onClose={() => setIsCsvDialogOpen(false)} onSuccess={afterCsvUpload} />
            <CapitalLossesDialog open={isCapitalLossesDialogOpen} onClose={setCapitalLossesCompensation} years={capitalLossesYears} save={reportData?.total_compensation} />
            <ExchangeInterestTypeDialog open={isExchangeInterestTypeDialogOpen} onClose={setExchangeTypes} exchanges={reportData?.interest_exchanges} />
            <RwFinalValueDialog open={isRwFinalValueDialogOpen} onClose={setRwFinalValueMethod} />
            <ConsiderEarningsAndExpensesDialog open={isConsiderEarnsAndExpensesDialogOpen} onClose={setConsiderEarnsAndExpensesFlag} />
        </>
    );
};

export default HomePage;
