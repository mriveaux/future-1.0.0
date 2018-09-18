Ext.define('Maestros.store.Gruposanguineo', {
    extend: 'Ext.data.Store',
    model: 'Maestros.model.Gruposanguineo',
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
            read: '../gruposanguineo/getgruposanguineo',
            create: '../gruposanguineo/addgruposanguineo',
            update: '../gruposanguineo/modgruposanguineo',
            destroy: '../gruposanguineo/delgruposanguineo'
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
                            msg = 'El grupo sangu&iacute;neo fue adicionado correctamente.';
                            break;
                        case 'update':
                            msg = 'El grupo sangu&iacute;neo fue modificado correctamente.';
                            break;
                        case 'destroy':
                            msg = 'El grupo sangu&iacute;neo fue eliminado correctamente.';
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