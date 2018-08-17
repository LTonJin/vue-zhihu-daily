<template>
  <div style="padding-top:50px">
    <mt-header fixed :title="$route.query.title">
      <a @click="$router.go(-1)" slot="left">
        <mt-button icon="back">返回</mt-button>
      </a>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <ul>
      <li v-for="(item, index) in stories" :key="index"  @click="$router.push({name:'article_detail', query:{id:item.id}})">
        <div style="display:flex;padding:10px;border:1px solid #eee;margin:10px 0">
          <img :src="(typeof item.images != 'undefined')?item.images[0]:''" alt="" style="width:48px;height:48px">
          <p style="margin-left:15px"> {{ item.title }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stories: []
    };
  },
  mounted(){
    this.$http('https://zhihu-daily.leanapp.cn/api/v1/themes/'+this.$route.query.id).then( res =>{
      this.stories = res.data.THEMEDES.stories
      console.log( this.stories);
    })
  }
};
</script>
<style>
</style>
