<template>
  <div class="ltj_container">
    <mt-tabbar v-model="selected">
      <mt-tab-item id="tab-container1">
        首页
      </mt-tab-item>
      <mt-tab-item id="tab-container2">
        主题日报
      </mt-tab-item>
      <mt-tab-item id="tab-container3">
        关于
      </mt-tab-item>
    </mt-tabbar>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="tab-container1">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
          <ul>
            <li>
              <mt-cell v-for="(item,index) in list" :key="index" :title="item.title" @click.native="$router.push({name:'article_detail', query:{id:item.id}})">
                <img v-if="typeof item.image != 'undefined'" :src="item.image" alt="" style="height:48px;width:48px">
                <img v-else :src="item.images[0]" alt="" style="height:48px;width:48px">
              </mt-cell>
            </li>
          </ul>
        </mt-loadmore>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container2">
        <ul>
          <li v-for="(item,index) in themesData" :key="index" :title="item.name" :style="{'background-color':'#fff'}" @click="$router.push({path:'themes_daily', query:{id:item.id,title:item.name}})">
            <div style="display:flex;align-items:center;margin:5px 0;padding:10px">
              <img :src="item.thumbnail" alt="" style="height:48px;width:48px">
              <div style="padding-left:20px">
                <p style="font-size:14px;font-weight:600">{{ item.name }}</p>
                <p>{{ item.description }}</p>
              </div>
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container3">
        <mt-cell v-for="n in 7" title="tab-container 3" :key="n"></mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: "tab-container1",
      allLoaded: false,
      list: [],
      num: 20,
      date: this.getNowFormatDate(),

      themesData: [],
      themesDate: this.getNowFormatDate()
    };
  },
  methods: {
    loadBottom() {
      // 加载更多数据
      // 若数据已全部获取完毕
      // this.$refs.loadmore.onBottomLoaded();
      setTimeout(() => {
        this.date--;
        this.$http(
          "https://zhihu-daily.leanapp.cn/api/v1/before-stories/" + this.date
        ).then(res => {
          console.log(res);
          this.list.push(...res.data.STORIES.stories);
          console.log(this.date);
          this.$refs.loadmore.onBottomLoaded();
        });
      }, 500);
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
  },
  mounted() {
    this.$http("https://zhihu-daily.leanapp.cn/api/v1/last-stories")
      .then(res => {
        // console.log(res, "axios");
        this.list = res.data.STORIES.top_stories.concat(
          res.data.STORIES.stories
        );
      })
      .catch(err => {
        console.log(err, "axios err");
      });

    this.$http("https://zhihu-daily.leanapp.cn/api/v1/themes")
      .then(res => {
        // console.log(res, "axios");
        this.themesData = res.data.THEMES.others;
      })
      .catch(err => {
        console.log(err, "axios err");
      });
  }
};
</script>
<style lang="less">
.ltj_container {
  padding-top: 60px;
  .mint-tabbar {
    position: fixed;
    bottom: auto;
    top: 0;
    z-index: 999;
    height: 60px;
    align-items: center;
    background-color: #252e39;
    .mint-tab-item {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .mint-tab-item-label {
        font-size: 16px;
      }
      .mint-cell-wrapper {
      }
    }
  }
  .mint-tabbar > .mint-tab-item.is-selected {
    background-color: #383f48;
    color: #fff;
  }
  .mint-tab-container {
    height: calc(100% - 60px);
    overflow: auto;
  }
  .mint-loadmore {
    background-color: #f5f2f2;
  }
  .mint-cell {
    margin: 5px 0;
  }
}
</style>
