// Stats Model

// Holds mortality information from SSA.gov/oact

module.exports = function(sequelize, DataTypes) {
  var Stats = sequelize.define("Stats", {
	    age: {
	    	type: DataTypes.INTEGER
	    },
	    sex: {
	    	type: DataTypes.STRING
	    },
	    deathProbabilityPercentage: {
	    	type: DataTypes.INTEGER
	    },
	    cohortDeathPercentage: {
	    	type: DataTypes.INTEGER
	    },
	    lifeSecondsRemaining: {
	    	type: DataTypes.INTEGER
	    }
  	},{
    timestamps: false
	});
  return Stats;
};