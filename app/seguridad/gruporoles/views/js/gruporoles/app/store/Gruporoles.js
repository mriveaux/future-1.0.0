/* global Ext */
Ext.define('Gruporoles.store.Gruporoles', {
    extend: 'Ext.data.Store', storeId: 'Gruporoles', model: 'Gruporoles.model.Gruporoles', autoLoad: true, autoSync: true, filterOnLoad: false,
    proxy: {
        type: 'ajax',
        actionMethods: {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        extraParams: {restful: true},
        api: {read: 'loaddatagruporoles', create: 'addgruporoles', update: 'modgruporoles', destroy: 'delgruporoles'},
        reader: {type: 'json', root: 'data', totalProperty: 'total', successProperty: 'success'},
        writer: {type: 'json'},
        listeners: {
            exception: function(proxy, response, operation) {
                var response = Ext.decode(response.responseText);
                if (response.codMsg == 2) {
                    var msg = '';
                    switch (operation.action) {
                        case 'create':
                            msg = futureLang.lbAdicionarExisteGrupo;
                            break;
                        case 'update':
                            msg = futureLang.lbModificarExisteGrupo;
                            break;
                        case 'destroy':
                            msg = futureLang.lbDatosAsociados;
                            break;
                    }
                    showMsg(1, msg);
                    hideMask();
                } else {
                    Ext.MessageBox.show({title: futureLang.lbExcepRem, msg: operation.getError(), icon: Ext.MessageBox.ERROR, buttons: Ext.Msg.OK});
                }
            }
        }
    },
    listeners: {
        'beforesync': function() {
            showMask(Ext.lang.loading);
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
                            msg = futureLang.msgAdicionarGrupo;
                            break;
                        case 'update':
                            msg = futureLang.msgModificarGrupo;
                            break;
                        case 'destroy':
                            msg = futureLang.msgEliminarGrupo;
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