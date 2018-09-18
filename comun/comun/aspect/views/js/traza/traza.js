/* global Ext, lMask, Highcharts, format_Fecha, futureLang */
Ext.QuickTips.init();
windowopen = false;
var openWindow, d = new Date();
var btnbuscarauth = new Ext.Button({
    text: '<i class="fa fa-search-plus bluedark-button"></i> ' + futureLang.lbBuscar,
    handler: function() {
        BuscarAuth('buscar');
    }
});
var btnlimpiarauth = new Ext.Button({
    text: '<i class="fa fa-paint-brush bluedark-button"></i> ' + futureLang.lbLimpiar,
    handler: function() {
        BuscarAuth('limpiar');
    }
});
var btnbuscardetalles = new Ext.Button({
    text: '<i class="fa fa-search-plus bluedark-button"></i> ' + futureLang.lbBuscar,
    handler: function() {
        BuscarDetalles('buscar');
    }
});
var btnlimpiardetalles = new Ext.Button({
    text: '<i class="fa fa-paint-brush bluedark-button"></i> ' + futureLang.lbLimpiar,
    handler: function() {
        BuscarDetalles('limpiar');
    }
});
var stUserAuth = new Ext.data.SimpleStore({
    fields: ['idusuario', 'nombre']
});
var stVistaDetallada = new Ext.data.SimpleStore({
    fields: ['idusuario', 'nombre']
});
var cbUserAuth = new Ext.form.ComboBox({
    store: stUserAuth,
    valueField: 'idusuario',
    displayField: 'nombre',
    typeAhead: true,
    mode: 'local',
    forceSelection: true,
    triggerAction: 'all',
    emptyText: futureLang.lbSeleccione,
    selectOnFocus: true
});
var cbVistaDetallada = new Ext.form.ComboBox({
    store: stVistaDetallada,
    valueField: 'idusuario',
    displayField: 'nombre',
    typeAhead: true,
    mode: 'local',
    forceSelection: true,
    triggerAction: 'all',
    emptyText: futureLang.lbSeleccione,
    selectOnFocus: true
});
var dffechaiauth = new Ext.form.DateField({
    allowBlank: true,
    format: 'd/m/Y',
    id: 'startfechaiauth',
    vtype: 'daterange',
    endDateField: 'endfechafauth'
});
var dffechafauth = new Ext.form.DateField({
    allowBlank: false,
    format: 'd/m/Y',
    id: 'endfechafauth',
    value: new Date().format('d/m/Y'),
    maxValue: new Date(),
    vtype: 'daterange',
    startDateField: 'startfechaiauth'
});
var dffechaidetalle = new Ext.form.DateField({
    allowBlank: true,
    format: 'd/m/Y',
    id: 'startfechaidetalle',
    vtype: 'daterange',
    endDateField: 'endfechafdetalle'
});
var dffechafdetalle = new Ext.form.DateField({
    allowBlank: false,
    format: 'd/m/Y',
    id: 'endfechafdetalle',
    value: new Date().format('d/m/Y'),
    maxValue: new Date(),
    vtype: 'daterange',
    startDateField: 'startfechaidetalle'
});
var stdetalletraza = new Ext.data.GroupingStore({
    url: 'loadDetllesTraza',
    autoLoad: true, baseParams: {start: 0, limit: 20},
    reader: new Ext.data.JsonReader({
        root: 'campos',
        id: 'idRecord',
        totalProperty: 'totalRecords'
    }, [{name: 'idtraza'}, {name: 'usuario'}, {name: 'tipotraza'}, {name: 'accion'}, {name: 'origen'}, {name: 'url'}, {name: 'ip'}, {name: 'fecha'}, {name: 'hora'}, {name: 'memoria'}, {name: 'tiempor'}, {name: 'parametros'}]),
    listeners: {
        load: function(store, records, options) {
            lMask.hide();
        }
    }
});
var smdetalletraza = new Ext.grid.RowSelectionModel({
    id: 'smdetalletraza',
    singleSelect: true,
    listeners: {
        'rowselect': function(sm, rowIndex, record) {
            Ext.getCmp('gpdetalletraza').getView().addRowClass(rowIndex, "negrita");
        },
        'rowdeselect': function(sm, rowIndex, record) {
            Ext.getCmp('gpdetalletraza').getView().removeRowClass(rowIndex, "negrita");
        }
    }
});
var gpdetalletraza = new Ext.grid.GridPanel({
    id: 'gpdetalletraza',
    store: stdetalletraza,
    sm: smdetalletraza,
    border: false,
    loadMask: true,
    autoExpandColumn: 'url',
    columns: [{
            header: futureLang.lbUsuario,
            width: 100,
            dataIndex: 'usuario'
        },
        {
            header: futureLang.lbTipo,
            width: 100,
            sortable: true,
            dataIndex: 'tipotraza'
        },
        {
            header: futureLang.lbAccion,
            width: 150,
            sortable: true,
            dataIndex: 'accion'
        },
        {
            header: futureLang.lbOrigen,
            width: 130,
            sortable: true,
            dataIndex: 'origen'
        },
        {
            id: 'url',
            header: futureLang.lbUrl,
            width: 75,
            sortable: true,
            dataIndex: 'url'
        },
        {
            header: futureLang.lbIp,
            sortable: true,
            width: 100,
            align: 'right',
            dataIndex: 'ip'
        },
        {
            header: futureLang.lbFecha,
            width: 80,
            sortable: true,
            dataIndex: 'fecha',
            renderer: format_Fecha
        },
        {
            header: futureLang.lbTiempo,
            width: 80,
            sortable: true,
            dataIndex: 'hora'
        },
        {
            header: futureLang.lbMemoria,
            width: 60,
            sortable: true,
            hidden: true,
            dataIndex: 'memoria'
        },
        {
            header: futureLang.lbTiempoResp,
            width: 60,
            sortable: true,
            hidden: true,
            dataIndex: 'tiempor'
        }],
    tbar: [new Ext.Toolbar.TextItem(' '), new Ext.Toolbar.TextItem(futureLang.lbUsuario + ':'), cbVistaDetallada, new Ext.Toolbar.TextItem(' '), new Ext.Toolbar.TextItem(futureLang.lbDesde + ':'), dffechaidetalle, new Ext.Toolbar.TextItem(' '), new Ext.Toolbar.TextItem(futureLang.lbHasta + ':'), dffechafdetalle, btnbuscardetalles, btnlimpiardetalles],
    bbar: new Ext.Feet.PagingToolbar({
        pageSize: 20,
        store: stdetalletraza,
        displayInfo: true
    })
});
var stdetalleauth = new Ext.data.GroupingStore({
    url: 'loadDetllesAuth',
    baseParams: {start: 0, limit: 20}, autoLoad: true,
    reader: new Ext.data.JsonReader({
        root: 'campos', id: 'idRecord', totalProperty: 'totalRecords'
    }, [{name: 'idtraza'}, {name: 'usuario'}, {name: 'tipotraza'}, {name: 'accion'}, {name: 'origen'}, {name: 'url'}, {name: 'ip'}, {name: 'fecha'}, {name: 'hora'}, {name: 'memoria'}, {name: 'tiempor'}, {name: 'opsystem'}, {name: 'browser'}, {name: 'parametros'}]),
    listeners: {
        load: function() {
            lMask.hide();
        }
    }
});
var smdetalleauth = new Ext.grid.RowSelectionModel({
    id: 'smdetalleauth', singleSelect: true,
    listeners: {
        'rowselect': function(sm, rowIndex, record) {
            Ext.getCmp('gpdetalleauth').getView().addRowClass(rowIndex, "negrita");
        },
        'rowdeselect': function(sm, rowIndex, record) {
            Ext.getCmp('gpdetalleauth').getView().removeRowClass(rowIndex, "negrita");
        }
    }
});
var gpdetalleauth = new Ext.grid.GridPanel({
    id: 'gpdetalleauth',
    store: stdetalleauth,
    sm: smdetalleauth,
    border: false,
    loadMask: true,
    autoExpandColumn: 'url',
    columns: [{
            header: futureLang.lbUsuario,
            width: 100,
            dataIndex: 'usuario'
        },
        {
            header: futureLang.lbTipo,
            width: 100,
            sortable: true,
            dataIndex: 'tipotraza'
        },
        {
            header: futureLang.lbAccion,
            width: 150,
            sortable: true,
            dataIndex: 'accion'
        },
        {
            header: futureLang.lbOrigen,
            width: 130,
            sortable: true,
            dataIndex: 'origen'
        },
        {
            id: 'url',
            header: futureLang.lbUrl,
            width: 75,
            sortable: true,
            dataIndex: 'url'
        },
        {
            header: futureLang.lbIp,
            sortable: true,
            width: 100,
            align: 'right',
            dataIndex: 'ip'
        },
        {
            header: futureLang.lbFecha,
            width: 80,
            sortable: true,
            dataIndex: 'fecha',
            renderer: format_Fecha
        },
        {
            header: futureLang.lbTiempo,
            width: 80,
            sortable: true,
            dataIndex: 'hora'
        },
        {
            header: futureLang.lbMemoria,
            width: 60,
            sortable: true,
            hidden: true,
            dataIndex: 'memoria'
        },
        {
            header: futureLang.lbTiempoResp,
            width: 60,
            sortable: true,
            hidden: true,
            dataIndex: 'tiempor'
        },
        {
            header: futureLang.lbSistOp,
            width: 120,
            sortable: true,
            dataIndex: 'opsystem'
        },
        {
            header: futureLang.lbNavWeb,
            width: 120,
            sortable: true,
            dataIndex: 'browser'
        }],
    tbar: [new Ext.Toolbar.TextItem(' '), new Ext.Toolbar.TextItem(futureLang.lbUsuario + ':'), cbUserAuth, new Ext.Toolbar.TextItem(' '), new Ext.Toolbar.TextItem(futureLang.lbDesde + ':'), dffechaiauth, new Ext.Toolbar.TextItem(' '), new Ext.Toolbar.TextItem(futureLang.lbHasta + ':'), dffechafauth, btnbuscarauth, btnlimpiarauth],
    bbar: new Ext.Feet.PagingToolbar({
        pageSize: 20,
        store: stdetalleauth,
        displayInfo: true
    })
});
var sttraza = new Ext.data.Store({
    autoLoad: true,
    url: 'loadTipoTraza',
    reader: new Ext.data.JsonReader({
        root: 'campos'
    }, [
        {name: 'name'},
        {name: 'active'}
    ])
});
var smtraza = new Ext.grid.RowSelectionModel({
    id: 'smtraza',
    singleSelect: true,
    listeners: {
        'rowselect': function(sm, rowIndex, record) {
            Ext.getCmp('gptraza').getView().addRowClass(rowIndex, "negrita");
        },
        'rowdeselect': function(sm, rowIndex, record) {
            Ext.getCmp('gptraza').getView().removeRowClass(rowIndex, "negrita");
        }
    }
});
var gptraza = new Ext.grid.GridPanel({
    id: 'gptraza',
    store: sttraza,
    sm: smtraza,
    border: false,
    loadMask: true,
    columns: [{
            header: 'Nombre',
            width: 200,
            dataIndex: 'name',
            renderer: function(v) {
                return String.toUpperCase(v);
            }
        },
        {
            header: '&iquest;Est&aacute; activa?',
            width: 100,
            sortable: true,
            align: 'center',
            dataIndex: 'active',
            renderer: showImage
        }]
});

smdetalleauth.on({
    rowselect: function() {
        showParamsDetail('auth');
    },
    rowdeselect: function() {
        stParamsDetail.removeAll();
    }
});
smdetalletraza.on({
    rowselect: function() {
        showParamsDetail('detail');
    },
    rowdeselect: function() {
        stParamsDetail.removeAll();
    }
});
var tpTraza = new Ext.TabPanel({
    activeTab: 0,
    frame: true,
    region: 'center',
    border: false,
    id: 'tpaddorden',
    items: [{
            title: '<i class="fa fa-tachometer"></i> ' + futureLang.lbDashBoard,
            layout: 'fit',
            autoScroll: true,
            html: '<div id="idaccesos" style="width: 800px; height: 400px; margin: 0 auto"></div>\n\
                    <div id="idcontfunct" style="width: 800px; height: 400px; margin: 0 auto"></div>'
        }, {
            title: '<i class="fa fa-user"></i> ' + futureLang.lbAuth,
            layout: 'fit',
            items: [gpdetalleauth]
        }, {
            title: '<i class="fa fa-server"></i> ' + futureLang.lbVistaDetalle,
            layout: 'fit',
            items: [gpdetalletraza]
        }]
});
tpTraza.on({
    tabchange: function(TabPanel, tab) {
        stParamsDetail.removeAll();
    }
});
var stParamsDetail = new Ext.data.Store({
    reader: new Ext.data.JsonReader({
        root: 'campos'
    }, [
        {name: 'attribute'},
        {name: 'value'}
    ])
});
var gpParamsDetail = new Ext.grid.GridPanel({
    title: futureLang.ttparametros,
    store: stParamsDetail,
    sm: new Ext.grid.RowSelectionModel(),
    autoExpandColumn: 'valor',
    region: 'south',
    height: 200,
    split: true,
    collapsible: true,
    border: false,
    loadMask: true,
    columns: [{
            header: futureLang.lbNombreparametro,
            width: 200,
            dataIndex: 'attribute'
        },
        {
            id: 'valor',
            header: futureLang.lbValor,
            width: 300,
            sortable: true,
            dataIndex: 'value'
        }]
});
function loadUsuarios() {
    Ext.Ajax.request({
        url: 'loadDataUsuarios',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            stUserAuth.loadData(responseData);
            stVistaDetallada.loadData(responseData);
        }
    });
}
function showImage(value, metaData, record, rowIndex, colIndex, store) {
    if (record.data.active === '1') {
        metaData.attr = 'ext:qtip="' + '<b>Traza activa</b>"';
        return '<div ext:qtip="' + '<b>Traza activa</b>"><i class="fa fa-check-circle success"></i></div>';
    } else {
        metaData.attr = 'ext:qtip="' + '<b>Traza inactiva</b>"';
        return '<div ext:qtip="' + '<b>Traza inactiva</b>"><i class="fa fa-check-circle danger"></i></div>';
    }
}
function BuscarDetalles(action) {
    if (action == 'limpiar') {
        stdetalletraza.baseParams.usuario = '';
        stdetalletraza.baseParams.desde = '';
        stdetalletraza.baseParams.hasta = '';
        resetDetalles();
        reloadDetalle();
    } else if (cbVistaDetallada.getRawValue() != '' && dffechaidetalle.isValid() && dffechafdetalle.isValid()) {
        stdetalletraza.baseParams.usuario = cbVistaDetallada.getRawValue();
        stdetalletraza.baseParams.desde = dffechaidetalle.getRawValue();
        stdetalletraza.baseParams.hasta = dffechafdetalle.getRawValue();
        reloadDetalle();
    }
}
function resetDetalles() {
    cbVistaDetallada.reset();
    dffechaidetalle.reset();
    dffechafdetalle.reset();
}
function reloadDetalle() {
    stdetalletraza.baseParams.start = 0;
    stdetalletraza.baseParams.limit = 20;
    stdetalletraza.reload();
}
function BuscarAuth(action) {
    if (action == 'limpiar') {
        stdetalleauth.baseParams.usuario = '';
        stdetalleauth.baseParams.desde = '';
        stdetalleauth.baseParams.hasta = '';
        resetAuth();
        reloadAuth();
    } else if (cbUserAuth.getRawValue() != '' && dffechaiauth.isValid() && dffechafauth.isValid()) {
        stdetalleauth.baseParams.usuario = cbUserAuth.getRawValue();
        stdetalleauth.baseParams.desde = dffechaiauth.getRawValue();
        stdetalleauth.baseParams.hasta = dffechafauth.getRawValue();
        reloadAuth();
    }
}
function resetAuth() {
    cbUserAuth.reset();
    dffechaiauth.reset();
    dffechafauth.reset();
}
function reloadAuth() {
    stdetalleauth.baseParams.start = 0;
    stdetalleauth.baseParams.limit = 20;
    stdetalleauth.reload();
}
function showParamsDetail(option) {
    var arrKeys, params;
    if (option == 'auth') {
        arrKeys = Object.keys(Ext.decode(smdetalleauth.getSelected().data.parametros));
        params = Ext.decode(smdetalleauth.getSelected().data.parametros);
    } else {
        arrKeys = Object.keys(Ext.decode(smdetalletraza.getSelected().data.parametros));
        params = Ext.decode(smdetalletraza.getSelected().data.parametros);
    }
    if (arrKeys.length > 0) {
        var data = new Array();
        for (var i = 0; i < arrKeys.length; i++) {
            var obj = new Object();
            obj.attribute = arrKeys[i];
            obj.value = params[arrKeys[i]];
            data.push(obj);
        }
        var json = new Object();
        json.campos = data;
        stParamsDetail.loadData(json);
    } else {
        MensajeInformacion(futureLang.msgNotparams);
    }
}
function accesosPorDia() {
    loadMask(futureLang.lbCargandoTrazaAccess);
    Ext.Ajax.request({
        url: 'loadAccesosPorDia',
        method: 'POST',
        callback: function(options, success, response) {
            lMask.hide();
            responseData = Ext.decode(response.responseText);
            return new Highcharts.Chart({
                chart: {
                    renderTo: 'idaccesos',
                    zoomType: 'xy'
                },
                title: {
                    text: futureLang.lbCantidadAccesos
                },
                xAxis: [{
                        categories: responseData.categories
                    }],
                yAxis: [{// Primary yAxis
                        labels: {
                            style: {
                                color: '#89A54E'
                            }
                        },
                        title: {
                            text: futureLang.lbUsuarios,
                            style: {
                                color: '#89A54E'
                            }
                        }
                    }, {// Secondary yAxis
                        title: {
                            text: futureLang.lbAccesos,
                            style: {
                                color: '#4572A7'
                            }
                        },
                        labels: {
                            style: {
                                color: '#4572A7'
                            }
                        },
                        opposite: true
                    }],
                tooltip: {
                    formatter: function() {
                        return '' +
                                this.x + ': ' + this.y +
                                (this.series.name == 'Accesos' ? ' ' + futureLang.lbAccesos : ' ' + futureLang.lbUsuarios);
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 120,
                    verticalAlign: 'top',
                    y: 100,
                    floating: true,
                    backgroundColor: '#FFFFFF'
                },
                series: [{
                        name: futureLang.lbAccesos,
                        color: '#4572A7',
                        type: 'column',
                        yAxis: 1,
                        data: responseData.series.accesos

                    }, {
                        name: futureLang.lbUsuarios,
                        color: '#89A54E',
                        type: 'spline',
                        data: responseData.series.usuarios
                    }]
            });
            lMask.hide();
        }
    });


}
function funcionalidadesPorDia() {
    loadMask(futureLang.lbCargandoTrazaFunc);
    Ext.Ajax.request({
        url: 'loadFuncionalidadesPorDia',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            lMask.hide();
            if (responseData) {
                var chart;
                var colors = Highcharts.getOptions().colors,
                        categories = responseData.categories,
                        name = futureLang.lbAccessFunc,
                        data = responseData.series;

                function setChart(name, categories, data, color) {
                    chart.xAxis[0].setCategories(categories);
                    chart.series[0].remove();
                    chart.addSeries({
                        name: name,
                        data: data,
                        color: color || 'white'
                    });
                }

                return chart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'idcontfunct',
                        type: 'column'
                    },
                    title: {
                        text: futureLang.lbFuncUsadas
                    },
                    xAxis: {
                        categories: categories,
                        labels: {rotation: -45, align: 'right'}
                    },
                    yAxis: {
                        title: {
                            text: futureLang.lbFreqUse
                        }
                    },
                    plotOptions: {
                        column: {
                            cursor: 'pointer',
                            point: {
                                events: {
                                    click: function() {
                                        var drilldown = this.drilldown;
                                        if (drilldown) { // drill down
                                            setChart(drilldown.name, drilldown.categories, drilldown.data, drilldown.color);
                                        } else { // restore
                                            setChart(name, categories, data);
                                        }
                                    }
                                }
                            },
                            dataLabels: {
                                enabled: true,
                                color: colors[0],
                                style: {
                                    fontWeight: 'bold'
                                },
                                formatter: function() {
                                    return this.y;
                                }
                            }
                        }
                    },
                    tooltip: {
                        formatter: function() {
                            var point = this.point,
                                    s = this.x + ':<b>' + this.y + futureLang.lbVecesUsadas + '</b><br/>';
                            if (point.drilldown) {
                                s += futureLang.lbClickVer + point.category;
                            } else {
                                s += futureLang.lbClickRegresar;
                            }
                            return s;
                        }
                    },
                    series: [{
                            name: name,
                            data: data,
                            color: 'white'
                        }]
                });
            } else
                return;
        }
    });


}
function loadDataPreview() {
    loadMask();
    Ext.Ajax.request({
        url: 'loadDataPreview',
        method: 'POST',
        callback: function(options, success, response) {
            var responseData = Ext.decode(response.responseText);
            if (responseData.datoCuerpo.length > 0) {
                var defaultComponentValues = {
                    paperSize: "A4",
                    orientation: "Horizontal",
                    reportType: "HTML",
                    data: responseData
                };
                var printView = new Ext.PrintView(defaultComponentValues);
                printView.show();
            } else {
                MensajeError(futureLang.msgError);
            }
            lMask.hide();
        }
    });
}
Ext.onReady(function() {
    funcionalidadesPorDia();
    loadUsuarios();
    accesosPorDia();
    new Ext.Viewport({
        layout: 'border',
        items: [tpTraza, gpParamsDetail]
    });
});