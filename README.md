# ScrapeLogic-Model-Generator

**ScrapeLogic** is an automated engine designed to turn any website URL into a validated monetization plan, offer stack, and launch roadmap in under 30 minutes.

It bridges the gap between "live web data" and "actionable business artifacts" for operators, marketers, and investors.

---

## 🔗 Project Resources

* **Live Blueprint/Artifact:** (https://billbotprocessing-star.github.io/ScrapeLogic-Model-Generator/)
---
## The Logic Stack
* **Orchestration:** [n8n](https://n8n.io/) (Workflow automation & API glue)
* **Reasoning Engine:** [Claude 3.5 Sonnet](https://www.anthropic.com/) (Frontend design, HTML/CSS coding, & deep analysis)
* **Creation Engine:** [OpenAI GPT-5.2](https://openai.com/) (Advanced offer building & script generation)

---

## Core Capabilities
* **URL-to-Strategy:** Automatically crawls and converts website content into high-level positioning and value props.
* **Monetization Matrix:** Generates multiple revenue angles including Subscription, Usage-based, and Service-led models.
* **Competitive Gap Analysis:** Uses Claude 3.5 to map under-monetized opportunities based on current market positioning.
* **Offer Stack Builder:** Defines Entry, Core, and Premium tiers with specific pricing and fulfillment requirements.
* **Speed-to-Market Plan:** Outputs a recommended tool stack and a first-customer acquisition script.

---

## Getting Started

### Prerequisites
1.  **n8n Instance:** Self-hosted or Cloud.
2.  **API Keys:** Anthropic (Claude) and OpenAI.
3.  **Input:** Raw text file or URL scrape.

### Installation
1.  Clone the repo: `git clone https://github.com/billbotprocessing-star/ScrapeLogic-Model-Generator.git`
2.  Import the `.json` workflows from the `/workflows` directory into your n8n instance.
3.  Configure your credentials in n8n for Claude and OpenAI.

---

## License
Proprietary - ScrapeLogic Internal Development.


## Repository Structure
```text
/ScrapeLogic-Model-Generator
├── /frontend
│   ├── landing-page.html         # URL-input focused lead capture & demo UI
│   ├── styles.css                # Custom styling for the "Logic Stack" aesthetic
│   └── main.js                   # Frontend logic for API triggers & loading states
├── /workflows
│   ├── url-scraper.json          # n8n workflow for web crawling
│   ├── logic-engine.json         # Orchestration for Claude & GPT-5.2
│   └── artifact-generator.json   # Formatting & export logic
├── /prompts
│   ├── reasoning-claude.md       # System instructions for UI design & positioning
│   ├── creation-gpt5.md          # System instructions for GPT-5.2 offer building
│   └── cleaning-utils.md         # Logic for stripping noise from scrapes
├── /scripts
│   ├── data-formatter.js         # Custom JS for cleaning messy HTML
│   └── api-bridge.py             # Utility for custom endpoint connections
├── /docs
│   ├── templates                 # Markdown templates for business artifacts
│   └── examples                  # Sample "Before & After" output reports
└── README.md
```