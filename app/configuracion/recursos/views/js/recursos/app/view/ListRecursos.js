/* global Ext */
Ext.define('Recursos.view.ListRecursos', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.list_recursos', title: 'Recursos', selType: 'rowmodel', columnLines: true, disabled: true,
    initComponent: function() {
        var grid = this;
        this.reRecursos = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2,
            listeners: {
                canceledit: function(rowEditing, context) {
                    if (context.record.phantom) {
                        grid.getStore().remove(context.record);
                    }
                    grid.getDockedComponent('topbar').enable();
                },
                beforeedit: function(editor, context, eOpts) {
                    grid.getDockedComponent('topbar').disable();
                    context.record.data.idfuncionalidad = grid.getStore().proxy.extraParams.idfuncionalidad;
                },
                edit: function(rowEditing, context) {
                    grid.getDockedComponent('topbar').enable();
                }
            }
        });
        Ext.apply(grid, {
            store: 'Recursos', plugins: [this.reRecursos],
            dockedItems: [{xtype: 'toolbar', id: 'topbar',
                    items: [{action: 'add', itemId: 'btnAdicionarRecurso', id: 'btnAdicionarRecurso', text: futureLang.lbAdicionar, tooltip: futureLang.lbTooltipAdicionarRecurso, iconCls: 'fa fa-plus bluedark-button', hidden: true},
                        {action: 'mod', itemId: 'btnModificarRecurso', id: 'btnModificarRecurso', text: futureLang.lbModificar, tooltip: futureLang.lbTooltipModificarRecurso, iconCls: 'fa fa-edit bluedark-button', disabled: true, hidden: true},
                        {action: 'del', itemId: 'btnEliminarRecurso', id: 'btnEliminarRecurso', text: futureLang.lbEliminar, tooltip: futureLang.lbTooltipEliminarRecurso, iconCls: 'fa fa-trash bluedark-button', disabled: true, hidden: true}
                    ]}],
            columns: [{xtype: 'rownumberer'},
                {header: futureLang.lbNombre, dataIndex: 'nombre', flex: 1, field: {xtype: 'textfield'}, sortable: true},
                {header: futureLang.lbIdRecurso, dataIndex: 'idbtn', flex: 1, field: {xtype: 'textfield'}, sortable: true},
                {header: futureLang.lbIcono, dataIndex: 'icono', width: 60, align: 'center', field: {xtype: 'textfield'}, sortable: true, renderer: this.showIcon},
                {name: 'idfuncionalidad', dataIndex: 'funcionalidad', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false},
                {name: 'idrecurso', dataIndex: 'idrecurso', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false},
                {header: futureLang.lbAcciones, align: 'center', xtype: 'actioncolumn', width: 60, sortable: false, menuDisabled: true,
                    items: [{
                            iconCls: 'fa fa-edit bluedark-button',
                            tooltip: futureLang.lbModificarRecurso,
                            scope: this,
                            handler: function(grid2, rowIndex) {
                                if (grid.getSelectionModel().hasSelection()) {
                                    var selection = grid.getSelectionModel().getSelection()[0];
                                    grid.reRecursos.startEdit(selection, 0);
                                } else {
                                    showMsg(0, futureLang.msgSelectToModify);
                                }
                            }
                        }, {
                            iconCls: 'fa fa-trash bluedark-button',
                            tooltip: futureLang.lbEliminarRecurso,
                            scope: this,
                            handler: function(grid2, rowIndex) {
                                if (grid.getSelectionModel().hasSelection()) {
                                    var selection = grid.getSelectionModel().getSelection()[0];
                                    function confirmar(btn) {
                                        if (btn === 'ok') {
                                            if (selection) {
                                                grid.getStore().remove(selection);
                                            }
                                        }
                                    }
                                    MensajeInterrogacion(Ext.lang.titles[2], futureLang.msgConfEliminarRecurso, confirmar);
                                } else {
                                    showMsg(0, futureLang.msgSelectToDelete);
                                }
                            }
                        }]}
            ]
        });
        this.callParent(arguments);
    },
    showIcon: function(value) {
        return '<i class="fa ' + value + ' bluedark-button"></i>';
    }
});
