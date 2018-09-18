Ext.define('Proceso.view.proceso.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.list_proceso',
    store: 'Proceso',
    columnLines: true,
    initComponent: function() {
        var me = this;
        me.id = 'list_proceso';
        me.selModel = Ext.create('Ext.selection.RowModel');
        me.bbar = Ext.create('Ext.toolbar.Paging', {
            displayInfo: true,
            store: me.store,
            plugins: new Ext.ux.ProgressBarPager()
        });
        me.menu = Ext.create('Ext.menu.Menu', {
            id: 'status_menu',
            items: [
                {
                    id: 'start_proceso',
                    text: 'Iniciado',
                    iconCls: 'fa fa-play-circle bluedark-button'
                }, {
                    id: 'stop_proceso',
                    text: 'Detenido',
                    iconCls: 'fa fa-stop-circle bluedark-button'
                }, {
                    id: 'end_proceso',
                    text: 'Finalizado',
                    iconCls: 'fa fa-times-circle bluedark-button'
                }
            ]
        });

        me.tbar = [
            {
                text: 'Adicionar',
                tooltip: 'Adicionar datos del proceso',
                iconCls: 'fa fa-plus bluedark-button',
                hidden: this.readOnly,
                action: 'add'
            },
            {
                text: 'Modificar',
                tooltip: 'Modificar datos del proceso',
                iconCls: 'fa fa-edit bluedark-button',
                hidden: this.readOnly,
                disabled: true,
                action: 'mod'
            },
            {
                text: 'Eliminar',
                tooltip: 'Eliminar datos del proceso',
                iconCls: 'fa fa-trash bluedark-button',
                hidden: this.readOnly,
                disabled: true,
                action: 'del'
            },
            {
                text: 'Cambiar status',
                tooltip: 'Status del proceso',
                iconCls: 'fa fa-th-large bluedark-button',
                hidden: this.readOnly,
                disabled: true,
                action: 'status',
                menu: me.menu
            },
            '->',
            {
                xtype: 'searchfield',
                store: 'Proceso',
                maxLength: 50,
                vtype: 'alphanum',
                padding: '0 0 0 5',
                filterPropertysNames: ['text']
            }
        ];

        me.columns = [
            {
                flex: 1,
                text: 'Nombre del proceso',
                dataIndex: 'nombre'
            }, {
                text: 'Cargo',
                dataIndex: 'cargoplantilla',
                width: 200
            }, {
                text: 'Plazas disponibles',
                dataIndex: 'cantidad',
                align: 'center',
                width: 100
            }, {
                text: 'Fecha inicio',
                dataIndex: 'fechainicio',
                width: 100
            }, {
                text: 'Fecha fin',
                dataIndex: 'fechafin',
                width: 100
            }, {
                flex: 1,
                text: 'Comit&eacute; de selecci&oacute;n',
                dataIndex: 'comite',
                width: 160
            }, {
                text: 'Status',
                dataIndex: 'status',
                width: 100,
                renderer: this.showStatus
            }];

        this.callParent(arguments);
    },
    showStatus: function(val) {
        if (val == '0') {
            return '<span class="label label-primary">Listo</span>';
        } else if (val == '1') {
            return '<span class="label label-success">Iniciado</span>';
        } else if (val == '2') {
            return '<span class="label label-warning">Detenido</span>';
        } else {
            return '<span class="label label-danger">Finalizado</span>';
        }
    }
});