import React from 'react';
import SearchMenuItem from './SearchMenuItem';

class SearchMenu extends React.Component {
    render() {
        let rows = [];
        let filterText = this.props.filterText.toLowerCase();
        let stocks = this.props.stockNames;

        stocks.forEach(stock => {
            let fullName = stock.Name.toLowerCase() + '--' + stock.Symbol.toLowerCase();
            if ((fullName.indexOf(filterText) === -1) || (!filterText.trim().length)) {
                return;
            }
            else{
                rows.push(
                    <SearchMenuItem 
                        key={stock.Symbol} 
                        name={stock.Name + '--' + stock.Symbol} 
                        onChangeSelectedStocks={this.props.onChangeSelectedStocks}
                        onSelectStock={this.props.onSelectStock}
                    />
                );
            }
        });

        return(

            <div>
                {rows}
            </div>

        );
    }
    
}

export default SearchMenu;