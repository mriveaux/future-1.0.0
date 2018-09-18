Ext.define('Registropersona.model.Tallaje', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idtallaje', type: 'int', useNull: true}, 'idprenda', 'idpersona', 'talla',
        {name: 'prenda', mapping: 'Prenda.nombre'}
    ]
});