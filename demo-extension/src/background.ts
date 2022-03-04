import {
  ExtensionRequest,
  isOPInstalled,
  createOPItem,
} from "@1password/extension-types";

function sendExternalMessage(extensionId: string, message: ExtensionRequest) {
  chrome.runtime.sendMessage(
    extensionId,
    JSON.stringify(message),
    (response) => {
      console.log("Response:", response);
    }
  );
}

function sendCreateItemTest(extensionId: string) {
  createOPItem(
    extensionId,
    {
      title: "Sample Item",
      fields: [
        { autocomplete: "username", value: "wendy.appleseed@1password.com" },
        { autocomplete: "current-password", value: "its-a-secret" },
      ],
      notes: "Item saved while testing the integration.",
    },
    "login"
  );
}

// Expose functions for easy messaging
(window as any).messaging = {
  isOPInstalled,
  sendCreateItemTest,
};
