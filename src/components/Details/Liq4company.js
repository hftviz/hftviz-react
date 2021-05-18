import React from 'react';
import "./Details.css";
import drawLiq from './drawLiq';

class Liq4company extends React.Component {
    constructor(props){
        super(props);

        this.canvas = React.createRef();
    }

    componentDidMount(){
        let date = "2012-06-21"; // for production, we need to use this.props.dateTime
        let names = ["Apple Inc.--AAPL", "Microsoft Corp.--MSFT", "Intel Corp.--INTC", "Amazon.com Inc.--AMZN", "Alphabet Inc. (Class C)--GOOG"];
        let name = names[Math.floor(Math.random() * names.length)]; 
        // in production, you can change name var with "this.props.name"

        // deep copy of data
        let source = this.props.data;
        // make copy from source
        let data = JSON.parse(JSON.stringify(source));

        drawLiq(
            this.canvas.current.id,
            name + "//" + this.props.name, // in production, you can change name var with "this.props.name"
            date,
            data,
            this.props.zoomLevel,
            this.props.title,
            this.props.allSvg,
            this.props.allLiqSvg,
            this.props.handleLiqSvg,
            this.props.isLastStock,
            this.props.liqNames
        );
    }


    // will update with zoom levels
    componentDidUpdate(prevProps){
        let date = "2012-06-21"; // for production, we need to use this.props.dateTime
        let names = ["Apple Inc.--AAPL", "Microsoft Corp.--MSFT", "Intel Corp.--INTC", "Amazon.com Inc.--AMZN", "Alphabet Inc. (Class C)--GOOG"];
        let name = names[Math.floor(Math.random() * names.length)]; 
        // in production, you can change name var with "this.props.name"

        // deep copy of data
        let source = this.props.data;
        // make copy from source
        let data = JSON.parse(JSON.stringify(source));

        drawLiq(
            this.canvas.current.id,
            name + "//" + this.props.name, // in production, you can change name var with "this.props.name"
            date,
            data,
            this.props.zoomLevel,
            this.props.title,
            this.props.allSvg,
            this.props.allLiqSvg,
            this.props.handleLiqSvg,
            this.props.isLastStock,
            this.props.liqNames
        );

        // add zoom here
    }


    render() {
        return(

            <div id={"drawLiquidity-"+this.props.title.split("--")[1]} className="liq4company" ref={this.canvas}>
            </div>

        );
    }
    
}

export default Liq4company;