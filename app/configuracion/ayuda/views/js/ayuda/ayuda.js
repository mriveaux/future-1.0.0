/* global Ext, lMask, futureLang */
Ext.QuickTips.init();
Ext.onReady(function () {
    new Ext.UiValidations();
    lMask.hide();
    var btnAdicionar = new Ext.Button({
        id: 'btnAdicionar',
        hidden:true,
        disabled: false,
        text: '<i class="fa fa-plus bluedark-button"></i> ' + futureLang.lbAdicionar,
        tooltip: futureLang.lbTtAdicionar,
        handler: function () {
            showWindowAddAyuda();
        }
    });
    var btnEliminar = new Ext.Button({
        id: 'btnEliminar',
        hidden:true,
        text: '<i class="fa fa-trash bluedark-button"></i> ' + futureLang.lbEliminar,
        tooltip: futureLang.lbTtEliminar,
        disabled: true,
        handler: function () {
            if (smAyuda.getSelected() && smAyuda.getSelected().data.idmodulo != 0)
                eliminarAyuda();
        }
    });
    var stAyuda = new Ext.data.GroupingStore({
        url: 'cargarayuda', autoLoad: true, id: 'stayuda', groupField: 'modulo',
        sortInfo: {field: 'modindice', direction: "ASC"},
        reader: new Ext.data.JsonReader({root: 'campos', id: 'idRecord', totalProperty: 'totalrecords'}, [{
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
                name: 'modindice'
            }]),
        baseParams: {cadena: ''},
        listeners: {
            load: function (e)
            {
                lMask.hide();
                smAyuda.fireEvent('rowdeselect');
            }
        }
    });
    var sfBuscar = new Ext.form.SearchField({
        id: 'tfbuscar', maxLength: 30, store: stAyuda,
        maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        fnOnSearch: function () {
            buscarAyuda(sfBuscar.getValue());
        },
        fnOnClear: function () {
            this.reset();
            buscarAyuda(sfBuscar.getValue());
        }
    });
    var smAyuda = new Ext.grid.RowSelectionModel({
        singleSelect: true,
        listeners: {
            'rowselect': function (sm, rowIndex, record) {
                if (smAyuda.getSelected() && smAyuda.getSelected().data.idmodulo != 0) {
                    btnEliminar.enable();
                } else {
                    btnEliminar.disable();
                }
                Ext.getCmp('gpayuda').getView().addRowClass(rowIndex, "negrita");
            },
            'rowdeselect': function (sm, rowIndex, record) {
                btnEliminar.disable();
                Ext.getCmp('gpayuda').getView().removeRowClass(rowIndex, "negrita");
            }
        }
    });
    var gpAyuda = new Ext.grid.GridPanel({
        title: futureLang.lbAyudaSistema,
        id: 'gpayuda',
        store: stAyuda,
        autoExpandColumn: 'expanded',
        sm: smAyuda,
        border: false,
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
                header: futureLang.lbNombre,
                width: 240,
                dataIndex: 'nombre'
            }, {
                header: futureLang.lbDescripcion,
                id: 'expanded',
                width: 300,
                dataIndex: 'descripcion'
            }, {
                header: futureLang.lbModulo,
                width: 100,
                dataIndex: 'modulo'
            }, {
                header: futureLang.lbReferencia,
                width: 250,
                dataIndex: 'referencia'
            }],
        view: new Ext.grid.GroupingView({
            hideGroupedColumn: true,
            startCollapsed: true,
            groupTextTpl: futureLang.lbGroupTextTpl
        }),
        tbar: [btnAdicionar, btnEliminar, '->', sfBuscar, new Ext.Toolbar.TextItem(' ')]
    });
    new Ext.Viewport({layout: 'fit', items: gpAyuda});
    function showWindowAddAyuda() {
        loadMask();
        var tfNombre = new Ext.form.TextField({
            fieldLabel: futureLang.lbNombre,
            disabled: true,
            disabledClass: 'disabled-component',
            anchor: '100%'
        });
        var tfDescripcion = new Ext.form.TextField({
            fieldLabel: futureLang.lbDescripcion,
            disabled: true,
            disabledClass: 'disabled-component',
            anchor: '100%'
        });
        var tfReferencia = new Ext.form.TextField({
            fieldLabel: futureLang.lbReferencia,
            disabled: true,
            disabledClass: 'disabled-component',
            anchor: '100%'
        });
        var fpAddAyuda = new Ext.FormPanel({
            id: 'fpAddAyuda',
            frame: true,
            border: false,
            region: 'east',
            width: window.innerWidth / 2.7,
            labelAlign: 'top',
            layout: 'form',
            items: [tfNombre, tfDescripcion, tfReferencia]
        });

        var staddayuda = new Ext.data.GroupingStore({
            id: 'staddayuda',
            url: 'loadFuncionalidades',
            groupField: 'modulo',
            sortInfo: {field: 'nombre', direction: "ASC"},
            reader: new Ext.data.JsonReader({
                root: 'campos',
                id: 'idRecord',
                totalProperty: 'totalrecords'
            }, [{
                    name: 'idfuncionalidades'
                }, {
                    name: 'idmodulo'
                }, {
                    name: 'nombre'
                }, {
                    name: 'abreviatura'
                }, {
                    name: 'descripcion'
                }, {
                    name: 'modulo'
                }, {
                    name: 'modabreviatura'
                }]),
            listeners: {
                load: function (e)
                {
                    lMask.hide();
                }
            }
        });
        staddayuda.load();
        var smaddayuda = new Ext.grid.RowSelectionModel({
            id: 'smaddayuda',
            singleSelect: false,
            listeners: {
                rowselect: function (sm, rowIndex, record) {
                    selectFuncionalidad();
                },
                rowdeselect: function (sm, rowIndex, record) {
                    deselectFuncionalidad();
                }
            }
        });
        var gpSistFuncionalidad = new Ext.grid.GridPanel({
            title: futureLang.lbFuncRegSist,
            id: 'gpaddayuda',
            region: 'center',
            store: staddayuda,
            autoExpandColumn: 'expanded',
            sm: smaddayuda,
            border: false,
            loadMask: true,
            stripeRows: true,
            columns: [{
                    hidden: true,
                    hideable: false,
                    dataIndex: 'idfuncionalidades'
                }, {
                    hidden: true,
                    hideable: false,
                    dataIndex: 'abreviatura'
                }, {
                    hidden: true,
                    hideable: false,
                    dataIndex: 'modabreviatura'
                }, {
                    hidden: true,
                    hideable: false,
                    dataIndex: 'idmodulo'
                }, {
                    header: futureLang.lbNombre,
                    width: 240,
                    dataIndex: 'nombre'
                }, {
                    header: futureLang.lbDescripcion,
                    id: 'expanded',
                    width: 300,
                    dataIndex: 'descripcion'
                }, {
                    header: futureLang.lbModulo,
                    width: 100,
                    dataIndex: 'modulo'
                }],
            view: new Ext.grid.GroupingView({
                hideGroupedColumn: true,
                startCollapsed: true,
                groupTextTpl: futureLang.lbGroupTextTpl
            })
        });
        win = new Ext.Window({
            title: '<i class="fa fa-plus"></i> ' + futureLang.lbTtAdicionar,
            modal: true,
            labelAlign: 'top',
            frame: true,
            resizable: false,
            bodyStyle: 'padding:5px 5px 5px',
            border: false,
            closeAction: 'close',
            layout: 'border',
            width: 490,
            height: 250,
            items: [fpAddAyuda, gpSistFuncionalidad],
            buttons: [{
                    id: 'aplicar',
                    disabled: true,
                    text: Ext.lang.btnApply,
                    handler: function () {
                        adicionarAyuda('apli');
                    }
                }, {
                    id: 'aceptar',
                    disabled: true,
                    text: Ext.lang.btnAcept,
                    handler: function () {
                        adicionarAyuda('acept');
                    }
                },
                {
                    text: Ext.lang.btnCancel,
                    handler: function () {
                        fpAddAyuda.getForm().reset();
                        win.close();
                    }
                }]
        });
        win.show();
        win.maximize();
        win.doLayout();

        function selectFuncionalidad() {
            tfNombre.setValue(smaddayuda.getSelected().data.nombre);
            tfDescripcion.setValue(smaddayuda.getSelected().data.descripcion);
            tfReferencia.setValue('/help/' + smaddayuda.getSelected().data.modabreviatura + '/' + smaddayuda.getSelected().data.abreviatura + '/' + smaddayuda.getSelected().data.abreviatura + '.html');
            Ext.getCmp('aplicar').setDisabled(false);
            Ext.getCmp('aceptar').setDisabled(false);

        }
        function deselectFuncionalidad() {
            tfNombre.reset();
            tfDescripcion.reset();
            tfReferencia.reset();
            Ext.getCmp('aplicar').setDisabled(true);
            Ext.getCmp('aceptar').setDisabled(true);
        }

        function adicionarAyuda(ind) {
            if (Ext.getCmp('fpAddAyuda').getForm().isValid()) {
                MostrarBarraProgreso(futureLang.lbAdicionando);
                Ext.Ajax.request({
                    url: 'adicionarayuda',
                    method: 'POST',
                    callback: function (options, success, response) {
                        responseData = Ext.decode(response.responseText);
                        Ext.MessageBox.hide();
                        if (responseData == 1) {
                            if (ind !== 'apli')
                                win.close();
                            else {
                                Ext.getCmp('fpAddAyuda').getForm().reset();
                                staddayuda.reload();
                                smaddayuda.fireEvent('rowdeselect');
                            }
                            MensajeInformacion(futureLang.lbAddCorrect);
                            stAyuda.baseParams.cadena = '';
                            stAyuda.reload();
                        } else if (responseData == 2)
                            MensajeError(futureLang.lbAddIncorrect);
                        else {
                            MensajeError(futureLang.lbNoAdd);
                        }
                    },
                    params: {
                        idmodulo: smaddayuda.getSelected().data.idmodulo,
                        idfuncionalidades: smaddayuda.getSelected().data.idfuncionalidades,
                        referencia: tfReferencia.getValue(),
                        carpeta: smaddayuda.getSelected().data.modabreviatura,
                        subcarpeta: smaddayuda.getSelected().data.abreviatura
                    }
                });
            }
        }

    }
    function eliminarAyuda() {
        function confirmar(btn) {
            if (btn === 'ok')
                deleteAyuda();
        }
        MensajeInterrogacion('<i class="fa fa-trash"></i> ' + futureLang.lbTtEliminar, futureLang.lbPromptEliminar, confirmar);
        function deleteAyuda() {
            if (smAyuda.getSelected()) {
                MostrarBarraProgreso(futureLang.lbEliminando);
                Ext.Ajax.request({
                    url: 'eliminarayuda',
                    method: 'POST',
                    callback: function (options, success, response) {
                        responseData = Ext.decode(response.responseText);
                        Ext.MessageBox.hide();
                        if (responseData == 1) {
                            MensajeInformacion(futureLang.lbDeleteCorrect);
                            stAyuda.baseParams.cadena = '';
                            stAyuda.reload();
                        } else if (responseData == 2) {
                            MensajeError(futureLang.lbDeleteError);
                        } else {
                            MensajeError(futureLang.lbMsgError);
                        }
                    },
                    params: {
                        idconfayuda: smAyuda.getSelected().data.idconfayuda
                    }
                });
            }
        }
    }
    function buscarAyuda(cadena) {
        stAyuda.baseParams.cadena = cadena;
        stAyuda.reload();
    }

});