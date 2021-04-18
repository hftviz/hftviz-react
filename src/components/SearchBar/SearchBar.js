import React from 'react';
import SearchMenu from './SearchMenu';

class SearchBar extends React.Component {
    constructor(props){
        super(props);

        this.state = {filterText: ''};

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(e){
        this.setState({
            filterText: e.target.value
        });
    }

    render() {
        return(

            <div style={{display:'block', float:'left', width:'100%', position:'inherit'}}>
                <input type="text" value={this.state.filterText} id="searchBar" onChange={this.handleFilterTextChange} 
                    placeholder="Search the stocks" autoComplete="off"/>
                <SearchMenu 
                    filterText={this.state.filterText}
                    stockNames={this.props.stockNames}
                    onChangeSelectedStocks={this.props.onChangeSelectedStocks}
                    onSelectStock={this.handleFilterTextChange}
                />
            </div>

        );
    }
    
}

export default SearchBar;