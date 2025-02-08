# Vue Link Click Extension
This is extension use for assign short key to clickable element on webpage. I get this idea from [Link Hint Extension](https://chromewebstore.google.com/detail/link-hints/kjjgifdfplpegljdfnpmbjmkngdilmkd?pli=1). Shoutout to [Duc Le](https://github.com/dealoux) and [Ted](https://github.com/tednguyendev) for show me this wonderful extension.

## Pre-requiste
> node v20.13.1

Should work with other version, but since this is the version I work on so just to make sure.


## Load locally
To load the extension locally, use the command
> npm run build

To build the extension should be located at `dist/extension`. Then load this folder using [browser](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked)

## Development
I use Vue 3 for this, well because why not :v, plan to implement some settings UI or maybe extend something else.

- Install packages: `npm i`
- Run frontend: "npm run dev:frontend"
- Run extension: "npm run dev:extension"

## Key takeaway
While doing this, I encounter some issue and come up with some solutions I find pretty interesting.

### Extension doesn't hot reload
Since you have to build extension and then load it manually to extension for any changes to take effect, it will slow down development a lot.

Thankfully there is a package out there that help this issue
> web-ext

Basically it will open a expremental browser => watch changes in the dist/extension => re-load it to that.

### Hot Reload Vue doesn't take effect in extension
Similarly, while Vue does have hot reload setup, because extension only use the build file, it won't have any effect.

To workaround this I use
> vite build --watch

Instead of dev like normal, this command will build the UI to dist whenever there are changes, and the extension will auto update thanks to `web-ext`

