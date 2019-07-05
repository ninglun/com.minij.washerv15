import { Device, Service } from 'miot';

import WASH_MODES from './Mode_Wash';
import {
    buttonAction,

    stateAction,
    // processAction,
    cycleAction,
    // time_remainAction,
    child_lockAction,

    // time_totalAction,
    // delay_real_timeAction,
    // speedAction,
    // tempAction,
    // water_levelAction,
    // rinse_timeAction,
    // extra_timeAction,
    // faultAction,
    // volumeAction,
    // panelAction,
    // dirty_typeAction,
    // dirty_levelAction
} from '../Redux/Actions';

import Store from '../Redux/Store';
/**
 * 设置电源
 *
 * @export function
 * @param {string} power 'on','off'
 */
export function setPower(power) {
    singlePropSet("set_power", power)
        .then(result => {
            console.log("setPower OK: ", result);
            if (result.code === 0 && result.result == "ok") {
                if (power === "off") {
                    Store.dispatch(stateAction("off"));
                } else {
                    Store.dispatch(stateAction('standby'));
                }
            }
        })
        .catch(error => {
            console.log("setPower error: ", error);
        })
}

/**
 * 设置洗涤模式
 *
 * @export function
 * @param {string} cycle
 * @param {function} success_callback
 */
export function setCycle(cycle) {
    singlePropSet("set_cycle", cycle)
        .then(result => {
            console.log("setCycle OK: ", result);
            if (result.code === 0 && result.result == "ok") {

                Store.dispatch(cycleAction(cycle));


            }
        })
        .catch(error => {
            console.log("setCycle error: ", error);
        })
}

/**
 * 设置启动暂停
 *
 * @export function
 * @param {string} start_pause 'true','false'
 * @param {string} state 'run','delay'
 */
export function setStartPause(start_pause,state,success_callback) {
    singlePropSet('set_startpause', start_pause)
        .then(result => {
            console.log("setStartPause OK: ", result);

            if (result.code === 0 && result.result == "ok") {
                success_callback();
                if (start_pause === 'false') {
                    Store.dispatch(stateAction('pause'));
                } else {
                    // TODO 也有可以是预约，需要再处理
                    Store.dispatch(stateAction(state));
                }
            }
        })
        .catch(error => {
            console.log("setStartPause error: ", error);
        })
}

/**
 * 设置童锁
 *
 * @export function
 * @param {string} child_lock 'on','off'
 */
export function setChildLock(child_lock) {
    singlePropSet('set_child_lock', child_lock)
        .then(result => {
            console.log("setChildLock OK: ", result);
            if (result.code === 0 && result.result == "ok") {
                Store.dispatch(child_lockAction(child_lock));
            }
        })
        .catch(error => {
            console.log("setChildLock error: ", error);
        })
}

/**
 * 设置预约时间
 *
 * @export function
 * @param {string} delay_real_time 'yyyy-mm-dd hh:mm'
 * @param {function} success_callback success_callback
 * //setdelay
 */
export function setDelayRealTime(delayIntTime, success_callback) {
    singlePropSet('set_delay', delayIntTime)
        .then(result => {
            console.log("setDelayTime OK: ", result);
            if (result.code === 0 && result.result == "ok") {
                console.log("预约时间：",  delayIntTime)

                setStartPause('true','delay',()=>{success_callback()});

            }
        })
        .catch(error => {
            console.log("setDelayTime error: ", error);
        })
}



///********************************************************我是分割线********************************************************///

/**
 * 其它单类型参数设置必须调用此函数
 *
 * @param {string} methodName 与MCU通讯函数名称
 * @param {string} param
 * @returns {Promise}
 */
function singlePropSet(methodName, param) {
    console.log('singlePropSet: ', methodName, [param]);
    // 如果设备处理disable状态，则返回错误
    if (!Store.getState().buttonEnable.buttonEnable) {
        return new Promise((resolve, reject) => {
            reject('Button is Disabled');
        })
    }

    // 正常处理
    return new Promise((resolve, reject) => {
        Store.dispatch(buttonAction(false));
        Device.getDeviceWifi().callMethod(methodName, [param], {})
            .then(result => {
                 console.log('singlePropSet result: ', result);
                Store.dispatch(buttonAction(true));
                resolve(result);
            })
            .catch(error => {
                 console.log('singlePropSet error: ', error);
                Store.dispatch(buttonAction(true));
                reject(error);
            });
    })
}

//双参数类型调用
function doublePropSet(methodName, param) {
    console.log('singlePropSet: ', methodName, param);
    // 如果设备处理disable状态，则返回错误
    if (!Store.getState().buttonEnable.buttonEnable) {
        return new Promise((resolve, reject) => {
            reject('Button is Disabled');
        })
    }

    // 正常处理
    return new Promise((resolve, reject) => {
        Store.dispatch(buttonAction(false));
        Device.getDeviceWifi().callMethod(methodName, param, {})
            .then(result => {
                // console.log('singlePropSet result: ', result);
                Store.dispatch(buttonAction(true));
                resolve(result);
            })
            .catch(error => {
                // console.log('singlePropSet error: ', error);
                Store.dispatch(buttonAction(true));
                reject(error);
            });
    })
}
