# My VS Code configuration

```bash
git clone https://github.com/abertsch/Menlo-for-Powerline.git
# Font Book 导入
```

```json
{
    "workbench.colorTheme": "Monokai Dimmed",
    "editor.formatOnPaste": true,
    "editor.snippetSuggestions": "top",
    "editor.cursorStyle": "underline",
    "window.zoomLevel": 2,
    "window.openFilesInNewWindow": "on",
    "php.validate.executablePath": "/usr/bin/php",
    "editor.scrollBeyondLastLine": false,
    "workbench.editor.enablePreview": false,
    "editor.dragAndDrop": false,
    "gitlens.advanced.messages": {
        "suppressCommitNotFoundWarning": true,
        "suppressShowKeyBindingsNotice": true
    },
    "gitlens.defaultDateStyle": "absolute",
    "gitlens.keymap": "none",
    "diffEditor.ignoreTrimWhitespace": true,
    "gitlens.mode.active": "zen",
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "html", {
            "language": "vue",
            "autoFix": true
        }
    ],
    "eslint.options": {
        "plugins": ["html"]
    },
    "cmake.cmakePath": "/usr/local/bin/cmake",
    "terminal.explorerKind": "external",
    "terminal.integrated.fontFamily": "Menlo for Powerline"
}
```

keybindings.json
```json
// Place your key bindings in this file to overwrite the defaults
[
    {
        "key": "cmd+1",
        "command": "workbench.action.openEditorAtIndex1"
    },
    {
        "key": "cmd+2",
        "command": "workbench.action.openEditorAtIndex2"
    },
    {
        "key": "cmd+3",
        "command": "workbench.action.openEditorAtIndex3"
    },
    {
        "key": "cmd+4",
        "command": "workbench.action.openEditorAtIndex4"
    },
    {
        "key": "cmd+r",
        "command": "references-view.find",
        "when": "editorHasReferenceProvider"
    },
    {
        "key": "shift+alt+f12",
        "command": "-references-view.find",
        "when": "editorHasReferenceProvider"
    }
]
```