//SurveyNew shows SurveyForm and SurveyFormReview

import React, {Component} from 'react';
import {AddressForm} from '.';
import {AddressFormReview} from './../components';
import {reduxForm} from 'redux-form';

class Address extends Component{
    state={showFormReview : false};

    renderContent(){
        if(this.state.showFormReview){
            return <AddressFormReview onCancel={()=>this.setState({showFormReview:false})}/>;
        }

        return <AddressForm onSurveySubmit={()=>this.setState({showFormReview:true})}/>;
    }
    render(){
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}



export default reduxForm({
    form:'surveyForm' //section 11 - 164
})(Address);