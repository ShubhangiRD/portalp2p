sap.ui.define([
	"com/vSimpleApp/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/m/PDFViewer",
	"com/vSimpleApp/service/documentServices",
	"com/vSimpleApp/model/LineItem",
	"sap/m/MessageToast",
	"../Formatter"
], function(BaseController, JSONModel, MessageBox, PDFViewer, documentServices, LineItem, MessageToast, Formatter) {
	"use strict";
	var oView, oComponent;
	return BaseController.extend("com.vSimpleApp.controller.DocumentsRejectedDetails", {
		onInit: function() {
			this._pdfViewer = new PDFViewer();
			this.getView().addDependent(this._pdfViewer);
			oView = this.getView();
			oComponent = this.getOwnerComponent();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("DocumentsRejectedDetails").attachPatternMatched(this._onObjectMatched, this);
		},
		onMenuButtonPress: function() {
			var oComponent2 = this.getOwnerComponent();
			oComponent2.getRouter().navTo("Dashboard");
		},
		_onObjectMatched: function(oEvent) {
			sap.ui.core.BusyIndicator.show(0);
			//get the rejectedDocuments model 
			var oRejectionDataModel = oComponent.getModel("rejectedDocuments");
			//get data from rejectedDocuments model
			var oRejections = oRejectionDataModel.getData();
			var oRejection = {};
			for (var i = 0; i < oRejections.length; i++) {
				if (oRejections[i].uniqueId === oEvent.getParameter("arguments").rejectionId) {
					oRejection = oRejections[i];
					break;
				}
			}
			//declare the odata model and set the parameter
			var oRejectionModel = new sap.ui.model.json.JSONModel(oRejection);
			oView.setModel(oRejectionModel, "rejection");

			var sfilePath = oRejection.filePath;
			var sNewFilePath = sfilePath.substring(sfilePath.lastIndexOf("/") + 1);
			var oPostData = JSON.stringify({
				filePath: sNewFilePath,
				linkId: oRejection.documentId
			});

			documentServices.getInstance().getFile(this, oPostData,
				function(oData) {},
				function(oError) {
					if (oError.status === 200) {
						oRejectionModel.getData().file = oError.responseText;
						oRejectionModel.refresh(true);
						sap.ui.core.BusyIndicator.hide();
					}
				});
		},
		onViewDocument: function(oEvent) {
			var sSource = oEvent.getSource().data("file");
			var pdfWindow = window.open("", "myWindow", "width=1000, height=800");
			pdfWindow.document.write("<iframe width='100%' height='100%' src='" + sSource + "'></iframe>");
		}
	});
});