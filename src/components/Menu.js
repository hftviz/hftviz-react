import React from 'react';
import ReadMe from './ReadMe/ReadMe'
import logo from '../pics/logo.png';


class Menu extends React.Component {
    render() {
        return(

            <div id="panel-menu"> 

                <div id="menu-icon">
                    <img src={logo} alt="icon" className="img"/>
                </div>
                <div id="menu-description">
                    <p style={{margin: '3%'}}>
                        This design tends to visualize US stock market. 
                        By default, it shows the overview of the S&#38;P 500 companies on a default date. 
                        <br />You can select your stock by typing its name in search box below or click on its spot in the overview panel.
                    </p>
                </div>

                <ReadMe vizType={this.props.vizType}/>
                {/* <SearchBox />
                <SelectedBox />
                <Sort />
                <BinSize />
                <DateBox /> */}
                {/* Creating the button for view overview or details */}
                {/* <ViewOD /> */}

            </div>

        );
    }
    
}

export default Menu;