/* global Ext */
Ext.define('Categoriacliente.model.Categoriacliente', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idcategoriacliente', type: 'int', useNull: true}, 'abreviatura', 'nombre', 'idsector', 'idtiposervicio', 'sector', 'tiposervicio'],
    idProperty: 'idcategoriacliente',
    validations: [{type: 'length', field: 'abreviatura', min: 1, max: 50}, {type: 'length', field: 'nombre', min: 1, max: 255}, {type: 'length', field: 'idsector', min: 1, max: 19}, {type: 'length', field: 'idtiposervicio', min: 1, max: 19}]
});
