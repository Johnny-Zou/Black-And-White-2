import React, {Component} from 'react';

import { connect } from 'react-redux';

class Footer extends Component {
    constructor(props){
        super(props);
    }

    render(){
        var footerContent;
        if (this.props.page == "Game") {
            footerContent = "Game " + this.props.game_id;
        } else {
            footerContent = this.props.page;
        }
        return(
            <div className="footer">
                <div className="footer__pageText">
                    <div className="footer__pageTextFade"></div>
                    <h1>{footerContent}</h1>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return({
        page: state.pageNav.currPage,
        game_id: state.game.game_id
    });
};

export default connect(mapStateToProps, {})(Footer);
