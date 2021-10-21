sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/m/Button",
	"sap/m/Dialog",
	"sap/m/List",
	"sap/ui/core/routing/HisStorey",
	"sap/m/StandardListItem",
	"sap/m/Text",
	"sap/m/library",
	"sap/ui/core/BusyIndicator",
	"sap/m/MessageToast",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageBox",
	"com/vSimpleApp/model/RebateConditionItem",
	"com/vSimpleApp/model/Scale",
	"com/vSimpleApp/model/Material",
	"com/vSimpleApp/model/EligibleData",
	"com/vSimpleApp/model/AccrualItem",
	"com/vSimpleApp/model/SettlementItem",
	"com/vSimpleApp/model/Contract",
	"com/vSimpleApp/service/dateServices",
	"com/vSimpleApp/model/Formatter"
], function(Controller, JSONModel, Filter, Button, Dialog, List, HisStorey, StandardListItem, Text, mobileLibrary, BusyIndicator,
	MessageToast, MessageBox, FilterOperator, AccrualItem) {
	"use strict";
	var DialogType = mobileLibrary.DialogType;
	// shortcut for sap.m.ButtonType
	var ButtonType = mobileLibrary.ButtonType;

	var oView, Controller;
	return Controller.extend("com.vSimpleApp.controller.MassAccrualPost", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf demonewcassini.view.MassAccrualPost
		 */
		onInit: function() {
			var oUserModel = this.getOwnerComponent().getModel("User");
			var sUsername = oUserModel.getProperty("/Username");
			if (sUsername === "") {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("Login");
			}

			oView = this.getView();

			this._oPnl = this.byId("idPnl");

			//define the model

			var oMassAgreement = new JSONModel();
			this.getView().setModel(oMassAgreement, "AddAgreementAcc");

			var agreement = new JSONModel();
			this.getView().setModel(agreement, "Agreement");

			//get the all nature from json  and set the model
			var oCalculationType = new sap.ui.model.json.JSONModel();
			oCalculationType.loadData("utils/CalculationType.json");
			this.getView().setModel(oCalculationType, "CalculationType");

		},
		_getDialog: function() {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("com.vSimpleApp.fragment.oMassAgreement");
				this.getView().addDependent(this._oDialog);
			}
			return this._oDialog;
		},
		onOpenDialog: function() {
			this._getDialog().open();
		},
		addRow: function(arg) {
			this._data.Products.push({
				Name: '',
				size: ''
			});
			this.jModel.refresh(); //which will add the new record

		},
		mfunc: function() {
			//get models
			var oVendorModel = this.getOwnerComponent().getModel("Vendor");
			var oModel = this.getOwnerComponent().getModel("RebatePostSet");
			var oModel1 = this.getOwnerComponent().getModel("RebatePostSet");
			var oLookupModel = this.getOwnerComponent().getModel("Lookup");
			var oTempContract = oVendorModel.getProperty("/TempContract");
			oTempContract.ContractNo = oVendorModel.oData.TempContract.Rcont;

			var oRequestPayload = new sap.ui.model.json.JSONModel();
			oRequestPayload.loadData(sap.ui.require.toUrl("com/vSimpleApp/model") + "/AccrualModel.json", null, false);
			var test = oRequestPayload.oData;

			oModel1.create("/HeaderDocSet", oRequestPayload, {
				success: function(oData1) {

					MessageToast.show("Document No.: " + oData1.Rcont + " posted successfully");

				},
				error: function(oError) {

					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
		getAccrual: function() {
			BusyIndicator.show(0);
			var that = this;

			var oVendorModel = this.getOwnerComponent().getModel("Vendor");
			var oModel = this.getOwnerComponent().getModel("RebatePostSet");
			var oModel1 = this.getOwnerComponent().getModel("RebatePostSet");
			var oLookupModel = this.getOwnerComponent().getModel("Lookup");
			var oTempContract = oVendorModel.getProperty("/TempContract");
			var oRequestPayload = new sap.ui.model.json.JSONModel();
			oRequestPayload.loadData(sap.ui.require.toUrl("com/vSimpleApp/model") + "/AccrualModel.json", null, false);
			var sChk1 = oView.byId("perid").getValue();
			var sChk2 = oView.byId("peridate").getValue();
			var sChk3 = oView.byId("contid").getValue();
			var test = oRequestPayload.oData;
			var test1 = oRequestPayload.oData;
			var ag = [];
			var ag1 = [];
			var cnt = 0;
			var tmpcnt = 0;

			function exe() {
				var x = ag[cnt];
				test.Rcont = x;
				var len = test.AccrualSet.length;
				for (var j = 0; j < len; j++) {
					test.AccrualSet[j].Rcont = x;
					test.AccrualSet[j].Assignment = x;
				}
				oModel1.create("/HeaderDocSet", test, {
					success: function(oData1) {
						cnt++;
						if (cnt < ag.length) {
							exe(cnt);
						}
						ag1.push(oData1.Rcont);

					},
					error: function(oError) {
						//BusyIndicator.hide();
						var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
						MessageToast.show(errorMsg);
					}
				});
			}
			if (sChk3.indexOf(",") !== -1) {
				var arr = sChk3.split(",");
				for (var i = 0; i < arr.length; i++) {

					ag.push(arr[i]);

				}
				exe();
			} else {
				if (sChk3.indexOf(" ") !== -1) {
					sChk3 = sChk3.replace(" ", "");
				}
				test.Rcont = sChk3;
				var len = test.AccrualSet.length;
				for (var j = 0; j < len; j++) {
					test.AccrualSet[j].Rcont = sChk3;
					test.AccrualSet[j].Assignment = sChk3;
				}

				oModel1.create("/HeaderDocSet", test, {
					success: function(oData1) {
						//BusyIndicator.hide();
						MessageToast.show("Document No.: " + oData1.Rcont + " posted successfully");
					},
					error: function(oError) {
						//BusyIndicator.hide();
						var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
						MessageToast.show(errorMsg);
					}
				});
			}
			setInterval(function() {
				if (ag.length == ag1.length && tmpcnt == 0) {
					BusyIndicator.hide();
					MessageToast.show("Document No: " + ag1.toString() + " posted successfully");
					tmpcnt = 1;
				}

			}, 500);

		},

		OnInputFuction: function() {
			//  var MassAccru = oView.getModel("oMassAgreement");
			var Accrual = oView.byId("mas").getValue();
			var sRes = Accrual.split(",");

			var i = 0;
			for (var i = 0; i < sRes.length; i++) {
				Accrual.addContent(new sap.m.Text({
					text: "text"
				}));

			}
		},
		changeDateFormat: function(valDate) {
			var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "yyyy-MM-dd"
			});
			var date = new Date(valDate);
			var dateStr = dateFormat.format(date);
			return (dateStr + "T00:00:00");
		},
		_onCreateEntrySuccess: function() {

			MessageToast.show("Success");

		},
		_onCreateEntryError: function(oError) {
			//if getting the issue while posting the accruls call the _onCreateEntryError

			MessageBox.error(
				"Error creating entry: " + oError.statusCode + " (" + oError.statusText + ")", {
					details: oError.responseText
				}
			);
		},
		handleLiveChange: function(oEvent) {
			//create a new input field based on value length
			
			const oInput = sap.ui.getCore().byId("inpuhear");
			const sValue = oInput.getValue();

			const sRes = sValue.split(" ");
			console.log(sRes);
			const sStore = [];
			var ll = sRes.length;

			var i = 0;
			for (i = 0; i < sRes.length; i++) {
				if (i === 0) {
					oInput.setValue(sRes[i]);
				} else {
					var oNewInput = new sap.m.Input({

						value: sRes[i]

					});

					oEvent.getSource().getParent().addContent(oNewInput);
				}

			}

			this.onSaveAccrual(sRes);
			return sRes[i];
		},
		onCreateItem: function(oEvent) {
			var oMassAgreement = oView.getModel("Agreement");
			const oInput = sap.ui.getCore().byId("inpuhear");
			const sValue = oInput.getValue();

			const sRes = sValue.split(" ");
			console.log(sRes);
			const sStore = [];
			var ll = sRes.length;

			var i = 0;
			for (i = 0; i < sRes.length; i++) {
				if (i === 0) {
					oInput.setValue(sRes[i]);
				} else {
					var oNewInput = new sap.m.Input({

						value: sRes[i]

					});
					var _oCcLayout = new sap.m.FlexBox({
						alignItems: "Center",
						justifyContent: "Center",
						items: [oNewInput]
					});

					oEvent.getSource().getParent().addContent(_oCcLayout);

					var st = this.getView().byId("contid").setValue(sRes);
					console.log(st);

					this.oDialogFragment.close();
					this.oDialogFragment.destroy();
					this.oDialogFragment = null;
				}

			}
		},

		onSaveMassAcrual: function(evt) {
			var sChk1 = oView.byId("perid").getValue();
			var sChk2 = oView.byId("peridate").getValue();
			var sChk3 = oView.byId("contid").getValue();
			if (sChk1 == "" || sChk2 == "" || sChk3 == "" || sChk3 == " ") {
				alert("Please enter all the values");
				return false;
			} else {

				var vpostdate = oView.byId("peridate").getValue();
				var fpostdate = this.changeDateFormat(vpostdate);
				var periodd = oView.byId("perid").getValue();
				var fakeperiod = periodd.substr(0, 2) + "/01/2020";
				var ldate = new Date(fakeperiod);
				var lastDay = new Date(ldate.getFullYear(), ldate.getMonth() + 1, 0);
				var flastdate = this.changeDateFormat(lastDay);
				var currdate = new Date();
				currdate = this.changeDateFormat(currdate);
				if (fpostdate > currdate) {
					alert("Posting date should be less than current date!");
					return false;
				}

				var multiconts = oView.byId("contid").getValue();
				var divcont = multiconts.split(",");
				var i = 0; //  set your counter to 1
				var oModelCreate = this.getView().getModel("contS");
				var that = this;

				function myLoop() { //  create a loop function

					var oEntry1 = {};
					oEntry1.Contractno = divcont[i];
					oEntry1.Period = periodd.substr(0, 2);
					oEntry1.Message = "";
					oEntry1.Docdate = flastdate;
					oEntry1.Postdate = fpostdate;
					console.log(oEntry1);

					oModelCreate.create("/AccrualsSet", oEntry1, {

						success: MessageToast.show(i + 1 + " of " + divcont.length + " completed"),
						error: that._onCreateEntryError.bind(that)
					});
					i++; //  increment the counter
					if (i < divcont.length) { //  if the counter < 10, call the loop function
						myLoop(); //  ..  again which will trigger another 
					}
				}

				myLoop();
			}

		},

		onSaveAccrual: function(sRes) {
			console.log(sRes);

			var st = this.getView().byId("contid").setValue(sRes);
			var s = st;

		},

		OnCancelMassAcrual: function(event) {
			//clear all the selected values and cancel accrual.
			MessageToast.show("Cancel Acrrual");
			oView.byId("perid").setValue("");
			oView.byId("peridate").setValue("");
			oView.byId("contid").setValue("");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("appHome");

		},

		onResponsivePaddingDialog: function() {
			if (!this.responsivePaddingDialog) {
				this.responsivePaddingDialog = new Dialog({
					title: "On SAP Quartz themes, the padding will adjust based on the width of the Dialog",
					contentWidth: "680px",
					contentHeight: "450px",
					resizable: true,
					draggable: true,
					subHeader: new sap.m.OverflowToolbar({
						content: new Text({
							text: "Experiment with the responsive padding by resizing this Dialog."
						})
					}),

					beginButton: new Button({
						type: ButtonType.Emphasized,
						text: "OK",
						press: function() {
							this.responsivePaddingDialog.close();
						}.bind(this)
					}),
					endButton: new Button({
						text: "Close",
						press: function() {
							this.responsivePaddingDialog.close();
						}.bind(this)
					})
				});

				// Enable responsive padding by adding the appropriate classes to the control
				this.responsivePaddingDialog.addStyleClass(
					"sapUiResponsivePadding--content sapUiResponsivePadding--header sapUiResponsivePadding--footer sapUiResponsivePadding--subHeader"
				);

				//to get access to the global model
				this.getView().addDependent(this.responsivePaddingDialog);
			}

			this.responsivePaddingDialog.open();
		},
		addMultiple: function() {
			//open the oMassAgreement dialog box
			if (!this.oDialogFragment) {

				this.oDialogFragment = sap.ui.xmlfragment("com.vSimpleApp.fragment.oMassAgreement", this);
				var i18nModel = new sap.ui.model.resource.ResourceModel({
					bundleUrl: "i18n/i18n.properties"
				});

				this.oDialogFragment.setModel(i18nModel, "i18n");
			}
			this.oDialogFragment.open();
		},
		onSave: function(oEvent) {
			var sMsg = 'Saved successfully';
			MessageToast.show(sMsg);
			this.oDialogFragment.close();
			this.oDialogFragment.destroy();
			this.oDialogFragment = null;
		},
		onClose: function() {
			//	oView.byId("inpuhear").setValue(" ");
			this.oDialogFragment.close();
			this.oDialogFragment.destroy();
			this.oDialogFragment = null;
		},
		onCloseFragment: function() {
			this.oDialogFragment.close();
		},
		navAgreement: function() {
			//	this.getRouter().initialize();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("AddmultipleAgreement");

		},
		onNavBack: function() {
			var oHisStorey = HisStorey.getInstance();
			var sPreviousHash = oHisStorey.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.hisStorey.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("overview", true);
			}
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.cassini.Rebate.view.MassAccrualPost
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.cassini.Rebate.view.MassAccrualPost
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf demonewcassini.view.MassAccrualPost
		 */
		//	onExit: function() {
		//
		//	}

	});

});