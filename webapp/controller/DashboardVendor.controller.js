sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/Device',
	"jquery.sap.global",
	"sap/m/Popover",
	"sap/m/Button",
	"sap/m/library",
	"sap/ui/model/json/JSONModel",
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
], function(Controller, Device, jQuery, Popover, Button, library, JSONModel, BusyIndicator, MessageToast, MessageBox, RebateConditionItem,
	Scale, Material, EligibleData, AccrualItem, SettlementItem, dateServices, Formatter) {
	"use strict";
	var oView, oController, oComponent;

	return Controller.extend("com.vSimpleApp.controller.DashboardVendor", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.cassini.Rebate.view.Dashboard
		 */
		onInit: function(evt) {

			oController = this;
			oView = this.getView();
			oComponent = this.getOwnerComponent();
			this.oSF = oView.byId("searchField");
			//get the rooth path of application
			var sRootPath = jQuery.sap.getModulePath("com.vSimpleApp");

			//creating the complete path by joining slash
			var oModel = new JSONModel([sRootPath, "data/TileHeader.json"].join("/"));
			this.getView().setModel(oModel, "LandingPageModel");

		},
		onMenuButtonPress: function() {
			//calling the function to navigate back to the dashboard

			var oComponent2 = this.getOwnerComponent();
			oComponent2.getRouter().navTo("ShowTiles");
		},
		pressGenericTile: function(evt) {
			//navigate the property is selected subheader.
			console.log(evt.getSource().getProperty("header"));

			if (evt.getSource().getProperty("header") === "CONTRACT MANAGEMENT") {
				oComponent = this.getOwnerComponent();

				//navigating to the another page according to conditions
				oComponent.getRouter().navTo("Home");
			} else if (evt.getSource().getProperty("header") === "POST ACCRUALS") {
				oComponent.getRouter().navTo("MassAccrualPost");
			} else if (evt.getSource().getProperty("header") === "UPLOAD CONTRACTS") {
				oComponent.getRouter().navTo("MassUpload");
			} else if (evt.getSource().getProperty("subheader") === "Product Hierarchy Set") {
				oComponent.getRouter().navTo("CollectionGroupList");
			} else if (evt.getSource().getProperty("subheader") === "Post") {
				oComponent.getRouter().navTo("massProcessAccrual");
			}

		},
		suggestionItemSelected: function(data) {

			//get the selected value inside parameter
			var oItem = data.getParameter("selectedItem");
			var x = oItem.mProperties.text;
			var y = x.split("|");
			var z1 = y[0];
			var z2 = y[1];
			z1 = z1.split("-");
			z1 = z1[1];
			z1 = z1.replace(" ", "");

			//get model and model property
			var oVendorModel = this.getOwnerComponent().getModel("Vendor");
			var oTempContract = oVendorModel.getProperty("/TempContract");

			oTempContract.ContractNo = z1;
			var that = this;

			//get model 
			var oLookupModel = that.getOwnerComponent().getModel("Lookup");
			//get model property
			var aRebateContionItems = oVendorModel.getProperty("/TempContract/RebateConditionItems");
			var aScaleArr = [];
			var hdetails = [];
			var idetails = [];
			var aDetails = [];
			var tModel = this.getOwnerComponent().getModel("ViewAllAg");
			var sVendorNumber;
			var sDesc;

			function myf(cn) {
				//get entity set
				tModel.read("/AGRItemScalesSet", {
					//	filters: aFilter,
					success: function(data1) {

						var res1 = data.results;
						for (var i = 0; i < res1.length; i++) {
							if (res1[i].Rcont === cn) {
								aDetails.push(res1[i]);
							}

						}
						for (var j = 0; j < aDetails.length; j++) {
							aScaleArr.push(new Scale({
								ScaleNo: (j + 1).toString(),
								Value: aDetails[j].Spend,
								ValueState: "None",
								RebatePercent: aDetails[j].Rate,
								RebatePercentState: "None",
								RebateType: aDetails[j].Rtype
							}));
						}
					}
				});
				//get entity set
				tModel.read("/AGRHeaderSet", {
					//	filters: aFilter,
					success: function(data2) {

						var oRes = data.results;
						for (var i = 0; i < oRes.length; i++) {
							if (oRes[i].Rcont === cn) {
								hdetails.push(oRes[i]);
								sVendorNumber = oRes[i].Vendorno;
								sDesc = oRes[i].Description;
							}

						}
						var oModel = that.getOwnerComponent().getModel();
						var oStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);

						//get entity set
						oModel.read("/ZVendorDetSet('" + sVendorNumber + "')", {
							success: function(oData) {

								oTempContract.VendorName = oData.Vendorname;
								oStore.put("id", {
									vname1: oData.Vendorname,
									agdesc: sDesc
								});
								oTempContract.VendorNo = oData.Vendorno;
								oTempContract.Description = sDesc;
								oTempContract.PurchaseOrg = oData.Purorg;
								oTempContract.CompanyCode = oData.Compcode;
								oTempContract.Currency = oData.Currency;
								oVendorModel.refresh(true);
							},
							error: function(oError) {
								BusyIndicator.hide();
								var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
								MessageToast.show(sErrorMsg);
							}
						});
					}
				});
				//get entity set
				tModel.read("/AGRItemSet", {
					//	filters: aFilter,
					success: function(data3) {
						var bFlag;
						var oRes = data.results;
						for (var i = 0; i < oRes.length; i++) {
							if (oRes[i].Rcont === cn) {
								idetails.push(oRes[i]);
							}

						}
						for (var i = 0; i < idetails.length; i++) {
							if (idetails[i].Scale === "X") {
								bFlag = true;

							} else {
								bFlag = false;
							}
							aRebateContionItems.push(new RebateConditionItem({
								ItemNo: idetails[i].Item,
								RebateType: idetails[i].Rtype,
								IsScaleSelected: bFlag,
								Scales: aScaleArr,
								Rate: idetails[i].Rate,
								Base: idetails[i].Base

							}));
						}
						oVendorModel.refresh(true);
					}
				});

			}
			setTimeout(function() {

				var sContractNo = oTempContract.ContractNo;

				if (sContractNo === undefined || sContractNo === "") {
				  	x = x.mProperties.title;
					var x1 = x.split(":");
					var x2 = x1[1];

					if (x2 !== undefined || x2 !== "" || x2 !== " ") {
						x = x2.replace(" ", "");
						sContractNo = x;
					}

				}

				sContractNo = sContractNo.replace(" ", "");

				if (sContractNo !== undefined || sContractNo !== "") {
					//set property on model
					oLookupModel.setProperty("/IsContractItemSaved", true);
					oLookupModel.refresh(true);
					oVendorModel.refresh(true);
					myf(sContractNo);
				}

			}, 5000);
			oVendorModel.refresh(true);
			oComponent = this.getOwnerComponent();
			//naviage to viewContract page
			oComponent.getRouter().navTo("ViewContract");
			z2 = z2.split("-");
			z2 = z2[1];

		},
		handleValueHelp: function(evt) {

				var oModel1 = this.getOwnerComponent().getModel("ViewAllAg");
				//get entity set
				oModel1.read("/AGRHeaderSet", {
					success: function(oData) {

					},

					error: function(oError) {
						//console.log("error");
					}

				});
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf com.cassini.Rebate.view.Dashboard
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.cassini.Rebate.view.Dashboard
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.cassini.Rebate.view.Dashboard
		 */
		//	onExit: function() {
		//
		//	}

	});

});