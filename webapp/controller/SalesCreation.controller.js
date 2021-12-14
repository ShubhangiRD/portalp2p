sap.ui.define([
	"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",

	"sap/ui/model/FilterOperator",
	'sap/ui/core/BusyIndicator',
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function(Controller,JSONModel,Filter,FilterOperator,BusyIndicator,MessageToast,MessageBox) {
	"use strict";
	var oView, oComponent,oController, sPathThreshold , PoDocumentNumber = [];
	var sCustomer = [];
	var sKunnr , sSalesorg;
	return Controller.extend("com.vSimpleApp.controller.SalesCreation", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.vSimpleApp.view.SalesCreation
		 */
		onInit: function() {
	oController = this;
			oView = this.getView();
			var oModel = this.getOwnerComponent().getModel("StockModel");
			
			
			oComponent = this.getOwnerComponent();
			//set the model on view to be used by the UI controls
			this.getView().setModel(oModel);
				this.getCustomer();
		
			
		
		//	this.getShipmentDetails();
			},
	
		/*Po Search*/
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

			this.inputIdSorg = oEvent.getSource().getId();
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
				var productInput = this.byId(this.inputIdSorg),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
					var div = oSelectedItem.getDescription();
					
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);
	
	
	oView.getModel("SOModel").setProperty("/SalesOrg", sTitle);
	oView.getModel("SOModel").setProperty("/DistributionChannel", sDescription);
oView.getModel("SOModel").setProperty("/Division", div);


			}
			evt.getSource().getBinding("items").filter([]);
		},
		
				handleCustomervalue: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
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
		var	 productInput = this.byId(this.inputId);
					sSalesorg = oSelectedItem.getInfo();
				sKunnr = oSelectedItem.getTitle();
				productInput.setSelectedKey(sSalesorg);
				productInput.setValue(sKunnr);
	oView.getModel("SOModel").setProperty("/SoldToParty", sKunnr);
	//oView.getModel("SOModel").setProperty("/ShipToParty", sTitle);

			}
			evt.getSource().getBinding("items").filter([]);
		},
		
		
		
	onSaveSalesorder : function(){
				var oModel = this.getOwnerComponent().getModel("StockModel");
					var SalesOrder = this.getOwnerComponent().getModel("SOModel");
					var sSoItem = SalesOrder.getProperty("/SOItem");
				var itemPO =	 SalesOrder.oData.SOItem.length;
					for(var iRowIndex = 0; iRowIndex < itemPO; iRowIndex++){
						var Matnr = SalesOrder.oData.SOItem[0].Matnr;
						var Werks = SalesOrder.oData.SOItem[0].Werks;
							var Quantity = SalesOrder.oData.SOItem[0].Quantity;
							var OrderprUn = SalesOrder.oData.SOItem[0].OrderprUn;	
					}
				
					var odata = SalesOrder.oData;
				var Vtweg = odata.DistributionChannel;
				var Spart = odata.Division;
				var Vkorg = odata.SalesOrg;
				var Kunnr = odata.SoldToParty;
				
					function LeadingZeros(num, size) {
				var s = num + "0" + "";
				while (s.length < size) s = "0" + s;
				return s;
			}
			//	PoItem: LeadingZeros(aPurchaseConditionItems.length + 1, 5)	
				
				var SOItem ;
					var Payload = {
					Vbeln : "",
				  Auart : "TA",
				  Vkorg : Vkorg,
				  Vtweg : Vtweg,
				  Spart : Spart,
					 Kunnr : Kunnr,
				  Parvw : "AG",
				  sitem_To_header : SOItem
					};
			
					console.log(Payload);
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
		/*PO Search end*/
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.vSimpleApp.view.SalesCreation
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.vSimpleApp.view.SalesCreation
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.vSimpleApp.view.SalesCreation
		 */
		//	onExit: function() {
		//
		//	}

	});

});