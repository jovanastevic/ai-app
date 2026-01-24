/*import {Button} from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"

type Category = {
    name: string
    value: string
}

const categories: Category[] = [
    { name: "Hausübung", value: "5" },
    { name: "Hausübung1", value: "sveltekit" },
    { name: "Bauen", value: "6" },
]

export function TestCard() {

    async handlePromptSubmit(e: React.FormEvent) {
        e.preventDefault();
        const response = await api.createPrompt({

        })
    }

    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Erstelle Prompt</CardTitle>
            </CardHeader>
            <CardContent>
                <form id="create-prompt-form" onSubmit={handlePromptSubmit}>
                    <div className="flex flex-col gap-6">
                        <Combobox items={categories} >
                            <ComboboxInput placeholder="Kategorie wählen"/>
                            <ComboboxContent>
                                <ComboboxEmpty>Keine Einträge gefunden</ComboboxEmpty>
                                <ComboboxList>
                                    {(category) => (
                                        <ComboboxItem key={category.id} value={category}>
                                            {category.name}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Titel</Label>
                            <Input
                                id="title"
                                type="text"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Beschreibung</Label>
                            </div>
                            <Textarea id="description" placeholder="Gib hier deinen Prompt ein... " required/>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="" form="create-prompt-form">
                    Posten
                </Button>
            </CardFooter>
        </Card>
    )
}*/
