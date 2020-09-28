module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define('board', {
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        boardTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        dateCreated: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        },
        tags: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        sharedBoard: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })

    // Board.associate = (models) => {
    
    //     Board.belongsTo(models.User, {
    //       foreignKey: 'owner',
    //     });
    //   };

    return Board;
};
