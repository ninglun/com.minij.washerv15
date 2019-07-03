import LocalizedStrings from 'miot/ui/LocalizedStrings';
import IntlMessageFormat from 'intl-messageformat';
import 'intl';
import 'intl/locale-data/jsonp/en.js';
import 'intl/locale-data/jsonp/zh-Hans.js';
import 'intl/locale-data/jsonp/zh-Hant.js';
export const strings = {
	"en": {
		appName: "Mi Home",
		setting: "setting",
		featureSetting: "Shortcut settings",
		commonSetting: "Common settings",
		locationManagement: "Locations",
        helpFeedback: "Help feedback",
		moreSetting: "Additional settings",
        commonProblem:"SAK",
		addToDesktop: "Add to Home screen",
		resetDevice: "Reset device",
		// 小吉提供
        mainWash: "Wash",
        rinseWash: "Rinse",
        spin: "Spin",
        poweredOff:" Turned off",
        openCloseWashMachine: "Turn on",
        noDelaying: 'No delaying',
        standing:'Standing',
        powerOff: 'Turn off',
        delay: 'Scheduled',
        startWash: "Start program",
        remainTime: "Remaining time",
        pause: "Pause",
        delaying: 'Scheduled...',
        chooseWash: "Program",
        delayPause:"DelayPause",
        washPause:"WashPause",
        washFinish: "Laundry completed",
        minute: "Minutes",
        washDuration: "Duration",
        washTemp: "Temperature",
        times:"Times",
        day: 'Day',
        week: 'Week',
        month: 'Month',
        rinseFrequency: "Rinse",
        kilogram:"Kilogram",
        maximum:"Maximum",
        determine: 'OK',

        washSetting: "Settings",
        water_consumption: "Water consumption",
        power_consumption: "Power consumption",
        deviceName: "Device name",
        shareDevice: "Share device",
        firmwareUpgrate: "Check for firmware updates",
        feedBack:"Feedback",
        deleteDevice: 'Remove device',
        deviceTimeZone: "Device timezone",
        timeFinish:"Hours",
        WashMode: 'Programs',
        child_lock: 'childlock',
        // 洗衣模式
        NormalWash:"Standard",
        BoilWash:"High temperature",
        SuperQuick: "Quick",
        BabyCare: "Baby care",
        Slacks:"Sports wear",
        ChildBoilWash:"Baby care boiling",
        ChildFast:"Baby care speedup",
        ChildSave:"Baby care eco",
        ChildSoft:"Baby care soft",
        ChildBlot:"Baby care stain",
        Spin: "Spin",
        RinseSpin: "Rinse & Spin",
        RitzyShirt: "Shirt no iron",
        Bra: "Bra care",
        DrumClean: "Clean drum",







		deviceOffline: 'Device Offline',
		usualModel: 'Frequently used programs',
		WashingMode: "Washing Mode",
		moreMode: "More programs",
		moreModeSel: "More programs to quickly choose from",
		setParameter: "Adjust settings",
		lookParameter: "Check settings",
		older: "Schedule program",
        start: "Start",
        
        waterCost: " water consumption(unit:L)",
        powerCost: " electricity consumption(unit:KWH)",


		shutdown_reminder: 'Turn off alert',

		userPrivacy: 'User Agreement and Privacy Policy',
		privacy: 'Privacy Policy',
		privacyUrl: '../Assets/PrivacyPolicyEn.html',
		license: 'User Agreement',
		licenseUrl: '../Assets/LicenseServiceEn.html',

        btn_add_clothes: 'Add laundry',

		undefined_title: 'Unknown Error',
		undefined_methods: 'The cause of the mistake has not been found yet.',
		dF_title: 'Door lock failure(dF)',
		dF_methods: 'Make sure the door is closed, or contact after sales service.',
		SF_title: 'Water inlet error(SF)',
		SF_methods: 'Check if the tap is opened and confirm that the water inlet valve is unobstructed, or contact after sales service.',
		_F_title: 'Draining error(_F)',
		_F_methods: 'Confirm that the drainage pipe is properly installed and unobstructed, or contact after sales service.',
		UF_title: 'Unbalanced alert(UF)',
		UF_methods: 'Reposition the laundry and make sure the washing machine is level. It is recommended to wash several pieces of clothing at a time. Clothing that retains a lot of water, can easily cause an unbalance alert.',
		tF_title: 'Temperature sensor error(tF)',
		tF_methods: 'Stop using the machine and contact after sales service.',
		F_title: 'Water level error(~F)',
		F_methods: 'Restart the machine after a power outage, or contact after sales service.',
		HU_title: 'Voltage error(HU)',
		HU_methods: '1. The power supply voltage is unstable.\n2. After the voltage is stable, the program will run automatically.\n3. Buy a voltage regulator.',
		LU_title: 'Voltage error(LU)',
		LU_methods: '1. The power supply voltage is unstable.\n2. After the voltage is stable, the program will run automatically.\n3. Buy a voltage regulator.',
		rf_title: 'Motor failure(rf)',
		rf_methods: 'Stop using the machine and contact after sales service.',
		HF_title: 'Heating error(HF)',
		HF_methods: 'Stop using the machine and contact after sales service.',
		CE_title: 'Communication failure(CE)',
		CE_methods: 'Restart the machine after a power outage, or contact after sales service.',
		_3C_title: 'Inverter board failure(3C)',
		_3C_methods: 'Restart the machine after a power outage and try running the program Spin, or contact after sales service.',
		IE_title: 'Air inlet NTC error(IE)',
		IE_methods: 'Stop using the machine and contact after sales service.',
		OE_title: 'Air outlet NTC error(OE)',
		OE_methods: 'Stop using the machine and contact after sales service.',
		HE_title: 'Dryer heating error(HE)',
		HE_methods: 'Stop using the machine and contact after sales service.',
		FE_title: 'Fan error(FE)',
		FE_methods: 'Stop using the machine and contact after sales service.',
		dE_title: 'Drying plate communication error(dE)',
		dE_methods: 'Stop using the machine and contact after sales service.',
		E0_title: 'Variant setting error(E0)',
		E0_methods: 'Stop using the machine and contact after sales service.',
		PF_title: 'Water level sensor error',
		PF_methods: '1. Check whether the motherboard wiring harness is not or not properly plugged in.\n2. Check whether the water level sensor has a loose connection or not.',
		CF_title: 'Communication error between the motherboard and the inverter board',
		CF_methods: '1. Turn off the machine and check whether the motor is connected to the inductor cable or not.\n2. Check whether the motor cable and adapter cable are connected or not.\n3. Check whether the motherboard is connected or not.',
		HO_title: 'Water temperature was too high for more than 5 seconds',
		HO_methods: '1. Do not let children near the machine and restart the machine.\n2. Unplug the power cord and wait for the machine to cool down, before plugging it back in again.',
		_3H_title: 'Inverter board failure',
		_3H_methods: 'Restart the machine after a power outage and try running the program Spin, or contact after sales service.',
		LF_title: 'Water level is still too low, after the water adding process has been completed',
		LF_methods: '1. Check if the drain valve is blocked.\n2. Check whether the water pressure is normal or not.\n3. Check if there is any water leakage.',
		bF_title: 'Button stuck',
		bF_methods: 'Use the reset button',
		dL_title: 'Lack of the detergent',
		dL_methods: 'In order to effectively wash your laundry, please add detergent as soon as possible.',
		sL_title: 'Lack of the softener',
		sL_methods: 'In order to effectively wash your laundry, please add softener as soon as possible.',
		drumclean: 'Clean drum reminder',
		drumclean_methods: 'Please start the drum cleaning program.',
		btn_start: 'Start'
	},
	"zh": {
		appName: "米家",
		setting: "通用设置",
		featureSetting: "功能设置",
		commonSetting: "通用设置",

		locationManagement: "位置管理",

		moreSetting: "更多设置",
        commonProblem:"常见问题",
		addToDesktop: "添加桌面快捷方式",
		resetDevice: "重置设备",
        deviceTimeZone: "设备时区",
		// 小吉提供
        mainWash: "主洗",
        rinseWash: "漂洗",
        spin: "脱水",
        washerFinished: "已完成",
        poweredOff:"已关机",
        openCloseWashMachine: "开机",
        powerOff: '关机',
        delay: '预约',
        noDelaying: '无预约',
        standing:'待机中',
        startWash: "开始",
        remainTime: "剩余时间",
        child_lock: '童锁',
        pause: "暂停",
        delaying: '预约中',
        chooseWash: "洗涤",
        washFinish: "洗衣完成",
        delayPause:"预约暂停",
        washPause:"洗涤暂停",
        minute: '分钟',
        washDuration: "主洗时间",
        washTemp: "洗涤温度",
        times:"次",

        rinseFrequency: "漂洗次数",
        kilogram:"千克",
        maximum:"最大容量",
        determine: '确定',

        washSetting: "设置",
        water_consumption: "用水统计",
        power_consumption: "用电统计",
        deviceName: "重命名",
        shareDevice: "设备共享",
        firmwareUpgrate: "检查固件升级",
        feedBack:"反馈",
        deleteDevice: '删除设备',

        timeFinish:"小时后",
        WashingMode: "洗涤模式",
        OrderTime:'预约时间',

        // 洗衣模式
        NormalWash:"标准",
        BoilWash:"煮洗",
        Slacks:"运动服",
        ChildBoilWash:"婴童高温煮洗",
        ChildFast:"婴童快速洗",
        ChildSave:"婴童节能洗",
        ChildSoft:"婴童轻柔洗",
        ChildBlot:"婴童特渍洗",
        RinseSpin: "漂洗+脱水",
        RitzyShirt: "高档衬衣免熨烫",
        Bra: "Bra洗",

		//报警
        dF_title: '门锁故障',
        dF_methods: '请确保舱门已关闭或联系售后维修师傅上门检查。',
        SF_title: '进水异常(SF)',
        SF_methods: '请检查水龙头，确认进/排水阀通畅，或联系售后维修师傅上门检查。',
        _F_title: '排水异常(_F)',
        _F_methods: '请确认排水管正确安装且通畅，或联系售后维修师傅上门检查。',
        UF_title: '不平衡报警(UF)',
        UF_methods: '请重新摆放筒内衣物，并确保洗衣机水平放置后继续洗涤。建议洗衣服时一次多放几件，单独洗涤吸水性较强的衣物时易出现不平衡报警。',
        tF_title: '水加热温度传感器故障(tF)',
        tF_methods: '请暂停使用并联系售后维修师傅上门检查。',
        F_title: '水位异常(~F)',
        F_methods: '请尝试断电后重启洗衣机或联系售后师傅上门检查。',
        HU_title: '电压异常(HU)',
        HU_methods: '1、供电电压不稳定\n2、待电压稳定后，程序将自动运行\n3、购买一个稳压器',
        LU_title: '电压异常(LU)',
        LU_methods: '1、供电电压不稳定\n2、待电压稳定后，程序将自动运行\n3、购买一个稳压器',
        rf_title: '洗涤电机故障(rf)',
        rf_methods: '请暂停使用并联系售后维修师傅上门检查。',
        HF_title: '加热异常(HF)',
        HF_methods: '请尝试断电后重启洗衣机，或联系售后维修师傅上门检查。',
        CE_title: '通讯故障(CE)',
        CE_methods: '请尝试断电后重启洗衣机，或联系售后维修师傅上门检查。',
        _3C_title: '变频板故障(3C)',
        _3C_methods: '请断电重启洗衣机，尝试运行单脱水程序，或联系售后师傅上门检查。',
        IE_title: '进风口NTC异常(IE)',
        IE_methods: '请暂停使用并联系售后维修师傅上门检查',
        OE_title: '出风口NTC异常(OE)',
        OE_methods: '请暂停使用并联系售后维修师傅上门检查',
        HE_title: '烘干加热异常(HE)',
        HE_methods: '请暂停使用并联系售后维修师傅上门检查',
        FE_title: '风机异常(FE)',
        FE_methods: '请暂停使用并联系售后维修师傅上门检查',
        dE_title: '烘干板通讯异常(dE)',
        dE_methods: '请暂停使用并联系售后维修师傅上门检查',
        E0_title: '变种设置错误(E0)',
        E0_methods: '请暂停使用并联系售后维修师傅上门检查',
        PF_title: '水位传感器异常',
        PF_methods: '1、电脑板线束端子是否未插好或脱落\n2、检查水位传感器插线是否接触不良',
        CF_title: '电脑板与变频板通讯异常',
        CF_methods: '1、关机，检查电机连接电抗器线是否有脱落\n2、检查电机转接线与电缆线是否有脱落\n3、检查电脑板接线是否有脱落',
        HO_title: '水温过高5秒以上',
        HO_methods: '1、此时请勿让儿童靠近洗衣机，开机重启\n2、拔掉电源线，等待冷却后重新插电开启',
        _3H_title: '变频板故障',
        _3H_methods: '请断电重启洗衣机，尝试运行单脱水程序，或联系售后师傅上门检查。',
        LF_title: '到达补水次数，水位仍过低',
        LF_methods: '1、检查排水阀是否堵住了\n2、检查水压是否正常\n3、检查是否有漏水情况发生',
        bF_title: '按键卡住',
        bF_methods: '将按键复位',





        openWashMachine: "开机",
        deviceOffline: '设备离线',
        usualModel: '常用模式',
        moreMode: "更多模式",
        moreModeSel: "更多模式便捷设置",
        setParameter: "调整参数",
        lookParameter: "查看参数",
        older: "预约洗涤",
        start: "开始",
        shutdown_reminder: '关机提示',
        washingStr: '正在洗衣',
        shutdown_reminder_text: '洗衣机正在执行洗涤程序，关机将中断洗涤，重新开机后不可恢复，是否关机？',
        shutdown_reminder_remain_text: '洗衣机正在预约洗涤，关机将取消预约，重新开机后不可恢复，是否关机？',
        normal_temperature: '常温',
        WashMode: '洗衣模式',

        appointmentDown: '预约倒计时',


        dry: "烘干",
        child_lock_isOn: "已开启童锁",

        child_lock_off: "关闭童锁",
        child_lock_on: "开启童锁",

        finish: '完成',
        lateFinish: '后完成',
        lateTimeFinish: '{0}小时{1}分钟后完成{2}',
        washFinish_sun: "及时晾衣哦",
        washFinish_cold: "注意天气情况，选择合适地点晾衣哦",
        waterCost: "用水量(单位:升)",
        powerCost: "用电量(单位:KWH)",
        water_power_cost: "去查看最近用水/用电量情况",
        I_got_it: "我知道了",
        child_lock_close_mode: "童锁功能已开，关闭？",
        cancel: "取消",

        addCloth: "中途加衣",
        continueWash: "继续洗衣",
        pause_door_cannotOpen: "已暂停",
        pausing: "已暂停",
        add_clothes_able: "可中途添衣",
        add_clothes_enable: "该阶段不支持中途添衣",
        add_clothes_start: "中途添衣，按开始继续",
        child_lock_open: "已开启童锁",
        dirtinessLevel: "衣物脏污度", // (Slight, Moderate, Heavy)
        waterLever: "水位高度",

        spinSpeed: "脱水转速",
        specialStains: "污渍类型",
        dryLevel: "烘干",
        set_custom: "设为自定义",
        set_custom_success: "设置成功",
        close_custiom: '取消自定义',
        setCustomAlert: "确认修改参数并存储为自定义模式",
        closeCustomAlert: "确认修改并覆盖原自定义模式参数",
        closeCustomWashIsOn: "是否取消自定义洗涤",
        upgradeImmediately: "马上升级",
        washing_discharging_water: "洗衣机正在排水",
        modeManager: "模式管理",
        Sequencing: "排序",
        SequencingText: "靠上的模式会显示在洗衣机上",
        pickerOrderText: "请选择洗涤结束时间",
        order_countdown: "预约中",
        order_close: "取消预约",

        generalSetting: "通用设置",
        helpFeedback: "帮助反馈",
        sound: "声音",
        Mute: "操作提示音",
        soundSet: '声音设置',
        CleanHint: "筒自洁提醒",
        CleanInfo: "设置若干洗涤次数后的筒自洁提醒",
        auto_feeding: "自动投放",
        auto_detergent_feeding: "洗衣液自动投放",
        auto_softener_feeding: "柔顺剂自动投放",
        water_power_consumption: '水电用量统计',

        consumption: "用量统计",
        consumption_notice:"因环境差异，数据仅供参考",
        set_consumption: "水电用量统计",
        device_sharing: "设备共享",
        device_reset_name: "设备重命名",
        device_unbind: "解除绑定",
        hardware_upgrading: "检查固件升级",
        add_to_desktop: "添加桌面快捷方式",
        feedback: "反馈",
        change_device_name: "修改设备名",
        confirm_del_device: "确认删除设备吗?",
        save: "保存",
        babyFood: "婴儿食物",
        soilStain: "泥土",
        blueInk: "墨水",
        blueberry: "蓝莓",
        chiliOil: "辣椒油",
        chocolateStains: '巧克力',
        coffee: "咖啡",
        collar: "衣领",
        cookingOil: "烹饪油",
        curryStain: "咖喱",
        eggStains: "蛋黄",
        fruitStains: "水果",
        grassStain: "草",
        ketchup: "番茄酱",
        lipGloss: "唇彩",
        milkStains: "奶",
        milkTea: "奶茶",
        redWineStains: "红酒",
        shoePolish: "鞋油",
        teaStains: "茶",
        noneDirty: '无',
        dryMoist: '熨烫',
        dryNormal: '即穿',
        dryExtra: '速干',
        timer: '定时',
        costHint: '可查询今日0点前的数据',
        preMonth: '上月',
        curMonth: '本月',
        thisWeek: '本周',
        lastWeek: '上周',
        yesterday: '昨天',
        today: '今天',
        tomorrow: '明天',

        DailyPowerConsumption: '日用电量',
        DailyWaterConsumption: '日用水量',
        WeeklyPowerConsumption: '周用电量',
        WeeklyWaterConsumption: '周用水量',
        MonthlyPowerConsumption: '月用电量',
        MonthlyWaterConsumption: '月用水量',

        hour: '时',
        minHour: '小时',
        minMinute: '分钟',
        minu: "分",
        orderText: '请选择结束洗涤时间',
        detergentConcentration: '洗衣液类型',
        concentrationLaundryLiquid: '浓缩洗衣液',
        ordinaryLaundryLiquid: '普通洗衣液',
        powering_on: '正在打开电源',
        power_on_timeout: '打开电源超时',
        powering_off: '正在关闭电源',
        power_off_timeout: '关闭电源超时',
        in_the_laundry: '正在洗涤',
        washing: '正在洗涤',
        rinseing: '正在漂洗',
        spining: '正在脱水',
        drying: '正在烘干',
        operation_failed: '操作失败',
        syncingData: '正在同步数据',
        frequency: '次',
        fiveMinu: '5分钟',
        tenMinu: '10分钟',
        fifteenMinu: '15分钟',
        twentyMinu: '20分钟',
        twentyFiveMinu: '25分钟',
        thirtyMinu: '30分钟',
        fortyMinu: '40分钟',
        fiftyMinu: '50分钟',
        sixtyMinu: '60分钟',
        zeroMinu: '0分钟',
        thirtyFiveMinu: '35分钟',
        fortyFiveMinu: '45分钟',
        fiftyFiveMinu: '55分钟',
        ninetyMinu: '90分钟',
        _120Minutes: '120分钟',
        _150Minutes: '150分钟',
        _180Minutes: '180分钟',
        _oneHour: '1小时',
        _onePointFiveHour: '1.5小时',
        _twoHour: '2小时',
        _twoPointFiveHour: '2.5小时',
        _threeHour: '3小时',
        degree: 'kWh',
        cubicMeters: 'm³',
        day: '日',
        week: '周',
        month: '月 ',
        highTemp: '高温 ',
        yes: '是',
        no: '否',
        switchDetergent: '您放置在自动投放盒里的是浓缩洗衣液吗？',

        DailyWash: "日常洗",
        SuperQuick: "快速洗",
        Delicate: "轻柔洗",
        DownCoat: "羽绒服",
        Heavy: "大件洗",
        UserDefine: "自定义",
        Rinse: "单漂洗",
        Spin: "单脱水",
        Cottons: "棉麻洗",
        Synthetic: "化纤洗",
        Shirt: "衬衣洗",
        Boiling: "高温洗",
        Wool: "羊毛洗",
        DrumClean: "筒自洁",
        DryAirWash: "空气洗",
        BabyCare: "婴童洗",
        Intensive: "强力洗",
        WashDry: "洗+烘",
        Dry: "单烘干",
        Jacket: "冲锋衣",
        DryIron: "熨烫烘干",
        DryTiming: "定时烘干",
        Underwear: "内衣洗",
        WashDryQuick: "快洗烘",

        noSpin: '免脱水',
        waterLow: '低水位',
        waterMiddle: '中水位',
        waterHigh: '高水位',
        low: '轻',
        middle: '中',
        high: '高',
        weight: '重',
        once: '1次',
        twice: '2次',
        three: '3次',
        four: '4次',
        five: '5次',
        six: '6次',
        none: "无",
        ironing: '晾晒',
        immediatelyWear: '即穿',
        specialDry: '特干',
        timing: '定时',
        default: "默认",

		userPrivacy: '使用条款和隐私政策',
		privacy: '隐私政策',
		privacyUrl: '../Assets/PrivacyPolicy.html',
		license: '使用条款',
		licenseUrl: '../Assets/LicenseService.html',

		undefined_title: '未知错误',
		undefined_methods: '暂未找到错误原因',

		dL_title: '洗衣液缺少',
		dL_methods: '洗衣液缺少，为了不影响您的洗涤效果，请尽快补充',
		sL_title: '柔顺剂缺少',
		sL_methods: '柔顺剂缺少，为了不影响您的洗涤效果，请尽快补充',
		drumclean: '筒自洁提醒',
		drumclean_methods: '请运行筒自洁',
		btn_start: '开始'
	},
	"zh-hk": {
		appName: "米家",
		featureSetting: "feature setting",
		commonSetting: "壹般設定",
        deviceTimeZone:"設備時區",
		locationManagement: "位置管理",

		moreSetting: "更多設定",
		addToDesktop: "新增到桌面",
        commonProblem:"常見問題",
		resetDevice: "重置裝置",
		// 小吉提供
        mainWash: "主洗",
        rinseWash: "漂洗",
        spin: "脫水",
        poweredOff:"已关机",
        washerFinished: "已完成",
        powerOff: '关機',
        openCloseWashMachine: "開機",
        delay: '預約',
        noDelaying: '无預約',
        startWash: "開始",
        remainTime: "剩余時間",
        child_lock: '童鎖',
        pause: "暫停",
        delaying: "預約中",
        chooseWash: "洗滌",
        delayPause:"預約暫停",
        washPause:"洗滌暫停",
        washFinish: "洗衣完成",
        minute: "分鐘",
        washTemp: "洗滌温度",
        washDuration: "主洗時間",
        times:"次",
        rinseFrequency: "漂洗次數",
        kilogram:"千克",
        maximum:"最大容量",
        determine: '確定',

        washSetting: "設置",
        water_consumption: "水量統計",
        power_consumption: "電量統計",
        deviceName: "裝置名稱",
        shareDevice: "裝置共用",
        firmwareUpgrate: "檢查韌體更新",
        feedBack:"反馈",
        deleteDevice: '刪除設備',

        timeFinish:"小时后",
        WashMode: "洗滌模式",

        // 洗衣模式
        NormalWash:"标准",
        BoilWash:"煮洗",
        SuperQuick: "快洗",
        BabyCare: "婴童",
        Slacks:"运动服",
        ChildBoilWash:"婴童高温煮洗",
        ChildFast:"婴童快速洗",
        ChildSave:"婴童节能洗",
        ChildSoft:"婴童轻柔洗",
        ChildBlot:"婴童特渍洗",
        Spin: "单脱水",
        RinseSpin: "漂洗+脱水",
        RitzyShirt: "高档衬衣免熨烫",
        Bra: "Bra洗",
        DrumClean: "筒自洁",





		deviceOffline: '設備離線',

		userPrivacy: '使用條款和隱私政策',
		privacy: '隱私政策',
		privacyUrl: '../Assets/PrivacyPolicy_hant.html',
		license: '使用条款',
		licenseUrl: '../Assets/LicenseService_hant.html',
		btn_start: '開始',


	},
	"zh-tw": {
		appName: "米家",
		setting: "設置",
		featureSetting: "feature setting",
		commonSetting: "壹般設定",
        deviceTimeZone:"設備時區",
		locationManagement: "位置管理",
		moreSetting: "更多設定",
        commonProblem:"常見問題",
		addToDesktop: "新增到桌面",
		resetDevice: "重置裝置",
		// 小吉提供
        mainWash: "主洗",
        rinseWash: "漂洗",
        spin: "脫水",
        washerFinished: "已完成",
        poweredOff:"已关機",
        powerOff: '关機',
        openCloseWashMachine: "開機",
        delay: '預約',
        noDelaying: '无預約',
        startWash: "開始",
        remainTime: "剩余時間",
        child_lock: '童鎖',
        pause: "暫停",
        delaying: "預約中",
        chooseWash: "洗滌",
        delayPause:"預約暫停",
        washPause:"洗滌暫停",
        washFinish: "洗衣完成",
        minute: "分鐘",
        washDuration: "主洗時間",
        washTemp: "洗滌温度",
        times:"次",
        day: '日',
        week: '周',
        month: '月',
        rinseFrequency: "漂洗次數",
        kilogram:"千克",
        maximum:"最大容量",
        determine: '確定',

        standing:'待機中',
        helpFeedback: "幫助反饋",

        washSetting: "設置",
        water_consumption: "水量統計",
        power_consumption: "電量統計",
        deviceName: "裝置名稱",
        shareDevice: "裝置共用",
        firmwareUpgrate: "檢查韌體更新",
        feedBack:"反馈",
        deleteDevice: '刪除設備',

        timeFinish:"小时后",
        WashMode: "洗滌模式",

        // 洗衣模式
        NormalWash:"標準",
        BoilWash:"煮洗",
        SuperQuick: "快洗",
        BabyCare: "嬰童",
        Slacks:"運動服",
        ChildBoilWash:"嬰童高溫煮洗",
        ChildFast:"嬰童快速洗",
        ChildSave:"嬰童節能洗",
        ChildSoft:"嬰童輕柔洗",
        ChildBlot:"嬰童特漬洗",
        Spin: "單脫水",
        RinseSpin: "漂洗+脫水",
        RitzyShirt: "高檔襯衣免熨燙",
        Bra: "Bra洗",
        DrumClean: "筒自潔",




		deviceOffline: '設備離線',
		usualModel: '常用模式',
		moreMode: "更多模式",
		userPrivacy: '使用條款和隱私政策',
		privacy: '隱私政策',
		privacyUrl: '../Assets/PrivacyPolicy_hant.html',
		license: '使用条款',
		licenseUrl: '../Assets/LicenseService_hant.html',
		btn_start: '開始',



	}
};
export const localStrings = new LocalizedStrings(strings);

export function getString(key, obj = null) {
	if (obj) {
		return new IntlMessageFormat(localStrings[key], localStrings.language).format(obj);
	} else {
		return localStrings[key];
	}
}

export function stringFormat() {
    if (arguments.length == 0)
        return null;
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}
