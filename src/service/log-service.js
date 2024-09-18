const { validate } = require('../validation/validation');
const LogValidation = require('../validation/log-validation');
const Log = require('../models/log');

const createLog = async (logData) => {
  const validatedData = validate(LogValidation.createLogValidation, logData);
  const log = await Log.create(validatedData);
  return log;
};

const getLogsByUserId = async (userRole) => {
  const logs = await Log.findAll({
    where: { userRole },
  });
  return logs;
};

const getLogsByEntity = async (entity, entityId) => {
  const logs = await Log.findAll({
    where: { entity, entityId },
  });
  return logs;
};

const getLogs = async () => {
  const logs = await Log.findAll();
  const logsInWIB = logs.map((log) => ({
    ...log.toJSON(),
    timestamp: convertUTCtoWIB(log.timestamp),
  }));
  return logsInWIB;
};

function convertUTCtoWIB(utcDate) {
  const utcTimestamp = new Date(utcDate);
  const offset = 7; // Offset WIB dari UTC adalah +7 jam
  const wibTimestamp = new Date(utcTimestamp.getTime() + offset * 3600 * 1000);
  return wibTimestamp.toISOString().replace('T', ' ').substr(0, 19); // Format sesuai kebutuhan Anda
}

const deleteAllLogs = async () => {
  await Log.destroy({ where: {}, truncate: true });
};

module.exports = {
  createLog,
  getLogsByUserId,
  getLogsByEntity,
  getLogs,
  deleteAllLogs,
};
