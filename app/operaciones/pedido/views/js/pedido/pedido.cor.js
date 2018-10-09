var btnAdicionarCorrectivo = new Ext.Button({
    id: 'btnAdicionarCorrectivo',
    text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
    tooltip: 'Adicionar pedido',
    handler: function() {
        rowEditorPedidoCorrectivo.stopEditing();
        addRowPedidoCorrectivo();
    }
});
var btnModificarCorrectivo = new Ext.Button({
    disabled: true,
    id: 'btnModificarCorrectivo',
    text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
    tooltip: 'Modificar pedido',
    handler: function() {
        var record = Ext.getCmp('gppedidoCorrectivo').getSelectionModel().getSelected();
        if (record.data.estado != 3) {
            rowEditorPedidoCorrectivo.startEditing(record);
        }
    }
});
var btnEliminarCorrectivo = new Ext.Button({
    disabled: true,
    id: 'btnEliminarCorrectivo',
    text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
    tooltip: 'Eliminar pedido',
    handler: function() {
        var record = Ext.getCmp('gppedidoCorrectivo').getSelectionModel().getSelected();
        executeDeletePedidoCorrectivo(Ext.getCmp('gppedidoCorrectivo'), record, record);
    }
});
var sfBuscarCorrectivo = new Ext.form.SearchField({
    id: 'sfBuscarCorrectivo',
    lbTtlElement: 'pedido',
    maskRe: /^[ A-Za-z0-9\-\.]+$/,
    regex: /^[ A-Za-z0-9\-\.]+$/,
    maxLength: 30,
    store: stpedidoCorrectivo,
    fnOnSearch: function() {
        buscarPedidoCorrectivo(this.getValue());
    },
    fnOnClear: function() {
        this.reset();
        buscarPedidoCorrectivo(this.getValue());
    }
});
var stProductoCorrectivo = new Ext.data.Store({
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
stProductoCorrectivo.load({params: {idcategoria: 1}});
var cbCodigoCorrectivo = new Ext.form.ComboBox({
    mode: 'local',
    id: 'cbCodigoCorrectivo',
    store: stProductoCorrectivo,
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
var cbProductoCorrectivo = new Ext.form.ComboBox({
    mode: 'local',
    id: 'cbProductoCorrectivo',
    store: stProductoCorrectivo,
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
var tfPrecioCorrectivo = new Ext.form.TextField({
    id: 'tfprecioCorrectivo',
    maxLength: 19,
    disabled: true,
    style: 'text-align:right',
    disabledClass: 'disabled-component',
    maskRe: /^[0-9]+$/,
    anchor: '100%'
});
var tfCantidadCorrectivo = new Ext.form.TextField({
    id: 'tfcantidadCorrectivo',
    maxLength: 19,
    disabled: true,
    disabledClass: 'disabled-component',
    maskRe: /^[0-9]+$/,
    anchor: '100%'
});
var tfValorCorrectivo = new Ext.form.TextField({
    id: 'tfvalorCorrectivo',
    maxLength: 19,
    disabled: true,
    style: 'text-align:right',
    disabledClass: 'disabled-component',
    maskRe: /^[0-9]+$/,
    anchor: '100%'
});
var tfUnidadmedidaCorrectivo = new Ext.form.TextField({
    id: 'tfUnidadmedidaCorrectivo',
    disabled: true,
    disabledClass: 'disabled-component',
    anchor: '100%'
});
var dfFechaCorrectivo = new Ext.form.DateField({
    id: 'dfFechaCorrectivo',
    disabled: true,
    disabledClass: 'disabled-component',
    anchor: '100%'
});
var sfAnnoCorrectivo = new Ext.form.SpinnerField({
    id: 'sfAnnoCorrectivo',
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
var tfStatusCorrectivo = new Ext.form.TextField({
    id: 'tfStatusCorrectivo',
    disabled: true,
    disabledClass: 'disabled-component',
    value: 'Nuevo',
    anchor: '100%'
});
var nfEneCorrectivo = new Ext.form.NumberField({
    id: 'nfEneCorrectivo',
    name: 'enero',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfFebCorrectivo = new Ext.form.NumberField({
    id: 'nfFebCorrectivo',
    name: 'febrero',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfMarCorrectivo = new Ext.form.NumberField({
    id: 'nfMarCorrectivo',
    name: 'Marzo',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfAbrCorrectivo = new Ext.form.NumberField({
    id: 'nfAbrCorrectivo',
    name: 'abril',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfMayCorrectivo = new Ext.form.NumberField({
    id: 'nfMayCorrectivo',
    name: 'mayo',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfJunCorrectivo = new Ext.form.NumberField({
    id: 'nfJunCorrectivo',
    name: 'junio',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfJulCorrectivo = new Ext.form.NumberField({
    id: 'nfJulCorrectivo',
    name: 'julio',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfAgoCorrectivo = new Ext.form.NumberField({
    id: 'nfAgoCorrectivo',
    name: 'agosto',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfSepCorrectivo = new Ext.form.NumberField({
    id: 'nfSepCorrectivo',
    name: 'septiembre',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfOctCorrectivo = new Ext.form.NumberField({
    id: 'nfOctCorrectivo',
    name: 'octubre',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfNovCorrectivo = new Ext.form.NumberField({
    id: 'nfNovCorrectivo',
    name: 'noviembre',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfDicCorrectivo = new Ext.form.NumberField({
    id: 'nfDicCorrectivo',
    name: 'diciembre',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var lbValorCorrectivo = new Ext.form.Label({
    style: 'font-size:12px',
    text: 'Valor total: $ 0.00'
});
cbCodigoCorrectivo.on('select', function(combo, record, index) {
    cbProductoCorrectivo.setValue(record.data.idproducto);
    tfUnidadmedidaCorrectivo.setValue(record.data.unidadmedida);
    tfPrecioCorrectivo.setValue(record.data.precio);
    updateValorCorrectivo();
});
cbProductoCorrectivo.on('select', function(combo, record, index) {
    cbCodigoCorrectivo.setValue(record.data.idproducto);
    tfUnidadmedidaCorrectivo.setValue(record.data.unidadmedida);
    tfPrecioCorrectivo.setValue(record.data.precio);
    updateValorCorrectivo();
});
nfEneCorrectivo.on('blur', function(field) {
    updateCantidadCorrectivo();
});
nfFebCorrectivo.on('blur', function(field) {
    updateCantidadCorrectivo();
});
nfMarCorrectivo.on('blur', function(field) {
    updateCantidadCorrectivo();
});
nfAbrCorrectivo.on('blur', function(field) {
    updateCantidadCorrectivo();
});
nfMayCorrectivo.on('blur', function(field) {
    updateCantidadCorrectivo();
});
nfJunCorrectivo.on('blur', function(field) {
    updateCantidadCorrectivo();
});
nfJulCorrectivo.on('blur', function(field) {
    updateCantidadCorrectivo();
});
nfAgoCorrectivo.on('blur', function(field) {
    updateCantidadCorrectivo();
});
nfSepCorrectivo.on('blur', function(field) {
    updateCantidadCorrectivo();
});
nfOctCorrectivo.on('blur', function(field) {
    updateCantidadCorrectivo();
});
nfNovCorrectivo.on('blur', function(field) {
    updateCantidadCorrectivo();
});
nfDicCorrectivo.on('blur', function(field) {
    updateCantidadCorrectivo();
});
var rowActionPedidoCorrectivo = new Ext.grid.RowActions({
    id: 'rowActionPedidoCorrectivo',
    header: 'Acciones',
    widthSlope: 60,
    actions: [{
            id: 'actionAdicionarCorrectivo',
            tooltip: 'Adicionar pedido',
            iconCls: 'fa fa-plus bluedark-button',
            icon: 'fa fa-plus bluedark-button',
            marginLeft: 5,
            width: 16,
            height: 16
        }, {
            id: 'actionModificarCorrectivo',
            tooltip: 'Modificar pedido',
            iconCls: 'fa fa-edit bluedark-button',
            icon: 'fa fa-edit bluedark-button',
            marginLeft: 5,
            width: 16,
            height: 16
        }, {
            id: 'actionEliminarCorrectivo',
            tooltip: 'Eliminar pedido',
            iconCls: 'fa fa-trash bluedark-button',
            icon: 'fa fa-trash bluedark-button',
            marginLeft: 5,
            width: 16,
            height: 16
        }
    ]
});
var rowEditorPedidoCorrectivo = new Ext.grid.RowEditor({
    id: 'rowEditorPedidoCorrectivo',
    clicksToEdit: 2,
    iconCls: 'btn',
    saveText: '<i class="fa fa-floppy-o green-button"></i> Guardar',
    cancelText: '<i class="fa fa-times-circle red-button"></i> Cancelar'
});
var stpedidoCorrectivo = new Ext.data.Store({
    id: 'stpedidoCorrectivo',
    name: 'stpedidoCorrectivo',
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
            //addRowPedidoCorrectivo(true);
            lMask.hide();
            smpedidoCorrectivo.fireEvent('rowdeselect');
            lbValorCorrectivo.setText('Valor total: ' + formatoMoneda(stpedidoCorrectivo.reader.jsonData.total));
        }
    }
});
stpedidoCorrectivo.baseParams.idcategoria = 1;
stpedidoCorrectivo.load({
    params: {
        start: 0,
        limit: 20
    }
});
var smpedidoCorrectivo = new Ext.grid.RowSelectionModel({
    id: 'smpedidoCorrectivo',
    singleSelect: true
});
smpedidoCorrectivo.on({
    rowselect: function(sm, rowIndex, record) {
        if (record.data.estado == 0 || record.data.estado == 2) {
            btnModificarCorrectivo.enable();
            btnEliminarCorrectivo.enable();
        }
    },
    rowdeselect: function(sm, rowIndex, record) {
        btnModificarCorrectivo.disable();
        btnEliminarCorrectivo.disable();
    }
});
var gppedidoCorrectivo = new Ext.grid.EditorGridPanel({
    id: 'gppedidoCorrectivo',
    store: stpedidoCorrectivo,
//    autoExpandColumn: 'idproducto',
    plugins: [rowActionPedidoCorrectivo, rowEditorPedidoCorrectivo],
    sm: smpedidoCorrectivo,
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
            editor: cbCodigoCorrectivo,
            renderer: function(value, metaData, record, rowIndex, colIndex) {
                if (!Ext.isEmpty(value) && typeof value == 'number') {
                    return stProductoCorrectivo.getAt(stProductoCorrectivo.find('idproducto', value)).data.codigo;
                } else
                    return value;
            }
        }, {
            header: 'Descripci&oacute;n',
            width: 300,
            dataIndex: 'nombreproducto',
            sortable: true,
            editor: cbProductoCorrectivo,
            renderer: function(value, metaData, record, rowIndex, colIndex) {
                if (!Ext.isEmpty(value) && typeof value == 'number') {
                    return stProductoCorrectivo.getAt(stProductoCorrectivo.find('idproducto', value)).data.nombre;
                } else
                    return value;
            }
        }, {
            header: 'Unidad medida',
            width: 100,
            align: 'center',
            dataIndex: 'unidadmedida',
            sortable: true,
            editor: tfUnidadmedidaCorrectivo
        }, {
            header: 'Precio',
            width: 100,
            dataIndex: 'precioproducto',
            sortable: true,
            align: 'right',
            editor: tfPrecioCorrectivo,
            renderer: formatoMonedaNopeso
        }, {
            header: 'Cant. total',
            width: 100,
            dataIndex: 'cantidad',
            sortable: true,
            align: 'center',
            editor: tfCantidadCorrectivo
        }, {
            header: 'Valor',
            width: 100,
            dataIndex: 'valor',
            sortable: true,
            align: 'right',
            editor: tfValorCorrectivo,
            renderer: formatoMonedaNopeso
        }, {
            header: 'Fecha',
            hidden: true,
            hideable: true,
            width: 100,
            dataIndex: 'fechapedido',
            renderer: format_Fecha,
            editor: dfFechaCorrectivo
        }, {
            header: 'A&ntilde;o',
            width: 100,
            dataIndex: 'anno',
            align: 'center',
            editor: sfAnnoCorrectivo
        }, {
            header: 'Status',
            width: 100,
            dataIndex: 'estado',
            sortable: true,
            editor: tfStatusCorrectivo,
            renderer: showStatusCorrectivo
        }, {
            header: 'E',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'ene',
            editor: nfEneCorrectivo
        }, {
            header: 'F',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'feb',
            editor: nfFebCorrectivo
        }, {
            header: 'M',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'mar',
            editor: nfMarCorrectivo
        }, {
            header: 'A',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'abr',
            editor: nfAbrCorrectivo
        }, {
            header: 'M',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'may',
            editor: nfMayCorrectivo
        }, {
            header: 'J',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'jun',
            editor: nfJunCorrectivo
        }, {
            header: 'J',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'jul',
            editor: nfJulCorrectivo
        }, {
            header: 'A',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'ago',
            editor: nfAgoCorrectivo
        }, {
            header: 'S',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'sep',
            editor: nfSepCorrectivo
        }, {
            header: 'O',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'oct',
            editor: nfOctCorrectivo
        }, {
            header: 'N',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'nov',
            editor: nfNovCorrectivo
        }, {
            header: 'D',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'dic',
            editor: nfDicCorrectivo
        }, {
            header: 'idpedido',
            hidden: true,
            dataIndex: 'idpedido'
        }, {
            header: 'idproducto',
            hidden: true,
            dataIndex: 'idproducto'
        }, rowActionPedidoCorrectivo],
    tbar: [btnAdicionarCorrectivo, btnModificarCorrectivo, btnEliminarCorrectivo, '->', lbValorCorrectivo, new Ext.Toolbar.Separator(), ' ', sfBuscarCorrectivo],
    bbar: new Ext.Feet.PagingToolbar({
        pageSize: 20,
        store: stpedidoCorrectivo,
        displayInfo: true,
        displayMsg: 'Resultados de {0} - {1} de {2}',
        emptyMsg: "No hay resultados para mostrar."
    }),
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
rowActionPedidoCorrectivo.on('action', function(grid, record, action, rowIndex) {
    switch (action) {
        case 'actionAdicionarCorrectivo':
            btnAdicionarCorrectivo.handler.call();
            break;
        case 'actionModificarCorrectivo':
            if (!btnModificarCorrectivo.disabled)
                btnModificarCorrectivo.handler.call();
            break;
        case 'actionEliminarCorrectivo':
            if (!btnEliminarCorrectivo.disabled)
                btnEliminarCorrectivo.handler.call();
            break;
    }
});
rowEditorPedidoCorrectivo.on({
    beforeedit: function(roweditor, grid, record, rowIndex) {
        /*if (record.data.recordEditor) {
         roweditor.stopEditing();
         addRowPedidoCorrectivo();
         grid.getSelectionModel().selectRow(1);
         roweditor.startEditing(1);
         return false;
         } else*/ if (record.data.estado == '1') {
            MensajeInformacion('El pedido fue aceptado y no puede ser modificado.');
            return false;
        }
    },
    afteredit: function(roweditor, grid, object, record, rowIndex) {
        testChangesCorrectivo(record, object);
    }
});
function executeDeletePedidoCorrectivo(grid, record, rowIndex) {
    if (record.data.recordEditor)
        return;
    else {
        deletePedidoCorrectivo();
    }
}
function testChangesCorrectivo(record, object) {
    if (record.data.idpedido == '0')
        adicionarPedidoCorrectivo(record.data.idproducto, record.data.cantidad, record.data.anno, record.data.ene, record.data.feb, record.data.mar, record.data.abr, record.data.may, record.data.jun, record.data.jul, record.data.ago, record.data.sep, record.data.oct, record.data.nov, record.data.dic);
    else
        modificarPedidoCorrectivo(record.data.idpedido, record.data.idproducto, record.data.cantidad, record.data.anno, record.data.ene, record.data.feb, record.data.mar, record.data.abr, record.data.may, record.data.jun, record.data.jul, record.data.ago, record.data.sep, record.data.oct, record.data.nov, record.data.dic);
}
function addRowPedidoCorrectivo(isEditor) {
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

    var index = stpedidoCorrectivo.getCount();
    (isEditor === true) ? stpedidoCorrectivo.insert(0, newRecord) : stpedidoCorrectivo.insert(index, newRecord);

    rowEditorPedidoCorrectivo.startEditing((index > 0) ? index - 1 : index);
}
function adicionarPedidoCorrectivo(argIdproducto, argCantidad, argAnno, argEne, argFeb, argMar, argAbr, argMay, argJun, argJul, argAgo, argSep, argOct, argNov, argDic) {
    MostrarBarraProgreso('Adicionando pedido...');
    Ext.Ajax.request({
        url: 'adicionarpedido',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (responseData == 0) {// 0 significa que adiciono bien
                MensajeInformacion('El pedido fue adicionado correctamente.');
                stpedidoCorrectivo.reload();
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
function modificarPedidoCorrectivo(argIdpedido, argIdproducto, argCantidad, argAnno, argEne, argFeb, argMar, argAbr, argMay, argJun, argJul, argAgo, argSep, argOct, argNov, argDic) {
    MostrarBarraProgreso('Modificando pedido...');
    Ext.Ajax.request({
        url: 'modificarpedido',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (responseData == 0) {// 0 significa que modifico bien
                MensajeInformacion('El pedido fue modificado correctamente.');
                stpedidoCorrectivo.reload();
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
function deletePedidoCorrectivo() {
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
                    stpedidoCorrectivo.reload();
                }
                else if (responseData == 1) {
                    MensajeError('El pedido tiene datos asociados y no puede ser eliminado.');
                }
                else {
                    MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                }
            },
            params: {
                idpedido: smpedidoCorrectivo.getSelected().data.idpedido
            }
        });
    }
}
function updateCantidadCorrectivo() {
    var cantidad = 0;
    cantidad = parseFloat(nfEneCorrectivo.getValue()) + parseFloat(nfFebCorrectivo.getValue()) + parseFloat(nfMarCorrectivo.getValue()) +
            parseFloat(nfAbrCorrectivo.getValue()) + parseFloat(nfMayCorrectivo.getValue()) + parseFloat(nfJunCorrectivo.getValue()) +
            parseFloat(nfJulCorrectivo.getValue()) + parseFloat(nfAgoCorrectivo.getValue()) + parseFloat(nfSepCorrectivo.getValue()) +
            parseFloat(nfOctCorrectivo.getValue()) + parseFloat(nfNovCorrectivo.getValue()) + parseFloat(nfDicCorrectivo.getValue());
    tfCantidadCorrectivo.setValue(cantidad);
    updateValorCorrectivo();
}
function updateValorCorrectivo() {
    tfValorCorrectivo.setValue(formatoMonedaNopeso(parseFloat(tfCantidadCorrectivo.getValue()) * parseFloat(tfPrecioCorrectivo.getValue())));
}
function buscarPedidoCorrectivo(cadena) {
    stpedidoCorrectivo.baseParams.cadena = cadena;
    stpedidoCorrectivo.reload({
        params: {
            start: 0,
            limit: 20
        }
    });
}
function showStatusCorrectivo(value, metaData, record, rowIndex, colIndex, store) {
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