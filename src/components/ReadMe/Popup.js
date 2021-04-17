import React from 'react';
import './Popup.css';

class Popup extends React.Component {
    constructor(props){
        super(props);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
      componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.props.show) {
          this.props.handleClose();
        }
    }

    render() {
    return(
        <div className={this.props.show ? "modal display-block" : "modal display-none"}>
        <div className="modal-main" ref={this.setWrapperRef}>
            {this.props.children}
            <button type="button" onClick={this.props.handleClose} className="closeButton">
            X
            </button>
        </div>
        </div>
        )
    }
}

// { ({ handleClose, show, children }) => 



export default Popup;