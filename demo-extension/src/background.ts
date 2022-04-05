import { isOPInstalled, createOpItem } from "@1password/extension-types";

function sendCreateItem(extensionId: string) {
  return createOpItem(extensionId, {
    saveRequest: {
      title: "Sample Item",
      fields: [
        { autocomplete: "username", value: "wendy.appleseed@1password.com" },
        { autocomplete: "current-password", value: "its-a-secret" },
      ],
      notes: "Item saved while testing the integration.",
    },
    type: "001",
  });
}

// Expose functions for easy messaging
(window as any).messaging = {
  isOPInstalled,
  sendCreateItem,
};
