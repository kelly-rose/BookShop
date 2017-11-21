// section 11 - 148
// SurveyField contains logic to render a single
// label and text input
import React from 'react';
import { FormControl, FormGroup, ControlLabel} from 'react-bootstrap';

export default ({input, type, label, meta: {touched, error}, ...custom}) => {
    return (
        <FormGroup controlId="title">
            <ControlLabel>{label}</ControlLabel>
            <FormControl
                type={type}
                {...input}
                {...custom}/>
            <FormControl.Feedback/>
            {touched && error && <span className="error">{error}</span>}
        </FormGroup>
    );
};

// export default (props) =>{
//
//     console.log(props);
//     return(
//         <div>
//             <input/>
//         </div>
//     );
// };