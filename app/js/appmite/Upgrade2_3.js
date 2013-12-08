appmite.Upgrade2_3 = function()
{
    var Upgrade = new UpgradeDef(2,3);

    // Do nothing here: We are wiping out the tables and rebuilding
    // The database in Upgrade3_4

    return {
        UpgradeDef: function() {
            return Upgrade;
        }
    }
}();