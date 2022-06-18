# 📸 Self Hosted Website Shot - Capture a website screenshot online



Generate a full web-page screenshot with our service, that provides rich interface to make any kind of web screenshots online for free with no limits. The simplest way to take a full page screenshot, we support a long pages up to 20000 pixels

[📰 View Noted Article about the app](https://noted.lol/take-full-website-screenshots-with-the-self-hosted-website-shot/)

🏗️ Built with:

- [Nuxtjs](https://nuxtjs.org/)
- [Tailwind](https://tailwindcss.com/)
- [Buefy](https://buefy.org/documentation/start/)

⚠️ Note that the app is hosted for free, so if u are facing issues taking screenshot, just give it a bit of time (well be hosted on a paid server if its being used more by users)
<br/>
⚠️ It can't take screenshots of pages where authentication is required. Personal bank pages, E-Mail Inboxes or any other page that requires you to log in to see it, it may require using custom js to paypass that.




![Website shoy Demo](https://user-images.githubusercontent.com/35883748/174443804-83ff76aa-1b7b-430b-914d-2330b72a7084.png)



## Docker
```bash
docker pull flowko1/website-shot
docker run -it -d -p 3000:3000 flowko1/website-shot
```

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).
