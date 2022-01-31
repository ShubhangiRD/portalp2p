sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/BusyIndicator",
	"sap/m/MessageToast",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Filter",
	"sap/m/library",
	"sap/ui/core/Fragment",
	"sap/m/ColumnListItem",
	"jquery.sap.global",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	"com/vSimpleApp/model/PurchaseHeader",

	"com/vSimpleApp/model/GRDisplayItem"
], function(Controller, JSONModel, BusyIndicator, MessageToast, FilterOperator, Filter, library, Fragment,
	MessageBox, History, PurchaseHeader, GRDisplayItem) {
	"use strict";
	var oView, Ebeln, oComponent;
	var ListofVendor = [];

	return Controller.extend("com.vSimpleApp.controller.GoodReceipt", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.vSimpleApp.view.view.GoodReceipt
		 */
		onInit: function() {
			oView = this.getView();
			var oModel = this.getOwnerComponent().getModel("VHeader");
			//set the model on view to be used by the UI controls
			this.getView().setModel(oModel);
			oComponent = this.getOwnerComponent();

			this.getVendorList();
			var oGRItemsModel = new JSONModel();
			oView.setModel(oGRItemsModel, "GRItemsModel");

			//define the model to  field editable or not
			var oEditModel = new JSONModel({
				isEditable: true
			});

			this.getView().setModel(oEditModel, "EditModel");

			var oVisi = new JSONModel({
				isvisible: false
			});

			this.getView().setModel(oVisi, "visiblemodel");

			var AllDataModel = new sap.ui.model.json.JSONModel([]);
			oView.setModel(AllDataModel, "AllDataModel");
			var oMatData = new JSONModel();
			oView.setModel(oMatData, "MatData");
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.getRoute("GoodReceipt").attachPatternMatched(this._onRouteMatched1, this);
		},
			goHome: function(oEvent) {
			this.getRouter().navTo("ShowTiles");
		},
		_onRouteMatched1: function() {
			//window.location.reload();
			//******************** customization code **********************************
			//alert("dsad");
			var $inputs = $('html :input');

			var ids = {};
			var i = 0;

			$inputs.each(function(index) {
				if ($(this).attr('id').indexOf("inner") !== -1 && $(this).attr('id').indexOf("--") !== -1) {
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
			var json3 = new sap.ui.model.json.JSONModel();
			var json5 = new sap.ui.model.json.JSONModel();
			var that = this;

			function defaultfunction(file, rule, varb) {
				$.ajax({
					url: 'http://localhost:81/' + file + '.php?rule=' + rule,
					async: false,
					success: function(datas) //on recieve of reply
						{
							if (rule === 5) {
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
			defaultfunction('config_file', '3', 'json3');
			var arr = [];
			var chk = [];
			arr = json3.oData.result;
			var that = this;
			//setTimeout(function(){ 
			for (i = 0; i < arr.length; i++) {
				var fn = arr[i].FieldName;
				if (arr[i].IsVisible == false || arr[i].IsVisible == 'false') {
					if (that.byId(fn) !== undefined) {
						var h = that.byId(fn).oParent.sId;
						if (h !== undefined) {
							chk.push(h);
							$("#" + h).hide();
							$("#" + h).html("");
						}
						that.byId(fn).setVisible(false);
						var tmp = that.byId(fn).sId + "-inner";
						var ltmp = $("body").find("label[for='" + tmp + "']").attr("id");
						$("#" + ltmp).hide();

					}
					if (that.byId(fn + "1") !== undefined) {
						var h = that.byId(fn + "1").oParent.sId;
						if (h !== undefined) {
							chk.push(h);
							$("#" + h).hide();
							$("#" + h).html("");
						}
						that.byId(fn + "1").setVisible(false);
						var tmp = that.byId(fn + "1").sId + "-inner";
						var ltmp = $("body").find("label[for='" + tmp + "']").attr("id");
						$("#" + ltmp).hide();

					}
					if (that.byId("id" + fn) !== undefined) {
						var h = that.byId("id" + fn).oParent.sId;
						if (h !== undefined) {
							chk.push(h);
							$("#" + h).hide();
							$("#" + h).html("");
						}
						that.byId("id" + fn).setVisible(false);
						var tmp = that.byId("id" + fn).sId + "-inner";
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
			//}, 1000);
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
			//clear  model data and back to home page
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			oPurchaseModel.setData({
				oData: {}
			});

			oPurchaseModel.refresh(true);
			var allmodel = oView.getModel("AllDataModel");
			allmodel.setData({
				TempContract: {}
			});
			allmodel.updateBindings(true);

			allmodel.refresh(true);

			var aGRItemsModel = oView.getModel("GRItemsModel");
			aGRItemsModel.setData({
				TempContract: {}
			});
			aGRItemsModel.updateBindings(true);

			aGRItemsModel.refresh(true);
			oView.byId("idPD").setValue(" ");
			oView.byId("idlant").setValue("");
			oView.getModel("visiblemodel").setProperty("/isvisible", false);
			this.getView().getModel("VHeader").refresh();
			this.getOwnerComponent().getRouter().navTo("ShowTiles");

		},

		onMenuButtonPress: function() {
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			oPurchaseModel.setData({
				oData: {}
			});

			oPurchaseModel.refresh(true);
			var allmodel = oView.getModel("AllDataModel");
			allmodel.setData({
				TempContract: {}
			});
			allmodel.updateBindings(true);
			allmodel.refresh(true);
			var oGRItemsModel = oView.getModel("GRItemsModel");
			oGRItemsModel.setData({
				TempContract: {}
			});
			oGRItemsModel.updateBindings(true);

			oGRItemsModel.refresh(true);

			oView.byId("idlant").setValue("");

			oView.byId("idlant").setValue("");

			var oComponent2 = this.getOwnerComponent();
			oComponent2.getRouter().navTo("ShowTiles");
		},
		/*Storage Location start*/

		handleStorageLocationValue: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();
			this.inputId = oEvent.getSource().getId();

			//create value help dialog 
			if (!this._valueHelpDialogStorage) {
				this._valueHelpDialogStorage = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.StorageLocation",
					this
				);
				this.getView().addDependent(this._valueHelpDialogStorage);
			}
			this.getStorageLocation();
			if (sInputValue.includes(")")) {
				var sSubstring = sInputValue.split(")")[1];
				sInputValue = sSubstring.trim();
			}
			// ccreate a filter for the binding
			this._valueHelpDialogStorage.getBinding("items").filter(new Filter([new Filter(
					"Lgort",
					FilterOperator.Contains, sInputValue),
				new Filter(
					"Lgobe",
					FilterOperator.Contains, sInputValue
				)
			]));
			this._valueHelpDialogStorage.open(sInputValue);
		},

		_handleStorageLocationSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Lgort",
				FilterOperator.Contains, sValue
			), new Filter(
				"Lgobe",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},
		_handleStorageLocationClose: function(oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem");
			if (oSelectedItem) {
				var productInput = this.byId(this.inputId);
				productInput.setValue(oSelectedItem.getTitle());

			}
			oEvent.getSource().getBinding("items").filter([]);

		},

		getStorageLocation: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");

			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var oTempModel = oPurchaseModel.getProperty("/TempContract");

			var aItems = oTempModel.PoitemSet;

			for (var i = 0; i < aItems.length; i++) {

				var s_Plant = oTempModel.PoitemSet[i].Plant;

			}

			var oFilter = new sap.ui.model.Filter('Werks', sap.ui.model.FilterOperator.EQ, s_Plant);
			BusyIndicator.show(true);
			oModel.read("/storage_f4helpSet?$filter=(Werks eq '" + s_Plant + "')", {
				filters: [oFilter],

				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/StorageLocationList", oData.results);
					oLookupModel.refresh(true);
				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusCode + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		/*Storage Location End*/

		/*start purchase order f4 click*/
		getPurchaseOrderList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(true);

			oModel.read("/openpo_headerSet", {
				success: function(oData) {

					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/PoDocumentNumber", oData.results);
					oLookupModel.refresh(true);
					//that.getMaterialList();
				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},
		handlePursOrderValueHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();
			if (sInputValue === " ") {
				sInputValue = "";
			}

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.PurchaseDocument",
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
				"Ebeln",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sInputValue
			)]));

			// open value help dialog filtered by the input value
			this._valueHelpDialog.open(sInputValue);
			this.getPurchaseOrderList();

		},
		_handleValueHelpSearchPurs: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter = new Filter([new Filter(
				"Ebeln",
				FilterOperator.Contains, sValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sValue
			)]);
			evt.getSource().getBinding("items").filter(oFilter);
		},

	
		_handleValueHelpClosePurs: function(oEvent) {
			var oModelPO = this.getOwnerComponent().getModel("PurchaseSet");
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");

			var AllModel = oView.getModel("AllDataModel");
			var path = AllModel.oData;

			var oSelectedItem = oEvent.getParameter("selectedItem");
			var oModel = this.getOwnerComponent().getModel("VHeader");

			var oModellookup = oView.getModel("Lookup");

			if (oSelectedItem) {

				var productInput = this.byId(this.inputId);
				var sBindPath = oSelectedItem.getBindingContext("Lookup").sPath;
				productInput.setValue(oSelectedItem.getTitle());
				//var eelnvalue = oSelectedItem.getTitle();
				oView.getModel("EditModel").setProperty("/isEditable", true);

				Ebeln = oModellookup.getProperty(sBindPath + "/Ebeln");
				var sVendor = oModellookup.getProperty(sBindPath + "/Lifnr");
				if (sVendor !== "" || sVendor !== undefined) {
					for (var y = 0; y < ListofVendor.length; y++) {
						if (sVendor === ListofVendor[y].Lifnr) {
							var sVendorName = ListofVendor[y].Name1;
							AllModel.setProperty(path + "/VendorName");
							oView.getModel("AllDataModel").setProperty("/VendorName", sVendorName);
						}
					}
				}

				var Purchaseorder = Ebeln;
				return new Promise(function(resolve1, reject1) {
					BusyIndicator.show(true);
					oModel.read("/fetch_openPOSet(Purchaseorder='" + Purchaseorder + "')", {
						urlParameters: {
							"$expand": "fpoItemSet"
						},

						success: function(oData) {
							BusyIndicator.hide();
							oView.getModel("PurchaseModel").setProperty("/TempContract", oData);
							var itmQty = oData.fpoItemSet.results;
							// setData(oData.results);
							var lq = oData.fpoItemSet.results.length;
							if (lq === 0) {

								AllModel.setProperty(path + "/PONO");
								oView.getModel("AllDataModel").setProperty("/PONO", Ebeln);
								oView.getModel("visiblemodel").setProperty("/isvisible", true);
								oView.getModel("EditModel").setProperty("/isEditable", false);

							} else {
								oView.getModel("visiblemodel").setProperty("/isvisible", false);
								oView.getModel("EditModel").setProperty("/isEditable", true);
								oModelPO.read("/PoDisplaySet(Purchaseorder='" + Purchaseorder + "')", {
									urlParameters: {
										"$expand": "PoitemSet"
									},
									success: function(odata) {
										var itmQty2 = odata.PoitemSet.results;
										for (var ii = 0; ii < itmQty.length; ii++) {
											for (var jj = 0; jj < itmQty2.length; jj++) {
												if (itmQty[ii].PoItem == itmQty2[jj].PoItem) {
													itmQty2[jj].Quantity = itmQty[ii].Quantity;
													itmQty2[jj].Vendor = odata.Vendor;
												}
											}
										}
										oView.getModel("PurchaseModel").setProperty("/TempContract", odata);
										oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet", odata.PoitemSet.results);

									},
									error: function(err) {

										MessageBox.error(err);
									}

								});

							}
							for (var quant = 0; quant < lq; quant++) {

								AllModel.setProperty(path + "/PONO");
								oView.getModel("AllDataModel").setProperty("/PONO", Ebeln);

							}
							oView.getModel("PurchaseModel").setProperty("/TempContract/PoitemSet", oData.fpoItemSet.results);
							var aModel = oPurchaseModel.getProperty("/TempContract/PoitemSet");

							oView.getModel("GRItemsModel").setData(aModel[0]);
							var sPlant = aModel[0].Plant;
							oView.byId("idlant").setValue(sPlant);

						},
						error: function(oError) {
							BusyIndicator.hide();
							MessageBox.error(oError);
						}
					});
					//	this.byId("idPOItemsTab").setModel(oView.getModel("POItemsModel"), "POItemsModel");
				});

			}
			oEvent.getSource().getBinding("items").filter([]);

		},

		PressMaterialDoc: function(oEvent) {
			var oMatModel = oView.getModel("MatData");
			var oModel = this.getOwnerComponent().getModel("PurchaseSet");
			var oGRItemsModel = oView.getModel("GRItemsModel");
			var oGRModelData = this.getOwnerComponent().getModel("GoodReceiptModel");
			var sMaterialDocument = oMatModel.oData.MatDocument;
			var sMaterialDocumentYear = oMatModel.oData.MatDocYear;

			oModel.read("/GrHeadSet(MatDoc='" + sMaterialDocument + "',DocYear='" + sMaterialDocumentYear + "')", {

				urlParameters: {
					"$expand": "GrItemSet"
				},

				success: function(oData) {
					var sPurchaseno = oData.GrItemSet.results[0].PoNumber;
					var sVendor = oData.GrItemSet.results[0].Vendor;

					var AllModel = oView.getModel("AllDataModel");

					var path = AllModel.oData;
					var iLength = oData.GrItemSet.results.length;
					if (iLength === 0) {

						AllModel.setProperty(path + "/PONO");
						oView.getModel("AllDataModel").setProperty("/PONO", sPurchaseno);
						oView.getModel("visiblemodel").setProperty("/isvisible", true);
						oView.getModel("EditModel").setProperty("/isEditable", false);

					} else {
						oView.getModel("visiblemodel").setProperty("/isvisible", false);
						oView.getModel("EditModel").setProperty("/isEditable", true);
					}
					for (var quant = 0; quant < iLength; quant++) {
						//		var Quantity = oData.GrItemSet.results[quant].Quantity;

						AllModel.setProperty(path + "/PONO");
						oView.getModel("AllDataModel").setProperty("/PONO", sPurchaseno);

					}
					var PostDate = oData.PstngDate;
					var s_doc_date = PostDate;
					var str = s_doc_date.toISOString();
					str = str.slice(0, -5);

					var DocumentDates = oData.DocDate;
					var s_doc_datePost = DocumentDates;
					var Datepoststring = s_doc_datePost.toISOString();
					Datepoststring = Datepoststring.slice(0, -5);

					AllModel.setProperty(path + "/CreatDate");
					oView.getModel("AllDataModel").setProperty("/CreatDate", str);

					AllModel.setProperty(path + "/DocumentDate");
					oView.getModel("AllDataModel").setProperty("/DocumentDate", Datepoststring);

					if (sVendor !== "" || sVendor !== undefined) {
						for (var y = 0; y < ListofVendor.length; y++) {
							if (sVendor === ListofVendor[y].Lifnr) {
								var sVenname = ListofVendor[y].Name1;

							}
						}
					}
					AllModel.setProperty(path + "/Vendor");
					oView.getModel("AllDataModel").setProperty("/Vendor", sVendor);
					AllModel.setProperty(path + "/VendorName");
					oView.getModel("AllDataModel").setProperty("/VendorName", sVenname);
					oView.getModel("GoodReceiptModel").setData(oData);
					oView.getModel("GoodReceiptModel").setProperty("/GRPost", oData);
					oView.getModel("GoodReceiptModel").setProperty("/GRPost/GrItemSet", oData.GrItemSet.results);

					var aModel = oGRModelData.getProperty("/GRPost/GrItemSet");

					oView.getModel("GRItemsModel").setData(aModel[0]);

					var mno = aModel[0].Material;

					var MaterialAndVendor = mno.concat("-", sVendor);
					oView.byId("VMatNo").setValue(MaterialAndVendor);

				},
				error: function(oError) {
					MessageBox.error(oError);
				}
			});

		},

		/*end purchase order f4 click*/
		/*Plant search start */
		getPOPlant: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(true);
			oModel.read("/get_plant_f4helpSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/POPlant", oData.results);
					oLookupModel.refresh(true);
					//that.getMaterialList();
				},
				error: function(oError) {
					BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
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
			this.getPOPlant();
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

		_handlePlantClose: function(evt) {

			var oSelectedItem = evt.getParameter("selectedItem");

			if (oSelectedItem) {
				var productInput = this.byId(this.inputId);
				productInput.setValue(oSelectedItem.getTitle());

				evt.getSource().getBinding("items").filter([]);
			}
		},
		/*plant search end*/

		onDeleteConditionItem: function() {
			var oPurchaseItemTable = this.byId("idTableitem");
			var aSelectedIndex = oPurchaseItemTable.getSelectedIndices().reverse();
			var oPurchaseModel = this.getOwnerComponent().getModel("PurchaseModel");
			var aPurchaseConditionItems = oPurchaseModel.getProperty("/TempContract/POItem");
			for (var i = 0; i < aSelectedIndex.length; i++) {
				aPurchaseConditionItems.splice(aSelectedIndex[i], 1);
			}
			oPurchaseItemTable.clearSelection();
			oPurchaseModel.refresh(true);
		},

		/*vendor list start*/
		getVendorList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(true);
			oModel.read("/Fetch_Vendor_DetailsSet", {
				success: function(oData) {
					BusyIndicator.hide();
					var item = oData.results.length;

					for (var iRowIndex = 0; iRowIndex < item; iRowIndex++) {
						var odata = oData.results[iRowIndex];
						if (odata !== undefined) {
							var Lifnrr = odata.Lifnr;
							var Name1r = odata.Name1;
							ListofVendor.push({
								Lifnr: Lifnrr,
								Name1: Name1r
							});
						}

					}

					var Count = new sap.ui.model.json.JSONModel({
						item: item

					});
					oView.setModel(Count, "Count");

					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/DisplyaVendorList", ListofVendor);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					MessageToast.show(oError);
				}
			});
		},

		handleVendorValueHelp: function(oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialogvendor) {
				this._valueHelpDialogvendor = sap.ui.xmlfragment(
					"com.vSimpleApp.view.fragment.Vendor.fragment.Display",
					this
				);
				this.getView().addDependent(this._valueHelpDialogvendor);
			}
			if (sInputValue.includes(")")) {
				var sSubString = sInputValue.split(")")[1];
				sInputValue = sSubString.trim();
			}

			// create a filter for the binding
			this._valueHelpDialogvendor.getBinding("items").filter(new Filter([new Filter(
				"Name1",
				FilterOperator.Contains, sInputValue
			), new Filter(
				"Lifnr",
				FilterOperator.Contains, sInputValue
			)]));
			this.getVendorList();
			// open value help dialog filtered by the input value
			this._valueHelpDialogvendor.open(sInputValue);
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
					sDescription = oSelectedItem.getInfo();
				productInput.setSelectedKey(sDescription);
				productInput.setValue(sDescription);
				if (sDescription !== "") {
					//	this.getVendorDetails(sDescription);
					var sBindPath = oSelectedItem.getBindingContext("Lookup").sPath;
					oView.byId("idvendorno1").setValue(oModel.getProperty(sBindPath + "/Name1"));

				}
			}
			evt.getSource().getBinding("items").filter([]);

		},

		/*vendor list end*/

		OnPostGoodReceipt: function() {
			var oModel = this.getOwnerComponent().getModel("PurchaseSet");

			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			var oTempModel = oPurchaseModel.getProperty("/TempContract");
			/*	var oRequestPayload = oTempModel.getRequestPayloadGR();
			console.log(oRequestPayload);
*/

			var sVendor = oTempModel.Vendor;
			var sPoNumber = oTempModel.PoNumber;
			var aItems = oTempModel.PoitemSet;

			var itemData = [];

			for (var iTex = 0; iTex < aItems.length; iTex++) {

				var Material = oTempModel.PoitemSet[iTex].Material;
				var Quantity = oTempModel.PoitemSet[iTex].Quantity;

				var Plant = oTempModel.PoitemSet[iTex].Plant;
				var StgeLoc = oTempModel.PoitemSet[iTex].StgeLoc;
				var Batch = oTempModel.PoitemSet[iTex].Batch;
				var StckType = oTempModel.PoitemSet[iTex].StckType;
				var SpecStock = oTempModel.PoitemSet[iTex].SpecStock;
				var SalesOrd = oTempModel.PoitemSet[iTex].SalesOrd;
				var SOrdItem = oTempModel.PoitemSet[iTex].SOrdItem;
				var SchedLine = oTempModel.PoitemSet[iTex].SchedLine;
				var ValType = oTempModel.PoitemSet[iTex].ValType;
				//	var EntryQnt = oTempModel.PoitemSet[iTex].EntryQnt;
				var EntryUomIso = oTempModel.PoitemSet[iTex].EntryUomIso;
				var PoPrQnt = oTempModel.PoitemSet[iTex].PoPrQnt;
				var OrderprUn = oTempModel.PoitemSet[iTex].OrderprUn;
				var OrderprUnIso = oTempModel.PoitemSet[iTex].OrderprUnIso;
				var PoItem = oTempModel.PoitemSet[iTex].PoItem;
				var Shipping = oTempModel.PoitemSet[iTex].Shipping;
				var CompShip = oTempModel.PoitemSet[iTex].CompShip;
				var ItemText = oTempModel.PoitemSet[iTex].ItemText;
				var GrRcpt = oTempModel.PoitemSet[iTex].GrRcpt;
				var UnloadPt = oTempModel.PoitemSet[iTex].UnloadPt;
				var Costcenter = oTempModel.PoitemSet[iTex].Costcenter;
				var Orderid = oTempModel.PoitemSet[iTex].Orderid;
				var OrderItno = oTempModel.PoitemSet[iTex].OrderItno;
				var CalcMotive = oTempModel.PoitemSet[iTex].CalcMotive;
				var AssetNo = oTempModel.PoitemSet[iTex].AssetNo;
				var SubNumber = oTempModel.PoitemSet[iTex].SubNumber;
				var ReservNo = oTempModel.PoitemSet[iTex].ReservNo;
				var ResItem = oTempModel.PoitemSet[iTex].ResItem;
				var ResType = oTempModel.PoitemSet[iTex].ResType;
				var Withdrawn = oTempModel.PoitemSet[iTex].Withdrawn;
				var MoveMat = oTempModel.PoitemSet[iTex].MoveMat;
				var MovePlant = oTempModel.PoitemSet[iTex].MovePlant;
				var MoveStloc = oTempModel.PoitemSet[iTex].MoveStloc;
				var MoveBatch = oTempModel.PoitemSet[iTex].MoveBatch;
				var MoveValType = oTempModel.PoitemSet[iTex].MoveValType;
				var MoveReas = oTempModel.PoitemSet[iTex].MoveReas;
				var ProfitCtr = oTempModel.PoitemSet[iTex].ProfitCtr;
				var WbsElem = oTempModel.PoitemSet[iTex].WbsElem;
				var Network = oTempModel.PoitemSet[iTex].Network;
				var Activity = oTempModel.PoitemSet[iTex].Activity;
				var PartAcct = oTempModel.PoitemSet[iTex].PartAcct;
				var AmountLc = oTempModel.PoitemSet[iTex].AmountLc;
				var AmountSv = oTempModel.PoitemSet[iTex].AmountSv;
				var RefDocYr = oTempModel.PoitemSet[iTex].RefDocYr;
				var RefDoc = oTempModel.PoitemSet[iTex].RefDoc;
				var RefDocIt = oTempModel.PoitemSet[iTex].RefDocIt;
				var Expirydate = oTempModel.PoitemSet[iTex].Expirydate;
				var ProdDate = oTempModel.PoitemSet[iTex].ProdDate;
				var Fund = oTempModel.PoitemSet[iTex].Fund;
				var FundsCtr = oTempModel.PoitemSet[iTex].FundsCtr;
				var CmmtItem = oTempModel.PoitemSet[iTex].CmmtItem;
				var ValSalesOrd = oTempModel.PoitemSet[iTex].ValSalesOrd;
				var ValSOrdItem = oTempModel.PoitemSet[iTex].ValSOrdItem;
				var ValWbsElem = oTempModel.PoitemSet[iTex].ValWbsElem;
				var CoBusproc = oTempModel.PoitemSet[iTex].CoBusproc;
				var Acttype = oTempModel.PoitemSet[iTex].Acttype;
				var SupplVend = oTempModel.PoitemSet[iTex].SupplVend;
				var MaterialExternal = oTempModel.PoitemSet[iTex].MaterialExternal;
				var MaterialGuid = oTempModel.PoitemSet[iTex].MaterialGuid;
				var MaterialVersion = oTempModel.PoitemSet[iTex].MaterialVersion;
				var MoveMatExternal = oTempModel.PoitemSet[iTex].MoveMatExternal;
				var MoveMatGuid = oTempModel.PoitemSet[iTex].MoveMatGuid;
				var MoveMatVersion = oTempModel.PoitemSet[iTex].MoveMatVersion;
				var GrantNbr = oTempModel.PoitemSet[iTex].GrantNbr;
				var CmmtItemLong = oTempModel.PoitemSet[iTex].CmmtItemLong;
				var FuncAreaLong = oTempModel.PoitemSet[iTex].FuncAreaLong;
				var LineId = oTempModel.PoitemSet[iTex].LineId;
				var ParentId = oTempModel.PoitemSet[iTex].ParentId;
				var LineDepth = oTempModel.PoitemSet[iTex].LineDepth;
				var BudgetPeriod = oTempModel.PoitemSet[iTex].BudgetPeriod;
				var EarmarkedNumber = oTempModel.PoitemSet[iTex].EarmarkedNumber;
				var EarmarkedItem = oTempModel.PoitemSet[iTex].EarmarkedItem;
				var StkSegment = oTempModel.PoitemSet[iTex].StkSegment;

				itemData.push({
					Material: Material,
					Plant: Plant,
					StgeLoc: StgeLoc,
					Batch: " ",
					MoveType: "101",
					StckType: StckType,
					SpecStock: SpecStock,
					Vendor: sVendor,
					Customer: " ",
					SalesOrd: SalesOrd,
					SOrdItem: SOrdItem,
					SchedLine: SchedLine,
					ValType: ValType,
					EntryQnt: Quantity,
					EntryUom: OrderprUn,
					EntryUomIso: EntryUomIso,
					PoPrQnt: PoPrQnt,
					OrderprUn: OrderprUn,
					OrderprUnIso: OrderprUnIso,
					PoNumber: sPoNumber,
					PoItem: PoItem,
					Shipping: Shipping,
					CompShip: CompShip,
					NoMoreGr: "X",
					ItemText: ItemText,
					GrRcpt: GrRcpt,
					UnloadPt: UnloadPt,
					Costcenter: Costcenter,
					Orderid: Orderid,
					OrderItno: OrderItno,
					CalcMotive: CalcMotive,
					AssetNo: AssetNo,
					SubNumber: SubNumber,
					ReservNo: ReservNo,
					ResItem: ResItem,
					ResType: ResType,
					Withdrawn: Withdrawn,
					MoveMat: MoveMat,
					MovePlant: MovePlant,
					MoveStloc: MoveStloc,
					MoveBatch: MoveBatch,
					MoveValType: MoveValType,
					MvtInd: "B",
					MoveReas: MoveReas,
					RlEstKey: " ",
					RefDate: null,
					CostObj: " ",
					ProfitSegmNo: "0000000000",
					ProfitCtr: ProfitCtr,
					WbsElem: WbsElem,
					Network: Network,
					Activity: Activity,
					PartAcct: PartAcct,
					AmountLc: AmountLc,
					AmountSv: AmountSv,
					RefDocYr: RefDocYr,
					RefDoc: RefDoc,
					RefDocIt: RefDocIt,
					Expirydate: Expirydate,
					ProdDate: ProdDate,
					Fund: Fund,
					FundsCtr: FundsCtr,
					CmmtItem: CmmtItem,
					ValSalesOrd: ValSalesOrd,
					ValSOrdItem: ValSOrdItem,
					ValWbsElem: ValWbsElem,
					GlAccount: "",
					IndProposeQuanx: " ",
					Xstob: "",
					EanUpc: "",
					DelivNumbToSearch: "",
					DelivItemToSearch: " ",
					SerialnoAutoNumberassignment: " ",
					Vendrbatch: Batch,
					StgeType: "",
					StgeBin: "StgeBin",
					SuPlStck1: Quantity,
					StUnQtyy1: Quantity,
					StUnQtyy1Iso: "",
					Unittype1: "",
					SuPlStck2: Quantity,
					StUnQtyy2: Quantity,
					StUnQtyy2Iso: " ",
					Unittype2: " ",
					StgeTypePc: "",
					StgeBinPc: " ",
					NoPstChgnt: " ",
					GrNumber: " ",
					StgeTypeSt: " ",
					StgeBinSt: "",
					MatdocTrCancel: " ",
					MatitemTrCancel: " ",
					MatyearTrCancel: " ",
					NoTransferReq: " ",
					CoBusproc: CoBusproc,
					Acttype: Acttype,
					SupplVend: SupplVend,
					MaterialExternal: MaterialExternal,
					MaterialGuid: MaterialGuid,
					MaterialVersion: MaterialVersion,
					MoveMatExternal: MoveMatExternal,
					MoveMatGuid: MoveMatGuid,
					MoveMatVersion: MoveMatVersion,
					FuncArea: FuncAreaLong,
					TrPartBa: " ",
					ParCompco: "",
					DelivNumb: " ",
					DelivItem: " ",
					NbSlips: " ",
					NbSlipsx: " ",
					GrRcptx: " ",
					UnloadPtx: "",
					SpecMvmt: " ",
					GrantNbr: GrantNbr,
					CmmtItemLong: CmmtItemLong,
					FuncAreaLong: FuncAreaLong,
					LineId: LineId,
					ParentId: ParentId,
					LineDepth: LineDepth,
					Quantity: Quantity,
					BaseUom: OrderprUn,
					Longnum: " ",
					BudgetPeriod: BudgetPeriod,
					EarmarkedNumber: EarmarkedNumber,
					EarmarkedItem: EarmarkedItem,
					StkSegment: StkSegment,
					MoveSegment: ""

				});

			}
			var oRequestPayload = {};
			var MatDocd = oTempModel.MatDoc;
		
		/*	const value = DateTime
  .fromFormat("2014-08-20 15:30:00", "yyyy-MM-dd HH:mm:ss")
  .toFormat('MM/dd/yyyy h:mm a');
			
			*/
	
			var TrEvType = oTempModel.TrEvType;
			var DocDate =this.datatime(oTempModel.DocDate);
			
	
			var PstngDate = this.datatime(oTempModel.CreatDate);
			//	var EntryDate = this.datatime(oTempModel.EntryDate);
			//	var EntryTime = oTempModel.EntryTime;
			var Username = oTempModel.CreatedBy;
			var VerGrGiSlip = oTempModel.VerGrGiSlip;
			//	var ExpimpNo = oTempModel.ExpimpNo;
			var RefDocNo = oTempModel.RefDocNo;
			var HeaderTxt = oTempModel.HeaderTxt;
			var RefDocNoLong = oTempModel.RefDocNoLong;

			oRequestPayload.PstngDate = PstngDate;
			oRequestPayload.DocDate = DocDate;
			oRequestPayload.RefDocNo = "abc";
			oRequestPayload.BillOfLading = " ";
			oRequestPayload.GrGiSlipNo = " ";
			oRequestPayload.PrUname = Username;
			oRequestPayload.HeaderTxt = HeaderTxt;
			oRequestPayload.VerGrGiSlip = VerGrGiSlip;
			oRequestPayload.VerGrGiSlipx = " ";
			oRequestPayload.ExtWms = " ";
			oRequestPayload.RefDocNoLong = RefDocNoLong;
			oRequestPayload.BillOfLadingLong = " ";
			oRequestPayload.BarCode = " ";
			oRequestPayload.Matdocumentyear = " ";
			oRequestPayload.Materialdocument = " ";
			oRequestPayload.GoodsmvtitemSet = itemData;

			BusyIndicator.show(true);
			oModel.create("/GrCrudSet", oRequestPayload, {

				success: this._onUpdateProdEntrySuccess.bind(this),
				error: this._onCreateEntryError.bind(this)
			});
			oPurchaseModel.refresh(true);

		},
			datatime: function(dDate) {
			//	2021-10-04T08:54:57
			var m = new Date(dDate);
			var dateString = m.getUTCFullYear() +"-"+ (m.getUTCMonth()+1) +"-"+ m.getUTCDate() + "T" + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();

			return dateString;
		
		},
		_onUpdateProdEntrySuccess: function(oObject, oResponse) {
			BusyIndicator.hide();

			var sap1 = {};
			sap1 = JSON.parse(oResponse.headers["sap-message"]);
			console.log(sap1.message);

			var oPurchaseModel = this.getView().getModel("PurchaseModel");
			oPurchaseModel.setData({
				oData: {}
			});

			oPurchaseModel.refresh(true);
			var allmodel = oView.getModel("AllDataModel");
			allmodel.setData({
				TempContract: {}
			});
			allmodel.updateBindings(true);

			allmodel.refresh(true);

			var oGRItemsModel = oView.getModel("GRItemsModel");
			oGRItemsModel.setData({
				TempContract: {}
			});
			oGRItemsModel.updateBindings(true);

			oGRItemsModel.refresh(true);

			oView.byId("idlant").setValue("");
			oView.byId("idPD").setValue(" ");
			//	this.getView().getModel("VHeader").refresh();
			jQuery.sap.require("sap.m.MessageBox");

			sap.m.MessageBox.show("Material document #" + sap1.message + " posted", {
				icon: sap.m.MessageBox.Icon.INFORMATION,
				title: "Message",
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

			BusyIndicator.hide();
			var x = JSON.parse(oError.responseText);
			var err = x.error.message.value;

			jQuery.sap.require("sap.m.MessageBox");

			sap.m.MessageBox.error(
				"Error creating entry: " + err + " "
			);

		},

		onCancelPRess: function(event) {
				var oPurchaseModel = this.getView().getModel("PurchaseModel");

				oPurchaseModel.setData({
					TempContract: {}
				});
				oPurchaseModel.updateBindings(true);

				//	s.refresh(true);
				var oallmodel = oView.getModel("AllDataModel");
				oallmodel.setData({
					oData: {}
				});
				oallmodel.updateBindings(true);

				oallmodel.refresh(true);
				oPurchaseModel.refresh(true);
				this.getView().getModel("VHeader").refresh();
				var GRItemsModel = oView.getModel("GRItemsModel");
				GRItemsModel.setData({
					TempContract: {}
				});
				GRItemsModel.updateBindings(true);

				GRItemsModel.refresh(true);

				oView.byId("idlant").setValue("");
				oView.byId("idPD").setValue(" ");
				//redirect the page	frot view
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("ShowTiles");

			},
			
							//validation function//
		Validate:function(evt){
		var sValue= evt.mParameters.value;
		var sInput = evt.getSource().sId;
	    var oinputbox = sap.ui.getCore().byId(sInput)
	    var pattern = /[^\w]/;
		if (pattern.test(sValue)){
				oinputbox.setValueState("Error");
				oinputbox.setValueStateText("Enter Valid Value");
		}else{
				oinputbox.setValueState("None");
					oinputbox.setValueStateText("");
				
		}
	
		},
		
		//numeric validation
		
		numValidate:function(evt){
		var sValue= evt.mParameters.value;
		var sInput = evt.getSource().sId;
	    var oinputbox = sap.ui.getCore().byId(sInput)
	    var pattern = /[^\d]/;
		if (pattern.test(sValue)){
				oinputbox.setValueState("Error");
				oinputbox.setValueStateText("Enter Numeric Value");
		}else{
				oinputbox.setValueState("None");
					oinputbox.setValueStateText("");
				
		}
	
		},
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf com.vSimpleApp.view.view.GoodReceipt
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.vSimpleApp.view.view.GoodReceipt
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.vSimpleApp.view.view.GoodReceipt
		 */
		//	onExit: function() {
		//
		//	}

	});

});