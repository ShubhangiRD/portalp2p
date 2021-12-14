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
var Excessdata  = [];
	var SortOrder = library.SortOrder;
	var EdmType = exportLibrary.EdmType;
	
	var sCustomer = [];
	var sKunnr , sSalesorg;
	
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
	oController = this;
			oView = this.getView();
			oComponent = this.getOwnerComponent();
			
			var oSalesModel = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(oSalesModel, "oSalesModel");
			
			//set the model on view to be used by the UI controls
			this.getView().setModel(oModel);
			this.getExcess();
	this.getCustomer();
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
			var oExcessModel = this.getOwnerComponent().getModel("oExcessDataModel");
var Excess = [] ;
			//	var aPurchaseConditionItems = oPurchaseModel.getProperty("/TempContract/PoitemSet");
			for (var i = 0; i < aSelectedIndex.length; i++) {

				var odata = aSelectedIndex[i];
				var excess = oExcessModel.getProperty(odata);
				Excess.push(excess);
			}
						var SalesOrder = this.getOwnerComponent().getModel("SOModel");
							var sSoItem = SalesOrder.setProperty("/SOItem" , Excess);
			
					
					
				console.log(sSoItem);

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
		
				onProcessOrder1: function() {
		console.log(Excess);
			// var oTreetable = this.byId("excesstable");
			// var aSelectedIndex = oTreetable.getSelectedIndices();
			// var oTreeModel = this.getOwnerComponent().getModel("oStockDataModel");

			// //	var aPurchaseConditionItems = oPurchaseModel.getProperty("/TempContract/PoitemSet");
			// for (var i = 0; i < aSelectedIndex.length; i++) {

			// 	var odata = aSelectedIndex[i];
			// 	var stock = oTreeModel.getProperty('/' +odata);
			// 	Excessdata.push(stock);
					
			// var ExcessMaterial =	this.getOwnerComponent().getModel("StockTransferModel").setData(Excessdata);
			// 		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// 								oRouter.navTo('SalesCreation');
											
										
			// }
			// 	oTreetable.SelectedNode = null;
			// 	oTreetable.destroyNoData();
			// oTreetable.selected = false; 
			//  var ExcessMaterial =	this.getOwnerComponent().getModel("SOModel");
			//  var ItemData = ExcessMaterial.setProperty("/SOItem",Excess);
			//  console.log(ItemData);
			// var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			//  								oRouter.navTo('SalesCreation');
			 								
			 								
			 								
			 								
			 								
			 								
			 								
			 								
			 								
			 								
		},
		
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
		var	 productInput = sap.ui.getCore().byId(sap.ui.getCore().inputId);
					sSalesorg = oSelectedItem.getInfo();
				sKunnr = oSelectedItem.getTitle();
				productInput.setSelectedKey(sSalesorg);
				productInput.setValue(sKunnr);
		sap.ui.getCore().getModel("oSalesModel").setProperty("/SoldToParty", sKunnr);
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
				// for (var iRowIndex = 0; iRowIndex < itemPO; iRowIndex++) {

				// 		var odataset = oData.results[iRowIndex];
				// 		var Kunnr = odataset.Kunnr;
				// 		var Vkorg = odataset.Vkorg;
				// 		var Vtweg = odataset.Vtweg;
				// 		var Spart = odataset.Spart;
				// 		var Ernam = odataset.Ernam;
				// 		var Erdat = odataset.Erdat;
				// 		var Begru = odataset.Begru;
				// 		var Loevm = odataset.Loevm;
				// 		var Versg = odataset.Versg;
				// 		var Aufsd = odataset.Aufsd;
				// 		var Kalks = odataset.Kalks;
				// 		var Kdgrp = odataset.Kdgrp;
				// 		var Bzirk = odataset.Bzirk;
				// 		var Konda = odataset.Konda;
				// 		var Pltyp = odataset.Pltyp;

				// 		if (Kunnr !== "" || Kunnr !== undefined) {
				// 			for (var x = 0; x < sCustomer.length; x++) {
				// 				if (Kunnr === sCustomer[x].Kunnr) {
				// 					var sDescription = sCustomer[x].Name1;

				// 				}
				// 			}
				// 		}

				// 	ListofShipDetails.push({
				// 		  Kunnr : Kunnr,
				// 		  Name1 : sDescription,
    //     Vkorg :Vkorg,
    //     Vtweg : Vtweg,
    //     Spart : Spart,
    //     Ernam : Ernam,
    //     Erdat : Erdat,
    //     Begru : Begru,
    //     Loevm :Loevm,
    //     Versg : Versg,
    //     Aufsd : Aufsd,
    //     Kalks : Kalks,
    //     Kdgrp :Kdgrp,
    //     Bzirk : Bzirk,
    //     Konda : Konda,
    //     Pltyp : Pltyp

				// 		});
				// //	console.log(ListofShipDetails);
				// 		oLookupModel.setProperty("/shipdetails", ListofShipDetails);
				// 				 oLookupModel.refresh(true);


				// 	}
					
			
					
					
		// 			for(var itex = 0 ; itex< len ; itex++){
		// 				var iCust = sShipDetails[itex].Kunnr;
		// 				if(iCust !== "" || iCust !== "Undefined"){
		// 					for(var x = 0 ; x<sCustomer.length ; x++){
		// 						if(iCust === sCustomer[x].Kunnr){
		// 							var sName = sCustomer[x].Name1;
		// 						//	console.log(sName);
		// 				//	oView.getModel("Lookup").getProperty("/CustomerDetails" + itex + " /Name1", sName);
		// 							oLookupModel.setProperty("/shipdetails", oData.results);
		// 							oView.getModel("Lookup").setProperty("/shipdetails/" + itex + "/Name1", sName);
									
		// 							//	oView.getModel("Lookup").setProperty("/CustomerDetails/" + itex + "/Name1", sName);

		// //	console.log(oLookupModel);
										
									
		// 						}
		// 					}
							
						
		// 				}
						
							
						
						
		// 			}
					// var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					// oLookupModel.setProperty("/CustomerDetails", oData.results);
					// oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

getSalesOrg : function(){
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
	
	
		sap.ui.getCore().getModel("oSalesModel").setProperty("/SalesOrg", sTitle);
		sap.ui.getCore().getModel("oSalesModel").setProperty("/DistributionChannel", sDescription);
	sap.ui.getCore().getModel("oSalesModel").setProperty("/Division", div);


			}
			evt.getSource().getBinding("items").filter([]);
		},
		
		
		getdocumenttypeSet : function(){
					var that = this;
			var oModel = this.getOwnerComponent().getModel("StockModel");
			BusyIndicator.show(true);
			oModel.read("/getdocumenttypeSet", {
				success: function(oData) {
					BusyIndicator.hide();
					sCustomer = oData.results;
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
				
					var SalesOrder = this.getOwnerComponent().getModel("SOModel");
					var odata = SalesOrder.oData.SOItem;
					
				var SO =	sap.ui.getCore().getModel("oSalesModel").setProperty("/SOItem" , odata);
				console.log(SO);
									
			this.UpdateSale = this.getView().byId("helloDialog");
			if (!this.UpdateSale) {
				this.UpdateSale = sap.ui.xmlfragment("com.vSimpleApp.fragment.Stock.SOCreation", this);

				this.UpdateSale.open();
			}
		},
		onCloseDialog: function() {
			this.UpdateCard.close();
			this.UpdateCard.destroy();

		},
		callMatnr  : function(Matnr){
			
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
				callKunner  : function(Kunnr){
			
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
			onSaveSalesorder : function(){
				var oModel = this.getOwnerComponent().getModel("StockModel");
					var SalesOrder = sap.ui.getCore().getModel("oSalesModel");
					
					var odata = SalesOrder.oData;
				var Vtweg = odata.DistributionChannel;
				var Spart = odata.Division;
				var Vkorg = odata.SalesOrg;
				var Kunnr = this.callKunner(odata.SoldToParty);
				var Auart = odata.DocType;
				
					function LeadingZeros(num, size) {
				var s = num + "0" + "";
				while (s.length < size) s = "0" + s;
				return s;
			}
			
				var sSoItem = SalesOrder.getProperty("/SOItem"); 
				var SOItem = [] ;
					var itemPO =	 SalesOrder.oData.SOItem.length;
					for(var iRowIndex = 0; iRowIndex < itemPO; iRowIndex++){
						 var   Vbeln =  "";
						var ItmNumber = LeadingZeros(iRowIndex + 1, 6);
						var Zmeng = sSoItem[iRowIndex].Quantity;
						var Zieme = sSoItem[iRowIndex].OrderprUn;
						var Material = this.callMatnr(sSoItem[iRowIndex].Matnr);
						var Plant = sSoItem[iRowIndex].Werks;
							var Qty = sSoItem[iRowIndex].Quantity;
						var Kunnr1  = Kunnr;
								var Brgew = sSoItem[iRowIndex].Brgew;
										var Ntgew = sSoItem[iRowIndex].Ntgew;
						SOItem.push({
							Vbeln : Vbeln,
							ItmNumber : ItmNumber,
							Zmeng: Zmeng,
							Zieme: "ST",
							Material: Material,
							Plant : Plant,
							Qty: Qty,
							Kunnr : Kunnr1,
							Parvw :  "AG",
							Brgew : Brgew,
							Ntgew : Ntgew
							
						});
						
					}
			
					var Payload = {
					Vbeln : "",
				  Auart : Auart,
				  Vkorg : Vkorg,
				  Vtweg : Vtweg,
				  Spart : Spart,
					 Kunnr : Kunnr,
				  Parvw : "AG",
				  sitem_To_header : SOItem 
					};
			
					console.log(Payload);
					
					
						var mParameters = {
					success: function(oResponse, object) {
				var so = object.data.Vbeln ;
						MessageBox.show("Standard Order "+so+" has been Created Sucessfully..");
						sap.ui.getCore().byId("histroyDialog").destroy(null);
	this.getOwnerComponent().getRouter().navTo("ManageStockTable");
					},
					error: function(error) {
						//MessageBox.error(error);
						console.log(error);
					},
					merge: false
				};
				var relPath = "/SOHeaderSet";
				//	BusyIndicator.show(true);
				oModel.create(relPath, Payload, mParameters);
					
					
					// oModel.create("/SOHeaderSet", Payload, {
					// 	sucess : function(oRes, obj){
					// 		console.log(oRes);
					
					// 	},
					// 	error : function(oError){
					// 		MessageBox.show(oError);
					// 	}
					// });
					
		},
		onCancelSales : function(){
				this.UpdateSale.close();
			this.UpdateSale.destroy();
		},
				onBackNav : function(){
				var StockTransferModel = this.getView().getModel("SOModel");
				var sItem = StockTransferModel.SOItem;
				//	window.location.reload();
			StockTransferModel.setData({
				oData: {}
			});

			StockTransferModel.refresh(true);
		
			this.getOwnerComponent().getRouter().navTo("ManageStockTable");
			
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