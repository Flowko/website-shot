# 📸 Website Shot - Capture a website screenshot online



Generate a full web-page screenshot with our service, that provides rich interface to make any kind of web screenshots online for free with no limits. The simplest way to take a full page screenshot, we support a long pages up to 20000 pixels

[🔗 View it here](https://website-shot.herokuapp.com/)


🏗️ Built with:

- [Nuxtjs](https://nuxtjs.org/)
- [Pageres](https://github.com/sindresorhus/pageres)
- [Chart.js](https://www.chartjs.org/)
- [Tailwind](https://tailwindcss.com/)
- [Buefy](https://buefy.org/documentation/start/)

⚠️ It can't take screenshots of pages where authentication is required. Personal bank pages, E-Mail Inboxes or any other page that requires you to log in to see it, it may require using custom js to paypass that.


![Website Shot Demo](https://user-images.githubusercontent.com/35883748/162642419-5038991e-6cd6-4f2f-b39b-771ffefc3fbe.png)

👩‍🏫 inspired by [Site Shot](https://www.site-shot.com/)


## Docker compose
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
