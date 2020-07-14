import React, {Component} from 'react';

class Header extends Component {
    constructor(props){
        super(props);
        // state
        this.state = {
        };
    }

    render(){
        return(
            <div className="header">
                <h1 className="header__title">Black and White 2</h1>
            </div>
        );
    }
}

export default Header;
