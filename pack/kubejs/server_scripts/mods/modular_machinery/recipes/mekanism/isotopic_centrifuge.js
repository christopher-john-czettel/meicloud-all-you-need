
if (Platform.isLoaded('modular_machinery_reborn')) {
ServerEvents.recipes(allthemods => {

    let multiplier = 2048
    let energy = 256

    const recipes = {
        'mekanism:nuclear_waste': [5, ['mekanism:plutonium', 1]],
        'mekanism:uranium_hexafluoride': [1, ['mekanism:fissile_fuel', 1]],
    }

    for (const [input, [inamount, [output, outamount]]] of Object.entries(recipes)) {
        allthemods.recipes.modular_machinery_reborn.machine_recipe('atm:isotopic_centrifuge', 5)
            .requireEnergy(multiplier * energy, 8, 8)
            .requireChemical(`${inamount * multiplier}x ${input}`, 31, 26)
            .progressX(64)
            .progressY(26)
            .produceChemical(`${outamount * multiplier}x ${output}`, 100, 26)
            .width(126)
            .height(84)
    }

})
}


