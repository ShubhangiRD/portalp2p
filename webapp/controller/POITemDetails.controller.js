sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/library",
	"sap/m/Input",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"com/vSimpleApp/model/RebateConditionItemPO",
	"com/vSimpleApp/model/VendorRebateCondition",
	"com/vSimpleApp/model/CreateContract",
	"com/vSimpleApp/model/GetPODetails",
	"sap/m/ColumnListItem",
	"jquery.sap.global",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	'sap/ui/core/BusyIndicator',
	"com/vSimpleApp/model/POItem",
	"com/vSimpleApp/model/PurchaseHeader",
	"com/vSimpleApp/Classes/ServiceF4"

], function(Controller, JSONModel, library, Input, Fragment, Filter, FilterOperator, RebateConditionItemPO,
	VendorRebateCondition, CreateContract, GetPODetails, ColumnListItem, jQuery, MessageToast, MessageBox, History, BusyIndicator,
	POItem, PurchaseHeader, ServiceF4) {
	"use strict";

	//global variable
	var oView, oComponent, sNetPriceId, sNetValue;
	var Ebeln, PurchaseOno, openpoList, PoNumbers;
	var ListofVendor = [],
		ListofCompanycode = [],
		ListofPurchaseOrg = [];
	var MaterialnUmberForPo;
	return Controller.extend("com.vSimpleApp.controller.POITemDetails", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.vSimpleApp.view.view.POITemDetails
		 */
		onInit: function() {
			oView = this.getView();
			var oModel = this.getOwnerComponent().getModel("VHeader");
			oComponent = this.getOwnerComponent();
			//set the model on view to be used by the UI controls
			this.getView().setModel(oModel);

			var oLookupModel = this.getOwnerComponent().getModel("Lookup");
			//model property store in variable
			openpoList = oLookupModel.oData.OpenPOList;
			ListofVendor = oLookupModel.oData.DisplyaVendorList;
			this.getOpenPOS();

			//define the json models
			var oParterDetails = new JSONModel();
			oView.setModel(oParterDetails, "ParterDetails");

			var oPurchaseItems = new JSONModel();
			oView.setModel(oPurchaseItems, "PurchaseItems");
			/*	var oListModel = new JSONModel();
					oView.setModel(oListModel, "POListModel");
			*/
			var oOpenPOModel = new JSONModel();
			oView.setModel(oOpenPOModel, "OpenPOModel");

			var oEditModel = new JSONModel({
				isEditable: false
			});

			this.getView().setModel(oEditModel, "EditModel");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("POITemDetails").attachPatternMatched(this._onObjectMatched, this);
			oView.byId("idSave").setVisible(false);
			oView.byId("idaddCondition").setVisible(false);

		},
		getOpenPOS: function() {

			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(true);

			oModel.read("/openpo_headerSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var iItemPO = oData.results.length;
					oView.getModel("OpenPOModel", oData.results);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		onNavBack: function(oevt) {
			//clear all data and navigate to back page
			/*	var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
				oPurchaseModel.setData({
					oData: {}
				});

				oPurchaseModel.refresh(true);*/
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			var oTempContract = oPurchaseModel.getProperty("/TempContract");
			oTempContract.setData();
			var sDestroy = oPurchaseModel.oData.TempContract.destroy;
			//	s.refresh(true);
			//	oView.byId("vnumber").setValue("");
			oPurchaseModel.refresh(true);
			this.getOwnerComponent().getRouter().navTo("PoHeaderList");
			this.getView().getModel("VHeader").refresh();

		},

		_onObjectMatched: function(oEvent) {
			var oModelread = oView.getModel("VHeader");

			//get all the details form the parameter
			var oModel = this.getOwnerComponent().getModel("PurchaseSet");
			var oParterDetails = oView.getModel("ParterDetails");
			var sPath = oEvent.getParameter("arguments");
			PurchaseOno = sPath.PoNo;

			//call the function
			//	this.getVendorList();
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
						var zero = "";
						BusyIndicator.hide();

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
								oView.setModel(oListModel, "POListModel");

								var sInfoUpdate = oListModel.oData.InfoUpd;
								var sIrInd = oListModel.oData.IrInd;

								var sPrntPrice = oListModel.oData.PrntPrice;
								var sGrNonVal = oListModel.oData.GrNonVal;
								var sUnlimitedDlv = oListModel.oData.UnlimitedDlv;
								var sNoMoreGr = oListModel.oData.NoMoreGr;
								var sFinalInv = oListModel.oData.FinalInv;
								var sGrBasediv = oListModel.oData.GrBasediv;
								var sAcknReqd = oListModel.oData.AcknReqd;
								var sEstPrice = oListModel.oData.EstPrice;
								var sOrigAccept = oListModel.oData.OrigAccept;
								var sGrInd = oListModel.oData.GrInd;
								if (sInfoUpdate !== "") {
									oView.getModel("POListModel").setProperty("/InfoUpd", true);

								} else {
									oView.getModel("POListModel").setProperty("/InfoUpd", false);
								}
								if (sIrInd !== "") {
									oView.getModel("POListModel").setProperty("/IrInd", true);

								} else {
									oView.getModel("POListModel").setProperty("/IrInd", false);
								}
								if (sPrntPrice !== "") {
									oView.getModel("POListModel").setProperty("/PrntPrice", true);

								} else {
									oView.getModel("POListModel").setProperty("/PrntPrice", false);
								}
								if (sOrigAccept !== "") {
									oView.getModel("POListModel").setProperty("/OrigAccept", true);

								} else {
									oView.getModel("POListModel").setProperty("/OrigAccept", false);
								}
								if (sGrNonVal !== "") {
									oView.getModel("POListModel").setProperty("/GrNonVal", true);

								} else {
									oView.getModel("POListModel").setProperty("/GrNonVal", false);
								}
								if (sGrInd !== "") {
									oView.getModel("POListModel").setProperty("/GrInd", true);

								} else {
									oView.getModel("POListModel").setProperty("/GrInd", false);
								}
								if (sNoMoreGr !== "") {
									oView.getModel("POListModel").setProperty("/NoMoreGr", true);

								} else {
									oView.getModel("POListModel").setProperty("/NoMoreGr", false);
								}
								if (sFinalInv !== "") {
									oView.getModel("POListModel").setProperty("/FinalInv", true);

								} else {
									oView.getModel("POListModel").setProperty("/FinalInv", false);
								}
								if (sGrBasediv !== "") {
									oView.getModel("POListModel").setProperty("/GrBasediv", true);

								} else {
									oView.getModel("POListModel").setProperty("/GrBasediv", false);
								}
								if (sAcknReqd !== "") {
									oView.getModel("POListModel").setProperty("/AcknReqd", true);

								} else {
									oView.getModel("POListModel").setProperty("/AcknReqd", false);
								}

								if (sEstPrice !== "") {
									oView.getModel("POListModel").setProperty("/EstPrice", true);

								} else {
									oView.getModel("POListModel").setProperty("/EstPrice", false);
								}
								if (sUnlimitedDlv !== "") {
									oView.getModel("POListModel").setProperty("/UnlimitedDlv", true);

								} else {
									oView.getModel("POListModel").setProperty("/UnlimitedDlv", false);
								}

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

									var Partner = [];
									Partner.push({
										Designation: "Vendor",
										Vendor: sVendor,
										Vendorname: sVendorname
									});
								
									oView.getModel("ParterDetails").setData(Partner);

								
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
						BusyIndicator.hide();
						MessageBox.error(oError);

					}
				});

			});

		},

		onEditPress: function() {
			//all the input  fields in editable mode
			oView.byId("iddEdit").setVisible(false);
			oView.byId("idSave").setVisible(true);
			oView.byId("idaddCondition").setVisible(true);

			oView.getModel("EditModel").setProperty("/isEditable", true);
		},
		OnCancel: function(event) {
			//cancel the all selected values and data
			oView.getModel("EditModel").setProperty("/isEditable", false);
			oView.byId("iddEdit").setVisible(true);
			oView.byId("idSave").setVisible(false);
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			var oTempContract = oPurchaseModel.getProperty("/TempContract");
			oTempContract.setData();
			var sDestroy = oPurchaseModel.oData.TempContract.destroy;

			oPurchaseModel.refresh(true);

			this.getView().getModel("VHeader").refresh();

			oView.byId("PurchOrg").setValue("");

			oView.byId("CompCode").setValue("");
			oView.byId("Vendor").setValue("");
			oView.byId("Currency").setValue("");
			oView.byId("PurGroup").setValue("");

			//redirect the page	frot view
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("PoHeaderList");

		},

		getMaterialDisList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(true);
			oModel.read("/MaterialmasterSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/MaterialDiscription", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		handleMaterialDisVendor: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogMD) {
				this._valueHelpDialogMD = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.MaterialDescription",
					this
				);
				this.getView().addDependent(this._valueHelpDialogMD);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogMD.getBinding("items").filter(new Filter([new Filter(
				"Description",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Materialno",
				FilterOperator.Contains, sInputValue
			)]));
			this.getMaterialDisList();
			// open value help dialog filtered by the input value
			this._valueHelpDialogMD.open(sInputValue);
		},
		_handleMaterialDisSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Description",
				FilterOperator.Contains, sValue
			), new Filter(
				"Materialno",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleMaterialDisClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			//	var oPurchaseContract = oPurchaseModel.getProperty("/TempContract");

			var oModel = oView.getModel("Lookup");
			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var oPurchaseContract = oPurchaseModel.getProperty("/TempContract/PoitemSet");
			var lenthss = oPurchaseContract.length;
			console.log(lenthss);
			var lenthcount = lenthss - 1;
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId);
				MaterialnUmberForPo = oSelectedItem.getInfo();
				var sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(MaterialnUmberForPo);

				productInput.setValue(sTitle);
				var sBindPath = oSelectedItem.getBindingContext("Lookup").sPath;
				//productInput.setValue(MaterialnUmberForPo);

				var oMat = oModel.getProperty(sBindPath + "/Materialno");

				var ab = $(this)[0].inputId;
				var id = $("#" + ab).closest("tr").find(".mtid").attr("id");

				$("#" + id + "-inner").val(oMat);
				oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + lenthcount + "/Material", oMat);

				var b = oModel.getProperty(sBindPath + "/UOM");
				var ab1 = $(this)[0].inputId;
				var id1 = $("#" + ab1).closest("tr").find(".measure1").attr("id");
				$("#" + id1 + "-inner").val(b);
				oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + lenthcount + "/PoUnit", b);

			}
			evt.getSource().getBinding("items").filter([]);
		},

		/*PGRP Search start*/

		getPurchaseGroupList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(true);
			oModel.read("/get_purgrp_f4helpSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/PurchaseGroupList", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		handlePurchaseGroupVendor: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogpgrop) {
				this._valueHelpDialogpgrop = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.PurchaseGroup",
					this
				);
				this.getView().addDependent(this._valueHelpDialogpgrop);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogpgrop.getBinding("items").filter(new Filter([new Filter(
				"Ekgrp",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Eknam",
				FilterOperator.Contains, sInputValue
			)]));
			this.getPurchaseGroupList();
			// open value help dialog filtered by the input value
			this._valueHelpDialogpgrop.open(sInputValue);
		},
		_handlePurchaseGroupSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Ekgrp",
				FilterOperator.Contains, sValue
			), new Filter(
				"Eknam",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handlePurchaseGroupClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);
		},
		/*POGRP SEarch end*/

		/*SEARCH vendor start*/
		getVendorList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(true);
			oModel.read("/Fetch_Vendor_DetailsSet", {
				success: function(oData) {
					BusyIndicator.hide();

					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/DisplyaVendorList", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
		_handleValueVendorHelpS: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			//open the vendor fragment
			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogMP) {
				this._valueHelpDialogMP = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.Display",
					this
				);
				this.getView().addDependent(this._valueHelpDialogMP);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogMP.getBinding("items").filter(new Filter([new Filter(
				"Name1",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sInputValue
			)]));
			this.getVendorList();
			// open value help dialog filtered by the input value
			this._valueHelpDialogMP.open(sInputValue);
		},
		_handleValueVendorHelpSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Name1",
				FilterOperator.Contains, sValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleValueVendorHelpClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			var oModel = oView.getModel("Lookup");

			if (oSelectedItem) {
				var productInput = this.byId(this.inputId),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sDescription);
				if (sDescription !== "") {

					var sBindPath = oSelectedItem.getBindingContext("Lookup").sPath;

				}
			}
			evt.getSource().getBinding("items").filter([]);

		},

		/*search vendor end*/

		onPOITemDetailss: function(oEvent) {
			oView.byId("idEdit").setVisible(false);
			oView.byId("idSave").setVisible(true);
			oView.byId("ed").setText("Change Purchase Order");

			oView.getModel("EditModel").setProperty("/isEditable", true);

			$(document).ready(function() {
				$("idEdit").click(function() {
					$("ShortText").removeAttr("value");
				});
			});

		},
		onAddConditions: function(oEvent) {
			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var oPurchaseContract = oPurchaseModel.getProperty("/TempContract/PoitemSet");
			var oModelPO = this.getOwnerComponent().getModel("PurchaseSet");
			var lenthss = oPurchaseContract.length;
			console.log(lenthss);
			var lenthcount = lenthss - 1;
			var oTempContract = oPurchaseModel.getProperty("/TempContract");

			var oRequestPayload = oTempContract.getRequestPayloadPlant();
			console.log(oRequestPayload);
			//method for creating the prod
			BusyIndicator.show(true);
			oModelPO.create("/PoDisplaySet", oRequestPayload, {
				success: function(Object, oResp) {
					BusyIndicator.hide();

					var Podata = new PurchaseHeader(Object);
					oView.getModel("PurchaseModel").setProperty("/TempContract", Podata);

					oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet", Podata.PoitemSet.results);
					oView.getModel("PurchaseModel").setProperty("/TempContract/PoCondSet", Podata.PoCondSet.results);
					oView.getModel("PurchaseModel").setProperty("/TempContract/PoScheduleSet", Podata.PoScheduleSet.results);
					var aPurchaseConditionItems = oPurchaseModel.getProperty("/TempContract/PoitemSet");
					console.log(aPurchaseConditionItems);
					var lenthPO = aPurchaseConditionItems.length;
					console.log(sNetPriceId);
					var netcount = lenthPO - 1;

					var poitem = aPurchaseConditionItems.length;
					var sMatno = aPurchaseConditionItems[poitem - 1].Material;

					//	if (Matitem === sMatno) {
					var sMatList = new RebateConditionItemPO(aPurchaseConditionItems[poitem - 1]);
					var oListModel = new JSONModel();
					oListModel.setData(sMatList);
					oView.setModel(oListModel, "POListModel");

					var sInfoUpdate = oListModel.oData.InfoUpd;
					var sIrInd = oListModel.oData.IrInd;

					var sPrntPrice = oListModel.oData.PrntPrice;
					var sGrNonVal = oListModel.oData.GrNonVal;
					var sUnlimitedDlv = oListModel.oData.UnlimitedDlv;
					var sNoMoreGr = oListModel.oData.NoMoreGr;
					var sFinalInv = oListModel.oData.FinalInv;
					var sGrBasediv = oListModel.oData.GrBasediv;
					var sAcknReqd = oListModel.oData.AcknReqd;
					var sEstPrice = oListModel.oData.EstPrice;
					var sOrigAccept = oListModel.oData.OrigAccept;
					var sGrInd = oListModel.oData.GrInd;
					if (sInfoUpdate !== "") {
						oView.getModel("POListModel").setProperty("/InfoUpd", true);

					} else {
						oView.getModel("POListModel").setProperty("/InfoUpd", false);
					}
					if (sIrInd !== "") {
						oView.getModel("POListModel").setProperty("/IrInd", true);

					} else {
						oView.getModel("POListModel").setProperty("/IrInd", false);
					}
					if (sPrntPrice !== "") {
						oView.getModel("POListModel").setProperty("/PrntPrice", true);

					} else {
						oView.getModel("POListModel").setProperty("/PrntPrice", false);
					}
					if (sOrigAccept !== "") {
						oView.getModel("POListModel").setProperty("/OrigAccept", true);

					} else {
						oView.getModel("POListModel").setProperty("/OrigAccept", false);
					}
					if (sGrNonVal !== "") {
						oView.getModel("POListModel").setProperty("/GrNonVal", true);

					} else {
						oView.getModel("POListModel").setProperty("/GrNonVal", false);
					}
					if (sGrInd !== "") {
						oView.getModel("POListModel").setProperty("/GrInd", true);

					} else {
						oView.getModel("POListModel").setProperty("/GrInd", false);
					}
					if (sNoMoreGr !== "") {
						oView.getModel("POListModel").setProperty("/NoMoreGr", true);

					} else {
						oView.getModel("POListModel").setProperty("/NoMoreGr", false);
					}
					if (sFinalInv !== "") {
						oView.getModel("POListModel").setProperty("/FinalInv", true);

					} else {
						oView.getModel("POListModel").setProperty("/FinalInv", false);
					}
					if (sGrBasediv !== "") {
						oView.getModel("POListModel").setProperty("/GrBasediv", true);

					} else {
						oView.getModel("POListModel").setProperty("/GrBasediv", false);
					}
					if (sAcknReqd !== "") {
						oView.getModel("POListModel").setProperty("/AcknReqd", true);

					} else {
						oView.getModel("POListModel").setProperty("/AcknReqd", false);
					}

					if (sEstPrice !== "") {
						oView.getModel("POListModel").setProperty("/EstPrice", true);

					} else {
						oView.getModel("POListModel").setProperty("/EstPrice", false);
					}
					if (sUnlimitedDlv !== "") {
						oView.getModel("POListModel").setProperty("/UnlimitedDlv", true);

					} else {
						oView.getModel("POListModel").setProperty("/UnlimitedDlv", false);
					}

					oView.setModel(oListModel, "PurchaseItems");

					//	} else {}

					//	}

				},
				error: function(err) {
					BusyIndicator.hide();
					MessageBox.error(err);
				}
			});
		},
		/*Purchase Order Suggestion Items Ended*/
		onAddNewConditionItem: function() {
			// add the new rows in a table and added set  the array to property

			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var aPurchaseConditionItems = oPurchaseModel.getProperty("/TempContract/PoitemSet");

			function LeadingZeros(num, size) {
				var s = num + "0" + "";

				while (s.length < size) s = "0" + s;
				return s;
			}
			aPurchaseConditionItems.push(new RebateConditionItemPO({
				PoItem: LeadingZeros(aPurchaseConditionItems.length + 1, 5)
			}));
			oPurchaseModel.refresh(false);

		},

		onDeleteConditionItem: function() {
			//delete the selected rows in a table and also delete the array property in model
			var oPurchaseItemTable = this.byId("idPOItemsTab");
			var aSelectedIndex = oPurchaseItemTable.getSelectedIndices().reverse();
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			var aPurchaseConditionItems = oPurchaseModel.getProperty("/TempContract/PoitemSet");
			for (var i = 0; i < aSelectedIndex.length; i++) {
				aPurchaseConditionItems.splice(aSelectedIndex[i], 1);
			}
			oPurchaseItemTable.clearSelection();
			oPurchaseModel.refresh(true);
		},
		onSelectMaterial: function(oEvt) {
			var sMaterial = oEvt.getSource().getSelectedKey();
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			var aPurchaseConditionItems = oPurchaseModel.getProperty("/TempContract/PoitemSet");
			var iTtem = oPurchaseModel.oData.TempContract.PoitemSet.length;
			var lenthcount = iTtem - 1;
			for (var val = 0; val < iTtem; val++) {
				var Matitem = aPurchaseConditionItems[val].Material;
				//		var a = aPurchaseConditionItems.indexOf(sMaterial);
				if (sMaterial.indexOf(" ") !== -1) {
					sMaterial = sMaterial.split(" ");
					sMaterial = sMaterial[0];
				}

				if (Matitem === sMaterial) {
					var sMatList = new RebateConditionItemPO(aPurchaseConditionItems[val]);
					var oListModel = new JSONModel();
					oListModel.setData(sMatList);
					oView.setModel(oListModel, "POListModel");

					var sInfoUpdate = oListModel.oData.InfoUpd;
					var sIrInd = oListModel.oData.IrInd;

					var sPrntPrice = oListModel.oData.PrntPrice;
					var sGrNonVal = oListModel.oData.GrNonVal;
					var sUnlimitedDlv = oListModel.oData.UnlimitedDlv;
					var sNoMoreGr = oListModel.oData.NoMoreGr;
					var sFinalInv = oListModel.oData.FinalInv;
					var sGrBasediv = oListModel.oData.GrBasediv;
					var sAcknReqd = oListModel.oData.AcknReqd;
					var sEstPrice = oListModel.oData.EstPrice;
					var sOrigAccept = oListModel.oData.OrigAccept;
					var sGrInd = oListModel.oData.GrInd;
					if (sInfoUpdate !== "") {
						oView.getModel("POListModel").setProperty("/InfoUpd", true);

					} else {
						oView.getModel("POListModel").setProperty("/InfoUpd", false);
					}
					if (sIrInd !== "") {
						oView.getModel("POListModel").setProperty("/IrInd", true);

					} else {
						oView.getModel("POListModel").setProperty("/IrInd", false);
					}
					if (sPrntPrice !== "") {
						oView.getModel("POListModel").setProperty("/PrntPrice", true);

					} else {
						oView.getModel("POListModel").setProperty("/PrntPrice", false);
					}
					if (sOrigAccept !== "") {
						oView.getModel("POListModel").setProperty("/OrigAccept", true);

					} else {
						oView.getModel("POListModel").setProperty("/OrigAccept", false);
					}
					if (sGrNonVal !== "") {
						oView.getModel("POListModel").setProperty("/GrNonVal", true);

					} else {
						oView.getModel("POListModel").setProperty("/GrNonVal", false);
					}
					if (sGrInd !== "") {
						oView.getModel("POListModel").setProperty("/GrInd", true);

					} else {
						oView.getModel("POListModel").setProperty("/GrInd", false);
					}
					if (sNoMoreGr !== "") {
						oView.getModel("POListModel").setProperty("/NoMoreGr", true);

					} else {
						oView.getModel("POListModel").setProperty("/NoMoreGr", false);
					}
					if (sFinalInv !== "") {
						oView.getModel("POListModel").setProperty("/FinalInv", true);

					} else {
						oView.getModel("POListModel").setProperty("/FinalInv", false);
					}
					if (sGrBasediv !== "") {
						oView.getModel("POListModel").setProperty("/GrBasediv", true);

					} else {
						oView.getModel("POListModel").setProperty("/GrBasediv", false);
					}
					if (sAcknReqd !== "") {
						oView.getModel("POListModel").setProperty("/AcknReqd", true);

					} else {
						oView.getModel("POListModel").setProperty("/AcknReqd", false);
					}

					if (sEstPrice !== "") {
						oView.getModel("POListModel").setProperty("/EstPrice", true);

					} else {
						oView.getModel("POListModel").setProperty("/EstPrice", false);
					}
					if (sUnlimitedDlv !== "") {
						oView.getModel("POListModel").setProperty("/UnlimitedDlv", true);

					} else {
						oView.getModel("POListModel").setProperty("/UnlimitedDlv", false);
					}

					oView.setModel(oListModel, "PurchaseItems");

				} else {

				}

			}

		},
		/*Material Number Search start*/
	

		handlePOMaterialHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			//eate value help dialog
			if (!this._valueHelpDialogph) {
				this._valueHelpDialogph = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.MaterialNumber",
					this
				);
				this.getView().addDependent(this._valueHelpDialogph);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogph.getBinding("items").filter(new Filter([new Filter(
				"Materialno",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sInputValue
			)]));
		//	this.getMaterialList();
				var Service = new ServiceF4();
			Service.getMaterialList(this);
			// open value help dialog filtered by the input value
			this._valueHelpDialogph.open(sInputValue);
		},
		_handlePOMaterialSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Materialno",
				FilterOperator.Contains, sValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},

		_handlePOMaterialClose: function(evt) {

			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var oPurchaseContract = oPurchaseModel.getProperty("/TempContract/PoitemSet");
			var lenthss = oPurchaseContract.length;
			console.log(lenthss);
			var lenthcount = lenthss - 1;
			var oSelectedItem = evt.getParameter("selectedItem");
			var oModel = oView.getModel("Lookup");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId);
				var sBindPath = oSelectedItem.getBindingContext("Lookup").sPath;
				productInput.setValue(oSelectedItem.getTitle());

				var oDiscription = oModel.getProperty(sBindPath + "/Description");

				var ab = $(this)[0].inputId;
				var id = $("#" + ab).closest("tr").find(".ShortTextmat").attr("id");

				$("#" + id + "-inner").val(oDiscription);
				oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + lenthcount + "/ShortText", oDiscription);

				MaterialnUmberForPo = oSelectedItem.getTitle();

				var b = oModel.getProperty(sBindPath + "/UOM");
				var ab1 = $(this)[0].inputId;
				var id1 = $("#" + ab1).closest("tr").find(".measure1").attr("id");
				$("#" + id1 + "-inner").val(b);
				oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + lenthcount + "/PoUnit", b);

			}
			evt.getSource().getBinding("items").filter([]);

		},

		/*Material SEarch end*/

		/*Plant search start */

		_handlePlantClose: function(evt) {
			var zero = "";
			var oModelPO = this.getOwnerComponent().getModel("PurchaseSet");

			var oSelectedItem = evt.getParameter("selectedItem");
			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var oPurchaseContract = oPurchaseModel.getProperty("/TempContract/PoitemSet");
			var lenthss = oPurchaseContract.length;
			console.log(lenthss);
			var lenthcount = lenthss - 1;
			var sVendor = oPurchaseModel.oData.TempContract.Vendor;

			var sMaterialno = MaterialnUmberForPo;
			var oModelread = oView.getModel("VHeader");

			var oModel = oView.getModel("Lookup");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId);
				productInput.setValue(oSelectedItem.getTitle());

				if ($.isNumeric((sMaterialno)) === true) {
					var len = sMaterialno.length;
					if (len !== undefined) {
						var z = 18 - len;
						for (var i = 0; i < z; i++) {
							zero += "0";
						}
					}

					sMaterialno = zero + sMaterialno;
				}

				var notzwer = "";
				//	var no;
				//increase the length of variable
				if ($.isNumeric((sVendor)) === true) {
					var len = sVendor.length;
					if (len !== undefined) {
						var z = 18 - len;
						for (var i = 0; i < z; i++) {
							notzwer += "0";
						}
					}

					sVendor = notzwer + sVendor;
				}
				//filtered the data and set the filter to get enttityset
				var oFilter = new sap.ui.model.Filter('Lifnr', sap.ui.model.FilterOperator.EQ, sVendor);
				var oFilterV = new sap.ui.model.Filter('Matnr', sap.ui.model.FilterOperator.EQ, sMaterialno);
				var that = this;
				BusyIndicator.show(true);
				oModelread.read("/fetch_matpriceSet?$filter=(Lifnr eq '" + sVendor + "',Matnr eq '" + sMaterialno + "')", {
					filters: [oFilter, oFilterV],

					success: function(oData) {
						BusyIndicator.hide();
						//get the price from passing filtered vendor and material no
						if (!oData.results.length) {
							MessageBox.alert("No price found for given material number and plant combination. Add the price manually.");
							var aaas = "0.00";

							var ab = $(that)[0].inputId;
							var id = $("#" + ab).closest("tr").find(".price1").attr("id");
							$("#" + id + "-inner").val(aaas);
							oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + lenthcount + "/NetPrice", aaas);

						} else {

							var oPriceJson = new JSONModel();
							oPriceJson.setData(oData.results);
							oView.setModel(oPriceJson);
							var oHierarchyModel = new sap.ui.model.json.JSONModel();
							oView.setModel(oHierarchyModel, "hierarchy");
							oView.getModel("hierarchy").setData(oData);
							sNetValue = oHierarchyModel.oData.results[0].Netpr;
							var sNetIn = $(that)[0].inputId;
							var sNetid = $("#" + sNetIn).closest("tr").find(".price1").attr("id");
							$("#" + sNetid + "-inner").removeAttr('value');
							$("#" + sNetid + "-inner").val(sNetValue);
							sNetPriceId = "#" + sNetid + "-inner";
							oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + lenthcount + "/NetPrice", sNetValue);

						}

					},
					error: function(oError) {
						BusyIndicator.hide();
						MessageBox.error("No price found for given material number and plant combination. Add the price manually.");
					}

				});

				evt.getSource().getBinding("items").filter([]);
			}
		},

		handleValueHelpPlant: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogpp) {
				this._valueHelpDialogpp = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.Plant",
					this
				);
				this.getView().addDependent(this._valueHelpDialogpp);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogpp.getBinding("items").filter(new Filter([new Filter(
				"Bwkey",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Bwkey",
				FilterOperator.Contains, sInputValue
			)]));

			var Service = new ServiceF4();
			Service.getPOPlant(this);
			// open value help dialog filtered by the input value
			this._valueHelpDialogpp.open(sInputValue);

		},
		_handlePlantSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Bwkey",
				FilterOperator.Contains, sValue
			), new Filter(
				"Bwkey",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},

		/*plant search end*/

		onSavePurchaseOrder: function() {
			var oModel = this.getOwnerComponent().getModel("PurchaseSet");

			//get odata model with the data
			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var oPurchaseContract = oPurchaseModel.getProperty("/TempContract");

			var oRequestPayload = oPurchaseContract.getRequestPayload();
			console.log(PurchaseOno);
			oRequestPayload.Purchaseorder = PurchaseOno;
			oRequestPayload.PoNumber = PurchaseOno;
			console.log(oRequestPayload);
			BusyIndicator.show(true);
			var vln = oRequestPayload.PoitemSet.length;
			for (var vlen = 0; vlen < vln; vlen++) {
				delete oRequestPayload.PoitemSet[vlen].Vendor;
			}
			oModel.create("/PoDisplaySet", oRequestPayload, {
				success: this._onUpdateProdEntrySuccess.bind(this),
				error: this._onCreateEntryError.bind(this)
			});

			oPurchaseModel.refresh(true);

		},
		_onUpdateProdEntrySuccess: function(oObject, oResponse) {
			BusyIndicator.hide();
			//show the response from sap using meassage box
			var sUpdatedPO = oResponse.data.Purchaseorder;
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			var oTempContract = oPurchaseModel.getProperty("/TempContract");
			oTempContract.setData();
			var sDestroy = oPurchaseModel.oData.TempContract.destroy;
			//	s.refresh(true);
			//	oView.byId("vnumber").setValue("");
			oPurchaseModel.refresh(true);
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.show("Standard PO updated under the number  #" + sUpdatedPO + " ", {

				icon: sap.m.MessageBox.Icon.INFORMATION,

				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CLOSE],
				onClose: function(oAction) {
					if (oAction === "OK") {
						var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
						BusyIndicator.show(false);
						BusyIndicator.hide();
						oRouter.navTo('PoHeaderList');
					}
				}.bind(this)
			});

		},
		_onCreateEntryError: function(oError) {
			BusyIndicator.hide();
			var sRespon = JSON.parse(oError.responseText);
			var err = sRespon.error.message.value;

			jQuery.sap.require("sap.m.MessageBox");

			sap.m.MessageBox.error(
				"Error creating entry: " + err + " "
			);

		},

		/*Po Search*/
		getPurchaseOrgList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(true);
			oModel.read("/get_purchaseorg_f4helpSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/PurchaseOrganization", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		handlePurchaseOrgVendor: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogporg) {
				this._valueHelpDialogporg = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.PurchaseOrg",
					this
				);
				this.getView().addDependent(this._valueHelpDialogporg);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogporg.getBinding("items").filter(new Filter([new Filter(
				"Ekorg",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Ekotx",
				FilterOperator.Contains, sInputValue
			)]));
			this.getPurchaseOrgList();
			// open value help dialog filtered by the input value
			this._valueHelpDialogporg.open(sInputValue);
		},
		_handlePOrganiVendorSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Ekorg",
				FilterOperator.Contains, sValue
			), new Filter(
				"Ekotx",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handlePOrganiVendorClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);
		},

		/*PO Search end*/

		/*Comp Search start*/

		getCompanyList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(true);
			oModel.read("/get_companycode_f4helpSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/CountryCode", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		handleCompanyCodeVendor: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogcomp) {
				this._valueHelpDialogcomp = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.CompCode",
					this
				);
				this.getView().addDependent(this._valueHelpDialogcomp);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogcomp.getBinding("items").filter(new Filter([new Filter(
				"Bukrs",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Butxt",
				FilterOperator.Contains, sInputValue
			)]));
			this.getCompanyList();
			// open value help dialog filtered by the input value
			this._valueHelpDialogcomp.open(sInputValue);
		},
		_handlevendorCompSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Bukrs",
				FilterOperator.Contains, sValue
			), new Filter(
				"Butxt",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handlevendorCompClose: function(evt) {
				var oSelectedItem = evt.getParameter("selectedItem");
				if (oSelectedItem) {
					var productInput = this.byId(this.inputId),
						sDescription = oSelectedItem.getInfo(),
						sTitle = oSelectedItem.getTitle();
					productInput.setSelectedKey(sDescription);
					productInput.setValue(sTitle);

				}
				evt.getSource().getBinding("items").filter([]);
			}
			/*Company SEarch end*/

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.vSimpleApp.view.view.POITemDetails
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.vSimpleApp.view.view.POITemDetails
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.vSimpleApp.view.view.POITemDetails
		 */
		//	onExit: function() {
		//
		//	}

	});

});