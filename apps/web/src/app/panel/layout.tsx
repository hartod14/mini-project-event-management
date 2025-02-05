import PanelMenubar from "@/components/Panel/menu-bar/PanelMenubar"
import LoadingProvider from "@/context/LoadingContext"

export default function PanelLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <body>
            <LoadingProvider>
                <PanelMenubar>
                    {children}
                </PanelMenubar>
            </LoadingProvider>
        </body>
    )
}