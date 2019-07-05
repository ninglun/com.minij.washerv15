export function buttonAction(buttonEnable) {
	return {
		type: "buttonAction",
		buttonEnable
	};
}

export function isFirstOpenAction(isFirstOpen) {
	return {
		type: 'isFirstOpenAction',
		isFirstOpen
	}
}

export function propDeviceAction(propList) {
    console.log('---> propDeviceAction  ' + propList);
	return {
		type: "propDeviceAction",
        state: propList[0],
        process: propList[1],
        cycle: propList[2],
        time_remain: propList[3],
        child_lock: propList[4],
        volume: propList[5],
	}
}
export function stateAction(state) {
    console.log('---> stateAction  ' + state);
    return {
        type: 'stateAction',
        state
    }
}
export function processAction(process) {
    console.log('---> processAction  ' + process);
    return {
        type: 'processAction',
        process
    }
}

export function cycleAction(cycle) {
    console.log('---> cycleAction  ' + cycle);
    return {
        type: 'cycleAction',
        cycle
    }
}

export function time_remainAction(time_remain) {
    console.log('---> time_remainAction  ' + time_remain);
    return {
        type: 'time_remainAction',
        time_remain
    }
}


export function child_lockAction(child_lock) {
    console.log('---> child_lockAction  ' + child_lock);
    return {
        type: 'child_lockAction',
        child_lock
    }
}


export function faultAction(fault) {
    console.log('---> faultAction  ' + fault);
    return {
        type: 'faultAction',
        fault
    }
}


export function rinse_timeAction(rinse_time) {
    return {
        type: 'rinse_timeAction',
        rinse_time
    }
}

export function volumeAction(volume) {
    return {
        type: 'volumeAction',
        volume
    }
}


