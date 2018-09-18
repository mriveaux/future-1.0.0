/* global Ext */
Ext.define('Entidades.model.Entidad', {
    extend: 'Ext.data.Model',
    fields: ['id', 'text', 'reeup', 'nit', 'idpadre', 'leaf', 'identidad', 'foto', 'nombre', 'abreviatura', 'descripcion', 'telefonos', 'correos', 'direccion', 'correos', 'iddpa', 'web', 'dpaext', 'geoid']
});