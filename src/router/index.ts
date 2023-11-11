import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "IndexPage",
    component: () => import("../views/IndexPage.vue"),
    children: [
      {
        path: "/home",
        name: "HomePage",
        component: () => import("../views/HomePage.vue"),
      },
      {
        path: "/education",
        name: "Education",
        component: () => import("../views/EducationPage.vue"),
      },
      {
        path: "/skill",
        name: "Skill",
        component: () => import("../views/SkillPage.vue"),
      },
      {
        path: "/project",
        name: "Project",
        component: () => import("../views/ProjectPage.vue"),
      },
      {
        path: "/work",
        name: "Work",
        component: () => import("../views/WorkPage.vue"),
      },
      {
        path: "/search/:category",
        name: "Search",
        component: () => import("../views/SearchPage.vue"),
      },
      //  404NotFound页面
      {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("../views/NotFound.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
