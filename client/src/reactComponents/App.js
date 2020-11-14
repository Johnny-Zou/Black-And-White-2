import React, {Component} from 'react';
import io from 'socket.io-client';
import '../scss/main.scss'

// Pages
import Menu from './pages/Menu.js';
import Join from './pages/Join.js';
import Game from './pages/Game.js';
import Tutorial from './pages/Tutorial.js';
import Credits from './pages/Credits.js';

// Components
import Header from './Header.js';
import Footer from './Footer.js';

// Redux
import { connect } from 'react-redux';
import { changePage } from './actions/changePage.js';

class App extends Component {
    constructor(props){
        super(props);

        // Routing
        var path = window.location.pathname.toLowerCase()

        if (path === "/credits"){
            this.props.changePage("Credits");
        } else if (path === "/tutorial"){
            this.props.changePage("Tutorial");
        } else if (path.substring(0,5) === "/game"){
            this.props.changePage("Join");
        }
           
    }

    render(){
        var Body;
        if(this.props.currPage === "Menu"){
            Body = <Menu/>;
        } else if(this.props.currPage === "Join"){
            Body = <Join/>;
        } else if(this.props.currPage ==="Game"){
            Body = <Game/>;
        } else if(this.props.currPage ==="Tutorial"){
            Body = <Tutorial/>;
        } else if(this.props.currPage ==="Credits"){
            Body = <Credits/>;
        } else{
            Body = <h1>Page not found </h1>;
        }

        return(
            <div className="appContainer">
                <Header/>
                {Body}
                <Footer page={this.props.currPage}/>
            </div>
        );
    }
}

function mapStateToProps(state){
    return({
        currPage: state.pageNav.currPage
    });
};

export default connect(mapStateToProps, { changePage })(App);
