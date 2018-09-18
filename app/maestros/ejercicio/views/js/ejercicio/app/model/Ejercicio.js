Ext.define('Ejercicio.model.Ejercicio', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'idejercicio', type: 'int'},
        {name: 'antecesor', type: 'int'},
        {name: 'ejercicio', type: 'string'},
        {name: 'inicio', type: 'date'},
        {name: 'fin', type: 'date'}
    ]
});