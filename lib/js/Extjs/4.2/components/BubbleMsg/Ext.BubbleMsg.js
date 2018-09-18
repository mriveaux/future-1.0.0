/* global Ext */
Ext.BubbleMsg = function () {
    var msgCt;
    function createBox(t, s, i) {
        if (i == Ext.Msg.ERROR) {
            return '<div class="msg" style="border: 2px solid #D61C02;"><h3>' + t + '</h3><span class="' + i + '"></span><p>' + s + '</p></div>';
        }
        if (i == Ext.Msg.WARNING) {
            return '<div class="msg" style="border: 2px solid #FACA02;"><h3>' + t + '</h3><span class="' + i + '"></span><p>' + s + '</p></div>';
        }
        return '<div class="msg"><h3>' + t + '</h3><span class="' + i + '"></span><p>' + s + '</p></div>';
    }
    return {
        msg: function (title, format, icon) {
            if (!msgCt) {
                msgCt = Ext.DomHelper.insertFirst(Ext.getBody(), {id: 'msg-div'}, true);
            }
            msgCt.alignTo(document, "t-t");
            var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var m = Ext.DomHelper.append(msgCt, createBox(title, s, icon), true);

            var stringL = format.toString();
            var msgLength = stringL.length;
            var q = 0;
            for (var h = 0; h < stringL.length; h++) {
                if (stringL.charAt(h) == "&") {
                    q += 7;
                }
            }
            if (q > 0) {
                msgLength -= q;
            }
            var o = 0;
            if (msgLength < 50) {
                o = 3000;
            } else {
                if (msgLength < 60) {
                    o = 4000;
                } else {
                    o = 5000;
                }
            }
            var f = parseFloat(Ext.get("msg-div").dom.style.left);
            Ext.get("msg-div").dom.style.left = (f * 2) - 10 + "px";
            m.hide();
            m.slideIn('r').ghost("r", {delay: o, remove: true});
        },
        /**
         * It's better to create the msg-div here in order to avoid re-layouts
         * later that could interfere with the HtmlEditor and reset its iFrame.
         * @returns {div}
         */
        init: function () {
            if (!msgCt) {
                msgCt = Ext.DomHelper.insertFirst(Ext.getBody(), {id: 'msg-div'}, true);
            }
        }
    };
}();
Ext.onReady(Ext.BubbleMsg.init, Ext.BubbleMsg);