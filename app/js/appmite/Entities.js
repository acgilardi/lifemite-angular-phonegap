appmite.Entities = function()
{
	var settingsEntities = {};
	var categoryEntities = {};
	var thingEntities = {};
	var myThingEntities = {};
	var dailyEntities = {};
	var profileEntities ={}; 	
	var resourceEntities = {};
	var tipEntities = {};
	
	return {
		LoadEntity: function(entityName,entity){
			
			if(entity == undefined)
				return;
				
			switch(entityName)
			{
				case "SettingsEntities":
					settingsEntities = entity;
					break;
				case "CategoryEntities":
					categoryEntities = entity;
				 	break;
				case "ThingEntities":
					thingEntities = entity;
					break;
				case "MyThingEntities":
					myThingEntities = entity;
					break;
				case "DailyEntities":
					dailyEntities = entity;
					break;
				case "ProfileEntities":
					profileEntities = entity;
					break;
				case "ResourceEntities":
					resourceEntities = entity;
					break;
					
				case "TipEntities":
					tipEntities = entity;
					break;
			}	
		},
		
		Setting: function(){ return settingsEntities; },
		Category: function(){ return categoryEntities; },
		Thing: function(){ return thingEntities; },
		MyThing: function(){ return myThingEntities; },
		Daily: function(){ return dailyEntities; },
		Profile: function(){ return profileEntities; },
		Resource: function(){ return resourceEntities; },
		Tip: function(){ return tipEntities; },
		
		SetDaily: function(entities){ dailyEntities = entities; },
		
		SettingArray: function() { return appmite.SqlLite.FlattenEntities(settingsEntities); },
		CategoryArray: function() { return appmite.SqlLite.FlattenEntities(categoryEntities); },
		ThingArray: function() { return appmite.SqlLite.FlattenEntities(thingEntities); },
		MyThingArray: function() { return appmite.SqlLite.FlattenEntities(myThingEntities); },
		DailyArray: function() { return appmite.SqlLite.FlattenEntities(dailyEntities); },
		ProfileArray: function() { return appmite.SqlLite.FlattenEntities(profileEntities); },
		ResourceArray: function() { return appmite.SqlLite.FlattenEntities(resourceEntities); },
		TipArray: function(){ return appmite.SqlLite.FlattenEntities(tipEntities); }
	}
}();