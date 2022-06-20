
export const interceptor = (router) => {
    router.beforeEach((to, from, next) => {
        next()
    });
}