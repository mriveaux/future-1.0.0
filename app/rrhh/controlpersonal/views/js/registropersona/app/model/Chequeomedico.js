Ext.define('Registropersona.model.Chequeomedico', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int', useNull: true}, 'idpersona','fechaexpedido', 'fechavencimiento',
        {name: 'lugar', type: 'string'}
       // {name: 'fechaexpedido', type: 'date', format: 'd/m/Y'},
       // {name: 'fechavencimiento', type: 'date', format: 'd/m/Y', useNull: true}
    ]
});