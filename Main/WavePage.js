import React from 'react';
import {
    View,
    Dimensions,
    PixelRatio,
    TimerMixin,
    ART, Animated,
} from "react-native";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import {getProcessOption, getProcessProcessing} from "../Util/WashTools";

// import TimerMixin from 'react-timer-mixin' ;
const {
    Surface,
    Path,
    Group,
    Transform,
    Shape,} = ART;

var window = Dimensions.get('window');
const RATIO = (window.width / 360) > 1.5 ? 1.5 : (window.width / 360);
const WIDTH = 220 * RATIO;
const ORIGINX = 140 * RATIO;

class WavePage extends React.Component {


    // mixins: [TimerMixin]

    constructor(props) {
        super(props);
        this.getIncrementAndLimit(this.props.state);

        this.state = {
            displacement: 0 //位移；
        };
    }

    componentDidMount() {
        this.timer = setInterval(() => this.onTick()
            , 50);
        // this.setInterval(this.onTick, 50);
    }
    componentWillUnmount() {
        // 请注意Un"m"ount的m是小写

        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }
    componentWillReceiveProps(nextProps) {
        this.getIncrementAndLimit(nextProps.state);
    }

    onTick() {
        var nextDisplacement = this.state.displacement;

        //当波浪高度回落到0时，如果发现此时增量或改变了，则刷新增量和位移；
        if (nextDisplacement == 0 && (this.limit != this.newLimit || Math.abs(this.increment) != this.newIncrement)) {
            this.limit = this.newLimit;
            //如果之前的增量为正，则取新增量的正值；反之取负值；这样做是为了保持波浪的方向不变；
            if (this.increment >= 0) {
                this.increment = this.newIncrement;
            }
            else {
                this.increment = -this.newIncrement;
            }
        }
        //当波浪的高度超越上下限时，取反，让波浪反向；
        if (nextDisplacement < -this.limit) {
            this.increment = -this.increment;
        }
        if (nextDisplacement > this.limit) {
            this.increment = -this.increment;
        }
        nextDisplacement += this.increment;
        this.setState({displacement: nextDisplacement});
    }

    // 获取增量和上限；
    getIncrementAndLimit(state) {

        switch (state) {
            case 'off':
                this.newIncrement = 0;
                this.newLimit = 0;
                break;
            case 'eoc':
                this.newIncrement = 0;
                this.newLimit = 0;
                break;
            case 'delay':
                this.newIncrement = 0;
                this.newLimit = 0;
                break;
            case 'run':
                this.newIncrement = 2;
                this.newLimit = 60;
                break;
            case 'standby':
                this.newIncrement = 0;
                this.newLimit = 0;
                break;
            case 'pause':
                this.newIncrement = 0;
                this.newLimit = 0;
                break;
            default:
                this.newIncrement = 2;
                this.newLimit = 60;
        }
    }

    render() {

        var displacement = this.state.displacement;
        var pathLeftRight = Path().moveTo(0, ORIGINX).
        curve(WIDTH * 0.333333, displacement, WIDTH * 0.666666, -displacement, WIDTH, 0).
        curve(-WIDTH * 0.333333, 138 * RATIO, -WIDTH * 0.666666, 138 * RATIO, -WIDTH, 0).
        close();
        var pathUpDown = Path().moveTo(0, ORIGINX).
        curve(WIDTH * 0.333333, displacement, WIDTH * 0.666666, -displacement, WIDTH, 0).
        curve(-WIDTH * 0.16, 110 * RATIO, -WIDTH * 0.84, 110 * RATIO, -WIDTH, 0).
        close();
        var wave = (<Shape d={pathUpDown} fill='rgba(255,255,255,0.6)' stroke='rgba(255,255,255,0.2)' strokeWidth={0} />);
        return (
            <View>
                <Surface
                    width={WIDTH}
                    height={WIDTH}
                    borderRadius={WIDTH/2}>
                    {wave}
                </Surface>
            </View>
        );
    }
}

const mapStateToProps = (store) => ({
    state: store.mDevice.state,
    option: getProcessOption(store.mDevice.process),
    processing: getProcessProcessing(store.mDevice.process),
    cycle: store.mDevice.cycle,
});

export default connect(mapStateToProps)(WavePage);




