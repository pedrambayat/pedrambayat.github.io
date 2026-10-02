"""Draw the actual Bio-Sentry prototype's tool-policy boundary.

Source: bio-sentry-agent tools.py, agent.py and eval.py, inspected October 2026.
The scorer/approval fields remain agent-supplied; the order is simulated.
No benchmark data or security guarantee is implied by this diagram.
Regenerate: python path/to/plot_architecture.py (matplotlib and numpy).
"""

from pathlib import Path
import sys

sys.dont_write_bytecode = True
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
from orx_figstyle import PALETTE, WIDE, save, use_style

HERE = Path(__file__).resolve().parent


def main():
    use_style()
    plt.rcParams["svg.hashsalt"] = "biosentry-prototype-2026"
    fig, ax = plt.subplots(figsize=(WIDE, WIDE*9/16))
    fig.subplots_adjust(left=0.025, right=0.975, top=0.975, bottom=0.025)
    fig.set_facecolor("white")
    ax.set(xlim=(0, 1), ylim=(0, 1))
    ax.axis("off")

    def box(x, y, w, h, title, subtitle, color="#52616E", fill="#F3F5F7"):
        ax.add_patch(FancyBboxPatch((x,y),w,h,boxstyle="round,pad=0.01,rounding_size=0.015",
                                   linewidth=1,edgecolor=color,facecolor=fill))
        ax.text(x+w/2,y+h*0.64,title,ha="center",va="center",fontsize=12,fontweight="bold",color="#26323B")
        ax.text(x+w/2,y+h*0.29,subtitle,ha="center",va="center",fontsize=10,color="#52616E")

    def arrow(start, end, **kw):
        ax.add_patch(FancyArrowPatch(start,end,arrowstyle="-|>",mutation_scale=11,
                                     linewidth=1.1,color="#52616E",**kw))

    box(.015,.63,.28,.25,"Screening tool","Sequence alignment")
    box(.365,.63,.28,.25,"Agent request","Score + approval flag")
    box(.715,.63,.27,.25,"Policy check","Cedar / Sondera",PALETTE["blue"],"#EDF5FA")
    arrow((.31,.75),(.352,.75))
    arrow((.66,.75),(.702,.75))
    ax.text(.505,.545,"Agent-supplied metadata",ha="center",va="center",fontsize=10,color="#52616E")

    box(.36,.12,.285,.24,"Denied","Reason to the agent")
    box(.715,.12,.27,.24,"Permitted","Simulated order",PALETTE["blue"],"#EDF5FA")
    # Branch below the policy check; no implied provider connection.
    ax.plot([.85,.85,.5025,.5025],[.615,.46,.46,.40],color="#52616E",linewidth=1.1)
    arrow((.5025,.41),(.5025,.375))
    arrow((.85,.46),(.85,.375))
    ax.text(.155,.24,"Policy runs before\nthe order tool",ha="center",va="center",fontsize=11,color="#52616E",linespacing=1.5)
    save(fig,str(HERE / "architecture"))


if __name__ == "__main__":
    main()
