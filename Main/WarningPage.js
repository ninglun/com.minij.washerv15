import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions, Animated,
} from "react-native";
import PropTypes from "prop-types";
import { Package,  } from 'miot';
import {getString} from "../Util/Strings";



var WARNING_MOLDES = {
    'dF': {
        title: getString('dF_title'),
        methods: ['检查机门是否开着，确保机门关紧；', '门锁开关插线是否松动接触不良；', '电脑板线束是否脱落。'],
    },
    'SF': {
        title: '进水异常',
        methods: ['检查进水龙头是否打开；', '清洁进水阀过滤器；', '检查水压；', '检查排水阀是否堵住。'],
    },
    '_F': {
        title: '排水异常',
        methods: ['清洁排水阀；', '检查排水管是否正确安装；', '检查排水管是否堵住。'],
    },
    'LF': {
        title: '到达补水次数，水位仍过低',
        methods: ['检查排水阀是否堵住；', '检查水压是否正常；', '检查是否有漏水情况发生。'],
    },
    'UF': {
        title: '不平衡报警',
        methods: ['衣物偏心过大，衣物缠绕，整理好重新放入；', '增加所洗衣服的数量；', '检查洗衣机底脚是否调整水平。'],
    },
    'CF': {
        title: '电脑板与驱动板通讯异常',
        methods: ['关机，检查电机连接电抗器线是否有脱落；', '检查电机转接线与电缆线是否有脱落；', '检查电脑板接线是否有脱落。'],
    },
    'HO': {
        title: '水温过高5秒以上',
        methods: ['此时请勿让儿童靠近洗衣机，开机重启；', '拔掉电源线，等待冷却后重新插电开启.'],
    },
    'tF': {
        title: '温度传感器异常',
        methods: ['检查温度传感器（NTC）的插线是否有接触不良；', '用万用表检测温度传感器冷态的电阻，是否大于1.5MΩ；','检查温度传感器与电脑板的连线及插接是否接触不良。'],
    },
    '~F': {
        title: '水位过高',
        methods: ['将压力传感器软管重新理顺后试机；', '检查排水阀是否有问题；','检查压力开关软管是否堵塞。'],
    },
    'HU': {
        title: '电压异常',
        methods: ['供电电压不稳定；', '待电压稳定后，程序将自动运行；', '购买一个能够稳定电压的设备。'],
    },
    'LU': {
        title: '电压异常',
        methods: ['供电电压不稳定；', '待电压稳定后，程序将自动运行；', '购买一个能够稳定电压的设备。'],
    },


    //下面的报警模式已经废弃了。
    'rf': {
        title: '洗涤电机故障',
        methods: ['检查衣物是否过多或卡住，断电冷却一段时间后，可以重新上电运行；', '等待降温；', '断电后重新启动；', '联系客服。'],
    },
    'HF': {
        title: '水加热管故障',
        methods: ['断电后重新启动；', '联系客服。'],
    },
    'CE': {
        title: '通讯故障',
        methods: ['断电后重新启动；', '联系客服。'],
    },
    '3C': {
        title: '变频板故障',
        methods: ['等待干扰消失，断电再上电；', '断电后重新启动；', '联系客服。'],
    },
    'bF': {
        title: '按键卡住',
        methods: ['将按键复位。'],
    },

};

var window = Dimensions.get('window');
const RATIO = (window.width / 360) > 1.5 ? 1.5 : (window.width / 360);

export default class WarningPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
        // componentWillReceiveProps: function(nextProps) {
        //     this.setState({
        //         currentState: nextProps.buttonState
        //     });
        // },

    render(){
        var methods = [];
        var model = WARNING_MOLDES[this.props.warningType];
        for (var i = 0; i < model.methods.length; i++) {
            methods.push(
                <View key={'item' + i} style={styles.method}>
                    <Image style={styles.method_num_background} source={ require("../Resources/method_num_background.png")} resizeMode='contain'/>
                    <Text style={styles.method_num}>{i + 1}</Text>
                    <Text style={styles.method_detail}>{model.methods[i]}</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.warning_container}>
                    <Image style={styles.warning_image}
                           source={ require("../Resources/warn.png")}
                           resizeMode='contain'/>
                    <Text style={styles.warning_title}>{model.title}</Text>
                    <Text
                        style={[styles.warning_title, {marginTop: 10}]}>{getString('error_code') + this.props.warningType + ')'}</Text>
                </View>
                <View style={{ flex: 1,justifyContent:'center'}}>
                    <Text style={styles.method_title}>{getString('methods')}</Text>
                    <View style={styles.method_container}>
                        {methods}
                    </View>
                </View>
                <View style={styles.bottom}>
                </View>
            </View>
        );
    }
}


var styles = StyleSheet.create({

    container: {
        flex: 1,
        width: window.width,
    },
    warning_container: {
        flex: 1,
        alignItems: 'center',
    },
    warning_image: {
        marginTop: 150 * RATIO,
        width: 79 * RATIO,
        height: 79 * RATIO,
    },
    warning_title: {
        marginTop: 18 * RATIO,
        fontSize: 16,
        fontFamily:'Kmedium',
        textAlign: 'center',
        color: '#fff',
        opacity: 0.8,
    },
    method_title: {
        marginLeft: 32 * RATIO,
        fontSize: 14,
        fontFamily:'Kmedium',
        color: '#fff',
        opacity: 0.7,
        marginBottom: 18 * RATIO,
        // marginRight: 32 * RATIO,
    },
    method_container: {
        marginLeft: 32 * RATIO,
        marginRight: 32 * RATIO,
        // backgroundColor: 'yellow',
        // marginRight: 32 * RATIO,
    },
    method: {
        flexDirection: 'row',
        marginBottom: 13 * RATIO,
    },
    method_num_background: {
        top:2,
        width: 13,
        height: 13,
    },
    method_num: {
        position: 'absolute',
        left:3,
        fontSize: 12,
        color: '#000',
        opacity: 0.8,
        textAlign: 'center',
    },
    method_detail: {
        fontFamily:'Kmedium',
        marginLeft: 5,
        fontSize: 14,
        color: '#fff',
        opacity: 0.8,
    },
    bottom: {
        height: 30 * RATIO,
    },

});
WarningPage.propTypes = {
    warningType: PropTypes.string,
};



