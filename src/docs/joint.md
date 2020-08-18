## Joint.js 学习

> joint.js

### 简述

此文档针对 JointJS 的部分，如果你找的是 Rappid 的文档，请点击 [这里](http://www.jointjs.com/rappid/docs)，Rappid 是在 JointJS 基础上进行扩展功能更为丰富的组合套件。

JointJS 向外暴露三个全局变量：**joint**、**v** 和 **g**。

`joint` 下存放画示意图所需的全部对象，通过 `joint.version` 这个属性你可以知道当前使用的是哪一个版本 JointJS

`V` 这一全局变量来自于一个轻量级被我们称作“Vectorizer”的 svg 框架，这个框架使操作 svg 变得更简单。

`g` 这一全局变量也来自 JointJS 内部使用的一个轻量级库，此库提供了很多好用的几何运算函数。



### 安装

1.npm

2.资源 [下载链接](http://www.jointjs.com/download)

```js
<link rel="stylesheet" type="text/css" href="joint.css" />
<script src="jquery.min.js"></script>
<script src="lodash.min.js"></script>
<script src="backbone-min.js"></script>
<script src="joint.js"></script>
```



### joint

#### joint.dia.Element

> `joint.dia.Element` 是图形元素的基类。它是 [Backbone model](http://backbonejs.org/#Model) 模块，并添加了一些额外属性，第一个重要的属性就是每个元素都要有一个不重复的标识，这个标识被存储在 `id` 属性中。其他的属性可以被存放在下面三个组中

Geometry(几何类属性)

元素的坐标以对象的形式被存储在 `position` 属性中，此对象包括两个属性 `x` 和 `y`，`position` 属性可以被初始化设置，也可以直接通过 Backbone 的 `get`/`set` 方法来获取/修改，还可通过下面的 `translate` 方法来修改。

旋转角度被存储在 `angle` 属性中，旋转的参照点始终是元素的中心，`angle` 属性同样可以被初始化设置，也可以直接通过 Backbone 的 `get`/`set` 方法来获取/修改，还可通过下面的 `rotate` 方法来修改。

元素的大小以对象的形式被存储在 `size` 属性中，此对象包括两个属性 `width` 和 `height`，`size` 属性同样可以被初始化设置，也可以直接通过 Backbone 的 `get`/`set` 方法来获取/修改，还可通过下面的 `resize` 方法来修改。



Presentation(外观类属性)

另外一个重要的属性是 `attrs`， `attrs` 是一个对象，其属性名是子元素的选择器，对应的值设置 svg 元素的属性从而改变元素的内容和外观，[这里](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute)有 svg 元素属性列表。

需要重点注意，每一个通过 `joint.dia.Element` 定义的 svg 元素组合都要通过 `joint.dia.ElementView` 渲染到页面上。比如 `joint.shapes.basic.Rect` 元素组合(继承自`joint.dia.Element`) 在页面中表现如下：

```js
<g class="rotatable"><g class="scalable"><rect/></g><text/></g>
```

为一个矩形子元素填充红色，可以为 `attrs` 添加如下属性：

```js
rect: { fill: 'red' }
```

建议通过 `attr` 方法来修改属性对象，而不直接修改 `attrs` 属性，

`z` 是一个特殊的属性，决定了子元素的层级遮盖关系，`z` 值大的元素在 `z` 值小的元素上面。



Nesting(关系)

最后两个重要属性是 `embeds` 和 `parent`，这两个属性用来定义元素的包含于被包含关系，`embeds` 定义包含哪些元素，其值是一个数组，存放被包含实例的 id。`parent` 存放父元素的 id，当父元素翻转的时候子元素跟着一起翻转。

##### tips

所有的图形的数据对象都继承自 `joint.dia.Element`，但 `joint.dia.Element` 并不能直接使用，需要和视图关联才能在页面上渲染出图形。图形数据对象都被放在 `joint.shapes` 下，最基本的图形数据对象被放在 `joint.shapes.basic` 下。`joint.shapes.basic` 包含了矩形、圆、图片、文字等基本元素，可以像下面这样声明一个矩形：

```js
var rect = new joint.shapes.basic.Rect(...);
```



#### translate

`element.translate(tx, [ty], [opt])`

将一个元素在 x 轴方向移动 `tx` 像素，在 y 轴方向移动 `ty` 像素。`ty` 是一个可选参数，默认值为零。配置项参数 `opt` 可用来传递一些额外参数供监听事件 `'change:position'` 的回调函数来接收，`opt.transition` 可被用来设置过渡效果，而不是生硬的突然改变位置，配置详情见 `joint.dia.Element:transition`。可以用 `opt.restrictedArea` 配置将移动限制在一个区域内，像这样:

```js
{
    x: 0,
    y: 0,
    width: 500,
    height: 500
}
```

如果你想把它的移动方位限制在他的父元素中，只需要获取将父元素的 `BBox` 作为 `opt.restrictedArea` 的值，像这样：

```js
myElement.translate(50, 50, {
    restrictedArea: graph.getCell(myElement.get('parent')).getBBox() 
});
//代码保证在子元素不会移动到父元素外面，这种约束对其子元素同样生效。
```

##### tips

`translate` 是基于当前位置做位置改变，坐标左上角是原点，水平向右是 x 轴正方向，竖直向下是 y 轴正方向，`translate` 的位置变化值可正可负，分别对应于想坐标轴正向移动和负向移动。



#### position

```js
element.position(x, y, [opt])
```

此方法用于设置元素的 x,y 坐标，近似等于 `element.set('position', { x: x, y: y }, opt)`，不同的是`position`这个方法提供了更为丰富的配置。如果将 `opt.parentRelative` 设为 `true`，那么所设置坐标值的原点是当前元素父元素的坐标。如果访问此方法不带参数，那么返回当前元素的坐标。如果 `position({ parentRealtive: true })` 这样访问，返回的是当前元素相对于其父元素的坐标。



#### resize

```js
element.resize(width, height [, opt])
```

对于有高和宽属性的[伸缩元素组](http://www.jointjs.com/tutorial#custom-elements) ，改变很方便的改变其大小，元素改变大小后左上角位置是不变的，当然这可以通过`opt.direction`参数来设置元素大小的扩展方向，可选值有：`left`,`right`,`top`,`bottom`,`top-left`,`top-right`,`bottom-left`,`bottom-right`(默认值)。

这个方法和传统的元素缩放有一些不同，`resize`不会缩放全部子元素，他只会缩放 `<g class="scalable"/>` 这样的svg元素节点，这样可以灵活的定义子节点缩放还是不缩放。想象一下，如果有一个简单的长方形里面还包含一个文本节点，通常我们缩放长方形的时候并不希望改变字体大小，而且希望文字节点字号不变并居中显示，要实现这个是很容易的，通过向`<rect/>`元素中添加`<text ref-x=".5" ref-y=".5" ref="rect" />`元素，其中的 `ref-x`、`ref-y`和`ref`是 SVG的标准属性，这些特殊属性可以被 JointJs 识别，关于这类属性的更多资料可以在[特殊属性](http://www.jointjs.com/api#SpecialAttributes)中找到。





### joint.dia.Link

joint.dia.Link**是线的基类，在 [Backbone model](http://backbonejs.org/#Model) 的基础上添加一些重要属性，其中第一个不得不提的重要属性还是 id，其他的属性可以分为下面三类

1.





### joint.dia.Graph

`joint.dia.Graph` 存储包括`Link` 和 `Element`所有的图形。它是一个 [Backbone model](http://backbonejs.org/#Model)，将所有的图像存储在 `cells` 属性中。

它是所有图形背后强大的数据模块，不仅直接提供图形的数据存储，还提供图形绘制的算法支持。



###  joint.dia.Paper

`joint.dia.Paper` 是 `joint.dia.Graph` 的视图模块，继承自 [Backbone View](http://backbonejs.org/#View)。

当视图和数据关联起来时，向数据模块添加图形数据，视图模块会立刻将其渲染到界面上。

```js
var graph = new joint.dia.Graph
var paper = new joint.dia.Paper({
    el: $('#paper'),
    width: 600,
    height: 400,
    gridSize: 10,
    model: graph
})
var rect = new joint.shapes.basic.Rect({
    position: { x: 50, y: 70 },
    size: { width: 100, height: 40 }
})
graph.addCell(rect)
```



### joint.dia.ElementView

`joint.dia.ElementView` 是 `joint.dia.Element`本身或者其集成对象的视图，继承自 [Backbone View](http://backbonejs.org/#View)。

`joint.dia.ElementView` 负责将元素的设置渲染到视图中，转换的方式也在它内部定义。

`joint.dia.ElementView` 还维护事件。可以通过 `paper` 的 `findViewByModel` 方法查找数据对应的视图。



### joint.dia.LinkView

`joint.dia.LinkView` 是 `joint.dia.Link`本身或者其集成对象的视图，继承自 [Backbone View](http://backbonejs.org/#View)。

`joint.dia.LinkView` 负责将数据模块的设置渲染到视图中。



### Special Attributes

`Special Attributes` 是 JointJS 定义的，帮助用户自定义时尚的图形元素。参看[Creating custom elements ](http://www.jointjs.com/tutorial#custom-elements)



### Utility Functions

>  `joint.util` 下的常用函数介绍。

#### uuid

`joint.util.uuid()` 生成一个独一无二的 id。

#### guid

`joint.util.guid()` 为 page 返回一个独一无二的 id





### V

> `v` 是一个辅助处理 svg 的函数，来自 Vectorizer 的库。将它作为全局变量而没有放在 `joint` 命名空间下的理由是，它是一个独立的库，不依赖于 `joint`可以单独被使用。 它是一个非常有用的库，使处理 svg 变得更简单容易，甚至可以把它看成一个针对 svg 的轻量级 jQuery。这里[开发版和压缩版](http://www.jointjs.com/download#vectorizer)可供下载。

`V(svg)` 返回一个 Vectorizer 对象。 如果 `svg` 参数是字符串，那么会被解析成 SVG DOM 元素节点，然后包装成 Vectorizer 对象返回；如果 `svg` 参数已经是 SVG DOM 元素节点，那么直接包装返回。你可以把 V 看做是 jQuery 的对外变量 `$`，只是 `V` 不接受选择器参数。Vectorizer 对象提供了 `node` 属性来对外提供原生的 SVG DOM 元素节点。示例：

```js
var myElement = V('<g><rect/><text/></g>');
console.log(myElement.node);  // SVGGroupElement
myElement = V(document.querySelector('#mySVGElement'));

var myCircle = V('circle', { r: 5, fill: 'red' });
console.log(myCircle.node);  // SVGCircleElement
```





### g

> Geometry是另外一个内嵌到 JointJS 中的轻量级库。此库提供了很多有用的关于几何学的计算方法，并且不依赖于任何其他库，可以被单独使用。这里[开发版和压缩版](http://www.jointjs.com/download#geometry)可供下载。





### 链接

[官网](http://www.jointjs.com/)

[jointJs API](http://www.jointjs.com/api)

[Vectorizer API](http://www.jointjs.com/api#v)

[Geometry API](http://www.jointjs.com/api#g)

[github](https://github.com/clientIO/joint)