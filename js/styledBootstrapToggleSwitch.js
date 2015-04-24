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
$("[name='sbv']").bootstrapSwitch('onText', 'YES');
$("[name='sbv']").bootstrapSwitch('offText', 'NO');
$("[name='sbv']").on('switchChange.bootstrapSwitch', function (event, state) {
    filterMap(layer, tableId, map);
});

$("[id='animals_check']").bootstrapSwitch('labelText', '<img src="icon/agriculture.png" height="20px" width="20px">');
$("[id='animals_check']").on('switchChange.bootstrapSwitch', function (event, state) {
    filterMap(layer, tableId, map);
});

$("[id='comm_check']").bootstrapSwitch('labelText', '<img src="icon/realestate.png" height="20px" width="20px">');
$("[id='comm_check']").on('switchChange.bootstrapSwitch', function (event, state) {
    filterMap(layer, tableId, map);
});

$("[id='armed_check']").bootstrapSwitch('labelText', '<img src="icon/police.png" height="20px" width="20px">');
$("[id='armed_check']").on('switchChange.bootstrapSwitch', function (event, state) {
    filterMap(layer, tableId, map);
});

$("[id='disaster_check']").bootstrapSwitch('labelText', '<img src="icon/hospitals.png" height="20px" width="20px">');
$("[id='disaster_check']").on('switchChange.bootstrapSwitch', function (event, state) {
    filterMap(layer, tableId, map);
});

$("[id='civic_check']").bootstrapSwitch('labelText', '<img src="icon/museum.png" height="20px" width="20px">');
$("[id='civic_check']").on('switchChange.bootstrapSwitch', function (event, state) {
    filterMap(layer, tableId, map);
});

$("[id='education_check']").bootstrapSwitch('labelText', '<img src="icon/schools.png" height="20px" width="20px">');
$("[id='education_check']").on('switchChange.bootstrapSwitch', function (event, state) {
    filterMap(layer, tableId, map);
});

$("[id='health_check']").bootstrapSwitch('labelText', '<img src="icon/pharmacy_plus.png" height="20px" width="20px">');
$("[id='health_check']").on('switchChange.bootstrapSwitch', function (event, state) {
    filterMap(layer, tableId, map);
});

$("[id='environment_check']").bootstrapSwitch('labelText', '<img src="icon/tree.png" height="20px" width="20px">');
$("[id='environment_check']").on('switchChange.bootstrapSwitch', function (event, state) {
    filterMap(layer, tableId, map);
});

$("[id='culture_check']").bootstrapSwitch('labelText', '<img src="icon/arts.png" height="20px" width="20px">');
$("[id='culture_check']").on('switchChange.bootstrapSwitch', function (event, state) {
    filterMap(layer, tableId, map);
});

$("[id='traffic_check']").bootstrapSwitch('labelText', '<img src="icon/cabs.png" height="20px" width="20px">');
$("[id='traffic_check']").on('switchChange.bootstrapSwitch', function (event, state) {
    toggleLayer(trafficLayer)
});

$("[id='rail_check']").bootstrapSwitch('labelText', '<img src="icon/rail.png" height="20px" width="20px">');
$("[id='rail_check']").on('switchChange.bootstrapSwitch', function (event, state) {
    toggleLayer(transitLayer)
});

$("[id='bike_check']").bootstrapSwitch('labelText', '<img src="icon/cycling.png" height="20px" width="20px">');
$("[id='bike_check']").on('switchChange.bootstrapSwitch', function (event, state) {
    toggleLayer(bikeLayer)
});

$("[id='congress_check']").bootstrapSwitch('labelText', '<img src="icon/govtbldgs.png" height="20px" width="20px">');
$("[id='congress_check']").on('switchChange.bootstrapSwitch', function (event, state) {
    toggleLayer(districtLayer)
});
