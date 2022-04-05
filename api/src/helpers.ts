import * as t from "io-ts";
import {
  CreateItemDataCodec,
  EncryptedValueCodec,
  ExtensionRequest,
  ExtensionResponse,
} from "./index";

const OPExtensions = [
  "dppgmdbiimibapkepcbdbmkaabgiofem",
  "aeblfdkhhhdcdjpifhhbdiojplfjncoa",
  "khgocmkkpikpnmmkgmdnfckapcdkgfaf",
  "{d634138d-c276-4fc8-924b-40a0ea21d284}",
  "{25fc87fa-4d31-4fee-b5c1-c32a7844c063}",
];

export const isOPInstalled = async (minimumExtensionVersion?: number) => {
  for (const extension of OPExtensions) {
    try {
      const helloResponse = await sendExternalMessage(extension, {
        name: "hello",
      });

      if (helloResponse) {
        // If the extension found does not meet the minimum version then continue to the next
        if (
          typeof minimumExtensionVersion === "number" &&
          minimumExtensionVersion < helloResponse.data.buildNumber
        ) {
          continue;
        }

        return true;
      }
    } catch {}
  }
  return false;
};

export const createOpItem = async (
  extensionId: string,
  data: t.TypeOf<typeof CreateItemDataCodec>
): Promise<Extract<ExtensionResponse, { name: "create-item" }>> => {
  return await sendExternalMessage(extensionId, {
    name: "create-item",
    data,
  });
};

export const encryptValue = async (
  extensionId: string,
  value: Uint8Array
): Promise<t.TypeOf<typeof EncryptedValueCodec>> => {
  try {
    const encryptionKeyResponse = await sendExternalMessage(extensionId, {
      name: "get-encryption-key",
    });

    const cryptoKey = await window.crypto.subtle.importKey(
      "jwk",
      encryptionKeyResponse.data,
      {
        name: "RSA-OAEP",
        hash: { name: "SHA-1" },
      },
      true,
      ["encrypt"]
    );

    const encryptResult = await window.crypto.subtle.encrypt(
      "RSA-OAEP",
      cryptoKey,
      value
    );
    const encryptedValue = new TextDecoder().decode(
      new Uint8Array(encryptResult)
    );

    return {
      type: "encrypted",
      value: encryptedValue,
    };
  } catch {
    throw new Error("Unable to encrypt value provided");
  }
};

function sendExternalMessage<
  Request extends ExtensionRequest,
  Response extends Extract<ExtensionResponse, { name: Request["name"] }>
>(extensionId: string, message: Request): Promise<Response> {
  return new Promise<Response>((resolve, reject) => {
    // TODO add timeout / reject
    try {
      chrome.runtime.sendMessage(
        extensionId,
        JSON.stringify(message),
        (response) => {
          // console.log("Response:", response);
          resolve(response);
        }
      );
    } catch {
      reject("not found");
    }
  });
}
