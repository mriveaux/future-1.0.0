/* global Ext, futureLang */

Ext.define('Ejercicio.view.EjercicioGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ejercicio_grid',
    store: 'Ejercicio.store.Ejercicio',
    initComponent: function () {
        var me = this;
        me.title = futureLang.lbTitleEjercicios;
        me.selModel = Ext.create('Ext.selection.RowModel');

        me.tbar = [
            {
                text: futureLang.btnAdicionar,
                tooltip: futureLang.ttAdicionar,
                iconCls: 'fa fa-plus bluedark-button',
                action: 'addEjercicio'
            },
            {
                text: futureLang.btnEliminar,
                tooltip: futureLang.ttEliminar,
                iconCls: 'fa fa-trash bluedark-button',
                action: 'deleteEjercicio'
            }
        ];

        me.columns = [
            {
                header: futureLang.lbNombre,
                dataIndex: 'ejercicio',
                flex: 1,
                width: 100
            },
            {
                header: futureLang.lbFechainicio,
                width: 120,
                flex: 1,
                align: 'center',
                dataIndex: 'inicio',
                renderer: Ext.util.Format.dateRenderer('d/m/Y')
            }, {
                header: futureLang.lbFechafin,
                width: 120,
                flex: 1,
                align: 'center',
                dataIndex: 'fin',
                renderer: Ext.util.Format.dateRenderer('d/m/Y')
            }, {header: futureLang.lbAcciones, align:'center', xtype: 'actioncolumn', width: 55, sortable: false, menuDisabled: true, items: [{
                        iconCls: 'fa fa-trash bluedark-button',
                        tooltip: futureLang.btnEliminar,
                        scope: this,
                        handler: function (grid2, rowIndex) {
                            if (me.getSelectionModel().hasSelection()) {
                                var selection = me.getSelectionModel().getSelection()[0];
                                var nombTerritorio = selection.data.ejercicio;
                                function confirmar(btn) {
                                    if (btn === 'ok') {
                                        if (selection) {
                                            me.getStore().remove(rowIndex);
                                        }
                                    }
                                }
                                
                                MensajeInterrogacion(Ext.Msg.titleText.confirm, Ext.String.format(futureLang.lbMsgConfirmar, nombTerritorio), confirmar);
                            } else {
                                showMsg(0, futureLang.lbSelElem);
                            }
                        }
                    }]}
        ];

        this.callParent(arguments);
    }
});