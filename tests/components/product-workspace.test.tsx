import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ProductWorkspace } from "@/components/product-workspace.client";

describe("ProductWorkspace", () => {
  it("shows the report-preview confirmation after generation", async () => {
    const user = userEvent.setup();
    render(<ProductWorkspace />);

    await user.click(screen.getByRole("button", { name: "Generate report" }));

    expect(screen.getByRole("button", { name: "Report preview ready" })).toBeInTheDocument();
    expect(screen.getByText(/nine-section financial report is ready to preview/i)).toBeInTheDocument();
  });

  it("answers preset and custom Ticker questions", async () => {
    const user = userEvent.setup();
    render(<ProductWorkspace />);

    await user.click(screen.getByRole("button", { name: "Will I have enough for bills?" }));
    expect(screen.getByText(/checking is projected to stay \$1,126 above/i)).toBeInTheDocument();

    await user.type(screen.getByRole("textbox", { name: "Ask Ticker a question" }), "  Can I save more?  ");
    await user.click(screen.getByRole("button", { name: "Ask" }));

    expect(screen.getByText(/healthy cash buffer/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Ask Ticker a question" })).toHaveValue("");
  });

  it("updates forecast horizons and switches to recurring items", async () => {
    const user = userEvent.setup();
    render(<ProductWorkspace />);

    await user.click(screen.getByRole("button", { name: "90-day projected $6,840" }));
    expect(screen.getByText("Student loan")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Recurring items" }));
    expect(screen.getByText(/Every 6 months · next Aug 11/)).toBeInTheDocument();
    expect(screen.getByText(/Checking stays above your safe margin/)).toBeInTheDocument();
  });

  it("updates and restores subscription-audit savings", async () => {
    const user = userEvent.setup();
    render(<ProductWorkspace />);

    await user.click(screen.getByRole("button", { name: "Deactivate Streambox" }));

    expect(screen.queryByText("Streambox")).not.toBeInTheDocument();
    expect(screen.getByText("$18.99")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByText("Streambox")).toBeInTheDocument();
  });

  it("builds the selected planner result and saves it as a target", async () => {
    const user = userEvent.setup();
    render(<ProductWorkspace />);

    await user.click(screen.getByRole("button", { name: "Plan a week in Japan" }));
    await user.click(screen.getByRole("button", { name: "Build plan" }));

    expect(screen.getByRole("heading", { name: "Japan trip · 7 days" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Save as a target" }));
    expect(screen.getByRole("button", { name: "Saved to targets" })).toBeInTheDocument();
  });
});
