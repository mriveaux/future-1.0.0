Ext.define('Registropersona.store.Docidentidad', {
    extend: 'Ext.data.Store',
    model: 'Registropersona.model.Docidentidad',
    autoLoad: false,
    autoSync: false,
    filterOnLoad: false,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        actionMethods: {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        extraParams: {restful: true},
        api: {
            read: '../docidentidad/getdocidentidades',
            create: '../docidentidad/adddocidentidad',
            update: '../docidentidad/moddocidentidad',
            destroy: '../docidentidad/deldocidentidad'
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
                            msg = 'El documento de identidad fue adicionado correctamente.';
                            break;
                        case 'update':
                            msg = 'El documento de identidad fue modificado correctamente.';
                            break;
                        case 'destroy':
                            msg = 'El documento de identidad fue eliminado correctamente.';
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