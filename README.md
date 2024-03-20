# Turborepo cache issue

First `pnpm install`

# Issue
`turbo` does not take into account outputted files when using cache. So if i have an outputted file and I also don't have the output in my `.gitignore` it will cause it to miss the cache.

So can see first run cache things. And on second run you would expect everything to be cached, but due to the outputted files also being seen as inputs it will re execute (and have it's dependents re-execute). Third run all cached (assuming you don't delete outputted files)

## Slight workaround
Specify `inputs`
