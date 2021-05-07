import React from 'react';

class Switch extends React.Component {
    constructor(props){
        super(props);

        this.handleSortType = this.handleSortType.bind(this);
        this.sortWithCriteria = this.sortWithCriteria.bind(this);

    }

    componentDidMount(){
        let isChecked = this.props.checkState.isChecked[this.props.name];
        let sortType = this.props.name;

        if(isChecked){
            this.sortWithCriteria(this.props.data, sortType);
        }
        

    }

    componentDidUpdate(prevProps){
        let name = this.props.name;
        if ((prevProps.checkState.isChecked[name] === false) && (this.props.checkState.isChecked[name] === true)){
            this.sortWithCriteria(this.props.data, name);
        }
    }


    handleSortType(sortType){

        let isChecked = this.props.checkState.isChecked[this.props.name];

        if (isChecked === false){
            this.sortWithCriteria(this.props.data, sortType);
        }
        this.props.changeCheckState();
    }

    sortWithCriteria(data, name){
        let sortedData = data;

        sortedData.sort(function(a, b){
            return b[name] - a[name];
        });

        this.props.onChangeSort(sortedData);
        
    }





    render() {

        return(

            <div>
                <label class="switch">
                    <input 
                        type="checkbox" 
                        checked={this.props.checkState.isChecked[this.props.name]} 
                        onChange={() => {this.handleSortType(this.props.name)}}/>
                    <span class="slider round"></span>
                </label>
            </div>

        );
    }
    
}

export default Switch;