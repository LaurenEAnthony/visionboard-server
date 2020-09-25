module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('items', {
        // owner: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        // boardId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        itemTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        photo: {
            type: DataTypes.STRING(1000),
            allowNull: true
        },
        dateCreated: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW 
        }
    })
    return Item;
};