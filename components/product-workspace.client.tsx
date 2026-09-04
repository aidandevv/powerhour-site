"use client";

import { FormEvent, useMemo, useState } from "react";

type WorkspaceMode = "overview" | "forecast" | "subscriptions" | "planner";

const STORY_MODES: {
  id: WorkspaceMode;
  label: string;
  title: string;
  body: string;
}[] = [
  {
    id: "overview",
    label: "Unified dashboard",
    title: "Your money, finally in one place.",
    body: "Balances, spending, accounts, and Ticker stay connected—so every answer starts with the full picture.",
  },
  {
    id: "forecast",
    label: "Cash-flow projections",
    title: "See the squeeze before you feel it.",
    body: "Move across 30-, 60-, and 90-day horizons, then trace every projected expense back to its source.",
  },
  {
    id: "subscriptions",
    label: "Subscription audit",
    title: "Stop paying for what you stopped using.",
    body: "Surface recurring charges that have gone quiet, remove them, and watch the savings add up in real time.",
  },
  {
    id: "planner",
    label: "AI budget planner",
    title: "Turn the goal in your head into a plan you can follow.",
    body: "Describe what you want in plain English. Powerhour builds the target, timeline, and monthly move.",
  },
];

const TICKER_ANSWERS: Record<string, string> = {
  "Where did I spend the most?":
    "Dining was your largest flexible category at $684 this month, up $92 from your three-month average.",
  "Will I have enough for bills?":
    "Yes. After $1,942 in scheduled bills, checking is projected to stay $1,126 above your safe-margin target.",
  "What changed this month?":
    "Spending is 8.4% higher, mostly from dining and one annual software renewal. Utilities stayed within trend.",
};

const FORECAST_TOTALS = {
  30: "$2,486",
  60: "$4,192",
  90: "$6,840",
};

const FORECAST_ROWS = [
  { day: "03", month: "Aug", name: "Rent", detail: "Checking", amount: "$1,650" },
  { day: "06", month: "Aug", name: "Electric", detail: "Monthly", amount: "$118" },
  { day: "11", month: "Aug", name: "Auto insurance", detail: "Every 6 months", amount: "$224" },
  { day: "15", month: "Aug", name: "Student loan", detail: "Monthly", amount: "$310" },
];

const INITIAL_SUBSCRIPTIONS = [
  {
    id: "stream",
    name: "Streambox",
    amount: 18.99,
    reason: "No matching activity in 112 days",
    flagged: true,
  },
  {
    id: "fitness",
    name: "Flex Fitness",
    amount: 44,
    reason: "No matching activity in 97 days",
    flagged: true,
  },
  {
    id: "cloud",
    name: "Cloud Storage",
    amount: 9.99,
    reason: "Recent activity detected",
    flagged: false,
  },
  {
    id: "music",
    name: "Music Plus",
    amount: 10.99,
    reason: "Recent activity detected",
    flagged: false,
  },
];

const PLANNER_PROMPTS = [
  "Build a six-month emergency fund",
  "Plan a week in Japan",
  "Cut flexible spending by 15%",
];

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export function ProductWorkspace() {
  const [tickerQuestion, setTickerQuestion] = useState("Where did I spend the most?");
  const [tickerInput, setTickerInput] = useState("");
  const [tickerAnswer, setTickerAnswer] = useState(TICKER_ANSWERS[tickerQuestion]);
  const [reportReady, setReportReady] = useState(false);
  const [forecastDays, setForecastDays] = useState<30 | 60 | 90>(30);
  const [forecastView, setForecastView] = useState<"calendar" | "recurring">("calendar");
  const [inactiveSubscriptions, setInactiveSubscriptions] = useState<string[]>([]);
  const [plannerPrompt, setPlannerPrompt] = useState(PLANNER_PROMPTS[0]);
  const [planBuilt, setPlanBuilt] = useState(false);
  const [planSaved, setPlanSaved] = useState(false);

  const activeSubscriptions = INITIAL_SUBSCRIPTIONS.filter(
    (item) => !inactiveSubscriptions.includes(item.id),
  );
  const flaggedSubscriptions = activeSubscriptions.filter((item) => item.flagged);
  const monthlyAtRisk = flaggedSubscriptions.reduce((sum, item) => sum + item.amount, 0);
  const monthlySaved = INITIAL_SUBSCRIPTIONS.filter((item) =>
    inactiveSubscriptions.includes(item.id),
  ).reduce((sum, item) => sum + item.amount, 0);

  const plannerResult = useMemo(() => {
    if (plannerPrompt.toLowerCase().includes("japan")) {
      return {
        title: "Japan trip · 7 days",
        total: "$4,200",
        monthly: "$350 / month",
        date: "Ready by July 2027",
        rows: [
          ["Flights", "$1,480"],
          ["Stay", "$1,260"],
          ["Daily budget", "$980"],
          ["Buffer", "$480"],
        ],
      };
    }
    if (plannerPrompt.toLowerCase().includes("15%")) {
      return {
        title: "Flexible spending reset",
        total: "$418 / month",
        monthly: "$5,016 / year",
        date: "Three category caps",
        rows: [
          ["Dining", "$175 less"],
          ["Shopping", "$143 less"],
          ["Entertainment", "$100 less"],
          ["Safe margin", "+$418"],
        ],
      };
    }
    return {
      title: "Emergency fund",
      total: "$12,000",
      monthly: "$667 / month",
      date: "Ready in 18 months",
      rows: [
        ["Current savings", "$2,850"],
        ["Monthly transfer", "$667"],
        ["Interest estimate", "$286"],
        ["Target balance", "$12,000"],
      ],
    };
  }, [plannerPrompt]);

  function askTicker(question: string) {
    setTickerQuestion(question);
    setTickerAnswer(
      TICKER_ANSWERS[question] ??
        "Based on your simulated accounts, you have a healthy cash buffer. Dining is the clearest place to adjust this month.",
    );
  }

  function submitTicker(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = tickerInput.trim();
    if (!question) return;
    askTicker(question);
    setTickerInput("");
  }

  function buildPlan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!plannerPrompt.trim()) return;
    setPlanBuilt(true);
    setPlanSaved(false);
  }

  return (
    <div className="space-y-24 md:space-y-32 lg:space-y-40">
      <StoryBeat story={STORY_MODES[0]}>
        <AppWindow
          sectionLabel={STORY_MODES[0].label}
          heading="Dashboard"
          activeNav="Dashboard"
          action={
            <button
              type="button"
              onClick={() => setReportReady(true)}
              className="inline-flex min-h-10 items-center justify-center rounded-lg border border-border bg-white px-4 text-xs font-semibold text-text transition-colors hover:border-brand/40 hover:text-brand"
            >
              {reportReady ? "Report preview ready" : "Generate report"}
            </button>
          }
        >
            <OverviewView
              tickerQuestion={tickerQuestion}
              tickerAnswer={tickerAnswer}
              tickerInput={tickerInput}
              onTickerInput={setTickerInput}
              onAskTicker={askTicker}
              onSubmitTicker={submitTicker}
              reportReady={reportReady}
            />
        </AppWindow>
      </StoryBeat>

      <StoryBeat story={STORY_MODES[1]} reverse>
        <AppWindow
          sectionLabel={STORY_MODES[1].label}
          heading="Projections"
          activeNav="Planning"
        >
            <ForecastView
              days={forecastDays}
              view={forecastView}
              onDaysChange={setForecastDays}
              onViewChange={setForecastView}
            />
        </AppWindow>
      </StoryBeat>

      <StoryBeat story={STORY_MODES[2]}>
        <AppWindow
          sectionLabel={STORY_MODES[2].label}
          heading="Subscriptions"
          activeNav="Planning"
        >
            <SubscriptionsView
              items={activeSubscriptions}
              monthlyAtRisk={monthlyAtRisk}
              monthlySaved={monthlySaved}
              onDeactivate={(id) =>
                setInactiveSubscriptions((current) =>
                  current.includes(id) ? current : [...current, id],
                )
              }
              onReset={() => setInactiveSubscriptions([])}
            />
        </AppWindow>
      </StoryBeat>

      <StoryBeat story={STORY_MODES[3]} reverse>
        <AppWindow
          sectionLabel={STORY_MODES[3].label}
          heading="AI Budget Planner"
          activeNav="Planning"
        >
            <PlannerView
              prompt={plannerPrompt}
              result={plannerResult}
              planBuilt={planBuilt}
              planSaved={planSaved}
              onPromptChange={(prompt) => {
                setPlannerPrompt(prompt);
                setPlanBuilt(false);
                setPlanSaved(false);
              }}
              onBuildPlan={buildPlan}
              onSavePlan={() => setPlanSaved(true)}
            />
        </AppWindow>
      </StoryBeat>

    </div>
  );
}

function StoryBeat({
  story,
  reverse = false,
  children,
}: {
  story: (typeof STORY_MODES)[number];
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <article className="grid items-center gap-9 lg:grid-cols-12 lg:gap-12">
      <div className={reverse ? "lg:order-2 lg:col-span-4" : "lg:col-span-4"}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
          {story.label}
        </p>
        <h3 className="mt-4 max-w-md font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-text md:text-5xl lg:text-[3.25rem]">
          {story.title}
        </h3>
        <p className="mt-5 max-w-md text-base leading-relaxed text-text-muted">
          {story.body}
        </p>
        <div className="mt-7 flex items-center gap-3 text-xs font-semibold text-text">
          <span className="h-px w-8 bg-brand/45" aria-hidden="true" />
          Explore the live product
        </div>
      </div>
      <div className={reverse ? "lg:order-1 lg:col-span-8" : "lg:col-span-8"}>
        {children}
      </div>
    </article>
  );
}

function AppWindow({
  sectionLabel,
  heading,
  activeNav,
  action,
  children,
}: {
  sectionLabel: string;
  heading: string;
  activeNav: "Dashboard" | "Planning";
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  const navItems = ["Dashboard", "Transactions", "Accounts", "Planning"];

  return (
    <div className="overflow-hidden rounded-[1.35rem] border border-slate-300/80 bg-[#f3f4f6] shadow-[0_30px_80px_-38px_rgba(18,51,73,0.52)] ring-1 ring-black/[0.025]">
      <div className="flex min-h-14 items-center justify-between gap-4 border-b border-border/70 bg-white px-4 sm:px-5">
        <span className="font-display text-sm font-extrabold tracking-tight text-brand">
          powerhour
        </span>
        <div className="hidden items-center gap-1 md:flex" aria-label="Powerhour application navigation">
          {navItems.map((item) => (
            <span
              key={item}
              className={`rounded-lg px-2.5 py-2 text-[10px] font-medium ${
                item === activeNav ? "bg-surface-alt text-text" : "text-text-muted"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[9px] font-medium text-text-muted sm:text-[10px]">
          <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
          Synced just now
        </div>
      </div>

      <div className="px-4 py-5 sm:px-5 sm:py-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-brand">
              {sectionLabel}
            </p>
            <h4 className="mt-1 font-display text-2xl font-extrabold text-text">
              {heading}
            </h4>
          </div>
          {action}
        </div>
        {children}
      </div>
    </div>
  );
}

function OverviewView({
  tickerQuestion,
  tickerAnswer,
  tickerInput,
  onTickerInput,
  onAskTicker,
  onSubmitTicker,
  reportReady,
}: {
  tickerQuestion: string;
  tickerAnswer: string;
  tickerInput: string;
  onTickerInput: (value: string) => void;
  onAskTicker: (question: string) => void;
  onSubmitTicker: (event: FormEvent<HTMLFormElement>) => void;
  reportReady: boolean;
}) {
  return (
    <div className="space-y-4">
      {reportReady ? (
        <div className="rounded-xl border border-success/25 bg-emerald-50 px-4 py-3 text-xs text-emerald-900">
          Your nine-section financial report is ready to preview. Nothing was written to disk.
        </div>
      ) : null}

      <div className="rounded-xl border border-border/70 bg-white p-5 shadow-card">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
              Total net worth
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-text">$10,071.22</p>
            <p className="mt-1 text-xs text-text-muted">
              MTD: +$781.02 <span className="ml-1 rounded bg-emerald-100 px-1.5 py-0.5 text-emerald-800">+8.41%</span>
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <Metric label="Assets" value="$11,787.82" />
            <Metric label="Liabilities" value="$1,716.60" />
            <Metric label="Liquidity" value="$11,787.82" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.35fr_0.85fr]">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <DashboardCard label="MTD spending" value="$2,783.75" detail="8.4% above last month" />
            <DashboardCard label="Safe margin" value="$1,126.00" detail="after scheduled bills" />
            <DashboardCard label="Recurring" value="$183.96" detail="6 active charges" />
          </div>
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">
              Account overview
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <AccountCard name="Checking" institution="First National Bank" value="$3,247.82" />
              <AccountCard name="Savings" institution="First National Bank" value="$8,540.00" />
            </div>
          </div>
        </div>

        <div className="flex min-h-[22rem] flex-col overflow-hidden rounded-xl border border-border/70 bg-white shadow-card">
          <div className="bg-brand px-4 py-3 text-sm font-semibold text-white">Ticker</div>
          <div className="flex flex-1 flex-col gap-3 p-4">
            <p className="text-xs leading-relaxed text-text-muted">
              Ask about your spending, balances, or transactions.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {Object.keys(TICKER_ANSWERS).map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => onAskTicker(question)}
                  className={`rounded-full border px-2.5 py-1.5 text-[10px] leading-tight transition-colors ${
                    tickerQuestion === question
                      ? "border-brand bg-brand/10 text-brand"
                      : "border-border text-text-muted hover:border-brand/35 hover:text-text"
                  }`}
                >
                  {question}
                </button>
              ))}
            </div>
            <div className="rounded-lg bg-surface-alt/70 p-3 text-xs leading-relaxed text-text">
              {tickerAnswer}
            </div>
            <form onSubmit={onSubmitTicker} className="mt-auto flex gap-2">
              <label className="sr-only" htmlFor="ticker-preview-input">
                Ask Ticker a question
              </label>
              <input
                id="ticker-preview-input"
                value={tickerInput}
                onChange={(event) => onTickerInput(event.target.value)}
                placeholder="Enter query…"
                className="min-w-0 flex-1 rounded-lg border border-border bg-white px-3 py-2.5 text-xs text-text outline-none transition-shadow placeholder:text-text-muted focus:ring-2 focus:ring-brand/20"
              />
              <button
                type="submit"
                className="rounded-lg bg-brand px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-brand-strong"
              >
                Ask
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function ForecastView({
  days,
  view,
  onDaysChange,
  onViewChange,
}: {
  days: 30 | 60 | 90;
  view: "calendar" | "recurring";
  onDaysChange: (days: 30 | 60 | 90) => void;
  onViewChange: (view: "calendar" | "recurring") => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        {([30, 60, 90] as const).map((horizon) => (
          <button
            key={horizon}
            type="button"
            onClick={() => onDaysChange(horizon)}
            aria-label={`${horizon}-day projected ${FORECAST_TOTALS[horizon]}`}
            className={`rounded-xl border p-4 text-left transition-all ${
              days === horizon
                ? "border-brand bg-brand text-white shadow-card-hover"
                : "border-border/70 bg-white hover:border-brand/35"
            }`}
          >
            <span className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${days === horizon ? "text-white/60" : "text-text-muted"}`}>
              {horizon}-day projected
            </span>
            <span className="mt-2 block text-2xl font-semibold">{FORECAST_TOTALS[horizon]}</span>
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-border/70 bg-white shadow-card">
        <div className="flex gap-1 border-b border-border/70 p-2">
          <TabButton active={view === "calendar"} onClick={() => onViewChange("calendar")}>
            Expense calendar
          </TabButton>
          <TabButton active={view === "recurring"} onClick={() => onViewChange("recurring")}>
            Recurring items
          </TabButton>
        </div>

        {view === "calendar" ? (
          <div className="divide-y divide-border/70">
            {FORECAST_ROWS.slice(0, days === 30 ? 3 : 4).map((row) => (
              <div key={row.name} className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-3 px-4 py-3.5">
                <div className="rounded-lg bg-surface-alt/80 px-2 py-1.5 text-center">
                  <p className="text-[9px] uppercase tracking-wide text-text-muted">{row.month}</p>
                  <p className="text-sm font-semibold text-text">{row.day}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">{row.name}</p>
                  <p className="text-[11px] text-text-muted">{row.detail}</p>
                </div>
                <p className="text-sm font-semibold text-text">{row.amount}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-3 p-4 sm:grid-cols-2">
            {[
              ["Rent", "Monthly", "$1,650", "Aug 03"],
              ["Student loan", "Monthly", "$310", "Aug 15"],
              ["Auto insurance", "Every 6 months", "$224", "Aug 11"],
              ["Music Plus", "Monthly", "$10.99", "Aug 22"],
            ].map(([name, cadence, amount, next]) => (
              <div key={name} className="rounded-lg border border-border/60 bg-surface-alt/25 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-text">{name}</p>
                    <p className="mt-0.5 text-[11px] text-text-muted">{cadence} · next {next}</p>
                  </div>
                  <p className="text-sm font-semibold text-text">{amount}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="rounded-xl border border-warning/20 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
        Checking stays above your safe margin for this horizon. The largest pressure point is rent on August 3.
      </p>
    </div>
  );
}

function SubscriptionsView({
  items,
  monthlyAtRisk,
  monthlySaved,
  onDeactivate,
  onReset,
}: {
  items: typeof INITIAL_SUBSCRIPTIONS;
  monthlyAtRisk: number;
  monthlySaved: number;
  onDeactivate: (id: string) => void;
  onReset: () => void;
}) {
  const totalMonthly = items.reduce((sum, item) => sum + item.amount, 0);
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <DashboardCard label="Active subscriptions" value={String(items.length)} detail={`${formatMoney(totalMonthly)}/mo`} />
        <DashboardCard label="Possibly unused" value={String(items.filter((item) => item.flagged).length)} detail={`${formatMoney(monthlyAtRisk)}/mo at risk`} warning />
        <DashboardCard label="Removed in preview" value={formatMoney(monthlySaved)} detail={`${formatMoney(monthlySaved * 12)}/yr saved`} positive />
      </div>

      <div className="overflow-hidden rounded-xl border border-border/70 bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-text">Recurring audit</p>
            <p className="text-[11px] text-text-muted">Deactivate an item to see the savings update.</p>
          </div>
          {monthlySaved > 0 ? (
            <button type="button" onClick={onReset} className="text-xs font-semibold text-brand hover:text-brand-strong">
              Reset
            </button>
          ) : null}
        </div>

        <div className="divide-y divide-border/70">
          {items.map((item) => (
            <div key={item.id} className={`grid gap-3 px-4 py-3.5 sm:grid-cols-[1fr_auto_auto] sm:items-center ${item.flagged ? "bg-amber-50/50" : ""}`}>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-text">{item.name}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${item.flagged ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>
                    {item.flagged ? "Review" : "Active"}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-text-muted">{item.reason}</p>
              </div>
              <p className="text-sm font-semibold text-text">{formatMoney(item.amount)}/mo</p>
              <button
                type="button"
                onClick={() => onDeactivate(item.id)}
                aria-label={`Deactivate ${item.name}`}
                className="min-h-9 rounded-lg border border-border px-3 text-[11px] font-semibold text-text transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700"
              >
                Deactivate
              </button>
            </div>
          ))}
          {items.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <p className="text-sm font-semibold text-text">Every preview subscription is inactive.</p>
              <button type="button" onClick={onReset} className="mt-2 text-xs font-semibold text-brand">
                Restore demo data
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function PlannerView({
  prompt,
  result,
  planBuilt,
  planSaved,
  onPromptChange,
  onBuildPlan,
  onSavePlan,
}: {
  prompt: string;
  result: {
    title: string;
    total: string;
    monthly: string;
    date: string;
    rows: string[][];
  };
  planBuilt: boolean;
  planSaved: boolean;
  onPromptChange: (prompt: string) => void;
  onBuildPlan: (event: FormEvent<HTMLFormElement>) => void;
  onSavePlan: () => void;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
      <form onSubmit={onBuildPlan} className="rounded-xl border border-border/70 bg-white p-5 shadow-card">
        <div className="mb-4">
          <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-amber-800">
            Beta
          </span>
          <h4 className="mt-3 font-display text-xl font-extrabold text-text">Describe what you want to plan.</h4>
          <p className="mt-1 text-xs leading-relaxed text-text-muted">
            Start with a goal. Powerhour turns the request into assumptions you can inspect and adjust.
          </p>
        </div>
        <label htmlFor="planner-preview-prompt" className="sr-only">
          Budget planning goal
        </label>
        <textarea
          id="planner-preview-prompt"
          value={prompt}
          onChange={(event) => onPromptChange(event.target.value)}
          rows={4}
          className="w-full resize-none rounded-lg border border-border bg-white px-3 py-3 text-sm text-text outline-none transition-shadow focus:ring-2 focus:ring-brand/20"
        />
        <div className="mt-3 flex flex-wrap gap-1.5">
          {PLANNER_PROMPTS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onPromptChange(suggestion)}
              className={`rounded-full border px-2.5 py-1.5 text-[10px] transition-colors ${
                prompt === suggestion
                  ? "border-brand bg-brand/10 text-brand"
                  : "border-border text-text-muted hover:border-brand/35 hover:text-text"
              }`}
            >
              {suggestion}
            </button>
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-brand px-4 py-3 text-xs font-semibold text-white transition-colors hover:bg-brand-strong"
        >
          Build plan
        </button>
      </form>

      <div className="min-h-[24rem] rounded-xl border border-border/70 bg-white p-5 shadow-card" aria-live="polite">
        {planBuilt ? (
          <div className="space-y-5">
            <div className="flex flex-col gap-3 border-b border-border/70 pb-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-muted">Plan ready</p>
                <h4 className="mt-1 font-display text-xl font-extrabold text-text">{result.title}</h4>
                <p className="mt-1 text-xs text-text-muted">{result.date}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-2xl font-semibold text-brand">{result.total}</p>
                <p className="text-[11px] text-text-muted">{result.monthly}</p>
              </div>
            </div>
            <div className="space-y-2">
              {result.rows.map(([label, value], index) => (
                <div key={label} className="space-y-1.5 rounded-lg bg-surface-alt/50 px-3 py-2.5">
                  <div className="flex items-center justify-between gap-4 text-xs">
                    <span className="text-text-muted">{label}</span>
                    <span className="font-semibold text-text">{value}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white">
                    <div
                      className="h-full rounded-full bg-brand transition-all duration-500"
                      style={{ width: `${[32, 56, 76, 94][index]}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={onSavePlan}
              className={`w-full rounded-lg border px-4 py-2.5 text-xs font-semibold transition-colors ${
                planSaved
                  ? "border-success/25 bg-emerald-50 text-emerald-800"
                  : "border-brand/20 bg-brand/5 text-brand hover:bg-brand/10"
              }`}
            >
              {planSaved ? "Saved to targets" : "Save as a target"}
            </button>
          </div>
        ) : (
          <div className="flex h-full min-h-[21rem] flex-col items-center justify-center text-center">
            <p className="font-display text-xl font-extrabold text-text">Your plan will appear here.</p>
            <p className="mt-2 max-w-sm text-xs leading-relaxed text-text-muted">
              Choose a starting point or write your own goal, then build the plan to see the estimated total, timeline, and monthly move.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-text-muted">{label}</p>
      <p className="mt-1 text-xs font-semibold text-text sm:text-sm">{value}</p>
    </div>
  );
}

function DashboardCard({
  label,
  value,
  detail,
  warning = false,
  positive = false,
}: {
  label: string;
  value: string;
  detail: string;
  warning?: boolean;
  positive?: boolean;
}) {
  return (
    <div className={`rounded-xl border bg-white p-4 shadow-card ${warning ? "border-amber-200" : "border-border/70"}`}>
      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-text-muted">{label}</p>
      <p className={`mt-2 text-xl font-semibold tracking-tight ${positive ? "text-success" : "text-text"}`}>{value}</p>
      <p className="mt-1 text-[10px] text-text-muted">{detail}</p>
    </div>
  );
}

function AccountCard({
  name,
  institution,
  value,
}: {
  name: string;
  institution: string;
  value: string;
}) {
  return (
    <button
      type="button"
      className="flex min-h-20 items-center justify-between gap-4 rounded-xl border border-border/70 bg-white p-4 text-left shadow-card transition-colors hover:border-brand/30 hover:bg-surface-alt/20"
    >
      <span>
        <span className="block text-sm font-semibold text-text">{name}</span>
        <span className="mt-0.5 block text-[10px] text-text-muted">{institution}</span>
      </span>
      <span className="text-sm font-semibold text-text">{value}</span>
    </button>
  );
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-2 text-[11px] font-semibold transition-colors ${
        active ? "bg-brand text-white" : "text-text-muted hover:bg-surface-alt hover:text-text"
      }`}
    >
      {children}
    </button>
  );
}
