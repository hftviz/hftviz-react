import React from 'react';
import './selectedBox.css';

class SelectedItem extends React.Component {
    constructor(props){
        super(props);

        this.handleCancelClick = this.handleCancelClick.bind(this); 
    }

    handleCancelClick(){
        this.props.onChangeSelectedStocks(this.props.name, "remove");
    }

    render() {
        return(

            <div className="selectedItem"> 
                <div className="closeSelectedItem" onClick={this.handleCancelClick}> {"X  "} </div>
                <div className="itemText">{"  "+this.props.name.split('--')[1]}</div>
            </div>

        );
    }
    
}

export default SelectedItem;