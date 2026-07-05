import { useState } from "react";
import { LayoutDashboard, ListChecks, Building2, Calendar, BarChart3, Settings, Search, Bell, Plus, ChevronRight, ChevronDown, AlertCircle, Clock, CheckCircle2, ArrowLeft, MessageSquare, FileText, Upload, Check, X, User, ExternalLink, GitBranch, Filter, Grid3x3, List, ChevronLeft, Trash2, Pencil } from "lucide-react";

const BUYER_LIST = ["Talbots", "Lilly Pulitzer", "Tommy Bahama", "Johnny Was"];
const SEASONS = ["SP26", "SU26", "FL26", "RS26"];
const BUYERS = {
  Talbots: { color: "bg-purple-100 text-purple-700", house: "MGF Sourcing US LLC", xftyDays: 59, contact: "Sarah Mitchell", email: "s.mitchell@mgfsourcing.com" },
  "Lilly Pulitzer": { color: "bg-pink-100 text-pink-700", house: "", xftyDays: 49, contact: "Rachel Adams", email: "radams@lillypulitzer.com" },
  "Tommy Bahama": { color: "bg-teal-100 text-teal-700", house: "", xftyDays: 49, contact: "David Chen", email: "dchen@tommybahama.com" },
  "Johnny Was": { color: "bg-amber-100 text-amber-700", house: "", xftyDays: 49, contact: "Maria Lopez", email: "mlopez@johnnywas.com" },
};

const INITIAL_ORDERS = [
  {
    id: "1", po: "30160042", buyer: "Talbots", style: "LP-2210", season: "SP26", cycle: 130,
    fabricCommit: "2026-05-28", xfty: "2026-06-22", ih: "2026-08-20", units: 8200,
    milestones: [
      { id: "fc", name: "Fabric commitment", planned: "2026-05-28", actual: null, who: "Merchandiser", status: "overdue", blocks: 12 },
      { id: "fo", name: "Fabric ordered", planned: "2026-05-29", actual: null, who: "Merchandiser", status: "overdue", blocks: 11 },
      { id: "ld", name: "Lab dip", planned: "2026-06-02", actual: null, who: "Factory/Buyer", status: "overdue", blocks: 9,
        rounds: [
          { label: "R1 Sub", date: "2026-06-02", status: "overdue" }, { label: "R1 App", date: "2026-06-08", status: "overdue" },
          { label: "R2 Sub", date: "2026-06-12", status: "pending" }, { label: "R2 App", date: "2026-06-17", status: "pending" },
          { label: "R3 Sub", date: "2026-06-21", status: "pending" }, { label: "R3 App", date: "2026-06-26", status: "pending" },
        ]},
      { id: "fs", name: "Fit sample", planned: "2026-06-09", actual: null, who: "Factory/Buyer", status: "overdue", blocks: 7,
        rounds: [
          { label: "R1 Sub", date: "2026-06-09", status: "overdue" }, { label: "R1 App", date: "2026-06-15", status: "pending" },
          { label: "R2 Sub", date: "2026-06-27", status: "pending" }, { label: "R2 App", date: "2026-07-03", status: "pending" },
          { label: "R3 Sub", date: "2026-07-15", status: "pending" }, { label: "R3 App", date: "2026-07-21", status: "pending" },
        ]},
      { id: "fob-s", name: "FOB submission", planned: "2026-09-14", actual: null, who: "Merchandiser", status: "upcoming", blocks: 5 },
      { id: "fob-a", name: "FOB approval", planned: "2026-09-21", actual: null, who: "Buyer", status: "upcoming", blocks: 4 },
      { id: "fpt", name: "FPT", planned: "2026-09-25", actual: null, who: "Factory/Lab", status: "upcoming", blocks: 3 },
      { id: "gpt", name: "GPT", planned: "2026-09-30", actual: null, who: "Factory/Lab", status: "upcoming", blocks: 2 },
      { id: "pp", name: "PP sample", planned: "2026-10-12", actual: null, who: "Factory/Buyer", status: "upcoming", blocks: 1,
        rounds: [{ label: "R1 Sub", date: "2026-10-12", status: "pending" }, { label: "R1 App", date: "2026-10-18", status: "pending" }, { label: "R2 Sub", date: "2026-10-19", status: "pending" }, { label: "R2 App", date: "2026-10-25", status: "pending" }]},
      { id: "pcd", name: "Planned cut date", planned: "2026-10-19", actual: null, who: "Factory", status: "upcoming", blocks: 0 },
      { id: "xf", name: "Ex-factory", planned: "2026-06-22", actual: null, who: "Factory", status: "overdue", blocks: 0 },
      { id: "gac", name: "GAC date", planned: "2026-08-16", actual: null, who: "Logistics", status: "upcoming", blocks: 0 },
      { id: "ih-d", name: "In-house date", planned: "2026-08-20", actual: null, who: "Buyer", status: "upcoming", blocks: 0 },
    ],
    logs: [
      { date: "2026-06-15", by: "Gaurika", text: "Followed up with MGF on fabric commitment — awaiting confirmation" },
      { date: "2026-06-01", by: "Gaurika", text: "PO received from Talbots via MGF Sourcing" },
    ],
    docs: [{ name: "Talbots_PO_30160042.pdf", type: "PO" }],
  },
  {
    id: "2", po: "30159175", buyer: "Talbots", style: "T-4471", season: "FL26", cycle: 130,
    fabricCommit: "2026-06-10", xfty: "2026-08-17", ih: "2026-10-15", units: 14513,
    milestones: [
      { id: "fc", name: "Fabric commitment", planned: "2026-06-10", actual: "2026-06-10", who: "Merchandiser", status: "done", blocks: 0 },
      { id: "fo", name: "Fabric ordered", planned: "2026-06-11", actual: "2026-06-11", who: "Merchandiser", status: "done", blocks: 0 },
      { id: "fi", name: "Fabric in-house", planned: "2026-06-25", actual: "2026-06-25", who: "Factory", status: "done", blocks: 0 },
      { id: "ld", name: "Lab dip", planned: "2026-06-15", actual: null, who: "Factory/Buyer", status: "overdue", blocks: 8,
        rounds: [
          { label: "R1 Sub", date: "2026-06-15", status: "done" }, { label: "R1 App", date: "2026-06-21", status: "done" },
          { label: "R2 Sub", date: "2026-06-25", status: "done" }, { label: "R2 App", date: "2026-06-30", status: "overdue" },
          { label: "R3 Sub", date: "2026-07-04", status: "pending" }, { label: "R3 App", date: "2026-07-09", status: "pending" },
        ]},
      { id: "fs", name: "Fit sample", planned: "2026-06-22", actual: null, who: "Factory/Buyer", status: "overdue", blocks: 7,
        rounds: [
          { label: "R1 Sub", date: "2026-06-22", status: "overdue" }, { label: "R1 App", date: "2026-06-28", status: "pending" },
          { label: "R2 Sub", date: "2026-07-10", status: "pending" }, { label: "R2 App", date: "2026-07-16", status: "pending" },
          { label: "R3 Sub", date: "2026-07-28", status: "pending" }, { label: "R3 App", date: "2026-08-03", status: "pending" },
        ]},
      { id: "fob-s", name: "FOB submission", planned: "2026-09-27", actual: null, who: "Merchandiser", status: "upcoming", blocks: 5 },
      { id: "fob-a", name: "FOB approval", planned: "2026-10-04", actual: null, who: "Buyer", status: "upcoming", blocks: 4 },
      { id: "fpt", name: "FPT", planned: "2026-10-08", actual: null, who: "Factory/Lab", status: "upcoming", blocks: 3 },
      { id: "gpt", name: "GPT", planned: "2026-10-13", actual: null, who: "Factory/Lab", status: "upcoming", blocks: 2 },
      { id: "pp", name: "PP sample", planned: "2026-10-25", actual: null, who: "Factory/Buyer", status: "upcoming", blocks: 1,
        rounds: [{ label: "R1 Sub", date: "2026-10-25", status: "pending" }, { label: "R1 App", date: "2026-10-31", status: "pending" }, { label: "R2 Sub", date: "2026-11-01", status: "pending" }, { label: "R2 App", date: "2026-11-07", status: "pending" }]},
      { id: "pcd", name: "Planned cut date", planned: "2026-11-01", actual: null, who: "Factory", status: "upcoming", blocks: 0 },
      { id: "xf", name: "Ex-factory", planned: "2026-08-17", actual: null, who: "Factory", status: "upcoming", blocks: 0 },
      { id: "gac", name: "GAC date", planned: "2026-10-11", actual: null, who: "Logistics", status: "upcoming", blocks: 0 },
      { id: "ih-d", name: "In-house date", planned: "2026-10-15", actual: null, who: "Buyer", status: "upcoming", blocks: 0 },
    ],
    logs: [
      { date: "2026-06-30", by: "Gaurika", text: "Followed up with MGF on lab dip R2 — waiting for Rich Burgundy approval" },
      { date: "2026-06-25", by: "Gaurika", text: "Lab dip R2 submitted. Shade adjusted per buyer feedback." },
      { date: "2026-06-21", by: "Gaurika", text: "Lab dip R1 approved — Indigo Blue and Azure Blue accepted. Rich Burgundy rejected." },
      { date: "2026-06-15", by: "Gaurika", text: "Lab dip R1 dispatched to MGF Sourcing. 7 colorways." },
    ],
    docs: [{ name: "Talbots_PO_30159175.pdf", type: "PO" }, { name: "Tech_pack_T4471.pdf", type: "Tech Pack" }],
  },
  {
    id: "3", po: "30161088", buyer: "Lilly Pulitzer", style: "LP-5520", season: "FL26", cycle: 120,
    fabricCommit: "2026-06-05", xfty: "2026-09-10", ih: "2026-10-30", units: 6800,
    milestones: [
      { id: "fc", name: "Fabric commitment", planned: "2026-06-05", actual: "2026-06-05", who: "Merchandiser", status: "done", blocks: 0 },
      { id: "fo", name: "Fabric ordered", planned: "2026-06-06", actual: "2026-06-06", who: "Merchandiser", status: "done", blocks: 0 },
      { id: "ld", name: "Lab dip", planned: "2026-06-10", actual: "2026-06-20", who: "Factory/Buyer", status: "done", blocks: 0 },
      { id: "fs", name: "Fit sample", planned: "2026-06-17", actual: null, who: "Factory/Buyer", status: "overdue", blocks: 9,
        rounds: [
          { label: "R1 Sub", date: "2026-06-17", status: "done" }, { label: "R1 App", date: "2026-06-23", status: "overdue" },
          { label: "R2 Sub", date: "2026-07-05", status: "pending" }, { label: "R2 App", date: "2026-07-11", status: "pending" },
          { label: "R3 Sub", date: "2026-07-23", status: "pending" }, { label: "R3 App", date: "2026-07-29", status: "pending" },
        ]},
      { id: "fob-s", name: "FOB submission", planned: "2026-09-22", actual: null, who: "Merchandiser", status: "upcoming", blocks: 5 },
      { id: "fob-a", name: "FOB approval", planned: "2026-09-29", actual: null, who: "Buyer", status: "upcoming", blocks: 4 },
      { id: "fpt", name: "FPT", planned: "2026-10-03", actual: null, who: "Factory/Lab", status: "upcoming", blocks: 3 },
      { id: "gpt", name: "GPT", planned: "2026-10-08", actual: null, who: "Factory/Lab", status: "upcoming", blocks: 2 },
      { id: "pp", name: "PP sample", planned: "2026-10-20", actual: null, who: "Factory/Buyer", status: "upcoming", blocks: 1 },
      { id: "pcd", name: "Planned cut date", planned: "2026-10-21", actual: null, who: "Factory", status: "upcoming", blocks: 0 },
      { id: "xf", name: "Ex-factory", planned: "2026-09-10", actual: null, who: "Factory", status: "upcoming", blocks: 0 },
      { id: "ih-d", name: "In-house date", planned: "2026-10-30", actual: null, who: "Buyer", status: "upcoming", blocks: 0 },
    ],
    logs: [{ date: "2026-06-28", by: "Gaurika", text: "Waiting on Lilly Pulitzer for fit sample R1 approval" }],
    docs: [{ name: "LP_PO_30161088.pdf", type: "PO" }],
  },
  {
    id: "4", po: "30162201", buyer: "Tommy Bahama", style: "TB-990", season: "FL26", cycle: 130,
    fabricCommit: "2026-04-15", xfty: "2026-08-25", ih: "2026-10-14", units: 9200,
    milestones: [
      { id: "fc", name: "Fabric commitment", planned: "2026-04-15", actual: "2026-04-15", who: "Merchandiser", status: "done", blocks: 0 },
      { id: "fo", name: "Fabric ordered", planned: "2026-04-16", actual: "2026-04-16", who: "Merchandiser", status: "done", blocks: 0 },
      { id: "ld", name: "Lab dip", planned: "2026-04-20", actual: "2026-05-05", who: "Factory/Buyer", status: "done", blocks: 0 },
      { id: "fs", name: "Fit sample", planned: "2026-04-27", actual: "2026-05-20", who: "Factory/Buyer", status: "done", blocks: 0 },
      { id: "fob-s", name: "FOB submission", planned: "2026-06-10", actual: "2026-06-10", who: "Merchandiser", status: "done", blocks: 0 },
      { id: "fob-a", name: "FOB approval", planned: "2026-06-17", actual: "2026-06-20", who: "Buyer", status: "done", blocks: 0 },
      { id: "fpt", name: "FPT", planned: "2026-07-03", actual: null, who: "Factory/Lab", status: "atrisk", blocks: 5 },
      { id: "gpt", name: "GPT", planned: "2026-07-08", actual: null, who: "Factory/Lab", status: "upcoming", blocks: 4 },
      { id: "pp", name: "PP sample", planned: "2026-07-20", actual: null, who: "Factory/Buyer", status: "upcoming", blocks: 2 },
      { id: "pcd", name: "Planned cut date", planned: "2026-07-27", actual: null, who: "Factory", status: "upcoming", blocks: 0 },
      { id: "xf", name: "Ex-factory", planned: "2026-08-25", actual: null, who: "Factory", status: "upcoming", blocks: 0 },
      { id: "ih-d", name: "In-house date", planned: "2026-10-14", actual: null, who: "Buyer", status: "upcoming", blocks: 0 },
    ],
    logs: [{ date: "2026-06-28", by: "Gaurika", text: "FPT samples sent to SGS lab. Results expected July 3." }],
    docs: [{ name: "TB_PO_30162201.pdf", type: "PO" }, { name: "Tech_pack_TB990.pdf", type: "Tech Pack" }],
  },
  {
    id: "5", po: "30163050", buyer: "Talbots", style: "T-5590", season: "RS26", cycle: 130,
    fabricCommit: "2026-06-20", xfty: "2026-11-05", ih: "2027-01-03", units: 11000,
    milestones: [
      { id: "fc", name: "Fabric commitment", planned: "2026-06-20", actual: "2026-06-20", who: "Merchandiser", status: "done", blocks: 0 },
      { id: "fo", name: "Fabric ordered", planned: "2026-06-21", actual: "2026-06-21", who: "Merchandiser", status: "done", blocks: 0 },
      { id: "ld", name: "Lab dip", planned: "2026-06-25", actual: null, who: "Factory/Buyer", status: "atrisk", blocks: 9,
        rounds: [
          { label: "R1 Sub", date: "2026-06-25", status: "done" }, { label: "R1 App", date: "2026-07-01", status: "done" },
          { label: "R2 Sub", date: "2026-07-05", status: "atrisk" }, { label: "R2 App", date: "2026-07-10", status: "pending" },
          { label: "R3 Sub", date: "2026-07-14", status: "pending" }, { label: "R3 App", date: "2026-07-19", status: "pending" },
        ]},
      { id: "fs", name: "Fit sample", planned: "2026-07-02", actual: null, who: "Factory/Buyer", status: "upcoming", blocks: 7 },
      { id: "fob-s", name: "FOB submission", planned: "2026-10-10", actual: null, who: "Merchandiser", status: "upcoming", blocks: 5 },
      { id: "fob-a", name: "FOB approval", planned: "2026-10-17", actual: null, who: "Buyer", status: "upcoming", blocks: 4 },
      { id: "fpt", name: "FPT", planned: "2026-10-21", actual: null, who: "Factory/Lab", status: "upcoming", blocks: 3 },
      { id: "gpt", name: "GPT", planned: "2026-10-26", actual: null, who: "Factory/Lab", status: "upcoming", blocks: 2 },
      { id: "pp", name: "PP sample", planned: "2026-11-01", actual: null, who: "Factory/Buyer", status: "upcoming", blocks: 1 },
      { id: "pcd", name: "Planned cut date", planned: "2026-11-02", actual: null, who: "Factory", status: "upcoming", blocks: 0 },
      { id: "xf", name: "Ex-factory", planned: "2026-11-05", actual: null, who: "Factory", status: "upcoming", blocks: 0 },
      { id: "ih-d", name: "In-house date", planned: "2027-01-03", actual: null, who: "Buyer", status: "upcoming", blocks: 0 },
    ],
    logs: [{ date: "2026-07-01", by: "Gaurika", text: "Lab dip R1 approved. R2 submission due July 5." }],
    docs: [],
  },
  {
    id: "6", po: "30164112", buyer: "Lilly Pulitzer", style: "LP-7780", season: "RS26", cycle: 120,
    fabricCommit: "2026-05-01", xfty: "2026-10-10", ih: "2026-11-28", units: 5400,
    milestones: [
      { id: "fc", name: "Fabric commitment", planned: "2026-05-01", actual: "2026-05-01", who: "Merchandiser", status: "done", blocks: 0 },
      { id: "fo", name: "Fabric ordered", planned: "2026-05-02", actual: "2026-05-02", who: "Merchandiser", status: "done", blocks: 0 },
      { id: "ld", name: "Lab dip", planned: "2026-05-06", actual: "2026-05-25", who: "Factory/Buyer", status: "done", blocks: 0 },
      { id: "fs", name: "Fit sample", planned: "2026-05-13", actual: "2026-06-05", who: "Factory/Buyer", status: "done", blocks: 0 },
      { id: "fob-s", name: "FOB submission", planned: "2026-07-30", actual: "2026-07-30", who: "Merchandiser", status: "done", blocks: 0 },
      { id: "fob-a", name: "FOB approval", planned: "2026-08-06", actual: null, who: "Buyer", status: "upcoming", blocks: 4 },
      { id: "fpt", name: "FPT", planned: "2026-08-10", actual: null, who: "Factory/Lab", status: "upcoming", blocks: 3 },
      { id: "gpt", name: "GPT", planned: "2026-08-15", actual: null, who: "Factory/Lab", status: "upcoming", blocks: 2 },
      { id: "pp", name: "PP sample", planned: "2026-08-27", actual: null, who: "Factory/Buyer", status: "upcoming", blocks: 1 },
      { id: "pcd", name: "Planned cut date", planned: "2026-09-03", actual: null, who: "Factory", status: "upcoming", blocks: 0 },
      { id: "xf", name: "Ex-factory", planned: "2026-10-10", actual: null, who: "Factory", status: "upcoming", blocks: 0 },
      { id: "ih-d", name: "In-house date", planned: "2026-11-28", actual: null, who: "Buyer", status: "upcoming", blocks: 0 },
    ],
    logs: [{ date: "2026-07-30", by: "Gaurika", text: "FOB submitted. Awaiting Lilly Pulitzer approval." }],
    docs: [{ name: "LP_PO_30164112.pdf", type: "PO" }],
  },
  {
    id: "7", po: "30165440", buyer: "Tommy Bahama", style: "TB-1102", season: "RS26", cycle: 130,
    fabricCommit: "2026-06-25", xfty: "2026-11-18", ih: "2027-01-16", units: 7600,
    milestones: [
      { id: "fc", name: "Fabric commitment", planned: "2026-06-25", actual: "2026-06-25", who: "Merchandiser", status: "done", blocks: 0 },
      { id: "fo", name: "Fabric ordered", planned: "2026-06-26", actual: null, who: "Merchandiser", status: "upcoming", blocks: 11 },
      { id: "ld", name: "Lab dip", planned: "2026-06-30", actual: null, who: "Factory/Buyer", status: "upcoming", blocks: 9 },
      { id: "fs", name: "Fit sample", planned: "2026-07-07", actual: null, who: "Factory/Buyer", status: "upcoming", blocks: 7 },
      { id: "fob-s", name: "FOB submission", planned: "2026-10-15", actual: null, who: "Merchandiser", status: "upcoming", blocks: 5 },
      { id: "fob-a", name: "FOB approval", planned: "2026-10-22", actual: null, who: "Buyer", status: "upcoming", blocks: 4 },
      { id: "fpt", name: "FPT", planned: "2026-10-26", actual: null, who: "Factory/Lab", status: "upcoming", blocks: 3 },
      { id: "gpt", name: "GPT", planned: "2026-10-31", actual: null, who: "Factory/Lab", status: "upcoming", blocks: 2 },
      { id: "pp", name: "PP sample", planned: "2026-11-06", actual: null, who: "Factory/Buyer", status: "upcoming", blocks: 1 },
      { id: "pcd", name: "Planned cut date", planned: "2026-11-07", actual: null, who: "Factory", status: "upcoming", blocks: 0 },
      { id: "xf", name: "Ex-factory", planned: "2026-11-18", actual: null, who: "Factory", status: "upcoming", blocks: 0 },
      { id: "ih-d", name: "In-house date", planned: "2027-01-16", actual: null, who: "Buyer", status: "upcoming", blocks: 0 },
    ],
    logs: [{ date: "2026-06-25", by: "Gaurika", text: "Fabric committed. Order setup complete." }],
    docs: [],
  },
  {
    id: "8", po: "30166003", buyer: "Talbots", style: "T-6620", season: "RS26", cycle: 130,
    fabricCommit: "2026-03-15", xfty: "2026-07-15", ih: "2026-09-12", units: 10200,
    milestones: [
      { id: "fc", name: "Fabric commitment", planned: "2026-03-15", actual: "2026-03-15", who: "Merchandiser", status: "done", blocks: 0 },
      { id: "fo", name: "Fabric ordered", planned: "2026-03-16", actual: "2026-03-16", who: "Merchandiser", status: "done", blocks: 0 },
      { id: "ld", name: "Lab dip", planned: "2026-03-20", actual: "2026-04-10", who: "Factory/Buyer", status: "done", blocks: 0 },
      { id: "fs", name: "Fit sample", planned: "2026-03-27", actual: "2026-04-25", who: "Factory/Buyer", status: "done", blocks: 0 },
      { id: "fob-s", name: "FOB submission", planned: "2026-05-15", actual: "2026-05-15", who: "Merchandiser", status: "done", blocks: 0 },
      { id: "fob-a", name: "FOB approval", planned: "2026-05-22", actual: "2026-05-25", who: "Buyer", status: "done", blocks: 0 },
      { id: "fpt", name: "FPT", planned: "2026-05-29", actual: "2026-05-29", who: "Factory/Lab", status: "done", blocks: 0 },
      { id: "gpt", name: "GPT", planned: "2026-06-03", actual: "2026-06-03", who: "Factory/Lab", status: "done", blocks: 0 },
      { id: "pp", name: "PP sample", planned: "2026-06-15", actual: "2026-06-18", who: "Factory/Buyer", status: "done", blocks: 0 },
      { id: "pcd", name: "Planned cut date", planned: "2026-06-19", actual: "2026-06-19", who: "Factory", status: "done", blocks: 0 },
      { id: "xf", name: "Ex-factory", planned: "2026-07-15", actual: null, who: "Factory", status: "upcoming", blocks: 0 },
      { id: "ih-d", name: "In-house date", planned: "2026-09-12", actual: null, who: "Buyer", status: "upcoming", blocks: 0 },
    ],
    logs: [{ date: "2026-06-19", by: "Gaurika", text: "Cutting started. On track for July 15 ex-factory." }],
    docs: [{ name: "Talbots_PO_30166003.pdf", type: "PO" }],
  },
];

const fmt = (d) => { if (!d) return "—"; const dt = new Date(d + "T00:00:00"); return dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }); };
const daysFrom = (d) => { const today = new Date(); today.setHours(0,0,0,0); return Math.round((new Date(d + "T00:00:00") - today) / 86400000); };
const getHealth = (o) => o.milestones.some(m => m.status === "overdue") ? "overdue" : o.milestones.some(m => m.status === "atrisk") ? "atrisk" : "ontrack";

function StatusPill({ status, planned }) {
  const diff = planned ? daysFrom(planned) : null;
  const label = status === "done" ? "Done" : status === "overdue" ? `${Math.abs(diff)}d overdue` : status === "atrisk" ? `${diff}d left` : diff !== null && diff <= 30 ? `${diff}d` : diff !== null ? `${diff}d` : "";
  const cls = status === "done" ? "bg-gray-100 text-gray-500" : status === "overdue" ? "bg-red-50 text-red-700" : status === "atrisk" ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700";
  return <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md whitespace-nowrap ${cls}`}>{label}</span>;
}
function BuyerChip({ buyer }) { return <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${BUYERS[buyer]?.color || "bg-gray-100"}`}>{buyer}</span>; }
function ProgressDots({ milestones }) {
  return <div className="flex gap-[3px]">{milestones.map((m, i) => <div key={i} className={`w-[5px] h-[5px] rounded-full ${m.status === "done" ? "bg-green-500" : m.status === "overdue" ? "bg-red-400" : m.status === "atrisk" ? "bg-amber-400" : "bg-gray-200"}`} />)}</div>;
}

function Sidebar({ page, setPage }) {
  const items = [
    { id: "dashboard", icon: LayoutDashboard }, { id: "orders", icon: ListChecks }, { id: "buyers", icon: Building2 }, { id: "calendar", icon: Calendar }, { id: "season", icon: BarChart3 },
  ];
  return (
    <div className="w-[52px] bg-white border-r border-gray-200 flex flex-col items-center py-3 gap-1 flex-shrink-0">
      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mb-3"><GitBranch className="w-4 h-4 text-purple-600" /></div>
      {items.map(it => <button key={it.id} onClick={() => setPage(it.id)} className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${page === it.id ? "bg-purple-100 text-purple-600" : "text-gray-400 hover:bg-gray-50"}`}><it.icon className="w-[18px] h-[18px]" /></button>)}
      <div className="flex-1" />
      <button className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50"><Settings className="w-[18px] h-[18px]" /></button>
    </div>
  );
}

function OrderCard({ order, onClick }) {
  const critical = order.milestones.find(m => m.status === "overdue" || m.status === "atrisk") || order.milestones.find(m => m.status === "upcoming");
  const health = getHealth(order);
  const borderColor = health === "overdue" ? "border-l-red-400" : health === "atrisk" ? "border-l-amber-400" : "border-l-transparent";
  return (
    <div onClick={onClick} className={`bg-white border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-gray-300 transition-colors border-l-[3px] ${borderColor}`}>
      <div className="flex items-center gap-1.5 mb-1.5"><BuyerChip buyer={order.buyer} />{BUYERS[order.buyer]?.house && <span className="text-[9px] text-gray-400">via {BUYERS[order.buyer].house}</span>}</div>
      <div className="text-[13px] font-medium text-gray-900 mb-0.5">PO {order.po}</div>
      <div className="text-[11px] text-gray-400 mb-2.5">{order.style} · {order.season} · {order.cycle}d</div>
      {critical && <div className="bg-gray-50 rounded-md p-2 mb-2.5">
        <div className="flex items-center gap-1.5">{critical.status === "overdue" ? <AlertCircle className="w-3 h-3 text-red-500" /> : critical.status === "atrisk" ? <Clock className="w-3 h-3 text-amber-500" /> : <CheckCircle2 className="w-3 h-3 text-green-500" />}<span className="text-[11px] font-medium text-gray-900">{critical.name}</span></div>
        <div className="text-[10px] text-gray-400 mt-0.5 ml-[18px]">{critical.status === "overdue" ? `${Math.abs(daysFrom(critical.planned))}d overdue` : critical.status === "atrisk" ? `Due in ${daysFrom(critical.planned)}d` : `Due in ${daysFrom(critical.planned)}d`}{critical.blocks > 0 && ` · blocks ${critical.blocks}`}</div>
      </div>}
      <ProgressDots milestones={order.milestones} />
      <div className="flex items-center justify-between mt-2"><span className="text-[10px] text-gray-400">X-Fty: {fmt(order.xfty)} · IH: {fmt(order.ih)}</span>{critical && <StatusPill status={critical.status} planned={critical.planned} />}</div>
    </div>
  );
}

function Dashboard({ orders, onSelectOrder, onNewOrder }) {
  const overdue = orders.filter(o => getHealth(o) === "overdue");
  const atrisk = orders.filter(o => getHealth(o) === "atrisk");
  const ontrack = orders.filter(o => getHealth(o) === "ontrack");
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="px-4 py-2.5 border-b border-gray-200 flex items-center justify-between bg-white">
        <div><div className="text-[15px] font-medium text-gray-900">Good morning</div><div className="text-[11px] text-gray-400">Tuesday, 1 July 2026 · Richa Global Exports</div></div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 rounded-lg border border-gray-200 text-gray-400 text-[11px]"><Search className="w-3.5 h-3.5" /> Search orders...</div>
          <button className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 relative"><Bell className="w-4 h-4" />{overdue.length > 0 && <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white text-[8px] font-medium rounded-full flex items-center justify-center">{overdue.length}</div>}</button>
          <button onClick={onNewOrder} className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white text-[11px] font-medium rounded-lg hover:bg-purple-700"><Plus className="w-3.5 h-3.5" /> New order</button>
        </div>
      </div>
      <div className="flex gap-2.5 px-4 py-3 border-b border-gray-100">
        {[{ label: "Active orders", value: orders.length, color: "text-gray-900" }, { label: "Overdue", value: overdue.length, color: "text-red-600" }, { label: "At risk", value: atrisk.length, color: "text-amber-600" }, { label: "On track", value: ontrack.length, color: "text-green-600" }].map(s =>
          <div key={s.label} className="flex-1 bg-gray-50 rounded-lg px-3 py-2.5 text-center"><div className={`text-xl font-medium ${s.color}`}>{s.value}</div><div className="text-[10px] text-gray-400 mt-0.5">{s.label}</div></div>
        )}
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="flex gap-3">
          {[{ title: "Overdue", items: overdue, dot: "bg-red-500" }, { title: "At risk", items: atrisk, dot: "bg-amber-500" }, { title: "On track", items: ontrack, dot: "bg-green-500" }].map(col =>
            <div key={col.title} className="flex-1 min-w-0 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1"><div className={`w-2 h-2 rounded-full ${col.dot}`} /><span className="text-[12px] font-medium text-gray-600">{col.title}</span><span className="text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">{col.items.length}</span></div>
              {col.items.map(o => <OrderCard key={o.id} order={o} onClick={() => onSelectOrder(o)} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function OrderDetail({ order, onBack }) {
  const [showCompleted, setShowCompleted] = useState(false);
  const overduMs = order.milestones.filter(m => m.status === "overdue" || m.status === "atrisk");
  const upcomingMs = order.milestones.filter(m => m.status === "upcoming");
  const doneMs = order.milestones.filter(m => m.status === "done");
  const doneCount = doneMs.length; const totalMs = order.milestones.length;
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="px-4 py-2.5 border-b border-gray-200 bg-white flex items-center gap-2">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600"><ArrowLeft className="w-4 h-4" /></button>
        <span className="text-[11px] text-gray-400">Dashboard</span><ChevronRight className="w-3 h-3 text-gray-300" /><span className="text-[11px] text-gray-900 font-medium">PO {order.po}</span>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-base font-medium text-gray-900">PO {order.po}</span><BuyerChip buyer={order.buyer} />
              {BUYERS[order.buyer]?.house && <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded">via {BUYERS[order.buyer].house}</span>}
              <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{order.season}</span>
              <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{order.cycle}d</span>
              <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{order.style}</span>
            </div>
            <div className="flex gap-4 text-[11px] text-gray-500 mb-3"><span>Committed: {fmt(order.fabricCommit)}</span><span>X-Fty: {fmt(order.xfty)}</span><span>IH: {fmt(order.ih)}</span><span>{order.units.toLocaleString()} units</span></div>
            <div className="flex gap-2"><button className="text-[10px] px-2.5 py-1 rounded-md bg-purple-50 text-purple-600 font-medium">Auto cascade</button><button className="text-[10px] px-2.5 py-1 rounded-md border border-gray-200 text-gray-600">Edit</button><button className="text-[10px] px-2.5 py-1 rounded-md border border-gray-200 text-red-500">Delete</button></div>
          </div>
          <div className="flex items-center gap-2 mb-4"><div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-green-500 rounded-full" style={{ width: `${(doneCount / totalMs) * 100}%` }} /></div><span className="text-[10px] text-gray-400 whitespace-nowrap">{doneCount} of {totalMs} done</span></div>
          {overduMs.length > 0 && <><div className="flex items-center gap-1.5 mb-2"><AlertCircle className="w-3.5 h-3.5 text-red-500" /><span className="text-[11px] font-medium text-gray-600">Needs attention ({overduMs.length})</span></div>
          {overduMs.map(m => <div key={m.id} className="bg-white border border-gray-200 rounded-lg mb-2 border-l-[3px] border-l-red-400 overflow-hidden">
            <div className="flex items-center px-3 py-2.5 gap-2"><div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${m.status === "overdue" ? "bg-red-500" : "bg-amber-500"}`} /><div className="flex-1"><div className="text-[12px] font-medium text-gray-900">{m.name}</div><div className="text-[10px] text-gray-400">{m.who}</div></div><span className="text-[11px] text-gray-500">{fmt(m.planned)}</span><StatusPill status={m.status} planned={m.planned} /></div>
            {m.blocks > 0 && <div className="px-3 pb-1 ml-[18px] flex items-center gap-1 text-[9px] text-red-600"><AlertCircle className="w-3 h-3" />Blocking {m.blocks} downstream</div>}
            {m.rounds && <div className="px-3 pb-2.5 ml-[18px] space-y-0.5">{m.rounds.map((r, i) => <div key={i} className="flex items-center gap-2 py-1 border-t border-gray-50"><div className={`w-[6px] h-[6px] rounded-full flex-shrink-0 ${r.status === "done" ? "bg-green-500" : r.status === "overdue" ? "bg-red-500" : r.status === "atrisk" ? "bg-amber-400" : "bg-gray-200"}`} /><span className={`text-[10px] flex-1 ${r.status === "overdue" ? "font-medium text-gray-900" : "text-gray-500"}`}>{r.label}</span><span className={`text-[10px] ${r.status === "overdue" ? "text-red-600" : "text-gray-400"}`}>{fmt(r.date)}</span><span className={`text-[9px] px-1.5 py-0.5 rounded ${r.status === "done" ? "bg-green-50 text-green-600" : r.status === "overdue" ? "bg-red-50 text-red-600" : r.status === "atrisk" ? "bg-amber-50 text-amber-600" : "bg-gray-50 text-gray-400"}`}>{r.status === "done" ? "Done" : r.status === "overdue" ? `${Math.abs(daysFrom(r.date))}d` : r.status === "atrisk" ? `${daysFrom(r.date)}d` : "Pending"}</span></div>)}</div>}
          </div>)}</>}
          {upcomingMs.length > 0 && <><div className="flex items-center gap-1.5 mt-4 mb-2"><Clock className="w-3.5 h-3.5 text-gray-400" /><span className="text-[11px] font-medium text-gray-600">Upcoming ({upcomingMs.length})</span></div>
          {upcomingMs.map(m => <div key={m.id} className="bg-white border border-gray-200 rounded-lg mb-1.5 flex items-center px-3 py-2 gap-2"><div className="w-2.5 h-2.5 rounded-full bg-gray-200 border border-gray-300 flex-shrink-0" /><div className="flex-1"><span className="text-[12px] text-gray-700">{m.name}</span><span className="text-[10px] text-gray-400 ml-2">{m.who}</span></div><span className="text-[11px] text-gray-400">{fmt(m.planned)}</span><StatusPill status={m.status} planned={m.planned} /></div>)}</>}
          {doneMs.length > 0 && <div className="mt-4"><button onClick={() => setShowCompleted(!showCompleted)} className="flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-gray-600 mb-2">{showCompleted ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}Completed ({doneMs.length})</button>{showCompleted && doneMs.map(m => <div key={m.id} className="bg-white border border-gray-100 rounded-lg mb-1 flex items-center px-3 py-2 gap-2 opacity-50"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /><span className="text-[12px] text-gray-500 flex-1">{m.name}</span><span className="text-[11px] text-gray-400 line-through">{fmt(m.planned)}</span><span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">Done</span></div>)}</div>}
        </div>
        <div className="w-[220px] border-l border-gray-200 bg-gray-50 flex flex-col overflow-auto text-[11px]">
          <div className="p-3 border-b border-gray-200"><div className="font-medium text-gray-600 flex items-center gap-1.5 mb-2"><MessageSquare className="w-3 h-3" /> Activity log</div>{order.logs.map((l, i) => <div key={i} className="border-b border-gray-100 pb-2 mb-2"><div className="flex justify-between text-[9px] text-gray-400 mb-0.5"><span>{l.by}</span><span>{fmt(l.date)}</span></div><div className="text-gray-600 leading-relaxed">{l.text}</div></div>)}<textarea className="w-full mt-1 border border-gray-200 rounded-md px-2 py-1.5 text-[11px] bg-white resize-none" rows={2} placeholder="Add a note..." /><button className="mt-1.5 text-[10px] px-2.5 py-1 bg-purple-600 text-white rounded-md font-medium">Add update</button></div>
          <div className="p-3 border-b border-gray-200"><div className="font-medium text-gray-600 flex items-center gap-1.5 mb-2"><FileText className="w-3 h-3" /> Documents</div>{order.docs.map((d, i) => <div key={i} className="flex items-center gap-1.5 py-1.5 border-b border-gray-100"><FileText className="w-3 h-3 text-gray-400" /><span className="text-gray-600 flex-1 truncate">{d.name}</span><span className="text-purple-600 text-[10px]">View</span></div>)}<div className="mt-2 border border-dashed border-gray-300 rounded-md py-2 text-center text-[10px] text-gray-400 cursor-pointer hover:bg-gray-100"><Upload className="w-3 h-3 inline mr-1" /> Upload</div></div>
          <div className="p-3"><div className="font-medium text-gray-600 flex items-center gap-1.5 mb-2"><User className="w-3 h-3" /> Buyer contact</div><div className="font-medium text-gray-900">{BUYERS[order.buyer]?.contact}</div><div className="text-[10px] text-gray-400">{BUYERS[order.buyer]?.house || order.buyer}</div><div className="text-[10px] text-purple-600 mt-1">{BUYERS[order.buyer]?.email}</div></div>
        </div>
      </div>
    </div>
  );
}

function OrdersPage({ orders, onSelectOrder }) {
  const [filterBuyer, setFilterBuyer] = useState("All");
  const [filterSeason, setFilterSeason] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchPO, setSearchPO] = useState("");
  const filtered = orders.filter(o => {
    if (filterBuyer !== "All" && o.buyer !== filterBuyer) return false;
    if (filterSeason !== "All" && o.season !== filterSeason) return false;
    if (filterStatus === "Overdue" && getHealth(o) !== "overdue") return false;
    if (filterStatus === "At risk" && getHealth(o) !== "atrisk") return false;
    if (filterStatus === "On track" && getHealth(o) !== "ontrack") return false;
    if (searchPO && !o.po.includes(searchPO) && !o.style.toLowerCase().includes(searchPO.toLowerCase())) return false;
    return true;
  });
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="px-4 py-2.5 border-b border-gray-200 bg-white flex items-center justify-between"><div className="text-[15px] font-medium text-gray-900">All orders</div><span className="text-[11px] text-gray-400">{filtered.length} of {orders.length} orders</span></div>
      <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-2 flex-wrap">
        <select value={filterBuyer} onChange={e => setFilterBuyer(e.target.value)} className="text-[11px] border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-600 bg-white"><option>All</option>{BUYER_LIST.map(b => <option key={b}>{b}</option>)}</select>
        <select value={filterSeason} onChange={e => setFilterSeason(e.target.value)} className="text-[11px] border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-600 bg-white"><option>All</option>{SEASONS.map(s => <option key={s}>{s}</option>)}</select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="text-[11px] border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-600 bg-white"><option>All</option><option>Overdue</option><option>At risk</option><option>On track</option></select>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-lg border border-gray-200 text-gray-400 text-[11px] ml-auto"><Search className="w-3.5 h-3.5" /><input value={searchPO} onChange={e => setSearchPO(e.target.value)} placeholder="Search PO or style..." className="border-none outline-none bg-transparent text-gray-700 text-[11px] w-32" /></div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="grid grid-cols-[1fr_80px_70px_60px_80px_70px_80px_60px] gap-0 px-3 py-2 bg-gray-50 border-b border-gray-200 text-[10px] font-medium text-gray-400">
            <span>Order</span><span>Buyer</span><span>Season</span><span>Cycle</span><span>X-Factory</span><span>IH date</span><span>Units</span><span>Status</span>
          </div>
          {filtered.map(o => {
            const health = getHealth(o); const critical = o.milestones.find(m => m.status === "overdue" || m.status === "atrisk");
            return (
              <div key={o.id} onClick={() => onSelectOrder(o)} className="grid grid-cols-[1fr_80px_70px_60px_80px_70px_80px_60px] gap-0 px-3 py-2.5 border-b border-gray-50 hover:bg-gray-50 cursor-pointer items-center">
                <div><div className="text-[12px] font-medium text-gray-900">PO {o.po}</div><div className="text-[10px] text-gray-400">{o.style}{critical ? ` · ${critical.name}` : ""}</div></div>
                <BuyerChip buyer={o.buyer} />
                <span className="text-[11px] text-gray-500">{o.season}</span>
                <span className="text-[11px] text-gray-400">{o.cycle}d</span>
                <span className="text-[11px] text-gray-500">{fmt(o.xfty)}</span>
                <span className="text-[11px] text-gray-500">{fmt(o.ih)}</span>
                <span className="text-[11px] text-gray-600">{o.units.toLocaleString()}</span>
                <StatusPill status={health === "overdue" ? "overdue" : health === "atrisk" ? "atrisk" : "done"} planned={critical?.planned} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function BuyersPage({ orders, onSelectOrder }) {
  const [selected, setSelected] = useState("Talbots");
  const buyer = BUYERS[selected];
  const buyerOrders = orders.filter(o => o.buyer === selected);
  const overdue = buyerOrders.filter(o => getHealth(o) === "overdue").length;
  const totalUnits = buyerOrders.reduce((s, o) => s + o.units, 0);
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="px-4 py-2.5 border-b border-gray-200 bg-white"><div className="text-[15px] font-medium text-gray-900">Buyers</div></div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[160px] border-r border-gray-200 bg-white p-3 space-y-1">
          <div className="text-[9px] font-medium text-gray-400 uppercase tracking-wider mb-2">Your buyers</div>
          {BUYER_LIST.map(b => <button key={b} onClick={() => setSelected(b)} className={`w-full text-left px-3 py-2 rounded-lg text-[12px] font-medium transition-colors ${selected === b ? "bg-purple-600 text-white" : "text-gray-700 hover:bg-gray-50"}`}>{b}</button>)}
        </div>
        <div className="flex-1 overflow-auto p-4 space-y-3">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3"><BuyerChip buyer={selected} />{buyer.house && <span className="text-[11px] text-gray-400">via {buyer.house}</span>}</div>
            <div className="grid grid-cols-3 gap-3 text-[11px]">
              <div><div className="text-gray-400 mb-0.5">Contact</div><div className="font-medium text-gray-900">{buyer.contact}</div></div>
              <div><div className="text-gray-400 mb-0.5">Email</div><div className="text-purple-600">{buyer.email}</div></div>
              <div><div className="text-gray-400 mb-0.5">X-Fty to IH</div><div className="font-medium text-gray-900">{buyer.xftyDays} days</div></div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2.5">
            {[{ l: "Active orders", v: buyerOrders.length, c: "text-gray-900" }, { l: "Total units", v: totalUnits.toLocaleString(), c: "text-gray-900" }, { l: "Overdue", v: overdue, c: "text-red-600" }, { l: "On track", v: buyerOrders.length - overdue, c: "text-green-600" }].map(s =>
              <div key={s.l} className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-center"><div className={`text-lg font-medium ${s.c}`}>{s.v}</div><div className="text-[10px] text-gray-400">{s.l}</div></div>
            )}
          </div>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 text-[11px] font-medium text-gray-600">Orders for {selected}</div>
            {buyerOrders.length === 0 ? <div className="px-3 py-6 text-center text-[11px] text-gray-400">No orders for this buyer</div> :
            buyerOrders.map(o => {
              const health = getHealth(o); const critical = o.milestones.find(m => m.status === "overdue" || m.status === "atrisk");
              return <div key={o.id} onClick={() => onSelectOrder(o)} className="flex items-center px-3 py-2.5 border-b border-gray-50 hover:bg-gray-50 cursor-pointer gap-3">
                <div className="flex-1"><div className="text-[12px] font-medium text-gray-900">PO {o.po}</div><div className="text-[10px] text-gray-400">{o.style} · {o.season}</div></div>
                <span className="text-[11px] text-gray-400">{fmt(o.xfty)}</span>
                <span className="text-[11px] text-gray-400">{o.units.toLocaleString()} units</span>
                <StatusPill status={health === "overdue" ? "overdue" : health === "atrisk" ? "atrisk" : "done"} planned={critical?.planned} />
                <ProgressDots milestones={o.milestones} />
              </div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function SeasonPage({ orders }) {
  const seasonGroups = {};
  orders.forEach(o => { if (!seasonGroups[o.season]) seasonGroups[o.season] = []; seasonGroups[o.season].push(o); });
  const seasonColors = { SP26: "bg-green-100 text-green-700", SU26: "bg-yellow-100 text-yellow-700", FL26: "bg-orange-100 text-orange-700", RS26: "bg-blue-100 text-blue-700" };
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="px-4 py-2.5 border-b border-gray-200 bg-white"><div className="text-[15px] font-medium text-gray-900">Season overview</div></div>
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {Object.entries(seasonGroups).map(([season, sOrders]) => {
          const totalUnits = sOrders.reduce((s, o) => s + o.units, 0);
          const overdue = sOrders.filter(o => getHealth(o) === "overdue").length;
          const buyerBreakdown = {};
          sOrders.forEach(o => { if (!buyerBreakdown[o.buyer]) buyerBreakdown[o.buyer] = { orders: 0, units: 0 }; buyerBreakdown[o.buyer].orders++; buyerBreakdown[o.buyer].units += o.units; });
          return (
            <div key={season} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md ${seasonColors[season] || "bg-gray-100 text-gray-600"}`}>{season}</span>
                {overdue > 0 && <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded-md">{overdue} delayed</span>}
                <span className="text-[11px] text-gray-400 ml-auto">{sOrders.length} orders · {totalUnits.toLocaleString()} units</span>
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-100 border-b border-gray-100">
                <div className="px-4 py-3 text-center"><div className="text-lg font-medium text-gray-900">{sOrders.length}</div><div className="text-[10px] text-gray-400">Confirmed styles</div></div>
                <div className="px-4 py-3 text-center"><div className="text-lg font-medium text-gray-900">{totalUnits.toLocaleString()}</div><div className="text-[10px] text-gray-400">Confirmed units</div></div>
              </div>
              <div className="divide-y divide-gray-50">
                {Object.entries(buyerBreakdown).map(([buyer, data]) => (
                  <div key={buyer} className="px-4 py-2 flex items-center gap-3">
                    <BuyerChip buyer={buyer} />
                    <span className="text-[11px] text-gray-500">{data.orders} style{data.orders > 1 ? "s" : ""}</span>
                    <span className="text-[11px] text-gray-400">{data.units.toLocaleString()} units</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AddOrderWizard({ onSave, onCancel }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ po: "", buyer: "Talbots", buyingHouse: "MGF Sourcing US LLC", season: "FL26", style: "", description: "", units: "", fabricCommit: "", ihDate: "", cycle: "130" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const xfty = form.ihDate ? (() => { const d = new Date(form.ihDate + "T00:00:00"); d.setDate(d.getDate() - (form.buyer === "Talbots" ? 59 : 49)); return d.toISOString().split("T")[0]; })() : "";

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="px-4 py-2.5 border-b border-gray-200 bg-white flex items-center gap-2">
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600"><ArrowLeft className="w-4 h-4" /></button>
        <span className="text-[15px] font-medium text-gray-900">New order</span>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[180px] border-r border-gray-200 bg-white p-4 space-y-3">
          {["Order basics", "Styles", "Dates", "TNA preview"].map((s, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium ${step > i + 1 ? "bg-green-500 text-white" : step === i + 1 ? "bg-purple-600 text-white" : "border border-gray-300 text-gray-400"}`}>
                {step > i + 1 ? <Check className="w-3 h-3" /> : i + 1}
              </div>
              <span className={`text-[12px] ${step === i + 1 ? "font-medium text-gray-900" : "text-gray-400"}`}>{s}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 overflow-auto p-6 max-w-lg">
          {step === 1 && <div>
            <div className="text-lg font-medium text-gray-900 mb-1">Order basics</div>
            <div className="text-[12px] text-gray-400 mb-5">Enter the PO details and buyer information</div>
            <div className="space-y-3">
              <div><label className="text-[11px] font-medium text-gray-600 block mb-1">Master PO number</label><input value={form.po} onChange={e => set("po", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[12px]" placeholder="e.g. 30159175" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[11px] font-medium text-gray-600 block mb-1">Buyer</label><select value={form.buyer} onChange={e => { set("buyer", e.target.value); set("buyingHouse", e.target.value === "Talbots" ? "MGF Sourcing US LLC" : ""); }} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[12px]">{BUYER_LIST.map(b => <option key={b}>{b}</option>)}</select></div>
                <div><label className="text-[11px] font-medium text-gray-600 block mb-1">Buying house</label><input value={form.buyingHouse} onChange={e => set("buyingHouse", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[12px]" /></div>
              </div>
              <div><label className="text-[11px] font-medium text-gray-600 block mb-1">Season</label><select value={form.season} onChange={e => set("season", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[12px]">{SEASONS.map(s => <option key={s}>{s}</option>)}</select></div>
            </div>
            <div className="flex justify-end mt-6"><button onClick={() => setStep(2)} className="px-4 py-2 bg-purple-600 text-white text-[12px] font-medium rounded-lg">Next</button></div>
          </div>}
          {step === 2 && <div>
            <div className="text-lg font-medium text-gray-900 mb-1">Styles</div>
            <div className="text-[12px] text-gray-400 mb-5">Add the style codes for this order</div>
            <div className="space-y-3">
              <div><label className="text-[11px] font-medium text-gray-600 block mb-1">Style code</label><input value={form.style} onChange={e => set("style", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[12px]" placeholder="e.g. T-4471" /></div>
              <div><label className="text-[11px] font-medium text-gray-600 block mb-1">Description</label><input value={form.description} onChange={e => set("description", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[12px]" placeholder="e.g. 3/4 Slv Pullover" /></div>
              <div><label className="text-[11px] font-medium text-gray-600 block mb-1">Total units</label><input value={form.units} onChange={e => set("units", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[12px]" placeholder="e.g. 14513" /></div>
            </div>
            <div className="flex justify-between mt-6"><button onClick={() => setStep(1)} className="text-[12px] text-gray-500">Back</button><button onClick={() => setStep(3)} className="px-4 py-2 bg-purple-600 text-white text-[12px] font-medium rounded-lg">Next</button></div>
          </div>}
          {step === 3 && <div>
            <div className="text-lg font-medium text-gray-900 mb-1">Dates</div>
            <div className="text-[12px] text-gray-400 mb-5">Set the key dates — milestones will auto-calculate</div>
            <div className="space-y-3">
              <div><label className="text-[11px] font-medium text-gray-600 block mb-1">Fabric commitment date</label><input type="date" value={form.fabricCommit} onChange={e => set("fabricCommit", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[12px]" /></div>
              <div><label className="text-[11px] font-medium text-gray-600 block mb-1">In-house date</label><input type="date" value={form.ihDate} onChange={e => set("ihDate", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[12px]" /></div>
              <div><label className="text-[11px] font-medium text-gray-600 block mb-1">Ex-factory (auto-calculated)</label><input readOnly value={xfty ? fmt(xfty) : "—"} className="w-full border border-gray-100 bg-gray-50 rounded-lg px-3 py-2 text-[12px] text-gray-400" /></div>
              <div><label className="text-[11px] font-medium text-gray-600 block mb-1">Cycle length (days)</label><input value={form.cycle} onChange={e => set("cycle", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[12px]" /></div>
            </div>
            <div className="flex justify-between mt-6"><button onClick={() => setStep(2)} className="text-[12px] text-gray-500">Back</button><button onClick={() => setStep(4)} className="px-4 py-2 bg-purple-600 text-white text-[12px] font-medium rounded-lg">Preview TNA</button></div>
          </div>}
          {step === 4 && <div>
            <div className="text-lg font-medium text-gray-900 mb-1">Review your TNA</div>
            <div className="text-[12px] text-gray-400 mb-5">All milestone dates auto-calculated. Verify before saving.</div>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[{ l: "Buyer", v: form.buyer }, { l: "PO", v: form.po }, { l: "Season", v: form.season }, { l: "Cycle", v: `${form.cycle}d` }].map(i => <div key={i.l} className="bg-gray-50 rounded-lg p-2.5"><div className="text-[9px] text-gray-400">{i.l}</div><div className="text-[13px] font-medium text-gray-900">{i.v || "—"}</div></div>)}
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-gray-50 rounded-lg p-2.5"><div className="text-[9px] text-gray-400">Fabric commit</div><div className="text-[12px] font-medium text-gray-900">{form.fabricCommit ? fmt(form.fabricCommit) : "—"}</div></div>
              <div className="bg-gray-50 rounded-lg p-2.5"><div className="text-[9px] text-gray-400">Ex-factory</div><div className="text-[12px] font-medium text-gray-900">{xfty ? fmt(xfty) : "—"}</div></div>
              <div className="bg-gray-50 rounded-lg p-2.5"><div className="text-[9px] text-gray-400">In-house</div><div className="text-[12px] font-medium text-gray-900">{form.ihDate ? fmt(form.ihDate) : "—"}</div></div>
            </div>
            <div className="text-[11px] font-medium text-gray-600 mb-2">Milestones</div>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden text-[11px]">
              {["Fabric commitment", "Fabric ordered", "Lab dip (3 rounds)", "Fit sample (3 rounds)", "FOB submission", "FOB approval", "FPT", "GPT", "PP sample (2 rounds)", "Planned cut date", "Ex-factory", "GAC date", "In-house date"].map((name, i) =>
                <div key={i} className="flex items-center px-3 py-1.5 border-b border-gray-50"><span className="flex-1 text-gray-700">{name}</span><span className="text-gray-400 w-20 text-right">Day {i * 10}</span></div>
              )}
            </div>
            <div className="mt-3 p-2.5 bg-amber-50 rounded-lg text-[11px] text-amber-700 flex items-start gap-1.5"><AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /><span>Dates calculated using {form.buyer} rules ({form.buyer === "Talbots" ? "59" : "49"}d X-Fty to IH). You can adjust any date after saving.</span></div>
            <div className="flex justify-between mt-6"><button onClick={() => setStep(3)} className="text-[12px] text-gray-500">Back</button><button onClick={() => { onSave({ ...form, xfty, units: parseInt(form.units) || 0 }); }} className="px-4 py-2 bg-purple-600 text-white text-[12px] font-medium rounded-lg flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> Save order</button></div>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default function TrackTaleGM() {
  const [page, setPage] = useState("dashboard");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [showNewOrder, setShowNewOrder] = useState(false);

  function handleSelectOrder(o) { setSelectedOrder(o); setPage("orders"); }
  function handleNewOrderSave(form) {
    const newOrder = {
      id: Date.now().toString(), po: form.po, buyer: form.buyer, style: form.style, season: form.season, cycle: parseInt(form.cycle) || 130,
      fabricCommit: form.fabricCommit, xfty: form.xfty, ih: form.ihDate, units: form.units,
      milestones: [
        { id: "fc", name: "Fabric commitment", planned: form.fabricCommit, actual: null, who: "Merchandiser", status: "upcoming", blocks: 12 },
        { id: "fo", name: "Fabric ordered", planned: form.fabricCommit, actual: null, who: "Merchandiser", status: "upcoming", blocks: 11 },
        { id: "ld", name: "Lab dip", planned: form.fabricCommit, actual: null, who: "Factory/Buyer", status: "upcoming", blocks: 9 },
        { id: "fs", name: "Fit sample", planned: form.fabricCommit, actual: null, who: "Factory/Buyer", status: "upcoming", blocks: 7 },
        { id: "fob-s", name: "FOB submission", planned: form.fabricCommit, actual: null, who: "Merchandiser", status: "upcoming", blocks: 5 },
        { id: "fob-a", name: "FOB approval", planned: form.fabricCommit, actual: null, who: "Buyer", status: "upcoming", blocks: 4 },
        { id: "fpt", name: "FPT", planned: form.fabricCommit, actual: null, who: "Factory/Lab", status: "upcoming", blocks: 3 },
        { id: "gpt", name: "GPT", planned: form.fabricCommit, actual: null, who: "Factory/Lab", status: "upcoming", blocks: 2 },
        { id: "pp", name: "PP sample", planned: form.fabricCommit, actual: null, who: "Factory/Buyer", status: "upcoming", blocks: 1 },
        { id: "pcd", name: "Planned cut date", planned: form.fabricCommit, actual: null, who: "Factory", status: "upcoming", blocks: 0 },
        { id: "xf", name: "Ex-factory", planned: form.xfty, actual: null, who: "Factory", status: "upcoming", blocks: 0 },
        { id: "ih-d", name: "In-house date", planned: form.ihDate, actual: null, who: "Buyer", status: "upcoming", blocks: 0 },
      ],
      logs: [{ date: new Date().toISOString().split("T")[0], by: "Gaurika", text: `Order created. ${form.buyer} PO ${form.po}, ${form.season}.` }],
      docs: [],
    };
    setOrders(prev => [...prev, newOrder]);
    setShowNewOrder(false);
    setPage("dashboard");
  }

  return (
    <div className="flex h-[640px] bg-[#F4F4F8] rounded-xl overflow-hidden border border-gray-200" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <Sidebar page={showNewOrder ? "orders" : selectedOrder ? "orders" : page} setPage={p => { setPage(p); setSelectedOrder(null); setShowNewOrder(false); }} />
      {showNewOrder ? <AddOrderWizard onSave={handleNewOrderSave} onCancel={() => setShowNewOrder(false)} /> :
       selectedOrder ? <OrderDetail order={selectedOrder} onBack={() => setSelectedOrder(null)} /> :
       page === "dashboard" ? <Dashboard orders={orders} onSelectOrder={handleSelectOrder} onNewOrder={() => setShowNewOrder(true)} /> :
       page === "orders" ? <OrdersPage orders={orders} onSelectOrder={handleSelectOrder} /> :
       page === "buyers" ? <BuyersPage orders={orders} onSelectOrder={handleSelectOrder} /> :
       page === "season" ? <SeasonPage orders={orders} /> :
       <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">{page} — coming next</div>}
    </div>
  );
}
