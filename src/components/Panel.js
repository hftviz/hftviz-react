import React from 'react';
import Overview from './Overview/Overview';
import Details from './Details/Details';

class Panel extends React.Component {


    render() {
        let children;

        if (this.props.vizType === "overview"){ 
            children = <Overview
                            selectedStocks = {this.props.selectedStocks}
                            sortData = {this.props.sortData}
                            binSize = {this.props.binSize}
                            dateTime = {this.props.dateTime}
                            onChangeSelectedStocks={this.props.onChangeSelectedStocks}
                        /> ;
        } else {
            children = <Details 
                        />;
        };
        return(

            <div id="main-panel"> {children} </div>

        );
    }
    
}

export default Panel;