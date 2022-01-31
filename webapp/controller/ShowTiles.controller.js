sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/BusyIndicator",
	"sap/m/MessageToast",
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
	"sap/ui/export/Spreadsheet",
	"sap/ui/export/library",
	"com/vSimpleApp/model/VendorP2P",
	"sap/m/Dialog",
	"sap/m/DialogType",
	"sap/m/Button",
	"sap/m/ButtonType",
	"sap/ui/core/IconPool"

], function(Controller, JSONModel, Filter, FilterOperator, BusyIndicator, MessageToast, Export, ExportTypeCSV, MessageBox, Sorter,
	library, jQuery, RowAction, RowActionItem, RowSettings, Fragment, Spreadsheet, exportLibrary, VendorP2P, Dialog, DialogType, Button,
	ButtonType, IconPool) {
	"use strict";
	//global variable
	var Purchaseordernumber;
	var oView, oComponent, oController;
	var SortOrder = library.SortOrder;
	var EdmType = exportLibrary.EdmType;
	var ListofVendor = [],
		ListofPurchaseOrders = [];
	return Controller.extend("com.vSimpleApp.controller.ShowTiles", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.vSimpleApp.view.view.ShowTiles
		 */
		onInit: function() {
			oController = this;
			oView = this.getView();
			oComponent = this.getOwnerComponent();
			this.oSF = oView.byId("searchField");
			var sRootPath = jQuery.sap.getModulePath("com.vSimpleApp");

			//get the json data model.
			var oModel = new JSONModel([sRootPath, "data/LandingPageData.json"].join("/"));
			this.getView().setModel(oModel, "LandingPageModel");

			var oCountModel = new JSONModel();
			oView.setModel(oCountModel, "CountModel");

			//var VendorTileModel = oComponent.getModel("VendorTileModel");

			/*	var oTileMod = new JSONModel([sRootPath, "data/VendorTileName.json"].join("/"));
				sap.ui.getCore().setModel(oTileMod, "oTileModel");*/


			var oInputModel = new JSONModel({
				expression: ""
			});
			this.getView().setModel(oInputModel, "inputModel");

			//Visible disable model
			var oVisiblemodel = new JSONModel({
				isEditable: false,
				isVisible: true
			});

			this.getView().setModel(oVisiblemodel, "Visiblemodel");
			var oScreenModel = new JSONModel({
				isScreen: "Create Vendor"
			});

			this.getView().setModel(oScreenModel, "ScreenName");

			//calling function through init
			this.getVendorList();
			this.getTopProductsFirst();

			//	this.getPurchaseOrderList();

			// set explored app's demo model on this sample

			oView.setModel(new JSONModel({
				globalFilter: "",
				availabilityFilterOn: false,
				cellFilterOn: false
			}), "ui");
			this._oGlobalFilter = null;
			this._oPriceFilter = null;

			var fnPress = this.handleActionPress.bind(this);

			this.modes = [{
					key: "Navigation",
					text: "Navigation",
					handler: function() {
						var oTemplate = new RowAction({
							items: [
								new RowActionItem({
									type: "Navigation",
									press: fnPress,
									visible: "{Available}"
								})
							]
						});
						return [1, oTemplate];
					}
				}

			];

			this.getView().setModel(new JSONModel({
				items: this.modes
			}), "modes");
			this.switchState("Navigation");

			//declare boolean variable
			this.bDescending = false;
			this.sSearchQuery = 0;
			this.bGrouped = false;
			this.getVendorCountListByPO();

		},
	goHome: function(oEvent) {
				this.getOwnerComponent().getRouter().navTo("ShowTiles");
		},
		switchState: function(sKey) {
			var oTable = this.byId("tablePoorders");
			var iCount = 0;
			var oTemplate = oTable.getRowActionTemplate();
			if (oTemplate) {
				oTemplate.destroy();
				oTemplate = null;
			}

			for (var i = 0; i < this.modes.length; i++) {
				if (sKey === this.modes[i].key) {
					var aRes = this.modes[i].handler();
					iCount = aRes[0];
					oTemplate = aRes[1];
					break;
				}
			}

			oTable.setRowActionTemplate(oTemplate);
			oTable.setRowActionCount(iCount);

		},

		handleActionPress: function(oEvent) {
			var sPurchaseNumber = oEvent.getParameter("row").getRowBindingContext().getProperty("Ebeln");
			try {
				oComponent.getRouter().navTo("POITemDetails", {
					PoNo: sPurchaseNumber
				});
			} catch (ex) {
				MessageBox.error(ex);
			}

		},
		OnNavigateVendorDetails: function(oEvent) {

			//clear the data model
			try {
				var sPath = oEvent.getParameter("listItem").getBindingContextPath();
				//get the Prodno from this model
				var oModel = oView.getModel("Lookup");
				var oVendorpath = oModel.getProperty(sPath);
				var sVendor = oVendorpath.Lifnr;
				oComponent.getRouter().navTo("DisplayVendor", {
					VendorNo: sVendor
				});
			} catch (ex) {
				MessageBox.error(ex);
			}

		},
		pressGenericTileVendor: function(evt) {

			this.pressDialogIV = oView.byId("IdVendorLinks");
			if (!this.pressDialogIV) {
				this.pressDialogIV = sap.ui.xmlfragment("com.vSimpleApp.fragment.VendorDisplay.VendorLinks", this);
				this.getView().addDependent(this.pressDialogIV);
				this.pressDialogIV.open();

			}

		},
		handleLinkPress: function(evt) {

			if (evt.getSource().getProperty("title") === "Create Vendor") {

				this.getOwnerComponent().getModel("VisibleModel").setProperty("/isButtonEdit", false);
				sap.ui.getCore().byId("IdVendorLinks2").destroy(null);
				oComponent.getRouter().navTo("VendorDetail");

			} else if (evt.getSource().getProperty("title") === "Edit Vendor") {

				var sVendor = "Edit Vendor";
				//setting property to models
				this.getOwnerComponent().getModel("ScreenName").setProperty("/isScreen", sVendor);
				this.getOwnerComponent().getModel("VisibleModel").setProperty("/isVisible", true);

				//	oView.byId("iddEditt").setVisible(false);

				this.getOwnerComponent().getModel("VisibleModel").setProperty("/isButtonEdit", false);
				this.getOwnerComponent().getModel("VisibleModel").setProperty("/isButtonDisplay", true);

				this.getOwnerComponent().getModel("EditModel").setProperty("/isEditableVendor", true);
				sap.ui.getCore().byId("IdVendorLinks2").destroy(null);
				oComponent.getRouter().navTo("VendorDetail");

			} else if (evt.getSource().getProperty("title") === "Display Vendor") {

				var sVendor = "Display Vendor";
				//setting property to models
				this.getOwnerComponent().getModel("ScreenName").setProperty("/isScreen", sVendor);

				this.getOwnerComponent().getModel("VisibleModel").setProperty("/isVisible", true);
				//	oView.byId("btn_display").setVisible(false);
				//	oView.byId("iddEditt").setVisible(true);
				this.getOwnerComponent().getModel("VisibleModel").setProperty("/isButtonDisplay", false);
				this.getOwnerComponent().getModel("VisibleModel").setProperty("/isButtonEdit", true);

				this.getOwnerComponent().getModel("EditModel").setProperty("/isEditableVendor", false);
				sap.ui.getCore().byId("IdVendorLinks2").destroy(null);
				oComponent.getRouter().navTo("VendorDetail");

			}
		},
		closeLinkbox: function(evt) {
			this.pressDialogIV.close();
			this.pressDialogIV.destroy();
		},
		pressGenericTile: function(evt) {
			//navigate the property is selected subheader.
			if (evt.getSource().getProperty("header") === "Vendor Master") {
				oComponent.getRouter().navTo("VendorDetail");
			} else if (evt.getSource().getProperty("header") === "Purchase Order") {
				oComponent.getRouter().navTo("PoHeaderList");
			} else if (evt.getSource().getProperty("header") === "Post Goods Receipt") {
				oComponent.getRouter().navTo("GoodReceipt");
			} else if (evt.getSource().getProperty("header") === "Book Vendor Invoice") {
				oComponent.getRouter().navTo("Dashboard");
			} else if (evt.getSource().getProperty("header") === "Vendor Rebate Management") {
				oComponent.getRouter().navTo("DashboardVendor");
			} else if (evt.getSource().getProperty("header") === "Manage Stock") {
				oComponent.getRouter().navTo("StockTable");
			}

		},

		// Get  Top five vendor and get their counts

		getVendorCountListByPO: function() {

			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(true);
			return new Promise(function(resolve1, reject1) {
				oModel.read("/POHeaderSet", {
					success: function(oData) {
						BusyIndicator.hide(false);

						var iItem = oData.results.length;
						var aListofVendoritem = [];

						for (var iRowIndex = 0; iRowIndex < iItem; iRowIndex++) {
							//		console.log(iRowIndex);
							var Lifnrr = oData.results[iRowIndex].Lifnr;

							aListofVendoritem.push({
								Lifnr: Lifnrr

							});
						}

						var index = {};
						var result = [];

						aListofVendoritem.forEach(function(point) {
							var key = "" + point.Lifnr + " ";

							if (key in index) {
								index[key].count++;
							} else {
								var newEntry = {
									Lifnr: point.Lifnr,
									//	Name1 : vendorname,
									count: 1
								};
								index[key] = newEntry;
								result.push(newEntry);

							}
						});
						//		console.log(result);

						result.sort(function(a, b) {
							return b.count - a.count;
						});
						//		console.log(result);
						var sResultlengrh = result.length;
						var aListofVendoritemTwo = [];
						for (var iRowIndex = 1; iRowIndex <= 5; iRowIndex++) {

							var sLifnrr = result[iRowIndex].Lifnr;
							var scounts = result[iRowIndex].count;
							var sname = result[iRowIndex].VendorNameee;
							if (sLifnrr !== "" || sLifnrr !== undefined) {
								for (var x = 0; x < ListofVendor.length; x++) {
									if (sLifnrr === ListofVendor[x].Lifnr) {
										var sVendorname = ListofVendor[x].Name1;
										sname = sVendorname;
									}
								}
							}
							aListofVendoritemTwo.push({
								Lifnr: sLifnrr,
								count: scounts,
								name: sname

							});
						}

						//top five vendor model with the count
						var oCountModel = oView.getModel("CountModel");
						oCountModel.setData(aListofVendoritemTwo);

						var iItmcount = oCountModel.oData.length;
						for (var iRowIndex = 0; iRowIndex < iItmcount; iRowIndex++) {
							var sLifnrr = oCountModel.oData[iRowIndex].Lifnr;
							var aFilter = [
								new sap.ui.model.Filter({
									path: "Lifnr",
									operator: sap.ui.model.FilterOperator.EQ,
									value1: sLifnrr
								})

							];

						}

						var aListofVendorTopThree = [];

						for (var iRowIndex = 1; iRowIndex <= 3; iRowIndex++) {
							//		console.log(iRowIndex);
							var sLifnrr = result[iRowIndex].Lifnr;
							var sCount = result[iRowIndex].count;
							aListofVendorTopThree.push({
								Lifnr: sLifnrr,
								count: sCount

							});
						}

						var oListofVendorTopThreeModel = new JSONModel();
						oListofVendorTopThreeModel.setData(aListofVendorTopThree);
						oView.setModel(oListofVendorTopThreeModel, "ListofVendorTopThreeModel");
					},
					error: function(oError) {
						BusyIndicator.hide(false);
						var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
						MessageToast.show(errorMsg);
					}
				});
			});
		},

		getVendorList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(true);
			oModel.read("/Fetch_Vendor_DetailsSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var iItem = oData.results.length;
					ListofVendor = oData.results;

					var oCount = new sap.ui.model.json.JSONModel({
						item: iItem

					});
					oView.setModel(oCount, "Count");

					//BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					var olengthpo = oLookupModel.oData.PoDocumentNumber.length;
					var oCountPoooo = new sap.ui.model.json.JSONModel({
						item: olengthpo

					});
					oView.setModel(oCountPoooo, "CountPoooo");

					oLookupModel.setProperty("/DisplyaVendorList", ListofVendor);
					oLookupModel.refresh(true);
					//that.getMaterialList();
				},
				error: function(oError) {
					BusyIndicator.hide();
					MessageToast.show(oError);
				}
			});
		},
		searchFieldVendor: function(evt) {
			var sValue = evt.getSource().getValue();
			var oFilter = new Filter([new Filter(
				"Name1",
				FilterOperator.Contains, sValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sValue
			)]);

			var list = this.getView().byId("VendorList");
			var binding = list.getBinding("items");
			binding.filter(oFilter, "Application");

		},
		onSelectionChange: function(oEvent) {
			var oModelRe = this.getOwnerComponent().getModel("VHeader");
			var oModel = oView.getModel("Lookup");
			var oSelectedItem = oEvent.getParameter("listItem");
			if (oSelectedItem) {
				var sVendorNumber = oSelectedItem.getTitle();

				var zero = "";
				//	var no;

				var len = sVendorNumber.length;
				if (len !== undefined) {
					var z = 10 - len;
					for (var i = 0; i < z; i++) {
						zero += "0";
					}
				}

				sVendorNumber = zero + sVendorNumber;
				var sBindPath = oSelectedItem.getBindingContext("Lookup").sPath;
				var sComCode = oModel.getProperty(sBindPath + "/Bukrs");

				var aFilter = [
					new sap.ui.model.Filter({
						path: "Vendorno",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: sVendorNumber
					}),
					new sap.ui.model.Filter({
						path: "Companycode",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: sComCode
					})

				];

				oModelRe.read("/bapi_vendor_getdetailSet", {
					//oModel.read("/POItemSet", {
					filters: aFilter,
					success: function(oData) {

						var iItem = oData.results.length;
						var oVendor = new VendorP2P(oData.results[0]);
						oComponent.getModel("VendorModel").setData(oData.results[0]);
						oComponent.getRouter().navTo("VendorMaster");
					},
					error: function(oError) {
						//console.log(oError);
					}
				});

			}

		},

		onExport: function() {
			var aCols, oRowBinding, oSettings, oSheet, oTable;
			if (!this._oTable) {
				this._oTable = this.byId('tablePoorders');
			}
			oTable = this._oTable;
			oRowBinding = oTable.getBinding('rows');
			aCols = this.createColumnConfig();
			oSettings = {
				workbook: {
					columns: aCols,
					hierarchyLevel: 'Level'
				},
				dataSource: oRowBinding,
				fileName: 'Table export Data.xlsx',
				worker: false
			};
			oSheet = new Spreadsheet(oSettings);
			oSheet.build().finally(function() {
				oSheet.destroy();
			});
		},

		createColumnConfig: function() {
			var aCols = [];
			aCols.push({
				label: 'Company Code',
				property: 'Bukrs',
				type: EdmType.String

			});
			aCols.push({
				label: 'Purchase Order',
				property: 'Ebeln',
				type: EdmType.String

			});
			aCols.push({
				label: 'Vendor Details',
				type: EdmType.String,
				property: 'Lifnr',
				scale: 0
			});
			aCols.push({
				label: 'Purchase Organization',
				property: 'Ekgrp',
				type: EdmType.String
			});
			aCols.push({
				label: 'Created Date',
				property: 'Bedat',
				type: EdmType.Date
			});
			aCols.push({
				label: 'Created By',
				property: 'Ernam',
				type: EdmType.String
			});

			return aCols;
		},
		getPurchaseOrderList: function() {
			var that = this;

			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(true);
			oModel.read("/just_poheader2Set ", {

				success: function(oData) {

					//	console.log(oData);
					BusyIndicator.hide();
					var iItemPO = oData.results.length;
					var oCountPo1 = new sap.ui.model.json.JSONModel({
						item: iItemPO

					});
					oView.setModel(oCountPo1, "CountPo1");

					// for (var iRowIndex = 0; iRowIndex < iItemPO; iRowIndex++) {
					// 	var odataset = oData.results[iRowIndex];

					// 	var Compcode = odataset.Bukrs;
					// 	Purchaseordernumber = odataset.Ebeln;
					// 	var pogrp = odataset.Ekgrp;
					// 	var poorg = odataset.Ekorg;
					// 	var lifnrr = odataset.Lifnr;
					// 	var currency = odataset.Waers;
					// 	var createddate = odataset.Bedat;
					// 	var Createdby = odataset.Ernam;

					// 	var Absgr = odataset.Absgr;
					// 	var Addnr = odataset.Addnr;
					// 	var Adrnr = odataset.Adrnr;
					// 	var Angdt = odataset.Angdt;
					// 	var Angnr = odataset.Angnr;
					// 	var Ausnr = odataset.Ausnr;
					// 	var Autlf = odataset.Autlf;
					// 	var Bnddt = odataset.Bnddt;

					// 	var Bsakz = odataset.Bsakz;
					// 	var Bsart = odataset.Bsart;
					// 	var Bstyp = odataset.Bstyp;
					// 	var Bwbdt = odataset.Bwbdt;
					// 	var Description = odataset.Description;
					// 	var Dpamt = odataset.Dpamt;
					// 	var Dpdat = odataset.Dpdat;
					// 	var Dppct = odataset.Dppct;

					// 	var Dptyp = odataset.Dptyp;
					// 	var Exnum = odataset.Exnum;
					// 	var Frggr = odataset.Frggr;
					// 	var Frgke = odataset.Frgke;
					// 	var Frgrl = odataset.Frgrl;
					// 	var Frgsx = odataset.Frgsx;
					// 	var Frgzu = odataset.Frgzu;
					// 	var Gwldt = odataset.Gwldt;

					// 	var HierarchyExists = odataset.HierarchyExists;
					// 	var Ihran = odataset.Ihran;
					// 	var Ihrez = odataset.Ihrez;
					// 	var Inco1 = odataset.Inco1;
					// 	var Inco2 = odataset.Inco2;
					// 	var Kalsm = odataset.Kalsm;
					// 	var Kdatb = odataset.Kdatb;
					// 	var Kdate = odataset.Kdate;

					// 	var Knumv = odataset.Knumv;
					// 	var Konnr = odataset.Konnr;
					// 	var Kornr = odataset.Kornr;
					// 	var Ktwrt = odataset.Ktwrt;
					// 	var Kufix = odataset.Kufix;
					// 	var Kunnr = odataset.Kunnr;
					// 	var Lands = odataset.Lands;
					// 	var Lblif = odataset.Lblif;

					// 	var LegalContract = odataset.LegalContract;
					// 	var Lifre = odataset.Lifre;
					// 	var Llief = odataset.Llief;
					// 	var Loekz = odataset.Loekz;
					// 	var Lphis = odataset.Lphis;
					// 	var Lponr = odataset.Lponr;
					// 	var Memory = odataset.Memory;
					// 	var Memorytype = odataset.Memorytype;

					// 	var MsrId = odataset.LegalContract;
					// 	var Pincr = odataset.Pincr;
					// 	var PohfType = odataset.PohfType;
					// 	var Procstat = odataset.Procstat;
					// 	var ReasonCode = odataset.ReasonCode;
					// 	var ReleaseDate = odataset.ReleaseDate;
					// 	var RelocId = odataset.RelocId;
					// 	var RelocSeqId = odataset.RelocSeqId;

					// 	var Reswk = odataset.Reswk;
					// 	var Retpc = odataset.Retpc;
					// 	var Rettp = odataset.Rettp;
					// 	var Revno = odataset.Revno;
					// 	var Rlwrt = odataset.Rlwrt;
					// 	var Shipcond = odataset.Shipcond;
					// 	var Spras = odataset.Spras;
					// 	var Stafo = odataset.Stafo;

					// 	var Stako = odataset.Stako;
					// 	var Statu = odataset.Statu;
					// 	var Stceg = odataset.Stceg;
					// 	var Submi = odataset.Submi;
					// 	var Zbd1p = odataset.Zbd1p;
					// 	var Zbd1t = odataset.Zbd1t;
					// 	var Zbd2p = odataset.Zbd2p;
					// 	var Zbd2t = odataset.Zbd2t;
					// 	var Zbd3t = odataset.Zbd3t;
					// 	var Zterm = odataset.Zterm;

					// 	if (lifnrr !== "" || lifnrr !== undefined) {
					// 		for (var y = 0; y < ListofVendor.length; y++) {
					// 			if (lifnrr === ListofVendor[y].Lifnr) {
					// 				var venname = ListofVendor[y].Name1;
					// 				//	console.log(venname);

					// 			}
					// 		}
					// 	}

					// 	ListofPurchaseOrders.push({
					// 		Bukrs: Compcode,
					// 		Ebeln: Purchaseordernumber,
					// 		Ekgrp: pogrp,
					// 		Ekorg: poorg,
					// 		Lifnr: lifnrr,
					// 		Name: venname,
					// 		Waers: currency,
					// 		Bedat: createddate,
					// 		Ernam: Createdby,

					// 		Absgr: Absgr,
					// 		Addnr: Addnr,
					// 		Adrnr: Adrnr,
					// 		Angdt: Angdt,
					// 		Angnr: Angnr,
					// 		Ausnr: Ausnr,
					// 		Autlf: Autlf,
					// 		Bnddt: Bnddt,

					// 		Bsakz: Bsakz,
					// 		Bsart: Bsart,
					// 		Bstyp: Bstyp,
					// 		Bwbdt: Bwbdt,
					// 		Description: Description,
					// 		Dpamt: Dpamt,
					// 		Dpdat: Dpdat,
					// 		Dppct: Dppct,
					// 		Dptyp: Dptyp,
					// 		Exnum: Exnum,
					// 		Frggr: Frggr,
					// 		Frgke: Frgke,
					// 		Frgrl: Frgrl,
					// 		Frgsx: Frgsx,
					// 		Frgzu: Frgzu,
					// 		Gwldt: Gwldt,
					// 		HierarchyExists: HierarchyExists,
					// 		Ihran: Ihran,
					// 		Ihrez: Ihrez,
					// 		Inco1: Inco1,
					// 		Inco2: Inco2,
					// 		Kalsm: Kalsm,
					// 		Kdatb: Kdatb,
					// 		Kdate: Kdate,
					// 		Knumv: Knumv,
					// 		Konnr: Konnr,
					// 		Kornr: Kornr,
					// 		Ktwrt: Ktwrt,
					// 		Kufix: Kufix,
					// 		Kunnr: Kunnr,
					// 		Lands: Lands,
					// 		Lblif: Lblif,
					// 		LegalContract: LegalContract,
					// 		Lifre: Lifre,
					// 		Llief: Llief,
					// 		Loekz: Loekz,
					// 		Lphis: Lphis,
					// 		Lponr: Lponr,
					// 		Memory: Memory,
					// 		Memorytype: Memorytype,
					// 		MsrId: MsrId,
					// 		Pincr: Pincr,
					// 		PohfType: PohfType,
					// 		Procstat: Procstat,
					// 		ReasonCode: ReasonCode,
					// 		ReleaseDate: ReleaseDate,
					// 		RelocId: RelocId,
					// 		RelocSeqId: RelocSeqId,
					// 		Reswk: Reswk,
					// 		Retpc: Retpc,
					// 		Rettp: Rettp,
					// 		Revno: Revno,
					// 		Rlwrt: Rlwrt,
					// 		Shipcond: Shipcond,
					// 		Spras: Spras,
					// 		Stafo: Stafo,
					// 		Stako: Stako,
					// 		Statu: Statu,
					// 		Stceg: Stceg,
					// 		Submi: Submi,
					// 		Zbd1p: Zbd1p,
					// 		Zbd1t: Zbd1t,
					// 		Zbd2p: Zbd2p,
					// 		Zbd2t: Zbd2t,
					// 		Zbd3t: Zbd3t,
					// 		Zterm: Zterm

					// 	});

					// }
					// //		console.log(ListofPurchaseOrders);

					var CountPo = new sap.ui.model.json.JSONModel({
						item: iItemPO

					});
					oView.setModel(CountPo, "CountPo");

					//	console.log(oData);
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//oLookupModel.setProperty("/POOrderList", ListofPurchaseOrders);
					oLookupModel.setProperty("/POOrderList", oData.results);

					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});

		},

		getTopProductsFirst: function() {
			var oModel1 = this.getOwnerComponent().getModel("VHeader");
			var that = this;
			BusyIndicator.show(true);
			oModel1.read("/Max_MaterialSet", {
				success: function(odata) {
					BusyIndicator.hide();
					//	console.log(odata);
					var arr = [];
					arr = odata.results;
					//	console.log(arr);

					function foo(arr) {
						var a = [],
							b = [],
							prev;
						arr.sort();
						for (var i = 0; i < arr.length; i++) {
							if (arr[i].Txz01 !== prev) {
								a.push(arr[i].Txz01);
								b.push(1);
							} else {
								b[b.length - 1]++;
							}
							prev = arr[i].Txz01;
						}

						return [a, b];
					}

					var result = foo(arr);
					//console.log('[' + result[0] + ']','[' + result[1] + ']')
					var final = [];
					for (var z = 0; z < result[1].length; z++) {
						if (result[1][z] !== 1) {
							//result[0][z].pop();
							//result[1][z].pop();
							final.push([result[0][z], result[1][z]]);
							//final[1].push(result[1][z]);
						}
					}
					//console.log(final);
					function compareSecondColumn(a, b) {
						if (a[1] === b[1]) {
							return 0;
						} else {
							return (a[1] > b[1]) ? -1 : 1;
						}
					}
					final.sort(compareSecondColumn);
					//	console.log(final);
					var aTop5products = [];
					for (var zz = 0; zz <= 4; zz++) {
						aTop5products.push({
							prod: final[zz][0],
							count: final[zz][1]
						});
					}

					var oTop5productsModel = new JSONModel();
					oTop5productsModel.setData(aTop5products);
					oView.setModel(oTop5productsModel, "top5products");
					that.getPurchaseOrderList();
				},
				error: function(er) {
					BusyIndicator.hide();
					MessageBox.error(er);

				}
			});

		},

		_filter: function() {
			var oFilter = null;

			if (this._oGlobalFilter && this._oPriceFilter) {
				oFilter = new Filter([this._oGlobalFilter, this._oPriceFilter], true);
			} else if (this._oGlobalFilter) {
				oFilter = this._oGlobalFilter;
			} else if (this._oPriceFilter) {
				oFilter = this._oPriceFilter;
			}

			this.byId("tablePoorders").getBinding().filter(oFilter, "Application");
		},
		clearAllFiltersPOtable: function(oEvent) {
			var oTable = oView.byId("tablePoorders");

			var oUiModel = oView.getModel("ui");
			oUiModel.setProperty("/globalFilter", "");
			oUiModel.setProperty("/availabilityFilterOn", false);

			this._oGlobalFilter = null;
			this._oPriceFilter = null;
			this._filter();

			var aColumns = oTable.getColumns();
			for (var i = 0; i < aColumns.length; i++) {
				oTable.filter(aColumns[i], null);
			}

			oTable.getBinding().sort(null);
			this._resetPOTableSortingState();
		},
		_resetPOTableSortingState: function() {
			var oTable = this.byId("tablePoorders");
			var aColumns = oTable.getColumns();
			for (var i = 0; i < aColumns.length; i++) {
				aColumns[i].setSorted(false);
			}
		},
		onSearchEbeln: function(oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery) {
				aFilter.push(
					new Filter("Ebeln", FilterOperator.EQ, sQuery));

			}
			// update list binding
			var slist = this.getView().byId("awaitingTable");
			var binding = slist.getBinding("items");
			binding.filter(aFilter, "Application");

		},
		onSortTable: function() {
			var oView = this.getView(),
				aStates = [undefined, "asc", "desc"],
				aStateTextIds = ["sortNone", "sortAscending", "sortDescending"],
				sMessage,
				iOrder = this.getOwnerComponent().getModel("Lookup").getProperty("/POOrderList");

			// Cycle between the states
			iOrder = (iOrder + 1) % aStates.length;
			var sOrder = aStates[iOrder];

			oView.getModel("Lookup").setProperty("/POOrderList", iOrder);
			oView.byId("awaitingTable").getBinding("items").sort(sOrder && new Sorter("Waers", sOrder === "desc"));

		},

		createColumns: function() {
			return [{
				label: "Not Nested",
				property: "{Ebeln}"
			}, {
				label: "From Nested Property",
				property: "{Lifnr}"
			}];
		},

		/*vendor action list sorting */
		ListSort: function(oEvent) {
			this.bDescending = !this.bDescending;
			this.fnApplyFiltersAndOrdering();
		},

		_fnGroup: function(oContext) {
			var oVendorList = oContext.getProperty("Lookup>Lifnr");

			return {
				key: oVendorList,
				text: oVendorList
			};
		},
		fnApplyFiltersAndOrdering: function(oEvent) {
			var aFilters = [],
				aSorters = [];

			if (this.bGrouped) {
				aSorters.push(new Sorter("Lookup>Lifnr", this.bDescending, this._fnGroup));
			} else {
				aSorters.push(new Sorter("Lookup>Name1", this.bDescending));
			}

			if (this.sSearchQuery) {
				var oFilter = new Filter("Lookup>Name1", FilterOperator.Contains, this.sSearchQuery);
				aFilters.push(oFilter);
			}

			this.byId("VendorList").getBinding("items").filter(aFilters).sort(aSorters);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.vSimpleApp.view.view.ShowTiles
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.vSimpleApp.view.view.ShowTiles
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.vSimpleApp.view.view.ShowTiles
		 */
		//	onExit: function() {
		//
		//	}

	});

});