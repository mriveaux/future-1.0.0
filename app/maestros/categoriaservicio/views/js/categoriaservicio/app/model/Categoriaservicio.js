/* global Ext */
Ext.define('Categoriaservicio.model.Categoriaservicio', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idcategoriaservicio', type: 'int', useNull: true}, 'prioridad', 'abreviatura', 'nombre', 'color'],
    idProperty: 'idcategoriaservicio',
    validations: [{type: 'length', field: 'abreviatura', min: 1, max: 50}, {type: 'length', field: 'nombre', min: 1, max: 255}]
});
