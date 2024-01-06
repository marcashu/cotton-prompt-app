import SettingsSideNav from "@/components/modules/settings/SettingsSideNav"
import { TypographyH2 } from "@/components/ui/typography"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <TypographyH2>Settings</TypographyH2>
      <div className="flex mt-8">
        <aside className="w-1/5">
          <SettingsSideNav />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
