/* global Ext */
Ext.define('ClientesProveedores.model.CuentaBancaria', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idcuentabancaria', type: 'int'},
        {name: 'nombre', type: 'string'},
        {name: 'nombrebanco', type: 'string'},
        {name: 'numerosucursal'}
    ]
});