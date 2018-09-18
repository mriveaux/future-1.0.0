/* global Ext, lMask */
Ext.QuickTips.init();
lMask.hide();
MensajeInformacion("Su sesi&oacute;n ha expirado. Vuelva a ingresar sus credenciales.");
var usertmp, identidad, identidad_padre, desc_entidad;
var regexuser = /^[ a-zA-Z0-9\.\_\-\@]$/, regexpass = /^[ a-zA-Z0-9\.\,\;\#\*\/\-\+]$/;
function mostrarEntidades() {
    var store = new Ext.data.JsonStore({
        autoLoad: true,
        url: 'futureauthloadentities',
        fields: ['identidad', 'nombre', 'foto', 'idpadre'],
        listeners: {
            load: function (Store, records, options) {
                if (records.length === 1) {
                    identidad = records[0].data.identidad;
                    identidad_padre = records[0].data.idpadre;
                    desc_entidad = records[0].data.nombre;
                    Ext.getCmp('btnEntAceptar').handler().call();
                }
            }
        }
    });
    var tpl = new Ext.XTemplate('<tpl for=".">', '<div class="thumb-wrap" id="{identidad}">', '<div class="thumb"><img src="data:image/jpg;base64,{foto}" title="{nombre}"></div>', '<span class="x-editable">{shortName}</span></div>', "</tpl>", '<div class="x-clear"></div>');
    var panel = new Ext.Panel({
        id: 'images-view',
        frame: true,
        width: 535,
        height: 310,
        autoScroll: true,
        layout: 'fit',
        buttonAlign: 'center',
        title: 'Desglose de entidades autorizadas',
        items: new Ext.DataView({
            store: store,
            tpl: tpl,
            singleSelect: true,
            loadingText: 'Cargando...',
            overClass: 'x-view-over',
            itemSelector: 'div.thumb-wrap',
            emptyText: 'Ninguna imagen que mostrar.',
            prepareData: function (data) {
                data.shortName = Ext.util.Format.ellipsis(data.nombre, 15);
                return data;
            },
            listeners: {
                click: {
                    fn: function (dv, index, node, e) {
                        var record = dv.getRecord(node);
                        identidad = record.data.identidad;
                        identidad_padre = record.data.idpadre;
                        desc_entidad = record.data.nombre;
                        Ext.getCmp('btnEntAceptar').enable();
                        panel.setTitle('Acceder al sistema por: ' + record.data.nombre);
                    }
                }, containerclick: {
                    fn: function (dv, e) {
                        Ext.getCmp('btnEntAceptar').disable();
                        panel.setTitle('Desglose de entidades autorizadas');
                    }
                }, dblclick: {
                    fn: function (dv, index, node, e) {
                        var record = dv.getRecord(node);
                        identidad = record.data.identidad;
                        identidad_padre = record.data.idpadre;
                        desc_entidad = record.data.nombre;
                        panel.setTitle('Acceder al sistema por: ' + record.data.nombre);
                        Ext.getCmp('btnEntAceptar').handler.call();
                    }
                }
            }
        }),
        buttons: [{
                text: '<i class="fa fa-sign-out fa-flip-horizontal primary blue-stripe-left"></i> Atr&aacute;s',
                id: 'btnEntAtras',
                handler: function () {
                    loadMask("Recargando la sesi&oacute;n...");
                    Ext.getCmp('images-view').destroy();
                    window.location.reload();
                }
            }, {
                text: '<i class="loading-btn fa fa-sign-in primary blue-stripe-right"></i> Aceptar',
                disabled: true,
                id: 'btnEntAceptar',
                handler: openWorkSpace
            }]
    });
    Ext.get('login').remove();
    panel.render('formIndex');
}
/**
 * Verifica los datos entrados para el login
 * @param {string} usuario
 * @param {string} password
 * @returns {undefined}
 */
function verificarDatos(usuario, password) {
    MostrarBarraProgreso('Verificando credenciales...');
    Ext.Ajax.request({
        url: 'futureauthservice_loggin_', method: 'POST',
        params: {usuario: usuario, password: hex_md5(password)},
        callback: function (options, success, response) {
            var responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            switch (parseInt(responseData)) {
                case 0:
                    //significa que no son validos los datos
                    MensajeError("Los datos de entrada no son v&aacute;lidos.");
                    Ext.get('loginuser').dom.value = '';//se limpia el campo
                    Ext.get('loginpass').dom.value = '';//se limpia el campo   
                    Ext.get('loginuser').focus();//se le da el foco a usuario
                    break;
                case 1://1  significa que el user esta inactivo
                    MensajeError("El usuario se encuentra desactivado temporalmente.");
                    Ext.get('loginuser').dom.value = '';
                    Ext.get('loginpass').dom.value = '';
                    break;
                case 2: //2 no es accesible desde ese ip
                    MensajeError("El usuario no puede acceder al sistema desde<br>la direcci&oacute;n IP actual.");
                    Ext.get('loginuser').dom.value = '';
                    Ext.get('loginpass').dom.value = '';
                    break;
                case 3://significa que son validos los datos 
                    mostrarEntidades();
                    break;
                case 4:
                    MensajeError("En estos momentos el servidor LDAP no est&aacute; disponible.");
                    break;
                default:
                    MensajeError("Ha ocurrido un error mientras se realizaba esta operaci&oacute;n. Recargue nuevamente y vuelva a intentar.");
                    break;
            }
        }
    });
}
/**
 * Funcion que abre el marco de trabajo
 * @returns {undefined}
 */
function openWorkSpace() {
    loadMask("Cargando datos de la entidad...");
    Ext.Ajax.request({
        url: 'futureauthsetentity',
        method: 'POST',
        params: {identidad: identidad, identidad_padre: identidad_padre, desc_entidad: desc_entidad},
        callback: function (options, success, response) {
            if (window.parent.perfil) {
                window.location = window.parent.perfil.currentPath;
            }else{
                MensajeInformacion("No se ha podido comprobar los datos correctamente. Vuelva a la p&aacute;gina de inicio del sistema  e intente borrar el historial y los datos de la sesi&oacute;n");
            }
        }
    });
}
/**
 * Comprueba que los campos sean validos
 * @returns {undefined}
 */
function validarCampos() {
    if (Ext.get('loginuser').dom.value != '' && Ext.get('loginpass').dom.value != '') {
        verificarDatos(Ext.get('loginuser').dom.value, Ext.get('loginpass').dom.value);
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
Ext.onReady(function () {
    jQuery(document).ready(function () {
        Ext.get('loginuser').focus();
        $('.loading-btn').click(function () {
            var btn = $(this);
            btn.html('<i class="fa fa-spinner fa-pulse fa-fw primary"></i> Cargando...');
            setTimeout(function () {
                btn.text('Acceder');
            }, 5000);
        });
    });
    (function () {
        var docXml = loadXML('/comun/comun/xml/system.xml');
        Ext.enviroment = docXml.getElementsByTagName("var")[0].childNodes[0].nodeValue;
        Ext.firebug = docXml.getElementsByTagName("firebug")[0].childNodes[0].nodeValue;
        if (Ext.enviroment == 'prod' && typeof (console) == "object" && parseInt(Ext.firebug) !== 1) {
            var msgFireBug = 'El complemento de desarrollo web <b>FIREBUG</b> est\xE1 instalado.';
            msgFireBug += '\nDebe desinstalarlo para poder usarlo en el ambiente de PRODUCCI\xD3N.';
            Ext.Msg.show({
                title: 'Advertencia', buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING,
                msg: msgFireBug,
                fn: function () {
                    window.location = 'about:blank';
                }
            });
        }
    })();
});