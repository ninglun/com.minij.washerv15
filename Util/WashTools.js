import WASH_MODES from '../Data/Mode_Wash';

import { getString } from './Strings';

const DIRT_TYPE_OPTIONS = [
    { deg: 'none', note: getString('noneDirty') },
    { deg: 'baby_food', note: getString('babyFood') },
    { deg: 'bj_clay', note: getString('soilStain') },
    { deg: 'blue_ink', note: getString('blueInk') },
    { deg: 'blueberry', note: getString('blueberry') },
    { deg: 'chili_oil', note: getString('chiliOil') },
    { deg: 'chocolate', note: getString('chocolateStains') },
    { deg: 'coffee', note: getString('coffee') },
    { deg: 'collar', note: getString('collar') },
    { deg: 'cooking_oil', note: getString('cookingOil') },
    { deg: 'curry', note: getString('curryStain') },
    { deg: 'egg', note: getString('eggStains') },
    { deg: 'fruit”', note: getString('fruitStains') },
    { deg: 'grass', note: getString('grassStain') },
    { deg: 'ketchup', note: getString('ketchup') },
    { deg: 'lipstick', note: getString('lipGloss') },
    { deg: 'milk', note: getString('milkStains') },
    { deg: 'milk_tea', note: getString('milkTea') },
    { deg: 'red_wine', note: getString('redWineStains') },
    { deg: 'shoepolish', note: getString('shoePolish') },
    { deg: 'tea', note: getString('teaStains') }
];

const DRY_SET_OPTIONS = [
    { deg: 'none', note: getString('none') },
    { deg: 'moist', note: getString('ironing') },
    { deg: 'normal', note: getString('immediatelyWear') },
    { deg: 'extra', note: getString('specialDry') },
    { deg: '030', note: getString('thirtyMinu') },
    { deg: '060', note: getString('sixtyMinu') },
    { deg: '090', note: getString('ninetyMinu') },
    { deg: '120', note: getString('_120Minutes') },
    { deg: '150', note: getString('_150Minutes') },
    { deg: '180', note: getString('_180Minutes') },
];

/**
 * 根据process获取所有进程
 *
 * @export
 * @param {string} process
 */
export function getProcessOption(process) {
    if (process.startsWith('option') && process.includes('processing')) {
        return process.replace('option:', '').replace('processing:', '').split(';')[0].split(',');
    } else return 'wash,rinse,spin,dry'.split(',');
}

/**
 * 根据process获取当前进程
 *
 * @export 
 * @param {string} process
 */
export function getProcessProcessing(process) {
    if (process.startsWith('option') && process.includes('processing')) {
        return process.replace('option:', '').replace('processing:', '').split(';')[1];
    } else return 'invalid';
}

/**
 * 获取时间
 *
 * @export
 * @param {string} time_remain '0078'
 * @returns
 */
export function getIntTimeRemain(time_remain) {
    //转换时间的格式
    let time = parseInt(time_remain, 10);
    let hour = parseInt(time / 60, 10);
    let minute = parseInt(time % 60);
    var remainingTime = '';
    if (hour <= 9) {
        remainingTime += '0'
    }
    remainingTime += hour + ':';
    if (minute <= 9) {
        remainingTime += '0'
    }
    remainingTime += minute;
    return remainingTime;
}

/**
 * 获取剩余时间中的小时
 *
 * @export
 * @param {string} time_remain '0068'
 * @returns
 */
export function getTimeRemainHour(time_remain) {
    let time1 = parseInt(time_remain, 10);
    let hour = parseInt(time1 / 60, 10);
    let remainingTime = '';
    if (hour <= 9) {
        remainingTime += '0'
    }
    remainingTime += hour;
    return remainingTime;
}

/**
 * 获取剩余时间中的分钟
 *
 * @export
 * @param {string} time_remain '0096'
 * @returns
 */
export function getTimeRemainMinute(time_remain) {
    let time1 = parseInt(time_remain, 10);
    let minute = parseInt(time1 % 60);
    let remainingTime = '';
    if (minute <= 9) {
        remainingTime += '0'
    }
    remainingTime += minute;
    return remainingTime;
}


/**
 * 获取最近的整数分钟时间
 *
 * @export function
 * @param {string} delay_real_time 'yyyy-mm-dd hh:mm'
 * @returns {day,hour,minute}
 */
export function getDelayRealTime(delay_real_time) {
    let day, hour, minute;
    var date = new Date(delay_real_time);
    var timeStamp = date.getTime();
    while (date.getMinutes() % 10 !== 0) {
        timeStamp += (60 * 1000);
        date = new Date(timeStamp);
    }
    let now = new Date();
    day = date.getDate() === now.getDate() ? getString('today') : getString('tomorrow');
    hour = date.getHours() //< 10 ? ('0' + date.getHours()) : ('' + date.getHours());
    minute = date.getMinutes() //< 10 ? ('0' + date.getMinutes()) : ('' + date.getHours());
    return { day, hour, minute };
}

/**
 * 获取剩余时间中的小时
 *
 * @export
 * @param {string} delay_real_time 'yyyy-mm-dd hh:mm'
 * @returns
 */
export function getDelayRealTimeHour(delay_real_time) {
    if (delay_real_time.length === 16) {
        return delay_real_time.substr(11, 2);
    } else {
        return "00";
    }
}

/**
 * 获取剩余时间中的分钟
 *
 * @export
 * @param {string} delay_real_time 'yyyy-mm-dd hh:mm'
 * @returns
 */
export function getDelayRealTimeMinute(delay_real_time) {
    if (delay_real_time.length === 16) {
        return delay_real_time.substr(14, 2);
    } else {
        return "00";
    }
}

/**
 * 获取当前面板模式顺序
 *
 * @export function
 * @param {string} panel "quick,delicate,down,dailywash,...,washdry,rinse,boiling"
 * @returns string Array
 */
export function getPanelArray(panel) {
    if (panel && panel.includes(',') && panel.split(',').length > 3) {
        return panel.split(',');
    } else {
        return "dailywash,quick,delicate,down,rinse".split(',');
    }
}

/**
 * 获取模式子列表，可用于获取一个，或多个
 *
 * @export function
 * @param {string} panel "quick,delicate,down,dailywash,...,washdry,rinse,boiling"
 * @param {int} start 想要的起始下标位
 * @param {int} end 想要的结束下标位
 * @returns string Array
 */
export function getSubPanel(panel, start, end) {
    let panelArray = getPanelArray(panel);
    return panelArray.slice(start, end <= 0 ? panelArray.length : end);
}

/**
 * 获取所有模式的列表
 *
 * @export function
 * @param {string} panel "quick,delicate,down,dailywash,...,washdry,rinse,boiling"
 * @returns string array
 */
export function getAllModeArray(panel) {
    let panelArray = getPanelArray(panel);
    // console.log('getAllModeArray 0: ', panelArray);
    let modeAllList = Object.keys(WASH_MODES);
    panelArray.push('test');
    // console.log('getAllModeArray 1: ', panelArray);
    modeAllList.map((mode, i) => {
        if (panelArray.indexOf(mode) === -1) {
            panelArray.push(mode);
        }
    });
    // console.log('getAllModeArray 2: ', panelArray);
    return panelArray;
}

/**
 * 通过特渍名称获取档位
 *
 * @export function
 * @param {string} note 特渍名称 ‘蛋渍...’
 * @returns string 'egg'
 */
export function getDirtyTypeByNote(note) {
    for (value in DIRT_TYPE_OPTIONS) {
        if (DIRT_TYPE_OPTIONS[value].note === note[0]) {
            return DIRT_TYPE_OPTIONS[value].deg
        }
    }
    return 'none';
}

/**
 * 通过烘干名称获取档位
 *
 * @export function
 * @param {string} note 烘干名称 '180分钟'
 * @returns string '180'
 */
export function getDrySetByNote(note) {
    for (value in DRY_SET_OPTIONS) {
        if (DRY_SET_OPTIONS[value].note === note[0]) {
            return DRY_SET_OPTIONS[value].deg
        }
    }
    return 'none';
}