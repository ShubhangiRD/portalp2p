sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast",
	"sap/ui/core/BusyIndicator",
	"sap/ui/model/json/JSONModel"
], function(Controller, Filter, FilterOperator, MessageToast, BusyIndicator, JSONModel) {
	"use strict";
var oView,sPlant, oComponent,oController;
	return Controller.extend("com.vSimpleApp.controller.TransferPosting", {

		onInit: function() {
			// var oTransPostModel = new JSONModel();
			// this.getView().setModel(oData, "oTransPostModel");
			
				oController = this;
			oView = this.getView();
			var oModel = this.getOwnerComponent().getModel("StockModel");

			oComponent = this.getOwnerComponent();
			//set the model on view to be used by the UI controls
			this.getView().setModel(oModel);
		},

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
		handleValueHelpPlant: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdplant = oEvent.getSource().getId();
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

		_handlePlantClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputIdplant);
				productInput.setValue(oSelectedItem.getTitle());
	 sPlant = oSelectedItem.getTitle();

			//	productInput.setValue(sPlant);

				evt.getSource().getBinding("items").filter([]);
			}
		},

	
		/*storage loc*/
		handleStorageLocationValue: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();
			this.inputIdstg = oEvent.getSource().getId();

			//create value help dialog 
			if (!this._valueHelpDialogStorage) {
				this._valueHelpDialogStorage = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.StorageLocation",
					this
				);
				this.getView().addDependent(this._valueHelpDialogStorage);
			}

			if (sInputValue.includes(")")) {
				var sSubstring = sInputValue.split(")")[1];
				sInputValue = sSubstring.trim();
			}
			// ccreate a filter for the binding
			this._valueHelpDialogStorage.getBinding("items").filter(new Filter([new Filter(
					"Lgort",
					FilterOperator.Contains, sInputValue),
				new Filter(
					"Lgobe",
					FilterOperator.Contains, sInputValue
				)

			]));
			this.getStorageLocationTo();
			this._valueHelpDialogStorage.open(sInputValue);
		},

		_handleStorageLocationSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Lgort",
				FilterOperator.Contains, sValue
			), new Filter(
				"Lgobe",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleStorageLocationClose: function(oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputIdstg);
				productInput.setValue(oSelectedItem.getTitle());

			}
			oEvent.getSource().getBinding("items").filter([]);

		},

	
	getStorageLocationTo: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");

			var StockModel = oView.getModel("StockTransferModel");
			 

			var oFilter = new sap.ui.model.Filter('Werks', sap.ui.model.FilterOperator.EQ, sPlant);
			BusyIndicator.show(true);
			oModel.read("/storage_f4helpSet?$filter=(Werks eq '" + sPlant + "')", {
				filters: [oFilter],

				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/StorageLocationList", oData.results);
					oLookupModel.refresh(true);
				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusCode + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
		/*storage loc end*/

		/* reason for movment  start    */

		handleValueHelpReasonForMvmt: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdMVT = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogRfm) {
				this._valueHelpDialogRfm = sap.ui.xmlfragment(
					"com.vSimpleApp.fragment.Stock.RsnForMvt",
					this
				);
				this.getView().addDependent(this._valueHelpDialogRfm);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();

			}

			// create a filter for the binding
			this._valueHelpDialogRfm.getBinding("items").filter(new Filter([new Filter(
				"Grund ",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Grtxt",
				FilterOperator.Contains, sInputValue
			)]));
			this.getReasonforMvt();
			// open value help dialog filtered by the input value
			this._valueHelpDialogRfm.open(sInputValue);

		},
		_handleRFSSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Grund",
				FilterOperator.Contains, sValue
			), new Filter(
				"Grtxt",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},

		_handleAddRFMClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputIdMVT);
				productInput.setValue(oSelectedItem.getTitle());
			
				productInput.setValue(sPlant);

				evt.getSource().getBinding("items").filter([]);
			}
		},
		getReasonforMvt: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("StockModel");

			oModel.read("/get_ReasonforMovmentf4Set", {
				success: function(oData) {

					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/ReasonForMvt", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {

					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
	/* end reason for movment      */
		/*Special stock*/
		handleValueSplStock: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdsplst = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogSplStock) {
				this._valueHelpDialogSplStock = sap.ui.xmlfragment(
					"com.vSimpleApp.fragment.Stock.SplStock",
					this
				);
				this.getView().addDependent(this._valueHelpDialogSplStock);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();

			}

			// create a filter for the binding
			this._valueHelpDialogSplStock.getBinding("items").filter(new Filter([new Filter(
				"Sobkz",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Btext",
				FilterOperator.Contains, sInputValue
			)]));
			this.getSpecialStockList();
			// open value help dialog filtered by the input value
			this._valueHelpDialogSplStock.open(sInputValue);

		},
		_handleSplStockSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Sobkz",
				FilterOperator.Contains, sValue
			), new Filter(
				"Btext",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},

		_handleAddSplStockClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputIdsplst);
				productInput.setValue(oSelectedItem.getTitle());
			
			

				evt.getSource().getBinding("items").filter([]);
			}
		},
		getSpecialStockList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("StockModel");

			oModel.read("/get_movementTypef4Set", {
				success: function(oData) {

					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/SplStock", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {

					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		/* movement type    */

		handleValueMvtType: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdmvttype = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogMvtType) {
				this._valueHelpDialogMvtType = sap.ui.xmlfragment(
					"com.vSimpleApp.fragment.Stock.MovementType",
					this
				);
				this.getView().addDependent(this._valueHelpDialogMvtType);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();

			}

			// create a filter for the binding
			this._valueHelpDialogMvtType.getBinding("items").filter(new Filter([new Filter(
				"Bwart",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Btext",
				FilterOperator.Contains, sInputValue
			)]));
			this.getSpecialStockList();
			// open value help dialog filtered by the input value
			this._valueHelpDialogMvtType.open(sInputValue);

		},
		_handleMvtTypeSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Bwart",
				FilterOperator.Contains, sValue
			), new Filter(
				"Btext",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},

		_handleMvtTypeClose: function(evt) {

				var oSelectedItem = evt.getParameter("selectedItem");
				if (oSelectedItem) {
					var productInput = this.byId(this.inputIdmvttype);
					productInput.setValue(oSelectedItem.getTitle());
				

				

					evt.getSource().getBinding("items").filter([]);
				}
			}
			/*	getSpecialStockList: function() {
				var that = this;
				var oModel = this.getOwnerComponent().getModel("StockModel");

				oModel.read("/get_movementTypef4Set", {
					success: function(oData) {

						var oLookupModel = that.getOwnerComponent().getModel("Lookup");
						oLookupModel.setProperty("/SplStock", oData.results);
						oLookupModel.refresh(true);

					},
					error: function(oError) {

						var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
						MessageToast.show(errorMsg);
					}
				});
			}*/
	});

});