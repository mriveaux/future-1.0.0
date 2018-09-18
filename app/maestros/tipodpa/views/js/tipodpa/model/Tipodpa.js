/* global Ext */
Ext.define('Tipodpa.model.Tipodpa', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idtipodpa', type: 'int', useNull: true}, 'denominacion', 'inicio', 'fin', 'estado'],
    idProperty: 'idtipodpa',
    validations: [{type: 'length', field: 'denominacion', min: 1, max: 255}]
});
