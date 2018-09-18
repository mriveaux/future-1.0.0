/* global Ext */
Ext.define('BancoSucursal.model.Banco', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idbanco', type: 'int', useNull: true}, 'banco', 'codigo', 'abreviatura'],
    idProperty: 'idbanco',
    validations: [
        {type: 'length', field: 'banco', min: 1, max: 255},
        {type: 'length', field: 'abreviatura', min: 1, max: 30}, 
        {type: 'length', field: 'codigo', min: 1, max: 30}
    ]
});