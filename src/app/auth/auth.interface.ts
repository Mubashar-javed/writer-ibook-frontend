export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  refresh: string;
  access: string;
}

export enum TOKEN_KEYS {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

export interface ParsedJWT {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
}
