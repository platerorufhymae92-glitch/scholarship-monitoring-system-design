'use client'

import { useMemo, useState } from 'react'
import { BarChart3, Bell, BookOpen, CheckCircle2, ChevronDown, CircleUserRound, FileCheck2, GraduationCap, LayoutDashboard, LogOut, Menu, Plus, Search, Settings2, ShieldCheck, Users, X } from 'lucide-react'

type Scholar = { id: string; studentId: string; name: string; program: string; year: number; scholarship: string; status: string; initials: string }

const initialScholars: Scholar[] = [
  { id: '1', studentId: '2021-0456', name: 'Maria Santos', program: 'BS Computer Science', year: 4, scholarship: 'University Merit Grant', status: 'Compliant', initials: 'MS' },
  { id: '2', studentId: '2022-1087', name: 'Juan Dela Cruz', program: 'BS Civil Engineering', year: 3, scholarship: 'City Scholars Program', status: 'For Verification', initials: 'JD' },
  { id: '3', studentId: '2023-0214', name: 'Angela Reyes', program: 'BA Communication', year: 2, scholarship: 'University Merit Grant', status: 'With Deficiency', initials: 'AR' },
  { id: '4', studentId: '2021-0772', name: 'Carlo Mendoza', program: 'BS Accountancy', year: 4, scholarship: 'STEM Excellence Award', status: 'Pending Submission', initials: 'CM' },
  { id: '5', studentId: '2024-0093', name: 'Sofia Garcia', program: 'BS Nursing', year: 1, scholarship: 'Provincial Scholarship', status: 'Active', initials: 'SG' },
]

const nav = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Scholars', icon: Users },
  { label: 'Grade Submissions', icon: FileCheck2 },
  { label: 'Scholarship Programs', icon: BookOpen },
]

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = { Compliant: 'status-green', 'For Verification': 'status-blue', 'With Deficiency': 'status-red', 'Pending Submission': 'status-amber', Active: 'status-slate' }
  return <span className={`status ${styles[status] ?? 'status-slate'}`}><span className="status-dot" />{status}</span>
}

export default function Page() {
  const [active, setActive] = useState('Dashboard')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All statuses')
  const [scholars, setScholars] = useState(initialScholars)
  const [showAdd, setShowAdd] = useState(false)
  const [notice, setNotice] = useState('')

  const filtered = useMemo(() => scholars.filter((scholar) => (scholar.name.toLowerCase().includes(query.toLowerCase()) || scholar.studentId.includes(query)) && (filter === 'All statuses' || scholar.status === filter)), [scholars, query, filter])
  const counts = { total: scholars.length, pending: scholars.filter((s) => s.status === 'For Verification' || s.status === 'Pending Submission').length, compliant: scholars.filter((s) => s.status === 'Compliant').length, deficiency: scholars.filter((s) => s.status === 'With Deficiency').length }

  function addScholar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name'))
    const studentId = String(data.get('studentId'))
    const initials = name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
    setScholars((current) => [{ id: crypto.randomUUID(), studentId, name, program: String(data.get('program')), year: Number(data.get('year')), scholarship: String(data.get('scholarship')), status: 'Active', initials }, ...current])
    setShowAdd(false)
    setNotice('Scholar record created successfully.')
    setTimeout(() => setNotice(''), 3000)
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><GraduationCap size={22} /></div><div><strong>ScholarTrack</strong><span>Scholarship Office</span></div></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav>{nav.map(({ label, icon: Icon }) => <button key={label} className={active === label ? 'nav-item active' : 'nav-item'} onClick={() => setActive(label)}><Icon size={18} />{label}{label === 'Grade Submissions' && <span className="nav-count">3</span>}</button>)}</nav>
      <div className="sidebar-bottom"><button className="nav-item"><Settings2 size={18} />Settings</button><div className="user-card"><div className="avatar small">JD</div><div><strong>Jordan Dizon</strong><span>Administrator</span></div><ChevronDown size={15} /></div></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><button className="mobile-menu" aria-label="Open menu"><Menu size={20} /></button><div className="breadcrumbs"><span>Workspace</span><span>/</span><strong>{active}</strong></div><div className="top-actions"><button className="icon-button" aria-label="Notifications"><Bell size={18} /><i /></button><div className="avatar">JD</div></div></header>
      <div className="page-body">
        <div className="page-heading"><div><p className="eyebrow">TUESDAY, SEPTEMBER 30, 2026</p><h1>Good morning, Jordan</h1><p className="subheading">Here&apos;s what&apos;s happening with your scholars today.</p></div><button className="primary-button" onClick={() => setShowAdd(true)}><Plus size={17} /> Register scholar</button></div>
        {notice && <div className="notice"><CheckCircle2 size={17} />{notice}</div>}
        <section className="stats-grid"><div className="stat-card"><div className="stat-icon indigo"><Users size={19} /></div><div><span>Total scholars</span><strong>{counts.total}</strong><small><b>+8.2%</b> from last semester</small></div></div><div className="stat-card"><div className="stat-icon amber"><FileCheck2 size={19} /></div><div><span>Pending submissions</span><strong>{counts.pending}</strong><small className="muted">Needs your attention</small></div></div><div className="stat-card"><div className="stat-icon green"><CheckCircle2 size={19} /></div><div><span>Compliant scholars</span><strong>{counts.compliant}</strong><small><b>+12.5%</b> from last semester</small></div></div><div className="stat-card"><div className="stat-icon red"><ShieldCheck size={19} /></div><div><span>With deficiency</span><strong>{counts.deficiency}</strong><small className="muted">Review recommended</small></div></div></section>
        <div className="content-grid"><section className="panel scholars-panel"><div className="panel-heading"><div><h2>Scholar overview</h2><p>Monitor your scholars and their current standing.</p></div><button className="text-button" onClick={() => setActive('Scholars')}>View all <span>→</span></button></div><div className="toolbar"><div className="search-box"><Search size={16} /><input aria-label="Search scholars" placeholder="Search by name or student ID..." value={query} onChange={(e) => setQuery(e.target.value)} /></div><select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter scholars"><option>All statuses</option><option>Compliant</option><option>For Verification</option><option>With Deficiency</option><option>Pending Submission</option></select></div><div className="table-wrap"><table><thead><tr><th>Scholar</th><th>Program</th><th>Scholarship</th><th>Status</th><th /></tr></thead><tbody>{filtered.map((scholar) => <tr key={scholar.id}><td><div className="scholar-cell"><div className="avatar scholar-avatar">{scholar.initials}</div><div><strong>{scholar.name}</strong><span>{scholar.studentId}</span></div></div></td><td><span className="cell-main">{scholar.program}</span><span className="cell-sub">Year {scholar.year}</span></td><td>{scholar.scholarship}</td><td><StatusBadge status={scholar.status} /></td><td><button className="more-button" aria-label={`Open ${scholar.name}`}>•••</button></td></tr>)}</tbody></table>{filtered.length === 0 && <div className="empty-state">No scholars match your search.</div>}</div></section><aside className="side-column"><section className="panel progress-panel"><div className="panel-heading"><div><h2>Semester progress</h2><p>First semester, AY 2026–2027</p></div><BarChart3 size={19} className="panel-icon" /></div><div className="progress-ring"><div><strong>68%</strong><span>Overall<br />completion</span></div></div><div className="progress-list"><div><span><i className="dot dot-green" />Verified</span><strong>48 <small>/ 71</small></strong></div><div><span><i className="dot dot-amber" />For verification</span><strong>15 <small>/ 71</small></strong></div><div><span><i className="dot dot-slate" />Pending submission</span><strong>8 <small>/ 71</small></strong></div></div></section><section className="panel action-panel"><div className="action-icon"><FileCheck2 size={19} /></div><div><h3>3 submissions need review</h3><p>Grade submissions are waiting for verification.</p><button className="text-button" onClick={() => setActive('Grade Submissions')}>Review submissions <span>→</span></button></div></section></aside></div>
      </div>
    </main>
    {showAdd && <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setShowAdd(false)}><div className="modal"><div className="modal-heading"><div><h2>Register scholar</h2><p>Add a scholar to your monitoring records.</p></div><button className="close-button" onClick={() => setShowAdd(false)} aria-label="Close"><X size={18} /></button></div><form onSubmit={addScholar}><label>Student ID<input name="studentId" required placeholder="e.g. 2026-0042" /></label><label>Full name<input name="name" required placeholder="e.g. Alex Rivera" /></label><div className="form-row"><label>Degree program<input name="program" required placeholder="BS Information Technology" /></label><label>Year level<select name="year" defaultValue="1"><option>1</option><option>2</option><option>3</option><option>4</option></select></label></div><label>Scholarship program<select name="scholarship" defaultValue="University Merit Grant"><option>University Merit Grant</option><option>City Scholars Program</option><option>STEM Excellence Award</option><option>Provincial Scholarship</option></select></label><div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowAdd(false)}>Cancel</button><button className="primary-button" type="submit">Create scholar</button></div></form></div></div>}
  </div>
}
