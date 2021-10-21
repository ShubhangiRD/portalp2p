sap.ui.define([
	"com/vSimpleApp/model/BaseObject"
], function(BaseObject) {
	"use strict";
	return BaseObject.extend("com.vSimpleApp.model.VendorFields", {
		constructor: function(odata) {
			BaseObject.call(this);
			if (odata) {
				this.Lifnrr = odata.Lifnr;
				this.Name1r = odata.Name1;
				this.Bukrs = odata.Bukrs;
				this.Ekgrp = odata.Ekgrp;
				this.Ekorg = odata.Ekorg;
				this.Gbort = odata.Gbort;
				this.Ktokk = odata.Ktokk;
				this.Kunnr = odata.Kunnr;
				this.Land1 = odata.Land1;
				this.Ort01 = odata.Ort01;
				this.Pstlz = odata.Pstlz;
				this.Stras = odata.Stras;
				this.Regio = odata.Regio;
				this.Telf1 = odata.Telf1;
				this.Waers = odata.Waers;
				this.Sexkz = odata.Sexkz;
				this.Adrnr = odata.Adrnr;
			}
		},
		getChartData: function() {
			return {
				Vendor: this.Vendor,
				Revenue: this.Revenue
			};
		}
	});
});