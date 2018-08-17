<template>
  <div class="article_detail">
    <mt-header title="文章详情">
      <a @click="$router.go(-1)" slot="left">
        <mt-button icon="back">返回</mt-button>
      </a>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div v-html="content"></div>
    <p style="padding:15px 0" class="ltj_comments">
      <span>长评：
        <a href="javascript:;" @click="$router.push({name:'comment',query:{id:$route.query.id,title:'长评'}})">{{content_extra.long_comments}}</a>
      </span>
      <span>短评：
        <a href="javascript:;" @click="$router.push({name:'comment',query:{id:$route.query.id,title:'短评'}})">{{content_extra.short_comments}}</a>
      </span>
      <span>流行：
        <a href="javascript:;">{{content_extra.popularity}}</a>
      </span>
      <span>评论数：
        <a href="javascript:;">{{content_extra.comments}}</a>
      </span>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      content_extra: ""
    };
  },
  mounted() {
    console.log(this.$route);
    this.$http(
      "https://zhihu-daily.leanapp.cn/api/v1/contents/" + this.$route.query.id
    ).then(res => {
      this.content = res.data.CONTENTS.body;
    });
    this.$http(
      "https://zhihu-daily.leanapp.cn/api/v1/contents/extra/" +
        this.$route.query.id
    ).then(res => {
      this.content_extra = res.data.DES;
      console.log(this.content_extra);
    });
  }
};
</script>
<style lang="less">
.article_detail {
  padding: 10px;
  padding-top: 50px;
  .meta {
    // display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
    font-size: 14px;
    font-weight: 600;
  }
  .avatar {
    width: 34px;
    height: 34px;
  }
  .author {
    display: block;
  }
  .content-image {
    padding: 10px 0;
  }
  .question-title {
    font-size: 16px;
    padding: 5px 0;
  }

  .mint-header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    background-color: #252e39;
  }
  .ltj_comments {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 14px;
      font-weight: 600;
    }
  }
}
</style>
