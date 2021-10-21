sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel"
], function(Object, JSONModel) {
	"use strict";
	return Object.extend("com.vSimpleApp.model.Stock", {
		constructor: function(oData) {
			this.setData(oData);

		},
		setData: function(oData) {

				
			this.Cbtlv = (oData && oData.Cbtlv) ? oData.Cbtlv : "";
			this.Cytlv = (oData && oData.Cytlv) ? oData.Cytlv : "";
			this.Cgtlv = (oData && oData.Cgtlv) ? oData.Cgtlv : "";
			this.Changedon = (oData && oData.Changedon) ? oData.Changedon : "";
			this.Crtlv = (oData && oData.Crtlv) ? oData.Crtlv : "";
			this.Labst = (oData && oData.Labst) ? oData.Labst : "";
			this.Matnr = (oData && oData.Matnr) ? oData.Matnr : "";
			this.Pbtlv = (oData && oData.Pbtlv) ? oData.Pbtlv : "";
			this.Pgtlv = (oData && oData.Pgtlv) ? oData.Pgtlv : "";
			this.Prtlv = (oData && oData.Prtlv) ? oData.Prtlv : "";
			this.Pytlv = (oData && oData.Pytlv) ? oData.Pytlv : "";
			this.Werks = (oData && oData.Werks) ? oData.Werks : "";
		
			this.Details = (oData && oData.Details) ? oData.Details : [];

		this.Labst = (oData && oData.Labst) ? this.datatime(oData.Labst,oData.Pytlv) : this.datatime(oData.Labst,oData.Pytlv);
		

		},
		datatime: function(dDate,tyt) {
			var s_doc_datePost = dDate;
			var Datepoststring = s_doc_datePost.toISOString();
			Datepoststring = Datepoststring.slice(0, -5);
			return Datepoststring;
		}

	});

});