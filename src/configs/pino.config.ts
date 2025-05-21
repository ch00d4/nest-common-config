/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
const pinoConfig = {
  autoLogging: false,
  serializers: {
    req: () => {
      undefined;
    },
    res: () => {
      undefined;
    },
  },
  customProps(req: any) {
    return {
      "x-request-id":
        req.headers["x-request-id"] || `AUTO-${crypto.randomUUID()}`,
      "x-session-id": req.headers["x-session-id"] || "NOT-FOUND-SESSION",
    };
  },
  level: process.env.NODE_ENV !== "production" ? "debug" : "info",
  transport:
    process.env.NODE_ENV !== "production"
      ? { target: "pino-pretty", options: { singleLine: true } }
      : undefined,
};

export { pinoConfig };
