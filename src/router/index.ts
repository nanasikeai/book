import Home from '@/views/Home'
import Statistics from '@/views/Statistics'
import Person from '@/views/Person'

const routes = [
  { path: '/', component: Home },
  { path: '/statistics', component: Statistics },
  { path: '/user', component: Person }
]

export default routes
