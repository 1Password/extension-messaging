import * as t from "io-ts";
import {
  ExtensionRequest,
  ExtensionResponse,
  SaveRequestCodec,
  CreateItemResponseDataCodec,
} from "./index";
import { CategoryReadable, CategoryUuidDictionary } from "./category";

const OPExtensions = [
  "dppgmdbiimibapkepcbdbmkaabgiofem",
  "aeblfdkhhhdcdjpifhhbdiojplfjncoa",
  "khgocmkkpikpnmmkgmdnfckapcdkgfaf",
  "{d634138d-c276-4fc8-924b-40a0ea21d284}",
  "{25fc87fa-4d31-4fee-b5c1-c32a7844c063}",
];

/** Public API */

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
          minimumExtensionVersion < helloResponse.buildNumber
        ) {
          continue;
        }

        return true;
      }
    } catch {}
  }
  return false;
};

export async function createOPItem(
  extensionId: string,
  itemType: t.TypeOf<typeof CategoryReadable>,
  saveRequest: t.TypeOf<typeof SaveRequestCodec>
): Promise<t.TypeOf<typeof CreateItemResponseDataCodec>> {
  if (CategoryUuidDictionary[itemType]) {
    const categoryUuid = CategoryUuidDictionary[itemType];
    return await sendExternalMessage(extensionId, {
      name: "create-item",
      data: {
        saveRequest,
        type: categoryUuid,
      },
    });
  } else {
    console.error(
      `Item type not valid, must be one of the following: ${CategoryReadable.types
        .map((type) => type.value)
        .join(", ")}`
    );
    return { saved: false };
  }
}

/** Helpers */

function sendExternalMessage<
  Request extends ExtensionRequest,
  Response extends Extract<ExtensionResponse, { name: Request["name"] }>["data"]
>(extensionId: string, message: Request): Promise<Response> {
  return new Promise<Response>((resolve, reject) => {
    // TODO add timeout / reject
    try {
      chrome.runtime.sendMessage(
        extensionId,
        JSON.stringify(message),
        (response) => resolve(response)
      );
    } catch {
      reject("Unable to send message");
    }
  });
}
