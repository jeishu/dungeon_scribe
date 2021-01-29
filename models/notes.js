module.exports = function (sequelize, DataTypes) {
  var Note = sequelize.define("Note", {
    note: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  // Relationships
  Note.associate = function (models) {
    Note.belongsTo(models.Character, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Note;
};
