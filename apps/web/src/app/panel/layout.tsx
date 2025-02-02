import PanelMenubar from "@/components/PanelMenubar"

export default function PanelLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <PanelMenubar>
                {children}
            </PanelMenubar>
        </>
    )
}