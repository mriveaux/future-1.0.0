/* global Ext, futureLang */
Ext.define('Formato.store.NivelFormato', {
    storeId: 'stNivelFormato', sorters: ['nivel', 'parteformato'],
    extend: 'Ext.data.Store', model: 'Formato.model.NivelFormato',
    autoLoad: false, autoSync: true,
    filterOnLoad: false, pageSize: 20,
    proxy: {
        type: 'rest',
        api: {
            read: 'getpartesformato',
            create: 'addparteformato',
            update: 'modparteformato',
            destroy: 'delparteformato'
        },
        actionMethods: {
            read: 'POST',
            create: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total',
            idProperty: 'idparteformato',
            successProperty: 'success',
            messageProperty: 'mensaje'
        },
        writer: {type: 'json'},
        listeners: {
            exception: function (proxy, response, operation) {
                var error = operation.getError();
                msg = ((typeof(error) == 'object') || (error instanceof Array)) ? Ext.lang.msgErrorServer : error;
                Ext.MessageBox.show({
                    title: Ext.lang.ttlExc,
                    msg: msg,
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    listeners: {
        'beforesync': function () {
            showMask();
        },
        'load': function (store, records, successful, eOpts) {
            hideMask();
        },
        'write': function (proxy, operation) {
            operation.callback = function (records, operat, success) {
                var response = Ext.decode(operat.response.responseText);
                var msg = '';
                if (success && parseInt(response) === 1) {
                    switch (operation.action) {
                        case 'create':
                            msg = futureLang.lbAddOk2;
                            break;
                        case 'update':
                            msg = futureLang.lbModOk2;
                            break;
                        case 'destroy':
                            msg = futureLang.lbDelOk2;
                            break;
                    }
                    this.reload();
                    showMsg(1, msg);
                }
                if (parseInt(response) === 2) {
                    this.reload();
                    showMsg(1, futureLang.lbExisteParte);
                }
            };
            hideMask();
        }
    }
});