// Aeronautics' rotor uses its own steel. Almost Unified usually handles this
// but adding a tag entry as belt-and-braces.
ServerEvents.tags('item', e => {
    e.add('c:ingots/steel', 'create_aeronautics:steel_ingot')
})
