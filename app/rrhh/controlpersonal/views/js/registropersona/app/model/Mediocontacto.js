Ext.define('Registropersona.model.Mediocontacto', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idmediocontacto', type: 'int', useNull: true}, 'nombre'],
    idProperty: 'idmediocontacto',
    validations: [{type: "length", field: "nombre", min: 1, max: 100}]
});