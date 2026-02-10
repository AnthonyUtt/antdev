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

// Checkbox style
#let checkbox(label) = {
  box(
    width: 100%,
    inset: (y: 3pt),
    grid(
      columns: (14pt, 1fr),
      gutter: 8pt,
      align: (center + horizon, left + horizon),
      box(
        width: 14pt,
        height: 14pt,
        stroke: 1.5pt + tertiary,
        radius: 2pt,
      ),
      label
    )
  )
}

// Section header
#let section(title) = {
  v(14pt)
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
    #text(font: mono-font, size: 22pt, weight: "bold", fill: primary)[is this worth automating?]
    #v(1pt)
    #text(size: 11pt, fill: dark.lighten(20%))[A decision checklist to figure out what's worth the setup time]
  ]
)

#v(12pt)

#line(length: 100%, stroke: 1pt + light.darken(10%))

#v(4pt)

#section[1. The Quick Filter]

#text(size: 10pt)[For each task you're considering, answer these questions. If you check all four, it's a strong automation candidate.]

#v(4pt)

#checkbox[I do this task more than a few times per week]
#checkbox[The steps are the same (or nearly the same) every time]
#checkbox[It follows the pattern: "when X happens, do Y"]
#checkbox[A mistake here doesn't require human judgment to catch]

#section[2. The Time Math]

#text(size: 10pt)[How long does this task take manually? Use the table below to see if automating it will actually save you time.]

#v(8pt)

// Time savings table (inspired by xkcd 1205)
#table(
  columns: (1.2fr, 1fr, 1fr, 1fr, 1fr),
  align: center,
  stroke: 0.5pt + dark.lighten(60%),
  inset: 8pt,
  fill: (x, y) => if y == 0 { primary } else if calc.odd(y) { light } else { none },
  table.header(
    text(fill: white, weight: "bold", size: 9pt)[Time per task],
    text(fill: white, weight: "bold", size: 9pt)[Daily],
    text(fill: white, weight: "bold", size: 9pt)[3× / week],
    text(fill: white, weight: "bold", size: 9pt)[Weekly],
    text(fill: white, weight: "bold", size: 9pt)[Monthly],
  ),
  text(weight: "bold")[1 minute], [4 hrs/yr], [2.5 hrs/yr], [52 min/yr], [12 min/yr],
  text(weight: "bold")[2 minutes], [8 hrs/yr], [5 hrs/yr], [1.5 hrs/yr], [24 min/yr],
  text(weight: "bold")[5 minutes], [21 hrs/yr], [13 hrs/yr], [4 hrs/yr], [1 hr/yr],
  text(weight: "bold")[10 minutes], [42 hrs/yr], [26 hrs/yr], [8.5 hrs/yr], [2 hrs/yr],
  text(weight: "bold")[15 minutes], [63 hrs/yr], [39 hrs/yr], [13 hrs/yr], [3 hrs/yr],
  text(weight: "bold")[30 minutes], [125 hrs/yr], [78 hrs/yr], [26 hrs/yr], [6 hrs/yr],
  text(weight: "bold")[1 hour], [250 hrs/yr], [156 hrs/yr], [52 hrs/yr], [12 hrs/yr],
)

#v(4pt)

#text(size: 9pt, fill: dark.lighten(20%))[*Rule of thumb:* If automating saves you more than a few hours per year, it's probably worth an hour or two of setup time.]

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
  text(font: mono-font, size: 14pt, weight: "bold", fill: primary)[is this worth automating?],
  text(size: 9pt, fill: dark.lighten(30%))[page 2 of 2]
)

#v(4pt)

#line(length: 100%, stroke: 1pt + light.darken(10%))

#section[3. Pick Your Top 5]

#text(size: 10pt)[List the tasks that passed the filter above. Start with the easiest one to automate.]

#v(8pt)

#table(
  columns: (0.3fr, 1.5fr, 0.8fr, 0.8fr, 0.8fr),
  align: (center, left, center, center, left),
  stroke: 0.5pt + dark.lighten(60%),
  inset: 8pt,
  fill: (x, y) => if y == 0 { light } else { none },
  table.header(
    text(weight: "bold", size: 9pt)[\#],
    text(weight: "bold", size: 9pt)[Task],
    text(weight: "bold", size: 9pt)[How often?],
    text(weight: "bold", size: 9pt)[Minutes each],
    text(weight: "bold", size: 9pt)[Possible tool],
  ),
  [1], [], [], [], [],
  [2], [], [], [], [],
  [3], [], [], [], [],
  [4], [], [], [], [],
  [5], [], [], [], [],
  [6], [], [], [], [],
  [7], [], [], [], [],
  [8], [], [], [], [],
  [9], [], [], [], [],
  [10], [], [], [], [],
  [11], [], [], [], [],
  [12], [], [], [], [],
  [13], [], [], [], [],
  [14], [], [], [], [],
  [15], [], [], [], [],
)

#v(1fr)

// Tips box
#block(
  width: 100%,
  inset: 16pt,
  fill: light,
  radius: 4pt,
  [
    #text(weight: "bold", fill: primary)[Where to Start]
    #v(8pt)
    #grid(
      columns: (1fr, 1fr, 1fr),
      gutter: 16pt,
      [
        #text(weight: "bold", fill: tertiary)[Easiest Wins]
        #text(size: 9pt)[Auto-replies, form notifications, file organization]
      ],
      [
        #text(weight: "bold", fill: secondary)[Medium Effort]
        #text(size: 9pt)[Multi-step workflows, data syncing between apps]
      ],
      [
        #text(weight: "bold", fill: dark.lighten(20%))[Worth the Investment]
        #text(size: 9pt)[Custom integrations, complex business logic]
      ]
    )
  ]
)

#v(16pt)

// Footer
#line(length: 100%, stroke: 1pt + light.darken(10%))
#v(8pt)
#align(center)[
  #text(size: 9pt, fill: dark.lighten(30%))[
    #text(weight: "bold", fill: primary)[AntDev] · #text(font: mono-font)[antdev.sh] · Practical software solutions for small businesses
  ]
]
