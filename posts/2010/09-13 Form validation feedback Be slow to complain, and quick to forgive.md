---
title: "Form validation feedback: Be slow to complain, and quick to forgive"
originalUrl: https://miksovsky.blogs.com/flowstate/2010/09/form-validation-feedback-be-slow-to-complain-and-quick-to-forgive.html
---

<p>
  Anyone designing a form will eventually come across the problem of: 1) when to
  validate the form data which the user has entered, and 2) how to provide the
  user feedback on fields that don’t meet the validation criteria. Many
  approaches have been tried for the second problem, but I think the first
  problem—when to validate the data and provide feedback—could use more
  consideration.
</p>
<p>
  Suppose you’re designing a form containing a text box in which you will ask
  the user to enter a mobile phone number. For a variety of reasons, you’ve
  decided that you want to perform some initial validation of the number to
  minimize the chance of later problems. There’s no easy way to ensure, on the
  spot, that the number is, in fact, that of a real mobile phone, but you can at
  least ascertain via some regular expression that the text looks like a valid
  phone number. (Er, have fun with that, especially if you want to support
  international numbers.) Your regex is quick to evaluate, but you need to
  decide <em>when</em> to evaluate it and do something with the result.
</p>
<p>
  Here are some choices for when to validate the phone number, along with some
  pros and cons:
</p>
<ol>
  <li>
    <strong>When the user types a key.</strong><br />
    <br />Pros: The user will get the feedback as quickly as possible, and so
    they should be able to correct the problem immediately. Because they’re
    looking at the phone number field, feedback positioned next to the field
    will be noticeable. Because the user is thinking about the phone number,
    they don’t need much prompting to spot the problem. The keyboard focus is
    probably already in exactly the right place to fix the problem. <br />
    <br />Cons: It can be incredibly irritating to use a program which instantly
    complains about a problem which you yourself can tell you’ve made. If you’re
    reaching for the “1” key, and see you’ve accidentally hit the “q” key, you
    can see for yourself you’ve made a mistake. You don’t need the additional
    shame of being yelled at. A program that validates on a key press can act
    like the jerk in the car behind you who honks their horn the instant the
    traffic light turns green. <br />
    <br />There are also plenty of situations in which such error feedback is
    completely premature. Suppose the user is pasting in a phone number they’ve
    copied from their address book or some other location, and the pasted text
    contains some extra characters. The user can see the extra characters, and
    would be perfectly happy to remove them if only the program wouldn’t yell so
    loud.<br />&#0160;
  </li>
  <li>
    <strong>When the field loses focus </strong>(e.g., the user has moved the
    keyboard focus to the next field).<br />
    <br />Pros: The user has had a chance to get the field text into the state
    they desire, so any feedback at this point is likely more warranted. Perhaps
    the user may not have noticed that they’re missing a digit from the phone
    number. <br />
    <br />Cons: The user’s attention has already begun to move on, so the error
    feedback may need to be more prominent. Also, while this technique is less
    hasty than the one above, the error feedback may still preempt the user’s
    own ability to recognize the problem. The user has to manually move the
    keyboard focus back to the phone number field.<br />&#0160;
  </li>
  <li>
    <strong>When the user attempts to save the form.</strong><br />
    <br />Pros: By pressing a commit button like Save, the user has indicated
    that they think they’re done entering data. If there’s an error at this
    point, they haven’t noticed it, so the feedback will be timely. <br />
    <br />Cons: By this point, the user’s attention may be far from the phone
    number field, so the feedback needs to be quite prominent. It may need to be
    supplemented by overall form validation feedback near the commit button or
    at the top of the page. Once the user sees that overall feedback, it may
    take a moment for them to visually reacquire the problematic phone number
    field, diagnose the problem, and get the insertion point to the point where
    they can correct it.
  </li>
</ol>
<p>
  All these methods have their place, although in a situation like this, I
  personally prefer to defer giving validation feedback to the point where the
  user is attempting to save the form (#3 above). I’d rather give the user a
  reasonable chance to fix any errors, and have observed countless usability
  studies in which they have done so. I believe this leaves the user feeling in
  control, and to me this is worth the disadvantages listed above for this
  approach.
</p>
<p>
  Still, there’s one common downside to this approach:
  <em
    >applications that validate on Save tend to keep the error feedback visible
    until the user tries to save again</em
  >. I find this annoying; it’s like the program continues to scold me even
  after I’ve admitted I was wrong and atoned for my mistake. Once I see the
  problem and have fixed it, I wish I could get credit for fixing it right away.
</p>
<p><strong>Asymmetric validation feedback triggers</strong></p>
<p>
  There’s no reason the triggers for showing and hiding the validation feedback
  need to be symmetrical. I’ve been working on the idea of asymmetrical
  validation triggers: validate on save to show validation feedback
  <em>and</em> validate on keypress hide the feedback. In this scenario, the UI
  shows validation feedback (validation message, change field background color,
  etc.) if the user attempts to save the form with something that doesn’t appear
  to be a phone number. But as soon as the user types the key that fixes the
  problem, the validation feedback goes away.
</p>
<br />
<p></p>
<p></p>
<p><em>The user is typing…</em></p>
<p>
  <img src="/images/flowstate/6a00d83451fb6769e20133f418c3f8970b-pi.png" />
</p>
<p>
  <em
    ><span
      ><em
        >They mistype. The UI doesn’t complain; maybe the user will fix the
        error.</em
      ></span
    ><br
  /></em>
</p>
<p>
  <img src="/images/flowstate/6a00d83451fb6769e20133f418c3fd970b-pi.png" />
</p>
<p>
  <em>The user tabs away with the error uncorrected. Still no complaint.</em>
</p>
<p>
  <img src="/images/flowstate/6a00d83451fb6769e20133f418c404970b-pi.png" />
</p>
<p>
  <em
    >They try to save the form. NOW validation feedback appears (with an
    explanation nearby).</em
  >
</p>
<p>
  <img src="/images/flowstate/6a00d83451fb6769e2013487392406970c-pi.png" />
</p>
<p><em>The user clicks to correct the error…</em></p>
<p>
  <img src="/images/flowstate/6a00d83451fb6769e20133f418c412970b-pi.png" />
</p>
<p>
  <em
    ><span
      ><em
        >As soon as they type that fixes the error, the validation feedback goes
        away.</em
      ></span
    ><br
  /></em>
</p>
<p>
  <img src="/images/flowstate/6a00d83451fb6769e20133f418c416970b-pi.png" />
</p>
<br />
<p><strong></strong></p>
<p></p>
<p></p>
<p>In other words, the UI is slow to complain, and quick to forgive.</p>
<p>
  I think this is generally the proper conversational posture for a program to
  take regarding the validation of user input. Most programs treat validation
  feedback as if it were the user’s fault, when to me this feels like almost
  exactly the wrong spirit in which the view the situation. Data validation is a
  sign of program weakness — a sign that it’s still too hard to design a program
  that can process input flexibly and resiliently.
</p>
<p>
  If I fill out a paper form that asks for my home and work phone numbers, I can
  fill in the first phone number and write the word “SAME” for the second phone
  number, and any human would process that correctly. I can even cross out the
  field label “Work” and handwrite “Cell” and write in my cell number, and again
  this is meaningful to a human reader. I can make all kinds of minor errors,
  and still my input can be interpreted.
</p>
<p>
  That is a breathtaking level of input flexibility which no UI today can match.
  And so when a form has attempted to recognize user input, and failed to do so,
  the appropriate stance should be not, “Invalid phone number”, but rather, “I’m
  really sorry, I’m not smart or sophisticated enough to understand you. Could
  you please help me by making this more recognizable as a phone number so that
  I, a mere program, can process it for you?”
</p>
<p>
  I’m not saying that’s what the program should really <em>say</em>, but that’s
  a useful mindset to have when approaching the situation as a design problem.
  Such thinking led to the asymmetric validation triggers above, and perhaps
  more thought along these lines will lead to further refinements to this very
  common aspect of user experience design.
</p>
