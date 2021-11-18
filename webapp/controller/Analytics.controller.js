sap.ui.define([
	"sap/ui/core/mvc/Controller",
		"sap/ui/model/Filter",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/Fragment",

	"sap/m/MessageToast",

	"sap/ui/core/routing/History",
	"sap/ui/core/BusyIndicator"
], function(Controller,Filter, JSONModel, MessageBox, FilterOperator, Fragment, MessageToast,
	History,
	BusyIndicator) {
	"use strict";
	var oView, oComponent;
	return Controller.extend("com.vSimpleApp.controller.Analytics", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.vSimpleApp.view.Analytics
		 */
			onInit: function() {
			oView = this.getView();
			oComponent = this.getOwnerComponent();
			var oModel = this.getOwnerComponent().getModel("VHeader");

			//set the model on view to be used by the UI controls
			this.getView().setModel(oModel);
			var oData = new JSONModel();
			oView.setModel(oData, "oVendorModel");
				var oAdvanceAnalytics = new JSONModel();
			oView.setModel(oAdvanceAnalytics, "oAdvanceAnalytics");
			
			
			},
			
		handleVendorValueHelpBox: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdVendor = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogDisplayV) {
				this._valueHelpDialogDisplayV = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.Display",
					this
				);
				this.getView().addDependent(this._valueHelpDialogDisplayV);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}
			// create a filter for the binding
			this._valueHelpDialogDisplayV.getBinding("items").filter(new Filter([new Filter(
				"Name1",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogDisplayV.open(sInputValue);
			this.getVendorList();
		},

		_handleValueVendorHelpSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Name1",
				FilterOperator.Contains, sValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},

		_handleValueVendorHelpClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			var oModel = oView.getModel("Lookup");
			var oModelV = this.getOwnerComponent().getModel("VHeader");

			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputIdVendor),
					sDescription = oSelectedItem.getInfo();

				sProductInput.setSelectedKey(sDescription);
				sProductInput.setValue(sDescription);


			}
			evt.getSource().getBinding("items").filter([]);

		},
		
			onChartTypeChanged: function(oEvent) {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			var oDataModel = oView.getModel("oVendorModel");
			var oselect = 	oEvent.oSource.mProperties.selectedKey;

			var Vendor = oDataModel.oData.Vendor;
		//	var Matnr  = "50065579";
			console.log(oDataModel);

			var zero = "";

			if ($.isNumeric((Vendor)) === true) {
				var len = Vendor.length;
				if (len !== undefined) {
					var z = 18 - len;
					for (var i = 0; i < z; i++) {
						zero += "0";
					}
				}

				Vendor = zero + Vendor;
			}
			
			
			if(oselect === "Delivery Pattern" ){
					this.getVendordetail(Vendor);
			}else if(oselect === "Monitoring Quality"){
					this.getVendordetail(Vendor);
			}else if(oselect === "Rejection"){
					this.getVendordetail(Vendor);
			}else if(oselect === "Retun"){
					this.getVendordetail(Vendor);
			}
			
			
			

		
			//	var sVendorCreate = "/StockvsSales2Set?$filter=(Erdat eq datetime'2021-03-17T12:04:39' and Erdat2 eq datetime'2021-11-11T13:19:55' and Matnr eq '000000000050065555' )";
			//	BusyIndicator.show(true);

		},
		getVendordetail : function(Vendor){
					var oFilter3 = new sap.ui.model.Filter('Lifnr', sap.ui.model.FilterOperator.EQ, Vendor);
		
				var oModel = this.getOwnerComponent().getModel("StockModel");
		
				oModel.read("/advanceAnalytics_vendorSet?$filter=(Lifnr eq'" + oFilter3 + "' )", {
				filters: [oFilter3],

				success: function(oData) {
					//	console.log(succ);
					oView.getModel("oAdvanceAnalytics").setData(oData.results);
					

				},
				error: function(err) {
					console.log(err);
				}

			});
		}
		

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.vSimpleApp.view.Analytics
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.vSimpleApp.view.Analytics
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.vSimpleApp.view.Analytics
		 */
		//	onExit: function() {
		//
		//	}

	});

});