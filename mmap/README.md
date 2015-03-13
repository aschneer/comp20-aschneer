###Andrew Schneer
###Tufts University
###COMP 20 - Web Programming
###Ming Chow
###Assignment 02
###"The Real Marauder's Map"
###03/12/2015

I have implemented almost all aspects of
this assignment correctly.  There are two
areas where I can see a need for improvement.
The first is my Javascript code structure.
I am becoming more comfortable with the
asynchronous nature of Javascript, and it
is really interesting.  Next time I will
spend more time planning the code so I
do not wind up spending as much time debugging.

The second improvement is commenting less.
I realized toward the end of this assignment,
thanks to a Piazza post, that the size of the
Javascript file actually affects the runtime
of the program.  Thus, excessive comments will
slow down the execution.  I tend to use a lot
of comments, which is normally a good thing,
but in this case it is not.  Rather than
destroy all my comments for this assignment,
I have chosen to simply be more aware of
potentially commenting in excess in the future.

I collaborated with Hunter Wapman and
Sibonay Koo on this assignment.  Sibonay and
I worked side-by-side for the initial part
of the assignment.  We helped each other work
through bugs while setting up the
Google Map.  Hunter helped me with a bug toward
the end of the assignment.  It turned out that
I had a scope issue with a for-loop iterator
in one of my functions which caused an invalid
reference off the end of an array.  Hunter
helped me solve that problem, and he also
gave me some advice for how to think about
and structure my Javascript so as to avoid
similar problems in the future.

I have spent approximately 8-10 hours
on this assignment.

INTERESTING SIDE NOTE:

I am realizing that planning asynchronous
Javascript code is a completely
different process than planning any other
type of code.  I think a good
way to model Javascript code is with a Gantt chart.
A Gantt chart is a method of organizing time-dependent
tasks based on completion dependencies.  By
doing this assignment, I have realized that this
is exactly the way Javascript code is executed.
In future Javascript projects, I will attempt
to model the functional requirements as tasks
in a Gantt chart.  I will break the project
down into as many sub-tasks as I can, and then
create a dependency tree which organizes the
sub-tasks based on which other tasks they
depend on.  Once this chart is created, the
Javascript code should just fall into place.
I will be able to look at the chart and know
exactly which Javascript functions to write
and which other functions they should call
to ensure that every task executes only after
the tasks it depends on have finished.
Techniques can also be used to determine the
fastest possible execution time for the code,
the sensitivity of the total runtime to a change
in the runtime of a particular task, and the
"critical path," meaning the sequence of
tasks that must be executed on-time in order
for the entire project to finish on schedule.

With the Gantt chart idea in mind, I briefly
researched some options for graphically modeling
asynchronous Javascript code.  Gantt chart
libraries exist which can be used to generate
Gantt charts and dependency trees for Javascript
code.  Finding these led me to some scripts
that people have written (Github,StackOverflow)
to search through Javascript code and build
a function all tree based on it.  These tools
look really interesting and I plan on trying
them.  However, my ideal solution would be
a Javascript IDE (perhaps plugin for Sublime Text)
that will generate a function call tree in real-
time as the programmer types code.  I plan to
work on this in the future.