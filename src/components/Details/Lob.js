import React from 'react';
import "./Details.css";
import drawLOB from './drawLOB';
import levels from './levels.js';


class Lob extends React.Component {
    constructor(props){
        super(props);

        this.canvasRef = React.createRef();
    }

    componentDidMount(){

        let date = "2012-06-21"; // for production, we need to use this.props.dateTime
        let names = ["Apple Inc.--AAPL", "Microsoft Corp.--MSFT", "Intel Corp.--INTC", "Amazon.com Inc.--AMZN", "Alphabet Inc. (Class C)--GOOG"]; // in production: this.props.dateTime
        let name = names[Math.floor(Math.random() * names.length)];

        if (this.props.zoomLevel === 1 ) 
            {
                let source = levels.level1;
                // make copy from source
                let level = JSON.parse(JSON.stringify(source));



                drawLOB(
                    this.canvasRef.current.id,
                    date,
                    name,
                    level.volume,
                    level.bid,
                    level.ask,
                    level.cancel
                );
            }
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