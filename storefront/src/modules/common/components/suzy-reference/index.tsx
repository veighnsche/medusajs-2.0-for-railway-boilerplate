import { useState } from "react"
import type {
  CSSProperties,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
} from "react"

type SuzyTone = "pink" | "blue" | "yellow" | "purple" | "white"

type SuzyButtonProps = {
  children: ReactNode
  tone?: SuzyTone
  leadingIcon?: ReactNode
}

type SuzyGlassButtonState = "default" | "selected" | "loading" | "disabled"

type SuzyImageInteractionState = "idle" | "hover" | "pressed"

type SuzyGlassButtonProps = SuzyButtonProps & {
  state?: SuzyGlassButtonState
  trailingIcon?: ReactNode
}

type SuzyGlassInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "children"
> & {
  label?: string
  tone?: SuzyTone
}

type Meter = {
  label: string
  value: number
}

const displayFace =
  '"Arial Narrow", "DIN Condensed", Impact, "Roboto Condensed", sans-serif'

const monoFace = '"IBM Plex Mono", "Courier New", "Menlo", "Monaco", monospace'

const toneClasses: Record<SuzyTone, string> = {
  pink: "bg-[#ff0055] text-black border-[#ff0055]",
  blue: "bg-[#00e5ff] text-black border-[#00e5ff]",
  yellow: "bg-[#ffe600] text-black border-[#ffe600]",
  purple: "bg-[#9000ff] text-white border-[#9000ff]",
  white: "bg-[#f5f3ec] text-black border-[#f5f3ec]",
}

const pngToneTextClasses: Record<SuzyTone, string> = {
  pink: "text-white",
  blue: "text-black",
  yellow: "text-black",
  purple: "text-white",
  white: "text-black",
}

const glassToneStyle: Record<SuzyTone, CSSProperties> = {
  pink: {
    "--suzy-glass": "255, 0, 85",
    "--suzy-glass-dark": "#9f0036",
    "--suzy-glass-text": "#ffffff",
  } as CSSProperties,
  blue: {
    "--suzy-glass": "0, 229, 255",
    "--suzy-glass-dark": "#0079a8",
    "--suzy-glass-text": "#00131a",
  } as CSSProperties,
  yellow: {
    "--suzy-glass": "255, 230, 0",
    "--suzy-glass-dark": "#a88300",
    "--suzy-glass-text": "#080800",
  } as CSSProperties,
  purple: {
    "--suzy-glass": "144, 0, 255",
    "--suzy-glass-dark": "#4c008c",
    "--suzy-glass-text": "#ffffff",
  } as CSSProperties,
  white: {
    "--suzy-glass": "245, 243, 236",
    "--suzy-glass-dark": "#8d887c",
    "--suzy-glass-text": "#050505",
  } as CSSProperties,
}

const textureStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
  backgroundSize: "18px 18px",
}

const lcdTextureStyle: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)",
  backgroundSize: "8px 8px",
}

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ")

const getButtonAsset = (
  shape: "wide" | "square",
  tone: SuzyTone,
  state: "idle" | "hover" | "pressed"
) => `/suzy-reference/button-assets/glass-button-${shape}-${tone}-${state}.png`

const getSuzyImageVisualState = (
  lockedState: SuzyGlassButtonState | undefined,
  interactionState: SuzyImageInteractionState
): SuzyImageInteractionState => {
  if (lockedState === "disabled") {
    return "idle"
  }

  if (lockedState === "selected") {
    return "hover"
  }

  if (lockedState === "loading") {
    return "pressed"
  }

  return interactionState
}

const SuzyPngButtonLayers = ({
  tone,
  shape,
  lockedState,
  interactionState = "idle",
}: {
  tone: SuzyTone
  shape: "wide" | "square"
  lockedState?: SuzyGlassButtonState
  interactionState?: SuzyImageInteractionState
}) => {
  const selected = lockedState === "selected"
  const pressed = lockedState === "loading"
  const disabled = lockedState === "disabled"
  const visualState = getSuzyImageVisualState(lockedState, interactionState)
  const allowPseudoStates = !disabled && !selected && !pressed

  return (
    <>
      <img
        alt=""
        aria-hidden="true"
        className={cx(
          "pointer-events-none absolute inset-0 h-full w-full object-fill transition-opacity duration-150",
          visualState === "idle"
            ? cx(
                "opacity-100",
                allowPseudoStates &&
                  "group-hover:opacity-0 group-focus:opacity-0 group-active:opacity-0"
              )
            : "opacity-0"
        )}
        data-suzy-layer="idle"
        draggable={false}
        src={getButtonAsset(shape, tone, "idle")}
      />
      <img
        alt=""
        aria-hidden="true"
        className={cx(
          "pointer-events-none absolute inset-0 h-full w-full object-fill transition-opacity duration-150",
          visualState === "hover"
            ? "opacity-100"
            : cx(
                "opacity-0",
                allowPseudoStates &&
                  "group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-0"
              )
        )}
        data-suzy-layer="hover"
        draggable={false}
        src={getButtonAsset(shape, tone, "hover")}
      />
      <img
        alt=""
        aria-hidden="true"
        className={cx(
          "pointer-events-none absolute inset-0 h-full w-full object-fill transition-opacity duration-75",
          visualState === "pressed"
            ? "opacity-100"
            : cx("opacity-0", allowPseudoStates && "group-active:opacity-100")
        )}
        data-suzy-layer="pressed"
        draggable={false}
        src={getButtonAsset(shape, tone, "pressed")}
      />
    </>
  )
}

const Arrow = () => (
  <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
    <path
      d="M5 12h12m-5-5 5 5-5 5"
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="miter"
      strokeWidth="2.5"
    />
  </svg>
)

const Play = () => (
  <svg
    aria-hidden="true"
    className="h-4 w-4"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M4 2.5 13 8l-9 5.5z" />
  </svg>
)

const Globe = () => (
  <svg aria-hidden="true" className="h-9 w-9" fill="none" viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="2" />
    <path d="M3 20h34M20 3v34" stroke="currentColor" strokeWidth="2" />
    <path
      d="M10 8c4 5 4 19 0 24M30 8c-4 5-4 19 0 24"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
)

const Spark = () => (
  <svg
    aria-hidden="true"
    className="h-6 w-6"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 1.5 15 9l7.5 3L15 15l-3 7.5L9 15l-7.5-3L9 9z" />
  </svg>
)

const Heart = () => (
  <svg
    aria-hidden="true"
    className="h-8 w-8"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 21s-8-4.9-8-11a4.7 4.7 0 0 1 8-3.3A4.7 4.7 0 0 1 20 10c0 6.1-8 11-8 11z" />
  </svg>
)

const User = () => (
  <svg
    aria-hidden="true"
    className="h-8 w-8"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm-8 9a8 8 0 0 1 16 0z" />
  </svg>
)

const Cart = () => (
  <svg aria-hidden="true" className="h-8 w-8" fill="none" viewBox="0 0 24 24">
    <path
      d="M3 4h3l2.5 11h9L21 7H8"
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="miter"
      strokeWidth="2.3"
    />
    <path d="M10 20h.01M18 20h.01" stroke="currentColor" strokeWidth="4" />
  </svg>
)

const Pause = () => (
  <svg
    aria-hidden="true"
    className="h-4 w-4"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M4 2h3v12H4zM9 2h3v12H9z" />
  </svg>
)

const Stop = () => (
  <svg
    aria-hidden="true"
    className="h-4 w-4"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M4 4h8v8H4z" />
  </svg>
)

const Search = () => (
  <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24">
    <path
      d="m16.5 16.5 4.5 4.5M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
      stroke="currentColor"
      strokeLinecap="square"
      strokeWidth="2.4"
    />
  </svg>
)

const Home = () => (
  <svg
    aria-hidden="true"
    className="h-8 w-8"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="m3 11 9-8 9 8v10h-6v-6H9v6H3z" />
  </svg>
)

const Music = () => (
  <svg
    aria-hidden="true"
    className="h-8 w-8"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M10 4v11.4A3.6 3.6 0 1 1 8 12.2V4zm0 0h10v4H10z" />
  </svg>
)

const Gallery = () => (
  <svg aria-hidden="true" className="h-8 w-8" fill="none" viewBox="0 0 24 24">
    <path
      d="M4 5h16v14H4zM7 16l3.5-4 2.5 3 2-2.2 3 3.2M8 9h.01"
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="miter"
      strokeWidth="2.1"
    />
  </svg>
)

const Gear = () => (
  <svg aria-hidden="true" className="h-8 w-8" fill="none" viewBox="0 0 24 24">
    <path
      d="M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7ZM12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="miter"
      strokeWidth="2"
    />
  </svg>
)

const Eject = () => (
  <svg
    aria-hidden="true"
    className="h-4 w-4"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M8 2 2.5 9h11zM3 12h10v2H3z" />
  </svg>
)

const RecordDot = () => (
  <span aria-hidden="true" className="h-4 w-4 rounded-full bg-current" />
)

const GlassCorners = () => (
  <>
    {[
      "left-2 top-2",
      "right-2 top-2",
      "bottom-2 left-2",
      "bottom-2 right-2",
    ].map((position) => (
      <span
        aria-hidden="true"
        className={cx(
          "absolute h-3 w-3 rounded-full border border-white/45 bg-black/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.75)]",
          position
        )}
        key={position}
      />
    ))}
  </>
)

const useSuzyImageInteraction = (state: SuzyGlassButtonState) => {
  const [interactionState, setInteractionState] =
    useState<SuzyImageInteractionState>("idle")
  const isInteractive = state === "default"

  const updateInteractionState = (nextState: SuzyImageInteractionState) => {
    if (isInteractive) {
      setInteractionState(nextState)
    }
  }

  return {
    interactionState,
    interactionProps: {
      onBlur: () => updateInteractionState("idle"),
      onFocus: () => updateInteractionState("hover"),
      onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === " " || event.key === "Enter") {
          updateInteractionState("pressed")
        }
      },
      onKeyUp: (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === " " || event.key === "Enter") {
          updateInteractionState("hover")
        }
      },
      onClick: () => updateInteractionState("hover"),
      onMouseDown: () => updateInteractionState("pressed"),
      onMouseEnter: () => updateInteractionState("hover"),
      onMouseLeave: () => updateInteractionState("idle"),
      onMouseUp: () => updateInteractionState("hover"),
      onPointerCancel: () => updateInteractionState("idle"),
      onPointerDown: () => updateInteractionState("pressed"),
      onPointerEnter: () => updateInteractionState("hover"),
      onPointerLeave: () => updateInteractionState("idle"),
      onPointerUp: () => updateInteractionState("hover"),
    },
  }
}

export const SuzyGlassButton = ({
  children,
  tone = "pink",
  leadingIcon,
  trailingIcon = <Arrow />,
  state = "default",
}: SuzyGlassButtonProps) => {
  const isDisabled = state === "disabled" || state === "loading"
  const { interactionProps, interactionState } = useSuzyImageInteraction(state)

  return (
    <button
      aria-busy={state === "loading" || undefined}
      aria-pressed={state === "selected" || undefined}
      className={cx(
        "group relative flex h-[92px] w-full max-w-[420px] min-w-0 items-center justify-between overflow-hidden px-7 uppercase transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        pngToneTextClasses[tone],
        state === "default" &&
          "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]",
        state === "selected" && "translate-y-[1px] ring-2 ring-white/70",
        state === "loading" && "cursor-progress opacity-90",
        state === "disabled" && "cursor-not-allowed grayscale opacity-45"
      )}
      data-suzy-image-state={getSuzyImageVisualState(state, interactionState)}
      disabled={isDisabled}
      style={{ fontFamily: displayFace, letterSpacing: "0.03em" }}
      type="button"
      {...interactionProps}
    >
      <SuzyPngButtonLayers
        interactionState={interactionState}
        lockedState={state}
        shape="wide"
        tone={tone}
      />

      <span className="relative z-10 flex min-w-0 items-center gap-3 text-xl font-black leading-none">
        {leadingIcon}
        <span className="truncate">
          {state === "loading" ? "Loading..." : children}
        </span>
      </span>

      <span className="relative z-10 flex items-center">
        {state === "loading" ? (
          <span className="h-5 w-5 animate-ring rounded-full border-2 border-current border-t-transparent" />
        ) : (
          trailingIcon
        )}
      </span>
    </button>
  )
}

export const SuzyGlassIconButton = ({
  children,
  tone = "pink",
  label,
  state = "default",
}: SuzyButtonProps & {
  label: string
  state?: SuzyGlassButtonState
}) => {
  const isDisabled = state === "disabled" || state === "loading"
  const { interactionProps, interactionState } = useSuzyImageInteraction(state)

  return (
    <button
      aria-label={label}
      aria-pressed={state === "selected" || undefined}
      className={cx(
        "group relative flex h-[136px] w-[136px] flex-none flex-col items-center justify-center gap-2 overflow-hidden p-4 uppercase transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        pngToneTextClasses[tone],
        state === "default" &&
          "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        state === "selected" && "translate-y-[1px] ring-2 ring-white/70",
        state === "loading" && "cursor-progress opacity-90",
        state === "disabled" && "cursor-not-allowed grayscale opacity-45"
      )}
      data-suzy-image-state={getSuzyImageVisualState(state, interactionState)}
      disabled={isDisabled}
      style={{ fontFamily: displayFace }}
      type="button"
      {...interactionProps}
    >
      <SuzyPngButtonLayers
        interactionState={interactionState}
        lockedState={state}
        shape="square"
        tone={tone}
      />
      <span className="relative z-10 flex h-10 items-center justify-center">
        {children}
      </span>
      <span className="relative z-10 text-center text-[11px] font-black leading-none">
        {label}
      </span>
    </button>
  )
}

export const SuzyActionButton = ({
  children,
  tone = "pink",
  leadingIcon,
}: SuzyButtonProps) => (
  <button
    className={cx(
      "group flex h-14 w-full items-center justify-between border-2 px-4 text-left uppercase shadow-[inset_0_0_0_2px_rgba(255,255,255,0.18)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
      toneClasses[tone]
    )}
    style={{ fontFamily: displayFace, letterSpacing: "0.03em" }}
    type="button"
  >
    <span className="flex min-w-0 items-center gap-3 text-xl font-black leading-none">
      {leadingIcon}
      <span className="truncate">{children}</span>
    </span>
    <Arrow />
  </button>
)

export const SuzyIconTile = ({
  children,
  tone = "pink",
  label,
}: SuzyButtonProps & { label: string }) => (
  <div
    className={cx(
      "flex aspect-square min-h-24 flex-col items-center justify-center gap-2 border-2 p-3 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.18)]",
      toneClasses[tone]
    )}
  >
    <div className="flex h-10 items-center justify-center">{children}</div>
    <span
      className="text-center text-[11px] font-black uppercase leading-none"
      style={{ fontFamily: displayFace, letterSpacing: "0.04em" }}
    >
      {label}
    </span>
  </div>
)

export const SuzyGlassTextInput = ({
  label = "Enter your username",
  tone = "blue",
  className,
  id,
  placeholder,
  ...inputProps
}: SuzyGlassInputProps) => (
  <label
    className={cx(
      "relative block w-full overflow-hidden border border-white/25 px-5 py-4 text-[var(--suzy-glass-text)] shadow-[0_8px_22px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.72),inset_0_-10px_24px_rgba(0,0,0,0.32)] focus-within:ring-2 focus-within:ring-white",
      className
    )}
    htmlFor={id}
    style={{
      ...glassToneStyle[tone],
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.5), rgba(255,255,255,0.08) 24%, rgba(var(--suzy-glass),0.64)), linear-gradient(90deg, rgba(0,0,0,0.2), transparent 24%, rgba(255,255,255,0.12))",
      borderColor: "rgba(var(--suzy-glass),0.9)",
      fontFamily: monoFace,
    }}
  >
    <span className="sr-only">{label}</span>
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-[5px] border border-white/20"
    />
    <GlassCorners />
    <span className="relative z-10 flex items-center gap-4">
      <input
        aria-label={inputProps["aria-label"] ?? label}
        className="min-w-0 flex-1 bg-transparent text-xl font-black uppercase leading-none outline-none placeholder:text-[var(--suzy-glass-text)] placeholder:opacity-85"
        id={id}
        placeholder={placeholder ?? label}
        {...inputProps}
      />
      <span className="h-6 w-2 animate-pulse bg-black/80" />
    </span>
  </label>
)

export const SuzyGlassSearchField = ({
  label = "Search",
  className,
  id,
  placeholder = "Search...",
  ...inputProps
}: Omit<SuzyGlassInputProps, "tone">) => (
  <label
    className={cx(
      "relative flex h-20 w-full items-center justify-between overflow-hidden border border-white/25 px-6 text-black shadow-[0_8px_22px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.72),inset_0_-10px_24px_rgba(0,0,0,0.32)] focus-within:ring-2 focus-within:ring-white",
      className
    )}
    htmlFor={id}
    style={{
      ...glassToneStyle.white,
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.62), rgba(255,255,255,0.2) 28%, rgba(245,243,236,0.72)), linear-gradient(90deg, rgba(0,0,0,0.14), transparent 32%, rgba(255,255,255,0.26))",
      borderColor: "rgba(245,243,236,0.9)",
      fontFamily: monoFace,
    }}
  >
    <span className="sr-only">{label}</span>
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-[5px] border border-white/25"
    />
    <GlassCorners />
    <input
      aria-label={inputProps["aria-label"] ?? label}
      className="relative z-10 min-w-0 flex-1 bg-transparent text-2xl font-black uppercase leading-none text-black/70 outline-none placeholder:text-black/70"
      id={id}
      placeholder={placeholder}
      type="search"
      {...inputProps}
    />
    <span aria-hidden="true" className="relative z-10">
      <Search />
    </span>
  </label>
)

export const SuzyGlassPlaybackControls = () => (
  <div className="grid w-full gap-3 small:grid-cols-4">
    <SuzyGlassButton tone="pink" leadingIcon={<Play />} trailingIcon={null}>
      Play
    </SuzyGlassButton>
    <SuzyGlassButton tone="blue" leadingIcon={<Pause />} trailingIcon={null}>
      Pause
    </SuzyGlassButton>
    <SuzyGlassButton tone="yellow" leadingIcon={<Stop />} trailingIcon={null}>
      Stop
    </SuzyGlassButton>
    <SuzyGlassButton
      tone="purple"
      leadingIcon={<RecordDot />}
      trailingIcon={null}
    >
      Rec
    </SuzyGlassButton>
  </div>
)

export const SuzyGlassButtonKit = () => (
  <section className="mx-auto grid max-w-[1220px] gap-6 bg-black text-white small:grid-cols-[0.9fr_1.25fr_0.9fr]">
    <div className="grid grid-cols-[repeat(auto-fit,136px)] gap-4">
      <SuzyGlassIconButton label="Home" tone="pink">
        <Home />
      </SuzyGlassIconButton>
      <SuzyGlassIconButton label="Profile" tone="pink">
        <User />
      </SuzyGlassIconButton>
      <SuzyGlassIconButton label="Music" tone="blue">
        <Music />
      </SuzyGlassIconButton>
      <SuzyGlassIconButton label="Gallery" tone="yellow">
        <Gallery />
      </SuzyGlassIconButton>
      <SuzyGlassIconButton label="Store" tone="purple">
        <Cart />
      </SuzyGlassIconButton>
      <SuzyGlassIconButton label="Settings" tone="white">
        <Gear />
      </SuzyGlassIconButton>
    </div>

    <div className="flex flex-col justify-between gap-4">
      <SuzyGlassPlaybackControls />
      <SuzyGlassSearchField name="query" />
      <SuzyGlassTextInput name="username" />
      <SuzyGlassTextInput
        aria-label="Password"
        label="Password"
        name="password"
        tone="yellow"
        type="password"
      />
      <div className="grid gap-3 small:grid-cols-4">
        <SuzyGlassButton tone="pink" trailingIcon={null}>
          Submit
        </SuzyGlassButton>
        <SuzyGlassButton tone="white" trailingIcon={null}>
          Cancel
        </SuzyGlassButton>
        <SuzyGlassButton tone="blue" state="selected" trailingIcon={null}>
          Yes
        </SuzyGlassButton>
        <SuzyGlassButton tone="yellow" trailingIcon={null}>
          No
        </SuzyGlassButton>
      </div>
    </div>

    <div className="space-y-3">
      <SuzyGlassButton tone="pink" leadingIcon={<Play />}>
        Primary action
      </SuzyGlassButton>
      <SuzyGlassButton tone="blue" leadingIcon={<Pause />}>
        Secondary action
      </SuzyGlassButton>
      <SuzyGlassButton tone="yellow" leadingIcon={<Stop />}>
        Tertiary action
      </SuzyGlassButton>
      <SuzyGlassButton tone="purple" leadingIcon={<span>+</span>}>
        Add to collection
      </SuzyGlassButton>
      <SuzyGlassButton tone="white" leadingIcon={<Eject />}>
        Eject
      </SuzyGlassButton>
    </div>
  </section>
)

export const SuzyButtonStateMatrix = () => {
  const states: SuzyGlassButtonState[] = [
    "default",
    "selected",
    "loading",
    "disabled",
  ]

  return (
    <section className="grid gap-4 bg-black p-6 text-white small:grid-cols-4">
      {states.map((state) => (
        <div className="space-y-3" key={state}>
          <h3
            className="text-sm font-black uppercase text-white/60"
            style={{ fontFamily: monoFace }}
          >
            {state}
          </h3>
          <SuzyGlassButton state={state} tone="pink" leadingIcon={<Play />}>
            Play
          </SuzyGlassButton>
          <SuzyGlassButton state={state} tone="blue" leadingIcon={<Pause />}>
            Pause
          </SuzyGlassButton>
          <SuzyGlassButton state={state} tone="yellow" leadingIcon={<Stop />}>
            Stop
          </SuzyGlassButton>
          <SuzyGlassButton
            state={state}
            tone="purple"
            leadingIcon={<RecordDot />}
          >
            Rec
          </SuzyGlassButton>
        </div>
      ))}
    </section>
  )
}

export const SuzyRetroLoginPanel = () => (
  <section
    className="w-full max-w-[430px] border-2 border-[#d6df17] bg-[#c7d51d] p-5 text-black shadow-[0_0_0_3px_#050505,inset_0_0_0_2px_rgba(0,0,0,0.15)]"
    style={{ ...lcdTextureStyle, fontFamily: monoFace }}
  >
    <div className="mb-8 text-2xl font-black uppercase leading-none">
      Suzy One Kenobi
    </div>

    <label className="mb-6 block">
      <span className="mb-2 block text-lg font-black uppercase">User ID</span>
      <span className="block h-7 border-b-2 border-dotted border-black bg-transparent" />
    </label>

    <label className="mb-8 block">
      <span className="mb-2 block text-lg font-black uppercase">Password</span>
      <span className="block h-7 border-b-2 border-dotted border-black bg-transparent" />
    </label>

    <button
      className="flex h-11 w-full items-center gap-3 bg-black px-4 text-left text-lg font-black uppercase text-[#d6df17]"
      type="button"
    >
      <Arrow />
      Login
    </button>
  </section>
)

export const SuzyStatusPanel = ({
  meters = [
    { label: "Memory", value: 64 },
    { label: "Battery", value: 78 },
    { label: "Storage", value: 32 },
  ],
}: {
  meters?: Meter[]
}) => (
  <section
    className="w-full max-w-[430px] border-2 border-[#00a8d5] bg-[#8ed7f6] p-5 text-black shadow-[0_0_0_3px_#050505,inset_0_0_0_2px_rgba(0,0,0,0.15)]"
    style={{ ...lcdTextureStyle, fontFamily: monoFace }}
  >
    <div className="mb-5 flex items-center justify-between border-b-2 border-black pb-3">
      <h3 className="text-xl font-black uppercase leading-none">
        System Status
      </h3>
      <span className="h-5 w-8 border-2 border-black" />
    </div>

    <div className="space-y-5">
      {meters.map((meter) => (
        <div key={meter.label}>
          <div className="mb-2 flex items-center justify-between text-lg font-black uppercase leading-none">
            <span>{meter.label}</span>
            <span>{meter.value}%</span>
          </div>
          <div className="h-4 border-2 border-black p-[2px]">
            <div
              className="h-full bg-black"
              style={{ width: `${Math.max(0, Math.min(100, meter.value))}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </section>
)

export const SuzyMusicPlayerPanel = () => {
  const bars = [4, 10, 7, 13, 8, 5, 3, 11, 15, 8, 6, 4, 14, 19, 9, 5]

  return (
    <section
      className="w-full max-w-[500px] border-2 border-[#b8a0dc] bg-[#a48ccd] text-black shadow-[0_0_0_3px_#050505,inset_0_0_0_2px_rgba(0,0,0,0.15)]"
      style={{ ...lcdTextureStyle, fontFamily: monoFace }}
    >
      <div className="flex items-center justify-between border-b-2 border-black px-5 py-3 text-lg font-black uppercase">
        <span>Track 01/10</span>
        <Play />
      </div>

      <div className="px-5 py-6">
        <h3 className="text-2xl font-black uppercase leading-none">
          Another Dimension
        </h3>
        <p className="mt-1 text-sm font-black uppercase">Suzy One Kenobi</p>

        <div className="mt-5 flex items-end gap-1 border-b-2 border-black pb-1">
          {bars.map((height, index) => (
            <span
              className="w-full bg-black"
              key={`${height}-${index}`}
              style={{ height }}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 border-t-2 border-black text-center text-lg font-black uppercase">
        <button className="py-3" type="button">
          Back
        </button>
        <button className="border-x-2 border-black py-3" type="button">
          Pause
        </button>
        <button className="py-3" type="button">
          Next
        </button>
      </div>
    </section>
  )
}

export const SuzyMenuStack = () => {
  const items = [
    ["01", "Home", "pink"],
    ["02", "Music", "blue"],
    ["03", "Gallery", "yellow"],
    ["04", "News", "purple"],
    ["05", "Store", "white"],
  ] as const

  return (
    <nav className="w-full max-w-[420px] border-2 border-black bg-black">
      {items.map(([number, label, tone]) => (
        <button
          className={cx(
            "flex h-16 w-full items-center justify-between border-b-2 border-black px-6 text-left uppercase last:border-b-0",
            toneClasses[tone]
          )}
          key={number}
          style={{ fontFamily: displayFace, letterSpacing: "0.02em" }}
          type="button"
        >
          <span className="flex items-center gap-5 text-2xl font-black leading-none">
            <span className="text-xl">{number}</span>
            {label}
          </span>
          <Arrow />
        </button>
      ))}
    </nav>
  )
}

export const SuzyPaletteTypography = () => {
  const palette = [
    ["#ff0055", "Pink"],
    ["#00e5ff", "Blue"],
    ["#ffe600", "Yellow"],
    ["#9000ff", "Purple"],
    ["#000000", "Black"],
    ["#ffffff", "White"],
  ]

  return (
    <section
      className="w-full max-w-[760px] border-2 border-[#222] bg-black p-8 text-white"
      style={textureStyle}
    >
      <div className="grid gap-8 small:grid-cols-[1fr_1.1fr]">
        <div>
          <h3
            className="mb-5 text-xl font-black uppercase"
            style={{ fontFamily: monoFace }}
          >
            Color Palette
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {palette.map(([hex, label]) => (
              <div key={hex}>
                <div
                  className="mb-2 aspect-square border-2 border-white/25"
                  style={{ backgroundColor: hex }}
                />
                <div
                  className="text-xs font-black uppercase text-white/80"
                  style={{ fontFamily: monoFace }}
                >
                  {label}
                </div>
                <div className="text-[11px] uppercase text-white/55">{hex}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3
            className="mb-5 text-xl font-black uppercase"
            style={{ fontFamily: monoFace }}
          >
            Typography Direction
          </h3>
          <div className="flex items-end gap-5">
            <span
              className="text-[96px] font-black uppercase leading-none text-[#ff0055]"
              style={{ fontFamily: displayFace }}
            >
              Aa
            </span>
            <span
              className="text-[96px] font-black uppercase leading-none text-[#f5f3ec]"
              style={{ fontFamily: displayFace }}
            >
              Aa
            </span>
          </div>
          <ul
            className="mt-5 space-y-1 text-2xl font-black uppercase leading-none"
            style={{ fontFamily: displayFace, letterSpacing: "0.03em" }}
          >
            <li>Bold</li>
            <li>Expressive</li>
            <li>Dynamic</li>
            <li>Fearless</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export const SuzyHeroStrip = () => (
  <section
    className="grid min-h-[360px] overflow-hidden border-2 border-white/15 bg-black text-white small:grid-cols-[1.05fr_1fr]"
    style={textureStyle}
  >
    <div className="flex flex-col justify-between p-8 small:p-10">
      <div className="flex items-center justify-between text-white/80">
        <span
          className="text-sm font-black uppercase"
          style={{ fontFamily: monoFace }}
        >
          Play Intro
        </span>
        <Globe />
      </div>

      <div>
        <h2
          className="max-w-[460px] text-[72px] font-black uppercase leading-[0.82] text-white small:text-[92px]"
          style={{ fontFamily: displayFace }}
        >
          Suzy <span className="text-[#ff0055]">One</span> Kenobi
        </h2>
        <p
          className="mt-5 max-w-[330px] text-sm font-black uppercase leading-tight text-white/80"
          style={{ fontFamily: monoFace }}
        >
          K-pop icon, pop art, futuristic storefront direction.
        </p>
      </div>

      <div className="max-w-[290px]">
        <SuzyActionButton tone="pink">Enter the dimension</SuzyActionButton>
      </div>
    </div>

    <div className="relative min-h-[260px] border-t-2 border-white/15 bg-[#ffe600] p-6 text-black small:border-l-2 small:border-t-0">
      <div className="absolute right-6 top-6">
        <Spark />
      </div>
      <div className="flex h-full flex-col justify-end">
        <div
          className="mb-5 text-[84px] font-black uppercase leading-[0.8] small:text-[112px]"
          style={{ fontFamily: displayFace }}
        >
          Icon
          <br />
          Mode
        </div>
        <div
          className="grid grid-cols-9 items-end gap-1 border-b-4 border-black pb-2"
          aria-hidden="true"
        >
          {[8, 16, 11, 28, 20, 34, 18, 10, 24].map((height, index) => (
            <span
              className="block w-full bg-black"
              key={`${height}-${index}`}
              style={{ height }}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
)

export const SuzyReferenceBoard = () => (
  <div className="min-h-screen bg-black p-6 text-white small:p-8">
    <div className="mx-auto flex max-w-[1220px] flex-col gap-8">
      <SuzyHeroStrip />

      <SuzyGlassButtonKit />

      <SuzyButtonStateMatrix />

      <div className="grid gap-6 small:grid-cols-[1fr_1fr_0.9fr]">
        <div className="space-y-4">
          <SuzyActionButton tone="pink" leadingIcon={<Play />}>
            Primary action
          </SuzyActionButton>
          <SuzyActionButton tone="blue" leadingIcon={<Play />}>
            Secondary action
          </SuzyActionButton>
          <SuzyActionButton tone="yellow">Tertiary action</SuzyActionButton>
          <SuzyActionButton tone="purple" leadingIcon={<Spark />}>
            Add to collection
          </SuzyActionButton>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <SuzyIconTile label="Heart" tone="pink">
            <Heart />
          </SuzyIconTile>
          <SuzyIconTile label="Star" tone="blue">
            <Spark />
          </SuzyIconTile>
          <SuzyIconTile label="World" tone="yellow">
            <Globe />
          </SuzyIconTile>
          <SuzyIconTile label="User" tone="purple">
            <User />
          </SuzyIconTile>
          <SuzyIconTile label="Cart" tone="pink">
            <Cart />
          </SuzyIconTile>
          <SuzyIconTile label="Search" tone="blue">
            <span className="text-5xl leading-none">?</span>
          </SuzyIconTile>
        </div>

        <SuzyMenuStack />
      </div>

      <div className="grid gap-6 small:grid-cols-3">
        <SuzyRetroLoginPanel />
        <SuzyStatusPanel />
        <SuzyMusicPlayerPanel />
      </div>

      <SuzyPaletteTypography />
    </div>
  </div>
)
