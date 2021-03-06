import * as t from "io-ts";

/**
 * Auto fill types are defined in the [WHATWG HTML spec](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill)
 */
export const AutocompleteType = t.union([
  t.literal("none"),
  t.literal("name"),
  t.literal("honorific-prefix"),
  t.literal("given-name"),
  t.literal("additional-name"),
  t.literal("family-name"),
  t.literal("honorific-suffix"),
  t.literal("nickname"),
  t.literal("organization-title"),
  t.literal("username"),
  t.literal("new-password"),
  t.literal("current-password"),
  t.literal("one-time-code"),
  t.literal("organization"),
  t.literal("street-address"),
  t.literal("address-line1"),
  t.literal("address-line2"),
  t.literal("address-line3"),
  t.literal("address-level1"),
  t.literal("address-level2"),
  t.literal("address-level3"),
  t.literal("address-level4"),
  t.literal("country"),
  t.literal("country-name"),
  t.literal("postal-code"),
  t.literal("cc-name"),
  t.literal("cc-given-name"),
  t.literal("cc-additional-name"),
  t.literal("cc-family-name"),
  t.literal("cc-number"),
  t.literal("cc-exp"),
  t.literal("cc-exp-month"),
  t.literal("cc-exp-year"),
  t.literal("cc-csc"),
  t.literal("cc-type"),
  t.literal("transaction-currency"),
  t.literal("transaction-amount"),
  t.literal("language"),
  t.literal("bday"),
  t.literal("bday-day"),
  t.literal("bday-month"),
  t.literal("bday-year"),
  t.literal("sex"),
  t.literal("url"),
  t.literal("photo"),
  t.literal("tel"),
  t.literal("tel-country-code"),
  t.literal("tel-national"),
  t.literal("tel-area-code"),
  t.literal("tel-local"),
  t.literal("tel-local-prefix"),
  t.literal("tel-local-suffix"),
  t.literal("tel-extension"),
  t.literal("email"),
  t.literal("impp"),

  /** 1Password added types */
  t.literal("crypto-address"),
  t.literal("crypto-recovery-seed"),
]);
