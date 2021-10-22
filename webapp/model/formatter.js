sap.ui.define([
	"sap/ui/model/json/JSONModel"
], function(JSONModel) {
	"use strict";
	var oExcess = [];
	var oExcessHierarchy =[];

	return {

		onBlueStage: function(blue) {

			return "Information";
		},
		onQuantityAllStages: function(quantity, red, yellow, green, blue) {
			quantity = quantity;
			red = red;
			yellow = yellow;
			green = green;
			blue = blue;

			var redReturn = "R";
			if (quantity >= blue) {

				return "Information";
			} else if (quantity < blue && quantity >= green) {
				return "Success";
			} else if (quantity < green && quantity >= yellow) {
				return "Warning";
			} else if (quantity < yellow && quantity >= red) {

				return "Error";
			} else if (quantity < red) {

				return "Error";
			}

		},

		statusColor: function(quantity, red, yellow, green, blue, Matnr) {
			quantity = quantity;
			red = red;
			yellow = yellow;
			green = green;
			blue = blue;

			var oBinding1 = this.getView().byId("awaitingTable").getBinding("items");
			var oModel = oBinding1.oModel.oData;
			var slength = oBinding1.oModel.oData.length;
			var sColumnlength = slength - 1;

			if (quantity > green) {
				this.getView().getModel("oStockDataModel").setProperty("/" + sColumnlength + "/Color", "blue");
				oExcess.push({
					quantity: quantity,
					Matnr: Matnr
				});

				this.getView().getModel("oExcessModelData").setData(oExcess);
				var length = oExcess.length;
				var count = new JSONModel({
					count: length
				});
				this.getView().setModel(count, "count");
				return "Information";

			} else if (quantity > yellow && quantity < green) {
				this.getView().getModel("oStockDataModel").setProperty("/" + sColumnlength + "/Color", "green");
				return "Success";

			} else if (quantity > red && quantity <= yellow) {
				this.getView().getModel("oStockDataModel").setProperty("/" + sColumnlength + "/Color", "yellow");
				return "Warning";
			} else if (quantity < yellow) {
				this.getView().getModel("oStockDataModel").setProperty("/" + sColumnlength + "/Color", "red");
				return "Error";

			}

		},

		HierarchyColorState: function(quantity, red, yellow, green, blue,Maingrp) {
			quantity = quantity;
			red = red;
			yellow = yellow;
			green = green;
			blue = blue;

			var oBinding1 = this.getView().byId("awaitingTable2").getBinding("items");
			var oModel = oBinding1.oModel.oData;
			var slength = oBinding1.oModel.oData.length;
			var sColumnlength = slength - 1;

			if (quantity > green) {
				this.getView().getModel("HierarchyData").setProperty("/" + sColumnlength + "/Color", "blue");
				
					oExcessHierarchy.push({
					quantity: quantity,
					Maingrp: Maingrp
				});

				this.getView().getModel("oExcessHierarchy").setData(oExcessHierarchy);
				var length = oExcessHierarchy.length;
				var count = new JSONModel({
					count: length
				});
				this.getView().setModel(count, "countMod");
				return "Information";

			} else if (quantity > yellow && quantity < green) {
				this.getView().getModel("HierarchyData").setProperty("/" + sColumnlength + "/Color", "green");
				return "Success";

			} else if (quantity > red && quantity <= yellow) {
				this.getView().getModel("HierarchyData").setProperty("/" + sColumnlength + "/Color", "yellow");
				return "Warning";
			} else if (quantity < yellow) {
				this.getView().getModel("HierarchyData").setProperty("/" + sColumnlength + "/Color", "red");
				return "Error";

			}

		},

		oCreatePurchaseOrder: function(color, material, plant, text) {

		}

	};

}, true);