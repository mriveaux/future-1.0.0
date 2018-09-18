/* global Ext, lMask */
Ext.onReady(function() {
    Ext.QuickTips.init();
    lMask.hide();
    getLegalConfig();
    function getLegalConfig() {
        loadMask(futureLang.msgloadlegalinfo);
        Ext.Ajax.request({
            url: 'loadlegaldata',
            method: 'POST',
            callback: function(options, success, response) {
                var responseData = Ext.decode(response.responseText);
                lMask.hide();
                var display = generateLegalInfo(responseData);
                var contactView = document.createElement("div");
                contactView.innerHTML = display;
                document.getElementsByTagName("body")[0].appendChild(contactView);
            }
        });
    }
    function generateContactView(elements) {
        return "<div class='bs-callout-primary'>" +
                "<address class='margin-bottom-40'>" +
                futureLang.lbproductname + elements.producto + "<br>" +
                futureLang.lbregisterto + elements.empresa + "<br>" +
                futureLang.lbclave + elements.noserie + "<br>" +
                futureLang.lbclavestatus + "<span class='label label-success'>" + futureLang.lbactive + "</span><br>" +
                futureLang.lbactivationdate + elements.registro + "<br>" +
                futureLang.lbexpiredate + elements.caducidad + "<br>" +
                "</address></div>";
    }
    function generateLegalInfo(elements) {
        return " <div class='container' style='margin-top:20px'>" +
                "<div class='panel-group' id='accordion'>" +
                "<div class='panel panel-info'>" +
                "<div class='panel-heading'>" +
                "<h4 class='panel-title'>" +
                "<a class='accordion-toggle' data-toggle='collapse' data-parent='#accordion' href='#collapseOne'>" +
                "<span class='fa fa-file-text-o'>&nbsp;</span>" + futureLang.ttregisterdata +
                "</a>" +
                "</h4>" +
                "</div>" +
                "<div id='collapseOne' class='panel-collapse collapse in'>" +
                "<div class='panel-body text-justify'>" +
                "<div class='bs-callout-primary'>" +
                "<address class='margin-bottom-40'>" +
                futureLang.lbproductname + elements.producto + "<br>" +
                futureLang.lbregisterto + elements.empresa + "<br>" +
                futureLang.lbclave + elements.noserie + "<br>" +
                futureLang.lbclavestatus + "<span class='label label-success'>" + futureLang.lbactive + "</span><br>" +
                futureLang.lbactivationdate + elements.registro + "<br>" +
                futureLang.lbexpiredate + elements.caducidad + "<br>" +
                "</address></div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "<div class='panel panel-info'>" +
                "<div class='panel-heading'>" +
                "<h4 class='panel-title'>" +
                "<a class='accordion-toggle' data-toggle='collapse' data-parent='#accordion' href='#collapseTwo' style='hover,focus:font-weight:normal'>" +
                "<span class='fa fa-tags'>&nbsp;</span>" + futureLang.ttusetermines +
                "</a>" +
                "</h4>" +
                "</div>" +
                "<div id='collapseTwo' class='panel-collapse collapse'>" +
                "<div class='panel-body text-justify'>" +
                "<div class='bs-callout-primary'>" +
                "<address class='margin-bottom-40'>" +
                futureLang.lbconditions +
                "</address></div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>";
    }
});