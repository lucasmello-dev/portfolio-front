interface KanbanColumnProps {
  title: string
  count: number
  children: React.ReactNode
}

export default function KanbanColumn({ title, count, children }: KanbanColumnProps) {
  return (
    <div className="min-w-[280px] flex-1">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
          {count}
        </span>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  )
}
