import * as t from "io-ts";

/** This is the list of 1Password category types */
export const CategoryUuid = t.union([
  t.literal("001"),
  t.literal("002"),
  t.literal("003"),
  t.literal("004"),
  t.literal("005"),
  t.literal("006"),
  t.literal("100"),
  t.literal("101"),
  t.literal("102"),
  t.literal("103"),
  t.literal("104"),
  t.literal("105"),
  t.literal("106"),
  t.literal("107"),
  t.literal("108"),
  t.literal("109"),
  t.literal("110"),
  t.literal("111"),
  t.literal("112"),
  t.literal("113"),
  t.literal("114"),
  t.literal("115"),
]);
