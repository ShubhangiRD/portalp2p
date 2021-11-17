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
	"sap/ui/export/library",
	"sap/ui/export/Spreadsheet"

], function(Controller, JSONModel, Filter, FilterOperator, BusyIndicator, MessageToast, Export, ExportTypeCSV, MessageBox, Sorter,
	library, jquery, RowAction,
	RowActionItem, RowSettings, Fragment, exportLibrary, Spreadsheet) {
	"use strict";
	var oView, oComponent, oController, sPathThreshold, PoDocumentNumber = [];
	var Excess = [];
	var SortOrder = library.SortOrder;
	var EdmType = exportLibrary.EdmType;
	return Controller.extend("com.vSimpleApp.controller.ExcessData", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.vSimpleApp.view.ExcessData
		 */
		onInit: function() {
			oController = this;
			oView = this.getView();
			var oModel = this.getOwnerComponent().getModel("StockModel");

			oComponent = this.getOwnerComponent();
			//set the model on view to be used by the UI controls
			this.getView().setModel(oModel);
			this.getExcess();

		},
		getExcess: function(evt) {
			var array = [];
			var count = 0;
			var oModel = this.getOwnerComponent().getModel("oStockDataModel");
			var Data = oModel.oData;
			console.log(Data);
			for (var i = 0; i < Data.length; i++) {

				if (Data[i].ALabst > parseInt(Data[i].Cgtlv)) {
					count = count + 1;

					array.push({
						Matnr: Data[i].Matnr,
						Description: Data[i].Description,
						Werks: Data[i].Werks,
						quantity: Data[i].Alabst,
						Labst: Data[i].Labst,
						counter: count,
						markupDescription: true
					});
					//	oView.getModel("oExcessModelData").setData(array);
					this.getOwnerComponent().getModel("oExcessDataModel").setData(array);
				}
			}
		},
		getPath: function() {
			var oPurchaseItemTable = this.byId("excesstable");
			var sPathSingle = oPurchaseItemTable.getSelectedContextPaths();
		},
		onExcessSelectionItem: function() {
			var oPurchaseItemTable = this.byId("excesstable");
			var aSelectedIndex = oPurchaseItemTable._aSelectedPaths;
			var oPurchaseModel = this.getOwnerComponent().getModel("oExcessDataModel");

			//	var aPurchaseConditionItems = oPurchaseModel.getProperty("/TempContract/PoitemSet");
			for (var i = 0; i < aSelectedIndex.length; i++) {

				var odata = aSelectedIndex[i];
				var excess = oPurchaseModel.getProperty(odata);
				Excess.push(excess);
			}

		},
		onDiscountMaterial: function() {
			this.pressDialogExcessDiscount = oView.byId("idExcessDiscountDialog");
			if (!this.pressDialogExcessDiscount) {
				this.pressDialogExcessDiscount = sap.ui.xmlfragment("com.vSimpleApp.fragment.Stock.DiscountMaterial", this);
				this.pressDialogExcessDiscount.open();
			}
		},
		onSaveDiscount: function() {
		var oExcessDataModel = this.getOwnerComponent().getModel("oExcessDataModel");

			
			//this.pressDialogExcessDiscount.close();
		//	this.pressDialogExcessDiscount.destroy();
		},
		onCancelDiscount: function() {
			this.pressDialogExcessDiscount.close();
			this.pressDialogExcessDiscount.destroy();
		},
		onDescardMaterial: function() {
			this.pressDialogExcessDiscard = oView.byId("idExcessDiscardDialog");
			if (!this.pressDialogExcessDiscard) {
				this.pressDialogExcessDiscard = sap.ui.xmlfragment("com.vSimpleApp.fragment.Stock.DiscardMaterial", this);
				this.pressDialogExcessDiscard.open();

			}
		},
		onSaveDiscard: function() {
			this.pressDialogExcessDiscard.close();
			this.pressDialogExcessDiscard.destroy();
		},
		onCancelDiscard: function() {
			this.pressDialogExcessDiscard.close();
			this.pressDialogExcessDiscard.destroy();
		},
		onDownloadExcess: function() {
			var aCols, oRowBinding, oSettings, oSheet, oTable;
			if (!this._oTable) {
				this._oTable = this.byId('excesstable');
			}
			oTable = this._oTable;
			oRowBinding = oTable.getBinding('items');
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
				label: 'Material Number',
				property: 'Matnr',
				type: EdmType.String

			});
			aCols.push({
				label: 'Material Description',
				property: 'Description',
				type: EdmType.String

			});
			aCols.push({
				label: 'Plant',
				type: EdmType.String,
				property: 'Werks',
				scale: 0
			});
			aCols.push({
				label: 'Availble Quantity',
				property: 'Labst',
				type: EdmType.String
			});
			aCols.push({
				label: 'Created Date',
				property: 'Changedon',
				type: EdmType.Date
			});

			return aCols;
		},

		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.vSimpleApp.view.ExcessData
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.vSimpleApp.view.ExcessData
		 */
		//	onExit: function() {
		//
		//	}

	});

});