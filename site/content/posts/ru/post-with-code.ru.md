---
templateKey: blog-post
category: blog
path: /blog/post-with-code
title: Пример текста с кодом
excerpt: Код из markdown-файла и iframe
date: "2020-04-26T13:42:27"
coverImg: /uploads/karl-pawlowicz-QUHuwyNgSA0-unsplash.jpg
published: true
---

Тестовая запись для проверки работы Prismjs и iframe с кодом.

```markdown
## Here is what I mean

![Full width image](/uploads/cornelius-dammrich-52hz-shot-a-web-high.jpg)
```

```css
.blog-index {
  margin-top: 10px;
  margin-bottom: 10px;
}
```

```js
const myAwesomeFunction = (data) => {
  if (!data) {
    return null;
  }

  return data.filter(item => item.id);
}
```

And now I'll paste codesandbox widget.

<iframe
     src="https://codesandbox.io/embed/dragndrop-upload-files-form-cyyvl?autoresize=1&fontsize=14&hidenavigation=1"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Drag&#039;n&#039;drop upload files form"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Here is Carbon post

<iframe
  src="https://carbon.now.sh/embed/P6NeN49MgBHkDCJXe126"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>
