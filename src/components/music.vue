<template>
  <div>
    <div class="wrap">
      <!-- 播放器主体区域 -->
      <div class="play-wrap" id="player">
        <div class="search-bar">
          <h2 style="margin-left: 20px; color: #f9f9f9; font-size: 22px">
            云游Music
          </h2>
          <!-- 搜索歌曲 -->
          <el-input
            @input="searchMusic"
            autocomplete="off"
            clearable
            placeholder="输入歌名 / 歌手 / 歌词"
            style="width: 30%; margin-right: 2%"
            v-model="query"
          ></el-input>
        </div>
        <div class="center-con">
          <!-- 搜索歌曲列表 -->
          <div class="song-wrapper">
            <ul class="song-list">
              <li :key="index" v-for="(item, index) in musicList">
                <a @click="playMusic(item.id)" href="javascript:;"></a>
                <b @click="playMusic(item.id)">{{ item.name }}</b>
                <span @click="playMv(item.mvid)" v-if="item.mvid != 0">
                  <i></i>
                </span>
                <!---->
              </li>
            </ul>
            <img alt class="switch-btn" src="../assets/player/line.png" />
          </div>
          <!-- 歌曲信息容器 -->
          <div :class="{ playing: isPlaying }" class="playing">
            <img
              :class="{ play_bar_rotate: isPlaying == true }"
              class="play_bar"
              src="../assets/player/player_bar.png"
            />
            <!-- 黑胶碟片 -->
            <img
              :class="{ autoRotate: isPlaying == true }"
              class="disc"
              src="../assets/player/disc.png"
            />
            <img
              :class="{ autoRotate: isPlaying == true }"
              :src="musicCover"
              class="cover"
            />
          </div>
          <!-- 评论容器 -->
          <div class="comment-wrapper">
            <h5 class="title">热门评论</h5>
            <div class="comment-list">
              <dl :key="index" v-for="(item, index) in hotComments">
                <dt>
                  <img :src="item.user.avatarUrl" alt />
                </dt>
                <dd class="detail">{{ item.content }}</dd>
              </dl>
            </div>
            <img class="right-line" src="../assets/player/line.png" />
          </div>
        </div>
        <div class="audio-con">
          <audio
            :src="musicUrl"
            @pause="pause"
            @play="play"
            class="my-audio"
            controls
            autoplay="true"
            loop
          ></audio>
        </div>
        <div class="video-con" style="display: none" v-show="isShow">
          <video :src="mvUrl" controls="controls"></video>
          <div @click="hide" class="mask"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {
  search,
  getSongUrl,
  getSongDetail,
  getSongComments,
  getMv,
} from '@/service/musicApi'
export default {
  data() {
    return {
      musicList: [],
      query: '千本樱钢琴',
      musicUrl: '',
      musicCover: '',
      // 歌曲评论
      hotComments: [],
      isPlaying: false,
      isShow: false,
      mvUrl: '',
    }
  },
  async created() {
    await this.searchMusic()
    await this.playMusic(this.musicList[0].id)
    this.query = ''
  },

  methods: {
    //搜索音乐
    async searchMusic() {
      if (this.query === '') {
        return
      }
      const res = await search(this.query)
      this.musicList = res.data.result.songs
    },

    //播放音乐
    async playMusic(musicId) {
      // 获取歌曲地址
      const musicUrl = await getSongUrl(musicId)
      // console.log(musicUrl)
      this.musicUrl = musicUrl.data.data[0].url
      // 歌曲详情获取
      const musicDetail = await getSongDetail(musicId)
      // console.log(musicDetail)
      this.musicCover = musicDetail.data.songs[0].al.picUrl
      // 歌曲评论获取
      const musicComments = await getSongComments(musicId)
      this.hotComments = musicComments.data.hotComments
    },
    // 歌曲播放
    play() {
      this.isPlaying = true
    },
    // 歌曲暂停
    pause() {
      this.isPlaying = false
    },
    // 播放mv
    async playMv(mvId) {
      const res = await getMv(mvId)
      // console.log(res)
      this.mvUrl = res.data.data.url
      this.isShow = true
    },
    // 隐藏
    hide() {
      this.isShow = false
    },
  },
}
</script>


<style lang="scss" scoped>
.play-wrap {
  width: 800px;
  height: 544px;
  margin: 4% auto 0;
  background-color: #f9f9f9;
}

.search-bar {
  height: 60px;
  background-color: #c1866a;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 11;
}

.search-bar img {
  margin-left: 23px;
}

.search-bar input {
  margin-right: 23px;
  width: 296px;
  height: 34px;
  border-radius: 17px;
  border: 0px;
  background: url('../assets/player/zoom.png') 265px center no-repeat
    rgba(255, 255, 255, 0.45);
  text-indent: 15px;
  outline: none;
}

.center-con {
  height: 435px;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  position: relative;
}

.song-wrapper {
  width: 200px;
  height: 435px;
  box-sizing: border-box;
  padding: 10px;
  list-style: none;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 1;
}

.song_stretch {
  width: 600px;
}

.song-list {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.song-list::-webkit-scrollbar {
  display: none;
}

.song-list li {
  font-size: 12px;
  color: #333;
  height: 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 580px;
  padding-left: 10px;
}

.song-list li:nth-child(odd) {
  background-color: rgba(240, 240, 240, 0.3);
}

.song-list li a {
  display: block;
  width: 17px;
  height: 17px;
  background-image: url('../assets/player/play.png');
  background-size: 100%;
  margin-right: 5px;
  box-sizing: border-box;
}

.song-list li b {
  font-weight: normal;
  width: 122px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.song_stretch .song-list li b {
  width: 200px;
}

.song_stretch .song-list li em {
  width: 150px;
}

.song-list li span {
  width: 23px;
  height: 17px;
  margin-right: 50px;
}
.song-list li span i {
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background: url('../assets/player/table.png') left -48px no-repeat;
}

.song-list li em,
.song-list li i {
  font-style: normal;
  width: 100px;
}

.player_con {
  width: 400px;
  height: 435px;
  position: absolute;
  left: 200px;
  top: 0px;
}

.player_con2 {
  width: 400px;
  height: 435px;
  position: absolute;
  left: 200px;
  top: 0px;
}

.player_con2 video {
  position: absolute;
  left: 20px;
  top: 30px;
  width: 355px;
  height: 265px;
}

.disc {
  position: absolute;
  left: 273px;
  top: 60px;
  z-index: 9;
}
.cover {
  position: absolute;
  left: 325px;
  top: 112px;
  width: 150px;
  height: 150px;
  border-radius: 75px;
  z-index: 8;
}
.comment-wrapper {
  width: 180px;
  height: 435px;
  list-style: none;
  position: absolute;
  left: 600px;
  top: 0px;
  padding: 25px 10px;
}
.comment-wrapper .title {
  position: absolute;
  top: 0;
  margin-top: 5px;
}
.comment-wrapper .comment-list {
  overflow: auto;
  height: 410px;
}
.comment-wrapper .comment-list::-webkit-scrollbar {
  display: none;
}
.comment-wrapper dl {
  padding-top: 10px;
  padding-left: 42px;
  position: relative;
  margin-bottom: 10px;
}

.comment-wrapper dt {
  position: absolute;
  left: 4px;
  top: 10px;
}

.comment-wrapper dt img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.comment-wrapper dd {
  font-size: 12px;
}

.comment-wrapper .detail {
  color: #666;
  line-height: 18px;
}
.audio-con {
  height: 50px;
  background-color: #f1f3f4;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.my-audio {
  width: 800px;
  height: 40px;
  margin-top: 5px;
  outline: none;
  background-color: #f1f3f4;
}
/* 旋转的动画 */
@keyframes Rotate {
  from {
    transform: rotateZ(0);
  }
  to {
    transform: rotateZ(360deg);
  }
}
/* 旋转的类名 */
.autoRotate {
  animation: Rotate 5s linear infinite;
}

.play_bar {
  position: absolute;
  left: 400px;
  top: -10px;
  z-index: 10;
  transform: rotate(-25deg);
  transform-origin: 12px 12px;
  transition: 1s;
}
/* 播放杆 转回去 */
.play_bar_rotate {
  transform: rotate(0);
}
/* 搜索历史列表 */
.search_history {
  position: absolute;
  width: 296px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.3);
  list-style: none;
  right: 23px;
  top: 50px;
  box-sizing: border-box;
  padding: 10px 20px;
  border-radius: 17px;
}
.search_history li {
  line-height: 24px;
  font-size: 12px;
  cursor: pointer;
}
.switch-btn {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
.right-line {
  position: absolute;
  left: 0;
  top: 0;
}
.video-con video {
  position: fixed;
  width: 800px;
  height: 546px;
  left: 50%;
  top: 50%;
  margin-top: -273px;
  transform: translateX(-50%);
  z-index: 990;
}
.video-con .mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 980;
  background-color: rgba(0, 0, 0, 0.8);
}
.video-con .shutoff {
  position: fixed;
  width: 40px;
  height: 40px;
  background: url('../assets/player/shutoff.png') no-repeat;
  left: 50%;
  margin-left: 400px;
  margin-top: -273px;
  top: 50%;
  z-index: 995;
}

::v-deep .el-input__inner {
  height: 36px;
}
::v-deep .el-input__inner:focus {
  border-color: #c1866a;
}

@media screen and (max-width: 596px) {
  .play-wrap {
    margin-top: 3.125rem;
    margin-bottom: 3.125rem;
    overflow: hidden;
    width: 100%;
    .comment-wrapper {
      display: none;
    }
    .my-audio {
      width: 100%;
    }
    .play_bar {
      left: 250px;
      height: 100px;
    }
    .cover {
      left: 242px;
      top: 103px;
      width: 90px;
      height: 90px;
    }
    .disc {
      left: 210px;
      top: 70px;
      width: 150px;
      height: 150px;
    }

    .song-wrapper {
      padding: 0.1rem;
    }
    .song-list li {
      width: 100%;
      position: relative;
      span {
        position: absolute;
        right: -40px;
      }
    }
    ::v-deep .el-input {
      width: 52% !important;
    }
  }
}
</style>