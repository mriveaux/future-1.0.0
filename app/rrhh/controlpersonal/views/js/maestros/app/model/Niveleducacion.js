Ext.define('Maestros.model.Niveleducacion', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idniveleducacion', type: 'int', useNull: true}, 'nombre'],
    idProperty: 'idniveleducacion',
    validations: [{type: "length", field: "nombre", min: 1, max: 100}]
});