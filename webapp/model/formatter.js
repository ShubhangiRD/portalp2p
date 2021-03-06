// sap.ui.define([
// 	"sap/ui/model/json/JSONModel"
// ], function(JSONModel) {
// 	"use strict";
// 	var oExcess = [];
// 	var oExcessHierarchy = [];
// 	var output = [];
// 	var countt = 0;
// 	return {

// 		onBlueStage: function(blue) {

// 			return "Information";
// 		},
// 		onQuantityAllStages: function(quantity, red, yellow, green, blue) {
// 			quantity = quantity;
// 			red = red;
// 			yellow = yellow;
// 			green = green;
// 			blue = blue;

// 			var redReturn = "R";
// 			if (quantity >= blue) {

// 				return "Information";
// 			} else if (quantity < blue && quantity >= green) {
// 				return "Success";
// 			} else if (quantity < green && quantity >= yellow) {
// 				return "Warning";
// 			} else if (quantity < yellow && quantity >= red) {

// 				return "Error";
// 			} else if (quantity < red) {

// 				return "Error";
// 			}

// 		},

// 		statusColor: function(quantity, red, yellow, green, blue, Matnr) {
// 			quantity = quantity;
// 			red = red;
// 			yellow = yellow;
// 			green = green;
// 			blue = blue;

// 			var oBinding1 = this.getView().byId("TreeTableBasic2").getBinding("rows");
// 			var oModel = oBinding1.oModel.oData;
// 			var slength = oBinding1.oModel.oData.length;
// 			var sColumnlength = slength - (slength - 1);

// 			function PlantExists(quantity) {
// 				return oExcess.some(function(edl) {
// 					return edl.quantity === quantity;
// 				});
// 			}
// 			if (quantity !== null && red !== null && yellow !== null && green !== null && blue !== null && Matnr !== null) {

// 				if (quantity > green) {
// 					this.getView().getModel("oStockDataModel").setProperty("/" + countt + "/Color", "blue");
// 					countt++;

// 					oExcess.push({
// 						quantity: quantity,
// 						Matnr: Matnr
// 					});

// 				//	console.log(oExcess)
// 					this.getView().getModel("oExcessModelData").setData(oExcess);

// 					return "Information";

// 				} else if (quantity > yellow && quantity < green) {
// 					this.getView().getModel("oStockDataModel").setProperty("/" + countt + "/Color", "green");
// 					countt++;
// 					return "Success";

// 				} else if (quantity > red && quantity <= yellow) {
// 					this.getView().getModel("oStockDataModel").setProperty("/" + countt + "/Color", "yellow");
// 					countt++;
// 					return "Warning";
// 				} else if (quantity < yellow) {
// 					this.getView().getModel("oStockDataModel").setProperty("/" + countt + "/Color", "red");
// 					countt++;
// 					return "Error";

// 				}

// 			}

// 				var ostock = this.getView().getModel("oStockDataModel");
// 				var odata= ostock.oData.length;
// 			var unique = [];

// 				for(var i=0;i<odata;i++){
// 				var color = ostock.oData[i].Color;
// 					var Matnrs = ostock.oData[i].Matnr;
// 						var Labsts = ostock.oData[i].Labst;
// 				if(color === 'blue'){
// 				unique.push({
// 						quantity: quantity,
// 						Matnr: Matnr          

// 				});

// 				}
// 				}
// 				//	console.log(unique);
// 	var length = unique.length;

// 					var count = new JSONModel({
// 						count: ""
// 					});
// 					this.getView().setModel(count, "count");
// 					//		this.getView().getProperty('/count' , length);
// 					this.getView().getModel("count").setProperty("/count", length);

// 			//	console.log(ostock);

// 		},

// 		HierarchyColorState: function(quantity, red, yellow, green, blue, Maingrp) {
// 			quantity = quantity;
// 			red = red;
// 			yellow = yellow;
// 			green = green;
// 			blue = blue;

// 			var oBinding1 = this.getView().byId("awaitingTable2").getBinding("items");
// 			var oModel = oBinding1.oModel.oData;
// 			var slength = oBinding1.oModel.oData.length;
// 			var sColumnlength = slength - 1;

// 			if (quantity > green) {
// 				this.getView().getModel("HierarchyData").setProperty("/" + sColumnlength + "/Color", "blue");

// 				oExcessHierarchy.push({
// 					quantity: quantity,
// 					Maingrp: Maingrp
// 				});

// 				this.getView().getModel("oExcessHierarchy").setData(oExcessHierarchy);
// 				var length = oExcessHierarchy.length;
// 				var count = new JSONModel({
// 					count: length
// 				});
// 				this.getView().setModel(count, "countMod");
// 				return "Information";

// 			} else if (quantity > yellow && quantity < green) {
// 				this.getView().getModel("HierarchyData").setProperty("/" + sColumnlength + "/Color", "green");
// 				return "Success";

// 			} else if (quantity > red && quantity <= yellow) {
// 				this.getView().getModel("HierarchyData").setProperty("/" + sColumnlength + "/Color", "yellow");
// 				return "Warning";
// 			} else if (quantity < yellow) {
// 				this.getView().getModel("HierarchyData").setProperty("/" + sColumnlength + "/Color", "red");
// 				return "Error";

// 			}

// 		},

// 		oCreatePurchaseOrder: function(color, material, plant, text) {

// 		}

// 	};

// }, true);

sap.ui.define([
	"sap/ui/model/json/JSONModel"
], function(JSONModel) {
	"use strict";
	var oExcess = [];
	var oExcessHierarchy = [];
	var output = [];
	var countt = 0;
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
		statusColor: function(quantity, red, yellow, green, blue, Material) {
			quantity = quantity;
			red = red;
			yellow = yellow;
			green = green;
			blue = blue;
			var oBinding1 = this.getView().byId("TreeTableBasic2").getBinding("rows");
			var oModel = oBinding1.oModel.oData;
		//	console.log(oModel);
			var slength = oBinding1.oModel.oData.length;
			var sColumnlength = slength - (slength - 1);
			var model= this.getView().getModel("oStockDataModel").oData;
		

			function PlantExists(quantity) {
				return oExcess.some(function(edl) {
					return edl.quantity === quantity;
				});
			}
			if (quantity !== null && red !== null && yellow !== null && green !== null && blue !== null && Material !== null) {
				//console.log(Material);
		      for(i=0;i<oModel.length;i++){
		      	if(oModel[i].Material === Material && oModel[i].Color===""){
		      	if(countt>=oModel.length){
					countt = 0;
			}
		      		if(countt<=oModel.length){
				if (quantity > green) {
					this.getView().getModel("oStockDataModel").setProperty("/" + countt + "/Color", "blue");
				//	console.log(countt)
					countt++;
					
					// oExcess.push({
					// 	quantity: quantity,
					// 	Matnr: Matnr
					// });
					// console.log(oExcess)
					// this.getView().getModel("oExcessModelData").setData(oExcess);

					return "Information";
				} else if (quantity > yellow && quantity < green) {
					this.getView().getModel("oStockDataModel").setProperty("/" + countt + "/Color", "green");
				//	console.log(countt);
					countt++;
					return "Success";
				} else if (quantity > red && quantity <= yellow) {
					this.getView().getModel("oStockDataModel").setProperty("/" + countt + "/Color", "yellow");
				//	console.log(countt);
					countt++;
					return "Warning";
				} else if (quantity < yellow) {
					this.getView().getModel("oStockDataModel").setProperty("/" + countt + "/Color", "red");
				//	console.log(countt);
					countt++;
					return "Error";
				}
		      	}
		      	}
			}
			}
			
			  for(i=0;i<oModel.length;i++){
				if(oModel[i].Material === Material && oModel[i].Color!==""){
					if(oModel[i].Color ==='blue'){
							return "Information";
					}
						else if(oModel[i].Color ==='green'){
							return "Success";
					}
						else if(oModel[i].Color ==='yellow'){
							return "Warning";
					}
							else if(oModel[i].Color ==='red'){
							return "Error";
					}
				}
			  }
 
 
			var ostock = this.getView().getModel("oStockDataModel");
			var odata = ostock.oData.length;
			var unique = [];
			for (var i = 0; i < odata; i++) {
				var color = ostock.oData[i].Color;
				var Matnrs = ostock.oData[i].Matnr;
				var Labsts = ostock.oData[i].Labst;
				if (color === 'blue') {
					unique.push({
						quantity: quantity,
						Matnr: Material

					});

				}
			}
		//	console.log(unique);
			var length = unique.length;

			var count = new JSONModel({
				count: ""
			});
			this.getView().setModel(count, "count");
			//		this.getView().getProperty('/count' , length);
			this.getView().getModel("count").setProperty("/count", length);

	//		console.log(ostock);




		},
		
			statusColorExcess: function(quantity, red, yellow, green, blue, Material) {
			quantity = quantity;
			red = red;
			yellow = yellow;
			green = green;
			blue = blue;
			var oBinding1 = this.getView().byId("exces").getBinding("items");
			var oModel = oBinding1.oModel.oData;
			var slength = oBinding1.oModel.oData.length;
			var sColumnlength = slength - (slength - 1);

			function PlantExists(quantity) {
				return oExcess.some(function(edl) {
					return edl.quantity === quantity;
				});
			}
			if (quantity !== null && red !== null && yellow !== null && green !== null && blue !== null && Material !== null) {
				if (quantity > green) {
					this.getView().getModel("oEX").setProperty("/" + countt + "/Color", "blue");
					countt++;
					// oExcess.push({
					// 	quantity: quantity,
					// 	Matnr: Matnr
					// });
					// console.log(oExcess)
					// this.getView().getModel("oExcessModelData").setData(oExcess);

					return "Information";
				} else if (quantity > yellow && quantity < green) {
					this.getView().getModel("oEX").setProperty("/" + countt + "/Color", "green");
					countt++;
					return "Success";
				} else if (quantity > red && quantity <= yellow) {
					this.getView().getModel("oEX").setProperty("/" + countt + "/Color", "yellow");
					countt++;
					return "Warning";
				} else if (quantity < yellow) {
					this.getView().getModel("oEX").setProperty("/" + countt + "/Color", "red");
					countt++;
					return "Error";
				}

			}

			var ostock = this.getView().getModel("oEX");
			var odata = ostock.oData.length;
			var unique = [];
			for (var i = 0; i < odata; i++) {
				var color = ostock.oData[i].Color;
				var Matnrs = ostock.oData[i].Matnr;
				var Labsts = ostock.oData[i].Labst;
				if (color === 'blue') {
					unique.push({
						quantity: quantity,
						Matnr: Material

					});

				}
			}
		//	console.log(unique);
			var length = unique.length;

			var count = new JSONModel({
				count: ""
			});
			this.getView().setModel(count, "count");
			//		this.getView().getProperty('/count' , length);
			this.getView().getModel("count").setProperty("/count", length);

	//		console.log(ostock);

		},
		
		HierarchyColorState: function(quantity, red, yellow, green, blue, Maingrp) {
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
		oCreatePurchaseOrder: function(color, material, plant, text) {},
		onColorStatePoDecision : function(Color,AvailableQuantity){
				if (Color == "blue") {
				return "Information";
			} else if (Color == "green") {
				return "Success";
			} else if (Color == "yellow") {
				return "Warning";
			} else if (Color == "red") {
				return "Error";
			} 
		}
	};
}, true);