# Note
This repository is no longer in use, for the new add-on version use the new URL: [https://github.com/corysus/stremio-subtitles-addon](https://github.com/corysus/stremio-subtitles-addon)
___

# Titlovi.com Stremio Subtitle Addon v2

This addon will provide subtitles for movies & series from portal titlovi.com.
Subtitle languages that supported by titlovi.com is Bosnian, Croatian, Serbian, Macedonian, Slovenian and English language.

#### Tips
If you use this addon than you probably don't need Open Subtitle addon because titlovi.com subtitles used mostly by people from the Balkans and titlovi.com have bigest db of subtitles for this region, but if you need both and you want to know which one have required subtitles than you can add sufix to title of subtitle language. Open **config.js** and add some sufix in line *SUBS_SUFIX* like *SUBS_SUFIX: ' [titlovi.com]'*, after this in stremio subtitles will be displayed like LANG [titlovi.com] exp. "eng [titlovi.com]".

#### Notice
Only with ISO 639-2 standard (without SUFIX) you can choose default subtitle in Stremio config.

## Using locally

Clone this repo. and use NPM to install req. libs.

```bash
# Install req. libs
npm i

# To start addon on local server
npm start
```

Open stremio addons and copy/paste url http://127.0.0.1:3050/manifest.json

Before use, you must configure addon by clicking on **Configure** button *(confirm to leave stremio on next screen)*.
![step1](https://titlovi-stremio-server.onrender.com/install/1.png)

Enter your username/password from titlovi.com and choose if you want to convert cyrilic to latin.
![step1](https://titlovi-stremio-server.onrender.com/install/3.png)

After you success login you will get your unique url that you need to add to stremio by clicking to button or by copy/paste generated url.
![step1](https://titlovi-stremio-server.onrender.com/install/4.png)

Click on install button to finish installation of addon.
![step1](https://titlovi-stremio-server.onrender.com/install/5.png)

## Using remotely

- Open https://titlovi-stremio-server.onrender.com/configure and login to your titlovi.com account *(also you can choose do you want to convert cyrillic to latin by checking box)*.
- After success login you can click on button to open Stremio and install addon or copy/paste generated link to your Stremio to install addon.

___
[MIT License](https://mit-license.org/).
