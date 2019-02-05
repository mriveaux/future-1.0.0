Ext.define('Registropersona.model.Vehiculo', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int', useNull: true}, 'idpersona', 'idvehiculo','nomatricula','fechaexpedido', 'fechavencimiento'
       // {name: 'fechaexpedido', type: 'date', format: 'd/m/Y'},
       // {name: 'fechavencimiento', type: 'date', format: 'd/m/Y', useNull: true}
    ]
});