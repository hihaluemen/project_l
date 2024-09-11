
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
        }
        luckysheet.create(options)


    })


    // 初网络图部分
    // 始化 Cytoscape
    var cy = cytoscape({
        container: document.getElementById('network'),
         elements: [
            ],

        style: [
            {
                selector: 'node',
                style: {
                    'width': '20px',  // 设置节点宽度为50像素
                    'height': '20px', // 设置节点高度为50像素
                    'background-color': 'white', // 节点背景色，空心则设置为白色或透明
                    'border-color': 'black', // 边框颜色
                    'border-width': '2px', // 边框宽度
                    'label': 'data(id)',
                    'text-halign': 'left', // 标签水平对齐方式
                }
            },

            {
                selector: 'edge',
                style: {
                    'label': 'data(label)',
                    'z-index': 1, // 确保文本在边的上方
                    'width': 2,
                    'line-color': 'black',
                    'target-arrow-color': 'black',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'taxi' ,// 设置为折线
                    'taxi-direction': 'horizontal', // 设置出租车曲线的主要方向
                }
            },
            {
                selector: 'edge[linestyle = "dashed"]',
                style: {
                    'line-style': 'dashed',
                    'line-dash-pattern': [5, 5] // 点划线效果
                }
            },

            {
                selector: 'edge[linestyle = "freeline"]',
                style: {
                    'curve-style': 'segments',
                    'segment-distances': '0, 5, -5, 5, -5, 0', // 控制每一段折线的长度和方向
                    'segment-weights': '0.65, 0.7, 0.75, 0.8, 0.85, 0.9' ,  // 控制每一段折线的转折点位置
                    'width': 2,
                    'line-color': 'black',
                }
            },
            {
                selector: 'edge[is_key_path = "true"]',
                style: {
                    'line-color': 'red',
                }
            }
        ],

        layout: {
            name: 'preset',
        }
    });
    $("#network canvas").attr("id","canvas");
    // 限制缩放范围
    cy.minZoom(1); // 最小缩放比例为 1
    cy.maxZoom(1); // 最大缩放比例为 2

    // 限制移动范围
    cy.on('pan', function (evt) {
      var panX = cy.pan().x;
      var panY = cy.pan().y;

      if (panX > 0) {
        cy.panBy({ x: -panX, y: 0 });
      }
      if (panY > 0) {
        cy.panBy({ x: 0, y: -panY });
      }
    });

    // 将实例存储在全局变量
    window.myCytoscapeInstance = cy;

    var today = new Date();
    var currentDay = today.getDate();
    drawSquares(80,currentDay);

});

function draw(){
    var allsheets = luckysheet.getAllSheets();
    var sheetData = allsheets[0].data;
    // console.log(sheetData);
    var data = [];
    for (let i = 1; i < sheetData.length; i++) {
        var row = sheetData[i];
        if(areAllElementsEmpty(row, row.length)){
            console.log("empty row")
            break;
        }

        var rowData = {};
        rowData["identifier"] = row[0]==null ? "" : row[0].m;
        rowData["partition"] = row[1]==null ? "" : row[1].m;
        rowData["classify"] = row[2]==null ? "" : row[2].m;
        rowData["name"] = row[3]==null ? "" : row[3].m;
        rowData["duration"] = row[4]==null ? "" : row[4].m;
        rowData["prerequisite"] = row[5]==null ? "" : row[5].m;
        rowData["start_date"] = row[6]==null ? "" : row[6].m;
        rowData["end_date"] = row[7]==null ? "" : row[7].m;
        rowData["cost"] = row[8]==null ? "" : row[8].m;
        data.push(rowData);
    }
    var paydata = {
        "work_data":data
    }
    // console.log(paydata);
    console.log(JSON.stringify(paydata))
    $.ajax({
        url: '/data',
        type: 'POST',
        data: JSON.stringify(paydata),
        cache: false,         //不设置缓存
        processData: false,  // 不处理数据
        contentType: "application/json",   // 不设置内容类型
        success: function(data) {
            console.log(data);
            var position = data.position;
            var duration_date = data.duration_date;
            //时间
            var durationkeys = Object.keys(duration_date)
            // 获取与第一个键关联的数组
            const firstArray = duration_date[durationkeys[0]];
            const lastArray = duration_date[durationkeys[durationkeys.length-1]];
            // 设置方块数量和起始日期
            var date = firstArray[0];
            var numSquares = calculateDaysBetweenDates(firstArray[0],lastArray[1])
            // var numSquares = 30; // 例如，画 30 个方块
            var startDate = new Date(date); // 例如，从 2023 年 12 月 1 日开始
            // 调用 drawSquares 函数绘制方块
            drawSquares(numSquares, startDate);

            //网络图
            var info = {
                "position":position,
                "duration_date":duration_date
            }
            // 新边
            var new_edges = [];
            var edge_info = data.edge_info;
            for (const edgeKey in edge_info) {
                if (edge_info.hasOwnProperty(edgeKey)) {
                    const edgeValue = edge_info[edgeKey];
                    console.log(edgeValue["is_key_path"]);
                    new_edges.push({
                        data:{
                            id: edgeKey, source: edgeValue["from_node"], target: edgeValue["to_node"], label: edgeKey,
                            linestyle: edgeValue["dashes"]|edgeValue["zigzag"], is_key_path: edgeValue["is_key_path"]+""
                        }, group: 'edges'
                    });
                }
            }

            console.log(new_edges)
            var convertedInfo = convertData(info);
            var elementsData = convertedInfo.concat(new_edges);
            console.log(elementsData);
            var cy = window.myCytoscapeInstance;
            cy.add(elementsData);

        },
        error: function(xhr, status, error) {
            console.error('Error: ' + error);
        }
    });
}

function convertData(info) {
    // 创建一个空数组来存储转换后的数据
    var convertedData = [];

    // 遍历 position 对象中的每个属性
    for (var key in info.position) {
        if (info.position.hasOwnProperty(key)) {
            // 构造新的数据对象并添加到数组中
            convertedData.push({
                data: { id: key },
                position: {
                    x: info.position[key][0]*100+50,
                    y: info.position[key][1]*100+150
                }
            });
        }
    }

    // 返回转换后的数据数组
    return convertedData;
}
//判断数组是否全部为空
function areAllElementsEmpty(row, i) {
    return row.slice(0, i + 1).every(element => element === null);
}
//计算两个日期之间的天数差
function calculateDaysBetweenDates(dateString1, dateString2) {
  // 将日期字符串转换为 Date 对象
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  // 计算时间差（毫秒）
  const timeDifference = Math.abs(date2.getTime() - date1.getTime());

  // 将时间差转换为天数
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  return daysDifference;
}

// 定义一个函数来绘制方块
function drawSquares(numSquares, startDate) {
    // 获取 Canvas 元素
    var canvas = document.getElementById("canvas");
    // 获取 2D 绘图上下文
    var ctx = canvas.getContext('2d');

    // 设置方块大小
    var squareSize = 20;
    // 设置方块间距
    var spacing = 0;


    // 获取当前日期
    var today = new Date(startDate);
    var currentDay = today.getDate();
    var currentMonth = today.getMonth();
    var day = currentDay;
    // 获取年份
    var year = today.getFullYear();
    var monthX = 0;
    var yearX = 0;
    // 循环绘制方块和文本
    for (var i = 0; i < numSquares; i++) {
        // 计算每个方块的 x 坐标
        var x = i * (squareSize + spacing);

        // 如果日期超过了当月天数，则进入下一月
        var days = new Date(today.getFullYear(), currentMonth + 1, 0).getDate();
        if (day > days) {
            day = 1;
            // 绘制月份
            // 绘制方块框线

            ctx.strokeRect(monthX, 20, x-monthX, squareSize);
            var monthText = new Date(today.getFullYear(), currentMonth, 1).toLocaleString('default', { month: 'long' });
            var monthTextWidth = ctx.measureText(monthText).width;
            ctx.fillText(monthText, monthX + (x - monthTextWidth) / 2, 20 + (squareSize + 12) / 2);
            monthX = x;
            currentMonth++;
            // 更新年份
            if (currentMonth === 12) {
                currentMonth = 0;
                // 绘制年份
                ctx.strokeRect(yearX, 0, x-yearX, squareSize);
                var yearTextWidth = ctx.measureText(year).width;
                ctx.fillText(year, yearX + (squareSize - yearTextWidth) / 2, 12);
                year++;
                yearX = x;
            }
        }

        // 设置文本内容
        var text = "" + day;
        day++;

        // 设置文本样式
        ctx.font = "12px Arial";
        ctx.fillStyle = "black";

        // 计算文本的宽度和高度
        var textWidth = ctx.measureText(text).width;
        var textHeight = 12;

        // 计算文本的 x 和 y 坐标，使其居中于方块
        var textX = x + (squareSize - textWidth) / 2;
        var textY = 40 + (squareSize + textHeight) / 2;

        // 设置框线样式
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        // 绘制方块框线
        ctx.strokeRect(x, 40, squareSize, squareSize);

        // 绘制文本
        ctx.fillText(text, textX, textY);

    }
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
