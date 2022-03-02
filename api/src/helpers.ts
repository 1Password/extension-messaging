import { ExtensionRequest, ExtensionResponse } from "./index";

const OPExtensions = [
  "dppgmdbiimibapkepcbdbmkaabgiofem",
  "aeblfdkhhhdcdjpifhhbdiojplfjncoa",
  "khgocmkkpikpnmmkgmdnfckapcdkgfaf",
  "{d634138d-c276-4fc8-924b-40a0ea21d284}",
  "{25fc87fa-4d31-4fee-b5c1-c32a7844c063}",
];

export const isOPInstalled = async () => {
  for (const extension of OPExtensions) {
    try {
      const hasOP = await sendExternalMessage(extension, { name: "hello" });
      if (hasOP) {
        return true;
      }
    } catch {}
  }
  return false;
};

function sendExternalMessage(
  extensionId: string,
  message: ExtensionRequest
): Promise<ExtensionResponse> {
  return new Promise<ExtensionResponse>((resolve, reject) => {
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
