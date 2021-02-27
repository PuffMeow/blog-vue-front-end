import axios from 'axios'

const musicReq = axios.create({
  baseURL: 'https://autumnfish.cn',
});

//搜索音乐
export function search(query) {
  return musicReq.get(`https://autumnfish.cn/search?keywords=${query}`)
}

// 获取歌曲地址
export function getSongUrl(musicId) {
  return musicReq.get(`https://autumnfish.cn/song/url?id=${musicId}`)
}

// 获取歌曲详情
export function getSongDetail(musicId) {
  return musicReq.get(`https://autumnfish.cn/song/detail?ids=${musicId}`)
}

//获取歌曲评论
export function getSongComments(musicId) {
  return musicReq.get(`https://autumnfish.cn/comment/hot?type=0&id=${musicId}`)
}

//播放mv
export function getMv(mvId) {
  return musicReq.get(`https://autumnfish.cn/mv/url?id=${mvId}`)
}
