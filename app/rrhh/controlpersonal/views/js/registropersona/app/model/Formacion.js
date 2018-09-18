Ext.define('Registropersona.model.Formacion', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idestudio', type: 'int', useNull: true}, 'idpersona','desde','hasta',
        {name: 'tipoestudio', type: 'string'},
        {name: 'centroestudio', type: 'string'},
        {name: 'evaluacion', type: 'float'}
//        {name: 'desde', type: 'date', format: 'd/m/Y', useNull: true},
//        {name: 'hasta', type: 'date', format: 'd/m/Y', useNull: true}
    ]
});