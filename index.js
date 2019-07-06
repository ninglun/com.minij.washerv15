import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import Main from "./Main/Main";
import { Package,PackageEvent, Host } from "miot";
import { getDataInterval,removeDataInterval } from './Data/getData';
import {subData,cancelSub} from './Data/subData'

class PluginApp extends Component {
    ComponentDidMount() {
        console.log("取消查询定时");
        this.subscription = PackageEvent.packageWillExit.addListener(()=>{
            removeDataInterval();   //取消查询定时
            cancelSub();            //取消订阅监听
        })
    }
    ComponentWillUnmount() {
        console.log("注销通知");
        this.subscription && this.subscription.remove();    //注销通知
    }
    render() {
        console.log("执行render store");
        return (
            <Provider store={Store}>
                <Main />
            </Provider>
        )
    }
}

Package.entry(PluginApp, () => {
    getDataInterval();
    //subData();
});