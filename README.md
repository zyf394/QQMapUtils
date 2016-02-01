#QQMapUtils#
一个简化腾讯地图操作的小工具
##如何开始？##
1.使用QQMapUtils之前，需要在你的html中引用腾讯地图，然后再引入qqMap.js。

    <script src="http://map.qq.com/api/js?v=2.exp&key=5LIBZ-WGHWO-I2LWD-SXGRK-G2D6J-5LB6O&libraries=geometry,convertor"></script>
    <script src="qqMap.js"></script>
2.引入腾讯地图之后，用QQMapUtils初始化地图配置。

    var map = QQMap.init(".map", {
        center: [39.916527, 116.397128],
        zoom: 12
    });
##如何配置？##
1.QQMap.init(selector,options)

初始化地图，只能给一个元素放置地图。以下所有方法必须在执行init后才能生效。

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

在地图上设置自定义图标

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
| .off()      |此处无需传参数 |

例如：

    var marker = QQMap.setMarker(...);
    marker.on("click",function(){
       alert(1)
    });
    marker.off();//qqMap里marker只能全部解除绑定，无法指定解除某个绑定的事件
    
3.QQMap.setOverlay(options)

在地图上设置自定义浮层

| 参数        |类型 |默认|备注           |
| ------------- |:-------------:|:-------------:|:-------------:|
| options.content     |必传 | | content是浮层的内容元素。|
| options.position      |必传 | | position是浮层在地图中经纬度位置。|
| options.offSet      |选传 | [0,0] | offSet是浮层相对于position的偏移量。 |
| options.zIndex | 选传 |  |zIndex是浮层在地图上的z-index层级。|
| options.style      | 选传| | style是浮层的自定义样式。|

例如：

    var overlay = QQMap.setOverlay({
        content: "<span>哈哈哈</span>",
        position: [39.916527, 116.397128],
        offSet: [200, 200],
        zIndex: 999,
        style: "width:100px"
    });

绑定/移除事件：

| 方法        |参数 |
| ------------- |:-------------:|
| .on(type,function)     |type：事件类型；function：事件触发后的回调函数 |
| .off(type,function)      |type：事件类型；function：事件触发后的回调函数 |
| .getDom() |无 |

例如：

    var overlay = QQMap.setOverlay(...);
    function clickFunction(){
        alert(1)
    }
    overlay.on("click",clickFunction);
    overlay.off("click",clickFunction);
    var overlayDom = overlay.getDom();
    
4.QQMap.setPolyLine(options)

在地图上设置折线

| 参数        |类型 |默认|备注           |
| ------------- |:-------------:|:-------------:|:-------------:|
| options.path     |必传 | | path是折线上的点集合，必须为[ [lat1,lng1], [lat2,lng2], [lat3,lng3]...]形式的二维数组。|
| options.clickable      |选传 |true | 设置折线是否可点击。|
| options.strokeWeight      |选传 | 1 | 设置折线粗细。 |
| options.strokeDashStyle | 选传 | solid |设置折线形式，只有solid（实线）、dash（虚线）两种。|
| options.visible      | 选传|true | 设置折线是否可见。|
| options.zIndex      | 选传|0 | 设置折线的z-index层级。|

绑定/移除事件：

| 方法        |参数 |
| ------------- |:-------------:|
| .on(type,function)     |type：事件类型；function：事件触发后的回调函数 |
| .off()      |此处无需传参数 |

例如：

    var polyLine = QQMap.setPolyLine(...);
    polyLine.on("click",function(){
       alert(1)
    });
    polyLine.off();//qqMap里polyLine只能全部解除绑定，无法指定解除某个绑定的事件

5.QQMap.setInfoWindow(options)

在地图上设置自定义弹窗

| 参数        |类型 |默认|备注           |
| ------------- |:-------------:|:-------------:|:-------------:|
| options.content     |必传 | | content是弹窗的内容元素。|
| options.position      |必传 | | position是弹窗在地图中经纬度位置。|

例如：

    var infoWindow = QQMap.setInfoWindow({
        content: "<span>我是弹窗</span>",
        position: [39.916527, 116.397128]
    })

6.QQMap.setZoom(num)

设置地图缩放级别

例如：

    QQMap.setZoom(20)
    
7.QQMap.setCenter(lat,lng)

设置地图中心坐标。（lat：纬度，lng：经度）

| 参数        |类型 |默认|备注           |
| ------------- |:-------------:|:-------------:|:-------------:|
| lat     |必传 | | 纬度。|
| lng      |必传 | | 经度。|

例如：

    QQMap.setCenter(40,50)

8.QQMap.setBoundsPoint(lat,lng)

设置地图显示边界内包含的点，需配合QQMap.setMapBounds使用。（lat：纬度，lng：经度）

| 参数        |类型 |默认|备注           |
| ------------- |:-------------:|:-------------:|:-------------:|
| lat     |必传 | | 纬度。|
| lng      |必传 | | 经度。|

例如：

    QQMap.setBoundsPoint(40,50)
    
9.QQMap.setMapBounds()

设置地图显示边界。需先使用QQMap.setBoundsPoint(lat,lng)设置边界内包含的点后才能生效。

例如：

    var path = [
        [39.916527, 116.387128],
        [39.926627, 116.397158],
        [39.936528, 116.397428]
    ];
    for(var i =0 ;i<path.length;i++){
        QQMap.setBoundsPoint(path[i][0],path[i][1])
    }
    QQMap.setMapBounds();
    
10.QQMap.translate(options)

将其他地图服务商的坐标批量转换成腾讯地图经纬度坐标。

| 参数        |类型 |默认|备注           |
| ------------- |:-------------:|:-------------:|:-------------:|
| position     |必传 | | 原始坐标位置。|
| type      |必传 | | type用于说明是哪个服务商的坐标。 type的可选值为 1：gps经纬度；2：搜狗经纬度；3：百度经纬度；4：mapbar经纬度；5：google经纬度；6：搜狗墨卡托。|
| callBack      |选传 | | 转换完成后回调函数，转换后的结果保存在参数data中。|

例如：

    QQMap.translate({
        position:[39.916527, 116.387128],
        type:1,
        callBack:function(data){
            console.log(data)
        }
    })
