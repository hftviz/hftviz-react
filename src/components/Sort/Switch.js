import React from 'react';
import overviewData from '../../data/overviewSampleData.json';

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
            this.sortWithCriteria(this.props.data, sortType, this.props.checkState, this.props.dateTime)
        }
        

    }

    componentDidUpdate(prevProps){
        let name = this.props.name;
        if ((prevProps.checkState.isChecked[name] === false) && (this.props.checkState.isChecked[name] === true)){
            this.sortWithCriteria(this.props.data, name, this.props.checkState, this.props.dateTime);
        }
    }


    handleSortType(sortType){

        let isChecked = this.props.checkState.isChecked[this.props.name];

        if (isChecked === false){
            this.sortWithCriteria(this.props.data, sortType, this.props.checkState, this.props.dateTime);
        }
        this.props.changeCheckState(sortType);
    }

    sortWithCriteria(data, name, checkState, date){
        let sortedData = data;

        sortedData.sort(function(a, b){

            // add default format for sorting
            if (checkState.isChecked["Default"] === true){
                let price_change_a = overviewData[a["Symbol"]][date]["priceChange"];
                let price_change_b = overviewData[b["Symbol"]][date]["priceChange"];

                let count_pos_a = 0,
                    count_neg_a = 0,
                    count_pos_b = 0,
                    count_neg_b = 0,
                    av_a,
                    av_b;
                
                let minVal_a = Math.min(...price_change_a);
                let maxVal_a = Math.max(...price_change_a);

                let minVal_b = Math.min(...price_change_b);
                let maxVal_b = Math.max(...price_change_b);

                price_change_a.forEach(element => {
                    if (element < 0.5*(minVal_a+maxVal_a)){
                        count_neg_a++;
                    }else{
                        count_pos_a++;
                    }
                });


                price_change_b.forEach(element => {
                    if (element < 0.5*(minVal_b+maxVal_b)){
                        count_neg_b++;
                    }else{
                        count_pos_b++;
                    }
                });

                av_a = (count_pos_a - count_neg_a);
                av_b = (count_pos_b - count_neg_b);

                console.log(a["Symbol"], count_pos_a, count_neg_a);


                return av_b - av_a;



            } else {
                return b[name] - a[name];
            }
            
        });

        this.props.onChangeSort(sortedData);
        
    }





    render() {

        return(

            <div>
                <label className="switch">
                    <input 
                        type="checkbox" 
                        checked={this.props.checkState.isChecked[this.props.name]} 
                        onChange={() => {this.handleSortType(this.props.name)}}/>
                    <span className="slider round"></span>
                </label>
            </div>

        );
    }
    
}

export default Switch;