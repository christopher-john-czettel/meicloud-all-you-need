<!-- markdownlint-disable MD013 MD024 MD025 MD032 MD022 MD036 -->
# Performance tuning — meiCloud — All You Need

This pack is a 556-mod NeoForge 1.21.1 build with Distant Horizons, Iris+BSL shaders, Create + Big Cannons + Aeronautics + Creating Space, Sable physics, ModernFix, and a heap of other interactive systems. On modern hardware (Ryzen 7000+ / Radeon 7000+ / 32+ GB RAM) you should comfortably see **avg 60–90 FPS at default settings with shaders on**.

If your 1 % lows are dropping below ~25 FPS, or you're seeing microstuttering, the levers below — applied in tier order — should add **20–40 %** to your 1 % lows.

The tiers are ordered by **(time-to-apply × risk × reward)**. Do Tier A first; assess; escalate as needed.

The lever that has the biggest single impact for most players is **disabling Hardware-accelerated GPU Scheduling (HAGS)** on Windows 11. Especially on AMD.

---

## Tier A — Free wins (do all of these)

15–30 minutes total. Zero risk. No mod changes.

### Windows 11

| Setting | Where | Why |
|---|---|---|
| **Hardware-accelerated GPU Scheduling: Off** | Settings → System → Display → Graphics → Change default graphics settings → toggle off | Known to cause microstutter with Iris+AMD. **Biggest single win.** Requires reboot. |
| **Game Mode: Off** | Settings → Gaming → Game Mode → Off | Scheduler conflicts with modded MC's many threads. |
| **Power Mode: Best Performance** | Settings → System → Power → Power mode | Stops CPU clock-down between frames. On a desktop, harmless. |
| **Defender real-time scan: exclude MC instance folder** | Settings → Privacy & security → Windows Security → Virus & threat protection → Manage settings → Exclusions → Add an exclusion → Folder | The Prism instance dir. Stops disk-spike pauses on chunk save / backup. |
| **Visual Effects: Adjust for best performance** | (optional, taste) Settings → System → About → Advanced system settings → Performance → Settings → Visual effects | Disables window animations. Tiny CPU/GPU saving for users who want max responsiveness. |

### AMD Adrenalin — per-app profile for `javaw.exe`

Open AMD Software: Adrenalin Edition → Gaming → click "Add a game" → browse to your Java's `javaw.exe` (usually under Prism's `java/` folder). Then in that profile:

| Setting | Value | Why |
|---|---|---|
| Anti-Lag | Off | Adds frame stutter with modded MC's threading model |
| Radeon Image Sharpening | Off | GPU work for tiny visual gain we don't want |
| Wait for Vertical Refresh | "Off, unless application specifies" | Let MC's V-Sync (off) + monitor FreeSync handle pacing |
| Texture Filtering Quality | Performance | Saves GPU cycles |
| Surface Format Optimization | On | AMD driver tweak — let it pick the cheapest swap-chain format |
| Tessellation Mode | Override → Disabled (`x0`) | MC doesn't use tessellation |
| Anti-Aliasing Mode | Use application settings | MC's MSAA is off by default; this stops Adrenalin force-enabling MSAA |
| FreeSync | On if the monitor supports it | Smooths perceived stutter even when actual GPU pacing is jittery |

### NVIDIA Control Panel — per-app profile for `javaw.exe`

For friends on NVIDIA, the equivalent settings are in **NVIDIA Control Panel → Manage 3D Settings → Program Settings → Add → `javaw.exe`**:

| Setting | Value |
|---|---|
| Low Latency Mode | Off (or "On" — NOT "Ultra" — Ultra adds stutter on modded) |
| Threaded Optimization | On |
| Vertical Sync | Off (let G-Sync handle it) |
| Power Management Mode | Prefer Maximum Performance |
| Texture Filtering — Quality | High Performance |
| Triple Buffering | Off |

### Verify FreeSync / G-Sync is active

Win11 → Settings → System → Display → Graphics → click your monitor → check "Variable refresh rate" is on. Then **on the monitor's own OSD**, confirm FreeSync/G-Sync is enabled at the panel level. Both halves are needed.

---

## Tier B — Modestly invasive (worth it on a desktop)

### Disable Memory Integrity (Core Isolation)

Settings → Privacy & security → Windows Security → Device security → Core isolation → "Memory integrity" → **Off**.

Memory integrity adds ~5–10 % CPU overhead system-wide via virtualization-based security. Noticeable in CPU-bound modded MC. The security trade-off is real but acceptable for a gaming PC that isn't running enterprise workloads — your call. Requires reboot.

### Disable Memory Compression

PowerShell **as administrator**:

```powershell
Disable-MMAgent -mc
```

Stops Windows from compressing RAM pages. On systems with abundant RAM (16+ GB), compression saves no useful memory and the CPU cost shows up as 1 %-low stutter. Reversible: `Enable-MMAgent -mc`. Requires reboot.

### Enable Smart Access Memory (SAM) — AMD only

Requires Ryzen 5000+ CPU + Radeon 6000+ GPU + BIOS support.

In BIOS: enable both **"Above 4G Decoding"** and **"Resizable BAR"** (sometimes called "Smart Access Memory" directly). On a system that supports it, you get 5–10 % FPS uplift on shader-loaded scenes with no downside.

---

## Tier C — Minecraft + mod-side tweaks

### Vanilla MC video settings

Open Options → Video Settings. Recommended:

| Setting | Value | Why |
|---|---|---|
| Render Distance | 8–10 chunks | DH handles far rendering; vanilla doesn't need 16+ |
| Simulation Distance | 6 | Cuts entity ticks in distant chunks |
| V-Sync | Off | Use FreeSync/G-Sync at driver level |
| Smooth Lighting | Maximum | Better visuals, GPU-cheap on modern hardware |
| Mipmap Levels | 4 | Cache-friendly mipmap chain |
| Particles | Decreased | Big Cannons / Create can emit thousands |
| Entity Distance | 75–100 % | If many mob farms, drop to 75 % |
| Distortion Effects | 60 % | Less aggressive nausea/portal swirl = less FPS hit |
| FOV Effects | 50 % | Disables sprint-zoom; reduces frustum recompute |

### LambDynamicLights config

`config/lambdynlights.toml`:

```toml
mode = "fastest"        # default in our pack; lightest setting
```

Modes: `off / fastest / fast / fancy`. `fastest` keeps player+held-item lighting only. `fancy` adds dropped-item + entity lighting; expensive on heavily-populated worlds.

### Distant Horizons sizing

`config/DistantHorizons.toml`:

| Key | Our pack default | Why |
|---|---|---|
| `enableDistantGeneration` | `false` (client) | Avoids worldgen-thread deadlock that bit us in early testing |
| `numberOfThreads` | `4` | Down from default 16; reduces lock contention on the StructureTemplateManager |
| `threadRunTimeRatio` | `"0.5"` | Each DH worker sleeps half the time, leaves CPU for vanilla server tick |
| `maxGenerationRequestDistance` | `256` | Down from default 4096 — generation radius cap |
| `lodChunkRenderDistanceRadius` | `256` | The visible-LOD radius (your far-vista distance) |
| `ignoredDimensionCsv` | `compactmachines:compact_world,mahoutsukai:reality_marble,ae2:spatial_storage,irons_spellbooks:pocket_dimension,hyperbox:hyperbox` | Skip LOD for interior/instanced dims (no value, just overhead) |

If you want bigger far-vista, raise `lodChunkRenderDistanceRadius` to 512. Cost: linear VRAM, roughly 2× LOD memory.

### Sodium / Embeddium

Esc → Options → Video Settings → "Sodium Options…" (button bottom-left). The defaults are sane. The few worth toggling:

| Setting | Value |
|---|---|
| Use Persistent Mapping | **On** (saves GPU upload work) |
| Allow Direct Memory Access | **On** |
| GUI Allocator | Auto |
| Use Block Face Culling | On |
| Use No Error Context | On (saves OpenGL validation overhead) |

### Iris (shader system)

If your shader pack is BSL + Clrwl (our default), use the **`LOW` profile** for performance: in-game, Shaders menu → "BSL + Clrwl" → Settings → Profile → `LOW`. Disables shadow filter, light shafts, TAA, ambient occlusion. Still looks vastly better than vanilla; runs ~30 % faster than `MEDIUM`.

For Create-heavy bases (lots of kinetic blocks), the `+ Clrwl` variant of BSL is the **only correct choice** — it has native support for Create's Colorwheel rendering backend. Plain `BSL_v10.1.1.zip` will throw the "incompatible shaderpack" alert and render Create blocks in fallback mode.

### Optional: Concurrent Chunk Management Engine (C2ME)

If exploring lots of new chunks (initial pre-gen, new dimensions), adding **C2ME** (Modrinth: `c2me-neoforge`) to the pack parallelizes vanilla chunk generation across worker threads. ~2× chunk-gen throughput on a 6+ core CPU. Adds compatibility risk with some worldgen mods; not currently shipped in the pack.

---

## Tier D — JVM lever (try last, revert if it backfires)

### Prism Java settings — exact configuration

A fresh `.mrpack` install in Prism Launcher does NOT carry JVM args or heap size — those are per-Prism-install settings. Re-apply these on every new instance:

**Prism Launcher → right-click instance → Edit → Settings → Java**

| Pane | Setting | Value | Why |
|---|---|---|---|
| Java | **Java path** | auto-detect (Java 21 / Microsoft OpenJDK 21+) | NeoForge 1.21.1 requires Java 21 |
| Memory | **Override Memory** | ☑ on | enables the two fields below |
| Memory | **Maximum memory allocation** | **16384** MiB (16 GB) | Working set with DH + 556 mods + EMI index is ~9-11 GB; 16 GB leaves headroom for SimpleBackups bursts without G1 thrash. The `G1HeapRegionSize=8M` sweet spot is 2–32 GB; past 16 GB G1 young-gen scans creep into perceptible pause territory. |
| Memory | **Minimum memory allocation** | **16384** MiB (16 GB) | Match Max so the JVM doesn't grow/shrink the heap at runtime. `+AlwaysPreTouch` commits the full heap up-front anyway. |
| Memory | **PermGen** | leave at default (128) | Legacy MC pre-1.8 setting; harmless on Java 21 |
| Arguments | **Override JVM Arguments** | ☑ on | enables the args box |
| Arguments | **JVM Arguments** | (block below) | G1 was the working GC; ZGC OOM'd this workload |

**JVM Arguments — copy/paste this exact block:**

```
-XX:+UnlockExperimentalVMOptions -XX:+UseG1GC -XX:G1NewSizePercent=20 -XX:G1ReservePercent=20 -XX:MaxGCPauseMillis=50 -XX:G1HeapRegionSize=8M -XX:+ParallelRefProcEnabled -XX:+AlwaysPreTouch -Dfml.readTimeout=180 -Dfml.loginTimeout=180
```

What each flag does:

| Flag | What it does |
|---|---|
| `-XX:+UnlockExperimentalVMOptions` | Required by some `G1*` flags |
| `-XX:+UseG1GC` | G1 garbage collector. ZGC OOM'd; Shenandoah untested on this pack — stay on G1. |
| `-XX:G1NewSizePercent=20` | Young generation is 20 % of heap (3.2 GB at 16 GB). Right-sized for high-allocation modded MC. |
| `-XX:G1ReservePercent=20` | Reserve 20 % of heap as buffer; prevents promotion failures during allocation spikes. |
| `-XX:MaxGCPauseMillis=50` | Target max GC pause is 50 ms. Drop to **30** if you're stutter-sensitive (trades ~2-3 % avg FPS for tighter 1 % lows). |
| `-XX:G1HeapRegionSize=8M` | 8 MB regions. Sweet spot for heap sizes 2-32 GB. |
| `-XX:+ParallelRefProcEnabled` | Parallelizes reference processing across CPU cores. Free win on 8+ core CPUs. |
| `-XX:+AlwaysPreTouch` | Commits the full heap to physical RAM at startup. Prevents first-explore stutter from heap growth. |
| `-Dfml.readTimeout=180` | Mod-loading read timeout in seconds. 180 = 3 min. Vanilla default is 90; we need more because 564 mods. |
| `-Dfml.loginTimeout=180` | Server-login handshake timeout. Same reasoning. |

### Lower G1's pause target (optional — if microstuttering)

In the `JVM Arguments` field, change `-XX:MaxGCPauseMillis=50` → `-XX:MaxGCPauseMillis=30`. G1 collects more often with shorter pauses — directly improves 1 % lows. Trade-off: ~2–3 % drop on average FPS. Worth it if stutter bothers you.

### Reference: full JVM args block (same as above, formatted)

```
-XX:MaxGCPauseMillis=50
```

to

```
-XX:MaxGCPauseMillis=30
```

G1GC will collect more often but with shorter pauses — directly improves 1 % lows. Trade-off: ~2–3 % drop on average FPS. Worth it if you're stutter-sensitive.

### Full recommended JVM args

These are what our pack ships in `instance.cfg` (G1 + 16 GB heap + ParallelRefProc + AlwaysPreTouch):

```
-XX:+UnlockExperimentalVMOptions
-XX:+UseG1GC
-XX:G1NewSizePercent=20
-XX:G1ReservePercent=20
-XX:MaxGCPauseMillis=50
-XX:G1HeapRegionSize=8M
-XX:+ParallelRefProcEnabled
-XX:+AlwaysPreTouch
-Dfml.readTimeout=180
-Dfml.loginTimeout=180
```

With `MinMemAlloc = MaxMemAlloc = 16384` (matched to skip heap-resize churn at startup; `+AlwaysPreTouch` commits the full heap upfront anyway).

### What NOT to do on this pack

- **Don't switch to ZGC** — we tried this; it OOM'd with the same workload that G1 handles fine. ZGC needs ~30–40 % heap headroom above the live set; on a 556-mod pack with DH + 23 dim-server-levels the live set is ~9–11 GB and 12 GB ZGC ran out. G1 is correct here.
- **Don't bump heap above ~20 GB on G1** — past the `G1HeapRegionSize=8M` sweet spot, G1's young-gen scan time creeps into perceptible pause territory. 16 GB is the comfortable upper end.
- **Don't disable `+AlwaysPreTouch`** — this caused stutter on first explore as the JVM grew the heap. Keep it.

---

## Diagnosing your own bottleneck

If you've applied all the tiers above and still see issues, the next step is profiling. **Spark** (Modrinth: `spark`) is in our pack — invoke `/spark profiler --timeout 60` from chat to capture a 60-s sample, then open the link it spits out. Spark shows per-mod tick time, GPU vs CPU bottleneck, and frame-time outliers.

Common signatures:

| What spark shows | What it means | Fix |
|---|---|---|
| Server thread > 50 ms/tick consistently | Mod tick logic too heavy | Identify the mod, see if it has a "lite" config |
| Render thread spikes during chunk-save | Disk I/O contention | Defender exclusion (Tier A), or move MC to NVMe |
| GC pauses > 30 ms | Heap pressure | Bump `MaxGCPauseMillis` lower (Tier D) or check for heap leak (re-export `.mrpack` cleanly) |
| Single hot mod thread (`*.gameplay.SomeTickHandler`) | One mod is misbehaving | Spark identifies the mod; report to its author, or remove |

## When the optimizations aren't enough

This pack will not run well on:

- Laptops without a discrete GPU (integrated graphics tank with shaders + DH)
- Systems with less than 16 GB RAM (16 GB heap + OS overhead → swap thrashing)
- CPUs with fewer than 6 cores (ChunkGen + DH + Sodium worker threads compete badly)

Minimum recommended for "playable with shaders":

- CPU: Ryzen 5 5600 / Intel i5-12400 or better
- GPU: Radeon RX 6600 / GeForce RTX 3060 or better
- RAM: 32 GB system (16 GB heap + 16 GB OS)
- Storage: NVMe SSD with the instance folder on it

## Reverting any change

Each Tier change is independent. If you discover a setting causes a problem:

- Tier A — toggle the Win11 / driver setting back; no game restart needed
- Tier B — toggle back in Settings, reboot
- Tier C — Esc → Options changes are session-immediate; `config/*.toml` changes apply on next world load
- Tier D — edit Prism's JVM args back, restart instance

If a Tier C config tweak breaks something at boot, delete the affected `config/*.toml` and let the game regenerate defaults.

## Acknowledgements

These tuning notes draw on community guidance from ATM10's own performance docs, the Distant Horizons wiki, ModernFix's "Recommended JVM Arguments" page, the AMD modded-MC community, and direct testing on the meiCloud reference hardware (Ryzen 9 + Radeon, 128 GB system RAM, Win11 + WSL2).
