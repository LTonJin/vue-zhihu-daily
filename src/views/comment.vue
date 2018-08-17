<template>
  <div style="padding:50px 10px 10px 10px">
    <mt-header fixed :title="$route.query.title+'详情'"></mt-header>
    <div v-for="(item, index) in comments" :key="index" style="background:#f5f2f2;margin:10px 0;padding:10px">
      <p style="display:flex;align-items:center"><img style="width:34px;height:34px;display:inline-block" :src="item.avatar" alt="">
        <span style="margin-left:10px;font:600 14px">{{ item.author }}</span>
      </p>
      <p>{{ item.content}}</p>
    </div>
  </div>

</template>
<script>
export default {
  props: ["com_title"],
  data() {
    return {
      comments: []
    };
  },
  mounted() {
    var str;
    if(this.$route.query.title==='长评'){
      str = '/long'
    }else{
      str = '/short'
    }
    this.$http(
      "https://zhihu-daily.leanapp.cn/api/v1/contents/" +
        this.$route.query.id +
        str+"-comments"
    ).then(res => {
      this.comments = res.data.COMMENTS.comments;
    });
  }
};
</script>
<style lang="less" scoped>
.mint-header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: #252e39;
}
</style>
