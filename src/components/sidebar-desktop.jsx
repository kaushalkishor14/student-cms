export function SidebarDesktop() {
  return (
    <side className="w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border">
      <diV className="h-full px-3 py-4">
        <h3 className="mx-3 text-lg font-semibold text-foreground text-black">
          {" "}
          Menu
        </h3>
        <div className="mt-5">
          <div className="flex flex-col w-full gap-2"></div>
        </div>
      </diV>
    </side>
  );
}
