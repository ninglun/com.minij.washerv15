import React, { Component } from 'react';

import { Provider } from 'react-redux';
import Store from './Redux/Store';
import {
    isFirstOpenAction
} from './Redux/Actions';
import Main from "./Main/Main";

import { Package,PackageEvent, Host } from "miot";

import { getDataInterval,removeDataInterval } from './Data/getData';
import {subData,cancelSub} from './Data/subData'

class PluginApp extends Component {
    ComponentDidMount() {
        this.subscription = PackageEvent.packageWillExit.addListener(()=>{
            removeDataInterval();   //取消查询定时
            cancelSub();            //取消订阅监听
        })
    }
    ComponentWillUnmount() {
        this.subscription && this.subscription.remove();    //注销通知
    }
    render() {
        return (
            <Provider store={Store}>
                <Main />
            </Provider>
        )
    }
}

Package.entry(PluginApp, () => {

    getDataInterval();
    subData();
});