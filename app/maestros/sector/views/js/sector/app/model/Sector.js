/* global Ext */
Ext.define('Sector.model.Sector', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idsector', type: 'int', useNull: true}, 'abreviatura', 'nombre'],
    idProperty: 'idsector',
    validations: [{type: 'length', field: 'abreviatura', min: 1, max: 50}, {type: 'length', field: 'nombre', min: 1, max: 255}]
});
