import React from 'react';
import SearchMenu from './SearchMenu';

class SearchBar extends React.Component {
    constructor(props){
        super(props);

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(e){
        this.props.onChangeFilterText(e.target.value);
    }

    render() {
        return(

            <div style={{display:'block', float:'left', width:'100%', position:'inherit'}}>
                <input type="text" value={this.props.filterText} id="searchBar" onChange={this.handleFilterTextChange} 
                    placeholder="Search the stocks" autoComplete="off"/>
                <SearchMenu 
                    filterText={this.props.filterText}
                    stockNames={this.props.stockNames}
                    onChangeSelectedStocks={this.props.onChangeSelectedStocks}
                    onSelectStock={this.handleFilterTextChange}
                />
            </div>

        );
    }
    
}

export default SearchBar;