/* global Ext, lMask, Highcharts, format_Fecha, futureLang */
Ext.QuickTips.init();
Ext.Ajax.timeout = 60000;
Ext.onReady(function() {
    new Ext.UiValidations();
    windowopen = false;
    var activeTabOne = false;
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
        activeTab: 1,
        region: 'center',
        frame: true,
        border: false,
        items: [
            {
                title: '<i class="fa fa-cogs"></i> ' + futureLang.lbAdminTrazas,
                id: '0',
                layout: 'fit',
                frame: true,
                items: [{
                        xtype: 'fieldset',
                        id: 'idaspectconfig',
                        title: futureLang.lbConfAspectos,
                        collapsible: true,
                        autoHeight: true,
                        disabled: true,
                        labelWidth: 200,
                        layout: 'form',
                        items: [
                            {
                                xtype: 'checkboxgroup',
                                fieldLabel: futureLang.lbSetAspectos,
                                items: [
                                    {boxLabel: futureLang.lbAuth, name: 'loggin', id: 'cbgAuth', checked: false},
                                    {boxLabel: futureLang.lbTrazas, name: 'trace', id: 'cbgTrace', checked: false},
                                    {boxLabel: futureLang.lbLogs, name: 'log', id: 'cbgLog', checked: false}
                                ]
                            }
                        ],
                        buttons: [{
                                id: 'btnSaveAspectConfig',
                                hidden: true,
                                text: '<i class="fa fa-save bluedark-button"></i> ' + futureLang.lbGuardar,
                                tooltip: futureLang.lbGuardarConf,
                                handler: saveAspectConfig
                            }]
                    }, {
                        xtype: 'fieldset',
                        title: futureLang.lbEliminarTrazas,
                        collapsible: true,
                        autoHeight: true,
                        items: [{
                                layout: 'column',
                                items: [{
                                        layout: 'form',
                                        columnWidth: .33,
                                        items: [{
                                                xtype: 'combo',
                                                fieldLabel: futureLang.lbAuth,
                                                id: 'cbAuth',
                                                emptyText: futureLang.lbSeleccion,
                                                displayField: 'nombre',
                                                valueField: 'id',
                                                store: new Ext.data.SimpleStore({
                                                    fields: ['id', 'nombre'],
                                                    data: [[1, futureLang.lbHastaSeis], [2, futureLang.lbHastaTres], [3, futureLang.lbHastaUnm], [4, futureLang.lbHastaTodo]]
                                                }),
                                                typeAhead: true,
                                                forceSelection: true,
                                                selectOnFocus: true,
                                                triggerAction: 'all',
                                                mode: 'local',
                                                editable: false,
                                                anchor: '98%',
                                                listeners: {
                                                    'select': function(combo, record, index) {
                                                    }
                                                }
                                            }]
                                    }, {
                                        layout: 'form',
                                        columnWidth: .33,
                                        items: [{
                                                xtype: 'combo',
                                                fieldLabel: 'Trazas',
                                                id: 'cbTrace',
                                                emptyText: futureLang.lbSeleccion,
                                                displayField: 'nombre',
                                                valueField: 'id',
                                                store: new Ext.data.SimpleStore({
                                                    fields: ['id', 'nombre'],
                                                    data: [[1, futureLang.lbHastaSeis], [2, futureLang.lbHastaTres], [3, futureLang.lbHastaUnm], [4, futureLang.lbHastaTodo]]
                                                }),
                                                typeAhead: true,
                                                forceSelection: true,
                                                selectOnFocus: true,
                                                triggerAction: 'all',
                                                mode: 'local',
                                                editable: false,
                                                anchor: '98%',
                                                listeners: {
                                                    'select': function(combo, record, index) {
                                                    }
                                                }
                                            }]
                                    }, {
                                        layout: 'form',
                                        columnWidth: .33,
                                        items: [{
                                                xtype: 'combo',
                                                fieldLabel: 'Logs',
                                                id: 'cbLogs',
                                                emptyText: futureLang.lbSeleccion,
                                                displayField: 'nombre',
                                                valueField: 'id',
                                                store: new Ext.data.SimpleStore({
                                                    fields: ['id', 'nombre'],
                                                    data: [[1, futureLang.lbSi], [2, futureLang.lbNo]]
                                                }),
                                                typeAhead: true,
                                                forceSelection: true,
                                                selectOnFocus: true,
                                                triggerAction: 'all',
                                                mode: 'local',
                                                editable: false,
                                                anchor: '98%',
                                                listeners: {
                                                    'select': function(combo, record, index) {
                                                    }
                                                }
                                            }]
                                    }]
                            }],
                        buttons: [{
                                id: 'btnDeleteTraces',
                                hidden: true,
                                text: '<i class="fa fa-trash bluedark-button"></i> ' + futureLang.lbEliminar,
                                tooltip: 'Eliminar datos de las trazas',
                                handler: deleteTraces
                            }, {
                                id: 'btnCancelTraces',
                                text: '<i class="fa fa-times-circle red-button"></i> ' + futureLang.lbCancelar,
                                tooltip: 'Cancelar la acci\xF3n',
                                handler: cancelDeleteTraces
                            }]
                    }, {
                        xtype: 'fieldset',
                        title: futureLang.lbEliminarHisTrazas,
                        collapsible: true,
                        autoHeight: true,
                        items: [{
                                layout: 'column',
                                items: [{
                                        layout: 'form',
                                        columnWidth: .33,
                                        items: [{
                                                xtype: 'combo',
                                                fieldLabel: futureLang.lbAuth,
                                                id: 'cbHisAuth',
                                                emptyText: futureLang.lbSeleccion,
                                                displayField: 'nombre',
                                                valueField: 'id',
                                                store: new Ext.data.SimpleStore({
                                                    fields: ['id', 'nombre'],
                                                    data: [[11, futureLang.lbHastaDos], [12, futureLang.lbHastaUno]]
                                                }),
                                                typeAhead: true,
                                                forceSelection: true,
                                                selectOnFocus: true,
                                                triggerAction: 'all',
                                                mode: 'local',
                                                editable: false,
                                                anchor: '98%',
                                                listeners: {
                                                    'select': function(combo, record, index) {
                                                    }
                                                }
                                            }]
                                    }, {
                                        layout: 'form',
                                        columnWidth: .33,
                                        items: [{
                                                xtype: 'combo',
                                                fieldLabel: 'Trazas',
                                                id: 'cbHisTrace',
                                                emptyText: futureLang.lbSeleccion,
                                                displayField: 'nombre',
                                                valueField: 'id',
                                                store: new Ext.data.SimpleStore({
                                                    fields: ['id', 'nombre'],
                                                    data: [[11, futureLang.lbHastaDos], [12, futureLang.lbHastaUno]]
                                                }),
                                                typeAhead: true,
                                                forceSelection: true,
                                                selectOnFocus: true,
                                                triggerAction: 'all',
                                                mode: 'local',
                                                editable: false,
                                                anchor: '98%',
                                                listeners: {
                                                    'select': function(combo, record, index) {
                                                    }
                                                }
                                            }]
                                    }]
                            }],
                        buttons: [{
                                id: 'btnDeleteHisTraces',
                                hidden: true,
                                text: '<i class="fa fa-trash bluedark-button"></i> ' + futureLang.lbEliminar,
                                tooltip: 'Eliminar datos hist\xF3ricos de las trazas',
                                handler: deleteHisTraces
                            }, {
                                id: 'btnCancelHisTraces',
                                text: '<i class="fa fa-times-circle red-button"></i> ' + futureLang.lbCancelar,
                                tooltip: 'Cancelar la acci\xF3n',
                                handler: cancelDeleteHisTraces
                            }]
                    }]
            }, {
                title: '<i class="fa fa-tachometer"></i> ' + futureLang.lbDashBoard,
                id: '1',
                layout: 'fit',
                autoScroll: true,
                html: '<div id="idaccesos" style="width: 800px; height: 400px; margin: 0 auto"></div>\n\
                <div id="idcontfunct" style="width: 800px; height: 400px; margin: 0 auto"></div>\n\
                <div id="idaccesosentidad" style="width: 800px; height: 400px; margin: 0 auto"></div>\n\
                <div id="idaccesswrong" style="width: 800px; height: 400px; margin: 0 auto"></div>\n\
                <div id="idtraficlastsevendays" style="width: 800px; height: 400px; margin: 0 auto"></div>'
            }, {
                title: '<i class="fa fa-user"></i> ' + futureLang.lbHisAuth,
                id: '2', layout: 'fit',
                items: [gpdetalleauth]
            }, {
                title: '<i class="fa fa-server"></i> ' + futureLang.lbHisVistadet,
                id: '3',
                layout: 'fit',
                items: [gpdetalletraza]}]
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

    new Ext.Viewport({
        layout: 'border',
        items: [tpTraza, gpParamsDetail]
    });
    tpTraza.on({
        tabchange: function(p, tab) {
            if (tab.id == '0' && !activeTabOne) {
                loadAspectsConfig();
                activeTabOne = true;
                tab.doLayout();
            }
            stParamsDetail.removeAll();
        }
    });

    funcionalidadesPorDia();
    accesosPorDia();
    accesosPorEntidad();
    lastAccessWrong();
    viewTraficLastSevenDays();
    loadUsuarios();

    function loadUsuarios() {
        Ext.Ajax.request({
            url: 'loadDataUsuarios',
            method: 'POST',
            callback: function(options, success, response) {
                var responseData = Ext.decode(response.responseText);
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
                        text: futureLang.lbCantAccesosUsuarios
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
                        }},
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
                                cursor: 'pointer', point: {
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
                        }, tooltip: {
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
    function accesosPorEntidad() {
        loadMask(futureLang.lbCargandoAccessEnt);
        Ext.Ajax.request({
            url: 'loadaccesosporentidad',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                lMask.hide();
                if (responseData) {
                    var chart;
                    var colors = Highcharts.getOptions().colors,
                            categories = responseData.categories,
                            name = futureLang.lbAccessEntidad,
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
                            renderTo: 'idaccesosentidad',
                            type: 'column'
                        },
                        title: {
                            text: futureLang.lbEntidadesUsadas
                        },
                        xAxis: {
                            categories: categories,
                            labels: {rotation: -45, align: 'right'}
                        },
                        yAxis: {
                            title: {
                                text: futureLang.lbCantAccesos
                            }
                        },
                        plotOptions: {
                            column: {
                                cursor: 'pointer', point: {
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
                        }, tooltip: {
                            formatter: function() {
                                var point = this.point,
                                        s = this.x + ':<b>' + this.y + futureLang.lbVecesAccedida + '</b><br/>';
                                if (point.drilldown) {
                                    s += futureLang.lbClickVerEntidades + point.category;
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
    function lastAccessWrong() {
        loadMask(futureLang.lbCargandoDataError);
        Ext.Ajax.request({
            url: 'loadlastaccesswrong',
            method: 'POST',
            callback: function(options, success, response) {
                lMask.hide();
                var responseData = Ext.decode(response.responseText);
                return new Highcharts.Chart({
                    chart: {
                        renderTo: 'idaccesswrong',
                        type: 'line'
                    },
                    title: {
                        text: futureLang.lbCantidadAccesosError
                    },
                    xAxis: [{
                            categories: responseData.categories
                        }],
                    yAxis: {// Primary yAxis
                        title: {
                            text: futureLang.lbCantAccesos
                        },
                        plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                    },
                    tooltip: {
                        formatter: function() {
                            return '' +
                                    this.x + ': ' + this.y +
                                    (this.series.name == 'Accesos' ? ' ' + futureLang.lbAccesos : ' ' + futureLang.lbUsuarios);
                        }},
                    series: [{
                            name: futureLang.lbAccesos,
                            data: responseData.series.accesos

                        }]
                });
                lMask.hide();
            }
        });
    }
    function viewTraficLastSevenDays() {
        loadMask(futureLang.lbCargandoTrafico);
        Ext.Ajax.request({
            url: 'loadtraficlastsevendays',
            method: 'POST',
            callback: function(options, success, response) {
                lMask.hide();
                responseData = Ext.decode(response.responseText);
                return new Highcharts.Chart({
                    chart: {
                        renderTo: 'idtraficlastsevendays',
                        type: 'spline'
                    },
                    title: {
                        text: futureLang.lbTraficoSiete
                    },
                    xAxis: [{
                            type: 'datetime'
                        }],
                    yAxis: {// Primary yAxis
                        title: {
                            text: futureLang.lbCantPeticiones
                        },
                        min: 0,
                        minorGridLineWidth: 0,
                        gridLineWidth: 0,
                        alternateGridColor: null,
                        plotBands: [{
                                from: 0,
                                to: 100,
                                color: 'rgba(68, 170, 213, 0.1)',
                                label: {
                                    text: futureLang.lbPetMuyBajo,
                                    style: {
                                        color: '#606060'
                                    }
                                }
                            }, {
                                from: 101,
                                to: 200,
                                color: 'rgba(0, 0, 0, 0)',
                                label: {
                                    text: futureLang.lbPetBajo,
                                    style: {
                                        color: '#606060'
                                    }
                                }
                            }, {
                                from: 201,
                                to: 500,
                                color: 'rgba(68, 170, 213, 0.1)',
                                label: {
                                    text: futureLang.lbPetModerado,
                                    style: {
                                        color: '#606060'
                                    }
                                }
                            }, {
                                from: 501,
                                to: 800,
                                color: 'rgba(0, 0, 0, 0)',
                                label: {
                                    text: futureLang.lbPetConsiderable,
                                    style: {
                                        color: '#606060'
                                    }
                                }
                            }, {
                                from: 801,
                                to: 1100,
                                color: 'rgba(68, 170, 213, 0.1)',
                                label: {
                                    text: futureLang.lbPetAlto,
                                    style: {
                                        color: '#606060'
                                    }
                                }
                            }, {
                                from: 1101,
                                to: 1400,
                                color: 'rgba(0, 0, 0, 0)',
                                label: {
                                    text: futureLang.lbPetMuyAlto,
                                    style: {
                                        color: '#606060'
                                    }
                                }
                            }, {
                                from: 1401,
                                to: 3000,
                                color: 'rgba(68, 170, 213, 0.1)',
                                label: {
                                    text: futureLang.lbPetSuperAlto,
                                    style: {
                                        color: '#606060'
                                    }
                                }
                            }]
                    },
                    tooltip: {
                        formatter: function() {
                            return '' +
                                    Highcharts.dateFormat('%e. %b %Y, %H:00', this.x) + ', ' + this.y + futureLang.lbPeticiones;
                        }
                    },
                    plotOptions: {
                        spline: {
                            lineWidth: 3,
                            states: {
                                hover: {
                                    lineWidth: 4
                                }
                            },
                            marker: {
                                enabled: false,
                                states: {
                                    hover: {
                                        enabled: true,
                                        symbol: 'circle',
                                        radius: 5,
                                        lineWidth: 1
                                    }
                                }
                            },
                            pointInterval: 14400000, // four hour
                            pointStart: Date.UTC(responseData.year, responseData.month - 1, responseData.day, 0, 0, 0)
                        }
                    },
                    series: [{
                            name: futureLang.lbPeticionesHora,
                            data: responseData.data

                        }],
                    navigation: {
                        menuItemStyle: {
                            fontSize: '10px'
                        }
                    }
                });
                lMask.hide();
            }
        });
    }
    function saveAspectConfig() {
        function confirmar(btn) {
            if (btn == 'ok') {
                fnContinue();
            }
        }
        MensajeInterrogacion('<i class="fa fa-save"></i> ' + futureLang.lbGuardarConf, futureLang.lbPromptGuardarConfAsp, confirmar);
        function fnContinue() {
            var aspect = new Object();
            aspect.loggin = (Ext.getCmp('cbgAuth').getValue() == true) ? 1 : 0;
            aspect.trace = (Ext.getCmp('cbgTrace').getValue() == true) ? 1 : 0;
            aspect.log = (Ext.getCmp('cbgLog').getValue() == true) ? 1 : 0;
            MostrarBarraProgreso(futureLang.lbGuardarConfAsp);
            Ext.Ajax.request({url: 'saveaspectconfig',
                method: 'POST',
                params: aspect,
                callback: function(options, success, response) {
                    var responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (parseInt(responseData) === 1) {
                        MensajeInformacion(futureLang.lbMsgGuardarConfAsp);
                    } else {
                        MensajeInformacion(futureLang.msgError);
                    }
                }
            });
        }
    }
    function loadAspectsConfig() {
        loadMask(futureLang.lbCargandoConfAsp);
        Ext.Ajax.request({
            url: 'loadaspectsconfig',
            method: 'POST',
            callback: function(options, success, response) {
                var responseData = Ext.decode(response.responseText);
                lMask.hide();
                if (parseInt(responseData) !== 1) {
                    Ext.getCmp('idaspectconfig').setDisabled(false);
                    var data = responseData.data;
                    Ext.getCmp('cbgAuth').setValue(data.aspect.loggin);
                    Ext.getCmp('cbgTrace').setValue(data.aspect.trace);
                    Ext.getCmp('cbgLog').setValue(data.aspect.log);
                } else {
                    Ext.getCmp('idaspectconfig').setDisabled(true);
                }
            }
        });
    }
    function deleteTraces() {
        function confirmar(btn) {
            if (btn == 'ok') {
                fnContinue();
            }
        }
        if (Ext.getCmp('cbAuth').getValue() || Ext.getCmp('cbTrace').getValue() || Ext.getCmp('cbLogs').getValue())
            MensajeInterrogacion('<i class="fa fa-trash"></i> ' + futureLang.lbEliminarTrazas, futureLang.lbPromptEliminarTrazas, confirmar)
        function fnContinue() {
            var trace = new Object();
            trace.loggin = Ext.getCmp('cbAuth').getValue();
            trace.trace = Ext.getCmp('cbTrace').getValue();
            trace.log = Ext.getCmp('cbLogs').getValue();
            MostrarBarraProgreso(futureLang.lbEliminandoTrazas);
            Ext.Ajax.request({url: 'deletetraces',
                method: 'POST',
                params: trace,
                callback: function(options, success, response) {
                    var responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (parseInt(responseData) === 1) {
                        MensajeInformacion(futureLang.lbMsgEliminar);
                        Ext.getCmp('cbAuth').reset();
                        Ext.getCmp('cbTrace').reset();
                        Ext.getCmp('cbLogs').reset();
                    } else {
                        MensajeError(futureLang.msgError);
                    }
                }
            });
        }
    }
    function cancelDeleteTraces() {
        Ext.getCmp('cbAuth').reset();
        Ext.getCmp('cbTrace').reset();
        Ext.getCmp('cbLogs').reset();
    }
    function deleteHisTraces() {
        function confirmar(btn) {
            if (btn == 'ok') {
                fnContinue();
            }
        }
        if (Ext.getCmp('cbHisAuth').getValue() || Ext.getCmp('cbHisTrace').getValue())
            MensajeInterrogacion('<i class="fa fa-trash"></i> ' + futureLang.lbEliminarHisTrazas, futureLang.lbPromptEliminarHisTrazas, confirmar)
        function fnContinue() {
            var hisTrace = new Object();
            hisTrace.hisloggin = Ext.getCmp('cbHisAuth').getValue();
            hisTrace.histrace = Ext.getCmp('cbHisTrace').getValue();
            MostrarBarraProgreso(futureLang.lbEliminandoHisTrazas);
            Ext.Ajax.request({url: 'deletehistraces',
                method: 'POST',
                params: hisTrace,
                callback: function(options, success, response) {
                    var responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    Ext.getCmp('cbHisAuth').reset();
                    Ext.getCmp('cbHisTrace').reset();
                    if (parseInt(responseData) === 1) {
                        MensajeInformacion(futureLang.lbMsgEliminarHis);
                    } else {
                        MensajeError(futureLang.msgError);
                    }
                }
            });
        }
    }
    function cancelDeleteHisTraces() {
        Ext.getCmp('cbHisAuth').reset();
        Ext.getCmp('cbHisTrace').reset();
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
});