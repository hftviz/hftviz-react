import React from 'react';
import "./Details.css";
import drawLOB from './drawLOB';
import bidData from '../../data/bid.json';
import askData from '../../data/ask.json';
import cancelData from '../../data/cancel.json';
import volumeData from '../../data/volume.json';

class Lob extends React.Component {
    constructor(props){
        super(props);

        this.canvasRef = React.createRef();
    }

    componentDidMount(){

        let date = "2012-06-21"; // for production, we need to use this.props.dateTime
        let names = ["Apple Inc.--AAPL", "Microsoft Corp.--MSFT", "Intel Corp.--INTC", "Amazon.com Inc.--AMZN", "Alphabet Inc. (Class C)--GOOG"]; // in production: this.props.dateTime
        let name = names[Math.floor(Math.random() * names.length)];

        drawLOB(
            this.canvasRef.current.id,
            date,
            name,
            volumeData,
            bidData,
            askData,
            cancelData
        );
    }

    // for zoom changing
    componentDidUpdate(prevProps){}


    render() {
        return(

            <div id={"lob-"+this.props.name} className="LOB" ref={this.canvasRef}>
                {this.props.name + " " + this.props.dateTime}
            </div>

        );
    }
    
}

export default Lob;