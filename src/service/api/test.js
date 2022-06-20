import $http from '../index'

const ApiList = {
    test: '/test'
}

export const test = () => {
    return $http.get(ApiList.test)
}