Ext.define('Registropersona.model.Superacion', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idsuperacion', type: 'int', useNull: true}, 'idpersona','desde','hasta',
        {name: 'tipocurso', type: 'string'},
        {name: 'nombrecurso', type: 'string'},
        {name: 'centroestudio', type: 'string'},
        {name: 'evaluacion', type: 'float'}
//        {name: 'desde', type: 'date', format: 'd/m/Y', useNull: true},
//        {name: 'hasta', type: 'date', format: 'd/m/Y', useNull: true}
    ]
});