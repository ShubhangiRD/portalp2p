sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/BusyIndicator",
	"sap/m/MessageBox",
		"sap/m/MessageToast"
], function(Object, JSONModel,BusyIndicator,MessageToast) {
	"use strict";
	return Object.extend("com.vSimpleApp.model.ServiceF4", {
		constructor: function(oData) {
			this.setData(oData);

		},
		setData: function(oData) {

		

		},
			getPurchaseOrgList: function(oController) {
	//		var that = this;
			//get all data from odata model
			var oModel = oController.getOwnerComponent().getModel("VHeader");

			//get entity set
			BusyIndicator.show(true);
			oModel.read("/get_purchaseorg_f4helpSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = oController.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/PurchaseOrganization", oData.results);
					oLookupModel.refresh(true);
				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},
			getCompanyList: function(oController) {
		//	var that = this;
			//get all data from odata model

			var oModel = oController.getOwnerComponent().getModel("VHeader");

			//get entity set
			BusyIndicator.show(true);
			oModel.read("/get_companycode_f4helpSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = oController.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/CountryCode", oData.results);
					oLookupModel.refresh(true);
				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},
			getAccountList: function(oController) {
		//	var that = this;
			//get all data from odata model
			var oModel = oController.getOwnerComponent().getModel("VHeader");

			BusyIndicator.show(true);
			//get entity set
			oModel.read("/get_accountgrp_f4helpSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = oController.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/AccountGroup", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		}
	

	});

});