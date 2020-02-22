import './config/db';
import { app } from './app';
import logger from './config/logger';

const port = process.env.PORT || '3000';

app.listen(port, () => logger.info(`app running on port ${port}`));
