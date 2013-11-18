appmite.Upgrade2_3 = function()
{
	var languages = {"English":"english","French":"french","Spanish":"spanish","German":"german"};
		
	var Upgrade = new UpgradeDef(2,3);
	
	function SetPreSteps()
	{
		//AddStep(appmite.Tables.TableBadge().DropSql());
	};
	
	function SetCreateSteps()
	{
		//Setup Badge Table
		//appmite.Tables.TableTips().AddField("BadgeID",appmite.SqlLite.DataTypes().Integer,false,true,true);
		//appmite.Tables.TableTips().AddField("BadgeName",appmite.SqlLite.DataTypes().Text,false,true,false);
		//appmite.Tables.TableTips().AddField("Sql",appmite.SqlLite.DataTypes().Text,false,false,false);
		//appmite.Tables.TableTips().AddField("Image",appmite.SqlLite.DataTypes().Text,false,false,false);
		//appmite.Tables.TableTips().AddField("Success",appmite.SqlLite.DataTypes().Integer,false,false,false);
	};

	function SetPostSteps()
	{	
		//Nag screen Setting
		AddStep( appmite.Tables.TableSettings().InsertSql({SettingName: "ShowNag", Desc: "Show the nag screen at startup for free version",Value: "true"} ));
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