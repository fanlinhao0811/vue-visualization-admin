<style>
</style>
<template>
  <div>
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
      this.$refs.bigTree.collapseAll();
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
