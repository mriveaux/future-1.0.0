/* global Ext, lMask */
Ext.QuickTips.init();

Ext.onReady(function() {
    lMask.hide();
    function showAparienceEditor(tema, idioma, workspace) {
        function getTema() {
            return "/lib/js/Extjs/2.2/resources/images/themes/blue.png";
        }
        function getIdioma() {
            return "/lib/js/Extjs/2.2/resources/images/langs/espannol.png";
        }
        function getWorkSpace() {
            return "/lib/js/Extjs/2.2/resources/images/workspace/desktop.png";
        }
        var pictureTema = new Ext.Panel({
            id: 'pTema',
            autoHeight: true,
            autoWidth: true,
            border: true,
            autoShow: true,
            html: '<div id = "divTema"><center><img id="tema" src="' + getTema() +
                    '" alt="" style="cursor:pointer;border:none; margin: 0 !important;" height="120" minWidth="140" width="175"/></center></div>'
        });
        var pictureIdioma = new Ext.Panel({
            id: 'pIdioma',
            autoHeight: true,
            autoWidth: true,
            border: true,
            autoShow: true,
            html: '<div id = "divIdioma"><center><img id="idioma" src="' + getIdioma() +
                    '" alt="" style="cursor:pointer;border:none; margin: 0 !important;" height="120" minWidth="140" width="175"/></center></div>'
        });
        var pictureWorkSpace = new Ext.Panel({
            id: 'pWorkSpace',
            autoHeight: true,
            autoWidth: true,
            border: true,
            autoShow: true,
            html: '<div id = "divIdioma"><center><img id="idioma" src="' + getWorkSpace() +
                    '" alt="" style="cursor:pointer;border:none; margin: 0 !important;" height="120" minWidth="140" width="175"/></center></div>'
        });
        var cbTema = new Ext.form.ComboBox({
            id: 'idTema',
            fieldLabel: futureLang.lbtema,
            anchor: '80%',
            emptyText: futureLang.lbseleccione,
            store: new Ext.data.SimpleStore({
                fields: ['idtema', 'tema', 'src'],
                data: [[1, futureLang.lbazul, '/lib/js/Extjs/2.2/resources/images/themes/blue.png'], [2, futureLang.lbgris, '/lib/js/Extjs/2.2/resources/images/themes/gray.png'],[3, futureLang.lbneptune, '/lib/js/Extjs/2.2/resources/images/themes/blue.png']]
            }),
            mode: 'local',
            displayField: 'tema',
            valueField: 'idtema',
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            listeners: {
                select: function(combo, record, index) {
                    if (record)
                        setImagen('pTema', record.data.src);
                    else {
                        var record = this.store.getAt(this.store.find('idtema', this.getValue()));
                        setImagen('pTema', record.data.src);
                    }
                }
            }
        });
        var cbIdioma = new Ext.form.ComboBox({
            id: 'idIdioma',
            fieldLabel: futureLang.lbidioma,
            anchor: '80%',
            emptyText: futureLang.lbseleccione,
            store: new Ext.data.SimpleStore({
                fields: ['ididioma', 'idioma', 'src'],
                data: [[1, futureLang.lbespannol, '/lib/js/Extjs/2.2/resources/images/langs/espannol.png'], [2, futureLang.lbingles, '/lib/js/Extjs/2.2/resources/images/langs/ingles.png'], [3, futureLang.lbportugues, '/lib/js/Extjs/2.2/resources/images/langs/portugues.png']]
            }),
            mode: 'local',
            displayField: 'idioma',
            valueField: 'ididioma',
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            listeners: {
                select: function(combo, record, index) {
                    if (record)
                        setImagen('pIdioma', record.data.src);
                    else {
                        var record = this.store.getAt(this.store.find('ididioma', this.getValue()));
                        setImagen('pIdioma', record.data.src);
                    }
                }
            }
        });
        var cbWorkSpace = new Ext.form.ComboBox({
            id: 'idWorkSpace',
            fieldLabel: futureLang.lbworkspace,
            anchor: '80%',
            emptyText: futureLang.lbseleccione,
            store: new Ext.data.SimpleStore({
                fields: ['idworkspace', 'workspace', 'src'],
                data: [[1, futureLang.lbportal, '/lib/js/Extjs/2.2/resources/images/workspace/web.png'], [2, futureLang.lbdesktop, '/lib/js/Extjs/2.2/resources/images/workspace/desktop.png'], [3, futureLang.lbtabview, '/lib/js/Extjs/2.2/resources/images/workspace/tabview.png']]
            }),
            mode: 'local',
            displayField: 'workspace',
            valueField: 'idworkspace',
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            listeners: {
                select: function(combo, record, index) {
                    if (record)
                        setImagen('pWorkSpace', record.data.src);
                    else {
                        var record = this.store.getAt(this.store.find('idworkspace', this.getValue()));
                        setImagen('pWorkSpace', record.data.src);
                    }
                }
            }
        });
        var panel = new Ext.Panel({
            id: 'images-view',
            frame: true,
            width: 660,
            height: 350,
            autoScroll: true,
            layout: 'form',
            buttonAlign: 'center',
            title: futureLang.ttapariencia,
            items: [{
                    layout: 'column',
                    items: [{
                            anchor: '100%',
                            border: false,
                            frame: true,
                            columnWidth: .33,
                            items: [pictureTema]
                        }, {
                            style: 'margin: 0 0 0 10px',
                            anchor: '100%',
                            border: false,
                            frame: true,
                            columnWidth: .33,
                            items: pictureIdioma
                        }, {
                            style: 'margin: 0 0 0 10px',
                            anchor: '100%',
                            border: false,
                            frame: true,
                            columnWidth: .33,
                            items: pictureWorkSpace
                        }]
                }, {
                    layout: 'column',
                    items: [{
                            labelAlign: 'top',
                            style: 'margin: 20px 0 0 0',
                            layout: 'form',
                            anchor: '100%',
                            border: false,
                            frame: false,
                            columnWidth: .33,
                            items: cbTema
                        }, {
                            labelAlign: 'top',
                            style: 'margin: 20px 0 0 0',
                            layout: 'form',
                            anchor: '100%',
                            border: false,
                            frame: false,
                            columnWidth: .33,
                            items: cbIdioma
                        }, {
                            labelAlign: 'top',
                            style: 'margin: 20px 0 0 0',
                            layout: 'form',
                            anchor: '100%',
                            border: false,
                            frame: false,
                            columnWidth: .33,
                            items: cbWorkSpace
                        }]
                }
            ],
            buttons: [{
                    text: '<i class="fa fa-check-circle green-button"></i> ' + futureLang.btnaceptar,
                    handler: function() {
                        setApplicatonAparience(cbTema.getValue(), cbIdioma.getValue(), cbWorkSpace.getValue());
                    }
                }, {
                    text: '<i class="fa fa-times-circle red-button"></i> ' + futureLang.btncancelar,
                    handler: function() {
                        if (window.parent.MyDesktop)
                            window.location.reload();
                        else
                            window.parent.location.reload();
                    }
                }]
        });
        panel.render('formIndex');
        cbTema.setValue(tema);
        cbTema.fireEvent('select');
        cbIdioma.setValue(idioma);
        cbIdioma.fireEvent('select');
        cbWorkSpace.setValue(workspace);
        cbWorkSpace.fireEvent('select');

        function setImagen(id, src) {
            var p = Ext.get(id);
            var html = '';
            if (id === 'pTema') {
                html = '<div id = "divTema"><center><img id="tema" src="' + src +
                        '" alt="" style="cursor:pointer;border:none; margin: 0 !important;" height="120" minWidth="140" width="175"/></center></div>';
            } else if (id === 'pTema') {
                html = '<div id = "divIdioma"><center><img id="idioma" src="' + src +
                        '" alt="" style="cursor:pointer;border:none; margin: 0 !important;" height="120" minWidth="140" width="175"/></center></div>';
            } else {
                html = '<div id = "divWorkSpace"><center><img id="workspace" src="' + src +
                        '" alt="" style="cursor:pointer;border:none; margin: 0 !important;" height="120" minWidth="140" width="175"/></center></div>';
            }
            document.getElementById(id).innerHTML = html;
        }
    }

    function loadApplicatonAparience() {
        loadMask(futureLang.msgloadconf);
        Ext.Ajax.request({
            url: 'loadaparienceconfig',
            method: 'POST',
            callback: function(options, success, response) {
                var responseData = Ext.decode(response.responseText);
                showAparienceEditor(responseData.tema, responseData.idioma, responseData.workspace);
                lMask.hide();
            }
        });
    }
    loadApplicatonAparience();

    function setApplicatonAparience(tema, idioma, workspace) {
        MostrarBarraProgreso(futureLang.msgsaveconf);
        Ext.Ajax.request({
            url: 'setaparienceconfig',
            method: 'POST',
            callback: function(options, success, response) {
                var responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData.success == 1) {
                    MensajeInformacion(futureLang.msgsuccess);
                    if (responseData.workspace == '1') {
                        window.parent.location = '/app/engine/index.php/engine/engine';
                    }
                    else if (responseData.workspace == '2') {
                        window.parent.location = '/app/engine/index.php/desktop/desktop';
                    }
                    else if (responseData.workspace == '3') {
                        window.parent.location = '/app/engine/index.php/tabview/tabview';
                    }
                } else {
                    MensajeError(futureLang.msgerror);
                }
            },
            params: {
                tema: tema,
                idioma: idioma,
                workspace: workspace
            }
        });
    }
});

