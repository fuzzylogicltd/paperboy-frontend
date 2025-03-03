# Paperboy - a feed reader

I love using feed readers to consume the web. I'll write up a longer thing soon on why I think they're a lifesaver compared to algorithm-driven platforms like social media, but the short of it is that I've been using one or another ever since I realized RSS is a thing, probably around 2005 or so. I currently use [Feedbin](https://feedbin.com/) and really think it's the best thing ever (it's paid though, there is that).

Paperboy is my crack at it. I doubt I'll ever quite match all the features of something like Feedbin, but it's fun to try. This project is also my playground that allows me to try out and learn about a bunch of different technologies and approaches that I've not had a ton of experience with before, like Node and AWS

This repo houses the frontend of the app, [while the backend is here](https://github.com/fuzzylogicltd/paperboy-backend). The frontend is written in TypeScript using React, it uses TanStack Query for data fetching and some RadixUI components.

You can test drive the app by going to [paperboy.fuzzylogic.ltd](https://paperboy.fuzzylogic.ltd/) and logging in with paperboydemo@fuzzylogic.ltd and the same for the pw. I've put in a handful of feeds to get you started, but feel free to add more. If you want an account all of your own, feel free to sign up, and then shoot me an email (lazar@fuzzylogic.ltd) to activate it. Actual email activation is coming soon!

The whole app is hosted on AWS, the frontend is on Amplify and the backend on EC2.

## To-do

- Distinguish between read and unread
- Section for starred articles
- Section for read history
- Ability to edit and remove existing feeds
- Account activation via email confirmation
- Show unread count for each feed
- Ability to tag feeds, and show them grouped by tags
- PWA
- Dark theme (and maybe some other customization options)
- Many aesthetic improvements, including a logo, a better splash page etc...
