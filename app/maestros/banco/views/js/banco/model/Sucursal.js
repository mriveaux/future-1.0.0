/* global Ext */
Ext.define('BancoSucursal.model.Sucursal', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idsucursal', type: 'int'},
        {name: 'idbanco', type: 'int'},
        {name: 'numero', type: 'int'},
        {name: 'direccion', type: 'string'}
    ],
    idProperty: 'idsucursal',
    validations: [
        {type: 'length', field: 'direccion', min: 1, max: 255},
        {type: 'length', field: 'numero', min: 1, max: 30}
    ]
});