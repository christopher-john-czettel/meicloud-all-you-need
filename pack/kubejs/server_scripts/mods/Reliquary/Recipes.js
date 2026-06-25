
ServerEvents.recipes(allthemods => {
    allthemods.remove('reliquary:fertile_lily_pad')
    allthemods.shaped('reliquary:fertile_lily_pad', [
        'EME',
        'MLM',
        'EME'
    ],{
        E: 'reliquary:fertile_essence',
        L: 'minecraft:lily_pad',
        M: 'naturesaura:effect_powder[naturesaura:effect_powder_data={effect:"naturesaura:plant_boost"}]'
    })
})

