# Turborepo cache issue

First `pnpm install`

# Issue
`turbo` takes into account local file changes when doing `turbo run test --filter="...[origin/main...HEAD]"`

## Reproduce
Run `turbo run test --filter="...[origin/main...HEAD]"` twice. 

Notice first time it correctly only executes `api:test`. Second time it runs `api:test` and `@repo/logger:test` due to local files outputted (which are not in filter command)

## Workaround
Specify `inputs`.

But I notice if I do this, I would have to do this for all my commands. Since say I have the following
```
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "test": {
      "dependsOn": ["^compile"],
      "outputs": ["artifacts/logs/test/xml/test-reports/xunit_results.xml"]
    },
    "lint": {
      "dependsOn": ["^compile", "^lint"]
    },
    "compile": {
      "dependsOn": ["^prepublishOnly"],
      "inputs": ["src/**"],
      "outputs": ["**/*.d.ts"]
    }
  }
}
```
I now need to let my test command be specific with it's inputs as well cause it will also see `compile`'s output as a change.
