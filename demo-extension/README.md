# Demo extension

A small demo extension (ID: lhjkdhgejffbnhcmhnokckolkjmbagpb) to test the `chrome.runtime.onMessageExternal` API.

## Usage

1. Run `pnpm install` in the root of this repository.
1. Run `make` in the `demo-extension` folder.
1. Load the `dist` folder as an unpacked extension in Chrome.
1. Load the 1Password build you are testing as an unpacked extension in Chrome.
1. Run either `window.messaging.sendHello` or `window.messaging.sendCreateItem` from the background of this demo extension, passing 1Password's extension ID as an argument.

You should see the response output in the background logs of this test extension.
