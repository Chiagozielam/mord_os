# Welcome to Mord OS
This OS mimicks part of the windows OS with very minimal features but an intuitive design.

### How to install
- clone the repository
- run `npm install` to install the dependencies
- run `npm start` to start the app.

## Issues
- Because of time constraint I wasn't able to work on the file system throughly so I had to remove it entirely.
- We have minimal applications in the OS, but since we have a structure, it's easier to add more.

## Things I'll change in future version:
- I'll probably make more variables to hold things like image links, strings, etc. That way it'll be easier for me to control.
- Putting things in context api for some places is just because I didn't have the luxery of time to look for where else I'll like to put it. I believe global context is important where neccessary, but some things would be better off in their local components and further handled with cache, sessions, and localstorage.

### One thing I liked?
I liked how I was able to setup my context api structure and arrangements of my files in context. Also created custom hooks for my context which in-turn led to fewer code lines when calling and using the context.