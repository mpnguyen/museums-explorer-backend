import { Router } from 'express'
import * as museumsController from '../controllers/museumsController'

const routes = Router()

routes.get('/', museumsController.getMuseums)

export default routes