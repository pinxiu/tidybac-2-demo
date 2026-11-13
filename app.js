// ============================================================================
// TidyBac 2.0 Interactive Prototype — Core Flows & Subdomain Architecture
// Backed by real operational scenarios discovered on tidybac.com
// ============================================================================

const state = {
  subdomain: "sales", // sales | class | finance | admin | my
  subTab: "leads",
  persona: "betty",   // betty | reeya | ava | charlotte | zhu | parent
  entity: "ALL",
  parentLang: "zh",   // zh | en
  selectedStudentId: "stu-xuni",
  showMeetingParser: false,
  backfillCompleted: false,

  // Subdomain RBAC Matrix (editable in admin.tidybac.com)
  permissions: {
    betty:     { name: "Betty Zhou (周俊驰)", roleTitle: "Founder · Super Admin", entities: ["SOA", "SHA", "IGA"], sales: true,  class: true,  finance: true,  admin: true,  my: true,  teacherOnly: false },
    reeya:     { name: "Ziyu Wang (Reeya)",   roleTitle: "Sales & BD Lead",       entities: ["SOA", "SHA"],        sales: true,  class: false, finance: false, admin: false, my: false, teacherOnly: false },
    ava:       { name: "Jingwei Shi (Ava史老师)", roleTitle: "Academic Coordinator (班主任)", entities: ["SOA", "SHA"], sales: false, class: true,  finance: false, admin: false, my: true,  teacherOnly: false },
    charlotte: { name: "Charlotte Wang",      roleTitle: "Academic Coordinator (班主任)", entities: ["SOA"],        sales: false, class: true,  finance: false, admin: false, my: false, teacherOnly: false },
    zhu:       { name: "朱老师 (Physics)",     roleTitle: "Part-Time Subject Teacher",     entities: ["SOA"],        sales: false, class: true,  finance: false, admin: false, my: false, teacherOnly: true  },
    parent:    { name: "孙栩妮家长 (Parent)",   roleTitle: "Parent WeChat Magic Link",      entities: ["SOA"],        sales: false, class: false, finance: false, admin: false, my: true,  teacherOnly: false }
  },

  // Leads in sales.tidybac.com
  leads: [
    {
      id: "lead-1",
      chineseName: "曾凡曦",
      englishName: "Fanzi Zeng (Holly)",
      wechatId: "holly_zeng2026",
      grade: "G11",
      school: "上海世界外国语中学 (世外)",
      entity: "SOA",
      program: "SOA美高全日制 (1年6门课 · 240H)",
      quotedAmount: 148000,
      currency: "CNY",
      parentPartner: "Rosso罗素",
      subChannel: "Rosso上海顾问推荐",
      commissionRate: 0.15,
      stage: "Paid — Ready to Convert",
      temp: "HOT",
      rep: "Ziyu Wang (Reeya)",
      proofFile: "wechat_first_contact_holly_0912.png",
      linkedStudentId: null
    },
    {
      id: "lead-2",
      chineseName: "胡凯蓝",
      englishName: "Kailan Hu",
      wechatId: "kailan_hu_mom",
      grade: "G11",
      school: "WLSA上海 (WLSA Shanghai)",
      entity: "SOA",
      program: "SOA美高非全日制 (AP Statistics · 40H)",
      quotedAmount: 38000,
      currency: "CNY",
      parentPartner: "翰林国际教育 (Hanlin)",
      subChannel: "翰林小红书 (Xiaohongshu)",
      commissionRate: 0.15,
      stage: "Linked & Enrolled",
      temp: "HOT",
      rep: "Ziyu Wang (Reeya)",
      proofFile: "xhs_dm_kailan_proof.jpg",
      linkedStudentId: "stu-kailan"
    },
    {
      id: "lead-3",
      chineseName: "林恩赐",
      englishName: "Samuel Enci Lin",
      wechatId: "samuel_lin_usa",
      grade: "G10",
      school: "Santa Margarita Catholic HS (US)",
      entity: "SHA",
      program: "SOA置换学分项目 (Honors Chemistry · 40H)",
      quotedAmount: 25000,
      currency: "CNY",
      parentPartner: "小红书 KOL矩阵",
      subChannel: "LesssssisMore_ (小红书博主)",
      commissionRate: 0.15,
      stage: "Interested",
      temp: "WARM",
      rep: "Ziyu Wang (Reeya)",
      proofFile: "xhs_lessismore_chat.png",
      linkedStudentId: null
    }
  ],

  // 2-Level Partner & KOL Hierarchy in sales.tidybac.com
  channels: [
    {
      parentName: "翰林国际教育 (Hanlin Scholars Pte Ltd)",
      category: "SHAREHOLDER / STRATEGIC",
      tier: "T1",
      commission: "15% Revenue Split",
      subChannels: ["翰林小红书 (ONLINE)", "翰林销售 (REFERRAL)", "翰林公众号 (ONLINE)", "翰林直播 (ONLINE)", "翰林视频号 (ONLINE)"],
      publicAccounts: "小红书: @翰林国际教育 | 公众号: 翰林留学院",
      leadsCount: 19,
      enrolledCount: 8,
      attributedRev: "CN¥1,310,000"
    },
    {
      parentName: "三士渡教育 (Stoa Education)",
      category: "B2B AGENCY",
      tier: "T1",
      commission: "15% Commission",
      subChannels: ["三士渡北京顾问组", "三士渡上海顾问组"],
      publicAccounts: "公众号: 三士渡教育",
      leadsCount: 14,
      enrolledCount: 5,
      attributedRev: "CN¥926,000"
    },
    {
      parentName: "Rosso罗素艺术留学",
      category: "B2B AGENCY",
      tier: "T1",
      commission: "15% Commission",
      subChannels: ["Rosso上海校区", "Rosso杭州校区"],
      publicAccounts: "小红书: @Rosso艺术留学",
      leadsCount: 11,
      enrolledCount: 4,
      attributedRev: "CN¥642,000"
    },
    {
      parentName: "小红书个人KOL矩阵 (Xiaohongshu Creators)",
      category: "SOCIAL KOL / DIGITAL",
      tier: "T2",
      commission: "15% Commission / Fixed CPA",
      subChannels: ["LesssssisMore_ (小红书)", "fei老师(个人KOL)", "暴叔留学 (视频号/小红书)", "Kari博士工作室", "Ricky 老师"],
      publicAccounts: "小红书 Handles: @LesssssisMore_ · @fei老师美高 · @暴叔留学",
      leadsCount: 24,
      enrolledCount: 6,
      attributedRev: "CN¥780,000"
    }
  ],

  // Students in class.tidybac.com
  students: [
    {
      id: "stu-xuni",
      code: "STU-2026-00102",
      englishName: "Xuni Sun",
      chineseName: "孙栩妮",
      grade: "G11",
      entity: "SOA",
      program: "SOA美高全日制 (Multi-Year VIP Package)",
      coordinator: "Jingwei Shi (Ava史老师)",
      supportLevel: "HIGH",
      sourcePartner: "三士渡教育 (15%)",
      tuitionAgreed: 420000,
      tuitionPaid: 420000,
      currency: "CNY",
      purchasedHours: 240,
      completedHours: 69.5,
      scheduledHours: 20,
      platformStatus: "Accelerate Education & UC Scout · Avg Quiz 93% (≥90% Target Met)",
      courses: [
        { name: "Honors Physics (线上美高1v1)", term: "2026-2027 Fall", teacher: "朱老师", allocated: 40, consumed: 24.5, status: "On Track" },
        { name: "AP English Language & Comp", term: "2026-2027 Fall", teacher: "杨老师", allocated: 40, consumed: 25.0, status: "On Track" },
        { name: "AP Statistics (线上美高1v1)", term: "2026-2027 Fall", teacher: "郁老师", allocated: 40, consumed: 20.0, status: "On Track" },
        { name: "US History Accelerated", term: "2026-2027 Spring", teacher: "Unassigned (Click + Assign)", allocated: 40, consumed: 0, status: "Needs Teacher" }
      ],
      aiSummaryOldBuggy: "Xuni Sun is currently a Grade 11 student in SOA. Recent notes indicate a need to closely monitor Jingwei's course selections and academic performance, and follow up on his progress in US History and Physics.",
      aiSummaryFixed: "Student: Xuni Sun (孙栩妮, Female, G11, SOA美高全日制) · Advisor (班主任): Jingwei Shi (Ava史老师). Xuni has completed 69.5 of 240 purchased hours across Honors Physics (朱老师), AP English (杨老师), and AP Statistics (郁老师) with a 93% platform quiz average. Next action for Advisor Ava史老师: finalize Spring teacher assignment for US History before Oct 15.",
      notes: [
        {
          title: "10月腾讯会议家长会纪要 (Orientation & Mid-Term Review)",
          author: "Jingwei Shi (Ava史老师 · 班主任)",
          phase: "Academics",
          date: "2026-10-28 20:00",
          visibility: "INTERNAL_STAFF_ONLY",
          contentPlain: "【腾讯会议AI纪要】参会人：孙栩妮妈妈、Ava史老师（班主任）。1. 物理（朱老师）已完成24.5课时，平台Quiz平均分93%，进度正常；2. 内部提醒：上周三英语课学生没开摄像头，作业提交滞后1天，班主任已在班级群督促；3. 下一步：安排春季美国史任课老师。"
        }
      ]
    },
    {
      id: "stu-chengxi",
      code: "STU-2026-00089",
      englishName: "Chengxi Li",
      chineseName: "李承熹",
      grade: "G11",
      entity: "SOA",
      program: "SOA美高非全日制 (Single Credit Course · 40H)",
      coordinator: "Jingwei Shi (Ava史老师)",
      supportLevel: "CRITICAL",
      sourcePartner: "翰林 → 翰林小红书 (15%)",
      tuitionAgreed: 38000,
      tuitionPaid: 38000,
      currency: "CNY",
      purchasedHours: 40,
      completedHours: 64.5,
      scheduledHours: 4,
      platformStatus: "UC Scout · 78% Quiz Avg (Needs ≥90% by June 30)",
      courses: [
        { name: "AP Macroeconomics 1v1", term: "2026-2027 Fall", teacher: "刘老师", allocated: 40, consumed: 64.5, status: "OVER-DELIVERED (161%)" }
      ],
      aiSummaryOldBuggy: "Chengxi Li has taken 64.5 hours of classes.",
      aiSummaryFixed: "CRITICAL HOUR OVERRUN ALERT: Student Chengxi Li (李承熹, G11) has consumed 64.5h against 40.0h purchased (161% burn — 24.5 unpaid teacher hours). New session scheduling is paused until Advisor Ava史老师 & Sales Reeya process a 30H Course Top-Up Billing Plan with the parent.",
      notes: [
        {
          title: "课时超支预警与加课沟通 (Over-Delivery Top-Up Required)",
          author: "Jingwei Shi (Ava史老师 · 班主任)",
          phase: "Academics",
          date: "2026-11-02 15:30",
          visibility: "INTERNAL_STAFF_ONLY",
          contentPlain: "学生基础较弱，AP宏观经济已上64.5小时（合同40小时，超出24.5小时）。TidyBac 2.0已触发100%课时锁止预警，需销售Reeya联系家长补缴30课时加课包。"
        }
      ]
    },
    {
      id: "stu-kailan",
      code: "STU-2026-00114",
      englishName: "Kailan Hu",
      chineseName: "胡凯蓝",
      grade: "G11",
      entity: "SOA",
      program: "SOA美高非全日制 (AP Statistics · 40H)",
      coordinator: "Charlotte Wang",
      supportLevel: "MEDIUM",
      sourcePartner: "翰林 → 翰林小红书 (15%)",
      tuitionAgreed: 38000,
      tuitionPaid: 38000,
      currency: "CNY",
      purchasedHours: 40,
      completedHours: 16,
      scheduledHours: 8,
      platformStatus: "Accelerate Education · 94% Quiz Avg",
      courses: [
        { name: "线上美高AP Statistics-胡凯蓝", term: "2026-2027 Fall", teacher: "郁老师", allocated: 40, consumed: 16, status: "On Track" }
      ],
      aiSummaryOldBuggy: "Kailan Hu is taking AP Statistics.",
      aiSummaryFixed: "Student: Kailan Hu (胡凯蓝, G11, WLSA上海) · Advisor: Charlotte Wang. Automatically linked to originating Lead '胡凯蓝' (Source: 翰林小红书). 16/40h completed with 郁老师.",
      notes: []
    }
  ],

  // Lightweight Teacher Directory in class.tidybac.com
  teachers: [
    { name: "朱老师", subject: "Physics / Calculus", activeSections: 6, hoursThisMonth: 48.5, status: "Active (Part-Time)" },
    { name: "杨老师", subject: "English Language Arts / AP Lang", activeSections: 8, hoursThisMonth: 62.0, status: "Active (Part-Time)" },
    { name: "郁老师", subject: "AP Statistics / Mathematics", activeSections: 5, hoursThisMonth: 39.0, status: "Active (Part-Time)" },
    { name: "刘老师", subject: "AP Macroeconomics / Micro", activeSections: 4, hoursThisMonth: 34.0, status: "Active (Part-Time)" },
    { name: "Jingning Qi", subject: "Bilingual Humanities", activeSections: 3, hoursThisMonth: 28.0, status: "Active (Full-Time)" },
    { name: "Siyi Zhao", subject: "IGA Academic Advisor & Instructor", activeSections: 12, hoursThisMonth: 55.0, status: "Active (Full-Time)" }
  ],

  // Bank Accounts in finance.tidybac.com
  accounts: [
    { id: "acc-ccb", name: "SOA中国账户 (人民币主账户)", entity: "上海顶石教育科技有限公司 (SOA)", bank: "China Construction Bank (建设银行 ****1075)", nativeCurrency: "CNY", nativeBalance: 8134225.00, cnyEquivalent: 8134225.00, txns: 92 },
    { id: "acc-hsbc", name: "SOA美金(翰林代收账户)", entity: "Hanlin Scholars Pte Ltd", bank: "HSBC Singapore (汇丰新加坡 ****2178)", nativeCurrency: "USD", nativeBalance: 139482.41, cnyEquivalent: 933137.32, txns: 6 },
    { id: "acc-cfsb", name: "SOA美国账户 (USD)", entity: "SHA INVESTMENTS LLC / DING SHI", bank: "Community Federal Savings Bank (****9255)", nativeCurrency: "USD", nativeBalance: 10000.00, cnyEquivalent: 72400.00, txns: 1 },
    { id: "acc-other", name: "Other Settlement Account", entity: "SOA在线美高", bank: "Domestic Transfer", nativeCurrency: "CNY", nativeBalance: 16000.00, cnyEquivalent: 16000.00, txns: 2 }
  ],

  // Tuition Payments & Enrollment Billing Plans in finance.tidybac.com
  payments: [
    {
      id: "pay-1",
      studentName: "Zhengqi Zhou (周正麒)",
      entity: "SOA",
      program: "SOA美高全日制 (Installment 1 & 2)",
      agreedTuition: 286000,
      amount: 286000,
      currency: "CNY",
      account: "SOA中国账户 (CCB ****1075)",
      partner: "三士渡教育 (15%)",
      commissionAmount: 42900,
      financeConfirmed: true,
      billingPlanStatus: "Matched to Enrollment (Zero Orphan)"
    },
    {
      id: "pay-2",
      studentName: "Xuni Sun (孙栩妮)",
      entity: "SOA",
      program: "SOA美高全日制 (VIP Multi-Year)",
      agreedTuition: 420000,
      amount: 420000,
      currency: "CNY",
      account: "SOA中国账户 (CCB ****1075)",
      partner: "三士渡教育 (15%)",
      commissionAmount: 63000,
      financeConfirmed: true,
      billingPlanStatus: "Matched to Enrollment (Zero Orphan)"
    },
    {
      id: "pay-3",
      studentName: "Kailan Hu (胡凯蓝)",
      entity: "SOA",
      program: "SOA美高非全日制 (AP Statistics 40H)",
      agreedTuition: 38000,
      amount: 38000,
      currency: "CNY",
      account: "SOA中国账户 (CCB ****1075)",
      partner: "翰林 → 翰林小红书 (15%)",
      commissionAmount: 5700,
      financeConfirmed: false,
      billingPlanStatus: "Awaiting Betty's Bank Confirmation"
    }
  ]
};

// Subdomain Navigation Config (Streamlined)
const SUBDOMAIN_CONFIG = {
  sales: {
    brand: "TidyBac Sales",
    host: "sales.tidybac.com",
    footer: "Mobile-First PWA + Desktop",
    tabs: [
      { id: "leads", label: "Leads", badge: () => state.leads.length },
      { id: "channels", label: "Partners & Price Book", badge: () => "69" }
    ]
  },
  class: {
    brand: "TidyBac Class",
    host: "class.tidybac.com",
    footer: "班主任 & Teacher Workspace",
    tabs: [
      { id: "students", label: "Student 360", badge: () => state.students.length },
      { id: "sections", label: "Sections & Teachers", badge: () => "162" }
    ]
  },
  finance: {
    brand: "TidyBac Finance",
    host: "finance.tidybac.com",
    footer: "Founder & Finance Only (403 Gate)",
    tabs: [
      { id: "tuition", label: "Tuition & Accounts", badge: () => state.payments.filter(p => !p.financeConfirmed).length + " Pending" },
      { id: "commissions", label: "15% Commissions", badge: () => "Auto" }
    ]
  },
  admin: {
    brand: "TidyBac Admin",
    host: "admin.tidybac.com",
    footer: "Super Admin Governance",
    tabs: [
      { id: "rbac", label: "Team Access", badge: () => "6" },
      { id: "backfill", label: "Data Backfill", badge: () => state.backfillCompleted ? "Done" : "Ready" }
    ]
  },
  my: {
    brand: "TidyBac My Portal",
    host: "my.tidybac.com",
    footer: "WeChat Mobile-Only Portal",
    tabs: [
      { id: "portal", label: "WeChat Portal", badge: () => "Mobile" }
    ]
  }
};

function showToast(msg) {
  const container = document.getElementById("toast-container");
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 4200);
}

function switchSubdomain(sub, optionalTab) {
  state.subdomain = sub;
  const cfg = SUBDOMAIN_CONFIG[sub];
  state.subTab = optionalTab || cfg.tabs[0].id;
  renderAll();
}

function switchSubTab(tabId) {
  state.subTab = tabId;
  renderAll();
}

function changePersona(p) {
  state.persona = p;
  renderAll();
  const perm = state.permissions[p];
  showToast(`Switched active session to <strong>${perm.name}</strong> (${perm.roleTitle})`);
}

function changeEntity(ent) {
  state.entity = ent;
  renderAll();
}

// Guided Demo Shortcuts for Tomorrow's Meeting with Betty
function runDemoShortcut(num) {
  if (num === 1) {
    state.persona = "reeya";
    document.getElementById("persona-select").value = "reeya";
    switchSubdomain("sales", "leads");
    showToast("Demo 1: Try pasting a 小红书/WeChat chat on the right, or click '1-Click Convert & Submit Payment' on 曾凡曦!");
  } else if (num === 2) {
    state.persona = "ava";
    document.getElementById("persona-select").value = "ava";
    state.selectedStudentId = "stu-chengxi";
    switchSubdomain("class", "students");
    showToast("Demo 2: Viewing Chengxi Li's 161% (64.5/40h) Over-Delivery Alert & 1-click inline teacher assignment!");
  } else if (num === 3) {
    state.persona = "ava";
    document.getElementById("persona-select").value = "ava";
    state.selectedStudentId = "stu-xuni";
    switchSubdomain("class", "meeting-ai");
    showToast("Demo 3: Comparing TidyBac 1.0's buggy AI summary (confusing Jingwei Shi with Xuni Sun) vs TidyBac 2.0's Tencent Meeting parser!");
  } else if (num === 4) {
    state.persona = "charlotte";
    document.getElementById("persona-select").value = "charlotte";
    switchSubdomain("finance", "tuition");
    showToast("Demo 4: Logged in as Charlotte Wang on finance.tidybac.com — Hard 403 Subdomain Gate blocks access to bank balances!");
  } else if (num === 5) {
    state.persona = "betty";
    document.getElementById("persona-select").value = "betty";
    switchSubdomain("finance", "tuition");
    showToast("Demo 5: Logged in as Betty Zhou — Click 'Confirm in CCB ****1075' to confirm payment & auto-accrue 15% Partner Commission!");
  } else if (num === 6) {
    state.persona = "parent";
    document.getElementById("persona-select").value = "parent";
    switchSubdomain("my", "portal");
    showToast("Demo 6: Viewing the passwordless WeChat Parent Portal (my.tidybac.com) for Xuni Sun's family!");
  }
}

function renderAll() {
  const cfg = SUBDOMAIN_CONFIG[state.subdomain];

  // Update URL bar
  document.getElementById("url-subdomain").textContent = state.subdomain;
  document.getElementById("url-path").textContent = "/" + state.subTab;

  // Toggle mobile-only shell for my.tidybac.com
  const shellEl = document.getElementById("app-shell");
  if (shellEl) {
    shellEl.classList.toggle("mobile-only-shell", state.subdomain === "my");
  }

  // Update Subdomain Tabs
  document.querySelectorAll("#subdomain-tabs .sub-tab").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-sub") === state.subdomain);
  });

  // Update Sidebar
  document.getElementById("sidebar-brand").textContent = cfg.brand;
  document.getElementById("sidebar-host").textContent = cfg.host;
  document.getElementById("sidebar-footer").textContent = cfg.footer;

  const navEl = document.getElementById("sidebar-nav");
  navEl.innerHTML = cfg.tabs.map(t => `
    <button class="nav-item ${state.subTab === t.id ? 'active' : ''}" onclick="switchSubTab('${t.id}')">
      <span>${t.label}</span>
      <span class="nav-badge">${t.badge()}</span>
    </button>
  `).join("");

  // Check Subdomain Edge RBAC first!
  const perm = state.permissions[state.persona];
  const hasAccess = perm[state.subdomain];
  const mainEl = document.getElementById("main-content");

  if (!hasAccess) {
    mainEl.innerHTML = renderSecurityGate(perm, cfg);
    return;
  }

  // Render active subdomain view
  if (state.subdomain === "sales") {
    mainEl.innerHTML = renderSalesWorkspace();
  } else if (state.subdomain === "class") {
    mainEl.innerHTML = renderClassWorkspace();
  } else if (state.subdomain === "finance") {
    mainEl.innerHTML = renderFinanceWorkspace();
  } else if (state.subdomain === "admin") {
    mainEl.innerHTML = renderAdminWorkspace();
  } else if (state.subdomain === "my") {
    mainEl.innerHTML = renderMyPortalWorkspace();
  }
}

// ============================================================================
// 403 SUBDOMAIN EDGE SECURITY GATE
// ============================================================================
function renderSecurityGate(perm, cfg) {
  return `
    <div class="shield-box">
      <div class="shield-icon">🛡️</div>
      <span class="badge b-red" style="margin-bottom:8px;">HTTP 403 · SUBDOMAIN EDGE ISOLATION ENFORCED</span>
      <h2 style="margin:6px 0 8px 0; font-size:20px;">Access to <code>${cfg.host}</code> Is Restricted</h2>
      <p style="color:#475569; margin-bottom:16px;">
        You are currently signed in as <strong>${perm.name}</strong> (<code>${perm.roleTitle}</code>).
        In <strong>TidyBac 2.0</strong>, Next.js Subdomain Middleware blocks this account from accessing
        <strong>${cfg.host}</strong>.
      </p>

      <div class="fix-banner danger" style="text-align:left;">
        <div>
          <strong>Why This Matters (What We Found in TidyBac 1.0):</strong><br>
          In TidyBac 1.0, 11 out of 12 users (including <code>Charlotte Wang</code>) had full <code>Admin</code> + <code>FINANCE_ADMIN</code> enabled. Any coordinator or sales rep could view all <strong>CN¥9,155,762.32 across 4 bank account numbers</strong>, export all <strong>69 partner agencies</strong>, and view all <strong>68 students' passport numbers</strong>.
        </div>
      </div>

      <div style="display:flex; gap:10px; justify-content:center; margin-top:18px; flex-wrap:wrap;">
        <button class="btn btn-primary" onclick="changePersona('betty'); document.getElementById('persona-select').value='betty';">
          Unlock as Betty Zhou (Founder · Super Admin)
        </button>
        <button class="btn btn-outline" onclick="switchSubdomain('admin', 'rbac'); changePersona('betty'); document.getElementById('persona-select').value='betty';">
          Inspect Subdomain Permission Matrix (admin.tidybac.com)
        </button>
      </div>
    </div>
  `;
}

// ============================================================================
// 1. SALES.TIDYBAC.COM WORKSPACE
// ============================================================================
function renderSalesWorkspace() {
  if (state.subTab === "channels") return renderSalesChannels();

  const visibleLeads = state.leads.filter(l => state.entity === "ALL" || l.entity === state.entity);

  const leadRows = visibleLeads.map(l => `
    <tr>
      <td>
        <strong>${l.chineseName}</strong> <span style="color:#64748b;">(${l.englishName})</span>
        <div style="font-size:11.5px; color:#64748b;">WeChat: <code>${l.wechatId}</code> · ${l.school}</div>
      </td>
      <td><span class="badge b-indigo">${l.grade}</span> <span class="badge b-slate">${l.entity}</span></td>
      <td>
        <strong>${l.parentPartner}</strong>
        <div style="font-size:11.5px; color:#059669;">↳ ${l.subChannel} (15%)</div>
      </td>
      <td>
        <div>${l.program}</div>
        <div style="font-size:12px; font-weight:700;">CN¥${l.quotedAmount.toLocaleString()}</div>
      </td>
      <td><span class="badge b-green badge-truncate" title="${l.proofFile}">📎 ${l.proofFile}</span></td>
      <td>
        ${l.linkedStudentId
          ? `<span class="badge b-green">✓ Linked</span>`
          : `<button class="btn btn-success btn-sm" onclick="convertLeadToStudent('${l.id}')">⚡ Convert</button>`
        }
      </td>
    </tr>
  `).join("");

  const mobileLeadCards = visibleLeads.map(l => `
    <div style="background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:10px; font-size:12px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <strong>${l.chineseName} · ${l.englishName}</strong>
        <span class="badge b-indigo">${l.grade}</span>
      </div>
      <div style="color:#64748b; font-size:11px; margin:3px 0;">
        ${l.parentPartner} ↳ ${l.subChannel} · CN¥${l.quotedAmount.toLocaleString()}
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-top:6px;">
        <span class="badge-truncate" style="font-size:11px; color:#059669;" title="${l.proofFile}">📎 ${l.proofFile}</span>
        ${l.linkedStudentId
          ? `<span class="badge b-green">✓ Linked</span>`
          : `<button class="btn btn-success btn-sm" style="padding:3px 8px; font-size:11px;" onclick="convertLeadToStudent('${l.id}')">Convert</button>`
        }
      </div>
    </div>
  `).join("");

  return `
    <div class="page-header">
      <div>
        <h1>Leads (<code>sales.tidybac.com/leads</code>)</h1>
        <p>Mobile-first 小红书 / WeChat lead capture with First Contact Proof and bilingual conversion.</p>
      </div>
      <div class="header-actions">
        <span class="badge b-indigo">Rep: Ziyu Wang (Reeya)</span>
      </div>
    </div>

    <div class="split-desktop-mobile">
      <!-- Desktop View -->
      <div>
        <div class="pane-label">🖥️ Desktop View</div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Lead Pipeline (${visibleLeads.length})</h3>
            <span style="font-size:12px; color:#64748b;">CN ↔ EN auto-linked on convert</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Student (CN / EN)</th>
                <th>Grade</th>
                <th>Source Channel</th>
                <th>Program &amp; Tuition</th>
                <th>Proof</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>${leadRows}</tbody>
          </table>
        </div>
      </div>

      <!-- Mobile-First PWA View -->
      <div>
        <div class="pane-label">📱 Mobile View (PWA)</div>
        <div class="phone-frame">
          <div class="phone-screen">
            <div class="phone-app-bar">
              <span>TidyBac Sales</span>
              <span class="badge b-indigo">Reeya</span>
            </div>
            <div style="padding:12px; display:flex; flex-direction:column; gap:10px;">
              <div style="background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:10px;">
                <div style="font-size:12px; font-weight:700; margin-bottom:6px;">⚡ Quick Capture (小红书 / WeChat)</div>
                <textarea id="raw-lead-paste" rows="3" style="font-size:11.5px; margin-bottom:6px;" placeholder="Paste WeChat or 小红书 DM...">【小红书私信】家长微信：grace_mom_sh，学生：沈婧棋 (Jingqi Shen)，包玉刚G10，置换学分 Honors Physics 40H ¥38,000，来源：fei老师。</textarea>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-bottom:6px;">
                  <select id="new-lead-partner" class="form-select" style="font-size:11px; padding:5px;">
                    <option value="小红书个人KOL矩阵">小红书 KOL矩阵</option>
                    <option value="翰林国际教育 (Hanlin)">翰林 (Hanlin)</option>
                    <option value="三士渡教育">三士渡 (15%)</option>
                  </select>
                  <select id="new-lead-subchannel" class="form-select" style="font-size:11px; padding:5px;">
                    <option value="fei老师(个人KOL)">fei老师 · 小红书</option>
                    <option value="翰林小红书">翰林小红书</option>
                    <option value="LesssssisMore_">LesssssisMore_</option>
                  </select>
                </div>
                <button class="btn btn-primary btn-sm" style="width:100%; justify-content:center;" onclick="createLeadFromPaste()">
                  + Add Lead + Proof
                </button>
              </div>
              <div style="font-size:11px; font-weight:700; color:#64748b; text-transform:uppercase;">Active Leads</div>
              ${mobileLeadCards}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderSalesChannels() {
  const rows = state.channels.map(c => `
    <tr>
      <td>
        <strong>${c.parentName}</strong>
        <div style="font-size:11.5px; color:#64748b;">${c.publicAccounts}</div>
      </td>
      <td><span class="badge b-indigo">${c.category}</span></td>
      <td>
        <div style="display:flex; gap:4px; flex-wrap:wrap;">
          ${c.subChannels.map(sc => `<span class="badge b-green">${sc}</span>`).join("")}
        </div>
      </td>
      <td><strong>${c.commission}</strong></td>
      <td>${c.leadsCount} &rarr; <strong>${c.enrolledCount}</strong></td>
      <td style="font-weight:700; color:var(--emerald);">${c.attributedRev}</td>
    </tr>
  `).join("");

  return `
    <div class="page-header">
      <div>
        <h1>Partners &amp; Price Book (<code>sales.tidybac.com/channels</code>)</h1>
        <p>2-level Parent &rarr; Sub-Channel attribution tree and standard SOA / SHA offering prices.</p>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Partners &amp; 小红书 KOLs</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th>Parent Partner / KOL</th>
            <th>Type</th>
            <th>Sub-Channels</th>
            <th>Commission</th>
            <th>Funnel</th>
            <th>Attributed</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Standard Price Book (SOA / SHA)</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th>Entity</th>
            <th>Program Offering</th>
            <th>Included Hours</th>
            <th>Standard Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="badge b-indigo">SOA</span></td>
            <td><strong>SOA美高全日制 (Full-Time Diploma)</strong></td>
            <td>240H / Year (6 Courses)</td>
            <td><strong>CN¥148,000 / yr</strong> · Multi-Year: CN¥420,000</td>
          </tr>
          <tr>
            <td><span class="badge b-indigo">SOA</span></td>
            <td><strong>SOA美高非全日制 / 置换学分</strong></td>
            <td>30H – 40H / Course</td>
            <td><strong>CN¥25,000 – CN¥48,000</strong> / Course</td>
          </tr>
          <tr>
            <td><span class="badge b-green">SHA</span></td>
            <td><strong>SHA美高线上全日制 / 单门学分课</strong></td>
            <td>40H / Course or 240H / Year</td>
            <td><strong>US$2,000 / Course</strong> · <strong>US$15,000 / Year</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function fillLeadPreset(n) {
  const box = document.getElementById("raw-lead-paste");
  if (n === 1) {
    box.value = "【小红书私信转微信】家长微信号：grace_mom_sh，学生姓名：沈婧棋 (Jingqi Shen)，目前就读上海包玉刚10年级（G10），物理成绩C想做SOA置换学分项目（Honors Physics 40课时，¥38,000），来源博主：fei老师(个人KOL)，已上传首联截图。";
    document.getElementById("new-lead-partner").value = "小红书个人KOL矩阵";
    document.getElementById("new-lead-subchannel").value = "fei老师(个人KOL)";
  } else {
    box.value = "【三士渡顾问推荐】学生：睿锶 (Ruisi Tang)，目前美高G11，需要报名SOA美高全日制（1年6门课240课时，¥148,000），家长微信：ruisi_dad_bj，来源渠道：三士渡教育（15%返佣）。";
    document.getElementById("new-lead-partner").value = "三士渡教育";
  }
}

function createLeadFromPaste() {
  const text = document.getElementById("raw-lead-paste").value;
  const partner = document.getElementById("new-lead-partner").value;
  const sub = document.getElementById("new-lead-subchannel").value;
  const isRuisi = text.includes("睿锶");

  const newLead = {
    id: "lead-" + (state.leads.length + 1),
    chineseName: isRuisi ? "睿锶" : "沈婧棋",
    englishName: isRuisi ? "Ruisi Tang" : "Jingqi Shen",
    wechatId: isRuisi ? "ruisi_dad_bj" : "grace_mom_sh",
    grade: isRuisi ? "G11" : "G10",
    school: isRuisi ? "US Private High School" : "上海包玉刚实验学校",
    entity: "SOA",
    program: isRuisi ? "SOA美高全日制 (240H)" : "SOA置换学分项目 (Honors Physics · 40H)",
    quotedAmount: isRuisi ? 148000 : 38000,
    currency: "CNY",
    parentPartner: partner,
    subChannel: sub,
    commissionRate: 0.15,
    stage: "Paid — Ready to Convert",
    temp: "HOT",
    rep: "Ziyu Wang (Reeya)",
    proofFile: "first_contact_proof_verified.png",
    linkedStudentId: null
  };
  state.leads.unshift(newLead);
  renderAll();
  showToast(`✨ Extracted &amp; created Lead <strong>${newLead.chineseName} (${newLead.englishName})</strong> with 2-level channel <strong>${partner} &rarr; ${sub}</strong>!`);
}

function convertLeadToStudent(leadId) {
  const lead = state.leads.find(l => l.id === leadId);
  if (!lead) return;

  const newStuId = "stu-" + Date.now();
  lead.linkedStudentId = newStuId;
  lead.stage = "Linked & Enrolled";

  const hours = lead.program.includes("240H") ? 240 : 40;
  const newStudent = {
    id: newStuId,
    code: "STU-2026-00" + (115 + state.students.length),
    englishName: lead.englishName,
    chineseName: lead.chineseName,
    grade: lead.grade,
    entity: lead.entity,
    program: lead.program,
    coordinator: "Jingwei Shi (Ava史老师)",
    supportLevel: "HIGH",
    sourcePartner: `${lead.parentPartner} → ${lead.subChannel} (15%)`,
    tuitionAgreed: lead.quotedAmount,
    tuitionPaid: lead.quotedAmount,
    currency: "CNY",
    purchasedHours: hours,
    completedHours: 0,
    scheduledHours: 12,
    platformStatus: "Onboarding Checklist Created · Awaiting Orientation on Tencent Meeting",
    courses: [
      { name: "Honors Physics (线上美高1v1)", term: "2026-2027 Fall", teacher: "Unassigned (Click + Assign)", allocated: 40, consumed: 0, status: "Needs Teacher" }
    ],
    aiSummaryOldBuggy: "New student record.",
    aiSummaryFixed: `Student: ${lead.englishName} (${lead.chineseName}, ${lead.grade}, ${lead.school}) · Advisor (班主任): Jingwei Shi (Ava史老师). Converted from Lead with intact attribution (${lead.parentPartner} → ${lead.subChannel}). Pending Orientation and teacher assignment.`,
    notes: []
  };
  state.students.unshift(newStudent);

  state.payments.unshift({
    id: "pay-" + Date.now(),
    studentName: `${lead.englishName} (${lead.chineseName})`,
    entity: lead.entity,
    program: lead.program,
    agreedTuition: lead.quotedAmount,
    amount: lead.quotedAmount,
    currency: "CNY",
    account: "SOA中国账户 (CCB ****1075)",
    partner: `${lead.parentPartner} (${lead.subChannel})`,
    commissionAmount: Math.round(lead.quotedAmount * 0.15),
    financeConfirmed: false,
    billingPlanStatus: "Awaiting Betty's Bank Confirmation"
  });

  state.selectedStudentId = newStuId;
  renderAll();
  showToast(`✅ Converted <strong>${lead.chineseName} &harr; ${lead.englishName}</strong>! Created Student on <code>class.tidybac.com</code> &amp; queued CN¥${lead.quotedAmount.toLocaleString()} payment + CN¥${Math.round(lead.quotedAmount * 0.15).toLocaleString()} commission draft on <code>finance.tidybac.com</code>!`);
}

// ============================================================================
// 2. CLASS.TIDYBAC.COM WORKSPACE (STUDENTS, HOURS, TEACHERS, TENCENT AI)
// ============================================================================
function renderClassWorkspace() {
  const perm = state.permissions[state.persona];

  // If logged in as Part-Time Teacher (朱老师), show restricted Teacher-Only View!
  if (perm.teacherOnly) {
    return renderTeacherRestrictedView(perm);
  }

  if (state.subTab === "sections") return renderClassSectionsAndTeachers();

  const stu = state.students.find(s => s.id === state.selectedStudentId) || state.students[0];
  const burnPct = Math.round((stu.completedHours / stu.purchasedHours) * 100);
  const schedPct = Math.round((stu.scheduledHours / stu.purchasedHours) * 100);
  const isOver = stu.completedHours > stu.purchasedHours;

  return `
    <div class="page-header">
      <div>
        <h1>Student 360 (<code>class.tidybac.com/students</code>)</h1>
        <p>Hours burn-down, inline teacher assignment, and 班主任 mobile check-in.</p>
      </div>
      <div class="header-actions">
        <select class="form-select" style="font-weight:700;" onchange="state.selectedStudentId=this.value; renderAll();">
          ${state.students.map(s => `
            <option value="${s.id}" ${s.id === stu.id ? 'selected' : ''}>
              ${s.chineseName} (${s.englishName})
            </option>
          `).join("")}
        </select>
        <button class="btn btn-outline btn-sm" onclick="state.showMeetingParser = !state.showMeetingParser; renderAll();">
          🎙️ ${state.showMeetingParser ? "Hide 腾讯会议 AI" : "+ 腾讯会议 AI Note"}
        </button>
      </div>
    </div>

    ${isOver ? `
      <div class="fix-banner danger">
        <div>
          <strong>🚨 Hour Cap Reached (${burnPct}%: ${stu.completedHours}h / ${stu.purchasedHours}h Paid):</strong>
          New scheduling is paused until a Top-Up Billing Plan is approved.
        </div>
        <button class="btn btn-primary btn-sm" onclick="requestHourTopUp('${stu.id}')">+ Top-Up 30H (CN¥28,000)</button>
      </div>
    ` : ""}

    <div class="split-desktop-mobile">
      <!-- Desktop View -->
      <div>
        <div class="pane-label">🖥️ Desktop View</div>
        <div class="card">
          <div class="card-header">
            <div>
              <span class="badge b-indigo">${stu.code}</span>
              <span class="badge b-green">${stu.sourcePartner}</span>
              <h2 style="margin:6px 0 2px 0;">${stu.chineseName} · ${stu.englishName} (${stu.grade})</h2>
              <div style="font-size:12px; color:#64748b;">
                ${stu.program} · 班主任: <strong>${stu.coordinator}</strong>
              </div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:11px; color:#64748b; font-weight:700;">TUITION PAID</div>
              <div style="font-size:17px; font-weight:800; color:var(--emerald);">
                CN¥${stu.tuitionPaid.toLocaleString()} / CN¥${stu.tuitionAgreed.toLocaleString()}
              </div>
            </div>
          </div>

          <!-- Visual Hours Burn Bar -->
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:10px 12px; margin:10px 0;">
            <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:700;">
              <span>Hours Allowance: ${stu.purchasedHours}h</span>
              <span style="color:${isOver ? '#e11d48' : '#4f46e5'};">
                Completed ${stu.completedHours}h (${burnPct}%) · Scheduled ${stu.scheduledHours}h
              </span>
            </div>
            <div class="burn-bar-track">
              <div class="${isOver ? 'burn-seg-over' : 'burn-seg-completed'}" style="width:${Math.min(100, burnPct)}%"></div>
              <div class="burn-seg-scheduled" style="width:${isOver ? 0 : Math.min(100 - burnPct, schedPct)}%"></div>
            </div>
            <div style="font-size:11.5px; color:#475569;">${stu.platformStatus}</div>
          </div>

          <!-- Enrolled Courses -->
          <table>
            <thead>
              <tr>
                <th>Course Section</th>
                <th>Term</th>
                <th>Teacher</th>
                <th>Hours</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${stu.courses.map((c, idx) => `
                <tr>
                  <td><strong>${c.name}</strong></td>
                  <td><span class="badge b-slate">${c.term}</span></td>
                  <td>
                    ${c.teacher.includes("Unassigned")
                      ? `<span class="badge b-amber">${c.teacher}</span>`
                      : `<span class="badge b-green">${c.teacher}</span>`
                    }
                  </td>
                  <td><strong>${c.consumed}/${c.allocated}h</strong></td>
                  <td>
                    <button class="btn btn-outline btn-sm" onclick="quickAssignTeacher('${stu.id}', ${idx})">⚡ +朱老师</button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>

          <!-- Inline Add Course -->
          <div style="display:flex; gap:8px; margin-top:12px; padding-top:12px; border-top:1px solid #e2e8f0; align-items:center; flex-wrap:wrap;">
            <select id="quick-course-name" class="form-select">
              <option value="AP Macroeconomics (1v1 · 40H)">AP Macroeconomics (1v1 · 40H)</option>
              <option value="Honors Physics (1v1 · 40H)">Honors Physics (1v1 · 40H)</option>
              <option value="AP Calculus BC (1v1 · 40H)">AP Calculus BC (1v1 · 40H)</option>
            </select>
            <select id="quick-teacher-name" class="form-select">
              ${state.teachers.map(t => `<option value="${t.name}">${t.name}</option>`).join("")}
            </select>
            <button class="btn btn-success btn-sm" onclick="addCourseToStudent('${stu.id}')">+ Enroll Course</button>
          </div>
        </div>

        ${state.showMeetingParser ? `
          <div class="card" style="border-top:3px solid #4f46e5;">
            <div class="card-header">
              <h3 class="card-title">🎙️ 腾讯会议 AI Note Parser</h3>
              <span class="badge b-green">Role-Aware: Author &ne; Student</span>
            </div>
            <textarea id="tencent-raw-input" rows="4" style="font-size:12px;">【腾讯会议AI纪要】参会人：Ava史老师（班主任）、${stu.chineseName}家长。物理已完成24.5H，测验均分93%；内部提醒：上周英语课未开摄像头。春季新增《US History Accelerated》(40H) 由陆老师授课。</textarea>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
              <span style="font-size:11.5px; color:#64748b;">Internal notes stay hidden from <code>my.tidybac.com</code></span>
              <button class="btn btn-primary btn-sm" onclick="parseTencentMeetingNote()">✨ Parse &amp; Save Note</button>
            </div>
          </div>
        ` : ""}

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">AI Summary (Plain Text · Author-Aware)</h3>
          </div>
          <div style="font-size:12.5px; color:#1e293b;">${stu.aiSummaryFixed}</div>
        </div>
      </div>

      <!-- Mobile-First 班主任 View -->
      <div>
        <div class="pane-label">📱 Mobile View (班主任 PWA)</div>
        <div class="phone-frame">
          <div class="phone-screen">
            <div class="phone-app-bar">
              <span>TidyBac Class</span>
              <span class="badge b-green">${stu.coordinator}</span>
            </div>
            <div style="padding:12px; display:flex; flex-direction:column; gap:10px;">
              <div style="background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:12px;">
                <div style="font-size:14px; font-weight:800;">${stu.chineseName} (${stu.englishName})</div>
                <div style="font-size:11.5px; color:#64748b; margin-bottom:8px;">${stu.grade} · ${stu.program}</div>
                <div style="display:flex; justify-content:space-between; font-size:11.5px; font-weight:700;">
                  <span>Hours Burn</span>
                  <span style="color:${isOver ? '#e11d48' : '#4f46e5'};">${stu.completedHours} / ${stu.purchasedHours}h (${burnPct}%)</span>
                </div>
                <div class="burn-bar-track" style="height:8px; margin:6px 0;">
                  <div class="${isOver ? 'burn-seg-over' : 'burn-seg-completed'}" style="width:${Math.min(100, burnPct)}%"></div>
                </div>
                ${isOver ? `<button class="btn btn-primary btn-sm" style="width:100%; justify-content:center; margin-top:6px;" onclick="requestHourTopUp('${stu.id}')">+ Request 30H Top-Up</button>` : ""}
              </div>

              <div style="background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:10px;">
                <div style="font-size:12px; font-weight:700; margin-bottom:6px;">📝 Quick WeChat / Class Note</div>
                <textarea rows="2" style="font-size:11.5px; margin-bottom:6px;" placeholder="Log quick parent follow-up or homework check..."></textarea>
                <div style="display:flex; gap:6px;">
                  <button class="btn btn-outline btn-sm" style="flex:1; justify-content:center; font-size:11px;" onclick="showToast('✅ Saved internal 班主任 note (hidden from parents)')">Save Internal</button>
                  <button class="btn btn-primary btn-sm" style="flex:1; justify-content:center; font-size:11px;" onclick="switchSubdomain('my')">Preview Parent</button>
                </div>
              </div>

              <div style="background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:10px;">
                <div style="font-size:12px; font-weight:700; margin-bottom:6px;">📚 Courses (${stu.courses.length})</div>
                ${stu.courses.map((c, idx) => `
                  <div style="display:flex; justify-content:space-between; align-items:center; padding:5px 0; border-bottom:1px solid #f1f5f9; font-size:11.5px;">
                    <div>
                      <strong>${c.name}</strong>
                      <div style="font-size:10.5px; color:#64748b;">${c.teacher} · ${c.consumed}/${c.allocated}h</div>
                    </div>
                    ${c.teacher.includes("Unassigned")
                      ? `<button class="btn btn-outline btn-sm" style="padding:2px 6px; font-size:10.5px;" onclick="quickAssignTeacher('${stu.id}', ${idx})">+朱老师</button>`
                      : `<span class="badge b-green" style="font-size:10px;">OK</span>`
                    }
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTeacherRestrictedView(perm) {
  return `
    <div class="page-header">
      <div>
        <h1>My Assigned Classes (<code>class.tidybac.com</code>)</h1>
        <p>Signed in as <strong>${perm.name}</strong> — scoped strictly to your own sections.</p>
      </div>
    </div>

    <div class="split-desktop-mobile">
      <div>
        <div class="pane-label">🖥️ Desktop View</div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">My Active Sections (2026-2027 Fall)</h3>
            <span class="badge b-green">48.5h Logged</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Section</th>
                <th>Student</th>
                <th>Hours</th>
                <th>Log</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Honors Physics (1v1)</strong></td>
                <td>孙栩妮 (Xuni Sun)</td>
                <td><strong>24.5 / 40h</strong></td>
                <td><button class="btn btn-primary btn-sm" onclick="showToast('✅ Logged 2.0h session for Xuni Sun!')">+2h Class</button></td>
              </tr>
              <tr>
                <td><strong>Honors Physics (1v1)</strong></td>
                <td>Albert Wang</td>
                <td><strong>18.0 / 40h</strong></td>
                <td><button class="btn btn-primary btn-sm" onclick="showToast('✅ Logged 2.0h session for Albert Wang!')">+2h Class</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div class="pane-label">📱 Mobile View (Teacher PWA)</div>
        <div class="phone-frame">
          <div class="phone-screen">
            <div class="phone-app-bar">
              <span>My Classes</span>
              <span class="badge b-indigo">${perm.name}</span>
            </div>
            <div style="padding:12px; display:flex; flex-direction:column; gap:10px;">
              <div style="background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:12px;">
                <div style="font-size:13px; font-weight:700;">Honors Physics · 孙栩妮</div>
                <div style="font-size:11.5px; color:#64748b; margin:4px 0 8px 0;">24.5 / 40h used · 2026-2027 Fall</div>
                <button class="btn btn-primary btn-sm" style="width:100%; justify-content:center;" onclick="showToast('✅ Logged 2.0h session for Xuni Sun!')">✓ Log 2h Zoom Class</button>
              </div>
              <div style="background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:12px;">
                <div style="font-size:13px; font-weight:700;">Honors Physics · Albert Wang</div>
                <div style="font-size:11.5px; color:#64748b; margin:4px 0 8px 0;">18.0 / 40h used · 2026-2027 Fall</div>
                <button class="btn btn-primary btn-sm" style="width:100%; justify-content:center;" onclick="showToast('✅ Logged 2.0h session for Albert Wang!')">✓ Log 2h Zoom Class</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderClassSectionsAndTeachers() {
  return `
    <div class="page-header">
      <div>
        <h1>Sections &amp; Teachers (<code>class.tidybac.com/sections</code>)</h1>
        <p>3-field lightweight teacher onboarding (no 27-field HR form) and term-linked sections.</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary btn-sm" onclick="promptNewTeacher()">+ Quick Add Teacher</button>
      </div>
    </div>
    <div class="card">
      <table>
        <thead>
          <tr>
            <th>Teacher Name</th>
            <th>Subject</th>
            <th>Sections</th>
            <th>Hours This Month</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${state.teachers.map(t => `
            <tr>
              <td><strong>${t.name}</strong></td>
              <td>${t.subject}</td>
              <td>${t.activeSections}</td>
              <td><strong>${t.hoursThisMonth}h</strong></td>
              <td><span class="badge b-green">${t.status}</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function quickAssignTeacher(stuId, courseIdx) {
  const stu = state.students.find(s => s.id === stuId);
  if (!stu) return;
  stu.courses[courseIdx].teacher = "朱老师";
  stu.courses[courseIdx].status = "On Track";
  renderAll();
  showToast(`✅ Assigned <strong>朱老师</strong> to <strong>${stu.courses[courseIdx].name}</strong> in 1 click!`);
}

function addCourseToStudent(stuId) {
  const stu = state.students.find(s => s.id === stuId);
  const cName = document.getElementById("quick-course-name").value;
  const tName = document.getElementById("quick-teacher-name").value;
  stu.courses.push({
    name: cName,
    term: "2026-2027 Fall",
    teacher: tName,
    allocated: 40,
    consumed: 0,
    status: "Scheduled"
  });
  renderAll();
  showToast(`✅ Enrolled <strong>${stu.chineseName}</strong> in <strong>${cName}</strong> with <strong>${tName}</strong> (Term: 2026-2027 Fall)!`);
}

function requestHourTopUp(stuId) {
  const stu = state.students.find(s => s.id === stuId);
  stu.purchasedHours += 30;
  stu.tuitionAgreed += 28000;
  state.payments.unshift({
    id: "pay-topup-" + Date.now(),
    studentName: `${stu.englishName} (${stu.chineseName})`,
    entity: stu.entity,
    program: "30H Course Hour Top-Up Package",
    agreedTuition: 28000,
    amount: 28000,
    currency: "CNY",
    account: "SOA中国账户 (CCB ****1075)",
    partner: stu.sourcePartner,
    commissionAmount: 4200,
    financeConfirmed: false,
    billingPlanStatus: "Top-Up Queued for Finance Confirmation"
  });
  renderAll();
  showToast(`✅ Added 30H Top-Up (+30h allowance) for <strong>${stu.chineseName}</strong> and queued CN¥28,000 billing plan in <code>finance.tidybac.com</code>!`);
}

function promptNewTeacher() {
  state.teachers.unshift({
    name: "陆老师",
    subject: "US History / AP World History",
    activeSections: 3,
    hoursThisMonth: 22.0,
    status: "Active (Part-Time)"
  });
  renderAll();
  showToast(`✅ Created part-time teacher <strong>陆老师 (US History)</strong> in 1 click!`);
}

function parseTencentMeetingNote() {
  const stu = state.students[0];
  stu.courses[3].teacher = "陆老师";
  stu.courses[3].status = "Scheduled";
  stu.aiSummaryFixed = "UPDATED FROM 11/12 TENCENT MEETING: Student Xuni Sun (孙栩妮, G11) · Advisor: Jingwei Shi (Ava史老师). Honors Physics with 朱老师 is at 24.5/40h (93% platform avg). Spring US History Accelerated (40H) is now assigned to 陆老师. Next advisor follow-up: Nov 20.";
  switchSubTab("students");
  showToast(`✨ Parsed Tencent Meeting transcript! Auto-assigned <strong>陆老师</strong> to US History &amp; refreshed Xuni Sun's AI Summary!`);
}

// ============================================================================
// 3. FINANCE.TIDYBAC.COM WORKSPACE (FOUNDER & FINANCE ONLY)
// ============================================================================
function renderFinanceWorkspace() {
  if (state.subTab === "commissions") return renderFinanceCommissions();

  return `
    <div class="page-header">
      <div>
        <h1>Tuition &amp; Accounts (<code>finance.tidybac.com/tuition</code>)</h1>
        <p>Contractless billing plans (Agreed Tuition + PDF directly on Enrollment) and bank confirmations.</p>
      </div>
      <div class="header-actions">
        <span class="badge b-amber">Founder &amp; Finance Only</span>
      </div>
    </div>

    <div class="kpi-row">
      ${state.accounts.map(a => `
        <div class="kpi">
          <div class="k-label">${a.name}</div>
          <div class="k-val" style="font-size:18px;">${a.nativeBalance}</div>
          <div class="k-sub">${a.entity} · ${a.txns} txns</div>
        </div>
      `).join("")}
    </div>

    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Enrollment Billing &amp; Bank Confirmation</h3>
        <span class="badge b-green">0 Unlinked Receipts</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Program Enrollment</th>
            <th>Agreed vs. Paid</th>
            <th>Bank Account</th>
            <th>15% Partner</th>
            <th>Confirmation</th>
          </tr>
        </thead>
        <tbody>
          ${state.payments.map(p => `
            <tr>
              <td><strong>${p.studentName}</strong> <span class="badge b-slate">${p.entity}</span></td>
              <td>${p.program}</td>
              <td>
                <strong>CN¥${p.amount.toLocaleString()}</strong> / CN¥${p.agreedTuition.toLocaleString()}
              </td>
              <td><code>${p.account}</code></td>
              <td>
                ${p.partner}
                <div style="font-size:11.5px; font-weight:700; color:#4f46e5;">CN¥${p.commissionAmount.toLocaleString()}</div>
              </td>
              <td>
                ${p.financeConfirmed
                  ? `<span class="badge b-green">✓ Confirmed</span>`
                  : `<button class="btn btn-success btn-sm" onclick="confirmPayment('${p.id}')">✓ Confirm</button>`
                }
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderFinanceCommissions() {
  return `
    <div class="page-header">
      <div>
        <h1>Automated 15% Partner Commission Ledger (<code>finance.tidybac.com/commissions</code>)</h1>
        <p>Whenever Betty confirms a bank receipt, the linked partner agency or 小红书 KOL commission accrues automatically.</p>
      </div>
    </div>
    <div class="card">
      <table>
        <thead>
          <tr>
            <th>Partner Organization / Channel</th>
            <th>Student Enrollment</th>
            <th>Confirmed Tuition Base</th>
            <th>Commission Rate</th>
            <th>Accrued Commission</th>
            <th>Settlement Status</th>
          </tr>
        </thead>
        <tbody>
          ${state.payments.map(p => `
            <tr>
              <td><strong>${p.partner}</strong></td>
              <td>${p.studentName} · ${p.program}</td>
              <td>CN¥${p.amount.toLocaleString()}</td>
              <td><span class="badge b-indigo">15%</span></td>
              <td style="font-weight:800; color:var(--ink);">CN¥${p.commissionAmount.toLocaleString()}</td>
              <td>
                ${p.financeConfirmed
                  ? `<span class="badge b-green">Accrued &amp; Ready for Settlement</span>`
                  : `<span class="badge b-amber">Pending Tuition Confirmation</span>`
                }
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderFinanceAccounts() {
  return `
    <div class="page-header">
      <div>
        <h1>Multi-Entity Corporate Bank Accounts (<code>finance.tidybac.com/accounts</code>)</h1>
        <p>Strict native currency (<code>CNY ¥</code> vs. <code>USD $</code>) + converted CNY reporting across China, Singapore, and US bank accounts.</p>
      </div>
    </div>
    <div class="card">
      <table>
        <thead>
          <tr>
            <th>Account Name</th>
            <th>Legal Entity</th>
            <th>Bank &amp; Account Number (Protected)</th>
            <th>Transactions</th>
            <th>Native Balance</th>
            <th>CNY Equivalent (@ 6.69)</th>
          </tr>
        </thead>
        <tbody>
          ${state.accounts.map(a => `
            <tr>
              <td><strong>${a.name}</strong></td>
              <td>${a.entity}</td>
              <td><code>${a.bank}</code></td>
              <td>${a.txns} txns</td>
              <td style="font-weight:700;">
                ${a.nativeCurrency === "CNY" ? "CN¥" : "US$"}${a.nativeBalance.toLocaleString()}
              </td>
              <td style="font-weight:800; color:var(--emerald);">
                CN¥${a.cnyEquivalent.toLocaleString()}
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function confirmPayment(payId) {
  const pay = state.payments.find(p => p.id === payId);
  if (!pay || pay.financeConfirmed) return;
  pay.financeConfirmed = true;
  pay.billingPlanStatus = "Confirmed & Reconciled (Zero Orphan)";
  state.accounts[0].nativeBalance += pay.amount;
  state.accounts[0].cnyEquivalent += pay.amount;
  state.accounts[0].txns += 1;
  renderAll();
  showToast(`💰 Confirmed <strong>CN¥${pay.amount.toLocaleString()}</strong> in <code>SOA中国账户 (CCB ****1075)</code> &amp; auto-accrued <strong>CN¥${pay.commissionAmount.toLocaleString()} (15%)</strong> commission for <strong>${pay.partner}</strong>!`);
}

// ============================================================================
// 4. ADMIN.TIDYBAC.COM WORKSPACE (GOVERNANCE, SUBDOMAIN RBAC & DATA BACKFILL)
// ============================================================================
function renderAdminWorkspace() {
  if (state.subTab === "backfill") return renderAdminBackfillRunner();

  const keys = Object.keys(state.permissions);
  return `
    <div class="page-header">
      <div>
        <h1>Team Access (<code>admin.tidybac.com/rbac</code>)</h1>
        <p>Toggle which subdomains each team member can access.</p>
      </div>
    </div>

    <div class="card">
      <table>
        <thead>
          <tr>
            <th>User &amp; Role</th>
            <th>Entities</th>
            <th><code>sales</code></th>
            <th><code>class</code></th>
            <th><code>finance</code></th>
            <th><code>admin</code></th>
            <th><code>my</code></th>
          </tr>
        </thead>
        <tbody>
          ${keys.map(k => {
            const u = state.permissions[k];
            return `
              <tr>
                <td>
                  <strong>${u.name}</strong>
                  <div style="font-size:11.5px; color:#64748b;">${u.roleTitle}</div>
                </td>
                <td>${u.entities.map(e => `<span class="badge b-slate">${e}</span>`).join(" ")}</td>
                ${["sales", "class", "finance", "admin", "my"].map(sub => `
                  <td>
                    <input type="checkbox" ${u[sub] ? "checked" : ""} onchange="togglePermission('${k}', '${sub}', this.checked)" style="width:17px; height:17px; cursor:pointer;" />
                  </td>
                `).join("")}
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderAdminBackfillRunner() {
  return `
    <div class="page-header">
      <div>
        <h1>Phase 2 Automated Data Backfill Runner (<code>admin.tidybac.com/backfill</code>)</h1>
        <p>Idempotent migration script that repairs existing production records on <code>tidybac.com</code> with zero downtime.</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-success" onclick="runBackfillSimulation()">
          ⚡ Run Safe Production Backfill Simulation
        </button>
      </div>
    </div>

    <div class="card">
      <table>
        <thead>
          <tr>
            <th>Backfill Task</th>
            <th>TidyBac 1.0 Production State (Before)</th>
            <th>TidyBac 2.0 State (After Script)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Bilingual Lead &harr; Student Linker</strong></td>
            <td>Chinese Leads (<code>曾凡曦, 胡凯蓝, 林恩赐, 睿锶, 沈婧棋</code>) unlinked from English Students &rarr; <strong>$0 Attributed Revenue</strong></td>
            <td>All 68 Students linked to originating Leads &amp; Partners &rarr; <strong>CN¥8.27M Attributed</strong></td>
            <td><span class="badge ${state.backfillCompleted ? 'b-green' : 'b-amber'}">${state.backfillCompleted ? '✓ 68/68 Linked' : 'Ready to Run'}</span></td>
          </tr>
          <tr>
            <td><strong>2. Extract Part-Time Teachers from Section Titles</strong></td>
            <td><code>TEACHER: Unassigned</code> on 78 SOA sections; names typed into strings (<code>-朱老师40H</code>)</td>
            <td>12 Teachers (<code>朱老师, 杨老师, 郁老师, 刘老师...</code>) created &amp; linked to sections</td>
            <td><span class="badge ${state.backfillCompleted ? 'b-green' : 'b-amber'}">${state.backfillCompleted ? '✓ 12 Teachers Linked' : 'Ready to Run'}</span></td>
          </tr>
          <tr>
            <td><strong>3. Backfill Academic Terms on 119 Sections</strong></td>
            <td><code>119 NO TERM</code> sections sitting in Unassigned bucket</td>
            <td>All 162 sections assigned to <code>2025-2026</code> or <code>2026-2027 Fall</code></td>
            <td><span class="badge ${state.backfillCompleted ? 'b-green' : 'b-amber'}">${state.backfillCompleted ? '✓ 119 Terms Assigned' : 'Ready to Run'}</span></td>
          </tr>
          <tr>
            <td><strong>4. Resolve 100 Orphaned Revenue Payments</strong></td>
            <td><code>100 Orphaned payments (CN¥8,363,111.37)</code> due to empty <code>Contracts (0)</code> table</td>
            <td>101/101 payments linked to Student Program Enrollment Billing Plans (<strong>0 Orphans</strong>)</td>
            <td><span class="badge ${state.backfillCompleted ? 'b-green' : 'b-amber'}">${state.backfillCompleted ? '✓ 0 Orphans' : 'Ready to Run'}</span></td>
          </tr>
          <tr>
            <td><strong>5. Consolidate Duplicate Partner Rows</strong></td>
            <td>8 separate rows for <code>翰林</code>; <code>小红书</code> in Partners while <code>Digital (0)</code> is empty</td>
            <td>Grouped into 2-level <code>Parent Partner &rarr; Sub-Channel</code> hierarchy</td>
            <td><span class="badge ${state.backfillCompleted ? 'b-green' : 'b-amber'}">${state.backfillCompleted ? '✓ Merged Cleanly' : 'Ready to Run'}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function renderAdminDataLists() {
  return `
    <div class="page-header">
      <div>
        <h1>Unified Data Dictionary &amp; School/Test Registry (<code>admin.tidybac.com/lists</code>)</h1>
        <p>Moved out of the hidden drill-down on <code>/students/statistics</code> and normalized into single canonical taxonomies.</p>
      </div>
    </div>
    <div class="grid-equal">
      <div class="card">
        <h3 class="card-title">Unified Grade Taxonomy (Replaces 3 Conflicting Lists)</h3>
        <p style="font-size:12.5px; color:#475569;">In TidyBac 1.0, Leads used <code>8..12</code>, API used <code>Freshman/Sophomore</code>, and Badges used <code>G 11 / SO</code>. Standardized across all 5 subdomains:</p>
        <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:10px;">
          ${["G6", "G7", "G8", "G9 (Freshman)", "G10 (Sophomore)", "G11 (Junior)", "G12 (Senior)", "Graduated", "College"].map(g => `<span class="badge b-indigo">${g}</span>`).join("")}
        </div>
      </div>
      <div class="card">
        <h3 class="card-title">Verified Feeder Schools &amp; Standardized Tests</h3>
        <p style="font-size:12.5px; color:#475569;">Centralized school &amp; test type dictionary:</p>
        <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:10px;">
          ${["WLSA上海", "上海世外", "上海包玉刚", "上中国际", "深国交", "Santa Margarita Catholic HS", "The Stony Brook School", "AP Exam", "TOEFL", "SAT", "ACT"].map(s => `<span class="badge b-green">${s}</span>`).join("")}
        </div>
      </div>
    </div>
  `;
}

function togglePermission(userKey, subKey, val) {
  state.permissions[userKey][subKey] = val;
  showToast(`Updated <strong>${state.permissions[userKey].name}</strong> access to <code>${subKey}.tidybac.com</code>: <strong>${val ? 'ALLOWED' : 'BLOCKED'}</strong>`);
}

function runBackfillSimulation() {
  state.backfillCompleted = true;
  renderAll();
  showToast("🎉 Phase 2 Data Backfill Complete! Linked 68 students &harr; 197 leads, extracted 12 teachers, assigned 119 terms, and resolved all 100 orphaned payments!");
}

// ============================================================================
// 5. MY.TIDYBAC.COM WORKSPACE (WECHAT MOBILE PARENT & STUDENT PORTAL)
// ============================================================================
function renderMyPortalWorkspace() {
  const stu = state.students[0]; // Xuni Sun
  const isZh = state.parentLang === "zh";

  return `
    <div class="mobile-only-stage">
      <div class="pane-label">📱 Mobile-Only Portal (WeChat Magic Link · <code>my.tidybac.com</code>)</div>
      <div class="phone-frame">
        <div class="phone-screen">
          <div class="wechat-bar">
            <span>✕ ${isZh ? "SOA在线美高 · 家长学情中心" : "SOA Online High School · Family Portal"}</span>
            <span style="font-size:12px; color:#4f46e5; cursor:pointer;" onclick="state.parentLang = state.parentLang === 'zh' ? 'en' : 'zh'; renderAll();">
              ${isZh ? "EN" : "中文"}
            </span>
          </div>

          <div style="padding:16px; background:linear-gradient(135deg, #1e1b4b, #4338ca); color:#fff;">
            <div style="font-size:11px; opacity:0.8;">${isZh ? "在读学生档案 · STU-2026-00102" : "ACTIVE STUDENT · STU-2026-00102"}</div>
            <div style="font-size:18px; font-weight:800; margin:2px 0;">
              ${isZh ? "孙栩妮 (Xuni Sun) · 11年级" : "Xuni Sun (孙栩妮) · Grade 11"}
            </div>
            <div style="font-size:12px; color:#c7d2fe;">
              ${isZh ? "项目：SOA美高全日制 · 班主任：Ava史老师" : "Program: SOA Full-Time · Advisor: Ava Shi"}
            </div>
          </div>

          <div style="padding:14px; display:flex; flex-direction:column; gap:12px;">
            <!-- Course Hours Progress Card -->
            <div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:12px;">
              <div style="font-size:12px; font-weight:700; color:#1e293b; display:flex; justify-content:space-between;">
                <span>${isZh ? "📊 总课时消耗进度" : "📊 Course Hours Progress"}</span>
                <span style="color:#4f46e5;">69.5h / 240h (29%)</span>
              </div>
              <div class="burn-bar-track" style="height:10px; margin:6px 0;">
                <div class="burn-seg-completed" style="width:29%"></div>
                <div class="burn-seg-scheduled" style="width:10%"></div>
              </div>
              <div style="font-size:11.5px; color:#059669; font-weight:600;">
                ✓ ${isZh ? "美高平台测验均分：93%（已达 ≥90% 学分要求）" : "US Platform Quiz Avg: 93% (≥90% Target)"}
              </div>
            </div>

            <!-- Active Courses Card -->
            <div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:12px;">
              <div style="font-size:12px; font-weight:700; color:#1e293b; margin-bottom:8px;">
                ${isZh ? "📚 本学期课程与任课老师" : "📚 Active Courses & Instructors"}
              </div>
              ${stu.courses.map(c => `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid #f1f5f9; font-size:12px;">
                  <div>
                    <strong>${c.name}</strong>
                    <div style="font-size:11px; color:#64748b;">👩‍🏫 ${c.teacher} · ${c.term}</div>
                  </div>
                  <span class="badge b-indigo">${c.consumed}/${c.allocated}h</span>
                </div>
              `).join("")}
            </div>

            <!-- Tuition Status Card -->
            <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:12px; padding:11px 12px; font-size:12px; display:flex; justify-content:space-between; align-items:center;">
              <span>${isZh ? "💳 学费账单 (CN¥420,000)" : "💳 Tuition (CN¥420,000)"}</span>
              <span class="badge b-green">${isZh ? "已缴清" : "Paid"}</span>
            </div>

            <button class="btn btn-primary" style="width:100%; justify-content:center;" onclick="showToast('📄 Downloaded bilingual Parent Progress Report PDF for Xuni Sun!')">
              📥 ${isZh ? "下载最新双语学情报告 (PDF)" : "Download Progress Report (PDF)"}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Initialize Demo on Load
window.addEventListener("DOMContentLoaded", () => {
  renderAll();
});
