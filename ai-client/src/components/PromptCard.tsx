import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {formatTimestamp} from "@/lib/utils.ts";

export function PromptCard({prompt}) {
    return (
        <Card className="mx-auto w-full max-w-1/2">
            <CardHeader>
                <div>
                    <Badge>Category</Badge>
                </div>
                <CardTitle><a href={`/prompt/${prompt.id}`}>{prompt.title}</a></CardTitle>
                <CardDescription>
                    <span className="font-bold">@{prompt.userowner}</span> - {formatTimestamp(prompt.time_stamp)}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>
                    {prompt.description}
                </p>
            </CardContent>
        </Card>
    )
}
