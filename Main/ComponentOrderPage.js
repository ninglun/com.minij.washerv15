import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ListView,
    Text,
    FlatList,
    Dimensions,
    PixelRatio,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    StatusBar,
    Platform, BackHandler,
} from 'react-native';

import Picker from 'rmc-picker'
// var WashMenuPage = require('./WashMenuPage');
import {TitleBarBlack} from "miot/ui";
import TouchableButton from './TouchableButton';
var window = Dimensions.get('window');
import MODELS from '../Data/Mode_Wash';
import { connect } from "react-redux";
const RATIO = (window.width / 360) > 1.5 ? 1.5 : (window.width / 360);
var TIME_MODELS = ['03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',];
import { getString } from '../Util/Strings';
import {setDelayRealTime} from "../Data/setData";
import {getProcessProcessing} from "../Util/WashTools";

const PARAM_LIST = [
    { 'param': 'cycle', 'name': getString('WashingMode'), 'def': 'cycle' },
    { 'param': 'orderTime', 'name': getString('OrderTime'), 'def': '03' },
]
/*
import {
    setDelayRealTime,
} from '../Data/setData';
import WASH_MODES from "../Data/Mode_Wash";
import {setExtraTime, setRinseTime, setSpeed, setTemp, setWaterLevel} from "../Data/setData";
*/


let settingList = new Array();
let { width: WINDOW_WIDTH } = Dimensions.get("window");

settingList = [
        {
            'name': 'deviceName',
            'func': () => {
                Host.ui.openChangeDeviceName();
            }
        }
    ];
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
class ComponentOrderPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            washMode: this.props.cycle,
            dataSource: ds.cloneWithRows(PARAM_LIST),
            pickerNowValue: TIME_MODELS[0],
            pickerSelectedValue: TIME_MODELS[0],
            paramDetailView_model_visible: false,
            paramModeViewTitle: '',
            paramDetailDataSource: [],
        };
    }

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

    shouldComponentUpdate(nextProps, nextState) {

        if (nextProps.state == 'off' || nextProps.state == 'run') {
            this.props.navigation.replace('ComponentMainPage');
            return false;
        } else {
            return nextProps !== this.props || nextState !== this.state;
        }

    }
    // <PickerIOS
    //      style={styles.picker}
    //      itemStyle={{fontSize: 25, color: '#1cbcf5', textAlign: 'center', fontWeight: 'bold'}}
    //      selectedValue={index}
    //      onValueChange={this._onValueChange.bind(this)}>
    //      {TIME_MODELS.map((value) => (
    //          <PickerItemIOS
    //              key={value}
    //              value={value}
    //              label={value}
    //          />
    //      ))}
    //  </PickerIOS>
    render() {
      var picker;
      var buttonText = getString('btn_start');
      var index = this.state.pickerSelectedValue;
      picker = (
          <View style={styles.picker_container}>
              <Picker
                  itemStyle={{color: '#1cbcf5',fontSize: 25,textAlign: 'center'}}
                  selectedValue={this.state.pickerSelectedValue}
                  style={styles.picker}
                  onValueChange={(v) => this._onValueChange(v)}>
                  {TIME_MODELS.map((value) => (
                      <Text key={value} label={value} value={value}>{value}</Text>
                  ))}
              </Picker>
              <View style={styles.blue_view} />
              <Text style={styles.blue_text}>{getString('timeFinish')}</Text>
          </View>
      );
      return (
          <View style={styles.container}>
              <TitleBarBlack
                  title={getString('delay')}
                  onPressLeft={() => { this.goBack() }} />
              <ListView
                  dataSource={ds.cloneWithRows([{
                      washMode: MODELS[this.props.cycle].title
                  }])}
                  renderRow={this._renderRow}
                  renderSeparator={this._renderSeparator}
                  scrollEnabled={false}
              />
              {picker}
              <View style={styles.btn_container}>
                  <TouchableButton
                      width={314 * RATIO}
                      height={40 * RATIO}
                      fontSize={16}
                      underlayColor={'#f2f2f2'}
                      onPress={()=>this._bottomButtonClicked()}
                      text={buttonText}
                  />
              </View>
          </View>
      );
   }

   _onValueChange(pickerSelectedValue) {
      console.log(pickerSelectedValue);
       this.setState({
           pickerSelectedValue: pickerSelectedValue,
       });
   }

   _bottomButtonClicked() {
       let delayIntTime = this.state.pickerSelectedValue+"hour"
       setDelayRealTime(delayIntTime,() => {this.goBack()})

   }

   goBack() {
     this.props.navigation.goBack();
   }
    _renderRow = (rowData, sectionID, rowID) => {
        return (
            <TouchableHighlight key={rowID} onPress={ ()=>this.jumpToMenu()} underlayColor='#f2f2f2'>
                <View style={styles.list_row}>
                    <Text style={styles.font_title}>{getString('WashMode')}</Text>
                    <Text style={styles.font_mode}>{rowData.washMode}</Text>
                    <Image
                        style={styles.list_right_arrow}
                        source={require('../Resources/sub_arrow.png')}
                        resizeMode='contain'/>
                </View>
            </TouchableHighlight>
        );
  }



   _renderSeparator(sectionID, rowID) {
        return (
            <View key={rowID} style={styles.list_separator}/>
        );
    }
  jumpToMenu() {
    this.props.navigation.navigate('ComponentWashMenuPage', {
        superPage: 'OrderPage',
    })
  }

}



var styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
    },

    // listView相关
    list_row: {
        flexDirection: 'row',
        alignItems: 'center',//交叉轴居中
        height: 64 * RATIO,
        width: window.width,
    },

    font_title: {
        flex: 1,
        fontSize: 16,
        color: '#000000',
        opacity: 0.8,
        marginLeft: 23 * RATIO,
    },

    font_mode: {
        fontSize: 14,
        color: '#000000',
        opacity: 0.5,
    },

    list_right_arrow: {
        marginLeft: 7 * RATIO,
        marginRight: 26 * RATIO,
        width: 7,
        height: 13,
        // backgroundColor: 'red',
    },

    font_time: {
        marginLeft: 10 * RATIO,
        marginRight: 26 * RATIO,
        fontSize: 14,
        color: '#000000',
        opacity: 0.5,
    },

    list_separator: {
        height: 1 / PixelRatio.get(),
        backgroundColor: '#b0b0b0',
        opacity: 0.5,
        marginLeft: 23 * RATIO,
        marginRight: 23 * RATIO,
    },

    // picker相关
    picker_container: {
        width: window.width,
        height: 222,
        borderColor: '#b0b0b0',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        // borderWidth: 1,
    },

    picker: {
        width: window.width,
        borderTopWidth: 1 / PixelRatio.get(),
        borderBottomWidth: 1 / PixelRatio.get(),
        borderColor: '#e3e3e3',
    },

    picker_item: {
        backgroundColor: 'red',
        color: '#1cbcf5'
    },

    blue_view: {
        position: 'absolute',
        top: 93,
        width: 8,
        height: 35,
        left: 0,
        backgroundColor: '#1cbcf5',
    },

    blue_text: {
        fontFamily:'D-DIN' ,
        position: 'absolute',
        top: 102,
        left: window.width * 0.5 + 26 * RATIO,
        fontSize: 10,
        color: '#1cbcf5',
    },

    btn_container: {
        height: 86 * RATIO,
        justifyContent: 'center',
        alignItems: 'center',
    },

    rowContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#fff',
        height: 50,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center'
    },
    rowListContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#fff',
        height: 50,
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        flex: 2,
    },
    subtitle: {
        fontSize: 14,
        flex: 1,
        color: 'rgb(138,138,138)',
        textAlign: "right",
        marginRight: 5

    },
    subArrow: {
        width: 6.5,
        height: 13,
    },
    subListArrow: {
        width: 6.5,
        height: 13,
        marginRight:20,
    },
    separator: {
        height: 1 / PixelRatio.get(),
        backgroundColor: '#ddd',
    }

});

const mapStateToProps = (store) => ({
    state: store.mDevice.state,
    processing: getProcessProcessing(store.mDevice.process),
    cycle: store.mDevice.cycle,
    child_lock: store.mDevice.child_lock,
    time_remain:store.mDevice.time_remain,
    fault: store.mDevice.fault,
});

export default connect(mapStateToProps)(ComponentOrderPage);
