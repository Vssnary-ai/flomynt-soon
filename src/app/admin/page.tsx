"use client";

import React, { useState, useEffect, useCallback } from "react";
import SectionLabel from "@/components/SectionLabel";
import PillButton from "@/components/PillButton";

interface Lead {
  id: string;
  name: string;
  email: string;
  agency?: string;
  message: string;
  status: "new" | "contacted" | "converted" | "archived";
  createdAt: string;
}

interface WishlistEntry {
  id: string;
  email: string;
  idea?: string;
  source: string;
  priorityPosition: number;
  createdAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState<"leads" | "wishlist">("leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [wishlist, setWishlist] = useState<WishlistEntry[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  // Check current session on mount
  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/session");
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
      if (data.authenticated) {
        fetchDashboardData();
      }
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  // Fetch leads and wishlist data
  const fetchDashboardData = async () => {
    setDataLoading(true);
    try {
      const [leadsRes, wishlistRes] = await Promise.all([
        fetch("/api/admin/leads"),
        fetch("/api/admin/wishlist"),
      ]);

      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setLeads(leadsData.leads || []);
      }
      if (wishlistRes.ok) {
        const wishlistData = await wishlistRes.json();
        setWishlist(wishlistData.wishlist || []);
      }
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setDataLoading(false);
    }
  };

  // Auto-refresh every 30 seconds if enabled
  useEffect(() => {
    if (!isAuthenticated || !autoRefresh) return;
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 30000);
    return () => clearInterval(interval);
  }, [isAuthenticated, autoRefresh]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || "Authentication failed");
        return;
      }

      setIsAuthenticated(true);
      fetchDashboardData();
    } catch {
      setLoginError("Network connection error");
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
    setPassword("");
  };

  // Update lead status
  const updateLeadStatus = async (id: string, newStatus: Lead["status"]) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
        showToast(`Lead marked as ${newStatus}`);
      }
    } catch {
      showToast("Failed to update status");
    }
  };

  // Delete lead
  const deleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      const res = await fetch("/api/admin/leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(null);
        }
        showToast("Lead removed");
      }
    } catch {
      showToast("Failed to delete lead");
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    window.location.href = `/api/admin/export?type=${activeTab}`;
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.agency && lead.agency.toLowerCase().includes(searchQuery.toLowerCase())) ||
      lead.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Filtered Wishlist
  const filteredWishlist = wishlist.filter((item) => {
    return (
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.idea && item.idea.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });



  // =========================================
  // LOGIN SCREEN (Glass Card with Amber Glow)
  // =========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Ambient warm background glow */}
        <div
          className="pointer-events-none absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-25"
          style={{
            background: "radial-gradient(circle, #e9b45b 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 w-full max-w-[420px] glass-card rounded-2xl p-8 sm:p-10 text-center">
          {/* Logo mark */}
          <div className="flex justify-center items-center gap-2 mb-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-[#e9b45b]"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" stroke="white" strokeWidth="1.2" />
              <polyline points="2 17 12 22 22 17" stroke="#e9b45b" strokeWidth="1.2" />
              <polyline points="2 12 12 17 22 12" stroke="white" strokeOpacity="0.4" strokeWidth="1.2" />
            </svg>
            <span className="font-light tracking-[-0.03em] text-2xl text-white">
              Flomynt
            </span>
          </div>

          <SectionLabel text="ADMIN ACCESS" />
          <p className="mt-3 text-xs text-[#8a8a8a] leading-relaxed">
            Restricted agency intelligence and inquiry control portal.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4 text-left">
            <div>
              <label
                htmlFor="admin-password"
                className="block mono-label text-[10px] text-white/50 mb-1.5"
              >
                MASTER PASSCODE
              </label>
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (loginError) setLoginError("");
                }}
                placeholder="Enter password..."
                className="w-full bg-black/60 border border-white/[0.14] focus:border-[#e9b45b]/70 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors"
              />
              {loginError && (
                <p className="mt-2 text-xs text-red-400 font-mono">
                  {loginError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-white hover:bg-[#e9b45b] text-black font-semibold rounded-xl text-xs font-mono tracking-wider uppercase transition-colors disabled:opacity-50 min-h-[44px] cursor-pointer"
            >
              {loginLoading ? "AUTHENTICATING..." : "VERIFY CREDENTIALS ↗"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-white/40">
            <span>TIMING-SAFE BCRYPT</span>
            <span className="text-[#e9b45b]">AES-256 VAULT</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================
  // AUTHENTICATED ADMIN DASHBOARD
  // =========================================
  return (
    <div className="min-h-screen bg-[#050505] text-white pb-20">
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#050505]/85 backdrop-blur-xl border-b border-white/[0.14] px-6 sm:px-10 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-light tracking-[-0.03em] text-xl text-white">
              Flomynt
            </span>
            <span className="mono-label text-[10px] px-2 py-0.5 rounded border border-[#e9b45b]/40 text-[#e9b45b] bg-[#e9b45b]/10">
              CONSOLE
            </span>
            <span className="hidden sm:inline text-xs text-white/30 font-mono">
              SESSION ACTIVE
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Auto-refresh toggle */}
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`mono-label text-[10px] px-3 py-1.5 rounded-full border transition-all ${
                autoRefresh
                  ? "border-[#e9b45b]/50 text-[#e9b45b] bg-[#e9b45b]/10"
                  : "border-white/20 text-white/40"
              }`}
            >
              AUTO-REFRESH: {autoRefresh ? "ON (30s)" : "OFF"}
            </button>

            {/* Export CSV button */}
            <button
              onClick={handleExportCSV}
              className="pill-btn py-1.5 px-3.5 text-[10px]"
            >
              EXPORT CSV ↗
            </button>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="text-xs font-mono text-white/60 hover:text-white px-3 py-1.5 border border-white/[0.14] hover:border-white/40 rounded-full transition-all"
            >
              SIGN OUT
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 sm:px-10 pt-8">
        {/* Stat Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-6 rounded-2xl">
            <p className="mono-label text-[10px] text-white/50 mb-1">
              TOTAL INQUIRIES (LEADS)
            </p>
            <p className="font-sans text-3xl font-light text-white tracking-tight">
              {leads.length}
            </p>
            <p className="text-[11px] font-mono text-[#e9b45b] mt-2">
              {leads.filter((l) => l.status === "new").length} UNTOUCHED NEW
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <p className="mono-label text-[10px] text-white/50 mb-1">
              WISHLIST RESERVATIONS
            </p>
            <p className="font-sans text-3xl font-light text-white tracking-tight">
              {wishlist.length}
            </p>
            <p className="text-[11px] font-mono text-white/40 mt-2">
              NEXT PRIORITY POSITION #{wishlist.length + 41}
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <p className="mono-label text-[10px] text-white/50 mb-1">
              HEALING RESOLVE TARGET
            </p>
            <p className="font-sans text-3xl font-light text-white tracking-tight">
              &lt;1.2s
            </p>
            <p className="text-[11px] font-mono text-[#e9b45b] mt-2">
              99.9% AUTONOMOUS PASS
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <p className="mono-label text-[10px] text-white/50 mb-1">
              INFRASTRUCTURE STATUS
            </p>
            <p className="font-sans text-2xl font-light text-white tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              NOMINAL
            </p>
            <p className="text-[11px] font-mono text-white/40 mt-2">
              5 PROVIDERS ROUTED
            </p>
          </div>
        </div>

        {/* Navigation Tabs & Search Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-white/[0.12] mb-6">
          {/* Tabs */}
          <div className="flex items-center gap-2 bg-white/[0.04] p-1 rounded-xl border border-white/[0.08]">
            <button
              onClick={() => setActiveTab("leads")}
              className={`px-5 py-2 rounded-lg font-mono text-xs transition-all ${
                activeTab === "leads"
                  ? "bg-white text-black font-semibold shadow-md"
                  : "text-white/60 hover:text-white"
              }`}
            >
              LEADS ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab("wishlist")}
              className={`px-5 py-2 rounded-lg font-mono text-xs transition-all ${
                activeTab === "wishlist"
                  ? "bg-white text-black font-semibold shadow-md"
                  : "text-white/60 hover:text-white"
              }`}
            >
              WISHLIST ({wishlist.length})
            </button>
          </div>

          {/* Search & Status Filters */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search records..."
                className="w-full bg-black/60 border border-white/[0.14] focus:border-white/40 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-white/30 outline-none font-mono"
              />
            </div>

            {activeTab === "leads" && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-black/60 border border-white/[0.14] rounded-xl px-3 py-2 text-xs font-mono text-white outline-none"
              >
                <option value="all">ALL STATUSES</option>
                <option value="new">NEW</option>
                <option value="contacted">CONTACTED</option>
                <option value="converted">CONVERTED</option>
                <option value="archived">ARCHIVED</option>
              </select>
            )}
          </div>
        </div>

        {/* Data Loading Skeleton */}
        {dataLoading && (
          <div className="py-12 text-center font-mono text-xs text-[#8a8a8a] animate-pulse">
            LOADING RECORDS FROM ENCRYPTED LOGS...
          </div>
        )}

        {/* Tab 1: Leads Table */}
        {!dataLoading && activeTab === "leads" && (
          <div className="glass-card rounded-2xl overflow-hidden">
            {filteredLeads.length === 0 ? (
              <div className="p-12 text-center font-mono text-xs text-[#8a8a8a]">
                NO MATCHING LEADS FOUND.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.1] bg-white/[0.02] font-mono text-[10px] text-white/50 uppercase">
                      <th className="py-3.5 px-6">NAME & AGENCY</th>
                      <th className="py-3.5 px-6">EMAIL</th>
                      <th className="py-3.5 px-6">MESSAGE EXCERPT</th>
                      <th className="py-3.5 px-6">STATUS</th>
                      <th className="py-3.5 px-6">DATE</th>
                      <th className="py-3.5 px-6 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.08] text-xs">
                    {filteredLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        className="hover:bg-white/[0.03] transition-colors cursor-pointer"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <td className="py-4 px-6">
                          <p className="font-medium text-white">{lead.name}</p>
                          <p className="text-[11px] text-[#8a8a8a]">
                            {lead.agency || "Independent Agency"}
                          </p>
                        </td>
                        <td className="py-4 px-6 font-mono text-[11px] text-white/80">
                          {lead.email}
                        </td>
                        <td className="py-4 px-6 max-w-xs truncate text-[#8a8a8a]">
                          {lead.message}
                        </td>
                        <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              updateLeadStatus(lead.id, e.target.value as Lead["status"])
                            }
                            className={`font-mono text-[10px] uppercase px-2.5 py-1 rounded-full border outline-none cursor-pointer ${
                              lead.status === "new"
                                ? "bg-amber-500/10 border-amber-500/40 text-[#e9b45b]"
                                : lead.status === "contacted"
                                ? "bg-blue-500/10 border-blue-500/40 text-blue-300"
                                : lead.status === "converted"
                                ? "bg-green-500/10 border-green-500/40 text-green-300"
                                : "bg-white/[0.05] border-white/20 text-white/40"
                            }`}
                          >
                            <option value="new" className="bg-[#0a0a0a]">NEW</option>
                            <option value="contacted" className="bg-[#0a0a0a]">CONTACTED</option>
                            <option value="converted" className="bg-[#0a0a0a]">CONVERTED</option>
                            <option value="archived" className="bg-[#0a0a0a]">ARCHIVED</option>
                          </select>
                        </td>
                        <td className="py-4 px-6 font-mono text-[10px] text-white/40">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="text-white/30 hover:text-red-400 font-mono text-xs px-2 py-1 transition-colors"
                            title="Delete Lead"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Wishlist Table */}
        {!dataLoading && activeTab === "wishlist" && (
          <div className="glass-card rounded-2xl overflow-hidden">
            {filteredWishlist.length === 0 ? (
              <div className="p-12 text-center font-mono text-xs text-[#8a8a8a]">
                NO WISHLIST RECORDS MATCHED.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.1] bg-white/[0.02] font-mono text-[10px] text-white/50 uppercase">
                      <th className="py-3.5 px-6">PRIORITY QUEUE</th>
                      <th className="py-3.5 px-6">USER EMAIL</th>
                      <th className="py-3.5 px-6">WORKFLOW SPEC / IDEA</th>
                      <th className="py-3.5 px-6">SOURCE</th>
                      <th className="py-3.5 px-6">LOGGED DATE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.08] text-xs">
                    {filteredWishlist.map((item) => (
                      <tr key={item.id} className="hover:bg-white/[0.03] transition-colors">
                        <td className="py-4 px-6 font-mono text-[#e9b45b]">
                          #{item.priorityPosition}
                        </td>
                        <td className="py-4 px-6 font-mono text-white">
                          {item.email}
                        </td>
                        <td className="py-4 px-6 text-[#8a8a8a] italic max-w-sm truncate">
                          {item.idea || "—"}
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-white/20 uppercase text-white/60">
                            {item.source}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-mono text-[10px] text-white/40">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Slide Drawer for Lead Detail View */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-[#0d0d0d] border-l border-white/[0.14] p-8 h-full overflow-y-auto flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-6">
                  <div>
                    <span className="mono-label text-[10px] text-[#e9b45b]">
                      LEAD INQUIRY DETAIL
                    </span>
                    <h3 className="text-xl font-light text-white mt-1">
                      {selectedLead.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="w-8 h-8 rounded-full border border-white/[0.14] flex items-center justify-center text-white/60 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6 text-xs font-mono">
                  <div>
                    <p className="text-white/40 uppercase mb-1">EMAIL ADDRESS</p>
                    <p className="text-white select-all">{selectedLead.email}</p>
                  </div>

                  <div>
                    <p className="text-white/40 uppercase mb-1">AGENCY / ORGANIZATION</p>
                    <p className="text-white">{selectedLead.agency || "Not provided"}</p>
                  </div>

                  <div>
                    <p className="text-white/40 uppercase mb-1">RECEIVED TIMESTAMP</p>
                    <p className="text-white">{new Date(selectedLead.createdAt).toLocaleString()}</p>
                  </div>

                  <div>
                    <p className="text-white/40 uppercase mb-1">FULL INQUIRY MESSAGE</p>
                    <div className="bg-black/60 p-4 rounded-xl border border-white/[0.08] text-white/90 font-sans text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedLead.message}
                    </div>
                  </div>

                  <div>
                    <p className="text-white/40 uppercase mb-2">UPDATE WORKFLOW STAGE</p>
                    <div className="flex flex-wrap gap-2">
                      {(["new", "contacted", "converted", "archived"] as Lead["status"][]).map(
                        (st) => (
                          <button
                            key={st}
                            onClick={() => updateLeadStatus(selectedLead.id, st)}
                            className={`px-3 py-1.5 rounded-full border text-[10px] uppercase font-mono transition-all ${
                              selectedLead.status === st
                                ? "bg-white text-black font-semibold border-white"
                                : "text-white/60 border-white/20 hover:text-white"
                            }`}
                          >
                            {st}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/[0.08] flex items-center justify-between">
                <a
                  href={`mailto:${selectedLead.email}?subject=Flomynt%20Inquiry%20Response`}
                  className="pill-btn py-2.5 px-5 text-xs bg-white text-black font-semibold"
                >
                  REPLY VIA EMAIL ↗
                </a>
                <button
                  onClick={() => deleteLead(selectedLead.id)}
                  className="text-xs font-mono text-red-400 hover:text-red-300"
                >
                  DELETE RECORD
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Global Toast Message */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#0d0d0d] border border-white/[0.14] text-white text-xs font-mono py-2.5 px-4 rounded-lg shadow-xl">
            {toast}
          </div>
        )}
      </main>
    </div>
  );
}
