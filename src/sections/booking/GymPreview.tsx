import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import Image from "../../components/Image";
import { Gym } from "../../types";
import { fCurrency } from "../../utils/formatNumber";


export default function GymPreview({ gym }: { gym: Gym }) {
    return (
        <Card>
            <CardContent>
                <Stack spacing={2}>
                    <Image src={gym.images[0]} borderRadius={2} />
                    <Typography variant="h3">{gym.name}</Typography>
                    <Divider />
                    <Typography>合計額 : <Typography fontSize={24} fontWeight={700} component="strong" color="primary.main">{fCurrency(gym.price)}</Typography></Typography>
                </Stack>
            </CardContent>
        </Card>
    )
}