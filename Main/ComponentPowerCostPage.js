import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    StatusBar,
    ScrollView,
    Platform,
    Dimensions,
    TouchableWithoutFeedback, BackHandler
} from "react-native";
import Chart from '../Chart/Chart';//注意不可以用下面那种方式；
// var Chart = require('../CommonModules/Chart/Chart');
var window = Dimensions.get('window');
import { connect } from "react-redux";
import { Host, Device, Service } from 'miot';
import { TitleBarBlack,TitleBarWhite } from 'miot/ui';
import { getString } from '../Util/Strings';
const RATIO = (window.width / 375) > 1.5 ? 1.5 : (window.width / 375);
const TITLES = [getString('times'), getString('week'), getString('month')];
const BAR_WIDTH = 30;//柱的宽度
const X_AXIS_WIDTH = 80;//x轴坐标的宽度
const CHART_LEFT = -30;//之所以设置为-30，是为了不显示y轴坐标

class ComponentPowerCostPage extends Component{

  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedIndex: 0,
      dataPoint: 0,
      onceData: [],
      weekData: [],
      monthData: [],
    };
  }

  static navigationOptions = ({ navigation }) => {
      return {
          header: null
      };
  };
    componentWillUnmount() {
        this.backHandler.remove();
    }
  componentDidMount() {
    console.log('didMount');
    this._requestOnceData();
    this._requestWeekData();
    this._requestMonthData();
    console.log('didMountDone');
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
          this.goBack(); // works best when the goBack is async
          return true;
      });
  }

  goBack() {
      this.props.navigation.goBack();
  }

  render() {
    //tabbar
    var tabbarItems = [];
    for (var i = 0; i < TITLES.length; i++) {
      var tempColor = this.state.selectedIndex == i ? '#90bee4aa' : 'transparent';
      var tabbarItem = (
        <TouchableWithoutFeedback key={i} onPressIn={this._generateOnClickedFunction(i).bind(this)}>
          <View style={[styles.tabbarItem,{backgroundColor:tempColor}]}>
            <Text style={{color:'#f0f0f0bb'}}>{TITLES[i]}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
      tabbarItems.push(tabbarItem);
    }

    var powerCostList = [this.state.onceData, this.state.weekData, this.state.monthData];
    var currentData = powerCostList[this.state.selectedIndex];//当前要显示的数据；
    var chartWidth = X_AXIS_WIDTH * currentData.length;//根据要显示的数据，计算chart的宽度；
    if (chartWidth < window.width - CHART_LEFT) {
      chartWidth =  window.width - CHART_LEFT;//至少保证chart占满整个屏幕；
    }
    var contentOffsetX = chartWidth - (window.width - CHART_LEFT);//让scrollView滑到右边
    console.log(currentData);

    //显示数据的单位；
    if (this._dataType() == 'power') {
      var unit = getString('powerCost');
    }
    else {
      var unit = getString('waterCost');
    }

    return (
      <View style={styles.container}>
        <TitleBarWhite
                    title={getString('power_consumption')}
                    onPressLeft={() => this.goBack()} />
        <View style={styles.tabbarContainer}>
          <View style={{flex:1}} />
          <View style={styles.tabbarItemGroup}>
            {tabbarItems}
          </View>
        </View>
        <ScrollView
          horizontal={true}
          bounces={false}
          contentInset={{top:0, left:0, bottom:0, right:CHART_LEFT}}
          contentOffset={{x:contentOffsetX, y:0}}
          showsHorizontalScrollIndicator={false} >
          <Chart
            style={[styles.chart, {width: chartWidth}]}
            data={currentData}
            verticalGridStep={0.0001}
            tightBounds={true}
            type="bar"
            color="#90bee4"
            showGrid={false}
            axisColor='transparent'
            barWidth={BAR_WIDTH}
            onDataPointPress={this._onDataPointPress.bind(this)}
           />
         </ScrollView>
        <View style={styles.bottom}>
          <Text style={[styles.fontBase, {fontSize:30, marginBottom:6}]}>{this.state.dataPoint}</Text>
          <Text style={[styles.fontBase, {fontSize:14}]}>{TITLES[this.state.selectedIndex]+unit}</Text>
        </View>
      </View>
    );
  }

  _generateOnClickedFunction(index) {
    var powerCostList = [this.state.onceData, this.state.weekData, this.state.monthData];
    var currentData = powerCostList[index];
    var dataPoint = currentData.length ? currentData[currentData.length-1][1] : 0;
    var that = this;
    return function() {
      that.setState({
        selectedIndex: index,
        dataPoint: dataPoint,
      });
    }
  }

  _onDataPointPress(e, dataPoint, index) {
    this.setState({
      dataPoint: dataPoint,
    });
  }

  _dataType () {
    return 'power';
  }

  _requestOnceData() {
    var now = new Date();
    var endTime = parseInt(now.getTime()/1000);//返回自1970以来至今的秒数；
    var timeInterval = 7*24*3600;//7天的时间，换算成秒；
    var startTime = endTime-timeInterval;
    var params = {
      did: Device.deviceID,
      time_start: startTime,
      time_end: endTime,
      limit: 20,
      type: 'store',
      key: 'minij_once',
    };
    Service.smarthome.getDeviceData(params).then(response => {
      console.log(response);

      if (response.length) {
        var index = this._dataType() == 'water' ? 0 : 1;
        var dataArray = [];
        var date = new Date();
        for (var i = response.length - 1 ; i >= 0; i--) {
          date.setTime(response[i].time*1000+8*3600*1000);//根据1970至今的时间间隔，换算成标准时间；加上8个小时是为了把格林威治时间转换为北京时间；

          if (date.getUTCMinutes() < 10) {//计算分钟
            var minute =  '0' + date.getUTCMinutes();
          }
          else {
            var minute = date.getUTCMinutes();
          }
          var time = date.getUTCMonth()+1+'-'+date.getUTCDate()+' '+date.getUTCHours()+':'+minute;

          if (this._dataType() == 'power') {
            var value = JSON.parse(response[i].value)[1];
          }
          else {
            var value = JSON.parse(response[i].value)[0];
          }
          if (value == 0) {
            continue;//如果数据为0，则不显示；
          }
          dataArray.push([time, value]);
        }
        //更新数据；
        var dataPoint = dataArray.length ? dataArray[dataArray.length-1][1] : 0;
        this.setState({
          onceData: dataArray,
          dataPoint: dataPoint,
        });
      }
    })
    .catch(error => {
      console.log("store error: =====>>",error)
    });
  }

  _requestWeekData() {
    var now = new Date();
    var endTime = parseInt(now.getTime()/1000);//返回自1970以来至今的秒数；
    var timeInterval = 30*24*3600;//30天的时间，换算成秒；
    var startTime = endTime - timeInterval;
    var params = {
      did: Device.deviceID,
      time_start: startTime,
      time_end: endTime,
      limit: 20,
      type: 'store',
      key: 'minij_weekly',
    };
    Service.smarthome.getDeviceData(params).then(response => {
      console.log(response);
      if (response.length) {
        // var index = this._dataType() == 'water' ? 0 : 1;
        var dataArray = [];
        var date = new Date();
        for (var i = response.length - 1; i >= 0; i--) {
          var timeSince1970 = response[i].time*1000+8*3600*1000;//根据1970至今的时间间隔，换算成标准时间；
          //todo:上面的逻辑，如果不算小时，不用加上8小时也可以；但是不加8小时，date.getUTCDate()会显示前一天，不知道为什么？
          date.setTime(timeSince1970);
          var time = date.getUTCMonth()+1+'月'+date.getUTCDate()+'日'+'-';
          date.setTime(timeSince1970+6*24*3600*1000);//加上一个周的时间
          time += date.getUTCMonth()+1+'月'+date.getUTCDate()+'日';

          if (this._dataType() == 'power') {
            var value = JSON.parse(response[i].value)[1];
          }
          else {
            var value = JSON.parse(response[i].value)[0];
          }
          dataArray.push([time, value]);
        }
        //更新数据；
        this.setState({
          weekData: dataArray,
        });
      }
    })
    .catch(error => {
      console.log("store error: =====>>", error)
    });
  }

  _requestMonthData() {
    var now = new Date();
    var endTime = parseInt(now.getTime()/1000);//返回自1970以来至今的秒数；
    var timeInterval = 365*24*3600;//365天的时间，换算成秒；
    var startTime = endTime - timeInterval;
    var params = {
      did: Device.deviceID,
      time_start: startTime,
      time_end: endTime,
      limit: 20,
      type: 'store',
      key: 'minij_monthly',
    };
    Service.smarthome.getDeviceData(params).then(response => {
      console.log(response);
      if (response.length) {
        var index = this._dataType() == 'water' ? 0 : 1;
        var dataArray = [];
        var date = new Date();
        for (var i = response.length - 1; i >= 0; i--) {
          date.setTime(response[i].time*1000+8*3600*1000);//根据1970至今的时间间隔，换算成标准时间；加上8个小时是为了把格林威治时间转换为北京时间；
          var month = date.getUTCMonth()+1;
          if (month == 1) {//如果是1月,则加上年份
            var time = date.getUTCFullYear()+'年'+month+'月';
          }
          else {
            var time = month+'月';
          }

          if (this._dataType() == 'power') {
            var value = JSON.parse(response[i].value)[1];
          }
          else {
            var value = JSON.parse(response[i].value)[0];
          }
          dataArray.push([time, value]);
        }
        //更新数据；
        this.setState({
          monthData: dataArray,
        });
      }
    })
    .catch(error => {
      console.log("store error: ======>>",error);
    })
  }
}


const tabbarContainerHeight = 65 * RATIO;
const bottomHight = 112 * RATIO;
const chartMarginTop = 31 * RATIO;//之所以加这个高度，是为了让柱状图的最高的一个距离上面的tabbar离开一段距离；
const chartHeight = window.height - tabbarContainerHeight - bottomHight - chartMarginTop;

var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#267dca',
      justifyContent: 'space-between',
    },
    tabbarContainer: {
      width: window.width,
      height: tabbarContainerHeight,
      paddingTop: 20,
      // alignItems: 'center',
      flexDirection: 'row',
    },
    tabbarItemGroup: {
      width: window.width,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    tabbarItem: {
      marginRight: 8 * RATIO,
      marginLeft: 8 * RATIO,
      width: 44,
      height: 44,
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#90bee455'
    },
    chart: {
      marginTop: chartMarginTop,
      left: CHART_LEFT,//隐藏掉y轴方向的坐标，调用api无法做到隐藏y轴同时保留x轴；
      width: window.width - CHART_LEFT,
      height: chartHeight,
      // borderWidth: 1,
    },
    bottom: {
      width: window.width,
      height: bottomHight,
      backgroundColor: '#f0f0f0ee',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fontBase: {
        fontFamily:'Kmedium' ,
      textAlign: 'center',
      color: '#000000ee',
      opacity: 0.9,
    }
});


const mapStateToProps = () => ({

})

export default connect(mapStateToProps)(ComponentPowerCostPage);
