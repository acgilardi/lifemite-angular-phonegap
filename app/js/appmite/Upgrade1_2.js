appmite.Upgrade1_2 = function()
{
    var Upgrade = new UpgradeDef(1,2);

    // Do nothing here: We are wiping out the tables and rebuilding
    // The database in Upgrade3_4

    return {
        UpgradeDef: function() {
            return Upgrade;
        }
    }
}();