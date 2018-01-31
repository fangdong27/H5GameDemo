/////将画多个图表的函数进行封装
//function DrawCharts(ec) { 
//    DrawRadarEChart(ec);
//    DrawRadarUserEChart(ec);
//    //ec.setTheme('macarons', 'infographic');
//}

//绘制好友PK能力图（雷达图）
function DrawRadarEChart(ec) {
    var custSource = ec.init(document.getElementById('skill'));
    window.onresize = custSource.resize;
    //图表显示提示信息
    custSource.showLoading({
        text: "图表数据正在努力加载..."
    });
    custSource.hideLoading();
     
    custSource.setOption({
        tooltip: {//鼠标悬浮交互时的信息提示
            //触发类型，默认数据触发，可选：'item'和'axis'
            trigger: 'item',
            formatter: "{a}:{b}"//力导向图formatter:a(系列名称)，b(节点名称)
        },
        //legend: {//图例
        //    textStyle: {
        //        color: '#333',
        //        fontFamily: 'Microsoft YaHei',
        //        fontSize: '12'
        //    },
        //    orient: "vertical",
        //    x: 'left',
        //    data: ['周易', '何珥']
        //},
        //toolbox: {//工具箱
        //    show: true,
        //    feature: {//特征
        //        mark: { show: false },//显示辅助线
        //        dataView: { show: true, readOnly: false },//显示数据视图
        //        restore: { show: true },//还原
        //        saveAsImage: { show: true }//保存为图片，IE8不支持
        //    }
        //},

        calculable: true,//是否启用拖拽重计算特性，默认关闭
        polar: [{
            center: ['50%', '50%'], // 图的位置
            name: {
                show: true, // 是否显示工艺等文字
                formatter: null, // 工艺等文字的显示形式
                textStyle: {
                    color: '#fff',
                    fontFamily: 'Microsoft YaHei',
                    fontSize: '16'
                }
            },
            indicator: [
            { text: '文科', max: 100 },
            { text: '理科', max: 100 },
            { text: '文艺', max: 100 },
            { text: '娱乐', max: 100 },
            { text: '生活', max: 100 },
            { text: '流行', max: 100 }
            ],
            radius: '80%',//控制图表大小
            nameGap: 25, // 图中工艺等字距离图的距离
            splitArea: {
                show: true,
                areaStyle: {
                    color: "rgba(0,0,0,0.3)"  // 图表背景网格的颜色
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    color: '#fff' // 图表背景网格线的颜色
                }
            }
        }],
        series: [//驱动图表生成的数据内容
            {
                type: 'radar',
                symbol: "none", // 去掉图表中各个图区域的边框线拐点
                itemStyle: {
                    normal: {
                        color: "rgba(0,0,0,0)", // 图表中各个图区域的边框线拐点颜色
                        lineStyle: {
                            color: "white" // 图表中各个图区域的边框线颜色
                        },
                        areaStyle: {
                            type: 'default', 
                        },
                         
                    }
                }, 
                data: [
                     {
                         name: '周易', value: [34, 58, 60, 76, 56, 69], itemStyle: {
                             normal: {
                                 areaStyle: {
                                     type: 'default',
                                     color: "rgba(188,136,236,0.6)", //rgba(117,183,249,0.6) 图表中各个图区域的颜色
                                     opacity: 0.3 // 图表中各个图区域的透明度
                                     
                                 }
                             }
                         }
                     },
                     {
                         name: '何珥', value: [40, 77, 23, 52, 43, 71], itemStyle: {
                             normal: {
                                 areaStyle: {
                                     type: 'default',
                                     color: "rgba(107,202,148,0.6)", // 图表中各个图区域的颜色
                                     opacity: 0.3 // 图表中各个图区域的透明度

                                 }
                             }
                         }
                     }
                ]

            }
        ]
    });

}

//绘制个人技能能力图（雷达图）
function DrawRadarUserEChart(ec) {
    var custSource = ec.init(document.getElementById('mySkill'));
    window.onresize = custSource.resize;
    //图表显示提示信息
    custSource.showLoading({
        text: "图表数据正在努力加载..."
    });
    custSource.hideLoading();

    custSource.setOption({
        tooltip: {//鼠标悬浮交互时的信息提示
            //触发类型，默认数据触发，可选：'item'和'axis'
            trigger: 'item',
            formatter: "{a}:{b}"//力导向图formatter:a(系列名称)，b(节点名称)
        },
         
        calculable: true,//是否启用拖拽重计算特性，默认关闭
        polar: [{
            center: ['50%', '50%'], // 图的位置
            name: {
                show: true, // 是否显示工艺等文字
                formatter: null, // 工艺等文字的显示形式
                textStyle: {
                    color: '#fff',
                    fontFamily: 'Microsoft YaHei',
                    fontSize: '16'
                }
            },
            indicator: [
            { text: '文科', max: 100 },
            { text: '理科', max: 100 },
            { text: '文艺', max: 100 },
            { text: '娱乐', max: 100 },
            { text: '生活', max: 100 },
            { text: '流行', max: 100 }
            ],
            radius: '80%',//控制图表大小
            nameGap: 25, // 图中工艺等字距离图的距离
            splitArea: {
                show: true,
                areaStyle: {
                    color: "rgba(0,0,0,0.3)"  // 图表背景网格的颜色
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    color: '#fff' // 图表背景网格线的颜色
                }
            }
        }],
        series: [//驱动图表生成的数据内容
            {
                type: 'radar',
                symbol: "none", // 去掉图表中各个图区域的边框线拐点
                itemStyle: {
                    normal: {
                        color: "rgba(0,0,0,0)", // 图表中各个图区域的边框线拐点颜色
                        lineStyle: {
                            color: "white" // 图表中各个图区域的边框线颜色
                        },
                        areaStyle: {
                            type: 'default',
                        },

                    }
                },
                data: [
                     {
                       value: [34, 58, 60, 76, 56, 69], itemStyle: {
                             normal: {
                                 areaStyle: {
                                     type: 'default',
                                     color: "rgba(188,136,236,0.6)", //rgba(117,183,249,0.6) 图表中各个图区域的颜色
                                     opacity: 0.3 // 图表中各个图区域的透明度

                                 }
                             }
                         }
                     } 
                ]

            }
        ]
    });

}