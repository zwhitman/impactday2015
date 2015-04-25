var dc = new google.maps.LatLng(38.8951, -77.0367);
var atlanta = new google.maps.LatLng(41.850033, -87.6500523);
var chicago = new google.maps.LatLng(41.850033, -87.6500523);
var hattiesburg = new google.maps.LatLng(41.850033, -87.6500523);
var minneapolis = new google.maps.LatLng(41.850033, -87.6500523);
var cost_mesa = new google.maps.LatLng(41.850033, -87.6500523);

function relocate(lat, long) {
    var latLng = new google.maps.LatLng(lat, long);
    map.panTo(latLng);
}


function toggleLayer(this_layer) {
    if (this_layer.getMap()) {
        this_layer.setMap(null);
    } else {
        this_layer.setMap(map);
    }
}

function initialize() {
    where = generateWhere;
    //tableId = "1snOwQvAsyXbnnkLq5X18GRQvAeon2j49JxMfNej0";
    map_canvas = document.getElementById('map_canvas');
    map_options = {
        center: dc,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(map_canvas, map_options);
    layer = new google.maps.FusionTablesLayer({
        options: {
            styleId: 2,
            templateId: 3
        }
    });
    map.data.loadGeoJson("https://services1.arcgis.com/fcrLbZIfZI20fNqr/arcgis/rest/services/Volunteer_2015/FeatureServer/0/query?where=&objectIds=&time=&geometry=%7B%22xmin%22%3A-15914952.527620565%2C%22ymin%22%3A1983252.9978282703%2C%22xmax%22%3A-1953270.6891671233%2C%22ymax%22%3A4918434.883978258%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%7D%7D&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Meter&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=%7Bwkid%3A+4326%7D&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&quantizationParameters=&f=pgeojson&token=");
    trafficLayer = new google.maps.TrafficLayer();
    transitLayer = new google.maps.TransitLayer();
    bikeLayer = new google.maps.BicyclingLayer();
    districtLayer = new google.maps.FusionTablesLayer({
        query: {
            select: "'geometry'",
            from: "1v7p9EYIYA8DGMWUyrj5TAthisJc3-4UPk0fxheNq"
        },
        templateId: 48
    })
    var iconBase = 'icon/';
    var icons = {
        animals: {
            name: 'Animals',
            icon: iconBase + 'agriculture.png'
        },
        civicAffairs: {
            name: 'Civic & Public Affairs',
            icon: iconBase + 'museum.png'
        },
        commEconDevelopment: {
            name: 'Community Development',
            icon: iconBase + 'realestate.png'
        },
        culture: {
            name: 'Culture & Arts',
            icon: iconBase + 'arts.png'
        },
        disaster: {
            name: 'Disaster Relief',
            icon: iconBase + 'hospitals.png'
        },
        education: {
            name: 'Education',
            icon: iconBase + 'schools.png'
        },
        environment: {
            name: 'Environment',
            icon: iconBase + 'tree.png'
        },
        health: {
            name: 'Health',
            icon: iconBase + 'pharmacy_plus.png'
        },
        armedForces: {
            name: 'Veterans',
            icon: iconBase + 'police.png'
        }
    };
    var legend = document.getElementById('legend');
    for (var key in icons) {
        var type = icons[key];
        var name = type.name;
        var icon = type.icon;
        var div = document.createElement('div');
        div.innerHTML = '<img src="' + icon + '" height="20px" width="20px"> ' + name;
        legend.appendChild(div);
    }


    //basemap style
    stylesArray =
        map.set('styles', [
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [
                    { color: '#7F7F7F' },
                    { weight: 0.2 }
                ]
            },
            {
                featureType: 'road',
                elementType: 'labels',
                stylers: [
                    { saturation: -100 },
                    { invert_lightness: false }
                ]
            },
            {
                featureType: 'landscape',
                elementType: 'geometry',
                stylers: [
                    { hue: '#ffffff' },
                    { gamma: 0.4 },
                    { saturation: 99 },
                    { lightness: 99 }
                ]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [
                    { color: '#AADDF1' },
                    { weight: 0.7 }
                ]
            },
            {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [
                    { hue: '#7bce6c' },
                    { lightness: 5 },
                    { saturation: 50 }
                ]
            }
        ]);

    //filter section
    //watch for clicks
    filterMap(layer, tableId, map);

    queryChecks = [
        'animals_check',
        'civic_check',
        'comm_check',
        'culture_check',
        'disaster_check',
        'education_check',
        'environment_check',
        'health_check',
        'armed_check',
        'sbv_check'
    ];
    for (var i = 0; i < queryChecks.length; i++) {
        google.maps.event.addDomListener(document.getElementById(queryChecks[i]), 'click', function () {
            filterMap(layer, tableId, map);
        })
    }

    //filter function
    function filterMap(layer, tableId, map) {
        where = generateWhere();

        if (where) {
            if (!layer.getMap()) {
                layer.setMap(map);
            }
            layer.setOptions({
                query: {
                    select: 'Latitude',
                    from: tableId,
                    where: where
                }
            });
        } else {
            layer.setMap(null);
        }
    }

    //generate the where clause
    function generateWhere() {
        var sbv = document.getElementsByName('sbv');
        if (sbv[0].checked) {
            sbv2 = "Yes";
        } else {
            sbv2 = "No";
        }

        filter = [];
        categories = document.getElementsByName('category');
        for (var i = 0, category; category = categories[i]; i++) {
            if (category.checked) {
                var categoryName = category.value.replace(/'/g, '\\\'');
                filter.push("'" + categoryName + "'");
            }
        }
        var where = '';
        if (filter.length && sbv2 == "Yes") {
            where = "'Social Cause' IN (" + filter.join(',') + ')' + "AND 'SBV?' IN ('" + sbv2 + "')";
        }
        else if (filter.length && sbv2 == "No") {
            where = "'Social Cause' IN (" + filter.join(',') + ')';
        }
        return where;
    }


    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
}


//load map after
google.maps.event.addDomListener(window, 'load', initialize);
	
