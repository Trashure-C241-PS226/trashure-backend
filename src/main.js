import { web } from "../src/app/web.js";
import { logger } from "./app/logging.js";

const port = process.env.PORT || 8080;
web.listen(port, () => {
  console.log(`Server Running in port ${port}`);
});
