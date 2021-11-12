sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/BusyIndicator",

	"sap/m/MessageToast",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Filter",
	"sap/m/library"

], function(Controller, JSONModel, BusyIndicator, MessageToast, FilterOperator, Filter, library) {

	"use strict";
	var oView, result = [];
	var Massupload = [];
	var oMaterialList = [],
		zStockMaterial = [];

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

			var oData = new JSONModel();
			oView.setModel(oData, "oDataModel");

			var oMonthlyData = new JSONModel();
			oView.setModel(oMonthlyData, "oMonthlydataModel");
			var oCheckedModel = new sap.ui.model.json.JSONModel({
				H48: false,
				Current: true,
				Previous1Month: false,
				Last3: false,
				Last6: false

			});
			oView.setModel(oCheckedModel, "oCheckModel");
				this.getSalesOrderDetails();
			this.OnGetfiltersale();

		},
		datatime: function(dDate) {
			//	2021-10-04T08:54:57
			var m = new Date(dDate);
			var dateString = m.getUTCFullYear() + "-" + (m.getUTCMonth() + 1) + "-" + m.getUTCDate() + "T" + m.getUTCHours() + ":" + m.getUTCMinutes() +
				":" + m.getUTCSeconds();

			return dateString;

		},
		OnSelectMonths: function(oEvent) {
			var ocheckModel = oView.getModel("oCheckModel");
			var checkBoxSelected = oEvent.getParameter("selected");

			var oselecttab = oEvent.oSource.mProperties.text;
			console.log(oselecttab)
			var CurrentD = new Date();

			if (oselecttab === "48 Hours") {

			} else if (oselecttab === "Current Month") {

				var firstDay = new Date(CurrentD.getFullYear(), CurrentD.getMonth(), 1);

				var lastDay = new Date(CurrentD.getFullYear(), CurrentD.getMonth() + 1, 0);

				var last1mon = firstDay.getUTCFullYear() + "-" + (firstDay.getUTCMonth() + 1) + "-" + firstDay.getUTCDate() + "T" + firstDay.getUTCHours() +
					":" + firstDay.getUTCMinutes() +
					":" + firstDay.getUTCSeconds();
				console.log(last1mon);
				var endo1mon = lastDay.getUTCFullYear() + "-" + (lastDay.getUTCMonth() + 1) + "-" + lastDay.getUTCDate() + "T" + lastDay.getUTCHours() +
					":" + lastDay.getUTCMinutes() +
					":" + lastDay.getUTCSeconds();
				console.log(endo1mon);

				oView.getModel("oDataModel").setProperty("/FirstDate", last1mon);
				oView.getModel("oDataModel").setProperty("/EndDate", endo1mon);

			} else if (oselecttab === "Previous 1 Month") {
				// var prevMonthEnd = new Date();
				// CurrentD.setDate(0);
				// var beginLastMonth = new Date(CurrentD);
				// beginLastMonth.setDate(1);
				// var Prevmonthstart = this.datatime(beginLastMonth);

				// var lastmonth = this.datatime(prevMonthEnd);
				var Prevmonthstart = new Date().toISOString();
				CurrentD.setMonth(CurrentD.getMonth() - 1);
				var lastmonth = CurrentD.toISOString();
				oView.getModel("oDataModel").setProperty("/FirstDate", Prevmonthstart);
				oView.getModel("oDataModel").setProperty("/EndDate", lastmonth);

			} else if (oselecttab === "Last 3 Months") {
				// var dateString1 = this.datatime(CurrentD);

				// CurrentD.setMonth(CurrentD.getMonth() - 3);

				// var Last3Month = this.datatime(CurrentD);

				var dateString1 = new Date().toISOString();
				CurrentD.setMonth(CurrentD.getMonth() - 3);
				var Last3Month = CurrentD.toISOString();
				oView.getModel("oDataModel").setProperty("/FirstDate", dateString1);
				oView.getModel("oDataModel").setProperty("/EndDate", Last3Month);

			} else if (oselecttab === "Last 6 Months") {
				// var dateString2 = this.datatime(CurrentD);

				// CurrentD.setMonth(CurrentD.getMonth() - 6);

				// var Last6Month = this.datatime(CurrentD);

				var dateString2 = new Date().toISOString();
				CurrentD.setMonth(CurrentD.getMonth() - 6);
				var Last3Month = CurrentD.toISOString();
				oView.getModel("oDataModel").setProperty("/FirstDate", dateString2);
				oView.getModel("oDataModel").setProperty("/EndDate", Last3Month);

			}

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

		OnGetfiltersale: function() {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			var oDataModel = oView.getModel("oDataModel");
			var FirstDate = oDataModel.oData.FirstDate;
			var EndDate = oDataModel.oData.EndDate;
			var Matnr = oDataModel.oData.Material;
			console.log(oDataModel);

			var zero = "";

			if ($.isNumeric((Matnr)) === true) {
				var len = Matnr.length;
				if (len !== undefined) {
					var z = 18 - len;
					for (var i = 0; i < z; i++) {
						zero += "0";
					}
				}

				Matnr = zero + Matnr;
			}

			var d1 = "2021-03-17T12:04:39";
			var d2 = "2021-11-11T13:19:55";
			var mat = "000000000050065555";
			var oFilter1 = new sap.ui.model.Filter('Erdat', sap.ui.model.FilterOperator.EQ, EndDate);
			var oFilter2 = new sap.ui.model.Filter('Erdat2', sap.ui.model.FilterOperator.EQ, FirstDate);
			var oFilter3 = new sap.ui.model.Filter('Matnr', sap.ui.model.FilterOperator.EQ, mat);
			oModel.read("/StockvsSales2Set?$filter=(Erdat eq datetime'" + oFilter1 + "' and Erdat2 eq datetime'" + oFilter2 + "'and Matnr eq '" +
				oFilter2 + "')", {
					filters: [oFilter1, oFilter2, oFilter3],

					success: function(oData) {
						//	console.log(succ);
						oView.getModel("oMonthlydataModel").setData(oData.results);

					},
					error: function(err) {
						console.log(err);
					}

				});
			//	var sVendorCreate = "/StockvsSales2Set?$filter=(Erdat eq datetime'2021-03-17T12:04:39' and Erdat2 eq datetime'2021-11-11T13:19:55' and Matnr eq '000000000050065555' )";
			//	BusyIndicator.show(true);

		},

		getMaterialList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(true);
			oModel.read("/MaterialmasterSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oMaterialList = oData.results;
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/MaterialList", oMaterialList);
					oLookupModel.refresh(true);
					that.getStockDetailList();
				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		handlePOMaterialHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			//eate value help dialog
			if (!this._valueHelpDialogph) {
				this._valueHelpDialogph = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.MaterialNumber",
					this
				);
				this.getView().addDependent(this._valueHelpDialogph);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogph.getBinding("items").filter(new Filter([new Filter(
				"Materialno",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sInputValue
			)]));
			this.getMaterialList();
			// open value help dialog filtered by the input value
			this._valueHelpDialogph.open(sInputValue);
		},
		_handlePOMaterialSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Materialno",
				FilterOperator.Contains, sValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},

		_handlePOMaterialClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");

			if (oSelectedItem) {
				var productInput = this.byId(this.inputId);
				productInput.setValue(oSelectedItem.getTitle());
				var sTitle = oSelectedItem.getTitle();
				var sDescription = oSelectedItem.getInfo();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);

		}

		// onGetSalesForMonthly: function() {
		// 		var oModel = this.getOwnerComponent().getModel("StockModel");

		// 		 function datatime(dDate) {
		// 				//	2021-10-04T08:54:57
		// 				var m = new Date(dDate);
		// 				var dateString = m.getUTCFullYear() + "-" + (m.getUTCMonth() + 1) + "-" + m.getUTCDate() + "T" + m.getUTCHours() + ":" + m.getUTCMinutes() +
		// 					":" + m.getUTCSeconds();

		// 				return dateString;

		// 			} 

		// 			var CurrentD = new Date("January 14, 2012");
		// 		var currentDate = CurrentD.toLocaleDateString()
		// 		console.log(currentDate);
		// 		CurrentD.setMonth(CurrentD.getMonth() - 3);
		// 		var Last3Month = CurrentD.toLocaleDateString()
		// 		console.log(Last3Month);
		// 		//2021-03-17T12:04:39
		// 		// var url =	"?$filter=(Erdat eq datetime'2021-03-17T12:04:39' and Erdat2 eq datetime'2021-11-11T13:19:55' and Matnr eq '000000000050065555' )";

		// 		var oFilter1 = new sap.ui.model.Filter('Erdat', sap.ui.model.FilterOperator.EQ, sItemTitle);
		// 		var oFilter2 = new sap.ui.model.Filter('Erdat2', sap.ui.model.FilterOperator.EQ, sItemTitle);
		// 		var oFilter3 = new sap.ui.model.Filter('Matnr', sap.ui.model.FilterOperator.EQ, sItemTitle);
		// 		oModel.read("/StockvsSales2Set?$filter=(Erdat eq '" + sItemTitle + "' and Erdat2 eq '" + sItemTitle + "'and Matnr eq '" +
		// 			sItemTitle + "')", {
		// 				filters: [oFilter1, oFilter3, oFilter3],

		// 				success: function(oData) {
		// 					console.log(oData);
		// 				},
		// 				errors: function(oError) {

		// 				}
		// 			});
		// 	}

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