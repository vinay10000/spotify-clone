"use client"

import Box from "@/components/Box"
import { HashLoader } from "react-spinners"

const Loading = () => {
    return (
        <Box className="h-full flex items-center justify-center">
            <HashLoader color="green" size={40} />
        </Box>
    )
}

export default Loading