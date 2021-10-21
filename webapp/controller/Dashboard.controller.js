sap.ui.define([
	"com/vSimpleApp/controller/BaseController",
	'../Formatter',
	'sap/ui/model/json/JSONModel',
	'sap/viz/ui5/format/ChartFormatter',
	'sap/viz/ui5/api/env/Format',
	"sap/m/MessageBox",
	"com/vSimpleApp/model/Report",
	"com/vSimpleApp/service/documentServices",
	"com/vSimpleApp/service/utilities",
	'../InitPage'
], function (BaseController, Formatter, JSONModel, ChartFormatter, Format, MessageBox, Report, documentServices, utilities, InitPageUtil) {
	"use strict";
	var oView, oController, oComponent;
	return BaseController.extend("com.vSimpleApp.controller.Dashboard", {
		onInit: function() {
			oController = this;
			oView = this.getView();
			oComponent = this.getOwnerComponent();
			
			
			//set the model and properties
			var vfTopVendors = this.vfTopVendors = this.getView().byId("vfTopVendors");
            vfTopVendors.setVizProperties({
                title: {
                    text: "Top 5 Vendors by Value"
                },
                plotArea: {
                    dataLabel: {
                        visible: true
                    }
                }
            });
            
            var oPopOver = this.getView().byId("idPopOver");
            oPopOver.connect(vfTopVendors.getVizUid());
            
            InitPageUtil.initPageSettings(this.getView(), "vfTopVendors", "chartTopVendors", false);
            
            var vfTopProducts = this.vfTopProducts = this.getView().byId("vfTopProducts");
            vfTopProducts.setVizProperties({
                title: {
                    text: "Top 5 Products by Volume"
                },
                plotArea: {
                    dataLabel: {
                        visible: true
                    }
                },
                valueAxis: {
                    title: {
                        visible: false
                    }
                },
                categoryAxis: {
                    title: {
                        visible: false
                    }
                }
            });
            
            var dataModel = new JSONModel({
            	topVendors: Report.getInstance().getModel().getData().topVendors,
            	topProducts: Report.getInstance().getModel().getData().topProducts
            });
            vfTopVendors.setModel(dataModel);
            
            
            vfTopProducts.setModel(dataModel);
            
            var oPopOverBar = this.getView().byId("idPopOverBar");
            oPopOverBar.connect(vfTopVendors.getVizUid());
            //oPopOverBar.setFormatString(ChartFormatter.DefaultPattern.STANDARDFLOAT);
            
            InitPageUtil.initPageSettings(this.getView(), "vfTopProducts", "chartTopProducts", false);
            
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        	oRouter.getRoute("Dashboard").attachPatternMatched(this._onObjectMatched, this);
		},
		
		_onObjectMatched: function() {
			documentServices.getInstance().getAnalyticsReport(this, new Date().getFullYear(), [this.vfTopVendors, this.vfTopProducts]);
			oView.byId("tileSuccessfullyScanned").focus();
		},
		
		onAfterRendering: function() {
			
		},
		onMenuButtonPress: function() {
			var oComponent2 = this.getOwnerComponent();
				oComponent2.getRouter().navTo("ShowTiles");
		},
		onPost: function(oEvent) {
			try {
				var oRow = oEvent.getSource().getParent();
				var oBindingContext = oRow.getBindingContext('approvedDocuments');
				var oBindingModel = oBindingContext.getModel();
				var sPath = oBindingContext.getPath();
				
				/** @type {cassini.sim.model.Document} */
				var oSelectedRecord = oBindingModel.getProperty(sPath);
			
				var oSource = oEvent.getSource();
				oSource.setBusy(true);
				
				documentServices.getInstance().getTaxRate(oController, oSelectedRecord.vendorCountry, oSelectedRecord.companyCode,
					function(oData) {
						oSelectedRecord.tax = documentServices.getInstance().calculateTax(oSelectedRecord.netValue, oData.taxRate);
						oSelectedRecord.taxCode = (oData.taxCode) ? oData.taxCode : "";
						oBindingModel.refresh(true);
						utilities.getInstance().create(
							{	oController: oController, sModelName: "mainServiceModel", sEntity: "UpdOcrHdrs",
								oPostData: oSelectedRecord.getSAPPostData(true),           
								fnSuccess: function(postResponse) {
									oSelectedRecord.sapInvoice = postResponse.UpdOcrHdrToOcrItm.results[0].Sapinvoice;
									oBindingModel.refresh(true);
									if(oSelectedRecord.sapInvoice && oSelectedRecord.sapInvoice !== "") {
										MessageBox.success(
											"Document no. " + oSelectedRecord.sapInvoice + " posted successfully",
											{
												actions: [sap.m.MessageBox.Action.OK],
												onClose: function(sAction) {
													oBindingModel.getData().splice(sPath.split("/")[1], 1);
													oBindingModel.refresh(true);
													
													documentServices.getInstance().getPostedDocuments(this);
												}
											}
										);
									} else {
										MessageBox.error("Error while posting the document");
									}
									oSource.setBusy(false);
								},
								fnError: function (oError) {
									oSource.setBusy(false);
								}
							});
					});
				
			
			} catch (ex) {
				//console.log(ex);
			}
		},
		
		handleNav: function(oEvent) {
			//navigate to presed tile
			var oRoute = oEvent.getSource().data("route");
			this.getRouter().navTo(oRoute);
		}
	});
});