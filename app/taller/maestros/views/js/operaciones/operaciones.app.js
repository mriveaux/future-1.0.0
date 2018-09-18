/* global Ext, lMask */
Ext.ns('Maestros.Operaciones');
Ext.QuickTips.init();
Ext.onReady(function() {
    new Maestros.Operaciones.Viewport();
});

Maestros.Operaciones.Viewport = Ext.extend(Ext.Viewport, {
    constructor: function(params) {
        lMask.hide();
        this.windowopen = false;
        this.cargarInterfaz();
        this.initMyEvents();
        this.initGlobalsKeys();
        this.loadDataIni();
        Maestros.Operaciones.Viewport.superclass.constructor.call(this, params);
    },
    cargarInterfaz: function() {
        var me = this;
        this.layout = 'fit';
        this.btnAdicionar = new Ext.Button({
            disabled: false,
            text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
            tooltip: 'Adicionar operaci\xF3n (<b>Alt + A</b>)'
        });
        this.btnModificar = new Ext.Button({
            disabled: true,
            text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
            tooltip: 'Modificar operaci\xF3n (<b>Alt + M</b>)'
        });
        this.btnEliminar = new Ext.Button({
            disabled: true,
            text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
            tooltip: 'Eliminar operaci\xF3n (<b>Del</b>)'
        });
        this.btnActivar = new Ext.Button({
            disabled: true,
            text: '<i class="fa fa-close bluedark-button"></i> Activar/desactivar',
            tooltip: 'Activar o desactivar operaci\xF3n'
        });
        this.btnImprimir = new Ext.Button({
            text: '<i class="fa fa-print bluedark-button"></i> Vista previa',
            tooltip: 'Vista previa nomenclador de operaciones (<b>Alt + P</b>)'
        });
//        var sfBuscar = new Ext.form.SearchField({
//            maxLength: 30,
//            maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
//            regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
//            width: 200,
//            //store: me.tpPanel.getActiveTab().items.items[0].getStore(),
//            fnOnSearch: function() {
//                me.searchElements(this.getValue());
//            },
//            fnOnClear: function() {
//                this.reset();
//                me.searchElements(this.getValue());
//            }
//        });

        this.gpEstandar = new Maestros.Operaciones.Grid({categoria: 0});
        this.gpLigeros = new Maestros.Operaciones.Grid({categoria: 1});
        this.gpMedianos = new Maestros.Operaciones.Grid({categoria: 2});
        this.gpPesados = new Maestros.Operaciones.Grid({categoria: 3});
        this.gpMotos = new Maestros.Operaciones.Grid({categoria: 4});
        this.tpPanel = new Ext.TabPanel({
            activeTab: 0,
            border: false,
            tbar: [this.btnAdicionar, this.btnModificar, this.btnEliminar, this.btnActivar, this.btnImprimir, '->'/*, this.sfBuscar*/],
            items: [{
                    id: 'tabEstandar',
                    title: 'Est&aacute;ndar',
                    layout: 'fit',
                    items: me.gpEstandar
                }, {
                    id: 'tabLigeros',
                    title: 'Ligeros',
                    layout: 'fit',
                    items: me.gpLigeros
                }, {
                    id: 'tabMedianos',
                    title: 'Medianos',
                    layout: 'fit',
                    items: me.gpMedianos
                }, {
                    id: 'tabPesados',
                    title: 'Pesados',
                    layout: 'fit',
                    items: me.gpPesados
                }, {
                    id: 'tabMotos',
                    title: 'Motos',
                    layout: 'fit',
                    items: me.gpMotos
                }]
        });
        this.items = [this.tpPanel];
    },
    initMyEvents: function() {
        var me = this;
        me.btnAdicionar.on({
            click: function() {
                this.window = new Maestros.Operaciones.Window({idoperacion: null});
                this.window.show();
                this.window.setTitle('<i class="fa fa-plus"></i> Adicionar operaci&oacute;n');
                this.window.cbCategoria.focus(false, 100);
                this.window.nfTarifa.setValue(1);
                this.window.on({
                    afterSave: function() {
                        me.tpPanel.getActiveTab().items.items[0].getStore().reload();
                        this.close();
                    },
                    close: function() {
                        me.windowopen = false;
                    }
                });
            }
        });
        me.btnModificar.on({
            click: function() {
                var selection = me.tpPanel.getActiveTab().items.items[0].getSelectionModel().getSelected().data;
                this.window = new Maestros.Operaciones.Window(selection);
                this.window.show();
                this.window.setTitle('<i class="fa fa-edit"></i> Modificar operaci&oacute;n');
                this.window.cbCategoria.focus(false, 100);
                this.window.on({
                    afterSave: function(option) {
                        me.tpPanel.getActiveTab().items.items[0].getStore().reload();
                        this.close();
                    },
                    close: function() {
                        me.windowopen = false;
                    }
                });
            }
        });
        me.btnEliminar.on({
            click: function() {
                me.validateDelete();
            }
        });
        me.btnActivar.on({
            click: function() {
                me.validateActivar();
            }
        });
        me.btnImprimir.on({
            click: function() {
                me.loadDataPreview();
            }
        });
        me.tpPanel.on({
            tabchange: function(tp, tab) {
                me.btnModificar.disable();
                me.btnEliminar.disable();
            }
        });
        me.gpEstandar.getSelectionModel().on({
            rowselect: function() {
                me.activateBtn();
            },
            rowdeselect: function() {
                me.desActivateBtn();
            }
        });
        me.gpLigeros.getSelectionModel().on({
            rowselect: function() {
                me.activateBtn();
            },
            rowdeselect: function() {
                me.desActivateBtn();
            }
        });
        me.gpMedianos.getSelectionModel().on({
            rowselect: function() {
                me.activateBtn();
            },
            rowdeselect: function() {
                me.desActivateBtn();
            }
        });
        me.gpPesados.getSelectionModel().on({
            rowselect: function() {
                me.activateBtn();
            },
            rowdeselect: function() {
                me.desActivateBtn();
            }
        });
        me.gpMotos.getSelectionModel().on({
            rowselect: function() {
                me.activateBtn();
            },
            rowdeselect: function() {
                me.desActivateBtn();
            }
        });
    },
    activateBtn: function() {
        var me = this;
        me.btnModificar.enable();
        me.btnEliminar.enable();
        me.btnActivar.enable();
    },
    desActivateBtn: function() {
        var me = this;
        me.btnModificar.disable();
        me.btnEliminar.disable();
        me.btnActivar.disable();
    },
    searchElements: function(cadena) {
        var me = this;
        me.tpPanel.getActiveTab().items.items[0].getStore().baseParams.criterio = cadena;
        me.tpPanel.getActiveTab().items.items[0].getStore().baseParams.categoria = me.tpPanel.getActiveTab().items.items[0].categoria;
        me.tpPanel.getActiveTab().items.items[0].getStore().reload();
    },
    loadDataIni: function() {
        this.gpEstandar.getStore().baseParams.categoria = 0;
        this.gpEstandar.getStore().load();
        this.gpLigeros.getStore().baseParams.categoria = 1;
        this.gpLigeros.getStore().load();
        this.gpMedianos.getStore().baseParams.categoria = 2;
        this.gpMedianos.getStore().load();
        this.gpPesados.getStore().baseParams.categoria = 3;
        this.gpPesados.getStore().load();
        this.gpMotos.getStore().baseParams.categoria = 4;
        this.gpMotos.getStore().load();

    },
    validateDelete: function() {
        var me = this;
        me.windowopen = true;
        function confirmar(btn) {
            if (btn == 'ok') {
                me.deleteOperacion();
            } else {
                me.windowopen = false;
            }
        }
        MensajeInterrogacion('<i class="fa fa-trash"></i> Eliminar operaci\xF3n', '&iquest;Est&aacute; seguro que desea eliminar la operaci\xF3n seleccionada?', confirmar);
    },
    deleteOperacion: function() {
        var me = this;
        if (me.tpPanel.getActiveTab().items.items[0].getSelectionModel().getSelected()) {
            MostrarBarraProgreso('Eliminando operaci&oacute;n...');
            Ext.Ajax.request({
                url: 'deloperacion',
                method: 'POST',
                callback: function(options, success, response) {
                    responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (responseData == 1) {
                        MensajeInformacion('La operaci&oacute;n fue eliminada correctamente.');
                        me.tpPanel.getActiveTab().items.items[0].getStore().reload();
                    }
                    else if (responseData == 2)
                        MensajeError('La operaci&oacute;n tiene datos asociados y no puede ser eliminada.');
                    else
                        MensajeError('No fue posible realizar la acci&oacute;n.<br>P&oacute;ngase en contacto con el administrador del sistema para tramitar el problema.');
                    me.windowopen = false;
                },
                params: {
                    idoperacion: me.tpPanel.getActiveTab().items.items[0].getSelectionModel().getSelected().data.idoperacion
                }
            });
        }
    },
    validateActivar: function() {
        var me = this;
        me.windowopen = true;
        function confirmar(btn) {
            if (btn == 'ok') {
                me.activateOperacion();
            } else {
                me.windowopen = false;
            }
        }
        MensajeInterrogacion('<i class="fa fa-close"></i> Activar/desactivar operaci\xF3n', '&iquest;Est&aacute; seguro que desea activar/desactivar la operaci\xF3n seleccionada?', confirmar);
    },
    activateOperacion: function() {
        var me = this;
        if (me.tpPanel.getActiveTab().items.items[0].getSelectionModel().getSelected()) {
            var msg = (me.tpPanel.getActiveTab().items.items[0].getSelectionModel().getSelected().data.activa === '1') ? 'Desactivando ' : 'Activando ';
            MostrarBarraProgreso(msg + 'operaci&oacute;n...');
            Ext.Ajax.request({
                url: 'activateoperacion',
                method: 'POST',
                callback: function(options, success, response) {
                    responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (responseData == 1) {
                        var msg = (me.tpPanel.getActiveTab().items.items[0].getSelectionModel().getSelected().data.activa === '1') ? 'desactivada ' : 'activada ';
                        MensajeInformacion('La operaci&oacute;n fue ' + msg + ' correctamente.');
                        me.tpPanel.getActiveTab().items.items[0].getStore().reload();
                    }
                    else
                        MensajeError('No fue posible realizar la acci&oacute;n.<br>P&oacute;ngase en contacto con el administrador del sistema para tramitar el problema.');
                    me.windowopen = false;
                },
                params: {
                    idoperacion: me.tpPanel.getActiveTab().items.items[0].getSelectionModel().getSelected().data.idoperacion,
                    activar: (me.tpPanel.getActiveTab().items.items[0].getSelectionModel().getSelected().data.activa === '1') ? 0 : 1
                }
            });
        }
    },
    loadDataPreview: function() {
        loadMask('Cargando...');
        Ext.Ajax.request({
            url: 'loadDataPreview',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                if (responseData.datoCuerpo.length > 0) {
                    var printView = new Ext.PrintView({paperSize: "A4", orientation: "Horizontal", reportType: "HTML", data: responseData});
                    printView.show();
                }
                else {
                    MensajeError('Error al procesar los datos.<br>P\xF3ngase en contacto con el administrador del sistema.');
                }
                lMask.hide();
            }
        });
    },
    initGlobalsKeys: function() {
        var me = this;
        this.map = new Ext.KeyMap(document, [
            {
                key: 'a',
                alt: true,
                fn: function() {
                    if (!me.windowopen) {
                        me.btnAdicionar.fireEvent('click');
                    }
                }
            }, {
                key: 'm',
                alt: true,
                fn: function() {
                    if (!me.windowopen && !me.btnModificar.disabled) {
                        me.btnModificar.fireEvent('click');
                    }
                }
            }, {
                key: Ext.EventObject.DELETE,
                fn: function() {
                    if (!me.windowopen && !me.btnEliminar.disabled) {
                        me.btnEliminar.fireEvent('click');
                    }
                }
            }, {
                key: 'p',
                alt: true,
                fn: function() {
                    if (!me.windowopen) {
                        me.btnImprimir.fireEvent('click');
                    }
                }
            }
        ]);
    }
});
