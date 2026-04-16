


### [go.mod](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html) — The Project Identity Card

Every Go project has exactly **one** [go.mod](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html) file at the root. It's like `package.json` in Node.js or `requirements.txt` in Python — it defines **who you are** and **what you depend on**.


- [fsnotify](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html) — the only real dependency. It's a library that talks to the OS kernel to detect file system changes (inotify on Linux, FSEvents on Mac, ReadDirectoryChangesW on Windows).
- `golang.org/x/sys` — [fsnotify](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html) internally needs low-level OS syscall bindings, so it pulls this in. The `// indirect` comment means _this project doesn't import it directly_ — it's just a transitive dependency of [fsnotify](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html).

When you run `go mod tidy` or `go get`, Go writes/updates this file automatically. There's also a [go.sum](vscode-file://vscode-app/usr/share/code/resources/app/out/vs/code/electron-browser/workbench/workbench.html) file (not shown) that stores cryptographic checksums of every downloaded dependency to prevent supply-chain attacks.


