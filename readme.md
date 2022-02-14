# EditorJS Stretch Tune
- added tunes to stretch block on the full width/screen
At the moment no additional options is supported

**Install**
`yarn add https://github.com/ScaleMeUp/editorjs-stretch-tune`

**Connect**
```js
import StretchTune from '@scalemeup/editorjs-stretch-tune'
//...
new EditorJS({
    tools: {
        stretchTune: StretchTune,
        // apply for specific content block
        paragraph: {
            class: Paragraph,
            tunes: ['stretchTune'],
        },
        // or for any block
        tunes: ['stretchTune']
    },
})
```
