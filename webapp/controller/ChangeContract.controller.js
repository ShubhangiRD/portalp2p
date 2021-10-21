sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"jquery.sap.global",
	"sap/m/Popover",
	"sap/m/Button",
	"sap/m/library",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/ui/core/BusyIndicator",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"com/vSimpleApp/model/RebateConditionItem",
	"com/vSimpleApp/model/Scale",
	"com/vSimpleApp/model/Material",
	"com/vSimpleApp/model/EligibleData",
	"com/vSimpleApp/model/AccrualItem",
	"com/vSimpleApp/model/SettlementItem",
	"com/vSimpleApp/service/dateServices",
	"com/vSimpleApp/model/Formatter"
], function(Controller, jQuery, Popover, Button, library, JSONModel, History, BusyIndicator, MessageToast, MessageBox,
	RebateConditionItem, Scale, Material, EligibleData, AccrualItem, SettlementItem, dateServices, Formatter) {
	"use strict";
	var ButtonType = library.ButtonType,
		PlacementType = library.PlacementType;
	var oView;
	var sTarget;

	setInterval(function() {
		var oStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
		var oDate1 = oStore.get("id");
		if (oDate1 !== undefined || oDate1 !== "" || oDate1 !== " ") {
			$("#__xmlview6--idVendorInput-inner").val(oDate1.vname1);
			$("#__xmlview6--idDesc-inner").val(oDate1.agdesc);
		}
	}, 3000);

	//console.log(sap.ui.getCore().byId("idVendorInput").setValue("dfs"));
	return Controller.extend("com.vSimpleApp.controller.ChangeContract", {
		onInit: function() {

			//get model and model property
			var oUserModel = this.getOwnerComponent().getModel("User");
			var sUsername = oUserModel.getProperty("/Username");
			if (sUsername === "") {
				//model property is null then naviagte back to login skin
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("Login");
			}
			this.oModel = new JSONModel();
			this.oRouter = this.getOwnerComponent().getRouter();
			//get router to attach pattern
			this.oRouter.getRoute("ChangeContract").attachPatternMatched(this._onRouteMatched1, this);

		},
		_onRouteMatched1: function() {

			BusyIndicator.show(0);
			//var that = this;
			var bFlag = 0;
			setInterval(function() {
				sTarget = sap.ui.getCore().byId("__xmlview6--idVendorInput").getValue(); //sap.ui.getCore().byId("__xmlview4--idVendorInput");
				if (sTarget !== undefined && sTarget !== "" && bFlag === 0) {
					BusyIndicator.hide();
					//alert(sTarget);
					bFlag = 1;
					sap.ui.getCore().byId("__xmlview6--tabid").setSelectedKey("item");
				}
			}, 3000);
			//get the view name to set model value
			oView = this.getView();
			var sViewname = oView.sViewName;

			if (sViewname === "com.vSimpleApp.view.ChangeContract") {
				this.oModel.loadData(sap.ui.require.toUrl("com/vSimpleApp/model") + "/model.json", null, false);
				this.oModel.oData.selectedKey = "changeContract";
				this.getView().setModel(this.oModel);
			} else
			if (sViewname === "com.vSimpleApp.view.ViewContract") {
				this.oModel.loadData(sap.ui.require.toUrl("com/vSimpleApp/model") + "/model.json", null, false);
				this.oModel.oData.selectedKey = "displayContract";
				this.getView().setModel(this.oModel);
			} else
			if (sViewname === "com.vSimpleApp.view.Home") {
				this.oModel.loadData(sap.ui.require.toUrl("com/vSimpleApp/model") + "/model.json", null, false);
				this.oModel.oData.selectedKey = "createContract";
				this.getView().setModel(this.oModel);
			}
		},
		onBeforeRendering: function(odata) {

		},

		// hook gets invoked after the view is rendered  
		onAfterRendering: function(odata) {

		},
		onUserNamePress: function(oEvent) {
			//creating buttons through button objects
			var that = this;
			var oPopover = new Popover({
				showHeader: false,
				placement: PlacementType.Bottom,
				content: [
					new Button({
						text: "Feedback",
						type: ButtonType.Transparent
					}),
					new Button({
						text: "Help",
						type: ButtonType.Transparent
					}),
					new Button({
						text: "Logout",
						type: ButtonType.Transparent,
						press: function() {
							//calling function to navigate to the login page
							var oRouter = that.getOwnerComponent().getRouter();
							oRouter.navTo("Login");
						}
					})
				]
			}).addStyleClass("sapMOTAPopover sapTntToolHeaderPopover");

			oPopover.openBy(oEvent.getSource());
		},

		onItemSelect: function(oEvent) {
			var iItem = oEvent.getParameter("item");
			this.byId("pageContainer").to(this.getView().createId(iItem.getKey()));
			var oComponent = this.getOwnerComponent();
			var skey = iItem.getKey();
			//get model
			var oVendorModel = this.getOwnerComponent().getModel("Vendor");
			if (skey === "createContract") {
				//get model property to set data 
				var oTempContract = oVendorModel.getProperty("/TempContract");
				oTempContract.setData({
					modelData: {}
				});
				//navigate the page according to the condition
				oComponent.getRouter().navTo("Home");
			} else
			if (skey === "displayContract") {
				oComponent.getRouter().navTo("Dashboard");
			} else
			if (skey === "changeContract") {
				oComponent.getRouter().navTo("ChangeContract");
			} else
			if (skey === "dashboard") {
				oComponent.getRouter().navTo("Dashboard");
			}
		},

		onMenuButtonPress: function() {
			//function called to expand and unexpand the tool page
			var toolPage = this.byId("toolPage");

			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},

		onSaveWithItem: function(oEvent) {
			//get model
			var oVendorModel = this.getOwnerComponent().getModel("Vendor");
			var oLookupModel = this.getOwnerComponent().getModel("Lookup");
			//get model property
			var oTempContract = oVendorModel.getProperty("/TempContract");
			if (oTempContract.validate()) {
				var oRequestPayload = oTempContract.getRequestPayload();
				oRequestPayload.Rcont = "1";
				var oModel = this.getOwnerComponent().getModel("HeaderSet");
				BusyIndicator.show(0);
				//get entity set
				oModel.create("/HeaderSet", oRequestPayload, {
					success: function(oData) {
						BusyIndicator.hide();
						//MessageToast.show("Contract Saved Successfully");
						MessageBox.success("Contract No.: " + oData.Rcont + " created successfully");
						oTempContract.ContractNo = oData.Rcont;
						//set model property
						oLookupModel.setProperty("/IsContractItemSaved", true);
						oLookupModel.refresh(true);
						oVendorModel.refresh(true);
					},
					error: function(oError) {
						BusyIndicator.hide();
						var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
						MessageToast.show(errorMsg);
					}
				});
			}
			oVendorModel.refresh(true);
		},

		onPostAccrual: function(oEvent) {
			var that = this;
			var bFlag = 0;
		
			//get model
			var oVendorModel = this.getOwnerComponent().getModel("Vendor");
			var oLookupModel = this.getOwnerComponent().getModel("Lookup");
			//get model property
			var oTempContract = oVendorModel.getProperty("/TempContract");
			if (oTempContract.validateHeader() && oTempContract.Accrual.validate()) {
				var oRequestPayload = oTempContract.getAccrualRequestPayload();
				var dt = oRequestPayload.Aedtm;
				dt = dt.split("T");
				var dt1 = dt[0];
				var dt2 = dt[1];
				dt1 = dt1 + "-01";
				oRequestPayload.Aedtm = dt1 + "T" + dt2;
				var oModel = this.getOwnerComponent().getModel("RebatePostSet");
				BusyIndicator.show(0);
			
				//get entity set
				oModel.create("/HeaderDocSet", oRequestPayload, {
					success: function(oData) {
						BusyIndicator.hide();
						MessageBox.success("Document No.: " + oData.Rcont + " posted successfully");
						//set model property
						oLookupModel.setProperty("/IsContractAccrualSaved", true);
						oLookupModel.refresh(true);
						oVendorModel.refresh(true);
						//get id to set selected key value
						sap.ui.getCore().byId("__xmlview4--tabid").setSelectedKey("item");
					},
					error: function(oError) {
						BusyIndicator.hide();
						var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
						MessageToast.show(errorMsg);
					}
				});
				//	flag=1;
				//	}
				//}, 3000);
			}
			oVendorModel.refresh(true);
		},

		onPostSettlement: function() {
			//get model
			var oVendorModel = this.getOwnerComponent().getModel("Vendor");
			var oLookupModel = this.getOwnerComponent().getModel("Lookup");
			//get model property
			var oTempContract = oVendorModel.getProperty("/TempContract");
			if (oTempContract.validateHeader() && oTempContract.Settlement.validate()) {
				var oRequestPayload = oTempContract.getSettlementRequestPayload();
				var oModel = this.getOwnerComponent().getModel("RebatePostSet");
				BusyIndicator.show(0);
				//get entity set
				oModel.create("/HeaderDocSet", oRequestPayload, {
					success: function(oData) {
						BusyIndicator.hide();
						MessageBox.success("Document No.: " + oData.Rcont + " posted successfully");
						//set model property
						oLookupModel.setProperty("/IsContractSettlementSaved", true);
						oLookupModel.refresh(true);
						oVendorModel.refresh(true);
						//get id to set selected key value
						sap.ui.getCore().byId("__xmlview4--tabid").setSelectedKey("item");
					},
					error: function(oError) {
						BusyIndicator.hide();
						var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
						MessageToast.show(errorMsg);
					}
				});
			}
			oVendorModel.refresh(true);
		},
		onNavBack: function() {
			//function is called to navigate to the previous page
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Dashboard", true);
			}
		},
		editCode: function() {
			//function is called to naviagte to the changecontract page
			var oComponent = this.getOwnerComponent();
			oComponent.getRouter().navTo("ChangeContract");
		}
	});
});