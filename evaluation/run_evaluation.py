"""
Midnight Magnolia AI Evaluation Framework
==========================================
Evaluates AI-generated content for:
1. Relevance - Does the response address the query?
2. Coherence - Is the content well-structured and readable?
3. Brand Voice - Does it align with Southern Gothic healing aesthetic?
4. Healing Quality - Is it trauma-informed and gentle?
"""

import os
import json
from pathlib import Path
from typing import Any
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Azure AI Evaluation imports
from azure.ai.evaluation import (
    evaluate,
    RelevanceEvaluator,
    CoherenceEvaluator,
    OpenAIModelConfiguration,
)
from promptflow.client import load_flow


class BrandVoiceEvaluator:
    """Custom prompt-based evaluator for Midnight Magnolia brand voice alignment."""

    def __init__(self, model_config: OpenAIModelConfiguration):
        prompty_path = Path(__file__).parent / "brand_voice.prompty"
        self._flow = load_flow(source=str(prompty_path), model={"configuration": model_config})

    def __call__(self, *, response: str, **kwargs) -> dict[str, Any]:
        llm_response = self._flow(response=response)
        try:
            result = json.loads(llm_response)
        except (json.JSONDecodeError, TypeError):
            result = {"brand_voice_score": 0, "brand_voice_reason": str(llm_response)}
        return result


class HealingContentEvaluator:
    """Custom prompt-based evaluator for trauma-informed, healing-centered content."""

    def __init__(self, model_config: OpenAIModelConfiguration):
        prompty_path = Path(__file__).parent / "healing_content.prompty"
        self._flow = load_flow(source=str(prompty_path), model={"configuration": model_config})

    def __call__(self, *, query: str, response: str, **kwargs) -> dict[str, Any]:
        llm_response = self._flow(query=query, response=response)
        try:
            result = json.loads(llm_response)
        except (json.JSONDecodeError, TypeError):
            result = {"healing_score": 0, "healing_reason": str(llm_response)}
        return result


class ContentLengthEvaluator:
    """Code-based evaluator for response length adequacy."""

    def __init__(self, min_length: int = 100, optimal_length: int = 500):
        self.min_length = min_length
        self.optimal_length = optimal_length

    def __call__(self, *, response: str, **kwargs) -> dict[str, Any]:
        length = len(response)

        if length < self.min_length:
            score = 1
            reason = f"Response too short ({length} chars). Minimum: {self.min_length}"
        elif length < self.optimal_length:
            score = 3
            reason = f"Response adequate ({length} chars). Could be more detailed."
        elif length < self.optimal_length * 2:
            score = 5
            reason = f"Response length optimal ({length} chars)."
        else:
            score = 4
            reason = f"Response quite long ({length} chars). Consider conciseness."

        return {
            "length_score": score,
            "length_reason": reason,
            "char_count": length,
            "word_count": len(response.split())
        }


def run_evaluation(
    data_path: str = "test_dataset.jsonl",
    output_path: str = "evaluation_results.json"
) -> dict[str, Any]:
    """
    Run comprehensive evaluation on AI-generated content.

    Args:
        data_path: Path to JSONL file with test data (must have 'query' and 'response' columns)
        output_path: Path to save evaluation results

    Returns:
        Evaluation results dictionary with metrics and row-level data
    """

    # Configure model for prompt-based evaluators
    # Uses OpenAI API - configure based on your setup
    model_config = OpenAIModelConfiguration(
        type="openai",
        model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
        base_url=os.getenv("OPENAI_API_BASE", "https://api.openai.com/v1"),
        api_key=os.getenv("OPENAI_API_KEY", "")
    )

    # Initialize evaluators
    evaluators = {
        # Built-in evaluators
        "relevance": RelevanceEvaluator(model_config=model_config),
        "coherence": CoherenceEvaluator(model_config=model_config),

        # Custom evaluators
        "brand_voice": BrandVoiceEvaluator(model_config=model_config),
        "healing_content": HealingContentEvaluator(model_config=model_config),
        "content_length": ContentLengthEvaluator(min_length=100, optimal_length=500),
    }

    # Column mapping for evaluators
    evaluator_config = {
        "relevance": {
            "column_mapping": {
                "query": "${data.query}",
                "response": "${data.response}"
            }
        },
        "coherence": {
            "column_mapping": {
                "query": "${data.query}",
                "response": "${data.response}"
            }
        },
        "brand_voice": {
            "column_mapping": {
                "response": "${data.response}"
            }
        },
        "healing_content": {
            "column_mapping": {
                "query": "${data.query}",
                "response": "${data.response}"
            }
        },
        "content_length": {
            "column_mapping": {
                "response": "${data.response}"
            }
        }
    }

    # Resolve paths
    eval_dir = Path(__file__).parent
    data_file = eval_dir / data_path
    output_file = eval_dir / output_path

    print(f"🌸 Midnight Magnolia AI Evaluation")
    print(f"=" * 50)
    print(f"📁 Data: {data_file}")
    print(f"📊 Output: {output_file}")
    print(f"🔍 Evaluators: {', '.join(evaluators.keys())}")
    print()

    # Run evaluation
    results = evaluate(
        data=str(data_file),
        evaluators=evaluators,
        evaluator_config=evaluator_config,
        output_path=str(output_file)
    )

    print(f"✅ Evaluation complete!")
    print(f"📈 Results saved to: {output_file}")

    return results


def print_summary(results: dict[str, Any]) -> None:
    """Print a formatted summary of evaluation results."""

    print("\n" + "=" * 60)
    print("🌙 MIDNIGHT MAGNOLIA EVALUATION SUMMARY")
    print("=" * 60)

    metrics = results.get("metrics", {})

    # Group metrics by evaluator
    evaluator_metrics = {}
    for key, value in metrics.items():
        parts = key.split(".")
        evaluator = parts[0] if len(parts) > 1 else "overall"
        metric_name = parts[-1] if len(parts) > 1 else key

        if evaluator not in evaluator_metrics:
            evaluator_metrics[evaluator] = {}
        evaluator_metrics[evaluator][metric_name] = value

    for evaluator, metrics_dict in evaluator_metrics.items():
        print(f"\n📊 {evaluator.upper().replace('_', ' ')}")
        print("-" * 40)
        for metric, value in metrics_dict.items():
            if isinstance(value, float):
                print(f"   {metric}: {value:.2f}")
            else:
                print(f"   {metric}: {value}")

    print("\n" + "=" * 60)


if __name__ == "__main__":
    import sys

    # Check for required environment variable
    if not os.getenv("OPENAI_API_KEY"):
        print("⚠️  OPENAI_API_KEY environment variable not set!")
        print("   Set it in your .env file or environment.")
        print("   Example: export OPENAI_API_KEY='your-key-here'")
        sys.exit(1)

    # Check if we have response data
    eval_dir = Path(__file__).parent
    data_file = eval_dir / "test_dataset.jsonl"

    if not data_file.exists():
        print(f"⚠️  Test dataset not found: {data_file}")
        print("   Run the response collection step first.")
        sys.exit(1)

    # Check if responses exist in the data
    with open(data_file, 'r', encoding='utf-8') as f:
        first_line = f.readline()
        sample = json.loads(first_line)

        if "response" not in sample:
            print("⚠️  No 'response' column in test data!")
            print("   Run collect_responses.py first to generate AI responses.")
            print("   Then update test_dataset.jsonl with the responses.")
            sys.exit(1)

    # Run evaluation
    results = run_evaluation()
    print_summary(results)
