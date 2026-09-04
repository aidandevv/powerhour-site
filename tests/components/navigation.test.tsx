import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StickyToc } from "@/components/docs/sticky-toc.client";
import { HeroShaderGradient } from "@/components/hero-shader-gradient";
import { SiteHeader } from "@/components/site-header";

describe("site navigation", () => {
  it("renders canonical navigation targets and applies the scrolled treatment", () => {
    Object.defineProperty(window, "scrollY", { configurable: true, value: 36 });
    const { container } = render(<SiteHeader />);

    expect(screen.getAllByRole("link", { name: "Features" })[0]).toHaveAttribute(
      "href",
      "https://powerhour.dev/features",
    );

    fireEvent.scroll(window);
    expect(container.querySelector("header")).toHaveClass("shadow-sm");
  });

  it("moves the table-of-contents active state as the reader scrolls", () => {
    Object.defineProperty(window, "scrollY", { configurable: true, value: 180 });
    render(
      <>
        <section id="first">First</section>
        <section id="second">Second</section>
        <StickyToc items={[{ id: "first", label: "First" }, { id: "second", label: "Second" }]} />
      </>,
    );

    Object.defineProperty(document.getElementById("first"), "offsetTop", { configurable: true, value: 0 });
    Object.defineProperty(document.getElementById("second"), "offsetTop", { configurable: true, value: 280 });
    fireEvent.scroll(window);

    expect(screen.getByRole("link", { name: "Second" })).toHaveClass("bg-brand/10");
  });
});

describe("hero rendering", () => {
  it("keeps the CSS fallback for people who prefer reduced motion", () => {
    const mediaQuery = {
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    };
    window.matchMedia = () => mediaQuery;

    const { container } = render(<HeroShaderGradient />);

    expect(container.querySelector(".hero-bg")).toBeInTheDocument();
  });
});
