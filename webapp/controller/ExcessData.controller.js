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
	"sap/ui/export/Spreadsheet",
	"com/vSimpleApp/Classes/StockStandards",
	"com/vSimpleApp/Classes/SOConditionItem",
	"com/vSimpleApp/model/formatter",
		"com/vSimpleApp/Classes/ServiceF4"

], function(Controller, JSONModel, Filter, FilterOperator, BusyIndicator, MessageToast, Export, ExportTypeCSV, MessageBox, Sorter,
	library, jquery, RowAction,
	RowActionItem, RowSettings, Fragment, exportLibrary, Spreadsheet, StockStandards, SOConditionItem, formatter,ServiceF4) {
	"use strict";
	var oView, oComponent,
		oController,
		sPathThreshold,

		PoDocumentNumber = [];
	var Excessdata = [];
	var SortOrder = library.SortOrder;
	var EdmType = exportLibrary.EdmType;
	var TotalLabst = [];
	var PoQuantity = [];
	var Totalsaleset = [];
	var sCustomer = [];
	var result = [];
	var sKunnr, sSalesorg;
	var Service = new ServiceF4();
	return Controller.extend("com.vSimpleApp.controller.ExcessData", {
		formatter: formatter,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.vSimpleApp.view.ExcessData
		 */
		onInit: function() {
			oController = this;
			oView = this.getView();
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

			this.getCustomer();

			this.getStock();

		},
	goHome: function(oEvent) {
		
			this.getOwnerComponent().getRouter().navTo("StockTable");

		},
		getStock: function() {
			//get all data from odata model
			var oModel2 = this.getOwnerComponent().getModel("StockModel");
			var Excesss = [];
			//get entity set
			oModel2.read("/STOCK_DATASet", {
				success: function(oData) {

					var ListofSrs = [];

					var len = oData.results.length;

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

						if (Matnr !== "" || Matnr !== undefined) {
							for (var x1 = 0; x1 <= result.length - 1; x1++) {

								if (Matnr === result[x1].Matnr) {
									var sOpenSalesOrder = result[x1].Kwmeng;

								}
							}
						}

						ListofSrs.push({
							Cbtlv: Cbtlv,
							Cgtlv: Cgtlv,
							Cytlv: Cytlv,
							Changedon: Changedon,
							Crtlv: Crtlv,

							//	Labst: parseInt(sTotalLabst),
							Labst: parseInt(Labst),
							ALabst: parseInt(Labst - sOpenSalesOrder),
							//	ALabst :parseInt(sTotalLabst),
							Material: Matnr,
							ShortText: Description,
							Plant: Werks,
							Color: "",

							OsalesOrder: sOpenSalesOrder

						});

					}

					//	}

					var oModel3 = oView.getModel("oEX");
					oModel3.setData(ListofSrs);

					for (var s = 0; s < oModel3.oData.length; s++) {
						var col = oModel3.oData[s].Color;
						if (col === 'blue') {

							Excesss.push(oModel3.oData[s]);

						}

					}
					//set the odata to model 
					oView.getModel("oExcessDataModel").setData(Excesss);

				},
				error: function(oError) {
					//error handler code
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});

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

		OnNaveBack: function() {

			//navigate back to the stock table

			this.getOwnerComponent().getRouter().navTo("StockTable");
		},

		onExcessSelectionItem: function() {
			var oPurchaseItemTable = this.byId("excesstable");
			var aSelectedIndex = oPurchaseItemTable._aSelectedPaths;
			var oExcessModel = this.getOwnerComponent().getModel("oExcessDataModel");
			var Excess = [];

			for (var i = 0; i < aSelectedIndex.length; i++) {

				var odata = aSelectedIndex[i];
				var excess = oExcessModel.getProperty(odata);
				Excess.push(excess);
				Excess[i].ItmNumber = this.LeadingZeros(i + 1, 6);
			}
			var SalesOrder = this.getOwnerComponent().getModel("SOModel");
			var sSoItem = SalesOrder.setProperty("/SOItem", Excess);

			var tableItems = this.byId("excesstable");
			sPathThreshold = tableItems.getSelectedContextPaths();

		},

		onDiscountMaterial: function() {
			var table = this.byId("excesstable");
			// validation to select one material only
			if (table.getSelectedItems().length > 1) {
				MessageBox.error("Please Select only one Material for Discount");
				table.removeSelections();
				//material must be selected 
			} else if (table.getSelectedItems() === [] || table.getSelectedItem() === null) {

				MessageBox.error("Please Select Material for Discount");

			} else {

				var oExcessmodelInfo = this.getOwnerComponent().getModel("oExcessDataModel");

				var oSelectedRecord = oExcessmodelInfo.getProperty(sPathThreshold[0]);
				oSelectedRecord.DiscAmt = "";
				oSelectedRecord.DistriChnl = "";
				oSelectedRecord.SalesOrg1 = "";
				oSelectedRecord.ValidFrom = "";
				oSelectedRecord.ValidTo = "";
			

				sap.ui.getCore().getModel("SingleExcessData").setData(oSelectedRecord);
				//open fragment
				this.pressDialogExcessDiscount = oView.byId("idExcessDiscountDialog");
				if (!this.pressDialogExcessDiscount) {
					this.pressDialogExcessDiscount = sap.ui.xmlfragment("com.vSimpleApp.fragment.Stock.DiscountMaterial", this);
					this.pressDialogExcessDiscount.open();
				}
			}

		},
		onSaveDiscount: function() {
			//get all data from odata model
			var oModelService = this.getOwnerComponent().getModel("StockModel");

			var oPostData = sap.ui.getCore().getModel("SingleExcessData").oData;

			var matnr = oPostData.Material;
			var Amt = oPostData.DiscAmt;
			var ValidTo = oPostData.ValidTo;

			var ValidFrom = oPostData.ValidFrom;

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

			var Date1 = new Date(ValidFrom);
			Date1 = Date1.setDate(Date1.getDate() + 1);

			var Date2 = new Date(ValidTo);
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

					var oModel = sap.ui.getCore().getModel("SingleExcessData");
					var oModel2 = sap.ui.getCore().getModel("oExcessDataModel");

					oModel.setData({
						oData: {}
					});

				},
				error: function(oError) {
					//error handler code
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
					BusyIndicator.hide();
				},
				merge: false
			};
			var relPath = "/CreateDiscountConditionSet";
			BusyIndicator.show(true);
			oModelService.create(relPath, oEntry, mParameters);

			this.pressDialogExcessDiscount.close();
			this.pressDialogExcessDiscount.destroy();

			var table = this.byId("excesstable");
			//remove selected materials
			table.removeSelections();
		},
		onCancelDiscount: function() {
			var table = this.byId("excesstable");
			var oModel = sap.ui.getCore().getModel("SingleExcessData");
			//clear model data
			oModel.setData({
				oData: {}
			});
			//remove selected materials
			table.removeSelections();
			this.pressDialogExcessDiscount.close();
			this.pressDialogExcessDiscount.destroy();
		},
		onDescardMaterial: function() {
			//open fargment
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
			//dowanload excess table data
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
				property: 'Material',
				type: EdmType.String

			});
			aCols.push({
				label: 'Material Description',
				property: 'ShortText',
				type: EdmType.String

			});
			aCols.push({
				label: 'Plant',
				type: EdmType.String,
				property: 'Plant',
				scale: 0
			});
			aCols.push({
				label: 'Availble Quantity',
				property: 'ALabst',
				type: EdmType.String
			});
			aCols.push({
				label: 'Created Date',
				property: 'Changedon',
				type: EdmType.Date
			});

			return aCols;
		},

		getCustomer: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("StockModel");
			BusyIndicator.show(true);
			//get entity set
			oModel.read("/getCustomerSet", {
				success: function(oData) {
					BusyIndicator.hide();
					sCustomer = oData.results;
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/CustomerDetails", oData.results);
					oLookupModel.refresh(true);

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
					//error handler code
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		getSalesOrg: function() {
			var that = this;
			//get all data from odata model
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
				//set data tp the model
				sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/SalesOrg", sTitle);
				sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/DistrChan", sDescription);
				sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/Division", div);

			}
			evt.getSource().getBinding("items").filter([]);
		},

		getdocumenttypeSet: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("StockModel");
			BusyIndicator.show(true);
			//get entity set
			oModel.read("/getdocumenttypeSet", {
				success: function(oData) {
					BusyIndicator.hide();
					sCustomer = oData.results;
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/documentType", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					//error handler code
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		handleDoctypevalue: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			sap.ui.getCore().inputIddoct = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpdoctype) {
				this._valueHelpdoctype = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.DoctType",
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
				var productInput = sap.ui.getCore().byId(sap.ui.getCore().inputIddoct),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				var div = oSelectedItem.getDescription();

				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);
		},

		onProcessOrder: function(event) {
			var table = this.byId("excesstable");
			//validation to select material
			if (table.getSelectedItems() === [] || table.getSelectedItem() === null) {

				MessageBox.error("Please Select Material To Process Order");

			} else {

				var SalesOrder = this.getOwnerComponent().getModel("SOModel");
				var odata = SalesOrder.oData.SOItem;
				for (var i = 0; i < odata.length; i++) {
					odata[i].TargetQty = "";
				}
			
				var SO = sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/OrderItemsInSet", odata);

				this.UpdateSale = this.getView().byId("helloDialog");
				if (!this.UpdateSale) {
					//open fragment 
					this.UpdateSale = sap.ui.xmlfragment("com.vSimpleApp.fragment.Stock.SOCreation", this);

					this.UpdateSale.open();
				}
			}
		},
		onCloseDialog: function() {
			//close fragment 
			this.UpdateCard.close();
			this.UpdateCard.destroy();

		},
		callMatnr: function(Matnr) {

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

			return Matnr;
		},
		callKunner: function(Kunnr) {

			var zero = "";

			if ($.isNumeric((Kunnr)) === true) {
				var len = Kunnr.length;
				if (len !== undefined) {
					var z = 10 - len;
					for (var i = 0; i < z; i++) {
						zero += "0";
					}
				}

				Kunnr = zero + Kunnr;

			}

			return Kunnr;
		},

		LeadingZeros: function(num, size) {
			var s = num + "0" + "";
			while (s.length < size) s = "0" + s;
			return s;
		},
		onSaveSalesorder2: function() {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			var SalesOrder = sap.ui.getCore().getModel("oSalesModel");

			var odata = SalesOrder.oData;
			var Vtweg = odata.DistributionChannel;
			var Spart = odata.Division;
			var Vkorg = odata.SalesOrg;
			var Kunnr = this.callKunner(odata.SoldToParty);
			var Auart = odata.DocType;

			var sSoItem = SalesOrder.getProperty("/SOItem");
			var SOItem = [];
			var itemPO = SalesOrder.oData.SOItem.length;
			for (var iRowIndex = 0; iRowIndex < itemPO; iRowIndex++) {
				var Vbeln = "";
				var ItmNumber = this.LeadingZeros(iRowIndex + 1, 6);
				var Zmeng = sSoItem[iRowIndex].Quantity;
				var Zieme = sSoItem[iRowIndex].OrderprUn;
				var Material = this.callMatnr(sSoItem[iRowIndex].Matnr);
				var Plant = sSoItem[iRowIndex].Werks;
				var Qty = sSoItem[iRowIndex].Quantity;
				var Kunnr1 = Kunnr;

				SOItem.push({
					SoldToParty: "",
					ShipToParty: "",
					ztest: "1",
					Salesdocument: Vbeln,
					PartnRole: "AG",
					PartnNumb: Kunnr1,
					Plant: Plant,
					TargetQty: Qty,
					CustMat22: "",
					PriceDate: "",
					StoreLoc: "",
					Testrun: "",
					Pmnttrms: "",
					Material: Material,
					ItmNumber: ItmNumber

				});

			}
			//create payload to pass the data to te backend
			var Payload = {
				Vbeln: "",
				Auart: Auart,
				Vkorg: Vkorg,
				Vtweg: Vtweg,
				Spart: Spart,
				Kunnr: Kunnr,
				Parvw: "AG",
				sitem_To_header: SOItem
			};

			var mParameters = {
				success: function(oResponse, object) {
					var so = object.data.Vbeln;
					MessageBox.show("Standard Order " + so + " has been Created Sucessfully..");
					sap.ui.getCore().byId("histroyDialog").destroy(null);
					sap.ui.getCore().byId("histroyDialog").close();
					this.getOwnerComponent().getRouter().navTo("StockTable");
				},
				error: function(error) {

					console.log(error);
				},
				merge: false
			};
			var relPath = "/SOHeaderSet";

			oModel.create(relPath, Payload, mParameters);

		},

		onBackNav: function() {
			var StockTransferModel = this.getView().getModel("SOModel");
			var sItem = StockTransferModel.SOItem;
			//clear the model data
			StockTransferModel.setData({
				oData: {}
			});

			StockTransferModel.refresh(true);

			this.getOwnerComponent().getRouter().navTo("StockTable");

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
		
			
					Service.getSalesOrgforCondition(this);
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
					//error handler code
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
		onRefreshTable: function() {
            //clear the selected material
			var table = this.byId("excesstable");
			table.removeSelections();
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
			} else if (idSaleorg.getValue() == "") {
				idSaleorg.setValueState("Error");
				idSaleorg.setValueStateText("Sales Organization is required");
			} else {
				var oModel = this.getOwnerComponent().getModel("PurchaseSet");
				var oSalesModel = sap.ui.getCore().getModel("SOSalesModel");
				var SOSalesModel = oSalesModel.getProperty("/SalesContract");
				var Stock = new StockStandards(SOSalesModel);
				var getRequestPayload = Stock.getRequestPayload();
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
		onCancelSales: function() {
			var SO = sap.ui.getCore().getModel("SOSalesModel");
			var SOContract = SO.getProperty("/SalesContract");

			SOContract.OrderItemsInSet = [];
			SOContract.OrderItemsInSet.length = 0;
			SOContract.OrderConditionsInSet.length = 0;
			SOContract.OrderSchedulesInSet = [];
			var SalesOrder = this.getOwnerComponent().getModel("SOModel");
			SalesOrder.oData.SOItem.length = 0;
			SalesOrder.oData.SOItem = [];

			SalesOrder.refresh(true);

			var table = this.byId("excesstable");
			table.removeSelections();
			this.UpdateSale.close();
			this.UpdateSale.destroy();
		},
		_getSimulateData: function(oEvent) {
			var ConditionItem = [],
				ScheduleItem = [];
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

					var Podata = new StockStandards(oResponse);
					sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract", oResponse);

					sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/OrderItemsInSet", Podata.OrderItemsInSet.results);
					sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/OrderConditionsInSet", Podata.OrderConditionsInSet.results);
					sap.ui.getCore().getModel("SOSalesModel").setProperty("/SalesContract/OrderSchedulesInSet", Podata.OrderSchedulesInSet.results);
					sap.ui.getCore().getModel("SOitemDetailModel").setProperty("/Soitems", Podata.OrderItemsInSet.results[0]);
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

	});

});