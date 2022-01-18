sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/Fragment",

	"sap/m/MessageToast",
	"com/vSimpleApp/model/VendorP2P",
	"sap/ui/core/routing/History",
	"sap/ui/core/BusyIndicator",
	"com/vSimpleApp/model/BankConditionItem",
	"com/vSimpleApp/Classes/ServiceF4"

], function(Controller, Filter, JSONModel, MessageBox, FilterOperator, Fragment, MessageToast, VendorP2P,
	History,
	BusyIndicator, BankConditionItem, ServiceF4) {
	"use strict";
	var oView, oComponent, oController;
	return Controller.extend("com.vSimpleApp.controller.VendorDetail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.vSimpleApp.view.VM
		 */
		onInit: function() {
			oView = this.getView();
			oComponent = this.getOwnerComponent();
			var oModel = this.getOwnerComponent().getModel("VHeader");
			oController = this;
			//set the model on view to be used by the UI controls
			this.getView().setModel(oModel);

			//	oView.byId("iddEditt").setVisible(false);
			this.getOwnerComponent().getModel("VisibleModel").setProperty("/isButtonEdit", false);

			var oHierarchyModel = new sap.ui.model.json.JSONModel();
			oView.setModel(oHierarchyModel, "hierarchy");

			// var oEditModel = new JSONModel({
			// 	isEditable: true
			// });

			// this.getView().setModel(oEditModel, "EditModel");
			// var oVisibleModel = new JSONModel({
			// 	isVisible: false
			// });

			// this.getView().setModel(oVisibleModel, "VisibleModel");
			// var oScreenModel = new JSONModel({
			// 	isScreen: "Create Vendor"
			// });

			// this.getView().setModel(oScreenModel, "ScreenName");

			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.getRoute("VendorDetail").attachPatternMatched(this._onRouteMatched1, this);

		},
		_onRouteMatched1: function() {
			//******************** customization code **********************************
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
			var json1 = new sap.ui.model.json.JSONModel();
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
							console.log(json1.oData.result);
						},
					error: function(err) {
						//console.log(err);
					}
				});
			}
			defaultfunction('config_file', '1', 'json1');
			var arr = [];
			arr = json1.oData.result;
			var $linputs = $('body').find('label');
			for (i = 0; i < arr.length; i++) {
				var fn = arr[i].FieldName;
				if (arr[i].IsVisible == false || arr[i].IsVisible == 'false') {
					this.byId(fn).setVisible(false);
					var tmp = this.byId(fn).sId + "-inner";
					var ltmp = $("body").find("label[for='" + tmp + "']").attr("id");
					$("#" + ltmp).hide();
					/*var h = this.byId(fn).oParent.sId;
					if(h!==undefined)
					{
						$("#"+h).hide();
					}*/
				}

				/*for(j=0;j<ids.length;j++)
				{
					if(ids[j]==arr[i].FieldName)
					{
						
					}
				}*/
			}
		},

		_onRouteMatched2: function() {

		},

		onAlphabetnumericValidation: function(oEvent) {
			var sValue = oEvent.mParameters.value;
			var sInput = oEvent.getSource().sId;
			var oinputbox = sap.ui.getCore().byId(sInput)
			var pattern = /[^\w]/;
			if (pattern.test(sValue)) {
				oinputbox.setValueState("Error");
				oinputbox.setValueStateText("Enter Valid Value");
			} else {
				oinputbox.setValueState("None");
				oinputbox.setValueStateText("");

			}
		},
		onalphabeticValidation: function(oEvent) {
			var sValue = oEvent.mParameters.value;
			var sInput = oEvent.getSource().sId;
			var oinputbox = sap.ui.getCore().byId(sInput)
			var pattern = /[^A-Za-z]/;
			if (pattern.test(sValue)) {
				oinputbox.setValueState("Error");
				oinputbox.setValueStateText("Enter Valid Value");
			} else {
				oinputbox.setValueState("None");
				oinputbox.setValueStateText("");

			}

		},
		onnumValidate: function(oEvent) {
			var sValue = oEvent.mParameters.value;
			var sInput = oEvent.getSource().sId;
			var oinputbox = sap.ui.getCore().byId(sInput)
			var pattern = /[^\d]/;
			if (pattern.test(sValue)) {
				oinputbox.setValueState("Error");
				oinputbox.setValueStateText("Enter Valid Value");
			} else {
				oinputbox.setValueState("None");
				oinputbox.setValueStateText("");

			}

		},
		onCancelPress: function() {
			//calling the function which cancel the existing values or clear the data from input field 
			//and navigate to dashboard page
			var oVendorModel = oComponent.getModel("VendorModel");

			//clear the model data
			oVendorModel.setData({
				oData: {}
			});
			oVendorModel.updateBindings(true);
			var sVendor = "Create Vendor";

			//setting property to models
			oView.getModel("ScreenName").setProperty("/isScreen", sVendor);
			oView.getModel("EditModel").setProperty("/isEditable", true);
			oView.byId("iddEditt").setVisible(false);
			oVendorModel.refresh(true);
			oView.byId("Lifnra").setValue("");
			oView.byId("Bukrsb").setValue("");
			oView.byId("Ekorgc").setValue("");
			oView.byId("Ktokka").setValue("");

			this.getOwnerComponent().getRouter().navTo("ShowTiles");

		},

		onNavBack: function(oevt) {
			//calling the function to navigate back to the dashboard page
			var sVendor = "Create Vendor";

			//setting property to models
			oView.getModel("ScreenName").setProperty("/isScreen", sVendor);
			var oVendorModel = oComponent.getModel("VendorModel");

			//clear the model data
			oVendorModel.setData({
				oData: {}
			});
			oVendorModel.updateBindings(true);
			oVendorModel.refresh(true);
			this.getOwnerComponent().getRouter().navTo("ShowTiles");

		},

		/*Vendor Details f4 functionality start here*/

		getVendorList: function() {
			var that = this;
			//get data from odata model
			var oModel = this.getOwnerComponent().getModel("VHeader");

			//get entity set
			BusyIndicator.show(true);
			oModel.read("/Fetch_Vendor_DetailsSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/DisplyaVendorList", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},

		handleVendorValueHelpBox: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdVendor = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogDisplayV) {
				this._valueHelpDialogDisplayV = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.Display",
					this
				);
				this.getView().addDependent(this._valueHelpDialogDisplayV);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}
			// create a filter for the binding
			this._valueHelpDialogDisplayV.getBinding("items").filter(new Filter([new Filter(
				"Name1",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogDisplayV.open(sInputValue);
			this.getVendorList();
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
			var oModelV = this.getOwnerComponent().getModel("VHeader");

			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputIdVendor),
					sDescription = oSelectedItem.getInfo();

				sProductInput.setSelectedKey(sDescription);
				sProductInput.setValue(sDescription);

				var zero = "";

				var len = sDescription.length;
				if (len !== undefined) {
					var z = 10 - len;
					for (var i = 0; i < z; i++) {
						zero += "0";
					}
				}
				sDescription = zero + sDescription;
				var sBindPath = oSelectedItem.getBindingContext("Lookup").sPath;
				var sComCode = oModel.getProperty(sBindPath + "/Bukrs");
				var sLifnr = oModel.getProperty(sBindPath + "/Lifnr");
				var sEkorg = oModel.getProperty(sBindPath + "/Ekorg");
				var sKtokk = oModel.getProperty(sBindPath + "/Ktokk");
				oView.byId("Lifnra").setValue(sLifnr);

				var aFilter = [
					new sap.ui.model.Filter({
						path: "Lifnra",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: sDescription
					})
				];
				BusyIndicator.show(true);

				oModelV.read("/VendorRSet", {
					filters: aFilter,
					success: function(oData) {
						BusyIndicator.hide();
						var oVendorModel = oComponent.getModel("VendorModel");
						var oVendorr = new VendorP2P(oData.results[0]);
						//	oComponent.getModel("VendorModel").setData(oVendorr);
						oView.getModel("VendorModel").setProperty("/TempData", oData.results[0]);

						oView.getModel("VendorModel").setProperty("/TempData/Details", oData.results);
						//	oComponent.getModel("VendorModel").setData(oVendorr);
						oView.byId("Ktokka").setValue(sKtokk);
						oView.byId("Ekorgc").setValue(sEkorg);

					},
					error: function(oError) {
						BusyIndicator.hide();

					}
				});

			}
			evt.getSource().getBinding("items").filter([]);

		},
		/*Vendor Details f4 functionality end here*/

		/*Po Search*/

		handlePurchaseOrgVendor: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdPOD = oEvent.getSource().getId();
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

			// open value help dialog filtered by the input value
			this._valueHelpDialogporg.open(sInputValue);
			var Service = new ServiceF4();
			Service.getPurchaseOrgList(this);

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
				var productInput = this.byId(this.inputIdPOD),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);
		},

		/*PO Search end*/

		/*PPlanning Group Search*/
		getPlanningGroups: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("Vendorf4Model");

			//get entity set
			BusyIndicator.show(true);
			oModel.read("/PlanningGroupsSet", {

				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/PlanningGroups", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},
		handlePlanningGroups: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();
			this.inputIdPGG = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogPlanG) {
				this._valueHelpDialogPlanG = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.PlanningGroups",
					this
				);
				this.getView().addDependent(this._valueHelpDialogPlanG);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogPlanG.getBinding("items").filter(new Filter([new Filter(
				"Grupp",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogPlanG.open(sInputValue);
			this.getPlanningGroups();
		},
		handlePlanningSearchGroup: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Grupp",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		handlePlaningGroupsClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputIdPGG),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);
		},

		/*Planning Group Search end*/

		/*Comp Search start*/

		handleCompanyCodeVendor: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdCCode = oEvent.getSource().getId();
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

			// open value help dialog filtered by the input value
			this._valueHelpDialogcomp.open(sInputValue);

			var Service = new ServiceF4();
			Service.getCompanyList(this);
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
				var productInput = this.byId(this.inputIdCCode),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);

		},
		/*Company SEarch end*/

		/*Account Group Search Start*/

		handleAccountCodeVendor: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdAcolist = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogAccCode) {
				this._valueHelpDialogAccCode = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.AccGrp",
					this
				);
				this.getView().addDependent(this._valueHelpDialogAccCode);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogAccCode.getBinding("items").filter(new Filter([new Filter(
				"Ktokk",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Ktokk",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogAccCode.open(sInputValue);

			var Service = new ServiceF4();
			Service.getAccountList(this);
		},
		_handlevendorAccountGSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Ktokk",
				FilterOperator.Contains, sValue
			), new Filter(
				"Ktokk",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handlevendorAccountGClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputIdAcolist),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				sProductInput.setSelectedKey(sDescription);
				sProductInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);
		},
		/*Account Group SEarch end*/

		/*Country Code Start*/
		getCountryList: function() {
			var that = this;
			//get all data from odata model

			var oModel = this.getOwnerComponent().getModel("VHeader");

			//get entity set
			BusyIndicator.show(true);
			oModel.read("/country_keySet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/CountryCodeRegion", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},

		handleValueHelpCountryCode: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdContry = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogcountry) {
				this._valueHelpDialogcountry = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.Country",
					this
				);
				this.getView().addDependent(this._valueHelpDialogcountry);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogcountry.getBinding("items").filter(new Filter([new Filter(
				"Land1",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Landx",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogcountry.open(sInputValue);
			this.getCountryList();
		},
		_handlecountryVendorSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Land1",
				FilterOperator.Contains, sValue
			), new Filter(
				"Landx",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handlecountryVendorClose: function(oEvent) {
			var that = this;
			var oSelectedItem = oEvent.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputIdContry);
				sProductInput.setValue(oSelectedItem.getTitle());
				var sDescription = oSelectedItem.getInfo();

				var oModel = this.getView().getModel("VHeader");
				oView.byId("TimeZone").setValue(sDescription);

				var sItemTitle = oSelectedItem.getTitle();

				var oFilter = new sap.ui.model.Filter('Land1', sap.ui.model.FilterOperator.EQ, sItemTitle);
				oModel.read("/region_keySet?$filter=(Land1 eq '" + sItemTitle + "')", {
					filters: [oFilter],
					success: function(oData) {
						/*	var VendorData = new JSONModel();
							VendorData.setData(oData.results);
							oView.setModel(VendorData);
							oView.getModel("hierarchy").setData(oData);*/
						var oLookupModel = that.getOwnerComponent().getModel("Lookup");
						//set the odata to model property
						oLookupModel.setProperty("/RegionList", oData.results);
						oLookupModel.refresh(true);

					},
					error: function(oError) {
						MessageBox.error(oError);

					}
				});

			}
			oEvent.getSource().getBinding("items").filter([]);

		},

		/*Country code end*/

		/*Region Code start*/

		handleValueHelpCust: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdCust = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpRegion) {
				this._valueHelpRegion = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.Region",
					this
				);
				this.getView().addDependent(this._valueHelpRegion);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpRegion.getBinding("items").filter(new Filter([new Filter(
				"Bland",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Bezei",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpRegion.open(sInputValue);

		},
		_handleValueHelpSearchCust: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Bland",
				FilterOperator.Contains, sValue
			), new Filter(
				"Bezei",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleValueHelpCloseCust: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputIdCust),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sTitle);
				productInput.setValue(sDescription);
				oView.byId("Ort02a").setValue(sTitle);
			}
			evt.getSource().getBinding("items").filter([]);
		},
		/*language f4 start here*/
		getLanguages: function() {
			var that = this;
			//get all data from odata model

			var oModel = this.getOwnerComponent().getModel("Vendorf4Model");

			//get entity set
			BusyIndicator.show(true);
			oModel.read("/LanguageSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/LanguageList", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},

		handleLanguage: function(oEvent) {

			var sInputValue = oEvent.getSource().getValue();

			this.inputIdLanguage = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogLanguage) {
				this._valueHelpDialogLanguage = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.Language",
					this
				);
				this.getView().addDependent(this._valueHelpDialogLanguage);
			}

			// create a filter for the binding
			this._valueHelpDialogLanguage.getBinding("items").filter(
				[
					new Filter("Sptxt", sap.ui.model.FilterOperator.Contains, sInputValue),
					new Filter("Sptxt", sap.ui.model.FilterOperator.Contains, sInputValue)

				]);

			// open value help dialog filtered by the input value
			this._valueHelpDialogLanguage.open(sInputValue);
			this.getLanguages();

		},
		_handleValueHelpSearchLanguage: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilterID = new Filter("Sptxt", sap.ui.model.FilterOperator.EQ, sValue);
			var oFilterName = new Filter("Sptxt", sap.ui.model.FilterOperator.EQ, sValue);
			evt.getSource().getBinding("items").filter([oFilterID, oFilterName]);
		},
		_handleValueHelpCloseLanguage: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputIdLanguage),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);

		},
		/*language f4 end here*/
		/*Customer code starts here*/

		getCustomerList: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("Vendorf4Model");

			//get entity set
			BusyIndicator.show(true);
			oModel.read("/getcustomerSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/CustomerList", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},
		handleCustomer: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdCustomer = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpCustomerList) {
				this._valueHelpCustomerList = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.CustomerList",
					this
				);
				this.getView().addDependent(this._valueHelpCustomerList);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpCustomerList.getBinding("items").filter(new Filter([new Filter(
				"Kunnr",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Name1",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpCustomerList.open(sInputValue);
			this.getCustomerList();
		},
		_handleCustomerVendorSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Kunnr",
				FilterOperator.Contains, sValue
			), new Filter(
				"Name1",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleCustomerVendorClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputIdCustomer),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);

		},
		/*Customer List code ends here*/

		/*Trading partner code start*/

		handleTradingPartners: function(oEvent) {

			var sInputValue = oEvent.getSource().getValue();

			this.inputIdTP = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogtradingpartners) {
				this._valueHelpDialogtradingpartners = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.TradingPartners",

					this
				);
				this.getView().addDependent(this._valueHelpDialogtradingpartners);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogtradingpartners.getBinding("items").filter(new Filter([new Filter(
				"Bukrs",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Butxt",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogtradingpartners.open(sInputValue);

			var Service = new ServiceF4();
			Service.getCompanyList(this);
		},
		_handleValueTPHelpClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputIdTP),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);

		},
		_handleValueTPHelpSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Kunnr",
				FilterOperator.Contains, sValue
			), new Filter(
				"Name1",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},

		/*Trading partner code end*/

		getIndustryList: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("Vendorf4Model");

			//get entity set	
			BusyIndicator.show(true);
			oModel.read("/industrysSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/IndustrySet", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},
		handleValueHelpIndustry: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdInd = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogIndustryS) {
				this._valueHelpDialogIndustryS = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.IndustryList",
					this
				);
				this.getView().addDependent(this._valueHelpDialogIndustryS);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogIndustryS.getBinding("items").filter(new Filter([new Filter(
				"Brsch",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Brtxt",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogIndustryS.open(sInputValue);
			this.getIndustryList();
		},
		_handleValueHelpIndustrySearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Brsch",
				FilterOperator.Contains, sValue
			), new Filter(
				"Brtxt",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleValueHelpIndustryClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputIdInd),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);

		},
		/*Industry code ends here */

		/* Transport zone list code starts here*/
		getTransportZoneList: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("Vendorf4Model");

			//get entity set
			BusyIndicator.show(true);
			oModel.read("/TransportZoneSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/TransportZoneList", oData.results);
					oLookupModel.refresh(true);
				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},

		handleTransportZone: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdTzone = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogTransportZone) {
				this._valueHelpDialogTransportZone = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.TransportZoneList",
					this
				);
				this.getView().addDependent(this._valueHelpDialogTransportZone);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogTransportZone.getBinding("items").filter(new Filter([new Filter(
				"Land1",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Zone1",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogTransportZone.open(sInputValue);
			this.getTransportZoneList();
		},
		_handleTransportZoneSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Land1",
				FilterOperator.Contains, sValue
			), new Filter(
				"Zone1",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleTransportZoneClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputIdTzone),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);

		},
		/*Transport zone list code ends here*/

		/*Fiscal Address F4 function start*/
		handleFiscalAddressValueHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdFA = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogFA) {
				this._valueHelpDialogFA = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.FiscalAddress",
					this
				);
				this.getView().addDependent(this._valueHelpDialogFA);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogFA.getBinding("items").filter(new Filter([new Filter(
				"Name1",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogFA.open(sInputValue);
			this.getVendorList();
		},
		_handleFiscalAddressSearch: function(evt) {
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
		_handleFiscalAddressClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputIdFA);
				productInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);

		},

		/*Fiscal Address F4 function end*/

		/*Tax office  F4 function start*/
		handleTaxOfficeValueHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdTO = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogTaxOfc) {
				this._valueHelpDialogTaxOfc = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.TaxOffice",
					this
				);
				this.getView().addDependent(this._valueHelpDialogTaxOfc);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogTaxOfc.getBinding("items").filter(new Filter([new Filter(
				"Name1",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogTaxOfc.open(sInputValue);

		},
		_handleTaxOfficeSearch: function(evt) {
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
		_handleTaxOfficeClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputIdTO);
				productInput.setValue(oSelectedItem.getInfo());
			}
			evt.getSource().getBinding("items").filter([]);

		},

		/*Tax office F4 function end*/

		/*Alternate payee list code starts here*/

		handleAlternatePayee: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdAPY = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogAlternatePayee) {
				this._valueHelpDialogAlternatePayee = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.AlternatePayeeList",
					this
				);
				this.getView().addDependent(this._valueHelpDialogAlternatePayee);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogAlternatePayee.getBinding("items").filter(new Filter([new Filter(
				"Name1",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogAlternatePayee.open(sInputValue);
			this.getVendorList();
		},
		_handleAlternatePayeeVendorSearch: function(evt) {

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
		_handleAlternatePayeeClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputIdAPY);
				sProductInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);

		},
		/*Alternate payee list code ends here*/

		/*Instruction Key list code starts here*/
		getInstructionKeyList: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("Vendorf4Model");

			//get entity set
			BusyIndicator.show(true);
			oModel.read("/InstructionsKeysSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/InstructionKeyList", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},

		handleInstructionKey: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdIKEYS = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogInstructionKey) {
				this._valueHelpDialogInstructionKey = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.InstructionKeyList",
					this
				);
				this.getView().addDependent(this._valueHelpDialogInstructionKey);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogInstructionKey.getBinding("items").filter(new Filter([new Filter(
				"Dtaws",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Dtws1",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogInstructionKey.open(sInputValue);
			this.getInstructionKeyList();
		},
		_handleInstructionKeySearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Dtaws",
				FilterOperator.Contains, sValue
			), new Filter(
				"Dtws1",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleInstructionKeyClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputIdIKEYS);
				productInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);

		},
		/*Instruction key list code ends here*/

		/*Head Office list code starts here*/

		handleHeadOfficeHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdHO = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogHeadOffice) {
				this._valueHelpDialogHeadOffice = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.HeadOfficeList",
					this
				);
				this.getView().addDependent(this._valueHelpDialogHeadOffice);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogHeadOffice.getBinding("items").filter(new Filter([new Filter(
				"Name1",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogHeadOffice.open(sInputValue);
			this.getVendorList();
		},
		_handleHeadOfficeVendorSearch: function(evt) {
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
		_handleHeadOfficeVendorClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputIdHO);
				productInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);

		},
		/*Head Office list code ends here*/

		/*Release Group list code starts here*/
		getReleaseGroupList: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("Vendorf4Model");

			//get entity set
			BusyIndicator.show(true);
			oModel.read("/ReleaseGroupSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/ReleaseGroupList", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},

		handleReleasegrpValueHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdRG = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogReleaseGroup) {
				this._valueHelpDialogReleaseGroup = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.ReleaseGroupList",
					this
				);
				this.getView().addDependent(this._valueHelpDialogReleaseGroup);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding of Frgrp
			this._valueHelpDialogReleaseGroup.getBinding("items").filter(new Filter([new Filter(
				"Frgrp",
				FilterOperator.Contains, sInputValue
			)]));
			// open value help dialog filtered by the input value
			this._valueHelpDialogReleaseGroup.open(sInputValue);
			this.getReleaseGroupList();
		},
		_handleReleaseGroupVendorSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Frgrp",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleReleaseGroupVendorClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputIdRG);
				sProductInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);

		},
		/*Release Group List code ends here*/

		/*Exemption Authority List code starts here*/
		getExemptionAuthorityList: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("Vendorf4Model");

			//get entity set
			BusyIndicator.show(true);
			oModel.read("/ExemptionAuthoritySet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/ExemptionAuthorityList", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},

		handleExmptAuthority: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdEXA = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogExmpAutho) {
				this._valueHelpDialogExmpAutho = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.ExemptionAuthorityList",
					this
				);
				this.getView().addDependent(this._valueHelpDialogExmpAutho);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogExmpAutho.getBinding("items").filter(new Filter([new Filter(
				"Kunnr",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Name1",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogExmpAutho.open(sInputValue);
			this.getExemptionAuthorityList();
		},
		_handleExemptionVendorSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Kunnr",
				FilterOperator.Contains, sValue
			), new Filter(
				"Name1",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleExemptionVendorClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputIdEXA);
				sProductInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);

		},
		/*Exemption Authority code ends here*/

		/*Payment Terms list code starts here*/
		getPaymentTermsList: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("Vendorf4Model");

			//get entity set
			BusyIndicator.show(true);
			oModel.read("/PaymentTemsSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/PaymentTermsList", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},

		handlePaymenttermsHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdPTER = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogPaymentTerms) {
				this._valueHelpDialogPaymentTerms = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.PaymentTermsList",
					this
				);
				this.getView().addDependent(this._valueHelpDialogPaymentTerms);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogPaymentTerms.getBinding("items").filter(new Filter([new Filter(
				"Zterm",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Text1",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogPaymentTerms.open(sInputValue);
			this.getPaymentTermsList();
		},
		_handlePaymentTermsVendorSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Zterm",
				FilterOperator.Contains, sValue
			), new Filter(
				"Text1",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handlePaymentTermsVendorClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputIdPTER);
				sProductInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);

		},
		/*Payment term list code ends here*/

		/*Tolerance group list code starts here*/
		getToleranceGroupList: function() {
			var that = this;
			//get all data from odata model
			BusyIndicator.show(true);
			var oModel = this.getOwnerComponent().getModel("Vendorf4Model");

			//get entity set
			oModel.read("/TolenrenceGrpSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/ToleranceGroupList", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},

		handleToleranceGrpValueHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdTG = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogToleranceGroup) {
				this._valueHelpDialogToleranceGroup = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.ToleranceGroupList",
					this
				);
				this.getView().addDependent(this._valueHelpDialogToleranceGroup);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogToleranceGroup.getBinding("items").filter(new Filter([new Filter(
				"Usnam",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Rfpro",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogToleranceGroup.open(sInputValue);
			this.getToleranceGroupList();
		},
		_handleToleranceGroupVendorSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Usnam",
				FilterOperator.Contains, sValue
			), new Filter(
				"Rfpro",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleToleranceGroupVendorClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputIdTG);
				sProductInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);

		},
		/*Tolerance group list code ends here*/

		/*HouseBank list code starts here*/
		getHouseBankList: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("Vendorf4Model");

			//get entity set
			BusyIndicator.show(true);
			oModel.read("/HouseBankSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/HouseBankList", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},

		handleHousebank: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdHoB = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogHouseBank) {
				this._valueHelpDialogHouseBank = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.HouseBankList",
					this
				);
				this.getView().addDependent(this._valueHelpDialogHouseBank);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogHouseBank.getBinding("items").filter(new Filter([new Filter(
				"Hbkid",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Bankl",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogHouseBank.open(sInputValue);
			this.getHouseBankList();
		},
		_handleHouseBankVendorSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Hbkid",
				FilterOperator.Contains, sValue
			), new Filter(
				"Bankl",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleHouseBankVendorClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputIdHoB);
				sProductInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);

		},
		/*House Bank list code ends here*/

		/*Dunn recipient list code starts here*/

		handledunnreceipt: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdDunnRe = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogDunnRecipient) {
				this._valueHelpDialogDunnRecipient = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.DunnRecipientList",
					this
				);
				this.getView().addDependent(this._valueHelpDialogDunnRecipient);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogDunnRecipient.getBinding("items").filter(new Filter([new Filter(
				"Name1",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogDunnRecipient.open(sInputValue);
			this.getVendorList();
		},
		_handleDunnRecipientVendorSearch: function(evt) {
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
		_handleDunnRecipientVendorClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputIdDunnRe);
				productInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);

		},
		/*Dunn recipient list code ends here*/

		/*Order Currenct list code starts here*/
		getOrderCurrencyList: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("Vendorf4Model");

			//get entity set
			BusyIndicator.show(true);
			oModel.read("/OrderCurrencySet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/OrderCurrencyList", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					MessageToast.show(oError);
				}
			});
		},

		handleOrderCurrencyValue: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdORC = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogOrderCurrency) {
				this._valueHelpDialogOrderCurrency = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.OrderCurrencyList",
					this
				);
				this.getView().addDependent(this._valueHelpDialogOrderCurrency);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding of Name1 and Lifnr
			this._valueHelpDialogOrderCurrency.getBinding("items").filter(new Filter([new Filter(
				"Name1",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogOrderCurrency.open(sInputValue);

		},
		_handleOrderCurrencyVendorSearch: function(evt) {
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
		_handleOrderCurrencyVendorClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputIdORC),
					sTitle = oSelectedItem.getTitle();

				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);
		},
		/*Order Currency list code ends here*/

		/*Incoterns list code starts here*/
		getIncotermsList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("Vendorf4Model");
			//get entity set
			BusyIndicator.show(true);
			oModel.read("/IncotermsSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/IncotermsList", oData.results);
					oLookupModel.refresh(true);
				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},

		handleIncotermsValue: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdInco = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogIncoterms) {
				this._valueHelpDialogIncoterms = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.IncotermsList",
					this
				);
				this.getView().addDependent(this._valueHelpDialogIncoterms);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding of Inco1 and Ortob
			this._valueHelpDialogIncoterms.getBinding("items").filter(new Filter([new Filter(
				"Inco1",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Ortob",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogIncoterms.open(sInputValue);
			this.getIncotermsList();
		},
		_handleIncotermsVendorSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Inco1",
				FilterOperator.Contains, sValue
			), new Filter(
				"Ortob",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleIncotermsVendorClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputIdInco),

					sTitle = oSelectedItem.getTitle();
				sProductInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);
		},
		/*Incoterms list code ends here*/

		/*Po Search*/
		getPurchaseGroupList: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("Vendorf4Model");
			BusyIndicator.show(true);
			//get entity set
			oModel.read("/PurchasingGroupSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/PurchaseGroupList", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},

		handlePurchaseGroupVendor: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdPGP = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogPgrp) {
				this._valueHelpDialogPgrp = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.PurchaseGroup",
					this
				);
				this.getView().addDependent(this._valueHelpDialogPgrp);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogPgrp.getBinding("items").filter(new Filter([new Filter(
				"Ekgrp",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Eknam",
				FilterOperator.Contains, sInputValue
			)]));
			// open value help dialog filtered by the input value
			this._valueHelpDialogPgrp.open(sInputValue);
			this.getPurchaseGroupList();
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
				var sProductInput = this.byId(this.inputIdPGP),
					sTitle = oSelectedItem.getTitle();

				sProductInput.setValue(sTitle);
			}
			evt.getSource().getBinding("items").filter([]);
		},

		/*PO Search end*/

		/*Shipping Condition list code starts here*/
		getShippingConditionList: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("Vendorf4Model");

			//get entity set
			BusyIndicator.show(true);
			oModel.read("/ShippingConditionsSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/ShippingConditionList", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},

		handleShippingCondition: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdSPC = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogShippingCondition) {
				this._valueHelpDialogShippingCondition = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.ShippingConditionList",
					this
				);
				this.getView().addDependent(this._valueHelpDialogShippingCondition);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding of Vsbed
			this._valueHelpDialogShippingCondition.getBinding("items").filter(new Filter([new Filter(
				"Vsbed",
				FilterOperator.Contains, sInputValue
			)]));
			// open value help dialog filtered by the input value
			this._valueHelpDialogShippingCondition.open(sInputValue);
			this.getShippingConditionList();
		},
		_handleShippingConditionVendorSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Vsbed",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleShippingConditionVendorClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputIdSPC),
					sTitle = oSelectedItem.getTitle();

				sProductInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);
		},
		/*Shipping Condition list code ends here*/

		/*Release Group list code starts here*/
		getModeOfTransport: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("Vendorf4Model");

			//get entity set
			BusyIndicator.show(true);
			oModel.read("/ModeOfTransportSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/ModeOfTransportList", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},

		handleModeOfTrnsprtBorder: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdMOT = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogModeOfTransport) {
				this._valueHelpDialogModeOfTransport = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.ModeOfTransport",
					this
				);
				this.getView().addDependent(this._valueHelpDialogModeOfTransport);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}
			// create a filter for the binding of Frgrp
			this._valueHelpDialogModeOfTransport.getBinding("items").filter(new Filter([new Filter(
				"Vktra",
				FilterOperator.Contains, sInputValue
			)]));
			// open value help dialog filtered by the input value
			this._valueHelpDialogModeOfTransport.open(sInputValue);
			this.getModeOfTransport();
		},
		_handleModeOfTransportSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Vktra",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleModeOfTransportClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputIdMOT),
					sTitle = oSelectedItem.getTitle();
				sProductInput.setValue(sTitle);
			}
			evt.getSource().getBinding("items").filter([]);
		},
		/*Release Group List code ends here*/

		/*Customer Office Entry code starts here*/
		getCustomerOfficeEntryList: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("Vendorf4Model");
			BusyIndicator.show(true);
			oModel.read("/CustomerOfficeSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/CustomerOfficeEntryList", oData.results);
					oLookupModel.refresh(true);
				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},

		handleCustomerOfficeofEntry: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdCOEN = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogCustomerOfficeEntry) {
				this._valueHelpDialogCustomerOfficeEntry = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.CustomerOfficeEntryList",
					this
				);
				this.getView().addDependent(this._valueHelpDialogCustomerOfficeEntry);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding of Land1 and Zolla
			this._valueHelpDialogCustomerOfficeEntry.getBinding("items").filter(new Filter([new Filter(
				"Land1",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Zolla",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogCustomerOfficeEntry.open(sInputValue);
			this.getCustomerOfficeEntryList();
		},
		_handleCustomerOfficeEntryVendorSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Land1",
				FilterOperator.Contains, sValue
			), new Filter(
				"Zolla",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleCustomerOfficeEntryVendorClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputIdCOEN),

					sTitle = oSelectedItem.getTitle();

				sProductInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);
		},

		/*CustomerOffice Entry code ends here*/

		/*Activity group list code starts here*/
		getActivityCodeList: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("Vendorf4Model");

			//get entity set
			BusyIndicator.show(true);
			oModel.read("/ActivityGroupSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/ActivityCodeList", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},

		handleActivityCode: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdACode = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogActivityCode) {
				this._valueHelpDialogActivityCode = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.ActivityCodeList",
					this
				);
				this.getView().addDependent(this._valueHelpDialogActivityCode);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding of Actvt
			this._valueHelpDialogActivityCode.getBinding("items").filter(new Filter([new Filter(
				"Actvt",
				FilterOperator.Contains, sInputValue
			)]));
			// open value help dialog filtered by the input value
			this._valueHelpDialogActivityCode.open(sInputValue);
			this.getActivityCodeList();
		},
		_handleActivityCodeSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Actvt",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleActivityCodeClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputIdACode),
					sTitle = oSelectedItem.getTitle();
				sProductInput.setValue(sTitle);
			}
			evt.getSource().getBinding("items").filter([]);
		},
		/*Activity group list code ends here*/

		/*Interest indic set*/
		handleinterestindic: function(oEvent) {

			var sInputValue = oEvent.getSource().getValue();

			this.inputIdInd = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogInterestL) {
				this._valueHelpDialogInterestL = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.interestlndic",
					this
				);
				this.getView().addDependent(this._valueHelpDialogInterestL);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}
			// create a filter for the binding
			this._valueHelpDialogInterestL.getBinding("items").filter(new Filter([new Filter(
				"Vzskz",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Vzskz",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogInterestL.open(sInputValue);
			this.getInterestLndicList();
		},
		_handleValueILHelpSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Vzskz",
				FilterOperator.Contains, sValue
			), new Filter(
				"Vzskz",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleValueILHelpClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputIdInd),
					sTitle = oSelectedItem.getTitle();
				sProductInput.setValue(sTitle);
			}
			evt.getSource().getBinding("items").filter([]);
		},
		getInterestLndicList: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("Vendorf4Model");

			//get entity set
			BusyIndicator.show(true);
			oModel.read("/IntrestsIndicSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/InterestlndicList", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},
		/*Interest indic set end*/

		/*Contact Person f4 functionality start here*/

		handleContPersonValueHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdCPERs = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogCP) {
				this._valueHelpDialogCP = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.ContPerson",
					this
				);
				this.getView().addDependent(this._valueHelpDialogCP);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogCP.getBinding("items").filter(new Filter([new Filter(
				"Name1",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogCP.open(sInputValue);
			//this.getVendorList();
		},
		_handleValueContPersonHelpSearch: function(evt) {
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
		_handleValueContPersonHelpClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputIdCPERs),

					sTitle = oSelectedItem.getTitle();

				sProductInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);

		},
		/*Contact Person f4 functionality end here*/

		/*RecconAccount functionality start here*/

		handleReconAccountValueHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogReAcc) {
				this._valueHelpDialogReAcc = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.ReconAccount",
					this
				);
				this.getView().addDependent(this._valueHelpDialogReAcc);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogReAcc.getBinding("items").filter(new Filter([new Filter(
				"GLAccount",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogReAcc.open(sInputValue);
		},
		_handleReconAccountSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"GLAccount",
				FilterOperator.Contains, sValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleReconAccountClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");

			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputId),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				sProductInput.setSelectedKey(sDescription);
				sProductInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);

		},
		/*RecconAccount f4 functionality end here*/

		/*SortKey List code starts here*/
		handleSorkeyValueHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogSortKey) {
				this._valueHelpDialogSortKey = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.SortKeyList",
					this
				);
				this.getView().addDependent(this._valueHelpDialogSortKey);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogSortKey.getBinding("items").filter(new Filter([new Filter(
				"sortno",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogSortKey.open(sInputValue);
		},
		_handleSortKeySearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"sortno",
				FilterOperator.Contains, sValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleSortKeyClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputId),
					sTitle = oSelectedItem.getTitle();

				sProductInput.setValue(sTitle);
			}
			evt.getSource().getBinding("items").filter([]);
		},
		/*SortKey Liat code ends here*/

		/*CashManagement list code starts here*/

		handlecashmangmentgrpValueHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogCashManagement) {
				this._valueHelpDialogCashManagement = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.CashManagementGroup",
					this
				);
				this.getView().addDependent(this._valueHelpDialogCashManagement);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogCashManagement.getBinding("items").filter(new Filter([new Filter(
				"plangrp",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogCashManagement.open(sInputValue);
		},
		_handleCashManagementSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"plangrp",
				FilterOperator.Contains, sValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleCashManagementClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputId),
					sTitle = oSelectedItem.getTitle();

				sProductInput.setValue(sTitle);
			}
			evt.getSource().getBinding("items").filter([]);
		},
		/*Cash Management code ends here*/

		/*Partner function code starts here*/
		handlepurchasefunction: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogPartnerFunction) {
				this._valueHelpDialogPartnerFunction = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.PartnerFunction",
					this
				);
				this.getView().addDependent(this._valueHelpDialogPartnerFunction);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogPartnerFunction.getBinding("items").filter(new Filter([new Filter(
				"function",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogPartnerFunction.open(sInputValue);
		},
		_handlePartnerFunctionSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"function",
				FilterOperator.Contains, sValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handlePartnerFunctionClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputId),
					sTitle = oSelectedItem.getTitle();

				sProductInput.setValue(sTitle);
			}
			evt.getSource().getBinding("items").filter([]);
		},
		/*Partner function code ends here*/

		/*Pricing date control code starts here*/
		handlePricingdatecontrol: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogPricingDate) {
				this._valueHelpDialogPricingDate = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.PricingDateControl",
					this
				);
				this.getView().addDependent(this._valueHelpDialogPricingDate);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogPricingDate.getBinding("items").filter(new Filter([new Filter(
				"pricingno",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogPricingDate.open(sInputValue);
		},
		_handleValueHelpSearchPrice: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"pricingno",
				FilterOperator.Contains, sValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleValueHelpClosePrice: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputId),
					sTitle = oSelectedItem.getTitle();

				sProductInput.setValue(sTitle);
			}
			evt.getSource().getBinding("items").filter([]);
		},
		/*Pricing date control code ends here*/

		/*Payment methods code starts here*/
		handlePaymentmethod: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogPaymentMethods) {
				this._valueHelpDialogPaymentMethods = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.PaymentMethods",
					this
				);
				this.getView().addDependent(this._valueHelpDialogPaymentMethods);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogPaymentMethods.getBinding("items").filter(new Filter([new Filter(
				"paymentmethodno",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogPaymentMethods.open(sInputValue);
		},
		_handleValueHelpSearchPayment: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"paymentmethodno",
				FilterOperator.Contains, sValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleValueHelpClosePayment: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputId),
					sTitle = oSelectedItem.getTitle();

				sProductInput.setValue(sTitle);
			}
			evt.getSource().getBinding("items").filter([]);
		},
		/*Payment methods code ends here*/
		/*Time Zone f4 functionality start here*/
		getTimeZone: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("Vendorf4Model");

			//get entity set
			BusyIndicator.show(true);
			oModel.read("/TimeZoneSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/TimeZoneList", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},
		handleValueHelpTimeZone: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputIdTimZ = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogTimeZone) {
				this._valueHelpDialogTimeZone = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.TimeZone",
					this
				);
				this.getView().addDependent(this._valueHelpDialogTimeZone);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogTimeZone.getBinding("items").filter(new Filter([new Filter(
				"Tzone",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Zonerule",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogTimeZone.open(sInputValue);
			this.getTimeZone();
		},
		handleValueHelpTimeZoneSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Tzone",
				FilterOperator.Contains, sValue
			), new Filter(
				"Zonerule",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		handleValueHelpTimeZoneClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputIdTimZ),

					sTitle = oSelectedItem.getTitle();

				sProductInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);

		},

		/*Time zone f4 functionality end here*/

		/*BankKey List code starts here*/
		getBankKeyList: function() {
			var that = this;
			//get all data from odata model
			var oModel = this.getOwnerComponent().getModel("Vendorf4Model");

			//get entity set
			BusyIndicator.show(true);
			oModel.read("/bankkeySet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					//set the odata to model property
					oLookupModel.setProperty("/BankKeyList", oData.results);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					var sErrorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(sErrorMsg);
				}
			});
		},
		handleBankKey: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogBankkey) {
				this._valueHelpDialogBankkey = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.BankKeyList",
					this
				);
				this.getView().addDependent(this._valueHelpDialogBankkey);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogBankkey.getBinding("items").filter(new Filter([new Filter(
				"Bankl",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Banks",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialogBankkey.open(sInputValue);
			this.getBankKeyList();
		},
		_handleBankKeyVendorSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Bankl",
				FilterOperator.Contains, sValue
			), new Filter(
				"Banks",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleBankKeyVendorClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputId),

					sTitle = oSelectedItem.getTitle();

				sProductInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);
		},
		/*BankKey List code ends here*/

		/*taxnotype*/

		handleTaxnotype: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputTaxnotype = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpTaxnotype) {
				this._valueHelpTaxnotype = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.Taxnotype",
					this
				);
				this.getView().addDependent(this._valueHelpTaxnotype);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpTaxnotype.getBinding("items").filter(new Filter([new Filter(
				"taxnoType",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpTaxnotype.open(sInputValue);

		},
		_handleTaxnoTypeSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"taxnoType",
				FilterOperator.Contains, sValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleTaxnoTypeClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputTaxnotype),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);

		},
		/*Trading partner code start*/

		/*tax type code start*/

		/*tax type code start*/

		handleTaxtype: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputTaxtype = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpTaxtype) {
				this._valueHelpTaxtype = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.Taxtype",
					this
				);
				this.getView().addDependent(this._valueHelpTaxtype);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpTaxtype.getBinding("items").filter(new Filter([new Filter(
				"Taxtype",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpTaxtype.open(sInputValue);

		},
		_handleTaxTypeSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Taxtype",
				FilterOperator.Contains, sValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleTaxTypeClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputTaxtype),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);

		},

		/*tax type code ends*/

		/*Actual qm sys start*/
		handleidAcutalQMsys: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputAutalQmSys = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpAcutalQmSys) {
				this._valueHelpAcutalQmSys = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.AcutalQmSys",
					this
				);
				this.getView().addDependent(this._valueHelpAcutalQmSys);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpAcutalQmSys.getBinding("items").filter(new Filter([new Filter(
				"ActQmSys",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"ShortText",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpAcutalQmSys.open(sInputValue);
		},
		_handleAcutalQmSysSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"ActQmSys",
				FilterOperator.Contains, sValue
			), new Filter(
				"ShortText",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleAcutalQmSysClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputAutalQmSys),

					sTitle = oSelectedItem.getTitle();

				sProductInput.setValue(sTitle);

			}

		},

		/*Actual qm sys ends*/

		/*sex type code start*/

		handleiidsex: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputSexType = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpsex) {
				this._valueHelpsex = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.SexType",
					this
				);
				this.getView().addDependent(this._valueHelpsex);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpsex.getBinding("items").filter(new Filter([new Filter(
				"sex",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpsex.open(sInputValue);

		},

		_handleSexTypeSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"sex",
				FilterOperator.Contains, sValue
			), new Filter(
				"Description",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleSexTypeClose: function(evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputSexType),
					sDescription = oSelectedItem.getInfo(),
					sTitle = oSelectedItem.getTitle();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sTitle);

			}
			evt.getSource().getBinding("items").filter([]);

		},

		/*sex type code end*/

		/*Title type code start*/

		handleTitles: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputTitleType = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpTitle) {
				this._valueHelpTitle = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.Title",
					this
				);
				this.getView().addDependent(this._valueHelpTitle);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpTitle.getBinding("items").filter(new Filter([new Filter(
				"text",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"key",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpTitle.open(sInputValue);

		},

		handleTitlesSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"text",
				FilterOperator.Contains, sValue
			), new Filter(
				"key",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		handleTitlesClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var sProductInput = this.byId(this.inputTitleType),
					sTitle = oSelectedItem.getTitle();
				sProductInput.setValue(sTitle);

			}

			evt.getSource().getBinding("items").filter([]);
		},

		/*Title type code end*/
		onCreatePress: function() {
			var oComponent1 = this.getOwnerComponent();
			//navigate to createcontractvendor page
			oComponent1.getRouter().navTo("CreateContractVendor");
		},
		onDisplayPress: function(oEvent) {
			var sVendor = "Display Vendor";
			//setting property to models
			oView.getModel("ScreenName").setProperty("/isScreen", sVendor);

			oView.getModel("VisibleModel").setProperty("/isVisible", true);
			//	oView.byId("btn_display").setVisible(false);
			//		oView.byId("iddEditt").setVisible(true);
			this.getOwnerComponent().getModel("VisibleModel").setProperty("/isButtonDisplay", false);
			this.getOwnerComponent().getModel("VisibleModel").setProperty("/isButtonEdit", true);

			oView.getModel("EditModel").setProperty("/isEditable", false);

		},
		onEditPress: function(oEvent) {
			//calling the function to display all fields in edit mode
			var sVendor = "Edit Vendor";
			//setting property to models
			oView.getModel("ScreenName").setProperty("/isScreen", sVendor);
			oView.getModel("VisibleModel").setProperty("/isVisible", true);
			this.getOwnerComponent().getModel("VisibleModel").setProperty("/isButtonEdit", false);

			//	oView.byId("iddEditt").setVisible(false);
			oView.getModel("EditModel").setProperty("/isEditable", true);

		},

		onAddNewItemBnk: function() {
			var oPurchaseModel = this.getOwnerComponent().getModel("VendorModel");

			var aPurchaseConditionItems = oPurchaseModel.getProperty("/TempData/Details");

			function LeadingZeros(num, size) {
				var s = num + "";
				while (s.length < size) s = "0" + s;
				return s;
			}

			//padLeadingZeros(57, 5); //"0057"
			aPurchaseConditionItems.push(new BankConditionItem({

				//	PoItem: (aPurchaseConditionItems.length + 1).toString()
				BankItem: LeadingZeros(aPurchaseConditionItems.length + 1, 5)
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

		onSaveContract: function(oEvt) {
			var oModel = this.getView().getModel("VHeader");
			var oVendorModel = this.getOwnerComponent().getModel("VendorModel");
			//	var oVendors = oVendorModel.getData();
			var oVendorData = oVendorModel.getProperty("/TempData");
			//	var oVendors = oVendorcint.getData();
			var oVendor = oVendorData.Lifnra;
			//define and bind the model
			var oVModel = new VendorP2P(oVendorData);

			if (oVendor === null || oVendor === undefined || oVendor === "") {
				var oContractCreate = oVModel.getCreateRequestPayload();
				BusyIndicator.show(true);
				oModel.create("/Vendor_crudSet", oContractCreate, {
					success: this._onCreateEntrySuccess.bind(this),
					error: this._onCreateEntryError.bind(this)

				});
			} else {
				var oContract = oVModel.getUpdateRequestPayload();

				var mParameters = {
					success: this._onCreateEntrySuccess.bind(this),
					error: this._onCreateEntryError.bind(this),
					merge: false
				};
				var sVendorCreate = "/Vendor_crudSet(Lifnra='" + oVendor + "')";
				BusyIndicator.show(true);
				oModel.update(sVendorCreate, oContract, mParameters);
			}

		},

		_onCreateEntrySuccess: function(oObject, oResponse) {
			BusyIndicator.hide();
			var oVendorModel = oView.getModel("VendorModel");

			var sMessage = JSON.parse(oResponse.headers["sap-message"]).message;
			/*if (sMessage === "Vendors found with same address; check") {
				MessageBox.warning(sMessage);
			} else if (sMessage === "Changes have been made") {
				sap.m.MessageBox.show(sMessage, {
					icon: sap.m.MessageBox.Icon.INFORMATION,

					actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CLOSE],
					onClose: function(oAction) {
						if (oAction === "OK") {

							oVendorModel.setData({
								oData: {}
							});
							oVendorModel.updateBindings(true);
							oVendorModel.refresh(true);

						}
					}.bind(this)
				});
			} else {*/
			sap.m.MessageBox.show(sMessage, {
				icon: sap.m.MessageBox.Icon.INFORMATION,

				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CLOSE],
				onClose: function(oAction) {
					if (oAction === "OK") {
						oVendorModel.setData({
							oData: {}
						});
						oVendorModel.updateBindings(true);
						oVendorModel.refresh(true);
						window.location.reload();
					}
				}.bind(this)
			});
			//	}

		},
		_onCreateEntryError: function(oError) {
			BusyIndicator.hide();
			//if getting the issue while posting the accruls call the _onCreateEntryError
			var x = JSON.parse(oError.responseText);
			var err = x.error.message.value;

			MessageBox.error(
				"Error creating entry: " + err + " "
			);
		}

		/*Region Code end*/
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.vSimpleApp.view.VM
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.vSimpleApp.view.VM
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.vSimpleApp.view.VM
		 */
		//	onExit: function() {
		//
		//	}

	});

});