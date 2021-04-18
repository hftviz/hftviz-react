import React from 'react';
import Overview from './Overview/Overview';
import Details from './Details/Details';

class Panel extends React.Component {


    render() {
        let children;

        if (this.props.vizType === "overview"){ 
            children = <Overview /> ;
        } else {
            children = <Details />;
        };
        return(

            <div id="main-panel"> {children} </div>

        );
    }
    
}

export default Panel;