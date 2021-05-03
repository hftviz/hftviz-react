import React from 'react';
import './ViewOD.css';

class ViewOD extends React.Component {
    constructor(props){
        super(props);

        this.checkConditions = this.checkConditions.bind(this);
    }

    checkConditions(){
        if ( this.props.dateTime === '' ) {alert("Please select the date.")};

        if (this.props.selectedStocks.length === 0 && this.props.vizType === 'overview'){
            alert("Notice: You have not selected any stocks. You will see the details of the market (SPY ETF). \nIf you want to see the details of stocks, please select at least one stock, using the search bar.");
        }

        if ((this.props.dateTime !== '')) {
            
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