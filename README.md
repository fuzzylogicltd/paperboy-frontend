## Paperboy - a feed reader

I love using feed readers to consume the web. I'll write up a longer thing on why I think they're a lifesaver compared to algorithm-driven platforms like social media, but the short of it is that I've been using one or another ever since I realized RSS is a thing, probably around 2005 or so. I currently use [Feedbin](https://feedbin.com/) and really think it's the best on offer (it's paid though, there is that).

Paperboy is my crack at it. I doubt I'll ever match quite all the features of something like Feedbin, but it's fun to try. This project is my playground that allows me to try out and learn about a bunch of different technologies and approaches that I've not had a chance to otherwise.

First of all, the backend ([Github repo here](https://github.com/fuzzylogicltd/paperboy-backend)) is made with NodeJS which is not something I've had a ton of experience with prior to this, and designing a REST API from scratch taught me a few things as well.

Second, the whole thing (backend so far, soon the frontend - this thing - as well) is on AWS, and I've not really used one of the big boy cloud platforms before. I've used some of the simpler ones, but deploying frontends to Netlify and Vercel is one thing, doing a Node app on an EC2 instance hooked up to an RDS is quite another.

Third, I've worked with a few different versions of SQL over the years, but never actually Postgres so of course that's what I chose for the project. That part was mostly straightforward though, SQL is SQL.

The project is starting to come together and I expect to have it up soon so you can try it out. That said, my to-do list on it is silly long and we'll see how far I'll manage to push it.
