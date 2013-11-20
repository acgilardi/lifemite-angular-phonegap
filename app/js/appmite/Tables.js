appmite.Tables = function()
{
    var initTables;
    var tables = {};
    var upgrades = {};

    initTables = function (tableNameArray) {
        _.each(tableNameArray, function(tableName) {
            tables[tableName] = new TableDef(tableName);
        });
    };


	//var upgrades = [];
//		upgrades.push(appmite.Upgrade0_1.UpgradeDef());
//	}

	return {
        Table: function(name) { return tables[name]; },
		Tables: function() { return tables},
		Upgrades: function() { return upgrades; },
		DefineTables: function(tableNameArray) { initTables(tableNameArray); }
	}
}();