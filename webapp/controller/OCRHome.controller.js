sap.ui.define([
	"com/vSimpleApp/controller/BaseController",
	'../Formatter',
	'sap/ui/model/json/JSONModel',
	'sap/viz/ui5/format/ChartFormatter',
	'sap/viz/ui5/api/env/Format',
	"sap/m/MessageBox",
	'../InitPage'
], function(BaseController, Formatter, JSONModel, ChartFormatter, Format, MessageBox, InitPageUtil) {
	"use strict";
	//global variable
	var oView, oController, oComponent;
	return BaseController.extend("com.vSimpleApp.controller.Home", {
		settingsModel: {
			dataset: {
				name: "Dataset",
				defaultSelected: 1,
				values: [{
					name: "Small",
					value: "/small.json"
				}, {
					name: "Medium",
					value: "/medium.json"
				}]
			},
			series: {
				name: "Series",
				defaultSelected: 0,
				enabled: false,
				values: [{
					name: "1 Series"
				}, {
					name: '2 Series'
				}]
			},
			dataLabel: {
				name: "Value Label",
				defaultState: false
			},
			axisTitle: {
				name: "Axis Title",
				defaultState: false,
				enabled: false
			}
		},

		onInit: function() {
			oController = this;
			oView = this.getView();
			oComponent = this.getOwnerComponent();

			// set highlight status of post data model
			var oModel = this.getOwnerComponent().getModel();
			var oData = oModel.getData();
			for (var i = 0; i < oData.PostData.length; i++) {
				var oProduct = oData.PostData[i];

				if (oProduct.status === 0) {
					oProduct.highlightStatus = "Error";
				} else if (oProduct.status === 1) {
					oProduct.highlightStatus = "Success";
				}
				if (oProduct.status === 2) {
					oProduct.highlightStatus = "Error";
				}
			}
			oModel.refresh(true);

			var scanningErrorData = oData.PostData.filter(function(data) {
				return data.status === 0;
			});

			var oScanningErrorModel = new sap.ui.model.json.JSONModel({
				PostData: scanningErrorData
			});
			this.getOwnerComponent().setModel(oScanningErrorModel, "ScanningErrorData");

			Format.numericFormatter(ChartFormatter.getInstance());
			// set explored app's demo model on this sample
			var oSettingsModel = new JSONModel(this.settingsModel);
			oSettingsModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
			this.getView().setModel(oSettingsModel);

			var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
			oVizFrame.setVizProperties({
				title: {
					visible: false
				},
				plotArea: {
					dataLabel: {
						visible: true
					}
				}
			});

			var chartDataModel = oComponent.getModel("chartData");

			var dataModel = new JSONModel({
				chart: chartDataModel.getData()
			});
			oVizFrame.setModel(dataModel);

			//analytics popover
			var oPopOver = this.getView().byId("idPopOver");
			oPopOver.connect(oVizFrame.getVizUid());
			oPopOver.setFormatString(ChartFormatter.DefaultPattern.STANDARDFLOAT);
			InitPageUtil.initPageSettings(this.getView());

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Home").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function() {
			oComponent.getNonSapErrorData(oController, ["btnScanningErrors"]);
			oComponent.getSapErrorData(oController, ["btnValidationErrors"]);
			oComponent.getMgrApprovalData(oController, ["btnDueForApproval"]);
			oComponent.getFiReviewRecords(oController, ["tblReadyToPost"]);
			oComponent.getCompletedRecords(oController);
		},

		onPost: function(oEvent) {
			try {
				var oSource = oEvent.getSource();

				var oRow = oSource.getParent();

				var oSelectedRecord = oRow.getBindingContext('FiReviewRecords').getModel().getProperty(oRow.getBindingContext('FiReviewRecords').getPath());

				oSource.setBusy(true);
				var reviewedData = JSON.parse(JSON.stringify(oSelectedRecord));

				$.ajax("/ocrspring/getTaxRate/" + reviewedData.VendorCountry + "/" + reviewedData.Companycode + "/", {
					success: function(data) {

						reviewedData.UpdOcrHdrToOcrItm = reviewedData.GetOcrHdrToOcrItm;

						for (var i = 0; i < reviewedData.UpdOcrHdrToOcrItm.results.length; i++) {

							reviewedData.UpdOcrHdrToOcrItm.results[i].FinReviewed = "X";

							delete reviewedData.UpdOcrHdrToOcrItm.results[i].__metadata;
						}

						var sPostingDate = new Date(reviewedData.Postingdate);

						var postingMonth = "";
						if (sPostingDate.getMonth() < 9) {
							postingMonth = "0" + (sPostingDate.getMonth() + 1);
						} else {
							postingMonth = (sPostingDate.getMonth() + 1).toString();
						}

						//postingDate = postingDate.getFullYear() + "-" + postingMonth + "-" + postingDate.getDate() + "T00:00:00";

						var sdocumentDate = new Date(reviewedData.Invoicedate);

						var documentMonth = "";
						if (sdocumentDate.getMonth() < 9) {
							documentMonth = "0" + (sdocumentDate.getMonth() + 1);
						} else {
							documentMonth = (sdocumentDate.getMonth() + 1).toString();
						}

						//documentDate = documentDate.getFullYear() + "-" + documentMonth + "-" + documentDate.getDate() + "T00:00:00";

						//set all data to the array
						var postData = {
							Servicecall: "FIN",
							PostingDate: sPostingDate.toJSON().split(".")[0],
							MgrComment: reviewedData.MgrComment,
							Vat: reviewedData.Vat.toString(),
							TaxCode: (data.taxCode) ? data.taxCode : "",
							DocumentDate: sdocumentDate.toJSON().split(".")[0],
							CalcTax: "X",
							UpdOcrHdrToOcrItm: reviewedData.UpdOcrHdrToOcrItm.results
						};

						var oMainServiceModel = oComponent.getModel("mainServiceModel");
						//post the data
						oMainServiceModel.create("/UpdOcrHdrs", postData, {
							success: function(postResponse) {

								var oParent = oSource.getParent().getParent();
								$("#" + oParent.getId() + "-highlight").addClass("posted");
								oSource.setBusy(false);
								$("#" + oParent.getId() + "-highlight").one(
									'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
									function(e) {
										var oFiRecordsModel = oComponent.getModel("FiReviewRecords");
										var totalFiRecords = oFiRecordsModel.getData();

										for (var j = 0; j < totalFiRecords.length; j++) {
											if (reviewedData.Uniqueid === totalFiRecords[j].Uniqueid) {
												totalFiRecords.splice(j, 1);
											}
										}
										oFiRecordsModel.refresh(true);
									});

								MessageBox.success(
									"Document no. " + postData.uniqueId + " posted successfully", {
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
		},

		onGoToScanningErrors: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(oView);
			oRouter.navTo("ScanningErrors");
		},

		onGoToValidationErrors: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(oView);
			oRouter.navTo("ValidationErrors");
		},

		onGoToReadyToPost: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(oView);
			oRouter.navTo("ReadyToPost");
		},

		onGoToDueForApproval: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(oView);
			oRouter.navTo("DueForApproval");
		}
	});
});