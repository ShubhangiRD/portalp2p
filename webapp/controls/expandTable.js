sap.ui.define(["jquery.sap.global", "./../library", "sap/ui/core/Control"],
	function(jQuery, library, Control) {

		
	var expandTable = Control.extend("com.vSimpleApp.controls.expandTable", {

			metadata: {
				properties: {
					text : " ",
				
				
						title: {
						type: "string",
						group: "Misc",
						defaultValue: null
					},
					description: {
						type: "string",
						group: "Misc",
						defaultValue: null
					},
					
					width: {
                    	type: "sap.ui.core.CSSSize",
                    	defaultValue: "auto"
	                },
	                height: {
	                      type: "sap.ui.core.CSSSize",
	                      defaultValue: "auto"
	                },
	                margin: {
	                      type: "sap.ui.core.CSSSize",
	                      defaultValue: "0"
	                },
	                padding: {
	                      type: "sap.ui.core.CSSSize",
	                      defaultValue: "1rem"
	                }
				},
				events: {},
				aggregations: {},
				methods: {}
			},

			init: function() {},
			renderer: function(oRm, oControl) {
				oRm.write("<h4> " + oControl.getText() +"  </h4>");
		/*		  oRm.write(" style=\"width: " + oControl.getWidth() + "; height: " + oControl.getHeight() + "; margin: " + oControl.getMargin() + "; padding: " + oControl.getPadding() + ";\"");
         */    
			}
		});
			return expandTable;
	}
);