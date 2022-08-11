import app from '../index'
import supertest from 'supertest'

export const api = supertest(app)

// export default api
