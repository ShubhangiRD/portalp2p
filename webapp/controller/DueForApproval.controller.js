sap.ui.define([
	"com/vSimpleApp/controller/BaseController",
	"sap/m/MessageBox",
	"com/vSimpleApp/service/documentServices",
	'../Formatter'
], function(BaseController, MessageBox, documentServices, Formatter) {
	"use strict";
	var oView, oController, oComponent;
	return BaseController.extend("com.vSimpleApp.controller.DueForApproval", {
		onInit: function() {
			oController = this;
			oView = this.getView();
			oComponent = this.getOwnerComponent();
		},
		onMenuButtonPress: function() {
			var oComponent2 = this.getOwnerComponent();
			oComponent2.getRouter().navTo("Dashboard");
		},
		onSelectDocument: function(oEvent) {
			try {
				//get unique id and navigate to PoPreference with parameter
				var sApprovalId = oEvent.getSource().data("uniqueId");
				this.getRouter().navTo("PoPreference", {
					approvalId: sApprovalId
				});
			} catch (ex) {
				MessageBox.error(ex);
			}
		},
		onRefresh: function(oEvent) {
			//refresh the odata
			var oTbl = oView.byId("awaitingApprovalTable");
			oTbl.setBusy(true);
			documentServices.getInstance().getAwaitingApprovalDocuments(this, function() {
				oTbl.setBusy(false);
			});
		}
	});
});