export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT ?? 5050,
  jwtSecret: process.env.JWT_SECRET ?? '48195b266a6b61e9943319Rs*76f5d9b7df',
  bcryptSalt: Number(process.env.BCRYPT_SALT) ?? 12
}
