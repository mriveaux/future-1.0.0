Ext.define('Seleccion.view.seleccion.ListCandidatos', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.list_candidatos',
    store: 'Candidatos',
    title: 'Candidatos',
    iconCls: 'fa fa-users bluedark-button',
    readOnly: true,
    initComponent: function() {
        var me = this;
        me.id = 'list_candidatos';
        me.selModel = Ext.create('Ext.selection.RowModel');

        me.tbar = [
            {
                text: 'Adicionar',
                tooltip: 'Adicionar candidatos',
                iconCls: 'fa fa-plus bluedark-button',
                action: 'add'
            },
            {
                text: 'Eliminar',
                tooltip: 'Eliminar datos de la persona',
                iconCls: 'fa fa-trash bluedark-button',
                disabled: true,
                action: 'del'
            },
            '->',
            {
                xtype: 'searchfield',
                store: 'Candidatos',
                maxLength: 50,
                vtype: 'alphanum',
                padding: '0 0 0 5',
                filterPropertysNames: ['text']
            }
        ];

        me.columns = [
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
                text: 'Status',
                dataIndex: 'status',
                width: 100,
                renderer: this.showStatus
            }];

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
    },
    showStatus: function(val) {
        if (val === 0) {
            return '<span class="label label-primary">Bolsa</span>';
        } else if (val === 1) {
            return '<span class="label label-success">Contratado</span>';
        } else if (val === 2) {
            return '<span class="label label-warning">Reserva</span>';
        } else if (val === 3) {
            return '<span class="label label-danger">Reserva</span>';
        } else {
            return '<span class="label label-default">Selecci&oacute;n</span>';
        }
    }
});