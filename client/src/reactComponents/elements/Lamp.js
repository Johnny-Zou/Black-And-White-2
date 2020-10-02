import React, {Component} from 'react';

class Lamp extends Component {
    constructor(props){
        super(props);

        this.setLampHeight = this.setLampHeight.bind(this);
        this.setLampTransitionTime = this.setLampTransitionTime.bind(this);

        this.lampRef = React.createRef();
    }

    setLampTransitionTime(prevProps){
        var mode = this.props.mode;
        if(mode === "player"){
            var diff = prevProps.max_points - this.props.max_points;

            var transitionDelay = [];
            var transitionLength = [];
            var totalTransitionTime = 0.5;

            var current = prevProps.max_points;
            var lowerBound = 79;
            var accumulatedDelay = 0;
            for (var i = 0; i < 5; i++) {
                if ( current > lowerBound && current > this.props.max_points){
                    transitionDelay[i] = accumulatedDelay;
                    transitionLength[i] = Math.min(current - lowerBound,current - this.props.max_points)/diff * totalTransitionTime;
                    
                    current = Math.max(lowerBound,this.props.max_points);
                    accumulatedDelay += transitionLength[i];
                    lowerBound -= 20;
                } else {
                    lowerBound -= 20;
                    transitionDelay[i] = 0;
                    transitionLength[i] = 0;
                }
            }

            this.lampRef.current.children[0].children[0].style.transition = "all " + transitionLength[0] + "s linear " + transitionDelay[0] + "s";
            this.lampRef.current.children[1].children[0].style.transition = "all " + transitionLength[1] + "s linear " + transitionDelay[1] + "s";
            this.lampRef.current.children[2].children[0].style.transition = "all " + transitionLength[2] + "s linear " + transitionDelay[2] + "s";
            this.lampRef.current.children[3].children[0].style.transition = "all " + transitionLength[3] + "s linear " + transitionDelay[3] + "s";
            this.lampRef.current.children[4].children[0].style.transition = "all " + transitionLength[4] + "s linear " + transitionDelay[4] + "s";

        } else if(mode === "opponent"){
            // no opponent animation
        }
    }

    setLampHeight(){
        var mode = this.props.mode;

        if (mode === "player"){
            var max_points = this.props.max_points;

            var lampHeight = [];

            lampHeight[0] = Math.min(100,Math.max((max_points-79)/20*100,0));
            lampHeight[1] = Math.min(100,Math.max((max_points-59)/20*100,0));
            lampHeight[2] = Math.min(100,Math.max((max_points-39)/20*100,0));
            lampHeight[3] = Math.min(100,Math.max((max_points-19)/20*100,0));
            lampHeight[4] = Math.min(100,max_points/19*100);

            this.lampRef.current.children[0].children[0].style.height = lampHeight[0] + "%";
            this.lampRef.current.children[1].children[0].style.height = lampHeight[1] + "%";
            this.lampRef.current.children[2].children[0].style.height = lampHeight[2] + "%";
            this.lampRef.current.children[3].children[0].style.height = lampHeight[3] + "%";
            this.lampRef.current.children[4].children[0].style.height = lampHeight[4] + "%";

            for (var i = 0; i < 5; i++) {
                if ( lampHeight[i] > 0 ){
                    this.lampRef.current.children[i].style.background = "rgba(100,100,100,1)";
                } else {
                    this.lampRef.current.children[i].style.background = "rgba(50,50,50,1)";
                }
            }

        } else if (mode === "opponent"){
            var lamps = this.props.lamps;

            for (var i = 0; i < 5; i++) {
                if ( i < 5 - lamps){
                    this.lampRef.current.children[i].children[0].style.height = "0%";
                } else {
                    this.lampRef.current.children[i].children[0].style.height = "100%";
                }
            }
        }
    }

    componentDidUpdate(prevProps){
        this.setLampTransitionTime(prevProps);
        this.setLampHeight();
    }

    render(){
        return(
            <div className={"lamp " + "lamp--" + this.props.type}>
                <div ref={this.lampRef} className="lamp__elWrapper">
                    <div className="lamp__element"><div className="lamp__elementFill"></div></div>
                    <div className="lamp__element"><div className="lamp__elementFill"></div></div>
                    <div className="lamp__element"><div className="lamp__elementFill"></div></div>
                    <div className="lamp__element"><div className="lamp__elementFill"></div></div>
                    <div className="lamp__element"><div className="lamp__elementFill"></div></div>
                </div>
            </div>
        );
    }
}

export default Lamp;
