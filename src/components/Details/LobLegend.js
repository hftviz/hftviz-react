import React from 'react';
import "./Details.css";
import {DrawLegend} from "./DrawLegendDetails";

class LobLegend extends React.Component {
    constructor(props){
        super(props);

        this.canvas = React.createRef();
    }

    componentDidMount(){
        DrawLegend(this.canvas.current.id, this.props.minMessageNum, this.props.maxMessageNum, "#ffe680", "#ff3300");
    }

    componentDidUpdate(prevProps){
    }


    render() {
        return(

            <div id="drawLobLegend" ref={this.canvas}></div>

        );
    }
    
}

export default LobLegend;