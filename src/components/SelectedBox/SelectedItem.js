import React from 'react';

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
                {this.props.name.split('--')[1]}
                <button type="button" className="closeSelectedItem" onClick={this.handleCancelClick}>
                    <div style={{width:'100%', height:'100%', position:'inherit', bottom:'60%', right:'5%'}}>
                        &times;
                    </div>
                </button>
            </div>

        );
    }
    
}

export default SelectedItem;