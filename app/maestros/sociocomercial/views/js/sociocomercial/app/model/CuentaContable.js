/* global Ext */
Ext.define('ClientesProveedores.model.CuentaContable', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'leaf', type: 'bool'},
        {name: 'idcuenta', type: 'int'},
        {name: 'text', type: 'string'},
        {name: 'qtip', type: 'string'},
        {name: 'codigo', type: 'string'},
        {name: 'concatcta', type: 'string'},
        {name: 'denominacion', type: 'string'},
        {name: 'nivel', type: 'int'},
        {name: 'idcontenido', type: 'int'},
        {name: 'idnaturaleza', type: 'int'}
    ]
});