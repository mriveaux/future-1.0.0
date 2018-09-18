Ext.define('Maestros.model.Gruposanguineo', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idgruposanguineo', type: 'int', useNull: true}, 'nombre'],
    idProperty: 'idgruposanguineo',
    validations: [{type: "length", field: "nombre", min: 1, max: 100}]
});