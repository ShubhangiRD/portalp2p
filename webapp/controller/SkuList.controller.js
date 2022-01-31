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
	'sap/ui/Device'
], function(Controller, JSONModel, Filter, FilterOperator, MessageBox, BusyIndicator, exportLibrary, library, Sorter, StockStandards,
	Device) {
	"use strict";
	var oView;
	var sPathThreshold;
	var oMaterialList;

	var result = [];

	var sKunnr, sSalesorg;
	return Controller.extend("com.vSimpleApp.controller.SkuList", {
		onInit: function() {
			oView = this.getView();
			//set the model on view to be used by the UI controls
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

			oView = this.getView();

			this.getSalesOrderDetails();
			var oSalesModel = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(oSalesModel, "oSalesModel");

			var oEX = new JSONModel();
			oView.setModel(oEX, "oEX");
			var SOitemDetailModel = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(SOitemDetailModel, "SOitemDetailModel");

			var oSingleExcessData = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(oSingleExcessData, "oSingleExcessData");
			var oStandards = sap.ui.getCore().getModel("SOSalesModel");
			var value = oStandards.oData.SalesContract.MomentType;
			sap.ui.getCore().getModel("oTransferPostModel").setProperty("/MovmtTypeTP", value);

			var value2 = oStandards.oData.SalesContract.Auart;
			sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/DocType", value2);
			//set the model on view to be used by the UI controls
			this.getView().setModel(oModel);
			//	this.getExcess();
			this.getCustomer();

			// this.getStock();

			var oMediaModel = new JSONModel();
			this.getView().setModel(oMediaModel, "range");

			var oRange = Device.media.getCurrentRange("Std");
			this._setRangeModel(oRange.name);

			Device.media.attachHandler(function(mParams) {
				this._setRangeModel(mParams.name);
			}.bind(this), null, "Std");
		},
	goHome: function(oEvent) {
			this.getRouter().navTo("StockTable");
		},
		OnSelectRButton: function(oEvent) {

			var oselecttab = oEvent.oSource.mProperties.text;

			var CurrentD = new Date();

			if (oselecttab === "24 Hours") {

				//var ddNextDay=  CurrentD.setHours(CurrentD.getHours() + 24)
				var dNextDay = new Date(new Date(CurrentD).getTime() - 60 * 60 * 24 * 1000);
				var dfirst = CurrentD.toISOString().slice(0, 19);
				var dlast = dNextDay.toISOString().slice(0, 19);

				this.getView().getModel("oSkuModel").setProperty("/FirstDate", dfirst);

				this.getView().getModel("oSkuModel").setProperty("/EndDate", dlast);

			} else if (oselecttab === "48 Hours") {

				//var dNextDay=  CurrentD.setHours(CurrentD.getHours() + 24)
				var dNextDay = new Date(new Date(CurrentD).getTime() - 60 * 60 * 48 * 1000);
				var dfirst = CurrentD.toISOString().slice(0, 19);
				var dlast = dNextDay.toISOString().slice(0, 19);

				this.getView().getModel("oSkuModel").setProperty("/FirstDate", dfirst);

				this.getView().getModel("oSkuModel").setProperty("/EndDate", dlast);

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

				var dLastMonth = new Date().toISOString().slice(0, 19);
				CurrentD.setMonth(CurrentD.getMonth() - 1);
				var dCurrentDate = CurrentD.toISOString().slice(0, 19);
				this.getView().getModel("oSkuModel").setProperty("/FirstDate", dLastMonth);
				this.getView().getModel("oSkuModel").setProperty("/EndDate", dCurrentDate);

			} else if (oselecttab === "Last 3 Months") {

				var dDateString1 = new Date().toISOString().slice(0, 19);
				CurrentD.setMonth(CurrentD.getMonth() - 3);

				var dLast3Month = CurrentD.toISOString().slice(0, 19);
				this.getView().getModel("oSkuModel").setProperty("/FirstDate", dDateString1);
				this.getView().getModel("oSkuModel").setProperty("/EndDate", dLast3Month);

			} else if (oselecttab === "Last 6 Months") {

				var dDateString2 = new Date().toISOString().slice(0, 19);
				CurrentD.setMonth(CurrentD.getMonth() - 6);

				var dLast3Month2 = CurrentD.toISOString().slice(0, 19);
				this.getView().getModel("oSkuModel").setProperty("/FirstDate", dDateString2);
				this.getView().getModel("oSkuModel").setProperty("/EndDate", dLast3Month2);

			}

		},
		MergeValues: function(List) {

			var aTabData = [];
			var aDuplicate_matnr = [];
			var array = [];
			var aNewArray = [];
			for (var i = 0; i < List.length; i++) {
				if (!array.includes(List[i].Matnr)) {
					array.push({
						Matnr: List[i].Matnr
					});
				}
			}
			var oindex = {};
			array.forEach(function(point) {
				var key = "" + point.Matnr + " ";
				if (key in oindex) {
					oindex[key].count++;
				} else {
					var aNewEntry = {
						Matnr: point.Matnr,
						count: 1
					};
					oindex[key] = aNewEntry;
					aNewArray.push(aNewEntry);
				}
			});
			aNewArray.sort(function(a, b) {
				return b.count - a.count;
			});

			for (var k = 0; k < aNewArray.length; k++) {
				if (aNewArray[k].count > 1) {

					var DupData = {
						Matnr: aNewArray[k].Matnr
					};
					aDuplicate_matnr.push(DupData);
				}
			}
			for (var z = 0; z < aDuplicate_matnr.length; z++) {
				for (var y = 0; y < List.length; y++) {
					if (aDuplicate_matnr[z].Matnr === List[y].Matnr) {
						if (List[y].Vbeln === "" && List[y].Audat === null) {

							var sEbeln = List[y].Ebeln;
							var sBedat = List[y].Bedat;

						}
						if (List[y].Ebeln === "" && List[y].Bedat === null) {

							var sVbeln = List[y].Vbeln;

							var sAudat = List[y].Audat;
						}
						var sMatnr = List[y].Matnr;
						var sMaktx = List[y].Maktx;
						var sWerks = List[y].Werks;

					}
				}

				aTabData.push({
					Matnr: sMatnr,
					Maktx: sMaktx,
					Werks: sWerks,
					Ebeln: sEbeln,
					Bedat: sBedat,
					Vbeln: sVbeln,

					Audat: sAudat
				});

			}
			return aTabData;
		},
		onSkuListFetch: function() {
			var that = this;
			var bRadioButton1 = this.getView().byId("id3mnthRd").getSelected();
			var bRadioButton2 = this.getView().byId("id6mnthRd").getSelected();

			if (bRadioButton1 === false && bRadioButton2 === false) {
				MessageBox.error("Please Select Month");
			} else {
				var oModelService = this.getOwnerComponent().getModel("StockModel");
				var oModel = this.getView().getModel("oSkuModel");
				var dFirstDate = oModel.oData.FirstDate;
				var dEndDate = oModel.oData.EndDate;

				var oFilter1 = new sap.ui.model.Filter('Currdate', sap.ui.model.FilterOperator.EQ, dFirstDate);
				var oFilter2 = new sap.ui.model.Filter('Prvdate', sap.ui.model.FilterOperator.EQ, dEndDate);
				BusyIndicator.show(true);
				oModelService.read("/getSkuListSet", {
					filters: [oFilter1, oFilter2],
					success: function(oData) {
						BusyIndicator.hide();
						var aList = oData.results;

						var aTabData = that.MergeValues(aList);

						that.getView().getModel("oSkuModel2").setData(aTabData);
						oView.getModel("oExcessDataModel").setData(aTabData);

					},
					error: function(oError) {
						BusyIndicator.hide();
						var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
						MessageBox.show(errorMsg);
					}

				});
			}
		},

		onProcessOrder: function(event) {
			var stable = this.byId("idSkuTable");

			if (stable.getSelectedItems() === [] || stable.getSelectedItem() === null) {

				MessageBox.error("Please Select Material To Process Order");

			} else {

				var oSalesOrder = this.getOwnerComponent().getModel("SOModel");
				var odata = oSalesOrder.oData.SOItem;
				for (var i = 0; i < odata.length; i++) {
					odata[i].TargetQty = "";
				}

				var Data = [];

				for (var i = 0; i < odata.length; i++) {
					var sMaterial = odata[i].Matnr;
					var sShortText = odata[i].Maktx;
					var sEbeln = odata[i].Ebeln;
					var sVbeln = odata[i].Vbeln;
					var sCurrdate = odata[i].Currdate;
					var sPrvdate = odata[i].Prvdate;
					var sAudat = odata[i].Audat;
					var sBedat = odata[i].Bedat;
					var sItmNumber = odata[i].ItmNumber;
					var sPlant = odata[i].Werks;
					Data.push({
						Material: sMaterial,
						ShortText: sShortText,
						Ebeln: sEbeln,
						Vbeln: sVbeln,
						Currdate: sCurrdate,
						Prvdate: sPrvdate,
						Audat: sAudat,
						Bedat: sBedat,
						TargetQty: "",
						ItmNumber: sItmNumber,
						Plant: sPlant
					});
				}

				var oSO = sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/OrderItemsInSet", Data);

				this.UpdateSale = this.getView().byId("helloDialog");
				if (!this.UpdateSale) {
					this.UpdateSale = sap.ui.xmlfragment("com.vSimpleApp.fragment.Stock.SOCreation", this);

					this.UpdateSale.open();
				}
			}
		},

		// discount

		onDiscountMaterial: function() {
			var stable = this.byId("idSkuTable");
			if (stable.getSelectedItems().length > 1) {
				MessageBox.error("Please Select only one Material for Discount");
				stable.removeSelections();

			} else if (stable.getSelectedItems() === [] || stable.getSelectedItem() === null) {

				MessageBox.error("Please Select Material for Discount");

			} else {

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

			var oModelService = this.getOwnerComponent().getModel("StockModel");

			var oPostData = sap.ui.getCore().getModel("SingleNoMvtData").oData;

			var smatnr = oPostData.Matnr;
			var sAmt = oPostData.DiscAmt;
			var dValidTo = oPostData.ValidTo;

			var dValidFrom = oPostData.ValidFrom;

			var ssalesorg = oPostData.SalesOrg1;
			var sdistriChnl = oPostData.DistriChnl;
			var scaltype = "A";
			var sUnit = "%";
			var oEntry = {};

			oEntry.Vkorg = ssalesorg;
			oEntry.Vtweg = sdistriChnl;
			oEntry.Matnr = smatnr;
			oEntry.Kbetr = sAmt;
			oEntry.Konwa = sUnit;

			var Date1 = new Date(dValidFrom);
			Date1 = Date1.setDate(Date1.getDate() + 1);

			var Date2 = new Date(dValidTo);
			Date2 = Date2.setDate(Date2.getDate() + 1);

			var Date3 = new Date(Date1).toISOString();
			var Date4 = new Date(Date2).toISOString();
			Date3 = Date3.slice(0, -5)
			Date4 = Date4.slice(0, -5)

			oEntry.Datab = Date3;
			oEntry.Datbi = Date4;

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
				error: function(oError) {
					//error handler code
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageBox.show(errorMsg);
					BusyIndicator.hide();

				},
				merge: false
			};
			//get entity set
			var sRelPath = "/CreateDiscountConditionSet";
			BusyIndicator.show(true);
			oModelService.create(sRelPath, oEntry, mParameters);

			this.pressDialogExcessDiscount.close();
			this.pressDialogExcessDiscount.destroy();

			var table = this.byId("idSkuTable");
			//remove selected materials
			table.removeSelections();
		},
		onCancelDiscount: function() {
			var stable = this.byId("idSkuTable");
			var oModel = sap.ui.getCore().getModel("SingleNoMvtData");
			//clear model data
			oModel.setData({
				oData: {}
			});
			//remove selected materials
			stable.removeSelections();
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
			var aExcess = [];

			for (var i = 0; i < aSelectedIndex.length; i++) {

				var odata = aSelectedIndex[i];
				var excess = oExcessModel.getProperty(odata);
				aExcess.push(excess);
				aExcess[i].ItmNumber = this.LeadingZeros(i + 1, 6);
			}
			var SalesOrder = this.getOwnerComponent().getModel("SOModel");
			var sSoItem = SalesOrder.setProperty("/SOItem", aExcess);

			var tableItems = this.byId("idSkuTable");
			sPathThreshold = tableItems.getSelectedContextPaths();

		},
		onRefreshTable: function() {

			var stable = this.byId("idSkuTable");
			stable.removeSelections();
			this.getView().getModel("oskuFilterModel").setData({
				oData: {}
			});

			this.getView().byId("id3mnthRd").setSelected(false);
			this.getView().byId("id6mnthRd").setSelected(false);

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
					oMaterialList = oData.results;
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/MaterialList", oMaterialList);
					oLookupModel.refresh(true);

				},
				error: function(oError) {

					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageBox.show(errorMsg);
				}
			});
		},

		handlePOMaterialHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();
			sap.ui.getCore().SkuMat = oEvent.getSource().getId();
			// create value help dialog
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
				var productInput = sap.ui.getCore().byId(sap.ui.getCore().SkuMat),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				var div = oSelectedItem.getDescription(); // productInput.setSelectedKey(sDescription);
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

			if (oSelectedItem) {
				var productInput = sap.ui.getCore().byId(sap.ui.getCore().salesorg1),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				var div = oSelectedItem.getDescription();

				productInput.setValue(sTitle);
			}
		},
		getSalesOrgforCondition: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("StockModel");
			//get entity set
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
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("StockModel");
			//get entity set
			oModel.read("/get_DistributionChannelf4Set", {
				success: function(oData) {

					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/DistributionChnl", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {

					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageBox.show(errorMsg);
				}
			});
		},
		handleChangeDate: function() {
			var oModelService = this.getOwnerComponent().getModel("StockModel");
			var that = this;
			var oModel = this.getView().getModel("oskuFilterModel");
			var material = oModel.getData().Material;
			var dFrom = oModel.getData().Range1;
			var dTo = oModel.getData().Range2;
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

			var Date1 = new Date(dFrom);
			Date1 = Date1.setDate(Date1.getDate() + 1);

			var Date2 = new Date(dTo);
			Date2 = Date2.setDate(Date2.getDate() + 1);

			Date1 = new Date(Date1).toISOString();
			Date2 = new Date(Date2).toISOString();
			Date1 = Date1.slice(0, -5)
			Date2 = Date2.slice(0, -5)

			var oFilter1 = new sap.ui.model.Filter('Currdate', sap.ui.model.FilterOperator.EQ, Date2);
			var oFilter2 = new sap.ui.model.Filter('Prvdate', sap.ui.model.FilterOperator.EQ, Date1);
			var oFilter3 = new sap.ui.model.Filter('Matnr', sap.ui.model.FilterOperator.EQ, material);

			BusyIndicator.show();
			//get entity set
			oModelService.read("/getSkuListSet", {
				filters: [oFilter1, oFilter2, oFilter3],
				success: function(oData) {
					BusyIndicator.hide();
					var List2 = oData.results;
					//pass odata to the function
					var aTabData = that.MergeValues(List2);
					that.getView().getModel("oSkuModel2").setData(aTabData);

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
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("StockModel");
			//get entity set
			BusyIndicator.show(true);
			oModel.read("/getCustomerSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var sCustomer = oData.results;
					//get model from the component
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
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
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("StockModel");
			var oLookupModel = that.getOwnerComponent().getModel("Lookup");

			BusyIndicator.show(true);
			//get entity set
			oModel.read("/getShipDetailsSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var sShipDetails = oData.results;
					var len = sShipDetails.length;

					var itemPO = oData.results.length;
					var ListofShipDetails = [];
					//set the odata to model property
					oLookupModel.setProperty("/shipdetails", oData.results);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageBox.show(errorMsg);
				}
			});
		},

		onCancelSales: function() {
			var oSO = sap.ui.getCore().getModel("SOSalesModel");
			var SOContract = oSO.getProperty("/SalesContract");
			//	oSO.oData.SalesContract = [];
			SOContract.OrderItemsInSet = [];
			SOContract.OrderItemsInSet.length = 0;
			SOContract.OrderConditionsInSet.length = 0;
			SOContract.OrderSchedulesInSet = [];
			var SalesOrder = this.getOwnerComponent().getModel("SOModel");
			SalesOrder.oData.SOItem.length = 0;
			SalesOrder.oData.SOItem = [];

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

			//get entity set
			oModel.read("/getShipDetailsSet", {
				filters: [oFilter],
				success: function(oData) {
					BusyIndicator.hide();
					var sShipDetails = oData.results;
					var len = sShipDetails.length;

					var itemPO = oData.results.length;
					var ListofShipDetails = [];
					//set the odata to model property
					oLookupModel.setProperty("/shipdetails", oData.results);
				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageBox.show(errorMsg);
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
				//set properties to the model
				sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/SalesOrg", sTitle);
				sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/DistrChan", sDescription);
				sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/Division", div);

			}
			evt.getSource().getBinding("items").filter([]);
		},
		getSalesOrderDetails: function() {
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("StockModel");
			//get entity set
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
					var oindex = {};

					aListofVendoritem.forEach(function(point) {
						var key = "" + point.Matnr + " ";
						if (key in oindex) {
							oindex[key].count++;
						} else {
							var aNewEntry = {
								Matnr: point.Matnr,
								Kwmeng: "",
								count: 1
							};
							oindex[key] = aNewEntry;
							result.push(aNewEntry);
						}
					});

					result.sort(function(a, b) {
						return b.count - a.count;
					});

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
					MessageBox.show(oError);
				}

			});

		},
		_getSimulateData: function(oEvent) {

			var oModel = this.getOwnerComponent().getModel("PurchaseSet");
			var oSalesModel = sap.ui.getCore().getModel("SOSalesModel");
			var SOSalesModel = oSalesModel.getProperty("/SalesContract");
			var Price = SOSalesModel.OrderItemsInSet[0].NetPrice;

			var getRequestPayload;

			var Stock = new StockStandards(SOSalesModel);
			getRequestPayload = Stock.getRequestPayload();
			getRequestPayload.Testrun = "X";

			var mParameters = {
				success: function(oResponse, object) {
					if (oResponse.OrderItemsInSet !== null && oResponse.OrderConditionsInSet !== null) {
						var Podata = new StockStandards(oResponse);
						sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract", oResponse);

						sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/OrderItemsInSet", Podata.OrderItemsInSet.results);
						sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/OrderConditionsInSet", Podata.OrderConditionsInSet.results);
						sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/OrderSchedulesInSet", Podata.OrderSchedulesInSet.results);
						sap.ui.getCore().getModel("SOitemDetailModel").setProperty("/Soitems", Podata.OrderItemsInSet.results[0]);
					} else {
						MessageBox.information("No Data Available for this Material");
					}
					var Partnr = oResponse.SoPartnersSet.results[0].PartnNumb;
					sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/PartnNumb", Partnr);

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

			var SalesOrder = this.getOwnerComponent().getModel("SOModel");
			var soldtoparty = sap.ui.getCore().byId("idsoldtopt");
			var idSaleorg = sap.ui.getCore().byId("idSaleorg");

			if (soldtoparty.getValue() == "") {

				soldtoparty.setValueState("Error");
				soldtoparty.setValueStateText("Sold-To-Party is required");
			} else if (idSaleorg.getValue() == "") {
				idSaleorg.setValueState("Error");
				idSaleorg.setValueStateText("Sales Organization is required");
			} else {
				var oModel = this.getOwnerComponent().getModel("PurchaseSet");
				var oSalesModel = sap.ui.getCore().getModel("SOSalesModel");
				var SOSalesModel = oSalesModel.getProperty("/SalesContract");
				var oStock = new StockStandards(SOSalesModel);
				var getRequestPayload = oStock.getRequestPayload();
				getRequestPayload.Testrun = "";

				var len = SOSalesModel.OrderItemsInSet.length;

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
									var oSO = sap.ui.getCore().getModel("SOSalesModel");
									var SOContract = oSO.getProperty("/SalesContract");
									SOContract.OrderItemsInSet = [];
									SOContract.OrderConditionsInSet = [];
									SOContract.OrderSchedulesInSet = [];
									var SOitemDetailModel = sap.ui.getCore().getModel("SOitemDetailModel");
									SOitemDetailModel.oData = [];

									SalesOrder.refresh(true);

									sap.ui.getCore().byId("histroyDialog").destroy(null);

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

				oModel.create(relPath, getRequestPayload, mParameters);

				var table = this.byId("excesstable");

				table.removeSelections();
			}

		},
		onSkuBack: function() {
			//navigate to stocktable screen
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("StockTable");
		},
				_setRangeModel : function (sRange) {
			var bIsPhone = sRange === "Phone",
				bIsTablet = sRange === "Tablet";

			this.getView().getModel("range").setData({
				isPhoneOrTablet : bIsPhone || bIsTablet,
				isNotPhoneOrTablet : !(bIsPhone || bIsTablet),
				isTablet : bIsTablet,
				isNoTablet : !bIsTablet,
				isPhone : bIsPhone,
				isNoPhone : !bIsPhone
			});
			var oModel =this.getView().getModel("range").getData();
			var bPhone= oModel.isPhone;
			// if(bPhone === true){
			//   var b = this.getView().byId("idHBoxAddPrp");
			//   b.setWidth("100%");
		
			// }else{
			// 	var a = this.getView().byId("idHBoxAddPrp");
			// 	 a.setWidth("50%");
				
				
			// }
		},

		// onOpen: function (oEvent) {
		// 	var oButton = oEvent.getSource(),
		// 		oView = this.getView();

		// 	if (!this._pActionSheet) {
		// 		this._pActionSheet = Fragment.load({
		// 			id: oView.getId(),
		// 			name: "sap.m.sample.ToolbarResponsive.ActionSheet",
		// 			controller: this
		// 		}).then(function(oActionSheet){
		// 			oView.addDependent(oActionSheet);
		// 			return oActionSheet;
		// 		});
		// 	}

		// 	this._pActionSheet.then(function(oActionSheet){
		// 		oActionSheet.openBy(oButton);
		// 	});
		// },

	});

});