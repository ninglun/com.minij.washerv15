import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
} from "react-native";
import WASH_MODELS from '../Data/Mode_Wash';
import PropTypes from 'prop-types';
import connect from "react-redux/es/connect/connect";
import {getProcessProcessing} from "../Util/WashTools";

var window = Dimensions.get('window');
let RATIO = window.width / 360.0;
let btnWidth = 54 * RATIO;

class SelectableButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: this.props.buttonState,
            opacity: this.props.opacity,
            pressAnimationScale: new Animated.Value(1.0),
            pressAnimationOpacity: new Animated.Value(0.0),
        };
    };
    // getInitialState(){
    //     return {
    //         currentState: this.props.buttonState,
    //         opacity: this.props.opacity,
    //         pressAnimationScale: new Animated.Value(1.0),
    //         pressAnimationOpacity: new Animated.Value(0.0),
    //     };
    // }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    }


    _onPress() {
        if (this.props.animation ) {//如果有动画
            this.state.pressAnimationScale.setValue(1.0);
            this.state.pressAnimationOpacity.setValue(1.0);
            Animated.parallel(
                [
                    Animated.timing(
                        this.state.pressAnimationOpacity,
                        {
                            duration: 500,
                            toValue: 0.0,
                        }
                    ),
                    Animated.timing(
                        this.state.pressAnimationScale,
                        {
                            duration: 500,
                            toValue: 2.0,
                        }
                    )
                ]
            ).start( this.props.onPress);//动画完成后回调；
        }
        else {
           this.props.onPress(this.props.title)

        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            currentState: nextProps.buttonState,
            opacity: nextProps.opacity,
        });
    }

    render() {
        var imgStyle = {
            width: parseInt(this.props.width),
            height: parseInt(this.props.height),
            opacity: this.state.opacity,
        };

        var image;
        if (this.state.currentState == 'selected') {
            image = <Image
                style={[styles.img, imgStyle]}
                source={this.props.imageSelected}
                resizeMode='contain'
            />
        } else {
            image = <TouchableOpacity
                onPress={this._onPress.bind(this)}>
                <Image
                    style={[styles.img, imgStyle]}
                    source={this.props.imageNormal}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        }
        var animationView = null;
        if (this.props.animation ) {
            animationView = (
                <Animated.View style={[
                    styles.circle,
                    {
                        width: this.props.width,
                        height: this.props.height,
                        borderRadius: this.props.width * 0.5,
                        transform: [{scale: this.state.pressAnimationScale}],
                        opacity: this.state.pressAnimationOpacity,
                    }]}
                />
            );
        }

        return (
            <View style = {styles.container}>
                {animationView}
                {image}
                <Text style={[styles.title, {fontSize:this.props.titleSize, opacity:this.state.opacity}]}>
                    { this.props.btKey == '1' ? WASH_MODELS[this.props.title].title: this.props.title}
                </Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({

    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        // marginTop: 12 * RATIO,
    },
    title: {
        marginTop: 12 * RATIO,
        textAlign: 'center',
        color: '#fff',
        opacity: 0.8,
    },
    circle: {
        position: 'absolute',
        top: 0,
        borderWidth: 1,
        borderColor: '#21fff2',
        backgroundColor: 'transparent',
    },
});
SelectableButton.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    btKey:PropTypes.string,
    onPress: PropTypes.func,
    title:PropTypes.string,
    titleSize:PropTypes.number,
    imageNormal:PropTypes.number,
    imagePressed:PropTypes.number,
    imageSelected:PropTypes.number,
    animation:PropTypes.bool,
    opacity:PropTypes.number,
    buttonState:PropTypes.string
};
const mapStateToProps = (store) => ({
    state: store.mDevice.state,
    processing: getProcessProcessing(store.mDevice.process),
    cycle: store.mDevice.cycle,
    child_lock: store.mDevice.child_lock,
    time_remain:store.mDevice.time_remain,
    fault: store.mDevice.fault,
});

export default connect(mapStateToProps)(SelectableButton);


