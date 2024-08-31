document.addEventListener('DOMContentLoaded', function() {
    //表格部分
    // "序号","分区","专业分类","工作名称","工期（工日）","前置工作","计划开始","计划结束","成本信息"
    var datas = [
            {
                celldata: [
                    {
                        r: 0,
                        c: 0,
                        v: {
                          ct: { fa: 'General', t: 'g' },
                          m: '序号',
                          v: '序号'
                        }
                      },
                      {
                        r: 0,
                        c: 1,
                        v: {
                          ct: { fa: 'General', t: 'g' },
                          m: '分区',
                          v: '分区'
                        }
                      },
                      {
                        r: 0,
                        c: 2,
                        v: {
                          ct: { fa: 'General', t: 'g' },
                          m: '专业分类',
                          v: '专业分类'
                        }
                      },
                      {
                        r: 0,
                        c: 3,
                        v: {
                          ct: { fa: 'General', t: 'g' },
                          m: '工作名称',
                          v: '工作名称'
                        }
                      },
                      {
                        r: 0,
                        c: 4,
                        v: {
                          ct: { fa: 'General', t: 'g' },
                          m: '工期（工日）',
                          v: '工期（工日）'
                        }
                      },
                      {
                        r: 0,
                        c: 5,
                        v: {
                          ct: { fa: 'General', t: 'g' },
                          m: '前置工作',
                          v: '前置工作'
                        }
                      },
                      {
                        r: 0,
                        c: 6,
                        v: {
                          ct: { fa: 'General', t: 'g' },
                          m: '计划开始',
                          v: '计划开始'
                        }
                      },
                      {
                        r: 0,
                        c: 7,
                        v: {
                          ct: { fa: 'General', t: 'g' },
                          m: '计划结束',
                          v: '计划结束'
                        }
                      },
                      {
                        r: 0,
                        c: 8,
                        v: {
                          ct: { fa: 'General', t: 'g' },
                          m: '成本信息',
                          v: '成本信息'
                        }
                      },
                      {
                        r: 1,
                        c: 0,
                        v: {
                          ct: { fa: 'General', t: 'g' },
                          m: '1',
                          v: '1'
                        }
                      },
                      {
                        r: 1,
                        c: 3,
                        v: {
                          ct: { fa: 'General', t: 'g' },
                          m: '项目开始',
                          v: '项目开始'
                        }
                      },
                      {
                        r: 2,
                        c: 0,
                        v: {
                          ct: { fa: 'General', t: 'g' },
                          m: '2',
                          v: '2'
                        }
                      },
                      {
                        r: 2,
                        c: 3,
                        v: {
                          ct: { fa: 'General', t: 'g' },
                          m: '项目结束',
                          v: '项目结束'
                        }
                      },
                      {
                        r: 1,
                        c: 1,
                        v: {
                          ct: { fa: 'General', t: 'g' },
                          m: '--',
                          v: '--'
                        }
                      },
                      {
                        r: 1,
                        c: 2,
                        v: {
                          ct: { fa: 'General', t: 'g' },
                          m: '--',
                          v: '--'
                        }
                      },
                      {
                        r: 2,
                        c: 1,
                        v: {
                          ct: { fa: 'General', t: 'g' },
                          m: '--',
                          v: '--'
                        }
                      },
                      {
                        r: 2,
                        c: 2,
                        v: {
                          ct: { fa: 'General', t: 'g' },
                          m: '--',
                          v: '--'
                        }
                      },
                      {
                        r: 1,
                        c: 4,
                        v: {
                          ct: { fa: 'General', t: 'g' },
                          m: '--',
                          v: '--'
                        }
                      },
                      {
                        r: 2,
                        c: 4,
                        v: {
                          ct: { fa: 'General', t: 'g' },
                          m: '--',
                          v: '--'
                        }
                      }

                ]
            }
        ];
    $(function () {
        //配置项
        var options = {
            container: 'luckysheet' ,//worksheet为容器id
            title: '双代号网络', // 设定表格名称
            showinfobar:false,
            showsheetbar:false,
            userInfo:false,
            lang:"zh",
            column:"9",
            data: datas,
             hook: {
                  cellEditBefore: function(range){
                      // console.log(range)
                      colum = range[0].column;
                      row = range[0].row;
                      //时间选择器
                      var rowIdx = row[0]; // 获取行索引
                      var columnIndex = colum[0]; // 获取列索引
                      console.log(rowIdx,columnIndex)
                      if(rowIdx == 0){
                          // 返回false以立即阻止编辑行为
                          return false;
                      }

                      if(columnIndex == 6 || columnIndex == 7){
                          console.log(columnIndex)
                          // 创建一个隐藏的输入元素用于触发 Flatpickr
                          var inputElement = document.createElement('input');
                          inputElement.type = 'text';
                          inputElement.style.position = 'absolute';
                          inputElement.style.top = 0;
                          inputElement.style.left = 0;
                          inputElement.style.width = '1px';
                          inputElement.style.height = '1px';
                          inputElement.style.opacity = 0;
                          // 添加到文档中
                          document.body.appendChild(inputElement);
                          // 初始化 Flatpickr 时间选择器
                          flatpickr(inputElement, {
                              enableTime: false, // 启用时间选择
                              dateFormat: 'Y-m-d', // 设置时间格式，

                              // 当用户选择时间后，更新单元格的值
                              onChange: function(selectedDates, dateStr) {
                                // 更新Luckysheet单元格的值
                                luckysheet.setCellValue(rowIdx, columnIndex,dateStr,{isRefresh:true});
                                // 移除输入元素和时间选择器
                                document.body.removeChild(inputElement);
                                inputElement = null;

                                // 返回false以阻止单元格进入编辑状态
                                return false;
                              }
                            });

                            // 激活输入框以显示时间选择器
                            inputElement.click();
                            // 返回false以立即阻止编辑行为
                            return false;
                      }


                 }
             }
        }
        luckysheet.create(options)




    })

    luckysheet.setCellFormat(4, 1, 'ct', {
            fa: 'yyyy-MM-dd', // 日期格式
            t: 'd' // 类型为日期
        });
    luckysheet.setHorizontalFrozen(false)
    luckysheet.setcellvalue(3, 0, "123456");




    // 时间轴部分
    // const timeline = new window['$timeline']('#Timeline', {


    //




    // 初网络图部分
     // 创建节点
    var nodes = new vis.DataSet([
        {id: 1, label: '1', x: 0, y: 200},
        {id: 2, label: '2', x: 200, y: 200},
        {id: 1.3, x: 0, y: 300, color: { background: 'white'},borderWidth: 0,size: 1,font: {size: 0}},
        {id: 3, label: '3', x: 200, y: 300},
        {id: 3.4, x: 400, y: 300, color: { background: 'white'},borderWidth: 0,size: 1,font: {size: 0}},
        {id: 4, label: '4', x: 400, y: 200},
        {id: 5, label: '5', x: 600, y: 200},
        {id: 6, label: '6', x: 800, y: 200}
    ]);

    // 创建边
    var edges = new vis.DataSet([
        {id: 'e1-2', from: 1, to: 2, label: 'A(15)', dashes: true, arrows: 'to',},
        // {id: 'e1-3', from: 1, to: 3, label: 'B(20)', dashes: true, arrows: 'to'},
        {id: 'e1-1.3', from: 1, to: 1.3, label: 'B(20)', dashes: true, arrows: '',},
        {id: 'e1.3-3', from: 1.3, to: 3, label: 'B(20)', dashes: true, arrows: 'to',},
        {id: 'e2-4', from: 2, to: 4, label: 'C(10)', arrows: 'to'},
        // {id: 'e3-4', from: 3, to: 4, label: 'C(10)', arrows: 'to'},
        {id: 'e3-3.4', from: 3, to: 3.4, label: 'C(10)', arrows: ''},
        {id: 'e3.4-4', from: 3.4, to: 4, label: 'C(10)', arrows: 'to'},
        {id: 'e4-5', from: 4, to: 5, label: 'D(15)', arrows: 'to', zigzag: true},
        {id: 'e5-6', from: 5, to: 6, label: 'E(10)', arrows: 'to', zigzag: true}
    ]);

    // 创建一个网络
    var container = document.getElementById('network');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        physics: false,
        edges: {
            font: {
                size: 12,
                align: 'middle'
            },
            width: 2,
            smooth: {enabled: false},
            arrows: {
                to: {enabled: true, scaleFactor: 1, type: 'arrow'}
            }
        },
        nodes: {
            shape: 'circle',
            size: 30,
            font: {
                size: 14
            },
            borderWidth: 2,
            color: {
                background: 'white',
                border: 'black'
            }
        },
        interaction: {
            hover: true
        }
    };
    var network = new vis.Network(container, data, options);

    $("#network canvas").attr("id","canvas");
    // 自定义边绘制
    network.on("afterDrawing", function(ctx) {
        var edgePositions = network.getPositions();
        edges.forEach(function(edge) {
            var from = edgePositions[edge.from];
            var to = edgePositions[edge.to];
            if (from && to) {
                ctx.strokeStyle = edge.color || 'black';
                ctx.lineWidth = edge.width || 1;

                // 绘制主线
                // ctx.beginPath();
                // ctx.moveTo(from.x, from.y);
                // ctx.lineTo(to.x, to.y);
                //
                // if (edge.dashes) {
                //     ctx.setLineDash([5, 5]);
                // } else {
                //     ctx.setLineDash([]);
                // }
                //
                // ctx.stroke();
                // ctx.setLineDash([]);

                // 绘制折线段
                if (edge.zigzag) {
                    var dx = to.x - from.x;
                    var dy = to.y - from.y;
                    var length = Math.sqrt(dx * dx + dy * dy);
                    var unitX = dx / length;
                    var unitY = dy / length;

                    var startX = to.x - unitX * 80;
                    var startY = to.y - unitY * 80;

                    ctx.beginPath();
                    ctx.moveTo(startX, startY);
                    for (var i = 0; i < 10; i++) {
                        startX += unitX * 5;
                        startY += unitY * 5;
                        ctx.lineTo(startX, i % 2 === 0 ? startY + unitX * 10 : startY - unitX * 10);
                    }
                    ctx.stroke();
                }

                // 绘制箭头
                // var angle = Math.atan2(to.y - from.y, to.x - from.x);
                // var size = 15;
                // ctx.beginPath();
                // ctx.moveTo(to.x, to.y);
                // ctx.lineTo(to.x - size * Math.cos(angle - Math.PI / 6), to.y - size * Math.sin(angle - Math.PI / 6));
                // // ctx.lineTo(to.x - size * Math.cos(angle + Math.PI / 6), to.y - size * Math.sin(angle + Math.PI / 6));
                // ctx.closePath();
                // ctx.fill();
            }
        });


    });

    // 添加时间刻度
    network.on("afterDrawing", function (ctx) {
        var scale = 10; // 每10像素代表1天
        var days = 80;
        var startX = 0;
        var topY = 20;
        var bottomY = 480;

        ctx.strokeStyle = '#000000';
        ctx.fillStyle = '#000000';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';

        // 绘制上下时间刻度
        for (var i = 0; i <= days; i += 10) {
            var x = startX + i * scale;

            // 上刻度
            ctx.beginPath();
            ctx.moveTo(x, topY);
            ctx.lineTo(x, topY - 5);
            ctx.stroke();
            ctx.fillText(i.toString(), x, topY - 10);

            // 下刻度
            ctx.beginPath();
            ctx.moveTo(x, bottomY);
            ctx.lineTo(x, bottomY + 5);
            ctx.stroke();
            ctx.fillText(i.toString(), x, bottomY + 15);
        }

        // 绘制刻度线
        ctx.beginPath();
        ctx.moveTo(startX, topY);
        ctx.lineTo(startX + days * scale, topY);
        ctx.moveTo(startX, bottomY);
        ctx.lineTo(startX + days * scale, bottomY);
        ctx.stroke();

        // 添加 "t(天)" 标签
        ctx.fillText("t(天)", startX + days * scale + 20, topY);
        ctx.fillText("t(天)", startX + days * scale + 20, bottomY);
    });

    // 添加悬停交互
    network.on("hoverNode", function (params) {
        console.log('Hovering node:', params.node);
    });

    network.on("hoverEdge", function (params) {
        console.log('Hovering edge:', params.edge);
    });


});

function draw(){
    var allsheets = luckysheet.getAllSheets();
    let jsonString = JSON.stringify(allsheets);
    console.log(jsonString);

    $.ajax({
        url: '/workflow-diagram',
        type: 'POST',
        data: '',
        cache: false,         //不设置缓存
        processData: false,  // 不处理数据
        contentType: false,   // 不设置内容类型
        success: function(data) {
            console.log(data);
        },
        error: function(xhr, status, error) {
            console.error('Error: ' + error);
        }
    });
    // var info = {
    //     "position": {
    //         "D": [
    //             0,
    //             0
    //         ],
    //         "F": [
    //             1,
    //             -1
    //         ],
    //         "G": [
    //             2,
    //             0
    //         ],
    //         "I": [
    //             3,
    //             0
    //         ],
    //         "J": [
    //             4,
    //             0
    //         ],
    //         "E": [
    //             1,
    //             1
    //         ]
    //     },
    //     "duration_date": {
    //         "D": [
    //             "2024-02-01",
    //             "2024-02-29"
    //         ],
    //         "E": [
    //             "2024-03-01",
    //             "2024-03-20"
    //         ],
    //         "F": [
    //             "2024-03-01",
    //             "2024-03-31"
    //         ],
    //         "G": [
    //             "2024-04-01",
    //             "2024-04-15"
    //         ],
    //         "I": [
    //             "2024-04-16",
    //             "2024-05-02"
    //         ],
    //         "J": [
    //             "2024-05-03",
    //             "2024-05-20"
    //         ]
    //     }
    // }
    // console.log(info)
    // var edges = [{ data: { id: 'DE', source: 'D', target: 'E' , label: '边DE'}, group: 'edges' },
    //     { data: { id: 'DF', source: 'D', target: 'F' , label: '边DF'}, group: 'edges' },
    //     { data: { id: 'EG', source: 'E', target: 'G' , label: '边EG',linestyle: 'dashed'}, group: 'edges' },
    //     { data: { id: 'FG', source: 'F', target: 'G' , label: '边FG'}, group: 'edges' },
    //     { data: { id: 'GI', source: 'G', target: 'I' , label: '边GI'}, group: 'edges' },
    //     { data: { id: 'IJ', source: 'I', target: 'J' , label: '边IJ'}, group: 'edges' }];
    // var convertedInfo = convertData(info);
    // var elementsData = convertedInfo.concat(edges);
    // console.log(elementsData);
    // var cy = window.myCytoscapeInstance;
    // cy.add(elementsData);

}

function getData(){
    var allsheets = luckysheet.getAllSheets();
    let jsonString = JSON.stringify(allsheets);
    console.log(jsonString);
}


function exportImg() {
    var networkCanvas = document.getElementById('canvas');
    networkCanvas.toBlob(function(blob) {
       var a = document.createElement("a");
       document.body.appendChild(a);
       a.download = "network" + ".png";
       a.href = window.URL.createObjectURL(blob);
       a.click();
    });

}


