Ext.define('Ejercicio.store.Ejercicio', {
    extend: 'Ext.data.Store',
    model: 'Ejercicio.model.Ejercicio',
    autoLoad: true,
    pageSize: 25,
    proxy: {
        type: 'ajax',
        url: 'getejercicios',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'mensaje'
        }
    }

});