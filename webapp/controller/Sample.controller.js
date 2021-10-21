sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
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

		},
		getMethod : function(){
				var str = "Shubhangi";

			var count = str.length;

				var r = "";
				for(var i = count-1; i >= 0; i--){
				 r += str[i];
				 console.log(r);
				}

		//find out duplicate characters.
		
	

		},
		getFindsame: function(){
				var str = "SShubhhhhangi";

			var count = str.length;
				for(var y=0 ; y<=count ; y++){
				var cnt = 0;
				var aa = [];
			for(var z=y+1 ; z<=count ;z++){
				
				if(str[y]===str[z] && str[y] !== ''){
						cnt++;
						var r="";
						r += str[z];
					
							console.log( "Duplicate count" +cnt+  " " +r);
				}
		
		
				
			}
			
			
		}

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