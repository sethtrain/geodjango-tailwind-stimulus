import esbuild from 'esbuild'
import { stimulusPlugin } from 'esbuild-plugin-stimulus'
import postCssPlugin from 'esbuild-style-plugin'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'

const watch = (process.env.WATCH) ? true : false;

const watchPlugin = {
    name: "watch-plugin",
    setup(build) {
        build.onStart(() => {
            console.log('Build started:', new Date(Date.now()).toLocaleString())
        })
        build.onEnd((results) => {
            if (results.errors.length > 0) {
                console.log('Build finished with errors:', new Date(Date.now()).toLocaleString())
            } else {
                console.log('Build finished successfully:', new Date(Date.now()).toLocaleString())
            }
        })
    }
}

const context = await esbuild.context({
    entryPoints: ["./javascript/application.ts"],
    bundle: true,
    outdir: "./static",
    plugins: [
        stimulusPlugin(),
        postCssPlugin({
            postcss: {
                plugins: [tailwindcss, autoprefixer],
            },
        }),
        watchPlugin
    ],
})

if (watch) {
    await context.watch()
} else {
    await context.rebuild()
    await context.dispose()
}
