import React from 'react';
import Popup from './Popup';
import SlideShow from './SlideShow';
import helpIcon from '../../pics/help-icon.png';
import overvieDesc from "../../pics/description-overview.png";

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
      let pics = "";

      if(this.props.vizType === "overview"){
        pics = <div id="readMe-description">
          <img src={overvieDesc} alt="overview-desc-icon" className="img"/>
          <br/><br/>For more details, please click on the help icon.
          </div>;
      }

      return (
        <div id="readMe-container">
          <div onClick={this.showModal} id="readMe-icon"><img src={helpIcon} alt="readMe-icon" className="img"/></div>
          {pics}
          <Popup show={this.state.show} handleClose={this.hideModal} >
                <SlideShow vizType={this.props.vizType} />
          </Popup>
        </div>
      )
    }
  }

export default ReadMe;