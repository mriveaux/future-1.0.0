/* global Ext, lMask */
Ext.QuickTips.init();
lMask.hide();
var usertmp, identidad, identidad_padre, desc_entidad;
var regexuser = /^[ a-zA-Z0-9\.\_\-\@]$/, regexpass = /^[ a-zA-Z0-9\.\,\;\#\*\/\-\+]$/;
function mostrarEntidades() {
    var store = new Ext.data.JsonStore({
        autoLoad: true,
        url: 'futureauthloadentities',
        fields: ['identidad', 'nombre', 'foto', 'idpadre'],
        listeners: {
            load: function(Store, records, options) {
                if (records.length === 1) {
                    identidad = records[0].data.identidad;
                    identidad_padre = records[0].data.idpadre;
                    desc_entidad = records[0].data.nombre;
                    Ext.getCmp('btnEntAceptar').handler().call();
                }
            }
        }
    });
    var tpl = new Ext.XTemplate('<tpl for=".">', '<div class="thumb-wrap" id="{identidad}">', '<div class="thumb"><img src="{foto}" title="{nombre}"></div>', '<span class="x-editable">{shortName}</span></div>', "</tpl>", '<div class="x-clear"></div>');
    var panel = new Ext.Panel({
        id: 'images-view',
        frame: true,
        width: 535,
        height: 310,
        layout: 'fit',
        buttonAlign: 'center',
        title: futureLang.ttentidades,
        items: new Ext.DataView({
            store: store,
            tpl: tpl,
            singleSelect: true,
            overClass: 'x-view-over',
            itemSelector: 'div.thumb-wrap',
            emptyText: futureLang.lbemptyimage,
            prepareData: function(data) {
                data.shortName = Ext.util.Format.ellipsis(data.nombre, 15);
                return data;
            },
            listeners: {
                click: {
                    fn: function(dv, index, node, e) {
                        var record = dv.getRecord(node);
                        identidad = record.data.identidad;
                        identidad_padre = record.data.idpadre;
                        desc_entidad = record.data.nombre;
                        Ext.getCmp('btnEntAceptar').enable();
                        panel.setTitle(futureLang.lbacceder + record.data.nombre);
                    }
                }, containerclick: {
                    fn: function(dv, e) {
                        Ext.getCmp('btnEntAceptar').disable();
                        panel.setTitle(futureLang.ttentidades);
                    }
                }, dblclick: {
                    fn: function(dv, index, node, e) {
                        var record = dv.getRecord(node);
                        identidad = record.data.identidad;
                        identidad_padre = record.data.idpadre;
                        desc_entidad = record.data.nombre;
                        panel.setTitle(futureLang.lbacceder + record.data.nombre);
                        Ext.getCmp('btnEntAceptar').handler.call();
                    }
                }
            }
        }),
        buttons: [{
                text: '<i class="fa fa-sign-out fa-flip-horizontal primary blue-stripe-left"></i> ' + futureLang.btnatras,
                id: 'btnEntAtras',
                handler: function() {
                    goBack();
                }
            }, {
                text: '<i class="loading-btn fa fa-sign-in primary blue-stripe-right"></i> ' + futureLang.btnaceptar,
                disabled: true,
                id: 'btnEntAceptar',
                handler: openWorkSpace
            }]
    });
    Ext.get('login').remove();
    panel.render('formIndex');
    Ext.get('formIndex').center();
}
/**
 * Verifica los datos entrados para el login
 * @param {string} t- usuario
 * @param {string} n- password
 * @param {int} p- rememberme
 * @returns {undefined}
 */

function verificarDatos(usuario, password, rememberme, authToken) {
    MostrarBarraProgreso(futureLang.msgcheckcredentials, futureLang.ttlporfavor);
    Ext.Ajax.request({
        url: 'futureauthservice_loggin_', method: 'POST',
        params: {t: Base64.encodeSecret(usuario, authToken), n: Base64.encodeSecret(password, authToken), p: rememberme},
        callback: function(options, success, response) {
            var responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            Ext.get('btnLogin').dom.innerHTML = futureLang.btnacceder;
            if (responseData == 0) {
                //significa que no son validos los datos
                MensajeError(futureLang.msgnovaliddata);
                Ext.get('loginuser').dom.value = '';//se limpia el campo
                Ext.get('loginpass').dom.value = '';//se limpia el campo   
                Ext.get('loginuser').focus();//se le da el foco a usuario
            } else if (responseData == 1) {//1  significa que el user esta inactivo
                MensajeError(futureLang.msguserdesactivado);
                Ext.get('loginuser').dom.value = '';
                Ext.get('loginpass').dom.value = '';
            } else if (responseData == 2) {//2 no es accesible desde ese ip
                MensajeError(futureLang.msgusernoip);
                Ext.get('loginuser').dom.value = '';
                Ext.get('loginpass').dom.value = '';
            } else if (responseData == 3) {//significa que son validos los datos 
                mostrarEntidades();
            } else if (responseData == 4) {
                MensajeError(futureLang.msgnoldap);
            } else if (responseData == 5) {
                MensajeError(futureLang.msguserblock);
            } else if (responseData == 6) {
                MensajeError(futureLang.msgipblock);
            } else if (responseData == 7) {
                MensajeError(futureLang.msguserorigen);
            } else if (responseData == 8) {
                mostrarEntidades();
            } else if (responseData == 9) {
                window.location = '/comun/invalid_token/invalid.html';
            } else {
                MensajeError(futureLang.msgerrorop);
            }
        }
    });
}

function goBack() {
    MostrarBarraProgreso(futureLang.msgloading);
    Ext.Ajax.request({
        url: 'futureauthgoback',
        method: 'POST',
        callback: function(options, success, response) {
            var responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (responseData == true) {
                Ext.getCmp('images-view').destroy();
                window.location.reload();
            }
        }
    });
}
/**
 * Funcion que abre el marco de trabajo
 * @returns {undefined}
 */
function openWorkSpace() {
    MostrarBarraProgreso(futureLang.msgloaddataentidad);
    Ext.Ajax.request({
        url: 'futureauthsetentity',
        method: 'POST',
        params: {identidad: identidad, identidad_padre: identidad_padre, desc_entidad: desc_entidad},
        callback: function(options, success, response) {
            var responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (responseData.workspace == 'portal')
                window.location = '/app/engine/index.php/engine/engine';
            else if (responseData.workspace == 'desktop')
                window.location = '/app/engine/index.php/desktop/desktop';
            else if (responseData.workspace == 'tabview')
                window.location = '/app/engine/index.php/tabview/tabview';
        }
    });
}
/**
 * Comprueba que los campos sean validos
 * @returns {undefined}
 */
function validarCampos() {
    if (globalAuthToken !== '') {
        if (Ext.get('loginuser').dom.value != '' && Ext.get('loginpass').dom.value != '') {
            verificarDatos(Ext.get('loginuser').dom.value, Ext.get('loginpass').dom.value, Ext.get('rememberme').dom.value, globalAuthToken);
        } else {
            if (Ext.get('loginuser').dom.value == '') {
                Ext.get('loginuser').setStyle({'border-color': '#FF0000', 'box-shadow': '0 1px 1px rgba(255, 0, 0, 0.075) inset, 0 0 5px rgba(255, 0, 0, 0.6)'});
                Ext.get('loginuser').focus();
            } else if (Ext.get('loginpass').dom.value == '') {
                Ext.get('loginpass').setStyle({'border-color': '#FF0000', 'box-shadow': '0 1px 1px rgba(255, 0, 0, 0.075) inset, 0 0 5px rgba(255, 0, 0, 0.6)'});
                Ext.get('loginpass').focus();
            }
        }
    }
    else {
        window.location = '/comun/invalid_token/invalid.html';
    }
}
/**
 * Quita el css de campos validos
 * @param {string} idcomponent
 * @returns {undefined}
 */
function quitInvalid(idcomponent) {
    if (Ext.get(idcomponent).dom.value != '') {
        Ext.get(idcomponent).setStyle({'border-color': '#5599bb'});
    } else {
        Ext.get(idcomponent).setStyle({'border-color': '#FF0000', 'box-shadow': '0 1px 1px rgba(255, 0, 0, 0.075) inset, 0 0 5px rgba(255, 0, 0, 0.6)'});
    }
}
/**
 * Funcion validaCaracteres ->hace de mascara de entrada
 * @param {string} k letra presionada
 * @param {string} regex regular expresion
 * @returns {Boolean}
 */

function validaCaracteres(k, regex) {
    if (regex.test(String.fromCharCode(k)) == false)
        return false;
    return true;
}
function maskReg(e, r) {
    return validaCaracteres(e, r);
}
Ext.onReady(function() {
    var elementTablaindex = Ext.get('tablaindex');
    elementTablaindex.center();
    var elementLoginUser = Ext.get('loginuser');
    elementLoginUser.focus();
    elementLoginUser.on({
        'onkeypress': function(event) {
            if (event.charCode != 0) {
                return maskReg(event.charCode, regexuser);
            }
        },
        'onkeyup': function(event) {
            if (event.keyCode != 13)
                quitInvalid('loginuser');
        }
    });
    var elementLoginPass = Ext.get('loginpass');
    elementLoginPass.on({
        'onkeypress': function(event) {
            if (event.charCode != 0) {
                return maskReg(event.charCode, regexpass);
            }
        },
        'onkeyup': function(event) {
            if (event.keyCode != 13)
                quitInvalid('loginpass');
        }
    });
    Ext.get('btnLogin').dom.innerHTML = (futureLang != undefined) ? futureLang.btnacceder : 'Acceder';
    Ext.get('lbRememberme').dom.innerHTML = (futureLang != undefined) ? futureLang.lbrecuerdame : 'Recu&eacute;rdame';
    (function() {
        if (/iPad|iPod|iPhone/.test(navigator.userAgent)) {
            alert(futureLang.msgwebsiteop);
            window.location = 'about:blank';
        }
        var docXml = loadXML('/comun/comun/xml/system.xml');
        Ext.language = docXml.getElementsByTagName("lang")[0].childNodes[0].nodeValue;
        Ext.enviroment = docXml.getElementsByTagName("var")[0].childNodes[0].nodeValue;
        Ext.firebug = docXml.getElementsByTagName("firebug")[0].childNodes[0].nodeValue;
        if (Ext.enviroment == 'prod' && typeof (console) == "object" && parseInt(Ext.firebug) !== 1) {
            Ext.Msg.show({
                title: futureLang.lbadvertencia, buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING,
                msg: futureLang.msgfirebug,
                fn: function() {
                    window.location = 'about:blank';
                }
            });
        }
    })();
});