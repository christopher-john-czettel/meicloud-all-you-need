
ServerEvents.recipes(allthemods => {

    allthemods.replaceInput({mod: 'modern_industrialization'}
        , Fluid.ingredientOf("modern_industrialization:crude_oil")
        , Fluid.ingredientOf("#c:crude_oil"))
})

