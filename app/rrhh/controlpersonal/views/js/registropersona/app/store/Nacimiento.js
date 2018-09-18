Ext.define('Registropersona.store.Nacimiento', {
    name: 'nacimiento',
    extend: 'Ext.data.Store',
    model: 'Registropersona.model.Nacimiento',
    autoLoad: false,
    autoSync: false,
    filterOnLoad: false,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        actionMethods: {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        extraParams: {restful: true},
        api: {
            read: '../nacimiento/getnacimiento',
            create: '../nacimiento/addnacimiento',
            update: '../nacimiento/modnacimiento',
            destroy: '../nacimiento/delnacimiento'
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
        'beforeload': function(store, records, successful, eOpts) {
            hideMask();
            var list = Ext.widget('list_nacimiento');
            list.down('button[action=add]').setDisabled(records.length != 0);
        },
        'write': function(proxy, operation) {
            operation.callback = function(records, operat, success) {
                var msg = '';
                if (success) {
                    switch (operation.action) {
                        case 'create':
                            msg = 'Los datos del nacimiento fueron adicionados correctamente.';
                            break;
                        case 'update':
                            msg = 'Los datos del nacimiento fueron modificados correctamente.';
                            break;
                        case 'destroy':
                            msg = 'Los datos del nacimiento fueron eliminados correctamente.';
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