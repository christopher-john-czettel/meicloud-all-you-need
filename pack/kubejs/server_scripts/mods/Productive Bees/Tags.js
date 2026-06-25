
ServerEvents.tags('item', event => {
    event.add('functionalstorage:ignore_crafting_check', 'productivebees:draconic_dust')
    event.add('c:storage_blocks/niter', '#c:storage_blocks/saltpeter')
    event.add('c:dusts/niter', '#c:dusts/saltpeter')
    event.add('functionalstorage:ignore_crafting_check', 'productivebees:obsidian_shard')
    event.add('megacells:compression_overrides', 'productivebees:obsidian_shard')
    event.add('productivebees:flowers/plastic', 'industrialforegoing:plastic')
})
ServerEvents.tags('block', event => {
    event.add('c:storage_blocks/niter', '#c:storage_blocks/saltpeter')
})

