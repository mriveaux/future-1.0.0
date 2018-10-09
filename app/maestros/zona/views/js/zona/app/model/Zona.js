/* global Ext */
Ext.define('Zona.model.Zona', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idzona', type: 'int', useNull: true}, 'zona', 'identidad'],
    idProperty: 'idzona',
    validations: [{type: 'length', field: 'zona', min: 1, max: 100}, {type: 'length', field: 'identidad', min: 1, max: 19}]
});
