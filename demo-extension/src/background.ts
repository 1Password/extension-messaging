import { ExtensionRequest } from "@1password/extension-types";

function sendExternalMessage(extensionId: string, message: ExtensionRequest) {
  chrome.runtime.sendMessage(
    extensionId,
    JSON.stringify(message),
    (response) => {
      console.log("Response:", response);
    }
  );
}

function sendHello(extensionId: string) {
  sendExternalMessage(extensionId, { name: "hello" });
}

function sendCreateItem(extensionId: string) {
  sendExternalMessage(extensionId, {
    name: "create-item",
    data: {
      saveRequest: {
        title: "Sample Item",
        fields: [
          { autocomplete: "username", value: "wendy.appleseed@1password.com" },
          { autocomplete: "current-password", value: "its-a-secret" },
        ],
        notes: "Item saved while testing the integration.",
      },
      type: "001",
    },
  });
}

// Expose functions for easy messaging
(window as any).messaging = {
  sendHello,
  sendCreateItem,
};
