Ext.define('Seleccion.view.seleccion.WinCandidatos', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_candidatos',
    title: 'Adicionar candidatos a la selecci&oacute;n',
    layout: 'fit',
    modal: true,
    closeAction: 'close',
    width: 800,
    height: 500,
    initComponent: function() {
        var me = this;
        me.stPersonasProceso = Ext.create('Ext.data.Store', {
            autoLoad: true,
            filterOnLoad: false,
            pageSize: 20,
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST'
                },
                api: {
                    read: 'candidato/getpersonasproceso'
                },
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'total',
                    successProperty: 'success'
                }
            },
            fields: [
                {name: 'idpersona', type: 'int'},
                {name: 'nombre', type: 'string'},
                {name: 'apellidos', type: 'string'},
                {name: 'sexo', type: 'int'},
                {name: 'estadocivil', type: 'int'},
                {name: 'foto', type: 'string'},
                {name: 'status', type: 'int'},
                {name: 'iddocidentidad', mapping: 'Docidentidad[0].iddocidentidad', type: 'int'},
                {name: 'idcategoriadocidentidad', mapping: 'Docidentidad[0].idcategoriadocidentidad', type: 'int'},
                {name: 'numeroidentidad', mapping: 'Docidentidad[0].numero', type: 'string'},
                {name: 'idnacionalidad', mapping: 'Pais.idpais', type: 'int'},
                {name: 'nacionalidad', mapping: 'Pais.nacionalidad', type: 'string'}
            ]
        });
        this.items = [
            {
                xtype: 'grid',
                itemId: 'grid_personas_proceso',
                store: me.stPersonasProceso,
                tbar: [
                    '->',
                    {
                        xtype: 'searchfield',
                        store: me.stPersonasProceso,
                        maxLength: 50,
                        vtype: 'alphanum',
                        fnOnSearch: function() {
                            var sf = this;
                            sf.store.clearFilter(true);
                            sf.store.load({params: {criterio: sf.getValue()}});
                        },
                        fnOnClear: function() {
                            var sf = this;
                            sf.store.load({params: {criterio: sf.getValue()}});
                        }
                    }
                ],
                bbar: Ext.create('Ext.toolbar.Paging', {
                    displayInfo: true,
                    store: me.stPersonasProceso
                }),
                columns: [
                    {
                        text: 'No. identidad',
                        dataIndex: 'numeroidentidad',
                        width: 110
                    }, {
                        text: 'Nombre',
                        dataIndex: 'nombre',
                        width: 150
                    }, {
                        flex: 1,
                        text: 'Apellidos',
                        dataIndex: 'apellidos',
                        width: 160
                    }, {
                        text: 'Sexo',
                        dataIndex: 'sexo',
                        width: 40,
                        renderer: this.showSexo
                    }, {
                        text: 'Estado civil',
                        dataIndex: 'estadocivil',
                        width: 70,
                        renderer: this.showEstadoCivil
                    }, {
                        text: 'Nacionalidad',
                        dataIndex: 'nacionalidad',
                        width: 120
                    }, {
                        xtype: 'actioncolumn',
                        id: 'action_candidato',
                        width: 30,
                        sortable: false,
                        menuDisabled: true,
                        hideable: false,
                        items: [{
                                iconCls: 'fa fa-plus bluedark-button',
//                                icon: 'fa fa-edit bluedark-button',
                                tooltip: 'Adicionar candidato'/*,
                                 handler: function(grid, rowIndex, colIndex) {
                                 grid.getStore().removeAt(rowIndex);
                                 }*/
                            }]
                    }]
            }
        ];
        this.buttons = [
            {
                iconCls: 'fa fa-times-circle red-button',
                text: '<b>Cancelar</b>',
                action: 'cancelar',
                scope: this,
                handler: this.close
            }
        ];
        this.callParent(arguments);
    },
    showSexo: function(val) {
        if (val === 0) {
            return '<center><i class="fa fa-venus red-button"></i></center>';
        } else {
            return '<center><i class="fa fa-mars blue-button"></i></center>';
        }
    },
    showEstadoCivil: function(val) {
        if (val === 0) {
            return 'Soltero';
        } else if (val === 1) {
            return 'Casado';
        } else {
            return 'Viudo';
        }
    }
});