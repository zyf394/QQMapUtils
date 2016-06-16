/**
 * Created by zhongyufei on 2016/1/10.
 */
var QQMap = {
    map: null,

    LatLngBounds : new qq.maps.LatLngBounds(),

    /*初始化地图*/
    init: function (container, options) {
        var mapContainer;
        //选择元素
        if (typeof container == "string") {
            mapContainer = document.querySelector(container)
        }else {
            mapContainer = container;
        }

        //简化center的操作
        if(options.center){
            options.center = new qq.maps.LatLng(options.center[0], options.center[1])
        }

        this.map = new qq.maps.Map(mapContainer, options);
        

        return this.map
    },

    /*在地图上绘制图标*/
    setMarker: function (options) {
        var position,
            marker,
            size,
            origin,
            anchor,
            scaleSize,
            markerShape,
            listener;

        //设置必填项
        this.logError(options,["position","url"]);

        /*必传参数，设置图标的位置和所在的地图*/
        position = new qq.maps.LatLng(options.position[0], options.position[1]);
        marker = new qq.maps.Marker({
            position: position,
            zIndex: options.zIndex !== void(0) ? options.zIndex : 0,//选传
            map: options.map || this.map
        });
        size = options.size ? new qq.maps.Size(options.size[0], options.size[1]) : null;
        origin = options.origin ? new qq.maps.Point(options.origin[0], options.origin[1]) : null;
        anchor = options.anchor ? new qq.maps.Point(options.anchor[0], options.anchor[1]) : null;
        scaleSize = options.scaleSize ? new qq.maps.Size(options.scaleSize[0], options.scaleSize[1]) : null;

        /*选传参数，设置Marker自定义图标的属性*/
        var markerIcon = new qq.maps.MarkerImage(
            options.url,//(必传) url是图标的自定义图片链接，，
            size,//(可选) size是图标尺寸，该尺寸为显示图标的实际尺寸
            origin,//(可选) origin是切图坐标，该坐标是相对于图片左上角默认为（0,0）的相对像素坐标
            anchor,//(可选) anchor是锚点坐标，描述经纬度点对应图标中的位置
            scaleSize//(可选) 缩放尺寸，用于拉伸或缩小原图片时使用，该尺寸是用来改变整个图片的尺寸。
        );
        marker.setIcon(markerIcon);

        /*选传参数，设置Marker的响应范围*/
        if (options.shape !== void(0)) {
            markerShape = new qq.maps.MarkerShape(options.shape.coords, options.shape.type);
            marker.setShape(markerShape);
        }

        /*绑定事件*/
        marker.on = function (type, callBack) {
            listener = qq.maps.event.addListener(marker, type, callBack);
        };

        /*移除事件*/
        marker.off = function () {
            qq.maps.event.removeListener(listener);
        };

        return marker;
    },

    /*在地图上绘制自定义元素*/
    setOverlay: function (options) {
        var Overlay,
            instance;

        Overlay = new Function;

        Overlay.prototype = new qq.maps.Overlay();

        //实现这个接口来初始化自定义的Dom元素，此方法会在setMap(map)后被调用，panes和projection属性也将被初始化。
        Overlay.prototype.construct = function () {
            this.div = document.createElement("div");
            this.div.innerHTML = options.content;

            //设置panes的层级，overlayMouseTarget可接收点击事件
            var panes = this.getPanes();
            panes.overlayMouseTarget.appendChild(this.div);

        };

        //实现draw接口来绘制和更新自定义的dom元素
        Overlay.prototype.draw = function () {
            var overlayProjection,
                positionLatLng,
                pixel,
                divStyle,
                offsetLeft,
                offsetTop;

            //设置覆盖物容器的相对像素坐标
            overlayProjection = this.getProjection();//获取覆盖物容器对象
            positionLatLng = new qq.maps.LatLng(options.position[0], options.position[1]);
            pixel = overlayProjection.fromLatLngToDivPixel(positionLatLng);//将坐标转换为像素值

            //设置自定义Dom元素的style样式
            divStyle = this.div.style;

            offsetLeft = options.offSet !== void(0) ? options.offSet[0] : 0;//如果不设置左偏移量，则左偏移量为0
            offsetTop = options.offSet !== void(0) ? options.offSet[1] : 0;//如果不设置上偏移量，则上偏移量为0

            divStyle.position = "absolute";
            divStyle.left = pixel.x + offsetLeft + "px";
            divStyle.top = pixel.y + offsetTop + "px";
            divStyle.zIndex = options.zIndex;
            divStyle.cssText += options.style;
        };

        //实现destroy接口来删除自定义的Dom元素，此方法会在setMap(null)后被调用
        Overlay.prototype.destroy = function () {
            if (this.div.parentNode) {
                this.div.onclick = null;
                this.div.parentNode.removeChild(this.div);
                this.div = null
            }
        };

        //实现on接口来绑定自定义Dom元素的事件
        Overlay.prototype.on = function (type, callback) {
            this.div.addEventListener(type, callback, false);
        };

        //实现on接口来解绑自定义Dom元素的事件
        Overlay.prototype.off = function (type, callback) {
            this.div.removeEventListener(type, callback, false);
        };

        //实现getDom接口来允许开发者使用自定义元素的DOM对象
        Overlay.prototype.getDom = function () {
            return this.div;
        };

        instance = new Overlay();

        instance.setMap(options.map || this.map);

        return instance;

    },

    /*在地图上绘制折线*/
    setPolyLine: function (options) {
        var me = this,
            polyLine,
            pathLatLng,
            listener;

        /*所有坐标数组转换为qqMap坐标对象,path必须为[ [lat1,lng1], [lat2,lng2], [lat3,lng3]...]形式的二维数组*/
        pathLatLng = options.path.map(function (item, index) {
            var lat = item[0],
                lng = item[1];
            if(typeof lat !== "number" || typeof lng !== "number"){
                console.error("传入polyline的坐标必须是number类型.");
                return;
            }

            return new qq.maps.LatLng(lat, lng)
        });

        /*绘制折线*/
        polyLine = new qq.maps.Polyline({
            path: pathLatLng,//必传
            clickable: options.clickable !== void(0) ? options.clickable : true,//选传
            cursor: options.cursor !== void(0) ? options.cursor : "pointer",//选传
            strokeColor: options.strokeColor !== void(0) ? options.strokeColor : "#2691ea",//选传，"#2691ea"为qq地图默认折线颜色；可以设置折线的透明度:strokeColor: new qq.maps.Color(0, 0, 0, 0.5),
            strokeWeight: options.strokeWeight !== void(0) ? options.strokeWeight : 1,//选传
            strokeDashStyle: options.strokeDashStyle !== void(0) ? options.strokeDashStyle : "solid",//选传
            visible: options.visible !== void(0) ? options.visible : true,//选传
            zIndex: options.zIndex !== void(0) ? options.zIndex : 0,//选传
            map: options.map || me.map
        });

        /*绑定事件*/
        polyLine.on = function (type, callBack) {
            listener = qq.maps.event.addListener(polyLine, type, callBack);
        };

        /*移除事件*/
        polyLine.off = function () {
            qq.maps.event.removeListener(listener);
        };

        return polyLine;
    },

    /*在地图上绘制多边形*/
    setPolygon: function (options) {
        var me = this,
            polygon,
            pathLatLng,
            listener;

        /*所有坐标数组转换为qqMap坐标对象,path必须为[ [lat1,lng1], [lat2,lng2], [lat3,lng3]...]形式的二维数组*/
        pathLatLng = options.path.map(function (item, index) {
            var lat = item[0],
                lng = item[1];
            if(typeof lat !== "number" || typeof lng !== "number"){
                console.error("传入polygon的坐标必须是number类型.");
                return;
            }

            return new qq.maps.LatLng(lat, lng)
        });

        /*绘制折线*/
        polygon = new qq.maps.Polygon({
            path: pathLatLng,//必传
            clickable: options.clickable !== void(0) ? options.clickable : true,//选传
            cursor: options.cursor !== void(0) ? options.cursor : "pointer",//选传
            fillColor: options.fillColor !== void(0) ? options.fillColor : "#2691ea",//选传，"#2691ea"为qq地图默认折线颜色；可以设置折线的透明度:strokeColor: new qq.maps.Color(0, 0, 0, 0.5),
            strokeColor: options.strokeColor !== void(0) ? options.strokeColor : "#2691ea",//选传，"#2691ea"为qq地图默认折线颜色；可以设置折线的透明度:strokeColor: new qq.maps.Color(0, 0, 0, 0.5),
            strokeWeight:options.strokeWeight !== void(0) ?　options.strokeWeight : 1,
            visible: options.visible !== void(0) ? options.visible : true,//选传
            zIndex: options.zIndex !== void(0) ? options.zIndex : 0,//选传
            map: options.map || me.map
        });

        /*绑定事件*/
        polygon.on = function (type, callBack) {
            listener = qq.maps.event.addListener(polyLine, type, callBack);
        };

        /*移除事件*/
        polygon.off = function () {
            qq.maps.event.removeListener(listener);
        };

        return polygon;
    },

    /*在地图上绘制信息框*/
    setInfoWindow: function (options) {
        var me = this,
            position,
            info;

        position = new qq.maps.LatLng(options.position[0], options.position[1]);
        info = new qq.maps.InfoWindow({
            map: me.map
        });
        info.open();
        info.setContent(options.content);
        info.setPosition(position);

        return info;
    },
    /*设置地图缩放比例*/
    setZoom: function (options) {
        var map = options.map || this.map;
        map.zoomTo(options.zoom);
        return this;
    },

    /*设置地图中心点位置*/
    setCenter: function (options) {
        var map = options.map || this.map;
        map.panTo(new qq.maps.LatLng(options.center[0],options.center[1]));
        return this;
    },

    /*设置地图显示边界内包含的点*/
    setBoundsPoint:function(lat,lng){
        var qqLatLng = new qq.maps.LatLng(lat,lng);
        this.LatLngBounds.extend(qqLatLng);
    },

    /*设置地图显示边界*/
    setMapBounds: function (options) {
        var me = this,
            map = (options && options.map) || me.map;
        map.fitBounds(me.LatLngBounds);
    },

    /*将坐标转换为火星坐标*/
    translate: function (options) {
        qq.maps.convertor.translate(new qq.maps.LatLng(options.position[0], options.position[1]), options.type, function (data) {
            if(typeof  options.callBack == "function"){
                options.callBack(data);
            }
        });
    },

    logError:function(options,params){
        if(Array.isArray(params)){
            for(var i = 0 ;i < params.length ; i++){
                if(!(params[i] in options) && options[params[i]] === void(0)){
                    console.error("'"+ params[i] +"'是必传参数.");
                    return;
                }
            }
        }else {
            console.error("'params'是必传参数.");
        }
    }
};

if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    define(function () {
        return QQMap;
    });
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = QQMap;
}