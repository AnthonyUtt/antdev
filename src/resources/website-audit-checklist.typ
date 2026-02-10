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
  v(16pt)
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
    #text(font: mono-font, size: 24pt, weight: "bold", fill: primary)[15-minute website audit]
    #v(1pt)
    #text(size: 11pt, fill: dark.lighten(20%))[A quick checklist to find common problems before your customers do]
  ]
)

#v(16pt)

#line(length: 100%, stroke: 1pt + light.darken(10%))

#v(8pt)

#grid(
  columns: (1fr, 1fr),
  gutter: 24pt,
  [
    #section[1. First Impression]
    #checkbox[Site loads quickly on mobile (under 4 seconds)]
    #checkbox[Business purpose is immediately clear]
    #checkbox[Main call-to-action visible without scrolling]

    #section[2. Search Visibility]
    #checkbox[Site appears in Google for your business name]
    #checkbox[Page title is descriptive (not just "Home")]
    #checkbox[Meta description shows relevant info]
    #checkbox[Google Business Profile links correctly]

    #section[3. Broken Stuff]
    #checkbox[All navigation links work]
    #checkbox[Contact form sends messages successfully]
    #checkbox[No broken or missing images]
  ],
  [
    #section[4. Mobile Experience]
    #checkbox[Navigation menu easy to open/close]
    #checkbox[Text readable without zooming]
    #checkbox[Buttons large enough to tap easily]
    #checkbox[No horizontal scrolling required]

    #section[5. Trust Signals]
    #checkbox[Copyright year is current]
    #checkbox[Testimonials or reviews visible]
    #checkbox[SSL certificate active (padlock icon)]

    #section[6. Clear Actions]
    #checkbox[Main call-to-action is obvious]
    #checkbox[Can complete action in 1-2 clicks]
    #checkbox[Contact info on every page]
  ]
)

#v(1fr)

// Priority guide
#block(
  width: 100%,
  inset: 16pt,
  fill: light,
  radius: 4pt,
  [
    #text(weight: "bold", fill: primary)[Priority Guide]
    #v(8pt)
    #grid(
      columns: (1fr, 1fr, 1fr),
      gutter: 16pt,
      [
        #text(weight: "bold", fill: tertiary)[Fix Immediately]
        #text(size: 9pt)[Broken contact forms, broken links, SSL issues]
      ],
      [
        #text(weight: "bold", fill: secondary)[Fix This Week]
        #text(size: 9pt)[Mobile usability, missing contact info]
      ],
      [
        #text(weight: "bold", fill: dark.lighten(20%))[Fix When You Can]
        #text(size: 9pt)[Outdated copyright, slow load times]
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
