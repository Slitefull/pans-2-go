/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_CRYPTO_ASSETS_API: string;
    REACT_APP_API_BASE_URL: string;
    REACT_APP_STRIPE_PRIVATE_KEY: string,
    REACT_APP_LAG_RADAR: boolean;
    REACT_APP_LOCAL_ENV: boolean;
    REACT_APP_S3_MEDIA: string;
    REACT_APP_GOOGLE_MAP_URL: string;
    REACT_APP_GOOGLE_MAP_API_KEY: string;
    SKIP_PREFLIGHT_CHECK: boolean;
  }
}
