import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

L.TileLayer.ChinaProvider = L.TileLayer.extend({
    initialize: function (type, options) {
        // (type, Object)
        var providers = L.TileLayer.ChinaProvider.providers;

        var parts = type.split('.');

        var providerName = parts[0];
        var mapName = parts[1];
        var mapType = parts[2];

        var url = providers[providerName][mapName][mapType];
        options.subdomains = providers[providerName].Subdomains;

        L.TileLayer.prototype.initialize.call(this, url, options);
    }
});

L.TileLayer.ChinaProvider.providers = {
    TianDiTu: {
        Normal: {
            Map: 'https://t{s}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=174705aebfe31b79b3587279e211cb9a',
            Annotion: 'https://t{s}.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=174705aebfe31b79b3587279e211cb9a'
        },
        Satellite: {
            Map: 'https://t{s}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=174705aebfe31b79b3587279e211cb9a',
            Annotion: 'https://t{s}.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=174705aebfe31b79b3587279e211cb9a'
        },
        Terrain: {
            Map: 'https://t7.tianditu.gov.cn/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=174705aebfe31b79b3587279e211cb9a',
            Annotion: 'https://t{s}.tianditu.gov.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}&tk=174705aebfe31b79b3587279e211cb9a'
        },
        Subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
    },

    MapABC: {
        Normal: {
            Map: 'http://emap{s}.mapabc.com/mapabc/maptile?&x={x}&y={y}&z={z}'
        },
        Subdomains: ['0', '1', '2', '3']
    },

    GaoDe: {
        Normal: {
            Map: 'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
        },
        Satellite: {
            Map: 'https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
            Annotion: 'https://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
        },
        Subdomains: ['1', '2', '3', '4']
    },

    Geoq: {
        Normal: {
            Map: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
            Color: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetColor/MapServer/tile/{z}/{y}/{x}',
            PurplishBlue: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
            Gray: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
            Warm: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}',
            Cold: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetCold/MapServer/tile/{z}/{y}/{x}'
        },
        Subdomains: []
    },

    Google: {
        Normal: {
            Map: 'http://www.google.cn/maps/vt?lyrs=m&gl=cn&x={x}&y={y}&z={z}&apistyle=,s.t:3|p.v:off,s.t:4|p.v:off,s.t:2|p.v:off,s.t:5|p.c:ffffffff,s.t:5|s.e:l.t.f|p.c:ff000000',
            Map2: 'http://mt1.google.cn/vt/lyrs=m&scale=2&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&apistyle=s.t:3%7Cp.v:off,s.t:18%7Cp.v:on,s.t:18%7Cs.e:g.s%7Cp.c:ff000000'
        },
        Satellite: {
            Map: 'http://mt3.google.cn/vt/lyrs=s&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}'
        },
        Subdomains: []
    },

    GoogleCN: {
        Normal: {
            Map: 'http://mt{s}.google.cn/vt/lyrs=m&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}'
        },
        Subdomains: ['1', '2', '3']
    },

    ArcGIS: {
        Satellite: {
            Map: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            Annotion: 'http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'
        },
        Subdomains: []
    }
};

L.tileLayer.chinaProvider = function (type, options) {
    return new L.TileLayer.ChinaProvider(type, options);
};

export default L;
