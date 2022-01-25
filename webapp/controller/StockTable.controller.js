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
	"com/vSimpleApp/model/formatter",
	"com/vSimpleApp/model/RebateConditionItemPO",
	"com/vSimpleApp/model/PurchaseHeader",
	"com/vSimpleApp/model/StockContract",
	'sap/m/Link',
	'sap/m/MessageItem',
	'sap/m/MessageView',
	'sap/m/Popover',
	'sap/m/Bar',
	'sap/ui/core/IconPool',
		"com/vSimpleApp/Classes/ServiceF4"
], function(Controller, ColumnListItem, jQuery, MessageToast, MessageBox, History, BusyIndicator, JSONModel, library, Input, Fragment,
	Filter, FilterOperator, Button, Toolbar, Dialog, DialogType, ButtonType, Label, Text, TextArea, Core, formatter, RebateConditionItemPO,
	PurchaseHeader, StockContract, Link, MessageItem, MessageView, Popover, Bar, IconPool,ServiceF4) {
	"use strict";
	var oView, oComponent,
		sPathThreshold,
		PoDocumentNumber = [];
	var groups, StockTransfer = [];
	var Massupload = [];
	
	var ChildarrIndex = [];
	var itemindex = [];
	var StockList;
	var spathh;
	var sPathSingle, sPathHierarchy;
	var oController;
	var oMaterialList = [];
	var allfiltersLevelFirst = [],
		allfiltersLevelSecond = [];
	var result = [];
	var CompanyLevelset = [];
	var TotalLabst = [];
	var PoQuantity = [];
	var Totalsaleset = [];
	var EventArray = [];
	var UniqueMatnrGlobal = [];
		var Service = new ServiceF4();
	return Controller.extend("com.vSimpleApp.controller.StockTable", {
		//formatter: formatter,
		formatter: formatter,

		onInit: function() {
			oController = this;
			oView = this.getView();
			var oModel = this.getOwnerComponent().getModel("StockModel");

			oComponent = this.getOwnerComponent();
			//set the model on view to be used by the UI controls
			this.getView().setModel(oModel);

			//	this.getMaterialstockSet();

			this.getPodetailsset();
			this.getRunRate();
			this.getSalesOrderDetails();
			var collectionItemMode = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(collectionItemMode, "collectionItemMode");

			this.getMainGroupList();

			var oProductListMode = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(oProductListMode, "oProductListMode");

			var oProductGroup = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(oProductGroup, "oProductGroup");

			var oAddProductData = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(oAddProductData, "oAddProductModel");

			var oProdSubGrp = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(oProdSubGrp, "oProdSubGrp");

			var onThresholdModel = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(onThresholdModel, "ThresholdModel");

			var oMatData = new JSONModel();
			oView.setModel(oMatData, "MatData");
			this.getStockDetailListNew();

			var oExcessModelData = new JSONModel();
			sap.ui.getCore().setModel(oExcessModelData, "oExcessDataModel");
			var oExcessHierarchy = new JSONModel();
			oView.setModel(oExcessHierarchy, "oExcessHierarchy");

			var oAutoPoCreation = new JSONModel();
			oView.setModel(oAutoPoCreation, "AutoPoData");

			var oHierarchyData = new JSONModel();
			oView.setModel(oHierarchyData, "HierarchyData");

			var oStocktempData = new JSONModel();
			oView.setModel(oStocktempData, "oStocktempData");
			var oSelectedData = new JSONModel();
			oView.setModel(oSelectedData, "oSelectedTabdata");

			var oCheckedModel = new sap.ui.model.json.JSONModel({
				Material: true,
				Hierarchy: false,
				MaterialGroup: false,
				ClearHier: false,
				MaterialInput: true,
				PlantInput: true

			});
			oView.setModel(oCheckedModel, "oCheckModel");
			var oVisibleModel = new JSONModel({
				MainGrp: false,
				Grp: false,
				SubGrp: false,
				Plant: true,
				Material: true,
				MatDiscp: true,

				MaterialTable: true,
				ProductHirarchyTable: false

			});

			this.getView().setModel(oVisibleModel, "VisibleModel");

			var oHierarchyItems = new JSONModel({

			});

			sap.ui.getCore().setModel(oHierarchyItems, "oHierarchyItems");

			var AddIteamModel = new sap.ui.model.json.JSONModel();
			AddIteamModel.loadData("utils/ItemChoice.json");
			sap.ui.getCore().setModel(AddIteamModel, "AddIteamModel");

			var oSaleModel = new JSONModel();
			sap.ui.getCore().setModel(oSaleModel, "oSaleModel");
			// this.getSalesOrderDetails();

			this.initializeView();

			var oCompanyLevel = new JSONModel();
			sap.ui.getCore().setModel(oCompanyLevel, "oCompanyLevel");

			var oPoData = new JSONModel();
			oView.setModel(oPoData, "oPoData");
		},
			goHome: function(oEvent) {
					this.getOwnerComponent().getRouter().navTo("ShowTiles");
		
		},
		initializeView: function() {
			/*	define  collectionItemMode  model which  which is used for the which level we can select,
				if selected level is this then return true  otherwise return false
			*/
			var collectionItemMode = sap.ui.getCore().getModel("collectionItemMode");
			collectionItemMode.setProperty("/Main-Group", false);
			collectionItemMode.setProperty("/Group", false);
			collectionItemMode.setProperty("/Sub-Group", false);
			//collectionItemMode.setProperty("/Model", false);
			collectionItemMode.setProperty("/MaterialNumber", false);
			collectionItemMode.setProperty("/MaxHierarchy", 0);

			if (this.itemId === undefined) {
				collectionItemMode.setProperty("/ListSelection", "MultiSelect");
			} else {
				collectionItemMode.setProperty("/ListSelection", "SingleSelectLeft");
			}

			//define the odata model for material number
			var MaterialModel = new sap.ui.model.json.JSONModel({
				"ListItems": []
			});
			this.getView().setModel(MaterialModel, "MaterialModel");
		},
		onPressPoDecision: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			oRouter.navTo("PoDecision");
			var table = this.byId("TreeTableBasic2");
			table.clearSelection();
		},

		getStockDetailListNew: function() {

			var oModel = this.getOwnerComponent().getModel("StockModel");
			var that = this;
			BusyIndicator.show(true);
			oModel.read("/STOCK_DATASet", {
				success: function(oData) {
					BusyIndicator.hide();

					var ListofSrs = [];

					var len = oData.results.length;
					var childarray = [];
					var InnerChild = [];
					var InnerinnerChild = [];
					var UniqueMatnr = [];
					var UniqueWerks = [];

					StockList = oData.results;
					var filterObj = {
						plant: [],
						cc: [],
						stloc: []
					};

					function userExists(Bukrs) {
						return childarray.some(function(el) {
							return el.Bukrs === Bukrs;
						});
					}

					function PlantExits(Plant) {
						return InnerChild.some(function(el) {
							return el.Plant === Plant;
						});
					}

					function StorageExits(Lgort) {
						return InnerinnerChild.some(function(el) {
							return el.Lgort === Lgort;
						});
					}

					var iItem = oData.results.length;
					var ListItem = [];
					for (var iRowIndex = 0; iRowIndex < iItem; iRowIndex++) {

						var Matnr = oData.results[iRowIndex].Matnr;
						ListItem.push({
							Matnr: Matnr

						});
					}
					var index = {};

					ListItem.forEach(function(point) {
						var key = "" + point.Matnr + " ";
						if (key in index) {
							index[key].count++;
						} else {
							var newEntry = {
								Matnr: point.Matnr,
								Labst: "",
								count: 1
							};
							index[key] = newEntry;
							TotalLabst.push(newEntry);
						}
					});

					TotalLabst.sort(function(a, b) {
						return b.count - a.count;
					});

					var data = oData.results;

					for (var x = 0; x < TotalLabst.length; x++) {
						var orderCount = 0;
						for (var j = 0; j < data.length; j++) {
							if (TotalLabst[x].Matnr === data[j].Matnr) {
								orderCount = orderCount + parseInt(data[j].Labst);
								TotalLabst[x].Labst = orderCount.toString();
							}

						}

					}

					for (var iRowIndex = 0; iRowIndex < len; iRowIndex++) {

						var odataset = oData.results[iRowIndex];
						var Werks = odataset.Werks;

						var Cbtlv = odataset.Cbtlv;
						var Cgtlv = odataset.Cgtlv;
						var Cytlv = odataset.Cytlv;
						var Changedon = odataset.Changedon;
						var Crtlv = odataset.Crtlv;
						var Labst = odataset.Labst;

						var Description = odataset.Maktx;
						//var openpo = PoDocumentNumber[iRowIndex].Bedat;
						var Matnr = odataset.Matnr;

						var Bukrs = odataset.Bukrs;

						var Lbkum = odataset.Lbkum;
						var Lgort = odataset.Lgort;

						if (Matnr !== "" || Matnr !== undefined) {
							for (var z = 0; z < TotalLabst.length; z++) {
								if (Matnr === TotalLabst[z].Matnr) {
									var sTotalLabst = TotalLabst[z].Labst;

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
						if (Matnr !== "" || Matnr !== undefined) {
							for (var x2 = 0; x2 < PoQuantity.length; x2++) {

								if (Matnr === PoQuantity[x2].Matnr) {
									var sOpenPoQuantity = PoQuantity[x2].Menge;
									var sOpenPoDate = PoQuantity[x2].Prdat;
									var sDocDate = PoQuantity[x2].Bedat;

								}
							}
						}

						if (Matnr !== "" || Matnr !== undefined) {
							for (var k = 0; k < Totalsaleset.length; k++) {

								if (Matnr === Totalsaleset[k].Matnr) {
									var sRunRate = Totalsaleset[k].Kwmeng;
								}
								// else if(Matnr !== Totalsaleset[k].Matnr){
								// 	var sRunRate ="NA";
								// }
							}
						}

						if (!UniqueMatnr.includes(Matnr)) {
							UniqueMatnr.push(Matnr);
							UniqueMatnrGlobal.push(Matnr);
							ListofSrs.push({
								Cbtlv: Cbtlv,
								Cgtlv: Cgtlv,
								Cytlv: Cytlv,
								Changedon: Changedon,
								Crtlv: Crtlv,

								Labst: parseInt(sTotalLabst),
								ALabst: parseInt(sTotalLabst),
								Material: Matnr,
								ShortText: Description,
								Plant: Werks,
								Color: "",
								MultipleIt: childarray,
								OsalesOrder: sOpenSalesOrder,
								OpenPODate: sOpenPoDate,
								OpenPOQty: sOpenPoQuantity,
								DocDate: sDocDate,
								RunRate: sRunRate,

							});

							for (var j = 0; j < StockList.length; j++) {
								var stock = StockList[j];
								var Bukrs1 = stock.Bukrs;
								var Lbkum1 = stock.Lbkum;
								var Labst1 = stock.Labst;
								var Lgort1 = stock.Lgort;
								var Werks1 = stock.Werks;
								var Matnr1 = stock.Matnr;

								if (Matnr === Matnr1) {
									//	console.log(sum);

									if (userExists(Bukrs1)) {

										for (var j = 0; j < StockList.length; j++) {
											var stock = StockList[j];
											var Bukrs2 = stock.Bukrs;
											var Lbkum2 = stock.Lbkum;
											var Labst2 = stock.Labst;
											var Lgort2 = stock.Lgort;
											var Werks2 = stock.Werks;
											var Matnr2 = stock.Matnr;
											if (Matnr === Matnr2) {
												var UniqueStrLoc = [];
												if (PlantExits(Werks2)) {
													// if (UniqueStrLoc.includes(Lgort2)) {
													// 												InnerinnerChild.push({
													// 															//	Bukrs: Bukrs,
													// 															Labst: Labst2,
													// 															Material: 'SLoc' + " " + Lgort2,
													// 															Crtlv: "crtlv",
													// 															Cytlv: "cytlv",
													// 															Cgtlv: "cgtlv",
													// 															Cbtlv: "cbtlv",
													// 															OsalesOrder: "So",
													// 															Lgort: Lgort2

													// 														});
													// }

													// for (var j = 0; j < StockList.length; j++) {
													// 	var stock = StockList[j];
													// 	var Bukrs3 = stock.Bukrs;
													// 	var Lbkum3 = stock.Lbkum;
													// 	var Labst3 = stock.Labst;
													// 	var Lgort3 = stock.Lgort;
													// 	var Werks3 = stock.Werks;
													// 	var Matnr3 = stock.Matnr;
													// 	if (Matnr === Matnr3) {

													// 		if (StorageExits(Lgort3)) {

													// 		}else{
													// 						InnerinnerChild.push({
													// 					//	Bukrs: Bukrs,
													// 					Labst: Labst2,
													// 					Material: 'SLoc' + " " + Lgort2,
													// 					Crtlv: "crtlv",
													// 					Cytlv: "cytlv",
													// 					Cgtlv: "cgtlv",
													// 					Cbtlv: "cbtlv",
													// 					OsalesOrder: "So",
													// 					Lgort: Lgort2

													// 				});
													// 		}
													// 	}
													// }

												} else {
													InnerChild.push({
														//	Bukrs: Bukrs,
														//	Lgort: Lgort,
														Material: 'Plant' + " " + Werks2,
														Plant: Werks2,
														MultipleIt: InnerinnerChild,
														OpenPOQty: sOpenPoQuantity,
														// OsalesOrder: "So",
														Crtlv: "crtlv",
														Cytlv: "cytlv",
														Cgtlv: "cgtlv",
														Cbtlv: "cbtlv",
														// RunRate: sRunRate

													});

													//if (!UniqueStrLoc.includes(Lgort2)) {
													InnerinnerChild.push({
														//	Bukrs: Bukrs,
														Labst: Labst2,
														Material: 'SLoc' + " " + Lgort2,
														Crtlv: "crtlv",
														Cytlv: "cytlv",
														Cgtlv: "cgtlv",
														Cbtlv: "cbtlv",
														// OsalesOrder: "So",	
														Lgort: Lgort2

													});
													//}
												}
											}
											//PlantExits(Plant)
										}

									} else {
										childarray.push({
											Bukrs: Bukrs1,
											BLabst: "AL",
											ALabst: " ",
											Labst: sTotalLabst,
											Material: 'Company Level' + " " + Bukrs,
											Crtlv: "crtlv",
											Cytlv: "cytlv",
											Cgtlv: "cgtlv",
											Cbtlv: "cbtlv",
											// OsalesOrder: sOpenSalesOrder,

											//	Lgort: Lgort,
											//	Werks: Werks,
											MultipleIt: InnerChild,
											OpenPODate: sOpenPoDate,
											// OpenPOQty:sOpenPoQuantity,
											DocDate: sDocDate

										});
										sOpenSalesOrder = "";
										sOpenPoDate = "";

										sDocDate = "";

										InnerChild.push({
											//	Bukrs: Bukrs,
											// Labst: Labst,
											//	Lgort: Lgort,
											Material: 'Plant' + " " + Werks1,
											Crtlv: "crtlv",
											Cytlv: "cytlv",
											Cgtlv: "cgtlv",
											Cbtlv: "cbtlv",
											Plant: Werks1,
											MultipleIt: InnerinnerChild,
											OpenPOQty: sOpenPoQuantity,
											// OsalesOrder: "So",
											// RunRate: sRunRate

										});
										sOpenPoQuantity = "";
										sRunRate = "";

										InnerinnerChild.push({
											//	Bukrs: Bukrs,
											Labst: Labst1,
											Crtlv: "crtlv",
											Cytlv: "cytlv",
											Cgtlv: "cgtlv",
											Cbtlv: "cbtlv",

											Material: 'SLoc' + " " + Lgort1,
											// OsalesOrder: "So",
											Lgort: Lgort1

										});

									}

								}
							}
							InnerChild = [];
							InnerinnerChild = [];
							childarray = [];

						}

					}
					oView.getModel("oStockDataModel").setSizeLimit(ListofSrs.length);
					oView.getModel("oStockDataModel").setData(ListofSrs);

					that.getOwnerComponent().getModel("ColorStateModel").setData(ListofSrs);

					Massupload = ListofSrs;
					that.getOwnerComponent().getModel("oTransferMod").setData(ListofSrs);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		getPodetailsset: function(evt) {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			BusyIndicator.show(true);
			oModel.read("/podetails_forzstockSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var data = oData.results;

					PoQuantity = data;
					},

				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}

			});
			//	this.getSalesOrderDetails();
		},

		getMaterialstockSet: function() {
			BusyIndicator.show(true);
			var oModel = this.getOwnerComponent().getModel("StockModel");

			oModel.read('/getMaterialstockSet', {
				success: function(odata) {
					StockList = odata.results;

					var iItem = odata.results.length;
					var aListItem = [];
					for (var iRowIndex = 0; iRowIndex < iItem; iRowIndex++) {

						var Matnr = odata.results[iRowIndex].Matnr;
						aListItem.push({
							Matnr: Matnr
						});
					}
					var index = {};

					aListItem.forEach(function(point) {
						var key = "" + point.Matnr + " ";
						if (key in index) {
							index[key].count++;
						} else {
							var newEntry = {
								Matnr: point.Matnr,
								Labst: "",
								count: 1
							};
							index[key] = newEntry;
							TotalLabst.push(newEntry);
						}
					});

					TotalLabst.sort(function(a, b) {
						return b.count - a.count;
					});

					var data = odata.results;

					for (var x = 0; x < TotalLabst.length; x++) {
						var orderCount = 0;
						for (var j = 0; j < data.length; j++) {
							if (TotalLabst[x].Matnr === data[j].Matnr) {
								orderCount = orderCount + parseInt(data[j].Labst);
								TotalLabst[x].Labst = orderCount.toString();
							}

						}

					}
					},
				error: function(oerror) {
					MessageBox.error(oerror);
				}

			});

		},

		onExpandFirstLevel: function() {
			var oTreeTable = this.byId("TreeTableBasic2");
			oTreeTable.expandToLevel(1);
		},

		onExpandSelection: function() {
			var oTreeTable = this.byId("TreeTableBasic2");
			oTreeTable.expand(oTreeTable.getSelectedIndices());
		},
		onCollapseAll: function() {
			var oTreeTable = this.byId("TreeTableBasic2");
			oTreeTable.collapseAll();
		},

		onAnalytics: function(oEvent) {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Analytics");
			var oTable = this.byId("TreeTableBasic2");
			oTable.clearSelection();
		},
		BuyerSheetChat: function(oEvent) {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("BuyerSheet");
			var oTable = this.byId("TreeTableBasic2");
			oTable.clearSelection();
		},
		onFilterSelect: function(oEvent) {
			var oBinding = this.byId("TreeTableBasic2").getBinding("rows"),
				//	var oBinding1 = this.getView().byId("TreeTableBasic2").getBinding("rows");
				oText = oEvent.getSource();
			var sKey = oText.mProperties.text;

			var aFilters = [],
				ShowColor;

			if (sKey === "Critical") {
				ShowColor = new sap.ui.model.Filter('Color', sap.ui.model.FilterOperator.EQ, "red");
			} else if (sKey === "Excess") {
				ShowColor = new sap.ui.model.Filter('Color', sap.ui.model.FilterOperator.EQ, "blue");
			} else if (sKey === "All") {
				ShowColor = new sap.ui.model.Filter('Color');
			} else if (sKey === "Green") {
				ShowColor = new sap.ui.model.Filter('Color', sap.ui.model.FilterOperator.EQ, "green");
			} else if (sKey === "Warning") {
				ShowColor = new sap.ui.model.Filter('Color', sap.ui.model.FilterOperator.EQ, "yellow");
			}
			aFilters.push(new Filter([ShowColor], false));
			oBinding.filter(aFilters);
			//	oBinding.filter('Color', null);
		},

		onFilterSelectHierarchy: function(oEvent) {
			var oBinding = this.byId("awaitingTable2").getBinding("items"),
				sText = oEvent.getSource();
			var sKey = sText.mProperties.text,
				sKey = oEvent.getParameter("text"),

				aFilters = [],
				ShowColor;

			if (sKey === "Critical") {
				ShowColor = new sap.ui.model.Filter('Color', sap.ui.model.FilterOperator.EQ, "red");
			} else if (sKey === "Excess") {
				ShowColor = new sap.ui.model.Filter('Color', sap.ui.model.FilterOperator.EQ, "blue");
			} else if (sKey === "All") {
				ShowColor = new sap.ui.model.Filter('Color');
			} else if (sKey === "Green") {
				ShowColor = new sap.ui.model.Filter('Color', sap.ui.model.FilterOperator.EQ, "green");
			} else if (sKey === "Warning") {
				ShowColor = new sap.ui.model.Filter('Color', sap.ui.model.FilterOperator.EQ, "yellow");
			}
			aFilters.push(new Filter([ShowColor], false));
			oBinding.filter(aFilters);

		},
		OnclearFilterHierarchy: function(oEvent) {

			var oTable = oView.byId("awaitingTable2");
			oTable.setBusy(true);
			this.getHierarchy();
			oTable.setBusy(false);
		},
		OnclearFilter: function(oEvent) {

			/*	var tbl = oView.byId("TreeTableBasic2");
				tbl.setBusy(true);
				this.getStockDetailList();
				tbl.setBusy(false);*/
			//getmodel and clear data
			var oMatModel = oView.getModel("MatData");
			oMatModel.refresh(true);

			oMatModel.setData({
				oData: {}
			});
			oMatModel.updateBindings(true);
			//reload the page using 
			window.location.reload();
		},

		//	return new Promise ( function(ee,we){

		getPurchaseOrder: function(critstate) {
			var oModels = this.getOwnerComponent().getModel("PurchaseSet");
			return new Promise(function(resolve, reject) {
			//	return new Promise(function(res,rej){
				var lsb = critstate.length - 1;
				//	return new Promise(function(res4,rej4){
				//	for(var i=0 ; i<critstate.length ; i++){
				var sMaterial = critstate[lsb].Matnr,
					sShorttext = critstate[lsb].Description,
					sPlant = critstate[lsb].Werks;
				var ld = 0;
				var oPurchaseModel = oView.getModel("PurchaseModel");
				var oContract = oPurchaseModel.getProperty("/TempContract");
				var oRequestPayload = oContract.getPayloadRefill();
				oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + ld + " /Ematerial", sMaterial);
				oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + ld + " /Material", sMaterial);
				oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + ld + " /ShortText", sShorttext);
				oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + ld + " /Plant", sPlant);
				oModels.create("/PoDisplaySet", oRequestPayload, {
					success: function(oRes, obj) {
				
						//resolve("Sucess promiss");
					},

					error: function(Error) {

						//reject(Error);
					}
				});

			});

	
		},
		//	});

		/*Material Number Search start*/
		getMaterialList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(true);
			oModel.read("/MaterialmasterSet", {
				success: function(oData) {
					BusyIndicator.hide();
					oMaterialList = oData.results;
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
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

		handlePOMaterialHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			sap.ui.getCore().StockTabMat = oEvent.getSource().getId();
			// eate value help dialog
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
				var productInput = sap.ui.getCore().byId(sap.ui.getCore().StockTabMat),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				var div = oSelectedItem.getDescription();
				productInput.setValue(sTitle);
			}

		},

		handleMaterialHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			sap.ui.getCore().inputIdMaterial = oEvent.getSource().getId();
			//create value help dialog
			if (!this._valueHelpMaterial) {
				this._valueHelpMaterial = sap.ui.xmlfragment(
					"com.vSimpleApp.fragment.Stock.MaterialNumber",
					this
				);
				this.getView().addDependent(this._valueHelpMaterial);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpMaterial.getBinding("items").filter(new Filter([new Filter(
				"Materialno",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpMaterial.open(sInputValue);
		},
		_handleMaterialSearch: function(evt) {
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

		_handleMaterialClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");

			if (oSelectedItem) {
				var productInput = sap.ui.getCore().byId(sap.ui.getCore().inputIdMaterial);
				productInput.setValue(oSelectedItem.getTitle());
				var sTitle = oSelectedItem.getTitle();
				var sDescription = oSelectedItem.getInfo();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);

		},
		/*Material SEarch end*/

		/*Plant search start */
	

		_handlePlantClose: function(evt) {
			var oMatModel = oView.getModel("MatData");

			var sMaterialno = oMatModel.oData.Material;
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId);
				productInput.setValue(oSelectedItem.getTitle());
				var oModel = this.getOwnerComponent().getModel("StockModel");
				var sPlant = oSelectedItem.getTitle();

				var oTreeModel = this.getOwnerComponent().getModel("oStockDataModel");
				var oTablen = oTreeModel.oData;
				var oList = [];
				var stock;
				for (var i = 0; i < oTablen.length; i++) {
					var oMat = oTablen[i].Material;

					if (oMat == sMaterialno) {
						var odata = i;

						stock = oTreeModel.getProperty('/' + odata);
						break;
					}
				}
				oList.push(stock);

				oView.getModel("oStockDataModel").setData(oList);

				evt.getSource().getBinding("rows").filter([]);
			}
		},
		handleValueHelpPlant: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogp) {
				this._valueHelpDialogp = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.Plant",
					this
				);
				this.getView().addDependent(this._valueHelpDialogp);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogp.getBinding("items").filter(new Filter([new Filter(
				"Werks",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Name1",
				FilterOperator.Contains, sInputValue
			)]));
		//	this.getPOPlant();
			//	var Service = new ServiceF4();
			Service.getPOPlant(this);
			// open value help dialog filtered by the input value
			this._valueHelpDialogp.open(sInputValue);

		},
		_handlePlantSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Werks",
				FilterOperator.Contains, sValue
			), new Filter(
				"Name1",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},

		_handleAddPlantClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = sap.ui.getCore().byId(sap.ui.getCore().inputIdAddPlant);
				productInput.setValue(oSelectedItem.getTitle());
				var sPlant = oSelectedItem.getTitle();

				evt.getSource().getBinding("items").filter([]);
			}
		},

		handleValueHelpAddPlant: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();
			sap.ui.getCore().inputIdAddPlant = oEvent.getSource().getId();

			// create value help dialog
			if (!this._valueHelpDialogpp) {
				this._valueHelpDialogpp = sap.ui.xmlfragment(
					"com.vSimpleApp.fragment.Stock.Plant",
					this
				);
				this.getView().addDependent(this._valueHelpDialogpp);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogpp.getBinding("items").filter(new Filter([new Filter(
				"Werks",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Name1",
				FilterOperator.Contains, sInputValue
			)]));
		//	this.getPOPlant();
			//var Service = new ServiceF4();
			Service.getPOPlant(this);
			// open value help dialog filtered by the input value
			this._valueHelpDialogpp.open(sInputValue);

		},
		_handlePlantAddSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Werks",
				FilterOperator.Contains, sValue
			), new Filter(
				"Name1",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		/*plant search end*/

		onPressMaterialEdit: function(oEvent) {
			var oRow = oEvent.getSource().getParent();
			var oBindingContext = oRow.getBindingContext('oStockDataModel');
			var oBindingModel = oBindingContext.getModel();
			sPathThreshold = oBindingContext.getPath();

			var oSelectedRecord = oBindingModel.getProperty(sPathThreshold);

			//	oView.getModel("oSelectedTabdata").setData(oSelectedRecord);
			var SingleSelectData = new JSONModel();
			SingleSelectData.setData(oSelectedRecord);
			oView.setModel(SingleSelectData);

			sap.ui.getCore().setModel(SingleSelectData, "SingleSelectData");
			oView.getModel("oSelectedTabdata").setData(SingleSelectData);

			this.pressDialogOpn = this.getView().byId("EditDialog");
			if (!this.pressDialogOpn) {
				this.pressDialogOpn = sap.ui.xmlfragment("com.vSimpleApp.fragment.Stock.EditData", this);

				this.pressDialogOpn.open();
			}
		},
		onPressProdHieEdit: function(oEvent) {
			var oRow = oEvent.getSource().getParent();
			var oBindingContext = oRow.getBindingContext('HierarchyData');
			var oBindingModel = oBindingContext.getModel();
			sPathThreshold = oBindingContext.getPath();
			var oSelectedRecord = oBindingModel.getProperty(sPathThreshold);
			var SingleSelectData = new JSONModel();
			SingleSelectData.setData(oSelectedRecord);
			oView.setModel(SingleSelectData);

			sap.ui.getCore().setModel(SingleSelectData, "SingleSelectData");
			oView.getModel("oSelectedTabdata").setData(SingleSelectData);

			this.pressDialogProdHi = this.getView().byId("ProdEditDialog");
			if (!this.pressDialogProdHi) {
				this.pressDialogProdHi = sap.ui.xmlfragment("com.vSimpleApp.fragment.Stock.ProdHierEdit", this);
				//this.getView().addDependent(pressDialog);
				//  this.pressDialog.setModel(this.getView().getModel());
				this.pressDialogProdHi.open();
			}
		},

		onCloseEditProd: function() {
			//close dialog box
			this.pressDialogProdHi.close();
			this.pressDialogProdHi.destroy();
		},
		onCloseFu: function() {
			//close dialog box
			this.pressDialogOpn.close();
			this.pressDialogOpn.destroy();
		},

		onSaveThreshold: function() {

			var oModel = oView.getModel("oStockDataModel");
			var oModelService = this.getOwnerComponent().getModel("StockModel");
			var oTabSelectModel = oView.getModel("oSelectedTabdata");
			var sPath = sPathThreshold;
			var oInput = sap.ui.getCore().byId("idNewValue");
			var sValue = oInput.getValue();

			var pattern = /[^\d]/;
			if (pattern.test(sValue)) {
				oInput.setValueState("Error");
				oInput.setValueStateText("Enter Numeric Value");
			} else {

				var sSelectTdLevel = sap.ui.getCore().byId('SelectTdlevel').getSelectedKey();

				if (sSelectTdLevel === "Red") {
					var sCurrent = oTabSelectModel.oData.oData.Crtlv;
					oView.getModel("oStockDataModel").setProperty(sPath + "/Prtlv", sCurrent);
					oView.getModel("oStockDataModel").setProperty(sPath + "/Crtlv", sValue);

				} else if (sSelectTdLevel === "Green") {
					var sCurrent = oTabSelectModel.oData.oData.Cgtlv;
					oView.getModel("oStockDataModel").setProperty(sPath + "/Pgtlv", sCurrent);
					oView.getModel("oStockDataModel").setProperty(sPath + "/Cgtlv", sValue);

				} else if (sSelectTdLevel === "Yellow") {
					var sCurrent = oTabSelectModel.oData.oData.Cytlv;
					oView.getModel("oStockDataModel").setProperty(sPath + "/Pytlv", sCurrent);
					oView.getModel("oStockDataModel").setProperty(sPath + "/Cytlv", sValue);

				} else if (sSelectTdLevel === "Blue") {
					var sCurrent = oTabSelectModel.oData.oData.Cbtlv;
					oView.getModel("oStockDataModel").setProperty(sPath + "/Pbtlv", sCurrent);
					oView.getModel("oStockDataModel").setProperty(sPath + "/Cbtlv", sValue);

				}

				var oEntry1 = {};
				var oContract = oTabSelectModel.oData.oData;
				var Material = oContract.Material;

				var Matnr = oContract.Material;

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

				var Cbtlv = oContract.Cbtlv;
				var Cgtlv = oContract.Cgtlv;
				//	var Changedon = this.datatime(oContract.Changedon);
				var Changedon = oContract.Changedon;

				var Crtlv = oContract.Crtlv;
				var Cytlv = oContract.Cytlv;
				var Labst = oContract.Labst;
				var labstString = Labst.toString();
				var Pbtlv = oContract.Pbtlv;
				var Pgtlv = oContract.Pgtlv;
				var Prtlv = oContract.Prtlv;
				var Pytlv = oContract.Pytlv;
				var Werks = oContract.Plant;

				oEntry1.Cbtlv = Cbtlv;
				oEntry1.Cgtlv = Cgtlv;
				oEntry1.Cytlv = Cytlv;
				oEntry1.Crtlv = Crtlv;
				oEntry1.Pbtlv = Pbtlv;
				oEntry1.Prtlv = Prtlv;
				oEntry1.Pytlv = Pytlv;
				oEntry1.Pgtlv = Pgtlv;
				oEntry1.Changedon = Changedon;
				oEntry1.Werks = Werks;
				oEntry1.Labst = labstString;
				oEntry1.Matnr = Material;

				var that = this;
				var mParameters = {
					success: function(oResponse, object) {
						that.OnclearFilter();
						MessageBox.show("Value update Sucessfully..");

						sap.ui.getCore().byId("EditDialog").destroy(null);

					},
					error: function(error) {
						MessageBox.error(error);

						sap.ui.getCore().byId("EditDialog").destroy(null);

					},
					merge: false
				};
				var relPath = "/STOCK_DATASet(" + "Matnr=" + "'" + Matnr + "'" + "," + "Werks=" + "'" + Werks + "'" + ")";
				//	BusyIndicator.show(true);
				oModelService.update(relPath, oEntry1, mParameters);

			}
		},
		datatime: function(dDate) {
			var s_doc_datePost = dDate;
			var Datepoststring = s_doc_datePost.toISOString();
			Datepoststring = Datepoststring.slice(0, -5);
			return Datepoststring;
		},
		onAddThreshold: function() {
			var isUnique = true;
			var oModel = sap.ui.getCore().getModel("ThresholdModel");

			for (var i = 0; i < UniqueMatnrGlobal.length; i++) {
				if (oModel.oData.Matnr === UniqueMatnrGlobal[i]) {
					isUnique = false;
				}
			}
			var oModelService = this.getOwnerComponent().getModel("StockModel");
			var oEntry1 = {};
			var oContract = oModel.oData;
			var length = Object.keys(oContract).length;
			var odata = oModel.getData();
			if (!length > 0) {
				MessageBox.information("Please Enter the details");
				sap.ui.getCore().byId("updateDialog").destroy(null);
			}
			if (isUnique === false) {
				oModel.setData({
					oData: {}
				});
				MessageBox.error("This Material is Already Exist");

				this.UpdateCard.close();
				this.UpdateCard.destroy();
			}
			var oInputRed = sap.ui.getCore().byId("idCrtVal");
			var oInputYellow = sap.ui.getCore().byId("idWarVal");
			var oInputGreen = sap.ui.getCore().byId("idGrnVal");
			var oInputExcess = sap.ui.getCore().byId("idExcVal");
			var aTestValue = [oInputRed, oInputYellow, oInputGreen, oInputExcess];
			for (i = 0; i < aTestValue.length; i++) {
				var flagValid = true;
				var pattern = /[^\d]/;
				var value = aTestValue[i].getValue();
				if (value === "") {
					flagValid = false;
					break;
				} else if (pattern.test(value)) {
					if (aTestValue[i].getValueState() === "Error" || value === "")
						flagValid = false;
					break;
				}
			}
			if (flagValid === false) {
				MessageBox.error("Enter Numeric Threshold Values Only");
				oModel.setData({
					oData: {}
				});
				this.UpdateCard.close();
				this.UpdateCard.destroy();
			} else if (flagValid === true) {
				var Matnr = oContract.Matnr;
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

				var Cbtlv = oContract.Cbtlv;
				var Cgtlv = oContract.Cgtlv;
				var Changedon = new Date();
				var Datepoststring = Changedon.toISOString();
				Datepoststring = Datepoststring.slice(0, -5);
				//	var Changedon = this.datatime(oContract.Changedon);
				//	var Changedon = oContract.Changedon;

				var Crtlv = oContract.Crtlv;
				var Cytlv = oContract.Cytlv;

				var Werks = oContract.Werks;

				oEntry1.Cbtlv = Cbtlv;
				oEntry1.Cgtlv = Cgtlv;
				oEntry1.Cytlv = Cytlv;
				oEntry1.Crtlv = Crtlv;

				oEntry1.Changedon = Datepoststring;
				oEntry1.Werks = Werks;

				oEntry1.Matnr = Matnr;

				var mParameters = {
					success: function(oResponse, object) {
						sap.ui.getCore().byId("updateDialog").destroy(null);
						MessageBox.show("Created Sucessfully..");
						oModel.setData({
							oData: {}
						});
						oModel.updateBindings(true);
					},
					error: function(error) {
						sap.ui.getCore().byId("updateDialog").destroy(null);
						MessageBox.error(error);

					},
					merge: false
				};
				var relPath = "/STOCK_DATASet";
				//	BusyIndicator.show(true);
				oModelService.create(relPath, oEntry1, mParameters);

			}

		},

		onSaveProductsQuantity: function() {
			var oModel = oView.getModel("HierarchyData");
			var oinputbox = sap.ui.getCore().byId("idText");
			var ss = oinputbox.getValue();
			var pattern = /[^\d]/;
			if (pattern.test(ss)) {
				oinputbox.setValueState("Error");
				oinputbox.setValueStateText("Enter Numeric Value");
			} else {

				var oModelService = this.getOwnerComponent().getModel("StockModel");
				var oTabSelectModel = oView.getModel("oSelectedTabdata");
				var sPath = sPathThreshold;
				var oInput = sap.ui.getCore().byId("idText");
				var sValue = oInput.getValue();
				var sSelectTdLevel = sap.ui.getCore().byId('SelectTdlevel').getSelectedKey();

				if (sSelectTdLevel === "Red") {
					var sCurrent = oTabSelectModel.oData.oData.Crtlv;
					oView.getModel("HierarchyData").setProperty(sPath + "/Prtlv", sCurrent);
					oView.getModel("HierarchyData").setProperty(sPath + "/Crtlv", sValue);

				} else if (sSelectTdLevel === "Green") {
					var sCurrent = oTabSelectModel.oData.oData.Cgtlv;
					oView.getModel("HierarchyData").setProperty(sPath + "/Pgtlv", sCurrent);
					oView.getModel("HierarchyData").setProperty(sPath + "/Cgtlv", sValue);

				} else if (sSelectTdLevel === "Yellow") {
					var sCurrent = oTabSelectModel.oData.oData.Cytlv;
					oView.getModel("HierarchyData").setProperty(sPath + "/Pytlv", sCurrent);
					oView.getModel("HierarchyData").setProperty(sPath + "/Cytlv", sValue);

				} else if (sSelectTdLevel === "Blue") {
					var sCurrent = oTabSelectModel.oData.oData.Cbtlv;
					oView.getModel("HierarchyData").setProperty(sPath + "/Pbtlv", sCurrent);
					oView.getModel("HierarchyData").setProperty(sPath + "/Cbtlv", sValue);

				}

				var oEntry1 = {};
				var oContract = oTabSelectModel.oData.oData;

				var Grpid = oContract.Grpid;
				var Maingrpid = oContract.Maingrpid;
				var Prodid = oContract.Prodid;
				var Subgrpid = oContract.Subgrpid;
				var Cbtlv = oContract.Cbtlv;
				var Cgtlv = oContract.Cgtlv;
				var Changedon = new Date();
				var Datepoststring = Changedon.toISOString();
				Datepoststring = Datepoststring.slice(0, -5);

				//	var Changedon = this.datatime(oContract.Changedon);
				var Crtlv = oContract.Crtlv;
				var Cytlv = oContract.Cytlv;
				var Labst = oContract.Labst;
				var labstString = Labst.toString();
				var Pbtlv = oContract.Pbtlv;
				var Pgtlv = oContract.Pgtlv;
				var Prtlv = oContract.Prtlv;
				var Pytlv = oContract.Pytlv;

				var Maingrp = oContract.Maingrp;
				var Grp = oContract.Grp;
				var Subgrp = oContract.Subgrp;

				oEntry1.Cbtlv = Cbtlv;
				oEntry1.Cgtlv = Cgtlv;
				oEntry1.Cytlv = Cytlv;
				oEntry1.Crtlv = Crtlv;
				oEntry1.Pbtlv = Pbtlv;
				oEntry1.Prtlv = Prtlv;
				oEntry1.Pytlv = Pytlv;
				oEntry1.Pgtlv = Pgtlv;
				oEntry1.Changedon = Datepoststring;

				oEntry1.Labst = labstString;
				oEntry1.Grpid = Grpid;
				oEntry1.Maingrpid = Maingrpid;
				oEntry1.Prodid = Prodid;
				oEntry1.Subgrpid = Subgrpid;
				oEntry1.Maingrp = Maingrp;
				oEntry1.Grp = Grp;
				oEntry1.Subgrp = Subgrp;

				var that = this;
				var mParameters = {
					success: function(oResponse, object) {
						that.OnclearFilter();
						MessageBox.show("Value update Sucessfully..");
						sap.ui.getCore().byId("ProdEditDialog").destroy(null);

					},
					error: function(error) {
						MessageBox.error(error);

					},
					merge: false
				};
				var relPath = "/HierarchySet(" + "Prodid=" + "'" + Prodid + "'" + ")";
				//	BusyIndicator.show(true);
				oModelService.update(relPath, oEntry1, mParameters);

			}

		},
		onExit: function() {
			if (this.pressDialogOpn) {
				this.pressDialogOpn.destroy();
			}
		},
		onSelectHierarchy: function(oEvent) {
			this.pressDialogHierarchy = this.getView().byId("idHierarchy");
			if (!this.pressDialogHierarchy) {
				this.pressDialogHierarchy = sap.ui.xmlfragment("com.vSimpleApp.fragment.Stock.Hierarchy", this);

				this.pressDialogHierarchy.open();
			}
		},

		onAllocationChange: function(oEvent) {
			/*collectionItemMode model is used for the allocation levels. 
			selected levels or tabname is getting all data from entity set using allfilters*/
			var collectionItemMode = sap.ui.getCore().getModel("collectionItemMode");
			var oSelectedItem = oEvent.getParameter("listItem");
			var tabName = oSelectedItem.getTitle();
			var oAllocationlist = oEvent.getSource();
			var items = oAllocationlist.getItems();
			var checkBoxSelected = oEvent.getParameter("selected");
			// var selectedItemlist = oAllocationlist.getSelectedItems();

			if (tabName === "Main-Group") {
				collectionItemMode.setProperty("/Main-Group", checkBoxSelected);
				if (checkBoxSelected) {
					var allfilters = [];
					allfilters.push(new sap.ui.model.Filter("Spras", sap.ui.model.FilterOperator.EQ, "E"));
				}
				oController._onGetHierarchyItems(1, allfilters);

			} else if (tabName === "Group") {
				collectionItemMode.setProperty("/Group", checkBoxSelected);
				if (checkBoxSelected)
					oAllocationlist.setSelectedItem(items[1], true, true);
				else
					oAllocationlist.setSelectedItem(items[1], false, true);
			} else if (tabName === "Sub-Group") {
				collectionItemMode.setProperty("/Sub-Group", checkBoxSelected);
				if (checkBoxSelected)
					oAllocationlist.setSelectedItem(items[2], true, true);
				else
					oAllocationlist.setSelectedItem(items[2], false, true);
			}
		},
		_onGetHierarchyItems: function(level, allfilters, selectedKey) {
			try {
				//collectionItemMode.setProperty("/Hierarchy1", checkBoxSelected);
				//get all filtered level data from prodH model with the selected hierarchyItems
				var oModel2 = this.getOwnerComponent().getModel("StockModel");
				var param2 = "E";
				var param3 = "";
				var param4 = level.toString();

				if (allfilters.length === 0)

					allfilters.push(
					new sap.ui.model.Filter({
						path: 'Spras',
						operator: sap.ui.model.FilterOperator.EQ,
						value1: param2
					}));

				allfilters.push(
					new sap.ui.model.Filter({
						path: 'Stufe',
						operator: sap.ui.model.FilterOperator.EQ,
						value1: param4
					}));
				// read data from entityset and set the level, set the hierarchy
				oModel2.read("/Prod_HierarchySet", {
					filters: allfilters,
					success: function(oData) {
						if (level > 1) {
							var lastLevel = level - 1;
							var oPreviousModel = sap.ui.getCore().getModel("hierarchy" + lastLevel);
							var previousData = oPreviousModel.getData().results.find(function(item) {
								return item["Prodh" + lastLevel].toString().trim() === selectedKey.toString().trim();
							});
							if (previousData) {
								for (var i = 0; i < oData.results.length; i++) {
									for (var j = lastLevel; j >= 1; j--) {
										oData.results[i]["Vtext" + j] = previousData["Vtext" + j];
									}
								}
							}
						}
						var oHierarchyModel = new sap.ui.model.json.JSONModel(oData);
						sap.ui.getCore().setModel(oHierarchyModel, "hierarchy" + level);

					},
					error: function(oError) {
						MessageBox.error(oError);
					}
				});
			} catch (ex) {
				console.log(ex);
			}
		},

		onSelectHierarchyItem: function(oEvent) {
			try {
				//store the selected values
				var listItem = oEvent.getParameter('listItem');
				var level = parseInt(listItem.data('level'), 10);
				var oListHie = sap.ui.getCore().byId("Hie" + level + "list");

				//get the selected property 
				if (listItem.getProperty("selected")) {
					var collectionItemMode = sap.ui.getCore().getModel("collectionItemMode");
					//set the level
					collectionItemMode.setProperty("/MaxHierarchy", level);
					var maxH = collectionItemMode.getProperty("/MaxHierarchy");

				}
				var selItems = oListHie.getSelectedItems();
				if (selItems.length === 0 && level !== 4) {
					var xNo = level + 1;
					var nextLevelModel = "hierarchy" + xNo;
					this.getView().getModel(nextLevelModel).setData({});
					this.getView().getModel(nextLevelModel).refresh();
				}
				//filtered the data to prodh1 and Spras
				var allfilters = [];
				var paramT3;
				for (var i = 0; i < selItems.length; i++) {
					paramT3 = selItems[i].data('id');

					allfilters.push(new sap.ui.model.Filter("Prodh1", sap.ui.model.FilterOperator.EQ, paramT3));
					allfilters.push(new sap.ui.model.Filter("Spras", sap.ui.model.FilterOperator.EQ, "E"));

				}
				if (paramT3) {
					oController._onGetHierarchyItems(level + 1, allfilters, paramT3);
				}
			} catch (ex) {
				console.log(ex);
			}
		},
		onFilterProductstate: function(oEvent, prodtext) {
			var oBinding = this.byId("awaitingTable2").getBinding("items");

			var levelfirst = allfiltersLevelFirst;
			var levelSecond = allfiltersLevelSecond;
			var aFilters = [],
				aMainFilters = [],
				ShowColor;

			for (var i = 0; i < levelfirst.length; i++) {
				var smaingrp = levelfirst[i];
				//		ShowColor = new sap.ui.model.Filter('Maingrp', sap.ui.model.FilterOperator.EQ, smaingrp);
				aMainFilters.push(new sap.ui.model.Filter('Maingrp', sap.ui.model.FilterOperator.EQ, smaingrp));
			}

			for (var j = 0; j < levelSecond.length; j++) {
				var sGrp = levelSecond[j];
				//		ShowColor = new sap.ui.model.Filter('Maingrp', sap.ui.model.FilterOperator.EQ, smaingrp);
				aMainFilters.push(new sap.ui.model.Filter('Grp', sap.ui.model.FilterOperator.EQ, sGrp));
			}

			aFilters.push(new Filter([aMainFilters], false));
			oBinding.filter(aMainFilters);
			this.pressProductState.close();
			this.pressProductState.destroy();
		},
		onCloseFilters: function() {
			if (this.pressDialogHierarchy) {
				this.pressDialogHierarchy.destroy();
			}

			this.pressDialogHierarchy.close();
			this.pressDialogHierarchy.destroy();
		},
		onProductState: function(oEvent) {
			this.pressProductState = this.getView().byId("idProductState");
			if (!this.pressProductState) {
				this.pressProductState = sap.ui.xmlfragment("com.vSimpleApp.fragment.Stock.ProductState", this);
				//this.getView().addDependent(pressDialog);
				//  this.pressDialog.setModel(this.getView().getModel());
				this.pressProductState.open();
			}
		},

		onCloseAddHierarchyitems: function() {
			var oModel = sap.ui.getCore().getModel("oHierarchyItems");

			oModel.setData({
				oData: {}
			});
			oModel.updateBindings(true);
			if (this.onAddHierarchyitems) {
				this.onAddHierarchyitems.destroy();
			}

			this.onAddHierarchyitems.close();
			this.onAddHierarchyitems.destroy();
		},
		onAddHierarchyitems: function(oEvent) {
			this.onAddHierarchyitems = this.getView().byId("idAddHierarchyitem");
			if (!this.onAddHierarchyitems) {
				this.onAddHierarchyitems = sap.ui.xmlfragment("com.vSimpleApp.fragment.Stock.AddHierarchy", this);

				this.onAddHierarchyitems.open();
			}
		},
		onAddProduct: function(oEvent) {

			var oContractModel = sap.ui.getCore().getModel("oHierarchyItems");
			oContractModel.refresh();
			var oModelService = this.getOwnerComponent().getModel("StockModel");
			//	var pData = oContract.getData();
			var oContract = oContractModel.oData;
			var length = Object.keys(oContract).length;
			if (!length > 0) {
				MessageBox.information("Please Enter the details");
				sap.ui.getCore().byId("idAddHierarchyitem").destroy(null);

				//	sap.ui.getCore().byId("idAddHierarchyitem").close();

			}
			var oInputRed = sap.ui.getCore().byId("idCrtValp");
			var oInputYellow = sap.ui.getCore().byId("idWarValp");
			var oInputGreen = sap.ui.getCore().byId("idGrnValp");
			var oInputExcess = sap.ui.getCore().byId("idExcValp");
			var aTestValue = [oInputRed, oInputYellow, oInputGreen, oInputExcess];
			for (var i = 0; i < aTestValue.length; i++) {
				var flagValid = true;
				var pattern = /[^\d]/;
				var value = aTestValue[i].getValue();
				if (value === "") {
					flagValid = false;
					break;
				} else if (pattern.test(value)) {
					if (aTestValue[i].getValueState() === "Error" || value === "")
						flagValid = false;
					break;
				}
			}
			if (flagValid === false) {
				MessageBox.error("Enter Numeric Threshold Values Only");
				oContractModel.setData({
					oData: {}
				});
				this.UpdateCard.close();
				this.UpdateCard.destroy();
			} else if (flagValid === true) {
				var Grpid = oContract.Grpid;
				var Maingrpid = oContract.Maingrpid;
				var Prodid = oContract.Prodid;
				var Subgrpid = oContract.Subgrpid;
				var Cbtlv = oContract.Cbtlv;
				var Cgtlv = oContract.Cgtlv;

				//	var Changedon = oContract.Changedon;
				var Changedon = new Date();
				var Datepoststring = Changedon.toISOString();
				Datepoststring = Datepoststring.slice(0, -5);
				var Crtlv = oContract.Crtlv;
				var Cytlv = oContract.Cytlv;
				var Labst = oContract.Labst;
				//	var labstString = Labst.toString();
				var Pbtlv = oContract.Pbtlv;
				var Pgtlv = oContract.Pgtlv;
				var Prtlv = oContract.Prtlv;
				var Pytlv = oContract.Pytlv;

				var Maingrp = oContract.Maingrp;
				var Grp = oContract.Grp;
				var Subgrp = oContract.Subgrp;
				var oEntry1 = {};
				oEntry1.Cbtlv = Cbtlv;
				oEntry1.Cgtlv = Cgtlv;
				oEntry1.Cytlv = Cytlv;
				oEntry1.Crtlv = Crtlv;

				oEntry1.Changedon = Datepoststring;
				oEntry1.Prodid = Prodid;

				oEntry1.Maingrp = Maingrp;
				oEntry1.Grp = Grp;

				var that = this;
				var mParameters = {
					success: function(oResponse, object) {
						that.OnclearFilterHierarchy();
						MessageBox.show("Added Products Sucessfully..");
						oContractModel.setData({
							oData: {}
						});
						oContractModel.updateBindings(true);

						sap.ui.getCore().byId("idAddHierarchyitem").destroy(null);

					},
					error: function(error) {
						MessageBox.error(error);

						sap.ui.getCore().byId("idAddHierarchyitem").destroy(null);

					},
					merge: false
				};
				var relPath = "/HierarchySet";
				//	BusyIndicator.show(true);
				oModelService.create(relPath, oEntry1, mParameters);
			}
		},
		onProductAllocationLevel: function(oEvent) {
			/*collectionItemMode model is used for the allocation levels. 
			selected levels or tabname is getting all data from entity set using allfilters*/
			var collectionItemMode = sap.ui.getCore().getModel("collectionItemMode");
			var oSelectedItem = oEvent.getParameter("listItem");
			var tabName = oSelectedItem.getTitle();
			var oAllocationlist = oEvent.getSource();
			var items = oAllocationlist.getItems();
			var checkBoxSelected = oEvent.getParameter("selected");
			// var selectedItemlist = oAllocationlist.getSelectedItems();
			var allfilters = [];
			if (tabName === "Main-Group") {
				collectionItemMode.setProperty("/Main-Group", checkBoxSelected);
				if (checkBoxSelected) {

					allfilters.push(new sap.ui.model.Filter("Maingrpid", sap.ui.model.FilterOperator.EQ, ''));
				}
				oController.onProductGetService(1, allfilters);

			} else if (tabName === "Group") {
				collectionItemMode.setProperty("/Group", checkBoxSelected);

				if (checkBoxSelected)
					oAllocationlist.setSelectedItem(items[1], true, true);
				else
					oAllocationlist.setSelectedItem(items[1], false, true);
			} else if (tabName === "Sub-Group") {
				collectionItemMode.setProperty("/Sub-Group", checkBoxSelected);
				if (checkBoxSelected)
					oAllocationlist.setSelectedItem(items[2], true, true);
				else
					oAllocationlist.setSelectedItem(items[2], false, true);
			}
		},
		onSelectProductHier: function(oEvent) {
			var oPreviousModel = sap.ui.getCore().getModel("oProductGroup");
			var oPreviousSubGrpModel = sap.ui.getCore().getModel("oProdSubGrp");

			var previousData = oPreviousModel.getData();
			var previousSubgrpData = oPreviousSubGrpModel.getData();

			var listItem = oEvent.getParameter('listItem');
			var level = parseInt(listItem.data('level'), 10);
			var prodid = listItem.getDescription();
			var prodtext = listItem.getTitle();
			var allfilters = [];
			if (level === 1) {
				allfilters.push(new sap.ui.model.Filter("Maingrpid", sap.ui.model.FilterOperator.EQ, prodid));
				oController.onGetProductItems(1, allfilters);
				allfiltersLevelFirst.push(prodtext);
			} else {
				allfilters.push(new sap.ui.model.Filter("Grpid", sap.ui.model.FilterOperator.EQ, prodid));
				allfiltersLevelSecond.push(prodtext);

				oController.onGetProductItemsSubGrp(2, allfilters);
			}

		},
		onGetProductItemsSubGrp: function(level, allfilters) {

			var oModel2 = this.getOwnerComponent().getModel("StockModel");

			var oPreviousSubGrpModel = sap.ui.getCore().getModel("oProdSubGrp");
			var Groupid;
			//oModel2.read("/ProductSet(" + "Grpid =" + "'" + prodid + "'" + ")", {
			oModel2.read("/HierarchySet", {
				filters: allfilters,
				success: function(oData) {
					var oProductList = oData.results;
					var previousSubgrpData = oPreviousSubGrpModel.getData();

					if (!previousSubgrpData.length) {
						sap.ui.getCore().getModel("oProdSubGrp").setData(oProductList);

					} else {
						var aData = previousSubgrpData;
						aData.push.apply(aData, oProductList);
						sap.ui.getCore().getModel("oProdSubGrp").setData(aData);
					}

				},
				error: function(oError) {
					MessageBox.error(oError);
				}
			});

		},

		onGetProductItems: function(level, allfilters) {

			var oModel2 = this.getOwnerComponent().getModel("StockModel");
			var oPreviousModel = sap.ui.getCore().getModel("oProductGroup");
			var oPreviousSubGrpModel = sap.ui.getCore().getModel("oProdSubGrp");

			oModel2.read("/HierarchySet", {
				filters: allfilters,
				success: function(oData) {
					var oProductList = oData.results;
					var previousData = oPreviousModel.getData();
					var previousSubgrpData = oPreviousSubGrpModel.getData();

					if (!previousData.length) {
						sap.ui.getCore().getModel("oProductGroup").setData(oProductList);

					} else if (previousData.length) {

						var aData = oPreviousModel.getData();
						aData.push.apply(aData, oProductList);
						sap.ui.getCore().getModel("oProductGroup").setData(aData);

					} else if (!previousSubgrpData.length) {
						sap.ui.getCore().getModel("oProdSubGrp").setData(oProductList);

					} else {
						var aData = previousSubgrpData.getData();
						aData.push.apply(aData, oProductList);
						sap.ui.getCore().getModel("oProdSubGrp").setData(aData);
					}

					var ohierarchy = [];

				},
				error: function(oError) {
					MessageBox.error(oError);
				}
			});

		},
		onProductGetService: function(level, allfilters) {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			oModel.read("/HierarchySet", {
				filters: allfilters,
				success: function(oData) {
					//		BusyIndicator.hide();
					var oProductList = oData.results;

					sap.ui.getCore().getModel("oProductListMode").setData(oProductList);

				},
				error: function(oError) {
					//	BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
		onCloseProductState: function() {
			if (this.pressProductState) {
				this.pressProductState.destroy();
			}

			this.pressProductState.close();
			this.pressProductState.destroy();
		},

		onShowTableFilterColumn: function(oEvent) {
			var oCheckModel = oView.getModel("oCheckModel");
			var oVisibleModel = oView.getModel("VisibleModel");
			var oselecttab = oEvent.oSource.mProperties.text;
			var checkBoxSelected = oEvent.getParameter("selected");

			if (oselecttab === "Hierarchy") {
				oVisibleModel.setProperty("/Hierarchy", true);
				oCheckModel.setProperty("/Hierarchy", checkBoxSelected);
				oView.byId("idFilterHier").setVisible(true);
				/*	oView.byId("Edit1").setVisible(false);
				oView.byId("Edit2").setVisible(true);*/
				oVisibleModel.setProperty("/Prodbtn", true);

				oVisibleModel.setProperty("/Matbtn", false);

				oVisibleModel.setProperty("/Plant", false);
				oVisibleModel.setProperty("/MatDiscp", false);
				oVisibleModel.setProperty("/Material", false);
				oVisibleModel.setProperty("/MainGrp", true);
				oVisibleModel.setProperty("/Grp", true);
				oVisibleModel.setProperty("/SubGrp", true);

			} else if (oselecttab === "Material-Group") {
				oVisibleModel.setProperty("/MaterialGroup", true);

				oCheckModel.setProperty("/MaterialGroup", checkBoxSelected);

			} else if (oselecttab === "Sub-Group") {
				oVisibleModel.setProperty("/SubGrp", true);

				oCheckModel.setProperty("/SubGroup", checkBoxSelected);

			} else if (oselecttab === "Model") {
				oCheckModel.setProperty("/Model", checkBoxSelected);

			} else if (oselecttab === 'Material') {
				oCheckModel.setProperty("/Material", checkBoxSelected);

			}
			// var selectedItemlist = oAllocationlist.getSelectedItems();
		},

		onShowTable: function(oEvent) {
			var oTableLoad = oView.getModel("VisibleModel");
			var ocheckModel = oView.getModel("oCheckModel");
			var checkBoxSelected = oEvent.getParameter("selected");

			//var oselecttab = oEvent.oSource.mProperties.selected;
			var oselecttab = oEvent.oSource.mProperties.text;

			if (oselecttab === "Material") {

				oTableLoad.setProperty("/MaterialTable", true);
				oTableLoad.setProperty("/ProductHirarchyTable", false);
				oView.byId("idFilterHier1").setVisible(false);

				ocheckModel.setProperty("/Hierarchy", false);
				ocheckModel.setProperty("/MaterialGroup", false);
				oView.byId("idButtonForm2").setVisible(false);

				oView.byId("idButtonForm").setVisible(true);

				oView.byId("SimpleFor").setVisible(true);

				ocheckModel.setProperty("/Material", true);
				//	oView.byId("checkboxform").setVisible(false);

			} else if (oselecttab === "Hierarchy") {
				this.OnclearFilterHierarchy();
				ocheckModel.setProperty("/Hierarchy", true);
				ocheckModel.setProperty("/MaterialGroup", false);
				ocheckModel.setProperty("/Material", false);
				oTableLoad.setProperty("/MaterialTable", false);
				oTableLoad.setProperty("/ProductHirarchyTable", true);
				oView.byId("idFilterHier1").setVisible(true);

				oView.byId("SimpleFor").setVisible(false);
				oView.byId("idButtonForm2").setVisible(true);
				oView.byId("idButtonForm").setVisible(false);

				ocheckModel.setProperty("/Material", false);

			} else if (oselecttab === "Material-Group") {
				ocheckModel.setProperty("/MaterialGroup", true);
				ocheckModel.setProperty("/Hierarchy", false);
				ocheckModel.setProperty("/Material", false);
			}

		},

		getHierarchy: function() {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			var oModels = this.getOwnerComponent().getModel("PurchaseSet");

			BusyIndicator.show(true);
			oModel.read("/HierarchySet", {
				success: function(oData) {

					BusyIndicator.hide();
					var listOfMat = [];

					var itemPO = oData.results.length;
					//	oView.getModel("oStockDataModel").setData(oData.results);
					var arr, CriticleState = [];

					var ListofSrs = [];

					for (var iRowIndex = 0; iRowIndex < itemPO; iRowIndex++) {
						var odataset = oData.results[iRowIndex];
						var Cbtlv = odataset.Cbtlv;
						var Cgtlv = odataset.Cgtlv;
						var Cytlv = odataset.Cytlv;
						var Changedon = odataset.Changedon;
						var Crtlv = odataset.Crtlv;
						var Labst = odataset.Labst;
						var Grpid = odataset.Grpid;
						var Maingrpid = odataset.Maingrpid;
						var Subgrpid = odataset.Subgrpid;
						var Prodid = odataset.Prodid;

						var Maingrp = odataset.Maingrp;
						var Grp = odataset.Grp;
						var Subgrp = odataset.Subgrp;

						var Pbtlv = odataset.Pbtlv;
						var Pgtlv = odataset.Pgtlv;

						var Prtlv = odataset.Prtlv;
						var Pytlv = odataset.Pytlv;

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

							Pbtlv: Pbtlv,
							Pgtlv: Pgtlv,
							Prtlv: Prtlv,
							Pytlv: Pytlv,

							Color: "",
							Subgrpid: Subgrpid,
							Maingrpid: Maingrpid,
							Grpid: Grpid,
							Prodid: Prodid
						});

						// sap.ui.getCore().getModel("HierarchyData").setData(data);
						oView.getModel("HierarchyData").setData(ListofSrs);

					}

				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});

		},
		updateProductData: function(event) {
			this.UpdateCard = this.getView().byId("updateDialog");
			if (!this.UpdateCard) {
				this.UpdateCard = sap.ui.xmlfragment("com.vSimpleApp.fragment.Stock.updateDialog", this);

				this.UpdateCard.open();
			}
		},
		onCloseDialog: function() {
			this.UpdateCard.close();
			this.UpdateCard.destroy();

		},
		/* Maingroup serch help start*/
		getMainGroupList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("StockModel");
			//	BusyIndicator.show(true);
			var oFilter = new sap.ui.model.Filter("Spras", sap.ui.model.FilterOperator.EQ, "E");
			var oFilter2 = new sap.ui.model.Filter({
				path: 'Stufe',
				operator: sap.ui.model.FilterOperator.EQ,
				value1: "1"
			});
			oModel.read("/Prod_HierarchySet", {
				filters: [oFilter, oFilter2],
				success: function(oData) {
					var MainGroupList = oData.results;

					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/MainGroup", MainGroupList);
					oLookupModel.refresh(true);
				},
				error: function(oError) {
					//	BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		MainGroupSearchHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();
			sap.ui.getCore().inputIdMainGrp = oEvent.getSource().getId();

			//create value help dialog
			if (!this._valueHelpDialogMG) {
				this._valueHelpDialogMG = sap.ui.xmlfragment(
					"com.vSimpleApp.fragment.Stock.MainGroup",
					this
				);
				this.getView().addDependent(this._valueHelpDialogMG);
			}

			// create a filter for the binding
			this._valueHelpDialogMG.getBinding("items").filter(new Filter([new Filter(
				"Prodh1",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Vtext1",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogMG.open(sInputValue);
		},
		_handleMainGroupSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Prodh1",
				FilterOperator.Contains, sValue
			), new Filter(
				"Vtext1",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},

		_handleMainGroupClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");

			if (oSelectedItem) {
				var productInput = sap.ui.getCore().byId(sap.ui.getCore().inputIdMainGrp);
				productInput.setValue(oSelectedItem.getTitle());
				var sTitle = oSelectedItem.getTitle();
				var sDescription = oSelectedItem.getDescription();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sDescription);

				sap.ui.getCore().getModel("oHierarchyItems").setProperty("/Prodid", sTitle);

				var that = this;
				var oModel = this.getOwnerComponent().getModel("StockModel");
				//	BusyIndicator.show(true);
				var oFilter = new sap.ui.model.Filter("Spras", sap.ui.model.FilterOperator.EQ, "E");
				var oFilter2 = new sap.ui.model.Filter({
					path: 'Stufe',
					operator: sap.ui.model.FilterOperator.EQ,
					value1: "2"
				});
				var oFilter3 = new sap.ui.model.Filter('Prodh1', sap.ui.model.FilterOperator.EQ, sTitle);
				oModel.read("/Prod_HierarchySet", {
					filters: [oFilter, oFilter2, oFilter3],
					success: function(oData) {

						var oLookupModel = that.getOwnerComponent().getModel("Lookup");
						//set the odata to model property
						oLookupModel.setProperty("/GroupList", oData.results);
						oLookupModel.refresh(true);

					},
					error: function(oError) {
						MessageBox.error(oError);

					}
				});

			}
			evt.getSource().getBinding("items").filter([]);

		},

		/*Material SEarch end*/

		// maingroup search help close

		/* group serch help start*/

		_handleAddGroupClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = sap.ui.getCore().byId(sap.ui.getCore().inputIdAddGroup);
				var sGroup = oSelectedItem.getInfo();
				var sGroupid = oSelectedItem.getTitle();
				productInput.setValue(sGroup);
				var that = this;
				var that = this;
				sap.ui.getCore().getModel("oHierarchyItems").setProperty("/Prodid", sGroupid);

				var oModel = this.getOwnerComponent().getModel("StockModel");

				var oFilter = new sap.ui.model.Filter("Spras", sap.ui.model.FilterOperator.EQ, "E");
				var oFilter2 = new sap.ui.model.Filter({
					path: 'Stufe',
					operator: sap.ui.model.FilterOperator.EQ,
					value1: "3"
				});
				var oFilter3 = new sap.ui.model.Filter('Prodh1', sap.ui.model.FilterOperator.EQ, sGroupid);
				oModel.read("/Prod_HierarchySet", {
					filters: [oFilter, oFilter2, oFilter3],
					success: function(oData) {

						var oLookupModel = that.getOwnerComponent().getModel("Lookup");
						//set the odata to model property
						oLookupModel.setProperty("/SubGroupList", oData.results);
						oLookupModel.refresh(true);

					},
					error: function(oError) {
						MessageBox.error(oError);

					}
				});
				evt.getSource().getBinding("items").filter([]);
			}
		},

		handleValueHelpAddGroup: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();
			sap.ui.getCore().inputIdAddGroup = oEvent.getSource().getId();

			// create value help dialog
			if (!this._valueHelpAddGroup) {
				this._valueHelpAddGroup = sap.ui.xmlfragment(
					"com.vSimpleApp.fragment.Stock.AddGroup",
					this
				);
				this.getView().addDependent(this._valueHelpAddGroup);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpAddGroup.getBinding("items").filter(new Filter([new Filter(
				"Prodh2",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Vtext2",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpAddGroup.open(sInputValue);

		},
		_handleAddGroupSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Prodh2",
				FilterOperator.Contains, sValue
			), new Filter(
				"Vtext2",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},

		_handleAddSubGroupClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = sap.ui.getCore().byId(sap.ui.getCore().inputIdAddSubGroup);
				productInput.setValue(oSelectedItem.getInfo());
				var sSubGroupid = oSelectedItem.getTitle();
				sap.ui.getCore().getModel("oHierarchyItems").setProperty("/Prodid", sSubGroupid);

				evt.getSource().getBinding("items").filter([]);
			}
		},

		handleValueHelpAddSubGroup: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();
			sap.ui.getCore().inputIdAddSubGroup = oEvent.getSource().getId();

			// create value help dialog
			if (!this._valueHelpAddSubGroup) {
				this._valueHelpAddSubGroup = sap.ui.xmlfragment(
					"com.vSimpleApp.fragment.Stock.AddSubGroup",
					this
				);
				this.getView().addDependent(this._valueHelpAddSubGroup);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpAddSubGroup.getBinding("items").filter(new Filter([new Filter(
				"Prodh3",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Vtext3",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpAddSubGroup.open(sInputValue);

		},
		_handleAddSubGroupSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Prodh3",
				FilterOperator.Contains, sValue
			), new Filter(
				"Vtext3",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		LeadingZeros: function(num, size) {
			var s = num + "0" + "";
			while (s.length < size) s = "0" + s;
			return s;
		},
		getPath: function() {
			var oPurchaseItemTable = this.byId("awaitingTable");
			sPathSingle = oPurchaseItemTable.getSelectedContextPaths();
		},
		getPathHierarchy: function() {
			var oPurchaseItemTable = this.byId("awaitingTable2");
			sPathHierarchy = oPurchaseItemTable.getSelectedContextPaths();
		},

		AutoPoCreationforHierarchy: function(oEvent) {

			var oPurchaseItemTable = this.byId("awaitingTable2");
			//	var sPath = oPurchaseItemTable.getSelectedContextPaths();
			//	var aSelectedIndex = oPurchaseItemTable.getSelectedIndices().reverse();
			var oStockModel = oView.getModel("HierarchyData");

			var oSelectedRecord = oStockModel.getProperty(sPathHierarchy[0]);

			var that = this;

			var prodid = oSelectedRecord.Prodid;
			var sid = prodid.split("").splice(-5).join("");
			var oFilter = new sap.ui.model.Filter('Prdha', sap.ui.model.FilterOperator.EQ, sid);
			var oModelS = this.getOwnerComponent().getModel("StockModel");

			var oModelService = this.getOwnerComponent().getModel("PurchaseSet");
			if (oSelectedRecord.Color === "red") {
				var Labst = parseInt(oSelectedRecord.Labst),
					Cgtlv = parseInt(oSelectedRecord.Cgtlv);
				var count = Cgtlv - Labst;
				//	var length = parseInt(count);
				for (var i = 0; i < count; i++) {
					var promise = new Promise(function(resolve, reject) {

						resolve();
					}).then(function(result) {

					});

					setTimeout(function() {
						//	for(var i=0 ; i<count ; i++){

						oModelS.read("/fetchMaterialSet?$filter=(Prdha  eq '" + sid + "')", {
							filters: [oFilter],

							success: function(oData) {

								if (!oData.results.length) {
									MessageBox.error("No items available for Stock hierarchy");
								} else {

									var Podata = new StockContract(oData);
									oView.getModel("PurchaseModel").setProperty("/StockContract", Podata);
									var oPurchaseModel = oView.getModel("PurchaseModel");
									oView.getModel("PurchaseModel").setProperty("/StockContract/PoitemSet", oData.results);

									var oPurchaseContract = oPurchaseModel.getProperty("/StockContract");
									var oRequestPayload = oPurchaseContract.getPayloadHierarchy();

									var vln = oRequestPayload.PoitemSet.length;
									for (var vlen = 0; vlen < vln; vlen++) {
										var num = vlen + 1;
										var s = num + "0" + "";
										while (s.length < 5) s = "0" + s;
										oRequestPayload.PoitemSet[vlen].PoItem = s;

										delete oRequestPayload.PoitemSet[vlen].Vendor;

									}

									oModelService.create("/PoDisplaySet", oRequestPayload, {
										success: function(oRes, object) {
											var PoNumber = oRes.Purchaseorder;
											jQuery.sap.require("sap.m.MessageBox");
											sap.m.MessageBox.show("Standard PO created under the number  #" + PoNumber + " ", {

												icon: sap.m.MessageBox.Icon.INFORMATION,

												actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CLOSE],
												onClose: function(oAction) {
													if (oAction === "OK") {
														var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
														oRouter.navTo('StockTable');
													}
												}.bind(this)
											});

										},
										error: function(oError) {
											MessageBox.error(oError);
										}
									});
								}
							},
							error: function(oError) {

								var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
								MessageToast.show(errorMsg);
							}

						});

						console.log("Promise (fulfilled)", promise)
					}, 0);

					console.log("Promise (pending)", promise);

				}

			} else {
				MessageBox.warning("Quantity is not in Criticle level");
			}

		},
		onSaveRefillHierarchy: function(oEvent) {
			var oRow = oEvent.getSource().getParent();
			var oBindingContext = oRow.getBindingContext('HierarchyData');
			var oBindingModel = oBindingContext.getModel();
			sPathThreshold = oBindingContext.getPath();
			var oSelectedRecord = oBindingModel.getProperty(sPathThreshold);
			var oModelService = this.getOwnerComponent().getModel("PurchaseSet");

			var prodid = oSelectedRecord.Prodid;
			var sid = prodid.split("").splice(-5).join("");
			var oFilter = new sap.ui.model.Filter('Prdha', sap.ui.model.FilterOperator.EQ, sid);
			var oModel = this.getOwnerComponent().getModel("StockModel");

			oModel.read("/fetchMaterialSet?$filter=(Prdha  eq '" + sid + "')", {
				filters: [oFilter],

				success: function(oData) {

					if (!oData.results.length) {
						MessageBox.error("No items available for Stock hierarchy");
					} else {

						var Podata = new StockContract(oData);
						oView.getModel("PurchaseModel").setProperty("/StockContract", Podata);
						var oPurchaseModel = oView.getModel("PurchaseModel");
						oView.getModel("PurchaseModel").setProperty("/StockContract/PoitemSet", oData.results);

						var oPurchaseContract = oPurchaseModel.getProperty("/StockContract");
						var oRequestPayload = oPurchaseContract.getPayloadHierarchy();

						var vln = oRequestPayload.PoitemSet.length;
						for (var vlen = 0; vlen < vln; vlen++) {
							var num = vlen + 1;
							var s = num + "0" + "";
							while (s.length < 5) s = "0" + s;
							oRequestPayload.PoitemSet[vlen].PoItem = s;
							delete oRequestPayload.PoitemSet[vlen].Vendor;

						}

						oModelService.create("/PoDisplaySet", oRequestPayload, {
							success: function(oRes, object) {
								var PoNumber = oRes.Purchaseorder;
								jQuery.sap.require("sap.m.MessageBox");
								sap.m.MessageBox.show("Standard PO created under the number  #" + PoNumber + " ", {

									icon: sap.m.MessageBox.Icon.INFORMATION,

									actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CLOSE],
									onClose: function(oAction) {
										if (oAction === "OK") {
											var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
											oRouter.navTo('StockTable');
										}
									}.bind(this)
								});

							},
							error: function(oError) {
								MessageBox.error(oError);
							}
						});
					}
				},
				error: function(oError) {

					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}

			});
		},

		AutoPoCreationforMaterial: function(oEvent) {

			var oPurchaseItemTable = this.byId("awaitingTable");
			//	var sPath = oPurchaseItemTable.getSelectedContextPaths();
			//	var aSelectedIndex = oPurchaseItemTable.getSelectedIndices().reverse();
			var oStockModel = oView.getModel("oStockDataModel");

			var oSelectedRecord = oStockModel.getProperty(sPathSingle[0]);

			var that = this;

			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var oPurchaseContract = oPurchaseModel.getProperty("/TempContract");
			var oModel = this.getOwnerComponent().getModel("PurchaseSet");
			if (oSelectedRecord.Color === "red") {
				var Labst = parseInt(oSelectedRecord.Labst),
					Cgtlv = parseInt(oSelectedRecord.Cgtlv);
				var count = Cgtlv - Labst;
				//	var length = parseInt(count);
				for (var i = 0; i < count; i++) {
					var promise = new Promise(function(resolve, reject) {

						resolve();
					}).then(function(result) {

					});

					setTimeout(function() {
						//	for(var i=0 ; i<count ; i++){

						var Podata = new PurchaseHeader(oSelectedRecord);
						oView.getModel("PurchaseModel").setProperty("/TempContract", Podata);

						var oRequestPayload = oPurchaseContract.getPayloadRefill();

						var vln = oRequestPayload.PoitemSet.length;
						for (var vlen = 0; vlen < vln; vlen++) {

							oRequestPayload.PoitemSet[vlen].Ematerial = Podata.Matnr;
							oRequestPayload.PoitemSet[vlen].Material = Podata.Matnr;
							oRequestPayload.PoitemSet[vlen].ShortText = Podata.Description;
							oRequestPayload.PoitemSet[vlen].Plant = Podata.Werks;
							delete oRequestPayload.PoitemSet[vlen].Vendor;

						}

						oModel.create("/PoDisplaySet", oRequestPayload, {
							success: function(oRes, obj) {
								var PoNumber = oRes.Purchaseorder;
								MessageBox.show("Standard PO created under the number  #" + PoNumber + " ");

							},
							error: function(Error) {
								MessageBox.error(oError);
							}
						});
						/*	oModel.create("/PoDisplaySet", oRequestPayload, {
								success: that._onUpdateProdEntrySuccess.bind(that),
								error: that._onCreateEntryError.bind(that)
							});*/
						//	}

						console.log("Promise (fulfilled)", promise)
					}, 0);

					console.log("Promise (pending)", promise);

				}

			} else {
				MessageBox.warning("Quantity is not in Criticle level");
			}

		},

		MassUpdatePo: function(oEvent) {
			var Massupload2 = [];
			var len = Massupload.length;
			var ls = len - 1;
			if (Massupload[ls].Color === 'red') {

				Massupload2.push(Massupload[ls]);

			}

			console.log(Massupload2)
			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var oPurchaseContract = oPurchaseModel.getProperty("/TempContract");
			var oModel = this.getOwnerComponent().getModel("PurchaseSet");

			//  (async function loop() {
			//   for (let criticle = 0; criticle < Massupload.length; criticle++) {

			//   		var Labst = parseInt(Massupload[criticle].Labst),
			// 	Cgtlv = parseInt(Massupload[criticle].Cgtlv);
			// var count = Cgtlv - Labst;

			//     for (let CritCount = 0; CritCount < count; CritCount++) {
			//         await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
			//      //   console.log(i);
			//         			var Podata = new PurchaseHeader(Massupload[criticle]);
			// 		oView.getModel("PurchaseModel").setProperty("/TempContract", Podata);

			// 		var oRequestPayload = oPurchaseContract.getPayloadRefill();

			// 		var vln = oRequestPayload.PoitemSet.length;
			// 		for (var vlen = 0; vlen < vln; vlen++) {

			// 			oRequestPayload.PoitemSet[vlen].Ematerial = Podata.Matnr;
			// 			oRequestPayload.PoitemSet[vlen].Material = Podata.Matnr;
			// 			oRequestPayload.PoitemSet[vlen].ShortText = Podata.Description;
			// 			oRequestPayload.PoitemSet[vlen].Plant = Podata.Werks;
			// 			delete oRequestPayload.PoitemSet[vlen].Vendor;

			// 		}

			// 		oModel.create("/PoDisplaySet", oRequestPayload, {
			// 			success: function(oRes, obj) {
			// 				var PoNumber = oRes.Purchaseorder;
			// 				MessageBox.show("Standard PO created under the number  #" + PoNumber + " ");

			// 			},
			// 			error: function(Error) {
			// 				MessageBox.error(oError);
			// 			}
			// 		});

			//     }

			//   }
			// })();

		},

		onSavePurchaseOrder: function(oEvent) {
			var oRow = oEvent.getSource().getParent();
			var oBindingContext = oRow.getBindingContext('oStockDataModel');
			var oBindingModel = oBindingContext.getModel();
			sPathThreshold = oBindingContext.getPath();

			var oSelectedRecord = oBindingModel.getProperty(sPathThreshold);

			var Podata = new PurchaseHeader(oSelectedRecord);
			oView.getModel("PurchaseModel").setProperty("/TempContract", Podata);

			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var oPurchaseContract = oPurchaseModel.getProperty("/TempContract");
			var oModel = this.getOwnerComponent().getModel("PurchaseSet");

			var oRequestPayload = oPurchaseContract.getPayloadRefill();

			oModel.create("/PoDisplaySet", oRequestPayload, {
				success: this._onUpdateProdEntrySuccess.bind(this),
				error: this._onCreateEntryError.bind(this)
			});

			//	oPurchaseModel.refresh(true);

		},

		_onUpdateProdEntrySuccess: function(oObject, oResponse) {
			BusyIndicator.hide();
			var PoNumber = oResponse.data.PoNumber;

			//	this.getView().getModel("VHeader").refresh();
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.show("Standard PO updated under the number  #" + PoNumber + " ", {

				icon: sap.m.MessageBox.Icon.INFORMATION,

				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CLOSE],
				onClose: function(oAction) {
					if (oAction === "OK") {
						var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
						oRouter.navTo('StockTable');
					}
				}.bind(this)
			});

		},
		_onCreateEntryError: function(oError) {
			BusyIndicator.hide();

			MessageBox.error(
				"Error creating entry: " + oError.statusCode + " (" + oError.statusText + ")", {
					details: oError.responseText
				}
			);

		},

		// group search help close

		//validation function//
		Validate: function(evt) {
			var sValue = evt.mParameters.value;
			var sInput = evt.getSource().sId;
			var oinputbox = sap.ui.getCore().byId(sInput)
			var pattern = /[^\w]/;
			if (pattern.test(sValue)) {
				oinputbox.setValueState("Error");
				oinputbox.setValueStateText("Enter Valid Value");
			} else {
				oinputbox.setValueState("None");
				oinputbox.setValueStateText("");

			}

		},

		//numeric validation

		numValidate: function(evt) {
			var sValue = evt.mParameters.value;
			var sInput = evt.getSource().sId;
			var oinputbox = sap.ui.getCore().byId(sInput)
			var pattern = /[^\d]/;
			if (pattern.test(sValue)) {
				oinputbox.setValueState("Error");
				oinputbox.setValueStateText("Enter Numeric Value");
			} else {
				oinputbox.setValueState("None");
				oinputbox.setValueStateText("");

			}

		},
		onNotify: function(oEvent) {
			// var oModel = oView.getModel("oExcessModelData");
			var array = [];
			var count = 0;
			var oModel = oView.getModel("oStockDataModel");
			var Data = oModel.oData;
			console.log(Data);
			for (var i = 0; i < Data.length; i++) {

				if (Data[i].ALabst > parseInt(Data[i].Cgtlv)) {
					count = count + 1;

					array.push({
						Matnr: Data[i].Material,
						Description: Data[i].ShortText,
						Werks: Data[i].Plant,
						quantity: Data[i].Alabst,
						Labst: Data[i].Labst,
						counter: count,
						Changedon: Data[i].Changedon,
						markupDescription: true
					});
			sap.ui.getCore().getModel("oExcessDataModel").setData(array);
				
				}
			}

			var oMessageTemplate = new MessageItem({
				type: 'Warning',
				title: '{Matnr}' + " " + "material is in excess quantity",
				description: 'material is in excess quantity',
				subtitle: '{quantity}',
				counter: '{counter}',
				markupDescription: "{markupDescription}",
				// link: oLink
			});

			var oModel2 = new JSONModel(),
				that = this;
			oModel2.setData(array);
			this.oMessageView = new MessageView({
				showDetailsPageHeader: false,
				itemSelect: function() {
					oBackButton.setVisible(true);
				},
				items: {
					path: "/",
					template: oMessageTemplate
				}
			});
			var oBackButton = new Button({
				icon: IconPool.getIconURI("nav-back"),
				visible: false,
				press: function() {
					that.oMessageView.navigateBack();
					that._oPopover.focus();
					this.setVisible(false);
				}
			});
			this.oMessageView.setModel(oModel2);
			var oCloseButton = new Button({
					text: "Close",
					press: function() {
						that._oPopover.close();
					}
				}),
				oPopoverFooter = new Bar({
					contentRight: oCloseButton
				}),
				oPopoverBar = new Bar({
					contentLeft: [oBackButton],
					contentMiddle: [
						new Text({
							text: "Messages"
						})
					]
				});
			this._oPopover = new Popover({
				customHeader: oPopoverBar,
				contentWidth: "1000px",
				contentHeight: "400px",
				verticalScrolling: false,
				modal: true,
				content: [this.oMessageView],
				footer: oPopoverFooter
			});
			this.oMessageView.navigateBack();
			this._oPopover.openBy(oEvent.getSource());
		},

		onNotifyHierarchy: function(oEvent) {
			var oModel = oView.getModel("oExcessHierarchy");

			var oMessageTemplate = new MessageItem({
				type: 'Warning',
				title: '{Maingrp}' + " " + "is in excess quantity",
				description: '{Maingrp}' + " " + 'is in excess quantity',
				subtitle: '{quantity}',
				counter: '{counter}',
				markupDescription: "{markupDescription}",
				// link: oLink
			});

			var oModel2 = new JSONModel(),
				that = this;
			oModel2.setData(oModel.oData);
			this.oMessageView = new MessageView({
				showDetailsPageHeader: false,
				itemSelect: function() {
					oBackButton.setVisible(true);
				},
				items: {
					path: "/",
					template: oMessageTemplate
				}
			});
			var oBackButton = new Button({
				icon: IconPool.getIconURI("nav-back"),
				visible: false,
				press: function() {
					that.oMessageView.navigateBack();
					that._oPopover.focus();
					this.setVisible(false);
				}
			});
			this.oMessageView.setModel(oModel2);
			var oCloseButton = new Button({
					text: "Close",
					press: function() {
						that._oPopover.close();
					}
				}),
				oPopoverFooter = new Bar({
					contentRight: oCloseButton
				}),
				oPopoverBar = new Bar({
					contentLeft: [oBackButton],
					contentMiddle: [
						new Text({
							text: "Messages"
						})
					]
				});
			this._oPopover = new Popover({
				customHeader: oPopoverBar,
				contentWidth: "1000px",
				contentHeight: "400px",
				verticalScrolling: false,
				modal: true,
				content: [this.oMessageView],
				footer: oPopoverFooter
			});

			this.oMessageView.navigateBack();
			this._oPopover.openBy(oEvent.getSource());

		},
		//sales order service
		getSalesOrderDetails: function() {

			var oModel = this.getOwnerComponent().getModel("StockModel");
			BusyIndicator.show(true);
			oModel.read("/SalesOrdersSet ", {

				success: function(oData) {
					BusyIndicator.hide();
					console.log(oData);
					var iItem = oData.results.length;
					var aListofVendoritem = [];
					for (var iRowIndex = 0; iRowIndex < iItem; iRowIndex++) {
						//		console.log(iRowIndex);
						var Matnr = oData.results[iRowIndex].Matnr;
						aListofVendoritem.push({
							Matnr: Matnr

						});
					}
					var index = {};

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

					result.sort(function(a, b) {
						return b.count - a.count;
					});
					//		console.log(result);
					var sResultlengrh = result.length;

					var data = oData.results;

					for (var x = 0; x < result.length; x++) {

						var orderCount = 0;
						for (var j = 0; j < data.length; j++) {
							if (result[x].Matnr === data[j].Matnr) {
								orderCount = orderCount + parseInt(data[j].Kwmeng);

								result[x].Kwmeng = orderCount.toString();

							}

						}

					}
					//console.log(result);
					sap.ui.getCore().getModel("oSaleModel").setData(result);

				},

				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}

			});

		},
		onStockSelectionItem: function() {
			var oTreetable = this.byId("TreeTableBasic2");
			var aSelectedIndex = oTreetable.getSelectedIndices();
			if (aSelectedIndex.length) {
				this.pressidMainitainPlant = oView.byId("idMainitainPlant");
				if (!this.pressidMainitainPlant) {
					this.pressidMainitainPlant = sap.ui.xmlfragment("com.vSimpleApp.fragment.Stock.MaintainPlant", this);
					this.pressidMainitainPlant.open();
				}
			} else {
				MessageBox.error("Please Select Material");
			}

		},
		OnMainPlantStockTransfer: function(oEvent) {
			this.pressidMainitainPlant.close();
			this.pressidMainitainPlant.destroy();
			var oTreetable = this.byId("TreeTableBasic2");
			var oStockFinal = [];
			var oMaintainPlant = sap.ui.getCore().getModel("ThresholdModel");
			var splantt = oMaintainPlant.oData.SupplyingPlant;
			var ItemPlant = oMaintainPlant.oData.ItemPlant;

			var oTreeModel = this.getOwnerComponent().getModel("oStockDataModel");
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");

			var aSelectedIndex = oTreetable.getSelectedIndices();
			for (var i = 0; i < aSelectedIndex.length; i++) {
				var odata = aSelectedIndex[i];
				var stock = oTreeModel.getProperty('/' + odata);

				oStockFinal.push(stock);
				oStockFinal[i].Plant = ItemPlant;
			}

			oPurchaseModel.setProperty("/TempContract/PoitemSet", oStockFinal);
			oPurchaseModel.setProperty("/TempContract/SupplPlnt", splantt);

			if (splantt !== "" && splantt !== undefined && ItemPlant !== "" && ItemPlant !== undefined) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

				oRouter.navTo('StockTransfer');
				var table = this.byId("TreeTableBasic2");
				table.clearSelection();
			} else {
				MessageBox.error("Please select Plant");
			}

		},
		onCloseDialogMaintain: function() {
			this.pressidMainitainPlant.close();
			this.pressidMainitainPlant.destroy();
		},

		onPressItem: function(event) {

			var oTreetable = this.byId("TreeTableBasic2");
			var aSelectedIndex = oTreetable.getSelectedIndices();

			var spath = event.getParameters().rowContext.sPath;
			itemindex.push(spath);

		},

		onRowSelectionChange: function(event) {

			var index = event.oSource.mProperties.selectedIndex;
			spathh = event.getParameters().rowContext.sPath;
			EventArray.push({
				index: index,
				spathh: spathh
			});

		},

		onExcessMaterial: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("ExcessData");
			var table = this.byId("TreeTableBasic2");
			table.clearSelection();
			window.location.reload();

		},

		onSaveExcessScreen: function() {
			this.pressDialogExcessMaterial.close();
			this.pressDialogExcessMaterial.destroy();
		},

		onCancelExcessScreen: function() {
			this.pressDialogExcessMaterial.close();
			this.pressDialogExcessMaterial.destroy();
		},

		getRunRate: function() {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			BusyIndicator.show(true);
			oModel.read("/runrateSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var iItem = oData.results.length;
					var saleset = [];
					for (var iRowIndex = 0; iRowIndex < iItem; iRowIndex++) {

						var Matnr = oData.results[iRowIndex].Matnr;
						saleset.push({
							Matnr: Matnr

						});
					}
					var index = {};

					saleset.forEach(function(point) {
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
							Totalsaleset.push(newEntry);
						}
					});
					//	console.log(result);
					Totalsaleset.sort(function(a, b) {
						return b.count - a.count;
					});

					var data = oData.results;

					for (var x = 0; x < Totalsaleset.length; x++) {
						var orderCount = 0;
						for (var j = 0; j < data.length; j++) {
							if (Totalsaleset[x].Matnr === data[j].Matnr) {
								orderCount = orderCount + parseInt(data[j].Kwmeng);
								Totalsaleset[x].Kwmeng = orderCount.toString();
							}

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
		onSelectionChange: function(oEvent) {

		},
		onSkuList: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("SkuList");
		},
		onMenuButtonPress: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("ShowTiles");
		}

	});
});