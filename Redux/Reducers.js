import { combineReducers } from "redux";

let init_device_props = {
    state: "off", // “off” / “standby” /“run” /“delay” /“pause” /“fault” /“eoc”
    process: "option:load,prewash,wash,rinse,spin,dry;processing:wash", // “option:load,prewash,wash,rinse,spin,dry;processing:wash”
    cycle: "dailywash", // “dailywash” / “quick” / “delicate” / “down”...
    time_remain: "0048",  // 0098
    //delay_real_time: "2018-06-04 16:58",  // “2015-06-04 16:58”

    child_lock: "off",  // “on”/”off”

    fault: "NONE", // “NONE”/“_F”/“dF”/“tF”/“S...
    // add_clothes: "false",  //“true”/”false”.
    // panel: "dailywash,quick,delicate,down,rinse,spin,cotton,synthetic,shirt",
    //
    // speed: "no spin", // “no spin”/”400rpm”/”600rpm”/”800rpm”/”1000rpm”/”1200rpm”/”1400rpm”
    // temp: "cold",  // “cold”/”20”/”30”/”40”/”60”/”90”
    // water_level: "low", // “high”/”middle”/”low”
    // dry_set: "none", // “none”/ “moist”/“normal”/“extra”/ “030”/“060”/“090” /“120”/“150”/“180”
    rinse_time: "1",  // “1”/”2”/”3”/”4”/”5” /”6”

    // dirty_level: "low",  // “high”/”middle”/”low”
    // extra_time: "0",  // ”0”/”1”/“2”/”3”/”4”/“5”/”6”/”7”
    // dirty_type: "none", //“baby_food”/“ bj_clay”/“ blue_ink”/“blueberry”/“ chili_oil”/“chocolate”...
    // volume: "00", // “00”----“30”: 00表示没有声音；非00表示有声音
};

function mDevice(device_props = init_device_props, action) {
    if (action.type === "propDeviceAction") {
        return {
            ...device_props,
            state: action.state,
            process: action.process,
            cycle: action.cycle,
            time_remain: action.time_remain,
            child_lock: action.child_lock,
        };
    } else if (action.type === "stateAction") {
        return {
            ...device_props,
            state: action.state
        };
    } else if (action.type === "processAction") {
        return {
            ...device_props,
            process: action.process
        };
    } else if (action.type === "cycleAction") {
        return {
            ...device_props,
            cycle: action.cycle
        };
    } else if (action.type === "time_remainAction") {
        return {
            ...device_props,
            time_remain: action.time_remain
        };
    } else if (action.type === "child_lockAction") {
        return {
            ...device_props,
            child_lock: action.child_lock
        };
    } else if (action.type === "faultAction") {
        return {
            ...device_props,
            fault: action.fault
        };
    } else if (action.type === "rinse_timeAction") {
        return {
            ...device_props,
            rinse_time: action.rinse_time
        };
    }  else return { ...device_props };
}

function buttonEnable(enableState = { buttonEnable: true }, action) {
    if (action.type === "buttonAction") {
        return {
            ...enableState,
            buttonEnable: action.buttonEnable
        }
    } else return { ...enableState }
}

function isFirstOpen(isFirstOpenState = { isFirstOpen: true }, action) {
    if (action.type === 'isFirstOpenAction') {
        return {
            ...isFirstOpenState,
            isFirstOpen: action.isFirstOpen
        }
    } else return { ...isFirstOpenState }
}

//=================================================================================================================
import Navigation from "./AppNavigator";

var initialState = Navigation.router.getStateForAction(Navigation.router.getActionForPathAndParams("ComponentMainPage"));

function navReducer(state = initialState, action) {
    const nextState = Navigation.router.getStateForAction(action, state);
    return nextState || state;
}

const App = combineReducers({
    navReducer,
    mDevice,
    buttonEnable,
    isFirstOpen
});

export default App;
