/* global Ext */
Ext.define('Bloqueousuario.model.Bloqueousuario', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idbloqueo', type: 'int', useNull: true}, 'tipobloqueo', 'ipbloqueo', 'iduserbloqueo', 'locked', 'lockedtime', 'unlockedtime', 'iduserunlocker','usuario'],
    idProperty: 'idbloqueousuario'
});