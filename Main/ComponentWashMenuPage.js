import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
    Dimensions,
    BackHandler,
    ScrollView,
    Platform, PixelRatio, TouchableOpacity, ListView
} from "react-native";
import { Package,Device} from "miot";
import {TitleBarWhite} from 'miot/ui';
import { connect } from "react-redux";
import MODELS from '../Data/Mode_Wash';
import SelectableButton from './SelectableButton';
import TouchableButton from './TouchableButton';
import { getString } from '../Util/Strings';
import {setCycle, setStartPause} from "../Data/setData";
import Swiper from 'react-native-swiper'
import {getIntTimeRemain, getProcessOption, getProcessProcessing} from "../Util/WashTools";
// import WASH_MODES from "../Data/Mode_Wash";
// import Picker from "rmc-picker/lib/Picker";
// import {
//     setDirtyLevel, setDrySet,
//     setExtraTime,
//     setRinseTime,
//     setSpeed,
//     setTemp,
//     setWaterLevel
// } from "../Data/setData";
import GridMItem from "./GridMItem";
let window = Dimensions.get('window');

const RATIO = (window.width / 360) > 1.5 ? 1.5 : (window.width / 360);
const BTN_WIDTH = 55 ;
const TITLES = [ 'dailywash','boiling','quick','babycare','sport','babycareboiling','babycarespeedup','babycareeco','babycaresoft','babycarestain',
    'spin','rinse','shirt','underwear','drumclean']

// const TITLES = [ 'dailywash','boiling','quick','babycare','delicate','down','heavy','cotton','dryairwash','wool',
//     'spin','rinse','shirt','underwear','drumclean']

// 参数裂变数组
const PARAM_LIST = [
    // { 'param': 'dirtinessLevel', 'name': getString('dirtinessLevel'), 'def': 'dirty_level' },
    { 'param': 'washTemp', 'name': getString('washTemp'), 'def': 'temp_default' },
    { 'param': 'washRinseTime', 'name': getString('rinseFrequency'), 'def': 'rinse_time' },
]

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
 class ComponentWashMenuPage extends Component {

    constructor(props) {
        super(props);
        this.initialPage = parseInt(TITLES.indexOf(this.props.cycle)/6);
         this.state = {
            currentPage: this.initialPage,
             paramDataSource: ds.cloneWithRows(PARAM_LIST),
             paramDetailView_model_visible: false,
             paramModeViewTitle: '',
             paramDetailDataSource: [],
        };
    };

    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        };
    };
     componentDidMount() {
         this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
             this.goBack(); // works best when the goBack is async
             return true;
         });
     }
     componentWillUnmount() {
         this.backHandler.remove();
     }
     componentWillReceiveProps(nextProps) {
         if (nextProps.state !== 'standby') {
             // this.goBack();
         } else if (nextProps !== this.props) {
             this.setState({
                 paramDataSource: ds.cloneWithRows(PARAM_LIST)
             })
             return true;
         }
     }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.state == 'off' || nextProps.state == 'run' || nextProps.state == 'delay'  || nextProps == 'eoc') {
            this.props.navigation.replace('ComponentMainPage');
            return false;
        }
        else{
            return nextProps !== this.props || nextState !== this.state;
        }

    }
    render() {
        var modesForPage0 = [];
        var modesForPage1 = [];
        var modesForPage2 = [];
        //console.log('get_scale',window.scale+"width:"+window.width+"height:"+window.height)
        for (var i = 0; i < TITLES.length; i++) {
            var title = TITLES[i];
            var mode = (
                <View key={i} style={styles.mode_container}>
                    <SelectableButton
                        width={BTN_WIDTH}
                        height={BTN_WIDTH}
                        onPress={   (title)=> this._generateOnClickedFunction(title)}
                        title={title}
                        titleSize={13}
                        btKey={'1'}
                        imageNormal={MODELS[title].imageNormal}
                        imagePressed={MODELS[title].imagePressed}
                        imageSelected={MODELS[title].imageSelected}
                        buttonState={this.props.cycle == title ? 'selected' : 'normal'}
                    />
                </View>
            );
            if (i < 6) {
                modesForPage0.push(mode);
            }
            else if (i < 12) {
                modesForPage1.push(mode);
            }
            else {
                modesForPage2.push(mode);
            }

        }
        return (

            <View style={styles.container}>
                <View style={{ flex: 1, backgroundColor: '#f7f7f7'}}>
                <Image
                    style={styles.background}
                    source={require("../Resources/wash_menu_background.png")}
                    resizeMode='stretch'/>
                <TitleBarWhite
                    title= {this.props.navigation.state.params.superPage =='ComponentMainPage' ? getString('chooseWash'):  getString('delay')}
                    onPressLeft={() => {this.goBack()}}
                />
                        <Swiper
                                dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 6, height: 6, borderRadius:5, marginLeft: 5, marginRight:5}} />}
                                activeDot={<View style={{backgroundColor: '#fff', width: 6, height: 6, borderRadius: 7, marginLeft: 5, marginRight: 5}} />}
                                paginationStyle={{
                                    bottom:10 ,
                                }}
                                index={this.state.currentPage}
                                loop={false}>
                                <View style={styles.modes_container_page}>
                                    {modesForPage0}
                                </View>
                                <View style={styles.modes_container_page}>
                                    {modesForPage1}
                                </View>
                                <View style={styles.modes_container_page}>
                                    {modesForPage2}
                                </View>
                        </Swiper>

                </View>

                <View style={styles.grid_container}>
                    <View style={styles.cells}>
                        <View style={[styles.cell ,{borderRightWidth: 1, borderBottomWidth: 1}]}>
                            <GridMItem
                                style={{position: 'absolute'}}
                                text={MODELS[this.props.cycle ].displayTime}
                                unit={getString('minute')}
                                detail={getString('washDuration')}
                            />
                        </View>
                        <View style={[styles.cell, {borderBottomWidth: 1}]}>
                            <GridMItem
                                style={{position: 'absolute', right: 1}}
                                text={MODELS[this.props.cycle].temp}
                                unit='℃'
                                detail={getString('washTemp')}
                            />
                        </View>
                        <View style={[styles.cell, {borderRightWidth: 1}]}>
                            <GridMItem
                                style={{position: 'absolute', bottom: 1}}
                                text={MODELS[this.props.cycle].rinse_time}
                                unit={getString('times')}
                                detail={getString('rinseFrequency')}
                            />
                        </View>
                        <View style={styles.cell}>
                            <GridMItem
                                style={{position: 'absolute', right: 1, bottom: 1}}
                                text={MODELS[this.props.cycle].maxLoad}
                                unit={getString('kilogram')}
                                detail={getString('maximum')}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.btn_container}>
                    <TouchableButton
                        width={314 * RATIO}
                        height={40 * RATIO}
                        fontSize={16}
                        underlayColor={'#edeff0'}
                        text={this.props.navigation.state.params.superPage =='ComponentMainPage' ? getString('startWash'):  getString('determine')}
                        onPress={this._onBottomButtonClicked.bind(this)}
                    />
                </View>
            </View>
        );
    }

     //返回
    goBack() {
        this.props.navigation.goBack();

    }
    //模式选择
    _generateOnClickedFunction(mode) {
        setCycle(mode)
    }

    //开始洗涤
    _onBottomButtonClicked() {
        if (this.props.navigation.state.params.superPage =='ComponentMainPage' ) {
            setStartPause('true','run',()=>this.props.navigation.replace('ComponentMainPage'))
        }else {
            this.props.navigation.goBack();

        }


    }
}

const kBackgroundHeight = window.height/ 2 ;//蓝色背景的高度
const kPageControlHeight = 35;
const kCellHeight = 66 ;
const kCellWidth = 136 ;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        // alignItems: 'center',
        // width: window.width,
    },
    titleBackground:{
        flex: 1,
        position: 'absolute',
    },
    background: {
        width: window.width,
        height:kBackgroundHeight,
        position: 'absolute',
    },
    modes_container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'transparent',
    },
    modes_container_page: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    mode_container: {
        width: window.width / 3,
        height: (kBackgroundHeight - kPageControlHeight - 80) / 2,
        alignItems: 'center',
        justifyContent: 'center',

    },
    page_control: {
        position: 'absolute',
        left: (window.width - 60) / 2,
        top: kBackgroundHeight - kPageControlHeight,
        width: 60,
        height: kPageControlHeight,
    },
    grid_container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    grid_bottom: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    cells: {
        height: kCellHeight * 2,
        width: kCellWidth * 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cell: {
        height: kCellHeight,
        width: kCellWidth,
        borderColor: 'rgba(0, 0, 0, 0.3)'
    },
    btn_container: {
        marginBottom: 23 * RATIO,
        alignItems: 'center',
    },

});


const mapStateToProps = (store) => ({
    state: store.mDevice.state,
    processing: getProcessProcessing(store.mDevice.process),
    cycle: store.mDevice.cycle,
    time_remain:store.mDevice.time_remain,
    child_lock: store.mDevice.child_lock,
    fault: store.mDevice.fault,
    isFirstOpen: store.isFirstOpen.isFirstOpen

});

export default connect(mapStateToProps)(ComponentWashMenuPage);