sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/Fragment",

	"sap/m/MessageToast",

	"sap/ui/core/routing/History",
	"sap/ui/core/BusyIndicator",
	"sap/ui/export/Spreadsheet",
	"sap/ui/export/library",
	"sap/ui/table/library",
	'sap/suite/ui/commons/ChartContainerContent'
], function(Controller, Filter, JSONModel, MessageBox, FilterOperator, Fragment, MessageToast,
	History,
	BusyIndicator, Spreadsheet, exportLibrary, library, ChartContainerContent) {
	"use strict";

	var oView, oComponent;
	var SortOrder = library.SortOrder;
	var EdmType = exportLibrary.EdmType;
	var ListofVendor = [];
	return Controller.extend("com.vSimpleApp.controller.Analytics", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.vSimpleApp.view.Analytics
		 */
		onInit: function() {
			oView = this.getView();
			oComponent = this.getOwnerComponent();
			var oModel = this.getOwnerComponent().getModel("VHeader");

			//set the model on view to be used by the UI controls
			this.getView().setModel(oModel);
			var oData = new JSONModel();
			oView.setModel(oData, "oVendorModel");
			var oAdvanceAnalytics = new JSONModel();
			oView.setModel(oAdvanceAnalytics, "oAdvanceAnalytics");


	var oMonitoringData = new JSONModel();
			oView.setModel(oMonitoringData, "oMonitoringData");



			var oLeadtime = new JSONModel();
			oView.setModel(oLeadtime, "oLeadtime");

			var oPieModel = new JSONModel();
			oView.setModel(oPieModel, "oPieModel");

			var oCheckedModel = new sap.ui.model.json.JSONModel({
				H48: false,
				Current: true,
				Previous1Month: false,
				Last3: false,
				Last6: false

			});
			oView.setModel(oCheckedModel, "oCheckModel");
			//	oView.byId("idVizFrameMonitoring").setVisible(false);

			var oDataset = new sap.ui.model.json.JSONModel({
				Measure1: "Return",
				Measure2: "Reject"

			});
			oView.setModel(oDataset, "DataSets");

			var oVisible = new sap.ui.model.json.JSONModel({
				Delivery: true,
				Monitoring: true

			});
			oView.setModel(oVisible, "oVisibleModel");
			
			
			
			
			
			
			
			
			
			
			
			

		},
		OnSelectMonths: function(oEvent) {
			var ocheckModel = oView.getModel("oCheckModel");
			var checkBoxSelected = oEvent.getParameter("selected");

			var oselecttab = oEvent.oSource.mProperties.text;
			console.log(oselecttab)
			var CurrentD = new Date();

			if (oselecttab === "48 Hours") {

			} else if (oselecttab === "Current Month") {

				var firstDay = new Date(CurrentD.getFullYear(), CurrentD.getMonth(), 1);

				var lastDay = new Date(CurrentD.getFullYear(), CurrentD.getMonth() + 1, 0);

				var last1mon = firstDay.getUTCFullYear() + "-" + (firstDay.getUTCMonth() + 1) + "-" + firstDay.getUTCDate() + "T" + firstDay.getUTCHours() +
					":" + firstDay.getUTCMinutes() +
					":" + firstDay.getUTCSeconds();
				console.log(last1mon);
				var endo1mon = lastDay.getUTCFullYear() + "-" + (lastDay.getUTCMonth() + 1) + "-" + lastDay.getUTCDate() + "T" + lastDay.getUTCHours() +
					":" + lastDay.getUTCMinutes() +
					":" + lastDay.getUTCSeconds();
				console.log(endo1mon);

				oView.getModel("oVendorModel").setProperty("/FirstDate", last1mon);
				oView.getModel("oVendorModel").setProperty("/EndDate", endo1mon);

			} else if (oselecttab === "Previous 1 Month") {
				// var prevMonthEnd = new Date();
				// CurrentD.setDate(0);
				// var beginLastMonth = new Date(CurrentD);
				// beginLastMonth.setDate(1);
				// var Prevmonthstart = this.datatime(beginLastMonth);

				// var lastmonth = this.datatime(prevMonthEnd);
				var Prevmonthstart = new Date().toISOString();
				CurrentD.setMonth(CurrentD.getMonth() - 1);
				var lastmonth = CurrentD.toISOString().slice(0, 19);
				oView.getModel("oVendorModel").setProperty("/FirstDate", Prevmonthstart);
				oView.getModel("oVendorModel").setProperty("/EndDate", lastmonth);

			} else if (oselecttab === "Last 3 Months") {
				// var dateString1 = this.datatime(CurrentD);

				// CurrentD.setMonth(CurrentD.getMonth() - 3);

				// var Last3Month = this.datatime(CurrentD);

				var dateString1 = new Date().toISOString().slice(0, 19);
				CurrentD.setMonth(CurrentD.getMonth() - 3);

				//var Last3Month = CurrentD.toISOString();
				var Last3Month = CurrentD.toISOString().slice(0, 19);
				oView.getModel("oVendorModel").setProperty("/FirstDate", dateString1);
				oView.getModel("oVendorModel").setProperty("/EndDate", Last3Month);

			} else if (oselecttab === "Last 6 Months") {
				// var dateString2 = this.datatime(CurrentD);

				// CurrentD.setMonth(CurrentD.getMonth() - 6);

				// var Last6Month = this.datatime(CurrentD);

				var dateString2 = new Date().toISOString().slice(0, 19);
				CurrentD.setMonth(CurrentD.getMonth() - 6);
				//	var Last3Month = CurrentD.toISOString();
				//	var Last3Month2 = 	CurrentD.format("isoDateTime");
				var Last3Month2 = CurrentD.toISOString().slice(0, 19);
				oView.getModel("oVendorModel").setProperty("/FirstDate", dateString2);
				oView.getModel("oVendorModel").setProperty("/EndDate", Last3Month2);

			}

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

			}
			evt.getSource().getBinding("items").filter([]);

		},

		onChartTypeChanged: function(oEvent) {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			var oDataModel = oView.getModel("oVendorModel");
			var oVisibleModel = oView.getModel("oVisibleModel");
			var oselect = oEvent.oSource.mProperties.selectedKey;

			var Vendor = oDataModel.oData.Vendor;
			var FirstDate = oDataModel.oData.FirstDate;
			var EndDate = oDataModel.oData.EndDate;
			//	var Matnr  = "50065579";
			console.log(oDataModel);

			var zero = "";

			if ($.isNumeric((Vendor)) === true) {
				var len = Vendor.length;
				if (len !== undefined) {
					var z = 10 - len;
					for (var i = 0; i < z; i++) {
						zero += "0";
					}
				}

				Vendor = zero + Vendor;
			}

			if (oselect === "Delivery Pattern") {
				oVisibleModel.setProperty("/Monitoring", false);

				this.getVendordetail(Vendor, FirstDate, EndDate);

			} else if (oselect === "Monitoring Quality") {
				oVisibleModel.setProperty("/Delivery", false);

				this.getReturndata(Vendor, FirstDate, EndDate);
			}

			var oLookupModel = this.getOwnerComponent().getModel("Lookup");
			ListofVendor = oLookupModel.oData.DisplyaVendorList;
			console.log(oLookupModel);

			//	var sVendorCreate = "/StockvsSales2Set?$filter=(Erdat eq datetime'2021-03-17T12:04:39' and Erdat2 eq datetime'2021-11-11T13:19:55' and Matnr eq '000000000050065555' )";
			//	BusyIndicator.show(true);

		},
		getVendordetail: function(Vendor, FirstDate, EndDate) {
			var filter = new sap.ui.model.Filter('Lifnr', sap.ui.model.FilterOperator.EQ, Vendor);
			var sname;
			var oModel = this.getOwnerComponent().getModel("StockModel");

			// oModel.read("/advanceAnalytics_vendorSet?$filter=(Lifnr eq'" + Vendor + "' )", {
			// filters: [filter],
			var count;
			var OnTime;
			var latetime;
			OnTime = 1;
			latetime = 1;
			var delinquent  = 1;
			var s1 = "2019-03-17T12:04:39";
			var s2 = "2021-03-17T12:04:39";
			var oFilter1 = new sap.ui.model.Filter('Aedat', sap.ui.model.FilterOperator.EQ, EndDate);
			var oFilter2 = new sap.ui.model.Filter('Erdat2', sap.ui.model.FilterOperator.EQ, FirstDate);

			var LeadModel = oView.getModel("oLeadtime");
			var oPieModel = oView.getModel("oPieModel");
			var piearr = [];
			oModel.read("/getdatafromdate_AnalyticsSet", {

				filters: [oFilter1, oFilter2, filter],
				success: function(oData) {
					console.log(oData);
					var odata = oData.results;
					LeadModel.setData(odata);
					var itemlen = odata.length;
					for (var itex = 0; itex < itemlen; itex++) {
						var createddate = odata[itex].Prdat;
						var deliverycompleteddate = odata[itex].Eindt;
						var date1 = new Date(createddate);
						var date2 = new Date(deliverycompleteddate);
						var diffTime = Math.abs(date2 - date1);
						var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
						//	console.log(diffTime + " milliseconds");
						//	console.log(diffDays + " days");

						if (diffDays < 2) {

							oView.getModel("oLeadtime").setProperty("/" + itex + "/OnTime", diffDays);
							OnTime++;
							
						} else if(diffDays < 10){
								oView.getModel("oLeadtime").setProperty("/" + itex + "/Delinquent", diffDays);
								delinquent ++;
						}else {

							oView.getModel("oLeadtime").setProperty("/" + itex + "/Late", diffDays);
							latetime++;
						
						}

					}
						piearr.push({
						Vendor: "OnTime",
						LateData: OnTime
					});

				
						piearr.push({
						Vendor: "Late",
						LateData: delinquent
					});
				
						piearr.push({
						Vendor: "At Risk",
						LateData: latetime
					});
					console.log(piearr);

					oView.getModel("oPieModel").setData(piearr);

					//oView.getModel("oPieModel").setProperty("/LateData", latetime);
					//	oView.getModel("oPieModel").setProperty("/onTimeData", OnTime);
					console.log(oPieModel);
					oView.getModel("oAdvanceAnalytics").setData(oData.results);
					var oModelAd = oView.getModel("oAdvanceAnalytics");

					var item = oModelAd.oData.length;

					if (Vendor !== "" || Vendor !== undefined) {
						for (var x = 0; x < ListofVendor.length; x++) {
							if (Vendor === ListofVendor[x].Lifnr) {
								var sVendorname = ListofVendor[x].Name1;
								sname = sVendorname;
							}
						}
					}

					for (var vlen = 0; vlen < item; vlen++) {
						//var opro = oModelAd.setProperty("/VendorName",sname);

						oView.getModel("oAdvanceAnalytics").setProperty("/" + vlen + "/VendorName", sname);

					}

				},
				error: function(err) {
					console.log(err);
				}

			});
		},
		getVendordetail2: function(Vendor) {
			var filter = new sap.ui.model.Filter('Lifnr', sap.ui.model.FilterOperator.EQ, Vendor);
			var sname;
			var oModel = this.getOwnerComponent().getModel("StockModel");

			oModel.read("/advanceAnalytics_vendorSet?$filter=(Lifnr eq'" + Vendor + "' )", {
				filters: [filter],

				success: function(oData) {
					var item = oData.results.length;
					var oReturn = [];
					var dataset = oData.results;
					for (var vlen = 0; vlen < item; vlen++) {

						var deliverydate = dataset[vlen].Eindt;

					}

					oView.getModel("oAdvanceAnalytics").setData(oData.results);
					var oModelAd = oView.getModel("oAdvanceAnalytics");

					var item = oModelAd.oData.length;

					if (Vendor !== "" || Vendor !== undefined) {
						for (var x = 0; x < ListofVendor.length; x++) {
							if (Vendor === ListofVendor[x].Lifnr) {
								var sVendorname = ListofVendor[x].Name1;
								sname = sVendorname;
							}
						}
					}

					for (var vlen = 0; vlen < item; vlen++) {
						//var opro = oModelAd.setProperty("/VendorName",sname);

						oView.getModel("oAdvanceAnalytics").setProperty("/" + vlen + "/VendorName", sname);

					}

				},
				error: function(err) {
					console.log(err);
				}

			});
		},
		getReturndata: function(Vendor) {
			var filter = new sap.ui.model.Filter('Lifnr', sap.ui.model.FilterOperator.EQ, Vendor);
			var sname;
			var oModel = this.getOwnerComponent().getModel("StockModel");

			oModel.read("/advanceAnalytics_vendorSet?$filter=(Lifnr eq'" + Vendor + "' )", {
				filters: [filter],

				success: function(oData) {
					var item = oData.results.length;
					var oReturn = [];
					var dataset = oData.results;
					for (var vlen = 0; vlen < item; vlen++) {

						var deliverydate = dataset[vlen].Eindt;
						var returnqnt = dataset[vlen].Retpo;

						if (returnqnt === 'X') {

							oReturn.push(dataset[vlen]);

						}
						//	console.log(oReturn);

					}

					oView.getModel("oMonitoringData").setData(oReturn);
					var oModelAd = oView.getModel("oMonitoringData");

					var item = oModelAd.oData.length;

					if (Vendor !== "" || Vendor !== undefined) {
						for (var x = 0; x < ListofVendor.length; x++) {
							if (Vendor === ListofVendor[x].Lifnr) {
								var sVendorname = ListofVendor[x].Name1;
								sname = sVendorname;
							}
						}
					}

					for (var vlen = 0; vlen < item; vlen++) {
						//var opro = oModelAd.setProperty("/VendorName",sname);

						oView.getModel("oMonitoringData").setProperty("/" + vlen + "/VendorName", sname);
						oView.getModel("oMonitoringData").setProperty("/" + vlen + "/Retpo", "Return PO");

					}

				},
				error: function(err) {
					//	console.log(err);
				}

			});
		},
		onExport: function() {
			var aCols, oRowBinding, oSettings, oSheet, oTable;
			if (!this._oTable) {
				this._oTable = this.byId('deliverypattern');
			}
			oTable = this._oTable;
			oRowBinding = oTable.getBinding('rows');
			aCols = this.createColumnConfig();
			oSettings = {
				workbook: {
					columns: aCols,
					hierarchyLevel: 'Level'
				},
				dataSource: oRowBinding,
				fileName: 'Table export Data.xlsx',
				worker: false
			};
			oSheet = new Spreadsheet(oSettings);
			oSheet.build().finally(function() {
				oSheet.destroy();
			});
		},

		createColumnConfig: function() {
			var aCols = [];

			aCols.push({
				label: 'Purchase Order',
				property: 'Ebeln',
				type: EdmType.String

			});
			aCols.push({
				label: 'Material No',
				property: 'Matnr',
				type: EdmType.String

			});
			aCols.push({
				label: 'Material Discription',
				property: 'Txz01',
				type: EdmType.String

			});
			aCols.push({
				label: 'Quantity',
				type: EdmType.String,
				property: 'Menge',
				scale: 0
			});
			aCols.push({
				label: 'Plant',
				type: EdmType.String,
				property: 'Werks',
				scale: 0
			});
			aCols.push({
				label: 'Goods Delivered Quantity',
				type: EdmType.String,
				property: 'Wemng',
				scale: 0
			});

			aCols.push({
				label: 'Vendor No',
				type: EdmType.String,
				property: 'Lifnr',
				scale: 0
			});
			aCols.push({
				label: 'Vendor Name',
				type: EdmType.String,
				property: 'VendorName',
				scale: 0
			});
			aCols.push({
				label: 'Purchase Organization',
				property: 'Ekgrp',
				type: EdmType.String
			});
			aCols.push({
				label: 'Order Date',
				property: 'Bedat',
				type: EdmType.Date
			});
			aCols.push({
				label: 'Delivary Date',
				property: 'Prdat',
				type: EdmType.String
			});
			aCols.push({
				label: 'Item Delivey Date',
				property: 'Eindt',
				type: EdmType.String
			});
			// aCols.push({
			// 	label: 'Delivered Quantity',
			// 	property: 'Glmng',
			// 	type: EdmType.String
			// });

			return aCols;
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.vSimpleApp.view.Analytics
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.vSimpleApp.view.Analytics
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.vSimpleApp.view.Analytics
		 */
		//	onExit: function() {
		//
		//	}

	});

});