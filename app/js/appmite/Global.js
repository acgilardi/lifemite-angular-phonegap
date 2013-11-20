

appmite.Global = function()
{
	//Database version
	var DatabaseForceRebuild  = true;
	var DatabaseVersion = 3;
	var DatabaseName = "lifeMiteDB";
	var DatabaseDescription = "";
	var DbInitCallback = {};
	var ActiveProfile = "";
    //ng-app="lifemiteAngularPhonegapApp"

    var bootstrapAngular = function() {
        angular.element(document).ready(function() {
            angular.bootstrap(document, ['lifemiteAngularPhonegapApp']);
        });
    }

	
	return{

		ClientWidth: function(){ return document.documentElement.clientWidth; },
		ClientHeight: function(){ return document.documentElement.clientHeight; },
		AlertScreen: function()
		{ 
			var myWidth = document.documentElement.clientWidth; 
			var myHeight = document.documentElement.clientHeight; 
			alert("Width:" + myWidth + ", height: " + myHeight); 
		},
		Alert: function(message){ alert(message); },
		AlertObject: function(obj){ alert(JSON.stringify(obj)); },
		
		SetDbInitialized: function(callback){ DbInitCallback = callback; },
		//DbInitialized: function(){ DbInitCallback(); },
		
		GetActiveProfile: function(){ return ActiveProfile; },
		SetActiveProfile: function(profileName){ ActiveProfile = profileName; },
		
		ErrorHandler: function(transaction, error) 
		{ 
			if(error != undefined)
				appmite.Global.Alert(error.message);
		},
		
		InitDatabase: function()
		{
			//progressCallback("InitDatabase - Start");
			
			//appmite.Global.SetDbInitialized(doneCallback);
			
			appmite.Tables.DefineTables([
                "category",
                "goals"
            ]);
			appmite.SqlLite.AddTables(appmite.Tables.Tables());
			//appmite.SqlLite.AddUpgrades(appmite.Tables.Upgrades());
			//appmite.SqlLite.ForceRebuild(DatabaseForceRebuild);
//			appmite.SqlLite.InitDatabase(DatabaseName,DatabaseVersion,DatabaseDescription,
//                function() {
//                    //alert('done: bootstrap angular');
//                    bootstrapAngular();
//                },
//                appmite.Global.ErrorHandler,
//                function(message) {
//                    //alert(message);
//                });
		}
	};
}();

appmite.Global.InitDatabase();

