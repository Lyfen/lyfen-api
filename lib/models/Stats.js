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
				type: DataTypes.DOUBLE
	    },
	    cohortDeathPercentage: {
				type: DataTypes.DOUBLE
	    },
	    lifeSecondsRemaining: {
				type: DataTypes.DOUBLE
	    }
  	},{
    timestamps: false
	});
  return Stats;
};