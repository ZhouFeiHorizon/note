### dialog

```html
<!-- 原生dialog优势 -->
<dialog id="nativeDialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">原生对话框</h2>
  <p>内容...</p>
  <form method="dialog">
    <button value="confirm">确认</button>
  </form>
</dialog>

<script>
  // 原生dialog特性
  dialog.showModal(); // 自动焦点管理、ESC关闭、背景锁定
  dialog.close();    // 自动焦点回到触发元素
  // 无需手动管理z-index、滚动锁定
</script>

```
