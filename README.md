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

2.QQMap.setMarker

3.QQMap.setOverlay

4.QQMap.setPolyLine

5.QQMap.setInfoWindow

6.QQMap.setZoom

7.QQMap.setCenter

8.QQMap.setMapBounds

9.QQMap.translate
