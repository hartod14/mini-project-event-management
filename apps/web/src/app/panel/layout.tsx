import PanelMenubar from "@/components/Panel/menu-bar/PanelMenubar"

export default function PanelLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <PanelMenubar>
            {children}
        </PanelMenubar>
    )
}