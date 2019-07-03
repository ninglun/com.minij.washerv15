import React, { Component } from "react";

import {
    StyleSheet,
    Text,
    ListView,
    FlatList,
    View,
    Image,
    TouchableHighlight,
    StatusBar,
    Platform,
    PixelRatio,
    Dimensions, BackHandler
} from 'react-native';
import { Host, Device } from 'miot';
import { TitleBarBlack,TitleBarWhite } from 'miot/ui';
import { getString } from '../Util/Strings';

var BUTTONS = [
  '测试对话框',
  '确定',
];

let { width: WINDOW_WIDTH } = Dimensions.get("window");


export default class ComponentMoreMenu extends Component {

  constructor(props) {
    super(props);
    // var ds = new ListView.DataSource({
    //   rowHasChanged: (r1, r2)=>r1!==r2
    // });
    // this._createMenuData();
    this.state = {
      settingList: [

        {
          'name':  getString('deviceName'),
          'func': () => {
            Host.ui.openChangeDeviceName();
          }
        },
        {
          'name': getString('shareDevice'),
          'func': () => {
            Host.ui.openShareDevicePage();
          }
        },
        {
          'name': getString('firmwareUpgrate'),
          'func': () => {
            Host.ui.openDeviceUpgradePage();
          }
        },

        {
          'name': getString('deleteDevice'),
          'func': () => {
            Host.ui.openDeleteDevice();
          }
        },
          {
              'name': getString('addToDesktop'),
              'func': () => {
                  Host.ui.openAddToDesktopPage();
              }
          },
          {
              'name': getString('deviceTimeZone'),
              'func': () => {
                  Host.ui.openDeviceTimeZoneSettingPage();
              }
          },
        {
          'name': getString('feedBack'),
          'func': () => {
            Host.ui.openFeedbackInput();
          }
        }
      ]
    };
  }

  _createMenuData() {
    var commonMenuData = [];

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


  render() {
    let dataList = this.state.settingList;
    return (
        <View style={styles.container}>
          <TitleBarBlack style={styles.titleBar} title={getString('washSetting')} onPressLeft={() => { this.goBack() }}/>
          <FlatList
            style={{width:WINDOW_WIDTH}}
            data={dataList}
            ItemSeparatorComponent={this._separator}
            renderItem={this._renderItem} />
        </View>
    );
  }

  goBack() {
    this.props.navigation.goBack();
  }

  _separator = () => {
    return <View style={{height:1 / PixelRatio.get(),backgroundColor:"rgba(0,0,0,0.15)"}}/>;
  }

  _renderItem = (item) => {
    return (
      <TouchableHighlight style={{ backgroundColor: '#fff', width:WINDOW_WIDTH }} onPress={() => this._pressRow(item.item)}>
          <View style={{ backgroundColor: '#fff', width:WINDOW_WIDTH }}>
              <View style={styles.rowListContainer}>
                  <Text style={ {color: '#000', fontSize: 15 ,marginLeft: 20}}>{item.item.name}</Text>
                  <Text style={styles.subtitle}>{item.subtitle ? Device.deviceName : ''}</Text>
                  <Image style={styles.subListArrow} source={require('../Resources/sub_arrow.png')} />
              </View>
              {/*<View style={styles.separator}></View>*/}
          </View>
      </TouchableHighlight>
    )
  }

  _renderRow(rowData, sectionID, rowID) {
    console.log(rowData);
    console.log(sectionID);
    console.log(rowID);
    return (
      <TouchableHighlight underlayColor='#838383' onPress={() => this._pressRow(rowID)}>
        <View>
          <View style={styles.rowContainer}>
            <Text style={styles.title}>{rowData}</Text>
            <Image style={styles.subArrow} source={this.props.app.sourceOfImage("sub_arrow.png")} />
          </View>
          <View style={styles.separator}></View>
        </View>
      </TouchableHighlight>
    );
  }

  _pressRow(item) {
    item.func();
  }

  onShowDidButtonPress() {
    // this.props.navigator.push(HelloDeveloper.route);
  }

  showReactART() {
    // this.props.navigator.push(HelloReactART.route);
  }

  showActionSheet() {
    // ActionSheetIOS.showActionSheetWithOptions({
    //       options: BUTTONS,
    //       destructiveButtonIndex: 1,
    //       },
    //       (buttonIndex) => {
    //
    //       });
  }
  openPowerCostPage() {
    // this.props.navigator.push(PowerCostPage.route);
  }
  openWaterCostPage= () =>  {
    // this.props.navigator.push(WaterCostPage.route);
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  titleBar: {
    backgroundColor: '#efefef'
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
      fontFamily:'Kmedium' ,
      fontSize: 16,
      flex: 2,
  },
  subtitle: {
      fontFamily:'Kmedium' ,
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
