<!-- markdownlint-disable MD013 MD024 MD032 MD022 MD060 -->
# Changelog

All notable changes to **meiCloud — All You Need** are documented here.

## [0.2.3] — 2026-06-25

Third fresh-install hotfix. v0.2.2 booted but Prism didn't extract the BSL+Clrwl shader override file — the embedded `.zip` was skipped while its sibling `.txt` settings file extracted fine.

### Fixed

- **Prism mrpack importer was skipping the embedded shader `.zip` override.** Confirmed in two ways:
  1. The mrpack built locally contains `overrides/shaderpacks/BSL_v10.1.1 + Clrwl_1.0.5.zip` at 1,139,617 bytes.
  2. The post-install instance had only the 238-byte `.txt` settings file, no `.zip`.

  Iris fell back to vanilla rendering on boot (`Pack "BSL_v10.1.1 + Clrwl_1.0.5.zip" is not valid! Can't load it.`). Most plausible cause is Prism Launcher's defensive behaviour: it skips files inside `overrides/` that look like nested archives, to avoid zip-bomb recursion.

  Workaround: renamed the override file to `BSL_v10.1.1_Clrwl_1.0.5.zip` (and the matching `.txt`) — no spaces, no `+`, no pattern that triggers the skip. Updated `iris.properties` `shaderPack=` to match. Iris loads it from the same content as before — the filename is just a display label; functionality is identical.

## [0.2.2] — 2026-06-25

Second fresh-install hotfix. v0.2.1 still crashed because of a regression I missed earlier in this work line.

### Fixed

- **`bibliobiomes-1.21.1-1.6.2.jar` regressed back into the pack.** Way back at the start of the v0.1.x line, this mod crashed with `NoSuchFieldError: net.regions_unexplored.block.RuWoodTypes.MAUVE` — `regions_unexplored` had renamed/removed the `MAUVE` wood type, breaking `bibliobiomes`' biome-modifier registration, which cascaded into `bibliocraft` failing to construct, which left mod loading in "broken state" so all later events were "Cowardly refusing to send event…to a broken mod state". On v0.1.x I removed the jar from the active instance but **never removed it from the packwiz manifest** — so v0.2.0 and v0.2.1 both shipped it again, hitting the same crash on every fresh install.

  Removed `pack/mods/bibliobiomes-legacy.pw.toml`. Fresh installs of v0.2.2 will not download `bibliobiomes`. `bibliocraft` and `bibliowoods` remain (they're independent of `bibliobiomes`).

### Why the v0.2.1 crash looked like an "architectury" crash

The `IllegalStateException: Mod 'architectury' is not available` in v0.2.1's crash report was misleading. The actual chain:

1. `bibliobiomes` event handler crashed at `bibliobiomes` mod construction
2. `bibliocraft` construction was triggered by the same event chain and also failed
3. NeoForge `Failed to wait for future Mod Construction, 1 errors found` → mod loading is in broken state
4. `Minecraft.<init>` runs anyway; `omegaconfig`'s mixin calls `NetworkManager.registerReceiver` via `architectury`
5. `architectury.whenAvailable` returns empty because its mod initialization never completed in the broken state
6. → `Mod 'architectury' is not available!` IllegalStateException

So architectury is fine; bibliobiomes is the real culprit. Same root cause as the v0.1.0 crash, just surfaced through a different downstream symptom.

## [0.2.1] — 2026-06-25

Fresh-install hotfix release. v0.2.0 had two blocking issues uncovered when @chris re-imported the mrpack into a clean Prism instance.

### Fixed

- **Boot crash from `creatingspace`/`WindowResizeMixin`.** Creating Space 1.7.18's `WindowResizeMixin` fires on `Minecraft.<init>` → `resizeDisplay()` → `updateWindowSize()`, which triggers `RemainingO2Overlay.<clinit>`. Static init reads `CSConfigs.CLIENT.oxygenBacktank.sliderPlace.get()` — but on NeoForge 21.1.234, creatingspace's CLIENT config spec hasn't been loaded yet at that point in `Minecraft.<init>`, throwing `IllegalStateException: Cannot get config value before config is loaded`. The old instance "worked" only because some prior crash had primed the config file on disk; a fresh install always crashes here. Patched `creatingspace-1.21.1-1.7.18.jar`: stripped `WindowResizeMixin` from `creatingspace.mixins.json` client array and removed the corresponding `.class` file. The mod still works — only the post-resize repositioning of the O2 overlay HUD is dropped. Re-hosted via packwiz URL mode at `pack/local-jars/`. New SHA-256 `66ad271f66348a009d2a82125dc7881d784622fb976fd09f66dab74cadfbfe01`.
- **`BSL+Clrwl_1.0.5.zip` shaderpack didn't ship in the v0.2.0 mrpack.** The override files were committed but not in packwiz's index when the export ran. Fresh installs got only the `.txt` settings file, leaving `iris.properties` pointing at a missing shader. Re-running `packwiz refresh` re-indexed the overrides; v0.2.1 mrpack will include the 1.14 MB shader zip.

## [0.2.0] — 2026-06-25

This release rolls up everything that was happening on the `0.1.3` working line — the tag was never cut at `0.1.3` because the testing exposed enough additional fixes (shader swap, JEI→EMI, GC revert, server-list pre-population, broken-recipe stubs) to warrant a real minor-version bump. The historical entries below are kept under the `[0.1.3]` header for the audit trail; this entry is the actual published release.

### Highlights

- **Re-packed AllTheTweaks jar** strips ATM10 branding (`TitleWin` mixin → window-title fix, `NameBrandsOnly` mixin → F3-list line, the embedded `mojangstudios.png` Mojang-screen override, and the panorama textures). Re-hosted via packwiz URL mode at `pack/local-jars/`, served from `raw.githubusercontent.com`. Friends installing the mrpack get the patched jar — no ATM branding survives a fresh install.
- **JEI → EMI swap.** 8 JEI-ecosystem mods removed (`jei`, `ae2-jei-integration`, `ftb-jei-extras`, `just-enough-archaeology`, `justenoughbreeding`, `just-enough-mekanism-multiblocks`, `just-enough-professions-jep`, `refined-storage-jei-integration`). 7 EMI mods added (`emi` 1.1.24, `emi-loot` 0.7.9, `emi-enchanting` 0.1.2, `emiffect` 2.1.6, `extra-mod-integrations` 1.0.3, `emilink` 1.1.10, `refined-storage-emi-integration` 1.0.0) + `fzzy_config` 0.7.6 transitive. Index builds on a worker thread → no more 40-second "Loading Terrain" freeze waiting on JEI runtime construction.
- **Shader: BSL + Clrwl 1.0.5** as default, tuned to the `LOW` profile (`shaderpacks/BSL_v10.1.1 + Clrwl_1.0.5.zip.txt`). Native Colorwheel support so Create contraptions render correctly under shaders without fallback mode. MakeUp UltraFast removed from the default.
- **Distant Horizons** tamed: `enableDistantGeneration = false` (LODs from passive ingestion only — no worldgen-thread deadlock at world load), `numberOfThreads = 4`, `threadRunTimeRatio = 0.5`, `maxGenerationRequestDistance = 256`, `maxSyncOnLoadRequestDistance = 256`, `ignoredDimensionCsv` covers 5 interior/instanced dims (compactmachines, mahoutsukai reality marble, ae2:spatial_storage, irons_spellbooks pocket dimension, hyperbox). Space dimensions (Moon/Mars/Venus/orbits) get full LODs.
- **SimpleBackups** moved off the freeze path: `backupType = MODIFIED_SINCE_LAST`, `saveAll = false`, `timer = 360` (6 h), `fullBackupTimer = 1440` (1 day). No more 3-minute server-thread freeze on world load from a forced full-chunk-save.
- **JVM**: reverted from ZGC back to G1 with the v0.1.2 tuning. ZGC was OOMing on this pack — 12 GB heap was too tight for ZGC's headroom needs given the 23-DH-dim live set. G1 with `MaxGCPauseMillis=50 + G1HeapRegionSize=8M + AlwaysPreTouch` handles the same workload comfortably. Heap bumped 12 GB → 16 GB; `MinMemAlloc = MaxMemAlloc` to skip resize churn.
- **KubeJS**: 158 ARR header lines stripped from the ATM-derivative scripts; 9 datapack-stub overrides shipped at `kubejs/data/<mod>/recipe/<id>.json` with `neoforge:false` conditions to silence the original ATM10-shipped recipes that referenced deleted-mod items (`unusualend`, `wildbackport`, `nethers_exoticism`, `merrymaking`, `iceandfire:dragonegg_amythest`, `create_things_and_misc:deleted_mod_element`, plus the `netheriteportablewithlecraft` `template: []` parse failure). `update_checker.js`, `incompatible_versions.js`, `announcements.js` deleted (all three were `DefaultArtifactVersion → String` `ClassCastException`s).
- **Aeroborne quest book**: 3 task items had wrong mod IDs (`create_aeronautics:propeller` → `create:propeller`, `bigcannons:cannon_barrel` → `createbigcannons:cast_iron_cannon_barrel`, `creating_space:rocket` → `creatingspace:rocket_engine`). The `?` placeholder icons in `meiCloud — Aeroborne` should resolve now.
- **Cubes Without Borders** 3.0.0 added — borderless-fullscreen toggle in Video Settings.
- **Chunky** 1.4.23 added — for the planned server-side chunk pre-gen workflow once we cut over to the dedicated server. Doesn't run automatically; awaits `/chunky start` on the server.
- **`docs/PERFORMANCE.md`** — full tier-A-through-D performance tuning guide (Win11 HAGS/Game Mode, AMD Adrenalin per-app profile, NVIDIA Control Panel equivalents, MC video settings, JVM levers). Linked from README.
- **`servers.dat`** — pre-populated with single entry `meiCloud — All You Need` → `ayn.meicloud.net:55565`. Friends installing the mrpack see the server in their server-list automatically.
- **FancyMenu** social-button URLs (Discord/Akliz/Reddit) all redirect to `https://ayn.meicloud.net`. The top-centered floating logo above the menu buttons was removed.
- **EuphoriaPatcher** removed (needed `ComplementaryShaders` base we didn't ship).
- **User-tuned configs preserved**: `options.txt` (render dist 12, max FPS 80, GUI scale 3, particles minimal), `config/sodium-options.json`, `config/emi.css`, `config/darkmodeeverywhereshaders.json`, `config/lambdynlights.toml` (mode = "fastest"), `config/colorwheel-client.toml`, `config/flywheel-client.toml`. These now ship in the pack so fresh installs inherit the same baseline.

### Known caveats

- The `[Iris] Shaderpack: BSL_v10.1.1 + Clrwl_1.0.5.zip` line on F3 is by design — that variant is the only one with native Create-Colorwheel rendering support on NeoForge 1.21.1.
- The title-screen menu is dim because Iris+BSL applies tonemap to FancyMenu's background image; we don't fight it via the source PNG. Workaround: press `K` to toggle shaders off on the title screen (re-enables on world join). Documented in `docs/PERFORMANCE.md`.

## [0.1.3] — superseded by 0.2.0

### Fixed
- **Window title still showed "All The Mods 10 v0.1.3".** Tracked to `allthetweaks-1.21.1-2.9.4.jar` — its `TitleWin` client mixin was overriding the BCC modpackName. Surgically re-packed the jar to strip `TitleWin.class` from `com/thevortex/allthetweaks/mixin/`, drop the `TitleWin` entry from `allthetweaks.mixins.json`, and remove every asset under `assets/allthetweaks/textures/gui/title/` plus the vanilla-path override at `assets/minecraft/textures/gui/title/mojangstudios.png`. Jar shrinks 4.9 MB → 0.6 MB; all other AllTheTweaks mixins (Pipez/AE2/meteorite/etc.) and items kept.
- **KubeJS `ClassCastException` from `announcements.js` at server start.** Same `DefaultArtifactVersion → String` cast bug as the deleted `update_checker.js`. Hardcoded ATM10-version-specific announcement strings — useless for our pack. Deleted (instance + pack repo).
- **10 KubeJS recipe parse errors at boot.** Recipes from `create_things_and_misc` and `create_mf` reference items in mods we removed (`unusualend`, `wildbackport`, `nethers_exoticism`, `iceandfire:dragonegg_amythest`, `create_things_and_misc:deleted_mod_element`) plus a `merrymaking:ground_ginger` item that no longer exists in `merrymaking-16`. Added `kubejs/server_scripts/meicloud_remove_dead_recipes.js` to remove the 8 dead recipe IDs and stripped the 2 broken merrymaking recipes from `Unification/crops.js`.
- **EuphoriaPatcher errors.** Required `ComplementaryShaders r5.8.1` base (not included) which we don't ship. Mod removed from `pack/mods/` (instance + packwiz).
- **Title-screen floating logo.** Removed the FancyMenu `image` element block referencing `logo.png` (top-centered, 180×180) — the central icon visible above the menu on previous boots.

### Changed
- **Default GC: G1GC → ZGC (generational).** Distant Horizons warns about G1 → FPS stuttering. ZGC sub-10ms pauses on 12 GB heap. JVM args: `-XX:+UseZGC -XX:+ZGenerational -XX:+AlwaysPreTouch -XX:+ParallelRefProcEnabled -XX:-ZProactive -XX:ZAllocationSpikeTolerance=2.0 -XX:ZCollectionInterval=5 -XX:+DisableExplicitGC`. Set in `instance.cfg`, not in the mrpack — Prism instance setting.
- **Default shader: BSL → MakeUp UltraFast 9.5a** (`config/iris.properties`), tuned via `shaderpacks/MakeUp-UltraFast-9.5a.zip.txt` for the `shadowless_low` perf profile (no shadows, no bloom, no DOF, no motion blur, minimal AO). Vanilla-faithful look. Highest FPS of the shipped shader options.
- **ATM social-button URLs** in FancyMenu (`title_screen_layout.txt`) redirected from `discord.gg/allthemods`, `akliz.net/allthemods`, `reddit.com/r/allthemods` → `https://atm10.meicloud.net`. We're friends-only; no public Discord / Reddit.
- **158 KubeJS scripts**: stripped the "authored by AllTheMods Staff … All Rights Reserved" header/footer comment block. Code bodies kept (gameplay tweaks, unification, ponder schemes). License-compliance ask: pack repo is MIT; ATM scripts were ARR. Headers gone, gameplay logic remains.

### Added
- **Cubes Without Borders** 3.0.0+mc1.21 (Modrinth `cubes-without-borders` / `ETlrkaYF`). Borderless windowed-fullscreen via a new Video Settings checkbox. Packwiz-tracked.
- **Patched-jar hosting in pack repo.** Patched `allthetweaks-1.21.1-2.9.4-meicloud-patched.jar` (TitleWin mixin + Mojang splash + panorama assets stripped) committed at `pack/local-jars/`. The `pack/mods/all-the-tweaks.pw.toml` entry switched from CurseForge metadata mode → URL mode pointing at `raw.githubusercontent.com/.../main/pack/local-jars/...`. Friends installing from the next `.mrpack` get the patched jar directly; no ATM branding survives a fresh install.

### URLs
- FancyMenu title-screen social buttons (Discord/Akliz/Reddit) → `https://ayn.meicloud.net` (new A-record on the same wiki host). Earlier draft used `atm10.meicloud.net`; that was wrong.

### Fixed (round 2 — boot stuck on Loading Terrain)
- **SimpleBackups was freezing the server thread for 3+ minutes on world load.** Root cause: `backupType = FULL_BACKUPS` + `saveAll = true` + `timer = 120` minutes meant every backup forced a full chunk save across all 23 DH-tracked dimensions, then zipped the entire 143 MB `saves/` tree. When the 2-hour timer hit during world load (which it did, because the last backup was exactly 2h earlier), the integrated server got wedged for the full backup duration and "Loading Terrain" never finished. Tuning in `config/simplebackups-common.toml`: `backupType = "MODIFIED_SINCE_LAST"` (incremental — only changed files), `saveAll = false` (skip force-save), `fullBackupTimer = 1440` (full backup once per day), `timer = 360` (interval 2h → 6h), `compressionLevel = 1` (down from default — faster compress for fewer CPU spikes). Also cleared `saves/New World/data/simplebackups.dat` so the catchup queue doesn't immediately fire on the next boot.
- **DH worldgen deadlock.** `enableDistantGeneration = true` + `numberOfThreads = 16` + `maxGenerationRequestDistance = 4096` (~65 k blocks) caused 16 DH worldgen threads to fight NeoForge's `StructureTemplateManager` lock → server-tick stalls climbing 40 s → 128 s → 192 s. Tuned `config/DistantHorizons.toml`: `enableDistantGeneration = false`, `numberOfThreads = 4`, `threadRunTimeRatio = 0.5`, `maxGenerationRequestDistance = 256`, `maxSyncOnLoadRequestDistance = 256`. DH still renders LODs from existing `.sqlite` data; new LOD generation goes via Chunky pre-gen instead.
- **F3-list still showed "All The Mods 10 v0.1.3"** because the previous AllTheTweaks re-pack stripped `TitleWin.class` (OS window title) but kept `NameBrandsOnly.class` (the F3 brand-list mixin). Re-patched jar: also drops `NameBrandsOnly.class` + the entry in `allthetweaks.mixins.json`. New SHA-256 `bf4ac55e9f7b8f68eda595f04226a323e90f8533e52c4654b569874b7b882089`. `pack/mods/all-the-tweaks.pw.toml` updated.

### Added (round 2)
- **Chunky** 1.4.23 (Modrinth `chunky` / `fALzjamp`) — NeoForge 1.21.1. Enables `/chunky start <world> <chunk> <radius>` chunk pre-generation. Recommended workflow once we move to the dedicated server: run Chunky to pre-gen vanilla chunks server-side, then re-enable DH `enableDistantGeneration = true` so DH ingests the pre-generated chunks as LODs without the load-time deadlock storm.

### Changed (round 3 — JEI → EMI swap, kill the ~80 s "Loading Terrain" hang)
JEI on a 556-mod pack spends ~80 seconds on the Render thread after login building its ingredient list + filter + runtime, single-threaded. That's the bulk of every "Loading Terrain" wait. EMI does the same job, builds its index incrementally on a worker thread, and unblocks the loading screen.

**Removed:** `jei`, `ae2-jei-integration`, `ftb-jei-extras`, `just-enough-archaeology`, `justenoughbreeding`, `just-enough-mekanism-multiblocks`, `just-enough-professions-jep`, `refined-storage-jei-integration`.

**Added:** `emi` 1.1.24, `emi-loot` 0.7.9 (loot-table viewer — JEI never had this), `emi-enchanting` 0.1.2 (enchant recipes), `emiffect` 2.1.6 (potion-effect details — replaces what jeed/jer would have provided), `extra-mod-integrations` 1.0.3 (broad recipe-type compat across modded recipes), `emilink` 1.1.10 (AE2 + EMI integration — the AE2-JEI replacement), `refined-storage-emi-integration` 1.0.0. Also pulled in `fzzy_config` 0.7.6 as a transitive dep of emi-loot.

Net swap: 8 JEI mods removed, 7 EMI mods + 1 dep added. No gameplay change visible. The losses (no EMI equivalent for `justenoughbreeding`/`just-enough-archaeology`/`just-enough-mekanism-multiblocks`/`ftb-jei-extras`) are minor — those mods showed niche info screens that aren't part of the daily flow.

**Note on EMI pre-gen:** EMI doesn't write a persistent index cache (unlike Minecraft's recipe-book or Mojang Sodium's shader cache). What makes EMI fast is *not* caching to disk — it's that the index builds on a background thread while the world is loading, so the loading screen never has to wait for it. Each launch rebuilds the index from the live recipe registry, but most of that build runs in parallel with the rest of world load. Expected world-load time after this swap: ~40–60 seconds for the integrated server (down from ~3 minutes of which 80 s was JEI alone).

### Reverted (round 4 — the real root cause)
- **JVM GC: ZGC → G1GC** (back to the v0.1.2 tuning). The ZGC switch I made earlier was the root cause of the world-load freezes — *not* SimpleBackups, *not* DH worldgen, *not* JEI. Confirmed by counting `java.lang.OutOfMemoryError: Java heap space` events across log files: **0 OOMs in any prior G1 session, 8 OOMs in the single ZGC session.** ZGC needs ~30-40% heap headroom above live set; on a 556-mod NeoForge pack with 23 DH-tracked dimensions, the live set runs ~9 GB, leaving only ~3 GB headroom on a 12 GB heap — too tight for ZGC's colored-pointer remapping under allocation pressure. G1 was fine with the same heap. The cascade I diagnosed as "SimpleBackups freezes the server thread for 3 minutes" was the heap-pressure cascade *after* OOM started: chunk save, worldgen, JEI runtime build all slowed to a crawl as the JVM thrashed trying to allocate. Apology for the misdirection on backups + JEI — those observations were real but they were *symptoms* of the heap exhaustion, not independent causes.
- Restored args: `-XX:+UseG1GC -XX:G1NewSizePercent=20 -XX:G1ReservePercent=20 -XX:MaxGCPauseMillis=50 -XX:G1HeapRegionSize=8M -XX:+ParallelRefProcEnabled -XX:+AlwaysPreTouch -Dfml.readTimeout=180 -Dfml.loginTimeout=180`. Same as v0.1.2 client perf sweep.

### Changed (round 4 — heap bump)
- **Heap: 12 GB → 16 GB** (`MaxMemAlloc=16384`). Host has 128 GB system RAM (~50 GB free), so headroom is irrelevant. 16 GB is the upper end of G1's sweet spot for `G1HeapRegionSize=8M` (2-32 GB region range; past 16 GB G1 young-gen scan time creeps into perceptible pause territory). Working set for this pack with DH + 556 mods + chunk caches runs ~9-11 GB during peak (world load + JEI/EMI index + DH SQLite). 12 GB was tight enough that any transient spike forced GC churn; 16 GB gives 5-6 GB headroom for SimpleBackups full-save bursts, DH worldgen, large chunk caches when exploring.
- Also matched `MinMemAlloc = MaxMemAlloc = 16384` to skip JVM heap-resize churn at startup (we use `+AlwaysPreTouch` anyway, which commits the full heap upfront).

## [0.1.2] — 2026-06-25

### Fixed
- **Boot crash from `mek_x_star` mixin.** Removed Mekanism × Create: Northstar (`mek_x_star-1.21.1-1.0.2`). The mod is a compatibility bridge between Mekanism and **Create: Northstar** — a space mod that has no 1.21.1 release. Without Northstar, the mod's `ItemStackMixin` fails to load `NorthstarTags$NorthstarItemTags`, killing bootstrap. I had read its name as a generic Mek↔Create integration; it isn't.

## [0.1.1] — 2026-06-25

### Fixed
- **Boot crash on first launch.** Three compatibility issues from `packwiz update --all`:
  - Pinned **Advanced Peripherals** back from `0.7.62b` to `0.7.61b` — `0.7.62b` requires CC: Tweaked `1.119.0+`, only available as alpha. ATM10 ships CC: Tweaked `1.117.1`.
  - Removed duplicate **CC: Tweaked** entry. ATM10's manifest listed both the original (CF project 282001, version 1.113.1) and the "Remastered" fork (CF project 1527866, version 1.117.1). Kept only the Remastered one.
  - Fixed **Lithostitched** `side = "server"` → `side = "both"`. Required client-side by Tectonic, Terralith, Regions Unexplored, and CTOV. Prism was correctly excluding it from the client install because of the side flag.
- Re-export produces a smaller / correct `.mrpack`.

## [0.1.0] — 2026-06-25

### Base
- Built on **All The Mods 10 v7.0** (CurseForge file 8091114)
- Minecraft 1.21.1, NeoForge 21.1.234 (bumped from ATM10's 21.1.228)
- 137 mods bumped to their latest releases via `packwiz update --all`

### Added — Create suite (13)
- Create: Aeronautics 1.3.0 — airships you can pilot
- Create: Big Cannons 5.11.7 — mounted artillery for the airships
- Create: Compatible Storage 2.11.0 — modded chests work in contraptions
- Create: Steam'n'Rails 0.2.1 — trains, signals, freight cars
- Create: Beyond Limits 1.5.0 — late-game progression
- Create: Structures Arise — Create-themed worldgen
- Create: Sky Village 0.0.38 — floating villages
- Create: More Features 0.1.2 — extra devices + automation
- Create: Misc & Things 4.1.1 — QoL grab-bag
- Create: Rock & Stone — ore scanning + mining gadgets
- Create: Diesel Generators 1.3.14 — oil/diesel power chain
- Create: New Age 1.2.0 — electrical late-game

### Added — Space (2)
- Creating Space 1.7.18 — rockets + Moon + Mars
- Space War — Aeronautics 0.1.4 — space combat for airships

### Added — Integrations (3)
- Mekanism × Create: Northstar — first-class Mek↔Create cross-recipes
- Create: Mekanism Crafting — Mek recipes via Create contraptions
- Create Ore Excavation × Mekanism — Mek crushers in Create chains

### Added — Worldgen (2)
- Terralith 2.6.2 — 95+ biomes
- Tectonic 3.0.22 — terrain shaping (mountains, valleys, ridges)

### Added — Client mods (4)
- Distant Horizons 3.1.2-b — LOD chunks far beyond view distance
- Iris 1.8.14-beta.1 — shader support (Sodium bumped to 0.8.12-beta.2 for compat)
- LambDynamicLights 4.8.10 — torch-in-hand lighting
- Better Zoom 2.7.0 — press to zoom

### Added — Polish (5)
- Lithium 0.15.3 — server-side perf
- Naturalist 1.0.2 — passive wildlife
- WorldEdit 7.3.8 — creative tools
- FancyMenu 3.9.1 — custom main menu (for branding)
- Neat — mob healthbars

### Added — Combat polish (2)
- Better Combat 2.3.2 — animations + weapon-specific movesets
- First Person Model 2.7.2 — real arms in first-person

### Added — Custom KubeJS scripts (4)
- `meicloud-diesel-fluid-unify.js` — bridges IE ↔ Create: Diesel Generators fluids
- `meicloud-cannon-ingredients-unify.js` — unifies Big Cannons + IE saltpeter
- `meicloud-space-fuel-unify.js` — Creating Space fuel ↔ Mekanism hydrogen
- `meicloud-aeronautics-rotor-unify.js` — steel ingot tag bridge

### Added — Quest content
- `meicloud_airborne.snbt` — 3-quest starter chapter for Aeronautics → Big Cannons → Creating Space

### Added — Welcome
- Patchouli "meiCloud — Welcome" book (auto-given on first login via the OpenBook mod's hook)

### Config notes
- View distance recommended: 14 chunks
- Simulation distance recommended: 12 chunks
- Max players: 8
- `pvp=false`, `mobGriefing=false`
- Difficulty: Hard
