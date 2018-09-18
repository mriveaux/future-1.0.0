/* global Ext */
Ext.define('Gruporoles.model.Gruporoles', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idgruporoles', type: 'int', useNull: true}, 'nombre', 'descripcion'],
    idProperty: 'idgruporoles',
    validations: [{type: 'length', field: 'nombre', min: 1, max: 50}, {type: 'length', field: 'descripcion', min: 1, max: 255}]
});
