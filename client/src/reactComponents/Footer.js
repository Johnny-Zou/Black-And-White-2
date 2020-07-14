import React, {Component} from 'react';

class Footer extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="footer">
                <div className="footer__pageText">
                    <div className="footer__pageTextFade"></div>
                    <h1>{this.props.page}</h1>
                </div>
            </div>
        );
    }
}

export default Footer;
