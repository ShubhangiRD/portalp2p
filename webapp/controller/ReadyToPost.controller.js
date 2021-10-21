sap.ui.define([
	"com/vSimpleApp/controller/BaseController",
	"sap/m/MessageBox",
	"com/vSimpleApp/service/documentServices",
	'../Formatter'
], function(BaseController, MessageBox, documentServices, Formatter) {
	"use strict";
	var oView, oController, oComponent;
	return BaseController.extend("com.vSimpleApp.controller.ReadyToPost", {
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
				var sRecordId = oEvent.getSource().data("uniqueId");
				this.getRouter().navTo("ReadyToPostDetails", {
					recordId: sRecordId
				});

			} catch (ex) {
				MessageBox.error(ex);
			}
		},
		onRefresh: function(oEvent) {
			var oTbl = oView.byId("approvedTable");
			oTbl.setBusy(true);
			documentServices.getInstance().getApprovedDocuments(this, function() {
				oTbl.setBusy(false);
			});
		},

		onPost: function(oEvent) {
			try {
				var oSource = oEvent.getSource();
				var oRow = oSource.getParent();
				//var sPath = oRow.getBindingContext('FiReviewRecords').getPath();
				var selectedRecord = oRow.getBindingContext('FiReviewRecords').getModel().getProperty(oRow.getBindingContext('FiReviewRecords').getPath());

				oSource.setBusy(true);
				var reviewedData = JSON.parse(JSON.stringify(selectedRecord));

				$.ajax("/ocrspring/getTaxRate/" + reviewedData.VendorCountry + "/" + reviewedData.Companycode + "/", {
					success: function(data) {
					var tax = (parseFloat(reviewedData.Netvalue) * parseFloat(data.taxRate)) / 100;
						reviewedData.UpdOcrHdrToOcrItm = reviewedData.GetOcrHdrToOcrItm;

						for (var i = 0; i < reviewedData.UpdOcrHdrToOcrItm.results.length; i++) {
							//reviewedData.UpdOcrHdrToOcrItm.results[i].Message = "";
							reviewedData.UpdOcrHdrToOcrItm.results[i].FinReviewed = "X";
							delete reviewedData.UpdOcrHdrToOcrItm.results[i].Paymentindays;
							delete reviewedData.UpdOcrHdrToOcrItm.results[i].VendorCountry;
							delete reviewedData.UpdOcrHdrToOcrItm.results[i].__metadata;
						}

						var sPostingDate = new Date(reviewedData.Postingdate);

						var sPostingMonth = "";
						if (sPostingDate.getMonth() < 9) {
							sPostingMonth = "0" + (sPostingDate.getMonth() + 1);
						} else {
							sPostingMonth = (sPostingDate.getMonth() + 1).toString();
						}

						sPostingDate = sPostingDate.getFullYear() + "-" + sPostingMonth + "-" + sPostingDate.getDate() + "T00:00:00";

						var documentDate = new Date(reviewedData.Invoicedate);

						var documentMonth = "";
						if (documentDate.getMonth() < 9) {
							documentMonth = "0" + (documentDate.getMonth() + 1);
						} else {
							documentMonth = (documentDate.getMonth() + 1).toString();
						}

						documentDate = documentDate.getFullYear() + "-" + documentMonth + "-" + documentDate.getDate() + "T00:00:00";

						var postData = {
							Servicecall: "FIN",
							PostingDate: sPostingDate,
							MgrComment: reviewedData.MgrComment,
							Vat: reviewedData.Vat.toString(),
							TaxCode: data.taxCode,
							DocumentDate: documentDate,
							CalcTax: "X",
							UpdOcrHdrToOcrItm: reviewedData.UpdOcrHdrToOcrItm
						};

						var mainServiceModel = oComponent.getModel("mainServiceModel");
						mainServiceModel.create("/UpdOcrHdrs", postData, {
							success: function(postResponse) {

								var oParent = oSource.getParent().getParent();
								$("#" + oParent.getId() + "-highlight").addClass("posted");
								oSource.setBusy(false);
								$("#" + oParent.getId() + "-highlight").one(
									'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
									function(e) {
										var oFiRecordsModel = oComponent.getModel("FiReviewRecords");
										var totalFiRecords = oFiRecordsModel.getData();

										for (var i = 0; i < totalFiRecords.length; i++) {
											if (reviewedData.Uniqueid === totalFiRecords[i].Uniqueid) {
												totalFiRecords.splice(i, 1);
											}
										}
										oFiRecordsModel.refresh(true);
									});

								MessageBox.success(
									"Document no. " + postResponse.UpdOcrHdrToOcrItm.results[0].Sapinvoice + " posted successfully", {
										actions: [sap.m.MessageBox.Action.OK],
										onClose: function(sAction) {
											var oRouter = sap.ui.core.UIComponent.getRouterFor(oView);
											oRouter.navTo("Home");
										}
									}
								);
							},
							error: function(oError) {
								MessageBox.error(oError);
							}
						});
					},
					error: function(err) {
						MessageBox.error(err);
					}
				});
			} catch (ex) {
				MessageBox.error(ex);
			}
		}
	});
});