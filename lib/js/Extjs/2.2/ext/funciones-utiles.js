var winExceptionDetails, lMask;
if (Ext) {
    loadMask();
    Ext.BLANK_IMAGE_URL = '/lib/js/Extjs/2.2/resources/images/s.gif';
    Ext.Ajax.on('requestcomplete', function (conn, response, options) {
        var respText = response.responseText;
        var respXML = response.responseXML;
        if (respText && !respXML) {
            var responseObject = Ext.decode(respText);
            if (responseObject != null) {
                if (responseObject.code && (responseObject.code == 3 || responseObject.code == 4)) {
                    Ext.getBody().unmask();
                    showMsg(responseObject.code, responseObject.message, Ext.emptyFn, responseObject.details);
                }
            } else {
                showMsg(3, Ext.lang.msgErrorServer);
            }
        }
    });
    Ext.apply(Ext.form.VTypes, {
        /**
         * Valida rango de fecha.
         * @param {type} val
         * @param {type} field
         * @returns {undefined|Boolean}
         */
        daterange: function (val, field) {
            var date = field.parseDate(val);
            if (!date) {
                return;
            }
            if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
                var start = Ext.getCmp(field.startDateField);
                start.setMaxValue(date);
                start.validate();
                this.dateRangeMax = date;
            } else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
                var end = Ext.getCmp(field.endDateField);
                end.setMinValue(date);
                end.validate();
                this.dateRangeMin = date;
            }
            return true;
        },
        /**
         * Valida que los password sean iguales.
         * @param {type} val
         * @param {type} field
         * @returns {Boolean}
         */
        password: function (val, field) {
            if (field.initialPassField) {
                var comparepass = Ext.getCmp(field.initialPassField);
                return (val == comparepass.getValue());
            }
            return true;
        },
        /**
         * Valida que el rango IP sea correcto.
         * @param {type} v
         * @returns {RegExp}
         */
        IPRange: function(v) {
            return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/(3[0-2]|2[0-9]|[01]?[0-9]?)$/.test(v);
        },
        /**
         * Valida que la(s) direccion(es) IP sea(n) correcta(s).
         * @param {type} v
         * @returns {RegExp}
         */
        IPAddress: function(v) {
            return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/d{1,1}$/.test(v);
        },
        IPAddressMask: /[\d\.\/]/i,
        /**
         * Valida que el(los) telefono(es) sea(n) correcta(s).
         * @param {type} v
         * @returns {RegExp}
         */
        phones: function (v) {
            return /^(\(\+\d{2,3}\))?\d{8}((\,{1}\s{0,1}(\(\+\d{2,3}\))?\d{8})+)*$/.test(v);
        },
        phonesMask: /[\d\,\s\+\(\)]/i,
        /**
         * Valida que el(los) correo(s) sea(n) correcta(s).
         * @param {type} v
         * @returns {RegExp}
         */
        emails: function (v) {
            return /^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4}(((\,{1}\s{0,1})([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4})+)*$/.test(v);
        },
        emailsMask: /[A-Za-z0-9@\,\.\-\s]/i
    });

    /**
     * Mostrar una mascara con el mensaje dado.
     * @param {string} message
     * @returns {undefined}
     */
    function loadMask(message) {
        if (arguments[0]) {
            lMask = new Ext.LoadMask(Ext.getBody(), {
                msg: message
            });
        } else {
            lMask = new Ext.LoadMask(Ext.getBody());
        }
        lMask.show();
    }
    /**
     * Poner etiquetas a los componentes.
     * @param {type} component
     * @param {string} text
     * @returns {undefined}
     */
    function fToolTipShow(component, text) {
        if (!component.ttp)
            component.ttp = new Ext.ToolTip({
                target: component.getEl(),
                autoHeight: true,
                autoWidth: true,
                autoHide: true,
                maxWidth: 200,
                anchor: 'left',
                title: text,
                trackMouse: true
            });
        else
            component.ttp.setTitle(text);
    }
    /**
     * Muestra la barra de progreso
     * @param {string} msg Mensaje
     * @param {string} ttl T&iacute;tulo
     * @returns {Ext.MessageBox}
     */
    function MostrarBarraProgreso(msg, ttl) {
        Ext.MessageBox.show({
            title: ttl || Ext.lang.please,
            msg: msg,
            width: 300,
            progress: true,
            closable: false
        });
        var f = function (v) {
            return function () {
                var i = v / 11;
                Ext.MessageBox.updateProgress(i);
            };
        };
        for (var i = 1; i < 12; i++) {
            setTimeout(f(i), i * 500);
        }
    }

    /**
     * Displays a message box with OK and Cancel buttons
     * @param {string} titulo
     * @param {string} mensaje
     * @param {function} funcion
     * @returns {undefined}
     */
    function MensajeInterrogacion(titulo, mensaje, funcion) {
        Ext.Msg.show({
            title: titulo || Ext.lang.titles[2],
            buttons: Ext.Msg.OKCANCEL,
            msg: mensaje,
            icon: Ext.MessageBox.QUESTION,
            fn: funcion
        });
    }
    /**
     * Displays a message bubble of ERROR.
     * @param {string} msg
     * @returns {undefined}
     */
    function MensajeError(msg) {
        Ext.BoobbleMsg.msg(Ext.lang.titles[3], msg, Ext.MessageBox.ERROR);
//        Ext.BoobbleMsg.msg('Error', msg, Ext.MessageBox.ERROR);
    }
    /**
     * Displays a message bubble of INFO.
     * @param {string} msg
     * @returns {undefined}
     */
    function MensajeInformacion(msg) {
        Ext.BoobbleMsg.msg(Ext.lang.titles[1], msg, Ext.MessageBox.INFO);
//        Ext.BoobbleMsg.msg('Informaci&oacute;n', msg, Ext.MessageBox.INFO);
    }
    /**
     * Displays a message bubble of WARNING.
     * @param {string} msg
     * @returns {undefined}
     */
    function MensajeAdvertencia(msg) {
        Ext.BoobbleMsg.msg(Ext.lang.titles[0], msg, Ext.MessageBox.WARNING);
//        Ext.BoobbleMsg.msg('Atenci&oacute;n', msg, Ext.MessageBox.WARNING);
    }
    /**
     * Show a message of notification according to the given code.<br>
     * <ul><li>0 Warning</li><li> 1 Information</li><li> 2 Confirmation</li><li> 3 Error</li><li> 4 Exception</li></ul>
     * @param {int} code  
     * @param {string} msg
     * @param {function} fn
     * @param {string} details
     */
    function showMsg(code, msg, fn, details) {
        var buttons = new Array(Ext.MessageBox.OK, Ext.MessageBox.OKCANCEL, Ext.MessageBox.OK);
        var title = new Array('Advertencia', 'Informaci&oacute;n', 'Confirmaci&oacute;n', 'Error', 'Excepci&oacute;n');
        var icons = new Array(Ext.MessageBox.INFO, Ext.MessageBox.QUESTION, Ext.MessageBox.ERROR);
        switch (code) {
            case 4:
                {
                    if (!winExceptionDetails) {
                        winExceptionDetails = new Ext.Window({
                            title: Ext.lang.ttlExc,
                            modal: true, resizable: false, autoHeight: true, bodyBorder: false, shadow: false, maximizable: true,
                            width: 640, buttonAlign: 'center', layout: 'fit',
                            defaults: {frame: true, border: false},
                            items: new Ext.Panel({
                                frame: true, autoHeight: true,
                                layout: 'form',
                                items: [{
                                        layout: 'column',
                                        items: [{
                                                columnWidth: .1, items: {
                                                    style: 'margin:2px 0px 10px 2px;', autoHeight: true, autoWidth: true,
                                                    html: '<div id="pnlException" class="exception"> <i class="fa fa-bug fa-5x danger"></i> </div>'
                                                }
                                            }, {
                                                columnWidth: .9, items: {
                                                    xtype: 'panel', autoHeight: true, autoWidth: true, autoScroll: true,
                                                    style: 'margin:2px 0px 10px 2px;', html: '<div id="pnlMessage">' + msg + '</div>'
                                                }
                                            }]
                                    }, {
                                        layout: 'form',
                                        autoScroll: true,
                                        items: new Ext.form.FieldSet({
                                            id: 'fsException', autoHeight: true, autoScroll: true,
                                            title: Ext.lang.details, html: '<div id="pnlDetails"><pre>' + details + '</pre></div>',
                                            autoWidth: true, collapsed: true, collapsible: true
                                        })
                                    }
                                ]
                            }),
                            buttons: [{
                                    text: '<i class="fa fa-check-circle green-button"></i> <b>' + Ext.lang.lbAcept + '</b>',
                                    handler: function () {
                                        winExceptionDetails.hide();
                                        if (typeof (fn) == 'function')
                                            fn();
                                    }
                                }]
                        });
                    }
                    Ext.getCmp('fsException').collapse();
                    winExceptionDetails.show();
                    winExceptionDetails.doLayout();
                    document.getElementById("pnlMessage").innerHTML = msg;
                    document.getElementById("pnlDetails").innerHTML = details;
                }
                break;
            case 3:
                MensajeError(msg);
                break;
            case 2:
                if (typeof (msg) == 'object') {
                    var ttl = msg.title;
                    var sms = msg.message;
                    MensajeInterrogacion(ttl, sms, fn);
                } else {
                    if (fn !== null && (typeof (fn) == 'function' || typeof (fn) == 'object'))
                        Ext.MessageBox.show({
                            title: title[code - 2],
                            msg: msg,
                            buttons: buttons[code - 1],
                            icon: icons[code - 1],
                            fn: fn
                        });
                    else
                        Ext.MessageBox.show({
                            title: title[code - 2],
                            msg: msg,
                            buttons: buttons[code - 1],
                            icon: icons[code - 1]
                        });
                }
                break;
            case 1:
                MensajeInformacion(msg);
                break;
            case 0:
                MensajeAdvertencia(msg);
                break;
            default:
                if (fn !== null && (typeof (fn) == 'function' || typeof (fn) == 'object')) {
                    Ext.MessageBox.show({
                        title: title[code - 2],
                        msg: msg,
                        buttons: buttons[code - 1],
                        icon: icons[code - 1],
                        fn: fn
                    });
                } else
                    MensajeInformacion(msg);
        }
    }
}

/**
 * Busca yn elemento en el array. 
 * @param {type} value
 * @returns {Boolean}
 */
Array.prototype.inArray = function (value) {
    var i;
    for (i = 0; i < this.length; i++) {
        if (this[i] === value) {
            return true;//si lo encuentra
        }
    }
    return false;//si no lo encuentra
};

/**
 * Cargar un fichero CSS al DOM HTML.
 * @param {type} css
 * @returns {undefined}
 */
function loadCss(css) {
    var tag = document.createElement("style");
    tag.type = "text/css";
    if (tag.styleSheet)
        tag.styleSheet.cssText = css;
    else
        tag.appendChild(document.createTextNode(css));
    document.getElementsByTagName("head")[0].appendChild(tag);
}
/**
 * Load css file on HTML DOM.
 * @param {string} dirCSS Path of css file.
 * @returns {undefined}
 */
function loadCSSByDir(dirCSS) {
    var css_style = document.createElement("link");
    css_style.setAttribute("rel", "stylesheet");
    css_style.setAttribute("type", "text/css");
    css_style.setAttribute("href", dirCSS + ".css");
    document.getElementsByTagName("head")[0].appendChild(css_style);
}
/**
 * Cargar un fichero JS al DOM HTML.
 * @param {type} jsSrc
 * @param {type} id
 * @param {type} callback
 * @returns {undefined}
 */
function loadJs(jsSrc, id, callback) {
    var me = this;
    if (jsSrc != null) {
        var tagScript = document.createElement("script");
        tagScript.setAttribute("type", "text/javascript");
        tagScript.setAttribute("id", id);
        tagScript.setAttribute("src", jsSrc + ".js");
        tagScript.onload = function () {
            if (typeof callback === 'function') {
                callback.apply(me);
            }
        };
        Ext.DomQuery.selectNode("body").appendChild(tagScript);
    }
}
/**
 * Devuelve el DOM XML de un fichero xml dada la ruta.
 * @param {type} xmlSrc
 * @returns {ActiveXObject|window.XMLHttpRequest|loadXML.xmlDoc|xmlDoc.responseXML|window.XMLHttpRequest.responseXML}
 */
function loadXML(xmlSrc) {
    var xmlDoc;
    if (window.XMLHttpRequest) {
        xmlDoc = new window.XMLHttpRequest();
        xmlDoc.open("GET", xmlSrc, false);
        xmlDoc.send("");
        return xmlDoc.responseXML;
    } else {
        // para IE
        if (ActiveXObject("Microsoft.XMLDOM"))
        {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.load(xmlSrc);
            return xmlDoc;
        }
        if (ActiveXObject("Microsoft.XMLHTTP")) {
            xmlDoc = new ActiveXObject("Microsoft.XMLHTTP");
            xmlDoc.open("GET", xmlSrc, false);
            xmlDoc.send();
            return xmlDoc.responseXML;
        }
    }
    MensajeInformacion("Error cargando el documento XML: " + xmlSrc);
    return null;
}

/**
 * Obtener los dias de diferencias entre fechas.
 * @param {type} fechafin
 * @param {type} fechaini
 * @returns {Number}
 */
function DiferenciaFechas(fechafin, fechaini) {
    //Obtiene dia, mes y año  
    var fecha1 = new fecha(fechafin);
    var fecha2 = new fecha(fechaini);
    //Obtiene objetos Date  
    var miFecha1 = new Date(fecha1.anio, fecha1.mes, fecha1.dia);
    var miFecha2 = new Date(fecha2.anio, fecha2.mes, fecha2.dia);
    //Resta fechas y redondea  
    var diferencia = miFecha1.getTime() - miFecha2.getTime();
    var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    return dias;
}
/**
 * Separar una fecha por dia, mes y año.
 * @param {type} cadena
 * @returns {fecha}
 */
function fecha(cadena) {
    //Separador para la introduccion de las fechas  
    var separador = "/";
    //Separa por dia, mes y año  
    if (cadena.indexOf(separador) != -1) {
        var posi1 = 0;
        var posi2 = cadena.indexOf(separador, posi1 + 1);
        var posi3 = cadena.indexOf(separador, posi2 + 1);
        this.dia = cadena.substring(posi1, posi2);
        this.mes = cadena.substring(posi2 + 1, posi3);
        this.anio = cadena.substring(posi3 + 1, cadena.length);
    } else {
        this.dia = 0;
        this.mes = 0;
        this.anio = 0;
    }
}
/**
 * Funcion para convertir el formato de la fecha
 * @param {type} f
 * @returns {format_Fecha.fs|String}
 */
function format_Fecha(f) {
    if (Ext.isDate(f) == true) {
        return f.format('d/m/Y');
    } else {
        var s = '/';
        if (f != null && f != '') {
            if (strpos(f, '-') != false) {
                var fs = f.toString().split('-');
                var result = fs[2] + s + fs[1] + s + fs[0];
                return result;
            }
            return f;
        }
    }
}
/**
 * Funcion para convertir el formato de la fecha con el RowEditor
 * @param {type} f
 * @returns {unresolved}
 */
function roweditor_format_Fecha(f) {
    if (f != null && f != '') {
        return f.format('d/m/Y');
    } else
        return f;
}
/**
 * Get the time elapsed between now and given date.
 * @param {timestamp} argTime
 * @returns {String} Time elapsed
 */
function ago(argTime) {
    var duraciones = ["60", "60", "24", "7", "4.35", "12", "10"];
    var now = Math.floor(new Date().getTime() / 1000);
    var passedTime = Math.floor(new Date(argTime).getTime() / 1000);
    var diferencia = now - passedTime;
    var j = 0;
    for (j; diferencia >= duraciones[j] && j < duraciones.length - 1; j++) {
        diferencia /= duraciones[j];
    }
    diferencia = Math.round(diferencia);

    if (diferencia != 1) {
        if (j != 5) {
            Ext.lang.periodos[j] += "s";
        } else {
            Ext.lang.periodos[j] += "es";
        }
    }
    return diferencia + " " + Ext.lang.periodos[j] + Ext.lang.ago;
}
/**
 * Formato a la moneda con el signo de $
 * @param {type} v
 * @returns {String}
 */
function formatoMoneda(v) {
    v = (Math.round((v - 0) * 100)) / 100;
    v = (v == Math.floor(v)) ? v + ".00" : ((v * 10 == Math.floor(v * 10)) ? v + "0" : v);
    v = String(v);
    var ps = v.split(".");
    var whole = ps[0];
    var sub = ps[1] ? "." + ps[1] : ".00";
    var r = /(\d+)(\d{3})/;
    while (r.test(whole)) {
        whole = whole.replace(r, "$1" + "," + "$2")
    }
    v = whole + sub;
    if (v.charAt(0) == "-") {
        return"($" + v.substr(1) + ")"
    }
    return"$" + v
}
/**
 * Formato a la moneda sin el signo de $
 * @param {type} v
 * @returns {Number|@var;v|@var;whole|@var;sub|String}
 */
function formatoMonedaNopeso(v) {
    v = (Math.round((v - 0) * 100)) / 100;
    v = (v == Math.floor(v)) ? v + ".00" : ((v * 10 == Math.floor(v * 10)) ? v + "0" : v);
    v = String(v);
    var ps = v.split(".");
    var whole = ps[0];
    var sub = ps[1] ? "." + ps[1] : ".00";
    var r = /(\d+)(\d{3})/;
    while (r.test(whole)) {
        whole = whole.replace(r, "$1" + "," + "$2")
    }
    v = whole + sub;
    if (v.charAt(0) == "-") {
        return"(" + v.substr(1) + ")"
    }
    return v
}
function eliminarCeroFinal(v) {
    v = String(v);
    if (v.length > 0 && v > 0) {
        var ps = v.split(".");
        var mi = ps[0];
        var md = ps[1];
        var n_md = '';
        if (ps.length > 1)
            if (md.length > 0) {
                for (var i = md.length - 1; i >= 0; i--)
                    if (md.charAt(i) != '0') {//hasta que aparezca como invertir la cadena
                        for (var j = 0; j <= i; j++)
                            n_md = n_md + md.charAt(j);
                        continue;
                    }
                return (n_md.length > 0) ? mi + "." + n_md : mi;
            }
    }
}


/**
 * 
 * @param {Object} value Original information that show in cell.
 * @param {Object} metaData An object with attributtes css and attr.
 * @returns {Object} Original value but with formatted text in cell.
 */
function formatoText(value, metaData) {
    metaData.attr = 'style="white-space:normal"';
    return value;
}
/**
 * Codificar un texto
 * @param {type} val
 * @returns {Array}
 */
function Codificar(val) {
    var array = [];
    for (var i = 0; i < val.length; i++) {
        var a = '';
        var t = parseInt(val.charCodeAt(i));
        a += (3 * t + 237) * (3 * t + 237) + 7;
        array[i] = parseInt(a);
    }
    return array;
}
/**
 * Validate an IP Range
 * @param {type} range
 * @returns {Boolean}
 */
function validateIpRange(range) {
    var ips = range.split(',');
    var flag = true;
    for (var i = 0; i < ips.length; i++)
        if (!checkRange(ips[i])) {
            flag = false;
            break;
        }
    if (flag)
        return true;
    else
        return false;
}

function checkRange(value) {
    var ipMask = value.split('/');
    var realIp = ipMask[0];
    var ippos = realIp.split('.');
    if ((ipMask[1])) {
        if (ipMask[1] == 0) {
            if (ippos[0] == 0) {
                if (ippos[0] == 0 && ippos[1] == 0 && ippos[2] == 0 && ippos[3] == 0)
                    return true;
                else
                    return false;
            } else {
                if ((ippos[0] >= 1 && ippos[0] <= 255) && (ippos[1] >= 0 && ippos[0] <= 255) && (ippos[2] >= 0 && ippos[2] <= 255) && (ippos[3] >= 0 && ippos[3] <= 255))
                    return true;
                else
                    return false;
            }
        } else {
            if (ipMask[1] >= 1 && ipMask[1] <= 32) {
                if ((ippos[0] >= 1 && ippos[0] <= 255) && (ippos[1] >= 0 && ippos[0] <= 255) && (ippos[2] >= 0 && ippos[2] <= 255) && (ippos[3] >= 0 && ippos[3] <= 255))
                    return true;
                else
                    return false;
            } else
                return false;
        }
    } else {
        if (ippos[0] == 0) {
            if (ippos[0] == 0 && ippos[1] == 0 && ippos[2] == 0 && ippos[3] == 0)
                return true;
            else
                return false;
        } else {
            if ((ippos[0] >= 1 && ippos[0] <= 255) && (ippos[1] >= 0 && ippos[1] <= 255) && (ippos[2] >= 0 && ippos[2] <= 255) && (ippos[3] >= 0 && ippos[3] <= 255))
                return true;
            else
                return false;
        }
    }
    return false;
}

/**
 * Elimina un elemento en html
 * @param {type} id
 * @returns {undefined}
 */
function eliminarElementohtml(id) {
    el = document.getElementById(id);
    if (!el) {

    } else {
        del = el.parentNode;
        del.removeChild(el);
    }
}
/**
 * Mostrar un obj script.
 * @param {type} n
 * @param {type} d
 * @returns {parent@arr;frames.document..forms|@var;document..forms|d@arr;all|d@arr;@arr;forms|parent.frames.document|Window.frames.document|MM_findObj.d|@var;document|parent@arr;frames.document.all|@var;document.all}
 */
function MM_findObj(n, d) { //v4.01
    var p, i, x;
    if (!d)
        d = document;
    if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
        d = parent.frames[n.substring(p + 1)].document;
        n = n.substring(0, p);
    }
    if (!(x = d[n]) && d.all)
        x = d.all[n];
    for (i = 0; !x && i < d.forms.length; i++)
        x = d.forms[i][n];
    for (i = 0; !x && d.layers && i < d.layers.length; i++)
        x = MM_findObj(n, d.layers[i].document);
    if (!x && d.getElementById)
        x = d.getElementById(n);
    return x;

}
/**
 * Ocultar un obj script
 * @returns {undefined}
 */
function MM_showHideLayers() { //v6.0
    var i, p, v, obj, args = MM_showHideLayers.arguments;
    for (i = 0; i < (args.length - 2); i += 3)
        if ((obj = MM_findObj(args[i])) != null) {
            v = args[i + 2];
            if (obj.style) {
                obj = obj.style;
                v = (v == 'show') ? 'visible' : (v == 'hide') ? 'hidden' : v;
            }
            obj.visibility = v;
        }
}

/**
 * Encuentra la posici&oacute;n num&eacute;rica de la primera aparici&oacute;n del needle (aguja) en el string haystack (pajar). 
 * A diferencia de strpos(), stripos es insensible a may&uacute;sculas y min&uacute;sculas.<br> 
 * Si no existen coincidencias devuelve falso.<br>
 * example: stripos('ABC', 'a');<br>
 * returns: 0 
 * @param {string } f_haystack El string en donde buscar.
 * @param {string } f_needle puede ser un string de uno o m&aacute;s caracteres. 
 * @param {int} f_offset Si se espec&iacute;fica, la b&uacute;squeda iniciar&aacute; en &eacute;ste n&uacute;mero de caracteres contados desde el inicio del string
 * @returns {Number|Boolean}
 */
function stripos(f_haystack, f_needle, f_offset) {
    // discuss at: http://phpjs.org/functions/stripos

    var haystack = (f_haystack + '').toLowerCase();
    var needle = (f_needle + '').toLowerCase();
    var index = 0;
    if ((index = haystack.indexOf(needle, (f_offset || 0))) !== -1) {
        return index;
    }
    return false;
}
/**
 * Encuentra la posici&oacute;n num&eacute;rica de la primera aparici&oacute;n del needle (aguja) en el string haystack (pajar). 
 * Si no existen coincidencias devuelve falso.
 * example: strpos('Kevin van Zonneveld', 'e', 5);<br>
 * returns: 14
 * @param {string } haystack El string en donde buscar.<br>
 * @param {string } needle puede ser un string de uno o m&aacute;s caracteres. 
 * @param {int} offset Si se espec&iacute;fica, la b&uacute;squeda iniciar&aacute; en &eacute;ste n&uacute;mero de caracteres contados desde el inicio del string
 * @returns {Number|Boolean}
 */
function strpos(haystack, needle, offset) {
    var i = (haystack + '').indexOf(needle, (offset || 0));
    return i === -1 ? false : i;
}

Ext.UiValidations = function() {
    MostrarBarraProgreso(Ext.lang.loadingValidations);
    Ext.Ajax.request({
        url: 'getuivalidations',
        method: 'POST',
        callback: function(options, success, response) {
            Ext.MessageBox.hide();
            var responseData = Ext.decode(response.responseText);
            if (responseData.length > 0) {
                for (var i = 0; i < responseData.length; i++) {
                    if (responseData[i].idbtn != 'no-action')
                        if (Ext.getCmp(responseData[i].idbtn))
                            Ext.getCmp(responseData[i].idbtn).setVisible(true);
                }
            }
            Ext.MessageBox.hide();
        }
    });
};