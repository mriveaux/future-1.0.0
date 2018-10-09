Ext.QuickTips.init();
Ext.Ajax.timeout = 9000000000;
/******************************************************************************/
var btnAdicionar = new Ext.Button({
    id: 'btnAdicionar',
    text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
    tooltip: 'Adicionar demanda del pr&oacute;ximo a&ntilde;o',
    handler: function() {
        executeVerifyAdd('actionAdd');
    }
});
var btnModificar = new Ext.Button({
    disabled: true,
    id: 'btnModificar',
    text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
    tooltip: 'Modificar datos de la demanda',
    handler: function() {
        if (smdemanda.getSelected() && smdemanda.getSelected().data.estado == 0)
            executeModifyDemanda(smdemanda.getSelected());
    }
});
var btnEliminar = new Ext.Button({
    disabled: true,
    id: 'btneliminar',
    text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
    tooltip: 'Eliminar datos de la demanda',
    handler: function() {
        if (smdemanda.getSelected() && smdemanda.getSelected().data.estado == 0)
            executeVerifyDelete();
    }
});
var btnDetalles = new Ext.Button({
    id: 'btndetalles',
    text: '<i class="fa fa-eye bluedark-button"></i> Ver detalles',
    tooltip: 'Ver datos de la demanda',
    disabled: true,
    handler: function() {
        if (smdemanda.getSelected())
            executeDetailDemanda(smdemanda.getSelected());
    }
});
var btnCambiarestado = new Ext.Button({
    id: 'btncambiarestado',
    text: '<i class="fa fa-thumbs-o-up bluedark-button"></i> Aprobar',
    tooltip: 'Aprobar demanda',
    disabled: true,
    handler: function() {
        if (smdemanda.getSelected() && smdemanda.getSelected().data.estado == 0)
            executeVerifyAproved();
    }
});
var menu = new Ext.menu.Menu({
    items: [{
            text: 'Consolidado',
            listeners: {
                click: function() {
                    if (smdemanda.getSelected())
                        loadDataPreview(smdemanda.getSelected(), 0);
                }
            }
        }, {
            text: 'Por territorios',
            listeners: {
                click: function() {
                    if (smdemanda.getSelected())
                        loadDataPreview(smdemanda.getSelected(), 1);
                }
            }
        }, {
            text: 'Por recursos',
            listeners: {
                click: function() {
                    if (smdemanda.getSelected())
                        loadDataPreview(smdemanda.getSelected(), 2);
                }
            }
        }
    ]
});
var btnImprimir = new Ext.Button({
    id: 'btnimprimir',
    text: '<i class="fa fa-print bluedark-button"></i> Imprimir',
    tooltip: 'Imprimir datos de la demanda',
    disabled: true,
    menu: menu
});

// Store del gest demanda
var stdemanda = new Ext.data.Store({
    id: 'stdemanda',
    name: 'stdemanda',
    url: 'cargardemanda',
    reader: new Ext.data.JsonReader({
        root: 'campos',
        id: 'idRecord',
        totalProperty: 'totalrecords'
    }, [{
            name: 'iddemanda'
        }, {
            name: 'anno'
        }, {
            name: 'fecha'
        }, {
            name: 'estado'
        }, {
            name: 'Productodemandado'
        }]),
    listeners: {
        load: function(e)
        {
            lMask.hide();
            var cm = validarCasaMatriz();
            if (stdemanda.getCount() < 1 && !cm) {
                executeVerifyAdd('add');
            }
            smdemanda.fireEvent('rowdeselect');
        }
    }
});
stdemanda.load({
    params: {
        start: 0,
        limit: 20
    }
});
// RowSelectionModel demanda (seleccion simple)
var smdemanda = new Ext.grid.RowSelectionModel({
    id: 'smdemanda',
    singleSelect: true
});

smdemanda.on({
    rowselect: function(sm, rowIndex, record) {
        btnDetalles.enable();
        btnImprimir.enable();
        if (verifyStatus(record)) {
            btnModificar.enable();
            btnEliminar.enable();
            btnCambiarestado.enable();
        }
        Ext.getCmp('gpdemanda').getView().addRowClass(rowIndex, "negrita");
    },
    rowdeselect: function(sm, rowIndex, record) {
        btnModificar.disable();
        btnEliminar.disable();
        btnDetalles.disable();
        btnCambiarestado.disable();
        btnImprimir.disable();
        Ext.getCmp('gpdemanda').getView().removeRowClass(rowIndex, "negrita");
    }
});

var rowActionDemanda = new Ext.grid.RowActions({
    id: 'rowActionDemanda',
    header: 'Acciones',
    actions: [{
            id: 'actionModificar',
            tooltip: 'Modificar datos de la demanda',
            iconCls: 'fa fa-edit bluedark-button',
            icon: 'fa fa-edit bluedark-button',
            marginLeft: 5
        }, {
            id: 'actionEliminar',
            tooltip: 'Eliminar datos de la demanda',
            iconCls: 'fa fa-trash bluedark-button',
            icon: 'fa fa-trash bluedark-button',
            marginLeft: 5
        }, {
            id: 'actionDetalles',
            tooltip: 'Ver datos de la demanda',
            iconCls: 'fa fa-eye bluedark-button',
            icon: 'fa fa-eye bluedark-button',
            marginLeft: 5
        }, {
            id: 'actionAprobar',
            tooltip: 'Aprobar demanda',
            iconCls: 'fa fa-thumbs-o-up bluedark-button',
            icon: 'fa fa-thumbs-o-up bluedark-button',
            marginLeft: 5
        }
        /*, {
         id: 'actionImprimir',
         tooltip: 'Imprimir datos de la demanda',
         iconCls: 'fa fa-print bluedark-button',
         icon: 'fa fa-print bluedark-button',
         marginLeft: 5
         }*/
    ]
});
// GridPanel demanda
var gpdemanda = new Ext.grid.GridPanel({
    title: 'Demanda',
    id: 'gpdemanda',
    store: stdemanda,
    sm: smdemanda,
    plugins: rowActionDemanda,
    border: false,
    loadMask: true,
    stripeRows: true,
    viewConfig: {
        forceFit: true,
        autoFill: true
    },
    columns: [
        {
            id: 'iddemanda',
            header: 'iddemanda',
            width: 200,
            hidden: true,
            dataIndex: 'iddemanda'
        }, {
            header: 'A&ntilde;o',
            width: 200,
            dataIndex: 'anno'
        }, {
            header: 'Fecha',
            width: 200,
            dataIndex: 'fecha',
            renderer: format_Fecha
        }, {
            header: 'Estado',
            width: 200,
            dataIndex: 'estado',
            renderer: showStatus
        }, rowActionDemanda],
    tbar: [btnAdicionar, btnModificar, btnEliminar, btnDetalles, btnCambiarestado, btnImprimir],
    bbar: new Ext.Feet.PagingToolbar({
        pageSize: 20,
        store: stdemanda,
        displayInfo: true,
        displayMsg: 'Resultados de {0} - {1} de {2}',
        emptyMsg: "No hay resultados para mostrar."
    })
});

var vpdemanda = new Ext.Viewport({
    layout: 'fit',
    items: gpdemanda
});

function verifyStatus(record) {
    return (record.data.estado == 0) ? true : false;
}

rowActionDemanda.on('action', function(grid, record, action, rowIndex, col, e) {
    switch (action) {
        case 'actionAdicionar':
            btnAdicionar.handler.call();
            break;
        case 'actionModificar':
            btnModificar.handler.call();
            break;
        case 'actionEliminar':
            btnEliminar.handler.call();

            break;
        case 'actionDetalles':
            btnDetalles.handler.call();
            break;
        case 'actionAprobar':
            btnCambiarestado.handler.call();
            break;
//        case 'actionImprimir':
//            btnImprimir.handler.call();
//            break;
    }
}, this);

function executeVerifyAdd(action) {
    loadMask('Cargando...');
    Ext.Ajax.request({
        url: 'verificaradicionardemanda',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            lMask.hide();
            if (responseData.campos.length > 0) {// hay elementos para la demanda que se desea adicionar
                showWindowDemanda(action, responseData.anno, responseData.campos);
            }
            else {// no hay pedidos para esa demanda
                MensajeInformacion('No existen pedidos para la demanda del a\xF1o ' + responseData.anno + '.');
            }
        }
    });
}

function executeVerifyDelete() {
    loadMask('Cargando...');
    Ext.Ajax.request({
        url: 'verificareliminardemanda',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            lMask.hide();
            if (responseData == smdemanda.getSelected().data.anno) {// es la ultima demanda
                executeDeleteDemanda(smdemanda.getSelected());
            }
            else {// no es la ultima demanda
                MensajeInformacion('No es posible realizar la acci\xF3n, debe eliminar la demanda del a\xF1o ' + responseData + '.');
            }
        }
    });
}

function executeVerifyAproved() {
    loadMask('Cargando...');
    Ext.Ajax.request({
        url: 'verificaraprobardemanda',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            lMask.hide();
            if ((responseData.length > 0 && responseData[0].estado > 0) || responseData.length === 0) {// 
                executeAprovedDemanda(smdemanda.getSelected());
            }
            else {// no es la ultima demanda
                MensajeInformacion('No es posible realizar la acci\xF3n, debe aprobar la demanda del a\xF1o ' + responseData[0].anno + '.');
            }
        },
        params: {
            anno: smdemanda.getSelected().data.anno - 1
        }
    });
}

function executeModifyDemanda(record) {
    if (record.data.estado == 0) {
        showWindowModifyDemanda(record);
    } else {
        var status = (record.data.estado == 1) ? 'aprobada' : ((record.data.estado == 2) ? 'en uso' : 'cerrada');
        MensajeInformacion('La demanda para el a&ntilde;o ' + record.data.anno + ' se encuentra ' + status + ' y no puede ser modificada.');
    }
}

function showWindowDemanda(action, anno, campos) {
    var sfBuscar = new Ext.form.SearchField({
        id: 'sfBuscar',
        lbTtlElement: 'pedido',
        maskRe: /^[ A-Za-z0-9\-\.]+$/,
        regex: /^[ A-Za-z0-9\-\.]+$/,
        maxLength: 30,
        store: stpedido,
        fnOnSearch: function() {
            buscar(this.getValue(), anno);
        },
        fnOnClear: function() {
            this.reset();
            buscar(this.getValue(), anno);
        }
    });
    loadMask('Cargando...');
    var stpedido = new Ext.data.GroupingStore({
        id: 'stpedido',
        name: 'stpedido',
        url: 'listarpedidos',
        sortInfo: {field: 'nombreproducto', direction: "ASC"},
        groupField: 'entidad',
        reader: new Ext.data.JsonReader({
            root: 'campos',
            id: 'idRecord',
            totalProperty: 'totalrecords'
        }, [{
                name: 'idpedido'
            }, {
                name: 'cantidad'
            }, {
                name: 'fechapedido'
            }, {
                name: 'anno'
            }, {
                name: 'estado'
            }, {
                name: 'idproducto'
            }, {
                name: 'codigo',
                mapping: 'Producto.codigo'
            }, {
                name: 'nombreproducto',
                mapping: 'Producto.nombre'
            }, {
                name: 'unidadmedida',
                mapping: 'Producto.Unidadmedida.nombre'
            }, {
                name: 'entidad'
//                mapping: 'Entidades.entidad'
            }]),
        listeners: {
            load: function(e)
            {
                lMask.hide();
            }
        }
    });
    stpedido.loadData({campos: campos});
// CheckboxSelectionModel pedido (seleccion multiple)
    var smpedido = new Ext.grid.CheckboxSelectionModel({
        id: 'smpedido',
        width: 25,
        singleSelect: false
    });
// GridPanel pedido
    var gppedido = new Ext.grid.GridPanel({
        title: 'Listado de pedidos',
        store: stpedido,
        autoExpandColumn: 'idproducto',
        sm: smpedido,
        border: false,
        loadMask: true,
        autoScroll: true,
        stripeRows: true,
        columns: [smpedido,
            {
                header: 'C&oacute;digo',
                width: 100,
                sortable: true,
                dataIndex: 'codigo'
            }, {
                id: 'idproducto',
                header: 'Producto',
                width: 120,
                sortable: true,
                dataIndex: 'nombreproducto'
            }, {
                header: 'Cantidad',
                width: 120,
                sortable: true,
                align: 'right',
                dataIndex: 'cantidad'
            }, {
                header: 'Unidad medida',
                width: 120,
                sortable: true,
                dataIndex: 'unidadmedida'
            }, {
                header: 'Fecha',
                width: 120,
                sortable: true,
                dataIndex: 'fechapedido',
                renderer: format_Fecha
            }, {
                header: 'A&ntilde;o',
                width: 120,
                dataIndex: 'anno'
            }, {
                header: 'Entidad',
                width: 150,
                dataIndex: 'entidad'
            }, {
                header: 'idpedido',
                hidden: true,
                dataIndex: 'idpedido'
            }, {
                header: 'idproducto',
                hidden: true,
                dataIndex: 'idproducto'
            }],
        tbar: ['->', sfBuscar],
        view: new Ext.grid.GroupingView({
            forceFit: true,
            hideGroupedColumn: true,
            startCollapsed: true,
            groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Elementos" : "Elemento"]})'
        })
    });
    var btnAceptar = new Ext.Button({
        disabled: true,
        text: '<i class="fa fa-check-circle green-button"></i> <b>Aceptar</b>',
        handler: adicionarDemanda
    });
    var btnCancelar = new Ext.Button({
        text: '<i class="fa fa-times-circle red-button"></i> <b>Cancelar</b>',
        hidden: (action === 'actionAdd') ? false : true,
        handler: function() {
            win.close();
        }
    });

    var win = new Ext.Window({
        title: 'Adicionar demanda para el a&ntilde;o ' + anno,
        closable: false,
        border: false,
        layout: 'fit',
        width: 290,
        height: 210,
        resizable: false,
        modal: true,
        closeAction: 'close',
        buttons: [btnAceptar, btnCancelar],
        items: gppedido
    });
    win.show();
    win.maximize();

    smpedido.on({
        rowselect: function() {
            if (smpedido.getSelections().length > 0)
                btnAceptar.enable();
            else
                btnAceptar.disable();
        },
        rowdeselect: function() {
            if (smpedido.getSelections().length > 0)
                btnAceptar.enable();
            else
                btnAceptar.disable();
        }
    });

    function adicionarDemanda() {
        if (smpedido.getSelections().length > 0) {
            MostrarBarraProgreso('Adicionando demanda...');
            Ext.Ajax.request({
                url: 'adicionardemanda',
                method: 'POST',
                callback: function(options, success, response) {
                    responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (responseData == 0) {// 0 significa que adiciono bien
                        win.close();
                        MensajeInformacion('La demanda fue adicionada correctamente.');
                        stdemanda.reload();
                    }
                    else if (responseData == 1) {// 1 significa que ya existe ese nombre de demanda
                        MensajeError('La demanda que intenta adicionar ya existe.');
                    }
                    else {// 2 significa que dio error
                        win.close();
                        MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                    }
                },
                params: {
                    anno: anno,
                    arrpedidos: Ext.encode(getPedidos(smpedido.getSelections()))
                }
            });
        }
    }
    function buscar(cadena, anno) {
        stpedido.baseParams.cadena = cadena;
        stpedido.baseParams.anno = anno;
        stpedido.reload({
            params: {
                start: 0,
                limit: 20
            }
        });
    }
}

function showWindowModifyDemanda(record) {
    var sfBuscar = new Ext.form.SearchField({
        id: 'sfBuscar',
        lbTtlElement: 'pedido',
        maskRe: /^[ A-Za-z0-9\-\.]+$/,
        regex: /^[ A-Za-z0-9\-\.]+$/,
        maxLength: 30,
        store: stpedido,
        fnOnSearch: function() {
            buscar(this.getValue(), record.data.anno, record.data.iddemanda);
        },
        fnOnClear: function() {
            this.reset();
            buscar(this.getValue(), record.data.anno, record.data.iddemanda);
        }
    });
    loadMask('Cargando...');
    var stpedido = new Ext.data.GroupingStore({
        id: 'stpedido',
        name: 'stpedido',
        url: 'listarpedidosmod',
        sortInfo: {field: 'nombreproducto', direction: "ASC"},
        groupField: 'entidad',
        reader: new Ext.data.JsonReader({
            root: 'campos',
            id: 'idRecord',
            totalProperty: 'totalrecords'
        }, [{
                name: 'idpedido'
            }, {
                name: 'cantidad'
            }, {
                name: 'fechapedido'
            }, {
                name: 'anno'
            }, {
                name: 'estado'
            }, {
                name: 'codigo',
                mapping: 'Producto.codigo'
            }, {
                name: 'idproducto'
            }, {
                name: 'nombreproducto',
                mapping: 'Producto.nombre'
            }, {
                name: 'unidadmedida',
                mapping: 'Producto.Unidadmedida.nombre'
            }, {
                name: 'entidad',
                mapping: 'Entidades.entidad'
            }, {
                name: 'selected'
            }]),
        listeners: {
            load: function(e)
            {
                lMask.hide();
                selectRelationPedido();
            }
        }
    });
    stpedido.load({params: {iddemanda: record.data.iddemanda, anno: record.data.anno}});
// CheckboxSelectionModel pedido (seleccion multiple)
    var smpedido = new Ext.grid.CheckboxSelectionModel({
        id: 'smpedido',
        width: 25,
        singleSelect: false
    });
// GridPanel pedido
    var gppedido = new Ext.grid.GridPanel({
        title: 'Listado de pedidos',
        store: stpedido,
        autoExpandColumn: 'idproducto',
        sm: smpedido,
        border: false,
        loadMask: true,
        autoScroll: true,
        stripeRows: true,
        columns: [smpedido,
            {
                header: 'C&oacute;digo',
                width: 100,
                sortable: true,
                dataIndex: 'codigo'
            }, {
                id: 'idproducto',
                header: 'Producto',
                width: 120,
                sortable: true,
                dataIndex: 'nombreproducto'
            }, {
                header: 'Cantidad',
                width: 120,
                sortable: true,
                align: 'right',
                dataIndex: 'cantidad'
            }, {
                header: 'Unidad medida',
                width: 120,
                sortable: true,
                dataIndex: 'unidadmedida'
            }, {
                header: 'Fecha',
                width: 120,
                sortable: true,
                dataIndex: 'fechapedido',
                renderer: format_Fecha
            }, {
                header: 'A&ntilde;o',
                width: 120,
                dataIndex: 'anno'
            }, {
                header: 'Entidad',
                width: 150,
                dataIndex: 'entidad'
            }, {
                header: 'idpedido',
                hidden: true,
                dataIndex: 'idpedido'
            }, {
                header: 'idcliente',
                hidden: true,
                dataIndex: 'idcliente'
            }, {
                header: 'idproducto',
                hidden: true,
                dataIndex: 'idproducto'
            }],
        tbar: ['->', sfBuscar],
        view: new Ext.grid.GroupingView({
            forceFit: true,
            hideGroupedColumn: true,
            startCollapsed: true,
            groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Elementos" : "Elemento"]})'
        })
    });
    var btnAceptar = new Ext.Button({
        disabled: true,
        text: '<i class="fa fa-check-circle green-button"></i> <b>Aceptar</b>',
        handler: function() {
            modificarDemanda();
        }
    });
    var btnCancelar = new Ext.Button({
        text: '<i class="fa fa-times-circle red-button"></i> <b>Cancelar</b>',
        handler: function() {
            win.close();
        }
    });

    var win = new Ext.Window({
        title: 'Modificar demanda para el a&ntilde;o ' + record.data.anno,
        closable: false,
        border: false,
        layout: 'fit',
        width: 290,
        height: 210,
        resizable: false,
        modal: true,
        closeAction: 'close',
        buttons: [btnAceptar, btnCancelar],
        items: gppedido
    });
    win.show();
    win.maximize();

    smpedido.on({
        rowselect: function() {
            if (smpedido.getSelections().length > 0)
                btnAceptar.enable();
            else
                btnAceptar.disable();
        },
        rowdeselect: function() {
            if (smpedido.getSelections().length > 0)
                btnAceptar.enable();
            else
                btnAceptar.disable();
        }
    });

    function modificarDemanda() {
        if (smpedido.getSelections().length > 0) {
            MostrarBarraProgreso('Modificando demanda...');
            Ext.Ajax.request({
                url: 'modificardemanda',
                method: 'POST',
                callback: function(options, success, response) {
                    responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (responseData == 0) {// 0 significa que adiciono bien
                        win.close();
                        MensajeInformacion('La demanda fue modificada correctamente.');
                        stdemanda.reload();
                    }
                    else {// 2 significa que dio error
                        win.close();
                        MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                    }
                },
                params: {
                    iddemanda: record.data.iddemanda,
                    arrpedidosdelete: Ext.encode(getPedidosDelete(stpedido.data.items, smpedido.getSelections())),
                    arrpedidosadd: Ext.encode(getPedidosAdd(smpedido.getSelections()))
                }
            });
        }
    }

    function selectRelationPedido() {
        Ext.each(stpedido.data.items, function(e) {
            if (e.data.selected)
                smpedido.selectRecords(new Array(e), true)
        });
    }

    function getPedidosAdd(selections) {
        var pedidos = new Array();
        Ext.each(selections, function(e) {
            if (!e.data.selected)
                pedidos.push(e.data);
        });
        return pedidos;
    }

    function getPedidosDelete(elements, selections) {
        var pedidosDelete = new Array();
        var pedidosOld = new Array();
        var pedidosSelected = new Array();
        Ext.each(elements, function(e) {
            if (e.data.selected)
                pedidosOld.push(e.data.idpedido);
        });
        Ext.each(selections, function(e) {
            pedidosSelected.push(e.data.idpedido);
        });
        Ext.each(pedidosOld, function(e) {
            if (!pedidosSelected.inArray(e))
                pedidosDelete.push(e);
        });
        return pedidosDelete;
    }
    function buscar(cadena, anno, demanda) {
        stpedido.baseParams.cadena = cadena;
        stpedido.baseParams.anno = anno;
        stpedido.baseParams.iddemanda = demanda;
        stpedido.reload({
            params: {
                start: 0,
                limit: 20
            }
        });
    }
}

function executeDeleteDemanda(record) {
    if (record.data.estado == 0) {
        function confirmar(btn) {
            if (btn == 'ok') {
                eliminaOK();
            }
        }
        MensajeOkCancel('Eliminar demanda', String.fromCharCode(191) + 'Est&aacute; seguro que desea eliminar la demanda para el a&ntilde;o <b>' + record.data.anno + '</b>?', confirmar);

        function eliminaOK() {
            MostrarBarraProgreso('Eliminando demanda...');
            Ext.Ajax.request({
                url: 'eliminardemanda',
                method: 'POST',
                callback: function(options, success, response) {
                    responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (responseData == 1) {
                        MensajeInformacion('La demanda para el a&ntilde;o ' + record.data.anno + ' fue eliminada correctamente.');
                        stdemanda.reload();
                    }
                    else {
                        MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                    }
                },
                params: {
                    iddemanda: record.data.iddemanda,
                    arridpedidos: Ext.encode(getPedidosChangeStatus(record.data.Productodemandado))
                }
            });
        }
    } else {
        var status = (record.data.estado == 1) ? 'aprobada' : ((record.data.estado == 2) ? 'en uso' : 'cerrada');
        MensajeInformacion('La demanda para el a&ntilde;o ' + record.data.anno + ' se encuentra ' + status + ' y no puede ser eliminada.');
    }
}

function executeDetailDemanda(record) {
    var sfBuscar = new Ext.form.SearchField({
        id: 'sfBuscar',
        lbTtlElement: 'pedido',
        maskRe: /^[ A-Za-z0-9\-\.]+$/,
        regex: /^[ A-Za-z0-9\-\.]+$/,
        maxLength: 30,
        store: stpedido,
        fnOnSearch: function() {
            buscar(this.getValue(), record.data.iddemanda);
        },
        fnOnClear: function() {
            this.reset();
            buscar(this.getValue(), record.data.iddemanda);
        }
    });
    loadMask('Cargando...');
    var stpedido = new Ext.data.GroupingStore({
        url: 'listardetailpedidos',
        sortInfo: {field: "nombreproducto", direction: "ASC"},
        groupField: 'entidad',
        reader: new Ext.data.JsonReader({
            root: 'campos',
            id: 'idRecord',
            totalProperty: 'totalrecords'
        }, [{
                name: 'idpedido'
            }, {
                name: 'cantidad'
            }, {
                name: 'fechapedido'
            }, {
                name: 'anno'
            }, {
                name: 'estado'
            }, {
                name: 'idproducto'
            }, {
                name: 'codigo',
                mapping: 'Producto.codigo'
            }, {
                name: 'nombreproducto',
                mapping: 'Producto.nombre'
            }, {
                name: 'unidadmedida',
                mapping: 'Producto.Unidadmedida.nombre'
            }, {
                name: 'entidad'
            }, {
                name: 'orden'
            }]),
        listeners: {
            load: function(e)
            {
                lMask.hide();
            }
        }
    });
    stpedido.load({params: {iddemanda: record.data.iddemanda}});

    var smpedido = new Ext.grid.RowSelectionModel({
        id: 'smpedido',
        singleSelect: true
    });
// GridPanel pedido
    var gppedido = new Ext.grid.GridPanel({
        title: 'Listado de pedidos',
        store: stpedido,
        autoExpandColumn: 'idproducto',
        sm: smpedido,
        border: false,
        loadMask: true,
        autoScroll: true,
        stripeRows: true,
        columns: [
            {
                header: 'C&oacute;digo',
                width: 100,
                sortable: true,
                dataIndex: 'codigo'
            }, {
                id: 'idproducto',
                header: 'Producto',
                width: 120,
                sortable: true,
                dataIndex: 'nombreproducto'
            }, {
                header: 'Cantidad',
                width: 120,
                sortable: true,
                align: 'right',
                dataIndex: 'cantidad'
            }, {
                header: 'Unidad medida',
                width: 120,
                sortable: true,
                dataIndex: 'unidadmedida'
            }, {
                header: 'Fecha',
                width: 120,
                sortable: true,
                dataIndex: 'fechapedido',
                renderer: format_Fecha
            }, {
                header: 'A&ntilde;o',
                width: 120,
                dataIndex: 'anno'
            }, {
                header: 'Entidad',
                width: 150,
                dataIndex: 'entidad'
            }, {
                header: 'idpedido',
                hidden: true,
                dataIndex: 'idpedido'
            }, {
                header: 'idproducto',
                hidden: true,
                dataIndex: 'idproducto'
            }],
        tbar: ['->', sfBuscar],
        view: new Ext.grid.GroupingView({
            forceFit: true,
            hideGroupedColumn: true,
            startCollapsed: true,
            groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Elementos" : "Elemento"]})'
        })
    });

    var win = new Ext.Window({
        title: 'Detalles de la demanda para el a&ntilde;o ' + record.data.anno,
        closable: false,
        border: false,
        layout: 'fit',
        width: 290,
        height: 210,
        resizable: false,
        modal: true,
        closeAction: 'close',
        buttons: [{
                text: '<i class="fa fa-times-circle red-button"></i> <b>Cerrar</b>',
                handler: function() {
                    win.close();
                }
            }],
        items: gppedido
    });
    win.show();
    win.maximize();
    function buscar(cadena, iddemanda) {
        stpedido.baseParams.cadena = cadena;
        stpedido.baseParams.iddemanda = iddemanda;
        stpedido.reload({
            params: {
                start: 0,
                limit: 20
            }
        });
    }
}

function executeAprovedDemanda(record) {
    if (record.data.estado == 0) {
        function confirmar(btn) {
            if (btn == 'ok') {
                aprobarOK();
            }
        }
        MensajeInterrogacion('Aprobar demanda', String.fromCharCode(191) + 'Est&aacute; seguro que desea aprobar la demanda para el a&ntilde;o ' + record.data.anno + '?<br>Esta acci&oacute;n no se podr&aacute; deshacer.', confirmar);

        function aprobarOK() {
            MostrarBarraProgreso('Aprobando demanda...');
            Ext.Ajax.request({
                url: 'aprobardemanda',
                method: 'POST',
                callback: function(options, success, response) {
                    responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (responseData == 1) {
                        MensajeInformacion('La demanda para el a&ntilde;o ' + record.data.anno + ' fue aprobada correctamente.');
                        stdemanda.reload();
                    }
                    else {
                        MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                    }
                },
                params: {
                    iddemanda: record.data.iddemanda
                }
            });
        }
    } else {
        MensajeInformacion('La demanda para el a&ntilde;o ' + record.data.anno + ' se encuentra aprobada.');
    }
}

function loadDataPreview(record, type) {//type = 0->consolidado, 1->por entidades
    loadMask('Cargando...');
    Ext.Ajax.request({
        url: 'loadDataPreview',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            if (responseData.elements.length > 0) {
                var printView = new Ext.PrintView({paperSize: "A4", orientation: "Horizontal", reportType: "HTML", data: responseData.elements});
                printView.show();
            }
            else {
                MensajeError('Error al procesar los datos.<br>P\xF3ngase en contacto con el administrador del sistema.');
            }
//            if (responseData.success == true) {
//                var defaultComponentValues = {
//                    paperSize: "A4",
//                    orientation: "Horizontal",
//                    reportType: "HTML"
//                };
//                var printView = new Ext.PrintView(responseData.elements, "/comun/PrintView/", defaultComponentValues);
//                printView.show();
//            }
//            else {
//                MensajeError('Error al procesar los datos.<br>P\xF3ngase en contacto con el administrador del sistema.');
//            }
            lMask.hide();
        },
        params: {
            iddemanda: record.data.iddemanda,
            type: type
        }
    });
}

function getPedidosChangeStatus(elements) {
    var arrIdPedidos = new Array();
    Ext.each(elements, function(e) {
        arrIdPedidos.push({idpedido: e.idpedido});
    });
    return arrIdPedidos;
}

function getPedidos(seleccion) {
    var arrResponse = new Array();
    Ext.each(seleccion, function(e) {
        arrResponse.push({idpedido: e.data.idpedido, idcliente: e.data.idcliente, cantidad: e.data.cantidad});
    });
    return arrResponse;
}

function showStatus(value, metaData, record, rowIndex, colIndex, store) {
    if (value == 0) {
        return '<span class="label label-warning">En proceso</span>';
    } else if (value == 1) {
        return '<span class="label label-success">Aprobada</span>';
    } else if (value == 2) {
        return '<span class="label label-primary">En uso</span>';
    } else {
        return '<span class="label label-danger">Cerrada</span>';
    }
}

//solo visible para administradores de primer nivel
function validarCasaMatriz() {
    if (window.parent.perfil.identidad_padre != "0") {
        gpdemanda.setDisabled(true);
        stdemanda.removeAll();
        MensajeInformacion('La funcionalidad solo est\xE1 disponible para el departamento de operaciones.');
        return true;
    } else
        return false;
}