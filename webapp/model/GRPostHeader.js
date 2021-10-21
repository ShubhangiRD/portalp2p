sap.ui.define([
	"com/vSimpleApp/model/BaseObject",

	"com/vSimpleApp/service/Application"
], function(BaseObject,  Application) {
	"use strict";
	var GRPost = BaseObject.extend("com.vSimpleApp.model.GRPost", {
		constructor: function(oData) {
			BaseObject.call(this);
	
			this.setData(oData);
		},

		setData: function(oData) {
			this.ItemNo = (oData && oData.ItemNo) ? oData.ItemNo : "";
		
		},
		
	
		
		getRequestPayloadGR: function() {
			return {
			
				Item: this.ItemNo,
				Scale: (this.IsScaleSelected) ? "X" : "",
				Rate: this.Rate,
				Rtype: this.RebateType,
				Base: this.Base,
				Kdatb: this.DateService.formatRequestPayloadDate(this.ValidFrom),
				Kdate: this.DateService.formatRequestPayloadDate(this.ValidTo)
			};
		},
		
	
	});
	return GRPost;
});