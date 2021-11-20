import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

interface Props {
    data: any;
    clearReportData: () => void;
}

const ViewReportSection = (props: Props) => {
    const { data, clearReportData } = props;

    return (
        <>
            <TableContainer component={Paper} style={{maxWidth: '1000px', margin: '16px auto'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Anno</TableCell>
                            <TableCell>Valore 01/01</TableCell>
                            <TableCell>Valore 31/12</TableCell>
                            <TableCell>Report dettagliato</TableCell>
                            <TableCell>Modello Redditi PF</TableCell>
                            <TableCell>Modello F24</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.years_list.map((year: number) => {
                            return (
                                <TableRow key={year}>
                                    <TableCell component='th' scope='row'>
                                        {year}
                                    </TableCell>
                                    <TableCell>
                                        €{data.years[year].total_values.value_start_of_year.toFixed(2).replace('.', ',').replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.')}
                                    </TableCell>
                                    <TableCell>
                                        €{data.years[year].total_values.value_end_of_year.toFixed(2).replace('.', ',').replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.')}
                                    </TableCell>
                                    <TableCell>
                                        <Link href={'https://core.cryptax.xyz/?id=' + data.report_id + '&year=' + year} target='_blank'>visualizza</Link>
                                    </TableCell>
                                    <TableCell>
                                        {data.years[year].modello_redditi_available ? (
                                            <Link href={'https://core.cryptax.xyz/?id=' + data.report_id + '&action=pdf_modello_redditi&year=' + year} target='_blank'>visualizza</Link>
                                        ) : (year < 2016 ? 'non disponibile' : 'disponibile da febbraio ' + (year + 1))}
                                    </TableCell>
                                    <TableCell>
                                    {data.years[year].modello_redditi_available ? (
                                        <Link href={'https://core.cryptax.xyz/?id=' + data.report_id + '&action=pdf_modello_f24&year=' + year} target='_blank'>visualizza</Link>
                                    ) : (year < 2016 ? 'non disponibile' : 'disponibile da febbraio ' + (year + 1))}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Link href='#' onClick={clearReportData}>Torna alla home</Link>

            <Typography variant='body2' style={{fontSize: '0.8em', margin: '16px', color: '#111'}}>
                Nota bene: il modello F24 non comprende eventuali imposte relative agli interessi dichiarati nel quadro RL.
            </Typography>
        </>
    );
};

export default ViewReportSection;
