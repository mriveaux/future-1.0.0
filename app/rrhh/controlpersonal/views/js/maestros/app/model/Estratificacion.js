Ext.define('Maestros.model.Estratificacion', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idestratificacion', type: 'int', useNull: true}, 'nombre'],
    idProperty: 'idestratificacion',
    validations: [{type: "length", field: "nombre", min: 1, max: 100}]
});