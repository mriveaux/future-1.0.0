/* global Ext */
Ext.define('Recursos.model.Acciones', {
    extend: 'Ext.data.Model',
    fields: ['idaccion', 'nombre', 'idrecurso', 'asociado'],
    idProperty: 'idroles'
});
