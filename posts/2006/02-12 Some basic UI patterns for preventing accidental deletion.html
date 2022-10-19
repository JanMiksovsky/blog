---
title: "Some basic UI patterns for preventing accidental deletion"
date: 2006-02-12
originalUrl: https://miksovsky.blogs.com/flowstate/2006/02/some_basic_ui_p.html
---

<p>
  Many client applications and web sites let the user enter and manipulate data,
  and these manipulations often include the ability to delete data. Designers of
  UIs that include deletion of data generally feel the need to protect the user
  from unintentionally destroying data. For such a UI, it's important to
  consider the context surrounding the Delete command (or whatever action
  triggers deletion) before settling on a solution.
</p>
<p>
  It's worth asking: exactly what is the concern with the user clicking a Delete
  button? I've often heard people express fear that the user's mouse might slip
  and click a Delete button, or that the user might not be paying much attention
  to what they are doing and might stab at the Delete button without
  understanding what it will do. I suspect that, in many cases, designers now
  habitually second guess the user's intention behind a deletion without
  considering alternatives.
</p>
<p>
  <img src="/images/flowstate/mac_trash.png" alt="Mac_trash" />
</p>
<p>
  Designers actually have more choices at their disposal than a delete
  confirmation dialog. Here's a quick survey of some UI patterns for a Delete
  command, in rough order of what I perceive to be the most frequently
  encountered to least frequently encountered:
</p>

<ol>
  <li>
    Delete with Confirmation Dialog. The user selects a Delete command (or press
    the Del key, etc.) and the application displays an &quot;Are you sure?&quot;
    dialog; the application only deletes the data if the user responds
    affirmatively. Such dialogs are ubiquitous. The goal is to provide the user
    with a second chance to consider their action. In my experience, such
    dialogs provide slender protection—users can blow past the confirmation
    dialog before their brain has even registered what it is asking them.<br />
  </li>

  <li>
    Delete Immediately. The user selects Delete, and the application deletes the
    data immediately. This is generally used if the amount of accidental loss is
    very small, or if it's quite easy to reconstruct any accidentally deleted
    data. A good example here is the Delete button next to items in today's
    typical web shopping cart. In my opinion, this plain &quot;Delete
    Immediately&quot; pattern is woefully underused. As shopping carts show,
    it's perfectly fine to blow away data immediately if the user can just
    quickly add back something they didn't mean to delete. (This is probably
    another case where the difficulty of producing a dialog in vanilla HTML
    inadvertently leads to a better UI.)
  </li>

  <li>
    Delete + Undo (single or multi-level). The application deletes the data
    immediately, but allows the user to undo the deletion by selecting separate
    Undo command. The application may allow the user to Undo only the most
    recent operation, or any arbitrarily long history of operations. The classic
    example here is a text editor. Most decent file system browsers support an
    Undo stack as well. This model is actually quite nice: it provides the
    benefits of Delete Immediately, and moves the complexity of restoring data
    to those users actually facing the need to get their data back. Even a
    single level of Undo can be helpful, as described in this
    <a href="http://www.artima.com/weblogs/viewpost.jsp?thread=97581"
      >post about Gmail's Undo Deletion command</a
    >.
  </li>

  <li>
    Trash (with manual or automatic cleanup). The application moves deleted data
    to a temporary Trash bin (or Recycle Bin, if you're afraid of being sued by
    Apple). The user can recover deleted data from the Trash. The data is
    permanently deleted at some later point in time: when a time interval
    elapses, when some space threshold is exceeded, or when the user manually
    empties the Trash. The classic example here is the Mac Trash can, but most
    email clients follow this model as well. Perhaps because of these strong
    precedents, the Trash pattern is used almost exclusively in icon-based
    object-oriented UIs, and rarely anywhere else.
  </li>

  <li>
    Mark for Deletion. The user invokes Delete, and the selected data is marked
    in some way (e.g., grayed out, or with <del>strikethrough</del>) to indicate
    that the data is still there, but will no longer be treated as active
    (included in calculations, etc.). As with the Trash pattern, the data is
    permanently deleted at a later point. Example: IMAP email clients such as
    Mozilla Thunderbird. I consider this to be another under-utilized
    pattern.<br />
  </li>

  <li>
    Delete with Context-Sensitive Confirmation Dialog. The user selects Delete,
    and the application determines from the data to be deleted or other
    contextual information whether the user is likely to be unaware of
    consequences of the operation. In other words, the delete confirmation
    dialog <em>only comes up with when it's important</em>. A tepid example of
    this pattern comes up in text editors that only give you a &quot;Save
    changes?&quot; dialog if you're trying to close a non-empty document, but
    that close an empty document silently. This is another pattern that could
    benefit from much wider use. The basic idea is that, if the dialog only came
    up in the 10% of the time the user was really about to shoot themselves in
    the foot, the user would have a higher chance of stopping to read what it
    said. &quot;Are you sure you want to delete this file you've been working on
    for <strong>the last eight hours</strong>?&quot;
  </li>
</ol>

<p>
  Any time an &quot;Are you sure?&quot; dialog is about to be added to a UI
  should force you to at least briefly consider whether an alternative pattern
  might better suit the context.
</p>
