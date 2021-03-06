sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/BusyIndicator",
	"sap/m/MessageToast",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Filter",
	"sap/m/library",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	"sap/m/MessageBox",
	"sap/ui/model/Sorter",
	"sap/ui/table/library",
	"sap/ui/thirdparty/jquery",
	"sap/ui/table/RowAction",
	"sap/ui/table/RowActionItem",
	"sap/ui/table/RowSettings",
	"sap/ui/core/Fragment",
	"sap/ui/export/library",
	"sap/ui/export/Spreadsheet"

], function(Controller, JSONModel, BusyIndicator, MessageToast, FilterOperator, Filter, library, Export, ExportTypeCSV, MessageBox,
	Sorter,
	jquery, RowAction,
	RowActionItem, RowSettings, Fragment, exportLibrary, Spreadsheet) {

	"use strict";
	var oView, result = [];
	var Massupload = [];
	var oMaterialList = [],
		zStockMaterial = [],
		SalesOrder = [];

	var SortOrder = library.SortOrder;
	var EdmType = exportLibrary.EdmType;
	var oData2;

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

			var onRejectedData = new JSONModel();
			oView.setModel(onRejectedData, "onRejectedData");

			var oDeliveryPattern = new JSONModel();
			oView.setModel(oDeliveryPattern, "oDeliveryPattern");
			var oMonthlyData = new JSONModel();
			oView.setModel(oMonthlyData, "oMonthlydataModel");
			var oCheckedModel = new sap.ui.model.json.JSONModel({
				H48: false,
				Current: false,
				Previous1Month: false,
				Last3: false,
				Last6: false

			});
			oView.setModel(oCheckedModel, "oCheckModel");
			this.getSalesOrderDetails();
			//	this.OnGetfiltersale();

			var oVizFrame = this.getView().byId("idVizFrameline");
			oVizFrame.setModel(oMonthlyData, "oMonthlydataModel");
			oVizFrame.setVizType("column");

			var vizProperties = {
				interaction: {
					zoom: {
						enablement: "disabled"
					},
					selectability: {
						mode: "EXCLUSIVE"
					}
				},
				valueAxis: {
					title: {
						visible: false
					},
					visible: true,
					axisLine: {
						visible: false
					},
					label: {
						linesOfWrap: 2,
						visible: false,
						style: {
							fontSize: "10px"
						}
					}
				},
				categoryAxis: {
					title: {
						visible: false
					},
					label: {
						linesOfWrap: 2,
						rotation: "fixed",
						angle: 0,
						style: {
							fontSize: "12px"
						}
					},
					axisTick: {
						shortTickVisible: false
					}
				},
				title: {
					text: "Buyercheatsheet",
					visible: true
				},
				legend: {
					visible: false
				},
				plotArea: {
					colorPalette: ["#007181"],
					gridline: {
						visible: false
					},
					dataLabel: {
						visible: true,
						style: {
							fontWeight: 'bold'
						},
						hideWhenOverlap: false
					},
					seriesStyle: {
						"rules": [{
							"dataContext": {
								"Budget": '*'
							},
							"properties": {
								"dataPoint": {
									"pattern": "noFill"
								}
							}
						}]
					},
					dataPointStyleMode: "update"

				}
			};

			oVizFrame.setVizProperties(vizProperties);
			oVizFrame.setModel(oMonthlyData, "oMonthlydataModel");
			var oPopover = new sap.viz.ui5.controls.Popover({});
			oPopover.connect(oVizFrame.getVizUid());

			var oCheckBox = new JSONModel({
				Material: false,
				Vendor: false,
				Purchaseorg: false,
				MaterialGroup: false,
				ProductHierarchy: false,
				CreatedBy: false,
				Basic: true,
				Advance: false
			});
			oView.setModel(oCheckBox, "oCheckBox");
			//create visible model to show visible data only
			var oVisibleModel = new JSONModel({
				isVisibleMat: true,
				isVisibleVen: true,
				isVisibleMatGrp: false,
				isVisiblePurOrg: false,
				isVisibleCBy: false,
				isVisibleProdH: false

			});
			//data is ste to the visible model
			this.getView().setModel(oVisibleModel, "VisibleModel");

		},
			goHome: function(oEvent) {
			this.getRouter().navTo("StockTable");
		},
		datatime: function(dDate) {
			//returns complete date after calling this function
			var m = new Date(dDate);
			var dateString = m.getUTCFullYear() + "-" + (m.getUTCMonth() + 1) + "-" + m.getUTCDate() + "T" + m.getUTCHours() + ":" + m.getUTCMinutes() +
				":" + m.getUTCSeconds();

			return dateString;

		},
		OnSelectMonths: function(oEvent) {
			var ocheckModel = oView.getModel("oCheckModel");
			var checkBoxSelected = oEvent.getParameter("selected");

			var oselecttab = oEvent.oSource.mProperties.text;

			var CurrentD = new Date();

			if (oselecttab === "48 Hours") {
				var NextDay = new Date(new Date(CurrentD).getTime() - 60 * 60 * 48 * 1000);
				var first = CurrentD.toISOString().slice(0, 19);
				var last = NextDay.toISOString().slice(0, 19);

				//propery set to the model
				this.getView().getModel("oDataModel").setProperty("/FirstDate", first);
				this.getView().getModel("oDataModel").setProperty("/Message", oselecttab);

				this.getView().getModel("oDataModel").setProperty("/EndDate", last);

			} else if (oselecttab === "Current Month") {

				var firstDay = new Date(CurrentD.getFullYear(), CurrentD.getMonth(), 1);

				var lastDay = new Date(CurrentD.getFullYear(), CurrentD.getMonth() + 1, 0);

				var last1mon = firstDay.toISOString().slice(0, 19);
				var endo1mon = lastDay.toISOString().slice(0, 19);

				//propery set to the model
				oView.getModel("oDataModel").setProperty("/FirstDate", endo1mon);
				oView.getModel("oDataModel").setProperty("/Message", oselecttab);
				oView.getModel("oDataModel").setProperty("/EndDate", last1mon);

			} else if (oselecttab === "Previous 1 Month") {

				var Prevmonthstart = new Date().toISOString().slice(0, 19);
				CurrentD.setMonth(CurrentD.getMonth() - 1);
				var lastmonth = CurrentD.toISOString().slice(0, 19);
				//propery set to the model
				oView.getModel("oDataModel").setProperty("/FirstDate", Prevmonthstart);
				oView.getModel("oDataModel").setProperty("/EndDate", lastmonth);
				oView.getModel("oDataModel").setProperty("/Message", oselecttab);

			} else if (oselecttab === "Last 3 Months") {

				var dateString1 = new Date().toISOString().slice(0, 19);
				CurrentD.setMonth(CurrentD.getMonth() - 3);

				//var Last3Month = CurrentD.toISOString();
				var Last3Month = CurrentD.toISOString().slice(0, 19);
				//propery set to the model
				oView.getModel("oDataModel").setProperty("/FirstDate", dateString1);
				oView.getModel("oDataModel").setProperty("/EndDate", Last3Month);
				oView.getModel("oDataModel").setProperty("/Message", oselecttab);

			} else if (oselecttab === "Last 6 Months") {

				var dateString2 = new Date().toISOString().slice(0, 19);
				CurrentD.setMonth(CurrentD.getMonth() - 6);

				var Last3Month2 = CurrentD.toISOString().slice(0, 19);
				//propery set to the model
				oView.getModel("oDataModel").setProperty("/FirstDate", dateString2);
				oView.getModel("oDataModel").setProperty("/EndDate", Last3Month2);
				oView.getModel("oDataModel").setProperty("/Message", oselecttab);

			}

		},
		/*Po Search*/
		getPurchaseOrgList: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("VHeader");

			//get entity set
			BusyIndicator.show(true);
			oModel.read("/get_purchaseorg_f4helpSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
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
		handlePurchaseOrgVendor: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdPOD = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogporg) {
				this._valueHelpDialogporg = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.PurchaseOrg",
					this
				);
				this.getView().addDependent(this._valueHelpDialogporg);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogporg.getBinding("items").filter(new Filter([new Filter(
				"Ekorg",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Ekotx",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogporg.open(sInputValue);
			this.getPurchaseOrgList();
		},
		_handlePOrganiVendorSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Ekorg",
				FilterOperator.Contains, sValue
			), new Filter(
				"Ekotx",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handlePOrganiVendorClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputIdPOD),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);
		},

		/*PO Search end*/

		/* Sales order details f4 starts*/
		getSalesOrderDetails: function() {
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("StockModel");
			//get entity set
			oModel.read("/SalesOrdersSet ", {
				success: function(oData) {
					console.log(oData);
					SalesOrder = oData.results;
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
					//set the odata to model 
					oView.getModel("oSaleModel").setData(result);

					console.log(result);
				},

				error: function(oError) {
					//error handler code
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
		getTableStockDetails: function() {
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("StockModel");

			var ListofSrs = [];

			BusyIndicator.show(true);
			//get entity set
			oModel.read("/STOCK_DATASet", {
				success: function(oData) {
					BusyIndicator.hide();

					zStockMaterial = oData.results;

					var itemPO = oData.results.length;

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

						//set the odata to model 
						oView.getModel("oStockDataModel").setData(ListofSrs);

						var len = ListofSrs.length;
						var ls = len - 1;
						if (ListofSrs[ls].Color === 'red') {

							Massupload.push(ListofSrs[ls]);

						}

					}

				},
				error: function(oError) {
					//error handler code
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}

			});

		},

		ongetMaterialandVendor: function() {
			var msg = oView.getModel("oDataModel").getProperty("/Message");
			var oModel = this.getOwnerComponent().getModel("StockModel");
			var oDataModel = oView.getModel("oDataModel");
			//assiging model data to the variables
			var FirstDate = oDataModel.oData.FirstDate;
			var EndDate = oDataModel.oData.EndDate;
			var Matnr = oDataModel.oData.Material;
			var Material = oDataModel.oData.Material;
			var oVendor = oDataModel.oData.Vendor;
			var PurchaseOrg = oDataModel.oData.PurchaseOrg;
			var MatGrp = oDataModel.oData.MatGrp;
			var CreatedBy = oDataModel.oData.CBy;
			var ProdHierarchy = oDataModel.oData.ProdH;

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
			//create filters
			var oFilter1 = new sap.ui.model.Filter('Aedat', sap.ui.model.FilterOperator.EQ, EndDate);
			var oFilter2 = new sap.ui.model.Filter('Erdat2', sap.ui.model.FilterOperator.EQ, FirstDate);
			var oFilter3 = new sap.ui.model.Filter('Matnr', sap.ui.model.FilterOperator.EQ, Matnr);
			var oFilter4 = new sap.ui.model.Filter('Lifnr', sap.ui.model.FilterOperator.EQ, oVendor);
			var oFilter5 = new sap.ui.model.Filter('Ekorg', sap.ui.model.FilterOperator.EQ, PurchaseOrg);
			var oFilter6 = new sap.ui.model.Filter('Matkl', sap.ui.model.FilterOperator.EQ, MatGrp);
			var oFilter7 = new sap.ui.model.Filter('Ernam', sap.ui.model.FilterOperator.EQ, CreatedBy);
			var oFilter8 = new sap.ui.model.Filter('Prodh', sap.ui.model.FilterOperator.EQ, ProdHierarchy);

			if (PurchaseOrg === undefined) {

				//pass filters to the backend 
				oModel.read("/getBuyer_cheatsheetSet", {

					filters: [oFilter1, oFilter2, oFilter3, oFilter4],

					success: function(oData) {
						var that = this;
						var item = oData.results.length;
						var odata = oData.results;
						if (odata.length === 0) {
							if (msg === undefined) {
								MessageBox.error("Please Select Time Zone");
							} else {
								MessageBox.error("No Data Exist For The " + msg);
							}
						} else {

							if (Material !== "" || Material !== undefined) {
								for (var x = 0; x < SalesOrder.length; x++) {
									if (Material === SalesOrder[x].Matnr) {
										var Vbeln = SalesOrder[x].Vbeln;
										var Posnr = SalesOrder[x].Posnr;
										var Prodh = SalesOrder[x].Prodh;
										var SalesOrderQuant = SalesOrder[x].Lsmeng;

									}
								}
							}

							for (var itex = 0; itex < item; itex++) {
								odata[itex].Vbeln = Vbeln;
								odata[itex].Posnr = Posnr;
								odata[itex].Prodh = Prodh;
								odata[itex].SalesOrderQuant = SalesOrderQuant;

							}
							oView.getModel("oMonthlydataModel").setData(oData.results);
						}
					},
					error: function(err) {

					}

				});

			} else {
				//pass filters to the backend 
				oModel.read("/getBuyer_cheatsheetSet", {
					filters: [oFilter1, oFilter2, oFilter3, oFilter4, oFilter5, oFilter6, oFilter7, oFilter8],

					success: function(oData) {

						var item = oData.results.length;
						var odata = oData.results;

						if (odata.length === 0) {
							if (msg === undefined) {
								MessageBox.error("Please Select Time Zone");
							} else {
								MessageBox.error("No Data Exist For The " + msg);
							}
						} else {

							if (Material !== "" || Material !== undefined) {
								for (var x = 0; x < SalesOrder.length; x++) {
									if (Material === SalesOrder[x].Matnr) {
										var Vbeln = SalesOrder[x].Vbeln;
										var Posnr = SalesOrder[x].Posnr;
										var Prodh = SalesOrder[x].Prodh;
										var SalesOrderQuant = SalesOrder[x].Lsmeng;

									}
								}
							}

							for (var itex = 0; itex < item; itex++) {
								odata[itex].Vbeln = Vbeln;
								odata[itex].Posnr = Posnr;
								odata[itex].Prodh = Prodh;
								odata[itex].SalesOrderQuant = SalesOrderQuant;
							}

							oView.getModel("oMonthlydataModel").setData(oData.results);
						}
					},
					error: function(err) {
						MessageBox.error(err);
					}

				});

			}

		},

		getMaterialList: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(true);
			//get entity set
			oModel.read("/MaterialmasterSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oMaterialList = oData.results;
					var oLookupModel = that.getOwnerComponent().getModel("Lookup")
						//set the odata to model property
					oLookupModel.setProperty("/MaterialList", oMaterialList);
					oLookupModel.refresh(true);
					// that.getStockDetailList();
				},
				error: function(oError) {
					//error handler code
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

		},

		createColumnConfig: function() {
			var aCols = [];
			aCols.push({
				label: 'Purchase Order',
				property: 'Ebeln'

			});
			aCols.push({
				label: 'Sales Order',
				property: 'Vbeln'

			});

			aCols.push({
				label: 'Material Number',
				property: 'Matnr'

			});
			aCols.push({
				label: 'Material Description',
				property: 'Txz01'

			});
			aCols.push({
				label: 'Vendor Details',
				property: 'Lifnr'

			});
			aCols.push({
				label: 'Company Code',
				property: 'Bukrs'

			});
			aCols.push({
				label: 'Plant',
				property: 'Werks'

			});
			aCols.push({
				label: 'Storage Location',
				property: 'Lgort'

			});
			aCols.push({
				label: 'Created on',

				property: 'Aedat'

			});
			aCols.push({
				label: 'PO Date',

				property: 'Bedat'

			});

			aCols.push({
				label: 'Purchase Org',

				property: 'Ekorg'

			});

			aCols.push({
				label: 'GR Delivered Date',

				property: 'Eindt'

			});
			aCols.push({
				label: 'Total Quantity',

				property: 'Menge'

			});
			aCols.push({
				label: 'Delivered Quantity',

				property: 'Wemng'

			});
			aCols.push({
				label: 'Net Price',
				property: 'Netpr'

			});
			aCols.push({
				label: 'Product Hierarchy',
				property: 'Prodh'

			});
			aCols.push({
				label: 'Sales Order Quantity',
				property: 'SalesOrderQuant'

			});
			aCols.push({
				label: 'Sales Document Item',
				property: 'Posnr'

			});
			aCols.push({
				label: 'Created By',
				property: 'Ernam'

			});

			aCols.push({
				label: 'Material Group',
				property: 'Matkl'

			});

			return aCols;
		}

		,
		//function to download chart data into excel file
		onDownloadExcess: function() {
			var aCols, aProducts, oSettings, oSheet;

			aCols = this.createColumnConfig();
			//get property of the model
			aProducts = this.getView().getModel("oMonthlydataModel").getProperty('/');

			oSettings = {
				workbook: {
					columns: aCols
				},
				dataSource: aProducts
			};

			oSheet = new sap.ui.export.Spreadsheet(oSettings);
			//success message after the data download
			oSheet.build()
				.then(function() {
					MessageToast.show('Spreadsheet export has finished');
				})
				.finally(oSheet.destroy);
		},

		handleVendorValueHelpBox: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdVendor = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogDisplayV) {
				this._valueHelpDialogDisplayV = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.Display",
					this
				);
				this.getView().addDependent(this._valueHelpDialogDisplayV);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}
			// create a filter for the binding
			this._valueHelpDialogDisplayV.getBinding("items").filter(new Filter([new Filter(
				"Name1",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogDisplayV.open(sInputValue);
			// this.getVendorList();
		},

		_handleValueVendorHelpSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Name1",
				FilterOperator.Contains, sValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},

		_handleValueVendorHelpClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			var oModel = oView.getModel("Lookup");
			var oModelV = this.getOwnerComponent().getModel("VHeader");

			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputIdVendor),
					sDescription = oSelectedItem.getInfo();

				sProductInput.setSelectedKey(sDescription);
				sProductInput.setValue(sDescription);

			}
			evt.getSource().getBinding("items").filter([]);

		},

		/* material group start */
		getMatGrpList: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("StockModel");
			//get entity set
			oModel.read("/get_Matgrpf4listSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/MaterialGrp", oData.results);
					oLookupModel.refresh(true);
					console.log(oData);
				},
				error: function(oError) {
					//error handler code
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}

			});
		},

		handleMatGrp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdMatGrp = oEvent.getSource().getId();

			if (!this._valueHelpMatGrp) {
				this._valueHelpMatGrp = sap.ui.xmlfragment(
					"com.vSimpleApp.fragment.Stock.MaterialGrpf4",
					this
				);
				this.getView().addDependent(this._valueHelpMatGrp);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpMatGrp.getBinding("items").filter(new Filter([new Filter(
				"Matkl",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Matkl",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpMatGrp.open(sInputValue);
			this.getMatGrpList();
		},

		_handleMatGrpSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Matkl",
				FilterOperator.Contains, sValue
			), new Filter(
				"Matkl",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleMatGrpClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputIdMatGrp),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);
		},
		/*material group end*/

		/*Created by */

		getCreatedByList: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("StockModel");
			//get entity set
			oModel.read("/get_CreatedByf4listSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/CreatedBy", oData.results);
					oLookupModel.refresh(true);
					console.log(oData);
				},
				error: function(oError) {
					//error handle code
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}

			});
		},

		handleCreatedBy: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdCby = oEvent.getSource().getId();

			if (!this._valueCBY) {
				this._valueCBY = sap.ui.xmlfragment(
					"com.vSimpleApp.fragment.Stock.CreatedBy",
					this
				);
				this.getView().addDependent(this._valueCBY);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueCBY.getBinding("items").filter(new Filter([new Filter(
				"Ernam",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Ernam",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueCBY.open(sInputValue);
			this.getCreatedByList();
		},

		_handleCreatedBySearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Ernam",
				FilterOperator.Contains, sValue
			), new Filter(
				"Ernam",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleCreatedByClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputIdCby),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);
		},
		/*material group end*/
		/*product hierarchy*/

		getProductHierarchyList: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("StockModel");
			//get entity set
			oModel.read("/get_ProductHierarachyf4listSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/ProductHierarchy", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					//error handle code
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}

			});
		},

		handleProductHierarchy: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdPH = oEvent.getSource().getId();

			if (!this._valueProductHierarchy) {
				this._valueProductHierarchy = sap.ui.xmlfragment(
					"com.vSimpleApp.fragment.Stock.ProductHierarchy",
					this
				);
				this.getView().addDependent(this._valueProductHierarchy);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueProductHierarchy.getBinding("items").filter(new Filter([new Filter(
				"Prodh",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Vtext",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueProductHierarchy.open(sInputValue);
			this.getProductHierarchyList();
		},

		_handleProductHierarchySearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Prodh",
				FilterOperator.Contains, sValue
			), new Filter(
				"Vtext",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleProductHierarchyClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputIdPH),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);
		},

		onShowInput: function(oEvent) {
			var VisModel = oView.getModel("VisibleModel");
			var ocheckModel = oView.getModel("oCheckBox");

			var oselecttab = oEvent.oSource.mProperties.text;
			var selected = oEvent.getParameter("selected");
			if (oselecttab === "Material") {

				if (selected) {
					VisModel.setProperty("/isVisibleMat", true);

				} else {
					VisModel.setProperty("/isVisibleMat", false);

				}

			} else if (oselecttab === "Vendor") {

				if (selected) {
					VisModel.setProperty("/isVisibleVen", true);

				} else {
					VisModel.setProperty("/isVisibleVen", false);

				}
			} else if (oselecttab === "Purchase org") {
				if (selected) {
					VisModel.setProperty("/isVisiblePurOrg", true);

				} else {
					VisModel.setProperty("/isVisiblePurOrg", false);

				}
			} else if (oselecttab === "Material Group") {
				if (selected) {
					VisModel.setProperty("/isVisibleMatGrp", true);

				} else {
					VisModel.setProperty("/isVisibleMatGrp", false);

				}
			} else if (oselecttab === "Created by") {
				if (selected) {
					VisModel.setProperty("/isVisibleCBy", true);

				} else {
					VisModel.setProperty("/isVisibleCBy", false);

				}
			} else if (oselecttab === "Product hierarchy") {

				if (selected) {
					VisModel.setProperty("/isVisibleProdH", true);

				} else {
					VisModel.setProperty("/isVisibleProdH", false);

				}
			} else if (oselecttab === "Basic Filter") {

				VisModel.setProperty("/isVisibleMat", true);
				VisModel.setProperty("/isVisibleVen", true);
				ocheckModel.setProperty("/Advance", false);
				ocheckModel.setProperty("/Basic", true);
				VisModel.setProperty("/isVisiblePurOrg", false);
				VisModel.setProperty("/isVisibleMatGrp", false);
				VisModel.setProperty("/isVisibleCBy", false);
				VisModel.setProperty("/isVisibleProdH", false);
				var oModel = oView.getModel("oDataModel");
              
				var oData = oModel.getData();
				
		
				oModel.setData({
					CBy: "",
					EndDate: oData.EndDate,
					FirstDate: oData.FirstDate,
					MatGrp: "",
					Material: oData.Material,
					Message: oData.Message,
					ProdH: "",
					PurchaseOrg: "",
					Vendor: oData.Vendor
				});

			
			} else if (oselecttab === "Advance Filter") {

				ocheckModel.setProperty("/Basic", false);
				ocheckModel.setProperty("/Advance", true);
				VisModel.setProperty("/isVisibleMat", true);
				VisModel.setProperty("/isVisibleVen", true);
				VisModel.setProperty("/isVisiblePurOrg", true);
				VisModel.setProperty("/isVisibleMatGrp", true);
				VisModel.setProperty("/isVisibleCBy", true);
				VisModel.setProperty("/isVisibleProdH", true);
	
			}
		

		},
		onMenuButtonPress: function() {
			//navigate to stock table screen
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("StockTable");
		}

	});

});