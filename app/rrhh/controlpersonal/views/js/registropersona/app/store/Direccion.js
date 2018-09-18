Ext.define('Registropersona.store.Direccion', {
    extend: 'Ext.data.Store',
    model: 'Registropersona.model.Direccion',
    sorters: ['direccion'],
    autoLoad: false,
    autoSync: false,
    filterOnLoad: false,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        actionMethods: {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        extraParams: {restful: true},
        api: {
            read: '../direccion/getdireccion',
            create: '../direccion/adddireccion',
            update: '../direccion/moddireccion',
            destroy: '../direccion/deldireccion'
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
                            msg = 'La direcci&oacute;n de residencia fue adicionada correctamente.';
                            break;
                        case 'update':
                            msg = 'La direcci&oacute;n de residencia fue modificada correctamente.';
                            break;
                        case 'destroy':
                            msg = 'La direcci&oacute;n de residencia fue eliminada correctamente.';
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