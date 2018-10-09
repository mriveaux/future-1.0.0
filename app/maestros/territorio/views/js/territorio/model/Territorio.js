/* global Ext */
Ext.define('Cubasoft.model.Territorio', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idterritorio', type: 'int', useNull: true}, 'codigo', 'abreviatura', 'nombre'],
    idProperty: 'idterritorio',
    validations: [{type: "length", field: "codigo", min: 1, max: 19}, {type: "length", field: "abreviatura", min: 1, max: 30}, {type: "length", field: "nombre", min: 1, max: 255}]
});