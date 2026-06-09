import type { Meta, StoryObj } from "@storybook/react"
import type { ComponentProps } from "react"

import Radio from "."

type RadioArgs = ComponentProps<typeof Radio>

const meta = {
  title: "Common/Radio",
  component: Radio,
  args: {
    checked: true,
  },
} satisfies Meta<RadioArgs>

export default meta

type Story = StoryObj<RadioArgs>

export const Checked: Story = {}

export const Unchecked: Story = {
  args: {
    checked: false,
  },
}
