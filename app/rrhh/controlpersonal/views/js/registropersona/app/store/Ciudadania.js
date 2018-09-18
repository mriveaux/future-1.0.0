Ext.define('Registropersona.store.Ciudadania', {
    extend: 'Ext.data.Store',
    model: 'Registropersona.model.Ciudadania',
    sorters: ['ciudadania'],
    autoLoad: false,
    autoSync: false,
    filterOnLoad: false,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        actionMethods: {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        extraParams: {restful: true},
        api: {
            read: '../ciudadania/getciudadania',
            create: '../ciudadania/addciudadania',
            update: '../ciudadania/modciudadania',
            destroy: '../ciudadania/delciudadania'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total',
            successProperty: 'success'
        },
        writer: {
            type: 'json'
        },
        listeners: {
            exception: function(proxy, response, operation) {
                Ext.MessageBox.show({
                    title: 'Excepci&oacute;n remota',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    listeners: {
        'beforesync': function() {
            showMask('Cargando...');
        },
        'load': function(store, records, successful, eOpts) {
            hideMask();
        },
        'write': function(proxy, operation) {
            operation.callback = function(records, operat, success) {
                var msg = '';
                if (success) {
                    switch (operation.action) {
                        case 'create':
                            msg = 'La ciudadan&iacute;a fue adicionada correctamente.';
                            break;
                        case 'update':
                            msg = 'La ciudadan&iacute;a fue modificada correctamente.';
                            break;
                        case 'destroy':
                            msg = 'La ciudadan&iacute;a fue eliminada correctamente.';
                            break;
                    }
                    this.reload();
                }
                showMsg(1, msg);
            };
            hideMask();
        }
    }
});