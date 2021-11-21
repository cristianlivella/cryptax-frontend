import styled from 'styled-components';

import ImportMethodCard from '../ImportMethodCard/ImportMethodCard';

interface Props {
    openCsvDialog: () => void;
}

const ImportMethodCards = (props: Props) => {
    const { openCsvDialog } = props;

    return (
        <StyledContainer>
            <ImportMethodCard
                title='Importa da file CSV'
                description='Carica il file CSV contenente le transazioni, nel formato previsto da CrypTax.'
                onClick={openCsvDialog}
            />
            <ImportMethodCard
                title='Importa da exchange'
                description='Carica il file CSV esportato direttamente dal tuo exchange.'
            />
            <ImportMethodCard
                title='Inserimento manuale'
                description='Inserisci manualmente le tue transazioni per elaborare il report fiscale.'
            />
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    @media screen and (min-width: 1250px) {
        display: flex;
    }
`;


export default ImportMethodCards;
