import { useState } from "react";
import { LayoutDashboard, ListChecks, Building2, Calendar as CalIcon, BarChart3, Settings, Search, Bell, Plus, ChevronRight, ChevronDown, AlertCircle, Clock, CheckCircle2, ArrowLeft, MessageSquare, FileText, Upload, Check, User, ExternalLink, GitBranch, Table2, ChevronLeft } from "lucide-react";

const BUYER_LIST = ["Talbots", "Lilly Pulitzer", "Tommy Bahama", "Johnny Was"];
const SEASONS = ["SP27", "SU27", "FL26", "RS26"];
const BUYERS = {
  Talbots: { color: "bg-purple-200 text-purple-800", house: "MGF Sourcing US LLC", xftyDays: 59, contact: "Sarah Mitchell", email: "s.mitchell@mgfsourcing.com" },
  "Lilly Pulitzer": { color: "bg-pink-200 text-pink-800", house: "", xftyDays: 49, contact: "Rachel Adams", email: "radams@lillypulitzer.com" },
  "Tommy Bahama": { color: "bg-teal-200 text-teal-800", house: "", xftyDays: 49, contact: "David Chen", email: "dchen@tommybahama.com" },
  "Johnny Was": { color: "bg-amber-200 text-amber-800", house: "", xftyDays: 49, contact: "Maria Lopez", email: "mlopez@johnnywas.com" },
};

const INITIAL_SMS = [
  { id: "s1", code: "023627", desc: "Amira Pullover - S27 SMS RICHA", category: "LillyLounge", buyer: "Lilly Pulitzer", season: "SP27", units: 2100, inTna: true },
  { id: "s2", code: "022284", desc: "Arley Cotton Jersey Midi Dress", category: "Knit Dresses", buyer: "Lilly Pulitzer", season: "SP27", units: 3000, inTna: false },
  { id: "s3", code: "022424", desc: "Ashlee Button Front Pullover", category: "LillyLounge", buyer: "Lilly Pulitzer", season: "SP27", units: 2300, inTna: false },
  { id: "s4", code: "023130", desc: "Aubra 5\" Short", category: "LillyLounge", buyer: "Lilly Pulitzer", season: "SP27", units: 1850, inTna: false },
  { id: "s5", code: "024307", desc: "Aubra 5\" Short", category: "LillyLounge", buyer: "Lilly Pulitzer", season: "SP27", units: 2050, inTna: false },
  { id: "s6", code: "014613", desc: "Ballad Long Sleeve Sweatshirt", category: "LillyLounge", buyer: "Lilly Pulitzer", season: "SP27", units: 1700, inTna: false },
  { id: "s7", code: "014614", desc: "Ballad Long Sleeve Sweatshirt", category: "LillyLounge", buyer: "Lilly Pulitzer", season: "SP27", units: 2800, inTna: false },
  { id: "s8", code: "023475", desc: "Caleb Knit Top", category: "Knit Tops", buyer: "Lilly Pulitzer", season: "SP27", units: 2700, inTna: false },
  { id: "s9", code: "022370", desc: "Carmel Cotton Jersey Dress", category: "Knit Dresses", buyer: "Lilly Pulitzer", season: "SP27", units: 3700, inTna: false },
  { id: "s10", code: "023890", desc: "Darcy Pullover", category: "LillyLounge", buyer: "Lilly Pulitzer", season: "SP27", units: 1900, inTna: false },
];
const SMS_PROJ = [
  { buyer: "Lilly Pulitzer", season: "SP27", totalStyles: 30, totalUnits: 71100 },
  { buyer: "Talbots", season: "FL26", totalStyles: 45, totalUnits: 25000 },
];

const mkMs = (name, planned, who, status, blocks, rounds) => ({ id: name.toLowerCase().replace(/\s/g, "-"), name, planned, actual: status === "done" ? planned : null, who, status, blocks: blocks || 0, ...(rounds ? { rounds } : {}) });

const INIT_ORDERS = [
  {
    id: "1", po: "023627", buyer: "Lilly Pulitzer", style: "023627", season: "SP27", cycle: 130,
    fabricCommit: "2026-06-20", xfty: "2026-10-01", ih: "2026-11-19", units: 2100,
    milestones: [
      mkMs("Fabric commitment", "2026-06-20", "Merchandiser", "done"),
      mkMs("Fabric ordered", "2026-06-21", "Merchandiser", "done"),
      mkMs("Lab dip", "2026-06-25", "Factory/Buyer", "overdue", 9, [
        { label: "R1 Sub", date: "2026-06-25", status: "done" }, { label: "R1 App", date: "2026-07-01", status: "overdue" },
        { label: "R2 Sub", date: "2026-07-05", status: "pending" }, { label: "R2 App", date: "2026-07-10", status: "pending" },
        { label: "R3 Sub", date: "2026-07-14", status: "pending" }, { label: "R3 App", date: "2026-07-19", status: "pending" },
      ]),
      mkMs("Fit sample", "2026-07-02", "Factory/Buyer", "atrisk", 7, [
        { label: "R1 Sub", date: "2026-07-02", status: "atrisk" }, { label: "R1 App", date: "2026-07-08", status: "pending" },
        { label: "R2 Sub", date: "2026-07-20", status: "pending" }, { label: "R2 App", date: "2026-07-26", status: "pending" },
        { label: "R3 Sub", date: "2026-08-07", status: "pending" }, { label: "R3 App", date: "2026-08-13", status: "pending" },
      ]),
      mkMs("FOB submission", "2026-09-01", "Merchandiser", "upcoming", 5),
      mkMs("FOB approval", "2026-09-08", "Buyer", "upcoming", 4),
      mkMs("FPT", "2026-09-12", "Factory/Lab", "upcoming", 3),
      mkMs("GPT", "2026-09-17", "Factory/Lab", "upcoming", 2),
      mkMs("PP sample", "2026-09-29", "Factory/Buyer", "upcoming", 1),
      mkMs("PCD", "2026-10-06", "Factory", "upcoming"),
      mkMs("Ex-factory", "2026-10-01", "Factory", "upcoming"),
      mkMs("In-house", "2026-11-19", "Buyer", "upcoming"),
    ],
    logs: [
      { date: "2026-07-01", by: "Gaurika", text: "Lab dip R1 submitted. Waiting for Lilly Pulitzer approval." },
      { date: "2026-06-21", by: "Gaurika", text: "Fabric ordered. Amira Pullover 023627." },
    ], docs: [{ name: "LP_SMS_S27.xlsx" }],
  },
  {
    id: "2", po: "30162201", buyer: "Tommy Bahama", style: "TB-990", season: "FL26", cycle: 130,
    fabricCommit: "2026-04-15", xfty: "2026-08-25", ih: "2026-10-14", units: 9200,
    milestones: [
      mkMs("Fabric commitment", "2026-04-15", "Merchandiser", "done"),
      mkMs("Fabric ordered", "2026-04-16", "Merchandiser", "done"),
      mkMs("Lab dip", "2026-04-20", "Factory/Buyer", "done"),
      mkMs("Fit sample", "2026-04-27", "Factory/Buyer", "done"),
      mkMs("FOB submission", "2026-06-10", "Merchandiser", "done"),
      mkMs("FOB approval", "2026-06-17", "Buyer", "done"),
      mkMs("FPT", "2026-07-03", "Factory/Lab", "upcoming", 5),
      mkMs("GPT", "2026-07-08", "Factory/Lab", "upcoming", 4),
      mkMs("PP sample", "2026-07-20", "Factory/Buyer", "upcoming", 2),
      mkMs("PCD", "2026-07-27", "Factory", "upcoming"),
      mkMs("Ex-factory", "2026-08-25", "Factory", "upcoming"),
      mkMs("In-house", "2026-10-14", "Buyer", "upcoming"),
    ],
    logs: [{ date: "2026-06-28", by: "Gaurika", text: "FPT samples sent to SGS lab." }],
    docs: [{ name: "TB_PO_30162201.pdf" }],
  },
];

const fmt = (d) => { if (!d) return "—"; return new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short" }); };
const daysFrom = (d) => { const t = new Date(); t.setHours(0,0,0,0); return Math.round((new Date(d + "T00:00:00") - t) / 86400000); };
const getHealth = (o) => o.milestones.some(m => m.status === "overdue") ? "overdue" : o.milestones.some(m => m.status === "atrisk") ? "atrisk" : "ontrack";

function Pill({ status, planned }) {
  const d = planned ? daysFrom(planned) : null;
  const txt = status === "done" ? "Done" : status === "overdue" ? `${Math.abs(d)}d overdue` : status === "atrisk" ? `${d}d left` : d !== null ? `${d}d` : "";
  const c = status === "done" ? "bg-gray-200 text-gray-600" : status === "overdue" ? "bg-red-100 text-red-800" : status === "atrisk" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800";
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md whitespace-nowrap ${c}`}>{txt}</span>;
}
function Chip({ buyer }) { return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${BUYERS[buyer]?.color}`}>{buyer}</span>; }
function Dots({ milestones }) { return <div className="flex gap-[3px]">{milestones.map((m, i) => <div key={i} className={`w-[5px] h-[5px] rounded-full ${m.status === "done" ? "bg-emerald-500" : m.status === "overdue" ? "bg-red-500" : m.status === "atrisk" ? "bg-amber-500" : "bg-gray-300"}`} />)}</div>; }

function Sidebar({ page, setPage }) {
  const items = [{ id: "dashboard", icon: LayoutDashboard }, { id: "orders", icon: ListChecks }, { id: "buyers", icon: Building2 }, { id: "calendar", icon: CalIcon }];
  return (
    <div className="w-[52px] bg-white border-r border-gray-200 flex flex-col items-center py-3 gap-1 flex-shrink-0">
      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center mb-3"><GitBranch className="w-4 h-4 text-white" /></div>
      {items.map(it => <button key={it.id} onClick={() => setPage(it.id)} className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${page === it.id ? "bg-purple-100 text-purple-700" : "text-gray-400 hover:bg-gray-100"}`}><it.icon className="w-[18px] h-[18px]" /></button>)}
      <div className="flex-1" />
      <button className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100"><Settings className="w-[18px] h-[18px]" /></button>
    </div>
  );
}

function Card({ order, onClick }) {
  const crit = order.milestones.find(m => m.status === "overdue" || m.status === "atrisk") || order.milestones.find(m => m.status === "upcoming");
  const h = getHealth(order);
  const bdr = h === "overdue" ? "border-l-red-500" : h === "atrisk" ? "border-l-amber-500" : "border-l-emerald-500";
  const critBg = h === "overdue" ? "bg-red-50" : h === "atrisk" ? "bg-amber-50" : "bg-gray-50";
  return (
    <div onClick={onClick} className={`bg-white border border-gray-200 rounded-lg p-3 cursor-pointer hover:shadow-sm transition-all border-l-[3px] ${bdr}`}>
      <div className="flex items-center gap-1.5 mb-1.5"><Chip buyer={order.buyer} />{BUYERS[order.buyer]?.house && <span className="text-[9px] text-gray-500">via {BUYERS[order.buyer].house}</span>}</div>
      <div className="text-[13px] font-semibold text-gray-900 mb-0.5">PO {order.po}</div>
      <div className="text-[11px] text-gray-500 mb-2">{order.style} · {order.season} · {order.cycle}d</div>
      {crit && <div className={`rounded-md p-2 mb-2 ${critBg}`}>
        <div className="flex items-center gap-1.5">{crit.status === "overdue" ? <AlertCircle className="w-3.5 h-3.5 text-red-600" /> : crit.status === "atrisk" ? <Clock className="w-3.5 h-3.5 text-amber-600" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}<span className="text-[11px] font-semibold text-gray-900">{crit.name}</span></div>
        <div className="text-[10px] text-gray-600 mt-0.5 ml-5">{crit.status === "overdue" ? `${Math.abs(daysFrom(crit.planned))}d overdue` : `Due in ${Math.abs(daysFrom(crit.planned))}d`}{crit.blocks > 0 && <span className="text-red-700 font-semibold"> · blocks {crit.blocks}</span>}</div>
      </div>}
      <Dots milestones={order.milestones} />
      <div className="flex items-center justify-between mt-2"><span className="text-[10px] text-gray-500">X-Fty: {fmt(order.xfty)} · IH: {fmt(order.ih)}</span>{crit && <Pill status={crit.status} planned={crit.planned} />}</div>
    </div>
  );
}

function Dashboard({ orders, sms, smsProj, onSelect, onNewOrder, onAddTna, onUploadSms }) {
  const [smsSearch, setSmsSearch] = useState("");
  const fileInputRef = { current: null };
  const overdue = orders.filter(o => getHealth(o) === "overdue");
  const atrisk = orders.filter(o => getHealth(o) === "atrisk");
  const pendingStyles = sms.filter(s => !s.inTna);
  const inTnaStyles = sms.filter(s => s.inTna);
  const seasonGroups = {}; orders.forEach(o => { if (!seasonGroups[o.season]) seasonGroups[o.season] = []; seasonGroups[o.season].push(o); });
  smsProj.forEach(p => { if (!seasonGroups[p.season]) seasonGroups[p.season] = []; });
  const sColors = { SP27: "bg-green-200 text-green-800", FL26: "bg-orange-200 text-orange-800", RS26: "bg-blue-200 text-blue-800" };

  const filteredPending = smsSearch ? pendingStyles.filter(s => s.code.includes(smsSearch) || s.desc.toLowerCase().includes(smsSearch.toLowerCase()) || s.category.toLowerCase().includes(smsSearch.toLowerCase())) : pendingStyles;

  // Find matching order for inTNA styles
  const getOrderForStyle = (style) => orders.find(o => o.po === style.code || o.style === style.code);

  const handleFileClick = () => { if (fileInputRef.current) fileInputRef.current.click(); };
  const handleFileChange = (e) => { const file = e.target.files?.[0]; if (file) { onUploadSms(file); } e.target.value = ""; };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <input type="file" accept=".xlsx,.xls,.csv,.pdf" ref={el => fileInputRef.current = el} onChange={handleFileChange} className="hidden" />
      <div className="px-4 py-2.5 border-b border-gray-200 flex items-center justify-between bg-white">
        <div><div className="text-[15px] font-semibold text-gray-900">Good morning</div><div className="text-[11px] text-gray-500">Tuesday, 8 July 2026 · Richa Global Exports</div></div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-100 rounded-lg text-gray-500 text-[11px]"><Search className="w-3.5 h-3.5" /><input value={smsSearch} onChange={e => setSmsSearch(e.target.value)} placeholder="Search styles..." className="border-none outline-none bg-transparent text-gray-700 text-[11px] w-24" /></div>
          <button className="p-1.5 rounded-lg bg-gray-100 text-gray-500 relative"><Bell className="w-4 h-4" />{overdue.length > 0 && <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{overdue.length}</div>}</button>
          <button onClick={handleFileClick} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg text-[11px] text-gray-700 font-medium hover:bg-gray-200"><Upload className="w-3.5 h-3.5" /> Upload SMS</button>
          <button onClick={onNewOrder} className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white text-[11px] font-semibold rounded-lg hover:bg-purple-700"><Plus className="w-3.5 h-3.5" /> New order</button>
        </div>
      </div>

      <div className="flex gap-2 px-4 py-3 border-b border-gray-200 bg-white">
        {[{ l: "Active orders", v: orders.length, c: "text-gray-900" }, { l: "Total units", v: orders.reduce((s,o) => s + o.units, 0).toLocaleString(), c: "text-gray-900" }, { l: "Delayed", v: overdue.length, c: overdue.length > 0 ? "text-red-700" : "text-gray-400", bg: overdue.length > 0 ? "bg-red-50 border-red-200" : "bg-gray-50" }, { l: "Pending TNA", v: pendingStyles.length, c: pendingStyles.length > 0 ? "text-amber-700" : "text-gray-400", bg: pendingStyles.length > 0 ? "bg-amber-50 border-amber-200" : "bg-gray-50" }].map(s =>
          <div key={s.l} className={`flex-1 rounded-lg px-3 py-2.5 text-center border ${s.bg || "bg-gray-50"} border-gray-200`}><div className={`text-xl font-bold ${s.c}`}>{s.v}</div><div className="text-[10px] text-gray-500 mt-0.5">{s.l}</div></div>
        )}
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* SMS STYLES KANBAN */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Table2 className="w-4 h-4 text-purple-600" />
            <span className="text-[13px] font-semibold text-gray-900">SMS styles</span>
            {smsProj.map((p, i) => <span key={i} className="text-[11px] text-gray-500">· {p.buyer} {p.season} · {p.totalStyles} styles · {p.totalUnits.toLocaleString()} projected</span>)}
          </div>
          <div className="flex gap-3">
            {/* PENDING TNA column */}
            <div className="flex-1 min-w-0 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-[12px] font-semibold text-amber-700">Pending TNA</span>
                <span className="text-[11px] text-gray-500 bg-gray-200 px-1.5 py-0.5 rounded-full font-semibold">{filteredPending.length}</span>
              </div>
              {filteredPending.map(s => (
                <div key={s.id} className="bg-white border border-gray-200 rounded-lg p-3 border-l-[3px] border-l-amber-400 hover:shadow-sm transition-all">
                  <div className="flex items-center gap-1.5 mb-1.5"><Chip buyer={s.buyer} /><span className="text-[9px] text-gray-500">{s.season}</span></div>
                  <div className="text-[13px] font-semibold text-gray-900 mb-0.5">{s.code}</div>
                  <div className="text-[11px] text-gray-500 mb-1">{s.desc}</div>
                  <div className="text-[10px] text-gray-400 mb-2">{s.category} · {s.units.toLocaleString()} units</div>
                  <button onClick={() => onAddTna(s)} className="text-[10px] font-semibold px-3 py-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-700 w-full">+ Add to TNA</button>
                </div>
              ))}
            </div>

            {/* IN TNA column */}
            <div className="flex-1 min-w-0 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-[12px] font-semibold text-emerald-700">In TNA</span>
                <span className="text-[11px] text-gray-500 bg-gray-200 px-1.5 py-0.5 rounded-full font-semibold">{inTnaStyles.length}</span>
              </div>
              {inTnaStyles.map(s => {
                const ord = getOrderForStyle(s);
                const health = ord ? getHealth(ord) : null;
                const crit = ord ? ord.milestones.find(m => m.status === "overdue" || m.status === "atrisk") : null;
                const borderC = health === "overdue" ? "border-l-red-500" : health === "atrisk" ? "border-l-amber-500" : "border-l-emerald-500";
                const critBg = health === "overdue" ? "bg-red-50" : health === "atrisk" ? "bg-amber-50" : "bg-emerald-50";
                return (
                  <div key={s.id} onClick={() => ord && onSelect(ord)} className={`bg-white border border-gray-200 rounded-lg p-3 border-l-[3px] ${borderC} hover:shadow-sm transition-all ${ord ? "cursor-pointer" : ""}`}>
                    <div className="flex items-center gap-1.5 mb-1.5"><Chip buyer={s.buyer} /><span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">In TNA ✓</span></div>
                    <div className="text-[13px] font-semibold text-gray-900 mb-0.5">{s.code}</div>
                    <div className="text-[11px] text-gray-500 mb-1">{s.desc}</div>
                    <div className="text-[10px] text-gray-400 mb-2">{s.category} · {s.units.toLocaleString()} units</div>
                    {crit && <div className={`rounded-md p-2 ${critBg}`}>
                      <div className="flex items-center gap-1.5">{crit.status === "overdue" ? <AlertCircle className="w-3 h-3 text-red-600" /> : crit.status === "atrisk" ? <Clock className="w-3 h-3 text-amber-600" /> : <CheckCircle2 className="w-3 h-3 text-emerald-600" />}<span className="text-[10px] font-semibold text-gray-900">{crit.name}</span></div>
                      <div className="text-[9px] text-gray-600 mt-0.5 ml-[18px]">{crit.status === "overdue" ? `${Math.abs(daysFrom(crit.planned))}d overdue` : `Due in ${Math.abs(daysFrom(crit.planned))}d`}{crit.blocks > 0 && <span className="text-red-700 font-bold"> · blocks {crit.blocks}</span>}</div>
                    </div>}
                    {ord && !crit && <div className="rounded-md p-2 bg-emerald-50"><div className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-600" /><span className="text-[10px] font-semibold text-emerald-700">All on track</span></div></div>}
                  </div>
                );
              })}
              {inTnaStyles.length === 0 && <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-8 text-center text-[11px] text-gray-400">No styles in TNA yet</div>}
            </div>
          </div>
        </div>

        {/* SEASON SUMMARY */}
        <div>
          <div className="text-[13px] font-semibold text-gray-900 mb-2">Season summary</div>
          <div className="space-y-2">
            {Object.entries(seasonGroups).map(([season, sOrds]) => {
              const tot = sOrds.reduce((s, o) => s + o.units, 0);
              const ovd = sOrds.filter(o => getHealth(o) === "overdue").length;
              const ar = sOrds.filter(o => getHealth(o) === "atrisk").length;
              const proj = smsProj.filter(p => p.season === season);
              const pendSms = sms.filter(s => s.season === season && !s.inTna);
              const byBuyer = {}; sOrds.forEach(o => { if (!byBuyer[o.buyer]) byBuyer[o.buyer] = { n: 0, u: 0 }; byBuyer[o.buyer].n++; byBuyer[o.buyer].u += o.units; });
              return (
                <div key={season} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-4 py-2.5 flex items-center gap-2 border-b border-gray-100">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md ${sColors[season] || "bg-gray-200 text-gray-700"}`}>{season}</span>
                    {ovd > 0 && <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-md">{ovd} delayed</span>}
                    {ar > 0 && <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md">{ar} at risk</span>}
                    <span className="text-[11px] text-gray-500 ml-auto">{sOrds.length} PO{sOrds.length !== 1 ? "s" : ""} · {tot.toLocaleString()} units confirmed</span>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-gray-100 border-b border-gray-100">
                    <div className="px-4 py-2.5 text-center"><div className="text-lg font-bold text-emerald-700">{sOrds.length || "—"}</div><div className="text-[10px] text-gray-500">Confirmed styles</div></div>
                    <div className="px-4 py-2.5 text-center"><div className="text-lg font-bold text-emerald-700">{tot > 0 ? tot.toLocaleString() : "—"}</div><div className="text-[10px] text-gray-500">Confirmed units</div></div>
                  </div>
                  {proj.length > 0 && <div className="px-4 py-2 border-b border-gray-100">
                    <div className="text-[10px] text-gray-400 font-medium mb-1.5">Projected (SMS sheet)</div>
                    {proj.map((p, i) => <div key={i} className="flex items-center gap-2 py-1">
                      <Chip buyer={p.buyer} /><span className="text-[11px] text-gray-600">{p.totalStyles} styles · {p.totalUnits.toLocaleString()} units</span>
                      {pendSms.length > 0 && <span className="text-[10px] font-bold text-amber-700 ml-auto">{pendSms.length} pending TNA</span>}
                    </div>)}
                  </div>}
                  {Object.keys(byBuyer).length > 0 && <div className="px-4 py-1.5">{Object.entries(byBuyer).map(([b, d]) => <div key={b} className="flex items-center gap-2 py-1.5"><Chip buyer={b} /><span className="text-[11px] text-gray-600">{d.n} style{d.n > 1 ? "s" : ""} · {d.u.toLocaleString()} units</span></div>)}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function CalendarView({ orders }) {
  const [month, setMonth] = useState(new Date(2026, 6, 1)); // July 2026
  const year = month.getFullYear(); const mo = month.getMonth();
  const firstDay = new Date(year, mo, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, mo + 1, 0).getDate();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1; // Monday start
  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const msByDate = {};
  orders.forEach(o => o.milestones.forEach(m => {
    if (!m.planned) return;
    const d = new Date(m.planned + "T00:00:00");
    if (d.getMonth() === mo && d.getFullYear() === year) {
      const day = d.getDate();
      if (!msByDate[day]) msByDate[day] = [];
      msByDate[day].push({ ...m, po: o.po, buyer: o.buyer });
    }
  }));

  const prev = () => setMonth(new Date(year, mo - 1, 1));
  const next = () => setMonth(new Date(year, mo + 1, 1));
  const mName = month.toLocaleString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="px-4 py-2.5 border-b border-gray-200 bg-white flex items-center justify-between">
        <div className="text-[15px] font-semibold text-gray-900">Calendar</div>
        <div className="flex items-center gap-3">
          <button onClick={prev} className="p-1 rounded hover:bg-gray-100"><ChevronLeft className="w-4 h-4 text-gray-600" /></button>
          <span className="text-[13px] font-semibold text-gray-900 w-40 text-center">{mName}</span>
          <button onClick={next} className="p-1 rounded hover:bg-gray-100"><ChevronRight className="w-4 h-4 text-gray-600" /></button>
        </div>
        <div />
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-7 bg-white border border-gray-200 rounded-lg overflow-hidden">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => <div key={d} className="px-2 py-2 text-[10px] font-semibold text-gray-500 text-center bg-gray-50 border-b border-gray-200">{d}</div>)}
          {cells.map((day, i) => {
            const events = day ? msByDate[day] || [] : [];
            const isToday = day === 8 && mo === 6 && year === 2026;
            return <div key={i} className={`min-h-[72px] border-b border-r border-gray-100 px-1 py-1 ${day ? "bg-white" : "bg-gray-50"}`}>
              {day && <div className={`text-[11px] font-medium mb-0.5 ${isToday ? "w-5 h-5 bg-purple-600 text-white rounded-full flex items-center justify-center" : "text-gray-500"}`}>{day}</div>}
              {events.slice(0, 3).map((e, j) => {
                const bg = e.status === "overdue" ? "bg-red-500 text-white" : e.status === "atrisk" ? "bg-amber-400 text-white" : e.status === "done" ? "bg-emerald-500 text-white" : "bg-purple-200 text-purple-800";
                return <div key={j} className={`text-[8px] font-semibold px-1 py-0.5 rounded mb-0.5 truncate ${bg}`}>{e.name}</div>;
              })}
              {events.length > 3 && <div className="text-[8px] text-gray-400 font-medium">+{events.length - 3} more</div>}
            </div>;
          })}
        </div>
      </div>
    </div>
  );
}

function Detail({ order, onBack }) {
  const [showDone, setShowDone] = useState(false);
  const att = order.milestones.filter(m => m.status === "overdue" || m.status === "atrisk");
  const up = order.milestones.filter(m => m.status === "upcoming");
  const done = order.milestones.filter(m => m.status === "done");
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="px-4 py-2.5 border-b border-gray-200 bg-white flex items-center gap-2">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-700"><ArrowLeft className="w-4 h-4" /></button>
        <span className="text-[11px] text-gray-400">Dashboard</span><ChevronRight className="w-3 h-3 text-gray-300" /><span className="text-[11px] text-gray-900 font-semibold">PO {order.po}</span>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-base font-bold text-gray-900">PO {order.po}</span><Chip buyer={order.buyer} />
              {BUYERS[order.buyer]?.house && <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded font-medium">via {BUYERS[order.buyer].house}</span>}
              <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{order.season}</span>
              <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{order.cycle}d</span>
            </div>
            <div className="flex gap-4 text-[11px] text-gray-600 mb-3"><span>Committed: {fmt(order.fabricCommit)}</span><span>X-Fty: {fmt(order.xfty)}</span><span>IH: {fmt(order.ih)}</span><span className="font-semibold">{order.units.toLocaleString()} units</span></div>
            <div className="flex gap-2"><button className="text-[10px] px-2.5 py-1 rounded-md bg-purple-100 text-purple-700 font-semibold">Auto cascade</button><button className="text-[10px] px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 font-medium">Edit</button></div>
          </div>
          <div className="flex items-center gap-2 mb-4"><div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(done.length / order.milestones.length) * 100}%` }} /></div><span className="text-[10px] text-gray-500 font-medium whitespace-nowrap">{done.length} of {order.milestones.length} done</span></div>

          {att.length > 0 && <><div className="flex items-center gap-1.5 mb-2"><AlertCircle className="w-4 h-4 text-red-600" /><span className="text-[12px] font-semibold text-red-700">Needs attention ({att.length})</span></div>
          {att.map(m => <div key={m.id} className="bg-white border border-gray-200 rounded-lg mb-2 border-l-[3px] border-l-red-500 overflow-hidden">
            <div className="flex items-center px-3 py-2.5 gap-2"><div className={`w-3 h-3 rounded-full flex-shrink-0 ${m.status === "overdue" ? "bg-red-500" : "bg-amber-500"}`} /><div className="flex-1"><div className="text-[12px] font-semibold text-gray-900">{m.name}</div><div className="text-[10px] text-gray-500">{m.who}</div></div><span className="text-[11px] text-gray-600">{fmt(m.planned)}</span><Pill status={m.status} planned={m.planned} /></div>
            {m.blocks > 0 && <div className="px-3 pb-1.5 ml-5 flex items-center gap-1 text-[10px] text-red-700 font-semibold"><AlertCircle className="w-3 h-3" /> Blocking {m.blocks} downstream milestones</div>}
            {m.rounds && <div className="px-3 pb-2.5 ml-5 space-y-0.5">{m.rounds.map((r, i) => <div key={i} className="flex items-center gap-2 py-1 border-t border-gray-100"><div className={`w-[7px] h-[7px] rounded-full flex-shrink-0 ${r.status === "done" ? "bg-emerald-500" : r.status === "overdue" ? "bg-red-500" : r.status === "atrisk" ? "bg-amber-500" : "bg-gray-300"}`} /><span className={`text-[10px] flex-1 ${r.status === "overdue" || r.status === "atrisk" ? "font-semibold text-gray-900" : "text-gray-500"}`}>{r.label}</span><span className={`text-[10px] ${r.status === "overdue" ? "text-red-700 font-semibold" : "text-gray-500"}`}>{fmt(r.date)}</span><span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${r.status === "done" ? "bg-emerald-100 text-emerald-700" : r.status === "overdue" ? "bg-red-100 text-red-700" : r.status === "atrisk" ? "bg-amber-100 text-amber-700" : "bg-gray-200 text-gray-500"}`}>{r.status === "done" ? "Done" : r.status === "overdue" ? `${Math.abs(daysFrom(r.date))}d` : r.status === "atrisk" ? `${daysFrom(r.date)}d` : "Pending"}</span></div>)}</div>}
          </div>)}</>}

          {up.length > 0 && <><div className="flex items-center gap-1.5 mt-4 mb-2"><Clock className="w-4 h-4 text-gray-400" /><span className="text-[12px] font-semibold text-gray-600">Upcoming ({up.length})</span></div>
          {up.map(m => <div key={m.id} className="bg-white border border-gray-200 rounded-lg mb-1.5 flex items-center px-3 py-2 gap-2"><div className="w-3 h-3 rounded-full bg-gray-300 flex-shrink-0" /><div className="flex-1"><span className="text-[12px] text-gray-700 font-medium">{m.name}</span><span className="text-[10px] text-gray-500 ml-2">{m.who}</span></div><span className="text-[11px] text-gray-500">{fmt(m.planned)}</span><Pill status="upcoming" planned={m.planned} /></div>)}</>}

          {done.length > 0 && <div className="mt-4"><button onClick={() => setShowDone(!showDone)} className="flex items-center gap-1.5 text-[11px] text-gray-500 hover:text-gray-700 font-medium mb-2">{showDone ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}Completed ({done.length})</button>{showDone && done.map(m => <div key={m.id} className="bg-gray-50 border border-gray-100 rounded-lg mb-1 flex items-center px-3 py-2 gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /><span className="text-[12px] text-gray-400 flex-1">{m.name}</span><span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-200 text-gray-500 font-medium">Done</span></div>)}</div>}
        </div>
        <div className="w-[220px] border-l border-gray-200 bg-gray-50 flex flex-col overflow-auto text-[11px]">
          <div className="p-3 border-b border-gray-200"><div className="font-semibold text-gray-700 flex items-center gap-1.5 mb-2"><MessageSquare className="w-3 h-3" /> Activity log</div>{order.logs.map((l, i) => <div key={i} className="border-b border-gray-200 pb-2 mb-2"><div className="flex justify-between text-[9px] text-gray-400 mb-0.5"><span className="font-semibold text-gray-600">{l.by}</span><span>{fmt(l.date)}</span></div><div className="text-gray-600 leading-relaxed">{l.text}</div></div>)}<textarea className="w-full mt-1 border border-gray-200 rounded-md px-2 py-1.5 text-[11px] bg-white resize-none" rows={2} placeholder="Add a note..." /><button className="mt-1.5 text-[10px] px-2.5 py-1 bg-purple-600 text-white rounded-md font-semibold">Add update</button></div>
          <div className="p-3 border-b border-gray-200"><div className="font-semibold text-gray-700 flex items-center gap-1.5 mb-2"><FileText className="w-3 h-3" /> Documents</div>{order.docs.map((d, i) => <div key={i} className="flex items-center gap-1.5 py-1.5 border-b border-gray-100"><FileText className="w-3 h-3 text-gray-400" /><span className="text-gray-600 flex-1 truncate">{d.name}</span><span className="text-purple-600 text-[10px] font-medium">View</span></div>)}<div className="mt-2 border-2 border-dashed border-gray-300 rounded-md py-2.5 text-center text-[10px] text-gray-500 cursor-pointer hover:bg-gray-100 font-medium"><Upload className="w-3 h-3 inline mr-1" /> Upload</div></div>
          <div className="p-3"><div className="font-semibold text-gray-700 flex items-center gap-1.5 mb-2"><User className="w-3 h-3" /> Buyer</div><div className="font-semibold text-gray-900">{BUYERS[order.buyer]?.contact}</div><div className="text-[10px] text-gray-500">{BUYERS[order.buyer]?.house || order.buyer}</div><div className="text-[10px] text-purple-700 font-medium mt-1">{BUYERS[order.buyer]?.email}</div></div>
        </div>
      </div>
    </div>
  );
}

function OrdersKanban({ orders, onSelect, onNewOrder }) {
  const [filterBuyer, setFilterBuyer] = useState("All");
  const [filterSeason, setFilterSeason] = useState("All");
  const [search, setSearch] = useState("");
  const filtered = orders.filter(o => {
    if (filterBuyer !== "All" && o.buyer !== filterBuyer) return false;
    if (filterSeason !== "All" && o.season !== filterSeason) return false;
    if (search && !o.po.includes(search) && !o.style.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const overdue = filtered.filter(o => getHealth(o) === "overdue");
  const atrisk = filtered.filter(o => getHealth(o) === "atrisk");
  const ontrack = filtered.filter(o => getHealth(o) === "ontrack");
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="px-4 py-2.5 border-b border-gray-200 bg-white flex items-center justify-between">
        <div className="text-[15px] font-semibold text-gray-900">All orders</div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-500">{filtered.length} orders</span>
          <button onClick={onNewOrder} className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white text-[11px] font-semibold rounded-lg hover:bg-purple-700"><Plus className="w-3.5 h-3.5" /> New order</button>
        </div>
      </div>
      <div className="px-4 py-2.5 border-b border-gray-200 bg-white flex items-center gap-2">
        <select value={filterBuyer} onChange={e => setFilterBuyer(e.target.value)} className="text-[11px] border border-gray-300 rounded-lg px-2.5 py-1.5 text-gray-700 bg-white font-medium"><option>All</option>{BUYER_LIST.map(b => <option key={b}>{b}</option>)}</select>
        <select value={filterSeason} onChange={e => setFilterSeason(e.target.value)} className="text-[11px] border border-gray-300 rounded-lg px-2.5 py-1.5 text-gray-700 bg-white font-medium"><option>All</option>{SEASONS.map(s => <option key={s}>{s}</option>)}</select>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-100 rounded-lg text-gray-500 text-[11px] ml-auto"><Search className="w-3.5 h-3.5" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search PO or style..." className="border-none outline-none bg-transparent text-gray-700 text-[11px] w-32" /></div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="flex gap-3 min-h-full">
          {[{ title: "Overdue", items: overdue, dot: "bg-red-500", hd: "text-red-700" }, { title: "At risk", items: atrisk, dot: "bg-amber-500", hd: "text-amber-700" }, { title: "On track", items: ontrack, dot: "bg-emerald-500", hd: "text-emerald-700" }].map(col =>
            <div key={col.title} className="flex-1 min-w-0 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1"><div className={`w-2.5 h-2.5 rounded-full ${col.dot}`} /><span className={`text-[12px] font-semibold ${col.hd}`}>{col.title}</span><span className="text-[11px] text-gray-500 bg-gray-200 px-1.5 py-0.5 rounded-full font-semibold">{col.items.length}</span></div>
              {col.items.length === 0 && <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-8 text-center text-[11px] text-gray-400">No orders</div>}
              {col.items.map(o => <Card key={o.id} order={o} onClick={() => onSelect(o)} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BuyersPage({ orders, onSelect }) {
  const [sel, setSel] = useState("Talbots");
  const b = BUYERS[sel]; const bo = orders.filter(o => o.buyer === sel);
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="px-4 py-2.5 border-b border-gray-200 bg-white"><div className="text-[15px] font-semibold text-gray-900">Buyers</div></div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[160px] border-r border-gray-200 bg-white p-3 space-y-1">
          {BUYER_LIST.map(x => <button key={x} onClick={() => setSel(x)} className={`w-full text-left px-3 py-2 rounded-lg text-[12px] font-semibold transition-colors ${sel === x ? "bg-purple-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}>{x}</button>)}
        </div>
        <div className="flex-1 overflow-auto p-4 space-y-3">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3"><Chip buyer={sel} />{b.house && <span className="text-[11px] text-gray-500">via {b.house}</span>}</div>
            <div className="grid grid-cols-3 gap-3 text-[11px]"><div><div className="text-gray-500 mb-0.5">Contact</div><div className="font-semibold text-gray-900">{b.contact}</div></div><div><div className="text-gray-500 mb-0.5">Email</div><div className="text-purple-700 font-medium">{b.email}</div></div><div><div className="text-gray-500 mb-0.5">X-Fty to IH</div><div className="font-semibold text-gray-900">{b.xftyDays} days</div></div></div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 text-[11px] font-semibold text-gray-700">Orders ({bo.length})</div>
            {bo.length === 0 ? <div className="px-3 py-8 text-center text-[11px] text-gray-400">No orders for this buyer</div> :
            bo.map(o => <div key={o.id} onClick={() => onSelect(o)} className="flex items-center px-3 py-2.5 border-b border-gray-100 hover:bg-gray-50 cursor-pointer gap-3">
              <div className="flex-1"><div className="text-[12px] font-semibold text-gray-900">PO {o.po}</div><div className="text-[10px] text-gray-500">{o.style} · {o.season}</div></div>
              <span className="text-[11px] text-gray-500">{o.units.toLocaleString()} units</span>
              <Pill status={getHealth(o) === "overdue" ? "overdue" : getHealth(o) === "atrisk" ? "atrisk" : "done"} planned={o.milestones.find(m => m.status === "overdue" || m.status === "atrisk")?.planned} />
              <Dots milestones={o.milestones} />
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function AddOrder({ onSave, onCancel, prefill }) {
  const [step, setStep] = useState(1);
  const [f, setF] = useState({ po: prefill?.code || "", buyer: prefill?.buyer || "Talbots", house: prefill?.buyer === "Talbots" ? "MGF Sourcing US LLC" : "", season: prefill?.season || "FL26", style: prefill?.code || "", desc: prefill?.desc || "", units: prefill?.units?.toString() || "", fc: "", ih: "", cycle: "130" });
  const set = (k, v) => setF(o => ({ ...o, [k]: v }));
  const xf = f.ih ? (() => { const d = new Date(f.ih + "T00:00:00"); d.setDate(d.getDate() - (f.buyer === "Talbots" ? 59 : 49)); return d.toISOString().split("T")[0]; })() : "";
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="px-4 py-2.5 border-b border-gray-200 bg-white flex items-center gap-2"><button onClick={onCancel} className="text-gray-400 hover:text-gray-700"><ArrowLeft className="w-4 h-4" /></button><span className="text-[15px] font-semibold text-gray-900">New order{prefill ? ` — ${prefill.code}` : ""}</span></div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[170px] border-r border-gray-200 bg-white p-4 space-y-3">
          {["Order basics", "Styles", "Dates", "TNA preview"].map((s, i) => <div key={i} className="flex items-center gap-2.5"><div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step > i + 1 ? "bg-emerald-500 text-white" : step === i + 1 ? "bg-purple-600 text-white" : "border-2 border-gray-300 text-gray-400"}`}>{step > i + 1 ? <Check className="w-3 h-3" /> : i + 1}</div><span className={`text-[12px] ${step === i + 1 ? "font-semibold text-gray-900" : "text-gray-400"}`}>{s}</span></div>)}
        </div>
        <div className="flex-1 overflow-auto p-6 max-w-lg">
          {step === 1 && <div>
            <div className="text-lg font-semibold text-gray-900 mb-1">Order basics</div><div className="text-[12px] text-gray-500 mb-5">PO and buyer information</div>
            <div className="space-y-3">
              <div><label className="text-[11px] font-semibold text-gray-700 block mb-1">PO / Style code</label><input value={f.po} onChange={e => set("po", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[12px]" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[11px] font-semibold text-gray-700 block mb-1">Buyer</label><select value={f.buyer} onChange={e => { set("buyer", e.target.value); set("house", e.target.value === "Talbots" ? "MGF Sourcing US LLC" : ""); }} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[12px]">{BUYER_LIST.map(b => <option key={b}>{b}</option>)}</select></div>
                <div><label className="text-[11px] font-semibold text-gray-700 block mb-1">Buying house</label><input value={f.house} onChange={e => set("house", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[12px]" /></div>
              </div>
              <div><label className="text-[11px] font-semibold text-gray-700 block mb-1">Season</label><select value={f.season} onChange={e => set("season", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[12px]">{SEASONS.map(s => <option key={s}>{s}</option>)}</select></div>
            </div>
            <div className="flex justify-end mt-6"><button onClick={() => setStep(2)} className="px-5 py-2 bg-purple-600 text-white text-[12px] font-semibold rounded-lg">Next</button></div>
          </div>}
          {step === 2 && <div>
            <div className="text-lg font-semibold text-gray-900 mb-1">Styles</div><div className="text-[12px] text-gray-500 mb-5">Style details</div>
            <div className="space-y-3">
              <div><label className="text-[11px] font-semibold text-gray-700 block mb-1">Style code</label><input value={f.style} onChange={e => set("style", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[12px]" /></div>
              <div><label className="text-[11px] font-semibold text-gray-700 block mb-1">Description</label><input value={f.desc} onChange={e => set("desc", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[12px]" /></div>
              <div><label className="text-[11px] font-semibold text-gray-700 block mb-1">Units</label><input value={f.units} onChange={e => set("units", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[12px]" /></div>
            </div>
            <div className="flex justify-between mt-6"><button onClick={() => setStep(1)} className="text-[12px] text-gray-500 font-medium">Back</button><button onClick={() => setStep(3)} className="px-5 py-2 bg-purple-600 text-white text-[12px] font-semibold rounded-lg">Next</button></div>
          </div>}
          {step === 3 && <div>
            <div className="text-lg font-semibold text-gray-900 mb-1">Dates</div><div className="text-[12px] text-gray-500 mb-5">Key dates — milestones auto-calculate</div>
            <div className="space-y-3">
              <div><label className="text-[11px] font-semibold text-gray-700 block mb-1">Fabric commitment date</label><input type="date" value={f.fc} onChange={e => set("fc", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[12px]" /></div>
              <div><label className="text-[11px] font-semibold text-gray-700 block mb-1">In-house date</label><input type="date" value={f.ih} onChange={e => set("ih", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[12px]" /></div>
              <div><label className="text-[11px] font-semibold text-gray-700 block mb-1">Ex-factory (auto)</label><input readOnly value={xf ? fmt(xf) : "—"} className="w-full border border-gray-100 bg-gray-100 rounded-lg px-3 py-2 text-[12px] text-gray-500" /></div>
              <div><label className="text-[11px] font-semibold text-gray-700 block mb-1">Cycle (days)</label><input value={f.cycle} onChange={e => set("cycle", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[12px]" /></div>
            </div>
            <div className="flex justify-between mt-6"><button onClick={() => setStep(2)} className="text-[12px] text-gray-500 font-medium">Back</button><button onClick={() => setStep(4)} className="px-5 py-2 bg-purple-600 text-white text-[12px] font-semibold rounded-lg">Preview TNA</button></div>
          </div>}
          {step === 4 && <div>
            <div className="text-lg font-semibold text-gray-900 mb-1">Review TNA</div><div className="text-[12px] text-gray-500 mb-4">Verify before saving</div>
            <div className="grid grid-cols-4 gap-2 mb-3">{[{ l: "Buyer", v: f.buyer }, { l: "PO", v: f.po }, { l: "Season", v: f.season }, { l: "Cycle", v: `${f.cycle}d` }].map(x => <div key={x.l} className="bg-gray-100 rounded-lg p-2.5"><div className="text-[9px] text-gray-500 font-medium">{x.l}</div><div className="text-[13px] font-bold text-gray-900">{x.v || "—"}</div></div>)}</div>
            <div className="grid grid-cols-3 gap-2 mb-4">{[{ l: "Fabric commit", v: f.fc ? fmt(f.fc) : "—" }, { l: "Ex-factory", v: xf ? fmt(xf) : "—" }, { l: "In-house", v: f.ih ? fmt(f.ih) : "—" }].map(x => <div key={x.l} className="bg-gray-100 rounded-lg p-2.5"><div className="text-[9px] text-gray-500 font-medium">{x.l}</div><div className="text-[12px] font-bold text-gray-900">{x.v}</div></div>)}</div>
            <div className="p-3 bg-amber-100 rounded-lg text-[11px] text-amber-800 font-medium flex items-start gap-1.5"><AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /><span>Dates auto-calculated using {f.buyer} rules ({f.buyer === "Talbots" ? 59 : 49}d X-Fty to IH). Adjustable after saving.</span></div>
            <div className="flex justify-between mt-6"><button onClick={() => setStep(3)} className="text-[12px] text-gray-500 font-medium">Back</button><button onClick={() => onSave({ ...f, xf, units: parseInt(f.units) || 0 })} className="px-5 py-2 bg-purple-600 text-white text-[12px] font-semibold rounded-lg flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> Save order</button></div>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default function TrackTaleGM() {
  const [page, setPage] = useState("dashboard");
  const [selOrder, setSelOrder] = useState(null);
  const [orders, setOrders] = useState(INIT_ORDERS);
  const [sms, setSms] = useState(INITIAL_SMS);
  const [newOrder, setNewOrder] = useState(false);
  const [prefill, setPrefill] = useState(null);
  const [uploadToast, setUploadToast] = useState(null);

  const handleAddTna = (s) => { setPrefill(s); setNewOrder(true); };
  const handleUploadSms = (file) => {
    // Simulate extracting styles from the uploaded file
    const newStyles = [
      { id: "u1", code: "025100", desc: file.name.replace(/\.[^/.]+$/, "") + " - Style A", category: "Knit Tops", buyer: "Lilly Pulitzer", season: "SP27", units: 2400, inTna: false },
      { id: "u2", code: "025101", desc: file.name.replace(/\.[^/.]+$/, "") + " - Style B", category: "LillyLounge", buyer: "Lilly Pulitzer", season: "SP27", units: 1800, inTna: false },
      { id: "u3", code: "025102", desc: file.name.replace(/\.[^/.]+$/, "") + " - Style C", category: "Knit Dresses", buyer: "Lilly Pulitzer", season: "SP27", units: 3100, inTna: false },
    ];
    setSms(prev => [...prev, ...newStyles]);
    setUploadToast(`${file.name} uploaded — ${newStyles.length} styles extracted`);
    setTimeout(() => setUploadToast(null), 4000);
  };
  const handleSave = (f) => {
    const o = { id: Date.now().toString(), po: f.po, buyer: f.buyer, style: f.style || f.po, season: f.season, cycle: parseInt(f.cycle) || 130, fabricCommit: f.fc, xfty: f.xf, ih: f.ih, units: f.units,
      milestones: [mkMs("Fabric commitment", f.fc, "Merchandiser", "upcoming", 12), mkMs("Fabric ordered", f.fc, "Merchandiser", "upcoming", 11), mkMs("Lab dip", f.fc, "Factory/Buyer", "upcoming", 9), mkMs("Fit sample", f.fc, "Factory/Buyer", "upcoming", 7), mkMs("FOB submission", f.fc, "Merchandiser", "upcoming", 5), mkMs("FOB approval", f.fc, "Buyer", "upcoming", 4), mkMs("FPT", f.fc, "Factory/Lab", "upcoming", 3), mkMs("GPT", f.fc, "Factory/Lab", "upcoming", 2), mkMs("PP sample", f.fc, "Factory/Buyer", "upcoming", 1), mkMs("PCD", f.fc, "Factory", "upcoming"), mkMs("Ex-factory", f.xf, "Factory", "upcoming"), mkMs("In-house", f.ih, "Buyer", "upcoming")],
      logs: [{ date: new Date().toISOString().split("T")[0], by: "Gaurika", text: `Order created. ${f.buyer} ${f.po}, ${f.season}.` }], docs: [] };
    setOrders(p => [...p, o]);
    if (prefill) setSms(p => p.map(s => s.id === prefill.id ? { ...s, inTna: true } : s));
    setNewOrder(false); setPrefill(null); setPage("dashboard");
  };

  return (
    <div className="flex h-[640px] bg-[#F0F0F5] rounded-xl overflow-hidden border border-gray-300 shadow-sm relative" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      {uploadToast && <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white text-[12px] font-semibold rounded-lg shadow-lg"><CheckCircle2 className="w-4 h-4" />{uploadToast}</div>}
      <Sidebar page={newOrder ? "orders" : selOrder ? "orders" : page} setPage={p => { setPage(p); setSelOrder(null); setNewOrder(false); setPrefill(null); }} />
      {newOrder ? <AddOrder onSave={handleSave} onCancel={() => { setNewOrder(false); setPrefill(null); }} prefill={prefill} /> :
       selOrder ? <Detail order={selOrder} onBack={() => setSelOrder(null)} /> :
       page === "dashboard" ? <Dashboard orders={orders} sms={sms} smsProj={SMS_PROJ} onSelect={setSelOrder} onNewOrder={() => setNewOrder(true)} onAddTna={handleAddTna} onUploadSms={handleUploadSms} /> :
       page === "orders" ? <OrdersKanban orders={orders} onSelect={setSelOrder} onNewOrder={() => setNewOrder(true)} /> :
       page === "buyers" ? <BuyersPage orders={orders} onSelect={setSelOrder} /> :
       page === "calendar" ? <CalendarView orders={orders} /> :
       <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">{page}</div>}
    </div>
  );
}
