"""Recreate the reliability figure: python reliability.py.

Input is transcribed from Table 1, page 3 of
"Reference-free cell-type annotation with LLM agents", MLGenX 2025:
https://openreview.net/pdf?id=kD8LptrZ7v

Each model has five attempts per tissue, three tissues. These are counts of
reported workflow outcomes, not classification accuracy or uncertainty estimates.
No runs or error bars are synthesized. Outputs stay beside this script.
"""

import csv
from collections import defaultdict
from pathlib import Path

import matplotlib as mpl
import numpy as np
from matplotlib.patches import Patch

from orx_figstyle import MUTED, PALETTE, WIDE, figure, save, use_style


ROOT = Path(__file__).resolve().parent
MODELS = ["Claude 3.5 Sonnet", "o3-mini (high)", "GPT-4o"]


def load_counts():
    totals = defaultdict(lambda: np.zeros(3, dtype=int))
    tissues = defaultdict(set)
    with (ROOT / "paper-table-1.csv").open(newline="") as handle:
        for row in csv.DictReader(handle):
            attempts = int(row["attempts"])
            completed = int(row["completed"])
            hallucinated = int(row["hallucinated"])
            assert 0 <= hallucinated <= completed <= attempts
            assert row["tissue"] not in tissues[row["model"]]
            tissues[row["model"]].add(row["tissue"])
            totals[row["model"]] += [
                completed - hallucinated,
                hallucinated,
                attempts - completed,
            ]
    for model in MODELS:
        assert totals[model].sum() == 15
        assert len(tissues[model]) == 3
    return np.array([totals[model] for model in MODELS])


def main():
    use_style()
    mpl.rcParams.update({
        "font.size": 11,
        "axes.labelsize": 11,
        "xtick.labelsize": 10,
        "ytick.labelsize": 11,
        "figure.facecolor": "white",
        "axes.facecolor": "white",
        "svg.hashsalt": "cell-annotation-reliability-2025",
    })
    counts = load_counts()
    colors = [PALETTE["blue"], PALETTE["orange"], MUTED]
    labels = [
        "Completed,\nno flagged hallucination",
        "Completed,\nhallucination flagged",
        "Incomplete",
    ]
    fig, ax = figure(width=WIDE, ratio=9 / 16)
    y = np.arange(len(MODELS))
    left = np.zeros(len(MODELS), dtype=int)
    for status, color in enumerate(colors):
        values = counts[:, status]
        ax.barh(y, values, left=left, height=0.52, color=color,
                edgecolor="white", linewidth=1.0, zorder=3)
        for row, (start, value) in enumerate(zip(left, values)):
            if value:
                ax.text(start + value / 2, row, str(value),
                        ha="center", va="center", fontsize=12,
                        fontweight="bold",
                        color="white" if status == 0 else "#242424", zorder=4)
        left += values

    ax.set_yticks(y, MODELS)
    ax.set_ylim(len(MODELS) - 0.45, -0.55)
    ax.set_xlim(0, 15)
    ax.set_xticks([0, 5, 10, 15])
    ax.set_xlabel("Attempts (15 per model)", labelpad=8)
    ax.tick_params(axis="y", length=0, pad=7)
    ax.spines["left"].set_visible(False)
    ax.grid(axis="x", visible=True)
    ax.grid(axis="y", visible=False)
    ax.legend(
        handles=[Patch(facecolor=color, label=label) for color, label in zip(colors, labels)],
        loc="lower right", bbox_to_anchor=(1, 1.04), ncol=3,
        fontsize=8.5, handlelength=1.1, handletextpad=0.5,
        columnspacing=1.2, borderaxespad=0,
    )
    save(fig, str(ROOT / "reliability"))
    for model, row in zip(MODELS, counts):
        print(f"{model}: no flagged hallucination={row[0]}, "
              f"hallucinated={row[1]}, incomplete={row[2]}")


if __name__ == "__main__":
    main()
