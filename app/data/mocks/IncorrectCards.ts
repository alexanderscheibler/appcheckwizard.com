import { HelpCard } from "@data/HelpCards";

export const mockHelpCardWithNoTitle: HelpCard[] = [
  {
    title: "",
    description: "Sample card with no Title."
  },
  {
    title: "This has a title",
    description: "And it has a description",
  }
]

export const mockHelpCardWithNoDescription: HelpCard[] = [
  {
    title: "This card has no description.",
    description: ""
  },
  {
    title: "This has a title",
    description: "And it has a description",
  }
]

export const mockHelpCardWithNoData: HelpCard[] = [
  {
    title: "",
    description: ""
  },
  {
    title: "This has a title",
    description: "And it has a description",
  }
]

export const mockHelpCardsWithNoData: HelpCard[] = [
  {
    title: "",
    description: ""
  }
]

const longItem = "A".repeat(600) // 600 characters
export const mockHelpCardLongDescription = {
  title: "Long Description Card",
  description: longItem
}

export const mockHelpCardLongTitle = {
  title: longItem,
  description: "Long Title Card"
}