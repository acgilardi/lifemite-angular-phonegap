/**
 * author: 		Anthony Gilardi
 * website:		http://www.appmite.com
 * 
 * namespace:	am
 * version: 	2.0.0
 * 
 * classes: 	SqlLite
 * 
 * notes:
 * 
 */
appmite.SqlLite = function() 
{	
    // define private data and functions
    var keynamefield = "keyname";
	var keyentityfield = "keyentity";
    var dataTypes = {"Text" : "TEXT", "Integer" : "INTEGER", "Date" : "TEXT", "Float" : "FLOAT", "Boolean" : "INTEGER"};
    var database = {};
    var forceRebuild = false;
    var sqlSteps = [];
    var sqlTestScript = "";
    var tables = {};
    var upgrades = [];
    var entitySets = {};
    var entitiesLeftToFill = 0;
    
    var successCallback = function(){};
    var errorCallback = function(){};
    var progressCallback = function(){};
    
	
    function testTablesExist(tx) {    
    	tx.executeSql(sqlTestScript,[],successCallback,testFailCallback);
    	//transaction.executeSql(string, [], this.SuccessCallback, this.TestDatabaseFail.bind(this,arguments)); 
    };
    
  	function testFailCallback(transaction, results) 
	{
		forceRebuild = true;
		try 
		{
			database.transaction(createDatabase,callbackError,callbackSuccess);
		}
		catch (e)
		{
			return false;
		}
	};
    
    function createDatabase(tx)
    {
		//progressCallback("Create Database - Start");
		//appmite.Global.Alert("Create Database - Start");
			
		//Steps
    	for (i = 0; i < sqlSteps.length; i++)
    		tx.executeSql(sqlSteps[i]);

    	//progressCallback("Create Database - End");
    };
 
 	function genericRequest(sql,callbackSuccess,callbackError)
	{ 
		try 
		{
		    database.transaction( 
		        (function (tx) 
		        { 
		        	tx.executeSql(sql,[],callbackSuccess,callbackError); 
		        })
		    );
		}
		catch (e)
		{
		}
	};
	
	function fillEntity(transaction,result)
	{
		var entities = {};
	
		if(result.rows.length != 0)
		{
			//var rowOne = result.rows.item(0);
			
			//Loop through and collect
			for (var i = 0; i < result.rows.length; i++) 
			{
				var row = result.rows.item(i);   
	   			var entityName = row[keynamefield];
	   			var entity = {};
				
				//Set each property of the entity object
				for(var field in row)
					entity[field] = row[field];	
	
				//Add the entity object to an entities collection
				entities[entityName] = entity;
			}			
			
			//Add each entity collection to the set to be returned
			entitySets[row[keyentityfield]] = entities;	
		}

		entitiesLeftToFill = entitiesLeftToFill - 1;
		
		if(entitiesLeftToFill == 0)
			successCallback(entitySets);
	};	
	
	function SetupScripts(currentVersion,neededVersion)
	{	
		//Now step through all upgrades
		if(currentVersion < neededVersion)
		{	
			for(var i = 0; i < upgrades.length; i++)
			{
				var curUpgradeDef = upgrades[i];
				
				if( (curUpgradeDef.FromVersion >= currentVersion) && (curUpgradeDef.ToVersion <= neededVersion))
				{
					progressCallback("Building Database ...");
					
					for(var j = 0; j < curUpgradeDef.Steps.length; j++)
						sqlSteps.push(curUpgradeDef.Steps[j]);
				}
			}
		}
	};
	
    // return public pointers to functions or properties
    // that are to be public
    return {
    	DataTypes: function() { return dataTypes; },

    	db: function() { return database; },

		AddTables: function(tablesArray)
		{
			for (i = 0; i < tablesArray.length; i++) 
			{
				var tableDef = tablesArray[i];
				tables[tableDef.Name] = { name:tableDef.Name, tabledef:tablesArray[i] };
			}
		},
	     
	    AddUpgrades: function(upgradesArray)
	    {
	    	for (i = 0; i < upgradesArray.length; i++) 
				upgrades.push(upgradesArray[i]);
	    } ,
       	ForceRebuild: function(enable){
			forceRebuild = enable;
		},
        
        InitDatabase: function(databaseName,databaseVersion,databaseDescription,callbackSuccess,callbackError,callbackProgress)
        {
			successCallback = callbackSuccess;
			errorCallback = callbackError;
			progressCallback = callbackProgress;

			progressCallback("Loading ...");

			try 
			{
				database = window.openDatabase(databaseName,"",databaseDescription,200000);
				
				var neededVersionString = databaseVersion + ".0";
				var currentVersion = database.version * 1;
				var currentVersionString = currentVersion + ".0";
				if(currentVersion == 0)
					currentVersionString = "";

				if(forceRebuild)
				{
					currentVersion = 0;
					//currentVersionString = "";
				}
				
				SetupScripts(currentVersion,databaseVersion);

				database.changeVersion(currentVersionString,neededVersionString, createDatabase, errorCallback, successCallback);
			}
			catch (e)
			{
				return false;
			}
		
			return true;
        },
        
		Fetch: function(commands,callbackSuccess,callbackError)
		{
			entitySets = {};
			entitiesLeftToFill = commands.length;
			successCallback = callbackSuccess;
			errorCallback = callbackError;
	
			//Call sql request for each command
			for(var i = 0; i < commands.length; i++)
			{
				genericRequest(commands[i],fillEntity,callbackError);	
			}
		},
		
		//Saves an entity object
		SaveOneEntity: function(entity,tableDef,successCallback,errorCallback)
		{
			var PkField = tableDef.Name + "ID";
			var PkValue = entity[PkField];
			
			//If entity exists then save it By ID otherwise Insert it
			var IsInsert = false;
			if(PkValue == undefined)
				IsInsert = true;
			
			var clause = {};
			clause[PkField] = PkValue;
			
			var sql = "";
			if(IsInsert)
				sql = tableDef.InsertSql(entity);
			else
				sql = tableDef.UpdateSql(entity,clause);
			
			genericRequest(sql,enyo.bind(this,successCallback),enyo.bind(this,errorCallback));
		},
		
		//Saves an array of entity objects
		SaveEntities: function(entities,tableDef,callbackSuccess,callbackError)
		{
			entitySets = {};
			entitiesLeftToFill = entities.length;
			successCallback = callbackSuccess;
			errorCallback = callbackError;
			
			for(var i=0;i < entities.length;i++)
			{
				appmite.SqlLite.SaveOneEntity(entities[i],tableDef,fillEntity,callbackError);				
			}
		},
			
		//Deletes one entity object
		DeleteEntity: function(entity,tableDef,successCallback,errorCallback)
		{
			var PkField = tableDef.Name + "ID";
			var PkValue = entity[PkField];
			
			var clause = {};
			clause[PkField] = PkValue;
			sql = tableDef.DeleteSql(entity,clause);
	
			genericRequest(sql,enyo.bind(this,successCallback),enyo.bind(this,errorCallback))
		},
		
		//Turns an entities object into an array of entities
		FlattenEntities: function(entities)
		{
			var enttoarray = [];
			
			for(var entity in entities)
				enttoarray.push(entities[entity]);
			
			return enttoarray;
		},
    }
}(); //end closure definition and invoke it



	// SqlLite.prototype.GetEntityById = function(id,entities,tableDef)
	// {
		// var PkField = tableDef.Name + "ID";
		// //var PkValue = entity[PkField];
// 		
		// for(var entity in entities)
			// if(entity[PkField] = id)
				// return entities[entity];
// 		
		// return undefined;
	// };