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
			this.BillDate = (oData && oData.BillDate) ? oData.BillDate : "";
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
			this.PurchDate = (oData && oData.PurchDate) ? oData.PurchDate : "";
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
			this.PriceDate = (oData && oData.PriceDate) ? oData.PriceDate : "";
			this.ServDate = (oData && oData.ServDate) ? oData.ServDate : "";
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
			this.CreatedBy = (oData && oData.CreatedBy) ? oData.CreatedBy : "";
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
			this.DunDate = (oData && oData.DunDate) ? oData.DunDate : "";
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
			this.BillDate = (oData && oData.BillDate) ? oData.BillDate : "";
			this.ServDate = (oData && oData.ServDate) ? oData.ServDate : "";
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
			this.CreatedBy = (oData && oData.CreatedBy) ? oData.CreatedBy : "";
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
			this.ReqDate = (oData && oData.ReqDate) ? oData.ReqDate : "";
			this.DateType = (oData && oData.DateType) ? oData.DateType : "";
			this.ReqTime = (oData && oData.ReqTime) ? oData.ReqTime : "";
			this.ReqQty = (oData && oData.ReqQty) ? oData.ReqQty : "";
			this.ReqDlvBl = (oData && oData.ReqDlvBl) ? oData.ReqDlvBl : "";
			this.SchedType = (oData && oData.SchedType) ? oData.SchedType : "";
			this.TpDate = (oData && oData.TpDate) ? oData.TpDate : "";
			this.MsDate = (oData && oData.MsDate) ? oData.MsDate : "";
			this.LoadDate = (oData && oData.LoadDate) ? oData.LoadDate : "";
			this.GiDate = (oData && oData.GiDate) ? oData.GiDate : "";
			this.TpTime = (oData && oData.TpTime) ? oData.TpTime : "";
			this.MsTime = (oData && oData.MsTime) ? oData.MsTime : "";
			this.LoadTime = (oData && oData.LoadTime) ? oData.LoadTime : "";
			this.GiTime = (oData && oData.GiTime) ? oData.GiTime : "";
			this.Refobjtype = (oData && oData.Refobjtype) ? oData.Refobjtype : "";
			this.Refobjkey = (oData && oData.Refobjkey) ? oData.Refobjkey : "";
			this.Reflogsys = (oData && oData.Reflogsys) ? oData.Reflogsys : "";
			this.DlvDate = (oData && oData.DlvDate) ? oData.DlvDate : "";
			this.DlvTime = (oData && oData.DlvTime) ? oData.DlvTime : "";
			this.RelType = (oData && oData.RelType) ? oData.RelType : "";
			this.PlanSchedType = (oData && oData.PlanSchedType) ? oData.PlanSchedType : "";

		},

		getRequestItem: function() {
			return {
				ItmNumber: "000010",
				Material: 	this.Material,
				Plant:this.Plant,
				TargetQty: this.TargetQty
			};
		},

		getRequestConditionItem: function() {
			return {
				ItmNumber: "000010",
				CondType: "Z004",
				CondValue: "9000"

			};
		},

		getRequestScheduleItem: function() {
			return {
				ItmNumber: "000010",
				ReqQty: this.TargetQty
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
		}
	});
	return SOConditionItem;
});