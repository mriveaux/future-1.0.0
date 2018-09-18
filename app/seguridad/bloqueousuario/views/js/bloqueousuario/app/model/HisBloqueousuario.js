/* global Ext */
Ext.define('Bloqueousuario.model.HisBloqueousuario', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idbloqueo', type: 'int', useNull: true}, 'tipobloqueo', 'ipbloqueo', 'iduserbloqueo', 'locked', 'lockedtime', 'unlockedtime', 'iduserunlocker', 'usuario', 'userunlock'],
    idProperty: 'idbloqueousuario'
});