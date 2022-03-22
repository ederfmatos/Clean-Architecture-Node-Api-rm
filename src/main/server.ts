import express from 'express'

const app = express()

const PORT = process.env.PORT ?? 5050

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
