import { web } from "../src/app/web.js";
import { logger } from "./app/logging.js";

const port = 3000;
web.listen(port, "localhost", () => {
  logger.info(`Server Running in port ${port}`);
});
