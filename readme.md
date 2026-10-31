Tutorial website: https://squidfunk.github.io/mkdocs-material/creating-your-site/#previewing-as-you-write-unix-powershell

## Install the site dependencies

Use Python 3.11, matching GitHub Actions, and install the pinned versions before previewing:

```bash
python -m pip install -r requirements.txt
```

The Bootstrap theme includes Bootstrap 4 assets and needs MkDocs 1.5.3 for matching templates. Installing a newer MkDocs version changes the generated markup.

## Previewing as you write
```bash
python -m mkdocs serve
```

### Building your site¶
```bash
python -m mkdocs build --strict
```
