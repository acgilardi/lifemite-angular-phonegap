appmite.Upgrade0_1 = function()
{
	var Upgrade = new UpgradeDef(0,1);
	
	function SetPreSteps()
	{
		// Drop tables if they exist
        Upgrade.AddSteps(appmite.SqlLite.DropAllTablesSql([
            "category",
            "goal",
            "goalproperty"
        ]));
	}
	
	function SetCreateSteps()
	{
        var typ = appmite.SqlLite.DataTypes();

        Upgrade.AddSteps(
            appmite.SqlLite.CreateTables({
                "category": {
                    id: typ.P_KEY,
                    name: typ.TEXT_UNIQUE,
                    description: typ.TEXT,
                    icon: typ.TEXT
                },
                "goal": {
                    id: typ.P_KEY,
                    profile_id: typ.F_KEY,
                    template_id: typ.F_KEY,
                    title: typ.TEXT_REQ,
                    description: typ.TEXT,
                    goaldate: typ.DATE,
                    syncdate: typ.DATETIME,
                    metgoal: typ.BOOL,
                    thingid_guid: typ.TEXT,
                    thingversion_guild: typ.TEXT,
                    lastupdate: typ.DATE
                },
                "goalproperty": {
                    id: typ.P_KEY,
                    goal_id: typ.F_KEY,
                    type: typ.TEXT_REQ,
                    value: typ.TEXT,
                    initialvalue: typ.TEXT
                },
                "preference": {
                    id: typ.P_KEY,
                    name: typ.TEXT_UNIQUE,
                    description: typ.TEXT_REQ,
                    value: typ.TEXT,
                    initialvalue: typ.TEXT
                },
                "profile": {
                    id: typ.P_KEY,
                    name: typ.TEXT_UNIQUE
                },
                "schedule": {
                    id: typ.P_KEY,
                    template_id: typ.F_KEY,
                    profile_id: typ.F_KEY,
                    days: typ.INTEGER,
                    title: typ.TEXT,
                    description: typ.TEXT,
                    startdate: typ.DATE,
                    enddate: typ.DATE,
                    frequency: typ.TEXT,
                    repeat: typ.INTEGER,
                    interval: typ.INTEGER,
                    endtype: typ.TEXT,
                    endeventcount: typ.INTEGER
                },
                "scheduleproperty": {
                    id: typ.P_KEY,
                    schedule_id: typ.F_KEY,
                    type: typ.TEXT_REQ,
                    goalvalue: typ.TEXT
                },
                "template": {
                    id: typ.P_KEY,
                    type: typ.TEXT,
                    description: typ.TEXT,
                    category_id: typ.F_KEY,
                    icon: typ.TEXT,
                    ismedication: typ.BOOL,
                    isserving: typ.BOOL,
                    isscheduled: typ.BOOL,
                    isgoaltracked: typ.BOOL,
                    issyncable: typ.BOOL,
                    syncapi: typ.TEXT,
                    allowmultiple: typ.BOOL,
                    title: typ.TEXT
                },
                "templateproperty": {
                    id: typ.P_KEY,
                    template_id: typ.F_KEY,
                    type: typ.TEXT_REQ,
                    initvalue: typ.TEXT
                }
            })
        );
	}

	function SetPostSteps()
	{
        var inserts =
        {
            "category":[
                {
                    "id": 1,
                    "name": appmite.Global.Loc().__("cat-exercise-name"),
                    "description": appmite.Global.Loc().__("cat-exercise-desc"),
                    "icon":"exercise_48.png"
                },
                {
                    "id": 2,
                    "name":"Measurements",
                    "description":"All Measurements",
                    "icon":"measurements_48.png"
                },
                {
                    "id": 3,
                    "name":"Diet",
                    "description":"Diet Related",
                    "icon":"diet_48.png"
                },
                {
                    "id": 4,
                    "name":"Medication",
                    "description":"Medication and Vitamins",
                    "icon":"medication_48.png"
                },
                {
                    "id": 5,
                    "name":"Lifestyle",
                    "description":"General Lifestyle",
                    "icon":"lifestyle_48.png"
                },
                {
                    "id": 6,
                    "name":"Checklist",
                    "description":"Checklist Goals",
                    "icon":"checklist_48.png"
                }
            ],
            "preference": [
                {
                    "name": "PrefsSet",
                    "description": "Did the user visit the preferences yet",
                    "value": false,
                    "initialvalue": false
                },
                {
                    "name": "Units",
                    "description": "Units for distance measurements",
                    "value": "standard",
                    "initialvalue": "standard"
                },
                {
                    "name": "ShownStartup",
                    "description": "Shown the startup screen(s)",
                    "value": false,
                    "initialvalue": false
                }
            ],
            "templates": [
                {
                    "id": 1,
                    "type": "timed",
                    "description": appmite.Global.Loc().__("Hello"),
                    "category_id": "1",
                    "icon": "timed_48",
                    "ismedication": false,
                    "isserving": false,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": true,
                    "syncapis": "",
                    "allowmultiple": true,
                    "title": "Timed Exercise"
                },
                {
                    "id": 2,
                    "type": "distance",
                    "description": "Exercise tracked by distance",
                    "category_id": "1",
                    "icon": "distance_48",
                    "ismedication": false,
                    "isserving": false,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": true,
                    "syncapis": "",
                    "allowmultiple": true,
                    "title": "Distance Exercise"
                },
                {
                    "id": 3,
                    "type": "calories",
                    "description": "Exercise tracked by calories burned",
                    "category_id": "1",
                    "icon": "calories_48",
                    "ismedication": false,
                    "isserving": false,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": true,
                    "syncapis": "",
                    "allowmultiple": true,
                    "title": "Calories Burned Exercise"
                },
                {
                    "id": 4,
                    "type": "fiber",
                    "description": "Daily fiber goal",
                    "category_id": "3",
                    "icon": "fiber_48",
                    "ismedication": false,
                    "isserving": true,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": false,
                    "title": "Fiber"
                },
                {
                    "id": 5,
                    "type": "vegetables",
                    "description": "Add and track a daily vegetable goal",
                    "category_id": "3",
                    "icon": "vegetables_48",
                    "ismedication": false,
                    "isserving": true,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": false,
                    "title": "Vegetables"
                },
                {
                    "id": 6,
                    "type": "fruit",
                    "description": "Add and track a daily fruit goal",
                    "category_id": "3",
                    "icon": "fruit_48",
                    "ismedication": false,
                    "isserving": true,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": false,
                    "title": "Fruit"
                },
                {
                    "id": 7,
                    "type": "water",
                    "description": "Add and track a daily water goal",
                    "category_id": "3",
                    "icon": "water_48",
                    "ismedication": false,
                    "isserving": true,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": false,
                    "title": "Water"
                },
                {
                    "id": 8,
                    "type": "juicing",
                    "description": "Add a juicing detox or natural juice diet",
                    "category_id": "3",
                    "icon": "juicing_48",
                    "ismedication": false,
                    "isserving": true,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": false,
                    "title": "Juicing Therapy"
                },
                {
                    "id": 9,
                    "type": "medication",
                    "description": "Add and track a daily medication",
                    "category_id": "4",
                    "icon": "medication_48",
                    "ismedication": true,
                    "isserving": false,
                    "isscheduled": false,
                    "isgoaltracked": false,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": true,
                    "title": "Medication"
                },
                {
                    "id": 10,
                    "type": "vitamins",
                    "description": "Add and track a daily suppliment",
                    "category_id": "4",
                    "icon": "vitamins_48",
                    "ismedication": true,
                    "isserving": false,
                    "isscheduled": false,
                    "isgoaltracked": false,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": true,
                    "title": "Vitamins"
                },
                {
                    "id": 11,
                    "type": "cholesteroldown",
                    "description": "Add a cholesterol lowering diet",
                    "category_id": "3",
                    "icon": "cholesteroldown_48",
                    "ismedication": false,
                    "isserving": false,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": false,
                    "title": "Cholesterol Down"
                },
                {
                    "id": 12,
                    "type": "journal",
                    "description": "Add daily journal entry",
                    "category_id": "5",
                    "icon": "journal_48",
                    "ismedication": false,
                    "isserving": false,
                    "isscheduled": false,
                    "isgoaltracked": false,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": false,
                    "title": "Journal Entry"
                },
                {
                    "id": 13,
                    "type": "family",
                    "description": "Add a goal for time with others",
                    "category_id": "5",
                    "icon": "family_48",
                    "ismedication": false,
                    "isserving": false,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": false,
                    "title": "Family"
                },
                {
                    "id": 14,
                    "type": "spirituality",
                    "description": "Add a goal for spiritual reflection",
                    "category_id": "5",
                    "icon": "spirituality_48",
                    "ismedication": false,
                    "isserving": true,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": true,
                    "title": "Spirituality"
                },
                {
                    "id": 15,
                    "type": "weight",
                    "description": "Add and track your weight goal",
                    "category_id": "2",
                    "icon": "weight_48",
                    "ismedication": false,
                    "isserving": false,
                    "isscheduled": true,
                    "isgoaltracked": true,
                    "issyncable": true,
                    "syncapis": "",
                    "allowmultiple": false,
                    "title": "Weight"
                },
                {
                    "id": 16,
                    "type": "cholesterol",
                    "description": "Add and track cholesterol levels",
                    "category_id": "2",
                    "icon": "cholesterol_48",
                    "ismedication": false,
                    "isserving": false,
                    "isscheduled": true,
                    "isgoaltracked": true,
                    "issyncable": true,
                    "syncapis": "",
                    "allowmultiple": false,
                    "title": "Weight"
                },
                {
                    "id": 17,
                    "type": "bloodpressure",
                    "description": "Add and track your blood pressure",
                    "category_id": "2",
                    "icon": "bloodpressure_48",
                    "ismedication": false,
                    "isserving": false,
                    "isscheduled": true,
                    "isgoaltracked": true,
                    "issyncable": true,
                    "syncapis": "",
                    "allowmultiple": true,
                    "title": "Blood Pressure"
                },
                {
                    "id": 18,
                    "type": "checkitem",
                    "description": "Add a checklist item",
                    "category_id": "6",
                    "icon": "checkitem_48",
                    "ismedication": false,
                    "isserving": false,
                    "isscheduled": false,
                    "isgoaltracked": true,
                    "issyncable": false,
                    "syncapis": "",
                    "allowmultiple": true,
                    "title": "Checklist Item"
                }
            ],
            "templateproperty": [
                {
                    "template_id": 9,
                    "type": "morn",
                    "initvalue": "0"
                },
                {
                    "template_id": 9,
                    "type": "noon",
                    "initvalue": "0"
                },
                {
                    "template_id": 9,
                    "type": "night",
                    "initvalue": "0"
                },
                {
                    "template_id": 10,
                    "type": "morn",
                    "initvalue": "0"
                },
                {
                    "template_id": 10,
                    "type": "noon",
                    "initvalue": "0"
                },
                {
                    "template_id": 10,
                    "type": "night",
                    "initvalue": "0"
                },
                {
                    "template_id": 11,
                    "type": "cd_sterols",
                    "initvalue": "0"
                },
                {
                    "template_id": 11,
                    "type": "cd_soy",
                    "initvalue": "0"
                },
                {
                    "template_id": 11,
                    "type": "cd_garlic",
                    "initvalue": "0"
                },
                {
                    "template_id": 11,
                    "type": "cd_psyllium",
                    "initvalue": "0"
                },
                {
                    "template_id": 11,
                    "type": "cd_oatmeal",
                    "initvalue": "0"
                },
                {
                    "template_id": 11,
                    "type": "cd_flaxseed",
                    "initvalue": "0"
                },
                {
                    "template_id": 11,
                    "type": "cd_apple",
                    "initvalue": "0"
                },
                {
                    "template_id": 11,
                    "type": "cd_beans",
                    "initvalue": "0"
                },
                {
                    "template_id": 11,
                    "type": "cd_almonds",
                    "initvalue": "0"
                },
                {
                    "template_id": 11,
                    "type": "cd_walking",
                    "initvalue": "0"
                },
                {
                    "template_id": 16,
                    "type": "ldl",
                    "initvalue": "130"
                },
                {
                    "template_id": 16,
                    "type": "hdl",
                    "initvalue": "60"
                },
                {
                    "template_id": 16,
                    "type": "triglycerides",
                    "initvalue": "150"
                },
                {
                    "template_id": 17,
                    "type": "systolic",
                    "initvalue": "120"
                },
                {
                    "template_id": 17,
                    "type": "diastolic",
                    "initvalue": "80"
                }
            ]
        };
	}
		
	return {
		UpgradeDef: function() {
            SetPreSteps();
            SetCreateSteps();
            SetPostSteps();
            return Upgrade;
        }
	}
}();

appmite.SqlLite.AddUpgrade(appmite.Upgrade0_1.UpgradeDef());
