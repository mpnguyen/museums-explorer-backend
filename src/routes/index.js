import { Router } from 'express'
import museums from './museums'


const routes = Router()

routes.get('/', (req, res) => res.status(200).json('Giadinhtre API'))
routes.use('/museums', museums)

routes.use((err, req, res, next) => {
  if (err.name !== 'HttpError' || !err.errorCode) return next(err)
  res.status(err.errorCode).json({ message: err.message })
})

export default routes