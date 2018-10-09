/* global Ext */
Ext.define('Codmercadologico.model.Categoriaservicio', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idcategoria', mapping: 'idcategoriaservicio', type: 'int', useNull: true},
        {name: 'categoriaservicio', mapping: 'abreviatura'}, 'abreviatura', 'prioridad', 'nombre', 'color'],
    idProperty: 'idcategoriaservicio',
    validations: [{type: 'length', field: 'abreviatura', min: 1, max: 50}, {type: 'length', field: 'nombre', min: 1, max: 255}]
});
