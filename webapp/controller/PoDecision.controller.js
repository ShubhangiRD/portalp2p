sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	'sap/ui/core/BusyIndicator',
	"sap/ui/model/json/JSONModel"
], function(Controller, MessageToast, MessageBox, History, BusyIndicator, JSONModel) {
	"use strict";
	var oController, oView, oComponent;
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

			//	this._get_po_decision();
			//	this._getpo_so_data();
			var oData = new JSONModel();
			oView.setModel(oData, "oCheckModel");

		//	this.getAllPoData();
		
		this.getAllMaterialData();
		
	

			//	this._getLabst_matlab();
		},
		_get_po_decision: function() {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			var oLeadTimeModel = oView.getModel("oLeadTimeModel");
			var aLeadTime = [];
			var s1 = "2021-06-30T12:04:39";
			var s2 = "2022-01-17T12:04:39";

			//	var a ="2021-02-17T12:04:39";
			//	var b = "2021-12-19T8:38:23";
			var oFilter1 = new sap.ui.model.Filter('Erdat', sap.ui.model.FilterOperator.EQ, s1);
			var oFilter2 = new sap.ui.model.Filter('Erdat2', sap.ui.model.FilterOperator.EQ, s2);

			BusyIndicator.show(true);
			oModel.read("/get_po_decisionSet", {
				filters: [oFilter1, oFilter2],
				success: function(oData) {
					BusyIndicator.hide();
					var odata = oData.results;
					oGlobalData = oData.results;
					console.log(odata);
					var len = oData.results.length;
					for (var iRowIndex = 0; iRowIndex < len; iRowIndex++) {
						var createddate = odata[iRowIndex].Prdat;
						var deliverycompleteddate = odata[iRowIndex].Eindt;

						var Matnr = odata[iRowIndex].Matnr;
						var Labst = odata[iRowIndex].Labst;
						var Wemng = odata[iRowIndex].Wemng;
						var Vbeln = odata[iRowIndex].Vbeln;
						// var createddate = odata[iRowIndex].Prdat;
						// var createddate = odata[iRowIndex].Prdat;
						// var createddate = odata[iRowIndex].Prdat;

						var date1 = new Date(createddate);
						var date2 = new Date(deliverycompleteddate);
						var diffTime = Math.abs(date2 - date1);
						var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

						aLeadTime.push({
							Matnr: Matnr,
							LeadTime: diffDays,
							Quantity: Wemng,
							Labst: Labst
						});

					}
					console.log(aLeadTime);
					var index = {};
					var result = [];

					aLeadTime.forEach(function(point) {
						var key = "" + point.Matnr + " ";

						if (key in index) {
							index[key].count++;
						} else {
							var newEntry = {

								Matnr: point.Matnr,
								//	Vbeln : point.Vbeln,
								//	Name1 : vendorname,
								count: 1
							};
							index[key] = newEntry;
							result.push(newEntry);

						}
					});
					console.log(result)
					oLeadTimeModel.setData(aLeadTime);
					oLeadTimeModel.setSizeLimit(100);
					//	oLeadTimeModel.setData(oData.results);
					oLeadTimeModel.refresh(true);

				},
				error: function(oError) {
					BusyIndicator.hide();
					MessageBox.error(oError);
				}

			});
		},
		getPo_decision: function() {

			var iItem = oGlobalData.length;
			var aListofVendoritem = [];

			for (var iRowIndex = 0; iRowIndex < iItem; iRowIndex++) {
				//		console.log(iRowIndex);
				var Matnr = oGlobalData[iRowIndex].Matnr;
				var Vbeln = oGlobalData[iRowIndex].Vbeln;
				aListofVendoritem.push({
					Matnr: Matnr,
					Vbeln: Vbeln

				});
			}

			var index = {};
			var result = [];

			aListofVendoritem.forEach(function(point) {
				var key = "" + point.Matnr + " ";

				if (key in index) {
					index[key].count++;
				} else {
					var newEntry = {
						Matnr: point.Matnr,
						//	Vbeln : point.Vbeln,
						//	Name1 : vendorname,
						count: 1
					};
					index[key] = newEntry;
					result.push(newEntry);

				}
			});
			console.log(result);
		},

		_getpo_so_data1: function(event) {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			var oLeadTimeModel = oView.getModel("oLeadTimeModel");
			var aLeadTime = [];
			var oFinalLead = [];
			var newLeadArr = [];
			var s1 = "2021-06-30T12:04:39";
			var s2 = "2022-01-17T12:04:39";

			//	var a ="2021-02-17T12:04:39";
			//	var b = "2021-12-19T8:38:23";
			var oFilter1 = new sap.ui.model.Filter('Erdat', sap.ui.model.FilterOperator.EQ, s1);
			var oFilter2 = new sap.ui.model.Filter('Erdat2', sap.ui.model.FilterOperator.EQ, s2);

			BusyIndicator.show(true);
			oModel.read("/getposo_dataSet", {
				filters: [oFilter1, oFilter2],
				success: function(oData) {
					BusyIndicator.hide();
					var odata = oData.results;
					oGlobalData = oData.results;
					//	console.log(odata);
					var len = oData.results.length;
					for (var iRowIndex = 0; iRowIndex < len; iRowIndex++) {
						var createddate = odata[iRowIndex].Prdat;
						var deliverycompleteddate = odata[iRowIndex].Eindt;

						var Matnr = odata[iRowIndex].Matnr;
						var Labst = odata[iRowIndex].Labst;
						var Wemng = odata[iRowIndex].Wemng;
						var Vbeln = odata[iRowIndex].Vbeln;

						var date1 = new Date(createddate);
						var date2 = new Date(deliverycompleteddate);
						var diffTime = Math.abs(date2 - date1);
						var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

						aLeadTime.push({
							Matnr: Matnr,
							LeadTime: diffDays,
							Quantity: Wemng,
							Labst: Labst,
							Vbeln: Vbeln
						});
						var index = {};
						var result = [];

						aLeadTime.forEach(function(point) {
							var key = "" + point.Matnr + " ";

							if (key in index) {
								index[key].SalesCount++;
							} else {
								var newEntry = {

									Matnr: point.Matnr,
									//	Vbeln : point.Vbeln,
									//	Name1 : vendorname,
									SalesCount: 1
								};
								index[key] = newEntry;
								result.push(newEntry);

							}
						});
						//	console.log(result)

					}
					console.log(aLeadTime);
					for (var v = 0; v < aLeadTime.length; v++) {
						var Matnr3 = aLeadTime[v].Matnr;
						var LeadTime = aLeadTime[v].LeadTime;
						var Labst3 = aLeadTime[v].Labst;

						if (Matnr3 !== "" || Matnr3 !== undefined) {
							for (var x = 0; x < result.length; x++) {
								if (Matnr3 === result[x].Matnr) {
									var SalesCount = result[x].SalesCount;

								}
							}
						}

						newLeadArr.push({
							Matnr: Matnr3,
							LeadTime: LeadTime,

							Labst: Labst3,
							SalesCount: SalesCount
						});

					}
					console.log(newLeadArr);

					// for (var v = 0; v < result.length; v++) {

					// 	var MatnrSO = result[v].Matnr;
					// 		var count = result[v].count;
					// 	var len2 = aLeadTime.length;
					// 	for (var i = 0; i < len2; i++) {

					// 	var le =aLeadTime[i].LeadTime ;
					// 		if (aLeadTime[i].Matnr == Matnr) {
					// 			aLeadTime[i].SalesCount = count;
					// 		}else{
					// 		aLeadTime[i].SalesCount = 0;
					// 		}
					// 	}
					// 	oFinalLead.push({
					// 		Matnr: MatnrSO,
					// 		LeadTime :le,

					// 		SalesCount: count
					// 	});

					// }

					// var index = {};
					// var result = [];

					// aLeadTime.forEach(function(point) {
					// 	var key = "" + point.Matnr + " ";

					// 	if (key in index) {
					// 		index[key].count++;
					// 	} else {
					// 		var newEntry = {

					// 			Matnr: point.Matnr,
					// 			//	Vbeln : point.Vbeln,
					// 			//	Name1 : vendorname,
					// 			count: 1
					// 		};
					// 		index[key] = newEntry;
					// 		result.push(newEntry);

					// 	}
					// });
					// console.log(result)

				},
				error: function(oError) {
					BusyIndicator.hide();
					MessageBox.error(oError);
				}

			});
		},

		_getpo_so_data: function(event) {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			var oLeadTimeModel = oView.getModel("oLeadTimeModel");

			var oFinalLead = [];
			var newLeadArr = [];
			var s1 = "2021-06-30T12:04:39";
			var s2 = "2022-01-17T12:04:39";

			//	var a ="2021-02-17T12:04:39";
			//	var b = "2021-12-19T8:38:23";
			var oFilter1 = new sap.ui.model.Filter('Erdat', sap.ui.model.FilterOperator.EQ, s1);
			var oFilter2 = new sap.ui.model.Filter('Erdat2', sap.ui.model.FilterOperator.EQ, s2);

			BusyIndicator.show(true);
			oModel.read("/getposo_dataSet", {
				filters: [oFilter1, oFilter2],
				success: function(oData) {
					BusyIndicator.hide();
					var odata = oData.results;
					//	oGlobalData = oData.results;
					console.log(odata);

					var aLeadTime2 = [];

					var index = {};
					var result = [];

					oData.results.forEach(function(point) {
						var key = "" + point.Matnr + " ";

						if (key in index) {
							index[key].SalesCount++;
						} else {
							var newEntry = {

								Matnr: point.Matnr,
								//	Vbeln : point.Vbeln,
								//	Name1 : vendorname,
								SalesCount: 1
							};
							index[key] = newEntry;
							result.push(newEntry);

						}
					});

					//	oView.getModel("oLeadTimeModel").setData(result);

					var len = result.length;
					for (var iRowIndex = 0; iRowIndex < len; iRowIndex++) {
						var Matnr = result[iRowIndex].Matnr;

						// 	if (Matnr !== "" || Matnr !== undefined) {
						// 	for (var x = 0; x < oMaterialList.length; x++) {
						// 		if (Matnr === oMaterialList[x].Materialno) {
						// 			var sMatDescription = oMaterialList[x].Description;

						// 		}
						// 	}
						// }

						// 	if (Matnr !== "" || Matnr !== undefined) {
						// 		for (var z = 0; z < TotalLabst.length; z++) {
						// 			if (Matnr === TotalLabst[z].Matnr) {
						// 				var sTotalLabst = TotalLabst[z].Labst;

						// 			}
						// 		}
						// 	}

						var SalesCount = result[iRowIndex].SalesCount;

						// 		if (Matnr !== "" || Matnr !== undefined) {
						// 	for (var x = 0; x < result.length; x++) {
						// 		if (Matnr === result[x].Matnr) {
						// 			var SalesCount = result[x].SalesCount;

						// 		}
						// 	}
						// }

						aLeadTime2.push({
							Matnr: Matnr,
							Discription: sMatDescription,
							//LeadTime: diffDays,
							Labst: sTotalLabst,
							SalesCount: SalesCount
						});

					}

					console.log(aLeadTime2);

					oView.getModel("oLeadTimeModel").setData(aLeadTime2);

					// var len = odata.length;
					// for (var iRowIndex = 0; iRowIndex < len; iRowIndex++) {
					// 	var createddate = odata[iRowIndex].Prdat;
					// 	var deliverycompleteddate = odata[iRowIndex].Eindt;

					// 	var Matnr = odata[iRowIndex].Matnr;

					// 			if (Matnr !== "" || Matnr !== undefined) {
					// 		for (var x = 0; x < result.length; x++) {
					// 			if (Matnr === result[x].Matnr) {
					// 				var SalesCount = result[x].SalesCount;

					// 			}
					// 		}
					// 	}

					// 	var Labst = odata[iRowIndex].Labst;
					// 	var Wemng = odata[iRowIndex].Wemng;
					// 	var Vbeln = odata[iRowIndex].Vbeln;

					// 	var date1 = new Date(createddate);
					// 	var date2 = new Date(deliverycompleteddate);
					// 	var diffTime = Math.abs(date2 - date1);
					// 	var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

					// 	aLeadTime2.push({
					// 		Matnr: Matnr,
					// 		LeadTime: diffDays,
					// 		Quantity: Wemng,
					// 		Labst: Labst,
					// 		Vbeln: Vbeln,
					// 		SalesCount : SalesCount
					// 	});

					// }

					// 	var index = {};
					// 					var result = [];

					// aLeadTime2.forEach(function(point) {
					// 						var key = "" + point.Matnr + " ";

					// 						if (key in index) {
					// 							index[key].SalesCount++;
					// 						} else {
					// 							var newEntry = {

					// 								Matnr: point.Matnr,
					// 								//	Vbeln : point.Vbeln,
					// 								//	Name1 : vendorname,
					// 								SalesCount: 1
					// 							};
					// 							index[key] = newEntry;
					// 							result.push(newEntry);

					// 						}
					// 					});

				},
				error: function(oError) {
					BusyIndicator.hide();
					MessageBox.error(oError);
				}

			});
		},

		_getLabst_matlab: function(event) {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			var oLeadTimeModel = oView.getModel("oLeadTimeModel");
			var oDecision = [];
			oModel.read("/get_matlabDataSet", {

				success: function(oData) {
					BusyIndicator.hide();
					var odata = oData.results;
					//	matLabData =  oData.results;
					var len = oData.results.length;

					for (var iRowIndex = 0; iRowIndex < len; iRowIndex++) {

						var Matnr = odata[iRowIndex].Matnr;
						if (Matnr !== "" || Matnr !== undefined) {
							for (var x = 0; x < resultSetSO.length; x++) {
								if (Matnr === resultSetSO[x].Matnr) {
									var SalesCount = resultSetSO[x].SalesCount;

								}
							}
						}
						// 			if (Matnr !== "" || Matnr !== undefined) {
						// 	for (var y = 0; y < aLeadTime.length; y++) {
						// 		if (Matnr === aLeadTime[x].Matnr) {
						// 			var LeadTime = aLeadTime[x].LeadTime;

						// 		}
						// 	}
						// }

						var Labst = odata[iRowIndex].Labst;
						var Maktx = odata[iRowIndex].Maktx;
						var Lgort = odata[iRowIndex].Lgort;
						var Werks = odata[iRowIndex].Werks;

						oDecision.push({
							Matnr: Matnr,
							Maktx: Maktx,
							Lgort: Lgort,
							Labst: Labst,
							Werks: Werks,
							//LeadTime : LeadTime,
							SalesCount: SalesCount

						});

					}
					console.log(oDecision);
				},
				error: function(oError) {
					BusyIndicator.hide();
					MessageBox.error(oError);
				}

			});
		},
		getMaterialstockSet: function() {
			BusyIndicator.show(true);
			var oModel = this.getOwnerComponent().getModel("StockModel");

			oModel.read('/getMaterialstockSet', {
				success: function(odata) {

					var iItem = odata.results.length;
					var ListItem = [];
					for (var iRowIndex = 0; iRowIndex < iItem; iRowIndex++) {

						var Matnr = odata.results[iRowIndex].Matnr;
						ListItem.push({
							Matnr: Matnr

						});
					}
					var index = {};

					ListItem.forEach(function(point) {
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

					for (var x = 0; x < TotalLabst.length; x++) {
						var orderCount = 0;
						for (var j = 0; j < data.length; j++) {
							if (TotalLabst[x].Matnr === data[j].Matnr) {
								orderCount = orderCount + parseInt(data[j].Labst);
								TotalLabst[x].Labst = orderCount.toString();
							}

						}

					}
					//	console.log(TotalLabst);

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

					console.log(odata);
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
						// var createddate = odata[iRowIndex].Prdat;
						// var createddate = odata[iRowIndex].Prdat;
						// var createddate = odata[iRowIndex].Prdat;

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
							SalesConsume : SoCount/30,
							

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
		_getMaterialAndDescriptionData: function(event) {
			var oModel = this.getOwnerComponent().getModel("StockModel");

			var oDecision = [];
			oModel.read("/get_matlabDataSet", {

				success: function(oData) {
					BusyIndicator.hide();
					var odata = oData.results;
					matLabData = oData.results;

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
			/*else if (oselecttab === "Current Month") {
				var firstDay = new Date(CurrentD.getFullYear(), CurrentD.getMonth(), 1);
				var lastDay = new Date(CurrentD.getFullYear(), CurrentD.getMonth() + 1, 0);
				var last1mon = firstDay.toISOString().slice(0, 19);
				var endo1mon = lastDay.toISOString().slice(0, 19);
				this.getView().getModel("oSkuModel").setProperty("/FirstDate", last1mon);
				this.getView().getModel("oSkuModel").setProperty("/EndDate", endo1mon);
			}*/
			else if (oselecttab === "Last 1 Month") {
				var LastMonth = new Date().toISOString().slice(0, 19);
				CurrentD.setMonth(CurrentD.getMonth() - 1);
				var CurrentDate = CurrentD.toISOString().slice(0, 19);
				oView.getModel("oCheckModel").setProperty("/FirstDate", LastMonth);
				oView.getModel("oCheckModel").setProperty("/EndDate", CurrentDate);

			} else if (oselecttab === "Last 3 Months") {
				var dateString1 = new Date().toISOString().slice(0, 19);
				CurrentD.setMonth(CurrentD.getMonth() - 3);
				var Last3Month = CurrentD.toISOString().slice(0, 19);
				oView.getModel("oCheckModel").setProperty("/FirstDate", dateString1);
				oView.getModel("oCheckModel").setProperty("/EndDate", Last3Month);

			} else if (oselecttab === "Last 6 Months") {
				var dateString2 = new Date().toISOString().slice(0, 19);
				CurrentD.setMonth(CurrentD.getMonth() - 6);
				var Last3Month2 = CurrentD.toISOString().slice(0, 19);
				oView.getModel("oCheckModel").setProperty("/FirstDate", dateString2);
				oView.getModel("oCheckModel").setProperty("/EndDate", Last3Month2);

			}
		},

		onFetchDecision: function() {
			var oModel = this.getOwnerComponent().getModel("StockModel");
			var oDataModel = oView.getModel("oCheckModel");
			var FirstDate = oDataModel.oData.FirstDate;
			var EndDate = oDataModel.oData.EndDate;

			console.log(oDataModel);
			var  oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
			var firstDate = new Date(FirstDate);
			var secondDate = new Date(EndDate);

			var diffDaysCount = Math.round(Math.abs((firstDate - secondDate) / oneDay));
			console.log(diffDaysCount);


			var oFilter1 = new sap.ui.model.Filter('Erdat', sap.ui.model.FilterOperator.EQ, EndDate);
			var oFilter2 = new sap.ui.model.Filter('Erdat2', sap.ui.model.FilterOperator.EQ, FirstDate);
			var oAllPoData = [];
			BusyIndicator.show(true);
			oModel.read("/get_po_decisionSet", {
				filters: [oFilter1, oFilter2],

				success: function(oData) {
					BusyIndicator.hide();
					var odata = oData.results;

//var currentDate = new Date();
					console.log(odata);
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
						// var createddate = odata[iRowIndex].Prdat;
						// var createddate = odata[iRowIndex].Prdat;
						// var createddate = odata[iRowIndex].Prdat;

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
							Labst: parseInt(sTotalLabst),
							Leadtime: Leadtime,
							Ebeln: Ebeln,
							Lead: Math.trunc((Leadtime / Ebeln)) + " Days",
							SoCount: SoCount,
						
							Buffer: Math.trunc((Leadtime / Ebeln)) + 2,
							SalesConsumeOnday : SoCount/diffDaysCount,
						//	finishStockDay : (parseInt(sTotalLabst)/(SoCount/diffDaysCount)),
						//	orderWillbeDay : Math.trunc((parseInt(sTotalLabst)/(SoCount/diffDaysCount))-(Leadtime+2)),
						//	Date: new Date(Date.now() - (Math.trunc((Leadtime / Ebeln)) + 2) * 24 * 60 * 60 * 1000),
						//	Date1: tomorrow.setDate(today.getDate()+ Math.trunc((parseInt(sTotalLabst)/(SoCount/diffDaysCount))-(Leadtime+2))),
					 currentDate : new Date()
						//	Date : currentDate.setDate(currentDate.getDate() + 100)
						//var currentDate = new Date();
							//currentDate.setDate(currentDate.getDate() + 10000);

						});
						
					var finishStockDay = oNwLe[iRow].SalesConsumeOnday ;
						var newst = oNwLe[iRow].Labst / finishStockDay;
						oNwLe[iRow].finishStockDay = newst;
						var orderWillbeDay =	newst - oNwLe[iRow].Leadtime +2  ;
						var currentDate = new Date();
						currentDate.setDate(currentDate.getDate() + orderWillbeDay);
						console.log(currentDate);
						oNwLe[iRow].Date = currentDate;
						
	
					}


console.log(oNwLe);

					oView.getModel("oLeadTimeModel").setData(oNwLe);
					oView.getModel("oLeadTimeModel").setSizeLimit(1326);

				},
				error: function(err) {
					console.log(err);
				}

			});
			//	var sVendorCreate = "/StockvsSales2Set?$filter=(Erdat eq datetime'2021-03-17T12:04:39' and Erdat2 eq datetime'2021-11-11T13:19:55' and Matnr eq '000000000050065555' )";
			//	BusyIndicator.show(true);

		},
		getAllMaterialData : function (){
			var oModel = this.getOwnerComponent().getModel("StockModel");
			var oLeadTimeModel = oView.getModel("oLeadTimeModel");
var oAllPoData = [];


 function percentage (percent, total) {
    return ((percent/ 100) * total).toFixed(2);
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
						var createddate = odata[iRowIndex].Prdat;
						var deliverycompleteddate = odata[iRowIndex].Eindt;

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
						//var Vbeln = odata[iRowIndex].Vbeln;
					

						var date1 = new Date(createddate);
						var date2 = new Date(deliverycompleteddate);
						var diffTime = Math.abs(date2 - date1);
						var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//||sTotalLabst !== "" || sTotalLabst !== undefined ||  Matnr !== "" || Ebeln !== ""
				if (sTotalLabst !== "0" && Matnr && Ebeln) {
						oAllPoData.push({
								Matnr: Matnr,
								Description: sMatDescription,
								LeadTime: diffDays,
							//	Vbeln: Vbeln,
								Ebeln: Ebeln,
								sTotalLabst : sTotalLabst
							});	
				}

					}
			//	console.log(oAllPoData);
					var index = {};
					var result = [];
					var soindex = {};

					oAllPoData.forEach(function(point) {
						var key = "" + point.Matnr + " ";
					

						if (key in index) {

							index[key].MatCount++;

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
					
					
				//	console.log(result);
					
				var Sale ;
						var oNwLe = [];
					for (var iRow = 0; iRow < result.length; iRow++) {
						var Material = result[iRow].Matnr;
						var PoCount = result[iRow].MatCount;

					
						if (Material !== "" || Material !== undefined) {
							for (var z1 = 0; z1 < oOneDaySale.length; z1++) {
								if (Material === oOneDaySale[z1].Matnr) {
								Sale = oOneDaySale[z1].SaleCount;
									

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
						
							if (Sale == "" || Sale == undefined) {
				
							Sale = 0;	
						}else{
								Sale= Sale;
						}
						
						oNwLe.push({
							Matnr: Material,
							Description: Description,
							Labst: parseInt(sTotalLabst),
							Leadtime: Leadtime,
							Ebeln: PoCount,
							Lead: Math.round((Leadtime / PoCount)) + " Days",
							LeadBuffer : Math.round((Leadtime / PoCount)),
							Sale: Sale,
					
							//RunoutofStock : Math.round(parseInt(sTotalLabst)/Sale)

						});
							Sale = "";
						if(oNwLe[iRow].Sale !== 0){
						oNwLe[iRow].RunoutofStock =  (oNwLe[iRow].Labst)/oNwLe[iRow].Sale;	
						}else{
							oNwLe[iRow].RunoutofStock = oNwLe[iRow].Labst;
						}
							oNwLe[iRow].Buffer =  Math.round(percentage(50, oNwLe[iRow].Leadtime));
							var orderdate = oNwLe[iRow].RunoutofStock - (oNwLe[iRow].Buffer);
					
								var currentDate = new Date();
						currentDate.setDate(currentDate.getDate() + orderdate);
				
						oNwLe[iRow].Date = currentDate;
					}
					
					console.log(oNwLe);

						oView.getModel("oLeadTimeModel").setSizeLimit(oNwLe.length);
					oView.getModel("oLeadTimeModel").setData(oNwLe);
				
					
				},
				error: function(oError) {
					BusyIndicator.hide();
					MessageBox.error(oError);
				}

			});
		},
		
		

   
		getSaleData : function(oEvnt){
					var oModel = this.getOwnerComponent().getModel("StockModel");
			var oLeadTimeModel = oView.getModel("oLeadTimeModel");
		
			
			var s2 = "2022-01-12T12:04:39";
			var d = new Date();
			d.setDate(d.getDate() - 1);
				var ss = d.toISOString();
			var s = ss.slice(0, -5);

	

			var oFilter1 = new sap.ui.model.Filter('Erdat', sap.ui.model.FilterOperator.EQ, s2);
			
			BusyIndicator.show(true);
			oModel.read("/getposo_dataSet", {
				filters: [oFilter1],
				success: function(oData) {
					BusyIndicator.hide();
				
				
					var index = {};
					var result = [];
				

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
					
					
			oOneDaySale =result  ;
				console.log(oOneDaySale)
				
				},
				error: function(oError) {
					BusyIndicator.hide();
					MessageBox.error(oError);
				}

			});
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