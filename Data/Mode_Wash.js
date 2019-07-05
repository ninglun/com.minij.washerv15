/**
 默认数据 后续需要做成可变可编辑的数据表
 title: 程序的中文
 name: 程序的英文
 imageNormal: require('../Resources/washModes/icon_gentle_wash.png'),     //显示在洗衣机上的图片
 imagePressed: require('../Resources/')},          // 不显示在洗衣机上的图片
 imageSelected
 displayTime
 rinse
 temperature
 maxLoad
 extraPara
 */
import { getString } from '../Util/Strings';
//


export default {
    //标准
    dailywash : {
        title: getString("NormalWash"),
        imageNormal:require('../Resources/washModes/mode_normal_normal.png'),
        imagePressed: require('../Resources/washModes/mode_normal_pressed.png'),
        imageSelected: require('../Resources/washModes/mode_normal_selected.png'),
        displayTime: 48,
        rinse_time: '03',
        temp: 30,
        maxLoad: 2.8,
        extraPara: '',
    },
    //煮洗
    boiling : {
        title: getString("BoilWash"),
        imageNormal: require('../Resources/washModes/mode_boil_normal.png'),
        imagePressed: require('../Resources/washModes/mode_boil_pressed.png'),
        imageSelected: require('../Resources/washModes/mode_boil_selected.png'),
        displayTime: 96,
        rinse_time: '04',
        temp: 95,
        maxLoad: 2.8,
        extraPara: '',
    },
    //快速
    quick : {
        title: getString("SuperQuick"),
        imageNormal: require('../Resources/washModes/mode_fast_normal.png'),
        imagePressed:require('../Resources/washModes/mode_fast_pressed.png'),
        imageSelected: require('../Resources/washModes/mode_fast_selected.png'),
        displayTime: 28,
        rinse_time: '02',
        temp: 0,
        maxLoad: 1.4,
        extraPara: '',
    },
    //婴童
    babycare : {
        title:getString("BabyCare"),
        imageNormal: require('../Resources/washModes/mode_child_normal.png'),
        imagePressed: require('../Resources/washModes/mode_child_pressed.png'),
        imageSelected: require('../Resources/washModes/mode_child_selected.png'),
        displayTime: 77,
        rinse_time: '03',
        temp: 60,
        maxLoad: 2.0,
        extraPara: '',
    },


    //运动
    sport : {
        title: getString("Slacks"),
        imageNormal: require('../Resources/washModes/mode_sport_normal.png'),
        imagePressed: require('../Resources/washModes/mode_sport_pressed.png'),
        imageSelected: require('../Resources/washModes/mode_sport_selected.png'),
        displayTime: 19,
        rinse_time: '02',
        temp: 20,
        maxLoad: 1.4,
        extraPara: '',
    },
    //婴童高温
    babycareboiling : {
        title: getString("ChildBoilWash"),
        imageNormal: require('../Resources/washModes/mode_childboil_normal.png'),
        imagePressed:require('../Resources/washModes/mode_childboil_pressed.png'),
        imageSelected:require('../Resources/washModes/mode_childboil_selected.png'),
        displayTime: 109,
        rinse_time: '04',
        temp: 90,
        maxLoad: 2,
        extraPara: 'Ry1OsAB261EFo9sPUQ/hxPTdjsOTf8eaHtIYxRwuF+RftIxoAGE48jmmZFg76ujW9C6x/fhFXsth0pg26+RbpOi3ufLgNst+g5IU8gmqxwCR3bE8UJFVpSA5L7cYIwhXLp+tih3emdztlrFHbBMgsQ==',
    },
    //婴童快速
    babycarespeedup : {
        title: getString("ChildFast"),
        imageNormal: require('../Resources/washModes/mode_childfast_normal.png'),
        imagePressed: require('../Resources/washModes/mode_childfast_pressed.png'),
        imageSelected: require('../Resources/washModes/mode_childfast_selected.png'),
        displayTime: 52,
        rinse_time: '03',
        temp: 60,
        maxLoad: 2,
        extraPara: 'HCFh5y6WrffcGK5m352LOs8Jgy24SftE9YmUlOptqY6EjifxZq5sIy+1K8wld53tGQNk51aYbkJ9hvVAFcJakLL8B3Hq0V5s11iZIQp/jxALm+Pza6LR6n2o0J6Pm5QVDKBIRbRGLLYL18RevxnN6A==',
    },
    //婴儿节能
    babycareeco : {
        title: getString("ChildSave"),
        imageNormal: require('../Resources/washModes/mode_childsave_normal.png'),
        imagePressed:require('../Resources/washModes/mode_childsave_pressed.png'),
        imageSelected: require('../Resources/washModes/mode_childsave_selected.png'),
        displayTime: 63,
        rinse_time: '03',
        temp: 30,
        maxLoad: 2,
        extraPara: 'eJWjcPVq+vqUrWcJ44Bsyw7ZMQxq+NbfkeNKLVIOIcwAYTNWFE3sza55UJ1rCBRVojipaDYk4MFWL3jyyDP0P7rT/hegfTRDYV0HqNWaRvVAxgNDAL0IvLsVfqKvtzyqGfpEAaAWH+cyD+msynSm1Q==',
    },
    //婴儿轻柔
    babycaresoft : {
        title: getString("ChildSoft"),
        imageNormal: require('../Resources/washModes/mode_childsoft_normal.png'),
        imagePressed: require('../Resources/washModes/mode_childsoft_pressed.png'),
        imageSelected: require('../Resources/washModes/mode_childsoft_selected.png'),
        displayTime: 63,
        rinse_time: '03',
        temp: 40,
        maxLoad: 2,
        extraPara: 'B6cUz4vM0mG3kPW8ypF2rsuuQHtK6Gf3SdoBoiFlFk92I05nQKrKOJjj5KXHORS2q5wyBRRYhm4Ul/Yh+bzYy00pAYm5BNGzdJVWhovDFLUiWntm8Yh5geUZsOnkgCaxqaFCaxAahBcnnvKGqHylfw==',
    },
    //婴儿特渍
    babycarestain : {
        title: getString("ChildBlot"),
        imageNormal: require('../Resources/washModes/mode_childblot_normal.png'),
        imagePressed: require('../Resources/washModes/mode_childblot_pressed.png'),
        imageSelected:require('../Resources/washModes/mode_childblot_selected.png'),
        displayTime: 101,
        rinse_time: '04',
        temp: 60,
        maxLoad: 2.0,
        extraPara: 'cHOfVaQOSY/kJOSvTFGmQEyqHq6GvdSS4JYSOcI7NAMEOzn0ueHrBTlmDOGWwYuvixID1gh5OaZXRjQ2aVrf330W9q2mo6D1l+lRX8gF7yRrkQfB5/Nq9BfFYvxDbJj8zrU+WleE+VLoFC9XYXcAdg==',
    },

    //单脱水
    spin : {
        title: getString("Spin"),
        imageNormal: require('../Resources/washModes/mode_singlespin_normal.png'),
        imagePressed: require('../Resources/washModes/mode_singlespin_pressed.png'),
        imageSelected: require('../Resources/washModes/mode_singlespin_selected.png'),
        displayTime: 8,
        rinse_time: '0',
        temp: 0,
        maxLoad: 2.8,
        extraPara: 'ZmUA2kEyZZiC7hYXE11wDknm7a4GGquItboULBj5kv2HWP2y5oiqjrkQbLqZAwdlDIW0Mr+FHN+5Ra1cWTYoHaKlst9Y+KkDWxyvYLPie9hHEOb7GJoA2GVWdcMgTK639gRlc0YpEXtMtxZ5T+qHIg==',
    },
    //漂+脱
    rinse : {
        title:getString("RinseSpin"),
        imageNormal: require('../Resources/washModes/mode_rinsespin_normal.png'),
        imagePressed: require('../Resources/washModes/mode_rinsespin_pressed.png'),
        imageSelected: require('../Resources/washModes/mode_rinsespin_selected.png'),
        displayTime: 12,
        rinse_time: '01',
        temp: 0,
        maxLoad: 2.8,
        extraPara: 'ZmUA2kEyZZiC7hYXE11wDklGmCOcKO4lzL22cw7bK/hIzykVdlGVzcSdxruoxenRN3VQ1X/sXr4PWCWIVGGdfTFwk6GJ9sIxRkr6Lp7RbvDe57pIOqaXKTJc6VI2yQZjHVV0ijpCXZePQBCUK0Rd+w==',
    },
    //高档衬衣免烫
    shirt : {
        title:getString("RitzyShirt") ,
        imageNormal: require('../Resources/washModes/mode_ritzyshirt_normal.png'),
        imagePressed:require('../Resources/washModes/mode_ritzyshirt_pressed.png'),
        imageSelected: require('../Resources/washModes/mode_ritzyshirt_selected.png'),
        displayTime: 47,
        rinse_time: '02',
        temp: 30,
        maxLoad: 1.4,
        extraPara: 'M0OPHHoKjmYFdrGFeu4kmDzsDTm9QJ8zGbDxFK5ndAT+evL5Qrnyg919p/DfVd9dtU/e0cQNra4pLXOPt5Yb2RYXEP0hlZHltIHOlC3TTIPCINT4vHM5U+0Z0iYhsEMQ/JOi+ptNl3RLv3iqAdHAPA==',
    },
    //bar洗
    underwear : {
        title:getString("Bra") ,
        imageNormal: require('../Resources/washModes/mode_bra_normal.png'),
        imagePressed: require('../Resources/washModes/mode_bra_pressed.png'),
        imageSelected: require('../Resources/washModes/mode_bra_selected.png'),
        displayTime: 23,
        rinse_time: '02',
        temp: 30,
        maxLoad: 1.4,
        extraPara: 'ZoLNtc2kRiLkxm+P1crEtVvzmZDJN4C9q8omvzbEjuQgXlR0jTDsJecBuLAVWgit1dH+A1CrWkzjVLq1ERUyl7owXiyLx71R2RePAkEPmIUfNpW7eVBcktFnC+bbUhqCPXGsK1w4KQi/aH2zwLw0LQ==',
    },
    //筒自洁
    drumclean : {
        title: getString("DrumClean"),
        imageNormal: require('../Resources/washModes/mode_selfclean_normal.png'),
        imagePressed: require('../Resources/washModes/mode_selfclean_pressed.png'),
        imageSelected: require('../Resources/washModes/mode_selfclean_selected.png'),
        displayTime: 71,
        rinse_time: '02',
        temp: 70,
        maxLoad: 0,
        extraPara: 'iEeI2rgk58LFtVjY5ZjbcNvUb4tStE2u1a9SeFUuUJFP2RQINg4k1gRM28zp8DzUPo5mbyUM7aPTu3wwGpFFOqWJoiWwwgqgyMN6rVB4ElvAjxK/uEQhLRIg1xdDN1qx1lH3jecEiYIcZNHDtzHAFQ==',
    },



};