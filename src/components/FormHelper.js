import React from 'react'
import { FormControl, FormGroup, ControlLabel} from 'react-bootstrap';

const FormHelper = ({input, type, label, meta: {touched, error}, ...custom}) => (  // Define stateless component to render input and errors

        <FormGroup controlId="title">
            <ControlLabel>{label}</ControlLabel>
            <FormControl
                type={type}
                {...input}
                {...custom}/>
            <FormControl.Feedback/>
            {touched && error && <span className="error">{error}</span>}
        </FormGroup>

)

export default FormHelper;