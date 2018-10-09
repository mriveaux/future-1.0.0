/* global Ext */
Ext.define('Zona.model.Centroatencion', {
    extend: 'Ext.data.Model',
    fields: [{name: 'identidad', type: 'int', useNull: true}, 'abreviatura', 'nombre', 'padre'],
    idProperty: 'identidad',
    validations: [{type: 'length', field: 'nombre', min: 1, max: 100}]
});
