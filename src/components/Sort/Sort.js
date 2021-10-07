import React from 'react';
import './Sort.css';
import SortItem from './SortItem';
import sortIcon from '../../pics/sort.png';
import Switch from "./Switch";

class Sort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isChecked:{"Volume": false, "MarketCap": false, "Default": true}};
        
        this.handleChecked = this.handleChecked.bind(this);
      }


    handleChecked(name){
        console.log(name);

        if (name === "Volume"){
            this.setState(prevState => {
                return {isChecked: {"Volume": !prevState.isChecked["Volume"] , "MarketCap": prevState.isChecked["MarketCap"], "Default": prevState.isChecked["Default"]}}; 
            });
        }

        if (name === "MarketCap"){
            this.setState(prevState => {
                return {isChecked: {"Volume": prevState.isChecked["Volume"] , "MarketCap": !prevState.isChecked["MarketCap"], "Default": prevState.isChecked["Default"]}}; 
            });
        }

        if (name === "Default"){
            this.setState(prevState => {
                return {isChecked: {"Volume": prevState.isChecked["Volume"] , "MarketCap": prevState.isChecked["MarketCap"], "Default": !prevState.isChecked["Default"]}}; 
            });
        }
    }
    

    render() {
        if(this.props.vizType === 'overview'){

            return(
                <div id="sortMenu" >
                    <div id="sortIcon">
                        <img src={sortIcon} alt="sort icon" className="img"/>
                    </div>
                    <div id="sortButtons">
                        <div id="MarketCap" className="sortButtonDiv">
                            <div className="sortLabel"> Market Cap </div>
                            <div className="sortButton">
                                <Switch
                                    name="MarketCap"
                                    data={this.props.sortData} 
                                    onChangeSort={this.props.onChangeSort}
                                    checkState={this.state}
                                    changeCheckState={this.handleChecked}
                                    dateTime={this.props.dateTime}
                                />
                            </div>

                        </div>
                        <div id="Volume" className="sortButtonDiv"> 
                            <div className="sortLabel"> Volume </div>
                            <div className="sortButton">
                                <Switch
                                    name="Volume"
                                    data={this.props.sortData} 
                                    onChangeSort={this.props.onChangeSort}
                                    checkState={this.state}
                                    changeCheckState={this.handleChecked}
                                    dateTime={this.props.dateTime}
                                />
                            </div>
                        </div>
                        <div id="Default" className="sortButtonDiv"> 
                            <div className="sortLabel"> Default </div>
                            <div className="sortButton">
                                <Switch
                                    name="Default"
                                    data={this.props.sortData} 
                                    onChangeSort={this.props.onChangeSort}
                                    checkState={this.state}
                                    changeCheckState={this.handleChecked}
                                    dateTime={this.props.dateTime}
                                />
                            </div>
                        </div>
                    </div>
                </div>
    
            );

        } else {
            return false;
        };
    }
    
}

export default Sort;