"""Plot aggregate confidence retention for the September 2026 VHH analysis.

Source: the study's audit-score-summary.csv, crop_nomsa rows; design-time
median and selection count were independently checked against full_parsed.csv.
Only aggregate metrics are included here. No sequences or structural inputs.
This selected cohort has one output per design/predictor, not seed replicates.
Regenerate: python path/to/plot_confidence.py (requires matplotlib and numpy).
"""

import csv
from pathlib import Path
import sys

sys.dont_write_bytecode = True
import matplotlib.pyplot as plt
from orx_figstyle import MUTED, PALETTE, WIDE, figure, save, use_style

HERE = Path(__file__).resolve().parent


def main():
    with (HERE / "confidence-summary.csv").open(newline="") as handle:
        rows = list(csv.DictReader(handle))
    use_style()
    plt.rcParams.update({
        "font.size": 12, "axes.labelsize": 12,
        "xtick.labelsize": 11, "ytick.labelsize": 12,
        "svg.hashsalt": "vhh-confidence-retention-2026",
    })
    fig, ax = figure(width=WIDE, ratio=9 / 16)
    fig.set_facecolor("white")
    ax.set_facecolor("white")
    counts = [int(row["pass_ge_05"]) for row in rows]
    totals = [int(row["n"]) for row in rows]
    values = [100 * count / n for count, n in zip(counts, totals)]
    bars = ax.barh(range(len(rows)), values, height=0.6,
                   color=[MUTED] + [PALETTE["blue"]] * (len(rows)-1))
    ax.set_yticks(range(len(rows)), [row["evaluation"] for row in rows])
    ax.invert_yaxis()
    for bar, count, n in zip(bars, counts, totals):
        width = bar.get_width()
        inside = width > 80
        ax.text(width - 2 if inside else width + 2,
                bar.get_y() + bar.get_height()/2, f"{count}/{n}",
                va="center", ha="right" if inside else "left",
                fontsize=12, fontweight="bold", color="#26323B")
    ax.set_xlabel("Designs reaching ipTM ≥ 0.5 (%)", labelpad=8)
    ax.set_xlim(0, 102)
    ax.set_xticks([0, 25, 50, 75, 100])
    ax.tick_params(axis="both", length=0, pad=7)
    ax.spines["left"].set_visible(False)
    ax.spines["bottom"].set_color("#7F7F7F")
    ax.grid(axis="y", visible=False)
    ax.grid(axis="x", color="#E1E5E8", linewidth=0.6)
    ax.margins(y=0.10)
    save(fig, str(HERE / "confidence-retention"))


if __name__ == "__main__":
    main()
