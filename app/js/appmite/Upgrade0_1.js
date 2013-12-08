appmite.Upgrade0_1 = function()
{
	var Upgrade = new UpgradeDef(0,1);

    // Do nothing here: We are wiping out the tables and rebuilding
    // The database in Upgrade3_4

	return {
		UpgradeDef: function() {
            return Upgrade;
        }
	}
}();

