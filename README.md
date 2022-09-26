<p align="center">
  <a href="#">
    
  </a>

  <p align="center">
   <img width="150" height="150" src="https://user-images.githubusercontent.com/35883748/174504679-231434c3-0cfa-4f2c-a483-368e8f9d1dcc.png" alt="Logo">
  </p>
  <h1 align="center"><b>Website Shot</b></h1>
  <p align="center">
  Capture a website screenshot online.
    <br />
    <a href="https://noted.lol/take-full-website-screenshots-with-the-self-hosted-website-shot/"><strong>View Noted Article about the app »</strong></a>
    <br />
    <br />
  </p>
</p>
Website Shot is an open source cross-platform screenshot app, powered by a nodejs and nuxtjs written in JS/Vue. 
<br/>
<br/>


> NOTE: Website Shot is under active development, most of the listed features are still experimental and subject to change.
> 
> It can't take screenshots of pages where authentication is required. Personal bank pages, E-Mail Inboxes or any other page that requires you to log in to see it, it may require using custom js to paypass that.
<br/>
<br/>

<p align="center">
  <img src="https://user-images.githubusercontent.com/35883748/174443804-83ff76aa-1b7b-430b-914d-2330b72a7084.png" alt="Logo">
  <br />
  <br />

  <img src="https://img.shields.io/github/v/release/Flowko/website-shot?color=2BB4AB" />
  <img src="https://img.shields.io/github/issues-closed-raw/Flowko/website-shot?color=0974B4" />
  <br />
</p>

# Docker
```bash
docker pull flowko1/website-shot
docker run -it -d -p 3000:3000 flowko1/website-shot

# to enable password protection | to disabled it set PASSWORD_PROTECT to 0
# default password is admin
# you'll notice a password field on the homepage, make sure to add the password there as well
docker run -it -d -p 3000:3000 -e PASSWORD_PROTECT=1 -e PASSWORD=yourpassword flowko1/website-shot


```

# Build Setup

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
