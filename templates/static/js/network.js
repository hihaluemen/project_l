//创建节点
var nodes = new vis.DataSet();
// 创建边
var edges = new vis.DataSet();

var network = null;
// 设置方块大小
var squareSize = 10;

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
                          m: '工程名称',
                          v: '工程名称'
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
                          m: '实际开始时间',
                          v: '实际开始时间'
                        }
                      },
                        {
                        r: 0,
                        c: 9,
                        v: {
                          ct: { fa: 'General', t: 'g' },
                          m: '实际结束时间',
                          v: '实际结束时间'
                        }
                      },
                        {
                        r: 0,
                        c: 10,
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
            showsheetbar:true,
            userInfo:false,
            lang:"zh",
            column:"11",
            showstatisticBar:true,
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

                      if(columnIndex == 6 || columnIndex == 7 || columnIndex == 8 || columnIndex == 9){
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
                          var cellValue = luckysheet.getCellValue(rowIdx, columnIndex);
                          flatpickr(inputElement, {
                              enableTime: false, // 启用时间选择
                              dateFormat: 'Y-m-d', // 设置时间格式，
                              local: "zh", // 设置中文
                              defaultDate: cellValue, // 设置默认日期

                              // 当用户选择时间后，更新单元格的值
                              onChange: function(selectedDates, dateStr) {
                                  // 更新Luckysheet单元格的值
                                  luckysheet.setCellValue(rowIdx, columnIndex,dateStr,{isRefresh:false});
                                  // 移除输入元素和时间选择器
                                  document.body.removeChild(inputElement);
                                  inputElement = null;
                                  //更新工期
                                  var startDate = luckysheet.getCellValue(rowIdx, 6);
                                  var endDate = luckysheet.getCellValue(rowIdx, 7);
                                  var days = calculateDaysBetweenDates(startDate, endDate);
                                  luckysheet.setCellValue(rowIdx, 4,days);
                                  luckysheet.setCellValue(rowIdx, 4, {fc:"#FF0000", isRefresh:true})

                                  // 返回false以阻止单元格进入编辑状态
                                  return false;
                              }
                            });

                            // 激活输入框以显示时间选择器
                            inputElement.click();
                            // 返回false以立即阻止编辑行为
                            return false;
                      }


                 },
                 rangePasteBefore: function (range, data) {
                    // console.info('cellUpdated', r, c, oldValue, newValue, isRefresh);
                    var rowCount = 0;
                    var sheets = luckysheet.getAllSheets();
                    var sheetData = sheets[0].data;
                    for (var i = 1; i < sheetData.length; i++) {
                        if (sheetData[i].length > 0) {
                            rowCount++;
                            // 判断该行是否完全为空
                            var isEmpty = sheetData[i].every(function(cell) {
                                return cell === null || cell === undefined || cell.v === '';
                            });
                            if (!isEmpty) {
                                luckysheet.setCellValue(i, 0, i);
                            }
                        }
                    }
                }


             }
        }
        luckysheet.create(options)
        luckysheet.setHorizontalFrozen(false)


    })





    // 初网络图部分
     // 创建节点
    nodes = new vis.DataSet([
        // {id: 1, label: '1', x: 0, y: 200},
        // {id: 2, label: '2', x: 200, y: 200},
        // {id: 3, label: '3', x: 200, y: 300},
        // {id: 4, label: '4', x: 400, y: 200},
        // {id: 5, label: '5', x: 600, y: 200},
        // {id: 6, label: '6', x: 800, y: 200},
        // {id: 7, label: '7', x: 200, y: 100},
        // {id: 8, label: '8', x: 800, y: 100},
        // {id: 9, label: '9', x: 800, y: 300},
        // {id: 10, label: '10', x: 900, y: 200},
    ]);

    // 创建边
    edges = new vis.DataSet([
        // {id: 'e1-2', from: 1, to: 2, label: 'A(15)', arrows: 'to', dashes: true},
        // {id: 'e1-3', from: 1, to: 3, label: 'B(20)', arrows: 'to', dashes: true, hidden: true},
        // {id: 'e2-4', from: 2, to: 4, label: 'C(10)', arrows: 'to'},
        // {id: 'e3-4', from: 3, to: 4, label: 'C(10)', arrows: 'to', hidden: true,},
        // {id: 'e4-5', from: 4, to: 5, label: 'D(15)', arrows: 'to', zigzag: true, hidden: true},
        // {id: 'e5-6', from: 5, to: 6, label: 'E(10)', arrows: 'to'},
        // {id: 'e1-7', from: 1, to: 7, label: 'F(15)', arrows: 'to', hidden: true, isTop:true},
        // {id: 'e7-4', from: 7, to: 4, label: 'F(15)', arrows: 'to', hidden: true, isTop: true},
        // {id: 'e5-8', from: 5, to: 8, label: 'G(15)', arrows: 'to', zigzag: true, hidden: true,isTop: true},
        // {id: 'e5-9', from: 5, to: 9, label: 'H(15)', arrows: 'to', zigzag: true, hidden: true},
        // {id: 'e6-10', from: 6, to: 10, label: 'I(15)', arrows: 'to'},
        // {id: 'e8-10', from: 8, to: 10, label: 'I(15)', arrows: 'to', zigzag: true, hidden: true,isTop: true},
        // {id: 'e9-10', from: 9, to: 10, label: 'I(15)', arrows: 'to', zigzag: true, hidden: true},
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
                size: 10,
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
            size: 10,
            font: {
                size: 8
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
    network = new vis.Network(container, data, options);

    $("#network canvas").attr("id","canvas");
    // 获取当前视图的中心位置
    var viewCenter = network.getViewPosition();
    var x = viewCenter.x;
    var y = viewCenter.y;

    // 设置新的视图中心位置，向上移动画布
    var newPosition = {x: x-200, y: y - 500}; // 向上移动 50 像素
    // network.moveTo({x:  x-500, y: y - 800, scale: 0.5});
    network.moveTo({
        // position: {x: x+600, y: y + 600}, // 新的视图中心位置
        scale: 1,                  // 新的缩放级别
        offset: {x: -300, y: -300},       // 视图中心的偏移量（可选）
    });

    // 自定义边绘制
    /*network.on("afterDrawing", function(ctx) {
        // var edgePositions = network.getPositions();
        edges.forEach(function(edge) {
            // console.log(edge)
            ctx.strokeStyle = edge.color!=null?edge.color.color:"black";
            ctx.linestyle = edge.dashes?'dashed':"";
            var from = edge.from;
            var to = edge.to;
            var from_pos = edge.from_pos;
            var to_pos = edge.to_pos;
            var hidden = edge.hidden;
            var isKeyPath = edge.is_key_path;
            if(hidden){
                ctx.lineWidth =  2;
                ctx.font="12px Arial";
            }
            // if(isVirtual){
            //     ctx.linestyle = 'dashed';
            // }
            // console.log(from,to)
            if (from && to) {
                ctx.lineWidth =  2;
                ctx.font="12px Arial";

                // 绘制折线段
                if (edge.zigzag) {
                    //直线折线
                    if(from.y == to.y){
                        var startX = to.x - midistX;
                        var startY = to.y ;
                        var midst = {x:startX, y:startY};
                        var start = {x:from.x+14, y:from.y};
                        var end = {x:to.x-14, y:to.y};
                        drawFreeline(ctx,start,midst,end)
                        //绘制箭头
                        drawArrowhead(ctx,end,0,15)

                    }else{
                        //上
                        if(topFlag){
                            //右下
                            if(from.y < to.y){
                                var startX = to.x-midistX;
                                var startY = from.y;
                                var start = {x:from.x+14, y:from.y};
                                var freeStart = {x:startX, y:startY};
                                var freeEnd = {x:to.x, y:from.y};
                                var end = {x:to.x, y:to.y-14};
                                ctx.beginPath();
                                ctx.moveTo(start.x, start.y);
                                ctx.lineTo(freeStart.x, freeStart.y);
                                drawFreeline(ctx,start,freeStart,freeEnd)
                                ctx.lineTo(freeEnd.x, freeEnd.y);
                                ctx.lineTo(end.x, end.y);
                                ctx.stroke();
                                //绘制箭头 90 度：π/2 180 度：π 270 度： 3π/2 360 度：2π
                                var rotate = Math.PI / 2;
                                drawArrowhead(ctx,end,rotate,15)
                                ctx.fillText(edge.label,(to.x-from.x)/2+from.x,from.y-10);
                            }else{
                                //上右
                                var start = {x:from.x, y:from.y-14};
                                var midst = {x:from.x, y:to.y};
                                var freeStart = {x:to.x-midistX, y:to.y};
                                var freeEnd = {x:to.x-14, y:to.y};
                                ctx.beginPath();
                                ctx.moveTo(start.x, start.y);
                                ctx.lineTo(midst.x, midst.y);
                                ctx.stroke();
                                drawFreeline(ctx,midst,freeStart,freeEnd)
                                ctx.lineTo(freeEnd.x, freeEnd.y);
                                ctx.stroke();

                                //绘制箭头
                                drawArrowhead(ctx,freeEnd,0,15)
                                //绘制文本
                                ctx.fillText(edge.label,(to.x-from.x)/2+from.x,to.y-10);
                            }
                        }else{
                            //右上
                            if(from.y > to.y){
                                var startX = to.x-midistX;
                                var startY = from.y;
                                var start = {x:from.x+14, y:from.y};
                                var freeStart = {x:startX, y:startY};
                                var freeEnd = {x:to.x, y:from.y};
                                var end = {x:to.x, y:to.y+14};
                                ctx.beginPath();
                                ctx.moveTo(start.x, start.y);
                                ctx.lineTo(freeStart.x, freeStart.y);
                                drawFreeline(ctx,start,freeStart,freeEnd)
                                // ctx.lineTo(freeEnd.x, freeEnd.y);
                                ctx.lineTo(end.x, end.y);
                                ctx.stroke();
                                //绘制箭头 90 度：π/2 180 度：π 270 度： 3π/2 360 度：2π
                                var rotate = Math.PI * 3 / 2;
                                drawArrowhead(ctx,end,rotate,15)
                                ctx.fillText(edge.label,(to.x-from.x)/2+from.x,from.y-10);
                            }else{
                                //下右
                                var start = {x:from.x, y:from.y+14};
                                var midst = {x:from.x, y:to.y};
                                var freeStart = {x:to.x-midistX, y:to.y};
                                var freeEnd = {x:to.x-14, y:to.y};
                                ctx.beginPath();
                                ctx.moveTo(start.x, start.y);
                                ctx.lineTo(midst.x, midst.y);
                                ctx.stroke();
                                drawFreeline(ctx,midst,freeStart,freeEnd)
                                ctx.lineTo(freeEnd.x, freeEnd.y);
                                ctx.stroke();

                                //绘制箭头
                                drawArrowhead(ctx,freeEnd,0,15)
                                //绘制文本
                                ctx.fillText(edge.label,(to.x-from.x)/2+from.x,to.y-10);
                            }
                        }
                    }
                }else{
                    //绘制直角线
                    if(from.y != to.y){
                        //上
                        if(topFlag){
                           // 右下
                           if(from.y < to.y){
                                var start = {x:from.x+14, y:from.y};
                                var midst = {x:to.x, y:from.y};
                                var end = {x:to.x, y:to.y-14};
                                strokeAngleLine(ctx,start,midst,end)
                                //绘制箭头 90 度：π/2 180 度：π 270 度： 3π/2 360 度：2π
                                var rotate = Math.PI / 2;
                                drawArrowhead(ctx,end,rotate,15)
                                ctx.fillText(edge.label,(to.x-from.x)/2+from.x,from.y-10);
                            }else{
                                //上右
                                var start = {x:from.x, y:from.y-14};
                                var midst = {x:from.x, y:to.y};
                                var end = {x:to.x-14, y:to.y};
                                strokeAngleLine(ctx,start,midst,end)
                                //绘制箭头
                                drawArrowhead(ctx,end,0,15)
                                //绘制文本
                                ctx.fillText(edge.label,(to.x-from.x)/2+from.x,to.y-10);
                            }
                        }else{
                            //右上
                            if(from.y > to.y){
                                var start = {x:from.x+14, y:from.y};
                                var midst = {x:to.x, y:from.y};
                                var end = {x:to.x, y:to.y+14};
                                strokeAngleLine(ctx,start,midst,end)
                                //绘制箭头 90 度：π/2 180 度：π 270 度： 3π/2 360 度：2π
                                var rotate = Math.PI * 3 / 2;
                                drawArrowhead(ctx,end,rotate,15)
                                ctx.fillText(edge.label,(to.x-from.x)/2+from.x,from.y-10);
                            }else{
                                //下右
                                var start = {x:from.x, y:from.y+14};
                                var midst = {x:from.x, y:to.y};
                                var end = {x:to.x-14, y:to.y};
                                strokeAngleLine(ctx,start,midst,end)
                                //绘制箭头
                                drawArrowhead(ctx,end,0,15)
                                //绘制文本
                                ctx.fillText(edge.label,(to.x-from.x)/2+from.x,to.y-10);
                            }
                        }

                    }
                }

            }
        });
        nodes.forEach(function(node) {
            var proName = node.proName;
            if(proName){
                var x = node.x;
                var y = node.y;
                ctx.fillText(proName,x-70,y-50);
            }
        })

    });*/

     // 自定义边绘制
    network.on("afterDrawing", function(ctx) {
        var edgePositions = network.getPositions();
        edges.forEach(function(edge) {
            // console.log(edge)
            ctx.strokeStyle = edge.color!=null?edge.color.color:"black";
            // ctx.linestyle = edge.dashes?'dashed':"";
            ctx.lineWidth =  2;
            ctx.font="12px Arial";
            var from = edge.from;
            var to = edge.to;
            var from_pos = edge.from_pos;
            var to_pos = edge.to_pos;
            var hidden = edge.hidden;
            var isKeyPath = edge.is_key_path;
            var isVirtual = edge.isVirtual;
            var isWavy = edge.is_wavy;
            var isActual = edge.isActual;
            if(isKeyPath){
                ctx.strokeStyle = 'red';
                ctx.lineWidth =  3;
            }
            if(isVirtual){
                ctx.setLineDash([5,5]);
            }else{
                ctx.setLineDash([]);
            }
            // console.log(ctx)
            if(from==null || to==null){
                if(isActual){
                    var start = convertePosition(from_pos[0],from_pos[1],500);
                    var end = convertePosition(to_pos[0],to_pos[1], 500);
                }else{
                    var start = convertePosition(from_pos[0],from_pos[1]);
                    var end = convertePosition(to_pos[0],to_pos[1]);
                }

                // var start = from_pos;
                // var end = to_pos;

                // console.log(start,end)
                if(from!=null && to==null){
                    if(start.x==end.x){
                        start.y = start.y-9;
                    }
                    if(start.y==end.y){
                        start.x = start.x+9;
                    }
                }
                if(to!=null && from==null){
                    if(start.x==end.x){
                        if(start.y<end.y){
                            end.y = end.y-9;
                        }else if(start.y>end.y){
                            end.y = end.y+9;
                        }
                    }
                    if(start.y==end.y){
                        end.x = end.x-9;
                    }
                }
                var nums = 0;
                if(to != null){
                    nums = 15;
                }
                if(isWavy){
                    // console.log(start,end)
                    drawFreeline_new(ctx,start,end,nums);
                }else{
                    // console.log(start,end)
                    strokeLine(ctx,start,end)
                }
                if (to != null){
                    var arrowStart = {x:end.x-7,y:end.y};
                    var rotate = 0;
                    if(start.x==end.x){
                        if(start.y<end.y){
                            rotate = Math.PI / 2;
                        }else if(start.y>end.y){
                            rotate = Math.PI * 3 / 2;
                        }

                    }
                    drawArrowhead(ctx,end,rotate,15)
                }
                ctx.fillText(edge.label,(end.x-start.x)/2+start.x,start.y-10);
            }

        });
        nodes.forEach(function(node) {
            // console.log(node)
            var proName = node.proName;
            if(proName){
                var x = node.x;
                var y = node.y;
                ctx.fillText(proName,x-70,y-50);
            }
        })

    });


    window.myGlobalVar = {
        numSquares:null,
        startDate: null,
    };
    // 添加时间刻度
    network.on("afterDrawing", function (ctx) {
        // var scale = 10; // 每10像素代表1天
        // var days = 80;
        // var startX = 0;
        // var topY = 20;
        // var bottomY = 680;
        //
        // ctx.strokeStyle = '#000000';
        // ctx.fillStyle = '#000000';
        // ctx.font = '10px Arial';
        // ctx.textAlign = 'center';
        //
        // // 绘制上下时间刻度
        // for (var i = 0; i <= days; i += 10) {
        //     var x = startX + i * scale;
        //
        //     // 上刻度
        //     ctx.beginPath();
        //     ctx.moveTo(x, topY);
        //     ctx.lineTo(x, topY - 5);
        //     ctx.stroke();
        //     ctx.fillText(i.toString(), x, topY - 10);
        //
        //     // 下刻度
        //     ctx.beginPath();
        //     ctx.moveTo(x, bottomY);
        //     ctx.lineTo(x, bottomY + 5);
        //     ctx.stroke();
        //     ctx.fillText(i.toString(), x, bottomY + 15);
        // }
        //
        // // 绘制刻度线
        // ctx.beginPath();
        // ctx.moveTo(startX, topY);
        // ctx.lineTo(startX + days * scale, topY);
        // ctx.moveTo(startX, bottomY);
        // ctx.lineTo(startX + days * scale, bottomY);
        // ctx.stroke();
        //
        // // 添加 "t(天)" 标签
        // ctx.fillText("t(天)", startX + days * scale + 20, topY);
        // ctx.fillText("t(天)", startX + days * scale + 20, bottomY);
        var instance = window.myGlobalVar;
        var numSquares = instance.numSquares;
        var startDate = instance.startDate;
        if(numSquares == null){
            numSquares = 80;
        }
        if(startDate == null){
            startDate = new Date();
        }
        drawSquares(ctx,numSquares,startDate);
    });

    // 添加悬停交互
    // network.on("hoverNode", function (params) {
    //     console.log('Hovering node:', params.node);
    // });
    //
    // network.on("hoverEdge", function (params) {
    //     console.log('Hovering edge:', params.edge);
    // });


});

function strokeAngleLine(ctx, start, midst, end) {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(midst.x, midst.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
}
////绘制箭头 90 度：π/2 180 度：π 270 度： 3π/2 360 度：2π
function drawArrowhead(ctx, end, rotate, size) {
    ctx.save();
    ctx.translate(end.x, end.y);
    ctx.rotate(rotate);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-size, size / 2);
    ctx.lineTo(-size, -size / 2);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fill();
    ctx.restore();
}
//绘制折线
function drawFreeline(ctx, start, midst, end){
    var dx = end.x - start.x;
    var dy = end.y - start.y;
    var length = Math.sqrt(dx * dx + dy * dy);
    var unitX = dx / length;
    var unitY = dy / length;
    var startX = midst.x;
    var startY = midst.y;
    var nums = (end.x - startX)/5;
    console.log(nums)
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(startX, startY);
    for (var i = 0; i < nums; i++) {
        startX += unitX * 5;
        startY += unitY * 5;
        ctx.lineTo(startX, i % 2 === 0 ? startY + unitX * 10 : startY - unitX * 10);
    }
    ctx.lineTo(end.x, end.y)
    ctx.stroke();
}

//绘制折线
function drawFreeline_new(ctx, start, end,nums){
    var dx = end.x - start.x;
    var dy = end.y - start.y;
    var length = Math.sqrt(dx * dx + dy * dy);
    var unitX = dx / length;
    var unitY = dy / length;
    var startX = start.x;
    var startY = start.y;
    // console.log(end.x, end.y)
    ctx.beginPath();
    ctx.lineTo(startX, startY);
    var i = 0
    while (startX + unitX * 5 < end.x-nums){
        startX += unitX * 5;
        startY += unitY * 5;
        ctx.lineTo(startX, i % 2 === 0 ? startY + unitX * 3 : startY - unitX * 3);
        i++
    }
    // for (var i = 0; i < 10; i++) {
    //     console.log(startX, startY)
    //
    // }
    ctx.lineTo(end.x-nums, end.y)
    ctx.stroke();
}
function strokeLine(ctx, start, end) {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
}

function draw(){
    var rowCount = 0;
    var sheets = luckysheet.getAllSheets();
    var sheetData = sheets[0].data;
    for (var i = 1; i < sheetData.length; i++) {
        if (sheetData[i].length > 0) {
            rowCount++;
            // 判断该行是否完全为空
            var isEmpty = sheetData[i].every(function(cell) {
                return cell === null || cell === undefined || cell.v === '';
            });
            if (!isEmpty) {
                luckysheet.setCellValue(i, 0, i);
            }
        }
    }
    var allsheets = luckysheet.getAllSheets();
    var sheetData = allsheets[0].data;
    var data = [];
    var identifiers = {};
    var seenValues = new Set(); // 用于跟踪已经添加过的值
    for (let i = 1; i < sheetData.length; i++) {
        var row = sheetData[i];
        if(areAllElementsEmpty(row, row.length)){
            break;
        }
        var value = row[1].m;
        // 检查值是否已经在 seenValues 集合中
        if (!seenValues.has(value)) {
            // 如果值不存在，则添加到 identifiers 和 seenValues 中
            identifiers[row[0].m] = value;
            seenValues.add(value);
        }
        console.log(identifiers)
        var rowData = {};
        rowData["identifier"] = row[0]==null ? "" : row[0].m;
        rowData["partition"] = row[1]==null ? "" : row[1].m;
        rowData["classify"] = row[2]==null ? "" : row[2].m;
        rowData["name"] = row[3]==null ? "" : row[3].m;
        rowData["duration"] = row[4]==null ? "" : row[4].m;
        rowData["prerequisite"] = row[5]==null ? "" : row[5].m;
        rowData["start_date"] = row[6]==null ? "" : row[6].m;
        rowData["end_date"] = row[7]==null ? "" : row[7].m;
        rowData["cost"] = row[10]==null ? "" : row[10].m;
        data.push(rowData);
    }
    var paydata = {
        "work_data":data
    }
    // console.log(paydata)
    // console.log(JSON.stringify(paydata))
    $.ajax({
        url: '/data',
        type: 'POST',
        data: JSON.stringify(paydata),
        cache: false,         //不设置缓存
        processData: false,  // 不处理数据
        contentType: "application/json",   // 不设置内容类型
        success: function(data) {
            console.log(data);
            console.log(JSON.stringify(data))
            var position = data.new_position;
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
            // drawSquares(numSquares, startDate);
            window.myGlobalVar.numSquares = numSquares;
            window.myGlobalVar.startDate = startDate;

            //网络图
            var info = {
                "position":position,
                "duration_date":duration_date
            }
            var convertedInfo = convertData(info, identifiers);
            // 新边
            var new_edges = [];
            var edge_info = data.edge_info;
            for (const edgeKey in edge_info) {
                if (edge_info.hasOwnProperty(edgeKey)) {
                    const edgeValue = edge_info[edgeKey];
                    var from_node = edgeValue["from_node"];
                    var to_node = edgeValue["to_node"];
                    var isVirtual = edgeValue["is_virtual"];
                    var from_date = duration_date[from_node][1];
                    var to_date = duration_date[to_node][0];
                    var from_pos = edgeValue["from_pos"];
                    var to_pos = edgeValue["to_pos"];
                    // console.log(from_pos,to_pos);
                    var hidden = false;
                    var is_freeline = false;
                    var isTop = false;
                    var days = calcuDays(from_date,to_date);
                    var midistX = 0;
                    if(days>1){
                        is_freeline = true;
                        hidden = true;
                        midistX = Math.abs(days)*squareSize;
                    }
                    // console.log(from_pos,to_pos)
                    if(from_pos[1] < 0 || to_pos[1] < 0){
                        isTop = true;
                    }
                    if(from_pos[1] != to_pos[1]){
                        hidden = true;
                    }
                    new_edges.push({
                            id: edgeKey, from: from_node, to: to_node, label: edgeKey,arrows: 'to',
                            zigzag: is_freeline,isVirtual: isVirtual,hidden: hidden,isTop:isTop,
                            color: {color: edgeValue["is_key_path"]?"red":"black",},
                            dashes:isVirtual?[5,5]:false,midistX:midistX,
                            is_key_path: edgeValue["is_key_path"]+""
                    });
                }
            }


            // 清空节点和边
            nodes.clear();
            edges.clear();
            nodes.add(convertedInfo);
            edges.add(new_edges);
            var nodesActual = [
                {id: 'n1', label: '1', x: 0, y: 200+500},
                {id: 'n2', label: '2', x: 200, y: 200+500},
                {id: 'n3', label: '3', x: 200, y: 300+500},
                {id: 'n4', label: '4', x: 400, y: 200+500},
                {id: 'n5', label: '5', x: 600, y: 200+500},
                {id: 'n6', label: '6', x: 800, y: 200+500},
            ];
            // 创建边
            var edgesActual = [
                {id: 'e1-2', from: 'n1', to: 'n2', label: 'A(15)', arrows: 'to'},
                {id: 'e1-3', from: 'n1', to: 'n3', label: 'B(20)', arrows: 'to'},
                {id: 'e2-4', from: 'n2', to: 'n4', label: 'C(10)', arrows: 'to'},
                {id: 'e3-4', from: 'n3', to: 'n4', label: 'C(10)', arrows: 'to'},
                {id: 'e4-5', from: 'n4', to: 'n5', label: 'D(15)', arrows: 'to'},
                {id: 'e5-6', from: 'n5', to: 'n6', label: 'E(10)', arrows: 'to'},
            ];
            nodes.add(nodesActual);
            edges.add(edgesActual);
        },
        error: function(xhr, status, error) {
            console.error('Error: ' + error);
        }
    });


}
//判断一个时间范围range1是否包含另一个时间范围range2
function isRangeContained(range1, range2) {
  return range1.start <= range2.start && range1.end >= range2.end;
}

function draw_new(){
    var rowCount = 0;
    var sheets = luckysheet.getAllSheets();
    var sheetData = sheets[0].data;
    var numbers = {};
    var identifiers = {};
    var seenValues = new Set(); // 用于跟踪已经添加过的值
    var deleteValues = new Set();
    for (var i = 1; i < sheetData.length; i++) {
        var row = sheetData[i];
        if (row.length > 0) {
            // 判断该行是否完全为空
            var isEmpty = row.every(function(cell) {
                return cell === null || cell === undefined || cell.v === '';
            });
            if (!isEmpty) {
                var projectName1 = row[3].m;
                if(projectName1 != "项目开始" && projectName1 != "项目结束"){
                    const leadingSpaces = projectName1.match(/^\s*/)[0];
                    const spaceCount = leadingSpaces.length;
                    for (var j = i+1; j < sheetData.length; j++) {
                        var row1 = sheetData[j];
                        if (row1.length > 0) {
                            // 判断该行是否完全为空
                            var isEmpty = row1.every(function(cell) {
                                return cell === null || cell === undefined || cell.v === '';
                            });
                            if (!isEmpty) {
                                var projectName2 = row1[3].m;
                                if (projectName2 != "项目开始" && projectName2 != "项目结束") {
                                    const leadingSpaces2 = projectName2.match(/^\s*/)[0];
                                    const spaceCount2 = leadingSpaces2.length;
                                    if (spaceCount2 > spaceCount) {
                                        luckysheet.setCellValue(j, 1, projectName1);
                                        deleteValues.add(i);
                                    } else {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    console.log("deleteValues",deleteValues)
    // 将Set转换为数组
    const rowsArray = Array.from(deleteValues);
    // 对数组进行降序排序
    const sortedRows = rowsArray.sort((a, b) => b - a);
    sortedRows.forEach((value) => {
        luckysheet.deleteRow(parseInt(value),parseInt(value));
    });
    // 刷新表格
    luckysheet.refresh();
    var sheets = luckysheet.getAllSheets();
    var sheetData = sheets[0].data;
    for (var i = 1; i < sheetData.length; i++) {
        var row = sheetData[i];
        if (row.length > 0) {
            rowCount++;
            // 判断该行是否完全为空
            var isEmpty = row.every(function(cell) {
                return cell === null || cell === undefined || cell.v === '';
            });
            if (!isEmpty) {
                numbers[row[0].m] = i;
                luckysheet.setCellValue(i, 0, i);
                var value = row[1].m;
                if (!seenValues.has(value)) {
                    // 如果值不存在，则添加到 identifiers 和 seenValues 中
                    identifiers[i] = value;
                    seenValues.add(value);
                }
            }
        }
    }
    // sheets = luckysheet.getAllSheets();
    // sheetData = sheets[0].data;
    for (var i = 1; i < sheetData.length; i++) {
        var row = sheetData[i];
        if (row.length > 0) {
            rowCount++;
            // 判断该行是否完全为空
            var isEmpty = row.every(function(cell) {
                return cell === null || cell === undefined || cell.v === '';
            });
            if (!isEmpty) {
                if(row[5] && row[5].m){
                    let cellValue = row[5].m;
                    var value = numbers[cellValue];
                    cellValue = String(cellValue);
                    if(cellValue.indexOf(",") !== -1||cellValue.indexOf("，") !== -1){
                        var values = cellValue.split(",") || cellValue.split("，");
                        value = "";
                        for(var j=0;j<values.length;j++){
                            var v = numbers[values[j]];
                            if(v){
                                value += v+",";
                            }
                        }
                        value = value.slice(0,-1);
                    }

                    luckysheet.setCellValue(i, 5, value);
                }

            }
        }
    }
    var data = [];
    var dataActual = [];
    var end_date = "";
    var start_date = "";
    for (let i = 1; i < sheetData.length; i++) {
        var row = sheetData[i];
        if(areAllElementsEmpty(row, row.length)){
            break;
        }
        if (row[3].m == "项目开始" || row[3].m == "项目结束") {
            continue;
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
        rowData["cost"] = row[10]==null ? "" : row[10].m;
        data.push(rowData);
        var rowDataActual = {...rowData};
        rowDataActual["start_date"] = row[8]==null ? "" : row[8].m;
        rowDataActual["end_date"] = row[9]==null ? "" : row[9].m;
        dataActual.push(rowDataActual);
        //开始时间和结束时间
        if(start_date == ""){
            start_date = row[6].m;
            end_date = row[7].m;
        }
        var existingEndDate = new Date(end_date);
        var newEndDate = new Date(row[7].m);
        var newEndDate2 = new Date(row[9].m);
        // 比较日期并更新 rowDataActual 的 end_date
        if (newEndDate > existingEndDate) {
           end_date = row[7].m;
        }
        if (newEndDate2 > existingEndDate) {
           end_date = row[9].m;;
        }
    }
    var paydata = {
        "work_data":data
    }
    var paydataActual = {
        "work_data":dataActual
    }
    console.log(start_date,end_date)
    var numSquares = calculateDaysBetweenDates(start_date,end_date)
    var startDate = new Date(start_date); // 例如，从 2023 年 12 月 1 日开始
    window.myGlobalVar.numSquares = numSquares+1;
    window.myGlobalVar.startDate = startDate;
    postDrawData(paydata, identifiers);
    var isActual = true;
    postDrawData(paydataActual, identifiers, isActual);

}

function postDrawData(paydata,identifiers, isActual=false){
    console.log(JSON.stringify(paydata))
    $.ajax({
        url: '/data-new',
        type: 'POST',
        data: JSON.stringify(paydata),
        cache: false,         //不设置缓存
        processData: false,  // 不处理数据
        contentType: "application/json",   // 不设置内容类型
        success: function(data) {
            console.log(data);
            var position = data.position;
            //网络图
            var info = {
                "position":position,
            }
            // 新边
            var new_edges = [];
            var edge_info = data.edge_info;
            for (const edgeKey in edge_info) {
                if (edge_info.hasOwnProperty(edgeKey)) {
                    var isHidden = false;
                    if(edgeKey.endsWith("零")||edgeKey.endsWith("一")){
                        isHidden = true;
                    }
                    const edgeValue = edge_info[edgeKey];
                    var coord = edgeValue["coord"];
                    var from_pos = coord[0];
                    var to_pos = coord[1];
                    var from_node = getKeyByValue(position, from_pos);
                    var to_node = getKeyByValue(position, to_pos);
                    var id = edgeKey;
                    if(isActual){
                        id = edgeKey+"_actual";
                        if(from_node!=null){
                            from_node = from_node+"_actual";
                        }
                        if(to_node!=null){
                            to_node = to_node+"_actual";
                        }

                    }
                    var isVirtual = edgeValue["is_virtual"];
                    var is_wavy = edgeValue["is_wavy"];
                    var is_key = edgeValue["is_key"];
                    var name = edgeValue["name"];
                    new_edges.push({
                            id: id, from: from_node, to: to_node, label: name,arrows: 'to',
                            isVirtual: isVirtual,hidden: isHidden, is_key_path: is_key, is_wavy: is_wavy,
                            from_pos:from_pos,to_pos:to_pos,
                            color: {color: is_key?"red":"black",},
                            lineWidth: {lineWidth: is_key?3:2},
                            dashes:isVirtual?[5,5]:false,
                            isActual:isActual,
                    });
                }
            }

            var convertedInfo = convertData(info,identifiers,isActual);
            // 清空节点和边
            if(!isActual){
                nodes.clear();
                edges.clear();
            }
            nodes.add(convertedInfo);
            edges.add(new_edges);
        },
        error: function(xhr, status, error) {
            console.error('Error: ' + error);
        }
    });
}

function getKeyByValue(obj, value) {
    const entry = Object.entries(obj).find(([k, v]) => JSON.stringify(v) === JSON.stringify(value));
    return entry ? entry[0] : null;
}

//判断数组是否全部为空
function areAllElementsEmpty(row, i) {
    return row.slice(0, i + 1).every(element => element === null);
}

function convertePosition(x, y, deviate=200) {
    var domPosition =  {x: x*squareSize, y: y*50+deviate};
    return  domPosition;

}

function convertData(info,identifiers,isActual) {
    // var squareSize = 5;
    // 创建一个空数组来存储转换后的数据
    var convertedData = [];

    // 遍历 position 对象中的每个属性
    for (var key in info.position) {
        if (info.position.hasOwnProperty(key)) {
            var id = key;
            if(isActual){
                id = key + "_actual";
                var domPosition = convertePosition(info.position[key][0],info.position[key][1],500);
            }else{
                var domPosition = convertePosition(info.position[key][0],info.position[key][1]);
            }
            // var domPosition = DOMtoCanvas(info.position[key][0]*squareSize+5,info.position[key][1]*50+200)

            // 构造新的数据对象并添加到数组中
            convertedData.push({
                id: id ,
                label: key,
                x: domPosition.x,
                y: domPosition.y,
                proName:identifiers[key],
            });
        }
    }
    // 返回转换后的数据数组
    return convertedData;
}

function convertDataActual(info,identifiers) {
    // var squareSize = 5;
    // 创建一个空数组来存储转换后的数据
    var convertedData = [];

    // 遍历 position 对象中的每个属性
    for (var key in info.position) {
        if (info.position.hasOwnProperty(key)) {
            var domPosition = DOMtoCanvas(info.position[key][0]*squareSize+10,info.position[key][1]*100+800)
            // 构造新的数据对象并添加到数组中
            convertedData.push({
                id: key ,
                label: key,
                x: domPosition.x,
                y: domPosition.y,
                proName:identifiers[key],
            });
        }
    }
    // 返回转换后的数据数组
    return convertedData;
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
//计算两个日期之间的天数差(不取绝对值)
function calcuDays(dateString1, dateString2) {
  // 将日期字符串转换为 Date 对象
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  // 计算两个日期之间的差异（毫秒）
  const timeDifference = date2.getTime() - date1.getTime();

  // 将差异转换为天数
  const daysDifference = timeDifference / (1000 * 3600 * 24);

  // 返回相差的天数，不取绝对值
  return daysDifference;
}

// 定义一个函数来绘制方块
function drawSquares(ctx, numSquares, startDate) {

    var currentDay = startDate.getDate();
    var currentMonth = startDate.getMonth();
    var year = startDate.getFullYear();
    var day = currentDay;
    // 获取年份
    var monthX = 0;
    var yearX = 0;
    // 循环绘制方块和文本
    for (var i = 0; i < numSquares; i++) {
        // 计算每个方块的 x 坐标
        var x = i * squareSize;

        // 如果日期超过了当月天数，则进入下一月
        var days = new Date(startDate.getFullYear(), currentMonth + 1, 0).getDate();
        if (day > days) {
            day = 1;
            // 绘制月份
            // 绘制方块框线
            var position = DOMtoCanvas(monthX,squareSize);
            monthX = position.x;
            var monthY = position.y;
            ctx.strokeRect(monthX, monthY, x-monthX, squareSize);
            var monthText = new Date(startDate.getFullYear(), currentMonth, 1).toLocaleString('default', { month: 'long' });
            var monthTextWidth = ctx.measureText(monthText).width;
            var textPos = DOMtoCanvas(monthX + (x - monthX - monthTextWidth) / 2,squareSize + (squareSize + 6) / 2);
            ctx.fillText(monthText, textPos.x, textPos.y);
            monthX = x;
            currentMonth++;
            // 更新年份
            if (currentMonth === 12) {
                currentMonth = 0;
                // 绘制年份
                var position = DOMtoCanvas(yearX,0);
                yearX = position.x;
                var monthY = position.y;
                ctx.strokeRect(yearX, monthY, x-yearX, squareSize);
                var yearTextWidth = ctx.measureText(year).width;
                var textPos = DOMtoCanvas(yearX + (squareSize - yearTextWidth) / 2,6);
                ctx.fillText(year, textPos.x, textPos.y);
                year++;
                yearX = x;
            }
        }

        // 设置文本内容
        var text = "" + day;
        day++;

        // 设置文本样式
        ctx.font = "6px Arial";
        ctx.fillStyle = "black";

        // 计算文本的宽度和高度
        var textWidth = ctx.measureText(text).width;
        var textHeight = 6;

        // 计算文本的 x 和 y 坐标，使其居中于方块
        var textPosition = DOMtoCanvas(x + (squareSize - textWidth) / 2,squareSize*2 + (squareSize + textHeight) / 2);
        var textX = textPosition.x;
        var textY = textPosition.y;
        // 设置框线样式
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;

        var rectPosition = DOMtoCanvas(x,squareSize*2);
        // 绘制方块框线
        ctx.strokeRect(rectPosition.x, rectPosition.y, squareSize, squareSize);

        // 绘制文本
        ctx.fillText(text, textX, textY);

    }
    // 绘制最后一月的方块框线
    var monthPosition = DOMtoCanvas(monthX,squareSize);
    ctx.strokeRect(monthPosition.x, monthPosition.y, x-monthX+squareSize, squareSize);
    var monthText = new Date(startDate.getFullYear(), currentMonth, 1).toLocaleString('default', { month: 'long' });
    var monthTextWidth = ctx.measureText(monthText).width;
    var textPos = DOMtoCanvas(monthX + (x - monthX - monthTextWidth) / 2,squareSize + (squareSize + 6) / 2);
    ctx.fillText(monthText, textPos.x, textPos.y);
    // 绘制最后一年的方块框线
    var yearPosition = DOMtoCanvas(yearX,0);
    ctx.strokeRect(yearPosition.x, yearPosition.y, x-yearX+squareSize, squareSize);
    var yearTextWidth = ctx.measureText(year).width;
    var yearTextPos = DOMtoCanvas(yearX + (x - yearX - yearTextWidth) / 2,6);
    ctx.fillText(year, yearTextPos.x, yearTextPos.y);

}

function getData(){
    var allsheets = luckysheet.getAllSheets();
    let jsonString = JSON.stringify(allsheets);
    console.log(jsonString);
}
//将 Canvas 坐标转换为 DOM 坐标
function canvasToDOM(x,y){
    var domPosition = network.canvasToDOM({x: x, y: y});
    return domPosition;
}
//将 DOM 坐标转换为 Canvas 坐标
function DOMtoCanvas(x,y){
    // var canvasPosition  = network.DOMtoCanvas({x: x, y: y});
    return {x: x, y: y};
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
    // var dataURL = networkCanvas.toDataURL();
    // console.log(dataURL);
    // var fullQuality = canvas.toDataURL("image/png");
    // var a = document.createElement("a");
    // document.body.appendChild(a);
    // a.download = "network" + ".png";
    // a.href = fullQuality;
    // a.click();



}

function exportSheet(){
    var allsheets = luckysheet.getAllSheets();
    var sheetData = allsheets[0].data;
    var sheetJson = JSON.stringify(sheetData);
    console.log(sheetJson);
    str = '';
    for(let i = 0 ; i < sheetData.length ; i++ ){
        if(areAllElementsEmpty(sheetData[i], sheetData[i].length)){
            break;
        }
        for(const key in sheetData[i]){
            var item = sheetData[i][key];
            console.log(item)
            str+=`${item==null ? "" :item.m + '\t'},`;
        }
        str+='\n';
    }
    // encodeURIComponent解决中文乱码
    const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
    // 通过创建a标签实现
    const link = document.createElement("a");
    link.href = uri;
    // 对下载的文件命名
    link.download =  "下载数据.csv";
    link.click();
}
