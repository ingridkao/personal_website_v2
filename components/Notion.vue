<template>
  <main>
    <div class="databaselWrapper">
      {{pageList.length}}
      <div v-for="(list, index) in pageList" :key="index">
        <div>
          <b>{{list.id}}</b> | 
          <span v-if="list.properties && list.properties.Name && list.properties.Name.title[0]">
            {{list.properties.Name.title[0]["plain_text"]}}
          </span>
          <!-- <p>{{list.url}}</p> -->
        </div>
      </div>
    </div>
    <hr>
    <div class="pageContentWrapper">
      <div v-for="(block, blockIndex) in pageContent" :key="blockIndex">
        <div>
          <b>{{block.type}}</b> | 
          <span v-if="block[block.type] && block[block.type].text">
            {{block[block.type].text}}
          </span>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
const NOTION_TOKEN = `Bearer secret_8kOmCEmmZO4k1CPPQyl1nqjtMIQM4XtWysvG8pz4w9z`
const NOTION_VERSION = "2021-08-16"
export default {
  name: 'NuxtNotion',
  data(){
    return {
      pageList: [],
      pageDisplay: 0,
      pageContent: []
    }
  },
  created() {
    this.fetchDatabase()
  },
  methods: {
    fetchDatabase() {
      //https://developers.notion.com/reference/post-database-query
      this.$axios.post(`/databases/e816ed39540f4291b7ff60a4921920c7/query`,{
        // filter: {},
        // sorts: []
      },{
        headers:{
          'Authorization': NOTION_TOKEN,
          'Notion-Version': NOTION_VERSION
        }
      }).then((response)  => {
        if(response && response.status === 200 && response.data){
          this.pageList = response.data.results
          this.fetchPageContent()
        }
      }).catch(function (error) {
        // handle error
        console.log(error);
      });
    },
    fetchPageContent() {
      const PageInfo = this.pageList[this.pageDisplay]
      const PageID = PageInfo.id
      this.$axios.$get(`/blocks/${PageID}/children`,{
        headers:{
          'Authorization': NOTION_TOKEN,
          'Notion-Version': NOTION_VERSION
        }
      }).then((response) => {
        if(response && response.results){
          this.pageContent = response.results
        }
      }).catch(function (error) {
        // handle error
        console.log(error);
      });
    }


  }

}
</script>
