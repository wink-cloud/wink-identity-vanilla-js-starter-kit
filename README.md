# wink-identity-vanilla-js-starter-kit

Vanilla JavaScript starter kit for integrating the **Wink Identity Web
SDK** into any web application without using frameworks.

This project provides a simple reference implementation for launching
identity verification flows such as document capture and face
authentication.

------------------------------------------------------------------------

## 🚀 Features

-   Wink Identity Web SDK integration
-   Face capture & liveness checks
-   Pure JavaScript (no framework)
-   Lightweight & easy to customize
-   Sample verification journey

------------------------------------------------------------------------

## 📂 Project Structure

    wink-identity-vanilla-js-starter-kit/
    │
    ├── index.html        # Main integration file
    ├── README.md         # Documentation

------------------------------------------------------------------------

## 🛠️ Prerequisites

-   Wink Identity API Key
-   Verification workflow configured
-   SDK access enabled

Contact Wink Identity support if credentials are required.

------------------------------------------------------------------------

## ▶️ Getting Started

1.  Clone the repository

``` bash
git clone https://github.com/wink-cloud/wink-identity-vanilla-js-starter-kit.git
```

2.  Open the project

``` bash
cd wink-identity-vanilla-js-starter-kit
```

3.  Update SDK configuration in `index.html`

``` js
clientId: "__client_id__",
realm: "__realm__",
secret: "__secret__",
```

4.  Run locally

You can simply open `index.html` in a browser\
or use a local server:

``` bash
npx serve .
```

------------------------------------------------------------------------

## 🔧 Configuration Options

Refer: https://www.npmjs.com/package/wink-identity-sdk

------------------------------------------------------------------------

## 🧪 Testing Flow

1.  Click **Start Verification**
2.  Perform face/liveness check
3.  Receive success response

------------------------------------------------------------------------

## 📦 Deployment

Can be deployed on any static hosting:

-   AWS S3
-   Netlify
-   Vercel
-   GitHub Pages

------------------------------------------------------------------------

## 📄 License

Internal / Partner Use -- Wink Identity

------------------------------------------------------------------------

## 🤝 Support

For integration help, contact:

**Wink Identity Engineering Team**
