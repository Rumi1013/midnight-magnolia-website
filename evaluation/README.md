# Midnight Magnolia AI Evaluation Framework

A comprehensive evaluation system for AI-generated content across the Midnight Magnolia platform.

## Overview

This framework evaluates AI outputs for:
- **Relevance** - Does the response address the user's query?
- **Coherence** - Is the content well-structured and readable?
- **Brand Voice** - Does it align with Southern Gothic healing aesthetic?
- **Healing Quality** - Is it trauma-informed and gentle?
- **Content Length** - Is the response appropriately detailed?

## Quick Start

### 1. Install Dependencies

```bash
cd evaluation
pip install -r requirements.txt
```

### 2. Set Environment Variables

```bash
export OPENAI_API_KEY="your-openai-api-key"
# Optional: customize model
export OPENAI_MODEL="gpt-4o-mini"
```

### 3. Collect AI Responses

Run the response collection script to generate AI outputs for test queries:

```bash
python collect_responses.py
```

This will:
- Read queries from `test_dataset.jsonl`
- Generate AI responses using the Midnight Magnolia brand voice
- Save results to `test_dataset_with_responses.jsonl`

### 4. Run Evaluation

```bash
python run_evaluation.py
```

Results are saved to `evaluation_results.json`.

## Test Dataset

The `test_dataset.jsonl` contains 15 test queries across 5 categories:

| Category | Count | Description |
|----------|-------|-------------|
| journal_generation | 4 | Sobriety journals, ADHD planners, healing prompts |
| affirmation_cards | 3 | Magnolia Messages, Softest Wins decks |
| document_builder | 3 | Resumes, grant letters, bios |
| tarot_content | 2 | Card interpretations, daily readings |
| creative_prompts | 3 | Writing prompts, art prompts, genealogy |

## Evaluators

### Built-in (Azure AI Evaluation)
- `RelevanceEvaluator` - Query-response alignment
- `CoherenceEvaluator` - Flow and structure

### Custom Prompt-based
- `BrandVoiceEvaluator` - Southern Gothic aesthetic alignment
- `HealingContentEvaluator` - Trauma-informed quality

### Custom Code-based
- `ContentLengthEvaluator` - Response adequacy

## File Structure

```
evaluation/
├── README.md                    # This file
├── requirements.txt             # Python dependencies
├── test_queries.json            # Original test queries (human-readable)
├── test_dataset.jsonl           # JSONL format for evaluation
├── collect_responses.py         # Response collection script
├── run_evaluation.py            # Main evaluation runner
├── brand_voice.prompty          # Brand voice evaluator prompt
├── healing_content.prompty      # Healing content evaluator prompt
└── evaluation_results.json      # Output (generated)
```

## Scoring Scale

All evaluators use a 1-5 scale:

| Score | Meaning |
|-------|---------|
| 5 | Exceptional - Perfectly meets criteria |
| 4 | Strong - Minor improvements possible |
| 3 | Adequate - Meets basic requirements |
| 2 | Weak - Significant gaps |
| 1 | Poor - Does not meet criteria |

## Brand Voice Criteria

Content should embody:
- 🌸 Southern Gothic elegance (magnolias, moonlight, ancestry)
- 💜 Healing-centered, trauma-informed language
- ✨ Warm yet mystical tone
- 🌱 Empowering without toxic positivity
- 🤗 Inclusive of Black women, neurodivergent folks, chronic illness warriors

## Integration with Website

The evaluation framework uses the same OpenAI configuration as the website's `/api/journal/generate` endpoint, ensuring consistency between tested and production AI outputs.
