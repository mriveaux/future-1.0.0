/* global Ext */
Ext.define('Recursos.model.Recursos', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idrecurso', type: 'int', useNull: true}, 'nombre', 'idbtn', 'icono', 'idfuncionalidad'],
    idProperty: 'idrecurso',
    validations: [{type: 'length', field: 'nombre', min: 1, max: 100}/*, {type: 'length', field: 'idbtn', min: 1, max: 100}, {type: 'length', field: 'icono', min: 1, max: 50}*/]
});
