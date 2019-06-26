
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', redirect: '/issues/' },
      {
        path: 'issues/',
        component: () => import('pages/Issues.vue'),
        children: [
          {
            path: ':id/',
            component: () => import('pages/Issue.vue'),
            children: [
              { path: 'comments', component: () => import('pages/Comments.vue') }
            ]
          }
        ]
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
