appmite.Tables = function()
{
	//Setup Setting table
	var tableSetting = new TableDef("Setting","1","","SettingName");
	var tableProfile = new TableDef("Profile","1","","ProfileName");
	var tableCategory = new TableDef("Group","1","","GroupName");
	var tableThing = new TableDef("Thing","1","","ThingName");
	var tableResource = new TableDef("Resource","2","","ResourceName");
	var tableTip = new TableDef("Tip","2","","TipName");
	//var tableBadge = new TableDef("Badge","3","","BadgeName");
	
	var tables = [];
	var upgrades = [];
	
	function initTables()
	{
		tables.push(tableSetting);
		tables.push(tableProfile);
		tables.push(tableCategory);
		tables.push(tableThing);
		tables.push(tableResource);
		tables.push(tableTip);
		//tables.push(tableBadge);
		
		upgrades.push(appmite.Upgrade0_1.UpgradeDef());
		upgrades.push(appmite.Upgrade1_2.UpgradeDef());	
		upgrades.push(appmite.Upgrade2_3.UpgradeDef());
	};
	

	return {
		TableSettings: function(){ return tableSetting; },
		TableProfile: function(){ return tableProfile; },
		TableCategory: function(){ return tableCategory; },
		TableThing: function(){ return tableThing; },
		TableResources: function(){ return tableResource; },
		TableTips: function(){ return tableTip; },
		//TableBadge: function(){ return tableBadge; },
		
		Tables: function(){ return tables},
		Upgrades: function(){ return upgrades; },
		DefineTables: function(){ initTables(); }	
	}
}();