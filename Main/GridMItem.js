
import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import PropTypes from "prop-types";

export default class GridMItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            unit: this.props.unit,
            detail: this.props.detail,
        };
    };
    componentWillReceiveProps(nextProps) {
        this.setState({
            text: nextProps.text,
            unit: nextProps.unit,
            detail: nextProps.detail,
        });
    }

    render() {

        var propStyles = [this.props.style, {flexDirection:'row'}];
        if (this.state.detail == '洗涤温度' && this.state.text == 0) {
            var text = '--';
        }
        else {
            var text = this.state.text;
        }

        return (
            <View style={propStyles}>
                <Text style={{ fontFamily:'D-DINCondensed',color:'black',fontSize:42, marginRight:6, opacity:0.8}}>{text}</Text>
                <View>
                    <Text style={{color:'gray',fontSize:14, marginTop:12, opacity:0.8}}>{this.state.unit}</Text>
                    <Text style={{color:'gray',fontSize:14, marginTop:4, opacity:0.8}}>{this.state.detail}</Text>
                </View>
            </View>
        );
    }
}
GridMItem.propTypes = {
    style: PropTypes.object,
    unit: PropTypes.string,
    detail: PropTypes.string,
    text:PropTypes.number,

};


