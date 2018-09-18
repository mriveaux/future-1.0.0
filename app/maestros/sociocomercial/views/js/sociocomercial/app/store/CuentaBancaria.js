/* global Ext */
Ext.define('ClientesProveedores.store.CuentaBancaria', {
    extend: 'Ext.data.Store',
    fields: ['','idcuentabancaria', 'numerocuenta','nombre',  'banco', 'predeterminada']
});