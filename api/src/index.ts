import * as t from "io-ts";
import { AutocompleteType } from "./autocomplete";
import { CategoryUuid } from "./category";
export { isOPInstalled } from "./helpers";

export const EncryptedValueCodec = t.readonly(
  t.strict({
    type: t.literal("encrypted"),
    value: t.string,
  })
);

export const SaveRequestCodec = t.readonly(
  t.strict({
    title: t.string,
    fields: t.array(
      t.readonly(
        t.strict({
          autocomplete: AutocompleteType,
          value: t.union([t.string, EncryptedValueCodec, t.undefined]),
        })
      )
    ),
    notes: t.union([t.string, t.undefined]),
  })
);

export const CreateItemDataCodec = t.readonly(
  t.strict({
    type: CategoryUuid,
    saveRequest: SaveRequestCodec,
  })
);

/**
 * Root level message type for all messages between the 1Password and other
 * extensions. This is defined as an io-ts codec. We should always prefer
 * t.strict over t.type and t.partial, as it ensures additional properties are
 * stripped.
 */
export const ExtensionRequestCodec = t.union([
  t.readonly(
    t.strict({
      name: t.literal("hello"),
    })
  ),
  t.readonly(
    t.strict({
      name: t.literal("create-item"),
      data: CreateItemDataCodec,
    })
  ),
  t.readonly(
    t.strict({
      name: t.literal("get-encryption-key"),
    })
  ),
]);

export type ExtensionRequest = t.TypeOf<typeof ExtensionRequestCodec>;

export const HelloDataCodec = t.readonly(
  t.strict({
    buildNumber: t.number,
  })
);

export const CreateItemResponseDataCodec = t.readonly(
  t.strict({
    saved: t.boolean,
  })
);

export const ExtensionResponseCodec = t.union([
  t.readonly(
    t.strict({
      name: t.literal("hello"),
      data: HelloDataCodec,
    })
  ),
  t.readonly(
    t.strict({
      name: t.literal("create-item"),
      data: CreateItemResponseDataCodec,
    })
  ),
  t.readonly(
    t.strict({
      name: t.literal("get-encryption-key"),
      data: t.string,
    })
  ),
]);

export type ExtensionResponse = t.TypeOf<typeof ExtensionResponseCodec>;
