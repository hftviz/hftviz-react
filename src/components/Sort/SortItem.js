import React from 'react';

class SortItem extends React.Component {
    constructor(props){
        super(props);

        this.handleSortType = this.handleSortType.bind(this);
        this.sortWithCriteria = this.sortWithCriteria.bind(this);
    }

    handleSortType(sortType){

        this.sortWithCriteria(this.props.data, sortType);
        this.props.changeSortName(this.props.name);
        this.props.changeToggle();
    }

    sortWithCriteria(data, name){
        let sortedData = data;

        sortedData.sort(function(a, b){
            return b[name] - a[name];
        });

        this.props.onChangeSort(sortedData);

        console.log(sortedData);
        
    }





    render() {
        return(

            <button className="sortCriteria" type="button" onClick={() => {this.handleSortType(this.props.name)}}>
                {this.props.name}
            </button>

        );
    }
    
}

export default SortItem;