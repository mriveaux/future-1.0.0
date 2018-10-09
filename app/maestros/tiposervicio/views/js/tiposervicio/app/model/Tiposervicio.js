/* global Ext */
Ext.define('Tiposervicio.model.Tiposervicio', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idtiposervicio', type: 'int', useNull: true}, 'abreviatura', 'nombre'],
    idProperty: 'idtiposervicio',
    validations: [{type: 'length', field: 'abreviatura', min: 1, max: 50}, {type: 'length', field: 'nombre', min: 1, max: 255}]
});
