var bcrypt = require("bcryptjs"); // encript the password for safe data storage

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true // verrify proper email format
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false // require password to proceed
    }
  });

  // Relationships
  User.associate = function(models) {
    User.hasMany(models.Character, {
      onDelete: "cascade"
    });
  };

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};
