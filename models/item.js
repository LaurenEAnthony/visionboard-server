module.exports = (sequelize, DataTypes) => {
    const Items = sequelize.define('items', {
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        itemTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        dateCreated: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW 
        },
        photo: {
            type: DataTypes.STRING(1000),
            allowNull: true
        }
    })
    return Items;
};