sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/m/Button",
	"sap/m/Dialog",
	"sap/m/List",
	"sap/ui/core/routing/History",
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
], function(jQuery, Controller, JSONModel, Filter, Button, Dialog, List, History, StandardListItem, Text, mobileLibrary, BusyIndicator,
	MessageToast, MessageBox, FilterOperator, AccrualItem) {
	"use strict";
	//global variable
	var oView, oController, oComponent;
	return Controller.extend("com.vSimpleApp.controller.MassUpload", {

		onInit: function() {
			var oUserModel = this.getOwnerComponent().getModel("User");
			var sUsername = oUserModel.getProperty("/Username");
			if (sUsername === "") {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("Login");
			}
			oController = this;
			oView = this.getView();
			oComponent = this.getOwnerComponent();

			//create the model and set the json data
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("utils/Massupload.json");
			this.getView().setModel(oModel, "MassuploadModel");
			var oUpload = new JSONModel({
				items: []
			});
			this.getView().setModel(oUpload, "UploadModel");

		},
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onNavBack: function(oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("Dashboard", {}, true /*no history*/ );
			}
		},
		_onObjectMatched: function(oEvent) {
			var oGlobalKeys = oComponent.getModel("GlobalKeys");
			oGlobalKeys.getData().page = "massupload";
			oGlobalKeys.refresh(true);

			$("#nav-icon1").addClass("back");
			$("#nav-icon1").removeClass("open");
		},

		onUpload: function(e) {
			//File upload to server
			BusyIndicator.show(0);
			var aXldata = {};
			var agdata = [];
			var bFlag = 1;
			var fU = this.getView().byId("idfileUploader");
			var domRef = fU.getFocusDomRef();
			var file = domRef.files[0];

			var filename = file.name;
			if (filename.indexOf("contract") !== -1) {

				// Create a File Reader object
				var reader = new FileReader();

				var iCntr = 1;
				var aTcntr = [];
				var strag = [];
				var iTmpcnt = 0;
				var Rate01Set = [];
				var HeaderToMaterial = [];
				var scalecnt = 0;
				reader.onload = function(e) {
					var myFunction = function() {

						var data = e.target.result;
						var workbook = XLSX.read(data, {
							type: 'binary'
						});
						//   console.log(workbook);
						var first_sheet_name = workbook.SheetNames[0];
						/* Get worksheet */
						var worksheet = workbook.Sheets[first_sheet_name];
						aXldata = XLSX.utils.sheet_to_json(worksheet, {
							raw: true
						});
						console.log(aXldata);

					};
					myFunction();

					function onlyUnique(value, index, self) {
						return self.indexOf(value) === index;
					}
					var aUniqueAgCount = [];
					for (var iRowIndex = 0; iRowIndex < aXldata.length; iRowIndex++) {
						aUniqueAgCount.push(aXldata[iRowIndex].VENDORNO);
					}
					aUniqueAgCount = aUniqueAgCount.filter(onlyUnique);
					aTcntr = aUniqueAgCount;
					console.log(aUniqueAgCount);
					//return false;
					for (var j = 0; j < aUniqueAgCount.length; j++) {
						var HeaderToItem = [];
						var aAgreement = {};
						var iAgcnt = 1;
						for (var i = 0; i < aXldata.length; i++) {
							var x1 = aXldata[i].VENDORNO;
							if (x1 === "" || x1 === undefined) {
								MessageBox.alert("Vendor number field connot be empty");
								bFlag = 0;
								return false;
							}
							var x2 = aUniqueAgCount[j];
							console.log(x1 + "*****" + x2);
							if (x1 === x2) {
								if (iAgcnt === 1) {
									var vFrom = "2020-01-01T00:00:00";
									var vTo = "2020-12-31T00:00:00";
									//agreement.ValidFrom = vFrom;
									//agreement.ValidTo = vTo;
									var vid = aXldata[i].VENDORNO;
									var sg = aXldata[i].PURORG;
									aAgreement.Rcont = "1";
									aAgreement.Vendorno = vid.toString();
									aAgreement.Vendorname = ""; //xldata[i].CUSTOMER_NAME;
									aAgreement.Purorg = sg.toString();
									aAgreement.Compcode = "0001";
									aAgreement.Currency = aXldata[i].CURR;
									aAgreement.Kdatb = aXldata[i].KDATB; //xldata.VALID_FROM;
									aAgreement.Kdate = aXldata[i].KDATE; //xldata.VALID_TO;
									aAgreement.Aedtm = vFrom;
									aAgreement.Ernam = aXldata[i].ERNAM;
									aAgreement.Erdat = aXldata[i].ERDAT;
									aAgreement.Description = aXldata[i].DESC;
									aAgreement.Uname = "prasad";
									//push the items to entityset		
								}
								//	else{
								var scale = aXldata[i].SCALE;
								var sRate = aXldata[i].RATE;
								if (sRate === "" || sRate === undefined) {
									MessageBox.alert("Rate field connot be empty");
									bFlag = 0;
									return false;

								}
								var item = aXldata[i].ITEM; //agreement.getProperty("/MergeList/" + iRowIndex + "/FlexibleGrpNo");
								item = item.toString();
								if (item === "" || item === undefined) {
									MessageBox.alert("Item number field connot be empty");
									bFlag = 0;
									return false;

								}

								var rtype = aXldata[i].RTYPE;
								if (rtype === "" || rtype === undefined) {
									MessageBox.alert("Rebate type field connot be empty");
									bFlag = 0;
									return false;
								}
								var rate = sRate.toString(); //agreement.getProperty("/MergeList/" + iRowIndex + "/Rate");
								if (rate === "" || rate === undefined) {
									MessageBox.alert("Rate field connot be empty");
									bFlag = 0;
									return false;
								}
								var base = aXldata[i].BASE;
								var ikdatb = aXldata[i].IKDATB;
								var ikdate = aXldata[i].IKDATE;
								if (scale === "x") {
									scale = "X";
									scalecnt++;
									var spend = aXldata[i].SPEND;
									spend = spend.toString();
									Rate01Set.push({
										Rcont: "",
										Spend: spend,
										Item: item,
										Rate: rate,
										Rtype: rtype,
										Srno: scalecnt.toString(),
										Scale: "X"

									});

								} else {
									scale = "";
								}

								HeaderToItem.push({
									Item: item,
									Scale: scale,
									Rate: rate,
									Rtype: rtype,
									Base: base,
									Kdatb: aXldata[i].IKDATB,
									Kdate: aXldata[i].IKDATE,
									Rcont: ""

								});

								//	}
								iAgcnt = 0;
								aAgreement.HeaderToItem = HeaderToItem;
								aAgreement.Rate01Set = Rate01Set;
								aAgreement.HeaderToMaterial = HeaderToMaterial;
							}

						}
						agdata.push(aAgreement);
						if (bFlag !== 0) {
							//alert(bFlag);
							testy(aAgreement);
						}

					}

					//console.log(agdata);

				};
				reader.readAsBinaryString(file);
				var oModel = this.getOwnerComponent().getModel("HeaderSet");

				function testy(qq) {
					var mcnt = qq.HeaderToItem;
					var mxstr = [];
					var mxstr2 = [];
					var tmp = qq.HeaderToItem;
					for (var y = 0; y < tmp.length; y++) {
						if (tmp[y].Scale !== "X")
							mxstr2.push(tmp[y]);
					}

					for (var x = 0; x < mcnt.length; x++) {
						if (mcnt[x].Scale === "X") {
							mxstr.push(mcnt[x].Rate);
						}
					}
					var max = Math.max.apply(Math, mxstr);
					var mcnt = $.grep(mcnt, function(e) {
						return e.Rate == max;
					});
					mxstr2.push(mcnt[0]);
					qq.HeaderToItem = mxstr2;

					oModel.setHeaders({
						"Content-Type": "application/json"
					});
					setTimeout(function() {
						//create the new data
						oModel.create("/HeaderSet", qq, {
							contentType: "application/json",
							success: function(oData) {
								strag.push(oData.Rcont);

							},
							error: function(oError) {
								//BusyIndicator.hide();
								var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
								MessageToast.show(errorMsg);
							}
						});
					}, 3000);
					iCntr++;
				}

				setInterval(function() {
					if (aTcntr.length === strag.length && iTmpcnt === 0) {
						BusyIndicator.hide();
						var tostr = strag.toString();
						var msg = "Contract No.: " + tostr + " created successfully";
						MessageToast.show(msg);
						iTmpcnt = 1;
					}
				}, 500);

			} else
			if (filename.indexOf("product") !== -1) {
				var reader = new FileReader();
				var t = this;

				reader.onload = function(e) {

					var myFunction = function() {

						var data = e.target.result;
						var workbook = XLSX.read(data, {
							type: 'binary'
						});

						//   console.log(workbook);
						var first_sheet_name = workbook.SheetNames[0];
						/* Get worksheet */
						var worksheet = workbook.Sheets[first_sheet_name];
						aXldata = XLSX.utils.sheet_to_json(worksheet, {
							raw: true
						});
						console.log(aXldata);

					};
					myFunction();

					function onlyUnique(value, index, self) {
						return self.indexOf(value) === index;
					}
					var aUniqueAgCount = [];
					for (var iRowIndex = 0; iRowIndex < aXldata.length; iRowIndex++) {
						aUniqueAgCount.push(aXldata[iRowIndex].HDESCRIPTION);
					}

					aUniqueAgCount = aUniqueAgCount.filter(onlyUnique);
					console.log(aUniqueAgCount);
					//return false;
					for (var j = 0; j < aUniqueAgCount.length; j++) {
						var aItemData = [];
						var aAgreement = {};
						var iAgcnt = 1;
						for (var i = 0; i < aXldata.length; i++) {
							var x1 = aXldata[i].HDESCRIPTION;
							if (x1 === "" || x1 === undefined) {
								MessageBox.alert("Header Description field connot be empty");
								bFlag = 0;
								return false;
							}
							var x2 = aUniqueAgCount[j];
							console.log(x1 + "*****" + x2);
							if (x1 === x2) {
								if (iAgcnt === 1) {
									aAgreement.Createdby = "DIPENDEV";
									aAgreement.Description = aXldata[i].HDESCRIPTION;
									var d = new Date();
									var n = d.toISOString();
									n = n.split(".");
									//push the items to entityset		
								}
								//	else{
								var l_Spras = "E";
								var l_Prodh1 = aXldata[i].MAINGROUP;
								var l_Prodh2 = aXldata[i].GROUP;
								var l_Prodh3 = aXldata[i].SUBGROUP;
								var l_Prodh4 = "";
								var l_Vtext1 = "";
								var l_Vtext2 = "";
								var l_Vtext3 = "";
								var l_Vtext4 = "";
								var l_material = aXldata[i].MATERIAL;
								if (l_Prodh1 === undefined && l_material === undefined) {
									MessageBox.alert("Main Group field and Material field connot be empty at the same time");
									bFlag = 0;
									return false;
								}
								var l_Bname = "DIPENDEV";
								var l_date = new Date().toLocaleDateString();
								aItemData.push({
									Prodh1: l_Prodh1,
									Prodh2: l_Prodh2,
									Prodh3: l_Prodh3,
									Prodh4: l_Prodh4,
									Vtext1: l_Vtext1,
									Vtext2: l_Vtext2,
									Vtext3: l_Vtext3,
									Vtext4: l_Vtext4,
									Matnr: l_material,
									Spras: l_Spras,
									Bname: l_Bname

								});
								//var agreement = {};
								aAgreement.PROD_HEADERTOPROD_HIERARCHY = aItemData;
								//	}
								iAgcnt = 0;
							}
						}
						agdata.push(aAgreement);
						if (bFlag !== 0) {

							testy(aAgreement);
						}
					}
					//console.log(agdata);

				};
				reader.readAsBinaryString(file);
				//method for creating the prod
				var oModelCreate = this.getView().getModel("prodH");

				function testy(qq) {
					oModelCreate.setHeaders({
						"Content-Type": "application/json"
					});
					oModelCreate.create("/PROD_HEADERSet", qq, {
						success: function(oResponse) {
							MessageBox.success("Success");

						},
						error: function(error) {
							MessageBox.error("ERROR");

						}

					});
				}
				/* *********************************************** prod code starts *********************************************** */

			}
			//return false;

		},
		onSavePress: function() {
			this.getView().byId("idTable").getColumns()[0].setVisible(true);
		},
		onCopyExcel: function() {
			// create value help dialog
			if (!this._flexHelpDialog) {
				this._flexHelpDialog = sap.ui.xmlfragment(
					"com.vSimpleApp.fragment.UploadFile",
					this
				);
				this.getView().addDependent(this._flexHelpDialog);
			}
			this._flexHelpDialog.open();

		}
	});

});