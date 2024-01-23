# msc-hint

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/msc-hint) [![DeepScan grade](https://deepscan.io/api/teams/16372/projects/26354/branches/836448/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=16372&pid=26354&bid=836448)

Hint is a very common UI effect to help user easy understand particular nouns. With &lt;msc-hint />, developers could adopt this feature to web page easier.

![msc-hint](https://github.com/meistudioli/msc-hint/assets/10822546/3d71761b-675a-4ac8-9af2-f0edd8cc370d)

## Basic Usage

&lt;msc-hint /> is a web component. All we need to do is put the required script into your HTML document. Then follow &lt;msc-hint />'s html structure and everything will be all set.

- Required Script

```html
<script
  type="module"
  src="https://your-domain/wc-msc-hint.js">        
</script>
```

- Structure

Put &lt;msc-hint /> into HTML document. It will have different functions and looks with attribute mutation.

```html
<msc-hint>
  <!-- Put any HTML element you like as content -->
  <div class="element-i-like-to-have">
    ...
    ...
    ...
  </div>
</msc-hint>
```

## JavaScript Instantiation

&lt;msc-hint /> could also use JavaScript to create DOM element. Here comes some examples.

```html
<script type="module">
import { MscHint } from 'https://your-domain/wc-msc-hint.js';

const template = document.querySelector('.my-template');

// use DOM api
const nodeA = document.createElement('msc-hint');
document.body.appendChild(nodeA);
nodeA.appendChild(template.content.cloneNode(true));

// new instance with Class
const nodeB = new MscHint();
document.body.appendChild(nodeB);
nodeB.appendChild(template.content.cloneNode(true));

// new instance with Class & default config
const config = {
  hover: true
};
const nodeC = new MscHint(config);
document.body.appendChild(nodeC);
nodeC.appendChild(template.content.cloneNode(true));
</script>
```

## Style Customization

Developers could apply styles to decorate &lt;msc-hint />'s looking.

```html
<style>
msc-hint {
  --msc-hint-gap: 8px;

  --msc-hint-trigger-size: 36px;
  --msc-hint-trigger-color: rgba(110 119 128);
  --msc-hint-trigger-background-color: rgba(0 0 0/.04);
  --msc-hint-trigger-icon-size: 24px;
  --msc-hint-trigger-icon-path: path('M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z');
  --msc-hint-trigger-icon-scale: 1;
  --msc-hint-trigger-overlay-color: rgba(29 34 40/.2);
  --msc-hint-trigger-active-scale: .9;

  --msc-hint-panel-border-radius: 8px;
  --msc-hint-panel-padding: 8px;
  --msc-hint-panel-background-color: rgba(255 255 255/.9);
  --msc-hint-panel-border-color: rgba(199 205 210);
  --msc-hint-panel-box-shadow: 0 0 1px rgba(0 0 0/.1), 0 2px 4px rgba(0 0 0/ .08);
}
</style>
```

Otherwise, developers could also apply ::part() to direct style panel.

```html
<style>
msc-hint::part(panel) {
  font-size: 16px;
  color: rgb(255 0 0);
  background-color: rgba(0 0 0/.3);
  ...
}
</style>
```

&lt;msc-hint />also build-in data attribytes for panel display position.

```html
<msc-hint
  data-vertical-align="end"
  data-horizontal-align="center"
>
  ...
  ...
  ...
</msc-hint>
```

- data-vertical-align： start || end. Default is `end`.
- data-horizontal-align： start || center || end. Default is `center`.

## Attributes

&lt;msc-hint /> supports some attributes to let it become more convenience & useful.

- **hover**

Set hover able for &lt;msc-hint />. Once setting, &lt;msc-hint /> will popup panel when user hover trigger. Default is `false`（not set）.

```html
<msc-hint hover>
  ...
</msc-hint>
```

## Property

| Property Name | Type | Description |
| ----------- | ----------- | ----------- |
| hover | Boolean | Getter / Setter for hover. Default is false. |


## Reference
- [&lt;msc-hint /> demo](https://blog.lalacube.com/mei/webComponent_msc-hint.html)
- [MDN > ::part()](https://developer.mozilla.org/en-US/docs/Web/CSS/::part)
- [WEBCOMPONENTS.ORG](https://www.webcomponents.org/element/msc-hint)
- [YouTube](https://youtu.be/N9pSjB1INxU)
