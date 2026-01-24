import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function PromptCard() {
    return (
        <Card className="mx-auto w-full max-w-1/2">
            <CardHeader>
                <div>
                    <Badge>Category</Badge>
                    <Badge variant="secondary">Category</Badge>
                </div>
                <CardTitle><a href="/#openDetail">Prompt Title</a></CardTitle>
                <CardDescription>
                    24.01.2026
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>
                    prompt description lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
            </CardContent>
        </Card>
    )
}
