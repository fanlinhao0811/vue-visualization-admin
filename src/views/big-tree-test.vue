<style scoped>
body {
  padding: 0;
  margin: 0;
  background: #34495e;
}

.loader {
  background: rgba(189, 195, 199, 1);
  height: 3em;
  width: 3em;
  margin: 7em auto;
  animation: loadit 4s linear infinite;
}

@keyframes loadit {
  55% {
    background: rgba(189, 195, 199, 0.4);
    border-radius: 100%;
    transform: rotate(360deg);
    box-shadow: 7em 0 0 rgba(189, 195, 199, 0.3),
      -7em 0 0 rgba(189, 195, 199, 0.3), 3em 0 0 rgba(189, 195, 199, 0.3),
      -3em 0 0 rgba(189, 195, 199, 0.3), 0 7em 0 rgba(189, 195, 199, 0.3),
      0 -7em 0 rgba(189, 195, 199, 0.3), 0 3em 0 rgba(189, 195, 199, 0.3),
      0 -3em 0 rgba(189, 195, 199, 0.3);
  }
}
</style>
<template>
  <div>
    <div class="loader"></div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <!-- <Tree :data="tree"></Tree> -->
    <vueBigTree ref="bigTree"
                :tree="tree"
                :defaultExpand="false"
                :option="option">
      <template v-slot="{ item, index }">
        <div>{{ item.label }}</div>
      </template>
    </vueBigTree>
    <div class="btn-group">
      <Button @click="expandAll"
              class="btn"
              type="primary">展开所有</Button>
      <Button @click="collapseAll"
              class="btn"
              type="primary">折叠所有</Button>
    </div>
  </div>
</template>

<script>
import vueBigTree from "@/components/vueBigTree.vue";
import HelloWorld from '@/components/HelloWorld.vue';
import generateData from "@/utils/generateTreeData";

export default {
  name: 'app',
  data () {
    return {
      option: {
        height: 500, //滚动容器的高度
        itemHeight: 25 // 单个item的高度
      },
      tree: generateData()
    };
  },
  computed: {
    // flattenTree () {
    //   const flatten = function (node) {
    //     let arr = [];
    //     node.forEach(item => {
    //       arr.push(item);
    //       if (item.children) {
    //         arr.push(...flatten(item.children));
    //       }
    //     });
    //     return arr;
    //   };
    //   return flatten(this.tree);
    // }
  },
  /* eslint-disable */
  created () {
    console.log(this.tree);
  },
  mounted () {
  },
  methods: {
    collapseAll () {
      console.time('testForEach');
      this.$refs.bigTree.collapseAll();
      console.timeEnd('testForEach');
    },
    expandAll () {
      this.$refs.bigTree.expandAll();
    },
  },
  components: {
    HelloWorld,
    vueBigTree
  },
}
</script>
