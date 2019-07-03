import React, { Component } from "react";
import {
    StyleSheet,
    View,

} from "react-native";
import PropTypes from "prop-types";

export default class PageControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: this.props.currentPage,
        };
    };

    // getInitialState() {
    //     return {
    //
    //     };
    // }

    componentWillUpdate() {
        // LayoutAnimation.easeInEaseOut();
        //加上这一句，会引起导航栏pop时的动画出现问题；
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            currentPage: nextProps.currentPage,
        });
    }

    render() {
        var points = [];
        var radius = this.props.pointRadius == undefined ? 3 : this.props.pointRadius;//小圆点的半径
        for (var i = 0; i < this.props.numberOfPages; i++) {
            var color = i == this.state.currentPage ? this.props.pointSelectedColor : this.props.pointDefaultColor;
            var point = (
                <View
                    style={{width: radius * 2, height: radius * 2, borderRadius: radius, backgroundColor: color}}
                    key={i}
                />
            );
            points.push(point);
        }

        var viewProps = {
            style: ([styles.container, this.props.style]: ?Array<any>),
        };

        return (
            <View {...viewProps}>
                {points}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor:'transparent',
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});

PageControl.propTypes = {
    currentPage: PropTypes.number,
    pointRadius: PropTypes.number,
    pointSelectedColor: PropTypes.string,
    pointDefaultColor: PropTypes.string,
    style: PropTypes.number


};
