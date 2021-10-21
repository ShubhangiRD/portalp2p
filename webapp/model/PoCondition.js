sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel"
], function(Object, JSONModel) {
	"use strict";
	return Object.extend("com.vSimpleApp.model.PoCondition", {
		constructor: function(oData) {
			this.setData(oData);

		},
		setData: function(oData) {

			this.ConditionNo = (oData && oData.ConditionNo) ? oData.ConditionNo : "";
			this.ItmNumber = (oData && oData.ItmNumber) ? oData.ItmNumber : "";
			this.CondStNo = (oData && oData.CondStNo) ? oData.CondStNo : "";
			this.CondCount = (oData && oData.CondCount) ? oData.CondCount : "";
			this.CondType = (oData && oData.CondType) ? oData.CondType : "";
			this.CondValue = (oData && oData.CondValue) ? oData.CondValue : "";
			this.Currency = (oData && oData.Currency) ? oData.Currency : "";
			this.CurrencyIso = (oData && oData.CurrencyIso) ? oData.CurrencyIso : "";
			this.CondUnit = (oData && oData.CondUnit) ? oData.CondUnit : "";
			this.CondUnitIso = (oData && oData.CondUnitIso) ? oData.CondUnitIso : "";
			this.CondPUnt = (oData && oData.CondPUnt) ? oData.CondPUnt : "";
			this.Applicatio = (oData && oData.Applicatio) ? oData.Applicatio : "";
			this.Conpricdat = (oData && oData.Conpricdat) ? oData.Conpricdat : "";
			this.Calctypcon = (oData && oData.Calctypcon) ? oData.Calctypcon : "";
			this.Conbaseval = (oData && oData.Conbaseval) ? oData.Conbaseval : "";
			this.Numconvert = (oData && oData.Numconvert) ? oData.Numconvert : "";
			this.Denominato = (oData && oData.Denominato) ? oData.Denominato : "";
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
			this.Condcntrl = (oData && oData.Condcntrl) ? oData.Condcntrl : "";
			this.Condisacti = (oData && oData.Condisacti) ? oData.Condisacti : "";
			this.Condclass = (oData && oData.Condclass) ? oData.Condclass : "";
			this.Factbasval = (oData && oData.Factbasval) ? oData.Factbasval : "";
			this.Scalebasin = (oData && oData.Scalebasin) ? oData.Scalebasin : "";
			this.Scalbasval = (oData && oData.Scalbasval) ? oData.Scalbasval : "";
			this.Unitmeasur = (oData && oData.Unitmeasur) ? oData.Unitmeasur : "";
			this.UnitmeasurIso = (oData && oData.UnitmeasurIso) ? oData.UnitmeasurIso : "";
			this.Currenckey = (oData && oData.Currenckey) ? oData.Currenckey : "";
			this.CurrenckeyIso = (oData && oData.CurrenckeyIso) ? oData.CurrenckeyIso : "";
			this.Condincomp = (oData && oData.Condincomp) ? oData.Condincomp : "";
			this.Condconfig = (oData && oData.Condconfig) ? oData.Condconfig : "";
			this.Condchaman = (oData && oData.Condchaman) ? oData.Condchaman : "";
			this.CondNo = (oData && oData.CondNo) ? oData.CondNo : "";
			this.ChangeId = (oData && oData.ChangeId) ? oData.ChangeId : "";
			this.VendorNo = (oData && oData.VendorNo) ? oData.VendorNo : "";

		},
		getRequestPayloadPoCond: function() {
			return {

				ConditionNo: this.ConditionNo,
				ItmNumber: this.ItmNumber,
				CondStNo: this.CondStNo,
				CondCount: this.CondCount,
				CondType: this.CondType,
				CondValue: this.CondValue,
				Currency: this.Currency,
				CurrencyIso: this.CurrencyIso,
				CondUnit: this.CondUnit,
				CondUnitIso: this.CondUnitIso,
				CondPUnt: this.CondPUnt,
				Applicatio: this.Applicatio,
				Conpricdat: this.Conpricdat,
				Calctypcon: this.Calctypcon,
				Conbaseval: this.Conbaseval,
				Numconvert: this.Numconvert,
				Denominato: this.Denominato,
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
				Condcntrl: this.Condcntrl,
				Condisacti: this.Condisacti,
				Condclass: this.Condclass,
				Factbasval: this.Factbasval,
				Scalebasin: this.Scalebasin,
				Scalbasval: this.Scalbasval,
				Unitmeasur: this.Unitmeasur,
				UnitmeasurIso: this.UnitmeasurIso,
				Currenckey: this.Currenckey,
				CurrenckeyIso: this.CurrenckeyIso,
				Condincomp: this.Condincomp,
				Condconfig: this.Condconfig,
				Condchaman: this.Condchaman,
				CondNo: this.CondNo,
				ChangeId: this.ChangeId,
				VendorNo: this.VendorNo

			};
		}

	});

});