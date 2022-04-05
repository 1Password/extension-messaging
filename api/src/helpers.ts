import { ExtensionRequest, ExtensionResponse } from "./index";

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
