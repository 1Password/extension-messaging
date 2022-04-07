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


#### Save Request

To save an item to 1Password, you'll need to build a save request:

A save request needs these values:

<table>
	<thead>
	<tr>
		<th>Field</th> <th>Type</th> <th>Description</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>title</code></td> <td>string</td>	<td>The suggested title for the item to be saved.</td>
	</tr>
	<tr>
		<td><code>fields</code></td> <td>array</td> <td>Each object in the array has these properties:
		<ul>
			<li><code>autocomplete</code> (string): The type of field to fill.</li>
			<li><code>value</code> (string): The value to be filled in the field.</li>
		</ul>
		<p class="note">Use the autocomplete field name and values defined in the "Autofill" section of the <a href="https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill">HTML Living Standard</a>.</p>
		</td>
	</tr>
	<tr>
		<td><code>notes</code> <p class="note">(optional)</p></td> <td>string</td> <td>Notes to save with the item. These can be formatted with Markdown.</td>
	</tr>
	</tbody>
</table>

For example: 

```ts
{
    title: "Sample Item",
    fields: [
      { autocomplete: "username", value: "wendy.appleseed@1password.com" },
      { autocomplete: "current-password", value: "its-a-secret" },
    ],
    notes: "Item saved while testing the integration.",
  });
```

#### Unencrypted

*Request:*

Use helper function `createOPItem` in this package and pass in:
 - the ID of the extension where you want to send the message
 - the <a href="#appendix-supported-item-templates">supported item template code</a> for the 1Password item you want to save
 - your  <a href="#save-request"> save request</a>

```ts
createOPItem("dghdojbkjhnklbpkdaibdccddilifddb", "login", {
    title: "Sample Item",
    fields: [
      { autocomplete: "username", value: "wendy.appleseed@1password.com" },
      { autocomplete: "current-password", value: "its-a-secret" },
    ],
    notes: "Item saved while testing the integration.",
  });
```

*Response:*

```json
{ "name": "create-item", "data": { "created": true } }
```

#### Encrypted

If you want to encrypt any of the values in your Save Request, first use our built-in `encryptValue` function to modify any values in your request. `encryptValue` accepts:
- the ID of the extension you want to message
- a `Uint8Array` of the value you want to encrypt. You can use a TextEncoder to turn any string into a `Uint8Array`

```ts
 const encryptedRecoverySeed = await encryptValue(
    "dghdojbkjhnklbpkdaibdccddilifddb",
    new TextEncoder().encode('sample-recovery-phrase')
  );

```

*Request:*

Then make your request with the `createOPItem` helper function:

  ```ts
  createOPItem("dghdojbkjhnklbpkdaibdccddilifddb", "crypto-wallet", {
    title: "Crypto Wallet",
    fields: [
      { autocomplete: "crypto-address", value: "address-goes-here" },
      {
        autocomplete: "crypto-recovery-seed",
        value: encryptedRecoverySeed,
      },
    ],
    notes: "Item saved while testing the integration.",
  });
```

*Response:*

```json
{ "name": "create-item", "data": { "created": true } }
```

## Appendix: Supported item templates

| Template | Code | Template   | Code | Template             | Code    |
| -------- | ---- | ---------- | ---- | -------------------- | ------- |
| Credit Card | `credit-card` | API Credential | `api-credential` | Crypto Wallet | `crypto-wallet` | 
| Login  | `login` | password | `password` | 