/* global Ext */
Ext.define('Dpa.model.Dpa', {
    extend: 'Ext.data.Model',
    fields: [{name: 'iddpa', type: 'int', useNull: true}, 'dpa'],
    idProperty: 'iddpa',
    validations: [{type: 'length', field: 'iddpa', min: 1, max: 19}, {type: 'length', field: 'dpa', min: 1, max: 255}]
});
