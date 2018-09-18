/* global Ext */
Ext.define('ClientesProveedores.model.mdClienteProv', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idclientesproveedores', type: 'int'},
        {name: 'codigo', type: 'string'},
        {name: 'nombre', type: 'string'},
        {name: 'tipo', type: 'int'},
        {name: 'descripcion', type: 'string'},
        {name: 'telefono', type: 'string'},
        {name: 'idpais', type: 'int'},
        {name: 'pais', type: 'string'},
        {name: 'provincia', type: 'string'},
        {name: 'direccion', type: 'string'},
        {name: 'codpostal', type: 'string'},
        {name: 'sitioweb', type: 'string'},
        {name: 'movil', type: 'string'},
        {name: 'fax', type: 'string'},
        {name: 'idcuentacobrar', type: 'int'},
        {name: 'cuentacobrar', type: 'string'},
        {name: 'idcuentapagar', type: 'int'},
        {name: 'cuentapagar', type: 'string'},
        {name: 'creditoconcedido', type: 'float'},
        {name: 'idempresa', type: 'int'},
        {name: 'isempresa', type: 'int'},
        {name: 'empresa', type: 'string'},
        {name: 'idestructura', type: 'int'},
        {name: 'ci', type: 'string'},
        {name: 'foto', type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'contactos'}
    ]
});