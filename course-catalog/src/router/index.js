import { createRouter, createWebHistory } from 'vue-router'

// Импорт страниц
import HomePage from '../pages/HomePage.vue'
import CoursesListPage from '../pages/CoursesListPage.vue'
import CoursePage from '../pages/CoursePage.vue'
import CourseDescriptionPage from '../pages/CourseDescriptionPage.vue'
import CourseProgramPage from '../pages/CourseProgramPage.vue'
import CourseReviewsPage from '../pages/CourseReviewsPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'

// Конфигурация маршрутов
const routes = [
  // Главная страница
  { path: '/', name: 'home', component: HomePage },

  // Список курсов (фильтр через query-параметр ?category=...)
  { path: '/courses', name: 'courses', component: CoursesListPage },

  // Страница курса — родительский маршрут для вкладок
  {
    path: '/courses/:id',
    name: 'course',
    component: CoursePage,
    props: true, // прокидываем id как prop
    // При заходе на /courses/:id сразу открываем вкладку "Описание"
    redirect: { name: 'course-description' },
    children: [
      // Вкладки. props: true — чтобы дочерние компоненты получили id
      {
        path: 'description',
        name: 'course-description',
        component: CourseDescriptionPage,
        props: true
      },
      {
        path: 'program',
        name: 'course-program',
        component: CourseProgramPage,
        props: true
      },
      {
        path: 'reviews',
        name: 'course-reviews',
        component: CourseReviewsPage,
        props: true
      }
    ]
  },

  // Вход. guestOnly: если уже авторизован — уводим в кабинет
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { guestOnly: true }
  },

  // Личный кабинет. requiresAuth: только для авторизованных
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true }
  },

  // 404 — ловит все несуществующие пути
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundPage
  }
]

// Создаём роутер с HTML5 History API
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Глобальный guard: проверка авторизации
router.beforeEach((to, from, next) => {
  // Читаем токен из localStorage
  const isAuth = !!localStorage.getItem('authToken')

  // Если маршрут требует авторизации, а токена нет —
  // редиректим на /login и запоминаем, куда пользователь шёл
  if (to.meta.requiresAuth && !isAuth) {
    next({ path: '/login', query: { redirect: to.fullPath } })
    return
  }

  // Если пользователь авторизован и идёт на /login —
  // отправляем его в личный кабинет
  if (to.meta.guestOnly && isAuth) {
    next({ path: '/dashboard' })
    return
  }

  // Во всех остальных случаях — пропускаем
  next()
})

export default router