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
	'sap/ui/core/IconPool'
//siddhi
], function(Controller, ColumnListItem, jQuery, MessageToast, MessageBox, History, BusyIndicator, JSONModel, library, Input, Fragment,
	Filter, FilterOperator, Button, Toolbar, Dialog, DialogType, ButtonType, Label, Text, TextArea, Core, formatter, RebateConditionItemPO,
	PurchaseHeader, StockContract, Link, MessageItem, MessageView, Popover, Bar, IconPool) {
	"use strict";
	var oView, oComponent, sPathThreshold , PoDocumentNumber = [];
	var groups ,StockTransfer = [];
	var Massupload = [];
	var yellow;
	var green;
	var blue;

	var StockList;

	var sPathSingle, sPathHierarchy;
	var oController;
	var oMaterialList = [];
	var allfiltersLevelFirst = [],
		allfiltersLevelSecond = [];
	var result = [];
	var CompanyLevelset = [];
	var TotalLabst = [];
	var PoQuantity= [];
	return Controller.extend("com.vSimpleApp.controller.ManageStockTable", {
		//formatter: formatter,
		formatter: formatter,

		onInit: function() {
			oController = this;
			oView = this.getView();
			var oModel = this.getOwnerComponent().getModel("StockModel");
			
			
			oComponent = this.getOwnerComponent();
			//set the model on view to be used by the UI controls
			this.getView().setModel(oModel);
			
			var oLookup = this.getOwnerComponent().getModel("Lookup");
		 PoDocumentNumber = oLookup.oData.PoDocumentNumber;
			console.log(PoDocumentNumber);
			
			//		this.getMaterialstockSet11();
			this.getMaterialList();
			var collectionItemMode = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(collectionItemMode, "collectionItemMode");

			this.getMainGroupList();
			//oController.getTableStockDetails();
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

		
			this.getMaterialstockSet();
	//		this.getStockDetailList();
			//	this.getStockDetailListSiddhi();
			var oExcessModelData = new JSONModel();
			oView.setModel(oExcessModelData, "oExcessModelData");
			var oExcessHierarchy = new JSONModel();
			oView.setModel(oExcessHierarchy, "oExcessHierarchy");

			var oAutoPoCreation = new JSONModel();
			oView.setModel(oAutoPoCreation, "AutoPoData");

			var oHierarchyData = new JSONModel();
			oView.setModel(oHierarchyData, "HierarchyData");
			this.getHierarchy();

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
			this.getSalesOrderDetails();

			var oSaleModel = new JSONModel();
			sap.ui.getCore().setModel(oSaleModel, "oSaleModel");
		//	this.getSalesOrderDetails();

			this.initializeView();

			var oCompanyLevel = new JSONModel();
			sap.ui.getCore().setModel(oCompanyLevel, "oCompanyLevel");
            
             this.getPodetailsset();
             
             var oPoData = new JSONModel();
            oView.setModel(oPoData,"oPoData");
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

		getMaterialstockSet11: function() {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			oModel.read('/getMaterialstockSet', {
				success: function(odata) {

					CompanyLevelset = odata.results;
					//	console.log(CompanyLevelset);

					var iItem = odata.results.length;
					var ListItem = [];
					for (var iRowIndex = 0; iRowIndex < iItem; iRowIndex++) {

						var Matnr = odata.results[iRowIndex].Matnr;
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

					var data = odata.results;

					for (var x = 0; x < TotalLabst.length; x++) {
						var orderCount = 0;
						for (var j = 0; j < data.length; j++) {
							if (TotalLabst[x].Matnr === data[j].Matnr) {
								orderCount = orderCount + parseInt(data[j].Labst)
								TotalLabst[x].Labst = orderCount.toString();
							}

						}

					}
					console.log(TotalLabst);

				},
				error: function(oerror) {
					MessageBox.error(oerror);
				}
			});
		},

		getStockDetailListSiddhi: function() {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			BusyIndicator.show(true);
			oModel.read("/STOCK_DATASet", {
				success: function(oData) {
					BusyIndicator.hide();

					var len = oData.results.length;
					var UniqueMatnr = [];

					var ListofSrs = [];
					for (var iRowIndex = 0; iRowIndex < len; iRowIndex++) {
						var odataset = oData.results[iRowIndex];

						var Cbtlv = parseInt(odataset.Cbtlv);
						var Cytlv = parseInt(odataset.Cytlv);
						var Cgtlv = parseInt(odataset.Cgtlv);
						var Changedon = odataset.Changedon;
						var Crtlv = parseInt(odataset.Crtlv);
						var Labst = parseInt(odataset.Labst);

						var Matnr = odataset.Matnr;

						var Werks = odataset.Werks;
						var arr = [];
						var arr2 = [];

						if (Matnr !== "" || Matnr !== undefined) {
							for (var x = 0; x < CompanyLevelset.length; x++) {
								if (Matnr === CompanyLevelset[x].Matnr) {
									var sCompanyCode = CompanyLevelset[x].Bukrs;
									var sStorageLoc = CompanyLevelset[x].Lgort;

								}
							}
						}

						if (Matnr !== "" || Matnr !== undefined) {
							for (var z = 0; z < TotalLabst.length; z++) {
								if (Matnr === TotalLabst[z].Matnr) {
									var sTotalLabst = TotalLabst[z].Labst;

								}
							}
						}

						if (!UniqueMatnr.includes(Matnr)) {
							UniqueMatnr.push(Matnr);

							ListofSrs.push({
								Matnr: Matnr,
								CompanyCode: sCompanyCode,
								Crtlv: Crtlv,
								Cytlv: Cytlv,
								Cgtlv: Cgtlv,
								Cbtlv: Cbtlv,
								TLabst: parseInt(sTotalLabst),
								Changedon: Changedon,

								Color: "",
								MultipleIt: arr
							});
							sCompanyCode = "";
							sTotalLabst = "";
							arr.push({

								Werks: Werks,

								Changedon: Changedon,

								Plant: arr2
									// 	Crtlv: "",
									// Cytlv: "",
									// Cgtlv: "",
									// Cbtlv: ""

							});

							arr2.push({
								Werks: "S.L " + sStorageLoc,
								Labst: Labst,
								Changedon: Changedon,
								Crtlv: Crtlv,
								Cytlv: Cytlv,
								Cgtlv: Cgtlv,
								Cbtlv: Cbtlv

							});
						} else {

							var index = ListofSrs.length - 1;
							ListofSrs[index].MultipleIt.push({

								Werks: Werks,

								Changedon: Changedon,

								Plant: arr2

							});

							arr2.push({
								Werks: "S.L " + sStorageLoc,
								Labst: Labst,
								Changedon: Changedon,
								Crtlv: Crtlv,
								Cytlv: Cytlv,
								Cgtlv: Cgtlv,
								Cbtlv: Cbtlv

							});
						}
					}

					console.log(ListofSrs);
					console.log("--------")
					console.log(UniqueMatnr);

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
					var ListofSrs = [];
					var listOfMat = [];
					var MaterialList = [];
					var len = oData.results.length;
					var childarray = [];
					var InnerChild = [];
					var InnerinnerChild = [];

					function userExists(Bukrs) {
						return childarray.some(function(el) {
							return el.Bukrs === Bukrs;
						});
					}

					function PlantExists(Werks) {
						return InnerChild.some(function(edl) {
							return edl.Werks === Werks;
						});
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
//var openpo = PoDocumentNumber[iRowIndex].Bedat;
						var Matnr = odataset.Matnr;
						if (Matnr !== "" || Matnr !== undefined) {
							for (var z = 0; z < TotalLabst.length; z++) {
								if (Matnr === TotalLabst[z].Matnr) {
									var sTotalLabst = TotalLabst[z].Labst;

								}
							}
						}

						if (Matnr !== "" || Matnr !== undefined) {
							for (var x = 0; x < oMaterialList.length; x++) {
								if (Matnr === oMaterialList[x].Materialno) {
									var sMatDescription = oMaterialList[x].Description;

								}
							}
						}
							if (Matnr !== "" || Matnr !== undefined) {
							for (var x1 = 0; x1 <=result.length-1; x1++) {
							
								if (Matnr === result[x1].Matnr) {
								var sOpenSalesOrder = result[x1].Kwmeng;
                                
								}
							}
						}
									if (Matnr !== "" || Matnr !== undefined) {
							for (var x2 = 0; x2 <PoQuantity.length; x2++) {
							
								if (Matnr === PoQuantity[x2].Matnr) {
								var sOpenPoQuantity = PoQuantity[x2].Menge;
								var sOpenPoDate = PoQuantity[x2].Prdat;
                                
								}
							}
						}
						
						ListofSrs.push({
							Cbtlv: Cbtlv,
							Cgtlv: Cgtlv,
							Cytlv: Cytlv,
							Changedon: Changedon,
							Crtlv: Crtlv,
							Labst: parseInt(sTotalLabst),
							ALabst:parseInt(sTotalLabst),
							Matnr: Matnr,
							Description: sMatDescription,
							Werks: Werks,
							Color: "",
							MultipleIt: childarray,
							OsalesOrder:sOpenSalesOrder,
							OpenPODate:sOpenPoDate,
							OpenPOQty:sOpenPoQuantity
						});
					console.log(sOpenPoDate);

						for (var j = 0; j < StockList.length; j++) {
							var stock = StockList[j];
							var Bukrs = stock.Bukrs;
							var Lbkum = stock.Lbkum;
							var Labst = stock.Labst;
							var Lgort = stock.Lgort;
							var Werkss = stock.Werks;
							var Matnr2 = stock.Matnr;

							if (Matnr === Matnr2) {
								//	console.log(sum);

								if (userExists(Bukrs)) {
									// childarray.push({
									// 		//	Bukrs: Bukrs,
									// 		Labst: Labst,
									// 		//Matnr: 'Company Level' + " " + Bukrs,
									// 		//	Lgort: Lgort,
									// 		//	Werks: Werks,
									// 		MultipleIt: InnerChild

									// 	});

									if (PlantExists(Werkss)) {

										// 	InnerChild.push({
										// 	//	Bukrs: Bukrs,
										// 	Labst: Labst,
										// 	//	Lgort: Lgort,
										// 	Matnr: 'Plant' + " " + Werks,
										// 	//	Werks: Werks,
										// 	MultipleIt: InnerinnerChild

										// });

										InnerinnerChild.push({
											//	Bukrs: Bukrs,
											Labst: Labst,
											
												Crtlv: "crtlv",
										Cytlv: "cytlv",
										Cgtlv: "cgtlv",
										Cbtlv: "cbtlv",

											Matnr: 'SLoc' + " " + Lgort,
											OsalesOrder:"So"

										});
									} else {
										InnerChild.push({
											//	Bukrs: Bukrs,
									
											//	Lgort: Lgort,
											Matnr: 'Plant' + " " + Werks,
											Werks: Werks,
											MultipleIt: InnerinnerChild,
											OsalesOrder:"So"
										
											

										});

										InnerinnerChild.push({
											//	Bukrs: Bukrs,
											Labst: Labst,
											

											Matnr: 'SLoc' + " " + Lgort,
											Crtlv: "crtlv",
											Cytlv: "cytlv",
											Cgtlv: "cgtlv",
											OsalesOrder:"So"

										});

									}

								} else {
									childarray.push({
										Bukrs: Bukrs,
										BLabst:"AL",
										ALabst:" ",
										Labst: sTotalLabst,
										Matnr: 'Company Level' + " " + Bukrs,
										Crtlv: "crtlv",
										Cytlv: "cytlv",
										Cgtlv: "cgtlv",
										Cbtlv: "cbtlv",
										OsalesOrder:sOpenSalesOrder,

										//	Lgort: Lgort,
										//	Werks: Werks,
										MultipleIt: InnerChild,
										OpenPODate:sOpenPoDate,
							            OpenPOQty:sOpenPoQuantity

									});
									sOpenSalesOrder="";
								    sOpenPoDate="";
						            sOpenPoQuantity="";

									InnerChild.push({
										//	Bukrs: Bukrs,
										// Labst: Labst,
										//	Lgort: Lgort,
										Matnr: 'Plant' + " " + Werks,
										Crtlv: "crtlv",
										Cytlv: "cytlv",
										Cgtlv: "cgtlv",
										Cbtlv: "cbtlv",
										Werks: Werks,
										MultipleIt: InnerinnerChild,
										OsalesOrder:"So"

									});

									InnerinnerChild.push({
										//	Bukrs: Bukrs,
										Labst: Labst,
										Crtlv: "crtlv",
										Cytlv: "cytlv",
										Cgtlv: "cgtlv",
										Cbtlv: "cbtlv",

										Matnr: 'SLoc' + " " + Lgort,
										OsalesOrder:"So"

									});

								}

								//	childarray.push(StockList[j]);
								//	console.log(StockList[j]);

							}
						}
						InnerChild = [];
						InnerinnerChild = [];
						childarray = [];
					

					}

					oView.getModel("oStockDataModel").setData(ListofSrs);
					console.log(ListofSrs);



					Massupload = ListofSrs;

				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
		getMaterialstockSet: function() {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			oModel.read('/getMaterialstockSet', {
				success: function(odata) {
					StockList = odata.results;
					console.log(odata);
					var iItem = odata.results.length;
					var ListItem = [];
					for (var iRowIndex = 0; iRowIndex < iItem; iRowIndex++) {

						var Matnr = odata.results[iRowIndex].Matnr;
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

					var data = odata.results;

					for (var x = 0; x < TotalLabst.length; x++) {
						var orderCount = 0;
						for (var j = 0; j < data.length; j++) {
							if (TotalLabst[x].Matnr === data[j].Matnr) {
								orderCount = orderCount + parseInt(data[j].Labst)
								TotalLabst[x].Labst = orderCount.toString();
							}

						}

					}
				//	console.log(TotalLabst);
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
		BuyerSheetChat: function(oEvent) {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("BuyerSheet");
		},
		onFilterSelect: function(oEvent) {
			var oBinding = this.byId("TreeTableBasic2").getBinding("rows"),
				//	var oBinding1 = this.getView().byId("TreeTableBasic2").getBinding("rows");
				sText = oEvent.getSource();
			var sKey = sText.mProperties.text;
				//	sKey = oEvent.getParameter("text"),

			var	aFilters = [],
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
			oBinding.filter(aFilters,null);
		//	oBinding.filter('Color', null);
		},
		onFilterSelectHierarchy: function(oEvent) {
			var oBinding = this.byId("awaitingTable2").getBinding("items"),
				sText = oEvent.getSource();
			var sKey = sText.mProperties.text,
				//	sKey = oEvent.getParameter("text"),

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

			var tbl = oView.byId("awaitingTable2");
			tbl.setBusy(true);
			this.getHierarchy();
			tbl.setBusy(false);
		},
		OnclearFilter: function(oEvent) {

			/*	var tbl = oView.byId("TreeTableBasic2");
				tbl.setBusy(true);
				this.getStockDetailList();
				tbl.setBusy(false);*/
			var oMatModel = oView.getModel("MatData");
			oMatModel.refresh(true);

			oMatModel.setData({
				oData: {}
			});
			oMatModel.updateBindings(true);
			var tbl = oView.byId("TreeTableBasic2");
			tbl.setBusy(true);
			this.getStockDetailList();
			tbl.setBusy(false);
		},
		getTableStockDetail1s: function() {
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
							OpenSO: sOpenSalesOrder,
							Pbtlv: Pbtlv,
							Pgtlv: Pgtlv,
							Prtlv: Prtlv,
							Pytlv: Pytlv,
							Werks: Werks,
							Color: ""

						});
						//	console.log(ListofSrs);

						oView.getModel("oStockDataModel").setData(ListofSrs);
						sOpenSalesOrder = "";
					//	console.log(ListofSrs);

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

		//	return new Promise ( function(ee,we){

		getPurchaseOrder: function(critstate) {
			var oModels = this.getOwnerComponent().getModel("PurchaseSet");
			return new Promise(function(resolve, reject) {
				console.log(critstate);

				//	return new Promise(function(res,rej){
				console.log(critstate);
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
						alert("sucess");
						//resolve("Sucess promiss");
					},

					error: function(Error) {

						//reject(Error);
					}
				});

			});

			//		});	

			//	});	

		},
		//	});

		/*Material Number Search start*/
		getMaterialList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			//	BusyIndicator.show(true);
			oModel.read("/MaterialmasterSet", {
				success: function(oData) {
					//		BusyIndicator.hide();
					oMaterialList = oData.results;
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/MaterialList", oMaterialList);
					oLookupModel.refresh(true);
					that.getStockDetailList();
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

		handleMaterialHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			sap.ui.getCore().inputIdMaterial = oEvent.getSource().getId();
			//eate value help dialog
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
		getPOPlant: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");

			oModel.read("/get_plant_f4helpSet", {
				success: function(oData) {

					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/POPlant", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {

					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		_handlePlantClose: function(evt) {
			var oMatModel = oView.getModel("MatData");

			var sMaterialno = oMatModel.oData.Material;
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId);
				productInput.setValue(oSelectedItem.getTitle());
				var oModel = this.getOwnerComponent().getModel("StockModel");
				var sPlant = oSelectedItem.getTitle();
				var zero = "";

				if ($.isNumeric((sMaterialno)) === true) {
					var len = sMaterialno.length;
					if (len !== undefined) {
						var z = 18 - len;
						for (var i = 0; i < z; i++) {
							zero += "0";
						}
					}

					sMaterialno = zero + sMaterialno;
				}

				var oFilter = new sap.ui.model.Filter('Werks', sap.ui.model.FilterOperator.EQ, sPlant);
				var oFilterV = new sap.ui.model.Filter('Matnr', sap.ui.model.FilterOperator.EQ, sMaterialno);
				BusyIndicator.show(true);
				oModel.read("/STOCK_DATASet?$filter=(Matnr eq '" + sMaterialno + "'and Werks eq '" + sPlant + "')", {
					filters: [oFilter, oFilterV],

					success: function(oData) {
						BusyIndicator.hide();
						//get the price from passing filtered vendor and material no

						oMatModel.refresh();
						/*oMatModel.setData({
									oData: {}
								});
						oMatModel.updateBindings(true);*/
						var len = oData.results.length;

						var ListofSrs = [];
						for (var iRowIndex = 0; iRowIndex < len; iRowIndex++) {
							var odataset = oData.results[iRowIndex];

							var Cbtlv = odataset.Cbtlv;
							var Cytlv = odataset.Cytlv;
							var Cgtlv = odataset.Cgtlv;
							var Changedon = odataset.Changedon;
							var Crtlv = odataset.Crtlv;
							var Labst = odataset.Labst;

							var Matnr = odataset.Matnr;
							var Pbtlv = odataset.Pbtlv;
							var Pgtlv = odataset.Pgtlv;
							var Prtlv = odataset.Prtlv;
							var Pytlv = odataset.Pytlv;
							var Werks = odataset.Werks;

							if (Matnr !== "" || Matnr !== undefined) {
								for (var x = 0; x < CompanyLevelset.length; x++) {
									if (Matnr === CompanyLevelset[x].Matnr) {
										var sCompanyCode = CompanyLevelset[x].Bukrs;
										// var sStorageLoc = CompanyLevelset[x].Lgort;

									}
								}
							}
							var CompanyCode = sCompanyCode;

							ListofSrs.push({
								Cbtlv: Cbtlv,
								Cgtlv: Cgtlv,
								Cytlv: Cytlv,
								Changedon: Changedon,
								CompanyCode: CompanyCode,
								Crtlv: Crtlv,
								Labst: parseInt(Labst),
								Matnr: Matnr,
								Pbtlv: Pbtlv,
								Pgtlv: Pgtlv,
								Prtlv: Prtlv,
								Pytlv: Pytlv,
								Werks: Werks

							});

						}
						console.log(ListofSrs);

						oView.getModel("oStockDataModel").setData(ListofSrs);

						sap.ui.getCore().getModel("oHierarchyModel").setData(ListofSrs);

					},
					error: function(oError) {
						BusyIndicator.hide();
						MessageBox.error("No price found for given material number and plant combination. Add the price manually.");
					}

				});
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
				"Bwkey",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Bwkey",
				FilterOperator.Contains, sInputValue
			)]));
			this.getPOPlant();
			// open value help dialog filtered by the input value
			this._valueHelpDialogp.open(sInputValue);

		},
		_handlePlantSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Bwkey",
				FilterOperator.Contains, sValue
			), new Filter(
				"Bwkey",
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
				"Bwkey",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Bwkey",
				FilterOperator.Contains, sInputValue
			)]));
			this.getPOPlant();
			// open value help dialog filtered by the input value
			this._valueHelpDialogpp.open(sInputValue);

		},
		_handlePlantAddSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Bwkey",
				FilterOperator.Contains, sValue
			), new Filter(
				"Bwkey",
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
			console.log(sPathThreshold);

			/** @type {cassini.sim.model.Document} */
			var oSelectedRecord = oBindingModel.getProperty(sPathThreshold);
			console.log(oSelectedRecord);

			//	oView.getModel("oSelectedTabdata").setData(oSelectedRecord);
			var SingleSelectData = new JSONModel();
			SingleSelectData.setData(oSelectedRecord);
			oView.setModel(SingleSelectData);

			sap.ui.getCore().setModel(SingleSelectData, "SingleSelectData");
			oView.getModel("oSelectedTabdata").setData(SingleSelectData);
			//	sap.ui.getCore().getModel("SingleSelectData").setData(oSelectedRecord);
			//	var oSource = oEvent.getSource();
			//	oSource.setBusy(true);

			this.pressDialogOpn = this.getView().byId("EditDialog");
			if (!this.pressDialogOpn) {
				this.pressDialogOpn = sap.ui.xmlfragment("com.vSimpleApp.fragment.Stock.EditData", this);
				//this.getView().addDependent(pressDialog);
				//  this.pressDialog.setModel(this.getView().getModel());
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
			this.pressDialogProdHi.close();
			this.pressDialogProdHi.destroy();
		},
		onCloseFu: function() {
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
			console.log(oTabSelectModel);
			var oEntry1 = {};
			var oContract = oTabSelectModel.oData.oData;
			var Material = oContract.Matnr;

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
			var Werks = oContract.Werks;

			/*	var Maingrp = oContract.Maingrp;
				var Grp = oContract.Grp;
				var Subgrp = oContract.Subgrp;

			*/
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

			/*oEntry1.Maingrp = Maingrp;
			oEntry1.Grp = Grp;
			oEntry1.Subgrp = Subgrp;
			console.log(oEntry1);*/
			var that = this;
			var mParameters = {
				success: function(oResponse, object) {
					that.OnclearFilter();
					MessageBox.show("Value update Sucessfully..");

					sap.ui.getCore().byId("EditDialog").destroy(null);

				},
				error: function(error) {
					//MessageBox.error(error);
					console.log(error);
					sap.ui.getCore().byId("EditDialog").destroy(null);

				},
				merge: false
			};
			var relPath = "/STOCK_DATASet(" + "Matnr=" + "'" + Matnr + "'" + "," + "Werks=" + "'" + Werks + "'" + ")";
			//	BusyIndicator.show(true);
			oModelService.update(relPath, oEntry1, mParameters);

			/*	this.pressDialogOpn.close();
			this.pressDialogOpn.destroy();
*/
		},
		datatime: function(dDate) {
			var s_doc_datePost = dDate;
			var Datepoststring = s_doc_datePost.toISOString();
			Datepoststring = Datepoststring.slice(0, -5);
			return Datepoststring;
		},
		onAddThreshold: function() {
			var oModel = sap.ui.getCore().getModel("ThresholdModel");
			var oModelService = this.getOwnerComponent().getModel("StockModel");
			var oEntry1 = {};
			var oContract = oModel.oData;
			var length = Object.keys(oContract).length;
			var odata = oModel.getData();
			if (!length > 0) {
				MessageBox.information("Please Enter the details");
				sap.ui.getCore().byId("updateDialog").destroy(null);

			} else {
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

				console.log(oEntry1);

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
						sap.ui.getCore().byId("updateDialog").destroy(null); //MessageBox.error(error);
						console.log(error);
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
				console.log(oModel);
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
				console.log(oTabSelectModel);
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
				console.log(oEntry1);
				var that = this;
				var mParameters = {
					success: function(oResponse, object) {
						that.OnclearFilter();
						MessageBox.show("Value update Sucessfully..");
						sap.ui.getCore().byId("ProdEditDialog").destroy(null);

					},
					error: function(error) {
						//MessageBox.error(error);
						console.log(error);
					},
					merge: false
				};
				var relPath = "/HierarchySet(" + "Prodid=" + "'" + Prodid + "'" + ")";
				//	BusyIndicator.show(true);
				oModelService.update(relPath, oEntry1, mParameters);

			}

			/*	this.pressDialogOpn.close();
			this.pressDialogOpn.destroy();
*/
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
				//this.getView().addDependent(pressDialog);
				//  this.pressDialog.setModel(this.getView().getModel());
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

						//oODataJSONModelDLSet.setData(oData);
						//var oList = sap.ui.getCore().byId("__xmlview3--ToolListItem");
						//set the selected level to the oHierarchyModel model
						//oView.setModel(oHierarchyModel, "hierarchy" + level);
						sap.ui.getCore().setModel(oHierarchyModel, "hierarchy" + level);

						//	console.log(oData);
					},
					error: function(oError) {
						console.log(oError);
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
					console.log(maxH);
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
				//this.getView().addDependent(pressDialog);
				//  this.pressDialog.setModel(this.getView().getModel());
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

			} else {
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
				/*	oEntry1.Pbtlv = Pbtlv;
					oEntry1.Prtlv = Prtlv;
					oEntry1.Pytlv = Pytlv;
					oEntry1.Pgtlv = Pgtlv;*/
				oEntry1.Changedon = Datepoststring;
				oEntry1.Prodid = Prodid;
				//	oEntry1.Labst = labstString;
				/*	oEntry1.Grpid = Grpid;
					oEntry1.Maingrpid = Maingrpid;
			
					oEntry1.Subgrpid = Subgrpid;*/
				oEntry1.Maingrp = Maingrp;
				oEntry1.Grp = Grp;
				//	oEntry1.Subgrp = Subgrp;
				console.log(oEntry1);
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
					console.log(oError);
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
						console.log("empty2");
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

					//		var odata =	previousData.concat(oProductList);

				},
				error: function(oError) {
					console.log(oError);
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
					console.log(oProductList);
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
				//	oView.byId("onClearHierarchy").setVisible(false);
				//	oView.byId("idclearMaterial").setVisible(true);

				ocheckModel.setProperty("/Hierarchy", false);
				ocheckModel.setProperty("/MaterialGroup", false);
				oView.byId("idButtonForm2").setVisible(false);

				oView.byId("idButtonForm").setVisible(true);

				oView.byId("SimpleFor").setVisible(true);

				ocheckModel.setProperty("/Material", true);
				//	oView.byId("checkboxform").setVisible(false);

			} else if (oselecttab === "Hierarchy") {
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
					console.log(oData);
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

			//eate value help dialog
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
								console.log(oData);
								if (!oData.results.length) {
									MessageBox.error("No items available for Stock hierarchy");
								} else {

									var Podata = new StockContract(oData);
									oView.getModel("PurchaseModel").setProperty("/StockContract", Podata);
									var oPurchaseModel = oView.getModel("PurchaseModel");
									oView.getModel("PurchaseModel").setProperty("/StockContract/PoitemSet", oData.results);

									var oPurchaseContract = oPurchaseModel.getProperty("/StockContract");
									var oRequestPayload = oPurchaseContract.getPayloadHierarchy();
									console.log(oRequestPayload);

									var vln = oRequestPayload.PoitemSet.length;
									for (var vlen = 0; vlen < vln; vlen++) {
										var num = vlen + 1;
										var s = num + "0" + "";
										while (s.length < 5) s = "0" + s;
										oRequestPayload.PoitemSet[vlen].PoItem = s;

										/*	oRequestPayload.PoitemSet[vlen].Ematerial = Podata.Matnr;
											oRequestPayload.PoitemSet[vlen].Material = Podata.Matnr;
												oRequestPayload.PoitemSet[vlen].ShortText = Podata.Description;
													oRequestPayload.PoitemSet[vlen].Plant = Podata.Werks;
										*/

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
														oRouter.navTo('ManageStockTable');
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
					console.log(oData);
					if (!oData.results.length) {
						MessageBox.error("No items available for Stock hierarchy");
					} else {

						var Podata = new StockContract(oData);
						oView.getModel("PurchaseModel").setProperty("/StockContract", Podata);
						var oPurchaseModel = oView.getModel("PurchaseModel");
						oView.getModel("PurchaseModel").setProperty("/StockContract/PoitemSet", oData.results);

						var oPurchaseContract = oPurchaseModel.getProperty("/StockContract");
						var oRequestPayload = oPurchaseContract.getPayloadHierarchy();
						console.log(oRequestPayload);

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
											oRouter.navTo('ManageStockTable');
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
						oRouter.navTo('ManageStockTable');
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
			var array =[];
			var count = 0;
			var oModel = oView.getModel("oStockDataModel");
			var Data = oModel.oData;
		console.log(Data);
			for (var i=0;i<Data.length;i++){
		
				if(Data[i].ALabst > parseInt(Data[i].Cgtlv)){
			  count = count + 1;
			 
				array.push({
					Matnr:Data[i].Matnr,
					Description : Data[i].Description,
					Werks:Data[i].Werks,
					quantity:Data[i].Alabst,
					Labst:Data[i].Labst,
					counter:count,
					Changedon:Data[i].Changedon,
					markupDescription:true
				});
				oView.getModel("oExcessModelData").setData(array);
			this.getOwnerComponent().getModel("oExcessDataModel").setData(array);
				// oView.getModel("oCounter").setData({
				// 	count:count
				// });
				// console.log(oCounter);
				}
			}
		  console.log(array);
			var oMessageTemplate = new MessageItem({
				type: 'Warning',
				title: '{Matnr}' + " " + "material is in excess quantity",
				description: 'material is in excess quantity',
				subtitle: '{quantity}',
				counter: '{counter}',
				markupDescription: "{markupDescription}",
				// link: oLink
			});
			/*  var aMockMessages = [{
			      type: 'Warning',
			      title: 'Error message',
			      description: 'First Error message description. \n' +
			      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
			      subtitle: 'Example of subtitle',
			      counter: 1
			  }];*/
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
			console.log(oModel.oData);
			var length = oModel.oData.length;

			var oMessageTemplate = new MessageItem({
				type: 'Warning',
				title: '{Maingrp}' + " " + "is in excess quantity",
				description: '{Maingrp}' + " " + 'is in excess quantity',
				subtitle: '{quantity}',
				counter: '{counter}',
				markupDescription: "{markupDescription}",
				// link: oLink
			});
			/*  var aMockMessages = [{
			      type: 'Warning',
			      title: 'Error message',
			      description: 'First Error message description. \n' +
			      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
			      subtitle: 'Example of subtitle',
			      counter: 1
			  }];*/
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
				oModel.read("/SalesOrdersSet ", {
					success: function(oData) {
						// 	var data = oData.results;
						// 	var data2=[];

						// 	console.log("data-----------------")
						// 	console.log(data);
						// 	oView.getModel("oSaleModel");
						// console.log("-----------------")
						// 	for(var i=0 ; i<data.length;i++){
						// 		if(!uniqueMatnr.includes(data[i].Matnr)){

						// 		    uniqueMatnr.push(data[i].Matnr)

						// 		}

						// 	}
						// 	console.log(uniqueMatnr)
						// 	console.log(data2);

						// 		for(var x=0 ;x<uniqueMatnr.length;x++)
						// 			var orderCount = 0;
						// 			for(var j=0 ;j<data.length; j++){
						// 		 		if(uniqueMatnr[x].===data[j].Matnr){
						// 		 		 orderCount=orderCount + parseInt(data[j].Kwmeng)
						// 		 	     uniqueMatnr[x].Kwmeng=orderCount.toString();
						// 		 		}
						// 		 	data2.push(data[j]);

						// 		 	}

						//	console.log(oData);
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
						//	console.log(result);
						result.sort(function(a, b) {
							return b.count - a.count;
						});
						//		console.log(result);
						var sResultlengrh = result.length;

						// console.log(result);

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
						//console.log(result);
						sap.ui.getCore().getModel("oSaleModel").setData(result);

					},

					error: function(oError) {

						var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
						MessageToast.show(errorMsg);
					}
				});
			},
			
		onStockSelectionItem: function() {
		
			var oTreetable = this.byId("TreeTableBasic2");
			var aSelectedIndex = oTreetable.getSelectedIndices();
			var oTreeModel = this.getOwnerComponent().getModel("oStockDataModel");

			//	var aPurchaseConditionItems = oPurchaseModel.getProperty("/TempContract/PoitemSet");
			for (var i = 0; i < aSelectedIndex.length; i++) {

				var odata = aSelectedIndex[i];
				var stock = oTreeModel.getProperty('/' +odata);
				StockTransfer.push(stock);
					
			var oStock =	this.getOwnerComponent().getModel("StockTransferModel").setData(StockTransfer);
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
											oRouter.navTo('StockTransfer');
			}
		},
		onExcessMaterial : function(oEvent){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("ExcessData");	
		
			
			// 	this.pressDialogExcess = oView.byId("idExcessDialog");
			// if (!this.pressDialogExcess) {
			// 	this.pressDialogExcess = sap.ui.xmlfragment("com.vSimpleApp.fragment.Stock.ExcessMaterial", this);
			// 	this.pressDialogExcess.open();
			// }
		},

			//comapny stock level service
   getPodetailsset: function(evt){
   	  var oModel = this.getOwnerComponent().getModel("StockModel");
   	  oModel.read("/podetails_forzstockSet",{
   	  	success: function(oData) {
					var data = oData.results;

					PoQuantity = data;
					console.log(PoQuantity);


				},
			
				error: function(oError) {
				
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
   	  	
   	  	
   	  });
   	  	
   	  
   }
   

	});
});