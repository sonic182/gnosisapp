/*
 * action types
 */

import Http from '../services/http';

export const PUSH_ROUTE = 'PUSH_ROUTE'
export const POP_ROUTE = 'POP_ROUTE'
export const SET_NAVIGATOR = 'SET_NAVIGATOR'

export const SET_CATEGORY = 'SET_CATEGORY'
export const SET_CATEGORIES = 'SET_CATEGORIES'

export const GET_POSTS = 'GET_POSTS'
export const GET_POSTS_SUCCES = 'GET_POSTS_SUCCES'
export const GET_POSTS_FAIL = 'GET_POSTS_FAIL'

export function pushRoute(route) {
  return { type: PUSH_ROUTE, route }
}

export function popRoute() {
  return { type: POP_ROUTE }
}

export function setNavigator({navigator, route}) {
  return { type: SET_NAVIGATOR, navigator: navigator, route: route }
}

export function setCategory(category) {
  return { type: SET_CATEGORY, category }
}

export function setCategories(categories) {
  return { type: SET_CATEGORIES, categories }
}

export function getPosts(opts) {
  return { type: GET_POSTS, opts }
}

export function getPostsSuccess(res) {
  return { type: GET_POSTS_SUCCES, res }
}

export function getPostsFail(res) {
  return { type: GET_POSTS_FAIL, res }
}

export function fetchPosts(opts) {
  let INITIAL_OFFSET = 0,
    NUMBER = 20,
    offset= 0;

  return dispatch => {
    opts = opts || {}
    dispatch(getPosts(opts))

    let category = opts.category ? opts.category.category : false
    let params = {pretty: true, offset: offset, number: NUMBER};

    if ( category && category.ID !== 0)
			params.category = category.slug

    // console.log('opts')
    // console.log(opts)
    //
    // console.log('params')
    // console.log(params)

    let $promise = Http.get(Http.urlParams('posts', params))

    $promise.then((r) => r.json())
    .then((rJson) => {
      // console.log('rJson.posts.length')
      // console.log(rJson.posts.length)
      return dispatch(getPostsSuccess({otps: opts, posts: rJson}))
    })
    .catch((err) => {
      dispatch(getPostsFail({opts}))
      console.log('err')
      console.log(err)
    })

  }
}
