- 画布

```vue
<canvas id="canvas" width="200" height="200"></canvas>
<script>
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "red";
ctx.fillRect(50, 50, 100, 100);
</script>
```

- meta 标签怎么用

```html
<meta
  name="viewport"
  content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
/>
```
