import React from 'react';
import './BinSize.css';
import interval from '../../pics/interval.png';

class BinSize extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.onChangeBinSize(e.target.value);
    }

    render() {

        if(this.props.vizType === 'overview'){
            return(

                <div id="binSize"> 
                        <div id="bidTitle">
                            <img src={interval} alt="binSize icon" className="img"/>
                        </div>
                        <input 
                            id="inputRange" 
                            type="range" 
                            min="5" 
                            max="39" 
                            value={this.props.binSize}
                            onChange={this.handleChange}
                            step="1"
                        />
                        <div id="output">
                            {(390 / this.props.binSize).toFixed(0)} Min.
                        </div>
                </div>
            );
        } else{
            return false;
        }
    }
    
}

export default BinSize;