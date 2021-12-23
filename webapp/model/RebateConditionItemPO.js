sap.ui.define([
	"com/vSimpleApp/model/BaseObject"
], function(BaseObject) {
	"use strict";
	var instance;
	var RebateConditionItemPO = BaseObject.extend("com.vSimpleApp.model.RebateConditionItemPO", {
		constructor: function(oData) {
			BaseObject.call(this);

			this.setData(oData);
		},

		setData: function(oData) {

			this.PoItem = (oData && oData.PoItem) ? oData.PoItem : "";
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
			this.Vendor = (oData && oData.Vendor) ? oData.Vendor : "";
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
			//	this.Ebelp = (oData && oData.Ebelp) ? oData.Ebelp : "";

			/*	this.Matnr = (oData && oData.Matnr) ? oData.Matnr : "";
				this.Werks = (oData && oData.Werks) ? oData.Werks : "";
				this.Menge = (oData && oData.Menge) ? oData.Menge : "";
				this.Material = (oData && oData.Material) ? oData.Material : "";*/

			this.Werks = (oData && oData.Werks) ? oData.Werks : "";
			this.Matnr = (oData && oData.Matnr) ? oData.Matnr : "";
			this.MAKTX = (oData && oData.MAKTX) ? oData.MAKTX : "";
			this.Bukrs = (oData && oData.Bukrs) ? oData.Bukrs : "";
			this.EKGRP = (oData && oData.EKGRP) ? oData.EKGRP : "";
			this.Ekorg = (oData && oData.Ekorg) ? oData.Ekorg : "";
				this.Description = (oData && oData.Description) ? oData.Description : "";

		},

		getRequestItems: function() {
			return {

				/*	Ebelp: this.Ebelp,
			
					Matnr: this.Matnr,
					Werks: this.Werks,
					Menge: this.Menge,
*/
				PoItem: this.PoItem,
				DeleteInd: this.DeleteInd,
				ShortText: this.ShortText,
				Material: this.Material,
				MaterialExternal: this.MaterialExternal,
				MaterialGuid: this.MaterialGuid,
				MaterialVersion: this.MaterialVersion,
				Ematerial: this.Material,
				EmaterialExternal: this.EmaterialExternal,
				EmaterialGuid: this.EmaterialGuid,
				EmaterialVersion: this.EmaterialVersion,
				Plant: this.Plant,
				//	StgeLoc: this.StgeLoc,
				Trackingno: this.Trackingno,
				//	MatlGroup: this.MatlGroup,
				InfoRec: this.InfoRec,
				VendMat: this.VendMat,
				Quantity: this.Quantity,
				PoUnit: this.PoUnit,
				//	PoUnitIso: this.PoUnitIso,
				OrderprUn: this.PoUnit,
				//	OrderprUnIso: this.OrderprUnIso,
				//	ConvNum1: this.ConvNum1,
				//	ConvDen1: this.ConvDen1,
				NetPrice: this.NetPrice,
				//		PriceUnit: this.PriceUnit,
				GrPrTime: "0",
				TaxCode: this.TaxCode,
				BonGrp1: this.BonGrp1,
				QualInsp: this.QualInsp,
				InfoUpd: this.InfoUpd,
				//	PrntPrice: "X",
				PrntPrice: this.PrntPrice,
				EstPrice: this.EstPrice,
				Reminder1: "0",
				Reminder2: "0",
				Reminder3: "0",
				//	OverDlvTol: this.OverDlvTol,
				UnlimitedDlv: this.UnlimitedDlv,
				UnderDlvTol: "0.0",
				ValType: this.ValType,
				NoMoreGr: this.NoMoreGr,
				FinalInv: this.FinalInv,
				ItemCat: "0",
				Acctasscat: this.Acctasscat,
				Distrib: this.Distrib,
				PartInv: this.PartInv,
				//	GrInd: "X",
				GrInd: this.GrInd,
				GrNonVal: this.GrNonVal,
				//	IrInd: "X",
				IrInd: this.IrInd,
				FreeItem: this.FreeItem,
				GrBasediv: this.GrBasediv,
				AcknReqd: this.AcknReqd,
				AcknowlNo: this.AcknowlNo,
				Agreement: this.Agreement,
				//	AgmtItem: this.AgmtItem,
				Shipping: this.Shipping,
				Customer: this.Customer,
				CondGroup: this.CondGroup,
				NoDisct: this.NoDisct,
				//	PlanDel: this.PlanDel,
				///	NetWeight: this.NetWeight,
				Weightunit: "KG",
				WeightunitIso: "KGM",
				Taxjurcode: this.Taxjurcode,
				CtrlKey: this.CtrlKey,
				ConfCtrl: this.ConfCtrl,
				RevLev: this.RevLev,
				Fund: this.Fund,
				FundsCtr: this.FundsCtr,
				CmmtItem: this.CmmtItem,
				//	Pricedate: this.Pricedate,
				//PriceDate: this.PriceDate,
				//0	GrossWt: this.GrossWt,
				Volume: "0.000",
				Volumeunit: this.Volumeunit,
				VolumeunitIso: this.VolumeunitIso,
				Incoterms1: this.Incoterms1,
				Incoterms2: this.Incoterms2,
				PreVendor: this.PreVendor,
				VendPart: this.VendPart,
				HlItem: this.HlItem,
				//	GrToDate: this.GrToDate,
				SuppVendor: this.SuppVendor,
				//	Vendor: this.Vendor,
				ScVendor: this.ScVendor,
				KanbanInd: this.KanbanInd,
				Ers: this.Ers,
				RPromo: this.RPromo,
				//	Points: this.Points,
				PointUnit: this.PointUnit,
				PointUnitIso: this.PointUnitIso,
				Season: this.Season,
				SeasonYr: this.SeasonYr,
				BonGrp2: this.BonGrp2,
				BonGrp3: this.BonGrp3,
				SettItem: this.SettItem,
				RfqNo: this.RfqNo,
				//	RfqItem: this.RfqItem,
				PreqNo: this.PreqNo,
				//	PreqItem: this.PreqItem,
				RefDoc: this.RefDoc,
				//	RefItem: this.RefItem,
				SiCat: this.SiCat,
				RetItem: this.RetItem,
				AtRelev: this.AtRelev,
				OrderReason: this.OrderReason,
				BrasNbm: this.BrasNbm,
				MatlUsage: this.MatlUsage,
				MatOrigin: this.MatOrigin,
				InHouse: this.InHouse,
				Indus3: this.Indus3,
				InfIndex: this.InfIndex,
				//		UntilDate: this.UntilDate,
				DelivCompl: this.DelivCompl,
				PartDeliv: this.PartDeliv,
				ShipBlocked: this.ShipBlocked,
				PreqName: this.PreqName,
				PeriodIndExpirationDate: "D",
				//	IntObjNo: this.IntObjNo,
				//	PckgNo: this.PckgNo,
				Batch: this.Batch,
				Vendrbatch: this.Vendrbatch,
				Calctype: this.Calctype,
				GrantNbr: this.GrantNbr,
				CmmtItemLong: this.CmmtItemLong,
				FuncAreaLong: this.FuncAreaLong,
				NoRounding: this.NoRounding,
				PoPrice: this.PoPrice,
				SupplStloc: this.SupplStloc,
				SrvBasedIv: this.SrvBasedIv,
				FundsRes: this.FundsRes,
				//	ResItem: this.ResItem,
				OrigAccept: this.OrigAccept,
				AllocTbl: this.AllocTbl,
				//	AllocTblItem: this.AllocTblItem,
				SrcStockType: this.SrcStockType,
				ReasonRej: this.ReasonRej,
				CrmSalesOrderNo: this.CrmSalesOrderNo,
				//0	CrmSalesOrderItemNo: this.CrmSalesOrderItemNo,
				CrmRefSalesOrderNo: this.CrmRefSalesOrderNo,
				CrmRefSoItemNo: this.CrmRefSoItemNo,
				PrioUrgency: this.PrioUrgency,
				//		PrioRequirement: this.PrioRequirement,
				ReasonCode: this.ReasonCode,
				FundLong: this.FundLong,
				LongItemNumber: this.LongItemNumber,
				//0	ExternalSortNumber: this.ExternalSortNumber,
				ExternalHierarchyType: this.ExternalHierarchyType,
				RetentionPercentage: "0.00",
				DownpayType: this.DownpayType,
				//	0	DownpayAmount: this.DownpayAmount,
				//0	DownpayPercent: this.DownpayPercent,
				//	DownpayDuedate: this.DownpayDuedate,
				ExtRfxNumber: this.ExtRfxNumber,
				ExtRfxItem: this.ExtRfxItem,
				ExtRfxSystem: this.ExtRfxSystem,
				SrmContractId: this.SrmContractId,
				//		SrmContractItm: this.SrmContractItm,
				BudgetPeriod: this.BudgetPeriod,
				BlockReasonId: this.BlockReasonId,
				BlockReasonText: this.BlockReasonText,
				SpeCrmFkrel: this.SpeCrmFkrel,
				DateQtyFixed: this.DateQtyFixed,
				GiBasedGr: this.GiBasedGr,
				Shiptype: this.Shiptype,
				Handoverloc: this.Handoverloc,
				TcAutDet: this.TcAutDet,
				ManualTcReason: this.ManualTcReason,
				FiscalIncentive: this.FiscalIncentive,
				FiscalIncentiveId: this.FiscalIncentiveId,
				TaxSubjectSt: this.TaxSubjectSt,
				ReqSegment: this.ReqSegment,
				StkSegment: this.StkSegment

			};
		},

		getHierarchyItems: function() {
					return {

						PoItem: this.PoItem,

						ShortText: this.MAKTX,
						Material: this.Matnr,
						Ematerial: this.Matnr,
						Plant:this.Werks,
						Acctasscat: "",
						AcknReqd: "",
						AcknowlNo: "",
						Agreement: "",
						AllocTbl: "",
						AtRelev: "",
						Batch: "",
						BlockReasonId: "",
						BlockReasonText: "",
						BonGrp1: "",
						BonGrp2: "",
						BonGrp3: "",
						BrasNbm: "",
						BudgetPeriod: "",
						Calctype: "",
						CmmtItem: "",
						CmmtItemLong: "",
						CondGroup: "",
						ConfCtrl: "",
						CrmRefSalesOrderNo: "",
						CrmRefSoItemNo: "",
						CrmSalesOrderNo: "",
						CtrlKey: "",
						Customer: "",
						DateQtyFixed: "",
						DeleteInd: "",
						DelivCompl: "",
						Distrib: "",
						DownpayType: "",

						EmaterialExternal: "",
						EmaterialGuid: "",
						EmaterialVersion: "",
						Ers: "",
						EstPrice: "",
						ExtRfxItem: "",
						ExtRfxNumber: "",
						ExtRfxSystem: "",
						ExternalHierarchyType: "",
						FinalInv: "",
						FiscalIncentive: "",
						FiscalIncentiveId: "",
						FreeItem: "",
						FuncAreaLong: "",
						Fund: "",
						FundLong: "",
						FundsCtr: "",
						FundsRes: "",
						GiBasedGr: "",
						GrBasediv: "",
						GrInd: "X",
						GrNonVal: "",
						GrPrTime: "0",
						GrantNbr: "",
						Handoverloc: "",
						HlItem: "00000",
						InHouse: "",
						Incoterms1: "",
						Incoterms2: "",
						Indus3: "",
						InfIndex: "",
						InfoRec: "",
						InfoUpd: "B",
						IrInd: "X",
						ItemCat: "0",
						KanbanInd: "",
						LongItemNumber: "",
						ManualTcReason: "",
						MatOrigin: "",

						MaterialExternal: "",
						MaterialGuid: "",
						MaterialVersion: "",
						MatlUsage: "",
						NetPrice: "150.000000000",
						NoDisct: "",
						NoMoreGr: "",
						NoRounding: "",
						OrderReason: "",
						OrderprUn: "ST",
						OrigAccept: "",
						PartDeliv: "",
						PartInv: "",
						PeriodIndExpirationDate: "D",

						PoPrice: "",
						PoUnit: "ST",
						PointUnit: "",
						PointUnitIso: "",
						PreVendor: "",
						PreqName: "",
						PreqNo: "",
						PrioUrgency: "00",
						PrntPrice: "X",
						QualInsp: "",
						Quantity: "10",
						RPromo: "",
						ReasonCode: "",
						ReasonRej: "",
						RefDoc: "",
						Reminder1: "0",
						Reminder2: "0",
						Reminder3: "0",
						ReqSegment: "",
						RetItem: "",
						RetentionPercentage: "0.00",
						RevLev: "",
						RfqNo: "",
						ScVendor: "",
						Season: "",
						SeasonYr: "",
						SettItem: "",
						ShipBlocked: "",
						Shipping: "",
						Shiptype: "",

						SiCat: "",
						SpeCrmFkrel: "",
						SrcStockType: "",
						SrmContractId: "",
						SrvBasedIv: "",
						StkSegment: "",
						SuppVendor: "",
						SupplStloc: "",
						TaxCode: "",
						TaxSubjectSt: "",
						Taxjurcode: "",
						TcAutDet: "",
						Trackingno: "",
						UnderDlvTol: "0.0",
						UnlimitedDlv: "",
						ValType: "",
						VendMat: "",
						VendPart: "",
						Vendrbatch: "",
						Volume: "0.000",
						Volumeunit: "",
						VolumeunitIso: "",
						Weightunit: "KG",
						WeightunitIso: "KGM"

					};
		/*	return {

				PoItem: this.PoItem,

				ShortText: this.MAKTX,
				Material: this.Matnr,
				Ematerial: this.Matnr,
				Plant: this.Werks,
				Acctasscat: "",
				AcknReqd: "",
				AcknowlNo: "",
				Agreement: "",
				AllocTbl: "",
				AtRelev: "",
				Batch: "",
				BlockReasonId: "",
				BlockReasonText: "",
				BonGrp1: "",
				BonGrp2: "",
				BonGrp3: "",
				BrasNbm: "",
				BudgetPeriod: "",
				Calctype: "",
				CmmtItem: "",
				CmmtItemLong: "",
				CondGroup: "",
				ConfCtrl: "",
				CrmRefSalesOrderNo: "",
				CrmRefSoItemNo: "",
				CrmSalesOrderNo: "",
				CtrlKey: "",
				Customer: "",
				DateQtyFixed: "",
				DeleteInd: "",
				DelivCompl: "",
				Distrib: "",
				DownpayType: "",

				EmaterialExternal: "",
				EmaterialGuid: "",
				EmaterialVersion: "",
				Ers: "",
				EstPrice: "",
				ExtRfxItem: "",
				ExtRfxNumber: "",
				ExtRfxSystem: "",
				ExternalHierarchyType: "",
				FinalInv: "",
				FiscalIncentive: "",
				FiscalIncentiveId: "",
				FreeItem: "",
				FuncAreaLong: "",
				Fund: "",
				FundLong: "",
				FundsCtr: "",
				FundsRes: "",
				GiBasedGr: "",
				GrBasediv: "X",
				GrInd: "X",
				GrNonVal: "",
				GrPrTime: "0",
				GrantNbr: "",
				Handoverloc: "",
				HlItem: "00000",
				InHouse: "",
				Incoterms1: "",
				Incoterms2: "",
				Indus3: "",
				InfIndex: "",
				InfoRec: "5300010972",
				InfoUpd: "C",
				IrInd: "X",
				ItemCat: "0",
				KanbanInd: "",
				LongItemNumber: "",
				ManualTcReason: "",
				MatOrigin: "",

				MaterialExternal: "",
				MaterialGuid: "",
				MaterialVersion: "",
				MatlUsage: "",
				NetPrice: "850.000000000",
				NoDisct: "",
				NoMoreGr: "",
				NoRounding: "",
				OrderReason: "",
				OrderprUn: "",
				OrigAccept: "",
				PartDeliv: "",
				PartInv: "",
				PeriodIndExpirationDate: "D",

				PoPrice: "",
				PoUnit: "",
				PointUnit: "",
				PointUnitIso: "",
				PreVendor: "",
				PreqName: "",
				PreqNo: "",
				PrioUrgency: "00",
				PrntPrice: "X",
				QualInsp: "",
				Quantity: "34",
				RPromo: "",
				ReasonCode: "",
				ReasonRej: "",
				RefDoc: "",
				Reminder1: "0",
				Reminder2: "0",
				Reminder3: "0",
				ReqSegment: "",
				RetItem: "",
				RetentionPercentage: "0.00",
				RevLev: "",
				RfqNo: "",
				ScVendor: "",
				Season: "",
				SeasonYr: "",
				SettItem: "",
				ShipBlocked: "",
				Shipping: "",
				Shiptype: "",

				SiCat: "",
				SpeCrmFkrel: "",
				SrcStockType: "",
				SrmContractId: "",
				SrvBasedIv: "",
				StkSegment: "",
				SuppVendor: "",
				SupplStloc: "",
				TaxCode: "",
				TaxSubjectSt: "",
				Taxjurcode: "3306120101",
				TcAutDet: "",
				Trackingno: "",
				UnderDlvTol: "0.0",
				UnlimitedDlv: "",
				ValType: "",
				VendMat: "",
				VendPart: "",
				Vendrbatch: "",
				Volume: "0.000",
				Volumeunit: "",
				VolumeunitIso: "",
				Weightunit: "KG",
				WeightunitIso: "KGM"

			};*/
		},

		getRequestRefill: function() {
			return {

				PoItem: "00001",
				DeleteInd: this.DeleteInd,
				ShortText: this.ShortText,
				Material: this.Material,
				MaterialExternal: this.MaterialExternal,
				MaterialGuid: this.MaterialGuid,
				MaterialVersion: this.MaterialVersion,
				Ematerial: this.Material,
				EmaterialExternal: this.EmaterialExternal,
				EmaterialGuid: this.EmaterialGuid,
				EmaterialVersion: this.EmaterialVersion,
				Plant: this.Plant,
				//	StgeLoc: this.StgeLoc,
				Trackingno: this.Trackingno,
				//	MatlGroup: this.MatlGroup,
				InfoRec: "",
				VendMat: this.VendMat,
				Quantity: "10",
				PoUnit: "ST",
				//	PoUnitIso: this.PoUnitIso,
				OrderprUn: "ST",
				//	OrderprUnIso: this.OrderprUnIso,
				//	ConvNum1: this.ConvNum1,
				//	ConvDen1: this.ConvDen1,
				NetPrice: this.NetPrice,
				//		PriceUnit: this.PriceUnit,
				GrPrTime: "0",
				TaxCode: this.TaxCode,
				BonGrp1: this.BonGrp1,
				QualInsp: this.QualInsp,
				InfoUpd: this.InfoUpd,
				//	PrntPrice: "X",
				PrntPrice: this.PrntPrice,
				EstPrice: this.EstPrice,
				Reminder1: "0",
				Reminder2: "0",
				Reminder3: "0",
				//	OverDlvTol: this.OverDlvTol,
				UnlimitedDlv: this.UnlimitedDlv,
				UnderDlvTol: "0.0",
				ValType: this.ValType,
				NoMoreGr: this.NoMoreGr,
				FinalInv: this.FinalInv,
				ItemCat: "0",
				Acctasscat: this.Acctasscat,
				Distrib: this.Distrib,
				PartInv: this.PartInv,
				GrInd: "X",

				GrNonVal: this.GrNonVal,
				IrInd: "X",

				FreeItem: this.FreeItem,
				GrBasediv: this.GrBasediv,
				AcknReqd: this.AcknReqd,
				AcknowlNo: this.AcknowlNo,
				Agreement: this.Agreement,
				//	AgmtItem: this.AgmtItem,
				Shipping: this.Shipping,
				Customer: this.Customer,
				CondGroup: this.CondGroup,
				NoDisct: this.NoDisct,
				//	PlanDel: this.PlanDel,
				///	NetWeight: this.NetWeight,
				Weightunit: "KG",
				WeightunitIso: "KGM",
				Taxjurcode: this.Taxjurcode,
				CtrlKey: this.CtrlKey,
				ConfCtrl: this.ConfCtrl,
				RevLev: this.RevLev,
				Fund: this.Fund,
				FundsCtr: this.FundsCtr,
				CmmtItem: this.CmmtItem,
				//	Pricedate: this.Pricedate,
				//PriceDate: this.PriceDate,
				//0	GrossWt: this.GrossWt,
				Volume: "0.000",
				Volumeunit: this.Volumeunit,
				VolumeunitIso: this.VolumeunitIso,
				Incoterms1: this.Incoterms1,
				Incoterms2: this.Incoterms2,
				PreVendor: this.PreVendor,
				VendPart: this.VendPart,
				HlItem: this.HlItem,
				//	GrToDate: this.GrToDate,
				SuppVendor: this.SuppVendor,
				//	Vendor: this.Vendor,
				ScVendor: this.ScVendor,
				KanbanInd: this.KanbanInd,
				Ers: this.Ers,
				RPromo: this.RPromo,
				//	Points: this.Points,
				PointUnit: this.PointUnit,
				PointUnitIso: this.PointUnitIso,
				Season: this.Season,
				SeasonYr: this.SeasonYr,
				BonGrp2: this.BonGrp2,
				BonGrp3: this.BonGrp3,
				SettItem: this.SettItem,
				RfqNo: this.RfqNo,
				//	RfqItem: this.RfqItem,
				PreqNo: this.PreqNo,
				//	PreqItem: this.PreqItem,
				RefDoc: this.RefDoc,
				//	RefItem: this.RefItem,
				SiCat: this.SiCat,
				RetItem: this.RetItem,
				AtRelev: this.AtRelev,
				OrderReason: this.OrderReason,
				BrasNbm: this.BrasNbm,
				MatlUsage: this.MatlUsage,
				MatOrigin: this.MatOrigin,
				InHouse: this.InHouse,
				Indus3: this.Indus3,
				InfIndex: this.InfIndex,
				//		UntilDate: this.UntilDate,
				DelivCompl: this.DelivCompl,
				PartDeliv: this.PartDeliv,
				ShipBlocked: this.ShipBlocked,
				PreqName: this.PreqName,
				PeriodIndExpirationDate: "D",
				//	IntObjNo: this.IntObjNo,
				//	PckgNo: this.PckgNo,
				Batch: this.Batch,
				Vendrbatch: this.Vendrbatch,
				Calctype: this.Calctype,
				GrantNbr: this.GrantNbr,
				CmmtItemLong: this.CmmtItemLong,
				FuncAreaLong: this.FuncAreaLong,
				NoRounding: this.NoRounding,
				PoPrice: this.PoPrice,
				SupplStloc: this.SupplStloc,
				SrvBasedIv: this.SrvBasedIv,
				FundsRes: this.FundsRes,
				//	ResItem: this.ResItem,
				OrigAccept: this.OrigAccept,
				AllocTbl: this.AllocTbl,
				//	AllocTblItem: this.AllocTblItem,
				SrcStockType: this.SrcStockType,
				ReasonRej: this.ReasonRej,
				CrmSalesOrderNo: this.CrmSalesOrderNo,
				//0	CrmSalesOrderItemNo: this.CrmSalesOrderItemNo,
				CrmRefSalesOrderNo: this.CrmRefSalesOrderNo,
				CrmRefSoItemNo: this.CrmRefSoItemNo,
				PrioUrgency: this.PrioUrgency,
				//		PrioRequirement: this.PrioRequirement,
				ReasonCode: this.ReasonCode,
				FundLong: this.FundLong,
				LongItemNumber: this.LongItemNumber,
				//0	ExternalSortNumber: this.ExternalSortNumber,
				ExternalHierarchyType: this.ExternalHierarchyType,
				RetentionPercentage: "0.00",
				DownpayType: this.DownpayType,
				//	0	DownpayAmount: this.DownpayAmount,
				//0	DownpayPercent: this.DownpayPercent,
				//	DownpayDuedate: this.DownpayDuedate,
				ExtRfxNumber: this.ExtRfxNumber,
				ExtRfxItem: this.ExtRfxItem,
				ExtRfxSystem: this.ExtRfxSystem,
				SrmContractId: this.SrmContractId,
				//		SrmContractItm: this.SrmContractItm,
				BudgetPeriod: this.BudgetPeriod,
				BlockReasonId: this.BlockReasonId,
				BlockReasonText: this.BlockReasonText,
				SpeCrmFkrel: this.SpeCrmFkrel,
				DateQtyFixed: this.DateQtyFixed,
				GiBasedGr: this.GiBasedGr,
				Shiptype: this.Shiptype,
				Handoverloc: this.Handoverloc,
				TcAutDet: this.TcAutDet,
				ManualTcReason: this.ManualTcReason,
				FiscalIncentive: this.FiscalIncentive,
				FiscalIncentiveId: this.FiscalIncentiveId,
				TaxSubjectSt: this.TaxSubjectSt,
				ReqSegment: this.ReqSegment,
				StkSegment: this.StkSegment

			};
		},
	
		getStockPOItem : function(){
	return {
					PoItem: " ",
					DeleteInd: "",
					ShortText: 	this.ShortText,
					Material: this.Material,
					Ematerial:this.Material,
					Plant: this.Plant, //imp / necessary for STO (receiving plant)
					StgeLoc: this.StgeLoc,
					Quantity: this.Quantity,
					ItemCat: "U"
				};
} ,
getTransferPostingItem : function(){
	return {
	  Material : this.Matnr,
      Plant : "",
      StgeLoc : "",
      MoveType : "", 
      EntryQnt : this.Quantity,
      PoNumber : "",
      PoItem : ""
	};
},
		getInstance: function() {
			if (!instance) {
				// create new instance of ODataUtility Object
				instance = new RebateConditionItemPO();
			}
			return instance;
		}

	});
	return RebateConditionItemPO;
});