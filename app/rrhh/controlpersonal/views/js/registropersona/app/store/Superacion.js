Ext.define('Registropersona.store.Superacion', {
    extend: 'Ext.data.Store',
    model: 'Registropersona.model.Superacion',
    autoLoad: false,
    autoSync: false,
    filterOnLoad: false,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        actionMethods: {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        extraParams: {restful: true},
        api: {
            read: '../superacion/getsuperacion',
            create: '../superacion/addsuperacion',
            update: '../superacion/modsuperacion',
            destroy: '../superacion/delsuperacion'
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
                            msg = 'El curso de superaci&oacute;n fue adicionado correctamente.';
                            break;
                        case 'update':
                            msg = 'El curso de superaci&oacute;n fue modificado correctamente.';
                            break;
                        case 'destroy':
                            msg = 'El curso de superaci&oacute;n fue eliminado correctamente.';
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