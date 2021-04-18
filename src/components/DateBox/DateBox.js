import React from 'react';
import './DateBox.css';

class DateBox extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.keyPress = this.keyPress.bind(this);
    }

    handleChange(e){
        this.props.onChangeDate(e.target.value);
    }

    keyPress(e){
        e.preventDefault();
    }


    render() {
        return(

            <input 
            id="inputDate" 
            type="date" 
            min="2018-01-01" 
            max="2020-12-31" 
            value={this.props.dateTime}
            onChange={this.handleChange}
            onKeyPress={this.keyPress}
        />

        );
    }
    
}

export default DateBox;