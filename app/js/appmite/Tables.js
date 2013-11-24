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

    dropAllSql = function() {
        var sqlSteps = [];
        _.each(appmite.Tables(), function(table) {
            sqlSteps.push(appmite.Table(table.Name).DropSql());
        });

        return sqlSteps;
    };


	//var upgrades = [];
	//upgrades.push(appmite.Upgrade0_1.UpgradeDef());

	return {
        DropAllSql: function() { return dropAllTables; },
        Table: function(name) { return tables[name]; },
		Tables: function() { return tables},
		Upgrades: function() { return upgrades; },
		DefineTables: function(tableNameArray) { initTables(tableNameArray); }
	}
}();