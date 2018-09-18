/* global Ext */
Ext.define('Bloqueousuario.controller.Bloqueousuario', {
    extend: 'Ext.app.Controller',
    stores: ['Bloqueousuario', 'HisBloqueousuario'],
    models: ['Bloqueousuario', 'HisBloqueousuario'],
    views: ['ListBloqueos', 'ListHisBloqueos'],
    refs: [{ref: 'listbloqueos', selector: 'listbloqueos'}, {ref: 'listhisbloqueos', selector: 'listhisbloqueos'}],
    init: function() {
        this.control({
            'listbloqueos': {
                selectionchange: this.toggleBtn
            },
            'listbloqueos button[action=desbloquear]': {
                click: this.validateUnlockUser
            }
        });
    },
    validateUnlockUser: function(grid, record) {
        var me = this;
        var selection = this.getListbloqueos().getSelectionModel().getSelection()[0];
        function confirmar(btn) {
            if (btn === 'ok') {
                if (selection) {
                    me.unlockUser(me.getListbloqueos().getSelectionModel().getSelection()[0].data.idbloqueo);
                }
            }
        }
        MensajeInterrogacion(futureLang.lConfirmacion, futureLang.lbQuestdesbloquear, confirmar);
    },
    unlockUser: function(idbloqueo) {
        loadProgress(futureLang.msgaddrol);
        var me = this;
        Ext.Ajax.request({
            url: 'unlockuser',
            method: 'POST',
            params: {
                idbloqueo: idbloqueo
            },
            callback: function(options, success, response) {
                Ext.MessageBox.hide();
                var responseData = Ext.decode(response.responseText);
                if (responseData) {
                    MensajeInformacion(futureLang.msgconfirmaddrol);
                    me.getListbloqueos().getStore().load();
                } else {
                    showMsg(3, futureLang.msgajaxerror);
                }
            }
        });
    },
    toggleBtn: function(selModel, selections) {
        this.getListbloqueos().down('#btnDesbloquear').setDisabled(selections.length === 0);
    }
});
