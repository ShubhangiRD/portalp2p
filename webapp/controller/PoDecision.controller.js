sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	'sap/ui/core/BusyIndicator',
	"sap/ui/model/json/JSONModel",
	"sap/ui/export/Spreadsheet",
	"sap/ui/export/library",
	"sap/ui/table/library",
	'sap/suite/ui/commons/ChartContainerContent',
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"com/vSimpleApp/model/formatter"
], function(Controller, MessageToast, MessageBox, History, BusyIndicator, JSONModel, Spreadsheet, exportLibrary, library,
	ChartContainerContent,
	Filter, FilterOperator, formatter) {
	"use strict";
	var oController, oView, oComponent;
	var SortOrder = library.SortOrder;
	var EdmType = exportLibrary.EdmType;
	var oGlobalData = [];
	var matLabData = [];
	var resultSetSO = [];
	var aLeadTime = [];
	var oOneDaySale = [];

	var TotalLabst = [];
	var oMaterialList = [];

	return Controller.extend("com.vSimpleApp.controller.PoDecision", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.vSimpleApp.view.PoDecision
		 */
		formatter: formatter,

		onInit: function() {
			oController = this;
			oView = this.getView();
			var oModel = this.getOwnerComponent().getModel("StockModel");
			oComponent = this.getOwnerComponent();
			//set the model on view to be used by the UI controls
			this.getView().setModel(oModel);
			this.getSaleData();
			//	this._getMaterialAndDescriptionData();
			this.getMaterialstockSet();
			//	this.getMaterialList();
			var oLeadTimeModel = new JSONModel();
			oView.setModel(oLeadTimeModel, "oLeadTimeModel");

			
			var oData = new JSONModel();
			oView.setModel(oData, "oCheckModel");

			//	this.getAllPoData();

			this.getAllMaterialData();

			//	this._getLabst_matlab();
		},
		onNavBack: function() {
			oView.byId("idpoMaterial").setValue("");
			var aFilter = [];

			var sQuery = "";
			if (sQuery) {
				aFilter.push(
					new Filter("Matnr", FilterOperator.EQ, sQuery));

			}
			// update list binding
			var slist = this.getView().byId("leadtimeTable");
			var binding = slist.getBinding("items");
			binding.filter(aFilter, "Application");
			this.getOwnerComponent().getRouter().navTo("StockTable");

		},
	
	
		getMaterialstockSet: function() {
			BusyIndicator.show(true);
			var oModel = this.getOwnerComponent().getModel("StockModel");

			oModel.read('/getMaterialstockSet', {
				success: function(odata) {

					var iItem = odata.results.length;
					var oListItem = [];
					for (var iRowIndex = 0; iRowIndex < iItem; iRowIndex++) {

						var Matnr = odata.results[iRowIndex].Matnr;
						oListItem.push({
							Matnr: Matnr

						});
					}
					var index = {};
				//list down all unique materials
					oListItem.forEach(function(point) {
						var key = "" + point.Matnr + " ";
						if (key in index) {
							index[key].count++;
						} else {
							var newEntry = {
								Matnr: point.Matnr,
								Labst: "",
								count: 1
							};
							index[key] = newEntry;
							TotalLabst.push(newEntry);
						}
					});

					TotalLabst.sort(function(a, b) {
						return b.count - a.count;
					});

					var data = odata.results;
				//get quantity from another array
					for (var x = 0; x < TotalLabst.length; x++) {
						var orderCount = 0;
						for (var j = 0; j < data.length; j++) {
							if (TotalLabst[x].Matnr === data[j].Matnr) {
								orderCount = orderCount + parseInt(data[j].Labst);
								TotalLabst[x].Labst = orderCount.toString();
							}

						}

					}
				

				},
				error: function(oerror) {
					MessageBox.error(oerror);
				}

			});

		},
		getMaterialList: function() {
			var that = this;
			var oModel = this.getOwnerComponent().getModel("VHeader");
			BusyIndicator.show(true);
			oModel.read("/MaterialmasterSet", {
				success: function(oData) {
					BusyIndicator.hide();
					oMaterialList = oData.results;
					var oLookupModel = that.getOwnerComponent().getModel("Lookup");
					oLookupModel.setProperty("/MaterialList", oMaterialList);
					oLookupModel.refresh(true);
					// that.getStockDetailList();
					//	that._getpo_so_data();
				},
				error: function(oError) {
					//	BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		getAllPoData: function() {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			var oAllPoData = [];
			BusyIndicator.show(true);
			oModel.read("/get_po_decisionSet", {

				success: function(oData) {
					BusyIndicator.hide();
					var odata = oData.results;

					var ilen = oData.results.length;
					for (var iRowIndex = 0; iRowIndex < ilen; iRowIndex++) {
						var screateddate = odata[iRowIndex].Prdat;
						var sdeliverycompleteddate = odata[iRowIndex].Eindt;

						var sMatnr = odata[iRowIndex].Matnr;

						if (sMatnr !== "" || sMatnr !== undefined) {
							for (var x = 0; x < matLabData.length; x++) {
								if (sMatnr === matLabData[x].Matnr) {
									var sMatDescription = matLabData[x].Maktx;

								}
							}
						}

						var sEbeln = odata[iRowIndex].Ebeln;
						var sVbeln = odata[iRowIndex].Vbeln;
					
						var sdate1 = new Date(screateddate);
						var sdate2 = new Date(sdeliverycompleteddate);
						var sdiffTime = Math.abs(sdate2 - sdate1);
						var sdiffDays = Math.ceil(sdiffTime / (1000 * 60 * 60 * 24));

						if (sEbeln !== "" && sMatnr !== "") {

							oAllPoData.push({
								Matnr: sMatnr,
								Description: sMatDescription,
								LeadTime: sdiffDays,
								Vbeln: sVbeln,
								Ebeln: sEbeln
							});

						}

					}

					var index = {};
					var result = [];
					var soindex = {};

					oAllPoData.forEach(function(point) {
						var key = "" + point.Matnr + " ";
						var so = "" + point.Vbeln + " ";

						if (key in index) {

							index[key].MatCount++;

						} else if (so in soindex) {
							soindex[so].SalesCount++;
						} else {
							var newEntry = {

								Matnr: point.Matnr,

								//	Name1 : vendorname,
								MatCount: 1

							};
							index[key] = newEntry;
							//	soindex[so] = newEntry;
							result.push(newEntry);

						}
					});

					console.log(result);
					var oNwLe = [];
					for (var iRow = 0; iRow < result.length; iRow++) {
						var Material = result[iRow].Matnr;
						var SoCount = result[iRow].MatCount;

						if (Material !== "" || Material !== undefined) {
							for (var z = 0; z < TotalLabst.length; z++) {
								if (Material === TotalLabst[z].Matnr) {
									var sTotalLabst = TotalLabst[z].Labst;

								}
							}
						}

						var Leadtime = 0;
						var Ebeln = 1;
						var Description;
						for (var i = 0; i < oAllPoData.length; i++) {

							if (oAllPoData[i].Matnr == Material) {
								Description = oAllPoData[i].Description;
								Ebeln++;
								Leadtime = Leadtime + oAllPoData[i].LeadTime;

							}
						}
						oNwLe.push({
							Matnr: Material,
							Description: Description,
							Labst: sTotalLabst,
							Leadtime: Leadtime,
							Ebeln: Ebeln,
							Lead: Math.trunc((Leadtime / Ebeln)) + " Days",
							SoCount: SoCount,
							Date: new Date(Date.now() - (Math.trunc((Leadtime / Ebeln)) + 2) * 24 * 60 * 60 * 1000),
							Buffer: Math.trunc((Leadtime / Ebeln)) + 2,
							SalesConsume: SoCount / 30,

						});

					}

					oView.getModel("oLeadTimeModel").setData(oNwLe);
					oView.getModel("oLeadTimeModel").setSizeLimit(1326);

				},
				error: function(oError) {
					BusyIndicator.hide();
					MessageBox.error(oError);
				}

			});
		},

		OnSelectRButton: function(oEvent) {
			var oselecttab = oEvent.oSource.mProperties.text;

			var CurrentD = new Date();
			if (oselecttab === "24 Hours") {
				//var NextDay=  CurrentD.setHours(CurrentD.getHours() + 24)
				var NextDay = new Date(new Date(CurrentD).getTime() - 60 * 60 * 24 * 1000);
				var first = CurrentD.toISOString().slice(0, 19);
				var last = NextDay.toISOString().slice(0, 19);

				oView.getModel("oCheckModel").setProperty("/FirstDate", first);
				oView.getModel("oCheckModel").setProperty("/EndDate", last);
			} else if (oselecttab === "48 Hours") {
				//var NextDay=  CurrentD.setHours(CurrentD.getHours() + 24)
				var NextDay = new Date(new Date(CurrentD).getTime() - 60 * 60 * 48 * 1000);
				var first = CurrentD.toISOString().slice(0, 19);
				var last = NextDay.toISOString().slice(0, 19);

				oView.getModel("oCheckModel").setProperty("/FirstDate", first);
				oView.getModel("oCheckModel").setProperty("/EndDate", last);
			}
	
			else if (oselecttab === "Last 1 Month") {
				var sLastMonth = new Date().toISOString().slice(0, 19);
				CurrentD.setMonth(CurrentD.getMonth() - 1);
				var sCurrentDate = CurrentD.toISOString().slice(0, 19);
				oView.getModel("oCheckModel").setProperty("/FirstDate", sLastMonth);
				oView.getModel("oCheckModel").setProperty("/EndDate", sCurrentDate);

			} else if (oselecttab === "Last 3 Months") {
				var dateString1 = new Date().toISOString().slice(0, 19);
				CurrentD.setMonth(CurrentD.getMonth() - 3);
				var Last3Month = CurrentD.toISOString().slice(0, 19);
				oView.getModel("oCheckModel").setProperty("/FirstDate", dateString1);
				oView.getModel("oCheckModel").setProperty("/EndDate", Last3Month);

			} else if (oselecttab === "Last 6 Months") {
				var sdateString2 = new Date().toISOString().slice(0, 19);
				CurrentD.setMonth(CurrentD.getMonth() - 6);
				var sLast3Month2 = CurrentD.toISOString().slice(0, 19);
				oView.getModel("oCheckModel").setProperty("/FirstDate", sdateString2);
				oView.getModel("oCheckModel").setProperty("/EndDate", sLast3Month2);

			}
		},

		onFetchDecision: function() {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			var oDataModel = oView.getModel("oCheckModel");
			var dFirstDate = oDataModel.oData.FirstDate;
			var dEndDate = oDataModel.oData.EndDate;

		
			var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
			var firstDate = new Date(dFirstDate);
			var secondDate = new Date(dEndDate);
			var diffDaysCount = Math.round(Math.abs((firstDate - secondDate) / oneDay));
			//passing the filter to service
			var oFilter1 = new sap.ui.model.Filter('Erdat', sap.ui.model.FilterOperator.EQ, dEndDate);
			var oFilter2 = new sap.ui.model.Filter('Erdat2', sap.ui.model.FilterOperator.EQ, dFirstDate);
			var oAllPoData = [];
			BusyIndicator.show(true);
			oModel.read("/get_po_decisionSet", {
				filters: [oFilter1, oFilter2],

				success: function(oData) {
					BusyIndicator.hide();
					var odata = oData.results;

				
				
					var len = oData.results.length;
					for (var iRowIndex = 0; iRowIndex < len; iRowIndex++) {
						var createddate = odata[iRowIndex].Prdat;
						var deliverycompleteddate = odata[iRowIndex].Eindt;

						var Matnr = odata[iRowIndex].Matnr;

						if (Matnr !== "" || Matnr !== undefined) {
							for (var x = 0; x < matLabData.length; x++) {
								if (Matnr === matLabData[x].Matnr) {
									var sMatDescription = matLabData[x].Maktx;

								}
							}
						}

						var Ebeln = odata[iRowIndex].Ebeln;
						var Vbeln = odata[iRowIndex].Vbeln;
						var date1 = new Date(createddate);
						var date2 = new Date(deliverycompleteddate);
						var diffTime = Math.abs(date2 - date1);
						var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

						if (Ebeln !== "" && Matnr !== "") {

							oAllPoData.push({
								Matnr: Matnr,
								Description: sMatDescription,
								LeadTime: diffDays,
								Vbeln: Vbeln,
								Ebeln: Ebeln
							});

						}

					}

					var index = {};
					var result = [];
					var soindex = {};
				//sales count  for perticular materials
					oAllPoData.forEach(function(point) {
						var key = "" + point.Matnr + " ";
						var so = "" + point.Vbeln + " ";

						if (key in index) {

							index[key].MatCount++;

						} else if (so in soindex) {
							soindex[so].SalesCount++;
						} else {
							var newEntry = {

								Matnr: point.Matnr,

								//	Name1 : vendorname,
								MatCount: 1

							};
							index[key] = newEntry;
							//	soindex[so] = newEntry;
							result.push(newEntry);

						}
					});

					console.log(result);
					var oPODecisionfinal = [];
					for (var iRow = 0; iRow < result.length; iRow++) {
						var Material = result[iRow].Matnr;
						var SoCount = result[iRow].MatCount;

						if (Material !== "" || Material !== undefined) {
							for (var z = 0; z < TotalLabst.length; z++) {
								if (Material === TotalLabst[z].Matnr) {
									var sTotalLabst = TotalLabst[z].Labst;

								}
							}
						}

						var Leadtime = 0;
						var Ebeln = 1;
						var Description;
						for (var i = 0; i < oAllPoData.length; i++) {

							if (oAllPoData[i].Matnr == Material) {
								Description = oAllPoData[i].Description;
								Ebeln++;
								Leadtime = Leadtime + oAllPoData[i].LeadTime;

							}
						}
						oPODecisionfinal.push({
							Matnr: Material,
							Description: Description,
							Labst: parseInt(sTotalLabst),
							Leadtime: Leadtime,
							Ebeln: Ebeln,
							Lead: Math.trunc((Leadtime / Ebeln)) + " Days",
							SoCount: SoCount,
							Buffer: Math.trunc((Leadtime / Ebeln)) + 2,
							SalesConsumeOnday: SoCount / diffDaysCount,
							currentDate: new Date()
							

						});

						var finishStockDay = oPODecisionfinal[iRow].SalesConsumeOnday;
						var newst = oPODecisionfinal[iRow].Labst / finishStockDay;
						oPODecisionfinal[iRow].finishStockDay = newst;
						var orderWillbeDay = newst - oPODecisionfinal[iRow].Leadtime + 2;
						var currentDate = new Date();
						currentDate.setDate(currentDate.getDate() + orderWillbeDay);
					
						oPODecisionfinal[iRow].Date = currentDate;

					}
					//put array data into model
					oView.getModel("oLeadTimeModel").setSizeLimit(oPODecisionfinal.length);
					oView.getModel("oLeadTimeModel").setData(oPODecisionfinal);
				

				},
				error: function(err) {
					MessageBox.error(err);
				
				}

			});
			//	var sVendorCreate = "/StockvsSales2Set?$filter=(Erdat eq datetime'2021-03-17T12:04:39' and Erdat2 eq datetime'2021-11-11T13:19:55' and Matnr eq '000000000050065555' )";
			//	BusyIndicator.show(true);

		},
		getAllMaterialData: function() {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			var oLeadTimeModel = oView.getModel("oLeadTimeModel");
			var oColorState = this.getOwnerComponent().getModel("ColorStateModel");
		
			var odatacolor = oColorState.oData;
			var oAllPoData = [];

			function percentage(percent, total) {
				return ((percent / 100) * total).toFixed(2);
			}
			BusyIndicator.show(true);
			oModel.read("/get_po_decisionSet", {

				success: function(oData) {
					BusyIndicator.hide();
					//	console.log(oData);
					var odata = oData.results;
					var sTotalLabst;
					var len = oData.results.length;
					for (var iRowIndex = 0; iRowIndex < len; iRowIndex++) {
						var dcreateddate = odata[iRowIndex].Prdat;
						var ddeliverycompleteddate = odata[iRowIndex].Eindt;

						var Matnr = odata[iRowIndex].Matnr;
						if (Matnr !== "" || Matnr !== undefined) {
							for (var z = 0; z < TotalLabst.length; z++) {
								if (Matnr === TotalLabst[z].Matnr) {
									sTotalLabst = TotalLabst[z].Labst;

								}
							}
						}

						var sMatDescription = odata[iRowIndex].Maktx;

						var Ebeln = odata[iRowIndex].Ebeln;
						
						var date1 = new Date(dcreateddate);
						var date2 = new Date(ddeliverycompleteddate);
						var diffTime = Math.abs(date2 - date1);
						var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
					
						if (sTotalLabst !== "0" && Matnr && Ebeln) {
							oAllPoData.push({
								Matnr: Matnr,
								Description: sMatDescription,
								LeadTime: diffDays,
								//	Vbeln: Vbeln,
								Ebeln: Ebeln,
								sTotalLabst: sTotalLabst
							});
						}

					}
				
					var index = {};
					var result = [];
					var soindex = {};

					oAllPoData.forEach(function(point) {
						var key = "" + point.Matnr + " ";

						if (key in index) {

							index[key].MatCount++;

						} else {
							var anewEntry = {
							Matnr: point.Matnr,
							MatCount: 1

							};
							index[key] = anewEntry;
							//	soindex[so] = newEntry;
							result.push(anewEntry);

						}
					});

					//	console.log(result);

					var sSale;
					var oPODecisionfinal = [];
					for (var iRow = 0; iRow < result.length; iRow++) {
						var Material = result[iRow].Matnr;
						var PoCount = result[iRow].MatCount;

						if (Material !== "" || Material !== undefined) {
							for (var z1 = 0; z1 < oOneDaySale.length; z1++) {
								if (Material === oOneDaySale[z1].Matnr) {
									sSale = oOneDaySale[z1].SaleCount;

								}
							}
						}
						var Leadtime = 0;
						//	var Ebeln = 1;
						var Description;

						for (var i = 0; i < oAllPoData.length; i++) {

							if (oAllPoData[i].Matnr == Material) {
								Description = oAllPoData[i].Description;
								sTotalLabst = oAllPoData[i].sTotalLabst;
								//	Ebeln++;
								Leadtime = Leadtime + oAllPoData[i].LeadTime;

							}
						}

						if (sSale == "" || sSale == undefined) {

							sSale = 0;
						} else {
							sSale = sSale;
						}

						if (Material !== "" || Material !== undefined) {
							for (var z1 = 0; z1 < odatacolor.length; z1++) {
								if (Material === odatacolor[z1].Material) {
									var colorS = odatacolor[z1].Color;

								}
							}
						}

						oPODecisionfinal.push({
							Matnr: Material,
							Color: colorS,
							Description: Description,
							Labst: parseInt(sTotalLabst),
							AvailableQuantity: parseInt(sTotalLabst) + " Units",
							Leadtime: Leadtime,
							Ebeln: PoCount,
							Lead: Math.round((Leadtime / PoCount)) + " Days",
							LeadBuffer: Math.round((Leadtime / PoCount)),
							Sale: sSale

							//RunoutofStock : Math.round(parseInt(sTotalLabst)/Sale)

						});
						sSale = "";
						if (oPODecisionfinal[iRow].Sale !== 0) {
							oPODecisionfinal[iRow].RunoutofStock = (oPODecisionfinal[iRow].Labst) / oPODecisionfinal[iRow].Sale;
							oPODecisionfinal[iRow].Sale = oPODecisionfinal[iRow].Sale + " Units";
							oPODecisionfinal[iRow].Buffer = Math.round(percentage(50, oPODecisionfinal[iRow].Leadtime));
							var orderdate = oPODecisionfinal[iRow].RunoutofStock - (oPODecisionfinal[iRow].Buffer + oPODecisionfinal[iRow].LeadBuffer);
							oPODecisionfinal[iRow].Buffer = oPODecisionfinal[iRow].Buffer + " Days";
							var currentDate = new Date();
							currentDate.setDate(currentDate.getDate() + orderdate);
							var cuDate = currentDate.toDateString();
							oPODecisionfinal[iRow].Date = cuDate;

						} else {
							oPODecisionfinal[iRow].Date = "NA";
							oPODecisionfinal[iRow].Sale = oPODecisionfinal[iRow].Sale + " Units";
							oPODecisionfinal[iRow].Buffer = Math.round(percentage(50, oPODecisionfinal[iRow].Leadtime));
							oPODecisionfinal[iRow].Buffer = oPODecisionfinal[iRow].Buffer + " Days";
						}

					}

					oView.getModel("oLeadTimeModel").setSizeLimit(oPODecisionfinal.length);
					oView.getModel("oLeadTimeModel").setData(oPODecisionfinal);

				},
				error: function(oError) {
					BusyIndicator.hide();
					MessageBox.error(oError);
				}

			});
		},

		getSaleData: function(oEvnt) {
			var oModel = this.getOwnerComponent().getModel("StockModel");

			var s2 = "2022-01-12T09:14:42";
			//	var s2 = "2022-01-12T12:04:39";
		
			var sTodaysDate = new Date();
			sTodaysDate.setDate(sTodaysDate.getDate() - 1);
			var ss = sTodaysDate.toISOString();
			var sCurrentDate = ss.slice(0, -5);
			
			var oFilter1 = new sap.ui.model.Filter('Erdat', sap.ui.model.FilterOperator.EQ, s2);

			BusyIndicator.show(true);
			oModel.read("/getposo_dataSet", {
				filters: [oFilter1],
				success: function(oData) {
					BusyIndicator.hide();

					var index = {};
					var result = [];
					//sale count for 24 hours
					oData.results.forEach(function(point) {
						var key = "" + point.Matnr + " ";

						if (key in index) {

							index[key].SaleCount++;

						} else {
							var newEntry = {

								Matnr: point.Matnr,

								//	Name1 : vendorname,
								SaleCount: 1

							};
							index[key] = newEntry;

							result.push(newEntry);

						}
					});

					oOneDaySale = result;
			
				},
				error: function(oError) {
					BusyIndicator.hide();
					MessageBox.error(oError);
				}

			});
		},
		onExport: function() {
			var aCols, oRowBinding, oSettings, oSheet, oTable;
			if (!this._oTable) {
				this._oTable = this.byId('leadtimeTable');
			}
			oTable = this._oTable;
			oRowBinding = oTable.getBinding('items');
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
				label: 'Material No',
				property: 'Matnr',
				type: EdmType.String

			});
			aCols.push({
				label: 'Material Discription',
				property: 'Description',
				type: EdmType.String

			});
			aCols.push({
				label: 'Quantity',
				type: EdmType.String,
				property: 'AvailableQuantity',
				scale: 0
			});
			aCols.push({
				label: 'Last 1 Day Sale',
				type: EdmType.String,
				property: 'Sale',
				scale: 0
			});
			aCols.push({
				label: 'LeadTime',
				type: EdmType.String,
				property: 'Lead',
				scale: 0
			});

			aCols.push({
				label: 'Buffer',
				type: EdmType.String,
				property: 'Buffer',
				scale: 0
			});

			aCols.push({
				label: 'Order Date',
				property: 'Date',
				type: EdmType.Date
			});

			return aCols;
		},
		onSearchMaterial: function(oEvent) {
			var aFilter = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery) {
				aFilter.push(
					new Filter("Matnr", FilterOperator.EQ, sQuery));

			}
			// update list binding
			var slist = this.getView().byId("leadtimeTable");
			var binding = slist.getBinding("items");
			binding.filter(aFilter, "Application");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.vSimpleApp.view.PoDecision
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.vSimpleApp.view.PoDecision
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.vSimpleApp.view.PoDecision
		 */
		//	onExit: function() {
		//
		//	}

	});

});