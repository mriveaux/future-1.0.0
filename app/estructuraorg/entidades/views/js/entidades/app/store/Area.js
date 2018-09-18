/* global Ext */
Ext.define('Entidades.store.Area', {
    extend: 'Ext.data.Store', storeId: 'tsArea', model: 'Entidades.model.Area', sorters: ['text'], autoLoad: false, autoSync: false, filterOnLoad: false, pageSize: 20,
    proxy: {
        type: 'ajax',
        actionMethods: {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        extraParams: {restful: true},
        api: {read: 'cargarareaentidad', create: 'adddpa', update: 'moddpa', destroy: 'deldpa'},
        reader: {type: 'json', root: 'data', totalProperty: 'total', successProperty: 'success'},
        writer: {type: 'json'},
        listeners: {
            exception: function (proxy, response, operation) {
                Ext.MessageBox.show({title: 'Excepci&oacute;n remota', msg: operation.getError(), icon: Ext.MessageBox.ERROR, buttons: Ext.Msg.OK});
            }
        }
    },
//    listeners: {
//        'beforesync': function () {
//            showMask('Cargando...');
//        },
//        'load': function (store, records, successful, eOpts) {
//            hideMask();
//        },
//        'write': function (proxy, operation) {
//            operation.callback = function (records, operat, success) {
//                var msg = '';
//                if (success) {
//                    switch (operation.action) {
//                        case 'create':
//                            msg = 'El dpa fue adicionado correctamente.';
//                            break;
//                        case 'update':
//                            msg = 'El dpa fue modificado correctamente.';
//                            break;
//                        case 'destroy':
//                            msg = 'El dpa fue eliminado correctamente.';
//                            break;
//                    }
//                    this.reload();
//                }
//                showMsg(1, msg);
//            };
//            hideMask();
//        }
//    }
});