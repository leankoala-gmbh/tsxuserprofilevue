# 360 User Profile
A web component that displays a user's information.

## Install
```shell
npm i @webpros/tsxuserprofile
```

** Alternative with a CDN**
Or download as script from this URL

```html
<script type="module" crossorigin src="https://unpkg.com/@webpros/tsxuserprofile/dist/index.js"></script>
```

## Usage
The user profile `<tsx-user-profile>` is simply installed in the space provided, the component itself only outputs the content, if a different background colour, round corners, shadows etc. are required, this should be added via a wrapper in which the component is installed.

The component itself also only controls the display of the data, it has no direct connection to an API, all events are therefore sent out via [MITT](https://github.com/developit/mitt) events.

The component is controlled via three props: `current-language`, `user-data`, `inactive-fields`. The data is transmitted as a string (or JSON string) according to the WebComponent specification.

### Example
```html
<body>
<tsx-user-profile
  current-language="de"
  user-data="JSON.stringify(myUserData)"
  inactive-fields="[]"
/>
</body>
```

### Props
- `current-language <string>` The current language used 
- `user-data <JSON object>` The data of the user 
- `inactive-fields <JSON array>` Specifying the profile blocks that you want to deactivate

## Usage with Frontend Frameworks

### Vue / Nuxt
So that Vue does not treat these elements as regular Vue components the tags must be ignored. The easiest way is to include the elements using `plugin`.

```js
import Vue from 'vue'
import '@webpros/tsxuserprofile'

Vue.config.ignoredElements = [
  'tsx-user-profile'
]
```

### React / Next
Currently no findings.

## Languages
To change the language of the user profile, pass the language code through the prop to the application. Eight languages are available

```typescript
type TLanguage = 'de' | 'en' | 'fr' | 'es' | 'it' | 'ja' | 'ru' | 'pt'
```

## UserData
Via the user data, we transmit meta information of the user, such as the time zone, name, avatar and email. All information is optional.

_If no timezone is transmitted, the profile will use the timezone from the user's browser as soon as it is called up and automatically transmit it to the API._

```typescript
interface IProfileUser {
  name?: string
  email?: string
  avatar?: string
  timezone?: null | string
}
```

## InactiveFields
This prop can be used to specifically deactivate blocks of the profile, either because they should not be displayed in general, or because perhaps only the time zone should be visible at that point.

Currently the `avatar`, `email` and the `timezone` can be deactivated.

```typescript
interface IInactiveFields {
  values: Array<'avatar' | 'email' | 'timezone'>
}
```

## Events
All click events are passed on to the outside as MITT events.

**Example**
```typescript
window.mitt.on('tsxUserProfile', (payload) => {
  if (payload.timezone) {
    console.log('Hello from changed Timezone', payload.timezone)
  }
})
```

## Colors
The colors are defined using CSSVars and must be included either inline or in the custom stylesheet.

```css
:root {
  --tsxup-brightest: #ffffff;
  --tsxup-brightest-darker: #e5e7eb;
  --tsxup-darkest: #111827;
  --tsxup-darkest-light: #4b5563;
  --tsxup-signal-success: #4CA154;
  --tsxup-signal-error: #b73737;
  --tsxup-primary: #1E40AF;
  --tsxup-primary-light: #668bca;
  /* -- Specific Element CSS Vars */
  --tsxup-text: var(--tsxup-darkest);
  --tsxup-text-lighter: var(--tsxup-darkest-light);
  --tsxup-headline: var(--tsxup-darkest);
  --tsxUp-button-color: var(--tsxup-brightest);
  --tsxUp-button-bg: var(--tsxup-primary);
  --tsxUp-button-color-hover: var(--tsxup-brightest);
  --tsxUp-button-bg-hover: var(--tsxup-primary-light);
  --tsxUp-selectField-border: var(--tsxup-brightest-darker);
  --tsxUp-selectField-background: var(--tsxup-brightest);
  --tsxUp-selectField-backgroundHover: var(--tsxup-brightest);
  --tsxUp-selectField-backgroundDisabled: var(--tsxup-brightest-darker);
  --tsxUp-selectField-color: var(--tsxup-darkest);
  --tsxUp-selectField-selectedBackground: var(--tsxup-primary-light);
  --tsxUp-selectField-selectedColor: var(--tsxup-brightest);
}
```



