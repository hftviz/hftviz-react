import React from 'react';

class SearchMenuItem extends React.Component {
    constructor(props){
        super(props);

        this.handleSelectedStocks = this.handleSelectedStocks.bind(this);
    }

    handleSelectedStocks(name){
        this.props.onChangeSelectedStocks(name);

        // Put this to remove the menu after selecting the stock. Because the upper functions in SearchBar has .targe.value, 
        // we form the input like below.
        this.props.onSelectStock({target: {value: ''}});
    }


    render() {
        return(

            <button className='stock' onClick={() => this.handleSelectedStocks(this.props.name)}>
                {this.props.name}
            </button>

        );
    }
    
}

export default SearchMenuItem;