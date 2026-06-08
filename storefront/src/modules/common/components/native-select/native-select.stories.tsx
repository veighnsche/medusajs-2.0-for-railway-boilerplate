import type { Meta, StoryObj } from "@storybook/react/dist"
import type { ComponentProps, ComponentType } from "react"

import NativeSelect from "."

type NativeSelectArgs = ComponentProps<typeof NativeSelect>

const meta = {
  title: "Common/NativeSelect",
  component: NativeSelect,
  decorators: [
    (Story: ComponentType) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  args: {
    placeholder: "Select country",
    defaultValue: "",
  },
} satisfies Meta<NativeSelectArgs>

export default meta

type Story = StoryObj<NativeSelectArgs>

export const Country: Story = {
  render: (args: NativeSelectArgs) => (
    <NativeSelect {...args}>
      <option value="dk">Denmark</option>
      <option value="be">Belgium</option>
      <option value="nl">Netherlands</option>
    </NativeSelect>
  ),
}
