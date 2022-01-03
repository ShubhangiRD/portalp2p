sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/core/BusyIndicator',
	"sap/ui/model/json/JSONModel",
	"sap/m/library",
	"sap/m/Input",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast",
	"com/vSimpleApp/model/PurchaseHeader",
	"com/vSimpleApp/model/RebateConditionItemPO",
	"sap/m/MessageBox"
], function(Controller, BusyIndicator, JSONModel, library, Input, Fragment, Filter, FilterOperator, MessageToast, PurchaseHeader,
	RebateConditionItemPO, MessageBox) {
	"use strict";
	var oView, sPlant, oComponent, successObj;

	return Controller.extend("com.vSimpleApp.controller.StockTransfer", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.vSimpleApp.view.StockTransfer
		 */
		onInit: function() {
			oView = this.getView();
			var oModel = this.getOwnerComponent().getModel("VHeader");
			//set the model on view to be used by the UI controls
			this.getView().setModel(oModel);
			oComponent = this.getOwnerComponent();

			var oMatData = new JSONModel();
			oView.setModel(oMatData, "MatData");

			var oStockModel = this.getOwnerComponent().getModel("StockTransferModel");
			var Standards = sap.ui.getCore().getModel("SOSalesModel");
			var value2 = Standards.oData.SalesContract.DocType;
			this.getOwnerComponent().getModel("PurchaseModel").setProperty("/TempContract/DocumentType", value2);
			var value = Standards.oData.SalesContract.MomentType;
			sap.ui.getCore().getModel("oTransferPostModel").setProperty("/MovmtTypeTP", value);

			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			if (oPurchaseModel.oData.TempContract.PoitemSet[0]) {
				var itemplant = oPurchaseModel.oData.TempContract.PoitemSet[0].Plant;
				sPlant = itemplant;

			}

		},

		onBackStock: function() {
			var StockTransferModel = this.getView().getModel("StockTransferModel");
			StockTransferModel.setData({
				oData: {}
			});

			StockTransferModel.refresh(true);

			this.getOwnerComponent().getRouter().navTo("StockTable");
			window.location.reload();
		},
		onStockCancel: function(event) {
			//cancel the all selected values and data

			var onStockTransferModel = this.getOwnerComponent().getModel("StockTransferModel");

			onStockTransferModel.setData();

			onStockTransferModel.refresh(true);

			//redirect the page	frot view
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("StockTable");

		},

		/*Document type*/
		getdocumenttypeSet: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("StockModel");
			BusyIndicator.show(true);
			oModel.read("/getdocumenttypeSet", {
				success: function(oData) {
					BusyIndicator.hide();

					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/documentType", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		handleDoctypevalue: function(oEvent) {

			var sInputValue = oEvent.getSource().getValue();

			this.inputIddoct = oEvent.getSource().getId();

			// create value help dialog
			if (!this._valueHelpdoctype) {
				this._valueHelpdoctype = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.DocType",
					this
				);
				this.getView().addDependent(this._valueHelpdoctype);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpdoctype.getBinding("items").filter(new Filter([new Filter(
				"Auart",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Auart",
				FilterOperator.Contains, sInputValue
			)]));
			this.getdocumenttypeSet();
			// open value help dialog filtered by the input value
			this._valueHelpdoctype.open(sInputValue);
		},
		_handleDoctypeSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Auart",
				FilterOperator.Contains, sValue
			), new Filter(
				"Auart",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleDoctypeClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputIddoct),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				var div = oSelectedItem.getDescription();

				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);
		},
		/*Document type end*/

		/*Material Number Search start*/
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

		_handlePOMaterialClose1: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");

			if (oSelectedItem) {
				var productInput = this.byId(this.inputId);
				productInput.setValue(oSelectedItem.getTitle());
				var sTitle = oSelectedItem.getTitle();
				var sDescription = oSelectedItem.getInfo();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);
				this.byId("ShortText1").setValue(sDescription);
				//	this.byId("ShortText2").setValue(sDescription);
				//	this.byId("idMaterial1").setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);

		},

		_handlePOMaterialClose: function(evt) {
			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var oPurchaseContract = oPurchaseModel.getProperty("/TempContract/PoitemSet");
			var lenthss = oPurchaseContract.length;

			var lenthcount = lenthss - 1;
			var oSelectedItem = evt.getParameter("selectedItem");

			var oModel = oView.getModel("Lookup");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId);
				var sBindPath = oSelectedItem.getBindingContext("Lookup").sPath;
				productInput.setValue(oSelectedItem.getTitle());

				var oDiscription = oModel.getProperty(sBindPath + "/Description");
				var ab = $(this)[0].inputId;
				var id = $("#" + ab).closest("tr").find(".desc1").attr("id");
				$("#" + id + "-inner").val(oDiscription);

				var sUnitb = oModel.getProperty(sBindPath + "/UOM");
				var ab1 = $(this)[0].inputId;
				var id1 = $("#" + ab1).closest("tr").find(".measure1").attr("id");
				$("#" + id1 + "-inner").val(sUnitb);
				oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + lenthcount + "/Description", oDiscription);

				oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + lenthcount + "/PoUnit", sUnitb);

			}
			evt.getSource().getBinding("items").filter([]);

		},
		handleStorageLocationValue: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();
			sap.ui.getCore().inputIdstg = oEvent.getSource().getId();

			//create value help dialog 
			if (!this._valueHelpDialogStorage) {
				this._valueHelpDialogStorage = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.StorageLocation",
					this
				);
				this.getView().addDependent(this._valueHelpDialogStorage);
			}
			this.getStorageLocationFrom();
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
			this._valueHelpDialogStorage.open(sInputValue);
		},
		handleStorageLocValue: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();
			sap.ui.getCore().inputIdstg = oEvent.getSource().getId();

			//create value help dialog 
			if (!this._valueHelpDialogStorage) {
				this._valueHelpDialogStorage = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.StorageLocation",
					this
				);
				this.getView().addDependent(this._valueHelpDialogStorage);
			}
			this.getStorageLocationTo();
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
				var productInput = sap.ui.getCore().byId(sap.ui.getCore().inputIdstg);
				productInput.setValue(oSelectedItem.getTitle());

			}
			oEvent.getSource().getBinding("items").filter([]);

		},

		getStorageLocationFrom: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");

			var StockModel = oView.getModel("StockTransferModel");
			//	var sPlant = StockModel.oData.PlantFrom;

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
		getStorageLocationTo: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");

			var StockModel = oView.getModel("StockTransferModel");
			var sPlant = StockModel.oData.PlantTo;

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
		/*Plant search start */
		getPOPlant: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(true);
			oModel.read("/get_plant_f4helpSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/POPlant", oData.results);
					oLookupModel.refresh(true);
					//that.getMaterialList();
				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
		handleValueHelpPlant: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			sap.ui.getCore().inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogpp) {
				this._valueHelpDialogpp = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.Plant",
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
				var productInput = sap.ui.getCore().byId(sap.ui.getCore().inputId);
				productInput.setValue(oSelectedItem.getTitle());
				sPlant = oSelectedItem.getTitle();
				evt.getSource().getBinding("items").filter([]);
			}
		},

		onDeleteConditionItem: function() {
			var oPurchaseItemTable = this.byId("idTableitem");
			var aSelectedIndex = oPurchaseItemTable.getSelectedIndices().reverse();
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			var aPurchaseConditionItems = oPurchaseModel.getProperty("/TempContract/PoitemSet");
			for (var i = 0; i < aSelectedIndex.length; i++) {
				aPurchaseConditionItems.splice(aSelectedIndex[i], 1);
			}
			oPurchaseItemTable.clearSelection();
			oPurchaseModel.refresh(true);
		},

		OnSaveTransferPosting: function() {

			MessageToast.show("Save TransferPosting");
			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var oPurchaseContract = oPurchaseModel.getProperty("/TempContract");
			var oTransferPostModel = sap.ui.getCore().getModel("oTransferPostModel");
			var oStockData = oTransferPostModel.oData;
			//	var oStockContract = oPurchaseModel.setProperty("/TempContract",oStockData);
			var oModel = this.getOwnerComponent().getModel("PurchaseSet");

			//	var oRequestPayload = oPurchaseContract.getRequestPayload();
			var oRequestPayload = oPurchaseContract.TransferPosting();
			var MovmtTypeTP = oStockData.MovmtTypeTP;
			var PlantTransferTP = oStockData.PlantTransferTP;
			var StgeLocTP = oStockData.StgeLocTP;
			var docDate = this.datatime(oStockData.DocDateTP);
			var PostingDate = this.datatime(oStockData.PostingDate);
			var vln = oRequestPayload.GoodsmvtitemSet.length;
			oRequestPayload.PstngDate = PostingDate;
			oRequestPayload.DocDate = docDate;

			for (var vlen = 0; vlen < vln; vlen++) {
				//	delete oRequestPayload.PoitemSet[vlen].Vendor;

				oRequestPayload.GoodsmvtitemSet[vlen].PoItem = this.LeadingZeros(vlen + 1, 5);
				oRequestPayload.GoodsmvtitemSet[vlen].MoveType = MovmtTypeTP;
				oRequestPayload.GoodsmvtitemSet[vlen].Plant = PlantTransferTP;
				oRequestPayload.GoodsmvtitemSet[vlen].StgeLoc = StgeLocTP;
				oRequestPayload.GoodsmvtitemSet[vlen].PoNumber = successObj;
				//  oRequestPayload.GoodsmvtitemSet[vlen].Material = Material;
				//  oRequestPayload.GoodsmvtitemSet[vlen].EntryQnt = EntryQnt;
			}

			//	console.log(oRequestPayload);

			oModel.create("/GrCrudSet", oRequestPayload, {
				success: this._onCreateEntrySuccessTR.bind(this),
				error: this._onCreateEntryError.bind(this)
			});

		},
		onSaveAutoTRP: function(oPurchaseModel) {

			var odata = oPurchaseModel.oData.StockContract;
			var stg = oPurchaseModel.oData.StockContract.PoitemSet.results[0].StgeLoc;
			var docdate = odata.DocDate;
			var podate = odata.DocDate;
			var oPurchaseContract = oPurchaseModel.getProperty("/TempContract");
			var oModel = this.getOwnerComponent().getModel("PurchaseSet");
			var oRequestPayload = oPurchaseContract.TransferPosting();

			var PlantTransferTP = oPurchaseModel.oData.TempContract.SupplPlnt;

			var vln = oRequestPayload.GoodsmvtitemSet.length;
			oRequestPayload.PstngDate = this.datatime(docdate);
			oRequestPayload.DocDate = this.datatime(podate);

			for (var vlen = 0; vlen < vln; vlen++) {

				oRequestPayload.GoodsmvtitemSet[vlen].StgeLoc = stg;
				oRequestPayload.GoodsmvtitemSet[vlen].PoItem = this.LeadingZeros(vlen + 1, 5);
				oRequestPayload.GoodsmvtitemSet[vlen].MoveType = "351";
				oRequestPayload.GoodsmvtitemSet[vlen].Plant = PlantTransferTP;
				oRequestPayload.GoodsmvtitemSet[vlen].PoNumber = successObj;

			}

			//	console.log(oRequestPayload);

			oModel.create("/GrCrudSet", oRequestPayload, {
				success: this._onCreateEntrySuccessTR.bind(this),
				error: this._onCreateEntryError.bind(this)
			});

		},
		_onCreateEntrySuccessTR: function(oObject, oResponse) {
			BusyIndicator.hide();
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			var oTempContract = oPurchaseModel.getProperty("/TempContract");
			oTempContract.setData();
			oPurchaseModel.setData({
				oData: {}
			});

			oPurchaseModel.refresh(true);

			sap.m.MessageBox.show("Stock Transfer Successfully", {
				icon: sap.m.MessageBox.Icon.INFORMATION,

				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CLOSE],
				onClose: function(oAction) {
					if (oAction === "OK") {

						var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
						oRouter.navTo('StockTable');
						window.location.reload();
					}
				}.bind(this)
			});

		},
		LeadingZeros: function(num, size) {
			var s = num + "0" + "";
			while (s.length < size) s = "0" + s;
			return s;
		},
		datatime: function(dDate) {
			var s_doc_datePost = new Date(dDate);
			var Datepoststring = s_doc_datePost.toISOString();
			Datepoststring = Datepoststring.slice(0, -5);
			return Datepoststring;
		},
		onClosefunction: function() {
			sap.ui.getCore().byId("Plant").setValue("");
			sap.ui.getCore().byId("idInpStorageLocation").setValue("");
			this.transferdialog.close();
			this.transferdialog.destroy();
			this.transferdialog.destroy(null);

		},
		onSavePOConditionRecords: function(evt) {

			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var oPurchaseContract = oPurchaseModel.getProperty("/TempContract");
			var oModel = this.getOwnerComponent().getModel("PurchaseSet");

			//	var oRequestPayload = oPurchaseContract.getRequestPayload();
			var oRequestPayload = oPurchaseContract.getStockTransferPayload();

			//method for creating the prod
			BusyIndicator.show(true);
			//delete oRequestPayload.Vendor;
			var vln = oRequestPayload.PoitemSet.length;
			oRequestPayload.PoCondSet = [];
			oRequestPayload.PoScheduleSet = [];
			oRequestPayload.Testrun = "X";
			for (var vlen = 0; vlen < vln; vlen++) {
				//	delete oRequestPayload.PoitemSet[vlen].Vendor;

				oRequestPayload.PoitemSet[vlen].PoItem = this.LeadingZeros(vlen + 1, 5);
			}
			oModel.create("/PoDisplaySet", oRequestPayload, {
				success: this._onEntrySuccess.bind(this),
				error: this._onCreateEntryError.bind(this)
			});

			oPurchaseModel.refresh(true);

		},

		_onEntrySuccess: function(oObject, oResponse) {
			BusyIndicator.hide();
			//	var Podata = new PurchaseHeader(Object);
			//	oView.getModel("PurchaseModel").setProperty("/TempContract", Podata);

			oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet", oObject.PoitemSet.results);

			var ResponseData = oObject.PoCondSet.results;
			var oPurchaseModel = this.getView().getModel("PurchaseModel");

			oView.getModel("PurchaseModel").setProperty("/TempContract/PoCondSet", oObject.PoCondSet.results);
			oView.getModel("PurchaseModel").setProperty("/TempContract/PoScheduleSet", oObject.PoScheduleSet.results);

			var aPurchaseConditionItems = oPurchaseModel.getProperty("/TempContract/PoitemSet");

			var lenthPO = aPurchaseConditionItems.length;

			var netcount = lenthPO - 1;

			var iTtem = oPurchaseModel.oData.TempContract.PoitemSet.length;

			var poitem = aPurchaseConditionItems.length;

			var sMatno = aPurchaseConditionItems[poitem - 1].Material;

			var sMatList = new RebateConditionItemPO(aPurchaseConditionItems[poitem - 1]);
			var oListModel = new JSONModel();
			oListModel.setData(sMatList);
			oView.setModel(oListModel, "POListModel");

			var sInfoUpdate = oListModel.oData.InfoUpd;
			var sIrInd = oListModel.oData.IrInd;

			var sPrntPrice = oListModel.oData.PrntPrice;
			var sGrNonVal = oListModel.oData.GrNonVal;
			var sUnlimitedDlv = oListModel.oData.UnlimitedDlv;
			var sNoMoreGr = oListModel.oData.NoMoreGr;
			var sFinalInv = oListModel.oData.FinalInv;
			var sGrBasediv = oListModel.oData.GrBasediv;
			var sAcknReqd = oListModel.oData.AcknReqd;
			var sEstPrice = oListModel.oData.EstPrice;
			var sOrigAccept = oListModel.oData.OrigAccept;
			var sGrInd = oListModel.oData.GrInd;
			if (sInfoUpdate !== "") {
				oView.getModel("POListModel").setProperty("/InfoUpd", true);

			} else {
				oView.getModel("POListModel").setProperty("/InfoUpd", false);
			}
			if (sIrInd !== "") {
				oView.getModel("POListModel").setProperty("/IrInd", true);

			} else {
				oView.getModel("POListModel").setProperty("/IrInd", false);
			}
			if (sPrntPrice !== "") {
				oView.getModel("POListModel").setProperty("/PrntPrice", true);

			} else {
				oView.getModel("POListModel").setProperty("/PrntPrice", false);
			}
			if (sOrigAccept !== "") {
				oView.getModel("POListModel").setProperty("/OrigAccept", true);

			} else {
				oView.getModel("POListModel").setProperty("/OrigAccept", false);
			}
			if (sGrNonVal !== "") {
				oView.getModel("POListModel").setProperty("/GrNonVal", true);

			} else {
				oView.getModel("POListModel").setProperty("/GrNonVal", false);
			}
			if (sGrInd !== "") {
				oView.getModel("POListModel").setProperty("/GrInd", true);

			} else {
				oView.getModel("POListModel").setProperty("/GrInd", false);
			}
			if (sNoMoreGr !== "") {
				oView.getModel("POListModel").setProperty("/NoMoreGr", true);

			} else {
				oView.getModel("POListModel").setProperty("/NoMoreGr", false);
			}
			if (sFinalInv !== "") {
				oView.getModel("POListModel").setProperty("/FinalInv", true);

			} else {
				oView.getModel("POListModel").setProperty("/FinalInv", false);
			}
			if (sGrBasediv !== "") {
				oView.getModel("POListModel").setProperty("/GrBasediv", true);

			} else {
				oView.getModel("POListModel").setProperty("/GrBasediv", false);
			}
			if (sAcknReqd !== "") {
				oView.getModel("POListModel").setProperty("/AcknReqd", true);

			} else {
				oView.getModel("POListModel").setProperty("/AcknReqd", false);
			}

			if (sEstPrice !== "") {
				oView.getModel("POListModel").setProperty("/EstPrice", true);

			} else {
				oView.getModel("POListModel").setProperty("/EstPrice", false);
			}
			if (sUnlimitedDlv !== "") {
				oView.getModel("POListModel").setProperty("/UnlimitedDlv", true);

			} else {
				oView.getModel("POListModel").setProperty("/UnlimitedDlv", false);
			}

			oView.setModel(oListModel, "PurchaseItems");

		},

		onSavePurchaseOrder: function(evt) {

			var PurchOrg = oView.byId("PurchOrg");
			var PurGroup = oView.byId("PurGroup");
			var CompCode = oView.byId("CompCode");
			var iddoctype = oView.byId("iddoctype");
			if (PurchOrg.getValue() == "") {
				PurchOrg.setValueState("Error");
				PurchOrg.setValueStateText("Purch Org is required");
				
			} else if (PurGroup.getValue() == "") {
				PurGroup.setValueState("Error");
				PurGroup.setValueStateText("Purchase Group is required");
			} else if (CompCode.getValue() == "") {
				CompCode.setValueState("Error");
				CompCode.setValueStateText("Company Code is required");
			} else if (iddoctype.getValue() == "") {
				iddoctype.setValueState("Error");
				iddoctype.setValueStateText("Document Type is required");
			} else {
				var oPurchaseModel = this.getView().getModel("PurchaseModel");
				var oPurchaseContract = oPurchaseModel.getProperty("/TempContract");
				var oModel = this.getOwnerComponent().getModel("PurchaseSet");

				//	var oRequestPayload = oPurchaseContract.getRequestPayload();
				var oRequestPayload = oPurchaseContract.getStockTransferPayload();

				//method for creating the prod
				BusyIndicator.show(true);
				//delete oRequestPayload.Vendor;
				var vln = oRequestPayload.PoitemSet.length;

				for (var vlen = 0; vlen < vln; vlen++) {
					//	delete oRequestPayload.PoitemSet[vlen].Vendor;

					oRequestPayload.PoitemSet[vlen].PoItem = this.LeadingZeros(vlen + 1, 5);
				}
				oModel.create("/PoDisplaySet", oRequestPayload, {
					success: this._onCreateEntrySuccess.bind(this),
					error: this._onCreateEntryError.bind(this)
				});

				oPurchaseModel.refresh(true);

			}

		},

		_onCreateEntrySuccess: function(oObject, oResponse) {
			BusyIndicator.hide();
			successObj = oObject.PoNumber;
			var ResponseData = oResponse.data;
			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var oPurchaseContract = oPurchaseModel.getProperty("/TempContract");
			var oStockContract = oPurchaseModel.setProperty("/StockContract", ResponseData);

			sap.m.MessageBox.show("S.T.O created under the number #" + successObj + " Do you want to Stock transfer Automatically", {
				icon: sap.m.MessageBox.Icon.INFORMATION,

				actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				onClose: function(oAction) {
					if (oAction === "YES") {

						BusyIndicator.hide();
						this.onSaveAutoTRP(oPurchaseModel);
						//var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
						//	oRouter.navTo('StockTable');
						//window.location.reload();
					} else {

						this.transferdialog = oView.byId("transferdialog");
						if (!this.transferdialog) {
							this.transferdialog = sap.ui.xmlfragment("com.vSimpleApp.fragment.Stock.TranfPost", this);
							this.transferdialog.open();

						}
					}
				}.bind(this)
			});

		},
		_onCreateEntryError: function(oError) {
			BusyIndicator.hide();
			var x = JSON.parse(oError.responseText);
			var err = x.error.message.value;

			jQuery.sap.require("sap.m.MessageBox");

			sap.m.MessageBox.error(
				"Error creating entry: " + err + " "
			);

		},
		onCancelStock: function(evt) {
			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			oPurchaseModel.setData({
				oData: {}
			});
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo('StockTable');
			window.location.reload();

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

			sap.ui.getCore().inputIdmvttype = oEvent.getSource().getId();
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
				var productInput = sap.ui.getCore().byId(sap.ui.getCore().inputIdmvttype);
				productInput.setValue(oSelectedItem.getTitle());

				evt.getSource().getBinding("items").filter([]);
			}
		},
		/* reason for movment  start    */

		handleValueHelpReasonForMvmt: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			sap.ui.getCore().inputIdMVT = oEvent.getSource().getId();
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
				var productInput = sap.ui.getCore().byId(sap.ui.getCore().inputIdMVT);
				productInput.setValue(oSelectedItem.getTitle());

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

			sap.ui.getCore().inputIdsplst = oEvent.getSource().getId();
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
				var productInput = sap.ui.getCore().byId(sap.ui.getCore().inputIdsplst);
				productInput.setValue(oSelectedItem.getTitle());

				evt.getSource().getBinding("items").filter([]);
			}
		},
		//validation function

		//numeric validation
		onChangeValue: function(oEvent) {
			var oControl = oEvent.getSource();
			var sPlaceholder = oControl.getProperty("placeholder");
			var sValue = oControl.getValue();

			if (sValue === "") {
				oControl.setValueState("Error");
				oControl.setValueStateText(sPlaceholder + "is required");
			} else {
				oControl.setValueState("None");
				oControl.setValueStateText("");

			}

		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.vSimpleApp.view.StockTransfer
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.vSimpleApp.view.StockTransfer
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.vSimpleApp.view.StockTransfer
		 */
		//	onExit: function() {
		//
		//	}

	});

});