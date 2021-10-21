sap.ui.define([
	"com/vSimpleApp/model/BaseObject",
	"sap/m/MessageToast"

], function(BaseObject, Application, MessageToast) {
	"use strict";
	var PODetail = BaseObject.extend("com.vSimpleApp.model.PODetail", {
		constructor: function(oData) {
		//	BaseObject.call(this);
			this.setData(oData);
		},

		setData: function(oData) {
	
			this.PoItem = (oData && oData.PoItem) ? this.LeadingZeros(oData.PoItem , 5) : " ";
					/*	this.CreatDate = (oData && oData.CreatDate) ? this.format(new Date(oData.CreatDate), "dd/MM/yyyy") : this.format(new Date(),
				"dd/MM/yyyy");*/
			this.DeleteInd = (oData && oData.DeleteInd) ? oData.DeleteInd : "";
			this.ShortText = (oData && oData.ShortText) ? oData.ShortText : "";
			this.Material = (oData && oData.Material) ? oData.Material : "";
			this.MaterialExternal = (oData && oData.MaterialExternal) ? oData.MaterialExternal : "";
			this.MaterialGuid = (oData && oData.MaterialGuid) ? oData.MaterialGuid : "";
			this.MaterialVersion = (oData && oData.MaterialVersion) ? oData.MaterialVersion : "";
			this.Ematerial = (oData && oData.Ematerial) ? oData.Ematerial : "";
			this.EmaterialExternal = (oData && oData.EmaterialExternal) ? oData.EmaterialExternal : "";
			this.EmaterialGuid = (oData && oData.EmaterialGuid) ? oData.EmaterialGuid : "";
			this.EmaterialVersion = (oData && oData.EmaterialVersion) ? oData.EmaterialVersion : "";
			this.Plant = (oData && oData.Plant) ? oData.Plant : "";
			this.StgeLoc = (oData && oData.StgeLoc) ? oData.StgeLoc : "";
			this.Trackingno = (oData && oData.Trackingno) ? oData.Trackingno : "";
			this.MatlGroup = (oData && oData.MatlGroup) ? oData.MatlGroup : "";
			this.InfoRec = (oData && oData.InfoRec) ? oData.InfoRec : "";
			this.VendMat = (oData && oData.VendMat) ? oData.VendMat : "";
			this.Quantity = (oData && oData.Quantity) ? oData.Quantity : "";
			this.PoUnit = (oData && oData.PoUnit) ? oData.PoUnit : "";
			this.PoUnitIso = (oData && oData.PoUnitIso) ? oData.PoUnitIso : "";
			this.OrderprUn = (oData && oData.OrderprUn) ? oData.OrderprUn : "";
			this.OrderprUnIso = (oData && oData.OrderprUnIso) ? oData.OrderprUnIso : "";
			this.ConvNum1 = (oData && oData.ConvNum1) ? oData.ConvNum1 : "";
			this.ConvDen1 = (oData && oData.ConvDen1) ? oData.ConvDen1 : "";
			this.NetPrice = (oData && oData.NetPrice) ? oData.NetPrice : "";
			this.PriceUnit = (oData && oData.PriceUnit) ? oData.PriceUnit : "";
			this.GrPrTime = (oData && oData.GrPrTime) ? oData.GrPrTime : "";
			this.TaxCode = (oData && oData.TaxCode) ? oData.TaxCode : "";
			this.BonGrp1 = (oData && oData.BonGrp1) ? oData.BonGrp1 : "";
			this.QualInsp = (oData && oData.QualInsp) ? oData.QualInsp : "";
			this.InfoUpd = (oData && oData.InfoUpd) ? oData.InfoUpd : "";
			this.PrntPrice = (oData && oData.PrntPrice) ? oData.PrntPrice : "";
			this.EstPrice = (oData && oData.EstPrice) ? oData.EstPrice : "";
			this.Reminder1 = (oData && oData.Reminder1) ? oData.Reminder1 : "";
			this.Reminder2 = (oData && oData.Reminder2) ? oData.Reminder2 : "";
			this.Reminder3 = (oData && oData.Reminder3) ? oData.Reminder3 : "";
			this.OverDlvTol = (oData && oData.OverDlvTol) ? oData.OverDlvTol : "";
			this.UnlimitedDlv = (oData && oData.UnlimitedDlv) ? oData.UnlimitedDlv : "";
			this.UnderDlvTol = (oData && oData.UnderDlvTol) ? oData.UnderDlvTol : "";
			this.ValType = (oData && oData.ValType) ? oData.ValType : "";
			this.NoMoreGr = (oData && oData.NoMoreGr) ? oData.NoMoreGr : "";
			this.FinalInv = (oData && oData.FinalInv) ? oData.FinalInv : "";
			this.ItemCat = (oData && oData.ItemCat) ? oData.ItemCat : "";
			this.Acctasscat = (oData && oData.Acctasscat) ? oData.Acctasscat : "";
			this.Distrib = (oData && oData.Distrib) ? oData.Distrib : "";
			this.PartInv = (oData && oData.PartInv) ? oData.PartInv : "";
			this.GrInd = (oData && oData.GrInd) ? oData.GrInd : "";
			this.GrNonVal = (oData && oData.GrNonVal) ? oData.GrNonVal : "";
			this.IrInd = (oData && oData.IrInd) ? oData.IrInd : "";
			this.FreeItem = (oData && oData.FreeItem) ? oData.FreeItem : "";
			this.GrBasediv = (oData && oData.GrBasediv) ? oData.GrBasediv : "";
			this.AcknReqd = (oData && oData.AcknReqd) ? oData.AcknReqd : "";
			this.AcknowlNo = (oData && oData.AcknowlNo) ? oData.AcknowlNo : "";
			this.Agreement = (oData && oData.Agreement) ? oData.Agreement : "";
			this.AgmtItem = (oData && oData.AgmtItem) ? oData.AgmtItem : "";
			this.Shipping = (oData && oData.Shipping) ? oData.Shipping : "";
			this.Customer = (oData && oData.Customer) ? oData.Customer : "";
			this.CondGroup = (oData && oData.CondGroup) ? oData.CondGroup : "";
			this.NoDisct = (oData && oData.NoDisct) ? oData.NoDisct : "";
			this.PlanDel = (oData && oData.PlanDel) ? oData.PlanDel : "";
			this.NetWeight = (oData && oData.NetWeight) ? oData.NetWeight : "";
			this.Weightunit = (oData && oData.Weightunit) ? oData.Weightunit : "";
			this.WeightunitIso = (oData && oData.WeightunitIso) ? oData.WeightunitIso : "";
			this.Taxjurcode = (oData && oData.Taxjurcode) ? oData.Taxjurcode : "";
			this.CtrlKey = (oData && oData.CtrlKey) ? oData.CtrlKey : "";
			this.ConfCtrl = (oData && oData.ConfCtrl) ? oData.ConfCtrl : "";
			this.RevLev = (oData && oData.RevLev) ? oData.RevLev : "";
			this.Fund = (oData && oData.Fund) ? oData.Fund : "";
			this.FundsCtr = (oData && oData.FundsCtr) ? oData.FundsCtr : "";
			this.CmmtItem = (oData && oData.CmmtItem) ? oData.CmmtItem : "";
			this.Pricedate = (oData && oData.Pricedate) ? oData.Pricedate : "";
			this.PriceDate = (oData && oData.PriceDate) ? oData.PriceDate : "";
			this.GrossWt = (oData && oData.GrossWt) ? oData.GrossWt : "";
			this.Volume = (oData && oData.Volume) ? oData.Volume : "";
			this.Volumeunit = (oData && oData.Volumeunit) ? oData.Volumeunit : "";
			this.VolumeunitIso = (oData && oData.VolumeunitIso) ? oData.VolumeunitIso : "";
			this.Incoterms1 = (oData && oData.Incoterms1) ? oData.Incoterms1 : "";
			this.Incoterms2 = (oData && oData.Incoterms2) ? oData.Incoterms2 : "";
			this.PreVendor = (oData && oData.PreVendor) ? oData.PreVendor : "";
			this.VendPart = (oData && oData.VendPart) ? oData.VendPart : "";
			this.HlItem = (oData && oData.HlItem) ? oData.HlItem : "";
			this.GrToDate = (oData && oData.GrToDate) ? oData.GrToDate : "";
			this.SuppVendor = (oData && oData.SuppVendor) ? oData.SuppVendor : "";
			this.ScVendor = (oData && oData.ScVendor) ? oData.ScVendor : "";
			this.KanbanInd = (oData && oData.KanbanInd) ? oData.KanbanInd : "";
			this.Ers = (oData && oData.Ers) ? oData.Ers : "";
			this.RPromo = (oData && oData.RPromo) ? oData.RPromo : "";
			this.Points = (oData && oData.Points) ? oData.Points : "";
			this.PointUnit = (oData && oData.PointUnit) ? oData.PointUnit : "";
			this.PointUnitIso = (oData && oData.PointUnitIso) ? oData.PointUnitIso : "";
			this.Season = (oData && oData.Season) ? oData.Season : "";
			this.SeasonYr = (oData && oData.SeasonYr) ? oData.SeasonYr : "";
			this.BonGrp2 = (oData && oData.BonGrp2) ? oData.BonGrp2 : "";
			this.BonGrp3 = (oData && oData.BonGrp3) ? oData.BonGrp3 : "";
			this.SettItem = (oData && oData.SettItem) ? oData.SettItem : "";
			this.RfqNo = (oData && oData.RfqNo) ? oData.RfqNo : "";
			this.RfqItem = (oData && oData.RfqItem) ? oData.RfqItem : "";
			this.PreqNo = (oData && oData.PreqNo) ? oData.PreqNo : "";
			this.PreqItem = (oData && oData.PreqItem) ? oData.PreqItem : "";
			this.RefDoc = (oData && oData.RefDoc) ? oData.RefDoc : "";
			this.RefItem = (oData && oData.RefItem) ? oData.RefItem : "";
			this.SiCat = (oData && oData.SiCat) ? oData.SiCat : "";
			this.RetItem = (oData && oData.RetItem) ? oData.RetItem : "";
			this.AtRelev = (oData && oData.AtRelev) ? oData.AtRelev : "";
			this.OrderReason = (oData && oData.OrderReason) ? oData.OrderReason : "";
			this.BrasNbm = (oData && oData.BrasNbm) ? oData.BrasNbm : "";
			this.MatlUsage = (oData && oData.MatlUsage) ? oData.MatlUsage : "";
			this.MatOrigin = (oData && oData.MatOrigin) ? oData.MatOrigin : "";
			this.InHouse = (oData && oData.InHouse) ? oData.InHouse : "";
			this.Indus3 = (oData && oData.Indus3) ? oData.Indus3 : "";
			this.InfIndex = (oData && oData.InfIndex) ? oData.InfIndex : "";
			this.UntilDate = (oData && oData.UntilDate) ? oData.UntilDate : "";
			this.DelivCompl = (oData && oData.DelivCompl) ? oData.DelivCompl : "";
			this.PartDeliv = (oData && oData.PartDeliv) ? oData.PartDeliv : "";
			this.ShipBlocked = (oData && oData.ShipBlocked) ? oData.ShipBlocked : "";
			this.PreqName = (oData && oData.PreqName) ? oData.PreqName : "";
			this.PeriodIndExpirationDate = (oData && oData.PeriodIndExpirationDate) ? oData.PeriodIndExpirationDate : "";
			this.IntObjNo = (oData && oData.IntObjNo) ? oData.IntObjNo : "";
			this.PckgNo = (oData && oData.PckgNo) ? oData.PckgNo : "";
			this.Batch = (oData && oData.Batch) ? oData.Batch : "";
			this.Vendrbatch = (oData && oData.Vendrbatch) ? oData.Vendrbatch : "";
			this.Calctype = (oData && oData.Calctype) ? oData.Calctype : "";
			this.GrantNbr = (oData && oData.GrantNbr) ? oData.GrantNbr : "";
			this.CmmtItemLong = (oData && oData.CmmtItemLong) ? oData.CmmtItemLong : "";
			this.FuncAreaLong = (oData && oData.FuncAreaLong) ? oData.FuncAreaLong : "";
			this.NoRounding = (oData && oData.NoRounding) ? oData.NoRounding : "";
			this.PoPrice = (oData && oData.PoPrice) ? oData.PoPrice : "";
			this.SupplStloc = (oData && oData.SupplStloc) ? oData.SupplStloc : "";
			this.SrvBasedIv = (oData && oData.SrvBasedIv) ? oData.SrvBasedIv : "";
			this.FundsRes = (oData && oData.FundsRes) ? oData.FundsRes : "";
			this.ResItem = (oData && oData.ResItem) ? oData.ResItem : "";
			this.OrigAccept = (oData && oData.OrigAccept) ? oData.OrigAccept : "";
			this.AllocTbl = (oData && oData.AllocTbl) ? oData.AllocTbl : "";
			this.AllocTblItem = (oData && oData.AllocTblItem) ? oData.AllocTblItem : "";
			this.SrcStockType = (oData && oData.SrcStockType) ? oData.SrcStockType : "";
			this.ReasonRej = (oData && oData.ReasonRej) ? oData.ReasonRej : "";
			this.CrmSalesOrderNo = (oData && oData.CrmSalesOrderNo) ? oData.CrmSalesOrderNo : "";
			this.CrmSalesOrderItemNo = (oData && oData.CrmSalesOrderItemNo) ? oData.CrmSalesOrderItemNo : "";
			this.CrmRefSalesOrderNo = (oData && oData.CrmRefSalesOrderNo) ? oData.CrmRefSalesOrderNo : "";
			this.CrmRefSoItemNo = (oData && oData.CrmRefSoItemNo) ? oData.CrmRefSoItemNo : "";
			this.PrioUrgency = (oData && oData.PrioUrgency) ? oData.PrioUrgency : "";
			this.PrioRequirement = (oData && oData.PrioRequirement) ? oData.PrioRequirement : "";
			this.ReasonCode = (oData && oData.ReasonCode) ? oData.ReasonCode : "";
			this.FundLong = (oData && oData.FundLong) ? oData.FundLong : "";
			this.LongItemNumber = (oData && oData.LongItemNumber) ? oData.LongItemNumber : "";
			this.ExternalSortNumber = (oData && oData.ExternalSortNumber) ? oData.ExternalSortNumber : "";
			this.ExternalHierarchyType = (oData && oData.ExternalHierarchyType) ? oData.ExternalHierarchyType : "";
			this.RetentionPercentage = (oData && oData.RetentionPercentage) ? oData.RetentionPercentage : "";
			this.DownpayType = (oData && oData.DownpayType) ? oData.DownpayType : "";
			this.DownpayAmount = (oData && oData.DownpayAmount) ? oData.DownpayAmount : "";
			this.DownpayPercent = (oData && oData.DownpayPercent) ? oData.DownpayPercent : "";
			this.DownpayDuedate = (oData && oData.DownpayDuedate) ? oData.DownpayDuedate : "";
			this.ExtRfxNumber = (oData && oData.ExtRfxNumber) ? oData.ExtRfxNumber : "";
			this.ExtRfxItem = (oData && oData.ExtRfxItem) ? oData.ExtRfxItem : "";
			this.ExtRfxSystem = (oData && oData.ExtRfxSystem) ? oData.ExtRfxSystem : "";
			this.SrmContractId = (oData && oData.SrmContractId) ? oData.SrmContractId : "";
			this.SrmContractItm = (oData && oData.SrmContractItm) ? oData.SrmContractItm : "";
			this.BudgetPeriod = (oData && oData.BudgetPeriod) ? oData.BudgetPeriod : "";
			this.BlockReasonId = (oData && oData.BlockReasonId) ? oData.BlockReasonId : "";
			this.BlockReasonText = (oData && oData.BlockReasonText) ? oData.BlockReasonText : "";
			this.SpeCrmFkrel = (oData && oData.SpeCrmFkrel) ? oData.SpeCrmFkrel : "";
			this.DateQtyFixed = (oData && oData.DateQtyFixed) ? oData.DateQtyFixed : "";
			this.GiBasedGr = (oData && oData.GiBasedGr) ? oData.GiBasedGr : "";
			this.Shiptype = (oData && oData.Shiptype) ? oData.Shiptype : "";
			this.Handoverloc = (oData && oData.Handoverloc) ? oData.Handoverloc : "";
			this.TcAutDet = (oData && oData.TcAutDet) ? oData.TcAutDet : "";
			this.ManualTcReason = (oData && oData.ManualTcReason) ? oData.ManualTcReason : "";
			this.FiscalIncentive = (oData && oData.FiscalIncentive) ? oData.FiscalIncentive : "";
			this.FiscalIncentiveId = (oData && oData.FiscalIncentiveId) ? oData.FiscalIncentiveId : "";
			this.TaxSubjectSt = (oData && oData.TaxSubjectSt) ? oData.TaxSubjectSt : "";
			this.ReqSegment = (oData && oData.ReqSegment) ? oData.ReqSegment : "";
			this.StkSegment = (oData && oData.StkSegment) ? oData.StkSegment : "";

		},
		LeadingZeros: function(num, size) {
			var s = num + "";
			while (s.length < size) s = "0" + s;
			return s;
		},
		getCreateRequestPayload: function() {

		},

		getRequestPayload: function(isCreate) {

		},
		getModel: function() {
			return this.model;
		}
	});
	return PODetail;
});