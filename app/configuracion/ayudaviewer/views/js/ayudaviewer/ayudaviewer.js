/* global Ext, lMask, futureLang */
Ext.onReady(function () {
    Ext.QuickTips.init();
    new Ext.Viewport({
        layout: 'border',
        items: [new Ext.grid.GridPanel({
                title: futureLang.lbAyudaSistema,
                region: 'west',
                id: 'gpAyuda',
                frame:true,
                store: new Ext.data.GroupingStore({
                    autoLoad: true,
                    storeId: 'stayuda',
                    url: 'cargarayuda',
                    groupField: 'modulo',
                    sortInfo: {field: 'modindice', direction: "ASC"},
                    reader: new Ext.data.JsonReader({
                        root: 'campos',
                        id: 'idRecord',
                        totalProperty: 'totalrecords'
                    }, [{
                            name: 'idconfayuda'
                        }, {
                            name: 'idfuncionalidades'
                        }, {
                            name: 'idmodulo'
                        }, {
                            name: 'nombre'
                        }, {
                            name: 'descripcion'
                        }, {
                            name: 'referencia'
                        }, {
                            name: 'modulo'
                        }, {
                            name: 'modindice', type: 'float'
                        }]),
                    baseParams: {cadena: ''},
                    listeners: {
                        beforeload: function (e) {
                            loadMask('Cargando...');
                        },
                        load: function (e) {
                            if (lMask)
                                lMask.hide();
                            Ext.getCmp('gpAyuda').getSelectionModel().fireEvent('rowdeselect');
                        }
                    }
                }),
                autoExpandColumn: 'expanded',
                sm: new Ext.grid.RowSelectionModel({
                    singleSelect: true,
                    listeners: {
                        rowselect: function (sm, rowIndex, record) {
                            if (sm.getSelected()) {
                                document.getElementById('ifPanelAyuda').src = record.data.referencia;
                            }
                            Ext.getCmp('gpAyuda').getView().addRowClass(rowIndex, "negrita");
                        },
                        rowdeselect: function (sm, rowIndex, record) {
                            document.getElementById('ifPanelAyuda').src = '/app/configuracion/ayudaviewer/views/scripts/ayudaviewer/homehelp.html';
                            Ext.getCmp('gpAyuda').getView().removeRowClass(rowIndex, "negrita");
                        }
                    }
                }),
                width: window.innerWidth / 3.5,
                collapsible: true,
                split: true,
                loadMask: true,
                stripeRows: true,
                columns: [{
                        hidden: true,
                        hideable: false,
                        sortable: false,
                        dataIndex: 'idconfayuda'
                    }, {
                        hidden: true,
                        hideable: false,
                        sortable: false,
                        dataIndex: 'idfuncionalidades'
                    }, {
                        hidden: true,
                        hideable: false,
                        sortable: false,
                        dataIndex: 'idmodulo'
                    }, {
                        header: futureLang.lbFuncionalidad,
                        sortable: false,
                        id: 'expanded',
                        width: 240,
                        dataIndex: 'nombre'
                    }, {
                        header: futureLang.lbModulo,
                        hidden: true,
                        hideable: false,
                        sortable: false,
                        width: 100,
                        dataIndex: 'modulo'
                    }, {
                        header: futureLang.lbReferencia,
                        hidden: true,
                        hideable: false,
                        sortable: false,
                        dataIndex: 'referencia'
                    }],
                view: new Ext.grid.GroupingView({
                    hideGroupedColumn: true,
                    startCollapsed: true,
                    groupTextTpl: futureLang.lbGroupTextTpl
                })
            }), new Ext.Panel({
                id: 'panelayuda',
                region: 'center',
                layout: 'fit',
                border: false,
                html: '<iframe id="ifPanelAyuda" style="width:100%; height: 100%; border:none;"></iframe>'
            })]
    });
});