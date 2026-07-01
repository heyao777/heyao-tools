export type ToolCategory = "AI 提问" | "内容处理" | "求职" | "写作" | "学习";

export type ToolItem = {
  title: string;
  description: string;
  href: string;
  category: ToolCategory;
  icon: string;
  buttonText: string;
  keywords: string[];
};

export const tools: ToolItem[] = [
  {
    title: "Prompt 诊断改写器",
    description: "先检查 Prompt 缺少哪些关键信息，再生成结构化、可复制的优化版本。",
    href: "/tools/prompt-rewriter",
    category: "AI 提问",
    icon: "诊",
    buttonText: "诊断并改写",
    keywords: ["Prompt", "AI 提问", "写作", "学习", "结构化"],
  },
  {
    title: "角色提示词生成器",
    description: "根据角色、任务、语气和格式生成可复用的 System Prompt。",
    href: "/tools/role-prompt-builder",
    category: "AI 提问",
    icon: "角",
    buttonText: "生成角色",
    keywords: ["Prompt", "角色", "System Prompt", "AI 提问"],
  },
  {
    title: "文本清洗工具",
    description: "清理复制文本中的多余空格、重复换行和杂乱格式。",
    href: "/tools/text-cleaner",
    category: "内容处理",
    icon: "清",
    buttonText: "清洗文本",
    keywords: ["清洗", "文本", "内容处理", "写作", "复制"],
  },
  {
    title: "求职表达优化器",
    description: "把普通经历整理成更适合简历或面试使用的表达。",
    href: "/tools/resume-expression",
    category: "求职",
    icon: "职",
    buttonText: "优化经历",
    keywords: ["简历", "求职", "面试", "自我介绍", "表达"],
  },
];

export const navItems = [
  { label: "首页", href: "/" },
  { label: "工具箱", href: "/tools" },
  { label: "Prompt 诊断改写", href: "/tools/prompt-rewriter" },
  { label: "角色生成器", href: "/tools/role-prompt-builder" },
  { label: "文本清洗", href: "/tools/text-cleaner" },
  { label: "求职表达", href: "/tools/resume-expression" },
  { label: "设计说明", href: "/case-study" },
  { label: "关于", href: "/about" },
];
