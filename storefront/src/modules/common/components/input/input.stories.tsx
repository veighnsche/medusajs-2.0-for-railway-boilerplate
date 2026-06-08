import type { Meta, StoryObj } from "@storybook/react/dist"
import type { ComponentProps, ComponentType } from "react"

import Input from "."

type InputArgs = ComponentProps<typeof Input>

const meta = {
  title: "Common/Input",
  component: Input,
  decorators: [
    (Story: ComponentType) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  args: {
    label: "Email",
    name: "email",
    type: "email",
  },
} satisfies Meta<InputArgs>

export default meta

type Story = StoryObj<InputArgs>

export const Empty: Story = {}

export const WithValue: Story = {
  args: {
    defaultValue: "customer@example.com",
  },
}

export const Password: Story = {
  args: {
    label: "Password",
    name: "password",
    type: "password",
  },
}
