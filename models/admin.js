module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('admin', {
        // id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     unique: true
        // },
        tempPassword: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        isActive: {
            type: DataTypes.BOOLEAN
        }
    })
    return Admin;
}
