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
			getVendorList: function(oController) {
	//		var that = this;
			var oModel = oController.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(true);
			oModel.read("/Fetch_Vendor_DetailsSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = oController.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/DisplyaVendorList", oData.results);
					oLookupModel.refresh(true);
					//that.getMaterialList();
				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
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
		},
				getSpecialStockList: function(oController) {
		//	var that = this;
			var oModel = oController.getOwnerComponent().getModel("StockModel");

			oModel.read("/get_movementTypef4Set", {
				success: function(oData) {

					var oLookupModel = oController.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/SplStock", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {

					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
			getPOPlant: function(oController) {
		//	var that = this;
			var oModel = oController.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(true);
			oModel.read("/get_plant_f4helpSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = oController.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/POPlant", oData.results);
					oLookupModel.refresh(true);
					//that.getMaterialList();
				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
			getMaterialList: function(oController) {
		//	var that = this;
			var oModel = oController.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(true);
			oModel.read("/MaterialmasterSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oMaterialList = oData.results;
					var oLookupModel = oController.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/MaterialList", oMaterialList);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					//	BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
			getPurchaseGroupList: function(oController) {
		//	var that = this;
			var oModel = oController.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(true);
			oModel.read("/get_purgrp_f4helpSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = oController.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/PurchaseGroupList", oData.results);
					oLookupModel.refresh(true);
					//that.getMaterialList();
				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
			getMaterialDisList: function(oController) {
		//	var that = this;
			var oModel = oController.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(true);
			oModel.read("/MaterialmasterSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = oController.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/MaterialDiscription", oData.results);
					oLookupModel.refresh(true);
					//that.getMaterialList();
				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
				getSalesOrgforCondition: function(oController) {
			var that = this;
			//get all data from odata model
			var oModel = oController.getOwnerComponent().getModel("StockModel");
			//get entity set
			oModel.read("/get_salesorgf4Set", {
				success: function(oData) {

					var oLookupModel = oController.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/SalesOrg1", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					//error handler code
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},


	

	});

});