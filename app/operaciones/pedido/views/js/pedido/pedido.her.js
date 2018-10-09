var btnAdicionarHerramienta = new Ext.Button({
    id: 'btnAdicionarHerramienta',
    text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
    tooltip: 'Adicionar pedido',
    handler: function() {
        rowEditorPedidoHerramienta.stopEditing();
        addRowPedidoHerramienta();
    }
});
var btnModificarHerramienta = new Ext.Button({
    disabled: true,
    id: 'btnModificarHerramienta',
    text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
    tooltip: 'Modificar pedido',
    handler: function() {
            var record = Ext.getCmp('gppedidoHerramienta').getSelectionModel().getSelected();
        if (record.data.estado != 3) {
            rowEditorPedidoHerramienta.startEditing(record);
        }
    }
});
var btnEliminarHerramienta = new Ext.Button({
    disabled: true,
    id: 'btnEliminarHerramienta',
    text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
    tooltip: 'Eliminar pedido',
    handler: function() {
        var record = Ext.getCmp('gppedidoHerramienta').getSelectionModel().getSelected();
        executeDeletePedidoHerramienta(Ext.getCmp('gppedidoHerramienta'), record, record);
    }
});
var sfBuscarHerramienta = new Ext.form.SearchField({
    id: 'sfBuscarHerramienta',
    lbTtlElement: 'pedido',
    maskRe: /^[ A-Za-z0-9\-\.]+$/,
    regex: /^[ A-Za-z0-9\-\.]+$/,
    maxLength: 30,
    store: stpedidoHerramienta,
    fnOnSearch: function() {
        buscarPedidoHerramienta(this.getValue());
    },
    fnOnClear: function() {
        this.reset();
        buscarPedidoHerramienta(this.getValue());
    }
});
var stProductoHerramienta = new Ext.data.Store({
    url: 'cargarproductos',
    reader: new Ext.data.JsonReader({
        id: 'idRecord'
    }, [{
            name: 'idproducto',
            type: 'float'
        }, {
            name: 'codigo'
        }, {
            name: 'nombre'
        }, {
            name: 'unidadmedida',
            mapping: 'Unidadmedida.abreviatura'
        }, {
            name: 'precio'
        }])
});
stProductoHerramienta.load({params: {idcategoria: 3}});
var cbCodigoHerramienta = new Ext.form.ComboBox({
    mode: 'local',
    id: 'cbCodigoHerramienta',
    store: stProductoHerramienta,
    valueField: 'idproducto',
    displayField: 'codigo',
    resizable: true,
    typeAhead: true,
    forceSelection: true,
    triggerAction: 'all',
    selectOnFocus: true,
    maskRe: /^[ a-zA-Z]+$/,
    editable: true,
    allowBlank: false,
    anchor: '100%'
});
var cbProductoHerramienta = new Ext.form.ComboBox({
    mode: 'local',
    id: 'cbProductoHerramienta',
    store: stProductoHerramienta,
    valueField: 'idproducto',
    displayField: 'nombre',
    resizable: true,
    typeAhead: true,
    forceSelection: true,
    triggerAction: 'all',
    selectOnFocus: true,
    maskRe: /^[ a-zA-Z]+$/,
    editable: true,
    allowBlank: false,
    anchor: '100%'
});
var tfPrecioHerramienta = new Ext.form.TextField({
    id: 'tfprecioHerramienta',
    maxLength: 19,
    disabled: true,
    style: 'text-align:right',
    disabledClass: 'disabled-component',
    maskRe: /^[0-9]+$/,
    anchor: '100%'
});
var tfCantidadHerramienta = new Ext.form.TextField({
    id: 'tfcantidadHerramienta',
    maxLength: 19,
    disabled: true,
    disabledClass: 'disabled-component',
    maskRe: /^[0-9]+$/,
    anchor: '100%'
});
var tfValorHerramienta = new Ext.form.TextField({
    id: 'tfvalorHerramienta',
    maxLength: 19,
    disabled: true,
    style: 'text-align:right',
    disabledClass: 'disabled-component',
    maskRe: /^[0-9]+$/,
    anchor: '100%'
});
var tfUnidadmedidaHerramienta = new Ext.form.TextField({
    id: 'tfUnidadmedidaHerramienta',
    disabled: true,
    disabledClass: 'disabled-component',
    anchor: '100%'
});
var dfFechaHerramienta = new Ext.form.DateField({
    id: 'dfFechaHerramienta',
    disabled: true,
    disabledClass: 'disabled-component',
    anchor: '100%'
});
var sfAnnoHerramienta = new Ext.form.SpinnerField({
    id: 'sfAnnoHerramienta',
    maxLength: 4,
    minLength: 4,
    allowBlank: false,
    disabled: true,
    disabledClass: 'disabled-component',
    anchor: '100%',
    maskRe: /^[0-9]$/,
    minValue: new Date().format('Y') + 1,
    maxValue: new Date().format('Y') + 1,
    value: new Date().format('Y') + 1
});
var tfStatusHerramienta = new Ext.form.TextField({
    id: 'tfStatusHerramienta',
    disabled: true,
    disabledClass: 'disabled-component',
    value: 'Nuevo',
    anchor: '100%'
});
var nfEneHerramienta = new Ext.form.NumberField({
    id: 'nfEneHerramienta',
    name: 'enero',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfFebHerramienta = new Ext.form.NumberField({
    id: 'nfFebHerramienta',
    name: 'febrero',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfMarHerramienta = new Ext.form.NumberField({
    id: 'nfMarHerramienta',
    name: 'Marzo',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfAbrHerramienta = new Ext.form.NumberField({
    id: 'nfAbrHerramienta',
    name: 'abril',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfMayHerramienta = new Ext.form.NumberField({
    id: 'nfMayHerramienta',
    name: 'mayo',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfJunHerramienta = new Ext.form.NumberField({
    id: 'nfJunHerramienta',
    name: 'junio',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfJulHerramienta = new Ext.form.NumberField({
    id: 'nfJulHerramienta',
    name: 'julio',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfAgoHerramienta = new Ext.form.NumberField({
    id: 'nfAgoHerramienta',
    name: 'agosto',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfSepHerramienta = new Ext.form.NumberField({
    id: 'nfSepHerramienta',
    name: 'septiembre',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfOctHerramienta = new Ext.form.NumberField({
    id: 'nfOctHerramienta',
    name: 'octubre',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfNovHerramienta = new Ext.form.NumberField({
    id: 'nfNovHerramienta',
    name: 'noviembre',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfDicHerramienta = new Ext.form.NumberField({
    id: 'nfDicHerramienta',
    name: 'diciembre',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var lbValorHerramienta = new Ext.form.Label({
    style: 'font-size:12px',
    text: 'Valor total: $ 0.00'
});
cbCodigoHerramienta.on('select', function(combo, record, index) {
    cbProductoHerramienta.setValue(record.data.idproducto);
    tfUnidadmedidaHerramienta.setValue(record.data.unidadmedida);
    tfPrecioHerramienta.setValue(record.data.precio);
    updateValorHerramienta();
});
cbProductoHerramienta.on('select', function(combo, record, index) {
    cbCodigoHerramienta.setValue(record.data.idproducto);
    tfUnidadmedidaHerramienta.setValue(record.data.unidadmedida);
    tfPrecioHerramienta.setValue(record.data.precio);
    updateValorHerramienta();
});
nfEneHerramienta.on('blur', function(field) {
    updateCantidadHerramienta();
});
nfFebHerramienta.on('blur', function(field) {
    updateCantidadHerramienta();
});
nfMarHerramienta.on('blur', function(field) {
    updateCantidadHerramienta();
});
nfAbrHerramienta.on('blur', function(field) {
    updateCantidadHerramienta();
});
nfMayHerramienta.on('blur', function(field) {
    updateCantidadHerramienta();
});
nfJunHerramienta.on('blur', function(field) {
    updateCantidadHerramienta();
});
nfJulHerramienta.on('blur', function(field) {
    updateCantidadHerramienta();
});
nfAgoHerramienta.on('blur', function(field) {
    updateCantidadHerramienta();
});
nfSepHerramienta.on('blur', function(field) {
    updateCantidadHerramienta();
});
nfOctHerramienta.on('blur', function(field) {
    updateCantidadHerramienta();
});
nfNovHerramienta.on('blur', function(field) {
    updateCantidadHerramienta();
});
nfDicHerramienta.on('blur', function(field) {
    updateCantidadHerramienta();
});
var rowActionPedidoHerramienta = new Ext.grid.RowActions({
    id: 'rowActionPedidoHerramienta',
    header: 'Acciones',
    widthSlope: 60,
    actions: [{
            id: 'actionAdicionarHerramienta',
            tooltip: 'Adicionar pedido',
            iconCls: 'fa fa-plus bluedark-button',
            icon: 'fa fa-plus bluedark-button',
            marginLeft: 5,
            width: 16,
            height: 16
        }, {
            id: 'actionModificarHerramienta',
            tooltip: 'Modificar pedido',
            iconCls: 'fa fa-edit bluedark-button',
            icon: 'fa fa-edit bluedark-button',
            marginLeft: 5,
            width: 16,
            height: 16
        }, {
            id: 'actionEliminarHerramienta',
            tooltip: 'Eliminar pedido',
            iconCls: 'fa fa-trash bluedark-button',
            icon: 'fa fa-trash bluedark-button',
            marginLeft: 5,
            width: 16,
            height: 16
        }
    ]
});
var rowEditorPedidoHerramienta = new Ext.grid.RowEditor({
    id: 'rowEditorPedidoHerramienta',
    clicksToEdit: 2,
    iconCls: 'btn',
    saveText: '<i class="fa fa-floppy-o green-button"></i> Guardar',
    cancelText: '<i class="fa fa-times-circle red-button"></i> Cancelar'
});
var stpedidoHerramienta = new Ext.data.Store({
    id: 'stpedidoHerramienta',
    name: 'stpedidoHerramienta',
    url: 'cargarpedido',
    reader: new Ext.data.JsonReader({
        root: 'campos',
        id: 'idRecord',
        totalProperty: 'totalrecords'
    }, [{
            name: 'idpedido'
        }, {
            name: 'cantidad', type: 'float'
        }, {
            name: 'fechapedido'
        }, {
            name: 'anno'
        }, {
            name: 'estado', type: 'float'
        }, {
            name: 'valor', type: 'float'
        }, {
            name: 'idproducto'
        }, {
            name: 'codigoproducto',
            mapping: 'Producto.codigo'
        }, {
            name: 'nombreproducto',
            mapping: 'Producto.nombre'
        }, {
            name: 'unidadmedida',
            mapping: 'Producto.Unidadmedida.nombre'
        }, {
            name: 'precioproducto',
            mapping: 'Producto.precio',
            type: 'float'
        }, {
            name: 'ene'
        }, {
            name: 'feb'
        }, {
            name: 'mar'
        }, {
            name: 'abr'
        }, {
            name: 'may'
        }, {
            name: 'jun'
        }, {
            name: 'jul'
        }, {
            name: 'ago'
        }, {
            name: 'sep'
        }, {
            name: 'oct'
        }, {
            name: 'nov'
        }, {
            name: 'dic'
        }, {
            name: 'motivo'
        }, {
            name: 'recordEditor'
        }]),
    listeners: {
        load: function(e)
        {
            //addRowPedidoHerramienta(true);
//            lMask.hide();
            smpedidoHerramienta.fireEvent('rowdeselect');
            lbValorHerramienta.setText('Valor total: ' + formatoMoneda(stpedidoHerramienta.reader.jsonData.total));
        }
    }
});
stpedidoHerramienta.baseParams.idcategoria = 3;
stpedidoHerramienta.load({
    params: {
        start: 0,
        limit: 20
    }
});
var smpedidoHerramienta = new Ext.grid.RowSelectionModel({
    id: 'smpedidoHerramienta',
    singleSelect: true,
});
smpedidoHerramienta.on({
    rowselect: function(sm, rowIndex, record) {
        Ext.getCmp('gppedidoHerramienta').getView().addRowClass(rowIndex, "negrita");
        if (record.data.estado == 0 || record.data.estado == 2) {
            btnModificarHerramienta.enable();
            btnEliminarHerramienta.enable();
        }
    },
    rowdeselect: function(sm, rowIndex, record) {
        if (record)
            Ext.getCmp('gppedidoHerramienta').getView().removeRowClass(rowIndex, "negrita");
        btnModificarHerramienta.disable();
        btnEliminarHerramienta.disable();
    }
});
var gppedidoHerramienta = new Ext.grid.EditorGridPanel({
    id: 'gppedidoHerramienta',
    store: stpedidoHerramienta,
//    autoExpandColumn: 'idproducto',
    plugins: [rowActionPedidoHerramienta, rowEditorPedidoHerramienta],
    sm: smpedidoHerramienta,
    border: false,
    loadMask: true,
    autoScroll: true,
    stripeRows: true,
    viewConfig: {forceFit: false},
    columns: [{
            header: 'C&oacute;digo',
            width: 100,
            dataIndex: 'codigoproducto',
            sortable: true,
            editor: cbCodigoHerramienta,
            renderer: function(value, metaData, record, rowIndex, colIndex) {
                if (!Ext.isEmpty(value) && typeof value == 'number') {
                    return stProductoHerramienta.getAt(stProductoHerramienta.find('idproducto', value)).data.codigo;
                } else
                    return value;
            }
        }, {
            header: 'Descripci&oacute;n',
            width: 300,
            dataIndex: 'nombreproducto',
            sortable: true,
            editor: cbProductoHerramienta,
            renderer: function(value, metaData, record, rowIndex, colIndex) {
                if (!Ext.isEmpty(value) && typeof value == 'number') {
                    return stProductoHerramienta.getAt(stProductoHerramienta.find('idproducto', value)).data.nombre;
                } else
                    return value;
            }
        }, {
            header: 'Unidad medida',
            width: 100,
            align: 'center',
            dataIndex: 'unidadmedida',
            sortable: true,
            editor: tfUnidadmedidaHerramienta
        }, {
            header: 'Precio',
            width: 100,
            dataIndex: 'precioproducto',
            sortable: true,
            align: 'right',
            editor: tfPrecioHerramienta,
            renderer: formatoMonedaNopeso
        }, {
            header: 'Cant. total',
            width: 100,
            dataIndex: 'cantidad',
            sortable: true,
            align: 'center',
            editor: tfCantidadHerramienta
        }, {
            header: 'Valor',
            width: 100,
            dataIndex: 'valor',
            sortable: true,
            align: 'right',
            editor: tfValorHerramienta,
            renderer: formatoMonedaNopeso
        }, {
            header: 'Fecha',
            hidden: true,
            hideable: true,
            width: 100,
            dataIndex: 'fechapedido',
            renderer: format_Fecha,
            editor: dfFechaHerramienta
        }, {
            header: 'A&ntilde;o',
            width: 100,
            dataIndex: 'anno',
            align: 'center',
            editor: sfAnnoHerramienta
        }, {
            header: 'Status',
            width: 100,
            dataIndex: 'estado',
            sortable: true,
            editor: tfStatusHerramienta,
            renderer: showStatusHerramienta
        }, {
            header: 'E',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'ene',
            editor: nfEneHerramienta
        }, {
            header: 'F',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'feb',
            editor: nfFebHerramienta
        }, {
            header: 'M',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'mar',
            editor: nfMarHerramienta
        }, {
            header: 'A',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'abr',
            editor: nfAbrHerramienta
        }, {
            header: 'M',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'may',
            editor: nfMayHerramienta
        }, {
            header: 'J',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'jun',
            editor: nfJunHerramienta
        }, {
            header: 'J',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'jul',
            editor: nfJulHerramienta
        }, {
            header: 'A',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'ago',
            editor: nfAgoHerramienta
        }, {
            header: 'S',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'sep',
            editor: nfSepHerramienta
        }, {
            header: 'O',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'oct',
            editor: nfOctHerramienta
        }, {
            header: 'N',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'nov',
            editor: nfNovHerramienta
        }, {
            header: 'D',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'dic',
            editor: nfDicHerramienta
        }, {
            header: 'idpedido',
            hidden: true,
            dataIndex: 'idpedido'
        }, {
            header: 'idproducto',
            hidden: true,
            dataIndex: 'idproducto'
        }, rowActionPedidoHerramienta],
    tbar: [btnAdicionarHerramienta, btnModificarHerramienta, btnEliminarHerramienta, '->', lbValorHerramienta, new Ext.Toolbar.Separator(), ' ', sfBuscarHerramienta],
    bbar: new Ext.Feet.PagingToolbar({
        pageSize: 20,
        store: stpedidoHerramienta,
        displayInfo: true,
        displayMsg: 'Resultados de {0} - {1} de {2}',
        emptyMsg: "No hay resultados para mostrar."
    })
            ,
    listeners: {
        mouseover: function(event) {
            var t = event.getTarget();
            var v = this.getView();
            var rowIndex = v.findRowIndex(t);
            if (rowIndex !== false) {
                var rec = this.getStore().getAt(rowIndex);
                if (rec.data.motivo != '' && rec.data.motivo != null) {
                    var ttHtml = '<span style="padding-left: 10px; padding-right: 5px;">' + rec.data.motivo + '</span> <br><br>';

                    new Ext.ToolTip({
                        target: t,
                        autoWidth: true,
                        autoHeight: true,
                        maxWidth: 800,
                        minWidth: 500,
                        dismissDelay: 0,
                        showDelay: 100,
                        bodyStyle: "background-color:#D5E2F2;padding:5px 5px;border: 2px solid #5fa2dd; border-radius: 4px;",
                        frame: false,
                        shadow: false,
                        floating: true,
                        trackMouse: true,
                        html: '<table width="100%" border="0" cellspacing="0" cellpadding="1" style="text-align: center; font-size: 11px">' +
                                '<tr><table width="100%" border="0" cellspacing="0" cellpadding="2">' +
                                '<tr>' + '<td style="vertical-align:top; font: normal 11.5px arial, tahoma, helvetica, sans-serif !important;">' +
                                '<span style="padding-left: 10px; padding-right: 5px;"><b>Motivo de revisi&oacute;n:</b></span>' +
                                '<br><br>' + ttHtml + '</td>' + '</tr>' + '</table>' + '</td>' + '</tr></table></div>'
                    });
                }
            }

        }
    }
});
rowActionPedidoHerramienta.on('action', function(grid, record, action, rowIndex) {
    switch (action) {
        case 'actionAdicionarHerramienta':
            btnAdicionarHerramienta.handler.call();
            break;
        case 'actionModificarHerramienta':
            if (!btnModificarHerramienta.disabled)
                btnModificarHerramienta.handler.call();
            break;
        case 'actionEliminarHerramienta':
            if (!btnEliminarHerramienta.disabled)
                btnEliminarHerramienta.handler.call();
            break;
    }
});
rowEditorPedidoHerramienta.on({
    beforeedit: function(roweditor, grid, record, rowIndex) {
        /*if (record.data.recordEditor) {
            roweditor.stopEditing();
            addRowPedidoHerramienta();
            grid.getSelectionModel().selectRow(1);
            roweditor.startEditing(1);
            return false;
        } else */if (record.data.estado == '1') {
            MensajeInformacion('El pedido fue aceptado y no puede ser modificado.');
            return false;
        }
    },
    afteredit: function(roweditor, grid, object, record, rowIndex) {
        testChangesHerramienta(record, object);
    }
});
function executeDeletePedidoHerramienta(grid, record, rowIndex) {
    if (record.data.recordEditor)
        return;
    else {
        deletePedidoHerramienta();
    }
}
function testChangesHerramienta(record, object) {
    if (record.data.idpedido == '0')
        adicionarPedidoHerramienta(record.data.idproducto, record.data.cantidad, record.data.anno, record.data.ene, record.data.feb, record.data.mar, record.data.abr, record.data.may, record.data.jun, record.data.jul, record.data.ago, record.data.sep, record.data.oct, record.data.nov, record.data.dic);
    else
        modificarPedidoHerramienta(record.data.idpedido, record.data.idproducto, record.data.cantidad, record.data.anno, record.data.ene, record.data.feb, record.data.mar, record.data.abr, record.data.may, record.data.jun, record.data.jul, record.data.ago, record.data.sep, record.data.oct, record.data.nov, record.data.dic);
}
function addRowPedidoHerramienta(isEditor) {
    var record = Ext.data.Record.create([{
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
            name: 'valor'
        }, {
            name: 'idproducto'
        }, {
            name: 'codigoproducto'
        }, {
            name: 'nombreproducto'
        }, {
            name: 'unidadmedida'
        }, {
            name: 'precioproducto'
        }, {
            name: 'ene'
        }, {
            name: 'feb'
        }, {
            name: 'mar'
        }, {
            name: 'abr'
        }, {
            name: 'may'
        }, {
            name: 'jun'
        }, {
            name: 'jul'
        }, {
            name: 'ago'
        }, {
            name: 'sep'
        }, {
            name: 'oct'
        }, {
            name: 'nov'
        }, {
            name: 'dic'
        }, {
            name: 'recordEditor'
        }]);

    newRecord = new record({
        idpedido: 0,
        cantidad: 0,
        fechapedido: new Date().format('Y-m-d'),
        anno: new Date().format('Y') + 1,
        estado: (isEditor === true) ? 3 : 0,
        valor: 0,
        idproducto: "",
        codigoproducto: "",
        nombreproducto: "",
        unidadmedida: "",
        precioproducto: 0,
        ene: 0,
        feb: 0,
        mar: 0,
        abr: 0,
        may: 0,
        jun: 0,
        jul: 0,
        ago: 0,
        sep: 0,
        oct: 0,
        nov: 0,
        dic: 0,
        recordEditor: (isEditor === true) ? true : false
    });

    (isEditor === true) ? stpedidoHerramienta.insert(0, newRecord) : stpedidoHerramienta.insert(stpedidoHerramienta.getCount(), newRecord);
    rowEditorPedidoHerramienta.startEditing(stpedidoHerramienta.getCount() - 1);
}
function adicionarPedidoHerramienta(argIdproducto, argCantidad, argAnno, argEne, argFeb, argMar, argAbr, argMay, argJun, argJul, argAgo, argSep, argOct, argNov, argDic) {
    MostrarBarraProgreso('Adicionando pedido...');
    Ext.Ajax.request({
        url: 'adicionarpedido',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (responseData == 0) {// 0 significa que adiciono bien
                MensajeInformacion('El pedido fue adicionado correctamente.');
                stpedidoHerramienta.reload();
            }
            else if (responseData == 1) {// 1 significa que ya existe ese nombre de pedido
                MensajeError('El nombre de pedido que intenta adicionar ya existe.');
            }
            else {// 2 significa que dio error
                MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
            }
        },
        params: {
            idproducto: argIdproducto,
            cantidad: argCantidad,
            anno: argAnno,
            ene: argEne,
            feb: argFeb,
            mar: argMar,
            abr: argAbr,
            may: argMay,
            jun: argJun,
            jul: argJul,
            ago: argAgo,
            sep: argSep,
            oct: argOct,
            nov: argNov,
            dic: argDic
        }
    });
}
function modificarPedidoHerramienta(argIdpedido, argIdproducto, argCantidad, argAnno, argEne, argFeb, argMar, argAbr, argMay, argJun, argJul, argAgo, argSep, argOct, argNov, argDic) {
    MostrarBarraProgreso('Modificando pedido...');
    Ext.Ajax.request({
        url: 'modificarpedido',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (responseData == 0) {// 0 significa que modifico bien
                MensajeInformacion('El pedido fue modificado correctamente.');
                stpedidoHerramienta.reload();
            }
            else if (responseData == 1) {// 1 significa que ya existe ese nombre de pedido
                MensajeError('El nombre de pedido que intenta modificar ya existe.');
            }
            else {// 2 significa que dio error
                MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
            }
        },
        params: {
            idpedido: argIdpedido,
            idproducto: argIdproducto,
            cantidad: argCantidad,
            anno: argAnno,
            ene: argEne,
            feb: argFeb,
            mar: argMar,
            abr: argAbr,
            may: argMay,
            jun: argJun,
            jul: argJul,
            ago: argAgo,
            sep: argSep,
            oct: argOct,
            nov: argNov,
            dic: argDic
        }
    });
}
function deletePedidoHerramienta() {
    function confirmar(btn) {
        if (btn == 'ok') {
            eliminaOK();
        }
    }
    MensajeInterrogacion('Eliminar pedido', String.fromCharCode(191) + 'Est&aacute; seguro que desea eliminar el pedido seleccionado?', confirmar)

    function eliminaOK() {
        MostrarBarraProgreso('Eliminando pedido...');
        Ext.Ajax.request({
            url: 'eliminarpedido',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 0) {
                    MensajeInformacion('El pedido fue eliminado correctamente.');
                    stpedidoHerramienta.reload();
                }
                else if (responseData == 1) {
                    MensajeError('El pedido tiene datos asociados y no puede ser eliminado.');
                }
                else {
                    MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                }
            },
            params: {
                idpedido: smpedidoHerramienta.getSelected().data.idpedido
            }
        });
    }
}
function updateCantidadHerramienta() {
    var cantidad = 0;
    cantidad = parseFloat(nfEneHerramienta.getValue()) + parseFloat(nfFebHerramienta.getValue()) + parseFloat(nfMarHerramienta.getValue()) +
            parseFloat(nfAbrHerramienta.getValue()) + parseFloat(nfMayHerramienta.getValue()) + parseFloat(nfJunHerramienta.getValue()) +
            parseFloat(nfJulHerramienta.getValue()) + parseFloat(nfAgoHerramienta.getValue()) + parseFloat(nfSepHerramienta.getValue()) +
            parseFloat(nfOctHerramienta.getValue()) + parseFloat(nfNovHerramienta.getValue()) + parseFloat(nfDicHerramienta.getValue());
    tfCantidadHerramienta.setValue(cantidad);
    updateValorHerramienta();
}
function updateValorHerramienta() {
    tfValorHerramienta.setValue(formatoMonedaNopeso(parseFloat(tfCantidadHerramienta.getValue()) * parseFloat(tfPrecioHerramienta.getValue())));
}
function buscarPedidoHerramienta(cadena) {
    stpedidoHerramienta.baseParams.cadena = cadena;
    stpedidoHerramienta.reload({
        params: {
            start: 0,
            limit: 20
        }
    });
}
function showStatusHerramienta(value, metaData, record, rowIndex, colIndex, store) {
    if (value == 0) {
        return '<span class="label label-primary">Registrado</span>';
    } else if (value == 1) {
        return '<span class="label label-success">Aceptado</span>';
    } else if (value == 2) {
        return '<span class="label label-warning">En revisi&oacute;n</span>';
    } else {
        return '<span class="label label-info">Nuevo</span>';
    }
}