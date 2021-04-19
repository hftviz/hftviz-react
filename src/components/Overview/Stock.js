import React from 'react';
import "./Overview.css";
import DrawOverview from "./DrawOverview.js"

class Stock extends React.PureComponent {
    constructor(props){
        super(props);

        this.state = { isSelected:false };
        this.canvasRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(){
        let stockName = this.props.fullName + '--' + this.props.symbol;
        this.props.onChangeSelectedStocks(stockName, 'add');
    }

    componentDidMount(){
        DrawOverview(this.props.data, this.canvasRef.current.id , this.props.minVal, this.props.maxVal);
    }

    componentDidUpdate(){
        if (this.props.isSelected !== this.state.isSelected){
            this.setState(state => ({isSelected: !state.isSelected}));
            DrawOverview(this.props.data, this.canvasRef.current.id , this.props.minVal, this.props.maxVal);
        };
    }

    // componentDidUpdate(){
    //     DrawOverview(this.props.data, this.canvasRef.current.id , this.props.minVal, this.props.maxVal);
    // }

    render() {

        if(this.props.isSelected){
            return(
                <fieldset id={this.props.symbol} className="stockVizSelected" ref={this.canvasRef} onClick={this.handleClick}>
                    <legend className="stockNameLegend">{this.props.symbol}</legend>
                    <div className="stockVizText">
                        {this.props.fullName} 
                    </div>
                </fieldset>
    
            );
        } else{

            return(

                <div id={this.props.symbol} className="stockViz" ref={this.canvasRef} onClick={this.handleClick}> 
                    <div className="stockVizText">
                        {this.props.fullName} 
                    </div>
                </div>
    
            );
        }
    }
    
}

export default Stock;