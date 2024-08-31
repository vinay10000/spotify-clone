"use client"

import Box from "@/components/Box";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
    return (
        <Box className="h-full flex items-center justify-center">
            <div className="text-neutral-400">Something went wrong</div>
        </Box>
    )
} 

export default Error