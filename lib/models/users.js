// User model

// The User has a "username" attribute of type DataTypes.String

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
	    username: {
	      type: DataTypes.STRING,
	      // If a customer is to be created, they must have a name
	      allowNull: false,
	      validate: {
	        len: [6,20]
	      },
	      unique: true
	    }, 
	    email: {
			  type: DataTypes.STRING,
			  allowNull: false,
			  unique: true
	    },
	    dob: {
	    	type: DataTypes.DATE
	    },
	    height: {
	    	type: DataTypes.INTEGER
	    },
	   	weight: {
	    	type: DataTypes.INTEGER
	    },
	    sex: {
	    	type: DataTypes.STRING
	    }
  	},{
    timestamps: false
	});
  return Users;
};
