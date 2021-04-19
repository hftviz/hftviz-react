import React from 'react';
import Menu from './components/Menu';
import Panel from './components/Panel';


class Viz extends React.Component {
    constructor(props){
        super(props);

        // this keeps the state for controlling the viz
        this.state = {
            selectedStocks: [],
            sortData: this.props.stockNames,
            binSize: 5,
            dateTime: '2019-01-04',
            vizType: 'overview',
            zoomLevel: 'daily',
        };
        
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

        // handling change zoom to load the relevant data
        // note: in the production, we have to set the data based on zoom level. first, we start with the hour-minute base.
        this.handleChangeZoom = this.handleChangeZoom.bind(this);
    }

    handleChangeSelectedStocks(stock, action){
        if (action === 'add'){
            if (this.state.selectedStocks.length === 10){
                    alert("You reached the maximum capacity. Please remove some stocks.");
            } else {
                this.setState({
                    selectedStocks: [...new Set(this.state.selectedStocks.concat([stock]))]
                });
            }
        };

        if (action === 'remove'){
            let index = this.state.selectedStocks.indexOf(stock);

            // remove the element
            this.state.selectedStocks.splice(index, 1)

            // update the state
            this.setState({
                selectedStocks: this.state.selectedStocks
            });
        };
    };

    handleChangeSort(sortData){
        this.setState({
            sortData: sortData
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
    handleChangeZoom(zoomLevel){
        this.setState({
            zoomLevel: zoomLevel
        });
    };






    render() {
        return(
            <div id="viz">

                {/* Define menu with the variables */}
                <Menu 
                    filterText = {this.state.filterText}
                    selectedStocks = {this.state.selectedStocks}
                    sortData = {this.state.sortData}
                    binSize = {this.state.binSize}
                    dateTime = {this.state.dateTime}
                    vizType = {this.state.vizType}

                    onChangeSelectedStocks = {this.handleChangeSelectedStocks}
                    onChangeSort = {this.handleChangeSort}
                    onChangeBinSize = {this.handleChangeBinSize}
                    onChangeDate = {this.handleChangeDate}
                    onChangeVizType = {this.handleChangeVizType}
                />

                {/* Define panel with the variables */}
                <Panel 
                    detailData = {this.props.detailData}
                    stockNames = {this.props.stockNames}
                    filterText = {this.state.filterText}
                    selectedStocks = {this.state.selectedStocks}
                    sortData = {this.state.sortData}
                    binSize = {this.state.binSize}
                    dateTime = {this.state.dateTime}
                    vizType = {this.state.vizType}
                    zoomLevel = {this.state.zoomLevel}
                    
                    onChangeSelectedStocks = {this.handleChangeSelectedStocks}
                    onChangeSort = {this.handleChangeSort}
                    onChangeBinSize = {this.handleChangeBinSize}
                    onChangeDate = {this.handleChangeDate}
                    onChangeVizType = {this.handleChangeVizType}
                    onChangeZoomLevel = {this.handleChangeZoom}
                />
            </div>
        );
    }
    
}

export default Viz;