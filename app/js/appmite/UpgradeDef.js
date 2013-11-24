function UpgradeDef(fromVersion, toVersion) {
	this.FromVersion = fromVersion;
	this.ToVersion = toVersion;
	this.Steps = [];

    this.AddStep = function(sqlStatement) {
        this.Steps.push(sqlStatement);
    };

    this.AddSteps = function(sqlStatements) {
        _.each(sqlStatements, function(sqlStatement) {
            this.Steps.push(sqlStatement);
        }, this);
    };
}

//UpgradeDef.prototype.AddStep = function(sqlStatement) {
//    this.Steps.push(sqlStatement);
//};
//
//UpgradeDef.prototype.AddSteps = function(sqlStatements) {
//    _.each(sqlStatements, function(sqlStatement) {
//        this.Steps.push(sqlStatement);
//    }, this);
//};
