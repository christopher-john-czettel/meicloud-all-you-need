
const substrates = ['stone', 'deepslate', 'kivi']
//global.xycraftColours = ['light', 'dark', 'red', 'green ', 'blue']


ServerEvents.tags('item', event => {
    event.add('megacells:compression_overrides', /xycraft_world:xychorium_gem_+?/)
    event.add('megacells:compression_overrides', /xycraft_world:xychorium_storage_+?/)
    event.add('megacells:compression_overrides', 'minecraft:pointed_dripstone')
    event.add('functionalstorage:ignore_crafting_check', 'minecraft:pointed_dripstone')

    global.xycraftColours.forEach(colour => {
        substrates.forEach(substrate => {
            event.add(`c:ores/xychorium_${colour}`, `xycraft_world:xychorium_ore_${substrate}_${colour}`)
            console.log(`tag= c:ores/xychorium_${colour} and item= xycraft_world:xychorium_ore_${substrate}_${colour}`)
        })
    })
})

