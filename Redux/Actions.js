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
	return {
		type: "propDeviceAction",
        state: propList[0],
        process: propList[1],
        cycle: propList[2],
        time_remain: propList[3],
        child_lock: propList[4],

	}
}
export function stateAction(state) {
    return {
        type: 'stateAction',
        state
    }
}
export function processAction(process) {
    return {
        type: 'processAction',
        process
    }
}

export function cycleAction(cycle) {
    return {
        type: 'cycleAction',
        cycle
    }
}

export function time_remainAction(time_remain) {
    return {
        type: 'time_remainAction',
        time_remain
    }
}

// export function time_totalAction(time_total) {
//     return {
//         type: 'time_totalAction',
//         time_total
//     }
// }



export function child_lockAction(child_lock) {
    return {
        type: 'child_lockAction',
        child_lock
    }
}


export function faultAction(fault) {
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


