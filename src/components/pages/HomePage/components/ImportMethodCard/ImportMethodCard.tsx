import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

interface Props {
    title: string;
    description: string;
    onClick?: () => void;
}

const ImportMethodCard = (props: Props) => {
    const { title, description, onClick } = props;

    return (
        <StyledCard elevation={2}>
            <CardContent>
                <Typography variant='h4' style={{marginBottom: '12px'}}>
                    {title}
                </Typography>
                <Typography variant='body1' style={{marginBottom: '16px'}}>
                    {description}
                </Typography>
                {onClick ? (
                    <Button variant='contained' color='primary' onClick={onClick}>
                        Prosegui
                    </Button>
                ) : (
                    <Button variant='outlined' style={{border: '1px solid #ff8d17', color: 'rgb(225 114 0)'}}>
                        Coming soon
                    </Button>
                )}

            </CardContent>
        </StyledCard>
    );
};

const StyledCard = styled(Card)`
    flex: 1;
    margin: 16px 4px;

    @media screen and (min-width: 1250px) {
        margin: 16px;
    }
`;

export default ImportMethodCard;
