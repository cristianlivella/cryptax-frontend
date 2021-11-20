import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export const Content = styled.div`
    flex-grow: 1;
    padding: 24px;
    margin-top: 54px;
    max-width: 100%;
    @media (max-width: 600px) {
        margin-top: 40px;
    }
`;

export const StyledTypography = styled(Typography)`
    margin: 0 auto;
`;
