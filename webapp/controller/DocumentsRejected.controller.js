sap.ui.define([
	"com/vSimpleApp/controller/BaseController",
	"sap/m/MessageBox",
	"com/vSimpleApp/service/documentServices",
	"../Formatter"
], function(BaseController, MessageBox, documentServices, Formatter) {
	"use strict";
	var oView;
	return BaseController.extend("com.vSimpleApp.controller.DocumentsRejected", {
		onInit: function() {
			oView = this.getView();
		},
		onMenuButtonPress: function() {
			var oComponent2 = this.getOwnerComponent();
			oComponent2.getRouter().navTo("Dashboard");
		},
		onSelectDocument: function(oEvent) {
			try {
				//get unique id and navigate to DocumentsRejectedDetails with parameter
				var sRejectionId = oEvent.getSource().data("uniqueId");
				this.getRouter().navTo("DocumentsRejectedDetails", {
					rejectionId: sRejectionId
				});
			} catch (ex) {
				MessageBox.error(ex);
			}
		},
		onRefresh: function(oEvent) {
			//refresh all the table data
			var oTbl = oView.byId("rejectedDocumentsTable");
			oTbl.setBusy(true);
			documentServices.getInstance().getRejectedDocuments(this, function() {
				oTbl.setBusy(false);
			});
		}
	});
});