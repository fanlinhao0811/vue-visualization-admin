<style>
#myholder {
  width: 900px;
  height: 700px;
  margin: 0 auto;
  margin-top: 25px;
  border: 1px solid #d3d3d3;
}
</style>

<template>
  <div id="rappid">
    <div id="toolbar">
      <button class="btn add-question"
              :click='addNode'>Add Node</button>
      <button class="btn add-answer">Add Answer</button>
      <button class="btn preview-dialog">Preview Dialog</button>
      <button class="btn code-snippet">Code Snippet</button>
      <button class="btn clear">Clear Canvas</button>
      <button class="btn load-example">Load Example</button>
    </div>
    <div id="myholder"></div>
  </div>
</template>

<script>

export default {
  name: 'rappid',
  data () {
    return {
    };
  },
  computed: {
  },
  /* eslint-disable */
  created () {
  },
  mounted () {
    this.click_joint()
  },
  methods: {
    click_joint () {

      let graph = new joint.dia.Graph;

      let paper = new joint.dia.Paper({
        el: $('#myholder'),
        width: 600,
        height: 200,
        model: graph,
        gridSize: 1
      });

      let rect = new joint.shapes.basic.Rect({
        position: { x: 100, y: 30 },
        size: { width: 100, height: 30 },
        attrs: { rect: { fill: 'blue' }, text: { text: 'Hello', fill: 'white' } }
      });

      let rect2 = rect.clone();
      rect2.translate(300, 0);

      let link = new joint.dia.Link({
        source: { id: rect.id },
        target: { id: rect2.id }
      });

      graph.addCells([rect, rect2, link]);
    },
    addNode () {

    }
  },
  components: {
  },
}
</script>
