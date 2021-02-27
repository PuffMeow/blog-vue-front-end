<template>
  <div>
    <div class="blog-detail">
      <back />
      <div v-if="detail != ''">
        <div class="visited font-weight italic">
          访问次数：{{ detail.visitNum }}
        </div>
        <div class="title font-weight">{{ detail.title }}</div>
      </div>
      <div v-else>
        <loading />
      </div>
      <div class="article" v-html="compiledMarkdown"></div>
    </div>
    <comment :id="id" />
  </div>
</template>

<script>
import back from '../components/back'
import comment from '../components/comment'
import '../style.scss'
import('highlight.js/styles/atom-one-light.css')
import hljs from 'highlight.js'
import marked from 'marked'
import loading from '../components/loading'

import { getDetail, addVisitNum } from '@/service/api'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true, //允许 Git Hub标准的markdown.
  tables: true, //允许支持表格语法
  breaks: true, //允许回车换行
  pedantic: false, //尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
  sanitize: false, //对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
  smartLists: false, //使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉.
  smartypants: false, //使用更为时髦的标点，比如在引用语法中加入破折号。
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code, true).value
    } else {
      return hljs.highlightAuto(code).value
    }
  },
})

export default {
  props: {
    id: { type: String, require: true },
    index: { type: String, require: true },
  },
  components: {
    back,
    comment,
    loading,
  },
  data() {
    return {
      detail: '',
    }
  },
  methods: {
    async getDetail() {
      const res = await getDetail(this.id)
      this.detail = res.data
    },
    async addVisitNum() {
      const res = await addVisitNum(this.id)
    },
    // scroll() {
    //   document.querySelector('.comment').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    // },
  },
  async created() {
    // console.log(this.detail, this.id)
    const visitedBlog = JSON.parse(sessionStorage.getItem('visitedBlog')) || []
    if (visitedBlog.includes(this.id)) {
      this.id && (await this.getDetail())
    } else {
      visitedBlog.push(this.id)
      sessionStorage.setItem('visitedBlog', JSON.stringify(visitedBlog))
      await this.addVisitNum()
      this.id && (await this.getDetail())
    }
  },

  computed: {
    compiledMarkdown() {
      return marked(this.detail.description || '', {
        sanitize: true,
      })
    },
  },
}
</script>

<style lang="scss">
$color: #d3a145;

.blog-detail {
  width: 860px;
  background-color: #f8f9f4;
  margin: 150px auto 50px;
  padding: 15px;
  position: relative;
  .title {
    min-height: 50px;
    line-height: 35px;
    padding-bottom: 10px;
    font-size: 20px;
    color: #000;
  }
  .visited {
    position: absolute;
    right: 10px;
    top: -30px;
    font-size: 16px;
    color: $color;
  }
  .article {
    border: 1px dotted #000;
    padding: 30px 50px;
    font-size: 16px;
    line-height: 30px;

    code {
      background-color: #f9f2f4;
      border-radius: 5px;
      color: #c7254e;
      margin: 2px 5px;
    }
    img {
      width: 100%;
      height: 100%;
    }
    pre {
      background-color: #f3f3f3;
      margin: 10px 0;
      padding: 10px;
      border-radius: 5px;
      overflow: auto;
      code {
        border-radius: 0;
        color: #666;
        margin: 0;
        background-color: #f3f3f3;
      }
    }
  }
}

@media screen and (max-width: 596px) {
  .blog-detail {
    width: 100%;
    padding: 0.4rem;
    margin-top: 6.25rem;
    .title {
      font-size: 1.2rem;
    }
    .article {
      font-size: 0.9375rem;
      padding: 1rem 1.1rem;
      pre {
        overflow: auto;
      }
    }
  }
  .comment-box {
    width: 100% !important;
  }

  .el-drawer.btt {
    width: 100% !important;
  }
}
</style>
