

appmite.Global = function()
{
	//Database version
	var DatabaseForceRebuild  = true;
	var DatabaseVersion = 4;
	var DatabaseName = "lifeMiteDB";
	var DatabaseDescription = "";
	var DbInitCallback = {};
	var ActiveProfile = "";


    var locale = undefined;



    var bootstrapAngular = function() {
        angular.element(document).ready(function() {
            angular.bootstrap(document, ['lifemiteAngularPhonegapApp']);
        });
    };

	
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

        Loc: function() { return locale; },

		InitDatabase: function()
		{
            // Set the locale from browser
            var lang = navigator.language.toLowerCase();



            locale = new I18n({
                //these are the default values, you can omit
                directory: "locales",
                locale: lang,
                extension: ".json"
            });

            // Build or init database
            appmite.SqlLite.ForceRebuild(DatabaseForceRebuild);
            appmite.SqlLite.AddUpgrade(appmite.Upgrade0_1.UpgradeDef());
            appmite.SqlLite.AddUpgrade(appmite.Upgrade1_2.UpgradeDef());
            appmite.SqlLite.AddUpgrade(appmite.Upgrade2_3.UpgradeDef());
            appmite.SqlLite.AddUpgrade(appmite.Upgrade3_4.UpgradeDef());
            appmite.SqlLite.InitDatabase(DatabaseName,DatabaseVersion,DatabaseDescription,
                function() {
                    console.log("Global.InitDatabase: Success Initializing SqlLite Database");
                    //bootstrapAngular();
                },
                function(a,b,c) {
                    alert('Global.InitDatabase: Error fetching data');
                    console.log(a);
                    console.log(b);
                    console.log(c);
                },
                function(message) {
                    console.log(message);
                });

           bootstrapAngular();
		}
	};
}();

appmite.Global.InitDatabase();


