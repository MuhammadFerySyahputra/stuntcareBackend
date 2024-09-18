require('dotenv').config();
const web = require('./application/web');
const logger = require('./application/logging');
const db = require('./config/database');

const PORT = process.env.PORT || 8080;

db.sync()
  .then(() => {
    logger.info('Database synced successfully');
    web.listen(PORT, () => {
      logger.info(`App started on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error('Error syncing database:', err);
  });
