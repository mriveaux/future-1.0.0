var btnAdicionarProteccion = new Ext.Button({
    id: 'btnAdicionarProteccion',
    text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
    tooltip: 'Adicionar pedido',
    handler: function() {
        rowEditorPedidoProteccion.stopEditing();
        addRowPedidoProteccion();
    }
});
var btnModificarProteccion = new Ext.Button({
    disabled: true,
    id: 'btnModificarProteccion',
    text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
    tooltip: 'Modificar pedido',
    handler: function() {
        var record = Ext.getCmp('gppedidoProteccion').getSelectionModel().getSelected();
        if (record.data.estado != 3) {
            rowEditorPedidoProteccion.startEditing(record);
        }
    }
});
var btnEliminarProteccion = new Ext.Button({
    disabled: true,
    id: 'btnEliminarProteccion',
    text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
    tooltip: 'Eliminar pedido',
    handler: function() {
        var record = Ext.getCmp('gppedidoProteccion').getSelectionModel().getSelected();
        executeDeletePedidoProteccion(Ext.getCmp('gppedidoProteccion'), record, record);
    }
});
var btnRevisarProteccion = new Ext.Button({
    id: 'btnRevisarProteccion',
    text: '<i class="fa fa-search-plus bluedark-button"></i> Revisar',
    tooltip: 'Marcar para revisar',
    handler: function() {
        var record = Ext.getCmp('gppedidoProteccion').getSelectionModel().getSelected();
        markToReviewProteccion(Ext.getCmp('gppedidoProteccion'), record, record);
    }
});
var sfBuscarProteccion = new Ext.form.SearchField({
    id: 'sfBuscarProteccion',
    lbTtlElement: 'pedido',
    maskRe: /^[ A-Za-z0-9\-\.]+$/,
    regex: /^[ A-Za-z0-9\-\.]+$/,
    maxLength: 30,
    store: stpedidoProteccion,
    fnOnSearch: function() {
        buscarPedidoProteccion(this.getValue());
    },
    fnOnClear: function() {
        this.reset();
        buscarPedidoProteccion(this.getValue());
    }
});
var stProductoProteccion = new Ext.data.Store({
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
stProductoProteccion.load({params: {idcategoria: 4}});
var cbCodigoProteccion = new Ext.form.ComboBox({
    mode: 'local',
    id: 'cbCodigoProteccion',
    store: stProductoProteccion,
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
var cbProductoProteccion = new Ext.form.ComboBox({
    mode: 'local',
    id: 'cbProductoProteccion',
    store: stProductoProteccion,
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
var tfPrecioProteccion = new Ext.form.TextField({
    id: 'tfprecioProteccion',
    maxLength: 19,
    disabled: true,
    style: 'text-align:right',
    disabledClass: 'disabled-component',
    maskRe: /^[0-9]+$/,
    anchor: '100%'
});
var tfCantidadProteccion = new Ext.form.TextField({
    id: 'tfcantidadProteccion',
    maxLength: 19,
    disabled: true,
    disabledClass: 'disabled-component',
    maskRe: /^[0-9]+$/,
    anchor: '100%'
});
var tfValorProteccion = new Ext.form.TextField({
    id: 'tfvalorProteccion',
    maxLength: 19,
    disabled: true,
    style: 'text-align:right',
    disabledClass: 'disabled-component',
    maskRe: /^[0-9]+$/,
    anchor: '100%'
});
var tfUnidadmedidaProteccion = new Ext.form.TextField({
    id: 'tfUnidadmedidaProteccion',
    disabled: true,
    disabledClass: 'disabled-component',
    anchor: '100%'
});
var dfFechaProteccion = new Ext.form.DateField({
    id: 'dfFechaProteccion',
    disabled: true,
    disabledClass: 'disabled-component',
    anchor: '100%'
});
var sfAnnoProteccion = new Ext.form.SpinnerField({
    id: 'sfAnnoProteccion',
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
var tfStatusProteccion = new Ext.form.TextField({
    id: 'tfStatusProteccion',
    disabled: true,
    disabledClass: 'disabled-component',
    value: 'Nuevo',
    anchor: '100%'
});
var nfEneProteccion = new Ext.form.NumberField({
    id: 'nfEneProteccion',
    name: 'enero',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfFebProteccion = new Ext.form.NumberField({
    id: 'nfFebProteccion',
    name: 'febrero',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfMarProteccion = new Ext.form.NumberField({
    id: 'nfMarProteccion',
    name: 'Marzo',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfAbrProteccion = new Ext.form.NumberField({
    id: 'nfAbrProteccion',
    name: 'abril',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfMayProteccion = new Ext.form.NumberField({
    id: 'nfMayProteccion',
    name: 'mayo',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfJunProteccion = new Ext.form.NumberField({
    id: 'nfJunProteccion',
    name: 'junio',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfJulProteccion = new Ext.form.NumberField({
    id: 'nfJulProteccion',
    name: 'julio',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfAgoProteccion = new Ext.form.NumberField({
    id: 'nfAgoProteccion',
    name: 'agosto',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfSepProteccion = new Ext.form.NumberField({
    id: 'nfSepProteccion',
    name: 'septiembre',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfOctProteccion = new Ext.form.NumberField({
    id: 'nfOctProteccion',
    name: 'octubre',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfNovProteccion = new Ext.form.NumberField({
    id: 'nfNovProteccion',
    name: 'noviembre',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var nfDicProteccion = new Ext.form.NumberField({
    id: 'nfDicProteccion',
    name: 'diciembre',
    maxLength: 19,
    allowNegative: false,
    selectOnFocus: true,
    maskRe: /^[0-9\.]$/,
    anchor: '100%'
});
var lbValorProteccion = new Ext.form.Label({
    style: 'font-size:12px',
    text: 'Valor total: $ 0.00'
});
cbCodigoProteccion.on('select', function(combo, record, index) {
    cbProductoProteccion.setValue(record.data.idproducto);
    tfUnidadmedidaProteccion.setValue(record.data.unidadmedida);
    tfPrecioProteccion.setValue(record.data.precio);
    updateValorProteccion();
});
cbProductoProteccion.on('select', function(combo, record, index) {
    cbCodigoProteccion.setValue(record.data.idproducto);
    tfUnidadmedidaProteccion.setValue(record.data.unidadmedida);
    tfPrecioProteccion.setValue(record.data.precio);
    updateValorProteccion();
});
nfEneProteccion.on('blur', function(field) {
    updateCantidadProteccion();
});
nfFebProteccion.on('blur', function(field) {
    updateCantidadProteccion();
});
nfMarProteccion.on('blur', function(field) {
    updateCantidadProteccion();
});
nfAbrProteccion.on('blur', function(field) {
    updateCantidadProteccion();
});
nfMayProteccion.on('blur', function(field) {
    updateCantidadProteccion();
});
nfJunProteccion.on('blur', function(field) {
    updateCantidadProteccion();
});
nfJulProteccion.on('blur', function(field) {
    updateCantidadProteccion();
});
nfAgoProteccion.on('blur', function(field) {
    updateCantidadProteccion();
});
nfSepProteccion.on('blur', function(field) {
    updateCantidadProteccion();
});
nfOctProteccion.on('blur', function(field) {
    updateCantidadProteccion();
});
nfNovProteccion.on('blur', function(field) {
    updateCantidadProteccion();
});
nfDicProteccion.on('blur', function(field) {
    updateCantidadProteccion();
});
var rowActionPedidoProteccion = new Ext.grid.RowActions({
    id: 'rowActionPedidoProteccion',
    header: 'Acciones',
    widthSlope: 60,
    actions: [{
            id: 'actionAdicionarProteccion',
            tooltip: 'Adicionar pedido',
            iconCls: 'fa fa-plus bluedark-button',
            icon: 'fa fa-plus bluedark-button',
            marginLeft: 5,
            width: 16,
            height: 16
        }, {
            id: 'actionModificarProteccion',
            tooltip: 'Modificar pedido',
            iconCls: 'fa fa-edit bluedark-button',
            icon: 'fa fa-edit bluedark-button',
            marginLeft: 5,
            width: 16,
            height: 16
        }, {
            id: 'actionEliminarProteccion',
            tooltip: 'Eliminar pedido',
            iconCls: 'fa fa-trash bluedark-button',
            icon: 'fa fa-trash bluedark-button',
            marginLeft: 5,
            width: 16,
            height: 16
        }
    ]
});
var rowEditorPedidoProteccion = new Ext.grid.RowEditor({
    id: 'rowEditorPedidoProteccion',
    clicksToEdit: 2,
    iconCls: 'btn',
    saveText: '<i class="fa fa-floppy-o green-button"></i> Guardar',
    cancelText: '<i class="fa fa-times-circle red-button"></i> Cancelar'
});
var stpedidoProteccion = new Ext.data.Store({
    id: 'stpedidoProteccion',
    name: 'stpedidoProteccion',
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
            //addRowPedidoProteccion(true);
//            lMask.hide();
            smpedidoProteccion.fireEvent('rowdeselect');
            lbValorProteccion.setText('Valor total: ' + formatoMoneda(stpedidoProteccion.reader.jsonData.total));
        }
    }
});
stpedidoProteccion.baseParams.idcategoria = 4;
stpedidoProteccion.load({
    params: {
        start: 0,
        limit: 20
    }
});
var smpedidoProteccion = new Ext.grid.RowSelectionModel({
    id: 'smpedidoProteccion',
    singleSelect: true,
});
smpedidoProteccion.on({
    rowselect: function(sm, rowIndex, record) {
        Ext.getCmp('gppedidoProteccion').getView().addRowClass(rowIndex, "negrita");
        if (record.data.estado == 0 || record.data.estado == 2) {
            btnModificarProteccion.enable();
            btnEliminarProteccion.enable();
        }
        if (record.data.estado == 0) {
            btnRevisarProteccion.enable();
        }
    },
    rowdeselect: function(sm, rowIndex, record) {
        if (record)
            Ext.getCmp('gppedidoProteccion').getView().removeRowClass(rowIndex, "negrita");
        btnModificarProteccion.disable();
        btnEliminarProteccion.disable();
        btnRevisarProteccion.disable();
    }
});
var gppedidoProteccion = new Ext.grid.EditorGridPanel({
    id: 'gppedidoProteccion',
    store: stpedidoProteccion,
//    autoExpandColumn: 'idproducto',
    plugins: [rowActionPedidoProteccion, rowEditorPedidoProteccion],
    sm: smpedidoProteccion,
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
            editor: cbCodigoProteccion,
            renderer: function(value, metaData, record, rowIndex, colIndex) {
                if (!Ext.isEmpty(value) && typeof value == 'number') {
                    return stProductoProteccion.getAt(stProductoProteccion.find('idproducto', value)).data.codigo;
                } else
                    return value;
            }
        }, {
            header: 'Descripci&oacute;n',
            width: 300,
            dataIndex: 'nombreproducto',
            sortable: true,
            editor: cbProductoProteccion,
            renderer: function(value, metaData, record, rowIndex, colIndex) {
                if (!Ext.isEmpty(value) && typeof value == 'number') {
                    return stProductoProteccion.getAt(stProductoProteccion.find('idproducto', value)).data.nombre;
                } else
                    return value;
            }
        }, {
            header: 'Unidad medida',
            width: 100,
            align: 'center',
            dataIndex: 'unidadmedida',
            sortable: true,
            editor: tfUnidadmedidaProteccion
        }, {
            header: 'Precio',
            width: 100,
            dataIndex: 'precioproducto',
            sortable: true,
            align: 'right',
            editor: tfPrecioProteccion,
            summaryType: 'sum',
            renderer: formatoMonedaNopeso
        }, {
            header: 'Cant. total',
            width: 100,
            dataIndex: 'cantidad',
            sortable: true,
            align: 'center',
            editor: tfCantidadProteccion
        }, {
            header: 'Valor',
            width: 100,
            dataIndex: 'valor',
            sortable: true,
            align: 'right',
            editor: tfValorProteccion,
            renderer: formatoMonedaNopeso
        }, {
            header: 'Fecha',
            hidden: true,
            hideable: true,
            width: 100,
            dataIndex: 'fechapedido',
            renderer: format_Fecha,
            editor: dfFechaProteccion
        }, {
            header: 'A&ntilde;o',
            width: 100,
            dataIndex: 'anno',
            align: 'center',
            editor: sfAnnoProteccion
        }, {
            header: 'Status',
            width: 100,
            dataIndex: 'estado',
            sortable: true,
            editor: tfStatusProteccion,
            renderer: showStatusProteccion
        }, {
            header: 'E',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'ene',
            editor: nfEneProteccion
        }, {
            header: 'F',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'feb',
            editor: nfFebProteccion
        }, {
            header: 'M',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'mar',
            editor: nfMarProteccion
        }, {
            header: 'A',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'abr',
            editor: nfAbrProteccion
        }, {
            header: 'M',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'may',
            editor: nfMayProteccion
        }, {
            header: 'J',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'jun',
            editor: nfJunProteccion
        }, {
            header: 'J',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'jul',
            editor: nfJulProteccion
        }, {
            header: 'A',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'ago',
            editor: nfAgoProteccion
        }, {
            header: 'S',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'sep',
            editor: nfSepProteccion
        }, {
            header: 'O',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'oct',
            editor: nfOctProteccion
        }, {
            header: 'N',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'nov',
            editor: nfNovProteccion
        }, {
            header: 'D',
            width: 40, renderer: eliminarCeroFinal,
            dataIndex: 'dic',
            editor: nfDicProteccion
        }, {
            header: 'idpedido',
            hidden: true,
            dataIndex: 'idpedido'
        }, {
            header: 'idproducto',
            hidden: true,
            dataIndex: 'idproducto'
        }, rowActionPedidoProteccion],
    tbar: [btnAdicionarProteccion, btnModificarProteccion, btnEliminarProteccion, btnRevisarProteccion, '->', lbValorProteccion, new Ext.Toolbar.Separator(), ' ', sfBuscarProteccion],
    bbar: new Ext.Feet.PagingToolbar({
        pageSize: 20,
        store: stpedidoProteccion,
        displayInfo: true,
        displayMsg: 'Resultados de {0} - {1} de {2}',
        emptyMsg: "No hay resultados para mostrar."
    })
});
rowActionPedidoProteccion.on('action', function(grid, record, action, rowIndex) {
    switch (action) {
        case 'actionAdicionarProteccion':
            btnAdicionarProteccion.handler.call();
            break;
        case 'actionModificarProteccion':
            if (!btnModificarProteccion.disabled)
                btnModificarProteccion.handler.call();
            break;
        case 'actionEliminarProteccion':
            if (!btnEliminarProteccion.disabled)
                btnEliminarProteccion.handler.call();
            break;
    }
});
rowEditorPedidoProteccion.on({
    beforeedit: function(roweditor, grid, record, rowIndex) {
        /*if (record.data.recordEditor) {
         roweditor.stopEditing();
         addRowPedidoProteccion();
         grid.getSelectionModel().selectRow(1);
         roweditor.startEditing(1);
         return false;
         } else */if (record.data.estado == '1') {
            MensajeInformacion('El pedido fue aceptado y no puede ser modificado.');
            return false;
        }
    },
    afteredit: function(roweditor, grid, object, record, rowIndex) {
        testChangesProteccion(record, object);
    }
});
function executeDeletePedidoProteccion(grid, record, rowIndex) {
    if (record.data.recordEditor)
        return;
    else {
        deletePedidoProteccion();
    }
}
function markToReviewProteccion(grid, record, rowIndex) {
    if (record.data.recordEditor)
        return;
    else {
        reviewPedidoProteccion();
    }
}
function testChangesProteccion(record, object) {
    if (record.data.idpedido == '0')
        adicionarPedidoProteccion(record.data.idproducto, record.data.cantidad, record.data.anno, record.data.ene, record.data.feb, record.data.mar, record.data.abr, record.data.may, record.data.jun, record.data.jul, record.data.ago, record.data.sep, record.data.oct, record.data.nov, record.data.dic);
    else
        modificarPedidoProteccion(record.data.idpedido, record.data.idproducto, record.data.cantidad, record.data.anno, record.data.ene, record.data.feb, record.data.mar, record.data.abr, record.data.may, record.data.jun, record.data.jul, record.data.ago, record.data.sep, record.data.oct, record.data.nov, record.data.dic);
}
function addRowPedidoProteccion(isEditor) {
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

    (isEditor === true) ? stpedidoProteccion.insert(0, newRecord) : stpedidoProteccion.insert(stpedidoProteccion.getCount(), newRecord);
    rowEditorPedidoProteccion.startEditing(stpedidoProteccion.getCount() - 1);
}
function adicionarPedidoProteccion(argIdproducto, argCantidad, argAnno, argEne, argFeb, argMar, argAbr, argMay, argJun, argJul, argAgo, argSep, argOct, argNov, argDic) {
    MostrarBarraProgreso('Adicionando pedido...');
    Ext.Ajax.request({
        url: 'adicionarpedido',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (responseData == 0) {// 0 significa que adiciono bien
                MensajeInformacion('El pedido fue adicionado correctamente.');
                stpedidoProteccion.reload();
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
function modificarPedidoProteccion(argIdpedido, argIdproducto, argCantidad, argAnno, argEne, argFeb, argMar, argAbr, argMay, argJun, argJul, argAgo, argSep, argOct, argNov, argDic) {
    MostrarBarraProgreso('Modificando pedido...');
    Ext.Ajax.request({
        url: 'modificarpedido',
        method: 'POST',
        callback: function(options, success, response) {
            responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (responseData == 0) {// 0 significa que modifico bien
                MensajeInformacion('El pedido fue modificado correctamente.');
                stpedidoProteccion.reload();
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
function deletePedidoProteccion() {
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
                    stpedidoProteccion.reload();
                }
                else if (responseData == 1) {
                    MensajeError('El pedido tiene datos asociados y no puede ser eliminado.');
                }
                else {
                    MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                }
            },
            params: {
                idpedido: smpedidoProteccion.getSelected().data.idpedido
            }
        });
    }
}
function reviewPedidoProteccion() {
    function confirmar(btn) {
        if (btn == 'ok') {
            reviewOK();
        }
    }
    MensajeOkCancel('Revisar pedido', String.fromCharCode(191) + 'Est&aacute; seguro que desea enviar a revisi&oacute;n el pedido seleccionado?', confirmar);

    function reviewOK() {
        var winObservacionProteccion = new Ext.Window({
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
            items: [{xtype: 'textarea', anchor: '100%', id: 'observacionproteccion',
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
                        winObservacionProteccion.close();
                    }
                })]
        });
        winObservacionProteccion.show();
        function goToRewiew() {
            if (Ext.getCmp('observacionproteccion').isValid()) {
                MostrarBarraProgreso('Cambiando estado al pedido...');
                Ext.Ajax.request({
                    url: 'cambiarestado',
                    method: 'POST',
                    callback: function(options, success, response) {
                        responseData = Ext.decode(response.responseText);
                        Ext.MessageBox.hide();
                        if (responseData == 0) {
                            MensajeInformacion('El pedido fue enviado a revisi&oacute;n correctamente.');
                            winObservacionProteccion.close();
                            stpedidoProteccion.reload();
                        }
                        else {
                            MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                        }
                    },
                    params: {
                        idpedido: smpedidoProteccion.getSelected().data.idpedido,
                        status: 2,
                        obs: Ext.getCmp('observacionproteccion').getValue()
                    }
                });
            }
        }
    }
}
function updateCantidadProteccion() {
    var cantidad = 0;
    cantidad = parseFloat(nfEneProteccion.getValue()) + parseFloat(nfFebProteccion.getValue()) + parseFloat(nfMarProteccion.getValue()) +
            parseFloat(nfAbrProteccion.getValue()) + parseFloat(nfMayProteccion.getValue()) + parseFloat(nfJunProteccion.getValue()) +
            parseFloat(nfJulProteccion.getValue()) + parseFloat(nfAgoProteccion.getValue()) + parseFloat(nfSepProteccion.getValue()) +
            parseFloat(nfOctProteccion.getValue()) + parseFloat(nfNovProteccion.getValue()) + parseFloat(nfDicProteccion.getValue());
    tfCantidadProteccion.setValue(cantidad);
    updateValorProteccion();
}
function updateValorProteccion() {
    tfValorProteccion.setValue(formatoMonedaNopeso(parseFloat(tfCantidadProteccion.getValue()) * parseFloat(tfPrecioProteccion.getValue())));
}
function buscarPedidoProteccion(cadena) {
    stpedidoProteccion.baseParams.cadena = cadena;
    stpedidoProteccion.reload({
        params: {
            start: 0,
            limit: 20
        }
    });
}
function showStatusProteccion(value, metaData, record, rowIndex, colIndex, store) {
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