#QQMapUtils#
一个简化腾讯地图操作的小工具
##GET STARTED##
1.使用QQMapUtils之前，需要在你的html中引用腾讯地图，然后再引入qqMap.js。

    <script src="http://map.qq.com/api/js?v=2.exp&key=5LIBZ-WGHWO-I2LWD-SXGRK-G2D6J-5LB6O&libraries=geometry,convertor"></script>
    <script src="qqMap.js"></script>
2.引入腾讯地图之后，用QQMapUtils初始化地图配置。

    var map = QQMap.init(".map", {
        center: [39.916527, 116.397128],
        zoom: 12
    });
##Customizing##
1.QQMap.init

| 参数        |类型 |备注           |
| ------------- |:-------------:|:-------------:|
| container     |必传 | 设置放置地图的元素，使用jq式选择器，例如：QQMap.init("#map",...) |
| center      |必传 | 设置地图展示的中心点，传入一个包含经纬度的数组。例如：center:[39.916527, 116.397128] |
| zoom      |选传 | 初始化地图缩放级别，默认为级别0。 |
| backgroundColor |选传 | 用作地图的背景颜色。当用户进行平移时，如果尚未载入图块，则显示此颜色。仅在地图初始化时，才能设置此选项。|
| panControl      |选传 | 地图平移控件，若为false则不显示平移控件。|
| zoomControl      |选传 | 地图缩放控件，若为false则不显示缩放控件。|
| scaleControl |选传 | 地图缩放控件，若为false则不显示缩放控件。|


2.QQMap.setMarker

3.QQMap.setOverlay

4.QQMap.setPolyLine

5.QQMap.setInfoWindow

6.QQMap.setZoom

7.QQMap.setCenter

8.QQMap.setMapBounds

9.QQMap.translate
