module.exports = (sequelize, DataTypes) => {
    const Boards = sequelize.define('boards', {
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        boardId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        boartTitle: {
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
    return Boards;
};