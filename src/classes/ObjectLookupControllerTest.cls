/**

Created By: Andrew - andrew@wizno.net

Created On: 2017-08-05 09:28:20

Last Modified: 2017-08-07 20:55:55

**/
@isTest
private class ObjectLookupControllerTest {

	@testSetup static void setup() {
		Lead lead = new Lead(
		  FirstName = 'John',
		  LastName = 'Smith',
		  Company = 'Acme Widgets',
		  Phone = '9415551234',
		  Email = 'wiz@test.test'
		);
		insert lead;
	}

	@isTest static void testSearchObject() {
		List<SObject> leads = ObjectLookupController.getSObjectsByName('John', 'Lead');
		System.assertEquals(1, leads.size(), 'Expected 1 lead to be returned by search.');
	}

	@isTest static void testSearchObjectNotFound() {
		try {
			List<SObject> leads = ObjectLookupController.getSObjectsByName('John', 'LeadZZZZZZZZZ');
		} catch (ObjectLookupController.LookupException e) {
			System.assert( e.getMessage().contains('The specified SObject does not exist'), 'Expected to not find SObject');
		}
	}

}