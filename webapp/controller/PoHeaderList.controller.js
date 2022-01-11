sap.ui.define([
	"./Formatter",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/library",
	"sap/m/Input",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/ColumnListItem",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/m/Text",
	"sap/m/TextArea",
	"sap/m/DatePicker",
	"sap/ui/model/FilterType",
	"sap/ui/core/BusyIndicator",
	"sap/ui/core/routing/History",
	"com/vSimpleApp/model/PODetail",
		"sap/ui/table/RowAction",
	"sap/ui/table/RowActionItem",
	"sap/ui/table/RowSettings",
		"sap/ui/thirdparty/jquery",
	"sap/ui/table/library",
	"sap/ui/model/Sorter",
		"sap/ui/export/Spreadsheet",
	"sap/ui/export/library"
], function(Formatter, Controller, JSONModel, mobileLibrary, Input, Fragment, Filter, FilterOperator,
	ColumnListItem,  MessageToast, MessageBox, Text, TextArea, DatePicker, FilterType,
	BusyIndicator, History, PODetail, Sorter,RowAction, RowActionItem, RowSettings,
		library, jQuery, Spreadsheet, exportLibrary) {
	"use strict";
	//global variable
	var oView, Ebeln, oComponent;
		var SortOrder = library.SortOrder;
	var EdmType = exportLibrary.EdmType;
	return Controller.extend("com.vSimpleApp.view.controller.PoHeaderList", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf QuickStartApplication2.view.Purchase
		 */
		onInit: function() {
			
			oView = this.getView();
			var oModel = this.getOwnerComponent().getModel("VHeader");
			//set the model on view to be used by the UI controls
			this.getView().setModel(oModel);
			oView = this.getView();
			oComponent = this.getOwnerComponent();
			var oOdataModel = new sap.ui.model.json.JSONModel();
			oView.setModel(oOdataModel, "VendorListM");
			var oPurcOrg = new sap.ui.model.json.JSONModel();
			oView.setModel(oPurcOrg, "PurchaseORg");
			var oCompMode = new sap.ui.model.json.JSONModel();
			oView.setModel(oCompMode, "compMode");
				var PurchaseGrp = new sap.ui.model.json.JSONModel();
			oView.setModel(PurchaseGrp, "PurchaseGrp");
			
			
			
			// Define the models

			//call the function
			this.getCompanyList();
			this.getVendorList();
			this.getPurchaseGroupList();
			this.getPurchaseOrgList();
			this.getPurchaseOrderList();

			
			
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
						var oTemplate = new sap.ui.table.RowAction ({
							items: [
								new sap.ui.table.RowActionItem({
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

			
			
		
	this.getView().setModel(new JSONModel({items: this.modes}), "modes");
			this.switchState("Navigation");
			
			
			//boolean varible
			this.bDescending = false;
			this.sSearchQuery = 0;
			this.bGrouped = false;
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.getRoute("PoCreation").attachPatternMatched(this._onRouteMatched1, this);
			

		},
		
			switchState: function(sKey) {
			var oTable = this.byId("PurchaseTableDisplay");
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
				// oComponent.getRouter().navTo("POITemDetails", {
				// 	PoNo: sPurchaseNumber
				// });
			} catch (ex) {
				MessageBox.error(ex);
			}

		},
			_onRouteMatched1: function() {
				this.getCompanyList();
			this.getVendorList();

			this.getPurchaseOrderList();
			},
		OnCancelPOList: function() {
			//cancel po search selection and navigate to dashboard page
			oView.byId("vnumber").setValue(" ");
			oView.byId("cc").setValue(" ");
				oView.byId("PoOrg").setValue(" ");
			oView.byId("PoGrp").setValue(" ");
			
			
			oComponent.getRouter().navTo("ShowTiles");
		},
		onNavBack: function(oevt) {
			//get model and refresh model for navigation
			var oPurchaseModel = oComponent.getModel("PurchaseModel");
			oPurchaseModel.refresh(true);
			this.getOwnerComponent().getRouter().navTo("ShowTiles");
			this.getView().getModel("VHeader").refresh();

		},
				onRefresh: function(oEvent) {
			var tbl = oView.byId("PurchaseTableDisplay");
			tbl.setBusy(true);
			this.getPurchaseOrderList();
			tbl.setBusy(false);
		},
		getSelect: function(sId) {
			return this.getView().byId(sId);
		},

			onSelectChange: function() {
			this.aKeys = [
				"Lifnr", "Bukrs","Ekorg","Ekgrp"
			];
			this.oSelectName = this.getSelect("vnumber");
			//		this.oSelectCategory = this.getSelect("idPurchaseOrg");
			this.oSelectcompName = this.getSelect("cc");

		this.oSelectPoOrgName = this.getSelect("PoOrg");
			//		this.oSelectCategory = this.getSelect("idPurchaseOrg");
			this.oSelectPoGrppName = this.getSelect("PoGrp");


			var aCurrentFilterValues = [];

			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectName));
			//	aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectCategory));
			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectcompName));

	aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectPoOrgName));

	aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectPoGrppName));

			this.filterTable(aCurrentFilterValues);

		},
		filterTable: function(aCurrentFilterValues) {
			//	var aFilter = [];
			this.getTableItems().filter(this.getFilters(aCurrentFilterValues));

		},
		getTable: function() {
			return this.getView().byId("PurchaseTableDisplay");
		},
		getTableItems: function() {
			return this.getTable().getBinding("rows");
		},
		getFilters: function(aCurrentFilterValues) {

			var aFilters = [];

			aFilters = this.aKeys.map(function(sCriteria, i) {
				return new Filter(sCriteria, sap.ui.model.FilterOperator.Contains, aCurrentFilterValues[i]);
			});

			return aFilters;
		},

		getSelectedItemText: function(oSelect) {
			return oSelect.getSelectedItem() ? oSelect.getSelectedItem().getKey() : "";
		},

		onCreatePurchaseOrder: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("PoCreation");
		},
		onPurchaseRequisition: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("PoRequisitions");
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
			var slist = this.getView().byId("PurchaseTableDisplay");
			var binding = slist.getBinding("items");
			binding.filter(aFilter, "Application");

		},
		OnNavigateDetails: function(oEvent) {

			try {
				var sPurchaseNumber = oEvent.getSource().data("Ebeln");
				oComponent.getRouter().navTo("POITemDetails", {
					PoNo: sPurchaseNumber
				});
			} catch (ex) {
				MessageBox.error(ex);
			}

		},

		/*start purchase order f4 click*/
		getPurchaseOrderList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(0);

			oModel.read("/openpo_headerSet", {
				success: function(oData) {
					BusyIndicator.hide();

					var iitemPO = oData.results.length;

					var oCountPo = new sap.ui.model.json.JSONModel({
						item: iitemPO

					});
					oView.setModel(oCountPo, "CountPo");

					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/OpenPOList", oData.results);
					oLookupModel.refresh(true);

					var oPOHeaderData = new PODetail(oData.results);
					oView.getModel("POHeaderModel", oPOHeaderData);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var serrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(serrorMsg);
				}
			});
		},

		getVendorList: function() {
			//get  the odata following entityset
			var oModel = this.getOwnerComponent().getModel("VHeader");
			//BusyIndicator.show(0);
			oModel.read("/Fetch_Vendor_DetailsSet", {
				success: function(oData) {

					var iItem = oData.results.length;
					var aListofVendors = [];
					aListofVendors.push({
						"": ""
					});
					for (var iRowIndex = 0; iRowIndex < iItem; iRowIndex++) {

						var sLifnrr = oData.results[iRowIndex].Lifnr;
						
						var Name1 = oData.results[iRowIndex].Name1;
						aListofVendors.push({
							Lifnr: sLifnrr,
							Name1 :Name1
						});
					}

					oView.getModel("VendorListM").setSizeLimit(aListofVendors.length);
					oView.getModel("VendorListM").setData(aListofVendors);

				},
				error: function(oError) {
					//BusyIndicator.hide();
					var serrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(serrorMsg);
				}
			});
		},
				getPurchaseOrgList: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("VHeader");

			//get entity set
			BusyIndicator.show(true);
			oModel.read("/get_purchaseorg_f4helpSet", {
				success: function(oData) {
					BusyIndicator.hide();
				
						var iItem = oData.results.length;
					var aListofPOOrg = [];
					aListofPOOrg.push({
						"": ""
					});
					for (var iRowIndex = 0; iRowIndex < iItem; iRowIndex++) {

						var Ekorg = oData.results[iRowIndex].Ekorg;
						
						var Ekotx = oData.results[iRowIndex].Ekotx;
						aListofPOOrg.push({
							Ekorg: Ekorg,
							Ekotx :Ekotx
						});
					}

					oView.getModel("PurchaseORg").setSizeLimit(aListofPOOrg.length);
					oView.getModel("PurchaseORg").setData(aListofPOOrg);
					
					
					
					
				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},
		
			getPurchaseGroupList: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("Vendorf4Model");
			BusyIndicator.show(true);
			//get entity set
			oModel.read("/PurchasingGroupSet", {
				success: function(oData) {
					BusyIndicator.hide();
				
						var iItem = oData.results.length;
					var aListofPOOrgrp = [];
					aListofPOOrgrp.push({
						"": ""
					});
					for (var iRowIndex = 0; iRowIndex < iItem; iRowIndex++) {

						var Ekgrp = oData.results[iRowIndex].Ekgrp;
						
						var Eknam = oData.results[iRowIndex].Eknam;
						aListofPOOrgrp.push({
							Ekgrp: Ekgrp,
							Eknam :Eknam
						});
					}

					oView.getModel("PurchaseGrp").setSizeLimit(aListofPOOrgrp.length);
					oView.getModel("PurchaseGrp").setData(aListofPOOrgrp);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},
		onMenuButtonPress: function() {
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			var oTempContract = oPurchaseModel.getProperty("/TempContract");
			oTempContract.setData();

			//	oPurchaseModel.setData([]);
			var sss = oPurchaseModel.oData.TempContract.destroy;
			var s = oPurchaseModel.oData.TempContract.setData;
			//	s.refresh(true);

			oPurchaseModel.refresh(true);
			this.getView().getModel("VHeader").refresh();

			
		oView.byId("vnumber").setValue(" ");
			oView.byId("cc").setValue(" ");
					
		oView.byId("PoOrg").setValue(" ");
			oView.byId("PoGrp").setValue(" ");
			var oComponent2 = this.getOwnerComponent();
			oComponent2.getRouter().navTo("ShowTiles");
		},

		/*Comp Code Search start*/

		getCompanyList: function() {

			var oModel = this.getOwnerComponent().getModel("VHeader");
			//BusyIndicator.show(0);
			oModel.read("/get_companycode_f4helpSet", {
				success: function(oData) {
					//BusyIndicator.hide();

					var iItem = oData.results.length;

					var aCountryCode = [];
					aCountryCode.push({
						"": ""
					});
					for (var iRowIndex = 0; iRowIndex < iItem; iRowIndex++) {

						var sBukrs = oData.results[iRowIndex].Bukrs;
					var	Butxt = oData.results[iRowIndex].Butxt;
						aCountryCode.push({
							Bukrs: sBukrs,
							Butxt : Butxt
						});
					}

					oView.getModel("compMode").setSizeLimit(aCountryCode.length);
					oView.getModel("compMode").setData(aCountryCode);

				},
				error: function(oError) {
					//BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		/*Company SEarch end*/

		// Po sorting 
		onSort: function(oEvent) {
			this.bDescending = !this.bDescending;
			this.fnApplyFiltersAndOrdering();
		},

		_fnGroup: function(oContext) {
			var PoItem = oContext.getProperty("Lookup>Lifnr");

			return {
				key: PoItem,
				text: PoItem
			};
		},
		fnApplyFiltersAndOrdering: function(oEvent) {
			var aFilters = [],
				aSorters = [];

			if (this.bGrouped) {
				aSorters.push(new Sorter("Lookup>Lifnr", this.bDescending, this._fnGroup));
			} else {
				aSorters.push(new Sorter("Lookup>Ebeln", this.bDescending));
			}

			if (this.sSearchQuery) {
				var oFilter = new Filter("Lookup>Ebeln", FilterOperator.Contains, this.sSearchQuery);
				aFilters.push(oFilter);
			}

			this.byId("PurchaseTableDisplay").getBinding("items").filter(aFilters).sort(aSorters);
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

			this.byId("PurchaseTableDisplay").getBinding().filter(oFilter, "Application");
		},
		clearAllFiltersPOtable: function(oEvent) {
			var oTable = oView.byId("PurchaseTableDisplay");

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
			var oTable = this.byId("PurchaseTableDisplay");
			var aColumns = oTable.getColumns();
			for (var i = 0; i < aColumns.length; i++) {
				aColumns[i].setSorted(false);
			}
		},
	onExport: function() {
			var aCols, oRowBinding, oSettings, oSheet, oTable;
			if (!this._oTable) {
				this._oTable = this.byId('PurchaseTableDisplay');
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
	aCols.push({
				label: 'Country',
				property: 'Lands',
				type: EdmType.String
			});
			return aCols;
		},
	});

});