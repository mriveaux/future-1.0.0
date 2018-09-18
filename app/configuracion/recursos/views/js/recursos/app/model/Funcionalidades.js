/* global Ext */
Ext.define('Recursos.model.Funcionalidades', {
    extend: 'Ext.data.Model',
    fields: ['id', 'text', 'idpadre', 'leaf', 'idmodulo', 'nombre', 'abreviatura', 'descripcion','src']
});