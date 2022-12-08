/// <reference lib="webworker" />

import { clientsClaim } from "workbox-core";

declare const self: ServiceWorkerGlobalScope;

// eslint-disable-next-line no-restricted-globals
// @ts-ignore
const ignored = self.__WB_MANIFEST;

clientsClaim();

self.addEventListener("fetch", () => {});
