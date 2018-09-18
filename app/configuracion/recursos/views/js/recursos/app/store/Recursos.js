/* global Ext */
Ext.define('Recursos.store.Recursos', {
    extend: 'Ext.data.Store', storeId: 'Recursos', model: 'Recursos.model.Recursos', autoLoad: false, autoSync: true, filterOnLoad: false,
    proxy: {
        type: 'ajax',
        actionMethods: {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        extraParams: {restful: true},
        api: {read: 'loaddatarecursos', create: 'addrecurso', update: 'modrecurso', destroy: 'delrecurso'},
        reader: {type: 'json', root: 'data', totalProperty: 'total', successProperty: 'success'},
        writer: {type: 'json'},
        listeners: {
            exception: function(proxy, response, operation) {
                var response = Ext.decode(response.responseText);
                if (response.codMsg == 2) {
                    var msg = '';
                    switch (operation.action) {
                        case 'create':
                            msg = futureLang.lbAdicionarExisteRecurso;
                            break;
                        case 'update':
                            msg = futureLang.lbModificarExisteRecurso;
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
                            msg = futureLang.msgAdicionarRecurso;
                            break;
                        case 'update':
                            msg = futureLang.msgModificarRecurso;
                            break;
                        case 'destroy':
                            msg = futureLang.msgEliminarRecurso;
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