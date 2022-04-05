import {
  isOPInstalled,
  createOPItem,
  encryptValue,
} from "@1password/extension-types";

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
  const sampleRecoverySeed = await encryptValue(
    extensionId,
    // Sample string: 'sample-recovery-phrase'
    new Uint8Array([
      115, 97, 109, 112, 108, 101, 45, 114, 101, 99, 111, 118, 101, 114, 121,
      45, 112, 104, 114, 97, 115, 101,
    ])
  );

  return createOPItem(extensionId, "crypto-wallet", {
    title: "Sample Crypto Wallet",
    fields: [
      { autocomplete: "crypto-address", value: "address-goes-here" },
      {
        autocomplete: "crypto-recovery-seed",
        value: sampleRecoverySeed,
      },
    ],
    notes: "Item saved while testing the integration.",
  });
}

// Expose functions for easy messaging
(window as any).messaging = {
  isOPInstalled,
  sendCreateItem,
  sendCreateCryptoItem,
};
