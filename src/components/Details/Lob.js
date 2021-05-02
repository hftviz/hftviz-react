import React from 'react';
import "./Details.css";
import drawLOB from './drawLOB';


class Lob extends React.Component {
    constructor(props){
        super(props);

        this.canvasRef = React.createRef();
    }

    componentDidMount(){

        let date = "2012-06-21"; // for production, we need to use this.props.dateTime
        let names = ["Apple Inc.--AAPL", "Microsoft Corp.--MSFT", "Intel Corp.--INTC", "Amazon.com Inc.--AMZN", "Alphabet Inc. (Class C)--GOOG"];
        let name = names[Math.floor(Math.random() * names.length)]; // in production, you can change name var with "this.props.name"

        // deep copy of data
        let source = this.props.level;
        // make copy from source
        let data = JSON.parse(JSON.stringify(source));


        drawLOB(
            this.canvasRef.current.id,
            date,
            name,
            data.volume,
            data.bid,
            data.ask,
            data.cancel,
            this.props.minMessageNum,
            this.props.maxMessageNum
        );
    }

    // for zoom changing
    componentDidUpdate(prevProps){}


    render() {
        return(

            <div id={"lob-"+this.props.name.split('--')[1]} className="LOB" ref={this.canvasRef}>
                {/* {this.props.name + " " + this.props.dateTime} */}
            </div>

        );
    }
    
}

export default Lob;