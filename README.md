# Turborepo cache issue

First `pnpm install`

# Issue
`turbo` does not take into account outputted files when using cache on dependency builds. So if i have an outputted file and I also don't have the output in my `.gitignore` it will cause it to miss the cache.

Seems like canary fixed an issue where the output was not considered for the current command (ie doing `turbo run build` use to gets this in non canary) But when I run a command that depends on output of another file (ie `turbo run typecheck`) it will see the outputted file of `build` as changed.

So can see first run cache things. And on second run you would expect everything to be cached, but due to the outputted files also being seen as inputs it will re execute (and have it's dependents re-execute). Third run all cached (assuming you don't delete outputted files)

[Can see these run summaries here. Look at the canary ones.](https://github.com/EWhite613/turbo-issue-cache/tree/main/runs).

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

Also when trying to target only things that have changed the output will mark a lot more as changed than expected. Ie `turbo run test --filter="...[<target-branch>...HEAD]"` will start noticing the output and adding more packages into scope as they are seen as changed.
