sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("com.vSimpleApp.controller.Sample", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.vSimpleApp.view.Sample
		 */
		onInit: function() {

			this.getMethod();
			this.getFindsame();

			var Parent = [{
					ID: "1",
					Text: "Shubhangi",
					Type: "kfsd",
					common: "1"
				}, {
					ID: "2",
					Text: "Rahul",
					Type: "kfsd",
					common: "2"
				}, {

					ID: "3",
					Text: "Rajshree",
					Type: "kfsd",
					common: "3"
				}

			];

			var Child = [{
					common: "1",
					ID: "11",
					Clg: "ABC"
				}, {
					common: "2",
					ID: "22",
					Clg: "PQL"
				}, {
					common: "3",
					ID: "33",
					Clg: "ESD"
				}

			];

			var oModel = new JSONModel(Parent);
			this.getView().setModel(oModel, "oModel");
			var oModel2 = new JSONModel(Child);
			this.getView().setModel(oModel2, "oModel2");

			this.transformTreeData();
		},
		getMethod: function() {
			var str = "Shubhangi";

			var count = str.length;

			var r = "";
			for (var i = count - 1; i >= 0; i--) {
				r += str[i];
				console.log(r);
			}

			//find out duplicate characters.

		},
		
		getFindsame: function() {
			var str = "SShubhhhhangi";

			var count = str.length;
			for (var y = 0; y <= count; y++) {
				var cnt = 0;
				var aa = [];
				for (var z = y + 1; z <= count; z++) {

					if (str[y] === str[z] && str[y] !== '') {
						cnt++;
						var r = "";
						r += str[z];

						console.log("Duplicate count" + cnt + " " + r);
					}

				}

			}

		},
		transformTreeData: function(nodesIn) {
			var oModel = this.getView().getModel("oModel");
			var oModel2 = this.getView().getModel("oModel2");

			var Child = oModel.oData;
			var Parent = oModel2.oData;

			var nodes = []; //'deep' object structure
			var nodeMap = {}; //'map', each node is an attribute
			var parents = [];
			if (nodesIn) {
				var nodeOut;
				var parentId;

				for (var i = 0; i < Parent.length; i++) {

					for (var c = 0; c < Child.length; c++) {

						var nodeIn = nodesIn[i];
						nodeOut = {
							id: nodeIn.ID,
							text: nodeIn.Text,
							type: nodeIn.Type,
							children: []
						};

						parentId = nodeIn.common;

						if (parentId && parentId.length > 0) {
							//we have a parent, add the node there
							//NB because object references are used, changing the node
							//in the nodeMap changes it in the nodes array too
							//(we rely on parents always appearing before their children)
							//    var parent = nodeMap[nodeIn.ID];

							if (parents) {
								Parent[i].children.push(nodeOut);
								console.log(Parent[i]);
							}

						} else {
							//there is no parent, must be top level
							nodes.push(nodeOut);
						}

						//add the node to the node map, which is a simple 1-level list of all nodes
						nodeMap[nodeOut.id] = nodeOut;

					}
				}

			}

			console.log(nodes);

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.vSimpleApp.view.Sample
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.vSimpleApp.view.Sample
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.vSimpleApp.view.Sample
		 */
		//	onExit: function() {
		//
		//	}

	});

});