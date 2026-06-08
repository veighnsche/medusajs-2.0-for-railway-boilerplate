import type { Meta, StoryObj } from "@storybook/react/dist"
import { type ComponentProps, useState } from "react"

import CheckboxWithLabel from "."

type CheckboxArgs = ComponentProps<typeof CheckboxWithLabel>

const StatefulCheckbox = (args: CheckboxArgs) => {
  const [checked, setChecked] = useState(Boolean(args.checked))

  return (
    <CheckboxWithLabel
      {...args}
      checked={checked}
      onChange={() => setChecked((current) => !current)}
    />
  )
}

const meta = {
  title: "Common/Checkbox",
  component: CheckboxWithLabel,
  args: {
    checked: true,
    label: "Use shipping address as billing address",
  },
} satisfies Meta<CheckboxArgs>

export default meta

type Story = StoryObj<CheckboxArgs>

export const Checked: Story = {}

export const Interactive: Story = {
  render: (args: CheckboxArgs) => <StatefulCheckbox {...args} />,
}
