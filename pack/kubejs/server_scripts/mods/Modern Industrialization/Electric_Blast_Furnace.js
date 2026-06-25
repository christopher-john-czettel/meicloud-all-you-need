
ServerEvents.recipes(allthemods => {

    allthemods.recipes.modern_industrialization.blast_furnace(64, 200)
        .itemIn("16x #minecraft:coals")
        .itemOut("16x modern_industrialization:coke")
        .fluidOut("8000x modern_industrialization:creosote")
})

