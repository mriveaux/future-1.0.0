Ext.define('Ejercicio.store.Periodo', {
    extend: 'Ext.data.Store',
    model: 'Ejercicio.model.Periodo',
    autoLoad: false,
    proxy: {
        type: 'rest',
        api: {
            read: 'getperiodos'
        },
        actionMethods: {
            read: 'POST'
        },
        reader: {
            root: 'data',
            totalProperty: 'total',
            successProperty: 'success',
            messageProperty: 'mensaje'
        }
    }
});