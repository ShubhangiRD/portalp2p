sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/ColumnListItem",
	"jquery.sap.global",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	'sap/ui/core/BusyIndicator',
	"sap/ui/model/json/JSONModel",
	"sap/m/library",
	"sap/m/Input",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/Button",
	"sap/m/Toolbar",
	"sap/m/Dialog",
	"sap/m/DialogType",

	"sap/m/ButtonType",
	"sap/m/Label",

	"sap/m/Text",
	"sap/m/TextArea",
	"sap/ui/core/Core",

	"com/vSimpleApp/Classes/Stock",
	"com/vSimpleApp/model/formatter"

], function(Controller, ColumnListItem, jQuery, MessageToast, MessageBox, History, BusyIndicator, JSONModel, library, Input, Fragment,
	Filter, FilterOperator, Button, Toolbar, Dialog, DialogType, ButtonType, Label, Text, TextArea, Core, Stock, formatter) {
	"use strict";
	var oView, oComponent;
	var oMaterialList = [];
	return Controller.extend("com.vSimpleApp.controller.StockTable", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.vSimpleApp.view.StockTable
		 */
		formatter: formatter,
		onInit: function() {
			//
			oView = this.getView();
			var oModel = this.getOwnerComponent().getModel("StockModel");
			oComponent = this.getOwnerComponent();
			this.getView().setModel(oModel);

			var oStockData = new JSONModel();
			oView.setModel(oStockData, "oStockDataModel");
			this.getStockDetailList();
		//	this.getStockDetailList34();
		},
		getStockDetailList34: function() {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			BusyIndicator.show(true);
			oModel.read("/STOCK_DATASet", {
				success: function(oData) {
					BusyIndicator.hide();

					var listOfMat = [];
					var MaterialList = [];
					var len = oData.results.length;

					//		oView.getModel("oStockDataModel").setData(oData.results);

					var ListofSrs = [];
					for (var iRowIndex = 0; iRowIndex < len; iRowIndex++) {
						var odataset = oData.results[iRowIndex];

						var Cbtlv = odataset.Cbtlv;
						var Cytlv = odataset.Cytlv;
						var Cgtlv = odataset.Cgtlv;
						var Changedon = odataset.Changedon;
						var Crtlv = odataset.Crtlv;
						var Labst = 1000;
						var Matnr = odataset.Matnr;
						var Pbtlv = odataset.Pbtlv;
						var Pgtlv = odataset.Pgtlv;
						var Prtlv = odataset.Prtlv;
						var Pytlv = odataset.Pytlv;
						var Werks = odataset.Werks;
						var arr = [];

						// arr[iRowIndex].push(odataset);

						/*	for (var i = 0; i < len; i++) {
								arr.push(odataset);

							}*/
						/*	var red = 100;
							var yell = 500;
							var green = 1000;
							var blue = 2000;
							var Labsts = 700;*/
							var color;
								if (Labst <= Crtlv) {
									Crtlv.fontcolor( "red" );
								//	Crtlv.style.color("red");
							//	Crtlv.addStyleClass("greenTxtHlight");
								//	return "Error";
									
								} else if (Labst > Crtlv && Labst <= Cytlv) {
									return "Warning";
								} else if (Labst > Cytlv && Labst <= Cgtlv) {
									return "Success";
								} else if (Labst > Cgtlv && Labst <= Cbtlv) {
									return "Information";
								}

						ListofSrs.push({

							Matnr: Matnr,
							Werks: Werks,
							Labst: Labst,
							Cbtlv: Cbtlv,
							Cgtlv: Cgtlv,
							Cytlv: Cytlv,

							Crtlv: Crtlv,
							Pbtlv: Pbtlv,
							Pgtlv: Pgtlv,
							Prtlv: Prtlv,
							Pytlv: Pytlv,

							Changedon: Changedon,
							//	MultipleIt: arr
						});

					}
					console.log(ListofSrs);
					oView.getModel("oStockDataModel").setData(ListofSrs);
				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
		getStockDetailList: function() {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			BusyIndicator.show(true);
			oModel.read("/STOCK_DATASet", {
				success: function(oData) {
					BusyIndicator.hide();

					var listOfMat = [];
					var MaterialList = [];
					var len = oData.results.length;
					/*var Podata = new Stock(oData.results);
											oView.getModel("oStockDataModel").setData(Podata);
					*/
					var ListofSrs = [];

			

					for (var iRowIndex = 0; iRowIndex < len; iRowIndex++) {
						var odataset = oData.results[iRowIndex];
						var Labst = 1000;
						var Cbtlv = odataset.Cbtlv;
						var Cytlv = odataset.Cytlv;
						var Cgtlv = odataset.Cgtlv;
						var Crtlv = odataset.Crtlv;
						var Matnr = odataset.Matnr;
						var Pbtlv = odataset.Pbtlv;
						var Pgtlv = odataset.Pgtlv;
						var Prtlv = odataset.Prtlv;
						var Pytlv = odataset.Pytlv;
						var Werks = odataset.Werks;
						var Changedon = odataset.Changedon;

						/*	if (Labst <= Crtlv) {
												return "Error";
												}
												else if(Labst > Crtlv && Labst <= Cytlv) {
													return "Warning";
												}
												else if(Labst > Cytlv && Labst <= Cgtlv) {
													return "Success";
												}
												else if(Labst > Cgtlv && Labst <= Cgtlv) {
													return "None";
						
												}else{
													console.log("Errprr");
												}
						
						
						*/

						var arr = [];

						/*arr.push({
							Matnr: Matnr,
							Werks: Werks,
							Labst: Labst,
							Changedon: Changedon,
							CurrentThread: Cbtlv,
							PreviousThread: Pbtlv

						});*/
						arr.push({
							Matnr: Matnr,
							Werks: Werks,
							Labst: Labst,
							Changedon: Changedon,
							CurrentThread: Cgtlv,
							PreviousThread: Pgtlv

						});
						arr.push({
							Matnr: Matnr,
							Werks: Werks,
							Labst: Labst,
							Changedon: Changedon,
							CurrentThread: Cytlv,
							PreviousThread: Pytlv

						});

						arr.push({
							Matnr: Matnr,
							Werks: Werks,
							Labst: Labst,
							Changedon: Changedon,
							CurrentThread: Crtlv,
							PreviousThread: Prtlv

						});
						//		arr.sort( compare );
						ListofSrs.push({
							Matnr: Matnr,
							Werks: Werks,
							Labst: Labst,
							Changedon: Changedon,
							CurrentThread: Cbtlv,
							PreviousThread: Pbtlv,
							MultipleIt: arr
						});

					}
					console.log(ListofSrs);

					//	ListofSrs.MultipleIt.sort( compare );

					oView.getModel("oStockDataModel").setData(ListofSrs);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		onCollapseAll: function() {
			var oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.collapseAll();
		},

		onCollapseSelection: function() {
			var oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.collapse(oTreeTable.getSelectedIndices());
		},

		onExpandFirstLevel: function() {
			var oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.expandToLevel(1);
		},

		onExpandSelection: function() {
			var oTreeTable = this.byId("TreeTableBasic");
			oTreeTable.expand(oTreeTable.getSelectedIndices());
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.vSimpleApp.view.StockTable
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.vSimpleApp.view.StockTable
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.vSimpleApp.view.StockTable
		 */
		//	onExit: function() {
		//
		//	}

	});

});