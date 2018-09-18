Ext.define('Ejercicio.controller.Ejercicio', {
    extend: 'Ext.app.Controller',
    views: [
        'Ejercicio.view.EjercicioGrid',
        'Ejercicio.view.PeriodoGrid'
    ],
    stores: [
        'Ejercicio.store.Ejercicio',
        'Ejercicio.store.Periodo'
    ],
    models: [
        'Ejercicio.model.Ejercicio',
        'Ejercicio.model.Periodo'
    ],
    refs: [
        {ref: 'ejercicio_grid', selector: 'ejercicio_grid'},
        {ref: 'periodo_grid', selector: 'periodo_grid'}
    ],
    init: function () {
        var me = this;

        me.control({
            'ejercicio_grid': {
                selectionchange: me.onEjercicioSelectionChange
            },
            'ejercicio_grid button[action=addEjercicio]': {
                click: me.addEjercicio
            },
            'ejercicio_grid button[action=deleteEjercicio]': {
                click: me.deleteEjercicio
            }
        });
    },
    addEjercicio: function (btn) {
        var myMask = new Ext.LoadMask(this.getEjercicio_grid(), {msg: futureLang.lbAdicionando});
        var st = this.getEjercicio_grid().getStore();
        myMask.show();
        Ext.Ajax.request({
            url: 'addejercicio',
            method: 'POST',
            callback: function (options, success, response) {
                var responseData = Ext.decode(response.responseText);
                if (parseInt(responseData) === 1) {
                    showMsg(1, futureLang.lbMsgEjercicioAdicionado)
                }
                myMask.hide();
                st.reload();
            }
        });
    },
    deleteEjercicio: function (btn) {
        if (this.getEjercicio_grid().getSelectionModel().hasSelection()) {
            var selection = this.getEjercicio_grid().getSelectionModel().getSelection()[0];
            var nombTerritorio = selection.data.ejercicio;
            Ext.MessageBox.confirm(futureLang.lbConfirmar, Ext.String.format(futureLang.lbMsgConfirmar, nombTerritorio), function (btn) {
                if (btn == 'yes') {
                    var rec = this.getEjercicio_grid().getSelectionModel().getSelection();
                    var myMask = new Ext.LoadMask(this.getEjercicio_grid(), {msg: futureLang.lbEliminando});
                    myMask.show();
                    var st = this.getEjercicio_grid().getStore();
                    Ext.Ajax.request({
                        url: 'delejercicio',
                        method: 'POST',
                        success: function (response) {
                            var responseData = Ext.decode(response.responseText);
                            if (parseInt(responseData) === 1) {
                                showMsg(1, futureLang.lbMsgEjercicioEliminado);
                            } else {
                                showMsg(3, futureLang.lbMsgErrorEliminado);
                            }
                            myMask.hide();
                            st.load();
                        },
                        failure: function (response, opts) {
                            myMask.hide();
                        }
                    });
                }
            }, this);
        } else {
            showMsg(0, futureLang.lbSelElem);
        }
    },
    onEjercicioSelectionChange: function (sm, arrSelectedRecord) {
        if (sm.hasSelection()) {
            this.getPeriodo_grid().getStore().load({
                params: {
                    idejercicio: arrSelectedRecord[0].get('idejercicio')
                }
            });
        } else {
            this.getPeriodo_grid().getStore().removeAll();
        }
    }
});