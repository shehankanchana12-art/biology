# අවයව 3D මාදිලි (Blender → වෙබ් අඩවිය)

The anatomy viewer can render real 3D organ models instead of the built-in
schematic art. Models are ordinary **glTF / GLB** files (what Blender exports);
browsers cannot open `.blend` files, so each Blender model has to be exported
once.

## 1. Folder layout

```
public/models/anatomy/
├── manifest.json     ← lists which organs have a model
├── heart.glb
├── brain.glb
└── ...
```

Drop the exported files here and register them in `manifest.json`. Anything not
listed keeps using the schematic organ art, so partial model sets are fine.

## 2. manifest.json

```json
{
  "models": [
    { "id": "heart", "file": "heart.glb" },
    { "id": "brain", "file": "brain.glb", "size": 0.6, "scale": 1.1, "rotation": [0, 1.57, 0] }
  ]
}
```

| field      | required | meaning                                                            |
| ---------- | -------- | ------------------------------------------------------------------ |
| `id`       | yes      | organ id from the table below                                      |
| `file`     | yes      | file name inside `public/models/anatomy/`                          |
| `size`     | no       | target bounding-box size in scene units, default `0.55`             |
| `scale`    | no       | multiplier applied after auto-fit                                  |
| `rotation` | no       | `[x, y, z]` in radians, applied after auto-fit                     |

## 3. Organ ids

| id               | organ                     | system       |
| ---------------- | ------------------------- | ------------ |
| `heart`          | හෘදය                    | circulatory  |
| `lungs`          | පෙනහළු                   | respiratory  |
| `trachea`        | ශ්වාසනාලය              | respiratory  |
| `liver`          | අක්මාව                  | digestive    |
| `stomach`        | ආමාශය                   | digestive    |
| `pancreas`       | අග්න්‍යාශය             | digestive    |
| `small-intestine`| කුඩා බඩවැල               | digestive    |
| `large-intestine`| විශාල බඩවැල              | digestive    |
| `kidney`         | වකුගඩු                   | excretory    |
| `bladder`        | මුත්‍රාශය                | excretory    |
| `brain`          | මොළය                    | nervous      |
| `spinal-cord`    | සුෂුම්නාව               | nervous      |
| `skeleton`       | ඇට සැකිල්ල              | skeletal     |
| `thyroid`        | තයිරොයිඩ් ග්‍රන්ථිය      | endocrine    |
| `uterus`         | ගර්භාෂය                 | reproductive |
| `ovary`          | ඩිම්බ කෝෂය              | reproductive |
| `testis`         | වෘෂණ කෝෂය               | reproductive |

## 4. Exporting from Blender

1. Open the `.blend` file for one organ.
2. Select only the organ mesh (delete/hide limbs, cameras, lights, empties of
   the master scene if the file is a whole-body scene).
3. `File → Export → glTF 2.0 (.glb)`.
4. Format: **glTF Binary (.glb)**. Include: **Selected Objects** only.
   Transform: **+Y Up** (leave the default). Geometry: apply modifiers.
5. Optional but recommended for big scans: *Compression → Draco*
   (`meshopt` is not enabled). Draco files load through the bundled decoder.
6. Keep each file under ~15 MB when possible; the viewer lazy-loads one file per
   organ, so total page weight stays low.

## 5. Behaviour

- Models are centred on their own bounding box and scaled to fit the organ's
  position in the body, so Blender units (m, cm, mm) do not matter.
- Hovering or selecting an organ tints the model teal; the exploded view moves
  and transforms models exactly like the schematic art.
- If `manifest.json` is missing or lists no models, the toggle is hidden and the
  schematic art is used with no errors.
- A `මාදිලි N` / `රූප සටහන්` button in the anatomy toolbar switches between the
  loaded models and the schematic view.
