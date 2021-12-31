sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel",
	"com/vSimpleApp/Classes/SOConditionItem"
], function(Object, JSONModel, SOConditionItem) {
	"use strict";
	return Object.extend("com.vSimpleApp.Classes.StockStandards", {
		constructor: function(oData) {
			this.setData(oData);

		},
		setData: function(oData) {

			//this.Cbtlv = (oData && oData.Cbtlv) ? oData.Cbtlv : "";

			this.Auart = "OR";
			this.MomentType = "351";
			this.DocType = "UB";
			//Header SO item
			this.Refobjtype = (oData && oData.Refobjtype) ? oData.Refobjtype : "";
			this.Refobjkey = (oData && oData.Refobjkey) ? oData.Refobjkey : "";
			this.Refdoctype = (oData && oData.Refdoctype) ? oData.Refdoctype : "";
			this.DocType = (oData && oData.DocType) ? oData.DocType : "";
			this.CollectNo = (oData && oData.CollectNo) ? oData.CollectNo : "";
			this.SalesOrg = (oData && oData.SalesOrg) ? oData.SalesOrg : "";
			this.DistrChan = (oData && oData.DistrChan) ? oData.DistrChan : "";
			this.Division = (oData && oData.Division) ? oData.Division : "";
			this.SalesGrp = (oData && oData.SalesGrp) ? oData.SalesGrp : "";
			this.SalesOff = (oData && oData.SalesOff) ? oData.SalesOff : "";
		//	this.ReqDateH = (oData && oData.ReqDateH) ? oData.ReqDateH : "";
				this.ReqDateH = (oData && oData.ReqDateH) ? this.datatime(new Date(oData.ReqDateH)) : this.datatime(new Date());
			this.DateType = (oData && oData.DateType) ? oData.DateType : "";
		//	this.PurchDate = (oData && oData.PurchDate) ? oData.PurchDate : "";
				this.PurchDate = (oData && oData.PurchDate) ? this.datatime(new Date(oData.PurchDate)) : this.datatime(new Date());
			this.PoMethod = (oData && oData.PoMethod) ? oData.PoMethod : "";
			this.PoSupplem = (oData && oData.PoSupplem) ? oData.PoSupplem : "";
			this.Ref1 = (oData && oData.Ref1) ? oData.Ref1 : "";
			this.Name = (oData && oData.Name) ? oData.Name : "";
			this.Telephone = (oData && oData.Telephone) ? oData.Telephone : "";
			this.PriceGrp = (oData && oData.PriceGrp) ? oData.PriceGrp : "";
			this.CustGroup = (oData && oData.CustGroup) ? oData.CustGroup : "";
			this.SalesDist = (oData && oData.SalesDist) ? oData.SalesDist : "";
			this.PriceList = (oData && oData.PriceList) ? oData.PriceList : "";
			this.Incoterms1 = (oData && oData.Incoterms1) ? oData.Incoterms1 : "";
			this.Incoterms2 = (oData && oData.Incoterms2) ? oData.Incoterms2 : "";
			this.Pmnttrms = (oData && oData.Pmnttrms) ? oData.Pmnttrms : "";
			this.DlvBlock = (oData && oData.DlvBlock) ? oData.DlvBlock : "";
			this.BillBlock = (oData && oData.BillBlock) ? oData.BillBlock : "";
			this.OrdReason = (oData && oData.OrdReason) ? oData.OrdReason : "";
			this.ComplDlv = (oData && oData.ComplDlv) ? oData.ComplDlv : "";
		//	this.PriceDate = (oData && oData.PriceDate) ? oData.PriceDate : "";
				this.PriceDate = (oData && oData.PriceDate) ? this.datatime(new Date(oData.PriceDate)) : this.datatime(new Date());
			this.QtValidF = (oData && oData.QtValidF) ? oData.QtValidF : "";
			this.QtValidT = (oData && oData.QtValidT) ? oData.QtValidT : "";
			this.CtValidF = (oData && oData.CtValidF) ? oData.CtValidF : "";
			this.CtValidT = (oData && oData.CtValidT) ? oData.CtValidT : "";
			this.CustGrp1 = (oData && oData.CustGrp1) ? oData.CustGrp1 : "";
			this.CustGrp2 = (oData && oData.CustGrp2) ? oData.CustGrp2 : "";
			this.CustGrp3 = (oData && oData.CustGrp3) ? oData.CustGrp3 : "";
			this.CustGrp4 = (oData && oData.CustGrp4) ? oData.CustGrp4 : "";
			this.CustGrp5 = (oData && oData.CustGrp5) ? oData.CustGrp5 : "";
			this.PurchNoC = (oData && oData.PurchNoC) ? oData.PurchNoC : "";
			this.PurchNoS = (oData && oData.PurchNoS) ? oData.PurchNoS : "";
		//	this.PoDatS = (oData && oData.PoDatS) ? oData.PoDatS : "";
				this.PoDatS = (oData && oData.PoDatS) ? this.datatime(new Date(oData.PoDatS)) : this.datatime(new Date());
			this.PoMethS = (oData && oData.PoMethS) ? oData.PoMethS : "";
			this.Ref1S = (oData && oData.Ref1S) ? oData.Ref1S : "";
			this.SdDocCat = (oData && oData.SdDocCat) ? oData.SdDocCat : "";
		//	this.DocDate = (oData && oData.DocDate) ? oData.DocDate : "";
				this.DocDate = (oData && oData.DocDate) ? this.datatime(new Date(oData.DocDate)) : this.datatime(new Date());
					this.WarDate = (oData && oData.WarDate) ? this.datatime(new Date(oData.WarDate)) : this.datatime(new Date());
		//	this.WarDate = (oData && oData.WarDate) ? oData.WarDate : "";
			this.ShipCond = (oData && oData.ShipCond) ? oData.ShipCond : "";
			this.PpSearch = (oData && oData.PpSearch) ? oData.PpSearch : "";
		//	this.DunDate = (oData && oData.DunDate) ? oData.DunDate : "";
				this.DunDate = (oData && oData.DunDate) ? this.datatime(new Date(oData.DunDate)) : this.datatime(new Date());
			this.Dlvschduse = (oData && oData.Dlvschduse) ? oData.Dlvschduse : "";
			this.Pldlvstyp = (oData && oData.Pldlvstyp) ? oData.Pldlvstyp : "";
			this.RefDoc = (oData && oData.RefDoc) ? oData.RefDoc : "";
			this.CompCdeB = (oData && oData.CompCdeB) ? oData.CompCdeB : "";
			this.AlttaxCls = (oData && oData.AlttaxCls) ? oData.AlttaxCls : "";
			this.TaxClass2 = (oData && oData.TaxClass2) ? oData.TaxClass2 : "";
			this.TaxClass3 = (oData && oData.TaxClass3) ? oData.TaxClass3 : "";
			this.TaxClass4 = (oData && oData.TaxClass4) ? oData.TaxClass4 : "";
			this.TaxClass5 = (oData && oData.TaxClass5) ? oData.TaxClass5 : "";
			this.TaxClass6 = (oData && oData.TaxClass6) ? oData.TaxClass6 : "";
			this.TaxClass7 = (oData && oData.TaxClass7) ? oData.TaxClass7 : "";
			this.TaxClass8 = (oData && oData.TaxClass8) ? oData.TaxClass8 : "";
			this.TaxClass9 = (oData && oData.TaxClass9) ? oData.TaxClass9 : "";
			this.RefDocL = (oData && oData.RefDocL) ? oData.RefDocL : "";
			this.AssNumber = (oData && oData.AssNumber) ? oData.AssNumber : "";
			this.RefdocCat = (oData && oData.RefdocCat) ? oData.RefdocCat : "";
			this.OrdcombIn = (oData && oData.OrdcombIn) ? oData.OrdcombIn : "";
			this.BillSched = (oData && oData.BillSched) ? oData.BillSched : "";
			this.InvoSched = (oData && oData.InvoSched) ? oData.InvoSched : "";
			this.MnInvoice = (oData && oData.MnInvoice) ? oData.MnInvoice : "";
			this.AddValDy = (oData && oData.AddValDy) ? oData.AddValDy : "";
			this.FixValDy = (oData && oData.FixValDy) ? oData.FixValDy : "";
			this.PymtMeth = (oData && oData.PymtMeth) ? oData.PymtMeth : "";
			this.AccntAsgn = (oData && oData.AccntAsgn) ? oData.AccntAsgn : "";
		//	this.BillDate = (oData && oData.BillDate) ? oData.BillDate : "";
				this.BillDate = (oData && oData.BillDate) ? this.datatime(new Date(oData.BillDate)) : this.datatime(new Date());
		//	this.ServDate = (oData && oData.ServDate) ? oData.ServDate : "";
				this.ServDate = (oData && oData.ServDate) ? this.datatime(new Date(oData.ServDate)) : this.datatime(new Date());
			this.DunnKey = (oData && oData.DunnKey) ? oData.DunnKey : "";
			this.DunnBlock = (oData && oData.DunnBlock) ? oData.DunnBlock : "";
			this.PmtgarPro = (oData && oData.PmtgarPro) ? oData.PmtgarPro : "";
			this.DepartmNo = (oData && oData.DepartmNo) ? oData.DepartmNo : "";
			this.RecPoint = (oData && oData.RecPoint) ? oData.RecPoint : "";
			this.DocNumFi = (oData && oData.DocNumFi) ? oData.DocNumFi : "";
			this.Cstcndgrp1 = (oData && oData.Cstcndgrp1) ? oData.Cstcndgrp1 : "";
			this.Cstcndgrp2 = (oData && oData.Cstcndgrp2) ? oData.Cstcndgrp2 : "";
			this.Cstcndgrp3 = (oData && oData.Cstcndgrp3) ? oData.Cstcndgrp3 : "";
			this.Cstcndgrp4 = (oData && oData.Cstcndgrp4) ? oData.Cstcndgrp4 : "";
			this.Cstcndgrp5 = (oData && oData.Cstcndgrp5) ? oData.Cstcndgrp5 : "";
			this.DlvTime = (oData && oData.DlvTime) ? oData.DlvTime : "";
			this.Currency = (oData && oData.Currency) ? oData.Currency : "";
			this.CurrIso = (oData && oData.CurrIso) ? oData.CurrIso : "";
		//	this.CreatedBy = (oData && oData.CreatedBy) ? oData.CreatedBy : "";
				this.CreatedBy = (oData && oData.CreatedBy) ? this.datatime(new Date(oData.CreatedBy)) : this.datatime(new Date());
			this.TaxdepCty = (oData && oData.TaxdepCty) ? oData.TaxdepCty : "";
			this.TaxdstCty = (oData && oData.TaxdstCty) ? oData.TaxdstCty : "";
			this.EutriDeal = (oData && oData.EutriDeal) ? oData.EutriDeal : "";
			this.MastContr = (oData && oData.MastContr) ? oData.MastContr : "";
			this.RefProc = (oData && oData.RefProc) ? oData.RefProc : "";
			this.Chkprtauth = (oData && oData.Chkprtauth) ? oData.Chkprtauth : "";
			this.CmlqtyDat = (oData && oData.CmlqtyDat) ? oData.CmlqtyDat : "";
			this.Version = (oData && oData.Version) ? oData.Version : "";
			this.NotifNo = (oData && oData.NotifNo) ? oData.NotifNo : "";
			this.WbsElem = (oData && oData.WbsElem) ? oData.WbsElem : "";
			this.FkkConacct = (oData && oData.FkkConacct) ? oData.FkkConacct : "";
			this.DocClass = (oData && oData.DocClass) ? oData.DocClass : "";
			this.HCurr = (oData && oData.HCurr) ? oData.HCurr : "";
			this.HCurrIso = (oData && oData.HCurrIso) ? oData.HCurrIso : "";
			this.ShipType = (oData && oData.ShipType) ? oData.ShipType : "";
			this.SProcInd = (oData && oData.SProcInd) ? oData.SProcInd : "";
			this.RefDocLLong = (oData && oData.RefDocLLong) ? oData.RefDocLLong : "";
			this.LineTime = (oData && oData.LineTime) ? oData.LineTime : "";
			this.CalcMotive = (oData && oData.CalcMotive) ? oData.CalcMotive : "";
			this.PsmPstngDate = (oData && oData.PsmPstngDate) ? oData.PsmPstngDate : "";
			this.TreasuryAccSymbol = (oData && oData.TreasuryAccSymbol) ? oData.TreasuryAccSymbol : "";
			this.BusinessEventTcode = (oData && oData.BusinessEventTcode) ? oData.BusinessEventTcode : "";
			this.ModificationAllowed = (oData && oData.ModificationAllowed) ? oData.ModificationAllowed : "";
			this.CancellationAllowed = (oData && oData.CancellationAllowed) ? oData.CancellationAllowed : "";
			this.PaymentMethods = (oData && oData.PaymentMethods) ? oData.PaymentMethods : "";
			this.BusinessPartnerNo = (oData && oData.BusinessPartnerNo) ? oData.BusinessPartnerNo : "";
			this.ReportingFreq = (oData && oData.ReportingFreq) ? oData.ReportingFreq : "";
			this.SepaMandateId = (oData && oData.SepaMandateId) ? oData.SepaMandateId : "";
			this.Salesdocumentin = (oData && oData.Salesdocumentin) ? oData.Salesdocumentin : "";
			this.Testrun = (oData && oData.Testrun) ? oData.Testrun : "";
			this.Salesdocument = (oData && oData.Salesdocument) ? oData.Salesdocument : "";

			//Partnr data
			this.PartnRole = (oData && oData.PartnRole) ? oData.PartnRole : "";
			this.PartnNumb = (oData && oData.PartnNumb) ? oData.PartnNumb : "";
			this.ItmNumber = (oData && oData.ItmNumber) ? oData.ItmNumber : "";
			this.Title = (oData && oData.Title) ? oData.Title : "";
			this.Name = (oData && oData.Name) ? oData.Name : "";
			this.Name2 = (oData && oData.Name2) ? oData.Name2 : "";
			this.Name3 = (oData && oData.Name3) ? oData.Name3 : "";
			this.Name4 = (oData && oData.Name4) ? oData.Name4 : "";
			this.Street = (oData && oData.Street) ? oData.Street : "";
			this.Country = (oData && oData.Country) ? oData.Country : "";
			this.CountrIso = (oData && oData.CountrIso) ? oData.CountrIso : "";
			this.PostlCode = (oData && oData.PostlCode) ? oData.PostlCode : "";
			this.PobxPcd = (oData && oData.PobxPcd) ? oData.PobxPcd : "";
			this.PobxCty = (oData && oData.PobxCty) ? oData.PobxCty : "";
			this.City = (oData && oData.City) ? oData.City : "";
			this.District = (oData && oData.District) ? oData.District : "";
			this.Region = (oData && oData.Region) ? oData.Region : "";
			this.PoBox = (oData && oData.PoBox) ? oData.PoBox : "";
			this.Telephone = (oData && oData.Telephone) ? oData.Telephone : "";
			this.Telephone2 = (oData && oData.Telephone2) ? oData.Telephone2 : "";
			this.Telebox = (oData && oData.Telebox) ? oData.Telebox : "";
			this.FaxNumber = (oData && oData.FaxNumber) ? oData.FaxNumber : "";
			this.TeletexNo = (oData && oData.TeletexNo) ? oData.TeletexNo : "";
			this.TelexNo = (oData && oData.TelexNo) ? oData.TelexNo : "";
			this.Langu = (oData && oData.Langu) ? oData.Langu : "";
			this.LanguIso = (oData && oData.LanguIso) ? oData.LanguIso : "";
			this.UnloadPt = (oData && oData.UnloadPt) ? oData.UnloadPt : "";
			this.Transpzone = (oData && oData.Transpzone) ? oData.Transpzone : "";
			this.Taxjurcode = (oData && oData.Taxjurcode) ? oData.Taxjurcode : "";
			this.Address = (oData && oData.Address) ? oData.Address : "";
			this.PrivAddr = (oData && oData.PrivAddr) ? oData.PrivAddr : "";
			this.AddrType = (oData && oData.AddrType) ? oData.AddrType : "";
			this.AddrOrig = (oData && oData.AddrOrig) ? oData.AddrOrig : "";
			this.AddrLink = (oData && oData.AddrLink) ? oData.AddrLink : "";
			this.Refobjtype = (oData && oData.Refobjtype) ? oData.Refobjtype : "";
			this.Refobjkey = (oData && oData.Refobjkey) ? oData.Refobjkey : "";
			this.Reflogsys = (oData && oData.Reflogsys) ? oData.Reflogsys : "";
		this.OrderItemsInSet = (oData && oData.OrderItemsInSet) ? oData.OrderItemsInSet : [];
			this.OrderConditionsInSet = (oData && oData.OrderConditionsInSet) ? oData.OrderConditionsInSet : [];
			this.OrderSchedulesInSet = (oData && oData.OrderSchedulesInSet) ? oData.OrderSchedulesInSet : [];
		},

		getRequestPayload: function() {

			var OrderItemsInSet = [];
			var OrderSchedulesInSet = [];
			var OrderConditionsInSet = [];
			var SoPartnersSet = [];

			this.OrderItemsInSet.forEach(function(item) {
				var so = new SOConditionItem(item);
				OrderItemsInSet.push(so.getRequestItem());

			});
	
			this.OrderSchedulesInSet.forEach(function(item1) {
			//	var so = new SOConditionItem(item1);
				OrderSchedulesInSet.push(item1);
			});

			this.OrderConditionsInSet.forEach(function(item2) {
					//var so = new SOConditionItem(item2);
				OrderConditionsInSet.push(item2);
				//	OrderConditionsInSet.push(so.getRequestPriceCondition());
		//	console.log(OrderConditionsInSet);
			});

			SoPartnersSet.push(this.getRequestPartnr());

			return {
			
	
			
				Refobjtype: this.Refobjtype,
				Refobjkey: this.Refobjkey,
				Refdoctype: this.Refdoctype,
				DocType: this.DocType,
				CollectNo: this.CollectNo,
				SalesOrg: this.SalesOrg,
				DistrChan: this.DistrChan,
				Division: this.Division,
				SalesGrp: this.SalesGrp,
				SalesOff: this.SalesOff,
				ReqDateH: this.ReqDateH,
				DateType: this.DateType,
				PurchDate: this.PurchDate,
				PoMethod: this.PoMethod,
				PoSupplem: this.PoSupplem,
				Ref1: this.Ref1,
				Name: this.Name,
				Telephone: this.Telephone,
				PriceGrp: this.PriceGrp,
				CustGroup: this.CustGroup,
				SalesDist: this.SalesDist,
				PriceList: this.PriceList,
				Incoterms1: this.Incoterms1,
				Incoterms2: this.Incoterms2,
				Pmnttrms: this.Pmnttrms,
				DlvBlock: "91",
				BillBlock: "99",
				OrdReason: this.OrdReason,
				ComplDlv: this.ComplDlv,
				PriceDate: this.PriceDate,
		//		QtValidF: this.QtValidF,
			//	QtValidT: this.QtValidT,
			//	CtValidF: this.CtValidF,
			//	CtValidT: this.CtValidT,
			//	CustGrp1: this.CustGrp1,
			//	CustGrp2: this.CustGrp2,
			//	CustGrp3: this.CustGrp3,
			//	CustGrp4: this.CustGrp4,
			//	CustGrp5: this.CustGrp5,
				PurchNoC: this.PurchNoC,
				PurchNoS: this.PurchNoS,
			//	PoDatS: this.PoDatS,
				PoMethS: this.PoMethS,
				Ref1S: this.Ref1S,
				SdDocCat: this.SdDocCat,
				DocDate: this.DocDate,
				WarDate: this.WarDate,
				ShipCond: this.ShipCond,
				PpSearch: this.PpSearch,
				DunDate: this.DunDate,
				Dlvschduse: this.Dlvschduse,
				Pldlvstyp: this.Pldlvstyp,
				RefDoc: this.RefDoc,
				CompCdeB: this.CompCdeB,
				AlttaxCls: this.AlttaxCls,
				TaxClass2: this.TaxClass2,
				TaxClass3: this.TaxClass3,
				TaxClass4: this.TaxClass4,
				TaxClass5: this.TaxClass5,
				TaxClass6: this.TaxClass6,
				TaxClass7: this.TaxClass7,
				TaxClass8: this.TaxClass8,
				TaxClass9: this.TaxClass9,
				RefDocL: this.RefDocL,
				AssNumber: this.AssNumber,
				RefdocCat: this.RefdocCat,
				OrdcombIn: this.OrdcombIn,
				BillSched: this.BillSched,
				InvoSched: this.InvoSched,
				MnInvoice: this.MnInvoice,
				AddValDy: this.AddValDy,
			//	FixValDy: this.FixValDy,
				PymtMeth: this.PymtMeth,
				AccntAsgn: this.AccntAsgn,
			//	BillDate: this.BillDate,
			//	ServDate: this.ServDate,
				DunnKey: this.DunnKey,
				DunnBlock: this.DunnBlock,
				PmtgarPro: this.PmtgarPro,
				DepartmNo: this.DepartmNo,
				RecPoint: this.RecPoint,
				DocNumFi: this.DocNumFi,
				Cstcndgrp1: this.Cstcndgrp1,
				Cstcndgrp2: this.Cstcndgrp2,
				Cstcndgrp3: this.Cstcndgrp3,
				Cstcndgrp4: this.Cstcndgrp4,
				Cstcndgrp5: this.Cstcndgrp5,
			//	DlvTime: this.DlvTime,
				Currency: this.Currency,
				CurrIso: this.CurrIso,
			///	CreatedBy: this.CreatedBy,
				TaxdepCty: this.TaxdepCty,
				TaxdstCty: this.TaxdstCty,
			// 	EutriDeal: this.EutriDeal,
			// 	MastContr: this.MastContr,
			// 	RefProc: this.RefProc,
			// 	Chkprtauth: this.Chkprtauth,
			// 	CmlqtyDat: this.CmlqtyDat,
			// 	Version: this.Version,
			// 	NotifNo: this.NotifNo,
			// 	WbsElem: this.WbsElem,
			// 	FkkConacct: this.FkkConacct,
			// 	DocClass: this.DocClass,
			// 	HCurr: this.HCurr,
			// 	HCurrIso: this.HCurrIso,
			// 	ShipType: this.ShipType,
			// 	SProcInd: this.SProcInd,
			// 	RefDocLLong: this.RefDocLLong,
			// //	LineTime: this.LineTime,
			// 	CalcMotive: this.CalcMotive,
			// 	PsmPstngDate: this.PsmPstngDate,
			// 	TreasuryAccSymbol: this.TreasuryAccSymbol,
			// 	BusinessEventTcode: this.BusinessEventTcode,
			// 	ModificationAllowed: this.ModificationAllowed,
			// 	CancellationAllowed: this.CancellationAllowed,
			// 	PaymentMethods: this.PaymentMethods,
			// 	BusinessPartnerNo: this.BusinessPartnerNo,
			// 	ReportingFreq: this.ReportingFreq,
			// 	SepaMandateId: this.SepaMandateId,
				Salesdocumentin: this.Salesdocumentin,
				Testrun: this.Testrun,
				Salesdocument: this.Salesdocument,

				OrderItemsInSet: OrderItemsInSet,
				OrderSchedulesInSet: OrderSchedulesInSet,
				OrderConditionsInSet: OrderConditionsInSet,
				SoPartnersSet: SoPartnersSet

			};
		},
		getRequestPartnr: function() {
			return {
				PartnRole: "AG",
				PartnNumb: this.callKunner(this.PartnNumb)
			};
		},
		callKunner: function(Kunnr) {

			var zero = "";

			if ($.isNumeric((Kunnr)) === true) {
				var len = Kunnr.length;
				if (len !== undefined) {
					var z = 10 - len;
					for (var i = 0; i < z; i++) {
						zero += "0";
					}
				}

				Kunnr = zero + Kunnr;

			}

			return Kunnr;
		},
		
		datatime: function(dDate, tyt) {
			var s_doc_datePost = dDate;
			var Datepoststring = s_doc_datePost.toISOString();
			Datepoststring = Datepoststring.slice(0, -5);
			return Datepoststring;
		}

	});

});