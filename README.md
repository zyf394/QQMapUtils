#QQMapUtils#
一个简化腾讯地图操作的小工具
##GET STARTED##
使用QQMapUtils之前，需要在你的html中引用腾讯地图，然后再引入qqMap.js。
    <script src="http://map.qq.com/api/js?v=2.exp&key=5LIBZ-WGHWO-I2LWD-SXGRK-G2D6J-5LB6O&libraries=geometry,convertor"></script>
    <script src="qqMap.js"></script>
引入腾讯地图之后，用QQMapUtils初始化地图配置。

    var map = QQMap.init(".map", {
        center: [39.916527, 116.397128],
        zoom: 12
    });
