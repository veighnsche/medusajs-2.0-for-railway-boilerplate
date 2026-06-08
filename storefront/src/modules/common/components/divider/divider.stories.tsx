import type { Meta, StoryObj } from "@storybook/react/dist"
import type { ComponentProps, ComponentType } from "react"

import Divider from "."

type DividerArgs = ComponentProps<typeof Divider>

const meta = {
  title: "Common/Divider",
  component: Divider,
  decorators: [
    (Story: ComponentType) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<DividerArgs>

export default meta

type Story = StoryObj<DividerArgs>

export const Default: Story = {}
