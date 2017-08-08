({
	getRecentRecords: function(c){
		const sObjectAPIName = c.get('v.sObjectAPIName');
		const action = c.get('c.getSObjectsByName');
		action.setParams({
			searchString: '',
			sObjectName: sObjectAPIName
		});
		action.setCallback(this, data => {
			c.set('v.records', data.getReturnValue());
		});
		$A.enqueueAction(action);
	},

	handleSearch: function(c,e,h){
		const sObjectAPIName = c.get('v.sObjectAPIName');
		const action = c.get('c.getSObjectsByName');

		const inputElement = c.get('v.inputId');
		const inputVal = document.getElementById(inputElement).value;

		//action.setAbortable();

		action.setParams({
			searchString: inputVal,
			sObjectName: sObjectAPIName
		});
		action.setCallback(this, data => {
			c.set('v.records', data.getReturnValue());
		});
		$A.enqueueAction(action);
	},

	handleItemSelection: function(c,e,h){
		const itemId = e.currentTarget.id;
		const recordId = e.currentTarget.getAttribute('data-record-id');
		const recordName = e.currentTarget.getAttribute('data-record-name');

		let updateEvent = c.getEvent('ObjectLookupEvent');
		updateEvent.setParams({recordId: recordId, recordName: recordName});
		updateEvent.fire();

		c.set('v.selectedRecordName', recordName);
		c.set('v.selectedRecordId', recordId);

		h.setLookup(c);
	},

	focusInput : function(c) {
		const comboLookupContainer = c.find('comboLookupContainer');
		const comboLookupWrap = c.find('comboLookupWrap');

		const recordId = c.get('v.selectedRecordId');
		if(recordId){
			return;
		}

		$A.util.addClass(comboLookupContainer, 'slds-has-input-focus');
		$A.util.removeClass(comboLookupWrap, 'slds-combobox-lookup');
		$A.util.addClass(comboLookupWrap, 'slds-is-open');
	},

	blurLookup: function(c){
		const comboLookupContainer = c.find('comboLookupContainer');
		const comboLookupWrap = c.find('comboLookupWrap');

		$A.util.removeClass(comboLookupContainer, 'slds-has-input-focus');
		$A.util.addClass(comboLookupWrap, 'slds-combobox-lookup');
		$A.util.removeClass(comboLookupWrap, 'slds-is-open');
	},

	setLookup: function(c){
		const comboLookupContainer = c.find('comboLookupContainer');
		const comboLookupWrap = c.find('comboLookupWrap');

		$A.util.removeClass(comboLookupContainer, 'slds-has-input-focus');
		$A.util.removeClass(comboLookupWrap, 'slds-combobox-lookup');
		$A.util.removeClass(comboLookupWrap, 'slds-is-open');

		const inputElement = c.find('inputTextbox');
		$A.util.addClass(inputElement, 'value-set');
	}

})