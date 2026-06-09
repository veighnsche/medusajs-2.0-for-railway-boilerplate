import type { StorybookConfig } from "@storybook/nextjs-vite"

process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ??= "storybook"
process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ??= "http://localhost:9000"

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  staticDirs: ["../public"],
}

export default config
