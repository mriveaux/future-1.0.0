Ext.define('Seleccion.model.Proceso', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idprocesoseleccion', type: 'int'}, 'nombre', 'fechainicio', 'fechafin', 'comite', 'observacion', 'status', 'identidad',
        {name: 'idcargoplantilla', type: 'int'},
        {name: 'cantidad', type: 'int'},
        {name: 'cargoplantilla', mapping: 'Cargoplantilla.nombre', type: 'string'}
    ]
});