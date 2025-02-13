import PanelMenubar from "@/components/Panel/menu-bar/PanelMenubar"
import LoadingProvider, { LoadingContext } from "@/context/LoadingContext"
import { Spinner } from "@material-tailwind/react";

export default function PanelLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <LoadingProvider>
            <PanelMenubar>{children}</PanelMenubar>
        </LoadingProvider>
    )
}