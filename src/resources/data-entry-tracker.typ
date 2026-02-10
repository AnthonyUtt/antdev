// Brand colors
#let primary = rgb("#552e84")
#let secondary = rgb("#0061ab")
#let tertiary = rgb("#1ba09c")
#let dark = rgb("#333333")
#let light = rgb("#FAF5FF")

// Fonts
#let body-font = "Nunito Sans 12pt"
#let mono-font = "Share Tech Mono"

// Page setup
#set page(
  paper: "us-letter",
  margin: (x: 0.5in, y: 0.5in),
)

#set text(
  font: body-font,
  size: 10pt,
  fill: dark,
)

// Section header
#let section(title) = {
  v(12pt)
  block(
    width: 100%,
    inset: (x: 12pt, y: 10pt),
    fill: primary,
    radius: 4pt,
    text(font: mono-font, fill: white, weight: "bold", size: 11pt, lower(title))
  )
  v(8pt)
}

// Header
#grid(
  columns: (auto, 1fr),
  align: (left + horizon, right + horizon),
  image("logo.svg", width: 80pt),
  [
    #text(font: mono-font, size: 22pt, weight: "bold", fill: primary)[one-week data entry tracker]
    #v(1pt)
    #text(size: 11pt, fill: dark.lighten(20%))[Track every manual entry for one week. Then put a dollar sign on it.]
  ]
)

#v(12pt)

#line(length: 100%, stroke: 1pt + light.darken(10%))

#v(4pt)

#text(size: 10pt)[*Instructions:* Every time you or your team manually enters data somewhere, log it below. At the end of the week, add up the time and multiply by your hourly rate.]

#v(4pt)

// Day tracking table function
#let day-table(day-label) = {
  section(day-label)
  table(
    columns: (1fr, 1.5fr, 1fr, 1fr, 0.6fr),
    align: (left, left, left, left, center),
    stroke: 0.5pt + dark.lighten(60%),
    inset: 8pt,
    fill: (x, y) => if y == 0 { light } else { none },
    table.header(
      text(weight: "bold", size: 9pt)[Task],
      text(weight: "bold", size: 9pt)[What did you enter?],
      text(weight: "bold", size: 9pt)[From (source)],
      text(weight: "bold", size: 9pt)[To (destination)],
      text(weight: "bold", size: 9pt)[Minutes],
    ),
    [], [], [], [], [],
    [], [], [], [], [],
    [], [], [], [], [],
    [], [], [], [], [],
    [], [], [], [], [],
  )
}

#day-table[Monday]
#day-table[Tuesday]
#day-table[Wednesday]

#v(1fr)

// Page 1 footer
#line(length: 100%, stroke: 1pt + light.darken(10%))
#v(8pt)
#align(center)[
  #text(size: 9pt, fill: dark.lighten(30%))[
    #text(weight: "bold", fill: primary)[AntDev] · #text(font: mono-font)[antdev.sh] · Practical software solutions for small businesses
  ]
]

#pagebreak()

// Page 2 header
#grid(
  columns: (1fr, auto),
  align: (left + horizon, right + horizon),
  text(font: mono-font, size: 14pt, weight: "bold", fill: primary)[one-week data entry tracker],
  text(size: 9pt, fill: dark.lighten(30%))[page 2 of 2]
)

#v(4pt)

#line(length: 100%, stroke: 1pt + light.darken(10%))

#day-table[Thursday]
#day-table[Friday]

// Summary section
#block(
  width: 100%,
  inset: 16pt,
  fill: light,
  radius: 4pt,
  [
    #text(weight: "bold", size: 12pt, fill: primary)[Weekly Summary]
    #v(10pt)
    #grid(
      columns: (1fr, 1fr),
      gutter: 16pt,
      [
        #text(weight: "bold", fill: tertiary)[Total minutes this week:] #h(1fr) #box(width: 60pt, stroke: (bottom: 1pt + dark.lighten(40%)), inset: (bottom: 4pt))[]
        #v(10pt)
        #text(weight: "bold", fill: tertiary)[Your hourly rate:] #h(1fr) \$ #box(width: 52pt, stroke: (bottom: 1pt + dark.lighten(40%)), inset: (bottom: 4pt))[]
      ],
      [
        #text(weight: "bold", fill: secondary)[Weekly cost:] #h(1fr) \$ #box(width: 52pt, stroke: (bottom: 1pt + dark.lighten(40%)), inset: (bottom: 4pt))[]
        #v(10pt)
        #text(weight: "bold", fill: secondary)[Estimated annual cost:] #h(1fr) \$ #box(width: 52pt, stroke: (bottom: 1pt + dark.lighten(40%)), inset: (bottom: 4pt))[]
        #v(2pt)
        #text(size: 8pt, fill: dark.lighten(30%))[(weekly cost × 50 weeks)]
      ]
    )
  ]
)

#v(1fr)

// Footer
#line(length: 100%, stroke: 1pt + light.darken(10%))
#v(8pt)
#align(center)[
  #text(size: 9pt, fill: dark.lighten(30%))[
    #text(weight: "bold", fill: primary)[AntDev] · #text(font: mono-font)[antdev.sh] · Practical software solutions for small businesses
  ]
]
