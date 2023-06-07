import { Box } from "@mui/material";
import ReactPlayer, { ReactPlayerProps } from "react-player";

const GymVideo = ((props: ReactPlayerProps) => {
    return (
        <Box position="relative" pt="56.25%" >
            <ReactPlayer
                {...props}
                style={{ position: "absolute", top: 0, right: 0 }}
                width='100%'
                height='100%'
            />
        </Box>
    )
})

export default GymVideo