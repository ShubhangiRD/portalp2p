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
	"jquery.sap.global",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/m/Text",
	"sap/m/TextArea",
	"sap/m/DatePicker",
	"sap/ui/model/FilterType",
	"sap/ui/core/BusyIndicator",
	"sap/ui/core/routing/History",
	"com/vSimpleApp/model/PODetail",

	"sap/ui/model/Sorter"
], function(Formatter, Controller, JSONModel, mobileLibrary, Input, Fragment, Filter, FilterOperator,
	ColumnListItem, jQuery, MessageToast, MessageBox, Text, TextArea, DatePicker, FilterType,
	BusyIndicator, History, PODetail, Sorter) {
	"use strict";
	//global variable
	var oView, Ebeln, oComponent;
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
			// Define the models

			//call the function
			this.getCompanyList();
			this.getVendorList();

			this.getPurchaseOrderList();

			//boolean varible
			this.bDescending = false;
			this.sSearchQuery = 0;
			this.bGrouped = false;
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.getRoute("PoCreation").attachPatternMatched(this._onRouteMatched1, this);

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
				"Lifnr", "Bukrs"
			];
			this.oSelectName = this.getSelect("vnumber");
			//		this.oSelectCategory = this.getSelect("idPurchaseOrg");
			this.oSelectcompName = this.getSelect("cc");

			var aCurrentFilterValues = [];

			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectName));
			//	aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectCategory));
			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectcompName));

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
			return this.getTable().getBinding("items");
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
						aListofVendors.push({
							Lifnr: sLifnrr
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
						aCountryCode.push({
							Bukrs: sBukrs
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
		}

	});

});