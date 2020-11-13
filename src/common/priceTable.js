let priceTable = [
  {
    "CategoryPhenomenon": [{
      "CategoryName": "冰箱",
      "Phenomenon": [{
        "Measure": ["更换变频主板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "按钮失灵"
      }, {
        "Measure": ["更换变频主板", "更换压缩机", "内漏维修", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "不通电"
      }, {
        "Measure": ["更换变频主板", "更换电磁阀", "更换冷凝器", "更换压缩机", "内漏维修", "简单维修（更换辅件、调试）", "加氟", "维修一口价"],
        "Name": "不制冷"
      }, {
        "Measure": ["更换变频主板", "更换电磁阀", "更换冷凝器", "更换压缩机", "内漏维修", "简单维修（更换辅件、调试）", "加氟", "维修一口价"],
        "Name": "结冰结霜"
      }, {
        "Measure": ["更换变频主板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "上网问题"
      }, {
        "Measure": ["更换变频主板", "更换电磁阀", "更换冷凝器", "更换压缩机", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "外部发热"
      }, {
        "Measure": ["更换变频主板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "显示屏故障"
      }, {
        "Measure": ["更换冷凝器", "更换压缩机", "简单维修（更换辅件、调试）", "加氟", "维修一口价"],
        "Name": "振动噪音"
      }, {"Measure": ["内漏维修", "简单维修（更换辅件、调试）", "维修一口价"], "Name": "异味"}, {
        "Measure": ["简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "门体故障"
      }, {"Measure": ["更换变频主板", "更换电磁阀", "更换冷凝器", "更换压缩机", "内漏维修", "简单维修（更换辅件、调试）", "加氟", "维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "电视",
      "Phenomenon": [{
        "Measure": ["更换背光板", "更换电源板", "更换主板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "屏横线/横带"
      }, {
        "Measure": ["更换背光板", "更换电源板", "更换主板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "屏幕类"
      }, {
        "Measure": ["更换背光板", "更换电源板", "更换主板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "屏竖线/竖带"
      }, {
        "Measure": ["更换电源板", "更换主板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "不通电"
      }, {
        "Measure": ["更换电源板", "更换主板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "开机延迟"
      }, {
        "Measure": ["更换电源板", "更换主板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "异响"
      }, {"Measure": ["更换主板", "简单维修（更换辅件、调试）", "维修一口价"], "Name": "声音类"}, {
        "Measure": ["更换主板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "网络连接不良"
      }, {
        "Measure": ["简单维修（更换辅件、调试）"],
        "Name": "遥控器问题"
      }, {"Measure": ["更换背光板", "更换电源板", "更换主板", "简单维修（更换辅件、调试）", "维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "空调",
      "Phenomenon": [{
        "Measure": ["更换控制面板", "更换四通阀", "更换压缩机", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "不通电"
      }, {
        "Measure": ["更换控制面板", "更换四通阀", "更换压缩机", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "空气开关问题"
      }, {
        "Measure": ["更换控制面板", "更换四通阀", "更换压缩机", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "漏电"
      }, {
        "Measure": ["更换控制面板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "显示屏不亮"
      }, {
        "Measure": ["更换四通阀", "更换压缩机", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "结霜结露"
      }, {
        "Measure": ["更换四通阀", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "室内机噪音大"
      }, {
        "Measure": ["更换四通阀", "更换压缩机", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "室外机噪音大"
      }, {
        "Measure": ["更换四通阀", "更换压缩机", "简单维修（更换辅件、调试）", "加氟", "维修一口价"],
        "Name": "制冷差"
      }, {"Measure": ["内漏维修", "简单维修（更换辅件、调试）", "维修一口价"], "Name": "漏水"}, {
        "Measure": ["内漏维修", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "有异味"
      }, {"Measure": ["简单维修（更换辅件、调试）", "维修一口价"], "Name": "显示屏破损"}, {
        "Measure": ["简单维修（更换辅件、调试）"],
        "Name": "遥控器问题"
      }, {"Measure": ["更换控制面板", "更换四通阀", "更换压缩机", "内漏维修", "简单维修（更换辅件、调试）", "加氟", "维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "洗衣机",
      "Phenomenon": [{
        "Measure": ["更换变频电机", "更换变频电脑板", "更换变频主板", "更换电机", "更换电脑板", "更换离合器", "更换全自动电机", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "不烘干"
      }, {
        "Measure": ["更换变频电机", "更换变频电脑板", "更换变频主板", "更换电机", "更换电脑板", "更换离合器", "更换全自动电机", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "不进水"
      }, {
        "Measure": ["更换变频电机", "更换变频电脑板", "更换变频主板", "更换电机", "更换电脑板", "更换离合器", "更换全自动电机", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "不排水"
      }, {
        "Measure": ["更换变频电机", "更换变频电脑板", "更换变频主板", "更换电机", "更换电脑板", "更换全自动电机", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "不通电"
      }, {
        "Measure": ["更换变频电机", "更换变频电脑板", "更换变频主板", "更换电机", "更换电脑板", "更换离合器", "更换全自动电机", "更换三脚架总成", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "不洗涤"
      }, {
        "Measure": ["更换变频电机", "更换变频电脑板", "更换变频主板", "更换电机", "更换电脑板", "更换离合器", "更换全自动电机", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "漏电"
      }, {
        "Measure": ["更换变频电机", "更换电机", "更换离合器", "更换全自动电机", "更换三脚架总成", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "脱不干水"
      }, {
        "Measure": ["更换变频电机", "更换电机", "更换离合器", "更换全自动电机", "更换三脚架总成", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "噪音大"
      }, {
        "Measure": ["更换变频电脑板", "更换变频主板", "更换电脑板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "门无法开关"
      }, {
        "Measure": ["更换变频电脑板", "更换变频主板", "更换电脑板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "显示异常"
      }, {"Measure": ["简单维修（更换辅件、调试）", "维修一口价"], "Name": "漏水"}, {
        "Measure": ["简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "衣物损坏"
      }, {
        "Measure": ["更换变频电机", "更换变频电脑板", "更换变频主板", "更换电机", "更换电脑板", "更换离合器", "更换全自动电机", "更换三脚架总成", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "其他"
      }]
    }, {
      "CategoryName": "热水器",
      "Phenomenon": [{
        "Measure": ["更换比例阀", "更换加热管", "更换控制板", "更换控制仪", "更换压缩机", "简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "不通电"
      }, {
        "Measure": ["更换加热管", "更换控制板", "更换控制仪", "更换四通阀", "更换压缩机", "简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "出水温度过热过冷"
      }, {
        "Measure": ["更换加热管", "更换控制板", "更换控制仪", "更换压缩机", "简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "指示灯不亮也不加热"
      }, {
        "Measure": ["更换加热管", "更换控制板", "更换控制仪", "更换压缩机", "简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "指示灯常亮"
      }, {
        "Measure": ["更换加热管", "更换控制板", "更换压缩机", "简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "指示灯亮不加热"
      }, {
        "Measure": ["更换控制板", "更换控制仪", "更换压缩机", "简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "漏电"
      }, {
        "Measure": ["简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "出水不畅"
      }, {
        "Measure": ["更换比例阀", "更换加热管", "更换控制板", "更换控制仪", "更换水箱", "更换四通阀", "更换压缩机", "简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "其他"
      }]
    }, {
      "CategoryName": "油烟机",
      "Phenomenon": [{
        "Measure": ["更换电机", "更换控制板", "简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "不通电"
      }, {
        "Measure": ["更换电机", "更换控制板", "简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "漏电"
      }, {
        "Measure": ["更换电机", "更换控制板", "简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "排烟效果差"
      }, {"Measure": ["更换电机", "简单维修(更换辅件、调试)", "维修一口价"], "Name": "噪音大"}, {
        "Measure": ["更换电机", "简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "震动"
      }, {"Measure": ["更换控制板", "简单维修(更换辅件、调试)", "维修一口价"], "Name": "指示灯不亮"}, {
        "Measure": ["简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "漏油"
      }, {"Measure": ["更换电机", "更换控制板", "简单维修(更换辅件、调试)", "维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "燃气灶",
      "Phenomenon": [{
        "Measure": ["更换炉头", "更换脉冲点火器", "简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "点不着"
      }, {
        "Measure": ["更换炉头", "简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "点火一松就灭"
      }, {
        "Measure": ["更换炉头", "简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "火焰不正常"
      }, {
        "Measure": ["更换炉头", "更换脉冲点火器", "简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "无火花"
      }, {
        "Measure": ["更换炉头", "更换脉冲点火器", "简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "自动熄火"
      }, {"Measure": ["更换炉头", "更换脉冲点火器", "简单维修(更换辅件、调试)", "维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "除湿器",
      "Phenomenon": [{
        "Measure": ["更换压缩机", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "不除湿"
      }, {
        "Measure": ["更换压缩机", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "不通电"
      }, {"Measure": ["更换压缩机", "简单维修（更换辅件、调试）", "维修一口价"], "Name": "噪音大"}, {
        "Measure": ["简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "指示灯异常"
      }, {"Measure": ["更换压缩机", "简单维修（更换辅件、调试）", "维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "电饼铛",
      "Phenomenon": [{"Measure": ["维修一口价"], "Name": "不加热"}, {
        "Measure": ["维修一口价"],
        "Name": "不通电"
      }, {"Measure": ["维修一口价"], "Name": "加热挡位故障"}, {"Measure": ["维修一口价"], "Name": "升温速度慢"}]
    }, {
      "CategoryName": "电磁炉",
      "Phenomenon": [{"Measure": ["维修一口价"], "Name": "不通电"}, {
        "Measure": ["维修一口价"],
        "Name": "突然停止"
      }, {"Measure": ["维修一口价"], "Name": "按键无反应"}, {"Measure": ["维修一口价"], "Name": "无显示"}, {
        "Measure": ["维修一口价"],
        "Name": "短促声音报警"
      }, {"Measure": ["维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "电饭煲",
      "Phenomenon": [{"Measure": ["更换发热盘", "更换控制板", "维修一口价"], "Name": "不通电"}, {
        "Measure": ["更换发热盘", "更换控制板", "维修一口价"],
        "Name": "不煮饭"
      }, {"Measure": ["更换发热盘", "更换控制板", "维修一口价"], "Name": "饭夹生"}, {
        "Measure": ["更换发热盘", "更换控制板", "维修一口价"],
        "Name": "漏电"
      }, {"Measure": ["更换控制板", "维修一口价"], "Name": "不能保温"}, {"Measure": ["更换发热盘", "更换控制板", "维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "电风扇",
      "Phenomenon": [{"Measure": ["更换电机", "简单维修（更换辅件、调试）"], "Name": "不通电"}, {
        "Measure": ["更换电机", "简单维修（更换辅件、调试）"],
        "Name": "风扇不转"
      }, {"Measure": ["更换电机", "简单维修（更换辅件、调试）"], "Name": "转速慢"}, {
        "Measure": ["简单维修（更换辅件、调试）"],
        "Name": "按键失灵"
      }, {"Measure": ["简单维修（更换辅件、调试）"], "Name": "嗡嗡声"}, {"Measure": ["更换电机", "简单维修（更换辅件、调试）"], "Name": "其他"}]
    }, {
      "CategoryName": "电暖炉",
      "Phenomenon": [{
        "Measure": ["更换发热体", "更换控制板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "不通电"
      }, {
        "Measure": ["更换发热体", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "温度不热"
      }, {
        "Measure": ["更换控制板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "加热挡位故障"
      }, {
        "Measure": ["更换控制板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "指示灯异常"
      }, {"Measure": ["更换发热体", "更换控制板", "简单维修（更换辅件、调试）", "维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "电压力锅",
      "Phenomenon": [{"Measure": ["维修一口价"], "Name": "不通电"}, {
        "Measure": ["维修一口价"],
        "Name": "不工作"
      }, {"Measure": ["维修一口价"], "Name": "糊饭"}, {"Measure": ["维修一口价"], "Name": "锅盖和机体有蒸汽泄漏"}, {
        "Measure": ["维修一口价"],
        "Name": "指示灯异常"
      }, {"Measure": ["维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "挂烫机",
      "Phenomenon": [{"Measure": ["维修一口价"], "Name": "不通电"}, {
        "Measure": ["维修一口价"],
        "Name": "指示灯不亮"
      }, {"Measure": ["维修一口价"], "Name": "灯亮但不出蒸汽"}, {"Measure": ["维修一口价"], "Name": "水箱故障"}, {
        "Measure": ["维修一口价"],
        "Name": "水泵声音大"
      }, {"Measure": ["维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "烘干机",
      "Phenomenon": [{"Measure": ["简单维修（更换辅件、调试）", "维修一口价"], "Name": "不工作"}, {
        "Measure": ["简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "不通电"
      }, {"Measure": ["简单维修（更换辅件、调试）", "维修一口价"], "Name": "异常报警"}, {
        "Measure": ["简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "指示灯异常"
      }, {"Measure": ["简单维修（更换辅件、调试）", "维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "加湿器",
      "Phenomenon": [{"Measure": ["维修一口价"], "Name": "不通电"}, {
        "Measure": ["维修一口价"],
        "Name": "加湿效果差"
      }, {"Measure": ["维修一口价"], "Name": "无风、无指示"}, {"Measure": ["维修一口价"], "Name": "开机有显示、无风"}, {
        "Measure": ["维修一口价"],
        "Name": "有异味"
      }, {"Measure": ["维修一口价"], "Name": "噪音"}, {"Measure": ["维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "搅拌机",
      "Phenomenon": [{"Measure": ["维修一口价"], "Name": "不通电"}, {
        "Measure": ["维修一口价"],
        "Name": "突然停止"
      }, {"Measure": ["维修一口价"], "Name": "无法启动"}, {"Measure": ["维修一口价"], "Name": "搅拌臂断裂"}, {
        "Measure": ["维修一口价"],
        "Name": "旋转部分过热"
      }, {"Measure": ["维修一口价"], "Name": "清料困难"}, {"Measure": ["维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "净化器",
      "Phenomenon": [{"Measure": ["维修一口价"], "Name": "负离子发生器两极间打火"}, {
        "Measure": ["维修一口价"],
        "Name": "负离子输出浓度低"
      }, {"Measure": ["维修一口价"], "Name": "指示灯不亮"}, {"Measure": ["维修一口价"], "Name": "风扇不转"}, {
        "Measure": ["维修一口价"],
        "Name": "显示除尘"
      }, {"Measure": ["维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "净水器",
      "Phenomenon": [{"Measure": ["维修一口价"], "Name": "出水有异味"}, {
        "Measure": ["维修一口价"],
        "Name": "接头漏水"
      }, {"Measure": ["维修一口价"], "Name": "净化效果差"}, {"Measure": ["维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "咖啡机",
      "Phenomenon": [{
        "Measure": ["简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "把手滤网不出咖啡"
      }, {"Measure": ["简单维修（更换辅件、调试）", "维修一口价"], "Name": "不通电"}, {
        "Measure": ["简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "出品咖啡不热"
      }, {"Measure": ["简单维修（更换辅件、调试）", "维修一口价"], "Name": "萃取流速过快或过慢"}, {
        "Measure": ["简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "机器噪音"
      }, {"Measure": ["简单维修（更换辅件、调试）", "维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "空调扇",
      "Phenomenon": [{
        "Measure": ["更换压缩机", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "不出风"
      }, {
        "Measure": ["更换压缩机", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "不通电"
      }, {
        "Measure": ["更换压缩机", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "不制冷"
      }, {
        "Measure": ["更换压缩机", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "风小"
      }, {"Measure": ["更换压缩机", "简单维修（更换辅件、调试）", "维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "烤箱",
      "Phenomenon": [{"Measure": ["简单维修（更换辅件、调试）", "维修一口价"], "Name": "不通电"}, {
        "Measure": ["简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "定时器失灵"
      }, {"Measure": ["简单维修（更换辅件、调试）", "维修一口价"], "Name": "漏电"}, {
        "Measure": ["简单维修（更换辅件、调试）"],
        "Name": "异味"
      }, {"Measure": ["简单维修（更换辅件、调试）", "维修一口价"], "Name": "指示灯不亮不加热"}, {
        "Measure": ["简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "指示灯亮不加热"
      }, {"Measure": ["简单维修（更换辅件、调试）", "维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "料理机",
      "Phenomenon": [{"Measure": ["维修一口价"], "Name": "不通电"}, {
        "Measure": ["维修一口价"],
        "Name": "指示灯亮不工作"
      }, {"Measure": ["维修一口价"], "Name": "溢浆"}, {"Measure": ["维修一口价"], "Name": "粘糊"}, {
        "Measure": ["维修一口价"],
        "Name": "按键无反应"
      }, {"Measure": ["维修一口价"], "Name": "蜂鸣报警"}, {"Measure": ["维修一口价"], "Name": "异味"}, {
        "Measure": ["维修一口价"],
        "Name": "漏电跳闸"
      }, {"Measure": ["维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "面包机",
      "Phenomenon": [{"Measure": ["更换电机", "维修一口价"], "Name": "不通电"}, {
        "Measure": ["更换电机", "维修一口价"],
        "Name": "异响"
      }, {"Measure": ["维修一口价"], "Name": "发面不成功"}, {"Measure": ["维修一口价"], "Name": "烤糊"}, {
        "Measure": ["维修一口价"],
        "Name": "漏电"
      }, {"Measure": ["更换电机", "维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "甩干机",
      "Phenomenon": [{"Measure": ["更换电机", "维修一口价"], "Name": "不通电"}, {
        "Measure": ["更换电机", "维修一口价"],
        "Name": "低速挡不启动"
      }, {"Measure": ["更换电机", "维修一口价"], "Name": "通电后电机不转"}, {
        "Measure": ["更换电机", "维修一口价"],
        "Name": "噪音大"
      }, {"Measure": ["更换电机", "维修一口价"], "Name": "震动剧烈"}, {
        "Measure": ["更换电机", "维修一口价"],
        "Name": "转速慢"
      }, {"Measure": ["更换电机", "维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "微波炉",
      "Phenomenon": [{
        "Measure": ["更换变压器", "更换磁控管", "更换控制板", "简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "不通电"
      }, {
        "Measure": ["更换变压器", "更换磁控管", "更换控制板", "简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "跳闸"
      }, {
        "Measure": ["更换变压器", "更换磁控管", "更换控制板", "简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "突然停止"
      }, {
        "Measure": ["更换变压器", "更换磁控管", "更换控制板", "简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "无法加热"
      }, {
        "Measure": ["更换磁控管", "更换控制板", "简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "炉内灯不亮"
      }, {
        "Measure": ["更换磁控管", "更换控制板", "简单维修(更换辅件、调试)", "维修一口价"],
        "Name": "设定时间不停止"
      }, {"Measure": ["更换变压器", "更换磁控管", "更换控制板", "简单维修(更换辅件、调试)", "维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "吸尘器",
      "Phenomenon": [{"Measure": ["更换电机", "维修一口价"], "Name": "不通电"}, {
        "Measure": ["更换电机", "维修一口价"],
        "Name": "电机不转"
      }, {"Measure": ["更换电机", "维修一口价"], "Name": "过热"}, {
        "Measure": ["更换电机", "维修一口价"],
        "Name": "吸力小"
      }, {"Measure": ["更换电机", "维修一口价"], "Name": "噪音大"}, {"Measure": ["更换电机", "维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "洗碗机",
      "Phenomenon": [{"Measure": ["简单维修（更换辅件、调试）", "维修一口价"], "Name": "不通电"}, {
        "Measure": ["简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "进水不畅"
      }, {"Measure": ["简单维修（更换辅件、调试）", "维修一口价"], "Name": "漏电"}, {
        "Measure": ["简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "漏水"
      }, {"Measure": ["简单维修（更换辅件、调试）", "维修一口价"], "Name": "洗不净"}, {"Measure": ["简单维修（更换辅件、调试）", "维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "消毒柜",
      "Phenomenon": [{
        "Measure": ["更换控制板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "不通电"
      }, {
        "Measure": ["更换控制板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "臭氧管和紫外线灯不工作"
      }, {
        "Measure": ["更换控制板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "灯亮不工作"
      }, {
        "Measure": ["更换控制板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "定时功能失效"
      }, {
        "Measure": ["更换控制板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "烘干效果不好"
      }, {
        "Measure": ["更换控制板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "温度过高或过低"
      }, {
        "Measure": ["更换控制板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "消毒时间过长或过短"
      }, {"Measure": ["更换控制板", "简单维修（更换辅件、调试）", "维修一口价"], "Name": "噪声大"}, {
        "Measure": ["简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "柜门封闭不良"
      }, {"Measure": ["简单维修（更换辅件、调试）", "维修一口价"], "Name": "异味"}, {
        "Measure": ["更换控制板", "简单维修（更换辅件、调试）", "维修一口价"],
        "Name": "其他"
      }]
    }, {
      "CategoryName": "饮水机",
      "Phenomenon": [{"Measure": ["更换压缩机", "更换主板", "维修一口价"], "Name": "不通电"}, {
        "Measure": ["更换压缩机", "更换主板", "维修一口价"],
        "Name": "不制热/制冷"
      }, {"Measure": ["更换压缩机", "更换主板", "维修一口价"], "Name": "电热管噪音大"}, {
        "Measure": ["更换压缩机", "更换主板", "维修一口价"],
        "Name": "漏电"
      }, {"Measure": ["更换主板", "维修一口价"], "Name": "显示灯异常"}, {"Measure": ["维修一口价"], "Name": "不出水"}, {
        "Measure": ["维修一口价"],
        "Name": "龙头渗水"
      }, {"Measure": ["维修一口价"], "Name": "漏水"}, {"Measure": ["更换压缩机", "更换主板", "维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "榨汁机",
      "Phenomenon": [{"Measure": ["维修一口价"], "Name": "不通电"}, {
        "Measure": ["维修一口价"],
        "Name": "通电不工作"
      }, {"Measure": ["维修一口价"], "Name": "突然停机"}, {"Measure": ["维修一口价"], "Name": "果渣多"}, {
        "Measure": ["维修一口价"],
        "Name": "噪音大"
      }, {"Measure": ["维修一口价"], "Name": "出汁少"}, {"Measure": ["维修一口价"], "Name": "其他"}]
    }, {
      "CategoryName": "油汀",
      "Phenomenon": [{"Measure": ["维修一口价"], "Name": "不加热"}, {
        "Measure": ["维修一口价"],
        "Name": "指示灯异常"
      }, {"Measure": ["维修一口价"], "Name": "缺油"}, {"Measure": ["维修一口价"], "Name": "漏油"}, {
        "Measure": ["维修一口价"],
        "Name": "其他"
      }]
    }, {
      "CategoryName": "回水器",
      "Phenomenon": [{"Measure": ["更换电机", "简单维修（更换辅件、调试）"], "Name": "不点火"}, {
        "Measure": ["更换电机", "简单维修（更换辅件、调试）"],
        "Name": "出水温度异常"
      }, {"Measure": ["更换电机", "简单维修（更换辅件、调试）"], "Name": "水温忽冷忽热"}, {
        "Measure": ["更换电机", "简单维修（更换辅件、调试）"],
        "Name": "无法通过开关热水龙头启动"
      }, {"Measure": ["更换电机", "简单维修（更换辅件、调试）"], "Name": "其他"}]
    }], "ServiceCategories": [{
      "Name": "维修",
      "Categories": [{
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }, {"Name": "维修一口价", "Price": 178.0, "ServiceLevel": "中修"}], "Name": "电饼铛", "Spec1": []
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }, {"Name": "维修一口价", "Price": 178.0, "ServiceLevel": "中修"}], "Name": "电磁炉", "Spec1": []
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }],
        "Name": "电饭煲",
        "Spec1": [{
          "Measures": [{"Name": "更换发热盘", "Price": 238.0, "ServiceLevel": "大修"}, {
            "Name": "更换控制板",
            "Price": 325.0,
            "ServiceLevel": "大修"
          }, {"Name": "维修一口价", "Price": 155.0, "ServiceLevel": "中修"}], "Name": "国产", "Spec2": []
        }, {
          "Measures": [{"Name": "更换发热盘", "Price": 358.0, "ServiceLevel": "大修"}, {
            "Name": "更换控制板",
            "Price": 486.0,
            "ServiceLevel": "大修"
          }, {"Name": "维修一口价", "Price": 155.0, "ServiceLevel": "中修"}], "Name": "进口/合资品牌", "Spec2": []
        }]
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }, {"Name": "维修一口价", "Price": 205.0, "ServiceLevel": "中修"}], "Name": "电压力锅", "Spec1": []
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }, {"Name": "维修一口价", "Price": 178.0, "ServiceLevel": "中修"}], "Name": "搅拌机", "Spec1": []
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }, {"Name": "简单维修（更换辅件、调试）", "Price": 145.0, "ServiceLevel": "小修"}, {
          "Name": "维修一口价",
          "Price": 358.0,
          "ServiceLevel": "中修"
        }], "Name": "咖啡机", "Spec1": []
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }, {"Name": "简单维修（更换辅件、调试）", "Price": 120.0, "ServiceLevel": "小修"}, {
          "Name": "维修一口价",
          "Price": 276.0,
          "ServiceLevel": "中修"
        }], "Name": "烤箱", "Spec1": []
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }, {"Name": "维修一口价", "Price": 178.0, "ServiceLevel": "中修"}], "Name": "料理机", "Spec1": []
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }],
        "Name": "面包机",
        "Spec1": [{
          "Measures": [{"Name": "更换电机", "Price": 358.0, "ServiceLevel": "大修"}, {
            "Name": "维修一口价",
            "Price": 178.0,
            "ServiceLevel": "中修"
          }], "Name": "国产", "Spec2": []
        }, {
          "Measures": [{"Name": "更换电机", "Price": 538.0, "ServiceLevel": "大修"}, {
            "Name": "维修一口价",
            "Price": 178.0,
            "ServiceLevel": "中修"
          }], "Name": "进口/合资品牌", "Spec2": []
        }]
      }, {
        "Measures": [{"Name": "波纹软管30-40cm", "Price": 30.0, "ServiceLevel": "材料费"}, {
          "Name": "波纹软管50-80cm",
          "Price": 40.0,
          "ServiceLevel": "材料费"
        }, {"Name": "安全阀", "Price": 40.0, "ServiceLevel": "材料费"}, {
          "Name": "三角阀",
          "Price": 30.0,
          "ServiceLevel": "材料费"
        }, {"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }, {"Name": "简单维修（更换辅件、调试）", "Price": 120.0, "ServiceLevel": "小修"}, {
          "Name": "维修一口价",
          "Price": 298.0,
          "ServiceLevel": "中修"
        }], "Name": "洗碗机", "Spec1": []
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }],
        "Name": "消毒柜",
        "Spec1": [{
          "Measures": [{"Name": "更换控制板", "Price": 310.0, "ServiceLevel": "大修"}, {
            "Name": "简单维修（更换辅件、调试）",
            "Price": 120.0,
            "ServiceLevel": "小修"
          }, {"Name": "维修一口价", "Price": 226.0, "ServiceLevel": "中修"}], "Name": "国产", "Spec2": []
        }, {
          "Measures": [{"Name": "更换控制板", "Price": 466.0, "ServiceLevel": "大修"}, {
            "Name": "简单维修（更换辅件、调试）",
            "Price": 120.0,
            "ServiceLevel": "小修"
          }, {"Name": "维修一口价", "Price": 226.0, "ServiceLevel": "中修"}], "Name": "进口/合资品牌", "Spec2": []
        }]
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }, {"Name": "维修一口价", "Price": 178.0, "ServiceLevel": "中修"}], "Name": "榨汁机", "Spec1": []
      }, {
        "Measures": [{"Name": "活性炭", "Price": 65.0, "ServiceLevel": "材料费"}, {
          "Name": "漏保线",
          "Price": 150.0,
          "ServiceLevel": "材料费"
        }, {"Name": "清洗剂", "Price": 60.0, "ServiceLevel": "材料费"}, {
          "Name": "杀菌剂",
          "Price": 60.0,
          "ServiceLevel": "材料费"
        }, {"Name": "座架", "Price": 160.0, "ServiceLevel": "材料费"}, {
          "Name": "晚间加急费",
          "Price": 30.0,
          "ServiceLevel": "其他服务项"
        }, {"Name": "上门费", "Price": 30.0, "ServiceLevel": "上门"}], "Name": "冰箱", "Spec1": [{
          "Measures": null,
          "Name": "国产",
          "Spec2": [{
            "Measures": [{"Name": "更换变频主板", "Price": 576.0, "ServiceLevel": "大修"}, {
              "Name": "更换电磁阀",
              "Price": 478.0,
              "ServiceLevel": "大修"
            }, {"Name": "更换冷凝器", "Price": 478.0, "ServiceLevel": "大修"}, {
              "Name": "更换压缩机",
              "Price": 660.0,
              "ServiceLevel": "大修"
            }, {"Name": "内漏维修", "Price": 576.0, "ServiceLevel": "大修"}, {
              "Name": "简单维修（更换辅件、调试）",
              "Price": 145.0,
              "ServiceLevel": "小修"
            }, {"Name": "加氟", "Price": 195.0, "ServiceLevel": "中修"}, {
              "Name": "维修一口价",
              "Price": 238.0,
              "ServiceLevel": "中修"
            }], "Name": "≤200L", "Spec3": []
          }, {
            "Measures": [{"Name": "更换变频主板", "Price": 828.0, "ServiceLevel": "大修"}, {
              "Name": "更换电磁阀",
              "Price": 576.0,
              "ServiceLevel": "大修"
            }, {"Name": "更换冷凝器", "Price": 505.0, "ServiceLevel": "大修"}, {
              "Name": "更换压缩机",
              "Price": 828.0,
              "ServiceLevel": "大修"
            }, {"Name": "内漏维修", "Price": 936.0, "ServiceLevel": "大修"}, {
              "Name": "简单维修（更换辅件、调试）",
              "Price": 145.0,
              "ServiceLevel": "小修"
            }, {"Name": "加氟", "Price": 195.0, "ServiceLevel": "中修"}, {
              "Name": "维修一口价",
              "Price": 298.0,
              "ServiceLevel": "中修"
            }], "Name": "201L-300L", "Spec3": []
          }, {
            "Measures": [{"Name": "更换变频主板", "Price": 898.0, "ServiceLevel": "大修"}, {
              "Name": "更换电磁阀",
              "Price": 826.0,
              "ServiceLevel": "大修"
            }, {"Name": "更换冷凝器", "Price": 598.0, "ServiceLevel": "大修"}, {
              "Name": "更换压缩机",
              "Price": 1138.0,
              "ServiceLevel": "大修"
            }, {"Name": "内漏维修", "Price": 1018.0, "ServiceLevel": "大修"}, {
              "Name": "简单维修（更换辅件、调试）",
              "Price": 145.0,
              "ServiceLevel": "小修"
            }, {"Name": "加氟", "Price": 288.0, "ServiceLevel": "中修"}, {
              "Name": "维修一口价",
              "Price": 478.0,
              "ServiceLevel": "中修"
            }], "Name": "301L-400L", "Spec3": []
          }, {
            "Measures": [{"Name": "更换变频主板", "Price": 1140.0, "ServiceLevel": "大修"}, {
              "Name": "更换电磁阀",
              "Price": 948.0,
              "ServiceLevel": "大修"
            }, {"Name": "更换冷凝器", "Price": 718.0, "ServiceLevel": "大修"}, {
              "Name": "更换压缩机",
              "Price": 1416.0,
              "ServiceLevel": "大修"
            }, {"Name": "内漏维修", "Price": 1020.0, "ServiceLevel": "大修"}, {
              "Name": "简单维修（更换辅件、调试）",
              "Price": 145.0,
              "ServiceLevel": "小修"
            }, {"Name": "加氟", "Price": 315.0, "ServiceLevel": "中修"}, {
              "Name": "维修一口价",
              "Price": 598.0,
              "ServiceLevel": "中修"
            }], "Name": "401L-500L", "Spec3": []
          }, {
            "Measures": [{"Name": "更换变频主板", "Price": 1140.0, "ServiceLevel": "大修"}, {
              "Name": "更换电磁阀",
              "Price": 1068.0,
              "ServiceLevel": "大修"
            }, {"Name": "更换冷凝器", "Price": 958.0, "ServiceLevel": "大修"}, {
              "Name": "更换压缩机",
              "Price": 1620.0,
              "ServiceLevel": "大修"
            }, {"Name": "内漏维修", "Price": 1020.0, "ServiceLevel": "大修"}, {
              "Name": "简单维修（更换辅件、调试）",
              "Price": 145.0,
              "ServiceLevel": "小修"
            }, {"Name": "加氟", "Price": 385.0, "ServiceLevel": "中修"}, {
              "Name": "维修一口价",
              "Price": 718.0,
              "ServiceLevel": "中修"
            }], "Name": "501L-650L", "Spec3": []
          }]
        }, {
          "Measures": null,
          "Name": "进口/合资品牌",
          "Spec2": [{
            "Measures": [{"Name": "更换变频主板", "Price": 865.0, "ServiceLevel": "大修"}, {
              "Name": "更换电磁阀",
              "Price": 718.0,
              "ServiceLevel": "大修"
            }, {"Name": "更换冷凝器", "Price": 718.0, "ServiceLevel": "大修"}, {
              "Name": "更换压缩机",
              "Price": 990.0,
              "ServiceLevel": "大修"
            }, {"Name": "内漏维修", "Price": 576.0, "ServiceLevel": "大修"}, {
              "Name": "简单维修（更换辅件、调试）",
              "Price": 145.0,
              "ServiceLevel": "小修"
            }, {"Name": "加氟", "Price": 195.0, "ServiceLevel": "中修"}, {
              "Name": "维修一口价",
              "Price": 238.0,
              "ServiceLevel": "中修"
            }], "Name": "≤200L", "Spec3": []
          }, {
            "Measures": [{"Name": "更换变频主板", "Price": 1245.0, "ServiceLevel": "大修"}, {
              "Name": "更换电磁阀",
              "Price": 865.0,
              "ServiceLevel": "大修"
            }, {"Name": "更换冷凝器", "Price": 756.0, "ServiceLevel": "大修"}, {
              "Name": "更换压缩机",
              "Price": 1245.0,
              "ServiceLevel": "大修"
            }, {"Name": "内漏维修", "Price": 936.0, "ServiceLevel": "大修"}, {
              "Name": "简单维修（更换辅件、调试）",
              "Price": 145.0,
              "ServiceLevel": "小修"
            }, {"Name": "加氟", "Price": 195.0, "ServiceLevel": "中修"}, {
              "Name": "维修一口价",
              "Price": 298.0,
              "ServiceLevel": "中修"
            }], "Name": "201L-300L", "Spec3": []
          }, {
            "Measures": [{"Name": "更换变频主板", "Price": 1350.0, "ServiceLevel": "大修"}, {
              "Name": "更换电磁阀",
              "Price": 1245.0,
              "ServiceLevel": "大修"
            }, {"Name": "更换冷凝器", "Price": 898.0, "ServiceLevel": "大修"}, {
              "Name": "更换压缩机",
              "Price": 1710.0,
              "ServiceLevel": "大修"
            }, {"Name": "内漏维修", "Price": 1018.0, "ServiceLevel": "大修"}, {
              "Name": "简单维修（更换辅件、调试）",
              "Price": 145.0,
              "ServiceLevel": "小修"
            }, {"Name": "加氟", "Price": 288.0, "ServiceLevel": "中修"}, {
              "Name": "维修一口价",
              "Price": 478.0,
              "ServiceLevel": "中修"
            }], "Name": "301L-400L", "Spec3": []
          }, {
            "Measures": [{"Name": "更换变频主板", "Price": 1710.0, "ServiceLevel": "大修"}, {
              "Name": "更换电磁阀",
              "Price": 1425.0,
              "ServiceLevel": "大修"
            }, {"Name": "更换冷凝器", "Price": 1078.0, "ServiceLevel": "大修"}, {
              "Name": "更换压缩机",
              "Price": 2125.0,
              "ServiceLevel": "大修"
            }, {"Name": "内漏维修", "Price": 1020.0, "ServiceLevel": "大修"}, {
              "Name": "简单维修（更换辅件、调试）",
              "Price": 145.0,
              "ServiceLevel": "小修"
            }, {"Name": "加氟", "Price": 315.0, "ServiceLevel": "中修"}, {
              "Name": "维修一口价",
              "Price": 598.0,
              "ServiceLevel": "中修"
            }], "Name": "401L-500L", "Spec3": []
          }, {
            "Measures": [{"Name": "更换变频主板", "Price": 1710.0, "ServiceLevel": "大修"}, {
              "Name": "更换电磁阀",
              "Price": 1605.0,
              "ServiceLevel": "大修"
            }, {"Name": "更换冷凝器", "Price": 1438.0, "ServiceLevel": "大修"}, {
              "Name": "更换压缩机",
              "Price": 2430.0,
              "ServiceLevel": "大修"
            }, {"Name": "内漏维修", "Price": 1020.0, "ServiceLevel": "大修"}, {
              "Name": "简单维修（更换辅件、调试）",
              "Price": 145.0,
              "ServiceLevel": "小修"
            }, {"Name": "加氟", "Price": 385.0, "ServiceLevel": "中修"}, {
              "Name": "维修一口价",
              "Price": 718.0,
              "ServiceLevel": "中修"
            }], "Name": "501L-650L", "Spec3": []
          }]
        }]
      }, {
        "Measures": [{"Name": "漏保线", "Price": 150.0, "ServiceLevel": "材料费"}, {
          "Name": "遥控板",
          "Price": 120.0,
          "ServiceLevel": "材料费"
        }, {"Name": "网络机顶盒", "Price": 320.0, "ServiceLevel": "材料费"}, {
          "Name": "HDM高清线",
          "Price": 120.0,
          "ServiceLevel": "材料费"
        }, {"Name": "AV线", "Price": 70.0, "ServiceLevel": "材料费"}, {
          "Name": "晚间加急费",
          "Price": 30.0,
          "ServiceLevel": "其他服务项"
        }, {"Name": "上门费", "Price": 30.0, "ServiceLevel": "上门"}], "Name": "电视", "Spec1": [{
          "Measures": null,
          "Name": "国产",
          "Spec2": [{
            "Measures": [{"Name": "更换背光板", "Price": 430.0, "ServiceLevel": "大修"}, {
              "Name": "更换电源板",
              "Price": 445.0,
              "ServiceLevel": "大修"
            }, {"Name": "更换主板", "Price": 478.0, "ServiceLevel": "大修"}, {
              "Name": "简单维修（更换辅件、调试）",
              "Price": 120.0,
              "ServiceLevel": "小修"
            }, {"Name": "维修一口价", "Price": 238.0, "ServiceLevel": "中修"}], "Name": "≤32吋", "Spec3": []
          }, {
            "Measures": [{"Name": "更换背光板", "Price": 510.0, "ServiceLevel": "大修"}, {
              "Name": "更换电源板",
              "Price": 510.0,
              "ServiceLevel": "大修"
            }, {"Name": "更换主板", "Price": 510.0, "ServiceLevel": "大修"}, {
              "Name": "简单维修（更换辅件、调试）",
              "Price": 120.0,
              "ServiceLevel": "小修"
            }, {"Name": "维修一口价", "Price": 445.0, "ServiceLevel": "中修"}], "Name": "33-41吋", "Spec3": []
          }, {
            "Measures": [{"Name": "更换背光板", "Price": 675.0, "ServiceLevel": "大修"}, {
              "Name": "更换电源板",
              "Price": 675.0,
              "ServiceLevel": "大修"
            }, {"Name": "更换主板", "Price": 675.0, "ServiceLevel": "大修"}, {
              "Name": "简单维修（更换辅件、调试）",
              "Price": 120.0,
              "ServiceLevel": "小修"
            }, {"Name": "维修一口价", "Price": 478.0, "ServiceLevel": "中修"}], "Name": "42-54吋", "Spec3": []
          }, {
            "Measures": [{"Name": "更换背光板", "Price": 946.0, "ServiceLevel": "大修"}, {
              "Name": "更换电源板",
              "Price": 936.0,
              "ServiceLevel": "大修"
            }, {"Name": "更换主板", "Price": 958.0, "ServiceLevel": "大修"}, {
              "Name": "简单维修（更换辅件、调试）",
              "Price": 120.0,
              "ServiceLevel": "小修"
            }, {"Name": "维修一口价", "Price": 635.0, "ServiceLevel": "中修"}], "Name": "55-65吋", "Spec3": []
          }]
        }, {
          "Measures": null,
          "Name": "进口/合资品牌",
          "Spec2": [{
            "Measures": [{"Name": "更换背光板", "Price": 646.0, "ServiceLevel": "大修"}, {
              "Name": "更换电源板",
              "Price": 660.0,
              "ServiceLevel": "大修"
            }, {"Name": "更换主板", "Price": 718.0, "ServiceLevel": "大修"}, {
              "Name": "简单维修（更换辅件、调试）",
              "Price": 120.0,
              "ServiceLevel": "小修"
            }, {"Name": "维修一口价", "Price": 238.0, "ServiceLevel": "中修"}], "Name": "≤32吋", "Spec3": []
          }, {
            "Measures": [{"Name": "更换背光板", "Price": 766.0, "ServiceLevel": "大修"}, {
              "Name": "更换电源板",
              "Price": 766.0,
              "ServiceLevel": "大修"
            }, {"Name": "更换主板", "Price": 766.0, "ServiceLevel": "大修"}, {
              "Name": "简单维修（更换辅件、调试）",
              "Price": 120.0,
              "ServiceLevel": "小修"
            }, {"Name": "维修一口价", "Price": 445.0, "ServiceLevel": "中修"}], "Name": "33-41吋", "Spec3": []
          }, {
            "Measures": [{"Name": "更换背光板", "Price": 1008.0, "ServiceLevel": "大修"}, {
              "Name": "更换电源板",
              "Price": 1008.0,
              "ServiceLevel": "大修"
            }, {"Name": "更换主板", "Price": 1008.0, "ServiceLevel": "大修"}, {
              "Name": "简单维修（更换辅件、调试）",
              "Price": 120.0,
              "ServiceLevel": "小修"
            }, {"Name": "维修一口价", "Price": 478.0, "ServiceLevel": "中修"}], "Name": "42-54吋", "Spec3": []
          }, {
            "Measures": [{"Name": "更换背光板", "Price": 1425.0, "ServiceLevel": "大修"}, {
              "Name": "更换电源板",
              "Price": 1405.0,
              "ServiceLevel": "大修"
            }, {"Name": "更换主板", "Price": 1425.0, "ServiceLevel": "大修"}, {
              "Name": "简单维修（更换辅件、调试）",
              "Price": 120.0,
              "ServiceLevel": "小修"
            }, {"Name": "维修一口价", "Price": 635.0, "ServiceLevel": "中修"}], "Name": "55-65吋", "Spec3": []
          }]
        }]
      }, {
        "Measures": [{"Name": "空调专用插座、空气开关", "Price": 150.0, "ServiceLevel": "材料费"}, {
          "Name": "漏保线",
          "Price": 150.0,
          "ServiceLevel": "材料费"
        }, {"Name": "外机罩", "Price": 180.0, "ServiceLevel": "材料费"}, {
          "Name": "外接水盘",
          "Price": 180.0,
          "ServiceLevel": "材料费"
        }, {"Name": "遥控板", "Price": 100.0, "ServiceLevel": "材料费"}, {
          "Name": "高空费（出外墙操作）",
          "Price": 100.0,
          "ServiceLevel": "材料费"
        }, {"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }], "Name": "空调", "Spec1": [{
          "Measures": null, "Name": "国产", "Spec2": [{
            "Measures": null,
            "Name": "挂机",
            "Spec3": [{
              "Measures": [{"Name": "更换控制面板", "Price": 936.0, "ServiceLevel": "大修"}, {
                "Name": "更换四通阀",
                "Price": 826.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换压缩机", "Price": 1198.0, "ServiceLevel": "大修"}, {
                "Name": "内漏维修",
                "Price": 636.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修（更换辅件、调试）", "Price": 145.0, "ServiceLevel": "小修"}, {
                "Name": "加氟",
                "Price": 238.0,
                "ServiceLevel": "中修"
              }, {"Name": "维修一口价", "Price": 346.0, "ServiceLevel": "中修"}], "Name": "变频\\1-1.5P"
            }, {
              "Measures": [{"Name": "更换控制面板", "Price": 1536.0, "ServiceLevel": "大修"}, {
                "Name": "更换四通阀",
                "Price": 826.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换压缩机", "Price": 2376.0, "ServiceLevel": "大修"}, {
                "Name": "内漏维修",
                "Price": 756.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修（更换辅件、调试）", "Price": 145.0, "ServiceLevel": "小修"}, {
                "Name": "加氟",
                "Price": 358.0,
                "ServiceLevel": "中修"
              }, {"Name": "维修一口价", "Price": 586.0, "ServiceLevel": "中修"}], "Name": "变频\\2-3P"
            }, {
              "Measures": [{"Name": "更换四通阀", "Price": 635.0, "ServiceLevel": "大修"}, {
                "Name": "更换压缩机",
                "Price": 1068.0,
                "ServiceLevel": "大修"
              }, {"Name": "内漏维修", "Price": 576.0, "ServiceLevel": "大修"}, {
                "Name": "简单维修（更换辅件、调试）",
                "Price": 145.0,
                "ServiceLevel": "小修"
              }, {"Name": "加氟", "Price": 180.0, "ServiceLevel": "中修"}, {
                "Name": "维修一口价",
                "Price": 298.0,
                "ServiceLevel": "中修"
              }], "Name": "定频\\1-1.5P"
            }, {
              "Measures": [{"Name": "更换四通阀", "Price": 826.0, "ServiceLevel": "大修"}, {
                "Name": "更换压缩机",
                "Price": 1856.0,
                "ServiceLevel": "大修"
              }, {"Name": "内漏维修", "Price": 696.0, "ServiceLevel": "大修"}, {
                "Name": "简单维修（更换辅件、调试）",
                "Price": 145.0,
                "ServiceLevel": "小修"
              }, {"Name": "加氟", "Price": 238.0, "ServiceLevel": "中修"}, {
                "Name": "维修一口价",
                "Price": 358.0,
                "ServiceLevel": "中修"
              }], "Name": "定频\\2-3P"
            }]
          }, {
            "Measures": null,
            "Name": "柜机",
            "Spec3": [{
              "Measures": [{"Name": "更换控制面板", "Price": 1536.0, "ServiceLevel": "大修"}, {
                "Name": "更换四通阀",
                "Price": 826.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换压缩机", "Price": 2376.0, "ServiceLevel": "大修"}, {
                "Name": "内漏维修",
                "Price": 756.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修（更换辅件、调试）", "Price": 145.0, "ServiceLevel": "小修"}, {
                "Name": "加氟",
                "Price": 358.0,
                "ServiceLevel": "中修"
              }, {"Name": "维修一口价", "Price": 586.0, "ServiceLevel": "中修"}], "Name": "变频\\2-3P"
            }, {
              "Measures": [{"Name": "更换控制面板", "Price": 1896.0, "ServiceLevel": "大修"}, {
                "Name": "更换四通阀",
                "Price": 1045.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换压缩机", "Price": 3096.0, "ServiceLevel": "大修"}, {
                "Name": "内漏维修",
                "Price": 996.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修（更换辅件、调试）", "Price": 145.0, "ServiceLevel": "小修"}, {
                "Name": "加氟",
                "Price": 435.0,
                "ServiceLevel": "中修"
              }, {"Name": "维修一口价", "Price": 826.0, "ServiceLevel": "中修"}], "Name": "变频\\4P"
            }, {
              "Measures": [{"Name": "更换控制面板", "Price": 1896.0, "ServiceLevel": "大修"}, {
                "Name": "更换四通阀",
                "Price": 1045.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换压缩机", "Price": 3096.0, "ServiceLevel": "大修"}, {
                "Name": "内漏维修",
                "Price": 996.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修（更换辅件、调试）", "Price": 145.0, "ServiceLevel": "小修"}, {
                "Name": "加氟",
                "Price": 576.0,
                "ServiceLevel": "中修"
              }, {"Name": "维修一口价", "Price": 1140.0, "ServiceLevel": "中修"}], "Name": "变频\\5P"
            }, {
              "Measures": [{"Name": "更换四通阀", "Price": 826.0, "ServiceLevel": "大修"}, {
                "Name": "更换压缩机",
                "Price": 1655.0,
                "ServiceLevel": "大修"
              }, {"Name": "内漏维修", "Price": 696.0, "ServiceLevel": "大修"}, {
                "Name": "简单维修（更换辅件、调试）",
                "Price": 145.0,
                "ServiceLevel": "小修"
              }, {"Name": "加氟", "Price": 238.0, "ServiceLevel": "中修"}, {
                "Name": "维修一口价",
                "Price": 358.0,
                "ServiceLevel": "中修"
              }], "Name": "定频\\2-3P"
            }, {
              "Measures": [{"Name": "更换四通阀", "Price": 1045.0, "ServiceLevel": "大修"}, {
                "Name": "更换压缩机",
                "Price": 2016.0,
                "ServiceLevel": "大修"
              }, {"Name": "内漏维修", "Price": 936.0, "ServiceLevel": "大修"}, {
                "Name": "简单维修（更换辅件、调试）",
                "Price": 145.0,
                "ServiceLevel": "小修"
              }, {"Name": "加氟", "Price": 315.0, "ServiceLevel": "中修"}, {
                "Name": "维修一口价",
                "Price": 478.0,
                "ServiceLevel": "中修"
              }], "Name": "定频\\4P"
            }, {
              "Measures": [{"Name": "更换四通阀", "Price": 1045.0, "ServiceLevel": "大修"}, {
                "Name": "更换压缩机",
                "Price": 2016.0,
                "ServiceLevel": "大修"
              }, {"Name": "内漏维修", "Price": 936.0, "ServiceLevel": "大修"}, {
                "Name": "简单维修（更换辅件、调试）",
                "Price": 145.0,
                "ServiceLevel": "小修"
              }, {"Name": "加氟", "Price": 385.0, "ServiceLevel": "中修"}, {
                "Name": "维修一口价",
                "Price": 576.0,
                "ServiceLevel": "中修"
              }], "Name": "定频\\5P"
            }]
          }]
        }, {
          "Measures": null, "Name": "进口/合资品牌", "Spec2": [{
            "Measures": null,
            "Name": "挂机",
            "Spec3": [{
              "Measures": [{"Name": "更换控制面板", "Price": 936.0, "ServiceLevel": "大修"}, {
                "Name": "更换四通阀",
                "Price": 826.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换压缩机", "Price": 1198.0, "ServiceLevel": "大修"}, {
                "Name": "内漏维修",
                "Price": 636.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修（更换辅件、调试）", "Price": 145.0, "ServiceLevel": "小修"}, {
                "Name": "加氟",
                "Price": 238.0,
                "ServiceLevel": "中修"
              }, {"Name": "维修一口价", "Price": 346.0, "ServiceLevel": "中修"}], "Name": "变频\\1-1.5P"
            }, {
              "Measures": [{"Name": "更换控制面板", "Price": 1536.0, "ServiceLevel": "大修"}, {
                "Name": "更换四通阀",
                "Price": 826.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换压缩机", "Price": 2376.0, "ServiceLevel": "大修"}, {
                "Name": "内漏维修",
                "Price": 756.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修（更换辅件、调试）", "Price": 145.0, "ServiceLevel": "小修"}, {
                "Name": "加氟",
                "Price": 358.0,
                "ServiceLevel": "中修"
              }, {"Name": "维修一口价", "Price": 586.0, "ServiceLevel": "中修"}], "Name": "变频\\2-3P"
            }, {
              "Measures": [{"Name": "更换四通阀", "Price": 635.0, "ServiceLevel": "大修"}, {
                "Name": "更换压缩机",
                "Price": 1068.0,
                "ServiceLevel": "大修"
              }, {"Name": "内漏维修", "Price": 576.0, "ServiceLevel": "大修"}, {
                "Name": "简单维修（更换辅件、调试）",
                "Price": 145.0,
                "ServiceLevel": "小修"
              }, {"Name": "加氟", "Price": 180.0, "ServiceLevel": "中修"}, {
                "Name": "维修一口价",
                "Price": 298.0,
                "ServiceLevel": "中修"
              }], "Name": "定频\\1-1.5P"
            }, {
              "Measures": [{"Name": "更换四通阀", "Price": 826.0, "ServiceLevel": "大修"}, {
                "Name": "更换压缩机",
                "Price": 1856.0,
                "ServiceLevel": "大修"
              }, {"Name": "内漏维修", "Price": 696.0, "ServiceLevel": "大修"}, {
                "Name": "简单维修（更换辅件、调试）",
                "Price": 145.0,
                "ServiceLevel": "小修"
              }, {"Name": "加氟", "Price": 238.0, "ServiceLevel": "中修"}, {
                "Name": "维修一口价",
                "Price": 358.0,
                "ServiceLevel": "中修"
              }], "Name": "定频\\2-3P"
            }]
          }, {
            "Measures": null,
            "Name": "柜机",
            "Spec3": [{
              "Measures": [{"Name": "更换控制面板", "Price": 1536.0, "ServiceLevel": "大修"}, {
                "Name": "更换四通阀",
                "Price": 826.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换压缩机", "Price": 2376.0, "ServiceLevel": "大修"}, {
                "Name": "内漏维修",
                "Price": 756.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修（更换辅件、调试）", "Price": 145.0, "ServiceLevel": "小修"}, {
                "Name": "加氟",
                "Price": 358.0,
                "ServiceLevel": "中修"
              }, {"Name": "维修一口价", "Price": 586.0, "ServiceLevel": "中修"}], "Name": "变频\\2-3P"
            }, {
              "Measures": [{"Name": "更换控制面板", "Price": 1896.0, "ServiceLevel": "大修"}, {
                "Name": "更换四通阀",
                "Price": 1045.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换压缩机", "Price": 3096.0, "ServiceLevel": "大修"}, {
                "Name": "内漏维修",
                "Price": 996.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修（更换辅件、调试）", "Price": 145.0, "ServiceLevel": "小修"}, {
                "Name": "加氟",
                "Price": 435.0,
                "ServiceLevel": "中修"
              }, {"Name": "维修一口价", "Price": 826.0, "ServiceLevel": "中修"}], "Name": "变频\\4P"
            }, {
              "Measures": [{"Name": "更换控制面板", "Price": 1896.0, "ServiceLevel": "大修"}, {
                "Name": "更换四通阀",
                "Price": 1045.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换压缩机", "Price": 3096.0, "ServiceLevel": "大修"}, {
                "Name": "内漏维修",
                "Price": 996.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修（更换辅件、调试）", "Price": 145.0, "ServiceLevel": "小修"}, {
                "Name": "加氟",
                "Price": 576.0,
                "ServiceLevel": "中修"
              }, {"Name": "维修一口价", "Price": 1140.0, "ServiceLevel": "中修"}], "Name": "变频\\5P"
            }, {
              "Measures": [{"Name": "更换四通阀", "Price": 826.0, "ServiceLevel": "大修"}, {
                "Name": "更换压缩机",
                "Price": 1655.0,
                "ServiceLevel": "大修"
              }, {"Name": "内漏维修", "Price": 696.0, "ServiceLevel": "大修"}, {
                "Name": "简单维修（更换辅件、调试）",
                "Price": 145.0,
                "ServiceLevel": "小修"
              }, {"Name": "加氟", "Price": 238.0, "ServiceLevel": "中修"}, {
                "Name": "维修一口价",
                "Price": 358.0,
                "ServiceLevel": "中修"
              }], "Name": "定频\\2-3P"
            }, {
              "Measures": [{"Name": "更换四通阀", "Price": 1045.0, "ServiceLevel": "大修"}, {
                "Name": "更换压缩机",
                "Price": 2016.0,
                "ServiceLevel": "大修"
              }, {"Name": "内漏维修", "Price": 936.0, "ServiceLevel": "大修"}, {
                "Name": "简单维修（更换辅件、调试）",
                "Price": 145.0,
                "ServiceLevel": "小修"
              }, {"Name": "加氟", "Price": 315.0, "ServiceLevel": "中修"}, {
                "Name": "维修一口价",
                "Price": 478.0,
                "ServiceLevel": "中修"
              }], "Name": "定频\\4P"
            }, {
              "Measures": [{"Name": "更换四通阀", "Price": 1045.0, "ServiceLevel": "大修"}, {
                "Name": "更换压缩机",
                "Price": 2016.0,
                "ServiceLevel": "大修"
              }, {"Name": "内漏维修", "Price": 936.0, "ServiceLevel": "大修"}, {
                "Name": "简单维修（更换辅件、调试）",
                "Price": 145.0,
                "ServiceLevel": "小修"
              }, {"Name": "加氟", "Price": 385.0, "ServiceLevel": "中修"}, {
                "Name": "维修一口价",
                "Price": 576.0,
                "ServiceLevel": "中修"
              }], "Name": "定频\\5P"
            }]
          }]
        }]
      }, {
        "Measures": [{"Name": "燃气报警器（可自动断气）", "Price": 148.0, "ServiceLevel": "材料费"}, {
          "Name": "燃气报警器",
          "Price": 48.0,
          "ServiceLevel": "材料费"
        }, {"Name": "防爆燃气管", "Price": 100.0, "ServiceLevel": "材料费"}, {
          "Name": "燃气管",
          "Price": 60.0,
          "ServiceLevel": "材料费"
        }, {"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }],
        "Name": "燃气灶",
        "Spec1": [{
          "Measures": null,
          "Name": "国产",
          "Spec2": [{
            "Measures": [{"Name": "更换炉头", "Price": 345.0, "ServiceLevel": "大修"}, {
              "Name": "更换脉冲点火器",
              "Price": 310.0,
              "ServiceLevel": "大修"
            }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
              "Name": "维修一口价",
              "Price": 265.0,
              "ServiceLevel": "中修"
            }], "Name": "集成灶", "Spec3": []
          }, {
            "Measures": [{"Name": "更换炉头", "Price": 265.0, "ServiceLevel": "大修"}, {
              "Name": "更换脉冲点火器",
              "Price": 238.0,
              "ServiceLevel": "大修"
            }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
              "Name": "维修一口价",
              "Price": 205.0,
              "ServiceLevel": "中修"
            }], "Name": "普通", "Spec3": []
          }]
        }, {
          "Measures": null,
          "Name": "进口/合资品牌",
          "Spec2": [{
            "Measures": [{"Name": "更换炉头", "Price": 516.0, "ServiceLevel": "大修"}, {
              "Name": "更换脉冲点火器",
              "Price": 466.0,
              "ServiceLevel": "大修"
            }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
              "Name": "维修一口价",
              "Price": 265.0,
              "ServiceLevel": "中修"
            }], "Name": "集成灶", "Spec3": []
          }, {
            "Measures": [{"Name": "更换炉头", "Price": 396.0, "ServiceLevel": "大修"}, {
              "Name": "更换脉冲点火器",
              "Price": 358.0,
              "ServiceLevel": "大修"
            }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
              "Name": "维修一口价",
              "Price": 205.0,
              "ServiceLevel": "中修"
            }], "Name": "普通", "Spec3": []
          }]
        }]
      }, {
        "Measures": [{"Name": "安全阀", "Price": 40.0, "ServiceLevel": "材料费"}, {
          "Name": "波纹软管30-40cm",
          "Price": 30.0,
          "ServiceLevel": "材料费"
        }, {"Name": "波纹软管50-80cm", "Price": 40.0, "ServiceLevel": "材料费"}, {
          "Name": "打孔（水泥）",
          "Price": 150.0,
          "ServiceLevel": "材料费"
        }, {"Name": "打孔（砖）", "Price": 120.0, "ServiceLevel": "材料费"}, {
          "Name": "吊架",
          "Price": 120.0,
          "ServiceLevel": "材料费"
        }, {"Name": "防电墙", "Price": 110.0, "ServiceLevel": "材料费"}, {
          "Name": "高空费（出外墙操作）",
          "Price": 100.0,
          "ServiceLevel": "材料费"
        }, {"Name": "花洒", "Price": 60.0, "ServiceLevel": "材料费"}, {
          "Name": "花洒",
          "Price": 60.0,
          "ServiceLevel": "材料费"
        }, {"Name": "混水阀", "Price": 180.0, "ServiceLevel": "材料费"}, {
          "Name": "漏保线",
          "Price": 150.0,
          "ServiceLevel": "材料费"
        }, {"Name": "清洗剂", "Price": 60.0, "ServiceLevel": "材料费"}, {
          "Name": "燃气管",
          "Price": 60.0,
          "ServiceLevel": "材料费"
        }, {"Name": "三角阀", "Price": 70.0, "ServiceLevel": "材料费"}, {
          "Name": "上水管",
          "Price": 30.0,
          "ServiceLevel": "材料费"
        }, {"Name": "真空管", "Price": 120.0, "ServiceLevel": "材料费"}, {
          "Name": "晚间加急费",
          "Price": 30.0,
          "ServiceLevel": "其他服务项"
        }, {"Name": "上门费", "Price": 30.0, "ServiceLevel": "上门"}], "Name": "热水器", "Spec1": [{
          "Measures": null, "Name": "国产", "Spec2": [{
            "Measures": null,
            "Name": "电热",
            "Spec3": [{
              "Measures": [{"Name": "更换加热管", "Price": 335.0, "ServiceLevel": "大修"}, {
                "Name": "更换控制板",
                "Price": 335.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 238.0,
                "ServiceLevel": "中修"
              }], "Name": "≤60L"
            }, {
              "Measures": [{"Name": "更换加热管", "Price": 565.0, "ServiceLevel": "大修"}, {
                "Name": "更换控制板",
                "Price": 565.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 346.0,
                "ServiceLevel": "中修"
              }], "Name": "101-200L"
            }, {
              "Measures": [{"Name": "更换加热管", "Price": 738.0, "ServiceLevel": "大修"}, {
                "Name": "更换控制板",
                "Price": 738.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 385.0,
                "ServiceLevel": "中修"
              }], "Name": "201-300L"
            }, {
              "Measures": [{"Name": "更换加热管", "Price": 955.0, "ServiceLevel": "大修"}, {
                "Name": "更换控制板",
                "Price": 955.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 576.0,
                "ServiceLevel": "中修"
              }], "Name": "301-500L"
            }, {
              "Measures": [{"Name": "更换加热管", "Price": 438.0, "ServiceLevel": "大修"}, {
                "Name": "更换控制板",
                "Price": 438.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 265.0,
                "ServiceLevel": "中修"
              }], "Name": "61-100L"
            }]
          }, {
            "Measures": null,
            "Name": "空气能",
            "Spec3": [{
              "Measures": [{"Name": "更换压缩机", "Price": 1068.0, "ServiceLevel": "大修"}, {
                "Name": "更换控制板",
                "Price": 540.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换四通阀", "Price": 505.0, "ServiceLevel": "大修"}, {
                "Name": "简单维修(更换辅件、调试)",
                "Price": 145.0,
                "ServiceLevel": "小修"
              }, {"Name": "维修一口价", "Price": 346.0, "ServiceLevel": "中修"}], "Name": "1-1.5P"
            }, {
              "Measures": [{"Name": "更换控制板", "Price": 145.0, "ServiceLevel": "大修"}, {
                "Name": "更换压缩机",
                "Price": 1605.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换四通阀", "Price": 586.0, "ServiceLevel": "大修"}, {
                "Name": "简单维修(更换辅件、调试)",
                "Price": 145.0,
                "ServiceLevel": "小修"
              }, {"Name": "维修一口价", "Price": 395.0, "ServiceLevel": "中修"}], "Name": "2-3P"
            }]
          }, {
            "Measures": null,
            "Name": "燃气",
            "Spec3": [{
              "Measures": [{"Name": "更换比例阀", "Price": 456.0, "ServiceLevel": "大修"}, {
                "Name": "更换控制板",
                "Price": 456.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换水箱", "Price": 540.0, "ServiceLevel": "大修"}, {
                "Name": "简单维修(更换辅件、调试)",
                "Price": 120.0,
                "ServiceLevel": "小修"
              }, {"Name": "维修一口价", "Price": 276.0, "ServiceLevel": "中修"}], "Name": "≤8L"
            }, {
              "Measures": [{"Name": "更换比例阀", "Price": 576.0, "ServiceLevel": "大修"}, {
                "Name": "更换控制板",
                "Price": 660.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换水箱", "Price": 918.0, "ServiceLevel": "大修"}, {
                "Name": "简单维修(更换辅件、调试)",
                "Price": 120.0,
                "ServiceLevel": "小修"
              }, {"Name": "维修一口价", "Price": 385.0, "ServiceLevel": "中修"}], "Name": "12.1-16L"
            }, {
              "Measures": [{"Name": "更换比例阀", "Price": 636.0, "ServiceLevel": "大修"}, {
                "Name": "更换控制板",
                "Price": 720.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换水箱", "Price": 1195.0, "ServiceLevel": "大修"}, {
                "Name": "简单维修(更换辅件、调试)",
                "Price": 120.0,
                "ServiceLevel": "小修"
              }, {"Name": "维修一口价", "Price": 456.0, "ServiceLevel": "中修"}], "Name": "16.1-20L"
            }, {
              "Measures": [{"Name": "更换比例阀", "Price": 516.0, "ServiceLevel": "大修"}, {
                "Name": "更换控制板",
                "Price": 600.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换水箱", "Price": 705.0, "ServiceLevel": "大修"}, {
                "Name": "简单维修(更换辅件、调试)",
                "Price": 120.0,
                "ServiceLevel": "小修"
              }, {"Name": "维修一口价", "Price": 336.0, "ServiceLevel": "中修"}], "Name": "8.1-12L"
            }]
          }, {
            "Measures": null,
            "Name": "太阳能",
            "Spec3": [{
              "Measures": [{"Name": "更换加热管", "Price": 335.0, "ServiceLevel": "大修"}, {
                "Name": "更换控制仪",
                "Price": 478.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 238.0,
                "ServiceLevel": "中修"
              }], "Name": "≤60L"
            }, {
              "Measures": [{"Name": "更换加热管", "Price": 565.0, "ServiceLevel": "大修"}, {
                "Name": "更换控制仪",
                "Price": 720.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 385.0,
                "ServiceLevel": "中修"
              }], "Name": "101-200L"
            }, {
              "Measures": [{"Name": "更换加热管", "Price": 648.0, "ServiceLevel": "大修"}, {
                "Name": "更换控制仪",
                "Price": 840.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 435.0,
                "ServiceLevel": "中修"
              }], "Name": "201-300L"
            }, {
              "Measures": [{"Name": "更换加热管", "Price": 445.0, "ServiceLevel": "大修"}, {
                "Name": "更换控制仪",
                "Price": 565.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 315.0,
                "ServiceLevel": "中修"
              }], "Name": "61-100L"
            }]
          }, {
            "Measures": null,
            "Name": "即热式电热",
            "Spec3": [{
              "Measures": [{"Name": "维修一口价", "Price": 226.0, "ServiceLevel": "中修"}],
              "Name": "≤4000瓦"
            }, {
              "Measures": [{"Name": "维修一口价", "Price": 315.0, "ServiceLevel": "中修"}],
              "Name": "4001-6000瓦"
            }, {"Measures": [{"Name": "维修一口价", "Price": 420.0, "ServiceLevel": "中修"}], "Name": "6001-8000瓦"}]
          }]
        }, {
          "Measures": null, "Name": "进口/合资品牌", "Spec2": [{
            "Measures": null,
            "Name": "电热",
            "Spec3": [{
              "Measures": [{"Name": "更换加热管", "Price": 505.0, "ServiceLevel": "大修"}, {
                "Name": "更换控制板",
                "Price": 505.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 238.0,
                "ServiceLevel": "中修"
              }], "Name": "≤60L"
            }, {
              "Measures": [{"Name": "更换加热管", "Price": 855.0, "ServiceLevel": "大修"}, {
                "Name": "更换控制板",
                "Price": 855.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 346.0,
                "ServiceLevel": "中修"
              }], "Name": "101-200L"
            }, {
              "Measures": [{"Name": "更换加热管", "Price": 1110.0, "ServiceLevel": "大修"}, {
                "Name": "更换控制板",
                "Price": 1110.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 385.0,
                "ServiceLevel": "中修"
              }], "Name": "201-300L"
            }, {
              "Measures": [{"Name": "更换加热管", "Price": 1446.0, "ServiceLevel": "大修"}, {
                "Name": "更换控制板",
                "Price": 1446.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 576.0,
                "ServiceLevel": "中修"
              }], "Name": "301-500L"
            }, {
              "Measures": [{"Name": "更换加热管", "Price": 655.0, "ServiceLevel": "大修"}, {
                "Name": "更换控制板",
                "Price": 655.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 265.0,
                "ServiceLevel": "中修"
              }], "Name": "61-100L"
            }]
          }, {
            "Measures": null,
            "Name": "空气能",
            "Spec3": [{
              "Measures": [{"Name": "更换控制板", "Price": 810.0, "ServiceLevel": "大修"}, {
                "Name": "更换四通阀",
                "Price": 755.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换压缩机", "Price": 1485.0, "ServiceLevel": "大修"}, {
                "Name": "简单维修(更换辅件、调试)",
                "Price": 145.0,
                "ServiceLevel": "小修"
              }, {"Name": "维修一口价", "Price": 346.0, "ServiceLevel": "中修"}], "Name": "1-1.5P"
            }, {
              "Measures": [{"Name": "更换控制板", "Price": 810.0, "ServiceLevel": "大修"}, {
                "Name": "更换四通阀",
                "Price": 885.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换压缩机", "Price": 1656.0, "ServiceLevel": "大修"}, {
                "Name": "简单维修(更换辅件、调试)",
                "Price": 145.0,
                "ServiceLevel": "小修"
              }, {"Name": "维修一口价", "Price": 395.0, "ServiceLevel": "中修"}], "Name": "2-3P"
            }]
          }, {
            "Measures": null,
            "Name": "燃气",
            "Spec3": [{
              "Measures": [{"Name": "更换控制板", "Price": 705.0, "ServiceLevel": "大修"}, {
                "Name": "更换水箱",
                "Price": 780.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 276.0,
                "ServiceLevel": "中修"
              }], "Name": "≤8L"
            }, {
              "Measures": [{"Name": "更换控制板", "Price": 900.0, "ServiceLevel": "大修"}, {
                "Name": "更换水箱",
                "Price": 1320.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 385.0,
                "ServiceLevel": "中修"
              }], "Name": "12.1-16L"
            }, {
              "Measures": [{"Name": "更换控制板", "Price": 960.0, "ServiceLevel": "大修"}, {
                "Name": "更换水箱",
                "Price": 1716.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 456.0,
                "ServiceLevel": "中修"
              }], "Name": "16.1-20L"
            }, {
              "Measures": [{"Name": "更换控制板", "Price": 840.0, "ServiceLevel": "大修"}, {
                "Name": "更换水箱",
                "Price": 1015.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 336.0,
                "ServiceLevel": "中修"
              }], "Name": "8.1-12L"
            }]
          }, {
            "Measures": null,
            "Name": "太阳能",
            "Spec3": [{
              "Measures": [{"Name": "更换加热管", "Price": 335.0, "ServiceLevel": "大修"}, {
                "Name": "更换控制仪",
                "Price": 478.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 238.0,
                "ServiceLevel": "中修"
              }], "Name": "≤60L"
            }, {
              "Measures": [{"Name": "更换加热管", "Price": 565.0, "ServiceLevel": "大修"}, {
                "Name": "更换控制仪",
                "Price": 720.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 385.0,
                "ServiceLevel": "中修"
              }], "Name": "101-200L"
            }, {
              "Measures": [{"Name": "更换加热管", "Price": 648.0, "ServiceLevel": "大修"}, {
                "Name": "更换控制仪",
                "Price": 840.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 435.0,
                "ServiceLevel": "中修"
              }], "Name": "201-300L"
            }, {
              "Measures": [{"Name": "更换加热管", "Price": 445.0, "ServiceLevel": "大修"}, {
                "Name": "更换控制仪",
                "Price": 565.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 315.0,
                "ServiceLevel": "中修"
              }], "Name": "61-100L"
            }]
          }, {
            "Measures": null,
            "Name": "即热式电热",
            "Spec3": [{
              "Measures": [{"Name": "维修一口价", "Price": 226.0, "ServiceLevel": "中修"}],
              "Name": "≤4000瓦"
            }, {
              "Measures": [{"Name": "维修一口价", "Price": 315.0, "ServiceLevel": "中修"}],
              "Name": "4001-6000瓦"
            }, {"Measures": [{"Name": "维修一口价", "Price": 420.0, "ServiceLevel": "中修"}], "Name": "6001-8000瓦"}]
          }]
        }]
      }, {
        "Measures": [{"Name": "地漏三通", "Price": 60.0, "ServiceLevel": "材料费"}, {
          "Name": "进水管",
          "Price": 88.0,
          "ServiceLevel": "材料费"
        }, {"Name": "漏保线", "Price": 150.0, "ServiceLevel": "材料费"}, {
          "Name": "排水管",
          "Price": 38.0,
          "ServiceLevel": "材料费"
        }, {"Name": "普通水龙头", "Price": 80.0, "ServiceLevel": "材料费"}, {
          "Name": "清洗剂",
          "Price": 50.0,
          "ServiceLevel": "材料费"
        }, {"Name": "专用插座", "Price": 80.0, "ServiceLevel": "材料费"}, {
          "Name": "专用水龙头",
          "Price": 168.0,
          "ServiceLevel": "材料费"
        }, {"Name": "座架", "Price": 180.0, "ServiceLevel": "材料费"}, {
          "Name": "晚间加急费",
          "Price": 30.0,
          "ServiceLevel": "其他服务项"
        }, {"Name": "上门费", "Price": 30.0, "ServiceLevel": "上门"}], "Name": "洗衣机", "Spec1": [{
          "Measures": null, "Name": "国产", "Spec2": [{
            "Measures": null,
            "Name": "波轮",
            "Spec3": [{
              "Measures": [{"Name": "更换电脑板", "Price": 540.0, "ServiceLevel": "大修"}, {
                "Name": "维修一口价",
                "Price": 166.0,
                "ServiceLevel": "中修"
              }], "Name": "半自动"
            }, {
              "Measures": [{"Name": "更换电脑板", "Price": 445.0, "ServiceLevel": "大修"}, {
                "Name": "更换离合器",
                "Price": 445.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换全自动电机", "Price": 468.0, "ServiceLevel": "大修"}, {
                "Name": "维修一口价",
                "Price": 315.0,
                "ServiceLevel": "中修"
              }], "Name": "迷你"
            }, {
              "Measures": [{"Name": "更换电脑板", "Price": 660.0, "ServiceLevel": "大修"}, {
                "Name": "更换离合器",
                "Price": 780.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换全自动电机", "Price": 456.0, "ServiceLevel": "大修"}, {
                "Name": "简单维修（更换辅件、调试）",
                "Price": 120.0,
                "ServiceLevel": "小修"
              }, {"Name": "维修一口价", "Price": 238.0, "ServiceLevel": "中修"}], "Name": "全自动5.1kg-10kg"
            }, {
              "Measures": [{"Name": "更换电脑板", "Price": 445.0, "ServiceLevel": "大修"}, {
                "Name": "更换离合器",
                "Price": 445.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换全自动电机", "Price": 315.0, "ServiceLevel": "大修"}, {
                "Name": "简单维修（更换辅件、调试）",
                "Price": 120.0,
                "ServiceLevel": "小修"
              }, {"Name": "维修一口价", "Price": 226.0, "ServiceLevel": "中修"}], "Name": "全自动5kg及以下"
            }, {
              "Measures": [{"Name": "简单维修（更换辅件、调试）", "Price": 120.0, "ServiceLevel": "小修"}],
              "Name": "壁挂"
            }, {
              "Measures": [{"Name": "简单维修（更换辅件、调试）", "Price": 120.0, "ServiceLevel": "小修"}],
              "Name": "烘干一体5.1kg-10kg及以下"
            }, {"Measures": [{"Name": "简单维修（更换辅件、调试）", "Price": 120.0, "ServiceLevel": "小修"}], "Name": "烘干一体5kg及以下"}]
          }, {
            "Measures": null,
            "Name": "滚筒",
            "Spec3": [{
              "Measures": [{"Name": "更换电脑板", "Price": 445.0, "ServiceLevel": "大修"}, {
                "Name": "更换离合器",
                "Price": 660.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换全自动电机", "Price": 315.0, "ServiceLevel": "大修"}, {
                "Name": "维修一口价",
                "Price": 226.0,
                "ServiceLevel": "中修"
              }], "Name": "壁挂"
            }, {
              "Measures": [{"Name": "更换电脑板", "Price": 816.0, "ServiceLevel": "大修"}, {
                "Name": "更换离合器",
                "Price": 540.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换全自动电机", "Price": 588.0, "ServiceLevel": "大修"}, {
                "Name": "维修一口价",
                "Price": 445.0,
                "ServiceLevel": "中修"
              }], "Name": "烘干一体5.1kg-10kg及以下"
            }, {
              "Measures": [{"Name": "更换电脑板", "Price": 445.0, "ServiceLevel": "大修"}, {
                "Name": "更换离合器",
                "Price": 445.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换全自动电机", "Price": 315.0, "ServiceLevel": "大修"}, {
                "Name": "维修一口价",
                "Price": 226.0,
                "ServiceLevel": "中修"
              }], "Name": "烘干一体5kg及以下"
            }, {
              "Measures": [{"Name": "更换变频电机", "Price": 675.0, "ServiceLevel": "大修"}, {
                "Name": "更换变频电脑板",
                "Price": 780.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换变频主板", "Price": 816.0, "ServiceLevel": "大修"}, {
                "Name": "更换电机",
                "Price": 540.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换电脑板", "Price": 625.0, "ServiceLevel": "大修"}, {
                "Name": "更换三脚架总成",
                "Price": 720.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修（更换辅件、调试）", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 346.0,
                "ServiceLevel": "中修"
              }], "Name": "全自动5.1kg-10kg"
            }, {
              "Measures": [{"Name": "更换变频电机", "Price": 588.0, "ServiceLevel": "大修"}, {
                "Name": "更换变频电脑板",
                "Price": 660.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换变频主板", "Price": 780.0, "ServiceLevel": "大修"}, {
                "Name": "更换电机",
                "Price": 358.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换电脑板", "Price": 540.0, "ServiceLevel": "大修"}, {
                "Name": "更换三脚架总成",
                "Price": 675.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修（更换辅件、调试）", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 325.0,
                "ServiceLevel": "中修"
              }], "Name": "全自动5kg及以下"
            }, {
              "Measures": [{"Name": "简单维修（更换辅件、调试）", "Price": 120.0, "ServiceLevel": "小修"}],
              "Name": "半自动"
            }, {"Measures": [{"Name": "简单维修（更换辅件、调试）", "Price": 120.0, "ServiceLevel": "小修"}], "Name": "迷你"}]
          }]
        }, {
          "Measures": null, "Name": "进口/合资品牌", "Spec2": [{
            "Measures": null,
            "Name": "波轮",
            "Spec3": [{
              "Measures": [{"Name": "更换电脑板", "Price": 660.0, "ServiceLevel": "大修"}, {
                "Name": "更换离合器",
                "Price": 660.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换全自动电机", "Price": 238.0, "ServiceLevel": "大修"}, {
                "Name": "维修一口价",
                "Price": 315.0,
                "ServiceLevel": "中修"
              }], "Name": "迷你"
            }, {
              "Measures": [{"Name": "更换电脑板", "Price": 675.0, "ServiceLevel": "大修"}, {
                "Name": "更换离合器",
                "Price": 660.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换全自动电机", "Price": 468.0, "ServiceLevel": "大修"}, {
                "Name": "简单维修（更换辅件、调试）",
                "Price": 120.0,
                "ServiceLevel": "小修"
              }, {"Name": "维修一口价", "Price": 238.0, "ServiceLevel": "中修"}], "Name": "全自动5.1kg-10kg"
            }, {
              "Measures": [{"Name": "更换电脑板", "Price": 660.0, "ServiceLevel": "大修"}, {
                "Name": "更换离合器",
                "Price": 445.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换全自动电机", "Price": 375.0, "ServiceLevel": "大修"}, {
                "Name": "简单维修（更换辅件、调试）",
                "Price": 120.0,
                "ServiceLevel": "小修"
              }, {"Name": "维修一口价", "Price": 226.0, "ServiceLevel": "中修"}], "Name": "全自动5kg及以下"
            }, {
              "Measures": [{"Name": "简单维修（更换辅件、调试）", "Price": 120.0, "ServiceLevel": "小修"}],
              "Name": "壁挂"
            }, {
              "Measures": [{"Name": "简单维修（更换辅件、调试）", "Price": 120.0, "ServiceLevel": "小修"}],
              "Name": "烘干一体5.1kg-10kg及以下"
            }, {
              "Measures": [{"Name": "简单维修（更换辅件、调试）", "Price": 120.0, "ServiceLevel": "小修"}],
              "Name": "烘干一体5kg及以下"
            }, {"Measures": [{"Name": "维修一口价", "Price": 166.0, "ServiceLevel": "中修"}], "Name": "半自动"}]
          }, {
            "Measures": null,
            "Name": "滚筒",
            "Spec3": [{
              "Measures": [{"Name": "更换电脑板", "Price": 660.0, "ServiceLevel": "大修"}, {
                "Name": "更换离合器",
                "Price": 858.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换全自动电机", "Price": 468.0, "ServiceLevel": "大修"}, {
                "Name": "维修一口价",
                "Price": 226.0,
                "ServiceLevel": "中修"
              }], "Name": "壁挂"
            }, {
              "Measures": [{"Name": "更换电脑板", "Price": 858.0, "ServiceLevel": "大修"}, {
                "Name": "更换离合器",
                "Price": 858.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换全自动电机", "Price": 610.0, "ServiceLevel": "大修"}, {
                "Name": "维修一口价",
                "Price": 445.0,
                "ServiceLevel": "中修"
              }], "Name": "烘干一体5.1kg-10kg及以下"
            }, {
              "Measures": [{"Name": "更换电脑板", "Price": 660.0, "ServiceLevel": "大修"}, {
                "Name": "更换离合器",
                "Price": 660.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换全自动电机", "Price": 468.0, "ServiceLevel": "大修"}, {
                "Name": "维修一口价",
                "Price": 226.0,
                "ServiceLevel": "中修"
              }], "Name": "烘干一体5kg及以下"
            }, {
              "Measures": [{"Name": "更换变频电机", "Price": 675.0, "ServiceLevel": "大修"}, {
                "Name": "更换变频主板",
                "Price": 1315.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换电机", "Price": 540.0, "ServiceLevel": "大修"}, {
                "Name": "更换三脚架总成",
                "Price": 1315.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修（更换辅件、调试）", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 346.0,
                "ServiceLevel": "中修"
              }], "Name": "全自动5.1kg-10kg"
            }, {
              "Measures": [{"Name": "更换变频电机", "Price": 588.0, "ServiceLevel": "大修"}, {
                "Name": "更换变频主板",
                "Price": 1008.0,
                "ServiceLevel": "大修"
              }, {"Name": "更换电机", "Price": 358.0, "ServiceLevel": "大修"}, {
                "Name": "更换三脚架总成",
                "Price": 1008.0,
                "ServiceLevel": "大修"
              }, {"Name": "简单维修（更换辅件、调试）", "Price": 120.0, "ServiceLevel": "小修"}, {
                "Name": "维修一口价",
                "Price": 325.0,
                "ServiceLevel": "中修"
              }], "Name": "全自动5kg及以下"
            }, {
              "Measures": [{"Name": "简单维修（更换辅件、调试）", "Price": 120.0, "ServiceLevel": "小修"}],
              "Name": "半自动"
            }, {"Measures": [{"Name": "简单维修（更换辅件、调试）", "Price": 120.0, "ServiceLevel": "小修"}], "Name": "迷你"}]
          }]
        }]
      }, {
        "Measures": [{"Name": "排烟管", "Price": 50.0, "ServiceLevel": "材料费"}, {
          "Name": "止回阀",
          "Price": 120.0,
          "ServiceLevel": "材料费"
        }, {"Name": "漏保线", "Price": 150.0, "ServiceLevel": "材料费"}, {
          "Name": "清洗剂",
          "Price": 60.0,
          "ServiceLevel": "材料费"
        }, {"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }],
        "Name": "油烟机",
        "Spec1": [{
          "Measures": null,
          "Name": "国产",
          "Spec2": [{
            "Measures": [{"Name": "更换电机", "Price": 696.0, "ServiceLevel": "大修"}, {
              "Name": "更换控制板",
              "Price": 696.0,
              "ServiceLevel": "大修"
            }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
              "Name": "维修一口价",
              "Price": 435.0,
              "ServiceLevel": "中修"
            }], "Name": "集成", "Spec3": []
          }, {
            "Measures": [{"Name": "更换电机", "Price": 358.0, "ServiceLevel": "大修"}, {
              "Name": "更换控制板",
              "Price": 335.0,
              "ServiceLevel": "大修"
            }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
              "Name": "维修一口价",
              "Price": 298.0,
              "ServiceLevel": "中修"
            }], "Name": "普通", "Spec3": []
          }]
        }, {
          "Measures": null,
          "Name": "进口/合资品牌",
          "Spec2": [{
            "Measures": [{"Name": "更换电机", "Price": 1045.0, "ServiceLevel": "大修"}, {
              "Name": "更换控制板",
              "Price": 1045.0,
              "ServiceLevel": "大修"
            }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
              "Name": "维修一口价",
              "Price": 435.0,
              "ServiceLevel": "中修"
            }], "Name": "集成", "Spec3": []
          }, {
            "Measures": [{"Name": "更换电机", "Price": 538.0, "ServiceLevel": "大修"}, {
              "Name": "更换控制板",
              "Price": 505.0,
              "ServiceLevel": "大修"
            }, {"Name": "简单维修(更换辅件、调试)", "Price": 120.0, "ServiceLevel": "小修"}, {
              "Name": "维修一口价",
              "Price": 298.0,
              "ServiceLevel": "中修"
            }], "Name": "普通", "Spec3": []
          }]
        }]
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }],
        "Name": "除湿器",
        "Spec1": [{
          "Measures": [{"Name": "更换压缩机", "Price": 505.0, "ServiceLevel": "大修"}, {
            "Name": "简单维修（更换辅件、调试）",
            "Price": 145.0,
            "ServiceLevel": "小修"
          }, {"Name": "维修一口价", "Price": 315.0, "ServiceLevel": "中修"}], "Name": "国产", "Spec2": []
        }, {
          "Measures": [{"Name": "更换压缩机", "Price": 675.0, "ServiceLevel": "大修"}, {
            "Name": "简单维修（更换辅件、调试）",
            "Price": 145.0,
            "ServiceLevel": "小修"
          }, {"Name": "维修一口价", "Price": 315.0, "ServiceLevel": "中修"}], "Name": "进口/合资品牌", "Spec2": []
        }]
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }],
        "Name": "电风扇",
        "Spec1": [{
          "Measures": [{"Name": "更换电机", "Price": 358.0, "ServiceLevel": "大修"}, {
            "Name": "简单维修（更换辅件、调试）",
            "Price": 178.0,
            "ServiceLevel": "小修"
          }], "Name": "国产", "Spec2": []
        }, {
          "Measures": [{"Name": "更换电机", "Price": 538.0, "ServiceLevel": "大修"}, {
            "Name": "简单维修（更换辅件、调试）",
            "Price": 178.0,
            "ServiceLevel": "小修"
          }], "Name": "进口/合资品牌", "Spec2": []
        }]
      }, {
        "Measures": [{"Name": "1.5米漏保线", "Price": 150.0, "ServiceLevel": "材料费"}, {
          "Name": "3米漏保线",
          "Price": 210.0,
          "ServiceLevel": "材料费"
        }, {"Name": "座架", "Price": 160.0, "ServiceLevel": "材料费"}, {
          "Name": "机罩",
          "Price": 150.0,
          "ServiceLevel": "材料费"
        }, {"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }],
        "Name": "电暖炉",
        "Spec1": [{
          "Measures": [{"Name": "更换发热体", "Price": 265.0, "ServiceLevel": "大修"}, {
            "Name": "更换控制板",
            "Price": 358.0,
            "ServiceLevel": "大修"
          }, {"Name": "简单维修（更换辅件、调试）", "Price": 120.0, "ServiceLevel": "小修"}, {
            "Name": "维修一口价",
            "Price": 238.0,
            "ServiceLevel": "中修"
          }], "Name": "国产", "Spec2": []
        }, {
          "Measures": [{"Name": "更换发热体", "Price": 396.0, "ServiceLevel": "大修"}, {
            "Name": "更换控制板",
            "Price": 538.0,
            "ServiceLevel": "大修"
          }, {"Name": "简单维修（更换辅件、调试）", "Price": 120.0, "ServiceLevel": "小修"}, {
            "Name": "维修一口价",
            "Price": 238.0,
            "ServiceLevel": "中修"
          }], "Name": "进口/合资品牌", "Spec2": []
        }]
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }, {"Name": "维修一口价", "Price": 178.0, "ServiceLevel": "中修"}], "Name": "挂烫机", "Spec1": []
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }, {"Name": "简单维修（更换辅件、调试）", "Price": 145.0, "ServiceLevel": "小修"}, {
          "Name": "维修一口价",
          "Price": 178.0,
          "ServiceLevel": "中修"
        }], "Name": "烘干机", "Spec1": []
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }],
        "Name": "回水器",
        "Spec1": [{
          "Measures": [{"Name": "更换电机", "Price": 456.0, "ServiceLevel": "大修"}, {
            "Name": "简单维修（更换辅件、调试）",
            "Price": 336.0,
            "ServiceLevel": "小修"
          }], "Name": "国产", "Spec2": []
        }, {
          "Measures": [{"Name": "更换电机", "Price": 685.0, "ServiceLevel": "大修"}, {
            "Name": "简单维修（更换辅件、调试）",
            "Price": 336.0,
            "ServiceLevel": "小修"
          }], "Name": "进口/合资品牌", "Spec2": []
        }]
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }, {"Name": "维修一口价", "Price": 178.0, "ServiceLevel": "中修"}], "Name": "加湿器", "Spec1": []
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }, {"Name": "维修一口价", "Price": 215.0, "ServiceLevel": "中修"}], "Name": "净化器", "Spec1": []
      }, {
        "Measures": [{"Name": "打孔（砖）", "Price": 120.0, "ServiceLevel": "材料费"}, {
          "Name": "打孔（水泥）",
          "Price": 150.0,
          "ServiceLevel": "材料费"
        }, {"Name": "滤芯", "Price": 198.0, "ServiceLevel": "材料费"}, {
          "Name": "波纹软管30-40cm",
          "Price": 30.0,
          "ServiceLevel": "材料费"
        }, {"Name": "波纹软管50-80cm", "Price": 40.0, "ServiceLevel": "材料费"}, {
          "Name": "安全阀",
          "Price": 40.0,
          "ServiceLevel": "材料费"
        }, {"Name": "三角阀", "Price": 30.0, "ServiceLevel": "材料费"}, {
          "Name": "晚间加急费",
          "Price": 30.0,
          "ServiceLevel": "其他服务项"
        }, {"Name": "上门费", "Price": 30.0, "ServiceLevel": "上门"}, {
          "Name": "维修一口价",
          "Price": 238.0,
          "ServiceLevel": "中修"
        }], "Name": "净水器", "Spec1": []
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }],
        "Name": "空调扇",
        "Spec1": [{
          "Measures": [{"Name": "更换压缩机", "Price": 385.0, "ServiceLevel": "大修"}, {
            "Name": "简单维修（更换辅件、调试）",
            "Price": 120.0,
            "ServiceLevel": "小修"
          }, {"Name": "维修一口价", "Price": 286.0, "ServiceLevel": "中修"}], "Name": "国产", "Spec2": []
        }, {
          "Measures": [{"Name": "更换压缩机", "Price": 104.0, "ServiceLevel": "大修"}, {
            "Name": "简单维修（更换辅件、调试）",
            "Price": 120.0,
            "ServiceLevel": "小修"
          }, {"Name": "维修一口价", "Price": 286.0, "ServiceLevel": "中修"}], "Name": "进口/合资品牌", "Spec2": []
        }]
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }],
        "Name": "甩干机",
        "Spec1": [{
          "Measures": [{"Name": "更换电机", "Price": 358.0, "ServiceLevel": "大修"}, {
            "Name": "维修一口价",
            "Price": 178.0,
            "ServiceLevel": "中修"
          }], "Name": "国产", "Spec2": []
        }, {
          "Measures": [{"Name": "更换电机", "Price": 538.0, "ServiceLevel": "大修"}, {
            "Name": "维修一口价",
            "Price": 178.0,
            "ServiceLevel": "中修"
          }], "Name": "进口/合资品牌", "Spec2": []
        }]
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }],
        "Name": "微波炉",
        "Spec1": [{
          "Measures": [{"Name": "更换变压器", "Price": 168.0, "ServiceLevel": "大修"}, {
            "Name": "更换磁控管",
            "Price": 158.0,
            "ServiceLevel": "大修"
          }, {"Name": "更换控制板", "Price": 198.0, "ServiceLevel": "大修"}, {
            "Name": "简单维修(更换辅件、调试)",
            "Price": 80.0,
            "ServiceLevel": "小修"
          }, {"Name": "维修一口价", "Price": 130.0, "ServiceLevel": "中修"}], "Name": "国产", "Spec2": []
        }, {
          "Measures": [{"Name": "更换变压器", "Price": 255.0, "ServiceLevel": "大修"}, {
            "Name": "更换磁控管",
            "Price": 238.0,
            "ServiceLevel": "大修"
          }, {"Name": "更换控制板", "Price": 230.0, "ServiceLevel": "大修"}, {
            "Name": "简单维修(更换辅件、调试)",
            "Price": 80.0,
            "ServiceLevel": "小修"
          }, {"Name": "维修一口价", "Price": 130.0, "ServiceLevel": "中修"}], "Name": "进口/合资品牌", "Spec2": []
        }]
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }],
        "Name": "吸尘器",
        "Spec1": [{
          "Measures": [{"Name": "更换电机", "Price": 385.0, "ServiceLevel": "大修"}, {
            "Name": "维修一口价",
            "Price": 238.0,
            "ServiceLevel": "中修"
          }], "Name": "国产", "Spec2": []
        }, {
          "Measures": [{"Name": "更换电机", "Price": 576.0, "ServiceLevel": "大修"}, {
            "Name": "维修一口价",
            "Price": 238.0,
            "ServiceLevel": "中修"
          }], "Name": "进口/合资品牌", "Spec2": []
        }]
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }],
        "Name": "饮水机",
        "Spec1": [{
          "Measures": null,
          "Name": "国产",
          "Spec2": [{
            "Measures": [{"Name": "更换压缩机", "Price": 576.0, "ServiceLevel": "大修"}, {
              "Name": "维修一口价",
              "Price": 178.0,
              "ServiceLevel": "中修"
            }], "Name": "普通", "Spec3": []
          }, {
            "Measures": [{"Name": "更换压缩机", "Price": 576.0, "ServiceLevel": "大修"}, {
              "Name": "更换主板",
              "Price": 515.0,
              "ServiceLevel": "大修"
            }, {"Name": "维修一口价", "Price": 325.0, "ServiceLevel": "中修"}], "Name": "智能", "Spec3": []
          }]
        }, {
          "Measures": null,
          "Name": "进口/合资品牌",
          "Spec2": [{
            "Measures": [{"Name": "更换压缩机", "Price": 750.0, "ServiceLevel": "大修"}, {
              "Name": "维修一口价",
              "Price": 178.0,
              "ServiceLevel": "中修"
            }], "Name": "普通", "Spec3": []
          }, {
            "Measures": [{"Name": "更换压缩机", "Price": 750.0, "ServiceLevel": "大修"}, {
              "Name": "更换主板",
              "Price": 515.0,
              "ServiceLevel": "大修"
            }, {"Name": "维修一口价", "Price": 325.0, "ServiceLevel": "中修"}], "Name": "智能", "Spec3": []
          }]
        }]
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }, {"Name": "维修一口价", "Price": 178.0, "ServiceLevel": "中修"}], "Name": "油汀", "Spec1": []
      }]
    }, {
      "Name": "拆卸安装",
      "Categories": [{
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "安装-服务费",
          "Price": 80.0,
          "ServiceLevel": "人力附加"
        }, {"Name": "拆卸-服务费", "Price": 80.0, "ServiceLevel": "人力附加"}, {
          "Name": "拆卸+安装-服务费",
          "Price": 150.0,
          "ServiceLevel": "人力附加"
        }, {"Name": "上门费", "Price": 30.0, "ServiceLevel": "上门"}], "Name": "洗碗机", "Spec1": []
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "服务费",
          "Price": 80.0,
          "ServiceLevel": "人力附加"
        }, {"Name": "服务费", "Price": 80.0, "ServiceLevel": "人力附加"}, {
          "Name": "服务费",
          "Price": 150.0,
          "ServiceLevel": "人力附加"
        }, {"Name": "上门费", "Price": 30.0, "ServiceLevel": "上门"}], "Name": "消毒柜", "Spec1": []
      }, {
        "Measures": [{"Name": "活性炭", "Price": 65.0, "ServiceLevel": "材料费"}, {
          "Name": "清洗剂",
          "Price": 60.0,
          "ServiceLevel": "材料费"
        }, {"Name": "杀菌剂", "Price": 60.0, "ServiceLevel": "材料费"}, {
          "Name": "座架",
          "Price": 160.0,
          "ServiceLevel": "材料费"
        }, {"Name": "漏保线", "Price": 150.0, "ServiceLevel": "材料费"}, {
          "Name": "晚间加急费",
          "Price": 30.0,
          "ServiceLevel": "其他服务项"
        }, {"Name": "上门费", "Price": 30.0, "ServiceLevel": "上门"}],
        "Name": "冰箱",
        "Spec1": [{
          "Measures": [{"Name": "拆卸-服务费", "Price": 80.0, "ServiceLevel": "人力附加"}, {
            "Name": "安装-服务费",
            "Price": 100.0,
            "ServiceLevel": "人力附加"
          }, {"Name": "拆卸+安装-服务费", "Price": 180.0, "ServiceLevel": "人力附加"}], "Name": "≤300L", "Spec2": []
        }, {
          "Measures": [{"Name": "安装-服务费", "Price": 180.0, "ServiceLevel": "人力附加"}, {
            "Name": "拆卸-服务费",
            "Price": 80.0,
            "ServiceLevel": "人力附加"
          }, {"Name": "拆卸+安装-服务费", "Price": 240.0, "ServiceLevel": "人力附加"}], "Name": "301L-650L", "Spec2": []
        }]
      }, {
        "Measures": [{"Name": "打孔（水泥）", "Price": 150.0, "ServiceLevel": "材料费"}, {
          "Name": "打孔（砖）",
          "Price": 120.0,
          "ServiceLevel": "材料费"
        }, {"Name": "挂架（大）", "Price": 90.0, "ServiceLevel": "材料费"}, {
          "Name": "挂架（小）",
          "Price": 70.0,
          "ServiceLevel": "材料费"
        }, {"Name": "遥控板", "Price": 120.0, "ServiceLevel": "材料费"}, {
          "Name": "AV线",
          "Price": 70.0,
          "ServiceLevel": "材料费"
        }, {"Name": "HDMI高清线", "Price": 120.0, "ServiceLevel": "材料费"}, {
          "Name": "漏保线",
          "Price": 150.0,
          "ServiceLevel": "材料费"
        }, {"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }],
        "Name": "电视",
        "Spec1": [{
          "Measures": [{"Name": "拆卸+安装-服务费", "Price": 138.0, "ServiceLevel": "人力附加"}, {
            "Name": "拆卸-服务费",
            "Price": 90.0,
            "ServiceLevel": "人力附加"
          }, {"Name": "安装-服务费", "Price": 90.0, "ServiceLevel": "人力附加"}], "Name": "≤32吋", "Spec2": []
        }, {
          "Measures": [{"Name": "安装-服务费", "Price": 98.0, "ServiceLevel": "人力附加"}, {
            "Name": "拆卸+安装-服务费",
            "Price": 150.0,
            "ServiceLevel": "人力附加"
          }, {"Name": "拆卸-服务费", "Price": 98.0, "ServiceLevel": "人力附加"}], "Name": "33-41吋", "Spec2": []
        }, {
          "Measures": [{"Name": "安装-服务费", "Price": 128.0, "ServiceLevel": "人力附加"}, {
            "Name": "拆卸+安装-服务费",
            "Price": 180.0,
            "ServiceLevel": "人力附加"
          }, {"Name": "拆卸-服务费", "Price": 128.0, "ServiceLevel": "人力附加"}], "Name": "42-54吋", "Spec2": []
        }, {
          "Measures": [{"Name": "安装-服务费", "Price": 280.0, "ServiceLevel": "人力附加"}, {
            "Name": "拆卸+安装-服务费",
            "Price": 320.0,
            "ServiceLevel": "人力附加"
          }, {"Name": "拆卸-服务费", "Price": 158.0, "ServiceLevel": "人力附加"}], "Name": "55-65吋", "Spec2": []
        }, {
          "Measures": [{"Name": "安装-服务费", "Price": 320.0, "ServiceLevel": "人力附加"}, {
            "Name": "拆卸+安装-服务费",
            "Price": 450.0,
            "ServiceLevel": "人力附加"
          }, {"Name": "拆卸-服务费", "Price": 320.0, "ServiceLevel": "人力附加"}], "Name": "66-85吋", "Spec2": []
        }, {
          "Measures": [{"Name": "安装-服务费", "Price": 480.0, "ServiceLevel": "人力附加"}, {
            "Name": "拆卸+安装-服务费",
            "Price": 680.0,
            "ServiceLevel": "人力附加"
          }, {"Name": "拆卸-服务费", "Price": 480.0, "ServiceLevel": "人力附加"}], "Name": "85吋以上", "Spec2": []
        }]
      }, {
        "Measures": [{"Name": "打孔（水泥）", "Price": 150.0, "ServiceLevel": "材料费"}, {
          "Name": "高空费（出外墙操作）",
          "Price": 100.0,
          "ServiceLevel": "材料费"
        }, {"Name": "打孔（砖）", "Price": 120.0, "ServiceLevel": "材料费"}, {
          "Name": "支架（1-1.5P）",
          "Price": 80.0,
          "ServiceLevel": "材料费"
        }, {"Name": "支架（2-3P）", "Price": 90.0, "ServiceLevel": "材料费"}, {
          "Name": "支架（4-5P）",
          "Price": 130.0,
          "ServiceLevel": "材料费"
        }, {"Name": "外机接水盘（大）", "Price": 240.0, "ServiceLevel": "材料费"}, {
          "Name": "外机接水盘（小）",
          "Price": 180.0,
          "ServiceLevel": "材料费"
        }, {"Name": "外机罩", "Price": 180.0, "ServiceLevel": "材料费"}, {
          "Name": "遥控板",
          "Price": 100.0,
          "ServiceLevel": "材料费"
        }, {"Name": "空调专用插座、空气开关", "Price": 150.0, "ServiceLevel": "材料费"}, {
          "Name": "漏保线",
          "Price": 150.0,
          "ServiceLevel": "材料费"
        }, {"Name": "保温管", "Price": 20.0, "ServiceLevel": "材料费"}, {
          "Name": "连接线（1-1.5P）",
          "Price": 10.0,
          "ServiceLevel": "材料费"
        }, {"Name": "连接线（2-3P）", "Price": 20.0, "ServiceLevel": "材料费"}, {
          "Name": "连接线（4-5P）",
          "Price": 50.0,
          "ServiceLevel": "材料费"
        }, {"Name": "铜管（1-1.5P）", "Price": 70.0, "ServiceLevel": "材料费"}, {
          "Name": "铜管（2-3P）",
          "Price": 80.0,
          "ServiceLevel": "材料费"
        }, {"Name": "扎带", "Price": 30.0, "ServiceLevel": "材料费"}, {
          "Name": "水管",
          "Price": 5.0,
          "ServiceLevel": "材料费"
        }, {"Name": "铜管（4-5P）", "Price": 120.0, "ServiceLevel": "材料费"}, {
          "Name": "补充制冷剂（1-1.5P）",
          "Price": 150.0,
          "ServiceLevel": "材料费"
        }, {"Name": "补充制冷剂（2-3P）", "Price": 180.0, "ServiceLevel": "材料费"}, {
          "Name": "补充制冷剂（4-5P）",
          "Price": 280.0,
          "ServiceLevel": "材料费"
        }, {"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }], "Name": "空调", "Spec1": [{
          "Measures": null,
          "Name": "风管机、天井机",
          "Spec2": [{
            "Measures": [{"Name": "安装-服务费", "Price": 148.0, "ServiceLevel": "人力附加"}, {
              "Name": "拆卸-服务费",
              "Price": 148.0,
              "ServiceLevel": "人力附加"
            }, {"Name": "拆卸+安装-服务费", "Price": 206.0, "ServiceLevel": "人力附加"}, {
              "Name": "人工搬运服务费",
              "Price": 60.0,
              "ServiceLevel": "人力附加"
            }, {"Name": "清洗散热服务费", "Price": 60.0, "ServiceLevel": "人力附加"}, {
              "Name": "焊接技术服务费",
              "Price": 60.0,
              "ServiceLevel": "人力附加"
            }], "Name": "1-1.5P", "Spec3": []
          }, {
            "Measures": [{"Name": "安装-服务费", "Price": 205.0, "ServiceLevel": "人力附加"}, {
              "Name": "拆卸-服务费",
              "Price": 205.0,
              "ServiceLevel": "人力附加"
            }, {"Name": "拆卸+安装-服务费", "Price": 288.0, "ServiceLevel": "人力附加"}, {
              "Name": "人工搬运服务费",
              "Price": 100.0,
              "ServiceLevel": "人力附加"
            }, {"Name": "清洗散热服务费", "Price": 120.0, "ServiceLevel": "人力附加"}], "Name": "2-3P", "Spec3": []
          }, {
            "Measures": [{"Name": "安装-服务费", "Price": 325.0, "ServiceLevel": "人力附加"}, {
              "Name": "拆卸-服务费",
              "Price": 325.0,
              "ServiceLevel": "人力附加"
            }, {"Name": "拆卸+安装-服务费", "Price": 465.0, "ServiceLevel": "人力附加"}, {
              "Name": "人工搬运服务费",
              "Price": 180.0,
              "ServiceLevel": "人力附加"
            }, {"Name": "清洗散热服务费", "Price": 150.0, "ServiceLevel": "人力附加"}, {
              "Name": "焊接技术服务费",
              "Price": 80.0,
              "ServiceLevel": "人力附加"
            }], "Name": "5P", "Spec3": []
          }]
        }, {
          "Measures": null,
          "Name": "挂机",
          "Spec2": [{
            "Measures": [{"Name": "安装-服务费", "Price": 88.0, "ServiceLevel": "人力附加"}, {
              "Name": "拆卸-服务费",
              "Price": 88.0,
              "ServiceLevel": "人力附加"
            }, {"Name": "拆卸+安装-服务费", "Price": 126.0, "ServiceLevel": "人力附加"}, {
              "Name": "人工搬运服务费",
              "Price": 60.0,
              "ServiceLevel": "人力附加"
            }, {"Name": "清洗散热服务费", "Price": 60.0, "ServiceLevel": "人力附加"}, {
              "Name": "焊接技术服务费",
              "Price": 60.0,
              "ServiceLevel": "人力附加"
            }], "Name": "1-1.5P", "Spec3": []
          }, {
            "Measures": [{"Name": "安装-服务费", "Price": 148.0, "ServiceLevel": "人力附加"}, {
              "Name": "拆卸-服务费",
              "Price": 148.0,
              "ServiceLevel": "人力附加"
            }, {"Name": "拆卸+安装-服务费", "Price": 208.0, "ServiceLevel": "人力附加"}, {
              "Name": "人工搬运服务费",
              "Price": 100.0,
              "ServiceLevel": "人力附加"
            }, {"Name": "清洗散热服务费", "Price": 120.0, "ServiceLevel": "人力附加"}, {
              "Name": "焊接技术服务费",
              "Price": 60.0,
              "ServiceLevel": "人力附加"
            }], "Name": "2-3P", "Spec3": []
          }]
        }, {
          "Measures": null,
          "Name": "柜机",
          "Spec2": [{
            "Measures": [{"Name": "安装-服务费", "Price": 148.0, "ServiceLevel": "人力附加"}, {
              "Name": "拆卸-服务费",
              "Price": 148.0,
              "ServiceLevel": "人力附加"
            }, {"Name": "拆卸+安装-服务费", "Price": 208.0, "ServiceLevel": "人力附加"}, {
              "Name": "人工搬运服务费",
              "Price": 100.0,
              "ServiceLevel": "人力附加"
            }, {"Name": "清洗散热服务费", "Price": 120.0, "ServiceLevel": "人力附加"}, {
              "Name": "焊接技术服务费",
              "Price": 60.0,
              "ServiceLevel": "人力附加"
            }], "Name": "2-3P", "Spec3": []
          }, {
            "Measures": [{"Name": "安装-服务费", "Price": 270.0, "ServiceLevel": "人力附加"}, {
              "Name": "拆卸-服务费",
              "Price": 270.0,
              "ServiceLevel": "人力附加"
            }, {"Name": "拆卸+安装-服务费", "Price": 385.0, "ServiceLevel": "人力附加"}, {
              "Name": "人工搬运服务费",
              "Price": 180.0,
              "ServiceLevel": "人力附加"
            }, {"Name": "清洗散热服务费", "Price": 150.0, "ServiceLevel": "人力附加"}, {
              "Name": "焊接技术服务费",
              "Price": 80.0,
              "ServiceLevel": "人力附加"
            }], "Name": "4-5P", "Spec3": []
          }]
        }]
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "安装-服务费",
          "Price": 80.0,
          "ServiceLevel": "人力附加"
        }, {"Name": "拆卸-服务费", "Price": 80.0, "ServiceLevel": "人力附加"}, {
          "Name": "拆卸+安装-服务费",
          "Price": 120.0,
          "ServiceLevel": "人力附加"
        }, {"Name": "上门费", "Price": 30.0, "ServiceLevel": "上门"}], "Name": "燃气灶", "Spec1": []
      }, {
        "Measures": [{"Name": "清洗剂", "Price": 60.0, "ServiceLevel": "材料费"}, {
          "Name": "打孔（水泥）",
          "Price": 150.0,
          "ServiceLevel": "材料费"
        }, {"Name": "打孔（砖）", "Price": 120.0, "ServiceLevel": "材料费"}, {
          "Name": "防电墙",
          "Price": 110.0,
          "ServiceLevel": "材料费"
        }, {"Name": "花洒", "Price": 60.0, "ServiceLevel": "材料费"}, {
          "Name": "吊架",
          "Price": 120.0,
          "ServiceLevel": "材料费"
        }, {"Name": "安全阀", "Price": 40.0, "ServiceLevel": "材料费"}, {
          "Name": "三角阀",
          "Price": 70.0,
          "ServiceLevel": "材料费"
        }, {"Name": "混水阀", "Price": 180.0, "ServiceLevel": "材料费"}, {
          "Name": "波纹软管30-40cm",
          "Price": 30.0,
          "ServiceLevel": "材料费"
        }, {"Name": "波纹软管50-80cm", "Price": 40.0, "ServiceLevel": "材料费"}, {
          "Name": "真空管",
          "Price": 120.0,
          "ServiceLevel": "材料费"
        }, {"Name": "漏保线", "Price": 150.0, "ServiceLevel": "材料费"}, {
          "Name": "燃气管",
          "Price": 60.0,
          "ServiceLevel": "材料费"
        }, {"Name": "上水管", "Price": 30.0, "ServiceLevel": "材料费"}, {
          "Name": "晚间加急费",
          "Price": 30.0,
          "ServiceLevel": "其他服务项"
        }, {"Name": "上门费", "Price": 30.0, "ServiceLevel": "上门"}],
        "Name": "热水器",
        "Spec1": [{
          "Measures": null,
          "Name": "电热",
          "Spec2": [{
            "Measures": [{"Name": "拆卸-服务费", "Price": 80.0, "ServiceLevel": "人力附加"}, {
              "Name": "拆卸+安装-服务费",
              "Price": 200.0,
              "ServiceLevel": "人力附加"
            }, {"Name": "安装-服务费", "Price": 160.0, "ServiceLevel": "人力附加"}], "Name": "≤100L", "Spec3": []
          }, {
            "Measures": [{"Name": "拆卸-服务费", "Price": 150.0, "ServiceLevel": "人力附加"}, {
              "Name": "拆卸+安装-服务费",
              "Price": 350.0,
              "ServiceLevel": "人力附加"
            }, {"Name": "安装-服务费", "Price": 260.0, "ServiceLevel": "人力附加"}], "Name": "100L-200L", "Spec3": []
          }]
        }, {
          "Measures": [{"Name": "安装-服务费", "Price": 160.0, "ServiceLevel": "人力附加"}, {
            "Name": "拆卸-服务费",
            "Price": 80.0,
            "ServiceLevel": "人力附加"
          }, {"Name": "拆卸+安装-服务费", "Price": 200.0, "ServiceLevel": "人力附加"}], "Name": "即热式电热", "Spec2": []
        }, {
          "Measures": [{"Name": "安装-服务费", "Price": 160.0, "ServiceLevel": "人力附加"}, {
            "Name": "拆卸-服务费",
            "Price": 80.0,
            "ServiceLevel": "人力附加"
          }, {"Name": "拆卸+安装-服务费", "Price": 200.0, "ServiceLevel": "人力附加"}], "Name": "空气能", "Spec2": []
        }, {
          "Measures": [{"Name": "安装-服务费", "Price": 188.0, "ServiceLevel": "人力附加"}, {
            "Name": "拆卸-服务费",
            "Price": 80.0,
            "ServiceLevel": "人力附加"
          }, {"Name": "拆卸+安装-服务费", "Price": 248.0, "ServiceLevel": "人力附加"}], "Name": "燃气", "Spec2": []
        }, {
          "Measures": [{"Name": "安装-服务费", "Price": 300.0, "ServiceLevel": "人力附加"}, {
            "Name": "拆卸-服务费",
            "Price": 300.0,
            "ServiceLevel": "人力附加"
          }, {"Name": "拆卸+安装-服务费", "Price": 450.0, "ServiceLevel": "人力附加"}], "Name": "太阳能", "Spec2": []
        }]
      }, {
        "Measures": [{"Name": "清洗剂", "Price": 50.0, "ServiceLevel": "材料费"}, {
          "Name": "打孔（水泥）",
          "Price": 150.0,
          "ServiceLevel": "材料费"
        }, {"Name": "打孔（砖）", "Price": 120.0, "ServiceLevel": "材料费"}, {
          "Name": "地漏三通",
          "Price": 60.0,
          "ServiceLevel": "材料费"
        }, {"Name": "专用插座", "Price": 80.0, "ServiceLevel": "材料费"}, {
          "Name": "普通水龙头",
          "Price": 80.0,
          "ServiceLevel": "材料费"
        }, {"Name": "专用水龙头", "Price": 168.0, "ServiceLevel": "材料费"}, {
          "Name": "座架",
          "Price": 180.0,
          "ServiceLevel": "材料费"
        }, {"Name": "排水管", "Price": 38.0, "ServiceLevel": "材料费"}, {
          "Name": "进水管",
          "Price": 88.0,
          "ServiceLevel": "材料费"
        }, {"Name": "漏保线", "Price": 150.0, "ServiceLevel": "材料费"}, {
          "Name": "晚间加急费",
          "Price": 30.0,
          "ServiceLevel": "其他服务项"
        }, {"Name": "上门费", "Price": 30.0, "ServiceLevel": "上门"}],
        "Name": "洗衣机",
        "Spec1": [{
          "Measures": [{"Name": "拆卸-服务费", "Price": 80.0, "ServiceLevel": "人力附加"}, {
            "Name": "拆卸+安装-服务费",
            "Price": 180.0,
            "ServiceLevel": "人力附加"
          }, {"Name": "安装-服务费", "Price": 150.0, "ServiceLevel": "人力附加"}], "Name": "壁挂洗衣机", "Spec2": []
        }, {
          "Measures": [{"Name": "拆卸-服务费", "Price": 80.0, "ServiceLevel": "人力附加"}, {
            "Name": "拆卸+安装-服务费",
            "Price": 120.0,
            "ServiceLevel": "人力附加"
          }, {"Name": "安装-服务费", "Price": 80.0, "ServiceLevel": "人力附加"}], "Name": "波轮", "Spec2": []
        }, {
          "Measures": [{"Name": "拆卸+安装-服务费", "Price": 218.0, "ServiceLevel": "人力附加"}, {
            "Name": "安装-服务费",
            "Price": 120.0,
            "ServiceLevel": "人力附加"
          }], "Name": "滚筒", "Spec2": []
        }, {
          "Measures": [{"Name": "拆卸-服务费", "Price": 120.0, "ServiceLevel": "人力附加"}, {
            "Name": "拆卸+安装-服务费",
            "Price": 240.0,
            "ServiceLevel": "人力附加"
          }, {"Name": "安装-服务费", "Price": 150.0, "ServiceLevel": "人力附加"}], "Name": "烘干一体洗衣机", "Spec2": []
        }, {
          "Measures": [{"Name": "拆卸-服务费", "Price": 80.0, "ServiceLevel": "人力附加"}, {
            "Name": "拆卸+安装-服务费",
            "Price": 120.0,
            "ServiceLevel": "人力附加"
          }, {"Name": "安装-服务费", "Price": 80.0, "ServiceLevel": "人力附加"}], "Name": "迷你洗衣机", "Spec2": []
        }]
      }, {
        "Measures": [{"Name": "清洗剂", "Price": 60.0, "ServiceLevel": "材料费"}, {
          "Name": "止回阀",
          "Price": 120.0,
          "ServiceLevel": "材料费"
        }, {"Name": "漏保线", "Price": 150.0, "ServiceLevel": "材料费"}, {
          "Name": "排烟管",
          "Price": 50.0,
          "ServiceLevel": "材料费"
        }, {"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "拆卸-服务费",
          "Price": 80.0,
          "ServiceLevel": "人力附加"
        }, {"Name": "拆卸+安装-服务费", "Price": 268.0, "ServiceLevel": "人力附加"}, {
          "Name": "安装-服务费",
          "Price": 188.0,
          "ServiceLevel": "人力附加"
        }, {"Name": "上门费", "Price": 30.0, "ServiceLevel": "上门"}], "Name": "油烟机", "Spec1": []
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "安装-服务费",
          "Price": 105.0,
          "ServiceLevel": "人力附加"
        }, {"Name": "拆卸-服务费", "Price": 105.0, "ServiceLevel": "人力附加"}, {
          "Name": "安装拆卸-服务费",
          "Price": 150.0,
          "ServiceLevel": "人力附加"
        }, {"Name": "上门费", "Price": 30.0, "ServiceLevel": "上门"}], "Name": "净水器", "Spec1": []
      }]
    }, {
      "Name": "清洗",
      "Categories": [{
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }],
        "Name": "油烟机",
        "Spec1": [{
          "Measures": [{
            "Name": "油烟机单台清洗（拆洗）",
            "Price": 189.0,
            "ServiceLevel": "人力附加"
          }, {"Name": "油烟机+任意两件（冰/洗/空）3件清洗", "Price": 449.0, "ServiceLevel": "人力附加"}], "Name": "集成", "Spec2": []
        }, {
          "Measures": [{
            "Name": "油烟机单台清洗（拆洗）",
            "Price": 189.0,
            "ServiceLevel": "人力附加"
          }, {"Name": "油烟机+任意两件（冰/洗/空）3件清洗", "Price": 449.0, "ServiceLevel": "人力附加"}], "Name": "欧式", "Spec2": []
        }, {
          "Measures": [{
            "Name": "油烟机单台清洗（拆洗）",
            "Price": 189.0,
            "ServiceLevel": "人力附加"
          }, {"Name": "油烟机+任意两件（冰/洗/空）3件清洗", "Price": 449.0, "ServiceLevel": "人力附加"}], "Name": "普通", "Spec2": []
        }, {
          "Measures": [{
            "Name": "油烟机单台清洗（拆洗）",
            "Price": 189.0,
            "ServiceLevel": "人力附加"
          }, {"Name": "油烟机+任意两件（冰/洗/空）3件清洗", "Price": 449.0, "ServiceLevel": "人力附加"}], "Name": "中式", "Spec2": []
        }]
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "冰箱单台清洗",
          "Price": 129.0,
          "ServiceLevel": "人力附加"
        }, {"Name": "上门费", "Price": 30.0, "ServiceLevel": "上门"}], "Name": "冰箱", "Spec1": []
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }],
        "Name": "空调",
        "Spec1": [{
          "Measures": [{"Name": "空调挂机单台清洗", "Price": 89.0, "ServiceLevel": "人力附加"}, {
            "Name": "空调柜机/挂机组合2件清洗",
            "Price": 229.0,
            "ServiceLevel": "人力附加"
          }], "Name": "挂机", "Spec2": []
        }, {
          "Measures": [{"Name": "空调柜机单台清洗", "Price": 129.0, "ServiceLevel": "人力附加"}, {
            "Name": "空调柜机/挂机组合2件清洗",
            "Price": 229.0,
            "ServiceLevel": "人力附加"
          }], "Name": "柜机", "Spec2": []
        }]
      }, {
        "Measures": [{"Name": "晚间加急费", "Price": 30.0, "ServiceLevel": "其他服务项"}, {
          "Name": "上门费",
          "Price": 30.0,
          "ServiceLevel": "上门"
        }],
        "Name": "洗衣机",
        "Spec1": [{
          "Measures": [{"Name": "波轮洗衣机单台清洗（拆洗）", "Price": 129.0, "ServiceLevel": "人力附加"}],
          "Name": "波轮",
          "Spec2": []
        }, {"Measures": [{"Name": "滚筒洗衣机单台清洗（非拆洗）", "Price": 89.0, "ServiceLevel": "人力附加"}], "Name": "滚筒", "Spec2": []}]
      }]
    }]
  }
]
let recycleData = {
  "root": {
    "data": [
      {
        "name": "洗衣机",
        "icon": "iconxiyiji",
        "pid": "142956",
        "items": {
          "name": "家电品类",
          "item": [
            {
              "name": "波轮洗衣机",
              "items": {
                "name": "规格",
                "item": [
                  {
                    "name": "4.5-5公斤",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "84",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "49",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "18",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  },
                  {
                    "name": "5公斤以上",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "84",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "49",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "18",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  }
                ]
              }
            },
            {
              "name": "滚筒洗衣机",
              "items": {
                "name": "规格",
                "item": [
                  {
                    "name": "4.5-5公斤",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "84",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "49",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "18",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  },
                  {
                    "name": "5公斤以上",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "84",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "25",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "18",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      {
        "name": "空调",
        "icon": "icons_air_conditionor",
        "pid": "142956",
        "items": {
          "name": "家电品类",
          "item": [
            {
              "name": "挂机",
              "items": {
                "name": "规格",
                "item": [
                  {
                    "name": "1P",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "210",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "168",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "56",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  },
                  {
                    "name": "1.5P",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "315",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "210",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "56",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  },
                  {
                    "name": "2P",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "462",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "315",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "70",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  },
                  {
                    "name": "2.5P",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "630",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "336",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "98",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  },
                  {
                    "name": "3P",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "735",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "336",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "98",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  }
                ]
              }
            },
            {
              "name": "柜机",
              "items": {
                "name": "规格",
                "item": [
                  {
                    "name": "2P",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "462",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "336",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "98",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  },
                  {
                    "name": "2.5P",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "630",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "336",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "123",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  },
                  {
                    "name": "3P",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "840",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "630",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "161",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  },
                  {
                    "name": "5P",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "945",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "630",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "189",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      {
        "name": "冰箱",
        "icon": "icontubiaozhizuomoban-",
        "pid": "142956",
        "items": {
          "name": "家电品类",
          "item": [
            {
              "name": "双门冰箱",
              "items": {
                "name": "规格",
                "item": [
                  {
                    "name": "100-150升",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "84",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "21",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "21",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  },
                  {
                    "name": "151-250升",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "84",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "49",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "21",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  },
                  {
                    "name": "251-350升",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "84",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "49",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "28",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  }
                ]
              }
            },
            {
              "name": "三门冰箱",
              "items": {
                "name": "规格",
                "item": [{
                  "name": "200升以上",
                  "items": {
                    "name": "商品成色",
                    "item": [
                      {
                        "name": "好机",
                        "basePrice": "84",
                        "bottomPrice": "false",
                        "desc": "核心功能和辅助功能完好"
                      },
                      {
                        "name": "瑕疵机",
                        "basePrice": "49",
                        "bottomPrice": "false",
                        "desc": "功能故障/变色/划伤/非正面磕碰"
                      },
                      {
                        "name": "报废机",
                        "basePrice": "28",
                        "bottomPrice": "true",
                        "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                      }
                    ]
                  }
                }]
              }
            }
          ]
        }
      },
      {
        "name": "电视",
        "icon": "icondianshi",
        "pid": "142956",
        "items": {
          "name": "家电品类",
          "item": [
            {
              "name": "显像管电视",
              "items": {
                "name": "规格",
                "item": [
                  {
                    "name": "24英寸及以下",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "16",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "11",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "11",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  },
                  {
                    "name": "25-28英寸",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "21",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "16",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "16",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  },
                  {
                    "name": "29-33英寸",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "26",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "21",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "21",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  },
                  {
                    "name": "34英寸以上",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "26",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "21",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "21",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  }
                ]
              }
            },
            {
              "name": "液晶电视",
              "items": {
                "name": "规格",
                "item": [
                  {
                    "name": "17-25英寸",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "32",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "21",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "21",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  },
                  {
                    "name": "26-39英寸",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "84",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "26",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "21",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  },
                  {
                    "name": "40-50英寸",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "210",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "32",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "28",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  },
                  {
                    "name": "52-70英寸",
                    "items": {
                      "name": "商品成色",
                      "item": [
                        {
                          "name": "好机",
                          "basePrice": "315",
                          "bottomPrice": "false",
                          "desc": "核心功能和辅助功能完好"
                        },
                        {
                          "name": "瑕疵机",
                          "basePrice": "32",
                          "bottomPrice": "false",
                          "desc": "功能故障/变色/划伤/非正面磕碰"
                        },
                        {
                          "name": "报废机",
                          "basePrice": "32",
                          "bottomPrice": "true",
                          "desc": "碎屏/外观锈蚀/核心功能丧失/8年以上"
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  }
}
export {priceTable, recycleData}
