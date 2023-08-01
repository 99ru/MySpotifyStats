// models.ts
import { Session as NextAuthSession, User as NextAuthUser } from 'next-auth';

export interface Token {
  name: string;
  email: string;
  picture: string;
  sub: string;
  accessToken: string;
  refreshToken: string;
  username: string;
  accessTokenExpires: number;
  iat: number;
  exp: number;
  jti: string;
}

export interface User extends NextAuthUser {
  token?: Token;
}

export interface UserSession extends NextAuthSession {
  user?: User;
  error?: string;
}
