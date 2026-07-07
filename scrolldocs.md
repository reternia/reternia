# scrollThreshold
Specifies the number of pixels the draggable element must cross beyond the area bounds before the container starts scrolling automatically.

Accepts
A Number
A Function that returns a Number
When defined using a Function, the value will be automatically refreshed every time the container or target element is resized.
It can also be refreshed manually using the 
refresh()
 method.

Default
20

scrollThreshold code example
J
ava
S
cript
HTML
CSS

import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.scroll-container',
  scrollThreshold: 12,
});



# scrollSpeed
Specifies a value that affects the automatic scrolling speed of the container. The higher the value, the faster the scroll goes and 0 prevents the container from scrolling.

Accepts
A Number
A Function that returns a Number
When defined using a Function, the value will be automatically refreshed every time the container or target element is resized.
It can also be refreshed manually using the 
refresh()
 method.

Default
1.5

scrollSpeed code example
J
ava
S
cript
HTML

import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.scroll-container',
  scrollSpeed: 2,
});



# scrollInView()
Animate the scroll position of the container if the draggable position is outside of the scroll threshold.

Parameters
Name	Type	Description
duration(opt)	Number	The duration of the animation (default 350)
gap(opt)	Boolean	How much extra distance from the edges of the container the draggable should be animated to
ease(opt)	
ease
The easing function applied to the animation (default InOutQuad
Returns
The draggable itself

scrollInView() code example
J
ava
S
cript
HTML

import { createDraggable, utils } from 'animejs';

const [ $scrollInView ] = utils.$('.button');

const draggable = createDraggable('.square', {
  container: '.scroll-container',
});

const scrollInView = () => {
  draggable.scrollInView(400, 100);
}

// Set the draggable position outside the scroll viewport
draggable.x = 120;
draggable.y = 200;

$scrollInView.addEventListener('click', scrollInView);





# onScroll
Triggers and synchronises Timer, Animation and Timeline instances on scroll.
ScrollObservers are created with the onScroll() function and can be directly declared in the 
autoplay parameter
.

import { onScroll, animate } from 'animejs';

animate(targets, { x: 100, autoplay: onScroll(parameters) });

The onScroll() method can be imported directly from the main 'animejs' module:

import { onScroll } from 'animejs';

onScroll();

Or imported as a standalone module from the 'animejs/events' subpath:

import { onScroll } from 'animejs/events';

Parameters
Name	Accepts
parameters	An Object of ScrollObserver settings, ScrollObserver thresholds, ScrollObserver sync modes and ScrollObserver callbacks
Returns
ScrollObserver

onScroll code example
J
ava
S
cript
HTML
CSS

import { animate, createTimer, createTimeline , utils, onScroll } from 'animejs';

const [ container ] = utils.$('.scroll-container');
const debug = true;

// Animation

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  alternate: true,
  loop: true,
  autoplay: onScroll({ container, debug })
});

// Timer

const [ $timer ] = utils.$('.timer');

createTimer({
  duration: 2000,
  alternate: true,
  loop: true,
  onUpdate: self => {
    $timer.innerHTML = self.iterationCurrentTime
  },
  autoplay: onScroll({
    target: $timer.parentNode,
    container,
    debug
  })
});

// Timeline

const circles = utils.$('.circle');

createTimeline({
  alternate: true,
  loop: true,
  autoplay: onScroll({
    target: circles[0],
    container,
    debug
  })
})
.add(circles[2], { x: '9rem' })
.add(circles[1], { x: '9rem' })
.add(circles[0], { x: '9rem' });





# ScrollObserver settings
ScrollObserver settings properties are defined directly in the onScroll() parameters Object.

animate('.square', {
  x: 100,
  autoplay: onScroll({
  ┌──────────────────────────┐
  │ container: '.container', │
  │ target: '.section',      ├─ Settings
  │ axis: 'y',               │
  └──────────────────────────┘
    enter: 'bottom top',
    leave: 'top bottom',
    sync: true,
    onEnter: () => {},
    onLeave: () => {},
    onUpdate: () => {},
  })
});


# ScrollObserver thresholds
Determines the points at which actions are triggered based on the scrolling position of a target element within a container.
Thresholds are defined with the enter and leave properties of the onScroll() parameters Object.

animate('.square', {
  x: 100,
  autoplay: onScroll({

    container: '.container',
    target: '.section',
    axis: 'y',
  ┌──────────────────────────┐
  │ enter: 'bottom top',     ├─ Thresholds
  │ leave: 'top bottom',     │
  └──────────────────────────┘
    sync: true,
    onEnter: () => {},
    onLeave: () => {},
    onUpdate: () => {},
  })
});
The conditions that determine when an element enters or leaves the viewport are specified by comparing two pairs of values: the target and container start and end values.

┌────────────────────────────────┐- Container Start
│                                │
│   Container                    │
│                                │
│          ┌──────────┐----------│- Target Start
│          │          │          │
│          │  Target  │          │
└────────────────────────────────┘- Container End
           │          │
           └──────────┘------------ Target End
Different syntaxes
Conditions can be written with the following syntaxes:

Object
onScroll({
  // Enters when the top of the target meets the bottom of the container
  enter: { target: 'top', container: 'bottom' },
  // Leaves when the bottom of the target meets the top of the container
  leave: { target: 'bottom', container: 'top' }
});

Container value String
The container value can be passed directly and the target value defaults to 'start' for enter and 'end' for leave.

onScroll({
  // Enters when the top of the target meets the bottom of the container
  enter: 'bottom',
  // Leaves when the bottom of the target meets the top of the container
  leave: 'top'
 });

Container and target value shorthand String
onScroll({
  // Enters when the bottom of the container meets the top of the target
  enter: 'bottom top',
  // Leaves when the top of the container meets the bottom of the target
  leave: 'top bottom',
});


# ScrollObserver properties
Properties available on the ScrollObserver instance returned by an onScroll() function.

const scrollObserver = onScroll(parameters);
               ┌───────┐
scrollObserver.│target │
scrollObserver.│linked ├─ Properties
scrollObserver.│repeat │
               └───────┘
Name	Description
id	Gets the unique identifier for the ScrollObserver instance (Number)
container	Gets the scroll container associated with this observer (ScrollContainer)
target	Gets the target element being observed (HTMLElement)
linked	Gets the linked object (Animation | Timer | Timeline)
repeat	Gets whether the observer should repeat (Boolean)
horizontal	Gets whether the scroll direction is horizontal (Boolean)
enter	Gets the enter threshold (String | Number)
leave	Gets and sets the leave threshold (String | Number)
sync	Gets whether synchronisation is enabled (Boolean)
velocity	Gets the current scroll velocity (Number)
backward	Gets whether the scroll direction is backward (Boolean)
scroll	Gets the current scroll position (Number)
progress	Gets the current progress of the observed element (0 to 1) (Number)
completed	Gets whether the observation has completed (Boolean)
began	Gets whether the observation has begun (Boolean)
isInView	Gets whether the observed element is currently in view (Boolean)
offset	Gets the offset of the observed element (Number)
offsetStart	Gets the start offset of the observed element (Number)
offsetEnd	Gets the end offset of the observed element (Number)
distance	Gets the scroll distance for the observed element (Number)



# Smooth scroll
Smoothly animate the playback progress of the linked object to the scroll position by passing a value between 0 and 1. The closer the value gets to 0, the longer the animation takes to catch up with the current scroll position.

Accepts
A Number greater than or equal to 0 and lower to or equal 1

Smooth scroll code example
J
ava
S
cript
HTML

import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: .25,
    debug: true,
  })
});



# Eased scroll
Applies an easing function to the synchronised playback progress of the linked object relative to the scroll position.

Accepts
ease

Eased scroll code example
J
ava
S
cript
HTML

import { animate, stagger, onScroll } from 'animejs';

animate('.square', {
  x: '12rem',
  rotate: '1turn',
  ease: 'linear',
  delay: stagger(100, { from: 'last' }),
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: 'inOutCirc',
    debug: true,
  })
});


# ScrollObserver synchronisation modes
Determines the behaviour of the animation and how it is synchronised relative to the scroll progress or by meeting certain thresholds.
The different synchronisation modes are defined on the sync property of the onScroll() parameters Object.

animate('.square', {
  x: 100,
  autoplay: onScroll({
    container: '.container',
    target: '.section',
    axis: 'y',
    enter: 'bottom top',
    leave: 'top bottom',
┌──────────────────────────┐
│   sync: true,            ├─ Synchronisation Mode
└──────────────────────────┘
    onEnter: () => {},
    onLeave: () => {},
    onUpdate: () => {},
  })
});


#####  BONUS ####
ini kayaknya bagus buat judul


splitText
A lightweight, responsive and accessible text utility function to split, clone and wrap lines, words and characters of an HTML Element.
Text splits are created using the splitText() function.

import { splitText } from 'animejs';

const split = splitText(target, parameters);

Since v4.2.0, the splitText() method can also be imported independently without importing the entire library.

import { splitText } from 'animejs/text';