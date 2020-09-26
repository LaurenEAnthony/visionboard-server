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
    return Board;
};
