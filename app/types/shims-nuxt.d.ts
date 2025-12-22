// Minimal ambient typings to reduce TS problems in this workspace.
declare module '#app' {
  export function useNuxtApp(): any
  export const useRuntimeConfig: any
}

// Nuxt helpers used in .vue / nuxt config files
declare function definePageMeta(meta: any): void
declare function defineNuxtConfig<T = any>(config: T): T

// Image/file imports used in templates and code
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.webp'
declare module '*.svg'
