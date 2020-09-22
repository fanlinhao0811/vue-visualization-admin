## Rappid.js 学习

> Rappid.js

### 简述

Rappid是功能强大的现代工具包，用于构建各种可视化工具，分为多个模块。

- **ui** - 用户与之交互的小组件
- **dia** - 工具包，包括撤消/重做，图形操作，验证等
- **com** - 与服务器通讯，目前仅包含用于实时协作的模块。
- **shapes** - 各种图表形状，包括各种图表
- **format** - 导出为矢量和栅格格式，导入，打印。
- **storage** - 存储
- **alg** - 算法和数据结构
- **layout** - 自动布局



### ui

#### Halo

> Halo使用各种工具在元素上方创建一个控制面板。可以使用工具来控制元素。

```html
<link rel="stylesheet" type="text/css" href="joint.ui.halo.css">
<script src="joint.ui.halo.js"></script>
```

```javascript
var graph = new joint.dia.Graph;
var paper = new joint.dia.Paper({ el: $('#paper'), width: 500, height: 500, model: graph });

paper.on('cell:pointerup', function(cellView) {
  // We don't want a Halo for links.
  if (cellView.model instanceof joint.dia.Link) return;

  var halo = new joint.ui.Halo({ cellView: cellView });
  halo.render();
});
```

##### Default handles (tools)

|  |                                          |
| :----- | ------------------------------------------------------------ |
| remove | Remove the element.                                          |
| clone  | Drag to clone the element.                                   |
| link   | Drag to link the element with another element. Note that the new link will be created based on the `defaultLink` option from the [`joint.dia.Paper`](https://resources.jointjs.com/docs/JointJS#dia.Paper) object. |
| fork   | Drag to clone the element and connect it with cloned element in one go. |
| unlink | Remove all the links coming in/out of the element.           |
| resize | Resize the element.                                          |
| rotate | Rotate the element.                                          |

##### Disabling halo tools

```
1. halo.removeHandle('clone');
2. .halo .handle.clone { display: none; } /* disables the clone tool */
3. .halo .handle.remove {
       left: -25px;
       bottom: -25px;
       top: auto;
       right: auto;
    }
```

##### Customizing halo tools

 `addHandle()`, `removeHandle()` and `changeHandle()`

```javascript
halo.addHandle({ name: 'myaction', position: 's', icon: 'myaction.png' });
halo.on('action:myaction:pointerdown', function(evt) {
  evt.stopPropagation();
  alert('My custom action.');
});
```

#### Toolbar type of Halo

```javascript
new joint.ui.Halo({ cellView: myElementView, type: 'pie' })
new joint.ui.Halo({ cellView: myElementView, type: 'toolbar' })
```









Q：

1.为什么要用rappid

2.看源码具体看什么

3.