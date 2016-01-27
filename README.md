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
1.QQMap.init(selector,options)

| 参数        |类型 |默认|备注           |
| ------------- |:-------------:|:-------------:|:-------------:|
| selector     |必传 | | 设置放置地图的元素，使用jq式选择器，例如：QQMap.init("#map",...) |
| options.center      |必传 | | 设置地图展示的中心点，传入一个包含经纬度的数组。例如：center:[39.916527, 116.397128] |
| options.zoom      |选传 | 0 | 初始化地图缩放级别，默认为级别0。 |
| options.backgroundColor | 选传 | rgb(229, 227, 223) |用作地图的背景颜色。当用户进行平移时，如果尚未载入图块，则显示此颜色。仅在地图初始化时，才能设置此选项。|
| options.panControl      | 选传|true | 地图平移控件，若为false则不显示平移控件。|
| options.zoomControl     | 选传 |true | 地图缩放控件，若为false则不显示缩放控件。|
| options.scaleControl | 选传|true | 地图缩放控件，若为false则不显示缩放控件。|

示例：

    var map = QQMap.init(".map", {
        center: [39.916527, 116.397128],
        zoom: 12,
        backgroundColor:"#fa8919",
        panControl:true,
        zoomControl:true,
        scaleControl:false
    });

2.QQMap.setMarker(options)

| 参数        |类型 |默认|备注           |
| ------------- |:-------------:|:-------------:|:-------------:|
| options.position     |必传 | | 设置图标的位置。|
| options.url      |必传 | | url是图标的自定义图片链接。|
| options.size      |选传 | [1,1] | size是图标尺寸，该尺寸为显示图标的实际尺寸。 |
| options.origin | 选传 | [0,0] |origin是切图坐标，该坐标是相对于图片左上角的相对像素坐标。|
| options.anchor      | 选传|[0,0] | anchor是锚点坐标，描述经纬度点对应图标中的位置。|
| options.scaleSize     | 选传 |[0,0] | 缩放尺寸，用于拉伸或缩小原图片时使用，该尺寸是用来改变整个图片的尺寸。|
| options.shape | 选传| | 设置Marker的响应范围。|

例如：

    var marker = QQMap.setMarker({
        position: [39.916527, 116.397128],
        url: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png',
        size: [150, 150],
        origin: [0, 0],
        anchor: [75, 75],
        scaleSize: [150, 150],
        shape: {
            coords: [0, 0, 50],
            type: "circle"
            //当type为"circle"时，coords的形式为[x1,y1,r]，其中x1，y1是圆中心点，r是圆的半径；
            //当type为"poly"时，coords的形式为[x1,y1,x2,y2...xn,yn]，其中每一对x，y表示一个多边形的顶点位置；
            //当type为"rect"时，coords的形式为[x1,y1,x2,y2]，x1，y1表示矩形左上角顶点位置，x2，y2表示矩形右下角
        }
    });
    
绑定/移除事件：

| 方法        |参数 |
| ------------- |:-------------:|
| .on(type,function)     |type：事件类型；function：事件触发后的回调函数 |
| .off()      |无 |

    
3.QQMap.setOverlay

| 参数        |类型 |默认|备注           |
| ------------- |:-------------:|:-------------:|:-------------:|
| options.position     |必传 | | 设置图标的位置。|
| options.url      |必传 | | url是图标的自定义图片链接。|
| options.size      |选传 | [1,1] | size是图标尺寸，该尺寸为显示图标的实际尺寸。 |
| options.origin | 选传 | [0,0] |origin是切图坐标，该坐标是相对于图片左上角的相对像素坐标。|
| options.anchor      | 选传|[0,0] | anchor是锚点坐标，描述经纬度点对应图标中的位置。|
| options.scaleSize     | 选传 |[0,0] | 地图缩放控件，若为false则不显示缩放控件。|
| options.shape | 选传| | 缩放尺寸，用于拉伸或缩小原图片时使用，该尺寸是用来改变整个图片的尺寸。|


4.QQMap.setPolyLine

5.QQMap.setInfoWindow

6.QQMap.setZoom

7.QQMap.setCenter

8.QQMap.setMapBounds

9.QQMap.translate
