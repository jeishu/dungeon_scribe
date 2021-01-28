module.exports = function(sequelize, DataTypes) {
    var Character = sequelize.define("Character", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      }
    });

     // Relationships
    Character.associate = function(models) {
        Character.hasMany(models.Note, {
            onDelete: "cascade"
        });

        Character.hasMany(models.Favorite, {
            onDelete: "cascade"
        });

        Character.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Character;
  };
  
