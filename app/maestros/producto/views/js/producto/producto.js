/* global Ext, lMask */
Ext.QuickTips.init();
Ext.onReady(function() {
    lMask.hide();
    var categorias = [[1, '9019 Mtto. Correctivo'], [2, '6067 Mtto. Preventivo'], [3, '1190 Herramientas'], [4, '2012 Sist de Prot. Integral']];
    var btnAdicionar = new Ext.Button({
        disabled: false,
        id: 'btnAdicionar',
        text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
        tooltip: 'Adicionar producto',
        handler: mostrarAdicionar
    });
    var btnModificar = new Ext.Button({
        disabled: true,
        id: 'btnModificar',
        text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
        tooltip: 'Modificar producto',
        handler: mostrarModificar
    });
    var btnEliminar = new Ext.Button({
        disabled: true,
        id: 'btnbuscar',
        text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
        tooltip: 'Eliminar producto',
        handler: eliminarProducto
    });
    var btnActivar = new Ext.Button({
        disabled: true,
        id: 'btnactivar',
        text: '<i class="fa fa-thumbs-o-up bluedark-button"></i> Activar/desactivar',
        tooltip: 'Activar/desactivar producto',
        handler: activateProducto
    });

    var stProducto = new Ext.data.GroupingStore({
        groupField: 'idcategoria',
        sortInfo: {
            field: "idcategoria",
            direction: "ASC"
        },
        autoLoad: true,
        id: 'stProducto',
        url: 'loaddataproducto',
        reader: new Ext.data.JsonReader({
            root: 'data',
            id: 'idRecord',
            totalProperty: 'total'
        }, [{
                name: 'idproducto'
            }, {
                name: 'nombre'
            }, {
                name: 'descripcion'
            }, {
                name: 'idunidadmedida'
            }, {
                name: 'unidadmedida'
            }, {name: 'idcategoria', type: 'float'}, {name: 'codigo'}, {name: 'precio', type: 'float'}, {name: 'activo'}]),
        baseParams: {
            criterio: '',
            start: 0,
            limit: 20
        },
        listeners: {
            load: function(e)
            {
                smProducto.fireEvent('rowdeselect');
            }
        }
    });
    var sfBuscar = new Ext.form.SearchField({
        id: 'sfBuscar',
        lbTtlElement: 'producto',
        maskRe: /^[ A-Za-z0-9\-\.]+$/,
        regex: /^[ A-Za-z0-9\-\.]+$/,
        maxLength: 30,
        store: stProducto,
        fnOnSearch: function() {
            buscarProducto(sfBuscar.getValue());
        },
        fnOnClear: function() {
            this.reset();
            buscarProducto(sfBuscar.getValue());
        }
    });
    var smProducto = new Ext.grid.RowSelectionModel({
        singleSelect: true, listeners: {
            'rowselect': function(me, index, record) {
                btnModificar.enable();
                btnEliminar.enable();
                btnActivar.enable();
            },
            'rowdeselect': function(me, index, record) {
                btnModificar.disable();
                btnEliminar.disable();
                btnActivar.disable();
            }
        }
    });
    var gpProducto = new Ext.grid.GridPanel({
        id: 'gpProducto',
        store: stProducto,
        autoExpandColumn: 'descripcion',
        sm: smProducto,
        border: false,
        loadMask: true,
        stripeRows: true,
        view: new Ext.grid.GroupingView({
            ShowGroupName: true,
            enableNoGroup: false,
            enableGroupingMenu: false,
            hideGroupedColumn: true,
            groupTextTpl: '{text} ({[values.rs.length]})'
        }),
        columns: [{
                hidden: true,
                hideable: false,
                sortable: false,
                menuDisabled: false,
                dataIndex: 'idproducto'
            }, {
                hidden: true,
                hideable: false,
                menuDisabled: false,
                sortable: false,
                dataIndex: 'idunidadmedida'
            }, {
                hidden: true,
                sortable: true,
                header: 'Categor&iacute;a',
                dataIndex: 'idcategoria',
                renderer: function(val) {
                    return categorias[val - 1][1];
                }
            }, {
                sortable: true,
                header: 'C&oacute;digo',
                width: 100,
                dataIndex: 'codigo'
            }, {
                sortable: true,
                header: 'Nombre',
                width: 300,
                dataIndex: 'nombre'
            }, {
                sortable: true,
                id: 'descripcion',
                header: 'Descripci&oacute;n',
                dataIndex: 'descripcion'
            }, {
                sortable: true,
                header: 'U.M',
                tooltip: 'Unidad de medida',
                align: 'center',
                width: 80,
                dataIndex: 'unidadmedida'
            }, {
                sortable: true,
                header: 'Precio',
                align: 'right',
                tooltip: 'Precio del producto',
                width: 100,
                dataIndex: 'precio',
                renderer: formatoMonedaNopeso
            }, {
                header: 'Estado',
                width: 100,
                dataIndex: 'activo',
                align: 'center',
                renderer: showStatus
            }],
        tbar: [btnAdicionar, btnModificar, btnEliminar, btnActivar, '->', sfBuscar],
        bbar: new Ext.Feet.PagingToolbar({
            pageSize: 20,
            store: stProducto,
            displayInfo: true,
            displayMsg: 'Resultados de {0} - {1} de {2}',
            emptyMsg: "No hay resultados para mostrar."
        })
    });
    new Ext.Viewport({
        layout: 'fit',
        items: gpProducto
    });

    function mostrarAdicionar() {
        var tfnombre = new Ext.form.TextField({
            id: 'tfnombre',
            fieldLabel: 'Nombre',
            name: 'nombre',
            maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,\/\º]+)+$/,
            regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,\/\º]+)+$/,
            allowBlank: false,
            maxLength: 255,
            anchor: '100%'
        });
        var tfCodigo = new Ext.form.TextField({
            id: 'tfCodigo',
            fieldLabel: "C&oacute;digo",
            maxLength: 12,
            name: 'codigo',
            maskRe: /[\d\.]/i,
            regex: /^[\d\.]{1,12}$/,
            allowBlank: false,
            anchor: '100%'
        });
        var nfPrecio = new Ext.form.NumberField({
            id: 'nfPrecio',
            name: 'precio',
            maxLength: 19,
            allowBlank: true,
            allowNegative: false,
            decimalPrecision: 2,
            maskRe: /[0-9.]$/,
            fieldLabel: 'Precio',
            style: 'text-align:right',
            anchor: '100%',
            regexText: "Solo se permiten n&uacute;meros flotantes.",
            invalidText: "No es un valor v&aacute;lido."
        });
        var tadescripcion = new Ext.form.TextArea({
            id: 'tadescripcion',
            fieldLabel: 'Descripci&oacute;n',
            name: 'descripcion',
            maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,\/\º]+)+$/,
            regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,\/\º]+)+$/,
            allowBlank: false,
            maxLength: 255,
            anchor: '100%'
        });
        var stunidadmedida = new Ext.data.Store({
            autoLoad: true, url: 'loaddataunidadmedida',
            reader: new Ext.data.JsonReader({
                id: "idunidadmedida"
            }, [{
                    name: 'idunidadmedida'
                }, {
                    name: 'nombre'
                }, {
                    name: 'abreviatura'
                }])
        });
        var cbunidadmedida = new Ext.form.ComboBox({
            fieldLabel: 'Unidad de medida',
            mode: 'local',
            emptyText: 'Seleccione...',
            valueField: 'idunidadmedida',
            hiddenName: 'idunidadmedida',
            displayField: 'abreviatura',
            store: stunidadmedida,
            typeAhead: true,
            resizable: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: true,
            allowBlank: false,
            anchor: '100%',
            tpl: '<tpl for="."><div ext:qtip="{nombre}" class="x-combo-list-item">{abreviatura}</div></tpl>'
        });
        var cbCategoriaProducto = new Ext.form.ComboBox({
            id: 'cbCategoriaProducto',
            name: 'categoria',
            fieldLabel: 'Categor&iacute;a',
            mode: 'local',
            emptyText: 'Seleccione..',
            store: new Ext.data.SimpleStore({
                fields: ['idcategoria', 'categoria'],
                data: categorias
            }),
            displayField: 'categoria',
            hiddenName: 'idcategoria',
            valueField: 'idcategoria',
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            anchor: '100%',
            value: 1
        });
        var fpaddproducto = new Ext.FormPanel({
            autoHeight: true,
            frame: true,
            id: 'fpaddproducto',
            labelAlign: 'top',
            items: [{
                    layout: 'column',
                    items: [{
                            layout: 'form',
                            columnWidth: .3,
                            items: [tfCodigo]
                        }, {
                            style: 'margin:0 0 0 10',
                            layout: 'form',
                            columnWidth: .7,
                            items: [tfnombre]
                        }]
                }, {
                    layout: 'column',
                    items: [{
                            layout: 'form',
                            columnWidth: .3,
                            items: [cbunidadmedida]
                        }, {
                            style: 'margin:0 0 0 10',
                            layout: 'form',
                            columnWidth: .45,
                            items: [cbCategoriaProducto]
                        }, {
                            style: 'margin:0 0 0 10',
                            layout: 'form',
                            columnWidth: .25,
                            items: [nfPrecio]
                        }]
                }, tadescripcion]
        });
        var winRegProducto = new Ext.Window({
            constrain: true,
            modal: true,
            labelAlign: 'top',
            frame: true,
            resizable: true,
            bodyStyle: 'padding:5px 5px 5px',
            border: false,
            closeAction: 'close',
            layout: 'fit',
            title: 'Adicionar producto',
            width: 490,
            buttons: [{
                    text: '<i class="fa fa-hand-o-right blue-button"></i> <b>Aplicar</b>',
                    handler: function() {
                        adicionarproducto('apli');
                    }
                }, {
                    text: '<i class="fa fa-check-circle green-button"></i> <b>Aceptar</b>',
                    handler: function() {
                        adicionarproducto('acept');
                    }
                }, {
                    text: '<i class="fa fa-times-circle red-button"></i> <b>Cancelar</b>',
                    handler: function() {
                        fpaddproducto.getForm().reset();
                        winRegProducto.close();
                    }
                }],
            items: [fpaddproducto],
            listeners: {
                show: function() {
                    tfCodigo.focus(false, 100);
                }
            }
        });
        winRegProducto.show();
        winRegProducto.doLayout();
        function adicionarproducto(ind) {
            var paramsAdd = Ext.getCmp('fpaddproducto').getForm().getValues();
            if (Ext.getCmp('fpaddproducto').getForm().isValid()) {
                MostrarBarraProgreso('Adicionando producto...');
                Ext.Ajax.request({
                    url: 'addproducto',
                    method: 'POST',
                    params: paramsAdd,
                    callback: function(options, success, response) {
                        var responseData = Ext.decode(response.responseText);
                        Ext.MessageBox.hide();
                        if (parseInt(responseData) === 1) {
                            Ext.getCmp('fpaddproducto').getForm().reset();
                            if (ind !== 'apli')
                                winRegProducto.close();
                            MensajeInformacion('El producto fue adicionado correctamente.');
                            stProducto.reload();
                        } else if (parseInt(responseData) === 2) {
                            MensajeError('El producto que intenta adicionar ya existe.<br>Cambie el nombre del producto que desea adicionar.');
                        } else {
                            MensajeError('No fue posible adicionar el nuevo producto.');
                        }
                    }
                });
            }
        }
    }
    function mostrarModificar() {
        if (smProducto.getSelected()) {
            var tfnombre = new Ext.form.TextField({
                id: 'tfnombre',
                fieldLabel: 'Nombre',
                name: 'nombre',
                maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,\/\º]+)+$/,
                regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,\/\º]+)+$/,
                allowBlank: false,
                maxLength: 255,
                anchor: '100%'
            });
            var tfCodigo = new Ext.form.TextField({
                id: 'tfCodigo',
                fieldLabel: "C&oacute;digo",
                maxLength: 12,
                name: 'codigo',
                maskRe: /[\d\.]/i,
                regex: /^[\d\.]{1,12}$/,
                allowBlank: false,
                anchor: '100%'
            });
            var nfPrecio = new Ext.form.NumberField({
                id: 'nfPrecio',
                name: 'precio',
                maxLength: 19,
                allowBlank: true,
                allowNegative: false,
                decimalPrecision: 2,
                maskRe: /[0-9.]$/,
                fieldLabel: 'Precio',
                style: 'text-align:right',
                anchor: '100%',
                regexText: "Solo se permiten n&uacute;meros flotantes.",
                invalidText: "No es un valor v&aacute;lido."
            });
            var tadescripcion = new Ext.form.TextArea({
                id: 'tadescripcion',
                fieldLabel: 'Descripci&oacute;n',
                name: 'descripcion',
                maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,\/\º]+)+$/,
                regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,\/\º]+)+$/,
                allowBlank: false,
                maxLength: 255,
                width: 450
            });
            var stunidadmedida = new Ext.data.Store({
                url: 'loaddataunidadmedida',
                reader: new Ext.data.JsonReader({
                    id: "idstunidadmedida"
                }, [{
                        name: 'idunidadmedida'
                    },
                    {
                        name: 'nombre'
                    },
                    {
                        name: 'abreviatura'
                    }
                ]),
                listeners: {
                    'beforeload': function() {
                        loadMask("Cargando unidades de medidas...");
                    },
                    'load': function() {
                        lMask.hide();
                    }
                }
            });
            var cbunidadmedida = new Ext.form.ComboBox({
                id: 'cbunidadmedida',
                fieldLabel: 'Unidad de medida',
                mode: 'local',
                emptyText: 'Seleccione...',
                valueField: 'idunidadmedida',
                hiddenName: 'idunidadmedida',
                displayField: 'abreviatura',
                store: stunidadmedida,
                typeAhead: true,
                resizable: true,
                triggerAction: 'all',
                selectOnFocus: true,
                editable: true,
                allowBlank: false,
                anchor: '100%',
                tpl: '<tpl for="."><div ext:qtip="{nombre}" class="x-combo-list-item">{abreviatura}</div></tpl>'
            });
            var cbCategoriaProducto = new Ext.form.ComboBox({
                id: 'cbCategoriaProducto',
                name: 'categoria',
                fieldLabel: 'Categor&iacute;a',
                mode: 'local',
                emptyText: 'Seleccione..',
                store: new Ext.data.SimpleStore({
                    fields: ['idcategoria', 'categoria'],
                    data: categorias
                }),
                displayField: 'categoria',
                hiddenName: 'idcategoria',
                valueField: 'idcategoria',
                typeAhead: true,
                forceSelection: true,
                triggerAction: 'all',
                selectOnFocus: true,
                editable: false,
                allowBlank: false,
                anchor: '100%'
            });
            var fpmodproducto = new Ext.FormPanel({
                autoHeight: true,
                frame: true,
                id: 'fpmodproducto',
                labelAlign: 'top',
                items: [{
                        layout: 'column',
                        items: [{
                                layout: 'form',
                                columnWidth: .3,
                                items: [tfCodigo]
                            }, {
                                style: 'margin:0 0 0 10',
                                layout: 'form',
                                columnWidth: .7,
                                items: [tfnombre]
                            }]
                    }, {
                        layout: 'column',
                        items: [{
                                layout: 'form',
                                columnWidth: .3,
                                items: [cbunidadmedida]
                            }, {
                                style: 'margin:0 0 0 10',
                                layout: 'form',
                                columnWidth: .45,
                                items: [cbCategoriaProducto]
                            }, {
                                style: 'margin:0 0 0 10',
                                layout: 'form',
                                columnWidth: .25,
                                items: [nfPrecio]
                            }]
                    }, tadescripcion]
            });
            var winRegProducto = new Ext.Window({
                constrain: true,
                modal: true,
                labelAlign: 'top',
                frame: true,
                resizable: false,
                bodyStyle: 'padding:5px 5px 5px',
                border: false,
                closeAction: 'close',
                layout: 'fit',
                title: 'Modificar producto',
                width: 490,
                buttons: [{
                        text: '<i class="fa fa-check-circle green-button"></i> <b>Aceptar</b>',
                        handler: function() {
                            modificarproducto();
                        }
                    }, {
                        text: '<i class="fa fa-times-circle red-button"></i> <b>Cancelar</b>',
                        handler: function() {
                            fpmodproducto.getForm().reset();
                            winRegProducto.close();
                        }
                    }]
            });
            var responseDataMod = new Object();
            stunidadmedida.load({
                callback: function() {
                    fpmodproducto.getForm().loadRecord(smProducto.getSelected());
                    cbunidadmedida.setValue(smProducto.getSelected().data.idunidadmedida);
                }
            });
            winRegProducto.add(fpmodproducto);
            winRegProducto.show();
            winRegProducto.doLayout();
        }
        function modificarproducto() {
            if (Ext.getCmp('fpmodproducto').getForm().isValid()) {
                if ((Ext.getCmp('tfCodigo').getValue() == smProducto.getSelected().data.codigo &&
                        Ext.getCmp('tfnombre').getValue() == smProducto.getSelected().data.nombre &&
                        Ext.getCmp('nfPrecio').getValue() == smProducto.getSelected().data.precio &&
                        Ext.getCmp('tadescripcion').getValue() == smProducto.getSelected().data.descripcion &&
                        Ext.getCmp('cbunidadmedida').getValue() == smProducto.getSelected().data.idunidadmedida &&
                        Ext.getCmp('cbCategoriaProducto').getValue() == smProducto.getSelected().data.idcategoria &&
                        responseDataMod == -1) ||
                        (Ext.getCmp('tfCodigo').getValue() == smProducto.getSelected().data.codigo &&
                                Ext.getCmp('tfnombre').getValue() == smProducto.getSelected().data.nombre &&
                                Ext.getCmp('nfPrecio').getValue() == smProducto.getSelected().data.precio &&
                                Ext.getCmp('tadescripcion').getValue() == smProducto.getSelected().data.descripcion &&
                                Ext.getCmp('cbunidadmedida').getValue() == smProducto.getSelected().data.idunidadmedida &&
                                Ext.getCmp('cbCategoriaProducto').getValue() == smProducto.getSelected().data.idcategoria)
                        ) {
                    MensajeInformacion("No se han realizado cambios.");
                } else {
                    var paramsMod = Ext.getCmp('fpmodproducto').getForm().getValues();
                    paramsMod.idproducto = smProducto.getSelected().data.idproducto;
                    MostrarBarraProgreso('Modificando producto...');
                    Ext.Ajax.request({
                        url: 'modproducto',
                        method: 'POST',
                        params: paramsMod,
                        callback: function(options, success, response) {
                            responseData = Ext.decode(response.responseText);
                            Ext.MessageBox.hide();
                            if (parseInt(responseData) === 1) {
                                Ext.getCmp('fpmodproducto').getForm().reset();
                                winRegProducto.close();
                                MensajeInformacion('El producto fue modificado correctamente.');
                                stProducto.reload();
                            } else if (parseInt(responseData) === 2)
                                MensajeError('El producto que intenta modificar ya existe.<br>\Cambie el nombre del producto que desea modificar.');
                            else {
                                MensajeError('No fue posible modificar el nuevo producto.');
                            }
                            //lMask.hide();
                        }
                    });
                }
            }
        }
    }
    function eliminarProducto() {
        var t = smProducto.getSelected().data.nombre;
        function confirmar(btn) {
            if (btn === 'ok')
                deleteProducto();
        }
        MensajeInterrogacion('Confirmaci\xF3n', String.fromCharCode(191) + 'Est\xE1 seguro que desea eliminar el producto seleccionado?', confirmar);
        function deleteProducto() {
            if (smProducto.getSelected()) {
                MostrarBarraProgreso('Eliminando producto...');
                Ext.Ajax.request({
                    url: 'delproducto',
                    method: 'POST',
                    callback: function(options, success, response) {
                        responseData = Ext.decode(response.responseText);
                        Ext.MessageBox.hide();
                        if (responseData == 1) {
                            MensajeInformacion('El producto fue eliminado correctamente.');
                            stProducto.baseParams.criterio = '';
                            stProducto.reload();
                        } else if (responseData == 2) {
                            MensajeError('El producto tiene datos asociados y no puede ser eliminado.');
                        } else {
                            MensajeError('No fue posible realizar la acci&oacute;n.<br>P&oacute;ngase en contacto con el administrador del sistema para tramitar el problema.');
                        }
                    },
                    params: {
                        idproducto: smProducto.getSelected().data.idproducto
                    }
                });
            }
        }
    }
    function activateProducto() {
        function confirmar(btn) {
            if (btn === 'ok')
                deactivateProducto();
        }
        var msgOK, msg, msgsuccess;
        if (smProducto.getSelected().data.activo == '0') {
            msgOK = 'activar';
            msg = 'Activando producto...';
            msgsuccess = 'activado';

        } else {
            msgOK = 'desactivar';
            msg = 'Desactivando producto...';
            msgsuccess = 'desactivado';
        }
        MensajeInterrogacion('Confirmaci\xF3n', String.fromCharCode(191) + 'Est\xE1 seguro que desea ' + msgOK + ' el producto seleccionado?', confirmar);
        function deactivateProducto() {
            if (smProducto.getSelected()) {
                MostrarBarraProgreso(msg);
                Ext.Ajax.request({
                    url: 'activateproducto',
                    method: 'POST',
                    callback: function(options, success, response) {
                        responseData = Ext.decode(response.responseText);
                        Ext.MessageBox.hide();
                        if (responseData == 1) {
                            MensajeInformacion('El producto fue ' + msgsuccess + ' correctamente.');
                            stProducto.reload();
                        } else {
                            MensajeError('No fue posible realizar la acci&oacute;n.<br>P&oacute;ngase en contacto con el administrador del sistema para tramitar el problema.');
                        }
                    },
                    params: {
                        idproducto: smProducto.getSelected().data.idproducto,
                        activate: (smProducto.getSelected().data.activo == '0') ? 1 : 0
                    }
                });
            }
        }
    }
    function buscarProducto(criterio) {
        stProducto.baseParams.criterio = criterio;
        stProducto.reload({
            params: {
                start: 0,
                limit: 20
            }
        });
    }

    function showStatus(value, metaData, record, rowIndex, colIndex, store) {
        if (value == '0') {
            return '<span class="label label-danger">Inactivo</span>';
        } else {
            return '<span class="label label-success">Activo</span>';
        }
    }
});