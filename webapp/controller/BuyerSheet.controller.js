sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/BusyIndicator",
	"sap/m/MessageToast"

], function(Controller, JSONModel, BusyIndicator, MessageToast) {

	"use strict";
	var oView, result = [];
	var Massupload = [];
	var oMaterialList = [], zStockMaterial = [];
	
	return Controller.extend("com.vSimpleApp.controller.BuyerSheet", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.vSimpleApp.view.BuyerSheet
		 */
		onInit: function() {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			this.getView().setModel(oModel);
				this.getTableStockDetails();
			var oSelectedData = new JSONModel();
			this.getView().setModel(oSelectedData, "oStockDataModel");
			oView = this.getView();
			var oSaleModel = new JSONModel();
			oView.setModel(oSaleModel, "oSaleModel");
			this.getSalesOrderDetails();
		
		},
		getSalesOrderDetails: function() {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			oModel.read("/SalesOrdersSet ", {
				success: function(oData) {

					var iItem = zStockMaterial.length;
					var aListofVendoritem = [];
					for (var iRowIndex = 0; iRowIndex < iItem; iRowIndex++) {
						//		console.log(iRowIndex);
						var Matnr = zStockMaterial[iRowIndex].Matnr;
						aListofVendoritem.push({
							Matnr: Matnr

						});
					}
					var index = {};
console.log(aListofVendoritem);
					aListofVendoritem.forEach(function(point) {
						var key = "" + point.Matnr + " ";
						if (key in index) {
							index[key].count++;
						} else {
							var newEntry = {
								Matnr: point.Matnr,
								Kwmeng: "",
								count: 1
							};
							index[key] = newEntry;
							result.push(newEntry);
						}
					});
					//	console.log(result);
					result.sort(function(a, b) {
						return b.count - a.count;
					});
					//		console.log(result);
					var sResultlengrh = result.length;

					console.log(result);

					var data = oData.results;

					for (var x = 0; x < result.length; x++) {
						var orderCount = 0;
						for (var j = 0; j < data.length; j++) {
							if (result[x].Matnr === data[j].Matnr) {
								orderCount = orderCount + parseInt(data[j].Kwmeng)
								result[x].Kwmeng = orderCount.toString();
							}

						}

					}

					oView.getModel("oSaleModel").setData(result);

					console.log(result);
				},

				error: function(oError) {

					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
		getTableStockDetails: function() {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			//			var oModels = this.getOwnerComponent().getModel("PurchaseSet");

			var ListofSrs = [];
			var CriticleState = [];
			BusyIndicator.show(true);
			oModel.read("/STOCK_DATASet", {
				success: function(oData) {
					BusyIndicator.hide();
					console.log(oData);
					var listOfMat = [];
					
					zStockMaterial = oData.results;
					//	console.log(oMaterialList);
					//		var MaterialList = [];
					var itemPO = oData.results.length;
					//	oView.getModel("oStockDataModel").setData(oData.results);
					var arr = [];

					for (var iRowIndex = 0; iRowIndex < itemPO; iRowIndex++) {

						var odataset = oData.results[iRowIndex];
						var Cbtlv = odataset.Cbtlv;
						var Cgtlv = odataset.Cgtlv;
						var Cytlv = odataset.Cytlv;
						var Changedon = odataset.Changedon;
						var Crtlv = odataset.Crtlv;
						var Labst = odataset.Labst;

						var Maingrp = odataset.Maingrp;
						var Grp = odataset.Grp;
						var Subgrp = odataset.Subgrp;

						var Matnr = odataset.Matnr;

						if (Matnr !== "" || Matnr !== undefined) {
							for (var x = 0; x < oMaterialList.length; x++) {
								if (Matnr === oMaterialList[x].Materialno) {
									var sMatDescription = oMaterialList[x].Description;

								}
							}
						}

						if (Matnr !== "" || Matnr !== undefined) {
							for (var x1 = 0; x1 <= result.length - 1; x1++) {

								if (Matnr === result[x1].Matnr) {
									var sOpenSalesOrder = result[x1].Kwmeng;

								}
							}
						}
						var Pbtlv = odataset.Pbtlv;
						var Pgtlv = odataset.Pgtlv;

						var Prtlv = odataset.Prtlv;
						var Pytlv = odataset.Pytlv;
						var Werks = odataset.Werks;

						var quantity = Labst;
						//fillArray(odataset, 4);

						ListofSrs.push({
							Cbtlv: Cbtlv,
							Cgtlv: Cgtlv,
							Cytlv: Cytlv,
							Changedon: Changedon,
							Crtlv: Crtlv,
							Subgrp: Subgrp,
							Maingrp: Maingrp,
							Grp: Grp,
							Labst: parseInt(Labst),
							Unit: "PC",
							Matnr: Matnr,
							Description: sMatDescription,
							OpenSalesOrder: sOpenSalesOrder,
							Pbtlv: Pbtlv,
							Pgtlv: Pgtlv,
							Prtlv: Prtlv,
							Pytlv: Pytlv,
							Werks: Werks,
							Color: ""

						});
						//	console.log(ListofSrs);

						oView.getModel("oStockDataModel").setData(ListofSrs);

						//sOpenSalesOrder = "";
						console.log(ListofSrs);

						var len = ListofSrs.length;
						var ls = len - 1;
						if (ListofSrs[ls].Color === 'red') {

							Massupload.push(ListofSrs[ls]);

						}

					}

				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}

			});

		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.vSimpleApp.view.BuyerSheet
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.vSimpleApp.view.BuyerSheet
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.vSimpleApp.view.BuyerSheet
		 */
		//	onExit: function() {
		//
		//	}

	});

});