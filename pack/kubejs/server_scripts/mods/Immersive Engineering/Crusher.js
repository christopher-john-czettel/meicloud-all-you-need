
ServerEvents.recipes(allthemods => {
    function crusher(input, energy, output) {
        allthemods.custom(
            {
                "type": "immersiveengineering:crusher",
                "energy": energy,
                "input": Ingredient.of(input).toJson(),
                "result": {
                    "basePredicate": {
                        "item": output.item
                    },
                    "count": output.count
                }
            }
        )
    }

    crusher('#ae2:all_certus_quartz',2400, {item: 'ae2:certus_quartz_dust', count: 1})
    crusher('ae2:fluix_crystal', 2400, {item: 'ae2:fluix_dust', count: 1})
    crusher('ae2:sky_stone_block', 2400, {item: 'ae2:sky_dust', count: 1})
    crusher('#c:ender_pearls', 2400, {item: 'ae2:ender_dust', count: 1})
})

