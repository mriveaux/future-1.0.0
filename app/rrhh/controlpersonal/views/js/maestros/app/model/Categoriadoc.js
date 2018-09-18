Ext.define('Maestros.model.Categoriadoc', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idcategoriadocidentidad', type: 'int', useNull: true}, 'nombre', 'descripcion'],
    idProperty: 'idcategoriadoc',
    validations: [{type: "length", field: "nombre", min: 1, max: 50}, {type: "length", field: "descripcion", min: 1, max: 255}]
});