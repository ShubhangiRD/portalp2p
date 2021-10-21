sap.ui.define([
	"com/vSimpleApp/controller/BaseController",
	"sap/m/MessageBox",
	'../Formatter'
], function(BaseController, MessageBox, Formatter) {
	"use strict";
	var oView, oController, oComponent;
	return BaseController.extend("com.vSimpleApp.controller.ScanningErrorDetails", {
		onInit: function() {
			oController = this;
			oView = this.getView();
			oComponent = this.getOwnerComponent();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("ScanningErrorDetails").attachPatternMatched(this._onObjectMatched, this);
		},
		onMenuButtonPress: function() {

			var oComponent2 = this.getOwnerComponent();
			oComponent2.getRouter().navTo("Dashboard");
		},
		_onObjectMatched: function(oEvent) {
			var oNonSapErrorDataModel = oComponent.getModel("NonSapErrorData");
			var oErrors = oNonSapErrorDataModel.getData();
			var aErrorData = {};
			for (var i = 0; i < oErrors.length; i++) {
				if (oErrors[i].scanId === oEvent.getParameter("arguments").scanId) {
					aErrorData = oErrors[i];
					break;
				}
			}

			var oErrorModel = new sap.ui.model.json.JSONModel(aErrorData);
			oView.setModel(oErrorModel, "errorData");
		},

		onUpdateScanningError: function() {
			try {
				MessageBox.confirm(
					"Do you confirm the update?", {
						actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
						onClose: function(sAction) {
							if (sAction === "OK") {
								sap.ui.core.BusyIndicator.show(0);
								var oErrorModel = oView.getModel("errorData");

								var oErrorData = oErrorModel.getData();

								var dt = new Date(oErrorData.invoiceDate);

								var year = dt.getFullYear();
								var month = "";
								if (dt.getMonth() < 9) {
									month = "0" + (dt.getMonth() + 1);
								} else {
									month = (dt.getMonth() + 1).toString();
								}

								var date = "";
								if (dt.getDate() < 10) {
									date = "0" + dt.getDate();
								} else {
									date = dt.getDate().toString();
								}

								oErrorData.invoiceDate = year + "-" + month + "-" + date + "T00:00:00.000Z";

								var sCreatedTime = oErrorData.createdTime;
								var createdYear = sCreatedTime.getFullYear();
								var createdMonth = "";
								if (sCreatedTime.getMonth() < 9) {
									createdMonth = "0" + (sCreatedTime.getMonth() + 1);
								} else {
									createdMonth = (sCreatedTime.getMonth() + 1).toString();
								}
								var createdDate = "";
								if (sCreatedTime.getDate() < 10) {
									createdDate = "0" + sCreatedTime.getDate();
								} else {
									createdDate = sCreatedTime.getDate().toString();
								}

								oErrorData.createdTime = createdYear + "-" + createdMonth + "-" + createdDate + "T00:00:00.000Z";

								var updatedTime = new Date();
								var updatedYear = updatedTime.getFullYear();
								var updatedMonth = "";
								if (updatedTime.getMonth() < 9) {
									updatedMonth = "0" + (updatedTime.getMonth() + 1);
								} else {
									updatedMonth = (updatedTime.getMonth() + 1).toString();
								}

								var updatedDate = "";
								if (updatedTime.getDate() < 10) {
									updatedDate = "0" + updatedTime.getDate();
								} else {
									updatedDate = updatedTime.getDate().toString();
								}

								oErrorData.updatedTime = updatedYear + "-" + updatedMonth + "-" + updatedDate + "T00:00:00.000Z";
								oErrorData.errorMessage = "";
								oErrorData.status = "SUCCESS";
								delete oErrorData.invoiceFile;
								var postData = JSON.stringify(oErrorData);
								$.ajax({
									type: 'POST',
									headers: {
										'Content-Type': 'application/json'
									},
									url: "/ocrspring/updateInvoiceData/",
									data: postData,
									dataType: "json",
									success: function(data, response) {
										sap.ui.core.BusyIndicator.hide();
										MessageBox.success(
											"Document validated", {
												actions: [sap.m.MessageBox.Action.OK],
												onClose: function(sAction) {
													var oRouter = sap.ui.core.UIComponent.getRouterFor(oView);
													oRouter.navTo("Home");
												}
											}
										);
									},
									error: function(err, response) {
										MessageBox.error(err);
										sap.ui.core.BusyIndicator.hide();
										if (err.responseText === "SUCCESS") {
											MessageBox.success(
												"Document validated", {
													actions: [sap.m.MessageBox.Action.OK],
													onClose: function(sAction) {
														var oRouter = sap.ui.core.UIComponent.getRouterFor(oView);
														oRouter.navTo("Home");
													}
												}
											);
										}
									}
								});
							}
						}
					}
				);

			} catch (ex) {
				MessageBox.error(ex);
				sap.ui.core.BusyIndicator.hide();
			}
		}
	});
});