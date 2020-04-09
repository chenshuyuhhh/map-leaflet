// create popup，自定义计算弹窗
L.ComputePopup = L.Popup.extend({
    // options:{

    // },
    _initLayout: function () {
        var prefix = 'leaflet-popup',
            container = this._container = L.DomUtil.create('div',
                prefix + ' ' + (this.options.className || '') +
                ' leaflet-zoom-animated');

        var wrapper = container;
        this._contentNode = L.DomUtil.create('div', prefix + '-content', wrapper);

        L.DomEvent
            .disableClickPropagation(wrapper)
            // .disableScrollPropagation(this._contentNode)
            .on(wrapper, 'contextmenu', L.DomEvent.stopPropagation);
    },

});

//var popupContent = " <div class='computepopup'><div id='popup-span-left'><p class='popup-title' style='color: #d4d4d4;'>六项污染物</p><div style='padding-top: 20px;padding-bottom: 15px;'><button type='button' id='hour-button'>时</button><button type='button' id='day-button'>日</button></div><div class='div-value'><p>PM2.5 <img src='images/line2.eps'><input type='text'></p><p>PM10 <img src='images/line2.eps'><input type='text'></p></div><div class='div-value'><p>&ensp;O3   &ensp; <img src='images/line2.eps'><input type='text'></p><p>&ensp;CO  &ensp; <img src='images/line2.eps'><input type='text'></p></div><div class='div-value'><p> SO2  &ensp; <img src='images/line2.eps'><input type='text'></p><p> NO2&ensp; <img src='images/line2.eps'><input type='text'></p></div><button id='button-caculate'>计算</button></div><div id='popup-span-right'><p class='popup-title' style='color: #d4d4d4;'>首要污染物</p><div id='div-index'><span><p class='composite-index-value'>78.23</p><p class='composite-index-word'> 综合指数</p></span><span style='width: 0.7px;height: 48px; background: #d4d4d4;'></span><span><p class='composite-index-value'>89</p><p class='composite-index-word'> AQI指数</p></span><div id='div-value-chart'></div></div></div></div>"
// html 转 string
// https://www.html.cn/tool/html2string/
var popupContent = '\
<div class=\'compute-popup\'>\
       <div id=\'popup-title-max\'>\
           <span class=\'popup-title\'>六项污染物</span>\
           <span>\
               <span class=\'popup-title\'>首要污染物</span>\
               <span id=\'main-pollutants\'></span>\
           </span>\
           <img id=\'popup-close\' src=\'images/close.png\'>\
       </div>\
       <div id=\'popup-bottom\'>\
           <div id=\'popup-span-left\'>\
               <div style=\'padding-top: 12px;\'>\
                   <button type=\'button\' id=\'hour-button\'>时</button>\
                   <button type=\'button\' id=\'day-button\'>日</button>\
               </div>\
               <div class=\'div-value\'>\
                   <p> PM2.5 <img src=\'images/line2.eps\'><input id=\'PM2.5-input\' type=\'text\'></p>\
                   <p> PM10 <img src=\'images/line2.eps\'><input id=\'PM10-input\' type=\'text\'></p>\
               </div>\
               <div class=\'div-value\'>\
                   <p>&ensp;&ensp;O3&ensp; <img src=\'images/line2.eps\'><input id=\'O3-input\' type=\'text\'></p>\
                   <p>&ensp;CO&ensp; <img src=\'images/line2.eps\'><input id=\'CO-input\' type=\'text\'></p>\
               </div>\
               <div class=\'div-value\'>\
                   <p> &ensp;SO2&ensp; <img src=\'images/line2.eps\'><input id=\'SO2-input\' type=\'text\'></p>\
                   <p> NO2&ensp; <img src=\'images/line2.eps\'><input id=\'NO2-input\' type=\'text\'></p>\
               </div>\
               <button id=\'button-caculate\'>计算</button>\
           </div>\
           <div id=\'popup-span-right\'>\
               <div>\
                   <span>\
                       <p id=\'composite-index-value\' style=\'font-size: 16px;\'></p>\
                       <p style=\'font-size: 10px;\'> 综合指数</p>\
                   </span>\
                   <span style=\'width: 0.7px;height: 35px; background: #d4d4d4;\'></span>\
                   <span>\
                       <p id=\'aqi-index-value\' style=\'font-size: 16px;\'></p>\
                       <p style=\'font-size: 10px;\'>AQI指数</p>\
                   </span>\
               </div>\
               <div id=\'div-value-chart\'></div>\
           </div>\
       </div>\
   </div>\
'

// 弹窗的功能交互
function popupComput(latlng) {
    var popup = (new L.ComputePopup(
        { className: 'compute-popup-max', maxWidth: '420px', closeButton: false, autoClose: false, closeOnEscapeKey: false, closeOnClick: false }))
        .setLatLng(latlng)
        .setContent(popupContent) // 弹窗内部的html文档内容
        .openOn(map);

    // 基于准备好的dom，初始化echarts实例
    var popup_chart = echarts.init(document.getElementById('div-value-chart'));

    // 指定图表的配置项和数据
    // var pie_data = [
    //     { value: 235, name: 'PM2.5' },
    //     { value: 274, name: 'PM10' },
    //     { value: 310, name: 'CO' },
    //     { value: 335, name: 'SO2' },
    //     { value: 400, name: 'O3' },
    //     { value: 120, name: 'NO2' }
    // ];
    // var option = new PieOptions()
    // // 使用刚指定的配置项和数据显示图表。
    // myChart.setOption(option);

    // 关闭按钮
    $("#popup-close").click(function () {
        popup.remove();
        on_compute_click = 0;
    });

    // 时按钮
    $("#hour-button").click(function () {
        this.style.backgroundColor = '#ff67ba';
        this.style.color = '#1e1e1e'
        $("#day-button").css('background-color', '#1e1e1e');
        $("#day-button").css('color', '#d4d4d4');
    });

    // 日按钮
    $("#day-button").click(function () {
        this.style.backgroundColor = '#ff67ba';
        this.style.color = '#1e1e1e';
        $("#hour-button").css('background-color', '#1e1e1e');
        $("#hour-button").css('color', '#d4d4d4');
    });

    // 计算按钮
    $("#button-caculate").click(function () {
        // 指定图表的配置项和数据
        // var data = [
        //     { value: 235, name: 'PM2.5' },
        //     { value: 224, name: 'PM10' },
        //     { value: 310, name: 'CO' },
        //     { value: 335, name: 'SO2' },
        //     { value: 200, name: 'O3' },
        //     { value: 420, name: 'NO2' }];
        var six_data = getSixItems();
        if (six_data == null) {
            alert('请您正确输入数据');
        } else { // 输入合法
            // 指数计算
            getAQI(six_data);

            // 将数据处理成饼图数据
            var data_array = [];
            for (var p = 0; p < six_data.length; p++) {
                data_array.push(
                    { value: six_data[p], name: aqi_name[p] }
                );
            }
            // 饼图设置
            var option = new PieOptions(data_array);
            // 使用刚指定的配置项和数据显示图表。
            popup_chart.setOption(option);
        }
    })
}
// // add bindCustomPopup
// L.Layer.include({

//     // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
//     // Binds a popup to the layer with the passed `content` and sets up the
//     // neccessary event listeners. If a `Function` is passed it will receive
//     // the layer as the first argument and should return a `String` or `HTMLElement`.
//     bindCustomPopup: function (content, options) {

//         if (content instanceof L.Popup) {
//             L.setOptions(content, options);
//             this._popup = content;
//             content._source = this;
//         } else {
//             if (!this._popup || options) {
//                 this._popup = new L.ComputePopup(options, this);
//             }
//             this._popup.setContent(content);
//         }

//         if (!this._popupHandlersAdded) {
//             this.on({
//                 click: this._openPopup,
//                 remove: this.closePopup,
//                 move: this._movePopup
//             });
//             this._popupHandlersAdded = true;
//         }

//         return this;
//     }
// });