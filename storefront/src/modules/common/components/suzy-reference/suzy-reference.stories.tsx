import type { Meta, StoryObj } from "@storybook/react"

import {
  SuzyActionButton,
  SuzyButtonStateMatrix,
  SuzyGlassButtonKit,
  SuzyHeroStrip,
  SuzyIconTile,
  SuzyMenuStack,
  SuzyMusicPlayerPanel,
  SuzyPaletteTypography,
  SuzyReferenceBoard,
  SuzyRetroLoginPanel,
  SuzyStatusPanel,
} from "."

const Spark = () => (
  <svg
    aria-hidden="true"
    className="h-8 w-8"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 1.5 15 9l7.5 3L15 15l-3 7.5L9 15l-7.5-3L9 9z" />
  </svg>
)

const meta = {
  title: "Suzy Reference/Moodboard Components",
  component: SuzyReferenceBoard,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#000000" }],
    },
  },
} satisfies Meta<typeof SuzyReferenceBoard>

export default meta

type Story = StoryObj<typeof SuzyReferenceBoard>

export const ComponentBoard: Story = {}

export const HeroStrip: Story = {
  render: () => (
    <div className="bg-black p-6">
      <SuzyHeroStrip />
    </div>
  ),
}

export const ActionButtons: Story = {
  render: () => (
    <div className="flex min-h-screen items-center justify-center bg-black p-6">
      <div className="w-full max-w-md space-y-4">
        <SuzyActionButton tone="pink">Primary action</SuzyActionButton>
        <SuzyActionButton tone="blue">Secondary action</SuzyActionButton>
        <SuzyActionButton tone="yellow">Tertiary action</SuzyActionButton>
        <SuzyActionButton tone="purple" leadingIcon={<Spark />}>
          Add to collection
        </SuzyActionButton>
      </div>
    </div>
  ),
}

export const ImageGenButtonKit: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-6">
      <SuzyGlassButtonKit />
    </div>
  ),
}

export const ImageGenButtonStates: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-6">
      <SuzyButtonStateMatrix />
    </div>
  ),
}

export const IconTiles: Story = {
  render: () => (
    <div className="flex min-h-screen items-center justify-center bg-black p-6">
      <div className="grid w-full max-w-lg grid-cols-3 gap-4">
        <SuzyIconTile label="Heart" tone="pink">
          <span className="text-4xl leading-none">+</span>
        </SuzyIconTile>
        <SuzyIconTile label="Star" tone="blue">
          <Spark />
        </SuzyIconTile>
        <SuzyIconTile label="World" tone="yellow">
          <span className="text-4xl leading-none">O</span>
        </SuzyIconTile>
        <SuzyIconTile label="User" tone="purple">
          <span className="text-4xl leading-none">ID</span>
        </SuzyIconTile>
        <SuzyIconTile label="Cart" tone="pink">
          <span className="text-4xl leading-none">[]</span>
        </SuzyIconTile>
        <SuzyIconTile label="Search" tone="blue">
          <span className="text-4xl leading-none">?</span>
        </SuzyIconTile>
      </div>
    </div>
  ),
}

export const Panels: Story = {
  render: () => (
    <div className="grid min-h-screen place-items-center gap-6 bg-black p-6 small:grid-cols-3">
      <SuzyRetroLoginPanel />
      <SuzyStatusPanel />
      <SuzyMusicPlayerPanel />
    </div>
  ),
}

export const MenuStack: Story = {
  render: () => (
    <div className="flex min-h-screen items-center justify-center bg-black p-6">
      <SuzyMenuStack />
    </div>
  ),
}

export const PaletteTypography: Story = {
  render: () => (
    <div className="flex min-h-screen items-center justify-center bg-black p-6">
      <SuzyPaletteTypography />
    </div>
  ),
}
