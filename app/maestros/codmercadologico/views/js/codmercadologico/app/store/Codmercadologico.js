/* global Ext */
Ext.define('Codmercadologico.store.Codmercadologico', {
    extend: 'Ext.data.Store', storeId: 'Codmercadologico', model: 'Codmercadologico.model.Codmercadologico', sorters: ['nombre'],
    autoLoad: true, autoSync: true, filterOnLoad: false, pageSize: 20,
    proxy: {
        type: 'ajax',
        actionMethods: {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        extraParams: {restful: true},
        api: {read: 'loaddatacodmercadologico', create: 'addcodmercadologico', update: 'modcodmercadologico', destroy: 'delcodmercadologico'},
        reader: {type: 'json', root: 'data', totalProperty: 'total', successProperty: 'success'},
        writer: {type: 'json'},
        listeners: {
            exception: function(proxy, response, operation) {
                var response = Ext.decode(response.responseText);
                if (response.codMsg == 2) {
                    var msg = '';
                    switch (operation.action) {
                        case 'create':
                            msg = futureLang.lbAddExisteCod;
                            break;
                        case 'update':
                            msg = futureLang.lbModExisteCod;
                            break;
                        case 'destroy':
                            msg = futureLang.lbDatosAsociados;
                            break;
                    }
                    showMsg(1, msg);
                    hideMask();
                } else {
                    Ext.MessageBox.show({
                        title: futureLang.lbExcepRem,
                        msg: operation.getError(),
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            }
        }
    },
    listeners: {
        'beforesync': function() {
            showMask();
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
                            msg = futureLang.lbAddOk;
                            break;
                        case 'update':
                            msg = futureLang.lbModOk;
                            break;
                        case 'destroy':
                            msg = futureLang.lbDelOk;
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