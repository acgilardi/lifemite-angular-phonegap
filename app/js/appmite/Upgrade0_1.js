appmite.Upgrade0_1 = function()
{
	var Upgrade = new UpgradeDef(0,1);
	
	function SetPreSteps()
	{
		//We only fire these
		AddStep(appmite.Tables.TableSettings().DropSql());
		AddStep(appmite.Tables.TableProfile().DropSql());
		AddStep(appmite.Tables.TableCategory().DropSql());
		AddStep(appmite.Tables.TableThing().DropSql());
		AddStep(appmite.Tables.TableResources().DropSql());
		AddStep(appmite.Tables.TableTips().DropSql());
	};
	
	function SetCreateSteps()
	{
		//Setup Setting table
		appmite.Tables.TableSettings().AddField("SettingID",appmite.SqlLite.DataTypes().Integer,false,true,true);
		appmite.Tables.TableSettings().AddField("SettingName",appmite.SqlLite.DataTypes().Text,false,true,false);
		appmite.Tables.TableSettings().AddField("Desc",appmite.SqlLite.DataTypes().Text,true,false,false);
		appmite.Tables.TableSettings().AddField("Value",appmite.SqlLite.DataTypes().Text,true,false,false);
		
		//Setup Profile table
		appmite.Tables.TableProfile().AddField("ProfileID",appmite.SqlLite.DataTypes().Integer,false,true,true);
		appmite.Tables.TableProfile().AddField("ProfileName",appmite.SqlLite.DataTypes().Text,false,true,false);
		appmite.Tables.TableProfile().AddField("Person",appmite.SqlLite.DataTypes().Text,false,true,false);
		appmite.Tables.TableProfile().AddField("LowWeight",appmite.SqlLite.DataTypes().Integer,true,false,false);
		appmite.Tables.TableProfile().AddField("HighWeight",appmite.SqlLite.DataTypes().Integer,true,false,false);
		appmite.Tables.TableProfile().AddField("LastWeight",appmite.SqlLite.DataTypes().Integer,true,false,false);
		appmite.Tables.TableProfile().AddField("StartWeight",appmite.SqlLite.DataTypes().Integer,true,false,false);
		appmite.Tables.TableProfile().AddField("HvConfID",appmite.SqlLite.DataTypes().Text,true,false,false);

		//Setup group table
		appmite.Tables.TableCategory().AddField("GroupID",appmite.SqlLite.DataTypes().Integer,false,true,true);
		appmite.Tables.TableCategory().AddField("GroupName",appmite.SqlLite.DataTypes().Text,false,true,false);
		appmite.Tables.TableCategory().AddField("Desc",appmite.SqlLite.DataTypes().Text,false,false,false);
		appmite.Tables.TableCategory().AddField("Icon",appmite.SqlLite.DataTypes().Text,false,false,false);

		//Setup thing table
		appmite.Tables.TableThing().AddField("ThingID",appmite.SqlLite.DataTypes().Integer,false,true,true);
		appmite.Tables.TableThing().AddField("ThingName",appmite.SqlLite.DataTypes().Text,false,false,false);
		appmite.Tables.TableThing().AddField("Desc",appmite.SqlLite.DataTypes().Text,false,false,false);
		appmite.Tables.TableThing().AddField("GroupName",appmite.SqlLite.DataTypes().Text,false,false,false);
		appmite.Tables.TableThing().AddField("Icon",appmite.SqlLite.DataTypes().Text,false,false,false);
		appmite.Tables.TableThing().AddField("AllowMultiple",appmite.SqlLite.DataTypes().Integer,false,false,false);
		appmite.Tables.TableThing().AddField("IsMine",appmite.SqlLite.DataTypes().Integer,false,false,false);
		appmite.Tables.TableThing().AddField("IsActivity",appmite.SqlLite.DataTypes().Integer,false,false,false);
		appmite.Tables.TableThing().AddField("ActivityDate",appmite.SqlLite.DataTypes().Date,false,false,false);
		appmite.Tables.TableThing().AddField("Type",appmite.SqlLite.DataTypes().Text,false,false,false);
		appmite.Tables.TableThing().AddField("Properties",appmite.SqlLite.DataTypes().Text,false,false,false);
		appmite.Tables.TableThing().AddField("Days",appmite.SqlLite.DataTypes().Text,false,false,false,false);
		appmite.Tables.TableThing().AddField("LastUpdate",appmite.SqlLite.DataTypes().Date,false,false,false);
		appmite.Tables.TableThing().AddField("ThingIdGuid",appmite.SqlLite.DataTypes().Text,false,false,false);
		appmite.Tables.TableThing().AddField("ThingVersionGuid",appmite.SqlLite.DataTypes().Text,false,false,false);
		appmite.Tables.TableThing().AddField("Value",appmite.SqlLite.DataTypes().Text,false,false,false);
		appmite.Tables.TableThing().AddField("SyncDate",appmite.SqlLite.DataTypes().Date,false,false,false);
		appmite.Tables.TableThing().AddField("Syncable",appmite.SqlLite.DataTypes().Integer,false,false,false);
		appmite.Tables.TableThing().AddField("MetGoal",appmite.SqlLite.DataTypes().Integer,false,false,false);
		appmite.Tables.TableThing().AddField("IsMedication",appmite.SqlLite.DataTypes().Integer,false,false,false);
		appmite.Tables.TableThing().AddField("IsServing",appmite.SqlLite.DataTypes().Integer,false,false,false);
		appmite.Tables.TableThing().AddField("IsScheduled",appmite.SqlLite.DataTypes().Integer,false,false,false);
		appmite.Tables.TableThing().AddField("IsGoalTracked",appmite.SqlLite.DataTypes().Integer,false,false,false);
	
		//AddStep(appmite.Tables.TableSettings().DropSql);
		//AddStep(appmite.Tables.TableProfile().DropSql);
		//AddStep(appmite.Tables.TableCategory().DropSql);
		//AddStep(appmite.Tables.TableThing().DropSql);

		AddStep(appmite.Tables.TableSettings().CreateSql());
		AddStep(appmite.Tables.TableProfile().CreateSql());
		AddStep(appmite.Tables.TableCategory().CreateSql());
		AddStep(appmite.Tables.TableThing().CreateSql());
	};

	function SetPostSteps()
	{
		//Inserts for Groups
		AddStep( appmite.Tables.TableCategory().InsertSql({GroupName: "Exercise",Desc: "Exercise related entries", Icon: "exercise_32.png"} ));
		AddStep( appmite.Tables.TableCategory().InsertSql({GroupName: "Measurements",Desc: "All Measurements", Icon: "measurements_32.png"} ));
		AddStep( appmite.Tables.TableCategory().InsertSql({GroupName: "Diet",Desc: "Diet related", Icon: "diet_32.png"} ));
		AddStep( appmite.Tables.TableCategory().InsertSql({GroupName: "Medication",Desc: "Medication and vitamins", Icon: "medication_32.png"} ));
		AddStep( appmite.Tables.TableCategory().InsertSql({GroupName: "Lifestyle",Desc: "General lifestyle considerations", Icon: "lifestyle_32.png"} ));
		AddStep( appmite.Tables.TableCategory().InsertSql({GroupName: "Special",Desc: "Special programs to help your lifestyle", Icon: "special_32.png"} ));
			
		//Inserts for Settings
		AddStep( appmite.Tables.TableSettings().InsertSql({SettingName: "PrefsSet", Desc: "Did the user visit the Preferences yet.",Value: "false"} ));
		AddStep( appmite.Tables.TableSettings().InsertSql({SettingName: "Units", Desc: "Units for distance measurements",Value: 0} ));
		AddStep( appmite.Tables.TableSettings().InsertSql({SettingName: "ShowSplash", Desc: "Show the splash screen at startup",Value: "true"} ));
			
		//Inserts forThings 
			//Exercise and weight
			AddStep( appmite.Tables.TableThing().InsertSql({ThingName: "Timed Exercise",Desc: "Add a exercise tracked by time", GroupName: "Exercise", Icon: "time.png",AllowMultiple: 1,IsMine:0,IsActivity: 0, ActivityDate: "", Type:"timed",Properties: '{}',Days:'{"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":true,"sun":true}',LastUpdate:"",ThingIdGuid: "",ThingVersionGuid:"",Value: '0',SyncDate:'',Syncable:1, MetGoal:0, IsMedication:0, IsServing:0, IsScheduled:0, IsGoalTracked:1 }));
			AddStep( appmite.Tables.TableThing().InsertSql({ThingName: "Distance Exercise",Desc: "Add an exercise tracked by distance", GroupName: "Exercise", Icon: "distance.png",AllowMultiple: 1,IsMine:0,IsActivity: 0, ActivityDate: "",Type:"distance",Properties: '{}',Days:'{"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":true,"sun":true}',LastUpdate:"",ThingIdGuid: "",ThingVersionGuid:"",Value: '0', SyncDate:'',Syncable:1, MetGoal:0, IsMedication:0, IsServing:0, IsScheduled:0, IsGoalTracked:1 }));
			AddStep( appmite.Tables.TableThing().InsertSql({ThingName: "Calories Burned",Desc: "Add an exercise tracked by calories", GroupName: "Exercise", Icon: "calories.png",AllowMultiple: 1,IsMine:0,IsActivity: 0, ActivityDate: "",Type:"calories-burned",Properties: '{}',Days:'{"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":true,"sun":true}',LastUpdate:"",ThingIdGuid: "",ThingVersionGuid:"",Value: '0',SyncDate:'',Syncable:1, MetGoal:0, IsMedication:0, IsServing:0, IsScheduled:0, IsGoalTracked:1 }));
			//Lifestyle
			AddStep( appmite.Tables.TableThing().InsertSql({ThingName: "Journal",Desc: "Add a journal for daily entries", GroupName: "Lifestyle", Icon: "journal.png",AllowMultiple: 0,IsMine:0,IsActivity: 0, ActivityDate: "",Type:"journal",Properties: '{}',Days:'{"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":true,"sun":true}',LastUpdate:"",ThingIdGuid: "",ThingVersionGuid:"",Value: '',SyncDate:'',Syncable:0, MetGoal:0, IsMedication:0, IsServing:0, IsScheduled:0, IsGoalTracked:0 }));
			AddStep( appmite.Tables.TableThing().InsertSql({ThingName: "Family/Friends Time",Desc: "Add a goal for time with others", GroupName: "Lifestyle", Icon: "family.png",AllowMultiple: 1,IsMine:0,IsActivity: 0, ActivityDate: "",Type:"family",Properties: '{"people":[]}',Days:'{"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":true,"sun":true}',LastUpdate:"",ThingIdGuid: "",ThingVersionGuid:"",Value: '{}',SyncDate:'',Syncable:0, MetGoal:0, IsMedication:0, IsServing:0, IsScheduled:0, IsGoalTracked:1 }));	
			AddStep( appmite.Tables.TableThing().InsertSql({ThingName: "Spirituality/Meditation",Desc: "Add a goal for spiritual reflection", GroupName: "Lifestyle", Icon: "spirit.png",AllowMultiple: 1,IsMine:0,IsActivity: 0, ActivityDate: "",Type:"spirit",Properties: '{}',Days:'{"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":true,"sun":true}',LastUpdate:"",ThingIdGuid: "",ThingVersionGuid:"",Value: '{}',SyncDate:'',Syncable:0, MetGoal:0, IsMedication:0, IsServing:0, IsScheduled:0, IsGoalTracked:1 }));	
			//Special
			AddStep( appmite.Tables.TableThing().InsertSql({ThingName: "Cholesterol Down",Desc: "Add a cholesterol lowering diet", GroupName: "Special", Icon: "cholesteroldown.png",AllowMultiple: 0,IsMine:0,IsActivity: 0, ActivityDate: "",Type:"cholesteroldown",Properties: '{"sterols":false,"soy":false,"garlic":false,"psyllium":false,"oatmeal":false,"flaxseeds":false,"apple":false,"beans":false,"almonds":false,"walking":false}',Days:'{"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":true,"sun":true}',LastUpdate:"",ThingIdGuid: "",ThingVersionGuid:"",Value: '{}',SyncDate:'',Syncable:0, MetGoal:0, IsMedication:0, IsServing:0, IsScheduled:0,IsGoalTracked:1 }));
			AddStep( appmite.Tables.TableThing().InsertSql({ThingName: "Juicing Therapy",Desc: "Add a juicing detox or natural juice diet", GroupName: "Special", Icon: "juicing.png",AllowMultiple: 0,IsMine:0,IsActivity: 0, ActivityDate: "",Type:"juicetherapy",Properties: '{}',Days:'{"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":true,"sun":true}',LastUpdate:"",ThingIdGuid: "",ThingVersionGuid:"",Value: '{"value":0}',SyncDate:'',Syncable:0, MetGoal:0, IsMedication:0, IsServing:1, IsScheduled:0, IsGoalTracked:1 }));
			//Monthly Scheduled
			AddStep( appmite.Tables.TableThing().InsertSql({ThingName: "Weight",Desc: "Add and track your weight goal", GroupName: "Measurements", Icon: "scale.png",AllowMultiple: 0,IsMine:0,IsActivity: 0, ActivityDate: "",Type:"weight",Properties: '{}',Days:'{"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":true,"sun":true}',LastUpdate:"",ThingIdGuid: "",ThingVersionGuid:"",Value: '0',SyncDate:'',Syncable:1, MetGoal:0, IsMedication:0, IsServing:0, IsScheduled:1, IsGoalTracked:1 }));
			AddStep( appmite.Tables.TableThing().InsertSql({ThingName: "Cholesterol",Desc: "Add and track cholesterol levels", GroupName: "Measurements", Icon: "heart.png",AllowMultiple: 0,IsMine:0,IsActivity: 0, ActivityDate: "",Type:"cholesterol",Properties: '{}',Days:'{"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":true,"sun":true}',LastUpdate:"",ThingIdGuid: "",ThingVersionGuid:"",Value: '{"ldl":130,"hdl":60,"tri":150}',SyncDate:'',Syncable:1, MetGoal:0, IsMedication:0, IsServing:0, IsScheduled:1, IsGoalTracked:1 }));
			AddStep( appmite.Tables.TableThing().InsertSql({ThingName: "Blood Pressure",Desc: "Add and track your blood pressure", GroupName: "Measurements", Icon: "bloodpressure.png",AllowMultiple: 0,IsMine:0,IsActivity: 0, ActivityDate: "",Type:"bloodpressure",Properties: '{}',Days:'{"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":true,"sun":true}',LastUpdate:"",ThingIdGuid: "",ThingVersionGuid:"",Value: '{"sys":120,"dia":90}',SyncDate:'',Syncable:1, MetGoal:0, IsMedication:0, IsServing:0, IsScheduled:1, IsGoalTracked:1 }));
			//Servings based
			AddStep( appmite.Tables.TableThing().InsertSql({ThingName: "Fiber",Desc: "Add and track a daily fiber goal", GroupName: "Diet", Icon: "fiber.png",AllowMultiple: 0,IsMine:0,IsActivity: 0, ActivityDate: "",Type:"fiber",Properties: '{}',Days:'{"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":true,"sun":true}',LastUpdate:"",ThingIdGuid: "",ThingVersionGuid:"",Value: '{"value":0}',SyncDate:'',Syncable:0, MetGoal:0, IsMedication:0, IsServing:1, IsScheduled:0,IsGoalTracked:1 }));
			AddStep( appmite.Tables.TableThing().InsertSql({ThingName: "Vegetables",Desc: "Add and track a daily vegetable goal", GroupName: "Diet", Icon: "vegetables.png",AllowMultiple: 0,IsMine:0,IsActivity: 0, ActivityDate: "",Type:"vegetables",Properties: '{}',Days:'{"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":true,"sun":true}',LastUpdate:"",ThingIdGuid: "",ThingVersionGuid:"",Value: '{"value":0}',SyncDate:'',Syncable:0, MetGoal:0, IsMedication:0, IsServing:1, IsScheduled:0, IsGoalTracked:1 }));
			AddStep( appmite.Tables.TableThing().InsertSql({ThingName: "Fruit",Desc: "Add and track a daily fruit goal", GroupName: "Diet", Icon: "fruits.png",AllowMultiple: 0,IsMine:0,IsActivity: 0, ActivityDate: "",Type:"fruit",Properties: '{}',Days:'{"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":true,"sun":true}',LastUpdate:"",ThingIdGuid: "",ThingVersionGuid:"",Value: '{"value":0}',SyncDate:'',Syncable:0, MetGoal:0, IsMedication:0, IsServing:1, IsScheduled:0,IsGoalTracked:1 }));
			AddStep( appmite.Tables.TableThing().InsertSql({ThingName: "Water",Desc: "Add and track a daily water goal", GroupName: "Diet", Icon: "water.png",AllowMultiple: 0,IsMine:0,IsActivity: 0, ActivityDate: "",Type:"water",Properties: '{}',Days:'{"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":true,"sun":true}',LastUpdate:"",ThingIdGuid: "",ThingVersionGuid:"",Value: '{"value":0}',SyncDate:'',Syncable:0, MetGoal:0, IsMedication:0, IsServing:1, IsScheduled:0,IsGoalTracked:1 }));	
			//Medication based
			AddStep( appmite.Tables.TableThing().InsertSql({ThingName: "Medication",Desc: "Add and track a daily medication", GroupName: "Medication", Icon: "medication.png",AllowMultiple: 1,IsMine:0,IsActivity: 0, ActivityDate: "",Type:"medication",Properties: '{}',Days:'{"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":true,"sun":true}',LastUpdate:"",ThingIdGuid: "",ThingVersionGuid:"",Value: '{"morning":0,"noon":0,"evening":0,"night":0}',SyncDate:'',Syncable:0, MetGoal:0, IsMedication:1, IsServing:0, IsScheduled:0, IsGoalTracked:0 }));
			AddStep( appmite.Tables.TableThing().InsertSql({ThingName: "Vitamins/Supplements",Desc: "Add and track a daily suppliment", GroupName: "Medication", Icon: "vitamins.png",AllowMultiple: 1,IsMine:0,IsActivity: 0, ActivityDate: "",Type:"vitamins",Properties: '{}',Days:'{"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":true,"sun":true}',LastUpdate:"",ThingIdGuid: "",ThingVersionGuid:"",Value: '{"morning":0,"noon":0,"evening":0,"night":0}',SyncDate:'',Syncable:0, MetGoal:0, IsMedication:1, IsServing:0, IsScheduled:0, IsGoalTracked:0 }));	
	};
	
	function AddStep(sql)
	{
		Upgrade.AddStep(sql);
	};
		
	return {
		UpgradeDef: function(){ SetPreSteps(); SetCreateSteps(); SetPostSteps(); return Upgrade; }
	}
}();