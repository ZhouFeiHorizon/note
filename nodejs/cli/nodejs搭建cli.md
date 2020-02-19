# nodejs搭建cli

## Quick start

```js
// package.json
{
	"name": "my-cli",
	"version": "0.0.1",
	"script": {
		"start": "node ./bin/my-cli"
	},
	"bin": {
		"my-cli": "./bin/my-cli"
	}
}
```

```js
// ./bin/my-cli
#!/usr/bin/env node

console.log('hello world')
// process.argv
```

添加 `#!/usr/bin/env node` 或者 `#!/usr/bin/node` ，这是告诉系统，下面这个脚本，使用nodejs来执行

