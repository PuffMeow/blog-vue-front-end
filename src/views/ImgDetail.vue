<template>
  <div>
    <div class="img-detail" v-if="Object.keys(detail).length != 0">
      <back class="pointer" />
      <div class="visited font-weight italic">
        访问次数：{{ detail.visitNum }}
      </div>
      <div class="title font-weight">{{ detail.title }}</div>
      <div class="article" v-html="detail.content"></div>
    </div>
    <div v-else>
      <loading />
    </div>
  </div>
</template>

<script>
import back from '../components/back'
import loading from '../components/loading'
import { getImgDetail, addImgVisitNum } from '@/service/api'

export default {
  props: {
    id: { type: String, required: true },
  },
  components: {
    back,
    loading,
  },
  data() {
    return {
      detail: {},
    }
  },
  methods: {
    async getDetail() {
      const res = await getImgDetail(this.id)
      this.detail = res.data
      console.log(res)
    },
    async addVisitNum() {
      await addImgVisitNum(this.id)
    },
  },
  async created() {
    const visitedImg = JSON.parse(sessionStorage.getItem('visitedImg')) || []
    if (visitedImg.includes(this.id)) {
      this.getDetail()
      return
    } else {
      visitedImg.push(this.id)
      sessionStorage.setItem('visitedImg', JSON.stringify(visitedImg))
      await this.addVisitNum()
      this.getDetail()
    }
  },
}
</script>

<style lang="scss" scoped>
$color: #d3a145;

.img-detail {
  width: 860px;
  background-color: #f8f9f4;
  margin: 150px auto 50px;
  padding: 15px;
  position: relative;
  .title {
    min-height: 50px;
    line-height: 30px;
    padding-bottom: 10px;
    font-size: 18px;
    color: #000;
  }
  .visited {
    position: absolute;
    right: 10px;
    top: -30px;
    font-size: 16px;
    color: $color;
  }
  ::v-deep .article {
    border: 1px dotted #000;
    padding: 30px 50px;
    font-size: 16px;
    line-height: 24px;
    p {
      line-height: 28px;
      font-size: 18px;
    }
  }
}

@media screen and (max-width: 596px) {
  .img-detail {
    margin-top: 5rem;
    width: 100%;
    padding: 0.4rem;
    .title {
      font-size: 1rem;
      line-height: 1.5rem;
    }

    ::v-deep .article {
      overflow: hidden;
      box-sizing: border-box;
      padding: 1rem 1.1rem;
      p {
        font-size: 1rem;
        line-height: 1.75rem;
        img {
          width: 100% !important;
          height: 100% !important;
        }
      }
    }
  }
}
</style>