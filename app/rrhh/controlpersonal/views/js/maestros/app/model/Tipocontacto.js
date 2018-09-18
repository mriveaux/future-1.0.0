Ext.define('Maestros.model.Tipocontacto', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idtipocontacto', type: 'int', useNull: true}, 'nombre'],
    idProperty: 'idtipocontacto',
    validations: [{type: "length", field: "nombre", min: 1, max: 100}]
});