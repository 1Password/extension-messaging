# Cross-Extension Save in 1Password

Using the cross-extension communication provided by [`browser.runtime.sendMessage`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/sendMessage), you can save data within 1Password.

Below outlines the messages that 1Password can accept and the response you can expect. Included in `demo-extension/` is types can be integrated into an extension for communication with 1Password and a sample extension for how this works.

To use this API and see this demo in action, contact us.

## Messages

1Password supports the following messages from allowed extensions.

### Hello

This message can be sent by either extension to see if the other extension is installed.

Request:

```
{ "name": "hello" }
```

Response:

```
{ "name": "hello", "data": { "buildNumber": 1 } }
```

### Create Item

Sent from your extension to 1Password which opens the 1Password Save Dialog prepopulated with the provided data. The `created` field in the response indicates if the user chose to save the item.

Request:

```
{
    "name": "create-item",
    "data": {
        "saveRequest": {
            "title": "Saved Item",
            "fields": [
                { autocomplete: "username", value: "wendy.appleseed@1password.com" },
                { autocomplete: "current-password", value: "its-a-secret" },
            ],
            "notes": "Item saved via the cross-extension API."
        }
    }
}
```

Response:

```
{ "name": "create-item", "data": { "created": true } }
```
