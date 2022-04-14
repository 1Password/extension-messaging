# Cross-Extension Save in 1Password

Using the cross-extension communication provided by [`browser.runtime.sendMessage`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/sendMessage), you can save data within 1Password.

Below we outline the messages that 1Password can accept and the response you can expect. Included in `demo-extension/` are types that can be integrated into an extension for communication with 1Password and a sample extension for how this works.

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
			<li><code>value</code> (string or number[]): The value to be filled in the field expressed as the string value or as an array of numbers representing the UTF-8 code points. </li>
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

_Request:_

Use helper function `createOPItem` in this package and pass in:

- the ID of the extension where you want to send the message
- the <a href="#appendix-supported-item-templates">supported item template code</a> for the 1Password item you want to save
- your <a href="#save-request"> save request</a>

##### Sample Credit Card Request

```ts
createOPItem("dghdojbkjhnklbpkdaibdccddilifddb", "credit-card", {
  title: "Virtual Credit Card Item",
  fields: [
    {
      autocomplete: "cc-name",
      value: "Wendy Appleseed",
    },
    {
      autocomplete: "cc-type",
      value: "visa",
    },
    {
      autocomplete: "cc-number",
      value: "4012888888881881",
    },
    {
      autocomplete: "cc-exp",
      value: "202401",
    },
    {
      autocomplete: "cc-csc",
      value: "714",
    },
    {
      autocomplete: "street-address",
      value: "512 Main Street",
    },
    {
      autocomplete: "address-level2",
      value: "Cambridge",
    },
    {
      autocomplete: "address-level1",
      value: "MA",
    },
    {
      autocomplete: "postal-code",
      value: "02114",
    },
    {
      autocomplete: "country",
      value: "US",
    },
  ],
  notes: "Credit card item saved while testing the integration.",
});
```

_Response:_

```json
{ "name": "create-item", "data": { "saved": true } }
```

##### Sample Crypto Wallet Request

```ts
createOPItem("dghdojbkjhnklbpkdaibdccddilifddb", "crypto-wallet", {
  title: "Sample Crypto Wallet",
  fields: [
    {
      autocomplete: "crypto-address",
      value: "sample-wallet-address",
    },
    {
      autocomplete: "crypto-recovery-seed",
      value: Array.from(new TextEncoder().encode("sample-recovery-phrase ✨")),
    },
  ],
  notes: "Credit card item saved while testing the integration.",
});
```

_Response:_

```json
{ "name": "create-item", "data": { "saved": true } }
```

## Request to be added to the list of allowed extensions

The extension-messaging API is only compatible with extensions approved by 1Password. To request that your extension ID be added to the list, to request support for an <a href="#appendix-supported-item-templates">item type</a> not listed below, or for more information about the API, contact the 1Password Partnerships team at [support+partnerships@1password.com](mailto:support+partnerships@1password.com).

## Appendix: Supported item templates

| Template       | Code             |
| -------------- | ---------------- |
| API Credential | `api-credential` |
| Credit Card    | `credit-card`    |
| Crypto Wallet  | `crypto-wallet`  |
| Login          | `login`          |
| Password       | `password`       |
