sap.ui.define([
	"com/vSimpleApp/controller/BaseController",
	"sap/m/MessageBox",
	"com/vSimpleApp/service/documentServices",
	"sap/ui/core/routing/History"
], function(BaseController,MessageBox,documentServices,History) {
	"use strict";

	return BaseController.extend("com.vSimpleApp.controller.App", {

			onInit: function() {
			documentServices.getInstance().getSuccesfullyScannedDocuments(this);
			documentServices.getInstance().getManualVerificationDocuments(this);
			documentServices.getInstance().getValidationErrorDocuments(this);
			documentServices.getInstance().getAwaitingApprovalDocuments(this);
			documentServices.getInstance().getApprovedDocuments(this);
			documentServices.getInstance().getPostedDocuments(this);
			documentServices.getInstance().getRejectedDocuments(this);
		},
		
		calculateSuccessRate: function() {
			
		},
		
		onChangeLanguage: function(oEvent) {
			try {
				if(oEvent.getParameter("state")) {
					sap.ui.getCore().getConfiguration().setLanguage("en");
				} else {
					sap.ui.getCore().getConfiguration().setLanguage("de");
				}
			} catch (ex) {
				MessageBox.error(ex);
			}
		},
		
		goHome: function(oEvent) {
			this.getRouter().navTo("Dashboard");
		},
			onMenuButtonPress: function(oEvent) {
				//	this.getOwnerComponent().getRouter().navTo("ShowTiles");
				
				var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			if(sPreviousHash == undefined){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("LoginPage", true);
				}
			else if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("ShowTiles", true);
			}
		}
		
		


	});
});