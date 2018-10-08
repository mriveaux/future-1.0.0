/* global Ext */
Ext.define('ClientesProveedores.model.Compania', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'nombre', type: 'string'}
    ]
});