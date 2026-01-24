/*import {Button} from "@/components/ui/button"
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"

import {useState} from "react"
import {api} from "@/lib/api"

export function Auth() {


    return (
        <Combobox items={comboboxItems}
                  itemToStringValue={(item) => item.label}
                  onValueChange={handleCategoryChange}
        >
            <ComboboxInput placeholder="Kategorie wählen"/>
            <ComboboxContent>
                <ComboboxEmpty>Keine Einträge gefunden</ComboboxEmpty>
                <ComboboxList>
                    {(category) => (
                        <ComboboxItem key={category.value} value={category}>
                            {category.label}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}
*/