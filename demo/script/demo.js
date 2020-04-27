function initDemoMap() {
  // 底图1
  var Esri_WorldImagery = L.tileLayer(
    "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, " +
        "AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
    }
  );

  // 底图2
  var Esri_DarkGreyCanvas = L.esri.tiledMapLayer({
    url: 'http://server.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer'
  });
  // L.tileLayer(
  //   "http://{s}.sm.mapstack.stamen.com/" +
  //   "(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/" +
  //   "{z}/{x}/{y}.png",
  //   {
  //     attribution:
  //       "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, " +
  //       "NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
  //   }
  // );

  // 地图层更换，为了简便在此只保留卫星地图
  var baseLayers = {
    "Grey Canvas": Esri_DarkGreyCanvas, // 地图名：底图2
   // "Satellite": Esri_WorldImagery, // 地图名：底图1
  };

  // map 成员变量，初始为卫星地图
  var map = L.map("map", {
    layers: [Esri_DarkGreyCanvas],
    crs: L.CRS.EPSG4326,
  });

  // 控制层，baselayers为底图更换， addTo 将 control 和 map 绑定
  var layerControl = L.control.layers(baseLayers).addTo(map);
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