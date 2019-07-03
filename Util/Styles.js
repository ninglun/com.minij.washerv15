import {
    StyleSheet,
    Dimensions,
    PixelRatio
} from 'react-native';

import { scaleSize,scaleHeight } from '../Util/Utils';
let { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

import * as Color from './Color';

const styles = StyleSheet.create({
    text_white_size20: {
        fontFamily:'d-DINCondensed' ,
        color: Color.white,
        fontSize: scaleSize(20)
    },
    text_white_size13: {
        fontFamily:'d-DINCondensed' ,
        color: Color.white_alpha_7,
        fontSize: scaleSize(12)
    },
    text_black_size13: {
        fontFamily:'d-DINCondensed' ,
        color: Color.black_alpha_3,
        fontSize: scaleSize(12)
    },
    child_lock_text: {
        fontFamily:'d-DINCondensed' ,
        marginTop: 28 / PixelRatio.get(),
        color: Color.black_alpha_6,
        fontSize: scaleSize(10)
    },
    paramSettingSetCustom: {
        alignSelf: 'center',
        height: 140,
        width: WIDTH - 160,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shadow: {
        shadowColor: '#000000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },

    running_button: {
        width: 80,
        height: 117,
        alignItems: 'center',
        justifyContent: 'center'
    },
    running_image: {
        width: 50,
        height: 50
    }
});

export default styles;

