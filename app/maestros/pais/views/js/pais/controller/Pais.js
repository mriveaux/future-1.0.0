/* global Ext, futureLang */
Ext.define('Pais.controller.Pais', {
    extend: 'Ext.app.Controller',
    stores: ['Pais', 'Tipodpa'], models: ['Pais', 'Tipodpa'], views: ['List', 'Confdpa'],
    refs: [{ref: 'list', selector: 'grid'}, {ref: 'tree', selector: 'treepanel'}],
    init: function () {
        var me = this;
        me.control({
            'paislist': {
                itemdblclick: me.editPais,
                selectionchange: me.toggleBtn
            },
            'paislist button[action=add]': {
                click: me.addPais
            },
            'paislist button[action=mod]': {
                click: me.editPais
            },
            'paislist button[action=del]': {
                click: me.delPais
            },
            'paislist button[action=print]': {
                click: me.printPaises
            },
            'paislist button[action=set]': {
                click: me.confPaisDpa
            },
            'confdpa > toolbar > button[action=addtipodpapais]': {
                click: me.addTipoDpaPais
            },
            'confdpa > toolbar > button[action=deltipodpapais]': {
                click: me.delTipoDpaPais
            }
        });
    },
    toggleBtn: function (selModel, selections) {
        this.getList().down('#btnMod').setDisabled(selections.length === 0);
        this.getList().down('#btnDel').setDisabled(selections.length === 0);
        this.getList().down('#btnSet').setDisabled(selections.length === 0);
    },
    addPais: function () {
        var Terr = this.getModel('Pais');
        this.getList().getStore().insert(0, new Terr());
        this.getList().rePais.startEdit(0, 0);
    },
    editPais: function () {
        if (this.getList().getSelectionModel().hasSelection()) {
            var selection = this.getList().getSelectionModel().getSelection()[0];
            this.getList().rePais.startEdit(selection, 0);
        } else {
            showMsg(0, futureLang.lbSelMod);
        }
    },
    delPais: function () {
        var me = this;
        if (me.getList().getSelectionModel().hasSelection()) {
            var selection = me.getList().getSelectionModel().getSelection()[0];
            var nombPais = selection.data.pais;
            function confirmar(btn) {
                if (btn === 'ok') {
                    if (selection) {
                        me.getList().getStore().remove(selection);
                    }
                }
            }
            MensajeInterrogacion(Ext.lang.titles[2], Ext.String.format(futureLang.lbConfirmDel, nombPais), confirmar);
        } else {
            showMsg(0, futureLang.lbSelDel);
        }
    },
    printPaises: function () {
        var me = this;
        Ext.Msg.wait(futureLang.lbLoading, futureLang.lbWait);
        Ext.Ajax.request({
            method: "POST",
            url: "getdatarpt",
            callback: function (options, success, response) {
                var responseData = Ext.decode(response.responseText);
                Ext.Msg.hide();
                if (responseData.datoCuerpo.length > 0) {
                    var winPrintView = Ext.create('Ext.comun.PrintView');
                    winPrintView.data = responseData;
                } else {
                    showMsg(1, futureLang.lbNoResults);
                }
            }
        });
    },
    confPaisDpa: function () {
        var me = this;
        if (me.getList().getSelectionModel().hasSelection()) {
            var selection = me.getList().getSelectionModel().getSelection()[0];
            var nombPais = selection.data.pais;
            var view = Ext.widget('confdpa');
            view.setTitle(Ext.String.format(futureLang.lbDpa3, nombPais));
        } else {
            showMsg(0, futureLang.lbSelPaisDpa);
        }
    },
    addTipoDpaPais: function () {
        var me = this;
        var selection = me.getList().getSelectionModel().getSelection()[0];
        var idPais = selection.data.idpais;
        var selTree = me.getTree().getSelectionModel().getSelection()[0];
        var idTipoDpa = Ext.getCmp('cbTipoDpa').getValue();
        var idPadre = selTree.data.id;
        if (idPadre !== idTipoDpa) {
            Ext.Msg.wait(futureLang.lbSaving);
            Ext.Ajax.request({
                method: "POST",
                params: {
                    idpais: idPais,
                    idtipodpa: idTipoDpa,
                    idpadre: idPadre
                },
                url: 'addtipodpapais',
                callback: function (options, success, responseData) {
                    var response = Ext.decode(responseData.responseText);
                    Ext.Msg.hide();
                    if (parseInt(response) === 1) {
                        showMsg(1, futureLang.lbAdicionarDpaOk);
                        me.getTree().getStore().reload();
                        me.getTree().getStore().sync();
                        Ext.getCmp('cbTipoDpa').reset();
                        Ext.getCmp('cbTipoDpa').expand();
                        Ext.getCmp('cbTipoDpa').focus();
                    } else {
                        showMsg(3, futureLang.lbErrorServer);
                    }
                }
            });
        } else {
            showMsg(0, futureLang.lbAdicionarDpaRec);
        }
    },
    delTipoDpaPais: function () {
        var me = this;
        if (me.getTree().getSelectionModel().hasSelection()) {
            var selection = me.getTree().getSelectionModel().getSelection()[0];
            var id = selection.data.id;
            var nombDpa = selection.data.text;
            function confirmar(btn) {
                if (btn === 'ok') {
                    if (selection) {
                        Ext.Msg.wait(futureLang.lbDeleting);
                        Ext.Ajax.request({
                            method: "POST",
                            params: {id: id},
                            url: 'deltipodpapais',
                            callback: function (options, success, responseData) {
                                var response = Ext.decode(responseData.responseText);
                                Ext.Msg.hide();
                                if (parseInt(response) === 1) {
                                    showMsg(1, futureLang.lbEliminarDpaOk);
                                    me.getTree().getStore().reload();
                                    me.getTree().getStore().sync();
                                    me.getTree().getView().refresh();
                                    Ext.getCmp('cbTipoDpa').reset();
                                } else {
                                    showMsg(3, futureLang.lbErrorServer);
                                }
                            }
                        });
                    }
                }
            }
            MensajeInterrogacion(Ext.lang.titles[2], Ext.String.format(futureLang.lbConfirmDelDpa, nombDpa), confirmar);
        } else {
            showMsg(0, futureLang.lbSelDelDpa);
        }
    }

});