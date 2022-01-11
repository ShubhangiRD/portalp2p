sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox",
	"sap/ui/core/BusyIndicator",
	"sap/ui/export/library",
	"sap/ui/table/library",
	"sap/ui/model/Sorter",
		"com/vSimpleApp/Classes/StockStandards",
], function(Controller, JSONModel, Filter, FilterOperator, MessageBox, BusyIndicator, exportLibrary, library, Sorter,StockStandards) {
	"use strict";
	var oView;
	var sPathThreshold;
	var oMaterialList;
	var oComponent;
	var oController;
	var sPathThreshold;

	var PoDocumentNumber = [];
	var Excessdata = [];
	var SortOrder = library.SortOrder;
	var EdmType = exportLibrary.EdmType;
	var TotalLabst = [];
	var PoQuantity = [];
	var Totalsaleset = [];
	var sCustomer = [];
	var result = [];
	var sKunnr, sSalesorg;
	return Controller.extend("com.vSimpleApp.controller.SkuList", {
		onInit: function() {
			oView = this.getView();
			var oSkuModel = new JSONModel();
			this.getView().setModel(oSkuModel, "oSkuModel");
			var oCheckModel = new JSONModel();
			this.getView().setModel(oCheckModel, "oCheckModel");
			var oSkuModel2 = new JSONModel();
			this.getView().setModel(oSkuModel2, "oSkuModel2");
			var SingleNoMvtData = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(SingleNoMvtData, "SingleNoMvtData");

			var oskuFilterModel = new JSONModel();
			this.getView().setModel(oskuFilterModel, "oskuFilterModel");

			// process order model

			var oModel = this.getOwnerComponent().getModel("StockModel");
			oController = this;
			oView = this.getView();
			oComponent = this.getOwnerComponent();

			this.getSalesOrderDetails();
			var oSalesModel = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(oSalesModel, "oSalesModel");

			var EX = new JSONModel();
			oView.setModel(EX, "oEX");
			var SOitemDetailModel = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(SOitemDetailModel, "SOitemDetailModel");

			var SingleExcessData = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(SingleExcessData, "SingleExcessData");
			var Standards = sap.ui.getCore().getModel("SOSalesModel");
			var value = Standards.oData.SalesContract.MomentType;
			sap.ui.getCore().getModel("oTransferPostModel").setProperty("/MovmtTypeTP", value);

			var value2 = Standards.oData.SalesContract.Auart;
			sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/DocType", value2);
			//set the model on view to be used by the UI controls
			this.getView().setModel(oModel);
			//	this.getExcess();
			this.getCustomer();

			// this.getStock();
		},

		OnSelectRButton: function(oEvent) {

			var oselecttab = oEvent.oSource.mProperties.text;
			console.log(oselecttab)
			var CurrentD = new Date();

			if (oselecttab === "24 Hours") {

				//var NextDay=  CurrentD.setHours(CurrentD.getHours() + 24)
				var NextDay = new Date(new Date(CurrentD).getTime() - 60 * 60 * 24 * 1000);
				var first = CurrentD.toISOString().slice(0, 19);
				var last = NextDay.toISOString().slice(0, 19);

				console.log(first);
				console.log(last);
				this.getView().getModel("oSkuModel").setProperty("/FirstDate", first);

				this.getView().getModel("oSkuModel").setProperty("/EndDate", last);

			} else if (oselecttab === "48 Hours") {

				//var NextDay=  CurrentD.setHours(CurrentD.getHours() + 24)
				var NextDay = new Date(new Date(CurrentD).getTime() - 60 * 60 * 48 * 1000);
				var first = CurrentD.toISOString().slice(0, 19);
				var last = NextDay.toISOString().slice(0, 19);

				console.log(first);
				console.log(last);
				this.getView().getModel("oSkuModel").setProperty("/FirstDate", first);

				this.getView().getModel("oSkuModel").setProperty("/EndDate", last);

			}
			/*else if (oselecttab === "Current Month") {

				var firstDay = new Date(CurrentD.getFullYear(), CurrentD.getMonth(), 1);

				var lastDay = new Date(CurrentD.getFullYear(), CurrentD.getMonth() + 1, 0);

				var last1mon = firstDay.toISOString().slice(0, 19);
				var endo1mon = lastDay.toISOString().slice(0, 19);

				this.getView().getModel("oSkuModel").setProperty("/FirstDate", last1mon);

				this.getView().getModel("oSkuModel").setProperty("/EndDate", endo1mon);

			}*/
			else if (oselecttab === "Last 1 Month") {

				var LastMonth = new Date().toISOString().slice(0, 19);
				CurrentD.setMonth(CurrentD.getMonth() - 1);
				var CurrentDate = CurrentD.toISOString().slice(0, 19);
				this.getView().getModel("oSkuModel").setProperty("/FirstDate", LastMonth);
				this.getView().getModel("oSkuModel").setProperty("/EndDate", CurrentDate);
				console.log(CurrentDate);
				console.log(LastMonth);

			} else if (oselecttab === "Last 3 Months") {

				var dateString1 = new Date().toISOString().slice(0, 19);
				CurrentD.setMonth(CurrentD.getMonth() - 3);

				var Last3Month = CurrentD.toISOString().slice(0, 19);
				this.getView().getModel("oSkuModel").setProperty("/FirstDate", dateString1);
				this.getView().getModel("oSkuModel").setProperty("/EndDate", Last3Month);
				console.log(dateString1);
				console.log(Last3Month);

			} else if (oselecttab === "Last 6 Months") {

				var dateString2 = new Date().toISOString().slice(0, 19);
				CurrentD.setMonth(CurrentD.getMonth() - 6);

				var Last3Month2 = CurrentD.toISOString().slice(0, 19);
				this.getView().getModel("oSkuModel").setProperty("/FirstDate", dateString2);
				this.getView().getModel("oSkuModel").setProperty("/EndDate", Last3Month2);
				console.log(dateString2);
				console.log(Last3Month2);

			}

		},

		onSkuListFetch: function() {
			var that = this;
			var oModelService = this.getOwnerComponent().getModel("StockModel");
			var oModel = this.getView().getModel("oSkuModel");
			var FirstDate = oModel.oData.FirstDate;
			var EndDate = oModel.oData.EndDate;
			console.log(FirstDate);
			console.log(EndDate);
			var oFilter1 = new sap.ui.model.Filter('Currdate', sap.ui.model.FilterOperator.EQ, FirstDate);
			var oFilter2 = new sap.ui.model.Filter('Prvdate', sap.ui.model.FilterOperator.EQ, EndDate);
			BusyIndicator.show(true);
			oModelService.read("/getSkuListSet", {
				filters: [oFilter1, oFilter2],
				success: function(oData) {
					BusyIndicator.hide();
					var List = oData.results;
					console.log(List);
					that.getView().getModel("oSkuModel2").setData(List);
					oView.getModel("oExcessDataModel").setData(List);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}

			});
		},

		onProcessOrder: function(event) {
			var table = this.byId("idSkuTable");
			// table.removeSelections();
			if (table.getSelectedItems() === [] || table.getSelectedItem() === null) {

				MessageBox.error("Please Select Material To Process Order");

			} else {

				var SalesOrder = this.getOwnerComponent().getModel("SOModel");
				var odata = SalesOrder.oData.SOItem;
				for (var i = 0; i < odata.length; i++) {
					odata[i].TargetQty = "";
				}
				console.log(odata);
				var Data = [];

				for (var i = 0; i < odata.length; i++) {
					var Material = odata[i].Matnr;
					var ShortText = odata[i].Maktx;
					var Ebeln = odata[i].Ebeln;
					var Vbeln = odata[i].Vbeln;
					var Currdate = odata[i].Currdate;
					var Prvdate = odata[i].Prvdate;
					var Audat = odata[i].Audat;
					var Bedat = odata[i].Bedat;
					var ItmNumber = odata[i].ItmNumber;
					var Plant = odata[i].Werks;
					Data.push({
						Material: Material,
						ShortText: ShortText,
						Ebeln: Ebeln,
						Vbeln: Vbeln,
						Currdate: Currdate,
						Prvdate: Prvdate,
						Audat: Audat,
						Bedat: Bedat,
						TargetQty: "",
						ItmNumber: ItmNumber,
						Plant: Plant
					});
				}

				var SO = sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/OrderItemsInSet", Data);

				this.UpdateSale = this.getView().byId("helloDialog");
				if (!this.UpdateSale) {
					this.UpdateSale = sap.ui.xmlfragment("com.vSimpleApp.fragment.Stock.SOCreation", this);

					this.UpdateSale.open();
				}
			}
		},

		// discount

		onDiscountMaterial: function() {
			var table = this.byId("idSkuTable");
			if (table.getSelectedItems().length > 1) {
				MessageBox.error("Please Select only one Material for Discount");
				table.removeSelections();

			} else if (table.getSelectedItems() === [] || table.getSelectedItem() === null) {
				/*		var model = sap.ui.getCore().getModel("SingleExcessData");
						model.setData({
							oData: {}
						});
						model.Matnr = "";
						model.Descrption = "";*/
				MessageBox.error("Please Select Material for Discount");

			} else {
				// var oExcessmodelInfo = oView.getModel("oExcessDataModel");
				var oExcessmodelInfo = this.getView().getModel("oSkuModel2");

				var oSelectedRecord = oExcessmodelInfo.getProperty(sPathThreshold[0]);
				// oSelectedRecord.DiscAmt = "";
				// oSelectedRecord.DistriChnl = "";
				// oSelectedRecord.SalesOrg1 = "";
				// oSelectedRecord.ValidFrom = "";
				// oSelectedRecord.ValidTo = "";
				console.log(oSelectedRecord.Matnr);

				sap.ui.getCore().getModel("SingleNoMvtData").setData(oSelectedRecord);

				this.pressDialogExcessDiscount = oView.byId("idNoMvtMat");
				if (!this.pressDialogExcessDiscount) {
					this.pressDialogExcessDiscount = sap.ui.xmlfragment("com.vSimpleApp.fragment.Stock.DiscountNoMvtMaterial", this);
					this.pressDialogExcessDiscount.open();
				}
			}

		},
		onSaveDiscount: function() {

			/*	var oExcessDataModel = this.getOwnerComponent().getModel("oExcessDataModel");*/
			var oModelService = this.getOwnerComponent().getModel("StockModel");

			var oPostData = sap.ui.getCore().getModel("SingleNoMvtData").oData;
			// console.log(oPostData);
			var matnr = oPostData.Matnr;
			var Amt = oPostData.DiscAmt;
			var ValidTo = oPostData.ValidTo;
			// .toISOString();
			// ValidTo.slice(0, -5);
			var ValidFrom = oPostData.ValidFrom;
			// .toISOString();
			// ValidDate.slice(0, -5);
			var salesorg = oPostData.SalesOrg1;
			var distriChnl = oPostData.DistriChnl;
			var caltype = "A";
			var Unit = "%";
			var oEntry = {};

			oEntry.Vkorg = salesorg;
			oEntry.Vtweg = distriChnl;
			oEntry.Matnr = matnr;
			oEntry.Kbetr = Amt;
			oEntry.Konwa = Unit;

			// var ValidFromDate = new Date(ValidFrom);
			// var Date1 = ValidFromDate.toISOString();
			// Date1 = Date1.slice(0, -5)
			// var ValidToDate = new Date(ValidTo);
			// var Date2 = ValidToDate.toISOString();
			// Date2 = Date2.slice(0, -5)

			var Date1 = new Date(ValidFrom);
			Date1 = Date1.setDate(Date1.getDate() + 1);

			var Date2 = new Date(ValidTo);
			Date2 = Date2.setDate(Date2.getDate() + 1);

			var Date3 = new Date(Date1).toISOString();
			var Date4 = new Date(Date2).toISOString();
			Date3 = Date3.slice(0, -5)
			Date4 = Date4.slice(0, -5)

			console.log(Date3);
			console.log(Date4);

			console.log(Date1);
			console.log(Date2);
			oEntry.Datab = Date3;
			oEntry.Datbi = Date4;
			console.log(oEntry);
			var that = this;

			var mParameters = {
				success: function(oResponse, object) {

					MessageBox.show("Discount Added Sucessfully.");
					BusyIndicator.hide();

					var oModel = sap.ui.getCore().getModel("SingleNoMvtData");
					var oModel2 = sap.ui.getCore().getModel("oExcessDataModel");

					oModel.setData({
						oData: {}
					});

				},
				error: function(error) {
					MessageBox.error(error);
					BusyIndicator.hide();
				},
				merge: false
			};
			var relPath = "/CreateDiscountConditionSet";
			BusyIndicator.show(true);
			oModelService.create(relPath, oEntry, mParameters);

			this.pressDialogExcessDiscount.close();
			this.pressDialogExcessDiscount.destroy();

			//this.pressDialogExcessDiscount.close();
			//	this.pressDialogExcessDiscount.destroy();

			var table = this.byId("idSkuTable");

			table.removeSelections();
		},
		onCancelDiscount: function() {
			var table = this.byId("idSkuTable");
			var oModel = sap.ui.getCore().getModel("SingleNoMvtData");

			oModel.setData({
				oData: {}
			});
			table.removeSelections();
			this.pressDialogExcessDiscount.close();
			this.pressDialogExcessDiscount.destroy();
		},
		LeadingZeros: function(num, size) {
			var s = num + "0" + "";
			while (s.length < size) s = "0" + s;
			return s;
		},

		onExcessSelectionItem: function() {
			var oPurchaseItemTable = this.byId("idSkuTable");
			var aSelectedIndex = oPurchaseItemTable._aSelectedPaths;
			var oExcessModel = this.getOwnerComponent().getModel("oExcessDataModel");
			var Excess = [];
			//	var aPurchaseConditionItems = oPurchaseModel.getProperty("/TempContract/PoitemSet");
			for (var i = 0; i < aSelectedIndex.length; i++) {

				var odata = aSelectedIndex[i];
				var excess = oExcessModel.getProperty(odata);
				Excess.push(excess);
				Excess[i].ItmNumber = this.LeadingZeros(i + 1, 6);
			}
			var SalesOrder = this.getOwnerComponent().getModel("SOModel");
			var sSoItem = SalesOrder.setProperty("/SOItem", Excess);

			console.log(sSoItem);

			var tableItems = this.byId("idSkuTable");
			sPathThreshold = tableItems.getSelectedContextPaths();
			console.log(sPathThreshold);

		},
		onRefreshTable: function() {

			var table = this.byId("idSkuTable");
			table.removeSelections();
			this.getView().getModel("oskuFilterModel").setData({oData:{}});
			// this.getView().getModel("oSkuModel2").setData({oData:{}});
		},

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
					// that.getStockDetailList();
				},
				error: function(oError) {
					//	BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageBox.show(errorMsg);
				}
			});
		},

		handlePOMaterialHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			// this.inputId = oEvent.getSource().getId();
			sap.ui.getCore().SkuMat = oEvent.getSource().getId();
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

			/*		if (oSelectedItem) {
						var productInput = this.byId(this.inputId);
						productInput.setValue(oSelectedItem.getTitle());
						var sTitle = oSelectedItem.getTitle();
						var sDescription = oSelectedItem.getInfo();
						productInput.setSelectedKey(sDescription);
						productInput.setValue(sTitle);

					}*/
			if (oSelectedItem) {
				var productInput = sap.ui.getCore().byId(sap.ui.getCore().SkuMat),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				var div = oSelectedItem.getDescription();

				// productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);
			}
			evt.getSource().getBinding("items").filter([]);

		},

		// f4 for create condtion

		handleSalesorg1: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			sap.ui.getCore().salesorg1 = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueSalesOrg) {
				this._valueSalesOrg = sap.ui.xmlfragment(
					"com.vSimpleApp.fragment.Stock.SalesOrg1",
					this
				);
				this.getView().addDependent(this._valueSalesOrg);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();

			}

			// create a filter for the binding
			this._valueSalesOrg.getBinding("items").filter(new Filter([new Filter(
				"Vkorg",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Vtext",
				FilterOperator.Contains, sInputValue
			)]));
			this.getSalesOrgforCondition();
			// open value help dialog filtered by the input value
			this._valueSalesOrg.open(sInputValue);

		},
		_handleSalesOrg1Search: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Vkorg",
				FilterOperator.Contains, sValue
			), new Filter(
				"Vtext",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},

		_handleSalesOrg1Close: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			// 		if (oSelectedItem) {
			// 			var productInput = this.byId(sap.ui.getCore().siddhikasalesorg);
			// /*			productInput.setValue(oSelectedItem.getTitle());*/
			// 			productInput.setValue(oSelectedItem.getTitle());
			// 		// productInput.setValue(oSelectedItem);

			// 			evt.getSource().getBinding("items").filter([]);
			// 		}

			if (oSelectedItem) {
				var productInput = sap.ui.getCore().byId(sap.ui.getCore().salesorg1),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				var div = oSelectedItem.getDescription();

				// productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);
			}
		},
		getSalesOrgforCondition: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("StockModel");

			oModel.read("/get_salesorgf4Set", {
				success: function(oData) {

					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/SalesOrg1", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {

					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		//*Distribution channel*/

		handleDistributionChannel: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			sap.ui.getCore().InpDistributionChannel = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueDistriChannel) {
				this._valueDistriChannel = sap.ui.xmlfragment(
					"com.vSimpleApp.fragment.Stock.DistributionChannel",
					this
				);
				this.getView().addDependent(this._valueDistriChannel);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();

			}

			// create a filter for the binding
			this._valueDistriChannel.getBinding("items").filter(new Filter([new Filter(
				"Vtweg",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Vtext",
				FilterOperator.Contains, sInputValue
			)]));
			this.getDistributionChannelforCondition();
			// open value help dialog filtered by the input value
			this._valueDistriChannel.open(sInputValue);

		},
		_handleDistributionChannelSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Vtweg",
				FilterOperator.Contains, sValue
			), new Filter(
				"Vtext",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},

		_handleDistributionChannelClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");

			if (oSelectedItem) {
				var productInput = sap.ui.getCore().byId(sap.ui.getCore().InpDistributionChannel),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				var div = oSelectedItem.getDescription();

				// productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);
			}
		},
		getDistributionChannelforCondition: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("StockModel");

			oModel.read("/get_DistributionChannelf4Set", {
				success: function(oData) {

					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/DistributionChnl", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {

					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
		handleChangeDate: function() {
			var oModelService = this.getOwnerComponent().getModel("StockModel");
			var that = this;
			var oModel = this.getView().getModel("oskuFilterModel");
			var material = oModel.getData().Material;
			var From = oModel.getData().Range1;
			var To = oModel.getData().Range2;
			var zero = "";

			if ($.isNumeric((material)) === true) {
				var len = material.length;
				if (len !== undefined) {
					var z = 18 - len;
					for (var i = 0; i < z; i++) {
						zero += "0";
					}
				}

				material = zero + material;
			}

			console.log(material);
			console.log(From);
			console.log(To);
			var Date1 = new Date(From);
			Date1 = Date1.setDate(Date1.getDate() + 1);

			var Date2 = new Date(To);
			Date2 = Date2.setDate(Date2.getDate() + 1);

			Date1 = new Date(Date1).toISOString();
			Date2 = new Date(Date2).toISOString();
			Date1 = Date1.slice(0, -5)
			Date2 = Date2.slice(0, -5)

			console.log(Date1);
			console.log(Date2);

			var oFilter1 = new sap.ui.model.Filter('Currdate', sap.ui.model.FilterOperator.EQ, Date2);
			var oFilter2 = new sap.ui.model.Filter('Prvdate', sap.ui.model.FilterOperator.EQ, Date1);
			var oFilter3 = new sap.ui.model.Filter('Matnr', sap.ui.model.FilterOperator.EQ, material);

			BusyIndicator.show();
			oModelService.read("/getSkuListSet", {
				filters: [oFilter1, oFilter2, oFilter3],
				success: function(oData) {
					BusyIndicator.hide();
					var List = oData.results;
	/*				var List2 = oData.results;
					console.log(List);
					that.getView().getModel("oSkuModel2").setData(List);
					for (var i = 0; i < List.length; i++) {
						var Material = List[i].Matnr;
						var ShortText = List[i].Maktx;
						var Ebeln = List[i].Ebeln;
						var Vbeln = List[i].Vbeln;
						var Currdate = List[i].Currdate;
						var Prvdate = List[i].Prvdate;
						var Audat = List[i].Audat;
						var Bedat = List[i].Bedat;
						List2.push({
							Material: Material,
							ShortText: ShortText,
							Ebeln: Ebeln,
							Vbeln: Vbeln,
							Currdate: Currdate,
							Prvdate: Prvdate,
							Audat: Audat,
							Bedat: Bedat
						});
					}
					oView.getModel("oExcessDataModel").setData(List2);*/
						that.getView().getModel("oSkuModel2").setData(List);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageBox.show(errorMsg);
				}

			});

		},
		//process order code

		getCustomer: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("StockModel");
			BusyIndicator.show(true);
			oModel.read("/getCustomerSet", {
				success: function(oData) {
					BusyIndicator.hide();
					sCustomer = oData.results;
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/CustomerDetails", oData.results);
					oLookupModel.refresh(true);
					//this.getShipmentDetails();
				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
		handleCustomervalue: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			sap.ui.getCore().inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogCusto) {
				this._valueHelpDialogCusto = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.Customer",
					this
				);
				this.getView().addDependent(this._valueHelpDialogCusto);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogCusto.getBinding("items").filter(new Filter([new Filter(
				"Kunnr",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Name1",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogCusto.open(sInputValue);
		},
		_handleCustomerSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Kunnr",
				FilterOperator.Contains, sValue
			), new Filter(
				"Name1",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleCustomerClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = sap.ui.getCore().byId(sap.ui.getCore().inputId);
				sSalesorg = oSelectedItem.getInfo();
				sKunnr = oSelectedItem.getTitle();
				productInput.setSelectedKey(sSalesorg);
				productInput.setValue(sKunnr);

				sap.ui.getCore().byId("idsoldtopt").setValue(sKunnr);
				sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/PartnNumb", sKunnr);
				//oView.getModel("SOModel").setProperty("/ShipToParty", sTitle);

			}
			evt.getSource().getBinding("items").filter([]);
		},
		getShipmentDetails: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("StockModel");
			var oLookupModel = that.getOwnerComponent().getModel("Lookup");

			BusyIndicator.show(true);
			oModel.read("/getShipDetailsSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var sShipDetails = oData.results;
					var len = sShipDetails.length;

					var itemPO = oData.results.length;
					var ListofShipDetails = [];
					oLookupModel.setProperty("/shipdetails", oData.results);

					// 				//	

				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		onCancelSales: function() {
				var SO = sap.ui.getCore().getModel("SOSalesModel");
				var SOContract = SO.getProperty("/SalesContract");
			//	SO.oData.SalesContract = [];
				SOContract.OrderItemsInSet = [];
				SOContract.OrderItemsInSet.length = 0;
				SOContract.OrderConditionsInSet.length = 0;
				SOContract.OrderSchedulesInSet = [];
				var SalesOrder = this.getOwnerComponent().getModel("SOModel");
				 SalesOrder.oData.SOItem.length=0;
				SalesOrder.oData.SOItem = [];
				//	window.location.reload();
				// SO.setData({
				// 	oData: {}
				// });

				SalesOrder.refresh(true);

				var table = this.byId("idSkuTable");
				table.removeSelections();
			this.UpdateSale.close();
			this.UpdateSale.destroy();
		},

		getSalesOrg: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("StockModel");
			var oLookupModel = that.getOwnerComponent().getModel("Lookup");

			var zero = "";

			if ($.isNumeric((sKunnr)) === true) {
				var len = sKunnr.length;
				if (len !== undefined) {
					var z = 10 - len;
					for (var i = 0; i < z; i++) {
						zero += "0";
					}
				}

				sKunnr = zero + sKunnr;
			}

			BusyIndicator.show(true);

			var oFilter = new sap.ui.model.Filter('Kunnr', sap.ui.model.FilterOperator.EQ, sKunnr);

			//	oModel.read("/getShipDetailsSet?$filter=(Kunnr  eq '" + sKunnr + "')", {
			oModel.read("/getShipDetailsSet", {
				filters: [oFilter],
				success: function(oData) {
					BusyIndicator.hide();
					var sShipDetails = oData.results;
					var len = sShipDetails.length;

					var itemPO = oData.results.length;
					var ListofShipDetails = [];
					oLookupModel.setProperty("/shipdetails", oData.results);
				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
		handleSalesorgvalue: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			sap.ui.getCore().inputIdSorg = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpSalesorg) {
				this._valueHelpSalesorg = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.SalesOrg",
					this
				);
				this.getView().addDependent(this._valueHelpSalesorg);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpSalesorg.getBinding("items").filter(new Filter([new Filter(
				"Kunnr",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Name1",
				FilterOperator.Contains, sInputValue
			)]));
			this.getSalesOrg();
			// open value help dialog filtered by the input value
			this._valueHelpSalesorg.open(sInputValue);
		},
		_handleSalesOrgSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Kunnr",
				FilterOperator.Contains, sValue
			), new Filter(
				"Name1",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleSalesOrgClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = sap.ui.getCore().byId(sap.ui.getCore().inputIdSorg),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				var div = oSelectedItem.getDescription();

				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

				sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/SalesOrg", sTitle);
				sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/DistrChan", sDescription);
				sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/Division", div);

			}
			evt.getSource().getBinding("items").filter([]);
		},
		getSalesOrderDetails: function() {

			var oModel = this.getOwnerComponent().getModel("StockModel");

			oModel.read("/SalesOrdersSet", {
				success: function(oData) {

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

				},

				error: function(oError) {
					MessageToast.show(oError);
				}

			});

		},
			_getSimulateData: function(oEvent) {
			var ConditionItem = [],
				ScheduleItem = [];
			var oModel = this.getOwnerComponent().getModel("PurchaseSet");
			var oSalesModel = sap.ui.getCore().getModel("SOSalesModel");
			var SOSalesModel = oSalesModel.getProperty("/SalesContract");
			var Price = SOSalesModel.OrderItemsInSet[0].NetPrice;

			var getRequestPayload;

			//	if(Price === "" || Price === undefined){

			var Stock = new StockStandards(SOSalesModel);
			getRequestPayload = Stock.getRequestPayload();
			getRequestPayload.Testrun = "X";

			var mParameters = {
				success: function(oResponse, object) {

					var Podata = new StockStandards(oResponse);
					sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract", oResponse);

					sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/OrderItemsInSet", Podata.OrderItemsInSet.results);
					sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/OrderConditionsInSet", Podata.OrderConditionsInSet.results);
					sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/OrderSchedulesInSet", Podata.OrderSchedulesInSet.results);
					sap.ui.getCore().getModel("SOitemDetailModel").setProperty("/Soitems", Podata.OrderItemsInSet.results[0]);
					var Partnr = oResponse.SoPartnersSet.results[0].PartnNumb;
					sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/PartnNumb", Partnr);

					//	sap.ui.getCore().byId("histroyDialog").destroy(null);
					//	sap.ui.getCore().byId("histroyDialog").close();
					//	this.getOwnerComponent().getRouter().navTo("StockTable");
				},
				error: function(error) {
					MessageBox.error(error);

				},
				merge: false
			};
			var relPath = "/sales_orderSet";
			//	BusyIndicator.show(true);
			oModel.create(relPath, getRequestPayload, mParameters);


		},
			onSaveSalesorder: function(oEvent) {
			var ConditionItem = [],
				ScheduleItem = [];
			var SalesOrder = this.getOwnerComponent().getModel("SOModel");
			var soldtoparty = sap.ui.getCore().byId("idsoldtopt");
	var idSaleorg = sap.ui.getCore().byId("idSaleorg");

			if (soldtoparty.getValue() == "") {
			
					soldtoparty.setValueState("Error");
				soldtoparty.setValueStateText("Sold-To-Party is required");
			}else if(idSaleorg.getValue() == ""){
					idSaleorg.setValueState("Error");
				idSaleorg.setValueStateText("Sales Organization is required");
			}
			
			else {
				var oModel = this.getOwnerComponent().getModel("PurchaseSet");
				var oSalesModel = sap.ui.getCore().getModel("SOSalesModel");
				var SOSalesModel = oSalesModel.getProperty("/SalesContract");
				var Stock = new StockStandards(SOSalesModel);
				var getRequestPayload = Stock.getRequestPayload();
				getRequestPayload.Testrun = "";

				// var len =  SOSalesModel.OrderItemsInSet.length;
				//  for(var v=0 ; v< len ; v++){
				//  		var oCondition = SOSalesModel.OrderItemsInSet[v].NetPrice;
				//  	var ItmNumber = SOSalesModel.OrderItemsInSet[v].NetPrice;	
				// 	 getRequestPayload.OrderConditionsInSet.push({
				// 			ItmNumber : ItmNumber, 
				//  		CondType: "ZMA1",
				// 	CondValue: oCondition
				// 	 });

				//  }

				var len = SOSalesModel.OrderItemsInSet.length;
				// for(var v=0 ; v< len ; v++){
				// 	getRequestPayload.OrderItemsInSet[v].ItmNumber = LeadingZeros(v + 1, 6);
				// }

				// var len =  SOSalesModel.OrderItemsInSet.length;
				// 	 for(var v=0 ; v< len ; v++){
				// 	 		var oCondition = SOSalesModel.OrderItemsInSet[v].NetPrice;
				// 	 	var ItmNumber = SOSalesModel.OrderItemsInSet[v].NetPrice;	
				// 		 getRequestPayload.OrderConditionsInSet.push({
				//				ItmNumber : ItmNumber, 
				// 	 		CondType: "ZMA1",
				// 		CondValue: oCondition
				// 		 });

				// 	 }

				// 	 for(var vv=0 ; vv< len ; vv++){
				// 	 	var condType = SOSalesModel.OrderItemsInSet[vv].CondType;
				// 	 	if(condType == "ZNET"){
				// 	 		var oCondition1 = SOSalesModel.OrderItemsInSet[vv].NetPrice;

				// 			getRequestPayload.OrderConditionsInSet.push({
				//				ItmNumber : ItmNumber, 
				// 	 		CondType: "ZNET",
				// 			CondValue: oCondition1
				// 		 });

				// 	 	}

				// 	 }

				for (var v = 0; v < len; v++) {
					var oCondition = SOSalesModel.OrderItemsInSet[v].NetPrice;
					var ItmNumber = SOSalesModel.OrderItemsInSet[v].ItmNumber;
					var len2 = SOSalesModel.OrderConditionsInSet.length;
					for (var i = 0; i < len2; i++) {
						if (SOSalesModel.OrderConditionsInSet[i].CondType == 'ZNET') {
							SOSalesModel.OrderConditionsInSet[i].CondValue = oCondition;
						}
					}
					getRequestPayload.OrderConditionsInSet.push({
						ItmNumber: ItmNumber,
						CondType: "ZMA1",
						CondValue: oCondition
					});

				}

				// getRequestPayload.OrderSchedulesInSet = ScheduleItem;
				var mParameters = {
					success: function(oResponse, object) {
						var so = object.data.Salesdocument;
						var ss1 = object.data.Salesdocumentin;

						sap.m.MessageBox.show("Standard Order #" + so + " has been Created Sucessfully..", {
							icon: sap.m.MessageBox.Icon.INFORMATION,

							actions: [sap.m.MessageBox.Action.OK],
							onClose: function(oAction) {
								if (oAction === "OK") {
									var SO = sap.ui.getCore().getModel("SOSalesModel");
									var SOContract = SO.getProperty("/SalesContract");
									SOContract.OrderItemsInSet = [];
									SOContract.OrderConditionsInSet = [];
									SOContract.OrderSchedulesInSet = [];
									var SOitemDetailModel = sap.ui.getCore().getModel("SOitemDetailModel");
									SOitemDetailModel.oData = [];

									//		SO.oData = [];

									// 
									// SO.oData = [];
									// SO.oData.SalesContract = [];
									//	 window.location.reload();

									//	var odata = SalesOrder.oData.SOItem;

									SalesOrder.refresh(true);

									sap.ui.getCore().byId("histroyDialog").destroy(null);
									//sap.ui.getCore().byId("histroyDialog").close();
								}
							}.bind(this)
						});

					},
					error: function(error) {
						MessageBox.error(error);

					},
					merge: false
				};
				var relPath = "/sales_orderSet";
				//	BusyIndicator.show(true);
				oModel.create(relPath, getRequestPayload, mParameters);

				var table = this.byId("excesstable");

				table.removeSelections();
			}

		},

	});

});