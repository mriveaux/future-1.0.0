/* global Ext */
Ext.define('Ura.model.Ura', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idura', type: 'int', useNull: true}, 'ura', 'identidad'],
    idProperty: 'idura',
    validations: [{type: 'length', field: 'ura', min: 1, max: 100}, {type: 'length', field: 'identidad', min: 1, max: 19}]
});
