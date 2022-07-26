import { isOPInstalled, createOPItem } from "@1password/extension-types";

function sendCreateItem(extensionId: string) {
  return createOPItem(extensionId, "login", {
    title: "Sample Item",
    fields: [
      { autocomplete: "username", value: "wendy.appleseed@1password.com" },
      { autocomplete: "current-password", value: "its-a-secret" },
    ],
    notes: "Item saved while testing the integration.",
  });
}

async function sendCreateCryptoItem(extensionId: string) {
  return createOPItem(extensionId, "crypto-wallet", {
    title: "Sample Crypto Wallet",
    fields: [
      { autocomplete: "crypto-address", value: "address-goes-here" },
      {
        autocomplete: "crypto-recovery-seed",
        value: Array.from(
          new TextEncoder().encode("sample-recovery-phrase ✨")
        ),
      },
    ],
    notes: undefined,
  });
}

// Expose functions for easy messaging
(window as any).messaging = {
  isOPInstalled,
  sendCreateItem,
  sendCreateCryptoItem,
};
