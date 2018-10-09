/* global Ext */
Ext.define('Codmercadologico.model.Codmercadologico', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idcodmercadologico', type: 'int', useNull: true}, 'categoriaservicio', 'abreviatura', 'nombre', 'idcategoria', 'color'],
    idProperty: 'idcodmercadologico',
    validations: [{type: 'length', field: 'abreviatura', min: 1, max: 50}, {type: 'length', field: 'nombre', min: 1, max: 255}, {type: 'length', field: 'idcategoria', min: 1, max: 19}]
});
