/* global Ext */
Ext.define('Gruporoles.model.Roles', {
    extend: 'Ext.data.Model',
    fields: ['idroles', 'nombre', 'descripcion', 'asociado'],
    idProperty: 'idroles'
});
