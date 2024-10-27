interface HelpCard {
  title: string;
  description: string;
}

export const helpCards: HelpCard[] = [
  {
    title: "Is my app always on?",
    description: "Adding monitoring and alerts so your team can catch critical issues and quickly resolve them before they affect your customers.",
  },
  {
    title: "Is my app working?",
    description: "How about we do some functional testing on the most important parts to ensure they are doing what they are supposed to be doing?",
  },
  {
    title: "Will my app keep working if I change things?",
    description: "Setting up automated tests allows you to verify that core functionality still works every time an update is made.",
  },
  {
    title: "Can my app scale as my business grows?",
    description: "Running performance tests will offer you some answers about how many users your app can safely handle.",
  },
  {
    title: "Is my data safe and secure?",
    description: "Analysis and security questionnaires tailored to your business needs, ensuring compliance with standards, including for LGPD in Brazil.",
  },
  {
    title: "What happened with my app?!",
    description: "With expertise in investigation and Root Cause Analysis (RCA), together we can identify what happened in an incident, why it happened, and the steps to prevent it in the future.",
  },
];
