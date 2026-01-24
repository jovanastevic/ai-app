import {Button} from "@/components/ui/button"
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
import {api} from "@/lib/api";

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export function _CreatePromptCard() {
    async function fetchCategories() {
        const response = await api.getCategories();
    }


    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle className="text-2xl">Erstelle Prompt</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <Combobox items={frameworks}>
                            <ComboboxInput placeholder="Kategorie wählen"/>
                            <ComboboxContent>
                                <ComboboxEmpty>Keine Einträge gefunden</ComboboxEmpty>
                                <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem key={item} value={item}>
                                            {item}
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
                <Button type="submit" className="">
                    Posten
                </Button>
            </CardFooter>
        </Card>
    )
}
