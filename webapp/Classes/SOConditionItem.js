sap.ui.define([
	"com/vSimpleApp/model/BaseObject",

	"com/vSimpleApp/service/Application"
], function(BaseObject, Application) {
	"use strict";
	var SOConditionItem = BaseObject.extend("com.vSimpleApp.Classes.SOConditionItem", {
		constructor: function(oData) {
			BaseObject.call(this);

			this.setData(oData);
		},

		setData: function(oData) {
			this.ItemNo = (oData && oData.ItemNo) ? oData.ItemNo : "";
			this.ItmNumber = (oData && oData.ItmNumber) ? oData.ItmNumber : "";
			this.HgLvItem = (oData && oData.HgLvItem) ? oData.HgLvItem : "";
			this.PoItmNo = (oData && oData.PoItmNo) ? oData.PoItmNo : "";
			this.Material = (oData && oData.Material) ? oData.Material : "";
			this.AltToItm = (oData && oData.AltToItm) ? oData.AltToItm : "";
			this.CustMat22 = (oData && oData.CustMat22) ? oData.CustMat22 : "";
			this.Batch = (oData && oData.Batch) ? oData.Batch : "";
			this.DlvGroup = (oData && oData.DlvGroup) ? oData.DlvGroup : "";
			this.PartDlv = (oData && oData.PartDlv) ? oData.PartDlv : "";
			this.ReasonRej = (oData && oData.ReasonRej) ? oData.ReasonRej : "";
			this.BillBlock = (oData && oData.BillBlock) ? oData.BillBlock : "";
					this.BillDate = (oData && oData.BillDate) ? this.datatime(new Date(oData.BillDate)) : this.datatime(new Date());
		//	this.BillDate = (oData && oData.BillDate) ? oData.BillDate : "";
			this.Plant = (oData && oData.Plant) ? oData.Plant : "";
			this.StoreLoc = (oData && oData.StoreLoc) ? oData.StoreLoc : "";
			this.TargetQty = (oData && oData.TargetQty) ? oData.TargetQty : "";
			this.TargetQu = (oData && oData.TargetQu) ? oData.TargetQu : "";
			this.TUnitIso = (oData && oData.TUnitIso) ? oData.TUnitIso : "";
			this.ItemCateg = (oData && oData.ItemCateg) ? oData.ItemCateg : "";
			this.ShortText = (oData && oData.ShortText) ? oData.ShortText : "";
			this.PrcGroup1 = (oData && oData.PrcGroup1) ? oData.PrcGroup1 : "";
			this.PrcGroup2 = (oData && oData.PrcGroup2) ? oData.PrcGroup2 : "";
			this.PrcGroup3 = (oData && oData.PrcGroup3) ? oData.PrcGroup3 : "";
			this.PrcGroup4 = (oData && oData.PrcGroup4) ? oData.PrcGroup4 : "";
			this.PrcGroup5 = (oData && oData.PrcGroup5) ? oData.PrcGroup5 : "";
			this.ProdHiera = (oData && oData.ProdHiera) ? oData.ProdHiera : "";
			this.MatlGroup = (oData && oData.MatlGroup) ? oData.MatlGroup : "";
			this.PurchNoC = (oData && oData.PurchNoC) ? oData.PurchNoC : "";
		//	this.PurchDate = (oData && oData.PurchDate) ? oData.PurchDate : "";
				this.PurchDate = (oData && oData.PurchDate) ? this.datatime(new Date(oData.PurchDate)) : this.datatime(new Date());
			this.PoMethod = (oData && oData.PoMethod) ? oData.PoMethod : "";
			this.Ref1 = (oData && oData.Ref1) ? oData.Ref1 : "";
			this.PurchNoS = (oData && oData.PurchNoS) ? oData.PurchNoS : "";
		this.PoDatS = (oData && oData.PoDatS) ? oData.PoDatS : "";
			this.PoMethS = (oData && oData.PoMethS) ? oData.PoMethS : "";
			this.Ref1S = (oData && oData.Ref1S) ? oData.Ref1S : "";
			this.PoitmNoS = (oData && oData.PoitmNoS) ? oData.PoitmNoS : "";
			this.PriceGrp = (oData && oData.PriceGrp) ? oData.PriceGrp : "";
			this.CustGroup = (oData && oData.CustGroup) ? oData.CustGroup : "";
			this.SalesDist = (oData && oData.SalesDist) ? oData.SalesDist : "";
			this.PriceList = (oData && oData.PriceList) ? oData.PriceList : "";
			this.Incoterms1 = (oData && oData.Incoterms1) ? oData.Incoterms1 : "";
			this.Incoterms2 = (oData && oData.Incoterms2) ? oData.Incoterms2 : "";
			this.OrdcompIn = (oData && oData.OrdcompIn) ? oData.OrdcompIn : "";
			this.BillSched = (oData && oData.BillSched) ? oData.BillSched : "";
			this.InvoSched = (oData && oData.InvoSched) ? oData.InvoSched : "";
			this.MnInvoice = (oData && oData.MnInvoice) ? oData.MnInvoice : "";
			this.AddValDy = (oData && oData.AddValDy) ? oData.AddValDy : "";
			this.FixValDy = (oData && oData.FixValDy) ? oData.FixValDy : "";
			this.Pmnttrms = (oData && oData.Pmnttrms) ? oData.Pmnttrms : "";
			this.PymtMeth = (oData && oData.PymtMeth) ? oData.PymtMeth : "";
			this.AccntAsgn = (oData && oData.AccntAsgn) ? oData.AccntAsgn : "";
		//	this.PriceDate = (oData && oData.PriceDate) ? oData.PriceDate : "";
		//	this.ServDate = (oData && oData.ServDate) ? oData.ServDate : "";
				this.PriceDate = (oData && oData.PriceDate) ? this.datatime(new Date(oData.PriceDate)) : this.datatime(new Date());
				this.ServDate = (oData && oData.ServDate) ? this.datatime(new Date(oData.ServDate)) : this.datatime(new Date());
			this.DunnKey = (oData && oData.DunnKey) ? oData.DunnKey : "";
			this.DunnBlock = (oData && oData.DunnBlock) ? oData.DunnBlock : "";
			this.Promotion = (oData && oData.Promotion) ? oData.Promotion : "";
			this.PmtgarPro = (oData && oData.PmtgarPro) ? oData.PmtgarPro : "";
			this.DocNumFi = (oData && oData.DocNumFi) ? oData.DocNumFi : "";
			this.DepartmNo = (oData && oData.DepartmNo) ? oData.DepartmNo : "";
			this.RecPoint = (oData && oData.RecPoint) ? oData.RecPoint : "";
			this.Cstcndgrp1 = (oData && oData.Cstcndgrp1) ? oData.Cstcndgrp1 : "";
			this.Cstcndgrp2 = (oData && oData.Cstcndgrp2) ? oData.Cstcndgrp2 : "";
			this.Cstcndgrp3 = (oData && oData.Cstcndgrp3) ? oData.Cstcndgrp3 : "";
			this.Cstcndgrp4 = (oData && oData.Cstcndgrp4) ? oData.Cstcndgrp4 : "";
			this.Cstcndgrp5 = (oData && oData.Cstcndgrp5) ? oData.Cstcndgrp5 : "";
			this.DlvTime = (oData && oData.DlvTime) ? oData.DlvTime : "";
			this.SalesUnit = (oData && oData.SalesUnit) ? oData.SalesUnit : "";
			this.SUnitIso = (oData && oData.SUnitIso) ? oData.SUnitIso : "";
			this.UsageInd = (oData && oData.UsageInd) ? oData.UsageInd : "";
			this.FixedQuan = (oData && oData.FixedQuan) ? oData.FixedQuan : "";
			this.UnlmtDlv = (oData && oData.UnlmtDlv) ? oData.UnlmtDlv : "";
			this.Division = (oData && oData.Division) ? oData.Division : "";
			this.UntofWght = (oData && oData.UntofWght) ? oData.UntofWght : "";
			this.UnofWtiso = (oData && oData.UnofWtiso) ? oData.UnofWtiso : "";
			this.Volunit = (oData && oData.Volunit) ? oData.Volunit : "";
			this.Volunitiso = (oData && oData.Volunitiso) ? oData.Volunitiso : "";
			this.DlvPrio = (oData && oData.DlvPrio) ? oData.DlvPrio : "";
			this.ShipPoint = (oData && oData.ShipPoint) ? oData.ShipPoint : "";
			this.Route = (oData && oData.Route) ? oData.Route : "";
		//	this.CreatedBy = (oData && oData.CreatedBy) ? oData.CreatedBy : "";
				this.CreatedBy = (oData && oData.CreatedBy) ? this.datatime(new Date(oData.CreatedBy)) : this.datatime(new Date());
			this.TaxClass1 = (oData && oData.TaxClass1) ? oData.TaxClass1 : "";
			this.TaxClass2 = (oData && oData.TaxClass2) ? oData.TaxClass2 : "";
			this.TaxClass3 = (oData && oData.TaxClass3) ? oData.TaxClass3 : "";
			this.TaxClass4 = (oData && oData.TaxClass4) ? oData.TaxClass4 : "";
			this.TaxClass5 = (oData && oData.TaxClass5) ? oData.TaxClass5 : "";
			this.TaxClass6 = (oData && oData.TaxClass6) ? oData.TaxClass6 : "";
			this.TaxClass7 = (oData && oData.TaxClass7) ? oData.TaxClass7 : "";
			this.TaxClass8 = (oData && oData.TaxClass8) ? oData.TaxClass8 : "";
			this.TaxClass9 = (oData && oData.TaxClass9) ? oData.TaxClass9 : "";
			this.MatPrGrp = (oData && oData.MatPrGrp) ? oData.MatPrGrp : "";
			this.ValType = (oData && oData.ValType) ? oData.ValType : "";
			this.FixdatQty = (oData && oData.FixdatQty) ? oData.FixdatQty : "";
			this.BomexplNo = (oData && oData.BomexplNo) ? oData.BomexplNo : "";
			this.Resanalkey = (oData && oData.Resanalkey) ? oData.Resanalkey : "";
			this.ReqmtsTyp = (oData && oData.ReqmtsTyp) ? oData.ReqmtsTyp : "";
			this.NoGrPost = (oData && oData.NoGrPost) ? oData.NoGrPost : "";
			this.BusTranst = (oData && oData.BusTranst) ? oData.BusTranst : "";
			this.OverhdKey = (oData && oData.OverhdKey) ? oData.OverhdKey : "";
			this.CstgSheet = (oData && oData.CstgSheet) ? oData.CstgSheet : "";
			this.Matfrgtgrp = (oData && oData.Matfrgtgrp) ? oData.Matfrgtgrp : "";
			this.Pldlvshdin = (oData && oData.Pldlvshdin) ? oData.Pldlvshdin : "";
			this.SeqNo = (oData && oData.SeqNo) ? oData.SeqNo : "";
			this.BilForm = (oData && oData.BilForm) ? oData.BilForm : "";
			this.DliProfil = (oData && oData.DliProfil) ? oData.DliProfil : "";
			this.RevType = (oData && oData.RevType) ? oData.RevType : "";
			this.BegdemPer = (oData && oData.BegdemPer) ? oData.BegdemPer : "";
			this.PrRefMat = (oData && oData.PrRefMat) ? oData.PrRefMat : "";
			this.Refobjtype = (oData && oData.Refobjtype) ? oData.Refobjtype : "";
			this.Refobjkey = (oData && oData.Refobjkey) ? oData.Refobjkey : "";
			this.Reflogsys = (oData && oData.Reflogsys) ? oData.Reflogsys : "";
			this.OrderProb = (oData && oData.OrderProb) ? oData.OrderProb : "";
			this.CfopCode = (oData && oData.CfopCode) ? oData.CfopCode : "";
			this.Taxlawicms = (oData && oData.Taxlawicms) ? oData.Taxlawicms : "";
			this.Taxlawipi = (oData && oData.Taxlawipi) ? oData.Taxlawipi : "";
			this.SdTaxcode = (oData && oData.SdTaxcode) ? oData.SdTaxcode : "";
			this.AssortMod = (oData && oData.AssortMod) ? oData.AssortMod : "";
			this.Currency = (oData && oData.Currency) ? oData.Currency : "";
			this.CurrIso = (oData && oData.CurrIso) ? oData.CurrIso : "";
			this.ProfitCtr = (oData && oData.ProfitCtr) ? oData.ProfitCtr : "";
			this.Orderid = (oData && oData.Orderid) ? oData.Orderid : "";
			this.WbsElem = (oData && oData.WbsElem) ? oData.WbsElem : "";
			this.RefDoc = (oData && oData.RefDoc) ? oData.RefDoc : "";
			this.RefDocIt = (oData && oData.RefDocIt) ? oData.RefDocIt : "";
			this.RefDocCa = (oData && oData.RefDocCa) ? oData.RefDocCa : "";
			this.CustMat35 = (oData && oData.CustMat35) ? oData.CustMat35 : "";
			this.ItemguidAtp = (oData && oData.ItemguidAtp) ? oData.ItemguidAtp : "";
			this.ValContr = (oData && oData.ValContr) ? oData.ValContr : "";
			this.ValConI = (oData && oData.ValConI) ? oData.ValConI : "";
			this.ConfigId = (oData && oData.ConfigId) ? oData.ConfigId : "";
			this.InstId = (oData && oData.InstId) ? oData.InstId : "";
			this.MatExt = (oData && oData.MatExt) ? oData.MatExt : "";
			this.MatGuid = (oData && oData.MatGuid) ? oData.MatGuid : "";
			this.MatVers = (oData && oData.MatVers) ? oData.MatVers : "";
			this.PMatExt = (oData && oData.PMatExt) ? oData.PMatExt : "";
			this.PMatGuid = (oData && oData.PMatGuid) ? oData.PMatGuid : "";
			this.PMatVers = (oData && oData.PMatVers) ? oData.PMatVers : "";
			this.FuncArea = (oData && oData.FuncArea) ? oData.FuncArea : "";
			this.AlternBom = (oData && oData.AlternBom) ? oData.AlternBom : "";
			this.FkkConacct = (oData && oData.FkkConacct) ? oData.FkkConacct : "";
			this.EanUpc = (oData && oData.EanUpc) ? oData.EanUpc : "";
			this.Prodcat = (oData && oData.Prodcat) ? oData.Prodcat : "";
			this.ShipType = (oData && oData.ShipType) ? oData.ShipType : "";
			this.SProcInd = (oData && oData.SProcInd) ? oData.SProcInd : "";
			this.FuncAreaLong = (oData && oData.FuncAreaLong) ? oData.FuncAreaLong : "";
			this.BillRel = (oData && oData.BillRel) ? oData.BillRel : "";
			this.VwUepos = (oData && oData.VwUepos) ? oData.VwUepos : "";
			this.Dlvschduse = (oData && oData.Dlvschduse) ? oData.Dlvschduse : "";
			this.CfopLong = (oData && oData.CfopLong) ? oData.CfopLong : "";
			this.Selection = (oData && oData.Selection) ? oData.Selection : "";
			this.MatEntrd = (oData && oData.MatEntrd) ? oData.MatEntrd : "";
			this.LogSystemOwn = (oData && oData.LogSystemOwn) ? oData.LogSystemOwn : "";
			this.ItmTypeUsage = (oData && oData.ItmTypeUsage) ? oData.ItmTypeUsage : "";
			this.Taxlawiss = (oData && oData.Taxlawiss) ? oData.Taxlawiss : "";
			this.MatEntrdExternal = (oData && oData.MatEntrdExternal) ? oData.MatEntrdExternal : "";
			this.MatEntrdGuid = (oData && oData.MatEntrdGuid) ? oData.MatEntrdGuid : "";
			this.MatEntrdVersion = (oData && oData.MatEntrdVersion) ? oData.MatEntrdVersion : "";
			this.LocTaxcat = (oData && oData.LocTaxcat) ? oData.LocTaxcat : "";
			this.LocZerovat = (oData && oData.LocZerovat) ? oData.LocZerovat : "";
			this.LocActcode = (oData && oData.LocActcode) ? oData.LocActcode : "";
			this.LocDisttype = (oData && oData.LocDisttype) ? oData.LocDisttype : "";
			this.LocTxrelclas = (oData && oData.LocTxrelclas) ? oData.LocTxrelclas : "";
			this.CalcMotive = (oData && oData.CalcMotive) ? oData.CalcMotive : "";
			this.Compreas = (oData && oData.Compreas) ? oData.Compreas : "";
			this.Fund = (oData && oData.Fund) ? oData.Fund : "";
			this.FundsCtr = (oData && oData.FundsCtr) ? oData.FundsCtr : "";
			this.CmmtItem = (oData && oData.CmmtItem) ? oData.CmmtItem : "";
			this.GrantNbr = (oData && oData.GrantNbr) ? oData.GrantNbr : "";
			this.BudgetPeriod = (oData && oData.BudgetPeriod) ? oData.BudgetPeriod : "";
			this.Taxlawcofins = (oData && oData.Taxlawcofins) ? oData.Taxlawcofins : "";
			this.Taxlawpis = (oData && oData.Taxlawpis) ? oData.Taxlawpis : "";
			this.TreasuryAccSymbol = (oData && oData.TreasuryAccSymbol) ? oData.TreasuryAccSymbol : "";
			this.BusinessEventTcode = (oData && oData.BusinessEventTcode) ? oData.BusinessEventTcode : "";
			this.ModificationAllowed = (oData && oData.ModificationAllowed) ? oData.ModificationAllowed : "";
			this.CancellationAllowed = (oData && oData.CancellationAllowed) ? oData.CancellationAllowed : "";
			this.PaymentMethods = (oData && oData.PaymentMethods) ? oData.PaymentMethods : "";
			this.BusinessPartnerNo = (oData && oData.BusinessPartnerNo) ? oData.BusinessPartnerNo : "";
			this.ReportingFreq = (oData && oData.ReportingFreq) ? oData.ReportingFreq : "";
			this.SepaMandateId = (oData && oData.SepaMandateId) ? oData.SepaMandateId : "";
			this.ReqSegment = (oData && oData.ReqSegment) ? oData.ReqSegment : "";
			this.TpSublevl = (oData && oData.TpSublevl) ? oData.TpSublevl : "";
			this.TpAgencid = (oData && oData.TpAgencid) ? oData.TpAgencid : "";
			this.TpAltraid = (oData && oData.TpAltraid) ? oData.TpAltraid : "";
			this.TpBegper = (oData && oData.TpBegper) ? oData.TpBegper : "";
			this.TpEndper = (oData && oData.TpEndper) ? oData.TpEndper : "";
			this.TpAvtype = (oData && oData.TpAvtype) ? oData.TpAvtype : "";
			this.TpMainAcct = (oData && oData.TpMainAcct) ? oData.TpMainAcct : "";
			this.TpSubAcct = (oData && oData.TpSubAcct) ? oData.TpSubAcct : "";
			this.TpBetc = (oData && oData.TpBetc) ? oData.TpBetc : "";

			//Condition items
			this.ItmNumber = (oData && oData.ItmNumber) ? oData.ItmNumber : "";
			this.CondStNo = (oData && oData.CondStNo) ? oData.CondStNo : "";
			this.CondCount = (oData && oData.CondCount) ? oData.CondCount : "";
			this.CondType = (oData && oData.CondType) ? oData.CondType : "";
			this.Currency = (oData && oData.Currency) ? oData.Currency : "";
			this.CondUnit = (oData && oData.CondUnit) ? oData.CondUnit : "";
			this.CurrIso = (oData && oData.CurrIso) ? oData.CurrIso : "";
			this.CdUntIso = (oData && oData.CdUntIso) ? oData.CdUntIso : "";
			this.Refobjtype = (oData && oData.Refobjtype) ? oData.Refobjtype : "";
			this.Refobjkey = (oData && oData.Refobjkey) ? oData.Refobjkey : "";
			this.Reflogsys = (oData && oData.Reflogsys) ? oData.Reflogsys : "";
			this.Applicatio = (oData && oData.Applicatio) ? oData.Applicatio : "";
			this.Conpricdat = (oData && oData.Conpricdat) ? oData.Conpricdat : "";
			this.Calctypcon = (oData && oData.Calctypcon) ? oData.Calctypcon : "";
			this.Condtype = (oData && oData.Condtype) ? oData.Condtype : "";
			this.StatCon = (oData && oData.StatCon) ? oData.StatCon : "";
			this.Scaletype = (oData && oData.Scaletype) ? oData.Scaletype : "";
			this.Accruals = (oData && oData.Accruals) ? oData.Accruals : "";
			this.Coninvolst = (oData && oData.Coninvolst) ? oData.Coninvolst : "";
			this.Condorigin = (oData && oData.Condorigin) ? oData.Condorigin : "";
			this.Groupcond = (oData && oData.Groupcond) ? oData.Groupcond : "";
			this.CondUpdat = (oData && oData.CondUpdat) ? oData.CondUpdat : "";
			this.AccessSeq = (oData && oData.AccessSeq) ? oData.AccessSeq : "";
			this.Condcount = (oData && oData.Condcount) ? oData.Condcount : "";
			this.Currency2 = (oData && oData.Currency2) ? oData.Currency2 : "";
			this.CurrIso2 = (oData && oData.CurrIso2) ? oData.CurrIso2 : "";
			this.Condcntrl = (oData && oData.Condcntrl) ? oData.Condcntrl : "";
			this.Condisacti = (oData && oData.Condisacti) ? oData.Condisacti : "";
			this.Condclass = (oData && oData.Condclass) ? oData.Condclass : "";
			this.Factbasval = (oData && oData.Factbasval) ? oData.Factbasval : "";
			this.Scalebasin = (oData && oData.Scalebasin) ? oData.Scalebasin : "";
			this.Unitmeasur = (oData && oData.Unitmeasur) ? oData.Unitmeasur : "";
			this.IsoUnit = (oData && oData.IsoUnit) ? oData.IsoUnit : "";
			this.Currenckey = (oData && oData.Currenckey) ? oData.Currenckey : "";
			this.Curreniso = (oData && oData.Curreniso) ? oData.Curreniso : "";
			this.Condincomp = (oData && oData.Condincomp) ? oData.Condincomp : "";
			this.Condconfig = (oData && oData.Condconfig) ? oData.Condconfig : "";
			this.Condchaman = (oData && oData.Condchaman) ? oData.Condchaman : "";
			this.CondNo = (oData && oData.CondNo) ? oData.CondNo : "";
			this.TaxCode = (oData && oData.TaxCode) ? oData.TaxCode : "";
			this.Varcond = (oData && oData.Varcond) ? oData.Varcond : "";
			this.Accountkey = (oData && oData.Accountkey) ? oData.Accountkey : "";
			this.AccountKe = (oData && oData.AccountKe) ? oData.AccountKe : "";
			this.WtWithcd = (oData && oData.WtWithcd) ? oData.WtWithcd : "";
			this.Structcond = (oData && oData.Structcond) ? oData.Structcond : "";
			this.Factconbas = (oData && oData.Factconbas) ? oData.Factconbas : "";
			this.Condcoinhd = (oData && oData.Condcoinhd) ? oData.Condcoinhd : "";
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

			//schedule items
			this.ItmNumber = (oData && oData.ItmNumber) ? oData.ItmNumber : "";
			this.SchedLine = (oData && oData.SchedLine) ? oData.SchedLine : "";
		//	this.ReqDate = (oData && oData.ReqDate) ? oData.ReqDate : "";
					this.ReqDate = (oData && oData.ReqDate) ? this.datatime(new Date(oData.ReqDate)) : this.datatime(new Date());
			this.DateType = (oData && oData.DateType) ? oData.DateType : "";
			this.ReqTime = (oData && oData.ReqTime) ? oData.ReqTime : "";
			this.ReqQty = (oData && oData.ReqQty) ? oData.ReqQty : "";
			this.ReqDlvBl = (oData && oData.ReqDlvBl) ? oData.ReqDlvBl : "";
			this.SchedType = (oData && oData.SchedType) ? oData.SchedType : "";
				this.TpDate = (oData && oData.TpDate) ? this.datatime(new Date(oData.TpDate)) : this.datatime(new Date());
					this.MsDate = (oData && oData.MsDate) ? this.datatime(new Date(oData.MsDate)) : this.datatime(new Date());
						this.LoadDate = (oData && oData.LoadDate) ? this.datatime(new Date(oData.LoadDate)) : this.datatime(new Date());
							this.GiDate = (oData && oData.GiDate) ? this.datatime(new Date(oData.GiDate)) : this.datatime(new Date());
		//	this.TpDate = (oData && oData.TpDate) ? oData.TpDate : "";
	//		this.MsDate = (oData && oData.MsDate) ? oData.MsDate : "";
		//	this.LoadDate = (oData && oData.LoadDate) ? oData.LoadDate : "";
	//		this.GiDate = (oData && oData.GiDate) ? oData.GiDate : "";
			this.TpTime = (oData && oData.TpTime) ? oData.TpTime : "";
			this.MsTime = (oData && oData.MsTime) ? oData.MsTime : "";
			this.LoadTime = (oData && oData.LoadTime) ? oData.LoadTime : "";
			this.GiTime = (oData && oData.GiTime) ? oData.GiTime : "";
			this.Refobjtype = (oData && oData.Refobjtype) ? oData.Refobjtype : "";
			this.Refobjkey = (oData && oData.Refobjkey) ? oData.Refobjkey : "";
			this.Reflogsys = (oData && oData.Reflogsys) ? oData.Reflogsys : "";
			//this.DlvDate = (oData && oData.DlvDate) ? oData.DlvDate : "";
				this.DlvDate = (oData && oData.DlvDate) ? this.datatime(new Date(oData.DlvDate)) : this.datatime(new Date());
			this.DlvTime = (oData && oData.DlvTime) ? oData.DlvTime : "";
			this.RelType = (oData && oData.RelType) ? oData.RelType : "";
			this.PlanSchedType = (oData && oData.PlanSchedType) ? oData.PlanSchedType : "";
				this.NetPrice = (oData && oData.NetPrice) ? oData.NetPrice : "";

		},

		getRequestItem: function() {
			return {

				ItmNumber: this.ItmNumber,
				HgLvItem: this.HgLvItem,
				PoItmNo: this.PoItmNo,
				Material:this.callMatnr(this.Material),
				AltToItm: this.AltToItm,
				CustMat22: this.CustMat22,
				Batch: this.Batch,
				DlvGroup: this.DlvGroup,
				PartDlv: this.PartDlv,
				ReasonRej: this.ReasonRej,
			//	BillBlock: "99",
			//	BillDate: this.BillDate,
				Plant: this.Plant,
				StoreLoc: this.StoreLoc,
				TargetQty: this.TargetQty,
				TargetQu: this.TargetQu,
				TUnitIso: this.TUnitIso,
				ItemCateg: this.ItemCateg,
				ShortText: this.ShortText,
				PrcGroup1: this.PrcGroup1,
				PrcGroup2: this.PrcGroup2,
				PrcGroup3: this.PrcGroup3,
				PrcGroup4: this.PrcGroup4,
				PrcGroup5: this.PrcGroup5,
				ProdHiera: this.ProdHiera,
				MatlGroup: this.MatlGroup,
				PurchNoC: this.PurchNoC,
				PurchDate: this.PurchDate,
				PoMethod: this.PoMethod,
				Ref1: this.Ref1,
				PurchNoS: this.PurchNoS,
			//	PoDatS: this.PoDatS,
				PoMethS: this.PoMethS,
				Ref1S: this.Ref1S,
				PoitmNoS: this.PoitmNoS,
				PriceGrp: this.PriceGrp,
				CustGroup: this.CustGroup,
				SalesDist: this.SalesDist,
				PriceList: this.PriceList,
				Incoterms1: this.Incoterms1,
				Incoterms2: this.Incoterms2,
				OrdcompIn: this.OrdcompIn,
				BillSched: this.BillSched,
				InvoSched: this.InvoSched,
				MnInvoice: this.MnInvoice,
				AddValDy: this.AddValDy,
			//	FixValDy: this.FixValDy,
				Pmnttrms: this.Pmnttrms,
				PymtMeth: this.PymtMeth,
				AccntAsgn: this.AccntAsgn,
			//	PriceDate: this.PriceDate,
			//	ServDate: this.ServDate,
				DunnKey: this.DunnKey,
				DunnBlock: this.DunnBlock,
				Promotion: this.Promotion,
				PmtgarPro: this.PmtgarPro,
				DocNumFi: this.DocNumFi,
				DepartmNo: this.DepartmNo,
				RecPoint: this.RecPoint,
				Cstcndgrp1: this.Cstcndgrp1,
				Cstcndgrp2: this.Cstcndgrp2,
				Cstcndgrp3: this.Cstcndgrp3,
				Cstcndgrp4: this.Cstcndgrp4,
				Cstcndgrp5: this.Cstcndgrp5,
				DlvTime: this.DlvTime,
				SalesUnit: this.SalesUnit,
				SUnitIso: this.SUnitIso,
				UsageInd: this.UsageInd,
				FixedQuan: this.FixedQuan,
				UnlmtDlv: this.UnlmtDlv,
				Division: this.Division,
				UntofWght: this.UntofWght,
				UnofWtiso: this.UnofWtiso,
				Volunit: this.Volunit,
				Volunitiso: this.Volunitiso,
				DlvPrio: this.DlvPrio,
				ShipPoint: this.ShipPoint,
				Route: this.Route,
			//	CreatedBy: this.CreatedBy,
				TaxClass1: this.TaxClass1,
				TaxClass2: this.TaxClass2,
				TaxClass3: this.TaxClass3,
				TaxClass4: this.TaxClass4,
				TaxClass5: this.TaxClass5,
				TaxClass6: this.TaxClass6,
				TaxClass7: this.TaxClass7,
				TaxClass8: this.TaxClass8,
				TaxClass9: this.TaxClass9,
			//	MatPrGrp: this.MatPrGrp,
			//	ValType: this.ValType,
			//	FixdatQty: this.FixdatQty,
				BomexplNo: this.BomexplNo,
				Resanalkey: this.Resanalkey,
				ReqmtsTyp: this.ReqmtsTyp,
				NoGrPost: this.NoGrPost,
				BusTranst: this.BusTranst,
				OverhdKey: this.OverhdKey,
				CstgSheet: this.CstgSheet,
				Matfrgtgrp: this.Matfrgtgrp,
				Pldlvshdin: this.Pldlvshdin,
				SeqNo: this.SeqNo,
				BilForm: this.BilForm,
			//	DliProfil: this.DliProfil,
				RevType: this.RevType,
				BegdemPer: this.BegdemPer,
				PrRefMat: this.PrRefMat,
				Refobjtype: this.Refobjtype,
				Refobjkey: this.Refobjkey,
				Reflogsys: this.Reflogsys,
				OrderProb: this.OrderProb,
				CfopCode: this.CfopCode,
				Taxlawicms: this.Taxlawicms,
				Taxlawipi: this.Taxlawipi,
				SdTaxcode: this.SdTaxcode,
				AssortMod: this.AssortMod,
				Currency: this.Currency,
				CurrIso: this.CurrIso,
				ProfitCtr: this.ProfitCtr,
				Orderid: this.Orderid,
				WbsElem: this.WbsElem,
			//	RefDoc: this.RefDoc,
			//	RefDocIt: this.RefDocIt,
		//		RefDocCa: this.RefDocCa,
				CustMat35: this.CustMat35,
				ItemguidAtp: this.ItemguidAtp,
				ValContr: this.ValContr,
				ValConI: this.ValConI,
				ConfigId: this.ConfigId,
				InstId: this.InstId,
				MatExt: this.MatExt,
				MatGuid: this.MatGuid,
				MatVers: this.MatVers,
				PMatExt: this.PMatExt,
				PMatGuid: this.PMatGuid,
				PMatVers: this.PMatVers,
				FuncArea: this.FuncArea,
				AlternBom: this.AlternBom,
				FkkConacct: this.FkkConacct,
				EanUpc: this.EanUpc,
				Prodcat: this.Prodcat,
				ShipType: this.ShipType,
				SProcInd: this.SProcInd,
				FuncAreaLong: this.FuncAreaLong,
				BillRel: this.BillRel,
				VwUepos: this.VwUepos,
				Dlvschduse: this.Dlvschduse,
				CfopLong: this.CfopLong,
				Selection: this.Selection,
				MatEntrd: this.MatEntrd,
				LogSystemOwn: this.LogSystemOwn,
				ItmTypeUsage: this.ItmTypeUsage,
				Taxlawiss: this.Taxlawiss,
				MatEntrdExternal: this.MatEntrdExternal,
				MatEntrdGuid: this.MatEntrdGuid,
				MatEntrdVersion: this.MatEntrdVersion,
				LocTaxcat: this.LocTaxcat,
				LocZerovat: this.LocZerovat,
				LocActcode: this.LocActcode,
				LocDisttype: this.LocDisttype,
				LocTxrelclas: this.LocTxrelclas,
				CalcMotive: this.CalcMotive,
				Compreas: this.Compreas,
				Fund: this.Fund,
				FundsCtr: this.FundsCtr,
				CmmtItem: this.CmmtItem,
				GrantNbr: this.GrantNbr,
				BudgetPeriod: this.BudgetPeriod,
				Taxlawcofins: this.Taxlawcofins,
				Taxlawpis: this.Taxlawpis,
				TreasuryAccSymbol: this.TreasuryAccSymbol,
				BusinessEventTcode: this.BusinessEventTcode,
				ModificationAllowed: this.ModificationAllowed,
				CancellationAllowed: this.CancellationAllowed,
				PaymentMethods: this.PaymentMethods,
				BusinessPartnerNo: this.BusinessPartnerNo,
				ReportingFreq: this.ReportingFreq,
				SepaMandateId: this.SepaMandateId,
				ReqSegment: this.ReqSegment,
				TpSublevl: this.TpSublevl,
				TpAgencid: this.TpAgencid,
				TpAltraid: this.TpAltraid,
				TpBegper: this.TpBegper,
				TpEndper: this.TpEndper,
				TpAvtype: this.TpAvtype,
				TpMainAcct: this.TpMainAcct,
				TpSubAcct: this.TpSubAcct,
				TpBetc: this.TpBetc
			//	NetPrice : this.NetPrice

			};
		},

		getRequestConditionItem: function() {
			return {
				// ItmNumber: "000010",
				// CondType: "Z004",
				// CondValue: "9000",

				ItmNumber: this.ItmNumber,
				CondStNo: this.CondStNo,
				CondCount: this.CondCount,
				CondType: "Z004",
				CondValue: "9000",
				Currency: this.Currency,
				CondUnit: this.CondUnit,
				CurrIso: this.CurrIso,
				CdUntIso: this.CdUntIso,
				Refobjtype: this.Refobjtype,
				Refobjkey: this.Refobjkey,
				Reflogsys: this.Reflogsys,
				Applicatio: this.Applicatio,
				Conpricdat: this.Conpricdat,
				Calctypcon: this.Calctypcon,
				Condtype: this.Condtype,
				StatCon: this.StatCon,
				Scaletype: this.Scaletype,
				Accruals: this.Accruals,
				Coninvolst: this.Coninvolst,
				Condorigin: this.Condorigin,
				Groupcond: this.Groupcond,
				CondUpdat: this.CondUpdat,
				AccessSeq: this.AccessSeq,
				Condcount: this.Condcount,
				Currency2: this.Currency2,
				CurrIso2: this.CurrIso2,
				Condcntrl: this.Condcntrl,
				Condisacti: this.Condisacti,
				Condclass: this.Condclass,
				Factbasval: this.Factbasval,
				Scalebasin: this.Scalebasin,
				Unitmeasur: this.Unitmeasur,
				IsoUnit: this.IsoUnit,
				Currenckey: this.Currenckey,
				Curreniso: this.Curreniso,
				Condincomp: this.Condincomp,
				Condconfig: this.Condconfig,
				Condchaman: this.Condchaman,
				CondNo: this.CondNo,
				TaxCode: this.TaxCode,
				Varcond: this.Varcond,
				Accountkey: this.Accountkey,
				AccountKe: this.AccountKe,
				WtWithcd: this.WtWithcd,
				Structcond: this.Structcond,
				Factconbas: this.Factconbas,
				Condcoinhd: this.Condcoinhd

			};
		},
		getRequestPriceCondition: function() {
			return {
				// ItmNumber: "000010",
				// CondType: "Z004",
				// CondValue: "9000",

				ItmNumber: this.ItmNumber,
				CondStNo: this.CondStNo,
				CondCount: this.CondCount,
				CondType: "ZMA1",
				CondValue: this.NetPrice,
				Currency: this.Currency,
				CondUnit: this.CondUnit,
				CurrIso: this.CurrIso,
				CdUntIso: this.CdUntIso,
				Refobjtype: this.Refobjtype,
				Refobjkey: this.Refobjkey,
				Reflogsys: this.Reflogsys,
				Applicatio: this.Applicatio,
				Conpricdat: this.Conpricdat,
				Calctypcon: this.Calctypcon,
				Condtype: this.Condtype,
				StatCon: this.StatCon,
				Scaletype: this.Scaletype,
				Accruals: this.Accruals,
				Coninvolst: this.Coninvolst,
				Condorigin: this.Condorigin,
				Groupcond: this.Groupcond,
				CondUpdat: this.CondUpdat,
				AccessSeq: this.AccessSeq,
				Condcount: this.Condcount,
				Currency2: this.Currency2,
				CurrIso2: this.CurrIso2,
				Condcntrl: this.Condcntrl,
				Condisacti: this.Condisacti,
				Condclass: this.Condclass,
				Factbasval: this.Factbasval,
				Scalebasin: this.Scalebasin,
				Unitmeasur: this.Unitmeasur,
				IsoUnit: this.IsoUnit,
				Currenckey: this.Currenckey,
				Curreniso: this.Curreniso,
				Condincomp: this.Condincomp,
				Condconfig: this.Condconfig,
				Condchaman: this.Condchaman,
				CondNo: this.CondNo,
				TaxCode: this.TaxCode,
				Varcond: this.Varcond,
				Accountkey: this.Accountkey,
				AccountKe: this.AccountKe,
				WtWithcd: this.WtWithcd,
				Structcond: this.Structcond,
				Factconbas: this.Factconbas,
				Condcoinhd: this.Condcoinhd

			};
		},
		

		getRequestScheduleItem: function() {
			return {

				ItmNumber: this.ItmNumber,
				SchedLine: this.SchedLine,
				ReqDate: this.ReqDate,
				DateType: this.DateType,
				ReqTime: this.ReqTime,
				ReqQty: this.TargetQty,
				ReqDlvBl: this.ReqDlvBl,
				SchedType: this.SchedType,
				TpDate: this.TpDate,
				MsDate: this.MsDate,
				LoadDate: this.LoadDate,
				GiDate: this.GiDate,
				TpTime: this.TpTime,
				MsTime: this.MsTime,
				LoadTime: this.LoadTime,
				GiTime: this.GiTime,
				Refobjtype: this.Refobjtype,
				Refobjkey: this.Refobjkey,
				Reflogsys: this.Reflogsys,
				DlvDate: this.DlvDate,
				DlvTime: this.DlvTime,
				RelType: this.RelType,
				PlanSchedType: this.PlanSchedType

			};
		},

		validate: function() {
			var bRate = true,
				bValidFrom = true,
				bValidTo = true;
			if (this.Rate === "") {
				this.RateValueState = "Error";
				bRate = false;
			} else {
				this.RateValueState = "None";
				bRate = true;
			}
			if (this.ValidFrom === "") {
				this.ValidFromValueState = "Error";
				bValidFrom = false;
			} else {
				this.ValidFromValueState = "None";
				bValidFrom = true;
			}
			if (this.ValidTo === "") {
				this.ValidToValueState = "Error";
				bValidTo = false;
			} else {
				this.ValidToValueState = "None";
				bValidTo = true;
			}
			return (bRate && bValidFrom && bValidTo);
		},
			datatime: function(dDate, tyt) {
			var s_doc_datePost = dDate;
			var Datepoststring = s_doc_datePost.toISOString();
			Datepoststring = Datepoststring.slice(0, -5);
			return Datepoststring;
		},
			callMatnr: function(Matnr) {

			var zero = "";

			if ($.isNumeric((Matnr)) === true) {
				var len = Matnr.length;
				if (len !== undefined) {
					var z = 18 - len;
					for (var i = 0; i < z; i++) {
						zero += "0";
					}
				}

				Matnr = zero + Matnr;

			}

			return Matnr;
		}
	});
	return SOConditionItem;
});