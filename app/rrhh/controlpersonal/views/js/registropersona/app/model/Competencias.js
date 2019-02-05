Ext.define('Registropersona.model.Competencias', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int', useNull: true}, 'idpersona',
        {name: 'nombre', type: 'string'}, {name: 'descripcion', type: 'string'}, 'fechaexpedido', 'fechavencimiento'
       // {name: 'fechaexpedido', type: 'date', format: 'd/m/Y'},
       // {name: 'fechavencimiento', type: 'date', format: 'd/m/Y', useNull: true}
    ]
});