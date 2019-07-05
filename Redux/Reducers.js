import { combineReducers } from "redux";

let init_device_props = {
    state: "off", // “off” / “standby” /“run” /“delay” /“pause” /“fault” /“eoc”
    process: "option:load,prewash,wash,rinse,spin,dry;processing:wash", // “option:load,prewash,wash,rinse,spin,dry;processing:wash”
    cycle: "dailywash", // “dailywash” / “quick” / “delicate” / “down”...
    time_remain: "0048",  // 0098
    child_lock: "off",  // “on”/”off”
    fault: "NONE", // “NONE”/“_F”/“dF”/“tF”/“S...
    rinse_time: "3",  // “1”/”2”/”3”/”4”/”5” /”6”
};

function mDevice(device_props = init_device_props, action) {

    if (action.type === "propDeviceAction") {
        console.log('---> propDeviceAction action.type ' + action.type +"  "+ action.state);
        return {
            ...device_props,
            state: action.state,
            process: action.process,
            cycle: action.cycle,
            time_remain: action.time_remain,
            child_lock: action.child_lock,
            fault: action.fault,
        };
    } else if (action.type === "stateAction") {
        console.log('---> stateAction action.type ' + action.type +"  "+ action.state);
        return {
            ...device_props,
            state: action.state
        };
    } else if (action.type === "processAction") {
        console.log('---> processAction action.type ' + action.type +"  "+ action.process);
        return {
            ...device_props,
            process: action.process
        };
    } else if (action.type === "cycleAction") {
        console.log('---> cycleAction action.type ' + action.type +"  "+ action.cycle);
        return {
            ...device_props,
            cycle: action.cycle
        };
    } else if (action.type === "time_remainAction") {
        console.log('---> time_remainAction action.type ' + action.type +"  "+ action.time_remain);
        return {
            ...device_props,
            time_remain: action.time_remain
        };
    } else if (action.type === "child_lockAction") {
        console.log('---> child_lockAction action.type ' + action.type +"  "+ action.child_lock);
        return {
            ...device_props,
            child_lock: action.child_lock
        };
    } else if (action.type === "faultAction") {
        console.log('---> faultAction action.type ' + action.type +"  "+ action.fault);
        return {
            ...device_props,
            fault: action.fault
        };
    }
    else if (action.type === "rinse_timeAction") {
        console.log('---> rinse_timeAction action.type ' + action.type +"  "+ action.rinse_time);
        return {
            ...device_props,
            rinse_time: action.rinse_time
        };
    }
    else if (action.type === "volumeAction") {
        console.log('---> volumeAction action.type ' + action.type +"  "+ action.volume);
        return {
            ...device_props,
            volume: action.volume
        };
    }
    else return { ...device_props };
}

function buttonEnable(enableState = { buttonEnable: true }, action) {
    if (action.type === "buttonAction") {
        console.log('---> buttonAction action.type ' + action.type);
        return {
            ...enableState,
            buttonEnable: action.buttonEnable
        }
    } else return { ...enableState }
}

function isFirstOpen(isFirstOpenState = { isFirstOpen: true }, action) {
    if (action.type === 'isFirstOpenAction') {
        console.log('---> isFirstOpenAction action.type ' + action.type);
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
