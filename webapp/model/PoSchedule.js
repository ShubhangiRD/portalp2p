sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel"
], function(Object, JSONModel) {
	"use strict";
	return Object.extend("com.vSimpleApp.model.PoSchedule", {
		constructor: function(oData) {
			this.setData(oData);

		},
		setData: function(oData) {
			this.PoItem = (oData && oData.PoItem) ? oData.PoItem : "";
			this.SchedLine = (oData && oData.SchedLine) ? oData.SchedLine : "";
			this.DelDatcatExt = (oData && oData.DelDatcatExt) ? oData.DelDatcatExt : "";
			this.DeliveryDate = (oData && oData.DeliveryDate) ? oData.DeliveryDate : "";
			this.Quantity = (oData && oData.Quantity) ? oData.Quantity : "";
			this.DelivTime = (oData && oData.DelivTime) ? oData.DelivTime : "";
			this.StatDate = (oData && oData.StatDate) ? oData.StatDate : "";
			this.PreqNo = (oData && oData.PreqNo) ? oData.PreqNo : "";
			this.PreqItem = (oData && oData.PreqItem) ? oData.PreqItem : "";
			this.PoDate = (oData && oData.PoDate) ? oData.PoDate : "";
			this.Routesched = (oData && oData.Routesched) ? oData.Routesched : "";
			this.MsDate = (oData && oData.MsDate) ? oData.MsDate : "";
			this.MsTime = (oData && oData.MsTime) ? oData.MsTime : "";
			this.LoadDate = (oData && oData.LoadDate) ? oData.LoadDate : "";
			this.LoadTime = (oData && oData.LoadTime) ? oData.LoadTime : "";
			this.TpDate = (oData && oData.TpDate) ? oData.TpDate : "";
			this.TpTime = (oData && oData.TpTime) ? oData.TpTime : "";
			this.GiDate = (oData && oData.GiDate) ? oData.GiDate : "";
			this.GiTime = (oData && oData.GiTime) ? oData.GiTime : "";
			this.DeleteInd = (oData && oData.DeleteInd) ? oData.DeleteInd : "";
			this.ReqClosed = (oData && oData.ReqClosed) ? oData.ReqClosed : "";
			this.GrEndDate = (oData && oData.GrEndDate) ? oData.GrEndDate : "";
			this.GrEndTime = (oData && oData.GrEndTime) ? oData.GrEndTime : "";
			this.ComQty = (oData && oData.ComQty) ? oData.ComQty : "";
			this.ComDate = (oData && oData.ComDate) ? oData.ComDate : "";
			this.GeoRoute = (oData && oData.GeoRoute) ? oData.GeoRoute : "";
			this.Handoverdate = (oData && oData.Handoverdate) ? oData.Handoverdate : "";
			this.Handovertime = (oData && oData.Handovertime) ? oData.Handovertime : "";

		},
		getRequestPayloadPoSched: function() {
			return {
				PoItem: this.PoItem,
				SchedLine:  this.SchedLine,
				DelDatcatExt:  this.DelDatcatExt,
				DeliveryDate:  this.DeliveryDate,
				Quantity:  this.Quantity,
				DelivTime:  this.DelivTime,
				StatDate:  this.StatDate,
				PreqNo:  this.PreqNo,
				PreqItem:  this.PreqItem,
				PoDate: this.PoDate,
				Routesched:  this.Routesched,
				MsDate:  this.MsDate,
				MsTime:  this.MsTime,
				LoadDate:  this.LoadDate,
				LoadTime:  this.LoadTime,
				TpDate:  this.TpDate,
				TpTime:  this.TpTime,
				GiDate:  this.GiDate,
				GiTime:  this.GiTime,
				DeleteInd:  this.DeleteInd,
				ReqClosed:  this.ReqClosed,
				GrEndDate: this.GrEndDate,
				GrEndTime:  this.GrEndTime,
				ComQty:  this.ComQty,
				ComDate:  this.ComDate,
				GeoRoute: this.GeoRoute,
				Handoverdate: this.Handoverdate,
				Handovertime: this.Handovertime

			};
		}

	});

});