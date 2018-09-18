/* global Ext, futureLang */
Ext.define('Formato.controller.Formato', {
    extend: 'Ext.app.Controller',
    views: ['Formato.view.FormatoGrid', 'Formato.view.FormatoEdit', 'Formato.view.FormatoNivelEdit', 'Formato.view.NivelFormatoGrid', 'Formato.view.HeredarFormatoWin'],
    stores: ['Formato.store.Formato', 'Formato.store.Modulo', 'Formato.store.NivelFormato'],
    models: ['Formato.model.Formato', 'Formato.model.Modulo', 'Formato.model.NivelFormato'],
    refs: [{ref: 'formato_grid', selector: 'formato_grid'}, {ref: 'formato_edit', selector: 'formato_edit'}, {ref: 'formatonivel_edit', selector: 'formatonivel_edit'}, {ref: 'nivelformato_grid', selector: 'nivelformato_grid'}, {ref: 'controller', selector: 'controller'}],
    init: function () {
        var me = this;
        me.control({
            'formato_grid': {
                selectionchange: me.onFormatoSelectionChange
            },
            'formato_grid button[action=addFormato]': {
                click: me.addFormato
            },
            'formato_grid button[action=modFormato]': {
                click: me.modFormato
            },
            'formato_grid button[action=deleteFormato]': {
                click: me.deleteFormato
            },
            'formato_grid button[action=heredarFormato]': {
                click: me.heredarFormato
            },
            'formato_edit button[action=aplicar]': {
                click: me.saveFormato
            },
            'formato_edit button[action=aceptar]': {
                click: me.saveFormato
            },
            'nivelformato_grid': {
                selectionchange: me.onNivelFormatoSelectionChange
            },
            'nivelformato_grid button[action=addNivelFormato]': {
                click: me.addNivelFormato
            },
            'nivelformato_grid button[action=modNivelFormato]': {
                click: me.modNivelFormato
            },
            'nivelformato_grid button[action=deleteNivelFormato]': {
                click: me.deleteNivelFormato
            },
            'formatonivel_edit button[action=aplicar]': {
                click: me.saveNivelFormato
            },
            'formatonivel_edit button[action=aceptar]': {
                click: me.saveNivelFormato
            },
            'heredarformato_win button[action=aceptar]': {
                click: me.addFormatoHeredado
            }
        });

        me.getFormatoStoreNivelFormatoStore().on(
                {
                    beforeload: {fn: me.setearExtraParams, scope: this}
                }
        );
    },
    setearExtraParams: function (store) {
        var extraParams = {idformato: this.getFormato_grid().getSelectionModel().getLastSelected().get('idformato')};
        store.getProxy().extraParams = extraParams;
    },
    addFormato: function () {
        var win = Ext.widget('formato_edit');
        win.down('button[action=aplicar]').show();
        win.setTitle(futureLang.lbAdd2);
    },
    modFormato: function () {
        var win = Ext.widget('formato_edit');
        win.down('button[action=aplicar]').hide();
        win.setTitle(futureLang.lbMod2);
        var form = win.down('form');
        var record = this.getFormato_grid().getSelectionModel().getLastSelected();
        form.loadRecord(record);
    },
    deleteFormato: function () {
        var me = this;
        var grid = me.getFormato_grid();
        if (grid.getSelectionModel().hasSelection()) {
            var selection = grid.getSelectionModel().getLastSelected();
            var nombFormato = selection.data.formato;
            function confirmar(btn) {
                if (btn == 'ok') {
                    var record = me.getFormato_grid().getSelectionModel().getLastSelected();
                    var myMask = new Ext.LoadMask(me.getFormato_grid(), {msg: futureLang.lbEliminandoFormato});
                    myMask.show();
                    Ext.Ajax.request({
                        url: 'delformato',
                        method: 'POST',
                        params: {
                            idformato: record.get('idformato'),
                            propietario: record.get('propietario')
                        },
                        success: function (response) {
                            myMask.hide();
                            me.getFormato_grid().getStore().reload();
                        },
                        failure: function (response, opts) {
                            myMask.hide();
                        }
                    });
                }
            }
            MensajeInterrogacion(Ext.lang.titles[2], Ext.String.format(futureLang.lbMsgConfirmar, nombFormato), confirmar);
        } else {
            showMsg(0, futureLang.lbSelDel);
        }

    },
    heredarFormato: function (btn) {
        var win = Ext.widget('heredarformato_win');
    },
    addNivelFormato: function () {
        var me = this;
        var NivelFormato = this.getFormatoModelNivelFormatoModel();
        this.getFormatoStoreNivelFormatoStore().insert(0, new NivelFormato({
            idformato: me.getFormato_grid().getSelectionModel().getLastSelected().get('idformato')
        }));
        this.getNivelformato_grid().reParteFormato.startEdit(0, 0);
    },
    modNivelFormato: function () {
        if (this.getNivelformato_grid().getSelectionModel().hasSelection()) {
            var selection = this.getNivelformato_grid().getSelectionModel().getSelection()[0];
            this.getNivelformato_grid().reParteFormato.startEdit(selection, 0);
        } else {
            showMsg(0, futureLang.lbSelMod2);
        }
    },
    deleteNivelFormato: function () {
        var me = this,
                grid = me.getNivelformato_grid();
        if (grid.getSelectionModel().hasSelection()) {
            var selection = grid.getSelectionModel().getLastSelected();
            var nombParteFormato = selection.data.parteformato;
            function confirmar(btn) {
                if (btn === 'ok') {
                    if (selection) {
                        grid.getStore().remove(selection);
                    }
                }
            }
            MensajeInterrogacion(Ext.lang.titles[2], Ext.String.format(futureLang.lbMsgConfirmar2, nombParteFormato), confirmar);
        } else {
            showMsg(0, futureLang.lbSelDel2);
        }
    },
    addFormatoHeredado: function (btn) {
        var me = this,
                win = btn.up('window'),
                grid = win.down('grid');

        if (grid.getSelectionModel().hasSelection()) {
            var records = grid.getSelectionModel().getSelection();
            var arrayIds = new Array();
            Ext.each(records, function (record) {
                arrayIds.push(record.get('idformato'));
            });

            var myMask = new Ext.LoadMask(grid, {msg: futureLang.lbHeredandoFormato});
            myMask.show();
            Ext.Ajax.request({
                url: 'heredarFormato',
                params: {
                    idformato: Ext.encode(arrayIds)
                },
                success: function (response) {
                    myMask.hide();
                    var text = response.responseText;
                    me.getFormato_grid().getStore().reload();
                    win.close();
                },
                failure: function (response, opts) {
                    myMask.hide();
                }
            });
        } else {
            Ext.MessageBox.show({
                title: futureLang.lbAlerta,
                msg: futureLang.lbSeleccionarFormato,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
        }
    },
    onFormatoSelectionChange: function (sm, arrSelectedRecord) {
        var me = this;
        var gridFormato = this.getFormato_grid();

        gridFormato.down('button[action=modFormato]').disable();
        gridFormato.down('button[action=deleteFormato]').disable();

        if (sm.hasSelection()) {
            var record = gridFormato.getSelectionModel().getLastSelected();
            if (record.get('propietario')) {
                gridFormato.down('button[action=modFormato]').enable();
            }

            gridFormato.down('button[action=deleteFormato]').enable();
            this.getNivelformato_grid().enable();
            this.getNivelformato_grid().getStore().load({
                params: {
                    idformato: arrSelectedRecord[0].get('idformato')
                }
            });
        } else {
            this.getNivelformato_grid().getStore().removeAll();
            this.getNivelformato_grid().disable();
        }
    },
    onNivelFormatoSelectionChange: function (sm, arrSelectedRecord) {
        var gridNivelFormato = this.getNivelformato_grid();
        if (sm.hasSelection()) {
            gridNivelFormato.down('button[action=modNivelFormato]').enable();
            gridNivelFormato.down('button[action=deleteNivelFormato]').enable();

        } else {
            gridNivelFormato.down('button[action=modNivelFormato]').disable();
            gridNivelFormato.down('button[action=deleteNivelFormato]').disable();
        }
    },
    saveFormato: function (btn) {
        var me = this,
                win = btn.up('window'),
                form = win.down('form'),
                gridFormato = me.getFormato_grid();

        if (form.getForm().isValid()) {
            var values = form.getForm().getValues();
            var url = values.idformato ? 'modformato' : 'addformato';

            var myMask = new Ext.LoadMask(this.getFormato_grid(), {msg: futureLang.lbGuardandoFormato});
            myMask.show();
            Ext.Ajax.request({
                url: url,
                params: values,
                success: function (response) {
                    myMask.hide();
                    var response = Ext.decode(response.responseText);
                    if (response == 1) {
                        showMsg(1, futureLang.lbSaveOk);
                    }
                    gridFormato.getStore().reload();
                },
                failure: function (response, opts) {
                    myMask.hide();
                }
            });

            if (btn.action === 'aceptar') {
                win.close();
            } else {
                form.reset();
            }
        }
    },
    saveNivelFormato: function (btn) {
        var me = this,
                win = btn.up('window'),
                form = win.down('form'),
                gridFormato = me.getFormato_grid(),
                gridNivelFormato = me.getNivelformato_grid();

        if (form.getForm().isValid()) {
            var values = form.getForm().getValues();
            values.idformato = gridFormato.getSelectionModel().getLastSelected().get('idformato');
            var url = values.idparteformato ? 'modparteformato' : 'addparteformato';

            var myMask = new Ext.LoadMask(this.getNivelformato_grid(), {msg: futureLang.lbGuardandoNivel});
            myMask.show();
            Ext.Ajax.request({
                url: url,
                params: values,
                success: function (response) {
                    myMask.hide();
                    var response = Ext.decode(response.responseText);
                    if (response.success) {
                        gridFormato.getStore().reload();
                        gridNivelFormato.getStore().load({
                            params: {
                                idformato: values.idformato
                            }
                        });
                        showMsg(1, futureLang.lbSaveOk2);
                    } else {
                        showMsg(3, futureLang.lbExisteParte);
                    }
                },
                failure: function (response, opts) {
                    myMask.hide();
                }
            });

            if (btn.action === 'aceptar') {
                win.close();
            } else {
                form.reset();
            }
        }
    }
});