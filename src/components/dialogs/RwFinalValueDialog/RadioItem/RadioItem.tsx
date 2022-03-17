import Chip from '@material-ui/core/Chip';
import Radio from '@material-ui/core/Radio';

import { StyledFormControlLabel } from './styled';

interface Props {
    value: string;
    primaryText: string;
    secondaryText?: JSX.Element;
    recommended?: boolean;
}

const RadioItem = (props: Props) => {
    const { value, primaryText, secondaryText, recommended } = props;

    return (
        <StyledFormControlLabel value={value} control={<Radio color='primary' />} label={
            <div style={{margin: '6px 0', display: 'flex'}}>
                <div style={{flex: '1'}}>
                    <p style={{margin: 0}}>{primaryText}</p>
                    <p style={{fontSize: '0.8em', margin: 0}}>{secondaryText}</p>
                </div>

                {recommended && (
                    <div>
                        <Chip label='Consigliato' color='primary' size='small' />
                    </div>
                )}
            </div>
        } />
    );
};

export default RadioItem;
