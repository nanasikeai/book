import Home from '@/views/Home'
import Statistics from '@/views/Statistics'
import Person from '@/views/Person'
import Login from '@/views/Login'

const routes = [
  { path: '/', component: Home },
  { path: '/statistics', component: Statistics },
  { path: '/user', component: Person },
  { path: '/login', component: Login }
]

export default routes
