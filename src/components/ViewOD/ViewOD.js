import React from 'react';
import './ViewOD.css';

class ViewOD extends React.Component {
    constructor(props){
        super(props);

        this.checkConditions = this.checkConditions.bind(this);
    }

    checkConditions(){
        if ( this.props.dateTime === '' ) {alert("Please select the date.")};
        if ( this.props.selectedStocks.length === 0 ) {alert("Please take at least one stock.")};

        if ( (this.props.selectedStocks.length !== 0 ) && (this.props.dateTime !== '')) {
            
            let goTo = (this.props.vizType === 'overview') ? 'details' : 'overview';
            
            this.props.onChangeVizType(goTo);
        };
    }

    render() {
        let goTo = (this.props.vizType === 'overview') ? 'details' : 'overview';
        return(

            <button id="viewButton" onClick={this.checkConditions}> View {goTo} </button>

        );
    }
    
}

export default ViewOD;