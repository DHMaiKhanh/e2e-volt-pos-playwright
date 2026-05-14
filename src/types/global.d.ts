declare namespace NodeJS {
  interface ProcessEnv {
    ENV?: 'local' | 'stage' | 'prod';
    HEADLESS?: string;
    SLOW_MO?: string;
    BASE_URL?: string;
    GRAPHQL_URL?: string;
    API_TIMEOUT?: string;
    OWNER_PASSCODE?: string;
    LOG_LEVEL?: 'debug' | 'info' | 'warn' | 'error';
    PLAYWRIGHT_RUN_ID?: string;
  }
}
