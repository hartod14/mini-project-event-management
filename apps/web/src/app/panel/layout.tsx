import PanelMenubar from "@/components/panel/menu-bar/PanelMenubar"
import LoadingProvider from "@/context/LoadingContext"

export default function PanelLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <LoadingProvider>
            <PanelMenubar>
                {children}
            </PanelMenubar>
        </LoadingProvider>
    )
}