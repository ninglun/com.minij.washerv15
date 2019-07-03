'use strict';

import React, {Component} from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    ListView,
    View,
    Image,
    TouchableHighlight,
    StatusBar,
    Modal,
    Alert,
    AlertIOS,
    Animated,
    Easing,
    Dimensions,
    TouchableWithoutFeedback,
    ImageBackground
} from 'react-native';
import {SafeAreaView} from 'react-navigation';

const {width, height} = Dimensions.get('window');
import {Host} from 'miot';
import {ImageButton, LoadingDialog} from 'miot/ui';
import {getString} from '../Util/Strings';
import {RkSwitch} from "react-native-ui-kitten";
import { connect } from "react-redux";
import Store from "../Redux/Store";
import {volumeAction} from "../Redux/Actions";
import {setVolume} from '../Data/setData';
import ComponentMoreMenu from "../Main/ComponentMoreMenu";

const TIME = 300;//动画时长
class ComponentMoreDialog extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this._createMenuData();
        this.state = {
            modalVisible: this.props.visible,
            loading: false,
            dataSource: ds.cloneWithRows(this._menuData),
            animSlide: new Animated.Value(0),
            animOpacity: new Animated.Value(0),
        };
    }

    _createMenuData() {
        this._menuData = [
            {
                'name': getString('power_consumption'),
                'func': () => {
                    this.props.navigation.navigate('ComponentPowerCostPage');
                }
            },
            {
                'name': getString('water_consumption'),
                'func': () => {
                    this.props.navigation.navigate('ComponentWaterCostPage');
                }
            },
          {
            'name': getString('commonSetting'),
            'func': () => {
              this.props.navigation.navigate('ComponentMoreMenu');
                this.dismissDialog(true);
            }
          },
          {
            'name': getString('helpFeedback'),
            'func': () => {
              Host.ui.openHelpPage();
                this.dismissDialog(true);
            }
          },];
    }


    _pressRow(rowData) {
        if (rowData.switch === undefined) {
            rowData.func();
        }
    }
    /**
     * 渲染一行
     * @param rowData
     * @param sectionID
     * @param rowID
     * @returns {*}
     */
    renderRow(rowData, sectionID, rowID) {
        return (<TouchableHighlight underlayColor='#efeff0' style={styles.itembkg}
                                    onPress={() => this._pressRow(rowData)}>
            <View>
                <View style={styles.rowContainer}>
                    <Text style={styles.title}>{rowData.name}</Text>
                    {rowData.switch !== undefined && <Text style={{
                        width: 60, height: 30,color:'#000'
                    }}
                       value={rowData.switch}
                       onValueChange={(v) => rowData.func(v)}/>}
                </View>
                <View style={styles.separator}/>
            </View>
        </TouchableHighlight>);
    }

    /**
     * 根据改变的 props 设置显示或隐藏
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        if (this.state.modalVisible === nextProps.visible) {
            return;
        }
        if (nextProps.visible) {
            this.showDialog(true);
        } else {
            this.dismissDialog(false);
        }
    }

    /**
     * 展开更多弹框
     * @param doAnim true 显示向下展开的动画，false 不显示
     */
    showDialog(doAnim) {
        if (doAnim) {
            this.state.animSlide.setValue(-height);
            this.state.animOpacity.setValue(0.0);
            Animated.parallel([Animated.timing(this.state.animSlide, {
                toValue: 0.0, duration: TIME, easing: Easing.linear,
            }), Animated.timing(this.state.animOpacity, {
                toValue: 1.0, duration: TIME, easing: Easing.linear,
            })]).start();
        }
        this.setState({modalVisible: true});
        this.onVisibleChange(true);
    }

    render() {
        
        if (this.state.modalVisible) {
            return (
                                                             
            <SafeAreaView style={{//控制弹框位置
                height: height, width: width, position: 'absolute', top: StatusBar.currentHeight
            }}>
                
                
                <TouchableWithoutFeedback style={{width: width, flex: 1}}
                                          onPress={() => this.dismissDialog(true)}>
                    <View style={[{width: width, flex: 1}]}>
                    
                        <Animated.View
                            style={[styles.container, {opacity: this.state.animOpacity}]}>
                            <Animated.View
                                style={{//下滑展示的 listview
                                    position: 'absolute',
                                    backgroundColor: '#fff',
                                    marginTop: this.state.animSlide,
                                }}>
                                <View style={styles.itembkg}>
                                    <ImageButton style={styles.closeImg}
                                                 source={require('../Resources/irv2_more_close_normal.png')}
                                                 highlightedSource={require('../Resources/irv2_more_close_pressed.png')}
                                                 onPress={() => this.dismissDialog(true)}
                                    />

                                
                                </View>
                                <View style={styles.separator}/>
                                <View style={styles.itembkg} >
                                    
                                </View>
                                <ListView style={styles.list} dataSource={this.state.dataSource}
                                          renderRow={this.renderRow.bind(this)}/>
                            </Animated.View>
                        </Animated.View>
                    <LoadingDialog title={'加载中……'}
                                   visible={this.state.loading}/>
                    </View>
                </TouchableWithoutFeedback>
                
            </SafeAreaView>
                );
           
        } else {
            return null;
        }
        
        
    }

    /**
     * 关闭更多弹框
     * @param doAnim true 显示向上收起的动画，false 不显示
     */
    dismissDialog(doAnim) {
        if (doAnim) {
            this.state.animSlide.setValue(0);
            this.state.animOpacity.setValue(1.0); //1为不透明
            Animated.parallel([Animated.timing(this.state.animSlide, {
                toValue: -height, //
                duration: TIME, easing: Easing.linear,
            }), Animated.timing(this.state.animOpacity, {
                toValue: 0, //
                duration: TIME, easing: Easing.linear,
            })]).start();
            setTimeout(() => {
                this.setState({modalVisible: false});
                this.onVisibleChange(false);
            }, TIME);
        } else {
            this.setState({modalVisible: false});
            this.onVisibleChange(false);
        }
    }

    /**
     * 回调调用的地方
     * @param show  true 显示弹框，false 关闭弹框
     */
    onVisibleChange(show) {
        if (this.props.onVisibleChange) {
            this.props.onVisibleChange(show);
        }
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
        flexDirection: 'column',
        backgroundColor: '#00000055',
        justifyContent: 'flex-start',
    }, closeImg: {
        width: 29,
        height: 29,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'flex-end',
    }, itembkg: {
        width: width, backgroundColor: '#fff',
    },

    rowContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width,
        height: 45,
    }, list: {
        alignSelf: 'stretch',
    },

    title: {
        paddingLeft: 23, paddingRight: 23, fontSize: 14, alignItems: 'center', flex: 1, color: '#000',
    }, subArrow: {
        width: 9, height: 18,
    }, separator: {
        height: 0.5, backgroundColor: '#f1f1f1', marginLeft: 23,
    },
});

const mapStateToProps = (store) => ({
    volume: store.mDevice.volume,
});

export default connect(mapStateToProps)(ComponentMoreDialog);
