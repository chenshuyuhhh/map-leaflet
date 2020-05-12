function initDemoMap() {
  var baidu_map = L.tileLayer.baidu({ layer: 'vec' });
  var baidu_satellite = L.tileLayer.baidu({ layer: 'img' });
  var baidu_map_big = L.tileLayer.baidu({ layer: 'vec', bigfont: true });
  var baidu_satellite_big = L.tileLayer.baidu({ layer: 'img', bigfont: true });
  var black = L.tileLayer.baidu({ layer: 'custom', customid: 'dark' });
  var blue = L.tileLayer.baidu({ layer: 'custom', customid: 'midnight' });

  var map = L.map('map', {
    crs: L.CRS.Baidu,
    center: [39.13, 117.2],
    zoom: 8,
    layers: [baidu_map]
  });

  var baseMaps = {
    "百度地图": baidu_map,
    "百度卫星": baidu_satellite,
    "百度地图-大字体": baidu_map_big,
    "百度卫星-大字体": baidu_satellite_big,
    "自定义样式-黑色地图": black,
    "自定义样式-蓝色地图": blue
  };

  // 控制层，baselayers为底图更换， addTo 将 control 和 map 绑定
  var layerControl = L.control.layers(baseMaps).addTo(map);
  // 初始化map定位
  map.setView([34, 105], 4.6);

  return {
    map: map,
    layerControl: layerControl
  };
}

// demo map
var mapStuff = initDemoMap();
var map = mapStuff.map; // 获取地图
var layerControl = mapStuff.layerControl; // 获取 control