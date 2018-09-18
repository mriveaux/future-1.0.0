Ext.ns('Maestros.Operaciones');
Maestros.Operaciones.Grid = Ext.extend(Ext.grid.GridPanel, {
    constructor: function(params) {
        this.categoria = params.categoria;
        this.autoExpandColumn = 'operacion';
        this.border = false;
        this.loadMask = true;
        this.stripeRows = true;
        this.cargarInterfaz();
        this.initEvents();
        Maestros.Operaciones.Grid.superclass.constructor.call(this, params);
    },
    cargarInterfaz: function() {
        var me = this;
        this.store = new Ext.data.Store({
            url: 'getoperaciones',
            reader: new Ext.data.JsonReader({
                root: 'data',
                totalProperty: 'total'
            }, [{
                    name: 'idoperacion'
                }, {
                    name: 'codigo'
                }, {
                    name: 'operacion'
                }, {
                    name: 'idactividad'
                }, {
                    name: 'tnorma'
                }, {
                    name: 'tarifa'
                }, {
                    name: 'activa'
                }, {
                    name: 'categoria'
                }, {
                    name: 'actividad', mapping: 'Actividad.nombre'
                }]),
            baseParams: {
                criterio: ''
            }
        });
        this.sm = new Ext.grid.RowSelectionModel({
            singleSelect: true
        });
        this.columns = [
            {
                width: 100,
                hidden: true,
                hideable: false,
                dataIndex: 'idoperacion'
            }, {
                width: 100,
                hidden: true,
                hideable: false,
                dataIndex: 'idactividad'
            }, {
                header: 'C&oacute;digo',
                width: 100,
                sortable: true,
                dataIndex: 'codigo'
            }, {
                id: 'operacion',
                header: 'Operaci&oacute;n',
                width: 200,
                sortable: true,
                dataIndex: 'operacion'
            }, {
                header: 'Actividad',
                width: 150,
                dataIndex: 'actividad'
            },
            {
                header: 'T. norma/costo',
                width: 100,
                sortable: true,
                renderer: formatoMonedaNopeso,
                align: 'right',
                dataIndex: 'tnorma'
            },
            {
                header: 'Tarifa',
                width: 80,
                sortable: true,
                align: 'right',
                dataIndex: 'tarifa'
            }, {
                header: 'Activa',
                align: 'center',
                renderer: me.showStatus,
                width: 80,
                dataIndex: 'activa'
            }, {
                header: 'Categor&iacute;a',
                align: 'center',
                renderer: me.setCatgoria,
                width: 70,
                dataIndex: 'categoria'
            }];
        this.bbar = new Ext.Feet.PagingToolbar({
            pageSize: 20,
            store: me.store,
            displayInfo: true,
            displayMsg: 'Resultados de {0} - {1} de {2}',
            emptyMsg: "No hay resultados para mostrar."
        });
    },
    initEvents: function() {

    },
    showStatus: function(value, metaData, record, rowIndex, colIndex, store) {
        if (record.data.activa === '1') {
            return '<span class="label label-success">Activa</span>';
        } else {
            return '<span class="label label-danger">Inactiva</span>';
        }
    },
    setCatgoria: function(value, metaData, record, rowIndex, colIndex, store) {
        if (record.data.categoria === '1')
            return"LIGERO";
        else if (record.data.categoria === '2')
            return"MEDIANO";
        else if (record.data.categoria === '3')
            return"PESADO";
        else if (record.data.categoria === '4')
            return"MOTO";
        else
            return "EST&Aacute;NDAR";
    }
});