import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Platform,
    PixelRatio,
} from "react-native";
import {Package, Device, Host} from "miot";
import { TitleBarWhite} from 'miot/ui';
import { connect } from "react-redux";
import WASH_MODELS from '../Data/Mode_Wash';
import {setPower, setChildLock, setStartPause} from '../Data/setData';
import { getDataOnce } from '../Data/getData';
import SelectableButton  from './SelectableButton';
import WavePage  from './WavePage';
import WarningPage  from './WarningPage';
import { getString } from '../Util/Strings';
import {getIntTimeRemain,getProcessOption, getProcessProcessing} from "../Util/WashTools";
import ComponentMoreDialog from "../Main/ComponentMoreDialog";

let window = Dimensions.get("window");
const RATIO = (window.width / 360) > 1.5 ? 1.5 : (window.width / 360);
const btnWidth = 54 * RATIO;
const WASH_PHASE = {
    "delay" : '预约',
    'prewash' : '预洗',
    'mainwash' : getString('mainWash'),
    'rinse' : getString('rinseWash'),
    'spin' :  getString('spin'),
    'finish' : '结束',
    'pause' : getString('pause'),
    
};
class ComponentMainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            washState: 'powerOff',
            washPhase: '',
            dialogVisible: false
        };
    };
    shouldComponentUpdate(nextProps, nextState) {
            return nextProps !== this.props || nextState !== this.state;
    }
    componentWillMount() {
        getDataOnce();
    }
    componentDidMount() {
        Host.storage.load(['PrivateAndLicense'])
            .then((result) => {
                if (result == '') {
                    var licenseURL,privacyURL
                    if( Host.locale.language == 'en' ) {
                        licenseURL = require('../Assets/LicenseServiceEN.html');
                        privacyURL = require('../Assets/PrivacyPolicyEN.html');
                    } else if( Host.locale.language == 'zh' ) {
                        licenseURL = require('../Assets/LicenseService.html');
                        privacyURL = require('../Assets/PrivacyPolicy.html');
                    } else if( Host.locale.language == 'zh-hk' ) {
                        licenseURL = require('../Assets/LicenseService_hant.html');
                        privacyURL = require('../Assets/PrivacyPolicy_hant.html');
                    } else if( Host.locale.language == 'zh-tw' ) {
                        licenseURL = require('../Assets/LicenseService_hant.html');
                        privacyURL = require('../Assets/PrivacyPolicy_hant.html');
                    }
                    Host.ui.openPrivacyLicense(getString('license'), licenseURL, getString('privacy'), privacyURL)
                        .then((result) => {
                            console.log('openPrivacyLicense result: ', result);
                            if (result === true) {
                                Host.storage.set('PrivateAndLicense', true);
                            }
                        })
                        .catch((error) => {
                            console.log('openPrivacyLicense error: ', error);
                        });
                }
            })
            .catch((error) => {

            });
    }
    componentWillReceiveProps(nextProps) {

    }


    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        };
    };

    //跳转到设置页面
    onSetting() {
        // 此只有IOS可用，ANDROID不可用，

        if (Platform.OS == 'ios'){
            //Host.ui.openNewMorePage();
            this.props.navigation.navigate('ComponentMoreMenu');
        }else {
           this.setState({dialogVisible: true});

        }

    }
    //分享截图
    onShow(){
        this.setState({loading: true});
        Host.file.screenShot("temp.png").then(result => {
            Host.ui.openShareListBar('小米智能家庭', '小米智能家庭', {local: "temp.png"}, 'http://www.mi.com')
                .then(result => this.setState({loading: false})).catch(err => this.setState({loading: false}));
        }).catch(err => this.setState({loading: false}))
    }



    //进入预约界面
    _onOpenOrderPage(){
        this.props.navigation.navigate('ComponentOrderPage');
    }
    //进入模式选择界面
    _onOpenWashMenuPage(){

        this.props.navigation.navigate('ComponentWashMenuPage', {
            superPage: 'MainPage',
        });

    }
    //开关机
    onPowerOff(){
         setPower( this.props.state == "off" ? "on" : "off");
        //setPower( this.props.state == "on");
    }
    //童锁开关
    _onLockButtonClick() {
        setChildLock(this.props.child_lock =='off'? 'on' : 'off');
    }
    //洗涤开始/暂停
    _onPauseButtonClick(){
        setStartPause(this.props.state === 'run' ? 'false' : 'true','run',()=>{});

    }
    // //预约开始/暂停
    _orderPauseButtonClick(){
        setStartPause(this.props.state === 'delay' ? 'false' : 'true','delay',()=>{});

    }
    // 按钮style
    _generateButton(title, imageNormal, imageHighlight, onPress, isAnimated, opcity) {
        return(
            <SelectableButton
                width={btnWidth}
                height={btnWidth}
                onPress={onPress}
                title={title}
                btKey={'0'}
                titleSize={13}
                imageNormal={imageNormal}
                imagePressed={imageHighlight}
                animation={isAnimated}
                opacity={opcity}
                buttonState={ 'normal'}
            />
        );
    }
    render() {
        return (
                <ImageBackground style={styles.background}   source={require("../Resources/background.png")}   resizeMode='stretch' >
                    {this.titleTarBar()}
                    <View style={{ flex: 1 }}>
                    {this.washStateView()}
                    </View>
                    <ComponentMoreDialog
                        visible={this.state.dialogVisible}
                        onVisibleChange={(visible) => {if(!visible && visible!= this.state.dialogVisible) this.setState({dialogVisible: false})}}
                        navigation={this.props.navigation} />
                </ImageBackground>

        );
    }


    titleTarBar(){
        if (Platform.OS == "ios"){
          if (Device.isOwner) {
              return (
                  <TitleBarWhite
                      title= {
                        <View style={styles.titleBarContainer}>
                        <Image style={{  alignItems: 'center', justifyContent: 'center' , width:Platform.OS === "ios" ?  113 :366, height: Platform.OS === "ios" ? 22:72}}  source={ Host.locale.language == 'en'? require( "../Resources/logo_en.png") : require( "../Resources/logo.png") }/>
                        </View>
                      }
                      onPressLeft={() => { Package.exit() }}
                      onPressRight={() => { this.onSetting()}}
                      onPressRight2={() => { this.onShow()}}
                  />
              )
          }else {
              return (
                  <TitleBarWhite
                      title= {
                        <View style={styles.titleBarContainer}>
                        <Image style={{  alignItems: 'center', justifyContent: 'center' , width:Platform.OS === "ios" ?  113 :366, height: Platform.OS === "ios" ? 22:72}}  source={ Host.locale.language == 'en'? require( "../Resources/logo_en.png") : require( "../Resources/logo.png") }/>
                        </View>
                      }
                      onPressLeft={() => { Package.exit() }}
                      onPressRight={() => { this.onSetting()}}
                      onPressRight2={() => { this.onShow()}}
                  />
              )
          }
        }

        else {
          if (Device.isOwner) {
              return (
                  <TitleBarWhite
                      title= { 
                      <Image style={{alignItems: 'center', justifyContent: 'center' , width:Platform.OS === "ios" ?  113 :366, height: Platform.OS === "ios" ? 22:72}}  source={Host.locale.language == 'en'? require( "../Resources/logo_en.png") : require("../Resources/logo.png")}/>}
                      onPressLeft={() => { Package.exit() }}
                      onPressRight={() => { this.onSetting()}}
                      onPressRight2={() => { this.onShow()}}
                  />
              )
          }else {
              return (
                  <TitleBarWhite
                      title= { <Image style={{alignItems: 'center', justifyContent: 'center',width:Platform.OS === "ios" ?  113 :366, height: Platform.OS === "ios" ? 22:72}} source={Host.locale.language == 'en'? require( "../Resources/logo_en.png") : require("../Resources/logo.png")}/>}
                      onPressLeft={() => { Package.exit() }}
                      onPressRight={() => { this.onSetting()}}
                      onPressRight2={() => { this.onShow()}}
                  />
              )

          }
        }
    }

    washStateView(){

        var topContent = null;//顶部的内容;
        var circleContent = null;//圆圈里面的内容；
        var bottom = null;//底部;
        let washPhase;
        washPhase = WASH_PHASE[this.props.processing];
        // 如果是处在报警状态；
        if (this.props.state === 'fault') {
            return (
                <View style={{flex: 1}}>

                    <View style={styles.container}>
                        <WarningPage warningType={this.props.fault}/>
                    </View>
                </View>
            );
        }
        //this.props.state
        switch (this.props.state) {
            case 'off':
            {
                circleContent = (
                    <View style={styles.circle_container}>
                        <View style={[styles.horizontal_line, {marginTop: 88 * RATIO, width: 92}]}/>
                        <Text style={styles.font30}>{getString('poweredOff')}</Text>
                        <View style={[styles.horizontal_line, {marginTop: 12 * RATIO, width: 92}]}/>
                        <View style={styles.circle_bottom_container}>
                        {/*{<Text  style={styles.font16}>{getString('noDelaying')}</Text>}*/}
                        </View>
                    </View>
                );
                bottom = (
                    <View style={[styles.bottom, {justifyContent: 'center'}]}>
                        {this._generateButton(getString("openCloseWashMachine"), require("../Resources/switch_btn_normal.png" ), require("../Resources/switch_btn_pressed.png" ), ()=>this.onPowerOff(), true ,0.6)}
                    </View>
                );
            }
                break;

            case 'standby':
            {
                circleContent = (
                    <View style={styles.circle_container}>
                        <View style={[styles.horizontal_line, {marginTop: 88 * RATIO, width: 92}]}/>
                        <Text style={styles.font30}>{getString('standing')}</Text>
                        <View style={[styles.horizontal_line, {marginTop: 12 * RATIO, width: 92}]}/>
                        <View style={styles.circle_bottom_container}>
                            <Text  style={styles.font16}>{getString('noDelaying')}</Text>
                        </View>
                    </View>
                );
                bottom = (
                    <View style={[styles.bottom, {justifyContent: 'space-between', marginLeft: 43 * RATIO, marginRight: 43 * RATIO}]}>
                        {this._generateButton(getString("powerOff"), require("../Resources/icon_switch_off.png"), require("../Resources/icon_switch_pressdown.png"), ()=> this.onPowerOff(), true)}
                        {this._generateButton(getString("delay"), require("../Resources/icon_order_off.png"), require("../Resources/icon_order_pressdown.png"), ()=>this._onOpenOrderPage(), false)}
                        {this._generateButton(getString("chooseWash"), require("../Resources/icon_washing_off.png"), require("../Resources/icon_washing_pressdown.png"),()=> this._onOpenWashMenuPage(), false)}
                    </View>
                );
            }
                break;
            case 'run':
            {
                topContent = (
                    <Text style={styles.font16}>{'WASH_MODELS[this.props.cycle].title'}</Text>
                );
                circleContent = (
                    <View style={styles.circle_container}>
                        <View style={{marginTop: 68 * RATIO, flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
                            <View style={[styles.horizontal_line, {marginRight: 6, width: 32}]} />
                            <Text style={styles.font16}>{getString("remainTime")}</Text>
                            <View style={[styles.horizontal_line, {marginLeft: 6, width: 32}]} />
                        </View>
                        <Text style={[styles.digital_font48, {marginTop: 18 * RATIO}]}>
                            {getIntTimeRemain(this.props.time_remain)}
                        </Text>
                        <View style={[styles.circle_bottom_container, {marginTop: 16 * RATIO}]}>
                            <Text style={styles.font16}>{washPhase}</Text>
                        </View>
                    </View>
                );

                if (this.props.child_lock === 'off') {
                    var lockButton = this._generateButton(getString("child_lock"), require("../Resources/lock_btn_normal.png"), require("../Resources/lock_btn_pressed.png"), ()=>this._onLockButtonClick(), true);
                    var pauseButton = this._generateButton(getString("pause"), require("../Resources/pause_btn_normal.png"),require("../Resources/pause_btn_pressed.png"),()=> this._onPauseButtonClick(), true);
                    var powerButton = this._generateButton(getString("powerOff"), require("../Resources/switch_btn_selected.png"), require("../Resources/switch_btn_pressed.png"), ()=>this.onPowerOff(), true);

                }
                else {//处于童锁状态时，暂停,开关不可以操作；
                    var lockButton = this._generateButton(getString("child_lock"), require("../Resources/lock_btn_selected.png"), require("../Resources/lock_btn_pressed.png"), ()=>this._onLockButtonClick(), true);
                    var pauseButton = this._generateButton(getString("pause"), require("../Resources/pause_btn_normal.png"), require("../Resources/pause_btn_normal.png"), function(){}, false, 0.5);
                    var powerButton = this._generateButton(getString("powerOff"), require("../Resources/switch_btn_normal.png"), require("../Resources/switch_btn_normal.png"), function(){}, false, 0.5);
                }
                bottom = (
                    <View style={[styles.bottom, {justifyContent: 'space-between', marginLeft: 43 * RATIO, marginRight: 43 * RATIO}]}>
                        {powerButton}
                        {lockButton}
                        {pauseButton}
                    </View>
                );
            }
                break;

            case 'delay':
            {
                topContent = (
                    <Text style={styles.font16}>{WASH_MODELS[this.props.cycle].title}</Text>
                );
                circleContent = (
                    <View style={styles.circle_container}>
                        <View style={[styles.horizontal_line, {marginTop: 88 * RATIO, width: 92}]}/>
                        <Text style={styles.font30}>{getString("delaying")}</Text>
                        <View style={[styles.horizontal_line, {marginTop: 12 * RATIO, width: 92}]}/>
                        <View style={styles.circle_bottom_container}>
                            <Text style={styles.digital_font21}>{getIntTimeRemain(this.props.time_remain)}</Text>
                            <Text style={[styles.font16, {marginTop: 7 * RATIO}]}>{getString("remainTime")}</Text>
                        </View>
                    </View>
                );

                if (this.props.child_lock === 'off') {
                    var lockButton = this._generateButton(getString("child_lock"), require("../Resources/lock_btn_normal.png"), require("../Resources/lock_btn_pressed.png"), ()=>this._onLockButtonClick(), true);
                    var pauseButton = this._generateButton(getString("pause"), require("../Resources/pause_btn_normal.png"),require("../Resources/pause_btn_pressed.png"),()=> this._orderPauseButtonClick(), true);
                    var powerButton = this._generateButton(getString("powerOff"), require("../Resources/switch_btn_selected.png"), require("../Resources/switch_btn_pressed.png"), ()=>this.onPowerOff(), true);

                }
                else {//处于童锁状态时，暂停按键不可以操作；
                    var lockButton = this._generateButton(getString("child_lock"), require("../Resources/lock_btn_selected.png"), require("../Resources/lock_btn_pressed.png"), ()=>this._onLockButtonClick(), true);
                    var pauseButton = this._generateButton(getString("pause"), require("../Resources/pause_btn_normal.png"), require("../Resources/pause_btn_normal.png"), function(){}, false, 0.5);
                    var powerButton = this._generateButton(getString("powerOff"), require("../Resources/switch_btn_normal.png"), require("../Resources/switch_btn_normal.png"), function(){}, false, 0.5);
                }
                bottom = (
                    <View style={[styles.bottom, {justifyContent: 'space-between', marginLeft: 43 * RATIO, marginRight: 43 * RATIO}]}>
                        {powerButton}
                        {lockButton}
                        {pauseButton}
                    </View>
                );
            }
                break;

            case 'pause':
            {
                topContent = (
                    <Text style={styles.font16}>{WASH_MODELS[this.props.cycle].title}</Text>
                );
                circleContent = (
                    <View style={styles.circle_container}>
                        <View style={[styles.horizontal_line, {marginTop: 88 * RATIO, width: 92}]}/>
                        <Text style={styles.font30}>{this.props.time_remain>=180 ? getString("delayPause") : getString("washPause")}</Text>
                        <View style={[styles.horizontal_line, {marginTop: 12 * RATIO, width: 92}]}/>
                        <View style={styles.circle_bottom_container}>
                            <Text style={styles.digital_font12}>{getIntTimeRemain(this.props.time_remain)}</Text>
                            <Text style={[styles.font16, {marginTop: 7 * RATIO}]}>{ getString("remainTime")}</Text>
                        </View>
                    </View>
                );

                bottom = (
                    <View style={[styles.bottom, {justifyContent: 'space-between', marginLeft: 43 * RATIO, marginRight: 43 * RATIO}]}>
                        {this._generateButton(getString("powerOff"),require("../Resources/switch_btn_selected.png"), require("../Resources/switch_btn_pressed.png"), ()=>this.onPowerOff(), true)}
                        {this._generateButton(getString("child_lock"), require("../Resources/lock_btn_normal.png"), require("../Resources/lock_btn_normal.png"), function(){}, false, 0.5)}
                        {this._generateButton(getString("startWash"), require("../Resources/pause_btn_normal.png"), require("../Resources/pause_btn_pressed.png"),()=>this._onPauseButtonClick(), true)}
                    </View>
                );
            }
                break;
            case 'eoc':
            {
                topContent = (
                    <Text style={styles.font16}>{WASH_MODELS[this.props.cycle].title}</Text>
                );
                circleContent = (
                    <View style={styles.circle_container}>
                        <View style={[styles.horizontal_line, {marginTop: 88 * RATIO, width: 92}]}/>
                        <Text style={styles.font30}>{getString("washFinish")}</Text>
                        <View style={[styles.horizontal_line, {marginTop: 12 * RATIO, width: 92}]}/>
                        <View style={styles.circle_bottom_container}>
                            {/*<Text  style={styles.font16}>{ getString("noDelaying")}</Text>*/}
                        </View>
                    </View>
                );
                bottom = (
                    <View style={[styles.bottom, {justifyContent: 'center'}]}>
                        {this._generateButton(getString("powerOff"), require("../Resources/switch_btn_selected.png"), require("../Resources/switch_btn_pressed.png"), ()=> this.onPowerOff(), true)}
                    </View>
                );
            }
                break;
            default:
        }
        return(
            <View style={styles.container}>
                <View style={styles.top}>
                    {topContent}
                </View>
                <View style={styles.middle}>
                    <View style={styles.circle}>
                        <View style={styles.wave}>
                            <WavePage  style={{borderRadius: 110 * RATIO}}/>
                        </View>
                        <Image
                            style={[styles.circle, {position:'absolute'}]}
                            source={require('../Resources/status_circle.png')}
                            resizeMode='contain'/>
                        {circleContent}
                    </View>
                </View>
                {bottom}
            </View>
        )
    }


}




var styles = StyleSheet.create({

    background: {
        flex: 1,
        width: window.width,
        height: window.height,
    },
    container: {
        position: 'absolute',
        top: 0,
        backgroundColor: 'transparent',
        width: window.width,
        height: window.height,
        // alignItems: 'center',
    },
    titleBarContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: window.width - 180
    },
    top: {
       flex:1
    },
    middle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom: {
        flex:2,
        flexDirection: 'row',
        alignItems: 'center',//交叉轴居中
    },
    circle : {
        width: 276 * RATIO,
        height: 276 * RATIO,
    },
    wave: {
        position: 'absolute',
        top: 28 * RATIO,
        left: 28 * RATIO,
        width: 220 * RATIO,
        height: 220 * RATIO,
        alignItems: 'center',//交叉轴居中
    },
    circle_container: {
        position: 'absolute',
        top: 0,
        width: 276 * RATIO,
        height: 276 * RATIO,
        alignItems: 'center',//交叉轴居中
    },
    horizontal_line: {
        height: 1 / PixelRatio.get(),
        backgroundColor: '#fff',
        opacity: 0.5,
    },

    digital_font12: {
        fontFamily: 'DS-Digital',
        fontSize: 12,
        textAlign: 'center',
        color: '#fff',
        opacity: 0.8,
    },
    font30: {
        fontSize: 22,
        fontFamily:'D-DIN' ,
        marginTop: 12 * RATIO,
        color: '#fff',
        alignItems: 'center',
        opacity: 0.8,
    },
    digital_font48: {
        fontFamily: 'DS-Digital',
        fontSize: 48,
        color: '#fff',
        alignItems: 'center',
        opacity: 0.8,
    },
    circle_bottom_container: {
        flex: 1,
        marginTop: 26 * RATIO,
        width: 276 * RATIO,
        marginBottom: 28 * RATIO,
        // borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    font16: {
        fontSize: 16,
        fontFamily:'D-DIN' ,
        textAlign: 'center',
        color: '#fff',
        opacity: 0.8,
    },
    digital_font21: {
        fontFamily: 'DS-Digital',
        fontSize: 21,
        textAlign: 'center',
        color: '#fff',
        opacity: 0.8,
    },

    button: {
        width: 54 * RATIO,
        height: 54 * RATIO,
    },
});


const mapStateToProps = (store) => ({
    state: store.mDevice.state,
    processing: getProcessProcessing(store.mDevice.process),
    cycle: store.mDevice.cycle,
    child_lock: store.mDevice.child_lock,
    time_remain:store.mDevice.time_remain,
    fault: store.mDevice.fault,
});

export default connect(mapStateToProps)(ComponentMainPage);
