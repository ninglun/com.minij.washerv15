import { Device, DeviceEvent, DeviceProperties } from 'miot';

import Store from '../Redux/Store';
import {
    buttonAction,

    stateAction,
    processAction,
    cycleAction,
    time_remainAction,
    child_lockAction,
    rinse_timeAction,
    faultAction,
    volumeAction,
} from '../Redux/Actions';

const subPropList = [
    "prop.state",
    "prop.process",
    "prop.cycle",
    "prop.time_remain",
    "prop.child_lock",
    'prop.time_total',
    'prop.delay_real_time',
    'prop.speed',
    'prop.temp',
    'prop.water_level',
    'prop.rinse_time',
    'prop.extra_time',
    'prop.fault',
    'prop.volume',
    'prop.panel',
];
var msgSubscription = null, subscription = null;
export function cancelSub() {
    // msgSubscription.map( (val,i) => {
    //     val && val.remove();
    // })
    msgSubscription && msgSubscription.remove();
    subscription && subscription.remove();
}
export function subData() {

    // TODO
    // 需要添加订阅取消功能，
    () => {
        // TODO
    }

    /**
     * 此处订阅属性,如需添加新的属性，
     * 需要添加新的订阅，不得一次订阅多条，那样会指数级增加
     */
    Device.getDeviceWifi().subscribeMessages(
        // "prop.state",
        // "prop.process",
        // "prop.cycle",
        // "prop.time_remain",
        // "prop.child_lock",
        "prop.process",
        "prop.cycle",
        "prop.time_remain",
        "prop.child_lock",
        "prop.lock",
        'prop.time_total',
        'prop.delay_real_time',
        'prop.speed',
        'prop.temp',
        'prop.water_level',
        'prop.rinse_time',
        'prop.extra_time',
        'prop.fault',
        'prop.volume',
        'prop.panel',
        'prop.dirty_type',
        'prop.dirty_level'

            ).then(subcription => {
            msgSubscription = subcription;
        });

    // subPropList.map((prop, i) => {
    //     // console.log("props: ", prop);
    //     Device.getDeviceWifi().subscribeMessages(prop).then(subcription=>{
    //             msgSubscription.push(subcription)
    //     });

    // });

    /**
     * 此处接收订阅 Device.getDeviceWifi().subscribeMessages(singleProp);
     */
    subscription = DeviceEvent.deviceReceivedMessages.addListener((device, map, res) => {
         //console.log("deviceReceivedMessage 1: ", map, map.get('prop.state'));
        if (map.get('prop.state')) {
            Store.dispatch(stateAction(map.get('prop.state')[0]))
        }
        if (map.get('prop.process')) {
            Store.dispatch(processAction(map.get('prop.process')[0]))
        }
        if (map.get('prop.cycle')) {
            Store.dispatch(cycleAction(map.get('prop.cycle')[0]))
        }
        if (map.get('prop.time_remain')) {
            Store.dispatch(time_remainAction(map.get('prop.time_remain')[0]))
        }
        if (map.get('prop.child_lock')) {
            Store.dispatch(child_lockAction(map.get('prop.child_lock')[0]))
        }

        if (map.get('prop.rinse_time')) {
            Store.dispatch(rinse_timeAction(map.get('prop.rinse_time')[0]))
        }

        if (map.get('prop.fault')) {
            Store.dispatch(faultAction(map.get('prop.fault')[0]))
        }
        if (map.get('prop.volume')) {
            Store.dispatch(volumeAction(map.get('prop.volume')[0]))
        }

    });


}