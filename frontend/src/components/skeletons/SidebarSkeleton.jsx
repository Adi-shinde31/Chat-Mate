export function SidebarSkeleton() {
  return (
    <aside className="w-64 h-screen border-r border-gray-200 p-4 bg-base-100">
      <div className="animate-pulse space-y-4">
        <div className="h-5 bg-base-300 rounded w-1/2"></div>

        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-base-300 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-base-300 rounded w-3/4"></div>
              <div className="h-3 bg-base-300 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
