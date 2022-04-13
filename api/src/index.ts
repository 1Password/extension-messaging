import * as t from "io-ts";
import { AutocompleteType } from "./autocomplete";
import { CategoryUuid } from "./category";
export { isOPInstalled, createOPItem, encryptValue } from "./helpers";

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
          value: t.union([
            t.string,
            t.array(t.readonly(t.number)),
            t.undefined,
          ]),
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

export const RsaOtherPrimeInfoCodec = t.readonly(
  t.strict({
    d: t.union([t.string, t.undefined]),
    r: t.union([t.string, t.undefined]),
    t: t.union([t.string, t.undefined]),
  })
);

export const GetEncryptionKeyDataCodec = t.readonly(
  t.strict({
    alg: t.union([t.string, t.undefined]),
    crv: t.union([t.string, t.undefined]),
    d: t.union([t.string, t.undefined]),
    dp: t.union([t.string, t.undefined]),
    dq: t.union([t.string, t.undefined]),
    e: t.union([t.string, t.undefined]),
    ext: t.union([t.boolean, t.undefined]),
    k: t.union([t.string, t.undefined]),
    key_ops: t.union([t.array(t.string), t.undefined]),
    kty: t.union([t.string, t.undefined]),
    n: t.union([t.string, t.undefined]),
    oth: t.union([t.array(RsaOtherPrimeInfoCodec), t.undefined]),
    p: t.union([t.string, t.undefined]),
    q: t.union([t.string, t.undefined]),
    qi: t.union([t.string, t.undefined]),
    use: t.union([t.string, t.undefined]),
    x: t.union([t.string, t.undefined]),
    y: t.union([t.string, t.undefined]),
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
      data: GetEncryptionKeyDataCodec,
    })
  ),
]);

export type ExtensionResponse = t.TypeOf<typeof ExtensionResponseCodec>;
