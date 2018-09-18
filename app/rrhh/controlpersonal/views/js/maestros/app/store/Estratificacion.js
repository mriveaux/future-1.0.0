Ext.define('Maestros.store.Estratificacion', {
    extend: 'Ext.data.Store',
    model: 'Maestros.model.Estratificacion',
    sorters: ['nombre'],
    autoLoad: true,
    autoSync: true,
    filterOnLoad: false,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        actionMethods: {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        extraParams: {restful: true},
        api: {
            read: '../estratificacion/getestratificaciones',
            create: '../estratificacion/addestratificacion',
            update: '../estratificacion/modestratificacion',
            destroy: '../estratificacion/delestratificacion'
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
                            msg = 'La estratificaci&oacute;n social fue adicionada correctamente.';
                            break;
                        case 'update':
                            msg = 'La estratificaci&oacute;n social fue modificada correctamente.';
                            break;
                        case 'destroy':
                            msg = 'La estratificaci&oacute;n social fue eliminada correctamente.';
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