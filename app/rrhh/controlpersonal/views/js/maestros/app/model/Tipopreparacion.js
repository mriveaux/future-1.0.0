Ext.define('Maestros.model.Tipopreparacion', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idtipopreparacion', type: 'int', useNull: true}, 'nombre'],
    idProperty: 'idtipopreparacion',
    validations: [{type: "length", field: "nombre", min: 1, max: 100}]
});