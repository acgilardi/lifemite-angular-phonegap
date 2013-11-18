appmite.Upgrade1_2 = function()
{
	var languages = {"English":"english","French":"french","Spanish":"spanish","German":"german"};
		
	var Upgrade = new UpgradeDef(1,2);
	
	function SetPreSteps()
	{
		//AddStep(appmite.Tables.TableThing().BackupSql());
		//AddStep(appmite.Tables.TableThing().DropSql());
	};
	
	function SetCreateSteps()
	{
		//Setup Tip Table
		appmite.Tables.TableTips().AddField("TipID",appmite.SqlLite.DataTypes().Integer,false,true,true);
		appmite.Tables.TableTips().AddField("TipName",appmite.SqlLite.DataTypes().Text,false,true,false);
		appmite.Tables.TableTips().AddField("Resource",appmite.SqlLite.DataTypes().Text,false,false,false);
		appmite.Tables.TableTips().AddField("Desc",appmite.SqlLite.DataTypes().Text,false,false,false);
		appmite.Tables.TableTips().AddField("Shown",appmite.SqlLite.DataTypes().Integer,false,false,false);
		
		//Setup Resources table
		appmite.Tables.TableResources().AddField("ResourceID",appmite.SqlLite.DataTypes().Integer,false,true,true);
		appmite.Tables.TableResources().AddField("ResourceName",appmite.SqlLite.DataTypes().Text,false,true,false);
		appmite.Tables.TableResources().AddField("Language",appmite.SqlLite.DataTypes().Text,false,false,false);
		appmite.Tables.TableResources().AddField("Value",appmite.SqlLite.DataTypes().Text,false,false,false);
		

		AddStep(appmite.Tables.TableTips().CreateSql());
		AddStep(appmite.Tables.TableResources().CreateSql());
	};

	function SetPostSteps()
	{
		//Inserts for Tips
		AddStep( appmite.Tables.TableTips().InsertSql({TipName: "DeleteMyGoal", Resource:"TipDeleteGoal", Desc: "Tip for when you delete a goal for the first time.", Shown: 0}));
		AddStep( appmite.Tables.TableTips().InsertSql({TipName: "DeleteDayGoal", Resource:"TipDeleteDayGoal", Desc: "Tip for when you delete a day goal for the first time.", Shown: 0}));
		AddStep( appmite.Tables.TableTips().InsertSql({TipName: "EarlierDay", Resource:"TipEarlierDay", Desc: "When you navigate to an earlier day and there are new goals.", Shown: 0}));
		AddStep( appmite.Tables.TableTips().InsertSql({TipName: "LaterDay", Resource:"TipLaterDay", Desc: "When you navigate to a date past the allowable future days.", Shown: 0}));
		
		
		
		//English
			AddResource("splashLoading",languages.English,"Loading Data ...");
			//Prefs
			AddResource("prefsTitle",languages.English,"Preferences");
			AddResource("prefsDescription",languages.English,"Setup preferences");
			AddResource("prefsWelcome",languages.English,"Welcome to lifeMite");
			AddResource("prefsUnits",languages.English,"Select your units of measurement");
			AddResource("prefsResetTips", languages.English,"Reset/Show All Tips again");
			//Profile
			AddResource("profileTitle",languages.English,"Profile");
			AddResource("profileDescription",languages.English,"Create a Profile");
			AddResource("profileNameHint",languages.English,"Enter your name")
			AddResource("profileWelcome",languages.English,"Welcome to lifeMite.<br/>You must create a profile.");
			AddResource("profileWeight",languages.English,"Your Current Weight?");
			AddResource("profileValName",languages.English,"A name is required.");
			//Today
			AddResource("todayJumpToDate",languages.English,"Jump to Date");
			AddResource("todayToday",languages.English,"Today");
			AddResource("todayYesterday",languages.English,"Yesterday");
			AddResource("todayTomorrow",languages.English,"Tomorrow");
			//Buttons
			AddResource("buttonDone",languages.English,"Done");
			AddResource("buttonCancel",languages.English,"Cancel");
			AddResource("buttonAddGoal",languages.English,"Add A New Personal Goal");
			AddResource("buttonManageGoals",languages.English,"Manage My Personal Goals");
			//Groups
			AddResource("groupAll",languages.English,"All");
			AddResource("groupExercise",languages.English,"Exercise");
			AddResource("groupMeasurements",languages.English,"Measurements");
			AddResource("groupDiet",languages.English,"Diet");
			AddResource("groupMedication",languages.English,"Medication");
			AddResource("groupLifestyle",languages.English,"Lifestyle");
			AddResource("groupSpecial",languages.English,"Special");
			//ScheduleGoals
			AddResource("scheduleTitle",languages.English,"Schedule");
			AddResource("scheduleDescription", languages.English,"Goals I have scheduled");
			//Tips
			AddResource("TipDeleteGoal",languages.English,"This will only delete the sheduled goal and will not affect the daily history.");
			AddResource("TipDeleteDayGoal",languages.English,"You are deleting a daily goal that you set for yourself. This may be necessary in some cases. But in general you should fullfil the goals you set for yourself.");
			AddResource("TipEarlierDay",languages.English,"You have navigated to date that is earlier than to today. New goals will not be added to dates in the past.");
			AddResource("TipLaterDay",languages.English,"You can only view dates up to one week in advance.");
		
		
		//Fix the Thing table
		AddStep(appmite.Tables.TableThing().AddFieldSql("IsDeleted",appmite.SqlLite.DataTypes().Integer,false,false,false));
		AddStep("UPDATE [Thing] SET IsDeleted = 0");
		
		var chars = ['~','!','#','$','%','^','&','*','(',')','+','{','}','[',']','|','<','>',':',';','?','/','\\'];
		
		for(var c in chars)
		{
			var replaceSql = 'UPDATE [Thing] SET ThingName = "replace"(ThingName,"' + chars[c] + '","-")'
			AddStep(replaceSql);	
		}
		
		//Add a new field in profile for male or female
		AddStep(appmite.Tables.TableProfile().AddFieldSql("Sex",appmite.SqlLite.DataTypes().Text,false,false,false));
		AddStep("UPDATE [Profile] SET Sex = 'male'");
		
		//Add a new row in Groups for Custom
		AddStep( appmite.Tables.TableCategory().InsertSql({GroupName: "Checklist",Desc: "Custom daily checklist", Icon: "checklist_32.png"} ));
		
		//Add Thing for Checklist
		AddStep( appmite.Tables.TableThing().InsertSql({ThingName: "Checklist Item",Desc: "Add item to my checklist", GroupName: "Checklist", Icon: "checkitem.png",AllowMultiple: 1,IsMine:0,IsActivity: 0, ActivityDate: "", Type:"checklist",Properties: '{}',Days:'{"mon":true,"tue":true,"wed":true,"thu":true,"fri":true,"sat":true,"sun":true}',LastUpdate:"",ThingIdGuid: "",ThingVersionGuid:"",Value: '0',SyncDate:'',Syncable:0, MetGoal:0, IsMedication:0, IsServing:0, IsScheduled:0, IsGoalTracked:1, IsDeleted:0 }));
	};
	
	function AddStep(sql)
	{
		Upgrade.AddStep(sql);
	}
	
	function AddResource(name,language,value)
	{
		AddStep( appmite.Tables.TableResources().InsertSql({ResourceName: name, Language: language,Value: value} ));
	};

	return {
		UpgradeDef: function(){ SetPreSteps(); SetCreateSteps(); SetPostSteps(); return Upgrade; }
	}
}();