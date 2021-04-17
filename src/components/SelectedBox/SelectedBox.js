import React from 'react';
import SelectedItem from './SelectedItem';

class SelectedBox extends React.Component {
    render() {

        let items = [];
        this.props.selectedStocks.forEach(stock => {
            items.push(
                <SelectedItem key={stock} name={stock} onChangeSelectedStocks={this.props.onChangeSelectedStocks}/>
            );

        });

        return(

            <div id="SelectedBox">
                {items}
            </div>

        );
    }
    
}

export default SelectedBox;