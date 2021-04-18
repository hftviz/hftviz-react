import React from 'react';
import './Sort.css';
import SortItem from './SortItem';

class Sort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: false, sortName:''};
    
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.handleSortName = this.handleSortName.bind(this);
      }
    
    handleClick() {
    this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
        }));
    }

    handleSortName(name){
        this.setState({
            sortName: name
        });
    }
    

    render() {

        let children = [];

        if(this.state.isToggleOn){
            children = [
                <SortItem 
                    className="sortItem" 
                    key='1' name="MarketCap" 
                    data={this.props.sortData} 
                    changeToggle={this.handleClick}
                    changeSortName={this.handleSortName}
                    onChangeSort={this.props.onChangeSort}
                />,
                <SortItem 
                    className="sortItem" 
                    key='2' 
                    name="Volume" 
                    data={this.props.sortData} 
                    changeToggle={this.handleClick}
                    changeSortName={this.handleSortName}
                    onChangeSort={this.props.onChangeSort}
                />
            ]
        };

        if(this.props.vizType === 'overview'){

            return(
                <div>
                    <button id="sortMenu" onClick={this.handleClick}>
                        Sort By: {this.state.sortName}
                    </button>
                    {children}
                </div>
    
            );

        } else {
            return false;
        };
    }
    
}

export default Sort;