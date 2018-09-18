Ext.define('Ejercicio.model.Periodo', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idperiodo', type: 'int'},
        {name: 'idejercicio', type: 'int'},
        {name: 'periodo', type: 'string'},
        {name: 'inicio', type: 'date'},
        {name: 'fin', type: 'date'}
    ]
});