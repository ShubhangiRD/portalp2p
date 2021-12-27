sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/vSimpleApp/model/models",
	"sap/ui/model/json/JSONModel",
	"com/vSimpleApp/service/Application",
	"sap/ui/core/IconPool",
	"com/vSimpleApp/model/Contract",
	"com/vSimpleApp/model/Report",
	"com/vSimpleApp/model/GetPurchaseVendor",
	"com/vSimpleApp/model/GRDisplayHeader",
	"com/vSimpleApp/model/PurchaseHeader",
	"com/vSimpleApp/model/VendorP2P",
	"com/vSimpleApp/Classes/StockStandards",
	"sap/ui/core/BusyIndicator",
	"sap/m/MessageToast",
	"com/vSimpleApp/model/StockContract"

], function(UIComponent, Device, models, JSONModel, Application, IconPool, Contract, Report, GetPurchaseVendor, GRDisplayHeader,
	PurchaseHeader, VendorP2P, StockStandards,
	BusyIndicator, MessageToast, StockContract
) {
	"use strict";
	var oComponent;
	var oMaterialList, ListofVendor = [],
		ListofPurchaseOrders = [];
	return UIComponent.extend("com.vSimpleApp.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			oComponent = this;
			var oUserData = {
				Username: "JamesSmith"
			};
			var oUserModel = new JSONModel(oUserData);
			this.setModel(oUserModel, "User");

			this.getVendorList();
			this.getPurchaseOrderList();
			var oLookupData = {
				SelectedTabKey: "item",
				IsContractItemSaved: false,
				IsContractAccrualSaved: false,
				IsContractSettlementSaved: false,
				VendorList: [],
				DisplyaVendorList: [],
				POVendorList: [],
				POOrderList: [],
				MaterialList: [],
				POPlant: [],
				PurchaseOrganization: [],
				CountryCode: [],
				AccountGroup: [],
				CountryCodeRegion: [],
				StorageLocationList: [],
				MaterialDiscription: [],
				PurchaseGroupList: [],
				AdminPanelList: [],
				IndustrySet: [],
				CustomerList: [],
				BankKeyList: [],
				ExemptionAuthorityList: [],
				PaymentTermsList: [],
				ToleranceGroupList: [],
				HouseBankList: [],
				Tradingp: [],
				InterestlndicList: [],
				LanguageList: [],

				TransportZoneList: [],
				InstructionKeyList: [],
				ReleaseGroupList: [],
				OrderCurrencyList: [],
				IncotermsList: [],
				CustomerOfficeEntryList: [],
				ShippingConditionList: [],
				ActivityCodeList: [],
				ModeOfTransportList: [],
				PoDocumentNumber: [],
				PlanningGroups: [],
				OpenPOList: [],
				RegionList: [],
				MainGroup: [],
				GroupList: [],
				SubGroupList: [],
				CreatedBy : [],
				MaterialGrp :[],
				ProductHierarchy:[],
				CustomerDetails:[],
				shipdetails : [],
				ReasonForMvt :[],
				SplStock:[],
				SalesOrg1:[],
				DistributionChnl:[]
			};
			var oLookupModel = new JSONModel(oLookupData);
			this.setModel(oLookupModel, "Lookup");

var std = {
	SalesContract : new StockStandards()
};

	var oModel = new sap.ui.model.json.JSONModel(std);
			sap.ui.getCore().setModel(oModel, "SOSalesModel");







			var oPurchaseData = {
			
				//	ContractList: new POrdersList()
				TempContract: new PurchaseHeader(),
					StockContract:  new PurchaseHeader()

			};
			var oPurchaseModel = new JSONModel(oPurchaseData);
			this.setModel(oPurchaseModel, "PurchaseModel");
			
		
	var SOModel = new JSONModel([]);
			this.setModel(SOModel,"SOModel");
			var StockTransferModel = new sap.ui.model.json.JSONModel([]);
			this.setModel(StockTransferModel, "StockTransferModel");
			var oStockData = new sap.ui.model.json.JSONModel([]);
			this.setModel(oStockData, "oStockDataModel");

			 var oExcessData = new sap.ui.model.json.JSONModel([]);
		this.setModel(oExcessData, "oExcessDataModel");

	var oTransportPosting = new sap.ui.model.json.JSONModel([]);
				sap.ui.getCore().setModel(oTransportPosting, "oTransferPostModel");

	var oTransferMod = new sap.ui.model.json.JSONModel([]);
				this.setModel(oTransferMod, "oTransferMod");
			var oGRData = {
				GRPost: new GRDisplayHeader()
			};
			var oGRModel = new JSONModel(oGRData);
			this.setModel(oGRModel, "GoodReceiptModel");

			var oPoData = {
				TempContract: new PurchaseHeader()

			};
			var oPOModel = new JSONModel(oPoData);
			this.setModel(oPOModel, "POModel");

			/*	var oVData = new VendorP2P();
				var oVendor = new JSONModel(oVData);
				this.setModel(oVendor, "VendorModel");*/
			var oVData = {
				TempData: new VendorP2P()

			};
			var oVendor = new JSONModel(oVData);
			this.setModel(oVendor, "VendorModel");
			var oVendorData = {
				TempContract: new Contract(),
				ContractList: []
			};
			var oVendorModel = new JSONModel(oVendorData);
			this.setModel(oVendorModel, "Vendor");
			this.loadIconLibraries();
			Application.getInstance().Component = this;

			//getCountrymodel defined here

			var oGetCountryModel = new JSONModel();
			oGetCountryModel.setData([]);
			this.setModel(oGetCountryModel, "GetCountryModel");

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// create the views based on the url/hash
			this.getRouter().initialize();

			/*Started sim service*/

			this.setModel(Report.getInstance().getModel(), "report");

			var vendorNoData = [{
				vendorNo: "VL00451100",
				vendorName: "Acer Laptop",
				pincode: "67453"
			}, {
				vendorNo: "VL00453300",
				vendorName: "3M",
				pincode: "55144"
			}, {
				vendorNo: "VL00452200",
				vendorName: "Lenovo",
				pincode: "67330"
			}];

			var vendorNoDataModel = new sap.ui.model.json.JSONModel(vendorNoData);
			this.setModel(vendorNoDataModel, "VendorNoData");

			var nonSapErrorDataModel = new sap.ui.model.json.JSONModel([]);
			this.setModel(nonSapErrorDataModel, "NonSapErrorData");

			var sapErrorDataModel = new sap.ui.model.json.JSONModel([]);
			this.setModel(sapErrorDataModel, "SapErrorData");

			var mgrApprovalDataModel = new sap.ui.model.json.JSONModel([]);
			this.setModel(mgrApprovalDataModel, "MgrApprovalData");

			var warningDataModel = new sap.ui.model.json.JSONModel([]);
			this.setModel(warningDataModel, "WarningData");

			var inProcessDataModel = new sap.ui.model.json.JSONModel([]);
			this.setModel(inProcessDataModel, "InProcessData");

			var rejectedDataModel = new sap.ui.model.json.JSONModel([]);
			this.setModel(rejectedDataModel, "RejectedData");

			var chartDataModel = new sap.ui.model.json.JSONModel([]);
			this.setModel(chartDataModel, "chartData");

			var manualVerifyDocsModel = new sap.ui.model.json.JSONModel([]);
			this.setModel(manualVerifyDocsModel, "manualVerifyDocuments");

			/*ended sim service*/

		},
		getVendorList: function() {

			var oModel = oComponent.getModel("VHeader");
			//	BusyIndicator.show(0);
			oModel.read("/Fetch_Vendor_DetailsSet", {
				success: function(oData) {
					var item = oData.results.length;
					ListofVendor = oData.results;

					//BusyIndicator.hide();
					var oLookupModel = oComponent.getModel("Lookup");
					oLookupModel.setProperty("/DisplyaVendorList", ListofVendor);
					oLookupModel.refresh(true);
					//that.getMaterialList();
				},
				error: function(oError) {
					//BusyIndicator.hide();
					MessageToast.show(oError);
				}
			});
		},
		getMaterialList: function() {

			var oModel = oComponent.getModel("VHeader");
			//	BusyIndicator.show(true);
			oModel.read("/MaterialmasterSet", {
				success: function(oData) {
					//			BusyIndicator.hide();
					oMaterialList = oData.results;
					var oLookupModel = oComponent.getModel("Lookup");
					oLookupModel.setProperty("/MaterialList", oMaterialList);
					oLookupModel.refresh(true);

				},
				error: function(oError) {
					//			BusyIndicator.hide();
					var errorMsg = oError.statusCode + " " + oError.statusText + ":" + JSON.parse(oError.responseText).error.message.value;
					MessageToast.show(errorMsg);
				}
			});
		},

		getPurchaseOrderList: function() {

			var oModel = oComponent.getModel("VHeader");
			//	BusyIndicator.show(0);
			oModel.read("/openpo_headerSet ", {
				//	oModel.read("/just_poheaderSet", {
				success: function(oData) {

					console.log(oData);
					BusyIndicator.hide();
					var itemPO = oData.results.length;

					ListofPurchaseOrders = [];

					for (var iRowIndex = 0; iRowIndex < itemPO; iRowIndex++) {
						var odataset = oData.results[iRowIndex];

						var Compcode = odataset.Bukrs;
						var Purchaseordernumber = odataset.Ebeln;
						var pogrp = odataset.Ekgrp;
						var poorg = odataset.Ekorg;
						var lifnrr = odataset.Lifnr;
						var currency = odataset.Waers;
						var createddate = odataset.Bedat;
						var Createdby = odataset.Ernam;

						var Absgr = odataset.Absgr;
						var Addnr = odataset.Addnr;
						var Adrnr = odataset.Adrnr;
						var Angdt = odataset.Angdt;
						var Angnr = odataset.Angnr;
						var Ausnr = odataset.Ausnr;
						var Autlf = odataset.Autlf;
						var Bnddt = odataset.Bnddt;

						var Bsakz = odataset.Bsakz;
						var Bsart = odataset.Bsart;
						var Bstyp = odataset.Bstyp;
						var Bwbdt = odataset.Bwbdt;
						var Description = odataset.Description;
						var Dpamt = odataset.Dpamt;
						var Dpdat = odataset.Dpdat;
						var Dppct = odataset.Dppct;

						var Dptyp = odataset.Dptyp;
						var Exnum = odataset.Exnum;
						var Frggr = odataset.Frggr;
						var Frgke = odataset.Frgke;
						var Frgrl = odataset.Frgrl;
						var Frgsx = odataset.Frgsx;
						var Frgzu = odataset.Frgzu;
						var Gwldt = odataset.Gwldt;

						var HierarchyExists = odataset.HierarchyExists;
						var Ihran = odataset.Ihran;
						var Ihrez = odataset.Ihrez;
						var Inco1 = odataset.Inco1;
						var Inco2 = odataset.Inco2;
						var Kalsm = odataset.Kalsm;
						var Kdatb = odataset.Kdatb;
						var Kdate = odataset.Kdate;

						var Knumv = odataset.Knumv;
						var Konnr = odataset.Konnr;
						var Kornr = odataset.Kornr;
						var Ktwrt = odataset.Ktwrt;
						var Kufix = odataset.Kufix;
						var Kunnr = odataset.Kunnr;
						var Lands = odataset.Lands;
						var Lblif = odataset.Lblif;

						var LegalContract = odataset.LegalContract;
						var Lifre = odataset.Lifre;
						var Llief = odataset.Llief;
						var Loekz = odataset.Loekz;
						var Lphis = odataset.Lphis;
						var Lponr = odataset.Lponr;
						var Memory = odataset.Memory;
						var Memorytype = odataset.Memorytype;

						var MsrId = odataset.LegalContract;
						var Pincr = odataset.Pincr;
						var PohfType = odataset.PohfType;
						var Procstat = odataset.Procstat;
						var ReasonCode = odataset.ReasonCode;
						var ReleaseDate = odataset.ReleaseDate;
						var RelocId = odataset.RelocId;
						var RelocSeqId = odataset.RelocSeqId;

						var Reswk = odataset.Reswk;
						var Retpc = odataset.Retpc;
						var Rettp = odataset.Rettp;
						var Revno = odataset.Revno;
						var Rlwrt = odataset.Rlwrt;
						var Shipcond = odataset.Shipcond;
						var Spras = odataset.Spras;
						var Stafo = odataset.Stafo;

						var Stako = odataset.Stako;
						var Statu = odataset.Statu;
						var Stceg = odataset.Stceg;
						var Submi = odataset.Submi;
						var Zbd1p = odataset.Zbd1p;
						var Zbd1t = odataset.Zbd1t;
						var Zbd2p = odataset.Zbd2p;
						var Zbd2t = odataset.Zbd2t;
						var Zbd3t = odataset.Zbd3t;
						var Zterm = odataset.Zterm;

						if (lifnrr !== "" || lifnrr !== undefined) {
							for (var y = 0; y < ListofVendor.length; y++) {
								if (lifnrr == ListofVendor[y].Lifnr) {
									var venname = ListofVendor[y].Name1;
									//	console.log(venname);

								}
							}
						}

						ListofPurchaseOrders.push({
							Bukrs: Compcode,
							Ebeln: Purchaseordernumber,
							Ekgrp: pogrp,
							Ekorg: poorg,
							Lifnr: lifnrr,
							Name: venname,
							Waers: currency,
							Bedat: createddate,
							Ernam: Createdby,

							Absgr: Absgr,
							Addnr: Addnr,
							Adrnr: Adrnr,
							Angdt: Angdt,
							Angnr: Angnr,
							Ausnr: Ausnr,
							Autlf: Autlf,
							Bnddt: Bnddt,

							Bsakz: Bsakz,
							Bsart: Bsart,
							Bstyp: Bstyp,
							Bwbdt: Bwbdt,
							Description: Description,
							Dpamt: Dpamt,
							Dpdat: Dpdat,
							Dppct: Dppct,
							Dptyp: Dptyp,
							Exnum: Exnum,
							Frggr: Frggr,
							Frgke: Frgke,
							Frgrl: Frgrl,
							Frgsx: Frgsx,
							Frgzu: Frgzu,
							Gwldt: Gwldt,
							HierarchyExists: HierarchyExists,
							Ihran: Ihran,
							Ihrez: Ihrez,
							Inco1: Inco1,
							Inco2: Inco2,
							Kalsm: Kalsm,
							Kdatb: Kdatb,
							Kdate: Kdate,
							Knumv: Knumv,
							Konnr: Konnr,
							Kornr: Kornr,
							Ktwrt: Ktwrt,
							Kufix: Kufix,
							Kunnr: Kunnr,
							Lands: Lands,
							Lblif: Lblif,
							LegalContract: LegalContract,
							Lifre: Lifre,
							Llief: Llief,
							Loekz: Loekz,
							Lphis: Lphis,
							Lponr: Lponr,
							Memory: Memory,
							Memorytype: Memorytype,
							MsrId: MsrId,
							Pincr: Pincr,
							PohfType: PohfType,
							Procstat: Procstat,
							ReasonCode: ReasonCode,
							ReleaseDate: ReleaseDate,
							RelocId: RelocId,
							RelocSeqId: RelocSeqId,
							Reswk: Reswk,
							Retpc: Retpc,
							Rettp: Rettp,
							Revno: Revno,
							Rlwrt: Rlwrt,
							Shipcond: Shipcond,
							Spras: Spras,
							Stafo: Stafo,
							Stako: Stako,
							Statu: Statu,
							Stceg: Stceg,
							Submi: Submi,
							Zbd1p: Zbd1p,
							Zbd1t: Zbd1t,
							Zbd2p: Zbd2p,
							Zbd2t: Zbd2t,
							Zbd3t: Zbd3t,
							Zterm: Zterm

						});

					}
					//		console.log(ListofPurchaseOrders);

					/*	var CountPo = new sap.ui.model.json.JSONModel({
						item: itemPO

					});
					this.setModel(CountPo, "CountPo");
*/
					//	console.log(oData);
					BusyIndicator.hide();
					var oLookupModel = oComponent.getModel("Lookup");
					oLookupModel.setProperty("/PoDocumentNumber", ListofPurchaseOrders);
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

		/*Vendor rebate start*/
		loadIconLibraries: function() {
			var b = [];
			var c = {};
			//Fiori Theme font family and URI
			var t = {
				fontFamily: "SAP-icons-TNT",
				fontURI: sap.ui.require.toUrl("sap/tnt/themes/base/fonts/")
			};
			//Registering to the icon pool
			IconPool.registerFont(t);
			b.push(IconPool.fontLoaded("SAP-icons-TNT"));
			c["SAP-icons-TNT"] = t;
			//SAP Business Suite Theme font family and URI
			var B = {
				fontFamily: "BusinessSuiteInAppSymbols",
				fontURI: sap.ui.require.toUrl("sap/ushell/themes/base/fonts/")
			};
			//Registering to the icon pool
			IconPool.registerFont(B);
			b.push(IconPool.fontLoaded("BusinessSuiteInAppSymbols"));
			c["BusinessSuiteInAppSymbols"] = B;

			/*Vendor rebate end*/
		}

	});
});