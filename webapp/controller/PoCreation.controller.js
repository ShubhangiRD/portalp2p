sap.ui.define([
	"./Formatter",
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
	"sap/m/ColumnListItem",
	"jquery.sap.global",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/m/Text",
	"sap/m/TextArea",
	"sap/m/DatePicker",
	"sap/ui/model/FilterType",
	"sap/ui/core/BusyIndicator",
	"sap/ui/core/routing/History",
	"com/vSimpleApp/model/PurchaseHeader",
		"com/vSimpleApp/Classes/ServiceF4"

], function(Formatter, Controller, JSONModel, mobileLibrary, Input, Fragment, Filter, FilterOperator, RebateConditionItemPO,
	VendorRebateCondition, CreateContract, ColumnListItem, jQuery, MessageToast, MessageBox, Text, TextArea, DatePicker, FilterType,
	BusyIndicator, History, PurchaseHeader,ServiceF4) {
	"use strict";
	var oView, sMaterialRows;
	var oComponent;
	var sNetPriceId, sNetPrice;
	var Service = new ServiceF4();
	return Controller.extend("com.vSimpleApp.view.controller.POCreation", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf QuickStartApplication2.view.Purchase
		 */
		onInit: function() {
			oView = this.getView();
			var oModel = this.getOwnerComponent().getModel("VHeader");
			//set the model on view to be used by the UI controls
			this.getView().setModel(oModel);
			oView = this.getView();
			oComponent = this.getOwnerComponent();
			// Define the models
			var oParterDetails = new JSONModel();
			oView.setModel(oParterDetails, "ParterDetails");

			var createContract = new CreateContract();
			this.getView().setModel(createContract.getModel(), "CreateContract");
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.getRoute("PoCreation").attachPatternMatched(this._onRouteMatched1, this);

			//window.location.reload();

		},
		_onRouteMatched1: function() {
			//window.location.reload();
			//******************** customization code **********************************
			//alert("dsad");
			var $inputs = $('html :input');

			var ids = {};
			var i = 0;

			$inputs.each(function(index) {
				if ($(this).attr('id').indexOf("inner") != -1 && $(this).attr('id').indexOf("--") != -1) {
					var a = $(this).attr('id');
					//console.log(a);
					a = a.split("--");
					if (a !== undefined) {
						a = a[1];
						a = a.split("-");
						//console.log(a);
						if (a !== undefined) {
							a = a[0];
							ids[i] = a;
							i++;
						}
					}

				}

			});

			console.log(ids);
			var json2 = new sap.ui.model.json.JSONModel();
			var json5 = new sap.ui.model.json.JSONModel();
			var that = this;

			function defaultfunction(file, rule, varb) {
				$.ajax({
					url: 'http://localhost:81/' + file + '.php?rule=' + rule,
					async: false,
					success: function(datas) //on recieve of reply
						{
							if (rule == 5) {
								var d = JSON.parse(datas);
								json5.setData(d.result[0]);
							} else {
								eval(varb).setData(JSON.parse(datas));
							}
							that.getView().setModel(eval('json' + rule), "result" + rule);
							//console.log(json1.oData.result);
						},
					error: function(err) {
						//console.log(err);
					}
				});
			}
			defaultfunction('config_file', '2', 'json2');
			var arr = [];
			var chk = [];
			arr = json2.oData.result;
			var that = this;
			setTimeout(function() {
				for (i = 0; i < arr.length; i++) {
					var fn = arr[i].FieldName;
					if (arr[i].IsVisible == false || arr[i].IsVisible == 'false') {
						var h = that.byId(fn).oParent.sId;
						if (h !== undefined) {
							chk.push(h);
							$("#" + h).hide();
							$("#" + h).html("");
						}
						if (that.byId(fn) !== undefined) {
							that.byId(fn).setVisible(false);
							var tmp = that.byId(fn).sId + "-inner";
							var ltmp = $("body").find("label[for='" + tmp + "']").attr("id");
							$("#" + ltmp).hide();
						}

						//var srch = sap.ui.getCore().byFieldGroupId(fn)
						/*if(srch.length!==0)
						{
							var x = sap.ui.getCore().byFieldGroupId(fn);
							
							//console.log(x.length);
							for(var j=0;j<x.length;j++)
							{
							    x[j].setVisible(false);
							}
						}
						else{
								var h = this.byId(fn).oParent.sId;
								$("#"+h).hide();
						}*/
						/*	else{
								if(this.byId(fn)!==undefined)
								{
									this.byId(fn).setVisible(false);
									var tmp = this.byId(fn).sId+"-inner";
									var ltmp = $("body").find("label[for='"+tmp+"']").attr("id");
									$("#"+ltmp).hide();
								}
								
							}*/

					}

				}
			}, 1000);
			/*if(chk.length!==0)
			{
				for(var k=0;k<chk.length;k++)
				{
					var v = chk[k];
					$("#"+v).is(":visible");
				}
			}*/
		},
		
		onNavBack: function(oevt) {
			oView.byId("VendorName").setValue(" ");
			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			oPurchaseModel.setData({
				oData: {}
			});

			oPurchaseModel.refresh(true);
			var oParterDetails = oView.getModel("ParterDetails");
			oParterDetails.setData({
				oData: {}
			});

			oParterDetails.refresh(true);
			oView.byId("idStreetHeader").setValue("");
			oView.byId("PostalCode").setValue("");
			oView.byId("idCountryCodeHeader").setValue("");
			oView.byId("AddressNum").setValue("");
			oView.byId("idCityHeader").setValue("");
			oView.byId("Telephone1").setValue("");
			oView.byId("Vendor1").setValue("");
			oView.byId("Name1").setValue("");
			oView.byId("idStreet").setValue("");
			oView.byId("idAddno").setValue("");
			oView.byId("idCountryCode").setValue("");
			oView.byId("idRegion").setValue("");
			oView.byId("idPostcode").setValue("");
			oView.byId("idCity").setValue("");
			oView.byId("idTel").setValue("");
			this.getOwnerComponent().getRouter().navTo("PoHeaderList");
			//	this.getView().getModel("VHeader").refresh();

		},
	
		handleVendorValuehelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.Display",
					this
				);
				this.getView().addDependent(this._valueHelpDialog);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialog.getBinding("items").filter(new Filter([new Filter(
				"Name1",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sInputValue
			)]));
		
			
			Service.getVendorList(this);
			// open value help dialog filtered by the input value
			this._valueHelpDialog.open(sInputValue);
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
			var oParterDetails = oView.getModel("ParterDetails");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sDescription);
				if (sDescription !== "") {
					//	this.getVendorDetails(sDescription);
					var sBindPath = oSelectedItem.getBindingContext("Lookup").sPath;
					var ssVendor = oModel.getProperty(sBindPath + "/Ekorg");
					oView.byId("PurchOrg").setValue(ssVendor);
					var sComcode = oModel.getProperty(sBindPath + "/Bukrs");
					oView.byId("CompCode").setValue(sComcode);
					var sPurGrp = oModel.getProperty(sBindPath + "/Ekgrp");
					oView.byId("PurGroup").setValue(sPurGrp);
					var sCurr = oModel.getProperty(sBindPath + "/Waers");
					oView.byId("Currency").setValue(sCurr);
					var sVendorname = oModel.getProperty(sBindPath + "/Name1");
					oView.byId("VendorName").setValue(sVendorname);
					oView.byId("idStreetHeader").setValue(oModel.getProperty(sBindPath + "/Stras"));
					oView.byId("PostalCode").setValue(oModel.getProperty(sBindPath + "/Pstlz"));
					oView.byId("idCountryCodeHeader").setValue(oModel.getProperty(sBindPath + "/Land1"));
					oView.byId("AddressNum").setValue(oModel.getProperty(sBindPath + "/Adrnr"));
					oView.byId("idCityHeader").setValue(oModel.getProperty(sBindPath + "/Ort02"));
					oView.byId("Telephone1").setValue(oModel.getProperty(sBindPath + "/Telf1"));
					oView.byId("Vendor1").setValue(sDescription);
					oView.byId("Name1").setValue(sVendorname);
					oView.byId("idStreet").setValue(oModel.getProperty(sBindPath + "/Stras"));
					oView.byId("idAddno").setValue(oModel.getProperty(sBindPath + "/Adrnr"));
					oView.byId("idCountryCode").setValue(oModel.getProperty(sBindPath + "/Land1"));
					oView.byId("idRegion").setValue(oModel.getProperty(sBindPath + "/Regio"));
					oView.byId("idPostcode").setValue(oModel.getProperty(sBindPath + "/Pstlz"));
					oView.byId("idCity").setValue(oModel.getProperty(sBindPath + "/Land1"));
					oView.byId("idTel").setValue(oModel.getProperty(sBindPath + "/Telf1"));
					var Partner = [];
					Partner.push({
						Designation: "Vendor",
						Vendor: sDescription,
						Vendorname: sVendorname
					});
					console.log(Partner);

					oView.getModel("ParterDetails").setData(Partner);

					console.log(oParterDetails);
				}
			}
			evt.getSource().getBinding("items").filter([]);

		},

		/*Po Search*/
	
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
		//	this.getPurchaseOrgList();
			
			Service.getPurchaseOrgList(this);
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
			
			//	var Service = new ServiceF4();
			Service.getCompanyList(this);
		
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
		},
		/*Company SEarch end*/

		/*PGRP Search start*/



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
		//	this.getPurchaseGroupList();
			//	var Service = new ServiceF4();
			Service.getPurchaseGroupList(this);
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

		/*plant search start*/


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
		
			
		//	var Service = new ServiceF4();
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
		onAddConditions: function(oEvent) {
			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var oPurchaseContract = oPurchaseModel.getProperty("/TempContract/PoitemSet");
			var oModelPO = this.getOwnerComponent().getModel("PurchaseSet");
			var lenthss = oPurchaseContract.length;
	//		console.log(lenthss);
			var lenthcount = lenthss - 1;
			var oTempContract = oPurchaseModel.getProperty("/TempContract");

			var oRequestPayload = oTempContract.getRequestPayloadPlant();
		
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
				
					var lenthPO = aPurchaseConditionItems.length;
				
					var netcount = lenthPO - 1;
				//	$(sNetPriceId).val(sNetPrice);
				//	oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + netcount + "/NetPrice", sNetPrice);

					var iTtem = oPurchaseModel.oData.TempContract.PoitemSet.length;

					var poitem = aPurchaseConditionItems.length;
				
					var sMatno = aPurchaseConditionItems[poitem - 1].Material;

					/*		for (var val = 0; val < iTtem; val++) {
								var Matitem = aPurchaseConditionItems[val].Material;
								//		var a = aPurchaseConditionItems.indexOf(sMaterial);
								if (sMatno.indexOf(" ") !== -1) {
									sMatno = sMatno.split(" ");
									sMatno = sMatno[0];
								}*/
					/*	if (Matitem === sMatno) {
							var sMatList = new RebateConditionItemPO(aPurchaseConditionItems[val]);
							console.log(sMatList);

							var oListModel = new JSONModel();
							oListModel.setData(sMatList);
							oView.setModel(oListModel, "PurchaseItems");

							console.log(aPurchaseConditionItems[val]);

						}*/
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
		_handlePlantClose: function(evt) {
			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var oPurchaseContract = oPurchaseModel.getProperty("/TempContract/PoitemSet");
			var oModelPO = this.getOwnerComponent().getModel("PurchaseSet");

			var lenthss = oPurchaseContract.length;
	
			var lenthcount = lenthss - 1;

			var zero = "";
			var oSelectedItem = evt.getParameter("selectedItem");
			var getPurchase = this.getView().getModel("CreateContract");

			var Materialno = getPurchase.getProperty("/Materialno");
			var VendorNumber = oPurchaseModel.oData.TempContract.Vendor;

			var oModel = oView.getModel("VHeader");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId);
				productInput.setValue(oSelectedItem.getTitle());
				oView.byId("NetPrice").setValue(getPurchase.getProperty("/Stprs"));
				if ($.isNumeric((Materialno)) === true) {
					var len = Materialno.length;
					if (len !== undefined) {
						var z = 18 - len;
						for (var i = 0; i < z; i++) {
							zero += "0";
						}
					}

					Materialno = zero + Materialno;

				}

				var sVstring = "";

				if ($.isNumeric((VendorNumber)) === true) {
					var iVenLength = VendorNumber.length;
					if (iVenLength !== undefined) {
						var sV = 10 - iVenLength;
						for (var itext = 0; itext < sV; itext++) {
							sVstring += "0";
						}
					}

					VendorNumber = sVstring + VendorNumber;
				}
				var oFilter = new sap.ui.model.Filter('Lifnr', sap.ui.model.FilterOperator.EQ, VendorNumber);
				var oFilterV = new sap.ui.model.Filter('Matnr', sap.ui.model.FilterOperator.EQ, Materialno);
				var that = this;
				BusyIndicator.show(true);
				oModel.read("/fetch_matpriceSet?$filter=(Lifnr eq '" + VendorNumber + "',Matnr eq '" + Materialno + "')", {
					filters: [oFilter, oFilterV],

					success: function(oData) {

						BusyIndicator.hide();
						if (!oData.results.length) {
							MessageBox.alert("No price found for given material number and plant combination. Add the price manually.");

						
							var aaas = "0.00";

							var ab = $(that)[0].inputId;
							var id = $("#" + ab).closest("tr").find(".price1").attr("id");
							$("#" + id + "-inner").val(aaas);
							oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + lenthcount + "/NetPrice", aaas);

						} else {
							var PriceJson = new JSONModel();
							PriceJson.setData(oData.results);
							oView.setModel(PriceJson);
							var oHierarchyModel = new sap.ui.model.json.JSONModel();
							oView.setModel(oHierarchyModel, "hierarchy");
							oView.getModel("hierarchy").setData(oData);
						var	sNetPrice1 = oHierarchyModel.oData.results[0].Netpr;
							var sInfnr = oHierarchyModel.oData.results[0].Infnr;

							var sInforef = $(that)[0].inputId;
							var idInfo = $("#" + sInforef).closest("tr").find(".infoClass").attr("id");
							$("#" + idInfo + "-inner").val(sInfnr);

							oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + lenthcount + "/InfoRec", sInfnr);

							var sPriceab = $(that)[0].inputId;
							var idPrice = $("#" + sPriceab).closest("tr").find(".price1").attr("id");
							$("#" + idPrice + "-inner").val(sNetPrice1);

						var	sNetPriceId = "#" + idPrice + "-inner";
							console.log(sNetPriceId);
							oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + lenthcount + "/NetPrice", sNetPrice1);

							//	BusyIndicator.hide();
						}

					/*			var aPurchaseConditionItems = oPurchaseModel.getProperty("/TempContract/PoitemSet");
								var iTtem = oPurchaseModel.oData.TempContract.PoitemSet.length;

								var sMatno = aPurchaseConditionItems[aPurchaseConditionItems.length - 1].Material;

								for (var val = 0; val < iTtem; val++) {
									var Matitem = aPurchaseConditionItems[val].Material;
									//		var a = aPurchaseConditionItems.indexOf(sMaterial);
									if (sMatno.indexOf(" ") !== -1) {
										sMatno = sMatno.split(" ");
										sMatno = sMatno[0];
									}
									if (Matitem === sMatno) {
										var sMatList = new RebateConditionItemPO(aPurchaseConditionItems[val]);
										console.log(sMatList);

										var oListModel = new JSONModel();
										oListModel.setData(sMatList);
										oView.setModel(oListModel, "PurchaseItems");

										console.log(aPurchaseConditionItems[val]);

									} else {

									}

								}*/
					},
					error: function(oError) {
						BusyIndicator.hide();
						MessageBox.error(oError);

					}

				});

				evt.getSource().getBinding("items").filter([]);
			}
		},
	

		onClicked: function(oEvt) {
			console.log(sMaterialRows);
			// sMaterialRows = oEvt.getSource().getSelectedKey();
			var bSelected = oEvt.getParameter("selected");
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			var aPurchaseConditionItems = oPurchaseModel.getProperty("/TempContract/PoitemSet");
			var iTtem = oPurchaseModel.oData.TempContract.PoitemSet.length;
			for (var val = 0; val < iTtem; val++) {
				var Matitem = aPurchaseConditionItems[val].Material;
				//		var a = aPurchaseConditionItems.indexOf(sMaterial);
				if (sMaterialRows.indexOf(" ") !== -1) {
					sMaterialRows = sMaterialRows.split(" ");
					sMaterialRows = sMaterialRows[0];
				}
				if (Matitem === sMaterialRows) {
					var sMatList = new RebateConditionItemPO(aPurchaseConditionItems[val]);
					oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + val + "/InfoUpd", "B");
					oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + val + "/IrInd", "X");
					oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + val + "/PrntPrice", "X");
					oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + val + "/GrInd", "X");
					oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + val + "/NoMoreGr", "X");

					var oListModel = new JSONModel();
					oListModel.setData(sMatList);
					oView.setModel(oListModel, "PurchaseItems");

				} else {

				}

			}

		},
		/*plant search end*/
		onSelectMaterial: function(oEvt) {
			var sMaterial = oEvt.getSource().getSelectedKey();
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			var aPurchaseConditionItems = oPurchaseModel.getProperty("/TempContract/PoitemSet");
			var iTtem = oPurchaseModel.oData.TempContract.PoitemSet.length;

			for (var val = 0; val < iTtem; val++) {
				var Matitem = aPurchaseConditionItems[val].Material;
				//		var a = aPurchaseConditionItems.indexOf(sMaterial);
				if (sMaterial.indexOf(" ") !== -1) {
					sMaterial = sMaterial.split(" ");
					sMaterial = sMaterial[0];
				}
				if (Matitem === sMaterial) {
					var sMatList = new RebateConditionItemPO(aPurchaseConditionItems[val]);
					oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + val + "/InfoUpd", "B");
					oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + val + "/IrInd", "X");
					oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + val + "/PrntPrice", "X");
					oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + val + "/GrInd", "X");
					oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + val + "/NoMoreGr", "X");

					var oListModel = new JSONModel();
					oListModel.setData(sMatList);
					oView.setModel(oListModel, "PurchaseItems");

				} else {

				}

			}

		},

		/*Material Number Search start*/
	
		handlePOMaterialHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
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
		
			var lenthcount = lenthss - 1;
			var oSelectedItem = evt.getParameter("selectedItem");
			var getPurchase = this.getView().getModel("CreateContract");
			var oModel = oView.getModel("Lookup");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId);
				var sBindPath = oSelectedItem.getBindingContext("Lookup").sPath;
				productInput.setValue(oSelectedItem.getTitle());

				var oDiscription = oModel.getProperty(sBindPath + "/Description");
				var ab = $(this)[0].inputId;
				var id = $("#" + ab).closest("tr").find(".desc1").attr("id");
				$("#" + id + "-inner").val(oDiscription);

				getPurchase.getData().Materialno = oSelectedItem.getTitle();

				var sUnitb = oModel.getProperty(sBindPath + "/UOM");
				var ab1 = $(this)[0].inputId;
				var id1 = $("#" + ab1).closest("tr").find(".measure1").attr("id");
				$("#" + id1 + "-inner").val(sUnitb);
				oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + lenthcount + "/ShortText", oDiscription);

				var sOunit = $(this)[0].inputId;
				var sOunitId = $("#" + sOunit).closest("tr").find(".ClassOU").attr("id");
				$("#" + sOunitId + "-inner").val(sUnitb);

				oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet/" + lenthcount + "/PoUnit", sUnitb);

			}
			evt.getSource().getBinding("items").filter([]);

		},

		/*Material SEarch end*/

		/*material discription start*/

	
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
	
			//	var Service = new ServiceF4();
			Service.getMaterialDisList(this);
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
			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var oPurchaseContract = oPurchaseModel.getProperty("/TempContract/PoitemSet");
			var lenthss = oPurchaseContract.length;
			console.log(lenthss);
			var lenthcount = lenthss - 1;

			var oModel = oView.getModel("Lookup");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId),
					//productInput2 = this.byId(this.inputId),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sDescription);

				//	productInput.setValue(sTitle);
				//**********
				//var productInput = this.byId(this.inputId);
				var sBindPath = oSelectedItem.getBindingContext("Lookup").sPath;
				productInput.setValue(sTitle);

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
		/*Company SEarch end*/

		onAddNewConditionItem: function() {
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");

			var aPurchaseConditionItems = oPurchaseModel.getProperty("/TempContract/PoitemSet");

			function LeadingZeros(num, size) {
				var s = num + "0" + "";
				while (s.length < size) s = "0" + s;
				return s;
			}

			//padLeadingZeros(57, 5); //"0057"
			aPurchaseConditionItems.push(new RebateConditionItemPO({

				//	PoItem: (aPurchaseConditionItems.length + 1).toString()
				PoItem: LeadingZeros(aPurchaseConditionItems.length + 1, 5)
			}));

			oPurchaseModel.refresh(false);

		},

		onDeleteConditionItem: function() {
			var oPurchaseItemTable = this.byId("idTableitem");
			var aSelectedIndex = oPurchaseItemTable.getSelectedIndices().reverse();
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			var aPurchaseConditionItems = oPurchaseModel.getProperty("/TempContract/PoitemSet");
			for (var i = 0; i < aSelectedIndex.length; i++) {
				aPurchaseConditionItems.splice(aSelectedIndex[i], 1);
			}
			oPurchaseItemTable.clearSelection();
			oPurchaseModel.refresh(true);
		},

		onCancelPRess: function(event) {
			oView.byId("VendorName").setValue(" ");
			MessageToast.show("Cancelling Order");
			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			oPurchaseModel.setData({
				oData: {}
			});

			oPurchaseModel.refresh(true);
			var oParterDetails = oView.getModel("ParterDetails");
			oParterDetails.setData({
				oData: {}
			});

			oParterDetails.refresh(true);

			this.getView().getModel("VHeader").refresh();

			oView.byId("PurchOrg").setValue("");

			oView.byId("CompCode").setValue("");
			oView.byId("Vendor").setValue("");
			oView.byId("Currency").setValue("");
			oView.byId("PurGroup").setValue("");
			oView.byId("idStreetHeader").setValue("");
			oView.byId("PostalCode").setValue("");
			oView.byId("idCountryCodeHeader").setValue("");
			oView.byId("AddressNum").setValue("");
			oView.byId("idCityHeader").setValue("");
			oView.byId("Telephone1").setValue("");
			oView.byId("Vendor1").setValue("");
			oView.byId("Name1").setValue("");
			oView.byId("idStreet").setValue("");
			oView.byId("idAddno").setValue("");
			oView.byId("idCountryCode").setValue("");
			oView.byId("idRegion").setValue("");
			oView.byId("idPostcode").setValue("");
			oView.byId("idCity").setValue("");
			oView.byId("idTel").setValue("");
			//	oView.byId("VendorName").setValue("");

			//redirect the page	frot view
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("ShowTiles");

		},
		onSavePurchaseOrder: function(evt) {
			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var oPurchaseContract = oPurchaseModel.getProperty("/TempContract");
			var oModel = this.getOwnerComponent().getModel("PurchaseSet");

			//	var oRequestPayload = oPurchaseContract.getRequestPayload();
			var oRequestPayload = oPurchaseContract.getRequestPayloadPO();

			//method for creating the prod
			BusyIndicator.show(true);
			//delete oRequestPayload.Vendor;
			var vln = oRequestPayload.PoitemSet.length;
			for (var vlen = 0; vlen < vln; vlen++) {
				delete oRequestPayload.PoitemSet[vlen].Vendor;
			}
			oModel.create("/PoDisplaySet", oRequestPayload, {
				success: this._onCreateEntrySuccess.bind(this),
				error: this._onCreateEntryError.bind(this)
			});

			oPurchaseModel.refresh(true);

		},
		_onCreateEntrySuccess: function(oObject, oResponse) {
			BusyIndicator.hide();
			var successObj = oResponse.data.Purchaseorder;

			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			var oTempContract = oPurchaseModel.getProperty("/TempContract");
			oTempContract.setData();
			var s = oPurchaseModel.oData.TempContract.destroy;
			var aaa = oPurchaseModel.oData.TempContract.setData([]);
			//	s.refresh(true);

			oView.byId("VendorName").setValue(" ");

			var idq = "__xmlview1--nDescription-__clone1";
			$("#" + idq + "-inner").val(" ");

			var idqq = "__xmlview1--uom1-__clone3";
			$("#" + idqq + "-inner").val(" ");

			var idqa = "__xmlview1--Price-__clone5";
			$("#" + idqa + "-inner").val(" ");

			oPurchaseModel.refresh(true);
			this.getView().getModel("VHeader").refresh();

			sap.m.MessageBox.show("Standard PO created under the number  #" + successObj + " ", {
				icon: sap.m.MessageBox.Icon.INFORMATION,

				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CLOSE],
				onClose: function(oAction) {
					if (oAction === "OK") {

						BusyIndicator.hide();
						var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
						oRouter.navTo('PoHeaderList');
					}
				}.bind(this)
			});

		},
		_onCreateEntryError: function(oError) {
			BusyIndicator.hide();
			var x = JSON.parse(oError.responseText);
			var err = x.error.message.value;

			jQuery.sap.require("sap.m.MessageBox");

			sap.m.MessageBox.error(
				"Error creating entry: " + err + " "
			);

		},

		onEditPOOrders: function() {
			var oComponent1 = this.getOwnerComponent();
			oComponent1.getRouter().navTo("DisplayPOItems");
		},
		onEditPRess: function() {

			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			var oTempContract = oPurchaseModel.getProperty("/TempContract");
			oTempContract.setData();
			//	oPurchaseModel.setData([]);
			var s = oPurchaseModel.oData.TempContract.destroy;
			//	s.refresh(true);

			oPurchaseModel.refresh(true);
			this.getView().getModel("VHeader").refresh();
			var oComponent1 = this.getOwnerComponent();
			oComponent1.getRouter().navTo("EditPOOrder");

		},

		/*Table PO ITems fragement*/
		AddPOITems: function() {
			this.pressDialog = this.getView().byId("ListDialog");
			if (!this.pressDialog) {
				this.pressDialog = sap.ui.xmlfragment("com.vSimpleApp.view.POTable.PoItems", this);
				//this.getView().addDependent(pressDialog);
				//  this.pressDialog.setModel(this.getView().getModel());
				this.pressDialog.open();
			}
		},

		onCloseFu: function() {
			this.pressDialog.close();
			this.pressDialog.destroy();
		},
		onExit: function() {
				if (this.pressDialog) {
					this.pressDialog.destroy();
				}
			}
			/*Table PO ITems  fragment end*/

	});

});