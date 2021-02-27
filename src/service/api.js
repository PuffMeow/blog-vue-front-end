import request from './http'

//按分页获取所有博客
export function getBlogs(pageSize, page) {
  return request.get(`/frontBlog/getBlogs/${pageSize}/${page}`)
}

//获取博客总条数
export function getTotal() {
  return request.get('/frontBlog/getTotal')
}

//获取博客详情
export function getDetail(id) {
  return request.get(`/frontBlog/getDetail/${id}`)
}

//博客访问量加1
export function addVisitNum(id) {
  return request.get(`/frontBlog/addVisitNum/${id}`)
}

//获取博客评论总数
export function fetchCommentNum(id) {
  return request.get(`/comment/getCommentNum/${id}`)
}

//获取博客的留言
export function getCommentsPage(id, pageSize, page) {
  return request.get(`/comment/getComments/${id}/${pageSize}/${page}`)
}

//获取图说页面里的数据
export function getImgPage(pageSize, page) {
  return request.get(`/frontImg/getImgs/${pageSize}/${page}`)
}

//获取图说的数据总数
export function getImgNum() {
  return request.get('/frontImg/getImgNum')
}

//获取图说的详情
export function getImgDetail(id) {
  return request.get(`/frontImg/getDetail/${id}`)
}

//图说访问量加1
export function addImgVisitNum(id) {
  return request.get(`/frontImg/addVisitNum/${id}`)
}

//留言板页面获取关于网页的介绍
export function getAboutDetail() {
  return request.get('/frontAbout/getAboutDetail')
}

//获取留言
export function getComments(pageSize, page) {
  return request.get(`/comment/getMessages/${pageSize}/${page}`)
}

//发送留言
export function sendComment(message) {
  return request.post(`/comment/createMessage`, message)
}

//获取留言总数
export function getMessageNum() {
  return request.get('/comment/getMessageNum')
}


//发送评论
export function send1Comment(comment) {
  return request.post(`/comment/createComment`, comment)
}

//发送二级评论
export function send2Comment(id, comment) {
  return request.post(`/comment/createSecondComment/${id}`, comment)
}