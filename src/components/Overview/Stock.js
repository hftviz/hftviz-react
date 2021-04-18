import React from 'react';
import "./Overview.css";

class Stock extends React.Component {


    render() {
        return(

            <div className="stockViz"> 
                <div className="stockVizText">
                    {this.props.fullName} 
                </div>
            </div>

        );
    }
    
}

export default Stock;