import { Device, Service } from 'miot';

import WASH_MODES from './Mode_Wash';
import {
    buttonAction,

    stateAction,
    processAction,
    cycleAction,
    time_remainAction,
    child_lockAction,

    time_totalAction,
    delay_real_timeAction,
    speedAction,
    tempAction,
    water_levelAction,
    rinse_timeAction,
    extra_timeAction,
    faultAction,
    volumeAction,
    panelAction,
    dirty_typeAction,
    dirty_levelAction
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
                    Store.dispatch(stateAction("off"))

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
                // if (cycle ==='userdefine') {
                //     Store.dispatch(cycleAction(cycle));
                // } else {
                    Store.dispatch(cycleAction(cycle));
                    console.log("displaytime:"+WASH_MODES[cycle].displayTime);
                    //Store.dispatch(time_remainAction(WASH_MODES[cycle].displayTime))
                // }
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
                //Store.dispatch(delay_real_timeAction(delayIntTime));
                setStartPause('true','delay',()=>{success_callback()});

            }
        })
        .catch(error => {
            console.log("setDelayTime error: ", error);
        })
}

//
// /**
//  * 设置脱水转速
//  *
//  * @export function
//  * @param {string} speed “no spin” ”400rpm” ”600rpm” ”800rpm” ”1000rpm” ”1200rpm” ”1400rpm”
//  */
// export function setSpeed(speed) {
//     singlePropSet('set_speed', speed)
//         .then(result => {
//             console.log("setSpeed OK: ", result);
//             if (result.code === 0 && result.result == "ok") {
//                 Store.dispatch(speedAction(speed));
//             }
//         })
//         .catch(error => {
//             console.log("setSpeed error: ", error);
//         })
// }
//
// /**
//  * 设置温度
//  *
//  * @export function
//  * @param {stirng} temp “cold” ”20” ”30” ”40” ”60” ”90”
//  */
// export function setTemp(temp) {
//     singlePropSet('set_temp', temp)
//         .then(result => {
//             console.log("setTemp OK: ", result);
//             if (result.code === 0 && result.result == "ok") {
//                 Store.dispatch(tempAction(temp));
//             }
//         })
//         .catch(error => {
//             console.log("setTemp error: ", error);
//         })
// }
//
// /**
//  * 设置水位
//  *
//  * @export function
//  * @param {string} water_level “high” ”middle” ”low”
//  */
// export function setWaterLevel(water_level) {
//     singlePropSet('set_water_level', water_level)
//         .then(result => {
//             console.log("setWaterLevel OK: ", result);
//             if (result.code === 0 && result.result == "ok") {
//                 Store.dispatch(water_levelAction(water_level));
//             }
//         })
//         .catch(error => {
//             console.log("setWaterLevel error: ", error);
//         })
// }
//
// /**
//  * 设置漂洗次数
//  *
//  * @export function
//  * @param {stirng} rinse_time “1” ”2” ”3” ”4” ”5” ”6”
//  */
// export function setRinseTime(rinse_time) {
//     singlePropSet('set_rinse_time', rinse_time)
//         .then(result => {
//             console.log("setRinseTime OK: ", result);
//             if (result.code === 0 && result.result == "ok") {
//                 Store.dispatch(rinse_timeAction(rinse_time));
//             }
//         })
//         .catch(error => {
//             console.log("setRinseTime error: ", error);
//         })
// }
//
// /**
//  * 设置主洗时间
//  *
//  * @export function
//  * @param {string} extra_time ”0” ”1” “2” ”3” ”4” “5” ”6” ”7”
//  */
// export function setExtraTime(extra_time) {
//     singlePropSet('set_extra_time', extra_time)
//         .then(result => {
//             console.log("setExtraTime OK: ", result);
//             if (result.code === 0 && result.result == "ok") {
//                 Store.dispatch(extra_timeAction(extra_time));
//             }
//         })
//         .catch(error => {
//             console.log("setExtraTime error: ", error);
//         })
// }
//


/**
 * 设置声音
 *
 * @export function
 * @param {string} volume "00" "01" "02" ”03” ... ”29” ”30”
 */
// export function setVolume(volume) {
//     singlePropSet('set_volume', volume)
//         .then(result => {
//             console.log("setVolume OK: ", result);
//             if (result.code === 0 && result.result == "ok") {
//                 Store.dispatch(volumeAction(volume));
//             }
//         })
//         .catch(error => {
//             console.log("setVolume error: ", error);
//         })
// }



/**
 * 设置洗衣机面板
 *
 * @export function
 * @param {string} panel "dailywash,quick,..."
 */
// export function setPanel(panel) {
//     singlePropSet('set_panel', panel)
//         .then(result => {
//             console.log("setPanel OK: ", result);
//             if (result.code === 0 && result.result == "ok") {
//                 Store.dispatch(panelAction(panel));
//             }
//         })
//         .catch(error => {
//             console.log("setPanel error: ", error);
//         })
// }



/**
 * 设置污渍类型
 *
 * @export function
 * @param {string} dirty_type “baby_food” “ bj_clay” “ blue_ink” “blueberry” “ chili_oil” “chocolate”
 */
// export function setDirtyType(dirty_type) {
//     singlePropSet('set_dirty_type', dirty_type)
//         .then(result => {
//             console.log("setDirtyType OK: ", result);
//             if (result.code === 0 && result.result == "ok") {
//                 Store.dispatch(dirty_typeAction(dirty_type));
//             }
//         })
//         .catch(error => {
//             console.log("setDirtyType error: ", error);
//         })
// }

/**
 * 设置脏污度
 *
 * @export function
 * @param {string} dirty_level “high” ”middle” ”low”
 */
// export function setDirtyLevel(dirty_level) {
//     singlePropSet('set_dirty_level', dirty_level)
//         .then(result => {
//             console.log("setDirtyLevel OK: ", result);
//             if (result.code === 0 && result.result == "ok") {
//                 Store.dispatch(dirty_levelAction(dirty_level));
//             }
//         })
//         .catch(error => {
//             console.log("setDirtyLevel error: ", error);
//         })
// }


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
