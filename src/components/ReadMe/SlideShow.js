import React from 'react';
import './Popup.css';
import overviewImage from '../../pics/overview.png';
import lobImage from '../../pics/lob.png';
import liqImage from '../../pics/liq.png';
import liqCorrImage from '../../pics/liqCorr.png';
import corrwithMarket from '../../pics/corrwithMarket.png';

// Warning that received from the browser: the better way for updating state is to update it via setState.
class SlideShow extends React.Component {
    constructor(props){
        super(props);

        this.state = {slideIndex: 0} ;

        this.localVars = {images:[], slideCaptions:[]};

        this.handleNextSlide = this.handleNextSlide.bind(this);
        this.handlePreviousSlide = this.handlePreviousSlide.bind(this);
        this.handleSlideShow = this.handleSlideShow.bind(this);
    }

    handleSlideShow(){
        let selectedImages = [],
        selectedCaptions = [];

        if( this.props.vizType === 'overview'){
            selectedImages = [overviewImage];
            selectedCaptions = ["This is the overview caption. It describes the parts of the visualization."];
        } else{
            selectedImages = [lobImage, liqImage, liqCorrImage, corrwithMarket];
            selectedCaptions = [
                "This is the viz-1 caption. It describes the parts of the visualization.", 
                "This is the viz-2 caption. It describes the parts of the visualization.",
                "This is the viz-3 caption. It describes the parts of the visualization.",
                "This is the viz-4 caption. It describes the parts of the visualization."
            ];
        }

        this.localVars.images = selectedImages;
        this.localVars.slideCaptions = selectedCaptions;
    }


    handleNextSlide(){

        let sliderLength = this.localVars.images.length;

        this.setState({
            slideIndex: (((this.state.slideIndex + 1)%sliderLength)+sliderLength)%sliderLength
        });
    }

    handlePreviousSlide(){

        let sliderLength = this.localVars.images.length;

        this.setState({
            slideIndex: (((this.state.slideIndex - 1)%sliderLength)+sliderLength)%sliderLength
        });
    }


    render() {

        this.handleSlideShow();

        return(

            <div className="slideShow"> 

                <button className="nextSlide" onClick={this.handleNextSlide}> &#62; </button>
                <button className="previousSlide" onClick={this.handlePreviousSlide}> &#60; </button>
                <img className="slideImage" src={this.localVars.images[this.state.slideIndex]} alt="slide show"/>
                <div className="caption">{this.localVars.slideCaptions[this.state.slideIndex]}</div>
            
            </div>

        );
    }
    
}

export default SlideShow;