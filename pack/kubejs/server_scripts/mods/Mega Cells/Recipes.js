
ServerEvents.recipes(allthemods => {

    allthemods.remove({output: 'megacells:radioactive_cell_component'})
    allthemods.shaped('megacells:radioactive_cell_component',
        [
            'ADA',
            'BCB',
            'ADA'
        ], {
            A: 'megacells:accumulation_processor',
            B: 'mekanism:radioactive_waste_barrel',
            C: 'megacells:cell_component_64m',
            D: '#c:pellets/antimatter',
        })

})

