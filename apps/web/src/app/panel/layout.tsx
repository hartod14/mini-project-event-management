import PanelMenubar from "@/components/panel/menu-bar/PanelMenubar";
import LoadingProvider, { LoadingContext } from "@/context/LoadingContext"
import { Spinner } from "@material-tailwind/react";

export default function PanelLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>
                <LoadingProvider>
                    <PanelMenubar>{children}</PanelMenubar>
                </LoadingProvider>
            </body>
        </html>
    )
}