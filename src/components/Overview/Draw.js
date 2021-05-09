import React from 'react';
import "./Overview.css";
import DrawOverview from "./DrawOverview.js";
import overviewData from '../../data/overviewSampleData.json';

class Draw extends React.Component {
    constructor(props){
        super(props);

        this.canvasRef = React.createRef();
    }

    componentDidMount(){

        let dates = ["2019-01-03"]; // in production: this.props.dateTime
        let date = dates[Math.floor(Math.random() * dates.length)];

        // draw
        DrawOverview(
            overviewData,
            this.props.symbol,
            date,
            this.canvasRef.current.id,
            this.props.binSize
        );
    }

    componentDidUpdate(prevProps){
        let dates = ["2019-01-03", "2019-01-04", "2019-01-05"]; // in production: this.props.dateTime
        let date = dates[Math.floor(Math.random() * dates.length)];

        if( (prevProps.binSize !== this.props.binSize) || (prevProps.dateTime !== this.props.dateTime)){
            DrawOverview(
                overviewData,
                this.props.symbol,
                date,
                this.canvasRef.current.id,
                this.props.binSize
            );
        }
    }


    render() {

        return(

            <svg id={"draw-"+this.props.symbol} className="draw" ref={this.canvasRef}></svg>

        );
    }
    
}

export default Draw;