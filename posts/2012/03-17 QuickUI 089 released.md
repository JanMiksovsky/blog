---
title: "QuickUI 0.8.9 released"
originalUrl: http://blog.quickui.org/2012/03/16/quickui-0-8-9-released/
---

<p>A minor update.</p>
<ul>
  <li>
    To facilitate controls that want to perform their own layout, controls can
    bind to a new
    <a href="https://quickui.org/docs/control-events.html#layout">layout</a>
    event. Catalog controls like HorizontalPanels, VerticalPanels,
    PanelWithOverlfow, and PersistentPanel use this to recalculate the layout of
    their contents in response to a change in window size.
  </li>
  <li>
    A companion event called
    <a href="https://quickui.org/docs/control-events.html#sizeChanged"
      >sizeChanged</a
    >
    can be triggered by a control that wants to cooperatively let its parents
    know about a change in the control's size.
  </li>
  <li>
    A helper Control method called
    <a
      href="https://quickui.org/docs/control-prototype-methods.html#checkForSizeChange"
      >checkForSizeChange()</a
    > can be called if a control has updated its contents and there's the
    possibility that its size has changed. The helper records the control's last
    known size and, if the size has indeed change, raises the aforementioned
    sizeChanged event.
  </li>
</ul>
