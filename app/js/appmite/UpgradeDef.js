
function UpgradeDef(fromVersion,toVersion)
{
	this.FromVersion = fromVersion;
	this.ToVersion = toVersion;
	this.Steps = [];
};

UpgradeDef.prototype.AddStep = function(sqlStatement)
{
	this.Steps.push(sqlStatement);
};