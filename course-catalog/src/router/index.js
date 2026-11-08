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
    // При заходе на /courses/:id сразу открываем вкладку «Описание»
    redirect: { name: 'course-description' },
    children: [
      // Вкладки. id и параметры передаются через useRoute()/inject
      {
        path: 'description',
        name: 'course-description',
        component: CourseDescriptionPage
      },
      {
        path: 'program',
        name: 'course-program',
        component: CourseProgramPage
      },
      {
        path: 'reviews',
        name: 'course-reviews',
        component: CourseReviewsPage
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
router.beforeEach((to) => {
  // Читаем токен и проверяем его срок (см. LoginPage)
  const raw = localStorage.getItem('authToken')
  let isAuth = false

  if (raw) {
    try {
      const data = JSON.parse(raw)
      // Если структура неожиданная — считаем токен невалидным
      isAuth = !!data && (!data.expiresAt || data.expiresAt > Date.now())
    } catch {
      // Старый формат (просто строка) — считаем валидным для совместимости
      isAuth = true
    }
  }

  // Если маршрут требует авторизации, а токена нет —
  // редиректим на /login и запоминаем, куда пользователь шёл
  if (to.meta.requiresAuth && !isAuth) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  // Если пользователь авторизован и идёт на /login —
  // отправляем его в личный кабинет
  if (to.meta.guestOnly && isAuth) {
    return { path: '/dashboard' }
  }

  // Во всех остальных случаях — пропускаем
  return true
})

export default router