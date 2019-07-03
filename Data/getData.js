import { Device, Service } from 'miot';
import {
    propDeviceAction,

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
    dry_setAction,
    panelAction,
    dirty_typeAction,
    dirty_levelAction,
} from '../Redux/Actions';

import WASH_MODES from './Mode_Wash';

import Store from '../Redux/Store';

const propListFromDevice = [
    "state",
    "process",
    "cycle",
    "time_remain",
    "child_lock",

];

const propListFromCloud = [
    // "props.state",
    // "props.process",
    // "props.cycle",
    // "props.time_remain",
    // "props.child_lock",

   // 'prop.time_total',
    //'prop.delay_real_time',
    // 'prop.speed',
    // 'prop.temp',
    // 'prop.water_level',
    'prop.rinse_time',
    // 'prop.extra_time',
     'prop.fault',
    // 'prop.volume',
]

/**
 * 设备获取属性
 *
 */
function getPropFromDevice() {
    Device.getDeviceWifi().callMethod('get_prop', propListFromDevice)
        .then(result => {
             console.log("get_prop result: ", result);
            if (result.code == 0) {
                console.log('get_prop resultDevice<<<<<<<<<: ', result.result);
                let resultArray = result.result;
                if (resultArray.length === propListFromDevice.length) {
                    Store.dispatch(propDeviceAction(resultArray));
                }
            }
        })
        .catch(error => {
            console.log('get_prop error: ', error);
        });
}

/**
 * 服务器获取属性
 *
 */
function getPropFromCloud() {
    let params = {};
    let did = Device.deviceID;
    params.did = did;
    params.props = propListFromCloud;
    Service.smarthome.batchGetDeviceProps([params])
        .then(result => {
            console.log('get_prop resultCloud<<<<<<<<<: ', result);
            // 特殊异常处理，非本did设备不处理
            let res;
            let prop_key;
            for (res in result) {
                if (res !== did) return;
                // 主要数据处理
                let propList = result[res];
                if (propList !== undefined) {
                    for (prop_key in propList) {
                        if (prop_key === 'prop.state') {
                            if (propList[prop_key] !== null){
                                Store.dispatch(stateAction(propList[prop_key]));
                            }else {
                                Store.dispatch(stateAction('standby'));
                            }
                            continue;
                        }
                        if (prop_key === 'prop.process') {
                            Store.dispatch(processAction(propList[prop_key]));
                            continue;
                        }
                        if (prop_key === 'prop.cycle') {
                            if (propList[prop_key] !== null){
                                Store.dispatch(cycleAction(propList[prop_key]));
                            }else {
                                Store.dispatch(cycleAction('dailywash'));
                            }
                            continue;
                        }
                        if (prop_key === 'prop.time_remain') {
                            Store.dispatch(time_remainAction(propList[prop_key]));
                            continue;
                        }
                        if (prop_key === 'prop.child_lock') {
                            Store.dispatch(child_lockAction(propList[prop_key]));
                            continue;
                        }
                        // if (prop_key === 'prop.time_total') {
                        //     Store.dispatch(time_totalAction(propList[prop_key]));
                        //     continue;
                        // }

                        if (prop_key === 'prop.rinse_time') {
                            if (propList[prop_key] !== null){
                                Store.dispatch(rinse_timeAction(propList[prop_key]));
                            }else {
                                Store.dispatch(rinse_timeAction(WASH_MODES['dailywash'].rinse_time));
                            }
                            continue;
                        }

                        if (prop_key === 'prop.fault') {
                            if (propList[prop_key] !== null){
                                Store.dispatch(faultAction(propList[prop_key]));
                            }else {
                                Store.dispatch(faultAction('none'));
                            }
                             console.log('fault key in getData: ', propList[prop_key]);

                            continue;
                        }


                    }
                }
            }
        })
        .catch(error => {
            console.log("batchGetDeviceProps: ", error);
        })
}
var timer = null
//10秒进行查询
export function getDataInterval() {
    timer = setInterval(() => {
        getPropFromDevice();
        getPropFromCloud();
    }, 8000);
}
export function removeDataInterval() {
    timer && timer.remove();
}
export function getDataOnce() {
    getPropFromDevice();
    getPropFromCloud();
}