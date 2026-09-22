# HomeBook — Public Website

Static site (plain HTML/CSS, no build step, no framework) providing the public-facing
pages for the HomeBook Android app: landing page, Privacy Policy, Account Deletion,
Terms of Use, and Contact. Deployed via GitHub Pages from the `main` branch root.

These pages exist primarily to satisfy Google Play Console's requirement for
publicly-accessible Privacy Policy and Data Deletion URLs (no login required).

## Structure

```
/index.html            Landing page
/privacy/index.html    Privacy Policy
/delete-account/index.html   Account & data deletion
/terms/index.html      Terms of Use
/contact/index.html    Contact
/styles.css             Shared stylesheet
/favicon.svg
/assets/og-image.png
```

## Editing

Edit the HTML files directly and push to `main` — GitHub Pages redeploys automatically.
Content should stay in sync with the actual HomeBook Flutter app (see the main
`Home-Book` repository); this repo intentionally does not contain any app source code.
