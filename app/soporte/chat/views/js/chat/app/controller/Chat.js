/* global Ext */
Ext.define('Chat.controller.Chat', {
    extend: 'Ext.app.Controller',
    stores: ['Chat'],
    models: ['Chat'],
    views: ['List'],
    refs: [{ref: 'list', selector: 'grid'}],
    init: function() {
        this.control({
            'chatlist': {
                selectionchange: this.toggleBtn,
                render: this.openWssConnection
            },
            'chatlist button[action=add]': {
                click: this.addChat
            },
            'chatlist button[action=mod]': {
                click: this.editChat
            },
            'chatlist button[action=del]': {
                click: this.delChat
            },
            'territorioedit button[action=save]': {
                click: this.updateChat
            }
        });
    },
    addChat: function() {
        var Terr = this.getModel('Chat');
        this.getList().getStore().insert(0, new Terr());
        this.getList().reChat.startEdit(0, 0);
    },
    editChat: function(grid, record) {
        var selection = this.getList().getSelectionModel().getSelection()[0];
        this.getList().reChat.startEdit(selection, 0);
    },
    delChat: function(grid, record) {
        var me = this;
        var selection = this.getList().getSelectionModel().getSelection()[0];
        var nombChat = selection.data.nombre;
        function confirmar(btn) {
            if (btn === 'ok') {
                if (selection) {
                    me.getList().getStore().remove(selection);
                }
            }
        }
        MensajeInterrogacion('Confirmaci\xF3n', String.fromCharCode(191) + 'Est\xE1 seguro que desea eliminar el territorio <b>' + nombChat + '</b>?', confirmar);
    },
    updateChat: function(button) {
        var win = button.up('window'),
                form = win.down('form'),
                record = form.getRecord(),
                values = form.getValues();

        record.set(values);
        win.close();
        this.getChatStore().sync();
    },
    toggleBtn: function(selModel, selections) {
        this.getList().down('#btnModificar').setDisabled(selections.length === 0);
        this.getList().down('#btnEliminar').setDisabled(selections.length === 0);
    },
    openWssConnection: function() {
        var ws = Ext.create('Ext.ux.WebSocket', {
            url: 'https://192.168.111.75:9000/wss/',
            autoReconnect: false,
            listeners: {
                open: function(ws) {
                    if (Ext.get(ws.url))
                        console.log('> WebSocket just open!<br/>');
//                        Ext.get(ws.url).dom.innerHTML += '> WebSocket just open!<br/>';
                },
                message: function(ws, data) {
                    Ext.get(ws.url).dom.innerHTML += '> ' + data + '<br/>';
                },
                close: function(ws) {
                    var panel = Ext.getCmp('panel' + ws.url);

                    if ((panel != null) || (panel != undefined)) {
                        panel.destroy();
                    }
                }
            }
        });
        Ext.ux.WebSocketManager.register(ws);
    }
});
