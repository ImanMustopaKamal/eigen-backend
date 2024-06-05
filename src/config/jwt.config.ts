import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'JWT_SECRET',
  accessToken: process.env.ACCESS_TOKEN || 'ACCESS_TOKEN',
  refreshToken: process.env.REFRESH_TOKEN || 'REFRESH_TOKEN',
  jwtExpAccessToken: process.env.ACCESS_TOKEN_EXP || 1000 * 60 * 60, // 5m
  jwtExpRefreshToken: process.env.REFRESH_TOKEN_EXP || 1000 * 60 * 60 * 24, // 1d
  jwtLinkExpAccessToken: process.env.LINK_TOKEN_EXP || 1000 * 60 * 60 * 24 * 2, // 2d
}));
