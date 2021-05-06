import React from 'react';
import SelectedItem from './SelectedItem';
import './selectedBox.css';

class SelectedBox extends React.Component {
    render() {

        let items = [];
        this.props.selectedStocks.forEach(stock => {
            items.push(
                <SelectedItem key={stock} name={stock} onChangeSelectedStocks={this.props.onChangeSelectedStocks}/>
            );

        });

        return(

            <fieldset id="SelectedBox">
                <legend id="SelectedBoxLegendText">Selected stocks:</legend>
                {items}
            </fieldset>

        );
    }
    
}

export default SelectedBox;