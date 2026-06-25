// Creating Space wants rocket fuel; Mekanism produces hydrogen + sodium-based fuel chains.
// Tag-bridge so CS rockets accept Mekanism-derived hydrogen.
ServerEvents.tags('fluid', e => {
    e.add('c:hydrogen', 'mekanism:hydrogen')
    e.add('c:rocket_fuel', 'creating_space:rocket_fuel')
    e.add('c:rocket_fuel', 'mekanism:hydrogen')
})
