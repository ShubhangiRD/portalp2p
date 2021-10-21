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
	var oView, oController, oComponent;
	return BaseController.extend("com.vSimpleApp.controller.PoPreference", {
		onInit: function() {
			this._pdfViewer = new PDFViewer();
			this.getView().addDependent(this._pdfViewer);
			oController = this;
			oView = this.getView();
			oComponent = this.getOwnerComponent();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("PoPreference").attachPatternMatched(this._onObjectMatched, this);
		},
		onMenuButtonPress: function() {

			var oComponent2 = this.getOwnerComponent();
			oComponent2.getRouter().navTo("Dashboard");
		},
		_onObjectMatched: function(oEvent) {
			//get all the data form rs
			sap.ui.core.BusyIndicator.show(0);
			var mgrApprovalDataModel = oComponent.getModel("awaitingApprovalDocuments");
			var approvals = mgrApprovalDataModel.getData();
			var approval = {};
			for (var i = 0; i < approvals.length; i++) {
				if (approvals[i].uniqueId === oEvent.getParameter("arguments").approvalId) {
					approval = approvals[i];
					break;
				}
			}
			approval.balanceAmount = approval.grossValue;
			approval.isValid = false;
			var approvalModel = new sap.ui.model.json.JSONModel(approval);
			oView.setModel(approvalModel, "approval");
			var filePath = approval.filePath;
			var newFilePath = filePath.substring(filePath.lastIndexOf("/") + 1);
			var postData = JSON.stringify({
				filePath: newFilePath,
				linkId: approval.documentId
			});
			documentServices.getInstance().getFile(this, postData,
				function(oData) {},
				function(oError) {
					if (oError.status === 200) {
						approvalModel.getData().file = oError.responseText;
						approvalModel.refresh(true);
						sap.ui.core.BusyIndicator.hide();
					}
				});

			$.ajax("/ocrspring/ocr/" + approval.documentId + "/", {
				success: function(data) {
					var alineItemsModel = new JSONModel();
					var aLineItems = [];
					if (data && data.length > 0) {
						for (var j = 0; j < data.length; j++) {
							var oLineItem = new LineItem(data[j]);
							aLineItems.push(oLineItem);
						}

					}
					alineItemsModel.setData(aLineItems);
					oComponent.setModel(alineItemsModel, "lineItems");
					oController._updatePOWithLineItem();
				},
				error: function(err) {
					MessageBox.error(err);
				}
			});
		},

		_updatePOWithLineItem: function(bQtyManuallyUpdated) {
			var aLineItems = oComponent.getModel("lineItems").getData();
			var oApprovalModel = this.getView().getModel("approval");
			oApprovalModel.setProperty("/isValid", true);
			var aPOItems = oApprovalModel.getProperty("/poItems");
			for (var i = 0; i < aPOItems.length; i++) {
				if (aPOItems[i].vendorMaterialDesc && aPOItems[i].vendorMaterialDesc !== "") {
					var oLineItem = aLineItems.find(function(item) {
						return item.description && aPOItems[i].vendorMaterialDesc.toUpperCase().trim() === item.description.toUpperCase().trim();
					});
					if (oLineItem) {
						if (!bQtyManuallyUpdated) {
							aPOItems[i].poItemQuantity = parseFloat(oLineItem.quantity);
						}
						aPOItems[i].lineItemPrice = parseFloat(oLineItem.unitPrice);
						aPOItems[i].lineItemQty = parseFloat(oLineItem.quantity);
						var bHighlightError = false;
						if (oController._validatePriceTolerance(aPOItems[i])) {
							//aPOItems[i].status = "Success";
							aPOItems[i].priceValueState = "None";
							aPOItems[i].priceValueStateText = "";
						} else {
							bHighlightError = true;
							//aPOItems[i].status = "Error";
							aPOItems[i].priceValueState = "Error";
							oApprovalModel.setProperty("/isValid", false);
							aPOItems[i].priceValueStateText = "Price is out of allowed tolerance limit";
						}

						if (oController._validateQtyTolerance(aPOItems[i])) {
							//aPOItems[i].status = "Success";
							aPOItems[i].qtyValueState = "None";
							aPOItems[i].qtyValueStateText = "";
						} else {
							//aPOItems[i].status = "Error";
							aPOItems[i].qtyValueState = "Error";
							oApprovalModel.setProperty("/isValid", false);
							aPOItems[i].qtyValueStateText = "Quantity is out of allowed tolerance limit";
						}

						if (bHighlightError) {
							aPOItems[i].status = "Error";
						} else {
							aPOItems[i].status = "Success";
						}
					} else {
						aPOItems[i].status = "None";
						aPOItems[i].priceValueState = "None";
						aPOItems[i].priceValueStateText = "";
						aPOItems[i].qtyValueState = "None";
						aPOItems[i].qtyValueStateText = "";
					}
				}
			}
			oController._updateBalanceAmount();
			oApprovalModel.refresh(true);
		},

		_validatePriceTolerance: function(oPOItem) {
			var sPercentPriceLowLimit = parseFloat(oPOItem.priceLowLimit);
			var sPercentPriceUpLimit = parseFloat(oPOItem.priceUpLimit);

			var fNetPrice = parseFloat(oPOItem.netPrice);

			var priceLowLimit = fNetPrice - ((fNetPrice * sPercentPriceLowLimit) / 100);
			var priceUpLimit = fNetPrice + ((fNetPrice * sPercentPriceUpLimit) / 100);

			var fLineItemPrice = parseFloat(oPOItem.lineItemPrice);

			if (fLineItemPrice < priceLowLimit || fLineItemPrice > priceUpLimit) {
				return false;
			}
			return true;
		},

		_validateQtyTolerance: function(oPOItem) {
			//var percentQtyLowLimit = parseFloat(oPOItem.qtyLowLimit);
			var percentQtyUpLimit = parseFloat(oPOItem.qtyUpLimit);

			var fQtyToDisplay;
			if (oPOItem.webre) {
				fQtyToDisplay = parseFloat(oPOItem.ekbeQuant);
			} else {
				fQtyToDisplay = parseFloat(oPOItem.qtyToDisplay);
			}

			//var qtyLowLimit = fQtyToDisplay - ((fQtyToDisplay * percentQtyLowLimit) / 100);
			var qtyUpLimit = fQtyToDisplay + ((fQtyToDisplay * percentQtyUpLimit) / 100);

			var fLineItemQty = parseFloat(oPOItem.poItemQuantity);

			if (fLineItemQty > qtyUpLimit) {
				return false;
			}
			return true;
		},

		onSelectVendorMaterial: function(oEvent) {
			var oSource = oEvent.getSource();
			var sSelectedKey = oEvent.getParameter("selectedItem").getKey();
			var oSelectedPoItemBinding = oSource.getCustomData()[0].getBindingContext("approval");
			/*var oPoItemModel = oSelectedPoItemBinding.getModel();*/
			var oApprovalModel = this.getView().getModel("approval");
			var aPOItems = oApprovalModel.getProperty("/poItems");
			var sPoItemPath = oSelectedPoItemBinding.getPath();
			var oSelectedPoItem = oApprovalModel.getProperty(sPoItemPath);
			var isValid = true;
			var mappedId = -1;
			for (var i = 0; i < aPOItems.length; i++) {
				if (aPOItems[i].id !== oSelectedPoItem.id && aPOItems[i].vendorMaterialDesc && aPOItems[i].vendorMaterialDesc.toUpperCase().trim() ===
					sSelectedKey.toUpperCase().trim()) {
					isValid = false;
					mappedId = aPOItems[i].id;
					break;
				}
			}

			if (!isValid) {
				oSource.setValueState(sap.ui.core.ValueState.Error);
				oSource.setValueStateText("Vendor Material is already mapped in Sr. No. " + mappedId);
				// oSelectedPoItem.mappingValueStateText = "";
				oSelectedPoItem.vendorMaterialDesc = "";
				oSelectedPoItem.poItemQuantity = 0;
				MessageToast.show("Vendor Material is already mapped in Sr. No. " + mappedId);
				oSource.setSelectedKey("");
			} else {
				oSource.setValueState(sap.ui.core.ValueState.None);
				var oModel = this.getOwnerComponent().getModel("lineItems");

				var oSelectedLineItem = oModel.getData().find(function(item) {
					return item.description.toUpperCase() === sSelectedKey.toUpperCase();
				});
				oSelectedPoItem.poItemQuantity = parseFloat(oSelectedLineItem.quantity);
				oSource.setValueStateText("");
				oSelectedPoItem.vendorMaterialDesc = sSelectedKey;
			}
			this._updatePOWithLineItem();
			oApprovalModel.refresh(true);

		},
		_updateBalanceAmount: function() {
			try {
				var oApprovalModel = this.getView().getModel("approval");
				var aPOItems = oApprovalModel.getProperty("/poItems");
				var tax = parseFloat(oApprovalModel.getProperty("/tax"));
				var totalDiff = 0;
				var aSelectedPOItems = oApprovalModel.getProperty("/selectedPoItems");
				aSelectedPOItems = [];
				//oApprovalModel.setProperty("/selectedPoItems", []);
				for (var i = 0; i < aPOItems.length; i++) {
					var poItemQuantity = parseFloat(aPOItems[i].poItemQuantity);
					if (!isNaN(poItemQuantity) && poItemQuantity > 0) {
						totalDiff = totalDiff + (parseFloat(aPOItems[i].poItemQuantity) * parseFloat(aPOItems[i].lineItemPrice));
						aSelectedPOItems.push(aPOItems[i]);
					}
				}
				var balanceAmount = parseFloat(oApprovalModel.getProperty("/grossValue")) - (totalDiff + tax);
				if (balanceAmount !== 0) {
					oApprovalModel.setProperty("/isValid", false);
				}
				oApprovalModel.setProperty("/balanceAmount", balanceAmount);
				oApprovalModel.setProperty("/selectedPoItems", aSelectedPOItems);
				oApprovalModel.refresh(true);

			} catch (ex) {
				MessageBox.error(ex);
			}
		},
		onViewDocument: function(oEvent) {
			var sSource = oEvent.getSource().data("file");
			var pdfWindow = window.open("", "myWindow", "width=1000, height=800");
			pdfWindow.document.write("<iframe width='100%' height='100%' src='" + sSource + "'></iframe>");
		},
		onSelectionPO: function(oEvent) {
			try {
				var oTable = oEvent.getSource();
				var sPath = oEvent.getParameter("rowContext").getPath();
				var oSelectedRecord = oEvent.getParameter("rowContext").getModel().getProperty(sPath);
				oController._updateBalanceAmount(oTable, oSelectedRecord);
			} catch (ex) {
				MessageBox.error(ex);
			}
		},
		onChangePoQuantity: function(oEvent) {
			try {
				oController._updatePOWithLineItem(true);

			} catch (ex) {
				MessageBox.error(ex);
			}
		},

		getResponseDate: function(date) {
			var month = date.getMonth();
			if (month < 9)
				month = "0" + (date.getMonth() + 1);

			return date.getFullYear() + "-" + month + "-" + date.getDate() + "T00:00:00";
		},

		onApprove: function(oEvent) {
			try {
				MessageBox.confirm(
					"Do you approve the invoice posting?", {
						actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
						onClose: function(sAction) {
							if (sAction === "OK") {
								sap.ui.core.BusyIndicator.show(0);

								var postData = oView.getModel("approval").getData().getSAPPostData(false);

								var mainServiceModel = oComponent.getModel("mainServiceModel");
								mainServiceModel.create("/UpdOcrHdrs", postData, {
									success: function(oData) {
										sap.ui.core.BusyIndicator.hide();
										MessageBox.success(
											"The document is approved for posting", {
												actions: [sap.m.MessageBox.Action.OK],
												onClose: function(sAction) {
													documentServices.getInstance().getAwaitingApprovalDocuments(oController);
													documentServices.getInstance().getApprovedDocuments(oController);
													oController.getRouter().navTo("Dashboard");
												}
											}
										);
									},
									error: function(oError) {
										sap.ui.core.BusyIndicator.hide();
										MessageBox.error(oError);
									}
								});
							} else {
								sap.ui.core.BusyIndicator.hide();
							}
						}
					});
			} catch (ex) {
				sap.ui.core.BusyIndicator.hide();
				MessageBox.error(ex);
			}
		},

		onReject: function(oEvent) {
			try {
				MessageBox.confirm(
					"Do you reject the invoice posting?", {
						actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
						onClose: function(sAction) {
							if (sAction === "OK") {
								sap.ui.core.BusyIndicator.show(0);

								var approval = oView.getModel("approval").getData();

								var postData = {
									Servicecall: "MRJ",
									MgrComment: approval.mgrComment,
									UpdOcrRejHdrToItm: [{
										Uniqueid: approval.uniqueId,
										Message: ""
									}]
								};
								var mainServiceModel = oComponent.getModel("mainServiceModel");
								mainServiceModel.create("/UpdOcrRejHdrs", postData, {
									success: function() {
										sap.ui.core.BusyIndicator.hide();
										MessageBox.success(
											"The document is rejected successfully", {
												actions: [sap.m.MessageBox.Action.OK],
												onClose: function() {
													documentServices.getInstance().getAwaitingApprovalDocuments(oController);
													documentServices.getInstance().getRejectedDocuments(oController);
													documentServices.getInstance().getApprovedDocuments(oController);
													oController.getRouter().navTo("Dashboard");
												}
											}
										);
									},
									error: function(oError) {
										sap.ui.core.BusyIndicator.hide();
										MessageBox.error(oError);
									}
								});
							} else {
								sap.ui.core.BusyIndicator.hide();
							}
						}
					});
			} catch (ex) {
				sap.ui.core.BusyIndicator.hide();
				MessageBox.error(ex);
			}
		}
	});
});