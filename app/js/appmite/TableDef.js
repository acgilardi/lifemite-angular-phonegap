/**
 * author: 		Anthony Gilardi
 * website:		http://www.appmite.com
 * 
 * namespace:	am
 * version: 	2.0.0
 * 
 * classes: 	TableDef
 * 
 * notes:
 * 
 */

	function TableDef(name)
	{
		this.Name = name;
		this.fields = {};
		//this.InsertDefs = [];
		//this.KeyField = keyfield;
		this.KeyField = 'id';
		//this.upgrades = [];

        this.AddField = function(fieldName, dataType)
        {
            //this.fields[fieldName] = {};
            this.fields[fieldName] = {
                name: fieldName,
                datatype: dataType.type,
                nullable: !dataType.required,
                unique: dataType.unique,
                key: dataType.key,
                fkey: dataType.fkey
            };

            return this.fields[fieldName];
        };


        this.DropSql = function()
        {
            var sql = "DROP TABLE IF EXISTS [" + this.Name + "];";
            return sql;
        };


	}

//TableDef.prototype.AddUpgrade = function(upgradeDef)
//{
//    this.upgrades.push(upgradeDef);
//};
	

	
	TableDef.prototype.AddFieldSql = function(fieldName,dataType,nullable,unique,key)
	{
		var field = this.AddField(fieldName,dataType,nullable,unique,key);
		var sql = "ALTER TABLE [" + this.Name + "] ADD {0};";

		var sqlField = field.name + " ";
		
		if( field.key)
			sqlField += "INTEGER PRIMARY KEY AUTOINCREMENT ";
		else
			sqlField +=  field.datatype + " "
			
		if( field.nullable)
			sqlField += "NOT NULL ";
			
		if( field.unique)
			sqlField += "UNIQUE ";

		return String.format(sql,sqlField);
	};
	
	TableDef.prototype.RemoveField = function(fieldName)
	{
		delete this.fields[fieldName];
	};
	
	TableDef.prototype.BackupSql = function()
	{
		//CREATE TABLE demo_backup
 		//AS SELECT * FROM demo; 
 
		var sql = "CREATE TABLE [bkup_" + this.Name + "] AS SELECT * FROM [" + this.Name + "];";	
		return sql;	
	};
	
	TableDef.prototype.DropBackupSql = function()
	{
		var sql = "DROP TABLE IF EXISTS [bkup_" + this.Name + "];";	
		return sql;	
	};
	

	
	TableDef.prototype.CreateSql = function()
	{
		var sql = "CREATE TABLE [" + this.Name + "] ({0});";
		
		var sqlFields = "";
		for(var field in this.fields) 
		{	
			sqlFields +=  this.fields[field].name + " "
			
			if( this.fields[field].key)
				sqlFields += "INTEGER PRIMARY KEY AUTOINCREMENT ";
			else
				sqlFields +=  this.fields[field].datatype + " "
				
			if(!this.fields[field].nullable)
				sqlFields += "NOT NULL ";
				
			if( this.fields[field].unique)
				sqlFields += "UNIQUE ";
				
			sqlFields += ","
		}
		
		sqlFields = sqlFields.slice(0, -1)
		 
		return String.format(sql,sqlFields);
	};
	
	// values = Object wher property name is field name and property value is value
	TableDef.prototype.InsertSql = function(values)
	{
		var sql = "INSERT INTO [" + this.Name + "] ({0}) VALUES ({1});";
		var sqlFields = "";		
		var sqlValues = "";
		
		for(var value in values)
		{
            console.log("Insert: " + this.Name + ", " + value + ", " + this.fields[value] + "," + this.fields[value].name);

			sqlFields +=  this.fields[value].name + ","
			
			switch(this.fields[value].datatype)
			{			
				case appmite.SqlLite.DataTypes().INTEGER:
				case appmite.SqlLite.DataTypes().INTEGER_REQ:
					sqlValues += values[value].toString() + ",";
					break;
					
				case appmite.SqlLite.DataTypes().BOOL:
					if(values[value])
						sqlValues += "1,";
					else
						sqlValues += "0,";
					break;
					
				default:
					sqlValues += "'" + values[value].toString() + "',";
					break;
			}
		}

		sql = String.format(sql,sqlFields.slice(0,-1),sqlValues.slice(0,-1));
		
		return sql;
	};
	
	TableDef.prototype.UpdateSql = function(values,andClauses)
	{
		var sql = "UPDATE [" + this.Name + "] SET {0} WHERE {1};";
		var sqlValues = "";		
		var sqlAndClauses = "";
		
		var PkField = this.Name + "ID";
		for(var value in values)
		{
			if(value == PkField)
				continue;
				
			if(this.fields[value] == undefined)
				continue;
			
			switch(this.fields[value].datatype)
			{			
				case appmite.SqlLite.DataTypes().INTEGER:
                case appmite.SqlLite.DataTypes().INTEGER_REQ:
					sqlValues += this.fields[value].name + "=" + values[value].toString() + ",";
					break;
					
				case appmite.SqlLite.DataTypes().BOOL:
					if(values[value])
						sqlValues += this.fields[value].name + "=1,";
					else
						sqlValues += this.fields[value].name + "=0,";
					break;
					
				default:
					sqlValues += this.fields[value].name + "='" + values[value].toString() + "',";
					break;
			}
		}
		
		for(var clause in andClauses)
		{
			switch(this.fields[clause].datatype)
			{			
				case appmite.SqlLite.DataTypes().INTEGER:
				case appmite.SqlLite.DataTypes().INTEGER_REQ:
					sqlAndClauses += this.fields[clause].name + "=" + andClauses[clause].toString() + " AND ";
					break;
					
				case appmite.SqlLite.DataTypes().BOOL:
					if(andClauses[clause])
						sqlAndClauses += this.fields[clause].name + "=1 AND ";
					else
						sqlAndClauses += this.fields[clause].name + "=0 AND ";
					break;
					
				default:
					sqlAndClauses += this.fields[clause].name + "='" + andClauses[clause].toString() + "' AND ";
					break;
			}
		}

		sql = String.format(sql,sqlValues.slice(0,-1),sqlAndClauses.slice(0,-4));
		
		return sql;
	};
	
	TableDef.prototype.DeleteSql = function(values,andClauses)
	{
		var sql = "DELETE FROM [" + this.Name + "] WHERE {0};";
		var sqlValues = "";		
		var sqlAndClauses = "";
		
		var PkField = this.Name + "ID";
		
		for(var clause in andClauses)
		{
			switch(this.fields[clause].datatype)
			{			
				case appmite.SqlLite.DataTypes().INTEGER:
				case appmite.SqlLite.DataTypes().INTEGER_REQ:
					sqlAndClauses += this.fields[clause].name + "=" + andClauses[clause].toString() + " AND ";
					break;
					
				case appmite.SqlLite.DataTypes().BOOL:
					if(andClauses[clause])
						sqlAndClauses += this.fields[clause].name + "=1 AND ";
					else
						sqlAndClauses += this.fields[clause].name + "=0 AND ";
					break;
					
				default:
					sqlAndClauses += this.fields[clause].name + "='" + andClauses[clause].toString() + "' AND ";
					break;
			}
		}

		sql = String.format(sql,sqlAndClauses.slice(0,-4));
		
		return sql;
	};
	