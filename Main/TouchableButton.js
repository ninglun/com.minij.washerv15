
import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    PixelRatio,
} from "react-native";
import PropTypes from "prop-types";
 export default class TouchableButton extends Component {


    render() {
        var btn_style = {
            width: parseInt(this.props.width),
            height: parseInt(this.props.height),
            borderRadius: parseInt(this.props.height) / 2.0,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1 / PixelRatio.get(),
            borderColor: '#b0b0b0',
            backgroundColor: '#ffffff'
        };

        return (
            <TouchableHighlight
                onPress={this.props.onPress}
                underlayColor={this.props.underlayColor}
                style={btn_style}
                >
                <Text style={[styles.text, {fontSize: this.props.fontSize, opacity: 0.8, color: '#000000'}]}>
                    {this.props.text}
                </Text>
            </TouchableHighlight>
        );
    }
}

var styles = StyleSheet.create({
    text: {
        textAlign: 'center',
    },
});

TouchableButton.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    onPress: PropTypes.func,
    underlayColor:PropTypes.string,
    text:PropTypes.string,

};

