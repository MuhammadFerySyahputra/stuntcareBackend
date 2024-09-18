const Sequelize = require('sequelize');
const db = require('../config/database');
const Mpasi = require('./mpasi');
const Artikel = require('./artikel');

const { DataTypes } = Sequelize;

const Komentar = db.define(
  'komentar',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    komentar: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    mpasiId: {
      type: DataTypes.INTEGER,
      references: {
        model: Mpasi,
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    artikelId: {
      type: DataTypes.INTEGER,
      references: {
        model: Artikel,
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
  {
    freezeTableName: true,
  },
);

Mpasi.hasMany(Komentar, { foreignKey: 'mpasiId' });
Artikel.hasMany(Komentar, { foreignKey: 'artikelId' });
Komentar.belongsTo(Mpasi, { foreignKey: 'mpasiId' });
Komentar.belongsTo(Artikel, { foreignKey: 'artikelId' });

module.exports = Komentar;
