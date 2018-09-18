<?php

interface IEStrategySetSummary {
    public function GetSumaAcumuladaFolio($TEXTALTERNATIVO, $TEXTSALDOFOLIO, & $FORMATPESOCOLUMNS, $PREVIOUSPAGE);
    public function SetSumaAcumuladaFolio($TEXTALTERNATIVO, $TEXTSALDOFOLIO, $argArrayBodyData, $argFieldName, $i, $PREVIOUSPAGE, $CURRENTPAGE, & $FORMATPESOCOLUMNS);
}