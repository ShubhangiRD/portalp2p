sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.vSimpleApp.controller.Stock", {

      	onPress: function (oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("ManageStockTable");
		}
	});
});