/* global Ext */
Ext.define('Bloqueousuario.view.ListBloqueos', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.listbloqueos', selType: 'rowmodel',
    initComponent: function() {
        var grid = this;
        Ext.apply(grid, {
            id: 'gpList', store: 'Bloqueousuario', columnLines: true,
            dockedItems: [{xtype: 'toolbar',
                    items: [{action: 'desbloquear', itemId: 'btnDesbloquear', id: 'btnDesbloquear', text: futureLang.lbbtnDesbloquear, tooltip: futureLang.tooltipDesbloquear, iconCls: 'fa fa-unlock bluedark-button', disabled: true, hidden: true},
                        '->', {xtype: 'searchfield', store: 'Bloqueousuario',
                            fnOnSearch: function() {
                                var store = Ext.data.StoreManager.lookup('Bloqueousuario');
                                store.clearFilter(true);
                                store.load({params: {criterio: Ext.getCmp('sfBloqueousuario').getValue()}});
                            },
                            fnOnClear: function() {
                                var store = Ext.data.StoreManager.lookup('Bloqueousuario');
                                store.load({params: {criterio: Ext.getCmp('sfBloqueousuario').getValue()}});
                            }
                        }
                    ]}],
            columns: [{xtype: 'rownumberer'},
                {header: futureLang.lbUsuario, dataIndex: 'usuario', flex: 1, sortable: true},
                {header: futureLang.lbTipobloqueo, dataIndex: 'tipobloqueo', align: 'center', width: 120, sortable: true, renderer: this.showTipoBloqueo},
                {header: futureLang.lbFechabloqueo, dataIndex: 'lockedtime', flex: 1, sortable: true},
                {header: futureLang.lbIPbloqueo, dataIndex: 'ipbloqueo', flex: 1, sortable: true},
                {header: 'iduserbloqueo', dataIndex: 'iduserbloqueo', flex: 1, hideable: false, hidden: true, sortable: true},
                {name: 'idbloqueo', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false}
            ],
            bbar: {xtype: 'pagingtoolbar', pageSize: 20, store: 'Bloqueousuario', displayInfo: true, dock: 'bottom', plugins: new Ext.ux.ProgressBarPager()}
        });
        this.callParent(arguments);
    },
    showTipoBloqueo: function(val) {
        if (val == 1) {
            return '<span class="label label-primary">' + futureLang.lbUsuario + '</span>';
        } else {
            return '<span class="label label-success">' + futureLang.lbIP + '</span>';
        }
    }
});
