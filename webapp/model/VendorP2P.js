sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel"
], function(Object, JSONModel) {
	"use strict";
	return Object.extend("com.vSimpleApp.model.VendorData", {
		constructor: function(oData) {
			this.setData(oData);

		},
		setData: function(oData) {

			this.Abuebc = (oData && oData.Abuebc) ? oData.Abuebc : "";
			this.Actssa = (oData && oData.Actssa) ? oData.Actssa : "";
			this.Adrnra = (oData && oData.Adrnra) ? oData.Adrnra : "";
			this.Agrelc = (oData && oData.Agrelc) ? oData.Agrelc : "";
			this.Akontb = (oData && oData.Akontb) ? oData.Akontb : "";
			this.Altknb = (oData && oData.Altknb) ? oData.Altknb : "";
			this.Anreda = (oData && oData.Anreda) ? oData.Anreda : "";
			this.Avsndb = (oData && oData.Avsndb) ? oData.Avsndb : "";
			this.Bahnsa = (oData && oData.Bahnsa) ? oData.Bahnsa : "";

			this.Bbbnra = (oData && oData.Bbbnra) ? oData.Bbbnra : "";
			this.Bbsnra = (oData && oData.Bbsnra) ? oData.Bbsnra : "";
			this.Begrua = (oData && oData.Begrua) ? oData.Begrua : "";
			this.Begrub = (oData && oData.Begrub) ? oData.Begrub : "";
			this.Bkontd = (oData && oData.Bkontd) ? oData.Bkontd : "";
			this.Bkrefd = (oData && oData.Bkrefd) ? oData.Bkrefd : "";
			this.Blindc = (oData && oData.Blindc) ? oData.Blindc : "";
			this.Blnkzb = (oData && oData.Blnkzb) ? oData.Blnkzb : "";
			this.Boindc = (oData && oData.Boindc) ? oData.Boindc : "";
			this.Bolrec = (oData && oData.Bolrec) ? oData.Bolrec : "";
			this.Bopnrc = (oData && oData.Bopnrc) ? oData.Bopnrc : "";
			this.Brscha = (oData && oData.Brscha) ? oData.Brscha : "";
			this.Bstaec = (oData && oData.Bstaec) ? oData.Bstaec : "";
			this.Bubkza = (oData && oData.Bubkza) ? oData.Bubkza : "";
			this.Bukrsb = (oData && oData.Bukrsb) ? oData.Bukrsb : "";
			this.Busabb = (oData && oData.Busabb) ? oData.Busabb : "";
			this.Bvtypd = (oData && oData.Bvtypd) ? oData.Bvtypd : "";

			this.Cerdtb = (oData && oData.Cerdtb) ? oData.Cerdtb : "";
			this.Confsa = (oData && oData.Confsa) ? oData.Confsa : "";
			this.Confsb = (oData && oData.Confsb) ? oData.Confsb : "";
			this.Datlta = (oData && oData.Datlta) ? oData.Datlta : "";
			this.Datlzb = (oData && oData.Datlzb) ? oData.Datlzb : "";
			this.Dlgrpa = (oData && oData.Dlgrpa) ? oData.Dlgrpa : "";
			this.Dtamsa = (oData && oData.Dtamsa) ? oData.Dtamsa : "";
			this.Dtawsa = (oData && oData.Dtawsa) ? oData.Dtawsa : "";
			this.Duefla = (oData && oData.Duefla) ? oData.Duefla : "";

			this.Eiktob = (oData && oData.Eiktob) ? oData.Eiktob : "";
			this.Eiktoc = (oData && oData.Eiktoc) ? oData.Eiktoc : "";
			this.Ekgrpc = (oData && oData.Ekgrpc) ? oData.Ekgrpc : "";
			this.Ekorgc = (oData && oData.Ekorgc) ? oData.Ekorgc : "";
			this.Emnfra = (oData && oData.Emnfra) ? oData.Emnfra : "";
			this.Erdata = (oData && oData.Erdata) ? oData.Erdata : "";
			this.Erdatb = (oData && oData.Erdatb) ? oData.Erdatb : "";
			this.Erdatc = (oData && oData.Erdatc) ? oData.Erdatc : "";
			this.Ernama = (oData && oData.Ernama) ? oData.Ernama : "";
			this.Ernamb = (oData && oData.Ernamb) ? oData.Ernamb : "";
			this.Ernamc = (oData && oData.Ernamc) ? oData.Ernamc : "";
			this.Esrnra = (oData && oData.Esrnra) ? oData.Esrnra : "";
			this.Expvzc = (oData && oData.Expvzc) ? oData.Expvzc : "";

			this.Fdgrvb = (oData && oData.Fdgrvb) ? oData.Fdgrvb : "";
			this.Fiskna = (oData && oData.Fiskna) ? oData.Fiskna : "";
			this.Fiskua = (oData && oData.Fiskua) ? oData.Fiskua : "";
			this.Fitypa = (oData && oData.Fitypa) ? oData.Fitypa : "";
			this.Frgrpb = (oData && oData.Frgrpb) ? oData.Frgrpb : "";

			this.Gbdata = (oData && oData.Gbdata) ? oData.Gbdata : "";
			this.Gborta = (oData && oData.Gborta) ? oData.Gborta : "";
			this.Gricdb = (oData && oData.Gricdb) ? oData.Gricdb : "";
			this.Gridtb = (oData && oData.Gridtb) ? oData.Gridtb : "";
			this.Guzteb = (oData && oData.Guzteb) ? oData.Guzteb : "";
			this.Hbkidb = (oData && oData.Hbkidb) ? oData.Hbkidb : "";

			this.Inco1c = (oData && oData.Inco1c) ? oData.Inco1c : "";
			this.Inco2c = (oData && oData.Inco2c) ? oData.Inco2c : "";
			this.Intadb = (oData && oData.Intadb) ? oData.Intadb : "";
			this.Ipispa = (oData && oData.Ipispa) ? oData.Ipispa : "";
			this.Kalskc = (oData && oData.Kalskc) ? oData.Kalskc : "";
			this.Koinhd = (oData && oData.Koinhd) ? oData.Koinhd : "";
			this.Konzsa = (oData && oData.Konzsa) ? oData.Konzsa : "";
			this.Krausa = (oData && oData.Krausa) ? oData.Krausa : "";
			this.Ktocka = (oData && oData.Ktocka) ? oData.Ktocka : "";
			this.Ktokka = (oData && oData.Ktokka) ? oData.Ktokka : "";
			this.Kultgb = (oData && oData.Kultgb) ? oData.Kultgb : "";
			this.Kunnra = (oData && oData.Kunnra) ? oData.Kunnra : "";
			this.Kvermb = (oData && oData.Kvermb) ? oData.Kvermb : "";
			this.Kzabsc = (oData && oData.Kzabsc) ? oData.Kzabsc : "";
			this.Kzautc = (oData && oData.Kzautc) ? oData.Kzautc : "";
			this.Kzretc = (oData && oData.Kzretc) ? oData.Kzretc : "";
			this.Land1a = (oData && oData.Land1a) ? oData.Land1a : "";

			this.Lebrec = (oData && oData.Lebrec) ? oData.Lebrec : "";
			this.Lfabcc = (oData && oData.Lfabcc) ? oData.Lfabcc : "";
			this.Lfrhyc = (oData && oData.Lfrhyc) ? oData.Lfrhyc : "";
			this.Lfurla = (oData && oData.Lfurla) ? oData.Lfurla : "";
			this.Libesc = (oData && oData.Libesc) ? oData.Libesc : "";
			this.Lifnra = (oData && oData.Lifnra) ? oData.Lifnra : "";
			this.Liprec = (oData && oData.Liprec) ? oData.Liprec : "";
			this.Liserc = (oData && oData.Liserc) ? oData.Liserc : "";
			this.Lnrzaa = (oData && oData.Lnrzaa) ? oData.Lnrzaa : "";
			this.Lnrzbb = (oData && oData.Lnrzbb) ? oData.Lnrzbb : "";
			this.Lnrzeb = (oData && oData.Lnrzeb) ? oData.Lnrzeb : "";
			this.Loevma = (oData && oData.Loevma) ? oData.Loevma : "";
			this.Loevmb = (oData && oData.Loevmb) ? oData.Loevmb : "";
			this.Loevmc = (oData && oData.Loevmc) ? oData.Loevmc : "";
			this.Ltsnaa = (oData && oData.Ltsnaa) ? oData.Ltsnaa : "";
			this.Lzonea = (oData && oData.Lzonea) ? oData.Lzonea : "";

			this.Mcod1a = (oData && oData.Mcod1a) ? oData.Mcod1a : "";
			this.Mcod2a = (oData && oData.Mcod2a) ? oData.Mcod2a : "";
			this.Megruc = (oData && oData.Megruc) ? oData.Megruc : "";
			this.Meprfc = (oData && oData.Meprfc) ? oData.Meprfc : "";
			this.Mgrupb = (oData && oData.Mgrupb) ? oData.Mgrupb : "";
			this.Minbwc = (oData && oData.Minbwc) ? oData.Minbwc : "";
			this.Mindkb = (oData && oData.Mindkb) ? oData.Mindkb : "";
			this.Mrpppc = (oData && oData.Mrpppc) ? oData.Mrpppc : "";
			this.Name1a = (oData && oData.Name1a) ? oData.Name1a : "";
			this.Name2a = (oData && oData.Name2a) ? oData.Name2a : "";
			this.Name3a = (oData && oData.Name3a) ? oData.Name3a : "";
			this.Name4a = (oData && oData.Name4a) ? oData.Name4a : "";
			this.Nodela = (oData && oData.Nodela) ? oData.Nodela : "";
			this.Nodelb = (oData && oData.Nodelb) ? oData.Nodelb : "";
			this.Nrgewc = (oData && oData.Nrgewc) ? oData.Nrgewc : "";

			this.Ort01a = (oData && oData.Ort01a) ? oData.Ort01a : "";
			this.Ort02a = (oData && oData.Ort02a) ? oData.Ort02a : "";
			this.Paprfc = (oData && oData.Paprfc) ? oData.Paprfc : "";
			this.Pernrb = (oData && oData.Pernrb) ? oData.Pernrb : "";
			this.Pfacha = (oData && oData.Pfacha) ? oData.Pfacha : "";
			this.Pforta = (oData && oData.Pforta) ? oData.Pforta : "";
			this.Plifzc = (oData && oData.Plifzc) ? oData.Plifzc : "";
			this.Plkala = (oData && oData.Plkala) ? oData.Plkala : "";
			this.Prfrec = (oData && oData.Prfrec) ? oData.Prfrec : "";
			this.Profsa = (oData && oData.Profsa) ? oData.Profsa : "";
			this.Pstl2a = (oData && oData.Pstl2a) ? oData.Pstl2a : "";
			this.Pstlza = (oData && oData.Pstlza) ? oData.Pstlza : "";
			this.Qlandb = (oData && oData.Qlandb) ? oData.Qlandb : "";
			this.Qsbgrb = (oData && oData.Qsbgrb) ? oData.Qsbgrb : "";
			this.Qsrecb = (oData && oData.Qsrecb) ? oData.Qsrecb : "";
			this.Qsskzb = (oData && oData.Qsskzb) ? oData.Qsskzb : "";
			this.Qssysa = (oData && oData.Qssysa) ? oData.Qssysa : "";
			this.Qszdtb = (oData && oData.Qszdtb) ? oData.Qszdtb : "";
			this.Qsznrb = (oData && oData.Qsznrb) ? oData.Qsznrb : "";

			this.Rdprfc = (oData && oData.Rdprfc) ? oData.Rdprfc : "";
			this.Regioa = (oData && oData.Regioa) ? oData.Regioa : "";
			this.Regssa = (oData && oData.Regssa) ? oData.Regssa : "";
			this.Reprfb = (oData && oData.Reprfb) ? oData.Reprfb : "";
			this.Revdba = (oData && oData.Revdba) ? oData.Revdba : "";
			this.Scacda = (oData && oData.Scacda) ? oData.Scacda : "";
			this.Sexkza = (oData && oData.Sexkza) ? oData.Sexkza : "";
			this.Sfrgra = (oData && oData.Sfrgra) ? oData.Sfrgra : "";
			this.Skritc = (oData && oData.Skritc) ? oData.Skritc : "";
			//-------------------
			this.Sortla = (oData && oData.Sortla) ? oData.Sortla : "";
			this.Sperma = (oData && oData.Sperma) ? oData.Sperma : "";
			this.Spermc = (oData && oData.Spermc) ? oData.Spermc : "";
			this.Sperqa = (oData && oData.Sperqa) ? oData.Sperqa : "";
			this.Sperra = (oData && oData.Sperra) ? oData.Sperra : "";
			this.Sperrb = (oData && oData.Sperrb) ? oData.Sperrb : "";
			this.Sperza = (oData && oData.Sperza) ? oData.Sperza : "";
			this.Sprasa = (oData && oData.Sprasa) ? oData.Sprasa : "";
			this.Stcd1a = (oData && oData.Stcd1a) ? oData.Stcd1a : "";
			this.Stcd2a = (oData && oData.Stcd2a) ? oData.Stcd2a : "";
			this.Stcd3a = (oData && oData.Stcd3a) ? oData.Stcd3a : "";
			this.Stcd4a = (oData && oData.Stcd4a) ? oData.Stcd4a : "";

			this.Stcd5a = (oData && oData.Stcd5a) ? oData.Stcd5a : "";
			this.Stcdta = (oData && oData.Stcdta) ? oData.Stcdta : "";
			this.Stcega = (oData && oData.Stcega) ? oData.Stcega : "";
			this.Stenra = (oData && oData.Stenra) ? oData.Stenra : "";
			this.Stgdla = (oData && oData.Stgdla) ? oData.Stgdla : "";
			this.Stkzaa = (oData && oData.Stkzaa) ? oData.Stkzaa : "";
			this.Stkzna = (oData && oData.Stkzna) ? oData.Stkzna : "";
			this.Stkzua = (oData && oData.Stkzua) ? oData.Stkzua : "";
			this.Strasa = (oData && oData.Strasa) ? oData.Strasa : "";

			this.Taxbsa = (oData && oData.Taxbsa) ? oData.Taxbsa : "";
			this.Telbxa = (oData && oData.Telbxa) ? oData.Telbxa : "";
			this.Telf1a = (oData && oData.Telf1a) ? oData.Telf1a : "";
			this.Telf1c = (oData && oData.Telf1c) ? oData.Telf1c : "";
			this.Telf2a = (oData && oData.Telf2a) ? oData.Telf2a : "";
			this.Telfxa = (oData && oData.Telfxa) ? oData.Telfxa : "";
			this.Teltxa = (oData && oData.Teltxa) ? oData.Teltxa : "";
			this.Telx1a = (oData && oData.Telx1a) ? oData.Telx1a : "";
			this.Tlfnsb = (oData && oData.Tlfnsb) ? oData.Tlfnsb : "";
			this.Tlfxsb = (oData && oData.Tlfxsb) ? oData.Tlfxsb : "";
			this.Togrrb = (oData && oData.Togrrb) ? oData.Togrrb : "";
			this.Togrub = (oData && oData.Togrub) ? oData.Togrub : "";
			this.Txjcda = (oData && oData.Txjcda) ? oData.Txjcda : "";

			this.Umsaec = (oData && oData.Umsaec) ? oData.Umsaec : "";
			this.Updata = (oData && oData.Updata) ? oData.Updata : "";
			this.Updatb = (oData && oData.Updatb) ? oData.Updatb : "";
			this.Uptima = (oData && oData.Uptima) ? oData.Uptima : "";
			this.Uptimb = (oData && oData.Uptimb) ? oData.Uptimb : "";
			this.Uzaweb = (oData && oData.Uzaweb) ? oData.Uzaweb : "";
			this.Vbunda = (oData && oData.Vbunda) ? oData.Vbunda : "";
			this.Venslc = (oData && oData.Venslc) ? oData.Venslc : "";
			this.Verkfc = (oData && oData.Verkfc) ? oData.Verkfc : "";
			this.Vsbedc = (oData && oData.Vsbedc) ? oData.Vsbedc : "";
			this.Vzskzb = (oData && oData.Vzskzb) ? oData.Vzskzb : "";

			this.Waersc = (oData && oData.Waersc) ? oData.Waersc : "";
			this.Webrec = (oData && oData.Webrec) ? oData.Webrec : "";
			this.Webtrb = (oData && oData.Webtrb) ? oData.Webtrb : "";
			this.Werkra = (oData && oData.Werkra) ? oData.Werkra : "";
			this.Werksa = (oData && oData.Werksa) ? oData.Werksa : "";
			this.Xauszb = (oData && oData.Xauszb) ? oData.Xauszb : "";
			this.Xcpdka = (oData && oData.Xcpdka) ? oData.Xcpdka : "";
			this.Xdezvb = (oData && oData.Xdezvb) ? oData.Xdezvb : "";
			this.Xedipb = (oData && oData.Xedipb) ? oData.Xedipb : "";
			this.Xersrc = (oData && oData.Xersrc) ? oData.Xersrc : "";
			this.Xersyc = (oData && oData.Xersyc) ? oData.Xersyc : "";
			this.Xezerd = (oData && oData.Xezerd) ? oData.Xezerd : "";
			this.Xlfzaa = (oData && oData.Xlfzaa) ? oData.Xlfzaa : "";
			this.Xlfzbb = (oData && oData.Xlfzbb) ? oData.Xlfzbb : "";
			this.Xnbwyc = (oData && oData.Xnbwyc) ? oData.Xnbwyc : "";
			this.Xporeb = (oData && oData.Xporeb) ? oData.Xporeb : "";

			this.Xverrb = (oData && oData.Xverrb) ? oData.Xverrb : "";
			this.Xzempa = (oData && oData.Xzempa) ? oData.Xzempa : "";

			this.Zahlsb = (oData && oData.Zahlsb) ? oData.Zahlsb : "";
			this.Zbokdb = (oData && oData.Zbokdb) ? oData.Zbokdb : "";
			this.Zgrupb = (oData && oData.Zgrupb) ? oData.Zgrupb : "";
			this.Zindtb = (oData && oData.Zindtb) ? oData.Zindtb : "";
			this.Zinrtb = (oData && oData.Zinrtb) ? oData.Zinrtb : "";
			this.Zollac = (oData && oData.Zollac) ? oData.Zollac : "";
			this.Zsabeb = (oData && oData.Zsabeb) ? oData.Zsabeb : "";
			this.Ztermb = (oData && oData.Ztermb) ? oData.Ztermb : "";
			this.Ztermc = (oData && oData.Ztermc) ? oData.Ztermc : "";
			this.Zuawab = (oData && oData.Zuawab) ? oData.Zuawab : "";
			this.Zwelsb = (oData && oData.Zwelsb) ? oData.Zwelsb : "";

			this.Bankld = (oData && oData.Bankld) ? oData.Bankld : "";
			this.Banknd = (oData && oData.Banknd) ? oData.Banknd : "";
			this.Banksd = (oData && oData.Banksd) ? oData.Banksd : "";

			this.Details = (oData && oData.Details) ? oData.Details : [];

			//	this.PoScheduleSet = (oData && oData.PoScheduleSet) ? oData.PoScheduleSet : [];

			//	this.oBankDataModel = new JSONModel();
			//	this.oBankDataModel.setData(this);

		},
	getCreateRequestPayload: function() {
		
			var Details = [];
			this.Details.forEach(function(item) {
				Details.push(item.getBankdetails());

			});
			var detailength =  Details.length;
			if(detailength === 0){
			/*		this.Bankld = Details[0].Bankld;
			this. Banknd = Details[0].Banknd;
			this. Banksd = Details[0].Banksd;
			this. Bkontd = Details[0].Bkontd;
			this. Bkrefd =Details[0].Bkrefd;
			this. Bvtypd =Details[0].Bvtypd;
			this. Koinhd = Details[0].Koinhd;*/
				return {
				Akontb: this.Akontb,
				Anreda: this.Anreda,
				Bankld: this.Bankld,
				Banknd: this.Banknd,
				Banksd: this.Banksd,
				Bkontd: this.Bkontd,
				Bkrefd: this.Bkrefd,
				Brscha: this.Brscha,
				Bukrsb: this.Bukrsb,
				Bvtypd: this.Bvtypd,
				Ekgrpc: this.Ekgrpc,
				Ekorgc: this.Ekorgc,
				Emnfra: this.Emnfra,
				Fdgrvb: this.Fdgrvb,
				Fitypa: this.Fitypa,
				Frgrpb: this.Frgrpb,
				Intadb: this.Intadb,
				Koinhd:this.Koinhd,
				Ktokka: this.Ktokka,
				Land1a: this.Land1a,
				Lifnra: this.Lifnra,
				Lzonea: this.Lzonea,
				Meprfc: this.Meprfc,
				Name1a: this.Name1a,
				Name2a: this.Name2a,
				Name3a: this.Name3a,
				Name4a: this.Name4a,
				Ort01a: this.Ort01a,
				Ort02a: this.Ort02a,
				Pfacha: this.Pfacha,
				Pforta: this.Pforta,
				Pstl2a: this.Pstl2a,
				Pstlza: this.Pstlza,
				Qssysa: this.Qssysa,
				Regioa: this.Regioa,
				Scacda: this.Scacda,
				Sortla: this.Sortla,
				Sprasa: this.Sprasa,
				Stcd3a: this.Stcd3a,
				Stcd4a: this.Stcd4a,
				Stcdta: this.Stcdta,
				Stenra: this.Stenra,
				Strasa: this.Strasa,
				Telbxa: this.Telbxa,
				Telf1a: this.Telf1a,
				Telf2a: this.Telf2a,
				Teltxa: this.Teltxa,
				Telx1a: this.Telx1a,
				Tlfnsb: this.Tlfnsb,
				Tlfxsb: this.Tlfxsb,
				Txjcda: this.Txjcda,
				Waersc: this.Waersc,
				Ztermb: this.Ztermb,
				Zwelsb: this.Zwelsb

			};

			}else{
			
			var Bankld = Details[0].Bankld;
			var Banknd = Details[0].Banknd;
			var Banksd = Details[0].Banksd;
			var Bkontd = Details[0].Bkontd;
			var Bkrefd =Details[0].Bkrefd;
			var Bvtypd =Details[0].Bvtypd;
			var Koinhd = Details[0].Koinhd;
			var Name3a = Details[0].Name3a;
				var Name4a = Details[0].Name4a;
		
				return {
				Akontb: this.Akontb,
				Anreda: this.Anreda,
				Bankld: Bankld,
				Banknd: Banknd,
				Banksd: Banksd,
				Bkontd: Bkontd,
				Bkrefd: Bkrefd,
				Brscha: this.Brscha,
				Bukrsb: this.Bukrsb,
				Bvtypd: Bvtypd,
				Ekgrpc: this.Ekgrpc,
				Ekorgc: this.Ekorgc,
				Emnfra: this.Emnfra,
				Fdgrvb: this.Fdgrvb,
				Fitypa: this.Fitypa,
				Frgrpb: this.Frgrpb,
				Intadb: this.Intadb,
				Koinhd:Koinhd,
				Ktokka: this.Ktokka,
				Land1a: this.Land1a,
				Lifnra: this.Lifnra,
				Lzonea: this.Lzonea,
				Meprfc: this.Meprfc,
				Name1a: this.Name1a,
				Name2a: this.Name2a,
				Name3a: Name3a,
				Name4a: Name4a,
				Ort01a: this.Ort01a,
				Ort02a: this.Ort02a,
				Pfacha: this.Pfacha,
				Pforta: this.Pforta,
				Pstl2a: this.Pstl2a,
				Pstlza: this.Pstlza,
				Qssysa: this.Qssysa,
				Regioa: this.Regioa,
				Scacda: this.Scacda,
				Sortla: this.Sortla,
				Sprasa: this.Sprasa,
				Stcd3a: this.Stcd3a,
				Stcd4a: this.Stcd4a,
				Stcdta: this.Stcdta,
				Stenra: this.Stenra,
				Strasa: this.Strasa,
				Telbxa: this.Telbxa,
				Telf1a: this.Telf1a,
				Telf2a: this.Telf2a,
				Teltxa: this.Teltxa,
				Telx1a: this.Telx1a,
				Tlfnsb: this.Tlfnsb,
				Tlfxsb: this.Tlfxsb,
				Txjcda: this.Txjcda,
				Waersc: this.Waersc,
				Ztermb: this.Ztermb,
				Zwelsb: this.Zwelsb

			};
			}
	
	
		/*	var detailsdata = this.Details;
				var Bankld = detailsdata.TempData.Bankld;
			var Banknd = detailsdata.TempData.Banknd;
			var Banksd = detailsdata.TempData.Banksd;
			var Bkontd = detailsdata.TempData.Bkontd;
			var Bkrefd = detailsdata.TempData.Bkrefd;
			var Bvtypd = detailsdata.TempData.Bvtypd;
			var Koinhd = detailsdata.TempData.Koinhd;


			console.log(detailsdata);
*/
		
		},
		getUpdateRequestPayload: function(is) {
			var Details = [];

			var detailsdata = this.Details;
			/*	var Bankld = detailsdata.TempData.Bankld;
			var Banknd = detailsdata.TempData.Banknd;
			var Banksd = detailsdata.TempData.Banksd;
			var Bkontd = detailsdata.TempData.Bkontd;
			var Bkrefd = detailsdata.TempData.Bkrefd;
			var Bvtypd = detailsdata.TempData.Bvtypd;
			var Koinhd = detailsdata.TempData.Koinhd;
*/

			console.log(detailsdata);

			return {
				Akontb: this.Akontb,
				Anreda: this.Anreda,
				Bankld: this.Bankld,
				Banknd: this.Banknd,
				Banksd: this.Banksd,
				Bkontd: this.Bkontd,
				Bkrefd: this.Bkrefd,
				Brscha: this.Brscha,
				Bukrsb: this.Bukrsb,
				Bvtypd: this.Bvtypd,
				Ekgrpc: this.Ekgrpc,
				Ekorgc: this.Ekorgc,
				Emnfra: this.Emnfra,
				Fdgrvb: this.Fdgrvb,
				Fitypa: this.Fitypa,
				Frgrpb: this.Frgrpb,
				Intadb: this.Intadb,
				Koinhd: this.Koinhd,
				Ktokka: this.Ktokka,
				Land1a: this.Land1a,
				Lifnra: this.Lifnra,
				Lzonea: this.Lzonea,
				Meprfc: this.Meprfc,
				Name1a: this.Name1a,
				Name2a: this.Name2a,
				Name3a: this.Name3a,
				Name4a: this.Name4a,
				Ort01a: this.Ort01a,
				Ort02a: this.Ort02a,
				Pfacha: this.Pfacha,
				Pforta: this.Pforta,
				Pstl2a: this.Pstl2a,
				Pstlza: this.Pstlza,
				Qssysa: this.Qssysa,
				Regioa: this.Regioa,
				Scacda: this.Scacda,
				Sortla: this.Sortla,
				Sprasa: this.Sprasa,
				Stcd3a: this.Stcd3a,
				Stcd4a: this.Stcd4a,
				Stcdta: this.Stcdta,
				Stenra: this.Stenra,
				Strasa: this.Strasa,
				Telbxa: this.Telbxa,
				Telf1a: this.Telf1a,
				Telf2a: this.Telf2a,
				Teltxa: this.Teltxa,
				Telx1a: this.Telx1a,
				Tlfnsb: this.Tlfnsb,
				Tlfxsb: this.Tlfxsb,
				Txjcda: this.Txjcda,
				Waersc: this.Waersc,
				Ztermb: this.Ztermb,
				Zwelsb: this.Zwelsb

			};
		},

		getRequestPayload: function() {
			return {

				Abuebc: this.CreationProfile,
				Actssa: this.SocInsCode,
				Adrnra: this.Address,
				Agrelc: this.Agencybusiness,
				Akontb: this.Reconaccount,
				Altknb: this.Prevacctno,
				Anreda: this.Title,
				Avsndb: this.PmtAdvXML,
				Bahnsa: this.Trainstation,
				Bankld: this.BankKey,
				Banknd: this.BankAccount,
				Banksd: this.BankCountry,
				Bbbnra: this.Locationno1,
				Bbsnra: this.Locationno2,
				Begrua: this.Authorization,
				Begrub: this.Authorization,
				Bkontd: this.Controlkey,
				Bkrefd: this.Reference,
				Blindc: this.DocumentIndex,
				Blnkzb: this.Subsind,
				Boindc: this.SSindexactive,
				Bolrec: this.Subseqsett,
				Bopnrc: this.LBprofile,
				Brscha: this.Industry,
				Bstaec: this.ConfControldd,
				Bubkza: this.Checkdigit,
				Bukrsb: this.CompanyCode,
				Busabb: this.Acctgclerk,
				Bvtypd: this.PartBankType,
				Cerdtb: this.CertifictnDate,
				Confsa: this.Confirmstatus,
				Confsb: this.ConfirmStCCd,
				Datlta: this.Dataline,
				Datlzb: this.Lastintcalc,
				Dlgrpa: this.ServAgntProcGrp,
				Dtamsa: this.DMEIndicator,
				Dtawsa: this.Instructionkey,
				Duefla: this.DataTransferStatus,
				Eiktob: this.Acctwvendor,
				Eiktoc: this.Accwithvendor,
				Ekgrpc: this.PurchGroup,
				Ekorgc: this.PurchasingOrg,
				Emnfra: this.Externalmanuf,
				Erdata: this.Createdon,
				Erdatb: this.Createdon,
				Erdatc: this.Createdon,
				Ernama: this.Createdby,
				Ernamb: this.Createdby,
				Ernamc: this.Createdby,
				Esrnra: this.ISRNumber,
				Expvzc: this.ModeOfTrBorder,
				Fdgrvb: this.Planninggroup,
				Fiskna: this.Fiscaladdress,
				Fiskua: this.Taxoffice,
				Fitypa: this.Taxtype,
				Frgrpb: this.Releasegroup,
				Gbdata: this.Dateofbirth,
				Gborta: this.Placeofbirth,
				Gricdb: this.ActivityCode,
				Gridtb: this.DistrType,
				Guzteb: this.Crmemoterms,
				Hbkidb: this.HouseBank,

				Inco1c: this.Incoterms,
				Inco2c: this.Incoterms2,
				Intadb: this.Clrksinternet,
				Ipispa: this.Taxsplit,
				Kalskc: this.SchemaGrpVndr,
				Koinhd: this.Accountholder,
				Konzsa: this.CorporateGroup,
				Krausa: this.Credinfono,
				Ktocka: this.Refacctgroup,
				Ktokka: this.Accountgroup,
				Kultgb: this.Chkcashngtime,
				Kunnra: this.Customer,
				Kvermb: this.Accountmemo,
				Kzabsc: this.AcknowlReqd,
				Kzautc: this.AutomaticPO,
				Kzretc: this.Returnsvendor,

				Land1a: this.Country,
				Lebrec: this.SrvBasedInvVer,
				Lfabcc: this.ABCindicator,
				Lfrhyc: this.Planningcycle,
				Lfurla: this.URL,
				Libesc: this.POentryvend,
				Lifnra: this.Vendor,
				Liprec: this.Pricemkgvnd,
				Liserc: this.Rackjobbing,
				Lnrzaa: this.Alternatpayee,
				Lnrzbb: this.Alternatpayee,
				Lnrzeb: this.Headoffice,
				Loevma: this.Deletionflag,
				Loevmb: this.Cocdedeletionflag,
				Loevmc: this.DelflagPOrg,
				Ltsnaa: this.VSRrelevant,
				Lzonea: this.Transportzone,

				Mcod1a: this.Name,
				Mcod2a: this.Name2,
				Mcod3a: this.City,
				Megruc: this.UoMGroup,
				Meprfc: this.PrDateCat,
				Mgrupb: this.Groupingkey,
				Minbwc: this.Minimumvalue,
				Mindkb: this.Minorityindic,
				Mrpppc: this.Planningcal,
				Name1a: this.Name,
				Name2a: this.Name2,
				Name3a: this.Name3,
				Name4a: this.Name4,
				Nodela: this.Deletionblock,
				Nodelb: this.CoCddelblock,
				Nrgewc: this.QualiffDKd,

				Ort01a: this.City,
				Ort02a: this.District,
				Paprfc: this.PROACTcontrolprof,
				Pernrb: this.PersonnelNo,
				Pfacha: this.POBox,
				Pforta: this.POBoxcity,
				Plifzc: this.PlDelivTime,
				Plkala: this.Factorycalend,
				Prfrec: this.Pricedetermin,
				Profsa: this.Profession,
				Pstl2a: this.POBoxPCode,
				Pstlza: this.PostalCode,
				//		Qlandb: this.Country,
				Qsbgrb: this.Exmptauthority,
				Qsrecb: this.Recipienttype,
				Qsskzb: this.WTaxCode,
				Qssysa: this.ActualQMsys,
				Qszdtb: this.Validuntil,
				Qsznrb: this.Exemptionno,

				Rdprfc: this.RndingProfile,
				Regioa: this.region,
				Regssa: this.SocialIns,
				Reprfb: this.Chkdoubleinv,
				Revdba: this.Lastextreview,
				Scacda: this.SCAC,
				Sexkza: this.Sex,
				Sfrgra: this.Carfreightgrp,
				Skritc: this.Sortcriterion,

				Sortla: this.Searchterm,
				Sperma: this.Purchblock,
				Spermc: this.PurblockPOrg,
				Sperqa: this.Blockfunction,
				Sperra: this.PostingBlock,
				Sperrb: this.Cocodepostblock,
				Sperza: this.Paymentblock,
				Sprasa: this.Language,
				Stcd1a: this.TaxNumber1,
				Stcd2a: this.TaxNumber2,
				Stcd3a: this.TaxNumber3,
				Stcd4a: this.TaxNumber4,
				Stcd5a: this.TaxNumber5,
				Stcdta: this.Taxnumbertype,
				Stcega: this.VATRegNo,
				Stenra: this.TaxNumber,
				Stgdla: this.Statgrpagent,
				Stkzaa: this.Equalizatntax,
				Stkzna: this.Naturalperson,
				Stkzua: this.LiableforVAT,
				Strasa: this.Street,

				Taxbsa: this.Taxbase,
				Telbxa: this.Telebox,
				Telf1a: this.Telephone1,
				Telf1c: this.Telephone,
				Telf2a: this.Telephone2,
				Telfxa: this.FaxNumber,
				Teltxa: this.Teletex,
				Telx1a: this.Telex,
				Tlfnsb: this.Actclktelno,
				Tlfxsb: this.Clerksfax,
				Togrrb: this.Tolerancegrp,
				Togrub: this.Tolerancegroup,
				Txjcda: this.TaxJur,

				Umsaec: this.Bvolcompag,
				Updata: this.Confirmdate,
				Updatb: this.Confirmdate,
				Uptima: this.Confirmtime,
				Uptimb: this.Confirmtime,
				Uzaweb: this.Pmtmethsupl,
				Vbunda: this.TradingPartner,
				Venslc: this.VenServLevl,
				Verkfc: this.Salesperson,
				Vsbedc: this.ShippingCond,
				Vzskzb: this.Interestindic,

				Waersc: this.Ordercurrency,
				Webrec: this.GRBasedIV,
				Webtrb: this.Bexchlimit,
				Werkra: this.Plantrelevant,
				Werksa: this.Plant,
				Xauszb: this.Acctstatement,
				Xcpdka: this.Onetimeacct,
				Xdezvb: this.Localprocess,
				Xedipb: this.PmtadvbyEDI,
				Xersrc: this.AutGRSetRet,
				Xersyc: this.ERS,
				Xezerd: this.Collectauthor,
				Xlfzaa: this.Altpayeedoc,
				Xlfzbb: this.Altpayeedoc,
				Xnbwyc: this.Revaluation,
				Xporeb: this.Individualpmnt,
				Xverrb: this.Clrgwithcust,
				Xzempa: this.Payeeindoc,

				Zahlsb: this.Paymentblock,
				Zbokdb: this.LedgerExpdate,
				Zgrupb: this.Groupingkey,
				Zindtb: this.Lastkeydate,
				Zinrtb: this.Intcalcfreq,
				Zollac: this.Customsoffice,
				Zsabeb: this.Clerkatvendor,
				Ztermb: this.PaytTerms,
				Ztermc: this.PaytTerms,
				Zuawab: this.Sortkey,
				Zwelsb: this.Paymentmethods

			};

		}

	});

});