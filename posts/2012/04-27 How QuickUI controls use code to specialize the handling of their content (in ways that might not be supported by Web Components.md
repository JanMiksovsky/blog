---
title: "How QuickUI controls use code to specialize the handling of their content (in ways that might not be supported by Web Components"
originalUrl: http://blog.quickui.org/2012/04/27/how-quickui-controls-use-code-to-specialize-the-handling-of-their-content-in-ways-that-might-not-be-supported-by-web-components/
---

<p>
  As indicated in the earlier overview comparing
  <a
    href="http://blog.quickui.org/2012/04/16/a-vision-for-coevolving-quickui-and-the-emerging-web-components-standard/"
    >QuickUI and Web Components</a
  >, one significant difference between the two frameworks is that QuickUI
  allows code to run when a control’s content() property is set, while the Web
  Components spec does not currently allow for this. This post will attempt to
  begin making the case for the need for this feature, starting with an analysis
  of how that feature is used in QuickUI controls today.
</p>
<p>
  The largest public body of QuickUI controls is
  <a href="https://quickui.org/catalog">QuickUI Catalog</a>, which as of this
  writing includes 76 open source controls that handle a variety of common user
  interface tasks or serve as demonstrations of how to achieve common behaviors
  in controls. Of the 76 published controls:
</p>
<ul>
  <li>
    32 controls include code that runs when their content() property is set.
    Since the base Control class already provides a default content() property,
    these controls are overriding that base implementation. (In some cases, like
    <a href="https://quickui.org/catalog/PopupSource">PopupSource</a>, the
    class’ content() property override is itself overridden by a subclass like
    <a href="https://quickui.org/catalog/ComboBox">ComboBox</a>.)
  </li>
  <li>
    Of the above 32 controls, 23 use their content() property override to
    delegate content to a sub-element. This is the standard approach in QuickUI
    for a control to incorporate content from its host. (For a working example,
    see this <a href="http://jsfiddle.net/quickui/ys2JQ/">jsFiddle</a>, in which
    a UserTile control delegates its content to a span inside the control. This
    topic is also covered in the second portion of the QuickUI JavaScript
    <a href="https://quickui.org/tutorial">tutorial</a>.) This is roughly
    analogous to what Web Components spec accomplishes with the proposed
    &lt;content&gt; element.
  </li>
  <li>
    12 controls (of the 76 in the catalog) are text box variations that delegate
    their content() property to a text box: either an &lt;input&gt; element of
    type “text” or a &lt;textarea&gt;. For example, the content() of a
    <a href="https://quickui.org/catalog/ListComboBox/">ListComboBox</a> will be
    placed inside an &lt;input&gt;. Historically, HTML input fields have
    insisted on handling the field’s value through a string “value” property,
    whereas an element’s content is a DOM subtree. Despite the difference in
    data type, in many cases the distinction between “value” and “content” feels
    somewhat arbitrary. The convenience of a content property is just as
    interesting to a control that wants to render that content in a text box.
    For example, if a combo box is going to hold a list of animal names, it’s
    nice to be able to set the default content of that combo box in markup
    as:&lt;ListComboBox&gt;Dog&lt;/ListComboBox&gt;. Naturally, this translation
    is lossy: if one passes a DOM subtree into such a control’s content()
    property, it’s to be expected that it will only preserve the subtree’s text.
    Nevertheless, it is highly useful to be able to define controls that render
    their primary content in text boxes.
  </li>
  <li>
    20 of the controls override their content() property to perform work
    whenever the content changes. The following table summarizes these 20 cases:
  </li>
</ul>
<table width="585" border="0" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td valign="top" width="32"></td>
      <td valign="top" width="175"><strong>Control</strong></td>
      <td valign="top" width="376">
        <strong>When content() property is set, the control…</strong>
      </td>
    </tr>
    <tr>
      <td valign="top" width="32"></td>
      <td valign="top" width="175">
        <a href="https://quickui.org/catalog/AutoSizeTextBox"
          >AutoSizeTextBox</a
        >
      </td>
      <td valign="top" width="376">
        Recalculates its own height to match that of the content.
      </td>
    </tr>
    <tr>
      <td valign="top" width="32"></td>
      <td valign="top" width="175">
        <a href="https://quickui.org/catalog/ColorSwatchButton"
          >ColorSwatchButton</a
        >
      </td>
      <td valign="top" width="376">
        Transforms a string color name/value into a color.
      </td>
    </tr>
    <tr>
      <td valign="top" width="32"></td>
      <td valign="top" width="175">
        <a href="https://quickui.org/catalog/ColorSwatchTextBox"
          >ColorSwatchTextBox</a
        >
      </td>
      <td valign="top" width="376">
        Transforms a string color name/value into a color.
      </td>
    </tr>
    <tr>
      <td valign="top" width="32"></td>
      <td valign="top" width="175">
        <a href="https://quickui.org/catalog/HighlightEffects"
          >HighlightEffects</a
        >
      </td>
      <td valign="top" width="376">Recalculates its height/width.</td>
    </tr>
    <tr>
      <td valign="top" width="32"></td>
      <td valign="top" width="175">
        <a href="https://quickui.org/catalog/HintTextBox">HintTextBox</a>
      </td>
      <td valign="top" width="376">Shows hint text if the content is empty.</td>
    </tr>
    <tr>
      <td valign="top" width="32"></td>
      <td valign="top" width="175">
        <a href="https://quickui.org/catalog/Menu">Menu</a>
      </td>
      <td valign="top" width="376">
        Recalculates the width of a subelement (a “shield” element that must be
        exactly as wide as the content to achieve a particular visual effect).
      </td>
    </tr>
    <tr>
      <td valign="top" width="32"></td>
      <td valign="top" width="175">
        <a href="https://quickui.org/catalog/PackedColumn">PackedColumns</a>
      </td>
      <td valign="top" width="376">Recalculates its layout.</td>
    </tr>
    <tr>
      <td valign="top" width="32"></td>
      <td valign="top" width="175">
        <a href="https://quickui.org/catalog/PanelWithOverflow"
          >PanelWithOverflow</a
        >
      </td>
      <td valign="top" width="376">Recalculates its layout.</td>
    </tr>
    <tr>
      <td valign="top" width="32"></td>
      <td valign="top" width="175">
        <a href="https://quickui.org/catalog/PersistentPanel"
          >PersistentPanel</a
        >
      </td>
      <td valign="top" width="376">
        Checks to see whether the panel should be docked or not.
      </td>
    </tr>
    <tr>
      <td valign="top" width="32"></td>
      <td valign="top" width="175">
        <a href="https://quickui.org/catalog/PopupButton">PopupButton</a>
      </td>
      <td valign="top" width="376">
        Adjusts its layout if the content is not empty.
      </td>
    </tr>
    <tr>
      <td valign="top" width="32"></td>
      <td valign="top" width="175">
        <a href="https://quickui.org/catalog/Repeater">Repeater</a>
      </td>
      <td valign="top" width="376">
        Copies the content into the array of repeated sub-controls.
      </td>
    </tr>
    <tr>
      <td valign="top" width="32"></td>
      <td valign="top" width="175">
        <a href="https://quickui.org/catalog/SearchBox">SearchBox</a>
      </td>
      <td valign="top" width="376">
        Enables its search icon if the content is not empty.
      </td>
    </tr>
    <tr>
      <td valign="top" width="32"></td>
      <td valign="top" width="175">
        <a href="https://quickui.org/catalog/SlidingPages">SlidingPages</a>
      </td>
      <td valign="top" width="376">Recalculates its height/width.</td>
    </tr>
    <tr>
      <td valign="top" width="32"></td>
      <td valign="top" width="175">
        <a href="https://quickui.org/catalog/SlidingPagesWithDots"
          >SlidingPagesWithDots</a
        >
      </td>
      <td valign="top" width="376">
        Updates the number of page buttons to match the number of pages (i.e.,
        child nodes) in the content.
      </td>
    </tr>
    <tr>
      <td valign="top" width="32"></td>
      <td valign="top" width="175">
        <a href="https://quickui.org/catalog/Switch">Switch</a>
      </td>
      <td valign="top" width="376">
        Determines which child should be visible.
      </td>
    </tr>
    <tr>
      <td valign="top" width="32"></td>
      <td valign="top" width="175">
        <a href="https://quickui.org/catalog/Tab">Tab</a>
      </td>
      <td valign="top" width="376">
        Lets the parent tab set know the tab’s size may have changed.
      </td>
    </tr>
    <tr>
      <td valign="top" width="32"></td>
      <td valign="top" width="175">
        <a href="https://quickui.org/catalog/TabSet">TabSet</a>
      </td>
      <td valign="top" width="376">Creates a tab button for each tab page.</td>
    </tr>
    <tr>
      <td valign="top" width="32"></td>
      <td valign="top" width="175">
        <a href="https://quickui.org/catalog/TextBox">TextBox</a>
      </td>
      <td valign="top" width="376">Generates a programmatic “change” event.</td>
    </tr>
    <tr>
      <td valign="top" width="32"></td>
      <td valign="top" width="175">
        <a href="https://quickui.org/catalog/TextCondenser">TextCondenser</a>
      </td>
      <td valign="top" width="376">
        Determines whether the text should appear condensed to help it fit.
      </td>
    </tr>
    <tr>
      <td valign="top" width="32"></td>
      <td valign="top" width="175">
        <a href="https://quickui.org/catalog/ValidatingTextBox"
          >ValidatingTextBox</a
        >
      </td>
      <td valign="top" width="376">Validates the contents.</td>
    </tr>
  </tbody>
</table>
<p>
  To summarize, these controls are doing the following types of work when their
  content changes:
</p>
<ul>
  <li>
    Adjust its dimensions or the dimensions of some subelements (e.g.,
    AutoSizeTextBox, Menu).
  </li>
  <li>
    Layout contents to achieve results not directly supported in HTML and CSS
    (e.g., PackedColumns, PanelWithOverflow).
  </li>
  <li>
    Transform or manipulate the content before rendering it (e.g., Repeater,
    ColorSwatch).
  </li>
  <li>
    Update its own subelements based on the content (e.g., TabSet,
    SlidingPagesWithDots).
  </li>
  <li>
    Validating content (e.g., ValidatingTextBox, and its subclasses like
    <a href="https://quickui.org/catalog/DateTextBox/">DateTextBox</a>).
  </li>
</ul>
<p>
  Such controls represent a significant percentage of the QuickUI Catalog —
  approximately 25% — and it’s very likely that similar results would be found
  in other QuickUI-based projects. And in addition to the scenarios listed
  above, other scenarios likely exist in which a control wants to perform work
  when its content changes.
</p>
<p>
  Overall, this pass through the QuickUI Catalog suggests that many interesting
  user interface components have a need to perform work when their content is
  set — to do something more than passively hold the content they’re passed. At
  this point, it’s not exactly whether the aforementioned QuickUI controls could
  be successfully ported to Web Components as the spec currently stands, which
  would be unfortunate. (As stated in the previous post, a long-term vision for
  the QuickUI framework is that controls created in QuickUI can be transitioned
  to a Web Components foundation in the future.)
</p>
<p>
  It’s possible that a component could use forthcoming support for DOM mutation
  observers could be used to track changes to its own content, but whether this
  would work, or work well, is not yet known. A control could also force its
  host to invoke some method on the control whenever the host changes the
  control’s content, but that would be unfortunate; it would place extra work on
  the developer, and a host’s failure to properly notify the control that its
  contents have changed could lead to subtle bugs.
</p>
