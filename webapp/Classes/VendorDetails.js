sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel"
], function(Object, JSONModel) {
	"use strict";
	return Object.extend("com.vSimpleApp.model.VendorDetails", {
		constructor: function(oData) {

				
			this.Lifnr = (oData && oData.Lifnrr) ? oData.Lifnrr : "";
			this.Name1 = (oData && oData.Name1r) ? oData.Name1r : "";
			this.Bukrs = (oData && oData.Bukrs) ? oData.Bukrs : "";
			this.Ekgrp = (oData && oData.Ekgrp) ? oData.Ekgrp : "";
			this.Ekorg = (oData && oData.Ekorg) ? oData.Ekorg : "";
			this.Gbort = (oData && oData.Gbort) ? oData.Gbort : "";
			this.Ktokk = (oData && oData.Ktokk) ? oData.Ktokk : "";
			this.Kunnr = (oData && oData.Kunnr) ? oData.Kunnr : "";
			this.Land1 = (oData && oData.Land1) ? oData.Land1 : "";
			this.Ort01 = (oData && oData.Ort01) ? oData.Ort01 : "";
			this.Pstlz = (oData && oData.Pstlz) ? oData.Pstlz : "";
			this.Stras = (oData && oData.Stras) ? oData.Stras : "";
			this.Regio = (oData && oData.Regio) ? oData.Regio : "";
			this.Telf1 = (oData && oData.Telf1) ? oData.Telf1 : "";
			this.Waers = (oData && oData.Waers) ? oData.Waers : "";
			this.Sexkz = (oData && oData.Sexkz) ? oData.Sexkz : "";
			this.Adrnr = (oData && oData.Adrnr) ? oData.Adrnr : "";
	

		},

		setObjectData: function(oData) {
		
			this.Lifnr = (oData && oData.Lifnrr) ? oData.Lifnrr : "";
			this.Name1 = (oData && oData.Name1r) ? oData.Name1r : "";
			this.Bukrs = (oData && oData.Bukrs) ? oData.Bukrs : "";
			this.Ekgrp = (oData && oData.Ekgrp) ? oData.Ekgrp : "";
			this.Ekorg = (oData && oData.Ekorg) ? oData.Ekorg : "";
			this.Gbort = (oData && oData.Gbort) ? oData.Gbort : "";
			this.Ktokk = (oData && oData.Ktokk) ? oData.Ktokk : "";
			this.Kunnr = (oData && oData.Kunnr) ? oData.Kunnr : "";
			this.Land1 = (oData && oData.Land1) ? oData.Land1 : "";
			this.Ort01 = (oData && oData.Ort01) ? oData.Ort01 : "";
			this.Pstlz = (oData && oData.Pstlz) ? oData.Pstlz : "";
			this.Stras = (oData && oData.Stras) ? oData.Stras : "";
			this.Regio = (oData && oData.Regio) ? oData.Regio : "";
			this.Telf1 = (oData && oData.Telf1) ? oData.Telf1 : "";
			this.Waers = (oData && oData.Waers) ? oData.Waers : "";
			this.Sexkz = (oData && oData.Sexkz) ? oData.Sexkz : "";
			this.Adrnr = (oData && oData.Adrnr) ? oData.Adrnr : "";
	

		

		},
	
	
		getModel: function() {
			return this.model;
		}
	});

});