sap.ui.define([
	"com/vSimpleApp/model/BaseObject",
	"com/vSimpleApp/service/Application",
	"sap/ui/model/json/JSONModel",
	"com/vSimpleApp/model/GRDisplayItem"

], function(BaseObject, Application, JSONModel, GRDisplayItem) {
	"use strict";
	var GRDisplayHeader = BaseObject.extend("com.vSimpleApp.model.GRDisplayHeader", {
		constructor: function(oData) {
			BaseObject.call(this);
			this.setData(oData);
		},

		setData: function(oData) {

			this.MatDoc = (oData && oData.MatDoc) ? oData.MatDoc : "";
			this.DocYear = (oData && oData.DocYear) ? oData.DocYear : "";
			this.TrEvType = (oData && oData.TrEvType) ? oData.TrEvType : "";
			this.DocDate = (oData && oData.DocDate) ? oData.DocDate : "";
			this.PstngDate = (oData && oData.PstngDate) ? oData.PstngDate : "";
			this.EntryDate = (oData && oData.EntryDate) ? oData.EntryDate : "";
			this.EntryTime = (oData && oData.EntryTime) ? oData.EntryTime : "";
			this.Username = (oData && oData.Username) ? oData.Username : "";
			this.VerGrGiSlip = (oData && oData.VerGrGiSlip) ? oData.VerGrGiSlip : "";
			this.ExpimpNo = (oData && oData.ExpimpNo) ? oData.ExpimpNo : "";
			this.RefDocNo = (oData && oData.RefDocNo) ? oData.RefDocNo : "";
			this.HeaderTxt = (oData && oData.HeaderTxt) ? oData.HeaderTxt : "";
			this.RefDocNoLong = (oData && oData.RefDocNoLong) ? oData.RefDocNoLong : "";
			this.GrItemSet = (oData && oData.GrItemSet) ? oData.GrItemSet : [];
		},
		getRequestPayloadGR: function() {
			var that = this;
			var GrItemSet = [];

			this.GrItemSet.forEach(function(item) {
				GrItemSet.push(item.getRequestPayloadGR());

			});

			return {

				MatDoc: this.MatDoc,
				DocYear: this.DocYear,
				TrEvType: this.TrEvType,
				DocDate: this.DocDate,
				PstngDate: this.PstngDate,
				EntryDate: this.EntryDate,
				EntryTime: this.EntryTime,
				Username: this.Username,
				VerGrGiSlip: this.VerGrGiSlip,
				ExpimpNo: this.ExpimpNo,
				RefDocNo: this.RefDocNo,
				HeaderTxt: this.HeaderTxt,
				RefDocNoLong: this.RefDocNoLong,

				GrItemSet: GrItemSet

			};

		}

	});
	return GRDisplayHeader;
});