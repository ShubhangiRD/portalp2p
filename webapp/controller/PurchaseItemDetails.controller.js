sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",

	"sap/ui/model/FilterOperator",
	'sap/ui/core/BusyIndicator',
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"com/vSimpleApp/model/PurchaseHeader"
], function(Controller, JSONModel, Filter, FilterOperator, BusyIndicator, MessageToast, MessageBox) {
	"use strict";
	//global variable
	var oView;
	var aListofVendor = [],
		aListofCompanycode = [],
		aListofPurchaseOrg = [];
	return Controller.extend("com.vSimpleApp.controller.PurchaseItemDetails", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.vSimpleApp.view.view.PurchaseItemDetails
		 */
		onInit: function() {
			oView = this.getView();
			var oPurchaseItemDetailsModel = new JSONModel();
			oView.setModel(oPurchaseItemDetailsModel, "PurchaseItemDetailsModel");

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("PurchaseItemDetails").attachPatternMatched(this._onObjectMatched, this);

		},
		getVendorList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.hide(true);
			oModel.read("/Fetch_Vendor_DetailsSet", {
				success: function(oData) {
						BusyIndicator.hide(false);
					var iItem = oData.results.length;
					for (var iRowIndex = 0; iRowIndex <= 2600; iRowIndex++) {
						var odata = oData.results[iRowIndex];
						if (odata !== undefined) {
							var sLifnrr = odata.Lifnr;
							var sName1r = odata.Name1;
							aListofVendor.push({
								Lifnr: sLifnrr,
								Name1: sName1r
							});
						}

					}

					var Count = new sap.ui.model.json.JSONModel({
						item: iItem

					});
					oView.setModel(Count, "Count");

				
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/DisplyaVendorList", aListofVendor);
					oLookupModel.refresh(true);
					//that.getMaterialList();
				},
				error: function(oError) {
				BusyIndicator.hide(false);
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
		getPurchaseOrgList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.hide(true);
			oModel.read("/get_purchaseorg_f4helpSet", {
				success: function(oData) {

					BusyIndicator.hide(false);
					console.log(oData);
					var iPurorgitem = oData.results.length;

					for (var iRowIndex = 0; iRowIndex <= iPurorgitem; iRowIndex++) {
						var odata = oData.results[iRowIndex];
						if (odata !== undefined) {
							var sEkorg = odata.Ekorg;
							var sEkotx = odata.Ekotx;
							aListofPurchaseOrg.push({
								Ekorg: sEkorg,
								Ekotx: sEkotx
							});
						}

					}
				
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/PurchaseOrganization", aListofPurchaseOrg);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide(false);
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
		getCompanyList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.hide(true);
			oModel.read("/get_companycode_f4helpSet", {
				success: function(oData) {
	BusyIndicator.hide(false);
					var iCompitem = oData.results;

					for (var iRowIndex = 0; iRowIndex <= iCompitem; iRowIndex++) {
						var odata = oData.results[iRowIndex];
						if (odata !== undefined) {
							var sBukrs = oData.results[iRowIndex].Bukrs;
							var sButxt = oData.results[iRowIndex].Butxt;
							aListofCompanycode.push({
								Bukrs: sBukrs,
								Butxt: sButxt
							});
						}

					}
				
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/CountryCode", aListofCompanycode);
					oLookupModel.refresh(true);
					//that.getMaterialList();
				},
				error: function(oError) {
					BusyIndicator.hide(false);
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		onNavBack: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo('ShowTiles');
		},
		onRefresh: function(oEvent) {
			var otbl = oView.byId("PurchaseTable");
			otbl.setBusy(true);
			this.byId("PurchaseTable").getBinding("items").refresh();
		},
		_onObjectMatched1: function(oEvent) {

			var oModel = this.getOwnerComponent().getModel("VHeader");

			var sPath = oEvent.getParameter("arguments");
			var sPurchaseOno = sPath.PoNumber;

			//calling the function
			this.getVendorList();
			this.getCompanyList();
			this.getPurchaseOrgList();
			var oPomodel = new JSONModel({
				PurchaseO: sPurchaseOno
			});

			this.getView().setModel(oPomodel, "pomodel");

			var aFilter = [
				new sap.ui.model.Filter({
					path: "Purchaseorder",
					operator: sap.ui.model.FilterOperator.EQ,
					value1: sPurchaseOno
				})

			];
			return new Promise(function(resolve1, reject1) {
					BusyIndicator.hide(true);
				oModel.read("/PO_DetailsSet()", {
					filters: aFilter,
					success: function(odata) {
					BusyIndicator.hide(false);
						var iItem = odata.results.length;
						var aPoDetailsItems = [];
						for (var iRowIndex = 0; iRowIndex < iItem; iRowIndex++) {

							var sPoNumber = odata.results[iRowIndex].PoNumber;
							var sVendor = odata.results[iRowIndex].Vendor;
							var sMaterial = odata.results[iRowIndex].Material;
							var sShortText = odata.results[iRowIndex].ShortText;
							var sNetPrice = odata.results[iRowIndex].NetPrice;
							var sQuantity = odata.results[iRowIndex].Quantity;
							var sCreatedBy = odata.results[iRowIndex].CreatedBy;
							var sCreatDate = odata.results[iRowIndex].CreatDate;

							var sCompCode = odata.results[iRowIndex].CompCode;
							var sPurchOrg = odata.results[iRowIndex].PurchOrg;
							var sPurGroup = odata.results[iRowIndex].PurGroup;
							var sCurrency = odata.results[iRowIndex].Currency;
							var sPoItem = odata.results[iRowIndex].PoItem;
							var sPlant = odata.results[iRowIndex].Plant;

							if (sVendor !== "" || sVendor !== undefined) {
								for (var y = 0; y < aListofVendor.length; y++) {
									if (sVendor === aListofVendor[y].Lifnr) {
										var sVendorname = aListofVendor[y].Name1;

									}
								}
							}
							if (sCompCode !== "" || sCompCode !== undefined) {
								for (var z = 0; z < aListofCompanycode.length; z++) {
									if (sCompCode === aListofCompanycode[z].Bukrs) {
										var compcodename = aListofCompanycode[z].Butxt;

									}
								}
							}
							if (sPurchOrg !== "" || sPurchOrg !== undefined) {
								for (var w = 0; w < aListofPurchaseOrg.length; w++) {
									if (sPurchOrg === aListofPurchaseOrg[w].Ekorg) {
										var sPurchOrgname = aListofPurchaseOrg[w].Ekotx;

									}
								}
							}

							var Dateon = sCreatDate.getFullYear() + "/" + sCreatDate.getMonth() + "/" + sCreatDate.getDate() + " ";
							//Header model 
							var oHeaderDataModel = new JSONModel({
								Name: sVendorname,
								Number: sVendor,
								createdby: sCreatedBy,
								createddate: Dateon,
								CompCodeno: sCompCode,
								CompCodename: compcodename,
								PurchOrgno: sPurchOrg,
								PurchOrgname: sPurchOrgname
							});

							oView.setModel(oHeaderDataModel, "oHeaderDataModel");

							var oHeaderDataCodePurOrg = new JSONModel({

								CompCode: compcodename,
								PurchOrg: sPurchOrgname
							});

							oView.setModel(oHeaderDataCodePurOrg, "oHeaderDataCodePurOrg");

							aPoDetailsItems.push({
								PoNumber: sPoNumber,
								Vendor: sVendor,
								Name: sVendorname,
								Material: sMaterial,
								ShortText: sShortText,
								NetPrice: sNetPrice,
								Quantity: sQuantity,
								CreatedBy: sCreatedBy,
								CreatDate: sCreatDate,
								CompCode: sCompCode,
								PurchOrg: sPurchOrg,
								PurGroup: sPurGroup,
								Currency: sCurrency,
								PoItem: sPoItem,
								Plant: sPlant
							});

						}
					
						oView.getModel("PurchaseItemDetailsModel").setSizeLimit(aPoDetailsItems.length);
						oView.getModel("PurchaseItemDetailsModel").setData(aPoDetailsItems);
					},
					error: function(oError) {
							BusyIndicator.hide(false);
							MessageBox.error(oError);

				
					}
				});

			});
		},
			_onObjectMatched: function(oEvent) {
			//get all the details form the parameter
					var oModel = this.getOwnerComponent().getModel("VHeader");
	var oModel2 = this.getOwnerComponent().getModel("PurchaseSet");

			var sPath = oEvent.getParameter("arguments");
			var PurchaseOno = sPath.PoNo;

			//call the function
			this.getVendorList();
			this.getCompanyList();
			this.getPurchaseOrgList();

			var oPomodel = new JSONModel({
				PurchaseO: PurchaseOno
			});

			this.getView().setModel(oPomodel, "pomodel");

			return new Promise(function(resolve1, reject1) {

				BusyIndicator.show(true);
				oModel.read("/PoDisplaySet(Purchaseorder='" + PurchaseOno + "')", {
					urlParameters: {
						"$expand": "PoitemSet,PoCondSet,PoScheduleSet"
					},

					success: function(odata) {

						BusyIndicator.hide(false);

						var Podata = new PurchaseHeader(odata);
						oView.getModel("PurchaseModel").setProperty("/TempContract", Podata);

						oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet", Podata.PoitemSet.results);
						oView.getModel("PurchaseModel").setProperty("/TempContract/PoCondSet", Podata.PoCondSet.results);
						oView.getModel("PurchaseModel").setProperty("/TempContract/PoScheduleSet", Podata.PoScheduleSet.results);

						var aPurchaseConditionItems = Podata.PoitemSet;
						var iTtem = aPurchaseConditionItems.length;

						var sMatno = aPurchaseConditionItems[0].Material;

						for (var val = 0; val < iTtem; val++) {
							var Matitem = aPurchaseConditionItems[val].Material;
							//		var a = aPurchaseConditionItems.indexOf(sMaterial);
							if (sMatno.indexOf(" ") !== -1) {
								sMatno = sMatno.split(" ");
								sMatno = sMatno[0];
							}
							if (Matitem === sMatno) {
								var sMatList = new RebateConditionItemPO(aPurchaseConditionItems[val]);

								var oListModel = new JSONModel();
								oListModel.setData(sMatList);
								oView.setModel(oListModel, "PurchaseItems");

							} else {

							}

						}
						var aPoDetailsItems = [];

						var sVendor = Podata.Vendor;
						var sCreatedBy = Podata.CreatedBy;
						var sCreatDate = Podata.CreatDate;

						var sCompCode = Podata.CompCode;
						var sPurchOrg = Podata.PurchOrg;
						var sPurGroup = Podata.PurGroup;
						var sPurchaseorder = Podata.Purchaseorder;
						//get vendor name form vendor
						if (sVendor !== "" || sVendor !== undefined) {
							for (var y = 0; y < ListofVendor.length; y++) {
								if (sVendor === ListofVendor[y].Lifnr) {
									var sVendorname = ListofVendor[y].Name1;
									var Stras = ListofVendor[y].Stras;
									var Telf1 = ListofVendor[y].Telf1;
									var Pstlz = ListofVendor[y].Pstlz;
									var Land1 = ListofVendor[y].Land1;
									var Adrnr = ListofVendor[y].Adrnr;
									var Ort02 = ListofVendor[y].Ort02;
									var Regio = ListofVendor[y].Regio;

									oView.byId("idStreetHeader").setValue(Stras);
									oView.byId("Telephone1").setValue(Telf1);
									oView.byId("PostalCode").setValue(Pstlz);
									oView.byId("idCountryCodeHeader").setValue(Land1);
									oView.byId("AddressNum").setValue(Adrnr);
									oView.byId("idCityHeader").setValue(Ort02);

									oView.byId("Vendor1").setValue(sVendor);
									oView.byId("Name1").setValue(sVendorname);
									oView.byId("idStreet").setValue(Stras);
									oView.byId("idAddno").setValue(Adrnr);
									oView.byId("idCountryCode").setValue(Land1);
									oView.byId("idRegion").setValue(Regio);
									oView.byId("idPostcode").setValue(Adrnr);
									oView.byId("idCity").setValue(Ort02);
									oView.byId("idTel").setValue(Telf1);

								}
							}
						}
						//get companycode discription from comp code
						if (sCompCode !== "" || sCompCode !== undefined) {
							for (var z = 0; z < ListofCompanycode.length; z++) {
								if (sCompCode === ListofCompanycode[z].Bukrs) {
									var compcodename = ListofCompanycode[z].Butxt;

								}
							}
						}
						//get purchase org description from purchase org
						if (sPurchOrg !== "" || sPurchOrg !== undefined) {
							for (var w = 0; w < ListofPurchaseOrg.length; w++) {
								if (sPurchOrg === ListofPurchaseOrg[w].Ekorg) {
									var sPurchOrgname = ListofPurchaseOrg[w].Ekotx;

								}
							}
						}
						/*	//set the values to id
							oView.byId("vnumber").setValue(sVendor);
							oView.byId("idPurchaseOrg").setValue(sPurchOrg);
							oView.byId("cc").setValue(sCompCode);
							//		oView.byId("cu").setValue(sCurrency);
							oView.byId("pg").setValue(sPurGroup);*/

					//Header model 
						var oHeaderDataModel = new JSONModel({
							Name: sVendorname,
							Number: sVendor,
							createdby: sCreatedBy,
							createddate: sCreatDate,
							CompCodeno: sCompCode,
							CompCodename: compcodename,
							PurchOrgno: sPurchOrg,
							PurchOrgname: sPurchOrgname
						});

						oView.setModel(oHeaderDataModel, "oHeaderDataModel");

						var oHeaderDataCodePurOrg = new JSONModel({

							CompCode: compcodename,
							PurchOrg: sPurchOrgname
						});

						oView.setModel(oHeaderDataCodePurOrg, "oHeaderDataCodePurOrg");

						aPoDetailsItems.push({
							PoNumber: sPurchaseorder,
							Vendor: sVendor,
							Name: sVendorname,

							CreatedBy: sCreatedBy,
							CreatDate: sCreatDate,
							CompCode: sCompCode,
							PurchOrg: sPurchOrg,
							PurGroup: sPurGroup

						});

					},
					error: function(oError) {
						BusyIndicator.hide(false);
						MessageBox.error(oError);

					}
				});

			});

		},

		onPostItems: function() {
			var oPurchaseModel = this.getView().getModel("PurchaseItemDetailsModel");
			var aItems = oPurchaseModel.oData;
			var aItemDataHeader = [];

			for (var iRowIndex = 0; iRowIndex < aItems.length; iRowIndex++) {

				var sEbelnn = oPurchaseModel.oData[iRowIndex].PoNumber;
				var sBukrss = oPurchaseModel.oData[iRowIndex].CompCode;
				var sPurchOrg = oPurchaseModel.oData[iRowIndex].PurchOrg;
				var sLifnrr = oPurchaseModel.oData[iRowIndex].Vendor;
				var sPurGroup = oPurchaseModel.oData[iRowIndex].PurGroup;
				var sCurrency = oPurchaseModel.oData[iRowIndex].Currency;

				aItemDataHeader.push({
					Ebeln: sEbelnn,
					Bukrs: sBukrss,
					Lifnr: sLifnrr,
					Ekorg: sPurchOrg,
					Ekgrp: sPurGroup,
					Waers: sCurrency

				});
			}

			var sLifnr = aItemDataHeader[0].Lifnr;

			var zero = "";
			//	var no;

			var len = sLifnr.length;
			if (len !== undefined) {
				var z = 10 - len;
				for (var i = 0; i < z; i++) {
					zero += "0";
				}
			}

			console.log(len);
			console.log(zero);
			sLifnr = zero + sLifnr;
			console.log(sLifnr);
			var sEkorg = aItemDataHeader[0].Ekorg;
			var sEkgrp = aItemDataHeader[0].Ekgrp;
			var sWaers = aItemDataHeader[0].Waers;
			var sEbeln = aItemDataHeader[0].Ebeln;
			var sBukrs = aItemDataHeader[0].Bukrs;

			var POItem = [];

			var oModel = this.getOwnerComponent().getModel("VHeader");

			var itemData = [];

			//iterate the values of levels
			for (var iRowIndex = 0; iRowIndex < aItems.length; iRowIndex++) {

				var sPoItem = oPurchaseModel.oData[iRowIndex].PoItem;
				var sMaterial = oPurchaseModel.oData[iRowIndex].Material;
				var sQuantity = oPurchaseModel.oData[iRowIndex].Quantity;
				var sPlant = oPurchaseModel.oData[iRowIndex].Plant;

				itemData.push({
					Ebelp: sPoItem,
					Matnr: sMaterial,
					Menge: sQuantity,
					Werks: sPlant

				});

			}

			var oEntry1 = {};
			oEntry1.Ebeln = sEbeln;
			oEntry1.Bukrs = sBukrs;
			oEntry1.Bsart = "EC";
			oEntry1.Lifnr = sLifnr;
			oEntry1.Ekorg = sEkorg;
			oEntry1.Ekgrp = sEkgrp;
			oEntry1.Waers = sWaers;
			oEntry1.POItem = itemData;
			console.log(oEntry1);
			BusyIndicator.show(0);

			oModel.create("/POHeaderSet", oEntry1, {
				success: this._onUpdateProdEntrySuccess.bind(this),
				error: this._onCreateEntryError.bind(this)
			});

			oPurchaseModel.refresh(true);

		},
		_onUpdateProdEntrySuccess: function(oObject, oResponse) {
			BusyIndicator.hide(false);
			var sEbeln = oResponse.data.Ebeln;
			var oPurchaseModel = this.getView().getModel("PurchaseItemDetailsModel");
			var sDestroy = oPurchaseModel.oData.destroy;

			oPurchaseModel.refresh(true);
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.show("Standard PO updated under the number  #" + sEbeln + " ", {

				icon: sap.m.MessageBox.Icon.INFORMATION,

				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CLOSE],
				onClose: function(oAction) {
					if (oAction === "OK") {
						var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
						oRouter.navTo('ShowTiles');
					}
				}.bind(this)
			});

		},
		_onCreateEntryError: function(oError) {
			BusyIndicator.hide(false);

			MessageBox.error(
				"Error creating entry: " + oError.statusCode + " (" + oError.statusText + ")", {
					details: oError.responseText
				}
			);

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.vSimpleApp.view.view.PurchaseItemDetails
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.vSimpleApp.view.view.PurchaseItemDetails
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.vSimpleApp.view.view.PurchaseItemDetails
		 */
		//	onExit: function() {
		//
		//	}

	});

});