"""
Response Collection Script for Midnight Magnolia AI Evaluation
==============================================================
Collects AI-generated responses from the application's OpenAI integration
to prepare data for evaluation.
"""

import os
import json
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables
load_dotenv()


# Midnight Magnolia system prompt for consistent brand voice
SYSTEM_PROMPT = """You are the AI voice of Midnight Magnolia, a Southern Gothic digital sanctuary for healing, art, and creative tech.

Brand Voice Guidelines:
- Southern Gothic elegance: Use imagery of magnolias, moonlight, ancient oaks, and ancestral wisdom
- Healing-centered: Be trauma-informed, gentle, and non-judgmental
- Empowering: Build agency without toxic positivity
- Inclusive: Center Black women, neurodivergent individuals, chronic illness warriors
- Mystical yet grounded: Blend spirituality with practical wisdom
- Warm and welcoming: Like a gentle grandmother with ancient knowledge

Tagline: "Rooted in Mystery. Blooming in Truth."
Founder: Latisha Vincent-Waters (Rumi-Nations LLC)

Always write in a way that feels like coming home to yourself."""


def collect_responses(
    input_path: str = "test_dataset.jsonl",
    output_path: str = "test_dataset_with_responses.jsonl"
) -> None:
    """
    Collect AI responses for each query in the test dataset.

    Args:
        input_path: Path to JSONL file with test queries
        output_path: Path to save dataset with responses
    """

    # Initialize OpenAI client
    client = OpenAI(
        api_key=os.getenv("OPENAI_API_KEY"),
        base_url=os.getenv("OPENAI_API_BASE", "https://api.openai.com/v1")
    )

    model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

    eval_dir = Path(__file__).parent
    input_file = eval_dir / input_path
    output_file = eval_dir / output_path

    print(f"🌸 Midnight Magnolia Response Collection")
    print(f"=" * 50)
    print(f"📁 Input: {input_file}")
    print(f"📝 Output: {output_file}")
    print(f"🤖 Model: {model}")
    print()

    # Read input data
    with open(input_file, 'r', encoding='utf-8') as f:
        queries = [json.loads(line) for line in f]

    print(f"📊 Processing {len(queries)} queries...")
    print()

    results = []

    for i, item in enumerate(queries, 1):
        query = item.get("query", "")
        context = item.get("context", "")
        category = item.get("category", "general")

        print(f"  [{i}/{len(queries)}] {category}: {query[:50]}...")

        # Build the full prompt with context
        user_message = query
        if context:
            user_message = f"Context: {context}\n\nRequest: {query}"

        try:
            # Call OpenAI API
            response = client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": user_message}
                ],
                temperature=0.7,
                max_tokens=1000
            )

            ai_response = response.choices[0].message.content

            # Add response to item
            item["response"] = ai_response
            item["model"] = model
            item["tokens_used"] = response.usage.total_tokens if response.usage else 0

            results.append(item)
            print(f"       ✅ Generated ({len(ai_response)} chars)")

        except Exception as e:
            print(f"       ❌ Error: {e}")
            item["response"] = f"ERROR: {str(e)}"
            item["model"] = model
            results.append(item)

    # Write output
    with open(output_file, 'w', encoding='utf-8') as f:
        for item in results:
            f.write(json.dumps(item) + "\n")

    print()
    print(f"✅ Response collection complete!")
    print(f"📁 Results saved to: {output_file}")
    print()
    print(f"Next step: Run evaluation with:")
    print(f"  python run_evaluation.py")


if __name__ == "__main__":
    import sys

    # Check for required environment variable
    if not os.getenv("OPENAI_API_KEY"):
        print("⚠️  OPENAI_API_KEY environment variable not set!")
        print("   Set it in your .env file or environment.")
        sys.exit(1)

    collect_responses()
