import React from 'react';
import Menu from './components/Menu';
import Panel from './components/Panel';


class Viz extends React.Component {
    constructor(props){
        super(props);

        // this keeps the state for controlling the viz
        this.state = {
            filterText: '',
            selectedStocks: [],
            sortType: '',
            binSize: 0,
            dateTime: '2019-01-03',
            vizType: 'overview'
        };

        // this keeps the filter text updated.
        this.handleChangeFilterText = this.handleChangeFilterText.bind(this);

        // this keeps the selected stocks list in the state updated.
        this.handleChangeSelectedStocks = this.handleChangeSelectedStocks.bind(this);

        // this keeps the sort format for the data.
        this.handleChangeSort = this.handleChangeSort.bind(this);

        // this keeps the bin size for the visualization
        this.handleChangeBinSize = this.handleChangeBinSize.bind(this);

        // this keeps the date based on the selected value by user.
        this.handleChangeDate = this.handleChangeDate.bind(this);

        // this function is triggered when we change the state from overview to details visualization. 
        // View OD and ReadMe components will use Viz Type.
        this.handleChangeVizType = this.handleChangeVizType.bind(this);
    }

    handleChangeFilterText(filterText){
        this.setState({
            filterText: filterText
        });
    };
    handleChangeSelectedStocks(stock){

        if (this.state.selectedStocks.length === 10){
                alert("You reached the maximum capacity. Please remove some stocks.");
        } else {
            this.setState({
                selectedStocks: [...new Set(this.state.selectedStocks.concat([stock]))]
            });
        }
    };
    handleChangeSort(sortType){
        this.setState({
            sortType: sortType
        });
    };
    handleChangeBinSize(binSize){
        this.setState({
            binSize: binSize
        });
    };
    handleChangeDate(dateTime){
        this.setState({
            dateTime: dateTime
        });
    };
    handleChangeVizType(vizType){
        this.setState({
            vizType: vizType
        });
    };






    render() {
        return(
            <div id="viz">

                {/* Define menu with the variables */}
                <Menu 
                    stockNames = {this.props.stockNames}
                    filterText = {this.state.filterText}
                    selectedStocks = {this.state.selectedStocks}
                    sortType = {this.state.sortType}
                    binSize = {this.state.binSize}
                    dateTime = {this.state.dateTime}
                    vizType = {this.state.vizType}

                    onChangeFilterText = {this.handleChangeFilterText}
                    onChangeSelectedStocks = {this.handleChangeSelectedStocks}
                    onChangeSort = {this.handleChangeSort}
                    onChangeBinSize = {this.handleChangeBinSize}
                    onChangeDate = {this.handleChangeDate}
                    onChangeVizType = {this.handleChangeVizType}
                />

                {/* Define panel with the variables */}
                <Panel 
                    data = {this.props.data}
                    stockNames = {this.props.stockNames}
                    filterText = {this.state.filterText}
                    selectedStocks = {this.state.selectedStocks}
                    sortType = {this.state.sortType}
                    binSize = {this.state.binSize}
                    dateTime = {this.state.dateTime}
                    vizType = {this.state.vizType}
                    
                    onChangeFilterText = {this.handleChangeFilterText}
                    onChangeSelectedStocks = {this.handleChangeSelectedStocks}
                    onChangeSort = {this.handleChangeSort}
                    onChangeBinSize = {this.handleChangeBinSize}
                    onChangeDate = {this.handleChangeDate}
                    onChangeVizType = {this.handleChangeVizType}
                />
            </div>
        );
    }
    
}

export default Viz;