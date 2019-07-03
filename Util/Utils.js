import {
    PixelRatio,
    Dimensions,
    Platform,
    AsyncStorage
} from 'react-native';

export let screenW = Dimensions.get('window').width;
export let screenH = Dimensions.get('window').height;
const fontScale = PixelRatio.getFontScale();
export let pixelRatio = PixelRatio.get();
//像素密度
export const DEFAULT_DENSITY = 2;
//px转换成dp
//以iphone6为基准,如果以其他尺寸为基准的话,请修改下面的defaultWidth和defaultHeight为对应尺寸即可. 以下为1倍图时
const defaultWidth = 375;
const defaultHeight = 667;
const w2 = defaultWidth / DEFAULT_DENSITY;
//px转换成dp
const h2 = defaultHeight / DEFAULT_DENSITY;

//缩放比例
const _scaleWidth = screenW / defaultWidth;
const _scaleHeight = screenH / defaultHeight;

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

/**
 * 屏幕适配,缩放size , 默认根据宽度适配，纵向也可以使用此方法
 * 横向的尺寸直接使用此方法
 * 如：width ,paddingHorizontal ,paddingLeft ,paddingRight ,marginHorizontal ,marginLeft ,marginRight
 * @param size 设计图的尺寸
 * @returns {number}
 */
export function scaleSize(size: Number) {
    return size * _scaleWidth;
}

/**
 * 屏幕适配 , 纵向的尺寸使用此方法应该会更趋近于设计稿
 * 如：height ,paddingVertical ,paddingTop ,paddingBottom ,marginVertical ,marginTop ,marginBottom
 * @param size 设计图的尺寸
 * @returns {number}
 */
export function scaleHeight(size: Number) {
    return size * _scaleHeight;
}

/* 最初版本尺寸适配方案 也许你会更喜欢这个
export function scaleSize(size: Number) {
    let scaleWidth = screenW / w2;
    let scaleHeight = screenH / h2;
    let scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5));
    return size / DEFAULT_DENSITY;
}*/

/**
 * 设置字体的size（单位px）
 * @param size 传入设计稿上的px , allowFontScaling 是否根据设备文字缩放比例调整，默认不会
 * @returns {Number} 返回实际sp
 */
function setSpText(size: Number, allowFontScaling = false) {
    const scale = Math.min(_scaleWidth, _scaleHeight);
    const fontSize = allowFontScaling ? 1 : fontScale;
    return size * scale / fontSize;
}

export function setSpText2(size: Number) {
    let scaleWidth = screenW / w2;
    let scaleHeight = screenH / h2;
    let scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5));

    return size / DEFAULT_DENSITY * fontScale;
}
/**
 * 判断是否为iphoneX
 * @returns {boolean}
 */
export function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
            (screenH === X_WIDTH && screenW === X_HEIGHT))
    )
}

export function isObj(object) {
    return object && typeof (object) == 'object' && Object.prototype.toString.call(object).toLowerCase() == "[object object]";
}

export function isArray(object) {
    return object && typeof (object) == 'object' && object.constructor == Array;
}

export function getLength(object) {
    var count = 0;
    for (var i in object) count++;
    return count;
}

export function CompareObj(objA, objB, flag) {
    for (var key in objA) {
        if (!flag) //跳出整个循环
            break;
        if (!objB.hasOwnProperty(key)) {
            flag = false;
            break;
        }
        if (!isArray(objA[key])) { //子级不是数组时,比较属性值
            if (objB[key] != objA[key]) {
                flag = false;
                break;
            }
        } else {
            if (!isArray(objB[key])) {
                flag = false;
                break;
            }
            var oA = objA[key],
                oB = objB[key];
            if (oA.length != oB.length) {
                flag = false;
                break;
            }
            for (var k in oA) {
                if (!flag) //这里跳出循环是为了不让递归继续
                    break;
                flag = CompareObj(oA[k], oB[k], flag);
            }
        }
    }
    return flag;
}

//比较两个json是否相等
export function CompareJSON(objA, objB) {
    if (!isObj(objA) || !isObj(objB)) return false; //判断类型是否正确
    if (getLength(objA) != getLength(objB)) return false; //判断长度是否一致
    return CompareObj(objA, objB, true); //默认为true
}