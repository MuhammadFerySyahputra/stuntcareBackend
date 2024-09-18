const LogService = require('../service/log-service');

const createLog = async (req, res, next) => {
  try {
    if (!req.cookies.accessToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const log = await LogService.createLog(req.body);
    res.status(201).json({ message: 'Log created successfully', data: log });
  } catch (error) {
    next(error);
  }
};

const getLogsByUserRole = async (req, res, next) => {
  const { userRole } = req.params;
  try {
    const logs = await LogService.getLogsByUserId(userRole);
    res.status(200).json({ message: 'Logs fetched successfully', data: logs });
  } catch (error) {
    next(error);
  }
};

const getLogsByEntity = async (req, res, next) => {
  const { entity, entityId } = req.params;
  try {
    const logs = await LogService.getLogsByEntity(entity, entityId);
    res.status(200).json({ message: 'Logs fetched successfully', data: logs });
  } catch (error) {
    next(error);
  }
};

const getLogs = async (req, res, next) => {
  try {
    const logs = await LogService.getLogs();
    res.status(200).json({ message: 'Logs fetched successfully', data: logs });
  } catch (error) {
    next(error);
  }
};

const deleteAllLogs = async (req, res, next) => {
  try {
    if (!req.cookies.accessToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    await LogService.deleteAllLogs();
    res.status(200).json({ message: 'All logs deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLog,
  getLogsByUserRole,
  getLogsByEntity,
  getLogs,
  deleteAllLogs,
};
