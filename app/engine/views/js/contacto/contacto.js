/* global Ext, lMask */
Ext.onReady(function() {
    Ext.QuickTips.init();
    lMask.hide();
    getEntityConfig();
    function getEntityConfig() {
        MostrarBarraProgreso(futureLang.lbloadcontactdata);
        Ext.Ajax.request({
            url: 'loadContactoEntidades',
            method: 'POST',
            callback: function(options, success, response) {
                var responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                var arrStyle = Array('bs-callout-primary', 'bs-callout-info', 'bs-callout-success', 'bs-callout-warning', 'bs-callout-danger', 'bs-callout-purple');
                var recordStyle = 0;
                var display = "<div class='container'>";
                Ext.each(responseData, function(e) {
                    display += generateContactView(e, arrStyle[recordStyle]);
                    recordStyle = (recordStyle++ === 5) ? 0 : recordStyle++;
                });
                display += "</div>";
                var contactView = document.createElement("div");
                contactView.innerHTML = display;
                document.getElementsByTagName("body")[0].appendChild(contactView);
            }
        });
    }
    function generateContactView(element, recordStyle) {
        return "<div class='bs-callout " + recordStyle + "'>" +
                "<h4>" + String(element.nombre).toUpperCase() + "</h4>" +
                "<address class='margin-bottom-40'>" +
                "<b>" + element.descripcion + "</b><br>" +
                futureLang.lbreeup + element.reeup + "<br>" +
                futureLang.lbnit + element.nit + "<br>" +
                futureLang.lbtelephone + element.telefonos + "<br>" +
                futureLang.lbmail + element.correos + "<br>" +
                futureLang.lbdirection + element.direccion + "<br>" +
                "</address></div>";
    }
});