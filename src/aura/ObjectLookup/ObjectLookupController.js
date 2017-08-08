({
	init: function(c,e,h){
		h.getRecentRecords(c);
	},

	handleInputFocus : function(c, e, h) {
		h.focusInput(c);
	},

	handleKeyup: function(c,e,h){
		h.handleSearch(c,e,h);
	},

	handleInputBlur : function(c, e, h) {
		//h.blurLookup(c);
	},

	handleOptionSelected: function(c,e,h){
		h.handleItemSelection(c,e,h);
	},

	handleClearInput: function(c,e,h){
		c.set('v.selectedRecordName', null);
		c.set('v.selectedRecordId', null);
		const inputElement = c.find('inputTextbox');
		let updateEvent = c.getEvent('ObjectLookupEvent');
		updateEvent.setParams({recordId: null, recordName: null});
		updateEvent.fire();
		$A.util.removeClass(inputElement, 'value-set');
	},

	handleObjectLookupEvent: function(c,e,h){
		console.log("CMP:: handler for " + e.getName());

		const auraId = e.source.sc;

		console.log('CMP:: ','Aura Id',auraId);
	}
})