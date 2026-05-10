"use client";

import tw, { styled, css } from "twin.macro";
import { useState } from "react";

// ─── Styled Primitives ────────────────────────────────────────────────────────

const Shell = styled.div`
  ${tw`min-h-screen bg-[#0d0f0e] text-white font-sans`}
  font-family: 'DM Sans', sans-serif;
`;

const Sidebar = styled.aside`
  ${tw`fixed top-0 left-0 h-full w-[220px] flex flex-col border-r border-white/[0.06] z-20`}
  background: #0f1210;
`;

const Main = styled.main`
  ${tw`ml-[220px] p-8 min-h-screen`}
  background: #0d0f0e;
`;

const NavItem = styled.button<{ $active?: boolean }>`
  ${tw`flex items-center gap-3 w-full px-4 py-2.5 text-sm rounded-lg transition-all`}
  ${({ $active }) =>
    $active
      ? tw`bg-[#1e2d25] text-[#6ee09a]`
      : tw`text-white/40 hover:text-white/70 hover:bg-white/[0.04]`}
`;

const StatCard = styled.div`
  ${tw`rounded-2xl p-5 flex flex-col gap-2 border border-white/[0.06]`}
  background: #131613;
`;

const Badge = styled.span<{ $color: "green" | "amber" | "red" | "blue" }>`
  ${tw`text-[11px] font-medium px-2 py-0.5 rounded-full`}
  ${({ $color }) => {
    const map = {
      green: tw`bg-[#1e3a28] text-[#6ee09a]`,
      amber: tw`bg-[#372d14] text-[#f0b429]`,
      red: tw`bg-[#3a1e1e] text-[#f06e6e]`,
      blue: tw`bg-[#1a2a3a] text-[#6eb5f0]`,
    };
    return map[$color];
  }}
`;

const ProjectRow = styled.div`
  ${tw`flex items-center gap-4 py-3.5 border-b border-white/[0.04] last:border-0`}
`;

const ProgressBar = styled.div<{ $pct: number; $color: string }>`
  ${tw`h-1.5 rounded-full bg-white/[0.07] overflow-hidden`}
  & > div {
    height: 100%;
    width: ${({ $pct }) => $pct}%;
    background: ${({ $color }) => $color};
    border-radius: 9999px;
    transition: width 0.6s ease;
  }
`;

const Avatar = styled.div<{ $bg: string }>`
  ${tw`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0`}
  background: ${({ $bg }) => $bg};
`;

const SectionTitle = styled.h2`
  ${tw`text-[11px] uppercase tracking-widest text-white/30 mb-4`}
`;

const MetricLabel = styled.p`
  ${tw`text-[12px] text-white/40 mb-1`}
`;

const MetricValue = styled.p`
  ${tw`text-2xl font-semibold tracking-tight`}
`;

const MetricDelta = styled.span<{ $up?: boolean }>`
  ${tw`text-[11px] font-medium`}
  ${({ $up }) => ($up ? tw`text-[#6ee09a]` : tw`text-[#f06e6e]`)}
`;

// ─── Data ─────────────────────────────────────────────────────────────────────

const navItems = [
  { icon: "▦", label: "Overview", id: "overview" },
  { icon: "◈", label: "Projects", id: "projects" },
  { icon: "◎", label: "Clients", id: "clients" },
  { icon: "◷", label: "Timeline", id: "timeline" },
  { icon: "◈", label: "Team", id: "team" },
  { icon: "⬡", label: "Financials", id: "financials" },
];

const stats = [
  { label: "Active Projects", value: "14", delta: "+2", up: true, sub: "this month" },
  { label: "Revenue (NGN)", value: "₦38.4M", delta: "+12%", up: true, sub: "vs last month" },
  { label: "On-Time Delivery", value: "91%", delta: "+4%", up: true, sub: "30-day avg" },
  { label: "Open Tickets", value: "7", delta: "-3", up: true, sub: "since last week" },
];

const projects = [
  {
    name: "Konga Redesign",
    client: "Konga NG",
    type: "UX/UI",
    progress: 78,
    color: "#6ee09a",
    status: "green" as const,
    statusLabel: "On Track",
    due: "Jun 14",
    avatars: [{ initials: "AO", bg: "#1e3a28" }, { initials: "FN", bg: "#1a2a3a" }],
  },
  {
    name: "Fintech Mobile App",
    client: "PayStack",
    type: "Product",
    progress: 45,
    color: "#6eb5f0",
    status: "blue" as const,
    statusLabel: "In Progress",
    due: "Jul 2",
    avatars: [{ initials: "EM", bg: "#372d14" }, { initials: "CK", bg: "#3a1e1e" }],
  },
  {
    name: "Brand Identity",
    client: "Risevest",
    type: "Branding",
    progress: 92,
    color: "#f0b429",
    status: "amber" as const,
    statusLabel: "Review",
    due: "May 20",
    avatars: [{ initials: "BD", bg: "#1e3a28" }],
  },
  {
    name: "E-commerce Platform",
    client: "Jumia NG",
    type: "Dev",
    progress: 22,
    color: "#f06e6e",
    status: "red" as const,
    statusLabel: "At Risk",
    due: "Aug 10",
    avatars: [{ initials: "PO", bg: "#1a2a3a" }, { initials: "RW", bg: "#372d14" }, { initials: "AJ", bg: "#1e3a28" }],
  },
  {
    name: "Dashboard Suite",
    client: "Cowrywise",
    type: "UX/UI",
    progress: 61,
    color: "#6ee09a",
    status: "green" as const,
    statusLabel: "On Track",
    due: "Jun 28",
    avatars: [{ initials: "LT", bg: "#1e3a28" }],
  },
];

const activity = [
  { user: "AO", bg: "#1e3a28", action: "Pushed new prototype to", target: "Konga Redesign", time: "2m ago" },
  { user: "FN", bg: "#1a2a3a", action: "Left a comment on", target: "Fintech Mobile App", time: "18m ago" },
  { user: "BD", bg: "#372d14", action: "Marked milestone done —", target: "Brand Identity", time: "1h ago" },
  { user: "EM", bg: "#3a1e1e", action: "Flagged blocker in", target: "E-commerce Platform", time: "3h ago" },
];

const weekBars = [40, 65, 50, 80, 72, 91, 58];
const weekLabels = ["M", "T", "W", "T", "F", "S", "S"];

// ─── Component ────────────────────────────────────────────────────────────────

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState("overview");

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <Shell>
        {/* Sidebar */}
        <Sidebar>
          {/* Logo */}
          <div tw="px-5 py-6 border-b border-white/[0.06]">
            <div tw="flex items-center gap-2.5">
              <div
                tw="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "#6ee09a" }}
              >
                <span tw="text-[#0d0f0e] text-xs font-bold">A</span>
              </div>
              <span tw="text-sm font-semibold tracking-tight text-white">
                algrith
              </span>
            </div>
          </div>

          {/* Nav */}
          <nav tw="flex-1 px-3 py-5 flex flex-col gap-0.5">
            <p tw="text-[10px] uppercase tracking-widest text-white/20 px-4 mb-2">
              Workspace
            </p>
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                $active={activeNav === item.id}
                onClick={() => setActiveNav(item.id)}
              >
                <span tw="text-base leading-none">{item.icon}</span>
                {item.label}
              </NavItem>
            ))}
          </nav>

          {/* Bottom user */}
          <div tw="px-4 py-4 border-t border-white/[0.06]">
            <div tw="flex items-center gap-3">
              <div
                tw="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                style={{ background: "#1e3a28", color: "#6ee09a" }}
              >
                UA
              </div>
              <div>
                <p tw="text-xs font-medium text-white">Uwakmfon A.</p>
                <p tw="text-[11px] text-white/30">Admin</p>
              </div>
            </div>
          </div>
        </Sidebar>

        {/* Main Content */}
        <Main>
          {/* Header */}
          <div tw="flex items-center justify-between mb-8">
            <div>
              <h1 tw="text-xl font-semibold tracking-tight">Good morning, Uwakmfon</h1>
              <p tw="text-sm text-white/40 mt-0.5">Here's what's happening at Algrith today.</p>
            </div>
            <div tw="flex items-center gap-3">
              <button
                tw="text-xs px-4 py-2 rounded-lg border border-white/[0.08] text-white/50 hover:text-white/80 transition-colors"
              >
                Export Report
              </button>
              <button
                tw="text-xs px-4 py-2 rounded-lg font-medium transition-colors"
                style={{ background: "#6ee09a", color: "#0d0f0e" }}
              >
                + New Project
              </button>
            </div>
          </div>

          {/* Stat Cards */}
          <div tw="grid grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (
              <StatCard key={s.label}>
                <MetricLabel>{s.label}</MetricLabel>
                <div tw="flex items-end justify-between">
                  <MetricValue>{s.value}</MetricValue>
                  <MetricDelta $up={s.up}>{s.delta}</MetricDelta>
                </div>
                <p tw="text-[11px] text-white/20">{s.sub}</p>
              </StatCard>
            ))}
          </div>

          {/* Projects + Activity */}
          <div tw="grid grid-cols-[1fr_320px] gap-6">
            {/* Project Table */}
            <div>
              <SectionTitle>Active Projects</SectionTitle>
              <div
                tw="rounded-2xl border border-white/[0.06] overflow-hidden"
                style={{ background: "#131613" }}
              >
                {/* Table header */}
                <div
                  tw="grid text-[11px] text-white/30 uppercase tracking-widest px-5 py-3 border-b border-white/[0.04]"
                  style={{ gridTemplateColumns: "2fr 1fr 1fr 120px 80px 80px" }}
                >
                  <span>Project</span>
                  <span>Type</span>
                  <span>Team</span>
                  <span>Progress</span>
                  <span>Due</span>
                  <span>Status</span>
                </div>

                {/* Rows */}
                <div tw="px-5">
                  {projects.map((p) => (
                    <ProjectRow
                      key={p.name}
                      style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 120px 80px 80px", alignItems: "center", gap: "1rem" }}
                    >
                      <div>
                        <p tw="text-sm font-medium text-white">{p.name}</p>
                        <p tw="text-[11px] text-white/30">{p.client}</p>
                      </div>
                      <span tw="text-xs text-white/40">{p.type}</span>
                      <div tw="flex items-center -space-x-1.5">
                        {p.avatars.map((a, i) => (
                          <Avatar key={i} $bg={a.bg} style={{ color: "#6ee09a", zIndex: p.avatars.length - i }}>
                            {a.initials}
                          </Avatar>
                        ))}
                      </div>
                      <div>
                        <div tw="flex items-center justify-between mb-1">
                          <span tw="text-[11px] text-white/30">{p.progress}%</span>
                        </div>
                        <ProgressBar $pct={p.progress} $color={p.color}>
                          <div />
                        </ProgressBar>
                      </div>
                      <span tw="text-xs text-white/40">{p.due}</span>
                      <Badge $color={p.status}>{p.statusLabel}</Badge>
                    </ProjectRow>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div tw="flex flex-col gap-6">
              {/* Weekly Delivery Chart */}
              <div>
                <SectionTitle>Weekly Delivery Score</SectionTitle>
                <div
                  tw="rounded-2xl border border-white/[0.06] p-5"
                  style={{ background: "#131613" }}
                >
                  <div tw="flex items-end gap-1.5 h-[80px] mb-2">
                    {weekBars.map((h, i) => (
                      <div key={i} tw="flex flex-col items-center gap-1 flex-1">
                        <div
                          style={{
                            height: `${h}%`,
                            background: i === 5 ? "#6ee09a" : "#1e2d25",
                            borderRadius: "4px 4px 2px 2px",
                            transition: "height 0.5s ease",
                            width: "100%",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div tw="flex gap-1.5">
                    {weekLabels.map((l, i) => (
                      <span key={i} tw="flex-1 text-center text-[10px] text-white/20">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Activity Feed */}
              <div>
                <SectionTitle>Recent Activity</SectionTitle>
                <div
                  tw="rounded-2xl border border-white/[0.06] p-4"
                  style={{ background: "#131613" }}
                >
                  {activity.map((a, i) => (
                    <div
                      key={i}
                      tw="flex items-start gap-3 py-3 border-b border-white/[0.04] last:border-0"
                    >
                      <Avatar $bg={a.bg} style={{ color: "#6ee09a", marginTop: "2px" }}>
                        {a.user}
                      </Avatar>
                      <div tw="flex-1 min-w-0">
                        <p tw="text-xs text-white/60 leading-snug">
                          {a.action}{" "}
                          <span tw="text-white/90 font-medium">{a.target}</span>
                        </p>
                        <p tw="text-[11px] text-white/25 mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Main>
      </Shell>
    </>
  );
};

export default Dashboard;