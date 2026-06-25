
ServerEvents.recipes(allthemods => {
    allthemods.remove({id: 'forbidden_arcanus:smelting/dark_matter'})
    allthemods.smelting('forbidden_arcanus:dark_matter', 'forbidden_arcanus:edelwood_log')
})

