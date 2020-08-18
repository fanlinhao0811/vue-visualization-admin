<style>
#paper {
  box-sizing: content-box;
  width: 800px;
  height: 500px;
  border: 1px solid #ccc;
  float: left;
  position: relative;
}
#container {
  position: absolute;
  z-index: -1;
  top: 20px;
  left: 20px;
  width: 45px;
  height: 400px;
  border: 1px solid #cccccc;
  background: #fafafa;
}
#attr {
  width: 300px;
  height: 500px;
  float: left;
}
</style>

<template>
  <div id="rappid">
    <div id="paper">
      <div id="container"></div>
    </div>
    <div id="attr"></div>
  </div>
</template>

<script>

export default {
  name: 'rappid',
  data () {
    return {
      graph: null,
      paper: null
    };
  },
  computed: {
  },
  /* eslint-disable */
  created () {
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.graph = new joint.dia.Graph();
      this.paper = new joint.dia.Paper({
        el: $('#paper'),
        width: 800,
        height: 500,
        gridSize: 1,
        perpendicularLinks: true,
        model: this.graph
        // ,interactive: false // 所有元素不可拖动
      });

      let container = new joint.shapes.basic.Rect({
        position: {
          x: 20,
          y: 20
        },
        size: {
          width: 45,
          height: 400
        },
        angle: 0,
        style: {
          border: '1px solid #cccccc',
          borderColor: '#cccccc',
          stroke: 'blue'
        },
        attrs: {
          'rect': {
            fill: '#fafafa',
            stroke: '#ccc'
            // https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Fills_and_Strokes
          }
        },
        interactive: false
      });
      let startPoint = this.createStartPoint();
      let startPoint2 = this.createStartPoint();

      let rect = this.createRect();
      let rect2 = this.createRect();

      let rhombus = this.createRhombus();
      let rhombus2 = this.createRhombus();

      let endPoint = this.createEndPoint();
      let endPoint2 = this.createEndPoint();
      this.graph.addCell([
        // container,
        startPoint, startPoint2,
        rect, rect2,
        rhombus, rhombus2,
        endPoint, endPoint2
      ]);

      this.paper.on('cell:pointermove', function (evt, x, y) {
        //var event = evt.model.event;
        let position;
        if (evt._action === undefined || evt._action === null) {
          return;
        }
        if (evt._action === 'arrowhead-move' || evt._action === 'vertex-move') {
          position = evt.model.get('target');
        }
        else {
          position = evt.model.get('position');
        }
        if (position.x < 5) {
          position.x = 5
        }
        if (position.x > 800) {
          position.x = 800;
        }

        if (position.y < 5) {
          position.y = 5;
        }
        if (position.y > 500) {
          position.y = 500;
        }
        //event && event.pointermove && event.pointermove(evt, x, y);
      });

      this.paper.on('cell:pointerup', function (evt, x, y) {
        var event = evt.model.event;
        event && event.pointerup && event.pointerup(evt, x, y);
      });
      this.paper.on('cell:pointerclick', function (evt, x, y) {
        var event = evt.model.event;
        event && event.pointerclick && event.pointerclick(evt, x, y);
      });
      this.paper.on('blank:pointerclick', function (evt, x, y) {
        var attr = $('#attr');
        attr.empty();
      });

    },
    addLink (evt) {
      let targetPoint = evt.model.get('position');
      let link = new joint.dia.Link({
        source: {
          id: evt.model.id
        },
        target: {
          x: targetPoint.x + 150 > 800 ? 700 : targetPoint.x + 150,
          y: targetPoint.y + 13 > 500 ? 400 : targetPoint.y + 11
        },
        labels: [
          { position: 0.5, attrs: { text: { text: 'label' } } }
        ],
        attrs: {
          '.marker-target': {
            fill: '#4b4a67',
            stroke: '#4b4a67',
            d: 'M 10 0 L 0 5 L 10 10 z'
          }
        }
        //,connector: { name: 'smooth' },
      });
      this.graph.addCell(link);
      return link;
    },
    createStartPoint () {
      let options = {
        size: {
          width: 30,
          height: 30
        },
        position: {
          x: 28,
          y: 30
        },
        attrs: {
          '.root': {
            stroke: '#9586fd',
            'stroke-width': 3,
            stroke: '#000'
          },
          '.tokens > circle': {
            fill: '#7a7e9b'
          }
        },
        tokens: 1
      };
      let point = new joint.shapes.fsa.StartState(options);

      point.event = {
        pointerup: (evt, x, y) => {
          let r2 = this.createStartPoint();
          this.graph.addCell(r2);

          // 删除图形的释放事件
          delete evt.model.event.pointerup;
          // 添加线
          this.addLink(evt);
        }
      };
      return point;
    },
    createEndPoint () {
      let fsa = joint.shapes.fsa;
      let options = {
        size: {
          width: 30,
          height: 30
        },
        position: {
          x: 28,
          y: 155
        },
        attrs: {
          '.root': {
            stroke: '#9586fd',
            'stroke-width': 3,
            stroke: '#000'
          },
          '.tokens > circle': {
            fill: '#7a7e9b'
          }
        },
        tokens: 1
      };
      let point = new fsa.EndState(options);

      point.event = {
        pointerup: (evt, x, y) => {
          var r2 = this.createEndPoint();
          this.graph.addCell(r2);

          // 删除图形的释放事件
          delete evt.model.event.pointerup;

        }
      };
      return point;
    },
    createRect () {
      let options = {
        position: {
          x: 32,
          y: 75
        },
        size: {
          width: 22,
          height: 22
        },
        attrs: {
          rect: {
            stroke: '#000',
            'stroke-width': 3
          }
        }
      };
      let rect = new joint.shapes.basic.Rect(options);

      rect.event = {
        pointerup: (evt) => {
          var r2 = this.createRect();
          this.graph.addCell(r2);

          // 删除图形的释放事件
          delete evt.model.event.pointerup;
          // 添加线
          this.addLink(evt);

          // 添加点击事件
          evt.model.event.pointerclick = (evt) => {
            // evt.highlight();
            let attr = $('#attr');
            let html = ''
              + '<div>自定义，编写与后台交互的东西</div>'
              + '<div><button hook-add-link>添加线</button></div>'
              + '<div><button hook-del-node>删除节点</button></div>';
            attr.html(html);
            attr.find('[hook-add-link]').click(() => {
              this.addLink(evt);
            });

            attr.find('[hook-del-node]').click(() => {
              this.graph.removeLinks(evt.model);
              evt.remove();
            });
          }
        }
      };
      return rect;
    },
    createRhombus () {
      let options = {
        position: {
          x: 32,
          y: 115
        },
        size: {
          width: 22,
          height: 22
        },
        attrs: {
          rect: {
            stroke: '#000',
            'stroke-width': 3
          }
        }
      };
      // joint.shapes.basic.Rhombus // 并不好使
      let rect = new joint.shapes.basic.Rect(options);
      rect.rotate(45);

      rect.event = {
        pointerup: (evt) => {
          let r2 = this.createRect();
          this.graph.addCell(r2);

          // 删除图形的释放事件
          delete evt.model.event.pointerup;
          // 添加线
          this.addLink(evt);

          // 判断需要两条线，这是第二条，对第二条线做一些处理
          let link = this.addLink(evt);
          let targetPoint = evt.model.get('position');
          link.set('target', {
            x: targetPoint.x + 150 > 800 ? 700 : targetPoint.x + 11,
            y: targetPoint.y + 13 > 500 ? 400 : targetPoint.y + 150
          });

          // 添加点击事件
          evt.model.event.pointerclick = (evt) => {
            // evt.highlight();  // 高亮
            let attr = $('#attr');
            let html = ''
              + '<div>自定义，编写与后台交互的东西</div>'
              + '<div><button hook-add-link>添加线</button></div>'
              + '<div><button hook-del-node>删除节点</button></div>';
            attr.html(html);
            attr.find('[hook-add-link]').click(() => {
              this.addLink(evt);
            });

            attr.find('[hook-del-node]').click(() => {
              this.graph.removeLinks(evt.model);
              evt.remove();
            });
          }
        }
      };
      return rect;
    }


  },
  components: {
  },
}
</script>
