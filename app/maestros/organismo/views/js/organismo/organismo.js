/* global Ext, lMask */
Ext.QuickTips.init();
/******************************************************************************/
var btnadicionar = new Ext.Button({
    disabled: false,
    id: 'btnadicionar',
    text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
    tooltip: 'Adicionar organismo',
    handler: adicionarOrganismo
});
var btnmodificar = new Ext.Button({
    id: 'btnmodificar',
    text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
    tooltip: 'Modificar organismo',
    disabled: true,
    handler: modificarOrganismo
});
var btneliminar = new Ext.Button({
    id: 'btnbuscar',
    text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
    tooltip: 'Eliminar organismo',
    disabled: true,
    handler: eliminarOrganismo
});
var storganismo = new Ext.data.Store({
    id: 'storganismo',
    url: 'cargarorganismo',
    reader: new Ext.data.JsonReader({
        root: 'campos',
        id: 'idRecord',
        totalProperty: 'totalrecords'
    }, [{
            name: 'idorganismo'
        }, {
            name: 'nombre'
        }, {
            name: 'abreviatura'
        }]),
    baseParams: {
        cadena: ''
    },
    listeners: {
        load: function(e)
        {
            lMask.hide();
            smorganismo.fireEvent('rowdeselect');
        }
    }
});
var tfbuscar = new Ext.form.SearchField({
    id: 'tfbuscar',
    maskRe: /^[ a-zA-Z0-9]+$/,
    width: 200,
    maxLength: 30,
    store: storganismo,
    fnOnSearch: function() {
        Buscarorganismo(tfbuscar.getValue());
    },
    fnOnClear: function() {
        this.reset();
        Buscarorganismo(tfbuscar.getValue());
    }
});

var tfnombre = new Ext.form.TextField({
    id: 'tfnombre',
    fieldLabel: 'Nombre',
    maskRe: /^[ A-Za-z0-9\-\.]+$/,
    allowBlank: false,
    maxLength: 255,
    width: 200
});
var tfabreviatura = new Ext.form.TextField({
    id: 'tfabreviatura',
    fieldLabel: 'Abreviatura',
    maskRe: /^[ A-Za-z0-9\-\.]+$/,
    allowBlank: false,
    maxLength: 50,
    width: 100
});

/******************************************************************************/
storganismo.load({
    params: {
        start: 0,
        limit: 20
    }
});
// RowSelectionModel organismo (seleccion simple)
var smorganismo = new Ext.grid.RowSelectionModel({
    singleSelect: true
});
smorganismo.on({
    rowselect: function() {
        btnmodificar.enable();
        btneliminar.enable();
        tfnombre.setValue(smorganismo.getSelected().data.nombre);
        tfabreviatura.setValue(smorganismo.getSelected().data.abreviatura);
    },
    rowdeselect: function() {
        btnmodificar.disable();
        btneliminar.disable();
        Ext.getCmp('tfnombre').reset();
        Ext.getCmp('tfabreviatura').reset();
    }
});

var gporganismo = new Ext.grid.GridPanel({
    title: 'Organismo',
    store: storganismo,
    sm: smorganismo,
    border: false,
    loadMask: true,
    stripeRows: true,
    viewConfig: {
        forceFit: true,
        autoFill: true
    },
    columns: [{
            hidden: true,
            hideable: false,
            sortable: false,
            dataIndex: 'idorganismo'
        }, {
            id: 'nombre',
            header: 'Nombre',
            width: 300,
            dataIndex: 'nombre'
        }, {
            header: 'Abreviatura',
            width: 200,
            dataIndex: 'abreviatura'
        }],
    tbar: [new Ext.Toolbar.TextItem('Nombre: '), tfnombre, new Ext.Toolbar.TextItem(' Abreviatura: '), tfabreviatura, btnadicionar, btnmodificar, btneliminar, '->', tfbuscar, new Ext.Toolbar.TextItem(' ')],
    bbar: new Ext.Feet.PagingToolbar({
        pageSize: 20,
        store: storganismo,
        displayInfo: true,
        displayMsg: 'Resultados de {0} - {1} de {2}',
        emptyMsg: "No hay resultados para mostrar."
    })
});

// view port
var vporganismo = new Ext.Viewport({
    layout: 'fit',
    items: gporganismo
});

function adicionarOrganismo() {
    if (Ext.getCmp('tfnombre').isValid() && Ext.getCmp('tfabreviatura').isValid()) {
        MostrarBarraProgreso('Adicionando organismo...');
        Ext.Ajax.request({
            url: 'adicionarorganismo',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 1) {
                    Ext.getCmp('tfnombre').reset();
                    Ext.getCmp('tfabreviatura').reset();
                    MensajeConfirmacion('El organismo fue adicionado correctamente.');
                    storganismo.baseParams.cadena = '';
                    storganismo.reload({
                        params: {
                            start: 0,
                            limit: 20
                        }
                    });
                }
                else if (responseData == 2)
                    MensajeError('El organismo que intenta adicionar ya existe.<br>Cambie el nombre del organismo que desea adicionar.');
                else {
                    MensajeError('No fue posible adicionar el nuevo organismo.');
                }
            },
            params: {
                nombre: tfnombre.getValue(),
                abreviatura: tfabreviatura.getValue()
            }
        });
    }
}

function modificarOrganismo() {
    if (Ext.getCmp('tfnombre').isValid() && Ext.getCmp('tfabreviatura').isValid() && smorganismo.getSelected().data.idorganismo) {
        if (Ext.getCmp('tfnombre').getValue() == smorganismo.getSelected().data.nombre && Ext.getCmp('tfabreviatura').getValue() == smorganismo.getSelected().data.abreviatura) {
            MensajeInformacion("No se han realizado cambios.")
        } else {
            MostrarBarraProgreso('Modificando organismo...');
            Ext.Ajax.request({
                url: 'modificarorganismo',
                method: 'POST',
                callback: function(options, success, response) {
                    responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (responseData == 1) {
                        Ext.getCmp('tfnombre').reset();
                        Ext.getCmp('tfabreviatura').reset();
                        MensajeConfirmacion('El organismo fue modificado correctamente.');
                        storganismo.baseParams.cadena = '';
                        storganismo.reload({
                            params: {
                                start: 0,
                                limit: 20
                            }
                        });
                    } else if (responseData == 2)
                        MensajeError('El organismo que intenta modificar ya existe.<br>\Cambie el nombre del organismo que desea modificar.');
                    else {
                        MensajeError('No fue posible modificar el organismo.');
                    }
                },
                params: {
                    idorganismo: smorganismo.getSelected().data.idorganismo,
                    nombre: tfnombre.getValue(),
                    abreviatura: tfabreviatura.getValue()
                }
            });
        }
    }
}

function eliminarOrganismo() {
    var t = smorganismo.getSelected().data.nombre;
    function confirmar(btn) {
        if (btn === 'ok')
            deleteOrganismo();
    }
    MensajeOkCancel('Confirmaci\xF3n', String.fromCharCode(191) + 'Est\xE1 seguro que desea eliminar el organismo <b>' + t + '</b>?', confirmar);
    function deleteOrganismo() {
        if (smorganismo.getSelected()) {
            MostrarBarraProgreso('Eliminando organismo...');
            Ext.Ajax.request({
                url: 'eliminarorganismo',
                method: 'POST',
                callback: function(options, success, response) {
                    responseData = Ext.decode(response.responseText);
                    Ext.getCmp('tfnombre').reset();
                    Ext.getCmp('tfabreviatura').reset();
                    Ext.MessageBox.hide();
                    if (responseData == 1) {
                        MensajeConfirmacion('El organismo fue eliminado correctamente.');
                        storganismo.baseParams.cadena = '';
                        storganismo.reload({
                            params: {
                                start: 0,
                                limit: 20
                            }
                        });
                    }
                    else if (responseData == 2) {
                        MensajeError('El organismo tiene datos asociados y no puede ser eliminado.');
                    }
                    else {
                        MensajeError('No fue posible realizar la acci&oacute;n.<br>P&oacute;ngase en contacto con el administrador del sistema para tramitar el problema.');
                    }
                },
                params: {
                    idorganismo: smorganismo.getSelected().data.idorganismo
                }
            });
        }
    }
}
function Buscarorganismo(cadena) {
    storganismo.baseParams.cadena = cadena;
    storganismo.reload({
        params: {
            start: 0,
            limit: 20
        }
    });


}