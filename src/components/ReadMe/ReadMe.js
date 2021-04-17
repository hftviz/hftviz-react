import React from 'react';
import Popup from './Popup';
import SlideShow from './SlideShow'

class ReadMe extends React.Component {
    constructor(props){
        super(props);

        this.state = { show: false };
    }
  
    showModal = () => {
      this.setState({ show: true });
    }
    
    hideModal = () => {
      this.setState({ show: false });
    }
      
    render() {
      return (
        <div style={{width:'100%', height:'5%', marginLeft:'1%', marginTop:'3%'}}>
          <button type='button' onClick={this.showModal} id="ReadMe">How to read this Visualization?</button>
          <Popup show={this.state.show} handleClose={this.hideModal} >
                <SlideShow vizType={this.props.vizType} />
          </Popup>
        </div>
      )
    }
  }

export default ReadMe;