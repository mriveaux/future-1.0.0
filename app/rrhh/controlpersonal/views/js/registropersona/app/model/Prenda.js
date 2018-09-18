Ext.define('Registropersona.model.Prenda', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idprenda', type: 'int', useNull: true}, 'nombre'],
    idProperty: 'idprenda',
    validations: [{type: "length", field: "nombre", min: 1, max: 100}]
});