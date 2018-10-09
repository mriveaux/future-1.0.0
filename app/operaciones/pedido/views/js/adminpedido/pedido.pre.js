var btnAdicionarPreventivo = new Ext.Button({
    id: 'btnAdicionarPreventivo',
    text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
    tooltip: 'Adicionar pedido',
    handler: function() {
        rowEditorPedidoPreventivo.stopEditing();
        addRowPedidoPreventivo();
    }
});
var btnModificarPreventivo = new Ext.Button({
    disabled: true,
    id: 'btnModificarPreventivo',
    text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
    tooltip: 'Modificar pedido',
    handler: function() {
        var record = Ext.getCmp('gppedidoPreventivo').getSelectionModel().getSelected();
        if (record.data.estado != 3) {
            rowEditorPedidoPreventivo.startEditing(record);
        }
    }
});
var btnEliminarPreventivo = new Ext.Button({
    disabled: true,
    id: 'btnEliminarPreventivo',
    text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
    tooltip: 'Eliminar pedido',
    handler: function() {
        var record = Ext.getCmp('gppedidoPreventivo').getSelectionModel().getSelected();
        executeDeletePedidoPreventivo(Ext.getCmp('gppedidoPreventivo'), record, record);
    }
});
var btnRevisarPreventivo = new Ext.Button({
    id: 'btnRevisarPreventivo',
    text: '<i class="fa fa-search-plus bluedark-button"></i> Revisar',
    tooltip: 'Marcar para revisar',
    handler: function() {
        var record = Ext.getCmp('gppedidoPreventivo').getSelectionModel().getSelected();
        markToReviewPreventivo(Ext.getCmp('gppedidoPreventivo'), record, record);
    }
});
var sfBuscarPreventivo = new Ext.form.SearchField({
    id: 'sfBuscarPreventivo',
    lbTtlElement: 'pedido',
    maskRe: /^[ A-Za-z0-9\-\.]+$/,
    regex: /^[ A-Za-z0-9\-\.]+$/,
    maxLength: 30,
    store: stpedidoPreventivo,
    fnOnSearch: function() {
        buscarPedidoPreventivo(this.getValue());
    },
    fnOnClear: function() {
        this.reset();
        buscarPedidoPreventivo(this.getValue());
    }
});
var stProductoPreventivo = new Ext.data.Store({
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
stProductoPreventivo.load({params: {idcategoria: 2}});
var cbCodigoPreventivo = new Ext.form.ComboBox({
    mode: 'local',
    id: 'cbCodigoPreventivo',
    store: stProductoPreventivo,
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
var cbProductoPreventivo = new Ext.form.ComboBox({
    mode: 'local',
    id: 'cbProductoPreventivo',
    store: stProductoPreventivo,
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
var tfPrecioPreventivo = new Ext.form.TextField({
    id: 'tfprecioPreventivo',
    maxLength: 19,
    disabled: true,
    style: 'text-align:right',
    disabledClass: 'disabled-component',
    maskRe: /^[0-9]+$/,
    anchor: '100%'
});
var tfCantidadPreventivo = new Ext.form.TextField({
    id: 'tfcantidadPreventivo',
    maxLength: 19,
    disabled: true,
    disabledClass: 'disabled-component',
    maskRe: /^[0-9]+$/,
    anchor: '100%'
});
var tfValorPreventivo = new Ext.form.TextField({
    id: 'tfvalorPreventivo',
    maxLength: 19,
    disabled: true,
    style: 'text-align:right',
    disabledClass: 'disabled-component',
    maskRe: /^[0-9]+$/,
    anchor: '100%'
});
var tfUnidadmedidaPreventivo = new Ext.form.TextField({
    id: 'tfUnidadmedidaPreventivo',
    disabled: true,
    disabledClass: 'disabled-component',
    anchor: '100%'
});
var dfFechaPreventivo = new Ext.form.DateField({
    id: 'dfFechaPreventivo',
    disabled: true,
    disabledClass: 'disabled-component',
    anchor: '100%'
});
var sfAnnoPreventivo = new Ext.form.SpinnerField({
    id: 'sfAnnoPreventivo',
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
var tfStatusPreventivo = new Ext.form.TextField({
    id: 'tfStatusPreventivo',
    disabled: true,
    disabledClass: 'disabled-component',
    value: 'Nuevo',
    anchor: '100%'
});
var nfEnePreventivo = new Ext.form.NumberField({
    id: 'nfEnePreventivo',
    name: 'enero',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfFebPreventivo = new Ext.form.NumberField({
    id: 'nfFebPreventivo',
    name: 'febrero',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfMarPreventivo = new Ext.form.NumberField({
    id: 'nfMarPreventivo',
    name: 'Marzo',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfAbrPreventivo = new Ext.form.NumberField({
    id: 'nfAbrPreventivo',
    name: 'abril',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfMayPreventivo = new Ext.form.NumberField({
    id: 'nfMayPreventivo',
    name: 'mayo',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfJunPreventivo = new Ext.form.NumberField({
    id: 'nfJunPreventivo',
    name: 'junio',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfJulPreventivo = new Ext.form.NumberField({
    id: 'nfJulPreventivo',
    name: 'julio',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfAgoPreventivo = new Ext.form.NumberField({
    id: 'nfAgoPreventivo',
    name: 'agosto',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfSepPreventivo = new Ext.form.NumberField({
    id: 'nfSepPreventivo',
    name: 'septiembre',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfOctPreventivo = new Ext.form.NumberField({
    id: 'nfOctPreventivo',
    name: 'octubre',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfNovPreventivo = new Ext.form.NumberField({
    id: 'nfNovPreventivo',
    name: 'noviembre',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfDicPreventivo = new Ext.form.NumberField({
    id: 'nfDicPreventivo',
    name: 'diciembre',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var lbValorPreventivo = new Ext.form.Label({
    style: 'font-size:12px',
    text: 'Valor total: $ 0.00'
});
cbCodigoPreventivo.on('select', function(combo, record, index) {
    cbProductoPreventivo.setValue(record.data.idproducto);
    tfUnidadmedidaPreventivo.setValue(record.data.unidadmedida);
    tfPrecioPreventivo.setValue(record.data.precio);
    updateValorPreventivo();
});
cbProductoPreventivo.on('select', function(combo, record, index) {
    cbCodigoPreventivo.setValue(record.data.idproducto);
    tfUnidadmedidaPreventivo.setValue(record.data.unidadmedida);
    tfPrecioPreventivo.setValue(record.data.precio);
    updateValorPreventivo();
});
nfEnePreventivo.on('blur', function(field) {
    updateCantidadPreventivo();
});
nfFebPreventivo.on('blur', function(field) {
    updateCantidadPreventivo();
});
nfMarPreventivo.on('blur', function(field) {
    updateCantidadPreventivo();
});
nfAbrPreventivo.on('blur', function(field) {
    updateCantidadPreventivo();
});
nfMayPreventivo.on('blur', function(field) {
    updateCantidadPreventivo();
});
nfJunPreventivo.on('blur', function(field) {
    updateCantidadPreventivo();
});
nfJulPreventivo.on('blur', function(field) {
    updateCantidadPreventivo();
});
nfAgoPreventivo.on('blur', function(field) {
    updateCantidadPreventivo();
});
nfSepPreventivo.on('blur', function(field) {
    updateCantidadPreventivo();
});
nfOctPreventivo.on('blur', function(field) {
    updateCantidadPreventivo();
});
nfNovPreventivo.on('blur', function(field) {
    updateCantidadPreventivo();
});
nfDicPreventivo.on('blur', function(field) {
    updateCantidadPreventivo();
});
var rowActionPedidoPreventivo = new Ext.grid.RowActions({
    id: 'rowActionPedidoPreventivo',
    header: 'Acciones',
    widthSlope: 60,
    actions: [{
            id: 'actionAdicionarPreventivo',
            tooltip: 'Adicionar pedido',
            iconCls: 'fa fa-plus bluedark-button',
            icon: 'fa fa-plus bluedark-button',
            marginLeft: 5,
            width: 16,
            height: 16
        }, {
            id: 'actionModificarPreventivo',
            tooltip: 'Modificar pedido',
            iconCls: 'fa fa-edit bluedark-button',
            icon: 'fa fa-edit bluedark-button',
            marginLeft: 5,
            width: 16,
            height: 16
        }, {
            id: 'actionEliminarPreventivo',
            tooltip: 'Eliminar pedido',
            iconCls: 'fa fa-trash bluedark-button',
            icon: 'fa fa-trash bluedark-button',
            marginLeft: 5,
            width: 16,
            height: 16
        }
    ]
});
var rowEditorPedidoPreventivo = new Ext.grid.RowEditor({
    id: 'rowEditorPedidoPreventivo',
    clicksToEdit: 2,
    iconCls: 'btn',
    saveText: '<i class="fa fa-floppy-o green-button"></i> Guardar',
    cancelText: '<i class="fa fa-times-circle red-button"></i> Cancelar'
});
var stpedidoPreventivo = new Ext.data.Store({
    id: 'stpedidoPreventivo',
    name: 'stpedidoPreventivo',
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
            name: 'recordEditor'
        }]),
    listeners: {
        load: function(e)
        {
            //addRowPedidoPreventivo(true);
//            lMask.hide();
            smpedidoPreventivo.fireEvent('rowdeselect');
            lbValorPreventivo.setText('Valor total: ' + formatoMoneda(stpedidoPreventivo.reader.jsonData.total));
        }
    }
});
stpedidoPreventivo.baseParams.idcategoria = 2;
stpedidoPreventivo.load({
    params: {
        start: 0,
        limit: 20
    }
});
var smpedidoPreventivo = new Ext.grid.RowSelectionModel({
    id: 'smpedidoPreventivo',
    singleSelect: true,
});
smpedidoPreventivo.on({
    rowselect: function(sm, rowIndex, record) {
        Ext.getCmp('gppedidoPreventivo').getView().addRowClass(rowIndex, "negrita");
        if (record.data.estado == 0 || record.data.estado == 2) {
            btnModificarPreventivo.enable();
            btnEliminarPreventivo.enable();
        }
        if (record.data.estado == 0) {
            btnRevisarPreventivo.enable();
        }
    },
    rowdeselect: function(sm, rowIndex, record) {
        if (record)
            Ext.getCmp('gppedidoPreventivo').getView().removeRowClass(rowIndex, "negrita");
        btnModificarPreventivo.disable();
        btnEliminarPreventivo.disable();
        btnRevisarPreventivo.disable();
    }
});
var gppedidoPreventivo = new Ext.grid.EditorGridPanel({
    id: 'gppedidoPreventivo',
    store: stpedidoPreventivo,
//    autoExpandColumn: 'idproducto',
    plugins: [rowActionPedidoPreventivo, rowEditorPedidoPreventivo],
    sm: smpedidoPreventivo,
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
            editor: cbCodigoPreventivo,
            renderer: function(value, metaData, record, rowIndex, colIndex) {
                if (!Ext.isEmpty(value) && typeof value == 'number') {
                    return stProductoPreventivo.getAt(stProductoPreventivo.find('idproducto', value)).data.codigo;
                } else
                    return value;
            }
        }, {
            header: 'Descripci&oacute;n',
            width: 300,
            dataIndex: 'nombreproducto',
            sortable: true,
            editor: cbProductoPreventivo,
            renderer: function(value, metaData, record, rowIndex, colIndex) {
                if (!Ext.isEmpty(value) && typeof value == 'number') {
                    return stProductoPreventivo.getAt(stProductoPreventivo.find('idproducto', value)).data.nombre;
                } else
                    return value;
            }
        }, {
            header: 'Unidad medida',
            width: 100,
            align: 'center',
            dataIndex: 'unidadmedida',
            sortable: true,
            editor: tfUnidadmedidaPreventivo
        }, {
            header: 'Precio',
            width: 100,
            dataIndex: 'precioproducto',
            sortable: true,
            align: 'right',
            editor: tfPrecioPreventivo,
            renderer: formatoMonedaNopeso
        }, {
            header: 'Cant. total',
            width: 100,
            dataIndex: 'cantidad',
            sortable: true,
            align: 'center',
            editor: tfCantidadPreventivo
        }, {
            header: 'Valor',
            width: 100,
            dataIndex: 'valor',
            sortable: true,
            editor: tfValorPreventivo,
            align: 'right',
            renderer: formatoMonedaNopeso
        }, {
            header: 'Fecha',
            hidden: true,
            hideable: true,
            width: 100,
            dataIndex: 'fechapedido',
            renderer: format_Fecha,
            editor: dfFechaPreventivo
        }, {
            header: 'A&ntilde;o',
            width: 100,
            dataIndex: 'anno',
            align: 'center',
            editor: sfAnnoPreventivo
        }, {
            header: 'Status',
            width: 100,
            dataIndex: 'estado',
            sortable: true,
            editor: tfStatusPreventivo,
            renderer: showStatusPreventivo
        }, {
            header: 'E',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'ene',
            editor: nfEnePreventivo
        }, {
            header: 'F',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'feb',
            editor: nfFebPreventivo
        }, {
            header: 'M',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'mar',
            editor: nfMarPreventivo
        }, {
            header: 'A',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'abr',
            editor: nfAbrPreventivo
        }, {
            header: 'M',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'may',
            editor: nfMayPreventivo
        }, {
            header: 'J',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'jun',
            editor: nfJunPreventivo
        }, {
            header: 'J',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'jul',
            editor: nfJulPreventivo
        }, {
            header: 'A',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'ago',
            editor: nfAgoPreventivo
        }, {
            header: 'S',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'sep',
            editor: nfSepPreventivo
        }, {
            header: 'O',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'oct',
            editor: nfOctPreventivo
        }, {
            header: 'N',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'nov',
            editor: nfNovPreventivo
        }, {
            header: 'D',
            width: 40,            renderer: eliminarCeroFinal,
            dataIndex: 'dic',
            editor: nfDicPreventivo
        }, {
            header: 'idpedido',
            hidden: true,
            dataIndex: 'idpedido'
        }, {
            header: 'idproducto',
            hidden: true,
            dataIndex: 'idproducto'
        }, rowActionPedidoPreventivo],
    tbar: [btnAdicionarPreventivo, btnModificarPreventivo, btnEliminarPreventivo, btnRevisarPreventivo, '->', lbValorPreventivo, new Ext.Toolbar.Separator(), ' ', sfBuscarPreventivo],
    bbar: new Ext.Feet.PagingToolbar({
        pageSize: 20,
        store: stpedidoPreventivo,
        displayInfo: true,
        displayMsg: 'Resultados de {0} - {1} de {2}',
        emptyMsg: "No hay resultados para mostrar."
    })
});
rowActionPedidoPreventivo.on('action', function(grid, record, action, rowIndex) {
    switch (action) {
        case 'actionAdicionarPreventivo':
            btnAdicionarPreventivo.handler.call();
            break;
        case 'actionModificarPreventivo':
            if (!btnModificarPreventivo.disabled)
                btnModificarPreventivo.handler.call();
            break;
        case 'actionEliminarPreventivo':
            if (!btnEliminarPreventivo.disabled)
                btnEliminarPreventivo.handler.call();
            break;
    }
});
rowEditorPedidoPreventivo.on({
    beforeedit: function(roweditor, grid, record, rowIndex) {
        /*if (record.data.recordEditor) {
         roweditor.stopEditing();
         addRowPedidoPreventivo();
         grid.getSelectionModel().selectRow(1);
         roweditor.startEditing(1);
         return false;
         } else */if (record.data.estado == '1') {
            MensajeInformacion('El pedido fue aceptado y no puede ser modificado.');
            return false;
        }
    },
    afteredit: function(roweditor, grid, object, record, rowIndex) {
        testChangesPreventivo(record, object);
    }
});
function executeDeletePedidoPreventivo(grid, record, rowIndex) {
    if (record.data.recordEditor)
        return;
    else {
        deletePedidoPreventivo();
    }
}
function markToReviewPreventivo(grid, record, rowIndex) {
    if (record.data.recordEditor)
        return;
    else {
        reviewPedidoPreventivo();
    }
}
function testChangesPreventivo(record, object) {
    if (record.data.idpedido == '0')
        adicionarPedidoPreventivo(record.data.idproducto, record.data.cantidad, record.data.anno, record.data.ene, record.data.feb, record.data.mar, record.data.abr, record.data.may, record.data.jun, record.data.jul, record.data.ago, record.data.sep, record.data.oct, record.data.nov, record.data.dic);
    else
        modificarPedidoPreventivo(record.data.idpedido, record.data.idproducto, record.data.cantidad, record.data.anno, record.data.ene, record.data.feb, record.data.mar, record.data.abr, record.data.may, record.data.jun, record.data.jul, record.data.ago, record.data.sep, record.data.oct, record.data.nov, record.data.dic);
}
function addRowPedidoPreventivo(isEditor) {
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

    (isEditor === true) ? stpedidoPreventivo.insert(0, newRecord) : stpedidoPreventivo.insert(stpedidoPreventivo.getCount(), newRecord);
    rowEditorPedidoPreventivo.startEditing(stpedidoPreventivo.getCount() - 1);
}
function adicionarPedidoPreventivo(argIdproducto, argCantidad, argAnno, argEne, argFeb, argMar, argAbr, argMay, argJun, argJul, argAgo, argSep, argOct, argNov, argDic) {
    MostrarBarraProgreso('Adicionando pedido...');
    Ext.Ajax.request({
        url: 'adicionarpedido',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (responseData == 0) {// 0 significa que adiciono bien
                MensajeInformacion('El pedido fue adicionado correctamente.');
                stpedidoPreventivo.reload();
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
function modificarPedidoPreventivo(argIdpedido, argIdproducto, argCantidad, argAnno, argEne, argFeb, argMar, argAbr, argMay, argJun, argJul, argAgo, argSep, argOct, argNov, argDic) {
    MostrarBarraProgreso('Modificando pedido...');
    Ext.Ajax.request({
        url: 'modificarpedido',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (responseData == 0) {// 0 significa que modifico bien
                MensajeInformacion('El pedido fue modificado correctamente.');
                stpedidoPreventivo.reload();
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
function deletePedidoPreventivo() {
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
                    stpedidoPreventivo.reload();
                }
                else if (responseData == 1) {
                    MensajeError('El pedido tiene datos asociados y no puede ser eliminado.');
                }
                else {
                    MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                }
            },
            params: {
                idpedido: smpedidoPreventivo.getSelected().data.idpedido
            }
        });
    }
}
function reviewPedidoPreventivo() {
    function confirmar(btn) {
        if (btn == 'ok') {
            reviewOK();
        }
    }
    MensajeOkCancel('Revisar pedido', String.fromCharCode(191) + 'Est&aacute; seguro que desea enviar a revisi&oacute;n el pedido seleccionado?', confirmar);

    function reviewOK() {
        var winObservacionPreventivo = new Ext.Window({
            bodyStyle: 'padding:5px 5px 5px',
            title: 'Agregar observaci&oacute;n',
            border: false,
            layout: 'form',
            labelAlign: 'top',
            width: 350,
            height: 170,
            resizable: false,
            modal: true,
            closeAction: 'close',
            items: [{xtype: 'textarea', anchor: '100%', id: 'observacionpreventivo',
                    fieldLabel: 'Observaci&oacute;n',
                    maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,\/\º]+)+$/,
                    regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,\/\º]+)+$/,
                    allowBlank: false,
                    maxLength: 255
                }],
            buttons: [new Ext.Button({
                    text: '<i class="fa fa-check-circle green-button"></i> <b>Aceptar</b>',
                    handler: goToRewiew
                }), new Ext.Button({
                    text: '<i class="fa fa-times-circle red-button"></i> <b>Cancelar</b>',
                    handler: function() {
                        winObservacionPreventivo.close();
                    }
                })]
        });
        winObservacionPreventivo.show();
        function goToRewiew() {
            if (Ext.getCmp('observacionpreventivo').isValid()) {
                MostrarBarraProgreso('Cambiando estado al pedido...');
                Ext.Ajax.request({
                    url: 'cambiarestado',
                    method: 'POST',
                    callback: function(options, success, response) {
                        responseData = Ext.decode(response.responseText);
                        Ext.MessageBox.hide();
                        if (responseData == 0) {
                            MensajeInformacion('El pedido fue enviado a revisi&oacute;n correctamente.');
                            winObservacionPreventivo.close();
                            stpedidoPreventivo.reload();
                        }
                        else {
                            MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                        }
                    },
                    params: {
                        idpedido: smpedidoPreventivo.getSelected().data.idpedido,
                        status: 2,
                        obs: Ext.getCmp('observacionpreventivo').getValue()
                    }
                });
            }
        }
    }
}
function updateCantidadPreventivo() {
    var cantidad = 0;
    cantidad = parseFloat(nfEnePreventivo.getValue()) + parseFloat(nfFebPreventivo.getValue()) + parseFloat(nfMarPreventivo.getValue()) +
            parseFloat(nfAbrPreventivo.getValue()) + parseFloat(nfMayPreventivo.getValue()) + parseFloat(nfJunPreventivo.getValue()) +
            parseFloat(nfJulPreventivo.getValue()) + parseFloat(nfAgoPreventivo.getValue()) + parseFloat(nfSepPreventivo.getValue()) +
            parseFloat(nfOctPreventivo.getValue()) + parseFloat(nfNovPreventivo.getValue()) + parseFloat(nfDicPreventivo.getValue());
    tfCantidadPreventivo.setValue(cantidad);
    updateValorPreventivo();
}
function updateValorPreventivo() {
    tfValorPreventivo.setValue(formatoMonedaNopeso(parseFloat(tfCantidadPreventivo.getValue()) * parseFloat(tfPrecioPreventivo.getValue())));
}
function buscarPedidoPreventivo(cadena) {
    stpedidoPreventivo.baseParams.cadena = cadena;
    stpedidoPreventivo.reload({
        params: {
            start: 0,
            limit: 20
        }
    });
}
function showStatusPreventivo(value, metaData, record, rowIndex, colIndex, store) {
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