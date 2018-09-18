Ext.define('Maestros.model.Procedencia', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idprocedencia', type: 'int', useNull: true}, 'nombre'],
    idProperty: 'idprocedencia',
    validations: [{type: "length", field: "nombre", min: 1, max: 100}]
});