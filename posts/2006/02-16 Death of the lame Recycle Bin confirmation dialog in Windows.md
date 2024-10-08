---
title: "Death of the lame Recycle Bin confirmation dialog in Windows?"
originalUrl: https://miksovsky.blogs.com/flowstate/2006/02/completely_lame.html
---

<p>
  Before leaving behind the previous topic of deletion patterns, let's briefly
  look at one of the weakest implementations of the Trash pattern anywhere: the
  Recycle Bin in Microsoft Windows. On the Mac, when you move something to the
  Trash, it moves to the Trash. In Windows, when you move something to the
  Trash, you get this:
</p>
<p>
  <img
    src="/images/flowstate/windows_delete_confirmation_dialog.png"
    alt="Windows_delete_confirmation_dialog"
  />
</p>
<p>
  When Microsoft appropriated the Trash pattern (from Apple and Xerox), it was
  apparently helpless to resist the desire to protect the user with a
  confirmation dialog—even though
  <em
    >the entire point of the Trash pattern is to avoid irritating the user with
    a confirmation dialog</em
  >. File this one under, &quot;Unclear on the concept&quot;.
</p>
<p>
  For what it's worth, both Windows and the Mac display an additional
  confirmation dialog if you manually invoke the Empty Trash command. The
  Windows dialog says like, &quot;Are you sure you want to delete these
  <em>&lt;number&gt;</em> items?&quot; The Mac dialog says: &quot;Are you sure
  you want to remove the items in the Trash permanently? You cannot undo this
  action.&quot; It's a matter of opinion, but here I give a slight preference to
  the Windows version, since the Mac dialog is redundant; an action that's
  permanent is, by definition, an action that can't be undone. (You could also
  argue that, if you know how to use&nbsp; disk utilities, the delete operation
  isn't actually permanent. Either way, the dialog is wrong.)
</p>
<p>
  The confirmation dialogs in the Windows means the lucky user has at least
  <em>three</em> chances to avoid accidental deletion! They can: 1) say No to
  the first confirmation dialog, 2) Undo the move to the Recycle Bin, or 3) say
  No to the second confirmation dialog. It's nice to know that, with all this
  protection, no Windows user anywhere has ever deleted something they didn't
  want to delete.
</p>
<p>
  It's possible that Microsoft has silently made some progress on this issue.
  When I tried to reproduce the first delete confirmation dialog to take a
  screen shot of it, I was unable to get it to appear on any of five different
  Windows XP PCs. The &quot;Display delete confirmation dialog&quot; check box
  still exists in the Recycle Bin's Properties dialog, but as far as I can tell,
  this check box no longer has any effect. Perhaps the dialog was quietly
  dropped in a service pack update? I can find no confirmation of this on the
  net. If anyone has an authoritative account on whether this dialog has been
  dropped, let me know. It'd be nice to say good riddance to an unloved dialog.
</p>
