/**

Created By: Andrew - andrew@wizno.net

Created On: 2017-08-05 09:28:20

Last Modified: 2017-08-07 20:55:46

**/
public with sharing class ObjectLookupController {

	/**
	 * Retrieves search for specified SObject and Search String
	 * @param  searchString Name of Record to search for
	 * @param  sObjectName  API Name of SObject to search on
	 * @return              List of <Sobjects> returned by search
	 */
	@AuraEnabled
	public static List<SObject> getSObjectsByName(String searchString, String sObjectName) {
		sObjectName = String.escapeSingleQuotes(sObjectName);
		searchString = String.escapeSingleQuotes(searchString);
		if ( !hasSobject(sObjectName) ) {
			//throw an error
			throw new LookupException('The specified SObject does not exist: ' + sObjectName);
		}
		String query = 'SELECT Id, Name FROM ' + sObjectName;
		if ( String.isNotBlank(searchString) ) {
			query += ' WHERE Name LIKE \'%' + searchString + '%\' ';
		} else {
			List<RecentlyViewed> recentRecords = [SELECT Id, Name FROM RecentlyViewed WHERE LastViewedDate != NULL AND Type = :sObjectName ORDER BY LastViewedDate LIMIT 5];
			Set<String> recordNames = new Set<String>();
			for (RecentlyViewed r : recentRecords) {
				recordNames.add(r.Name);
			}
			query += ' WHERE Name IN :recordNames ';
		}
		query += ' ORDER BY Name LIMIT 5';
		return Database.query(query);
	}

	/**
	 * Checks if the org has the SObject
	 * @param  sObjectName API Name of the SObject to check against
	 * @return             True/False
	 */
	private static Boolean hasSobject(String sObjectName) {
		Map<String, Schema.SObjectType> d = Schema.getGlobalDescribe();
		if ( !d.containsKey(sObjectName) ) {
			return false;
		}
		return true;
	}

	public class LookupException extends Exception {}
}