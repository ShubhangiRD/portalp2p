sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel"
], function(Object, JSONModel) {
	"use strict";
	return Object.extend("com.vSimpleApp.Classes.StockStandards", {
		constructor: function(oData) {
			this.setData(oData);

		},
		setData: function(oData) {

			//this.Cbtlv = (oData && oData.Cbtlv) ? oData.Cbtlv : "";

			this.Auart = "OR";
				this.MomentType = "351";
				this.DocType = "UB";

		},
		datatime: function(dDate, tyt) {
			var s_doc_datePost = dDate;
			var Datepoststring = s_doc_datePost.toISOString();
			Datepoststring = Datepoststring.slice(0, -5);
			return Datepoststring;
		}

	});

});