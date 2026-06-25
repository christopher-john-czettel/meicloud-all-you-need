
ServerEvents.recipes(allthemods => {
    allthemods.remove({ id: 'mininggadgets:upgrade_empty' })
    allthemods.shaped('mininggadgets:upgrade_empty', ['RAL', 'DGD', 'LAR'], {
      'L': '#c:storage_blocks/lapis',
      'R': '#c:storage_blocks/redstone',
      'D': '#c:gems/diamond',
      'A': '#c:nuggets/allthemodium',
      'G': '#c:glass_panes'
    })
  })
  
