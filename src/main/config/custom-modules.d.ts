declare module Express {
  interface Request {
    account?: {
      id: string
    }
  }
}
