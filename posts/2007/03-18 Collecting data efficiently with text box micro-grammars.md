---
title: "Collecting data efficiently with text box micro-grammars"
originalUrl: https://miksovsky.blogs.com/flowstate/2007/03/collecting_data.html
---

<p>
  A tiny bit of language support can turn a simple text box into a compact and
  powerful way to let a user quickly supply complex data. An application can
  constrain the allowable text to adhere to a small and computer-friendly
  grammar that mirrors somewhat a natural human language. Even a highly
  constrained grammar can still produce a user experience that feels natural.
  This works best when the domain of text a user might enter is small, when the
  user can easily imagine what they can type, and when the designer and
  developer can collaborate on thoughtful construction of the grammar.
</p>
<p>
  A simple example of a micro-grammar at work is a UI combining a scalar
  quantity and a unit into a single field, such as the measurement fields in
  Microsoft Word 2007. These fields throughout Word accept a variety of units,
  such as inches, metric centimeters, points, or lines. As in natural (here,
  English) language, the units directly follow the numeric value:
</p>
<p>
  <img src="/images/flowstate/102106_1833_Microgramma1_1.png" />
</p>
<p>
  The fields on the left in the image above happen to be showing measurements in
  inches (&quot;) while those on the right are showing points, but all the
  fields accept all supported units. The controls not only parse out the value
  from the units, they can also convert and render measurements in a canonical
  format. In the default settings for the Microsoft Word on a U.S. system,
  indentations are converted to inches, and leading is converted to points.
</p>
<p>
  Compare the above to an application like Adobe PhotoShop CS2 that uses
  standard operating system controls:
</p>
<p>
  <img src="/images/flowstate/102106_1833_Microgramma2.png" />
</p>
<p>
  Here the user must enter units separately, requiring that they move the focus
  with the mouse or keyboard. The UI also looks significantly more cluttered.
  Word's text-parsing micro-grammar let one control in Word do the job of two in
  Photoshop. The trade-off is one of cleanliness versus discoverability. This
  efficiency is critical in cases like Word's Ribbon, in which a large number of
  controls are packed into a small space. On the other hand, using two controls
  makes clearer what units are supported. A UI with separate controls is also
  significantly easier to implement.
</p>
<p>
  One distinct advantage of text boxes that support micro-grammars is that they
  can offer shortcuts to power users without compromising the simplicity of the
  typical user's experience. The date fields in Microsoft Outlook, for example,
  not only accept dates in local form, but also accept shortcut phrases such as
  &quot;tomorrow&quot; or &quot;next Tuesday&quot;. Some supported shortcuts
  don't seem to add much value. The U.S. version of Outlook lets the user type
  the names of a number of common American holidays like &quot;Christmas&quot;
  (but not Easter, the date of which involves non-trivial astronomy, and even an
  overeager Microsoft Office developer has to stop somewhere).
</p>
<p>
  It's dubious that the ability to type in &quot;New Year's Day&quot; as an
  appointment date has ever actually helped anyone—who schedules appointments on
  New Year's Day, anyway? Still, even these dubious shortcuts don't clutter
  anything up. Another advantage is that such text boxes allow the pasting of
  complete text from other sources directly into the UI in one step, letting the
  application do the work of breaking apart relevant information instead of
  forcing the user to do this by hand.
</p>
<p>
  To have a program understand text the user has typed requires that a developer
  create a parser: a chunk of code that implements the rules of the grammar to
  determine what the user is trying to express with that text. If the desired
  grammar is extremely simple, a developer might hand-code a parser for it, but
  this can quickly get out of hand. More complex grammars typically entail the
  use of a parser generated by a tool. For example, if it's possible to restrict
  the supported input to a form known as a
  <a href="http://en.wikipedia.org/wiki/Context-free_grammar"
    >context-free grammar</a
  >, there are a wide variety of tools for generating a parser that can handle
  such grammar.
</p>
<p>
  Any attempt to optimize a micro-grammar for the nuances of one natural
  language will, of course, complicate matters if and when the need arises to
  localize the UI for other languages. Suppose some culture normally puts the
  units <em>before</em> the numeric value. Users in this culture might
  reasonably expect to be able to enter data that way. If the parser has been
  generated with a tool, it should be relatively straightforward for the
  developer to create a new grammar definition that swaps the position of those
  elements. The rest of the application logic should remain virtually unchanged.
</p>
<p>
  I'm not sure how many software companies would actually go through the trouble
  to adapt a micro-grammar for a specific market. Then again, companies rarely
  go through much trouble to change the layout of a dialog like the one from
  PhotoShop above, in which the layout of the controls is heavily biased in
  support of the designer's natural language. The work required to update a
  well-factored grammar definition is likely less than that required to
  reposition a significant number of controls across a large number of pages or
  dialogs.
</p>
